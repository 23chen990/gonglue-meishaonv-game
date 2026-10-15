#!/usr/bin/env python3
"""v4.14 narrowly scoped story editor: authored body text only.

Run: python3 tools/apply-v414-first-night.py --dry-run
     python3 tools/apply-v414-first-night.py --apply
     python3 tools/apply-v414-first-night.py --check
This does NOT rebuild bundled H5 or certify a playable delivery.
"""
import argparse, copy, hashlib, json
from pathlib import Path

R=Path(__file__).resolve().parent.parent
SOURCE=R/'data/STORY.json'
PLAN=R/'patch/v414_first_night_plan.json'
PATCH=R/'patch/v414_first_night_edits.json'
sha=lambda b:hashlib.sha256(b).hexdigest()
beat_hash=lambda x:sha((x['speaker']+'\0'+x['text']).encode())[:16]
encode=lambda x:(json.dumps(x,ensure_ascii=False,indent=2)+'\n').encode()
ap=argparse.ArgumentParser()
group=ap.add_mutually_exclusive_group(required=True)
group.add_argument('--dry-run',action='store_true')
group.add_argument('--apply',action='store_true')
group.add_argument('--check',action='store_true')
args=ap.parse_args()
raw=SOURCE.read_bytes();old=json.loads(raw);p=json.loads(PLAN.read_text())
assert sha(raw)==p['baseStorySha256'] or args.check, 'Unrecognized story baseline: refusing overwrite'
assert p['scope'].startswith('existing body text')
assert len(p['changes'])==31
if not args.check:
    assert sha(raw)==p['baseStorySha256'],'Refuse to reapply a different revision'
    new=copy.deepcopy(old)
    changes=[];used=set()
    for ch in p['changes']:
        sid,bid=ch['scene'],ch['id']
        assert (sid,bid) not in used
        used.add((sid,bid))
        before=next((x for x in new['scenes'][sid]['body'] if x['id']==bid),None)
        assert before and before['speaker']==ch['speaker']
        assert before['text']!=ch['text'] and beat_hash(before)==before['textHash']
        prior={'scene':sid,'id':bid,'speaker':before['speaker'],'before':before['text'],'beforeHash':before['textHash']}
        before['text']=ch['text']; before['textHash']=beat_hash(before)
        changes.append({**prior,'after':before['text'],'afterHash':before['textHash']})
    assert len(new['scenes'])==228
    assert sum(len(v['choices']) for v in new['scenes'].values())==751
    assert sum(v['kind']=='ending' for v in new['scenes'].values())==24
    assert len(new['scenes']['ENTRY_WAKE']['body'])==28
    reverted=copy.deepcopy(new)
    for ch in reversed(changes):
        row=next(x for x in reverted['scenes'][ch['scene']]['body'] if x['id']==ch['id'])
        assert row['text']==ch['after'] and row['textHash']==ch['afterHash']
        row['text']=ch['before'];row['textHash']=ch['beforeHash']
    assert encode(reverted)==raw,'Changes outside text fields, or source formatting changed'
    result={'version':'v4.14','baseStorySha256':sha(raw),'newStorySha256':sha(encode(new)),
            'counts':{'beats':len(changes),'scenes':len({c['scene'] for c in changes})},
            'scope':'Only existing body.text and body.textHash edited','changes':changes}
    print('Validated',result['counts'],'base',result['baseStorySha256'],'new',result['newStorySha256'])
    if args.apply:
        SOURCE.write_bytes(encode(new))
        PATCH.write_bytes(encode(result))
        print('WROTE canonical story and independently reversible audit patch.')
    else: print('DRY RUN: no files modified.')
else:
    assert PATCH.exists(),'Patch missing: run --apply first'
    patch=json.loads(PATCH.read_text());assert sha(raw)==patch['newStorySha256']
    expected={c['id']:c['text'] for c in p['changes']}
    assert len(expected)==len(patch['changes'])
    for c in patch['changes']:
        assert expected[c['id']]==c['after'],'Plan / applied edit drift: '+c['id']
    back=copy.deepcopy(old)
    for ch in reversed(patch['changes']):
        row=next(x for x in back['scenes'][ch['scene']]['body'] if x['id']==ch['id'])
        assert row['speaker']==ch['speaker'] and row['text']==ch['after']
        assert row['textHash']==beat_hash(row)==ch['afterHash']
        row['text']=ch['before'];row['textHash']=ch['beforeHash']
    assert sha(encode(back))==patch['baseStorySha256']==p['baseStorySha256']
    print('PASS v4.14 exact reversible source restoration; story SHA',sha(raw))
