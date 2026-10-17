#!/usr/bin/env python3
"""First-night emotional payoff and four heroine introductions in a real mobile browser.
Never edits canonical story, grants invented affinity, or treats synthetic play as human QA.
"""
import os,sys,json,traceback
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
URL=os.environ.get('R4_REAL_URL','http://127.0.0.1:8765/index.html')
LOCAL=os.environ.get('R4_LOCAL_HTML')
KEY='gonglue:revision-r4.5-portrait:canonical'
OUT=ROOT/'qa/current/browser/romance-v9';OUT.mkdir(parents=True,exist_ok=True)
report={'mode':'set_content-local' if LOCAL else 'real-http','url':URL if not LOCAL else 'injected-inline-file','cases':[]}
ROUTES=[('t','rescue',None,'t','flirt'),('s','rescue',None,'s','slow'),('l','investigate','camera','l','work'),('g','investigate','email','g','flirt')]

def click(page,attr,value):
 q=page.locator('['+attr+'="'+value+'"]').first
 assert q.count()==1,(attr,value,'missing',page.locator('body').inner_text()[-250:])
 q.tap(timeout=8000)

def check_vn(page):
 box=page.locator('.v9-cinema'); assert box.count()==1
 r=box.evaluate('''e=>{let s=e.querySelector('.io-sheet'),t=e.querySelector('.mobile-text'),p=t.querySelector('p'),v=e.querySelector('.mobile-speaker'),q=p.getBoundingClientRect(),z=t.getBoundingClientRect(),h=s.getBoundingClientRect();return {h:h.height,viewport:innerHeight,scroll:t.scrollHeight,client:t.clientHeight,text:p.innerText,voice:v.innerText,font:getComputedStyle(p).fontSize,visible:q.top>=z.top-2&&q.bottom<=z.bottom+2,overflow:document.documentElement.scrollWidth>innerWidth+2}}''')
 assert r['voice'] and r['text'] and len(r['text'])<=38,r
 assert r['visible'] and r['scroll']<=r['client']+3 and r['h']<=r['viewport']/3+3,r
 assert not r['overflow'],r
 assert box.locator('.io-film-image').evaluate('x=>x.complete&&x.naturalWidth>=1024'), 'new CG not loaded'
 return r

def forward_to(page,goal,limit=60):
 for _ in range(limit):
  if goal(page):return
  if page.locator('[data-page-next]').count():page.locator('[data-page-next]').first.tap()
  elif page.locator('[data-reply-next]').count():page.locator('[data-reply-next]').first.tap()
  elif page.locator('[data-v10-next="payoff"]').count():page.locator('[data-v10-next="payoff"]').tap()
  elif page.locator('.v9-cinema[data-v9-kind="after"]').count():page.locator('[data-v9-next="after"]').first.tap()
  else:raise AssertionError(('cannot advance to next playable scene',page.locator('body').get_attribute('data-current'),page.locator('#app').inner_text()[-400:]))
 raise AssertionError('advance limit exceeded')

def one_case(browser,name,who,fork,memory,second,response):
 width,height=(320,568) if who in ('s','g') else (390,844)
 ctx=browser.new_context(viewport={'width':width,'height':height},is_mobile=True,has_touch=True)
 page=ctx.new_page();page.set_default_timeout(9000);errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 try:
  if LOCAL:
   page.goto('about:blank')
   page.evaluate('''()=>{const d=new Map();Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>d.get(k)??null,setItem:(k,v)=>d.set(k,String(v)),removeItem:k=>d.delete(k),clear:()=>d.clear()}})}''')
   page.set_content(Path(LOCAL).read_text(encoding='utf-8'),wait_until='load')
  else: assert page.goto(URL,wait_until='load').ok
  assert page.locator('.io-vn[data-current-io="spotlight"]').count()==1
  for a in ('next','next','badge','next','usb','back','move','next','next',fork):click(page,'data-io',a)
  assert page.locator('body').get_attribute('data-current')=={'rescue':'COLD','investigate':'ENTRY_MEMORY'}[fork]
  # Canonical reply remains visible before the director's two post-choice beats.
  forward_to(page,lambda p:p.locator('.v9-cinema[data-v9-kind="after"]').count()==1)
  assert check_vn(page)['text']
  shot0=page.locator('.v9-cinema').get_attribute('data-v9-shot')
  if not LOCAL and who=='t':
   page.reload(wait_until='load')
   assert page.locator('.v9-cinema').get_attribute('data-v9-shot')==shot0,'mid-response save lost'
  click(page,'data-v9-next','after')
  shot1=page.locator('.v9-cinema').get_attribute('data-v9-shot')
  check_vn(page)
  assert [shot0,shot1]=={'rescue':['singerBond','console'],'investigate':['shen','stage']}[fork]
  click(page,'data-v9-next','after')
  assert page.locator('.v9-cinema[data-v9-kind="after"]').count()==0
  first=page.locator('body').get_attribute('data-current')
  if memory:
   assert first=='ENTRY_MEMORY'
   assert page.locator('[data-if-pick="'+memory+'"]').count()==1
   click(page,'data-if-pick',memory)
   forward_to(page,lambda p:p.locator('.io-follow[data-follow-scene="COLD"]').count()==1)
  assert page.locator('body').get_attribute('data-current')=='COLD'
  click(page,'data-if-pick',second)
  forward_to(page,lambda p:p.locator('.io-follow[data-follow-scene="OP_SETTLE"]').count()==1)
  click(page,'data-if-pick','backup')
  forward_to(page,lambda p:p.locator('.v9-cinema[data-v9-kind="talk"]').count()==1)
  assert page.locator('body').get_attribute('data-current')=='OP_TALK_'+who
  a=check_vn(page)
  assert page.locator('[data-v9-next="talk"]').count()==1
  assert page.locator('[data-if-pick]').count()==0,'early choice leaks into first dialogue'
  if who=='t':page.screenshot(path=str(OUT/(name+'-t-intro.png')))
  click(page,'data-v9-next','talk')
  b=check_vn(page)
  assert a['text']!=b['text']
  assert page.locator('[data-v9-next="talk"]').count()==0
  assert page.locator('[data-if-pick]').count()==3
  buttons=page.locator('[data-if-pick]').evaluate_all('es=>es.map(x=>x.getBoundingClientRect().height)')
  assert all(x>=43 for x in buttons),buttons
  if not LOCAL and who=='t':
   page.reload(wait_until='load')
   assert page.locator('[data-if-pick]').count()==3,'choice stage not restored'
   page.screenshot(path=str(OUT/(name+'-t-choice.png')))
  click(page,'data-if-pick',response)
  raw=json.loads(page.evaluate('k=>localStorage.getItem(k)',KEY))
  assert raw['commands'][-1]['from']=='OP_TALK_'+who
  assert raw['commands'][-1]['id']==response
  assert raw['ui']['emotionV9']['talkSeen']['OP_TALK_'+who+':'+str(len(raw['commands'])-1)]
  assert not errors,errors
  return {'heroine':who,'firstFork':fork,'scene':'OP_TALK_'+who,'realChoice':response,'canonicalHistory':len(raw['commands']),'heroineIntro':[a['text'],b['text']],'device':f'{width}x{height}'}
 finally:ctx.close()

with sync_playwright() as pw:
 engines=['chromium']+(['webkit'] if os.environ.get('R4_WEBKIT')=='1' else [])
 for name in engines:
  kwargs={'headless':True,'args':['--no-sandbox']} if name=='chromium' else {'headless':True}
  if name=='chromium' and os.environ.get('R4_CHROMIUM_EXECUTABLE'):kwargs['executable_path']=os.environ['R4_CHROMIUM_EXECUTABLE']
  browser=getattr(pw,name).launch(**kwargs)
  for args in ROUTES:
   try:
    result=one_case(browser,name,*args);report['cases'].append({'name':name+'-'+args[0],'status':'PASS','detail':result});print('PASS',name,args[0],flush=True)
   except Exception as e:
    report['cases'].append({'name':name+'-'+args[0],'status':'FAIL','error':repr(e)});print('FAIL',name,args[0],repr(e),flush=True);traceback.print_exc()
  browser.close()
report['status']='PASS' if all(x['status']=='PASS' for x in report['cases']) else 'FAIL'
(ROOT/'qa/current/romance-v9-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
if report['status']!='PASS':sys.exit(1)