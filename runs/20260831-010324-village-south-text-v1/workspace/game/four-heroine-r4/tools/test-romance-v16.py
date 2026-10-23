#!/usr/bin/env python3
"""V16 true mobile-touch regression for early refusal and searching for missing USB."""
import os, json, traceback, sys
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
URL=os.getenv('R4_REAL_URL','http://127.0.0.1:8765/index.html')
OUT=ROOT/'qa/current/browser/romance-v16'
OUT.mkdir(parents=True,exist_ok=True)
report={'scope':'real HTTP touch Chromium/WebKit, not physical phone','cases':[]}

def tap(page,attr,value):
    target=page.locator('['+attr+'="'+value+'"]').first
    assert target.count()==1,(attr,value,page.locator('#app').inner_text()[-280:])
    target.tap(timeout=10000)

def until(page,selector,limit=120):
    for _ in range(limit):
        if page.locator(selector).count():return
        for action in ('[data-reply-next]','[data-page-next]','[data-v9-next="after"]','[data-v10-next="payoff"]'):
            if page.locator(action).count():
                page.locator(action).first.tap()
                break
        else:
            raise AssertionError(('stuck before',selector,page.locator('#app').inner_text()[-400:]))
    raise AssertionError('step limit '+selector)

def opening(page):
    assert page.goto(URL,wait_until='load').ok
    assert page.locator('[data-current-io="reader"]').count()==1
    for action in ('next','next','next','badge','next','next'):
        tap(page,'data-io',action)
    assert page.locator('[data-current-io="crisis"]').count()==1
    ids=page.locator('[data-io]').evaluate_all('es=>es.map(e=>e.dataset.io)')
    assert ids==['next','canon'],ids

def run_case(browser,engine,kind):
    viewport={'width':320,'height':568} if kind=='refusal' else {'width':390,'height':844}
    ctx=browser.new_context(viewport=viewport,is_mobile=True,has_touch=True)
    page=ctx.new_page()
    errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    try:
        opening(page)
        if kind=='refusal':
            tap(page,'data-io','canon')
            result=page.evaluate('()=>({from:state.history[0]?.from,id:state.history[0]?.id,won:state.f.first_win,finished:io.finished,size:state.history.length})')
            assert result=={'from':'ENTRY_WAKE','id':'canon','won':False,'finished':True,'size':1},result
            until(page,'[data-follow-scene="ENTRY_CLUES"]')
            label=page.locator('[data-if-pick="obey"]').inner_text()
            assert '签了' in label and '不能乱签' not in label,label
            tap(page,'data-if-pick','obey')
            assert page.evaluate('state.f.canon_signed_blame') is True
            until(page,'[data-v10-kind="payoff"]')
            line=page.locator('.v9-cinema .mobile-text').inner_text().strip()
            assert '认了' in line,line
            if engine=='chromium':page.screenshot(path=str(OUT/'refusal-blame.png'))
            page.reload(wait_until='load')
            assert page.evaluate('state.f.canon_signed_blame') is True
            assert page.locator('[data-v10-kind="payoff"]').count()==1
            output={'canonical':'ENTRY_WAKE/canon','signedBlame':True,'response':line}
        else:
            tap(page,'data-io','next')
            assert page.locator('[data-current-io="hunt"]').count()==1
            tap(page,'data-io','move')
            for _ in range(2):tap(page,'data-io','next')
            assert page.locator('[data-current-io="final"]').count()==1
            line=page.locator('.io-sheet .mobile-text').inner_text()
            assert '原版盘还没找到' in line and '盘在我手里' not in line,line
            ids=page.locator('[data-io]').evaluate_all('es=>es.map(e=>e.dataset.io)')
            assert set(ids)=={'canon','backsearch'},ids
            tap(page,'data-io','backsearch')
            tap(page,'data-io','usb')
            tap(page,'data-io','back')
            tap(page,'data-io','move')
            for _ in range(2):tap(page,'data-io','next')
            ids=page.locator('[data-io]').evaluate_all('es=>es.map(e=>e.dataset.io)')
            assert set(ids)=={'rescue','investigate','canon'},ids
            tap(page,'data-io','rescue')
            assert page.evaluate('state.history.length')==1
            until(page,'[data-follow-scene="COLD"]')
            tap(page,'data-if-pick','t')
            assert page.evaluate('state.f.first_win') is True
            output={'noUsb':'backsearch','withUsb':'rescue','firstWin':True}
            if engine=='chromium':page.screenshot(path=str(OUT/'search-rescue.png'))
        assert not errors,errors
        return output
    finally:ctx.close()

with sync_playwright() as pw:
    for engine in ['chromium']+(['webkit'] if os.getenv('R4_WEBKIT')=='1' else []):
        opts={'headless':True,'args':['--no-sandbox']} if engine=='chromium' else {'headless':True}
        if engine=='chromium' and os.getenv('R4_CHROMIUM_EXECUTABLE'):
            opts['executable_path']=os.getenv('R4_CHROMIUM_EXECUTABLE')
        browser=getattr(pw,engine).launch(**opts)
        for kind in ['refusal','search']:
            try:
                result=run_case(browser,engine,kind)
                report['cases'].append({'name':engine+'-'+kind,'status':'PASS','detail':result})
                print('PASS',engine,kind,result,flush=True)
            except Exception as err:
                report['cases'].append({'name':engine+'-'+kind,'status':'FAIL','error':repr(err)})
                print('FAIL',engine,kind,repr(err),flush=True)
                traceback.print_exc()
        browser.close()
report['status']='PASS' if all(x['status']=='PASS' for x in report['cases']) else 'FAIL'
(ROOT/'qa/current/romance-v16-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
if report['status']!='PASS':sys.exit(1)
