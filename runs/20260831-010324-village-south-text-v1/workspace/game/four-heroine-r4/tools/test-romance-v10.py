#!/usr/bin/env python3
"""V10: real effect, deliberate loss, meaningful choices and no fake affinity.
HTTP Chromium/WebKit in CI; explicit R4_LOCAL_HTML is a weaker sandbox smoke only.
"""
import os,json,traceback,sys
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
URL=os.getenv('R4_REAL_URL','http://127.0.0.1:8765/index.html')
LOCAL=os.getenv('R4_LOCAL_HTML')
OUT=ROOT/'qa/current/browser/romance-v10';OUT.mkdir(parents=True,exist_ok=True)
KEY='gonglue:revision-r4.5-portrait:canonical'
CASES=[('sign','obey',False),('refuse','refuse',False),('witness','witness',False),('rescue','t',True),('investigate','camera',True)]
report={'mode':'local-set-content' if LOCAL else 'real-http','cases':[]}
def tap(page,key,value):
 q=page.locator(f'[{key}="{value}"]').first
 assert q.count()==1,('missing action',key,value,page.locator('#app').inner_text()[-250:])
 q.tap(timeout=9000)
def move_to(page,predicate,limit=80):
 for _ in range(limit):
  if predicate():return
  if page.locator('[data-reply-next]').count():page.locator('[data-reply-next]').first.tap()
  elif page.locator('[data-page-next]').count():page.locator('[data-page-next]').first.tap()
  elif page.locator('[data-v9-next="after"]').count():tap(page,'data-v9-next','after')
  elif page.locator('[data-v10-next="payoff"]').count():tap(page,'data-v10-next','payoff')
  else:raise AssertionError('cannot advance: '+page.locator('#app').inner_text()[-380:])
 raise AssertionError('step budget exceeded')
def play(browser,name,scenario,second,need_usb):
 w,h=(320,568) if scenario=='sign' else (390,844)
 ctx=browser.new_context(viewport={'width':w,'height':h},is_mobile=True,has_touch=True)
 page=ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 try:
  if LOCAL:
   page.goto('about:blank')
   page.evaluate('''()=>{const map=new Map();Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k),clear:()=>map.clear()}})}''')
   page.set_content(Path(LOCAL).read_text(encoding='utf-8'),wait_until='load')
  else:assert page.goto(URL,wait_until='load').ok
  assert page.locator('.io-vn[data-current-io="reader"]').count()==1, 'new player must first see the book'
  for action in ['next','next','next','badge','next','next','next']:tap(page,'data-io',action)
  assert page.locator('.io-vn[data-current-io="hunt"]').count()==1
  assert page.locator('[data-io="move"]').count()==1
  if need_usb:
   tap(page,'data-io','usb');tap(page,'data-io','back')
  tap(page,'data-io','move')
  for a in ('next','next'):tap(page,'data-io',a)
  assert page.locator('.io-vn[data-current-io="final"]').count()==1
  choices=page.locator('[data-io]').evaluate_all('els=>els.map(x=>x.dataset.io)')
  if need_usb:
   assert set(choices)=={'canon','rescue','investigate'},choices
  else:
   assert set(choices)=={'canon','backsearch'},choices
   assert page.locator('[data-io="rescue"]').count()==0
  if scenario in ('sign','refuse','witness'):
   tap(page,'data-io','canon')
   move_to(page,lambda:page.locator('.io-follow[data-follow-scene="ENTRY_CLUES"]').count()==1)
   assert page.evaluate('state.f.first_win')==False
   buttons=page.locator('[data-if-pick]').evaluate_all('els=>els.map(x=>x.innerText)')
   assert len(buttons)==3 and '签' in ''.join(buttons)
   tap(page,'data-if-pick',second)
   v={'obey':['canon_signed_blame',True],'refuse':['source_declined_handover',True],'witness':['source_original_timeline',True]}[second]
   assert page.evaluate('(key)=>state.f[key]',v[0])==v[1],(scenario,v)
  elif scenario=='rescue':
   tap(page,'data-io','rescue')
   move_to(page,lambda:page.locator('.io-follow[data-follow-scene="COLD"]').count()==1)
   tap(page,'data-if-pick','t')
   assert page.evaluate('state.f.first_win')==True
  else:
   tap(page,'data-io','investigate')
   move_to(page,lambda:page.locator('.io-follow[data-follow-scene="ENTRY_MEMORY"]').count()==1)
   tap(page,'data-if-pick','camera')
   assert page.evaluate('state.f.source_pre_switch_timestamp')==True
  move_to(page,lambda:page.locator('.v9-cinema[data-v10-kind="payoff"]').count()==1)
  consequence=page.locator('.v9-cinema .mobile-text').inner_text().strip()
  assert consequence and len(consequence)<=40,consequence
  pos=page.locator('.io-sheet').bounding_box()
  assert pos['height']<=h/3+2,pos
  assert page.locator('.io-film-image').evaluate('i=>i.complete&&i.naturalWidth>=1024')
  if name=='chromium':page.screenshot(path=str(OUT/f'{scenario}-{w}x{h}.png'))
  if not LOCAL and scenario=='sign':
   page.reload(wait_until='load')
   assert page.locator('.v9-cinema[data-v10-kind="payoff"]').count()==1,'negative consequence lost on refresh'
  tap(page,'data-v10-next','payoff')
  assert page.locator('.v9-cinema[data-v10-kind="payoff"]').count()==0
  raw=json.loads(page.evaluate('(key)=>localStorage.getItem(key)',KEY))
  assert raw['commands'][-1]['id']==second
  assert raw['ui']['causalityV10']['pending'] is None
  assert not errors,errors
  return {'viewport':f'{w}x{h}','storyAction':second,'consequence':consequence,'engineRevision':len(raw['commands'])}
 finally:ctx.close()
with sync_playwright() as pw:
 for engine in ['chromium']+(['webkit'] if os.getenv('R4_WEBKIT')=='1' else []):
  kwargs={'headless':True,'args':['--no-sandbox']} if engine=='chromium' else {'headless':True}
  if engine=='chromium' and os.getenv('R4_CHROMIUM_EXECUTABLE'):kwargs['executable_path']=os.getenv('R4_CHROMIUM_EXECUTABLE')
  browser=getattr(pw,engine).launch(**kwargs)
  for scenario,second,needs in CASES:
   try:
    detail=play(browser,engine,scenario,second,needs)
    report['cases'].append({'name':engine+'-'+scenario,'status':'PASS','detail':detail});print('PASS',engine,scenario,detail['consequence'],flush=True)
   except Exception as exc:
    report['cases'].append({'name':engine+'-'+scenario,'status':'FAIL','error':repr(exc)})
    print('FAIL',engine,scenario,repr(exc),flush=True);traceback.print_exc()
  browser.close()
report['status']='PASS' if all(x['status']=='PASS' for x in report['cases']) else 'FAIL'
(ROOT/'qa/current/romance-v10-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
if report['status']!='PASS':sys.exit(1)