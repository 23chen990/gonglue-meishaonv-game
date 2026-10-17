#!/usr/bin/env python3
"""First encounter is role-first, name-after-introduction, and path-aware.
Uses the same real engine, actual clicks, and browser-saved state. All cases
are tests of VIEWED text; no flags/affinity are written by this test.
"""
import os, json, traceback, sys
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
LOCAL=os.getenv('R4_LOCAL_HTML')
URL=os.getenv('R4_REAL_URL','http://127.0.0.1:8765/index.html')
OUT=ROOT/'qa/current/browser/romance-v15';OUT.mkdir(parents=True,exist_ok=True)
report={'mode':'injected-file' if LOCAL else 'real-http','cases':[]}

def click(page,attr,value):
 button=page.locator('['+attr+'="'+value+'"]').first
 assert button.count()==1,(attr,value,page.locator('#app').inner_text()[-350:])
 button.tap(timeout=8500)

def until(page,predicate,limit=95):
 for _ in range(limit):
  if predicate():return
  if page.locator('[data-reply-next]').count():click(page,'data-reply-next','1')
  elif page.locator('[data-page-next]').count():page.locator('[data-page-next]').first.tap()
  elif page.locator('[data-v9-next="after"]').count():click(page,'data-v9-next','after')
  elif page.locator('[data-v10-next="payoff"]').count():click(page,'data-v10-next','payoff')
  else:raise AssertionError('not advancing: '+page.locator('#app').inner_text()[-380:])
 raise AssertionError('step limit')

def step_intro(page):
 assert page.locator('.io-vn[data-current-io="reader"]').count()==1
 for action in ('next','next','next','badge','next','next','next'):
  click(page,'data-io',action)
 assert page.locator('[data-current-io="hunt"]').count()==1
 for action in ('usb','back','move','next','next'):
  click(page,'data-io',action)

def choose_in_records(page,target,met):
 if page.locator('[data-if-group="records"]').count():click(page,'data-if-group','records')
 choices={x['id']:x['label'] for x in page.locator('[data-if-pick]').evaluate_all('es=>es.map(e=>({id:e.dataset.ifPick,label:e.innerText}))')}
 assert {'l','g'}<=choices.keys(),choices
 if met=='l':
  assert '林见月' in choices['l'] and '顾晚棠' not in choices['g'],choices
 elif met=='g':
  assert '顾晚棠' in choices['g'] and '林见月' not in choices['l'],choices
 else:
  assert '林见月' not in choices['l'] and '顾晚棠' not in choices['g'],choices
 click(page,'data-if-pick',target)
 until(page,lambda:page.locator('[data-v10-kind="payoff"]').count()==1)
 sentence=page.locator('.v9-cinema .mobile-text').inner_text()
 if met==target:assert '我叫' not in sentence and '我是' not in sentence,sentence
 else:
  assert ('我叫林见月' if target=='l' else '我是顾晚棠') in sentence,sentence
 assert page.evaluate('state.history.at(-1).id')==target
 return sentence,choices

def trial(browser,name,who,route):
 ctx=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)
 page=ctx.new_page();err=[];page.on('pageerror',lambda e:err.append(str(e)))
 try:
  if LOCAL:
   page.goto('about:blank')
   page.evaluate('''()=>{const m=new Map();Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k),clear:()=>m.clear()}})}''')
   page.set_content(Path(LOCAL).read_text(encoding='utf8'),wait_until='load')
  else:assert page.goto(URL,wait_until='load').ok
  step_intro(page)
  click(page,'data-io',route)
  if route=='rescue':
   until(page,lambda:page.locator('[data-follow-scene="COLD"]').count()==1)
   choices={x['id']:x['label'] for x in page.locator('[data-if-pick]').evaluate_all('es=>es.map(e=>({id:e.dataset.ifPick,label:e.innerText}))')}
   assert {'t','s','self'}==choices.keys(),choices
   assert '唐映雪' in choices['t'] and '沈清辞' in choices['s'],choices
   click(page,'data-if-pick',who)
   until(page,lambda:page.locator('[data-v10-kind="payoff"]').count()==1)
   sentence=page.locator('.v9-cinema .mobile-text').inner_text()
   assert sentence and page.evaluate('state.history.at(-1).id')==who
  else:
   until(page,lambda:page.locator('[data-follow-scene="ENTRY_MEMORY"]').count()==1)
   labels=page.locator('[data-if-pick]').evaluate_all('es=>es.map(e=>e.innerText)')
   assert '林见月' not in ''.join(labels) and '顾晚棠' not in ''.join(labels),labels
   click(page,'data-if-pick','camera' if who=='l' else 'email')
   until(page,lambda:page.locator('[data-v10-kind="payoff"]').count()==1)
   first=page.locator('.v9-cinema .mobile-text').inner_text()
   assert ('我叫林见月' if who=='l' else '顾晚棠') in first,first
   click(page,'data-v10-next','payoff')
   until(page,lambda:page.locator('[data-follow-scene="COLD"]').count()==1)
   sentence,choices=choose_in_records(page,who,who)
  if name=='chromium':page.screenshot(path=str(OUT/(route+'-'+who+'.png')))
  assert not err,err
  return {'route':route,'woman':who,'postChoiceLine':sentence,'label':choices[who]}
 finally:ctx.close()

with sync_playwright() as pw:
 engines=['chromium']+(['webkit'] if os.getenv('R4_WEBKIT')=='1' else [])
 for engine in engines:
  cfg={'headless':True,'args':['--no-sandbox']} if engine=='chromium' else {'headless':True}
  if engine=='chromium' and os.getenv('R4_CHROMIUM_EXECUTABLE'):cfg['executable_path']=os.getenv('R4_CHROMIUM_EXECUTABLE')
  b=getattr(pw,engine).launch(**cfg)
  for route in ['rescue','investigate']:
   for who in (['t','s'] if route=='rescue' else ['l','g']):
    try:
     result=trial(b,engine,who,route)
     report['cases'].append({'name':engine+'-'+route+'-'+who,'status':'PASS','detail':result})
     print('PASS',engine,route,who,result['label'],flush=True)
    except Exception as e:
     report['cases'].append({'name':engine+'-'+route+'-'+who,'status':'FAIL','error':repr(e)})
     print('FAIL',engine,route,who,repr(e),flush=True);traceback.print_exc()
  b.close()
report['status']='PASS' if all(x['status']=='PASS' for x in report['cases']) else 'FAIL'
(ROOT/'qa/current/romance-v15-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
if report['status']!='PASS':sys.exit(1)
