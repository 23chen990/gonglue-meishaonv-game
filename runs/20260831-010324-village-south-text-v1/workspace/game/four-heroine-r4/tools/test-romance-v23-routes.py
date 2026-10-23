#!/usr/bin/env python3
"""Four canonical romance routes from fresh start to ending via visible taps.
No state injection. Offline storage is simulated and explicitly labelled.
"""
import os,json,sys,traceback
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
FX=json.loads((ROOT/'qa/current/romance-v23-fixtures.json').read_text())
URL=os.getenv('R4_REAL_URL','http://127.0.0.1:8765/index.html').split('?')[0]
OFFLINE=os.getenv('R4_OFFLINE_SMOKE')=='1'
TEXT=(ROOT/'index.html').read_text()
KEY='gonglue:revision-r4.5-portrait:canonical'
OUT=ROOT/'qa/current/browser/romance-v23-routes';OUT.mkdir(parents=True,exist_ok=True)
REPORT={'mode':'offline simulated storage' if OFFLINE else 'real HTTP touch','cases':[],'not_human_qa':True}

def tap(p,sel):
 q=p.locator(sel).first
 assert q.count() and q.is_visible(),(sel,p.locator('#app').inner_text()[-400:])
 q.tap(timeout=5000)

def load(p,raw=None):
 if OFFLINE:
  p.goto('about:blank')
  p.evaluate('''x=>{const m=new Map;if(x.raw)m.set(x.key,JSON.stringify(x.raw));Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k),clear:()=>m.clear()}})}''',{'key':KEY,'raw':raw})
  p.set_content(TEXT,wait_until='load')
 else:
  assert p.goto(URL,wait_until='load').ok

NEXT='[data-v11-next],[data-v10-next],[data-v9-next],[data-page-next],[data-reply-next],[data-mobile-next],[data-next]'

def find_action(p,wanted):
 """Walk visible group/pager controls only. Never assign cursors or state."""
 selectors=','.join('['+a+'='+json.dumps(wanted)+']' for a in ('data-v17-choice','data-v11-choice','data-if-pick','data-choice'))
 if p.locator(selectors).count():return selectors
 if p.locator('[data-if-group]').count():
  group='records' if wanted in ('l','g') else 'stage'
  tap(p,'[data-if-group="'+group+'"]')
  if p.locator(selectors).count():return selectors
 if p.locator('[data-v17-page="1"]:not([disabled]),[data-v11-page="1"]:not([disabled])').count():
  for _ in range(5):
   tap(p,'[data-v17-page="1"]:not([disabled]),[data-v11-page="1"]:not([disabled])')
   if p.locator(selectors).count():return selectors
   if not p.locator('[data-v17-page="1"]:not([disabled]),[data-v11-page="1"]:not([disabled])').count():break
 # Generic schedule groups: DFS remembers the current view, returns via real back.
 def groups(depth=0):
  if p.locator(selectors).count():return True
  if depth>=5:return False
  opts=p.locator('[data-choice-group]').evaluate_all('es=>es.map(e=>e.dataset.choiceGroup)')
  for value in opts:
   sel='[data-choice-group='+json.dumps(value)+']'
   if not p.locator(sel).count():continue
   tap(p,sel)
   if groups(depth+1):return True
   if p.locator('[data-choice-back]').count():tap(p,'[data-choice-back]')
  return False
 if groups():return selectors
 return None

def trial(browser,engine,route):
 c=route['name'][0]
 ctx=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)
 p=ctx.new_page();errors=[];p.on('pageerror',lambda e:errors.append(str(e)))
 transcript=[];taps=0;advance_chain=0;max_chain=0
 try:
  load(p)
  for action in ('next','next','next','badge','next','next','next','usb','back','move','next','next'):
   tap(p,'[data-io='+json.dumps(action)+']');taps+=1
  # The actual first action of this single-partner route determines the fork.
  first=route['commands'][0]
  assert first['from']=='ENTRY_WAKE'
  tap(p,'[data-io='+json.dumps(first['id'])+']');taps+=1
  assert p.evaluate('state.f.first_win') is not True,'rescue announced before music switch'
  for i in range(1600):
   status=p.evaluate('()=>({n:state.history.length,scene:state.current,done:state.complete,ending:state.ending,phase,dialog:document.querySelector(".mobile-text p")?.textContent||""})')
   n=status['n'];assert p.evaluate('state.history')==route['commands'][:n],(c,'history diverged',status)
   if status['done']:
    assert status['ending']==route['ending'],(c,status,route['ending'])
    break
   if status['dialog'] and (not transcript or transcript[-1]['text']!=status['dialog']):
    transcript.append({'scene':status['scene'],'phase':status['phase'],'text':status['dialog']})
   if p.locator(NEXT).count():
    tap(p,NEXT);taps+=1;advance_chain+=1;max_chain=max(max_chain,advance_chain);continue
   command=route['commands'][n]
   assert command['from']==status['scene'],(c,'wrong scene',status,command)
   wanted=command['id']
   # Direct concrete-action UI atomically records the real required intent too.
   if wanted.startswith('intent:') and p.locator('[data-v11-choice]').count():
    wanted=route['commands'][n+1]['id']
   if status['scene']=='OP_SETTLE' and p.locator('[data-if-pick]').count():
    wanted=route['commands'][n+1]['id']
   selector=find_action(p,wanted)
   assert selector,(c,'action missing',status,wanted,p.locator('#app').inner_text()[-600:])
   tap(p,selector);taps+=1;advance_chain=0
  else:raise AssertionError((c,'no ending within tap bound'))
  assert not errors,errors
  p.screenshot(path=str(OUT/(c+'-ending.png')))
  saved=p.evaluate('(k)=>JSON.parse(localStorage.getItem(k))',KEY)
  if OFFLINE:load(p,saved)
  else:p.reload(wait_until='load')
  assert p.evaluate('state.history')==route['commands'],(c,'ending reload history')
  assert p.evaluate('state.ending')==route['ending'],(c,'ending reload result')
  (OUT/(c+'-transcript.json')).write_text(json.dumps(transcript,ensure_ascii=False,indent=2)+'\n')
  return {'route':route['name'],'ending':route['ending'],'commands':len(route['commands']),'actualTaps':taps,'longestContinueSequence':max_chain}
 finally:ctx.close()

with sync_playwright() as pw:
 for engine in ['chromium']+(['webkit'] if os.getenv('R4_WEBKIT')=='1' else []):
  args={'headless':True}
  if engine=='chromium':
   args['args']=['--no-sandbox']
   if os.getenv('R4_CHROMIUM_EXECUTABLE'):args['executable_path']=os.getenv('R4_CHROMIUM_EXECUTABLE')
  browser=getattr(pw,engine).launch(**args)
  routes=[r for r in FX['routes'] if not os.getenv('R4_V23_ROUTE') or r['name'].startswith(os.getenv('R4_V23_ROUTE'))]
  for route in routes:
   try:
    result=trial(browser,engine,route);REPORT['cases'].append({'engine':engine,'status':'PASS',**result});print('PASS V23 ROUTE',engine,result,flush=True)
   except Exception as error:
    REPORT['cases'].append({'engine':engine,'status':'FAIL','route':route['name'],'error':repr(error)});print('FAIL V23 ROUTE',engine,route['name'],repr(error),flush=True);traceback.print_exc()
  browser.close()
REPORT['status']='FAIL' if any(x['status']=='FAIL' for x in REPORT['cases']) else 'PASS'
(ROOT/'qa/current/romance-v23-routes-report.json').write_text(json.dumps(REPORT,ensure_ascii=False,indent=2)+'\n')
if REPORT['status']!='PASS':sys.exit(1)
