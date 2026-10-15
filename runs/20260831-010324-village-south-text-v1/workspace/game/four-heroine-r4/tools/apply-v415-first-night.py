#!/usr/bin/env python3
"""Fail-closed v4.15 first-night text/reply editor; reversible to exact v4.14."""
import argparse
import copy
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'data/STORY.json'
PLAN = ROOT / 'patch/v415_first_night_plan.json'
PATCH = ROOT / 'patch/v415_first_night_edits.json'
SHA = lambda b: hashlib.sha256(b).hexdigest()
SERIALIZE = lambda v: (json.dumps(v, ensure_ascii=False, indent=2) + '\n').encode()
BEAT_HASH = lambda row: SHA((row['speaker'] + '\0' + row['text']).encode())[:16]

def find(story, edit):
    scene = story['scenes'][edit['scene']]
    if edit['location'] == 'body':
        rows = scene['body']
    elif edit['location'] == 'reply':
        rows = next(c for c in scene['choices'] if c['id'] == edit['choice'])['reply']
    else:
        raise AssertionError('Not permitted to edit ' + edit['location'])
    row = next((x for x in rows if x['id'] == edit['id']), None)
    assert row is not None and row['speaker'] == edit['speaker'], edit['id']
    return row

def counts(story):
    scenes = story['scenes']
    assert len(scenes) == 228
    assert sum(len(s['choices']) for s in scenes.values()) == 751
    assert sum(s['kind'] == 'ending' for s in scenes.values()) == 24
    assert len(scenes['ENTRY_WAKE']['body']) == 28
    assert [c['id'] for c in scenes['ENTRY_WAKE']['choices']] == ['canon', 'rescue', 'investigate']
    assert sum(bool(s.get('decisionSteps')) for s in scenes.values()) == 16

def verify(story, raw, plan, patch):
    assert SHA(raw) == patch['newStorySha256']
    assert patch['baseStorySha256'] == plan['baseStorySha256']
    assert patch['counts'] == plan['counts']
    assert len(patch['changes']) == plan['counts']['beats']
    wanted = {(c['scene'], c['id']): c for c in plan['changes']}
    assert len(wanted) == len(patch['changes'])
    prior = copy.deepcopy(story)
    for c in reversed(patch['changes']):
        target = wanted[(c['scene'], c['id'])]
        assert c['location'] == target['location']
        assert c.get('choice') == target.get('choice')
        assert c['after'] == target['text']
        row = find(prior, c)
        assert row['text'] == c['after'] and row['textHash'] == c['afterHash'] == BEAT_HASH(row), c['id']
        row['text'] = c['before']
        row['textHash'] = c['beforeHash']
        assert BEAT_HASH(row) == row['textHash'], c['id']
    counts(prior)
    assert SHA(SERIALIZE(prior)) == patch['baseStorySha256'], 'Non-text mutation / history drift'
    counts(story)

def main():
    parser = argparse.ArgumentParser()
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument('--dry-run', action='store_true')
    mode.add_argument('--apply', action='store_true')
    mode.add_argument('--check', action='store_true')
    args = parser.parse_args()
    raw = SOURCE.read_bytes()
    story = json.loads(raw)
    plan = json.loads(PLAN.read_text(encoding='utf-8'))
    expected = json.loads((ROOT / 'patch/v414_first_night_edits.json').read_text(encoding='utf-8'))['newStorySha256']
    assert plan['baseStorySha256'] == expected
    assert plan['counts']['beats'] == 24 and plan['counts']['scenes'] == 10
    assert plan['scope'].startswith('Only existing body and choice reply text/textHash')
    if args.check:
        assert PATCH.is_file(), 'No applied v4.15 patch'
        patch = json.loads(PATCH.read_text(encoding='utf-8'))
        verify(story, raw, plan, patch)
        print('PASS v4.15 reversible patch', patch['counts'], patch['newStorySha256'])
        return
    assert SHA(raw) == expected, 'Unknown canonical baseline: refusing edits'
    counts(story)
    amended = copy.deepcopy(story)
    changes = []
    seen = set()
    for c in plan['changes']:
        key = (c['scene'], c['id'])
        assert key not in seen, key
        seen.add(key)
        row = find(amended, c)
        assert row['text'] != c['text'] and BEAT_HASH(row) == row['textHash'], key
        previous = row['text']
        old_hash = row['textHash']
        row['text'] = c['text']
        row['textHash'] = BEAT_HASH(row)
        changes.append({**{k: v for k, v in c.items() if k != 'text'},
                        'before': previous, 'beforeHash': old_hash,
                        'after': row['text'], 'afterHash': row['textHash']})
    serialized = SERIALIZE(amended)
    patch = {'version': 'v4.15',
             'baseStorySha256': expected, 'newStorySha256': SHA(serialized),
             'counts': plan['counts'],
             'scope': 'Only existing body/choice reply text and textHash edited',
             'changes': changes}
    verify(amended, serialized, plan, patch)
    if args.apply:
        assert not PATCH.exists(), 'Existing patch: refuse double apply'
        SOURCE.write_bytes(serialized)
        PATCH.write_bytes(SERIALIZE(patch))
        print('APPLIED 24 reviewed text edits; SHA', patch['newStorySha256'])
    else:
        print('DRY RUN PASS; no files modified; would yield', patch['newStorySha256'])

if __name__ == '__main__':
    main()
