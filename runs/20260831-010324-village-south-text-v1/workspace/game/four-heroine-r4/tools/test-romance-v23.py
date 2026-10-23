#!/usr/bin/env python3
"""Default player, every source-reachable authored choice. No flag injection.
HTTP on CI; offline mode uses explicit simulated storage, not phone/HTTP proof.
"""
import os,json,traceback,sys
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
FX=json.loads((ROOT/'qa/current/romance-v23-fixtures.json').read_text())
KEY='gonglue:revision-r4.5-portrait:canonical'
URL=os.getenv('R4_REAL_URL','http://127.0.0.1:8765/index.html').split('?')[0]
OFFLINE=os.getenv('R4_OFFLINE_SMOKE')=='1'
OUT=ROOT/'qa/current/browser/romance-v23';OUT.mkdir(parents=True,exist_ok=True)
REPORT={'mode':'offline simulated storage' if OFFLINE else 'real HTTP touch','cases':[],'not_human_or_device_qa':True}
SCENES=os.getenv('R4_V23_SCENES','').split(',')
TEXT=(ROOT/'index.html').read_text()

def load(page,raw):
 if OFFLINE:
  page.goto('about:blank')
  page.evaluate('''x=>{const m=new Map;if(x.raw)m.set(x.key,JSON.stringify(x.raw));Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k),clear:()=>m.clear()}})}''',{'key':KEY,'raw':raw})
  page.set_content(TEXT,wait_until='load')
 else:
  if raw:
   page.add_init_script('if(localStorage.getItem('+json.dumps(KEY)+')===null)localStorage.setItem('+json.dumps(KEY)+','+json.dumps(json.dumps(raw,ensure_ascii=False))+');')
  assert page.goto(URL,wait_until='load').ok

def tap(page,selector):
 x=page.locator(selector).first
 assert x.count() and x.is_visible(),selector
 x.tap(timeout=7000)

def visual(page):
 v=page.locator('.io-sheet').evaluate('''e=>{const p=e.querySelector('.mobile-text p'),t=e.querySelector('.mobile-text'),a=p?.getBoundingClientRect(),b=t?.getBoundingClientRect();return {text:p?.textContent,voice:e.querySelector('.mobile-speaker')?.textContent,lines:t?.querySelectorAll('.line').length,visible:!!a&&a.width>0&&a.height>0&&a.top>=b.top-3&&a.bottom<=b.bottom+3,scroll:t?.scrollHeight,client:t?.clientHeight,height:e.getBoundingClientRect().height,vh:innerHeight,font:p?parseFloat(getComputedStyle(p).fontSize):0}}''')
 assert v['lines']==1 and v['visible'] and v['text'] and v['voice'],v
 assert v['scroll']<=v['client']+3 and v['height']<=v['vh']/3+3,v
 assert v['font']>=17,v
 assert page.locator('.v11-choice-risk').count()==0,'spoilers returned'
 assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+2')
 return v

def trial(browser,engine,key,index):
 scene,action=key.split('/')
 width,height=[(320,568),(390,844),(430,932)][index%3]
 ctx=browser.new_context(viewport={'width':width,'height':height},is_mobile=True,has_touch=True)
 p=ctx.new_page();errors=[];p.on('pageerror',lambda e:errors.append(str(e)))
 try:
  load(p,FX['cases'][key]);assert p.evaluate('state.current')==scene
  selectors='[data-v17-choice],[data-v11-choice],[data-if-pick]'
  authored=p.evaluate('(id)=>V23_SCENES[id]',scene)
  seen=[]
  for n in range(9):
   view=visual(p)
   if p.locator(selectors).count():break
   seen.append(view['text'])
   tap(p,'[data-v11-next],[data-v9-next]')
  else:raise AssertionError(('never reached choice',scene))
  assert 1<=len(seen)<=7,(scene,seen)
  chosen_selector=f'[data-v17-choice="{action}"],[data-v11-choice="{action}"],[data-if-pick="{action}"]'
  for _ in range(8):
   if p.locator(chosen_selector).count():break
   tap(p,'[data-v17-page="1"]:not([disabled]),[data-v11-page="1"]:not([disabled])')
  selected=p.locator(chosen_selector).first
  shown=selected.locator('.v11-choice-main').text_content() if selected.locator('.v11-choice-main').count() else selected.text_content().replace('\u2197','').strip()
  expected_label=authored['choices'][action]['label']
  if key=='t06/book' and p.evaluate('state.f.knows_foreknowledge_claim_t===true'):
   expected_label='“你今天改的这一句，书里没有。”'
  assert shown==expected_label,(key,shown,expected_label)
  box=selected.bounding_box();assert box['height']>=44 and box['y']>=0 and box['y']+box['height']<=height+2,(key,box)
  expected=p.evaluate('''id=>{let s=state,sc=DATA.scenes[s.current];if(sc.decisionSteps&&!s.decisionIntent){const g=sc.decisionSteps.find(x=>x.options.includes(id));s=choose(s,DATA,'intent:'+g.id,s.revision).state;}const result=choose(s,DATA,id,s.revision).state;return {flags:result.f,history:result.history,current:result.current};}''',action)
  selected.tap()
  actual=p.evaluate('()=>({flags:state.f,history:state.history,current:state.current})')
  assert actual==expected,(key,'canonical output mismatch')
  for n,beat in enumerate(authored['choices'][action]['replies']):
   v=visual(p);assert v['text']==beat['text'],(key,n,v,beat)
   if beat.get('stage'):
    cue=p.locator('.v23-physical-beat');assert cue.count()==1 and cue.is_visible(),(key,'missing visible action')
    b=cue.bounding_box();sh=p.locator('.io-sheet').bounding_box()
    assert b['y']+b['height']<=sh['y']+2,(key,'action overlaps dialogue')
   if engine=='chromium' and key in ('t01/share','s01/joke','l04/swap','g04/join','t05/closer','l07/control'):
    p.screenshot(path=str(OUT/(scene+'-'+action+'-'+str(n)+'.png')))
   if n==0 and key in ('t01/share','s03/open','g04/join','OP_TALK_t/flirt'):
    stored=p.evaluate('(k)=>JSON.parse(localStorage.getItem(k))',KEY)
    if OFFLINE:load(p,stored)
    else:p.reload(wait_until='load')
    assert visual(p)['text']==beat['text'],(key,'reload lost response')
   next_selector='[data-v10-next],[data-v11-next]'
   tap(p,next_selector)
  assert p.evaluate('state.history')==expected['history'],(key,'response forged command')
  assert not errors,errors
  return {'key':key,'readingTaps':len(seen),'replyBeats':len(authored['choices'][action]['replies']),'width':width}
 finally:ctx.close()

with sync_playwright() as pw:
 for engine in ['chromium']+(['webkit'] if os.getenv('R4_WEBKIT')=='1' else []):
  opts={'headless':True}
  if engine=='chromium':
   opts['args']=['--no-sandbox']
   if os.getenv('R4_CHROMIUM_EXECUTABLE'):opts['executable_path']=os.getenv('R4_CHROMIUM_EXECUTABLE')
  b=getattr(pw,engine).launch(**opts)
  keys=[k for k in FX['cases'] if not SCENES[0] or k.split('/')[0] in SCENES]
  for i,k in enumerate(keys):
   try:
    result=trial(b,engine,k,i);REPORT['cases'].append({'engine':engine,'status':'PASS',**result});print('PASS V23',engine,k,flush=True)
   except Exception as error:
    REPORT['cases'].append({'engine':engine,'status':'FAIL','key':k,'error':repr(error)});print('FAIL V23',engine,k,repr(error),flush=True);traceback.print_exc()
  b.close()
REPORT['status']='FAIL' if any(c['status']=='FAIL' for c in REPORT['cases']) else 'PASS'
(ROOT/'qa/current/romance-v23-report.json').write_text(json.dumps(REPORT,ensure_ascii=False,indent=2)+'\n')
print('V23',REPORT['status'],len(REPORT['cases']),flush=True)
if REPORT['status']!='PASS':sys.exit(1)
