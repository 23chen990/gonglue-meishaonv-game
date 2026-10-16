#!/usr/bin/env python3
"""Real-tap QA for the opening decision's legibility (320-430px).
NATIVE mode uses production Vite HTTP origin/localStorage; fixture mode uses an
injected DOM with simulated localStorage. Neither replaces human or device QA.
"""
from pathlib import Path
import hashlib, json, os, traceback
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
NATIVE = os.getenv('R4_MODE') == 'native'
URL = os.getenv('R4_REAL_URL', 'http://127.0.0.1:8765/index.html')
HTML = (ROOT/'index.html').read_text(encoding='utf-8')
STORY_SHA = hashlib.sha256((ROOT/'data/STORY.json').read_bytes()).hexdigest()
OUT = ROOT/'qa/current/v48-first-choice-report.json'
REPORT = {'sha': STORY_SHA,
          'scope': 'native HTTP Chromium' if NATIVE else 'fixture DOM/simulated storage',
          'cases': [], 'failures': []}
VIEWPORTS = [(320,568),(360,780),(375,812),(390,844),(430,932)]
SAVE_KEY = 'gonglue:revision-r4.5-portrait:canonical'

def visible_option_ids(p):
    # The player intentionally preserves the current presentation-only option
    # page across menu round-trips. Enumerate from page 1 before checking reachability.
    for _ in range(12):
        prev=p.locator('.mobile-options [data-mobile-options="-1"]:not([disabled])')
        if not prev.count():break
        prev.tap()
    found=[]
    for _ in range(12):
        for x in p.locator('.mobile-options [data-choice]').evaluate_all('els=>els.map(x=>x.dataset.choice)'):
            if x not in found:found.append(x)
        nxt=p.locator('.mobile-options [data-mobile-options="1"]:not([disabled])')
        if not nxt.count():break
        nxt.tap()
    return found

def seek_choice(p,id):
    # Return to the first presentation page when pagination controls exist.
    for _ in range(12):
        prev=p.locator('.mobile-options [data-mobile-options="-1"]:not([disabled])')
        if not prev.count():break
        prev.tap()
    for _ in range(12):
        if p.locator(f'.mobile-options [data-choice="{id}"]').count():return
        nxt=p.locator('.mobile-options [data-mobile-options="1"]:not([disabled])')
        if not nxt.count():break
        nxt.tap()
    raise AssertionError('choice not reachable: '+id)

def open_page(browser, width, height):
    ctx=browser.new_context(viewport={'width':width,'height':height},is_mobile=True,has_touch=True)
    page=ctx.new_page(); errors=[];page.set_default_timeout(6000)
    page.on('pageerror',lambda e:errors.append(str(e)))
    if NATIVE:
        rsp=page.goto(URL,wait_until='load');assert rsp and rsp.ok
    else:
        page.evaluate('''()=>{const s=new Map();window.__testStore=s;
        Object.defineProperty(window,'localStorage',{configurable:true,value:{
          getItem:k=>s.has(k)?s.get(k):null,setItem:(k,v)=>s.set(k,String(v)),removeItem:k=>s.delete(k)
        }})}''')
        page.set_content(HTML,wait_until='load')
    assert page.locator('meta[name="story-sha256"]').get_attribute('content') == STORY_SHA
    return ctx,page,errors

def hit(browser, width, height, route):
    ctx,p,errors = open_page(browser,width,height)
    try:
        assert p.locator('[data-choice]').count() == 0, 'first decision prematurely shown'
        source_ids=[]
        for i in range(120):
            if p.locator('[data-choice]').count():break
            assert p.locator('[data-page-next]').count() == 1, ('reader stalled',i)
            assert p.locator('.mobile-text .line').count() <= 1, 'multiple turns shown together'
            source_ids.append(p.locator('.vn-frame').get_attribute('data-source'))
            p.locator('[data-page-next]').tap()
        else:raise AssertionError('first decision never appeared')
        assert len(set(source_ids))==6,('opening source turns skipped',len(set(source_ids)))
        assert p.locator('[data-page-next]').count() == 0
        assert p.locator('.vn-grip').count() == 0, 'fake dragging control returned'
        ids=visible_option_ids(p)
        assert set(ids)=={'canon','rescue','investigate'},(width,height,ids)
        p.wait_for_timeout(120)
        geometry=p.evaluate('''()=> {
          const sheet=document.querySelector('.mobile-sheet'),opts=document.querySelector('.mobile-options');
          const sb=sheet.getBoundingClientRect(),ob=opts.getBoundingClientRect();
          const visible=(a,b)=>Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
          return {
            sheetHeight:sb.height,inner:innerHeight,
            dialogueBlocks:document.querySelectorAll('.mobile-text .line').length,
            dialogueOverflow:document.querySelector('.mobile-text').scrollHeight>document.querySelector('.mobile-text').clientHeight+2,
            optionOverflow:opts.scrollHeight>opts.clientHeight+2,
            choices:[...opts.querySelectorAll('[data-choice]')].map(x=>({
              id:x.dataset.choice,height:x.getBoundingClientRect().height,
              visible:visible(ob,x.getBoundingClientRect())
            })),
            overflow:document.documentElement.scrollWidth>innerWidth,
            portrait:!!document.querySelector('.mobile-stage .mobile-portrait img'),
            sceneCG:!!document.querySelector('.adv6-scene-photo')&&document.querySelector('.adv6-scene-photo').naturalWidth>0
          };
        }''')
        assert geometry['sheetHeight']<=height/4+2,(width,height,'dialogue sheet too tall',geometry)
        assert geometry['dialogueBlocks']<=1 and not geometry['dialogueOverflow'],geometry
        assert not geometry['optionOverflow'],'three first options require hidden scroll'
        assert not geometry['overflow'],'horizontal viewport overflow'
        assert all(x['height']>=44 and x['visible']>=x['height']-2 for x in geometry['choices']),geometry
        if height>=780:assert geometry['portrait'] or geometry['sceneCG'],'staged actor or piano CG missing at the moment of choice'
        assert p.evaluate('(k)=>JSON.parse(localStorage.getItem(k)).commands.length',SAVE_KEY) == 0
        p.locator('#menu').tap();p.locator('[data-nav="story"]').first.tap()
        assert set(visible_option_ids(p))=={'canon','rescue','investigate'},'choice state changed after menu round-trip'
        seek_choice(p,route)
        p.locator('.mobile-options [data-choice="'+route+'"]').tap()
        assert p.evaluate('(k)=>JSON.parse(localStorage.getItem(k)).commands.length',SAVE_KEY) == 1
        assert p.evaluate('(k)=>JSON.parse(localStorage.getItem(k)).commands[0].id',SAVE_KEY) == route
        assert p.locator('body').get_attribute('data-current') != 'ENTRY_WAKE'
        assert not errors,errors
        return {'viewport':f'{width}x{height}','selected':route,
                'openingSourceTurns':len(set(source_ids)),'allThreeVisible':True,
                'sceneVisualShown':geometry['portrait'] or geometry['sceneCG'],'dialogueSheetRatio':geometry['sheetHeight']/height,
                'firstActionExactlyOnce':True}
    finally:
        ctx.close()

with sync_playwright() as pl:
    launch={'headless':True}
    if Path('/usr/bin/chromium').is_file():
        launch.update(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    browser=pl.chromium.launch(**launch)
    try:
        for i,(w,h) in enumerate(VIEWPORTS):
            route=['canon','rescue','investigate'][i%3]
            try:
                result=hit(browser,w,h,route)
                REPORT['cases'].append({'status':'PASS','detail':result})
                print('PASS v4.8 first choice',result,flush=True)
            except Exception as e:
                REPORT['cases'].append({'status':'FAIL','viewport':f'{w}x{h}','route':route,'error':str(e)})
                REPORT['failures'].append(traceback.format_exc())
                print('FAIL v4.8 first choice',w,h,repr(e),flush=True)
    finally:
        browser.close()
OUT.parent.mkdir(parents=True,exist_ok=True)
OUT.write_text(json.dumps(REPORT,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
if REPORT['failures']:raise SystemExit(1)
