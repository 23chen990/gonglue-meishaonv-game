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
 actual=page.locator('.io-vn').get_attribute('data-current-io')
 if actual!=name:
  diagnostic=page.evaluate("""()=>{const raw=localStorage.getItem('gonglue:revision-r4.5-portrait:canonical');let parsed=null,reason='';try{parsed=raw?JSON.parse(raw):null}catch(e){reason=String(e)};return {rawLength:raw?.length??0,storedStep:parsed?.ui?.firstNight?.step??null,storedHash:parsed?.storyHash??null,storedCommands:parsed?.commands?.length??null,notice:document.body.innerText.slice(0,180),hasSaveBlocked:typeof saveBlocked!=='undefined'?saveBlocked:null,lastRawLength:typeof lastRaw!=='undefined'?lastRaw?.length:null,parseError:reason}}""")
  raise AssertionError((name,actual,diagnostic))
 box=page.evaluate("""()=>{
  const sheet=document.querySelector('.io-sheet'),txt=document.querySelector('.io-sheet .mobile-text');
  const sh=sheet.getBoundingClientRect();
  return {sheet:sh.height,vh:innerHeight,scroll:txt.scrollHeight,client:txt.clientHeight,
  blocks:txt.querySelectorAll('.line').length,text:txt.innerText,
  voiceVisible:(()=>{const s=sheet.querySelector('.mobile-speaker'),r=s.getBoundingClientRect(),c=getComputedStyle(s);return c.display!=='none'&&c.visibility==='visible'&&r.width>0&&r.height>0})(),
  textVisible:(()=>{const p=txt.querySelector('.line p'),r=p?.getBoundingClientRect(),t=txt.getBoundingClientRect(),c=getComputedStyle(txt),pc=p&&getComputedStyle(p);return !!p&&c.display!=='none'&&c.visibility==='visible'&&pc.visibility==='visible'&&r.width>0&&r.height>0&&r.top>=t.top-2&&r.bottom<=t.bottom+2})(),
  buttons:[...document.querySelectorAll('.io-vn button')].map(e=>({
  label:e.innerText,height:e.getBoundingClientRect().height}))};
 }""")
 assert box['sheet']<=box['vh']/3+3,('sheet too big',box)
 assert box['scroll']<=box['client']+3,('overflow in dialogue',box)
 assert box['blocks']==1,('multiple speakers per page',box)
 assert box['voiceVisible'] and box['textVisible'],('actual dialogue hidden in live CSS, not accepted',box)
 assert all(b['height']>=43 for b in box['buttons']),('small tap target',box)
 assert len(box['text'])<=44,('long novel paragraph remained in opening',box)
 assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+2'),'horizontal overflow'
 return box
with sync_playwright() as pw:
 names=['chromium']+(['webkit'] if os.environ.get('R4_WEBKIT')=='1' else [])
 for name in names:
  kwargs={'headless':True,'args':['--no-sandbox']} if name=='chromium' else {'headless':True}
  if name=='chromium' and os.environ.get('R4_CHROMIUM_EXECUTABLE'):kwargs['executable_path']=os.environ['R4_CHROMIUM_EXECUTABLE']
  browser=getattr(pw,name).launch(**kwargs)
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
     step(page,'spotlight')
     assert page.locator('.io-sheet .mobile-speaker').inner_text().strip()=='唐映雪'
     assert page.locator('.io-film[data-io-shot="singer"] .io-film-image').count()==1
     assert page.locator('.io-stage .io-film-image').count()==1, 'single full event shot required'
     assert page.locator('.io-person,.io-badge-art,.io-theatre-art,.io-box').count()==0, 'fake character/prop layers forbidden'
     assert page.locator('.io-film-image').evaluate('e=>e.complete && e.naturalWidth>0'), 'event shot failed to load'
     if page.locator('.io-vn.io-cg-ready').count():
      assert page.locator('.io-film-image').evaluate('e=>e.naturalWidth>=1024 && e.naturalHeight>=1500'),'new CG master below candidate native density'
     if width==390:page.screenshot(path=str(OUT/(name+'-spotlight-390.png')))
     click(page,'next');step(page,'wake');assert page.locator('[data-io]').count()==1
     if width==390:page.screenshot(path=str(OUT/(name+'-welcome-390.png')))
     click(page,'next');reaction=step(page,'badge')['text']
     assert '许照' in reaction and reaction != '工牌？我什么时候成了这里的场务？'
     click(page,'badge');step(page,'crisis')
     click(page,'next');step(page,'hunt')
     if page.locator('.io-vn.io-cg-ready').count():
      assert page.locator('.io-film[data-io-shot="console"]').count()==1
      targets=page.locator('.io-hotspot').evaluate_all('els=>els.map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}})')
      assert len(targets)==3 and len(set(t['x'] for t in targets))>1 and len(set(t['y'] for t in targets))>1,('still stacked fake investigation buttons',targets)
      assert all(t['w']>=44 and t['h']>=44 for t in targets),('hotspots too small',targets)
     assert page.locator('[data-io="move"]').count()==1,'player must be allowed to decide before finding the USB'
     # A stage tap without a labelled hotspot must not skip the investigation.
     page.locator('.io-stage').tap(position={'x': 8, 'y': 150})
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
     click(page,'move');step(page,'pressure')
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
     # A canonical reply may appear before the next scene. When it ends,
     # the playable director must resume, not drop into a three-paragraph novel.
     after_seen=[]
     for _ in range(45):
      if page.locator('.v9-cinema[data-v9-kind="after"]').count():
       after_seen.append(page.locator('.v9-cinema').get_attribute('data-v9-shot'))
       assert page.locator('.v9-cinema .mobile-text').inner_text().strip()
       assert page.locator('.v9-cinema .mobile-speaker').inner_text().strip()
       page.locator('[data-v9-next="after"]').tap()
      elif page.locator('.io-follow').count():break
      elif page.locator('[data-page-next]').count():page.locator('[data-page-next]').first.tap()
      elif page.locator('[data-reply-next]').count():page.locator('[data-reply-next]').first.tap()
      else:raise AssertionError(('post-fork lost interactive controls',fork,page.locator('#app').inner_text()[-400:]))
     else:raise AssertionError(('post-fork dialogue stalled',fork))
     assert len(after_seen)==2 and after_seen=={'canon':['stage','console'],'rescue':['singerBond','console'],'investigate':['shen','stage']}[fork],('post-fork image consequences absent',fork,after_seen)
     assert page.locator('.io-follow .line').count()==1
     assert page.locator('.io-follow .mobile-text').evaluate('x=>x.scrollHeight<=x.clientHeight+2')
     if width==390:page.screenshot(path=str(OUT/(name+'-follow-390.png')))
     second={'canon':'refuse','rescue':'t','investigate':'camera'}[fork]
     assert page.locator('[data-if-pick="'+second+'"]').count()==1,('missing playable post-fork choice',fork,second)
     page.locator('[data-if-pick="'+second+'"]').first.tap()
     raw=json.loads(page.evaluate('(key)=>localStorage.getItem(key)',KEY))
     assert len(raw['commands'])==2 and raw['commands'][1]['from']=={'canon':'ENTRY_CLUES','rescue':'COLD','investigate':'ENTRY_MEMORY'}[fork]
     assert raw['commands'][1]['id']==second
     assert page.locator('[data-v10-next="payoff"]').count()<=1
     assert not errors,errors
     return {'viewport':f'{width}x{height}','personalResponse':tone,'relationshipApproach':ally,'firstCanonicalFork':fork,'postFork':second,'canonicalCommands':len(raw['commands'])}
    finally:ctx.close()
   verify(f'{name}-{width}x{height}',scene_test)
  browser.close()
report['status']='PASS' if all(x['status']=='PASS' for x in report['cases']) else 'FAIL'
(ROOT/'qa/current/first-night-interactive-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
if report['status']!='PASS':raise SystemExit(1)