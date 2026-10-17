#!/usr/bin/env python3
"""Rendered, real-engine dating-episode audit. No fabricated story state.

The CI runs on real localhost HTTP. Local Chromium policy sometimes blocks all
loopback requests; R4_LOCAL_HTML=/path/play.html uses the exact same generated
HTML in an about:blank document for an additional non-HTTP smoke test.
"""
import os,json,sys,traceback
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
RULES=json.loads((ROOT/'tools/romance-v13-scenes.json').read_text())['scenes']
FIX=json.loads((ROOT/'qa/current/romance-v13-fixtures.json').read_text())['fixtures']
KEY='gonglue:revision-r4.5-portrait:canonical'
URL=os.getenv('R4_REAL_URL','http://127.0.0.1:8765/index.html').split('?')[0]+'?qa=legacy-reader'
LOCAL=os.getenv('R4_LOCAL_HTML')
OUT=ROOT/'qa/current/browser/romance-v13';OUT.mkdir(parents=True,exist_ok=True)
RISK={'t02':'fan','t07':'refuse','s02':'promise','s06':'dismiss','s07':'compare','l02':'rival','l06':'ban','l07':'control','l08':'stay','g02':'leverage','g06':'deny','g07':'excuse'}
IDS=sorted(RULES, key=lambda x:('tslg'.index(x[0]),int(x[1:])))
ONE=os.getenv('V13_SCENE')
if ONE:IDS=[x for x in IDS if x==ONE]
LIMIT=int(os.getenv('V13_LIMIT','0'))
if LIMIT:IDS=IDS[:LIMIT]
HTML=Path(LOCAL).read_text(encoding='utf8') if LOCAL else None
REPORT={'mode':'local-injected' if LOCAL else 'real-http','results':[]}

def first(page,selector):
 q=page.locator(selector).first
 assert q.count()==1,('missing clickable control',selector,page.locator('#app').inner_text()[-350:])
 q.tap(timeout=15000)

def one_case(browser,engine,scene,w,h):
 context=browser.new_context(viewport={'width':w,'height':h},is_mobile=True,has_touch=True)
 page=context.new_page();errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 raw=json.dumps(FIX[scene],ensure_ascii=False)
 try:
  if HTML:
   page.goto('about:blank?qa=legacy-reader')
   page.evaluate('''args=>{const store=new Map([[args.k,args.v]]);Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k),clear:()=>store.clear()}})}''',{'k':KEY,'v':raw})
   page.set_content(HTML,wait_until='load',timeout=45000)
  else:
   page.add_init_script(script="if(localStorage.getItem("+json.dumps(KEY)+")===null)localStorage.setItem("+json.dumps(KEY)+","+json.dumps(raw,ensure_ascii=False)+");")
   assert page.goto(URL,wait_until='load',timeout=45000).ok
  assert page.locator('body').get_attribute('data-current')==scene,('wrong restored canonical scene',scene)
  assert page.locator('.adv6').count()==1,('not real mobile reader',scene)
  beat_cache={k:'' for k in RULES[scene]['beats']};iterated=0
  for i in range(35):
   iterated=i+1
   view=page.locator('.adv6')
   mode=view.get_attribute('data-mode')
   if mode=='decision':break
   assert mode=='reading',('wrong mode',scene,mode)
   row=page.locator('.adv6 .line');count=row.count()
   assert count<=1,('multiple speakers in a VN beat',scene,count)
   if count:
    r=row.first.get_attribute('data-beat');text=row.first.locator('p').inner_text()
    if r in beat_cache:beat_cache[r]+=text
    valid=row.evaluate('''e=>{const a=e.getBoundingClientRect(),b=e.closest('.mobile-text').getBoundingClientRect();return a.width>0&&a.height>0&&a.top>=b.top-3&&a.bottom<=b.bottom+3}''')
    assert valid,('clipped small-panel text',scene,r,text)
   assert page.locator('html').evaluate('e=>e.scrollWidth<=innerWidth+2'),'horizontal page overflow'
   if page.locator('[data-page-next]').count():first(page,'[data-page-next]')
   else:break
  else:raise AssertionError('Infinite dialogue pages '+scene)
  assert page.locator('.adv6').get_attribute('data-mode')=='decision',('decision unreachable',scene,iterated)
  prompt=page.locator('.v13-choice-prompt')
  assert prompt.count()==1,('last spoken beat missing during decision',scene)
  rowid=prompt.get_attribute('data-v13-final-beat')
  if rowid in beat_cache:beat_cache[rowid]+=prompt.locator('p').inner_text()
  assert prompt.locator('p').inner_text().strip(),'empty final decision prompt'
  for rowid,p in RULES[scene]['beats'].items():
   assert beat_cache[rowid]==p['text'],('V13 line missing or wrong',scene,rowid,beat_cache[rowid],p['text'])
  buttons=page.locator('.adv6 button[data-choice]')
  seen={};
  for i in range(10):
   for b in buttons.all():
    label=b.inner_text().strip();id=b.get_attribute('data-choice');seen[id]=label
    assert b.get_attribute('data-v13-choice')==scene+'/'+id,('old choice label escaped',scene,id)
    assert b.evaluate('e=>e.getBoundingClientRect().height')>=39,('tiny tap target',scene,id)
   nxt=page.locator('[data-mobile-options="1"]:not([disabled])')
   if nxt.count():first(page,'[data-mobile-options="1"]')
   else:break
  enabled=set(page.evaluate('''()=>renderScene(state,DATA).choices.filter(x=>x.enabled).map(x=>x.id)'''))
  assert set(seen)==enabled,('enabled choices unreachable or disabled shown',scene,seen,enabled)
  for action in enabled:
   assert seen[action]==RULES[scene]['labels'][action]['label'],('old/stiff answer displayed',scene,action,seen[action])
  if engine=='chromium' and scene in ('t02','s06','l07','g07'):
   page.screenshot(path=str(OUT/(scene+f'-{w}-choices.png')))
  target=RISK.get(scene) if RISK.get(scene) in enabled else next(iter(enabled))
  if target not in page.locator('[data-choice]').evaluate_all('els=>els.map(e=>e.dataset.choice)'):
   for _ in range(10):
    prev=page.locator('[data-mobile-options="-1"]:not([disabled])')
    if not prev.count():break
    first(page,'[data-mobile-options="-1"]')
  for _ in range(12):
   if page.locator('[data-choice="'+target+'"]').count():break
   nxt=page.locator('[data-mobile-options="1"]:not([disabled])')
   if nxt.count():first(page,'[data-mobile-options="1"]')
   else:break
  assert page.locator('[data-choice="'+target+'"]').count()==1,('target not reachable',scene,target)
  before=page.evaluate('''()=>({history:state.history.length,rev:state.revision,scene:state.current})''')
  first(page,'[data-choice="'+target+'"]')
  after=page.evaluate('''()=>({history:state.history.length,rev:state.revision,choice:state.history.at(-1),flags:state.f})''')
  assert after['history']==before['history']+1 and after['choice']['from']==scene and after['choice']['id']==target,('choice not committed',scene,target)
  targets={r:p for r,p in RULES[scene]['replies'].items() if p['choice']==target}
  if targets:
   collected={r:'' for r in targets}
   for i in range(25):
    node=page.locator('.adv6 .line')
    if node.count():
     beat=node.first.get_attribute('data-beat')
     if beat in collected:collected[beat]+=node.first.locator('p').inner_text()
    if all(collected[r]==p['text'] for r,p in targets.items()):break
    if page.locator('[data-page-next]').count():first(page,'[data-page-next]')
    else:break
   for r,p in targets.items():
    assert collected[r]==p['text'],('edited immediate reaction absent',scene,target,r,collected[r],p['text'])
  if not HTML and scene in ('t02','s06','l07','g07'):
   history_count=after['history'];page.reload(wait_until='load')
   assert page.evaluate('state.history.length')==history_count,('mobile save lost',scene)
  assert not errors,('JS errors',scene,errors)
  return {'scene':scene,'choice':target,'beats':len(beat_cache),'pages':iterated,'savedHistory':after['history']}
 finally:context.close()

with sync_playwright() as pw:
 for name in ['chromium']+(['webkit'] if os.getenv('R4_WEBKIT')=='1' else []):
  if name=='chromium':
   kw={'headless':True,'args':['--no-sandbox']}
   if os.getenv('R4_CHROMIUM_EXECUTABLE'):kw['executable_path']=os.getenv('R4_CHROMIUM_EXECUTABLE')
  else:kw={'headless':True}
  browser=getattr(pw,name).launch(**kw)
  for i,scene in enumerate(IDS):
   size=[(320,568),(390,844),(430,932)][i%3]
   try:
    result=one_case(browser,name,scene,*size)
    REPORT['results'].append({'engine':name,'status':'PASS',**result});print('PASS',name,scene,flush=True)
   except Exception as e:
    REPORT['results'].append({'engine':name,'scene':scene,'status':'FAIL','error':repr(e)});print('FAIL',name,scene,repr(e),flush=True);traceback.print_exc()
  browser.close()
REPORT['status']='PASS' if all(r['status']=='PASS' for r in REPORT['results']) else 'FAIL'
(ROOT/'qa/current/romance-v13-report.json').write_text(json.dumps(REPORT,ensure_ascii=False,indent=2)+'\n')
print('V13',REPORT['status'],len(REPORT['results']))
if REPORT['status']!='PASS':sys.exit(1)
