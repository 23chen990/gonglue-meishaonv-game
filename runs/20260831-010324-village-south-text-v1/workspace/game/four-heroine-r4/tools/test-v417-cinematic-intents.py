#!/usr/bin/env python3
"""v4.17 cinematic reader: actual Chromium staging, reply, action and legacy-save replay.

Native HTTP only; deliberately separate from engine-only checks and real-device QA.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import hashlib, json, os, traceback

R = Path(__file__).resolve().parent.parent
DATA = json.loads((R / 'data/STORY.json').read_text())
WITNESSES = json.loads((R / 'qa/current/choice-witness-prefixes.json').read_text())['choices']
STORY_HASH = hashlib.sha256((R / 'data/STORY.json').read_bytes()).hexdigest()
URL = os.environ.get('R4_REAL_URL', 'http://127.0.0.1:8765/index.html')
KEY = 'gonglue:revision-r4.5-portrait:canonical'
OLD_HASH = 'd473c470ade54b09c35b3bdaedcf4e0559c92f8c5ea96a3052d094fbc7dc10a3'
OUT = R / 'qa/current/v417-intent-reader-report.json'
RESULT = {'scope': 'Native Chromium HTTP: authentic two-stage choices and legacy save migration', 'cases': [], 'errors': []}


def snapshot(commands, story_hash=STORY_HASH):
    return {'version': 'bookside-revision-r4.3', 'storyHash': story_hash,
            'commands': commands, 'ui': {'phase': 'scene', 'page': 0, 'choicePage': 0, 'large': False},
            'profile': {'endings': {}, 'bonuses': {}, 'readPages': []}}


def prefix_for(sid):
    pair = next(((key, value) for key, value in WITNESSES.items()
                 if key.startswith(sid + '/') and '/intent:' not in key), None)
    assert pair is not None, 'missing engine witness ' + sid
    commands = pair[1]['prefix']
    pos = next((i for i, cmd in enumerate(commands)
                if cmd['from'] == sid and cmd['id'].startswith('intent:')), -1)
    assert pos >= 0, 'witness lacks the authored intent ' + sid
    return commands[:pos]


def advance(page, max_steps=50):
    steps = 0
    while steps < max_steps:
        next_page = page.locator('[data-page-next]')
        next_reply = page.locator('[data-reply-next]')
        if next_page.count():
            next_page.first.tap()
        elif next_reply.count():
            next_reply.first.tap()
        else:
            break
        steps += 1
    assert steps < max_steps, 'reading got stuck on too many next pages'
    return steps


with sync_playwright() as pw:
    launch = {'headless': True}
    if Path('/usr/bin/chromium').exists():
        launch.update({'executable_path': '/usr/bin/chromium', 'args': ['--no-sandbox']})
    browser = pw.chromium.launch(**launch)

    def open_with(commands, hash_value=STORY_HASH):
        ctx = browser.new_context(viewport={'width': 390, 'height': 844}, is_mobile=True, has_touch=True)
        page = ctx.new_page()
        page.set_default_timeout(7000)
        response = page.goto(URL, wait_until='load')
        assert response and response.ok, URL
        page.evaluate('([key, val]) => localStorage.setItem(key, JSON.stringify(val))',
                      [KEY, snapshot(commands, hash_value)])
        page.reload(wait_until='load')
        assert page.locator('meta[name="story-sha256"]').get_attribute('content') == STORY_HASH
        return ctx, page

    for sid, scene in DATA['scenes'].items():
        if not scene.get('decisionSteps'):
            continue
        try:
            original = prefix_for(sid)
            ctx, page = open_with(original)
            errors = []
            page.on('pageerror', lambda err: errors.append(str(err)))
            try:
                assert page.locator('body').get_attribute('data-current') == sid
                before_steps = advance(page)
                assert page.locator('.vn-frame').get_attribute('data-mode') == 'decision', sid
                offered = page.locator('.vn-dock [data-choice^="intent:"]')
                ids = offered.evaluate_all('(nodes) => nodes.map(n => n.dataset.choice)')
                expected = ['intent:' + x['id'] for x in scene['decisionSteps']]
                assert sorted(ids) == sorted(expected), (sid, 'intent decision hidden', ids, expected)
                assert offered.count() == 2, sid
                first = scene['decisionSteps'][0]
                page.locator('.vn-dock [data-choice="intent:' + first['id'] + '"]').tap()
                stored = page.evaluate('(key) => JSON.parse(localStorage.getItem(key))', KEY)
                assert len(stored['commands']) == len(original) + 1, sid
                assert stored['commands'][-1]['id'] == 'intent:' + first['id'], sid
                # A first-stage choice genuinely produces feedback before the leaf decision.
                reply_mode = page.locator('.vn-frame').get_attribute('data-mode')
                assert reply_mode == 'reply', (sid, 'missing first-stage feedback', reply_mode)
                reply_text = page.locator('.vn-scroll').inner_text()
                assert first['reply'][0]['text'] in reply_text or first['reply'][0]['text'][:18] in reply_text, sid
                after_steps = advance(page)
                assert page.locator('.vn-frame').get_attribute('data-mode') == 'decision', sid
                second = page.locator('.vn-dock button[data-choice]')
                ids2 = second.evaluate_all('(nodes) => nodes.map(n => n.dataset.choice)')
                assert 1 <= len(ids2) <= 4, (sid, ids2)
                assert all(x in first['options'] for x in ids2), (sid, 'other intent leaked', ids2, first['options'])
                chosen = ids2[0]
                second.first.tap()
                after = page.evaluate('(key) => JSON.parse(localStorage.getItem(key))', KEY)
                assert len(after['commands']) == len(original) + 2, sid
                assert after['commands'][-1]['id'] == chosen, (sid, chosen)
                page.reload(wait_until='load')
                restored = page.evaluate('(key) => JSON.parse(localStorage.getItem(key))', KEY)
                assert restored['commands'] == after['commands'], sid
                assert not errors, (sid, errors)
                RESULT['cases'].append({'scene': sid, 'status': 'PASS',
                                        'introAdvances': before_steps, 'replyAdvances': after_steps,
                                        'intent': first['id'], 'leaf': chosen})
                print('PASS UI true intent', sid, chosen, flush=True)
            finally:
                ctx.close()
        except Exception:
            RESULT['cases'].append({'scene': sid, 'status': 'FAIL'})
            RESULT['errors'].append(traceback.format_exc())
            print('FAIL UI true intent', sid, flush=True)

    # A real historical pre-v4.13 save lacks all intent commands.
    try:
        sid = 'A6a'
        modern = prefix_for(sid)
        old_commands = [cmd for cmd in modern if not cmd['id'].startswith('intent:')]
        assert len(modern) > len(old_commands), 'fixture does not exercise migrated two-stage history'
        ctx, page = open_with(old_commands, OLD_HASH)
        try:
            updated = page.evaluate('(key) => JSON.parse(localStorage.getItem(key))', KEY)
            keys = page.evaluate('(key) => Object.keys(localStorage).filter(k => k.startsWith(key + ":backup:"))', KEY)
            assert updated['storyHash'] == STORY_HASH, 'legacy save did not migrate'
            assert len(updated['commands']) == len(modern), (len(updated['commands']), len(modern))
            assert page.locator('body').get_attribute('data-current') == sid
            assert keys, 'verbatim backup not created'
            assert page.locator('#notice').inner_text().find('原始记录已备份') >= 0
            advance(page)
            assert page.locator('.vn-dock [data-choice^="intent:"]').count() == 2
            RESULT['cases'].append({'scene': 'v4.12-legacy-with-staged-history', 'status': 'PASS',
                                    'migratedCommands': len(modern), 'backups': len(keys)})
            print('PASS UI historical staged save migration', flush=True)
        finally:
            ctx.close()
    except Exception:
        RESULT['cases'].append({'scene': 'v4.12-legacy-with-staged-history', 'status': 'FAIL'})
        RESULT['errors'].append(traceback.format_exc())
        print('FAIL UI historical staged save migration', flush=True)
    browser.close()

RESULT['status'] = 'PASS' if not RESULT['errors'] and len(RESULT['cases']) == 17 else 'FAIL'
OUT.write_text(json.dumps(RESULT, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'status': RESULT['status'], 'cases': len(RESULT['cases']),
                  'failures': len(RESULT['errors'])}, ensure_ascii=False), flush=True)
if RESULT['errors']:
    print('\n'.join(RESULT['errors'][-2:]), flush=True)
if RESULT['status'] != 'PASS':
    raise SystemExit(1)
