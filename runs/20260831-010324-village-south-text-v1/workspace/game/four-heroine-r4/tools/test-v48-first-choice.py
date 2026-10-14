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
        assert p.locator('[data-page-next]').count() == 1
        for _ in range(7):p.locator('[data-page-next]').tap()
        assert p.locator('[data-page-next]').count() == 0, 'added useless next-page click'
        assert p.locator('.vn-frame').get_attribute('data-intro-decision') == 'true'
        assert p.locator('.vn-grip').count() == 0, 'fake dragging control returned'
        assert p.locator('.vn-dock [data-choice]').count() == 3
        # Wait for a visual CSS transition: touch rectangles must reflect final layout.
        p.wait_for_timeout(250)
        geometry=p.evaluate('''()=>{
          const area=document.querySelector('.vn-scroll');
          const dock=document.querySelector('.vn-dock');
          const text=document.querySelector('[data-beat="ENTRY_WAKE.intro.028"]');
          const ab=area.getBoundingClientRect(),tb=text.getBoundingClientRect(),db=dock.getBoundingClientRect();
          const visible=(a,b)=>Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
          return {
            finalNarrativeVisible:visible(ab,tb),bodyScrollHeight:area.scrollHeight,
            bodyViewportHeight:area.clientHeight,bodyScrollTop:area.scrollTop,
            dockFits:dock.scrollHeight<=dock.clientHeight+2,
            choices:[...dock.querySelectorAll('[data-choice]')].map(x=>({
              id:x.dataset.choice,height:x.getBoundingClientRect().height,
              visible:visible(db,x.getBoundingClientRect())
            })),overflow:document.documentElement.scrollWidth>innerWidth,
            stageCast:document.querySelector('.vn-stage')?.dataset.char,
            portrait:!!document.querySelector('.vn-stage .vn-portrait img')
          };
        }''')
        assert geometry['finalNarrativeVisible']>=45,('final plot cannot be read',geometry)
        assert geometry['bodyScrollHeight']>geometry['bodyViewportHeight']+20,'cannot review earlier lines'
        assert geometry['bodyScrollTop']>0,'first decision still starts at decorative headers'
        assert geometry['dockFits'],'three first options require another scroll'
        assert not geometry['overflow'],'horizontal viewport overflow'
        assert [x['id'] for x in geometry['choices']]==['canon','rescue','investigate']
        assert all(x['height']>=44 and x['visible']>=x['height']-2 for x in geometry['choices']),geometry
        if height>=780:
            assert geometry['stageCast']=='t' and geometry['portrait'],'main character not shown at the moment of choice'
        # Revisiting the opening text does not change any game commands.
        p.locator('.vn-scroll').evaluate('x=>{x.scrollTop=0}')
        assert p.locator('.vn-scroll').evaluate('x=>x.scrollTop') == 0
        assert p.evaluate('state.history.length') == 0
        p.locator('#menu').tap();p.locator('[data-nav="story"]').first.tap()
        assert p.locator('.vn-scroll').evaluate('x=>x.scrollTop') == 0,'lost voluntary scroll position'
        p.locator('.vn-dock [data-choice="'+route+'"]').tap()
        assert p.evaluate('state.history.length') == 1
        assert p.evaluate('state.history[0].id') == route
        assert p.locator('body').get_attribute('data-current') != 'ENTRY_WAKE'
        assert not errors,errors
        return {'viewport':f'{width}x{height}','selected':route,
                'visibleFinalNarrativePx':round(geometry['finalNarrativeVisible']),
                'allThreeVisible':True,'portraitShown':geometry['portrait'],
                'firstSevenPagesPreserved':True,'returnScroll':'PASS',
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
