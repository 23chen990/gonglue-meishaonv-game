#!/usr/bin/env python3
"""Real HTTP browser acceptance for the *default* playable first-night experience.
The canonical-only ?qa=canonical reader is tested by legacy graph suites separately.
This is not a physical-phone or adult blind-play test.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import os,json,hashlib,traceback
ROOT=Path(__file__).resolve().parent.parent
URL=os.environ.get('R4_REAL_URL','http://127.0.0.1:8765/index.html').split('?')[0]
KEY='gonglue:revision-r4.5-portrait:canonical'
H=hashlib.sha256((ROOT/'data/STORY.json').read_bytes()).hexdigest()
OUT=ROOT/'qa/current/browser/first-night'
OUT.mkdir(parents=True,exist_ok=True)
report={'url':URL,'head':os.environ.get('GITHUB_SHA'),'scope':'real HTTP touch Chromium/WebKit, not physical device','cases':[]}
def verify(name,cb):
 try:
  detail=cb()
  report['cases'].append({'name':name,'status':'PASS','detail':detail})
  print('PASS',name,flush=True)
 except Exception as exc:
  report['cases'].append({'name':name,'status':'FAIL','error':repr(exc)})
  print('FAIL',name,repr(exc),flush=True)
  traceback.print_exc()
def click(page,action):
 target=page.locator('[data-io="'+action+'"]').first
 assert target.count()==1,('missing choice',action,page.locator('body').inner_text()[-450:])
 target.tap(timeout=7000)
def step(page,name):
 assert page.locator('.io-vn').count()==1,('opening disappeared too early',name)
 assert page.locator('.io-vn').get_attribute('data-current-io')==name,(name,page.locator('.io-vn').get_attribute('data-current-io'))
 box=page.evaluate("""()=>{
  const sheet=document.querySelector('.io-sheet'),txt=document.querySelector('.io-sheet .mobile-text');
  const sh=sheet.getBoundingClientRect();
  return {sheet:sh.height,vh:innerHeight,scroll:txt.scrollHeight,client:txt.clientHeight,
  blocks:txt.querySelectorAll('.line').length,text:txt.innerText,buttons:[...document.querySelectorAll('.io-vn button')].map(e=>({
  label:e.innerText,height:e.getBoundingClientRect().height}))};
 }""")
 assert box['sheet']<=box['vh']/3+3,('sheet too big',box)
 assert box['scroll']<=box['client']+3,('overflow in dialogue',box)
 assert box['blocks']==1,('multiple speakers per page',box)
 assert all(b['height']>=43 for b in box['buttons']),('small tap target',box)
 assert len(box['text'])<100,('novel paragraph remained',box)
 assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+2'),'horizontal overflow'
 return box
with sync_playwright() as pw:
 names=['chromium']+(['webkit'] if os.environ.get('R4_WEBKIT')=='1' else [])
 for name in names:
  browser=getattr(pw,name).launch(**({'headless':True,'args':['--no-sandbox']} if name=='chromium' else {'headless':True}))
  for width,height,tone,ally,fork in [
   (320,568,'help','shen','rescue'),(360,780,'steady','tang','investigate'),
   (375,812,'confused','solo','canon'),(390,844,'help','tang','canon'),
   (430,932,'steady','shen','rescue')
  ]:
   def scene_test(width=width,height=height,tone=tone,ally=ally,fork=fork,name=name):
    ctx=browser.new_context(viewport={'width':width,'height':height},is_mobile=True,has_touch=True)
    page=ctx.new_page();page.set_default_timeout(8000);errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    try:
     assert page.goto(URL,wait_until='load').ok
     assert page.locator('meta[name="story-sha256"]').get_attribute('content')==H
     step(page,'wake');assert page.locator('[data-io]').count()==3
     if width==390:page.screenshot(path=str(OUT/(name+'-welcome-390.png')))
     click(page,tone);reaction=step(page,'answer')['text']
     assert reaction != '许照！你能听见我说话吗？'
     click(page,'next');step(page,'badge');click(page,'badge');step(page,'badge-read')
     click(page,'next');step(page,'alarm');click(page,'next');step(page,'crisis')
     click(page,'next');step(page,'ask');click(page,ally);step(page,'ask-answer')
     click(page,'next');step(page,'hunt')
     assert page.locator('[data-io="move"]').count()==0,'USB discovery was auto-completed'
     # A stage tap without a labelled hotspot must not skip the investigation.
     page.locator('.io-corner').tap()
     step(page,'hunt')
     if width==390:page.screenshot(path=str(OUT/(name+'-investigate-390.png')))
     for item in ['board','sheet','usb']:
      click(page,item);step(page,'find');click(page,'back');step(page,'hunt')
     assert page.locator('[data-io="move"]').count()==1
     raw=json.loads(page.evaluate('(key)=>localStorage.getItem(key)',KEY))
     assert raw['commands']==[],('UI choices were falsely added to canonical history',raw['commands'])
     assert set(raw['ui']['firstNight']['seen'])=={'usb','sheet','board'}
     # Mobile native storage, reload and menu handoff retain object & dialogue choices.
     page.locator('#menu').tap()
     page.locator('[data-nav="story"]').first.tap()
     step(page,'hunt')
     page.reload(wait_until='load')
     step(page,'hunt')
     click(page,'move');step(page,'confront')
     click(page,'ask');step(page,'confront-answer')
     click(page,'next');step(page,'bond')
     click(page,'next');step(page,'final')
     assert page.locator('[data-io]').count()==3
     if width==390:page.screenshot(path=str(OUT/(name+'-decision-390.png')))
     click(page,fork)
     assert page.locator('.io-vn').count()==0
     assert page.locator('body').get_attribute('data-current')=={'canon':'ENTRY_CLUES','rescue':'COLD','investigate':'ENTRY_MEMORY'}[fork]
     raw=json.loads(page.evaluate('(key)=>localStorage.getItem(key)',KEY))
     assert len(raw['commands'])==1 and raw['commands'][0]['from']=='ENTRY_WAKE' and raw['commands'][0]['id']==fork
     assert raw['ui']['firstNight']['finished']
     assert not errors,errors
     return {'viewport':f'{width}x{height}','personalResponse':tone,'relationshipApproach':ally,'firstCanonicalFork':fork,'oneRealCommand':True}
    finally:ctx.close()
   verify(f'{name}-{width}x{height}',scene_test)
  browser.close()
report['status']='PASS' if all(x['status']=='PASS' for x in report['cases']) else 'FAIL'
(ROOT/'qa/current/first-night-interactive-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
if report['status']!='PASS':raise SystemExit(1)
