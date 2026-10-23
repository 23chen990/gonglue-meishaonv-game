#!/usr/bin/env python3
"""V11 real-HTTP phone viewport acceptance at canonical replayed checkpoints.
Generated fixtures contain ONLY engine commands, never hand-invented story state.
"""
import os, sys, json, traceback
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
URL=os.getenv('R4_REAL_URL','http://127.0.0.1:8765/index.html').split('?')[0]+'?qa=intent'
LOCAL=os.getenv('R4_LOCAL_HTML')
OUT=ROOT/'qa/current/browser/romance-v11';OUT.mkdir(parents=True,exist_ok=True)
FIX=json.loads((ROOT/'qa/current/romance-v11-fixtures.json').read_text())['fixtures']
RULES=json.loads((ROOT/'tools/romance-v11-arcs.json').read_text())['arcs']
KEY='gonglue:revision-r4.5-portrait:canonical'
CASES=[('A1b','check',320,568),('A2a','negotiated',390,844),('A2b','cooperate',390,844),
('A3a','cooperative',320,568),('A3b','none',390,844),('A4a','cut',390,844),
('A4b','extract',320,568),('A5a','bounded',390,844),('A5b','rival',390,844),
('A6a','partner',320,568),('UNWRITTEN','private',390,844),('A6b','relationships',390,844),
('A7a','separate',390,844),('A7b','pause',320,568),('t03','wait',430,932),
('s03','open',390,844),('l03','exclusive',390,844),('g03','friend',320,568),
('A2a','unchanged',320,568),('A3a','leave',390,844),('A6a','accept',390,844),
('t03','exclusive',390,844),('g03','decline',320,568)]
report={'mode':'local-injected' if LOCAL else 'real-http','url':URL,'cases':[]}
def tap(page,selector):
 q=page.locator(selector).first
 assert q.count()==1,('No target',selector,page.locator('#app').inner_text()[-250:])
 q.tap(timeout=12000)
def until(page,selector,limit=16):
 for _ in range(limit):
  if page.locator(selector).count():return
  for sel in ('[data-v11-next]','[data-reply-next]','[data-page-next]'):
   if page.locator(sel).count():tap(page,sel);break
  else:raise AssertionError('No advance control to '+selector+' '+page.locator('#app').inner_text()[-400:])
 raise AssertionError('Too many beats to '+selector)
def read_display(page):
 return page.locator('.v11-director').evaluate('''e=>{
 const s=e.querySelector('.io-sheet'),t=e.querySelector('.mobile-text'),p=t.querySelector('p');
 const a=s.getBoundingClientRect(),b=p.getBoundingClientRect(),z=t.getBoundingClientRect();
 const options=[...e.querySelectorAll('.v11-choice')].map(x=>({h:x.getBoundingClientRect().height,inside:x.getBoundingClientRect().bottom<=a.top-4}));
 return {scene:e.dataset.v11Scene,after:e.dataset.v11After,sheetHeight:a.height,viewport:innerHeight,
 text:p.innerText,voice:e.querySelector('.mobile-speaker').innerText,
 textVisible:b.width>0&&b.height>0&&b.top>=z.top-3&&b.bottom<=z.bottom+3,
 scroll:t.scrollHeight,client:t.clientHeight,overflow:document.documentElement.scrollWidth>innerWidth+2,
 options,photoLoaded:e.querySelector('.io-film-image').complete&&e.querySelector('.io-film-image').naturalWidth>=1024}
 }''')
def one_case(browser,name,scene,choice,width,height):
 c=browser.new_context(viewport={'width':width,'height':height},is_mobile=True,has_touch=True)
 p=c.new_page();errors=[];p.on('pageerror',lambda e:errors.append(str(e)))
 try:
  raw=json.dumps(FIX[scene],ensure_ascii=False)
  if LOCAL:
   p.goto('about:blank?qa=intent')
   p.evaluate('''(args)=>{const store=new Map([[args.k,args.v]]);Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k),clear:()=>store.clear()}})}''',{'k':KEY,'v':raw})
   p.set_content(Path(LOCAL).read_text(encoding='utf8'),wait_until='load')
  else:
   p.add_init_script(script="if(window.localStorage.getItem("+json.dumps(KEY)+")===null)window.localStorage.setItem("+json.dumps(KEY)+","+json.dumps(raw,ensure_ascii=False)+");")
   assert p.goto(URL,wait_until='load').ok
  assert p.locator('.v11-director[data-v11-scene="'+scene+'"]').count()==1,('no V11 scene',scene,p.locator('#app').inner_text()[:300])
  until(p,'[data-v11-choice]')
  # Canonical intent buttons must read like choices a person would make.
  if p.locator('[data-v11-choice^="intent:"]').count():
   mapping=RULES[scene].get('intentLabels',{})
   visible=p.locator('[data-v11-choice^="intent:"]').evaluate_all(
    'els=>els.map(e=>({id:e.dataset.v11Choice.slice(7),label:e.querySelector(".v11-choice-main")?.innerText,risk:!!e.querySelector(".v11-choice-risk")}))')
   assert visible and all(x['label']==mapping.get(x['id']) and not x['risk'] for x in visible),('outdated technical intent label',scene,visible)
  assert p.locator('.v11-choice-risk').count()==0,(scene,'spoiler subtitles reappeared')
  if name=='chromium' and scene in ('A2a','A3a','A4b','A6a','t03'):
   p.screenshot(path=str(OUT/(scene+'-'+str(width)+'-choices.png')))
  before=read_display(p)
  assert before['textVisible'] and before['scroll']<=before['client']+2,before
  assert before['sheetHeight']<=height/3+2 and before['photoLoaded'] and not before['overflow'],before
  assert all(x['h']>=44 and x['inside'] for x in before['options']),before
  desired='[data-v11-choice="'+choice+'"]'
  # Two-stage decisions represent real canonical intents and then a leaf.
  if not p.locator(desired).count():
   steps=p.evaluate('''()=>DATA.scenes[state.current].decisionSteps||[]''')
   seq=next((step for step in steps if choice in step['options']),None)
   if seq:
    tap(p,'[data-v11-choice="intent:'+seq['id']+'"]')
    # The second stage has a real engine command, and may paginate its answers.
    until(p,'[data-v11-choice]')
  if not p.locator(desired).count():
   for _ in range(6):
    if p.locator(desired).count():break
    if p.locator('[data-v11-page="1"]:not([disabled])').count():tap(p,'[data-v11-page="1"]')
    else:raise AssertionError('Target not found on option pages '+scene+'/'+choice)
  # Stage-1 grouped options may themselves be on another option page.
  if not p.locator(desired).count():raise AssertionError('choice not visible '+scene+'/'+choice)
  tap(p,desired)
  assert p.locator('.v11-director[data-v11-after="1"]').count()==1,('real leaf without payoff',scene,choice)
  after=read_display(p)
  assert after['textVisible'] and after['photoLoaded'],after
  assert after['text']==RULES[scene]['choices'][choice]['response']['text'],('stale/clipped on-screen speech',scene,choice,after['text'])
  result=p.evaluate('''()=>({h:state.history.at(-1),f:state.f,ui:v11.after})''')
  assert result['h']['from']==scene and result['h']['id']==choice,result['h']
  opts=p.evaluate('''(ids)=>DATA.scenes[state.history.at(-1).from].choices.find(x=>x.id===ids).effects.filter(x=>x.op==='set').map(x=>({k:x.key,v:x.value}))''',choice)
  assert opts and any(result['f'].get(x['k'])==x['v'] for x in opts),('fake payoff',scene,choice)
  assert result['ui']['scene']==scene and result['ui']['choice']==choice
  if name=='chromium' and scene in ('A2a','A4b','A6a','t03'):
   p.screenshot(path=str(OUT/(scene+'-'+str(width)+'-after.png')))
  # Reload must preserve exact line and consequence (including zero-reply leaves).
  if not LOCAL and scene in ('A1b','A6a','t03'):
   prior=p.locator('.v11-director .mobile-text').inner_text()
   p.reload(wait_until='load')
   assert p.locator('.v11-director[data-v11-after="1"]').count()==1,'lost reply on refresh'
   assert p.locator('.v11-director .mobile-text').inner_text()==prior
  act=RULES[scene]['choices'][choice].get('afterBeat')
  if act:
   tap(p,'[data-v11-next]')
   second=read_display(p)
   assert second['text']==act['text'] and second['voice']==act['voice'],('acting beat missing/clipped',scene,choice,second)
   assert second['scroll']<=second['client']+2,('acting overflow',scene,choice)
  for _ in range(4):
   if not p.locator('.v11-director[data-v11-after="1"]').count():break
   tap(p,'[data-v11-next]')
  assert p.locator('.v11-director[data-v11-after="1"]').count()==0,'cannot exit consequence'
  if scene=='A6a' and choice=='accept':
   # Retry the real decision that caused the failed ending, not its epilogue.
   assert p.locator('body').get_attribute('data-current')=='X01'
   until(p,'[data-choice="record"]',limit=180)
   tap(p,'[data-choice="record"]')
   until(p,'.mobile-early-retry',limit=180)
   button=p.locator('.mobile-early-retry')
   assert p.locator('.adv6-sheet-hidden').count()==1,'failed ending obscured by unrelated reading sheet'
   assert p.locator('.mobile-options button').count()==2,'too many ending menu buttons obstruct the CG'
   restore_index=int(button.get_attribute('data-restore'))
   cause=p.evaluate('(i)=>state.history[i]',restore_index)
   assert cause['from']=='A6a' and cause['id']=='accept',('retry targets the wrong decision',cause)
   if name=='chromium':p.screenshot(path=str(OUT/'A6a-bad-end-retry-390.png'))
   p.once('dialog',lambda d:d.accept())
   tap(p,'.mobile-early-retry')
   restored=p.evaluate('()=>({scene:state.current,history:state.history.length,earlyEnd:!!state.f.early_end})')
   assert restored=={'scene':'A6a','history':restore_index,'earlyEnd':False},restored
   if not LOCAL:
    p.reload(wait_until='load')
    assert p.locator('body').get_attribute('data-current')=='A6a','retry did not survive reload'
  assert not errors,errors
  return {'scene':scene,'choice':choice,'viewport':f'{width}x{height}','trueEffect':opts[0]['k'],'intro':before['text'],'payoff':after['text']}
 finally:c.close()
with sync_playwright() as pw:
 for name in ['chromium']+(['webkit'] if os.getenv('R4_WEBKIT')=='1' else []):
  kwargs={'headless':True,'args':['--no-sandbox']} if name=='chromium' else {'headless':True}
  if name=='chromium' and os.getenv('R4_CHROMIUM_EXECUTABLE'):kwargs['executable_path']=os.getenv('R4_CHROMIUM_EXECUTABLE')
  browser=getattr(pw,name).launch(**kwargs)
  for x in CASES:
   try:
    res=one_case(browser,name,*x)
    report['cases'].append({'name':name+'-'+x[0]+'-'+x[1],'status':'PASS','detail':res})
    print('PASS',name,x[0],x[1],flush=True)
   except Exception as e:
    report['cases'].append({'name':name+'-'+x[0]+'-'+x[1],'status':'FAIL','error':repr(e)})
    print('FAIL',name,x[0],repr(e),flush=True);traceback.print_exc()
  browser.close()
report['status']='PASS' if all(x['status']=='PASS' for x in report['cases']) else 'FAIL'
(ROOT/'qa/current/romance-v11-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print('V11',report['status'],len(report['cases']))
if report['status']!='PASS':sys.exit(1)