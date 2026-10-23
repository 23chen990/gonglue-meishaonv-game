# V23: archived V22 exact-dialogue contract; current default covered by V23 suites.
#!/usr/bin/env python3
"""V21 honest romance presentation on real HTTP touch Chromium/WebKit.
Canonical open choices are executed from real replay fixtures; synthetic
pre-existing relationships are used ONLY to test display/risk projections.
No faked state is ever submitted as real game history.
"""
import json,os,sys,traceback
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
URL=os.getenv('R4_REAL_URL','http://127.0.0.1:8765/index.html').split('?')[0]+'?qa=v22'
FIX=json.loads((ROOT/'qa/current/romance-v11-fixtures.json').read_text())['fixtures']
ARCS=json.loads((ROOT/'tools/romance-v11-arcs.json').read_text())['arcs']
KEY='gonglue:revision-r4.5-portrait:canonical'
OFFLINE=os.getenv('R4_OFFLINE_SMOKE')=='1'
HTML=(ROOT/'index.html').read_text() if OFFLINE else None
OUT=ROOT/'qa/current/browser/romance-v21';OUT.mkdir(parents=True,exist_ok=True)
REPORT={'scope':'V21 real HTTP date acceptance + synthetic display-only promise conflict','cases':[]}
DATES=['t03','s03','l03','g03']
NAMES={'t03':'唐映雪','s03':'沈清辞','l03':'林见月','g03':'顾晚棠'}

def tap(page,selector):
 q=page.locator(selector).first
 assert q.count()==1,(selector,page.locator('#app').inner_text()[-250:])
 q.tap(timeout=15000)

def load(browser,scene,w=390,h=844):
 ctx=browser.new_context(viewport={'width':w,'height':h},is_mobile=True,has_touch=True)
 page=ctx.new_page()
 raw=json.dumps(FIX[scene],ensure_ascii=False)
 if OFFLINE:
  script='''(()=>{const m=new Map([[__KEY__,__RAW__]]);const store={getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k),clear:()=>m.clear(),key:i=>[...m.keys()][i]||null,get length(){return m.size}};Object.defineProperty(window,'localStorage',{value:store,configurable:true});})();'''.replace('__KEY__',json.dumps(KEY)).replace('__RAW__',json.dumps(raw,ensure_ascii=False))
  page.add_init_script(script=script)
  page.goto('about:blank?qa=v22')
  page.set_content(HTML,wait_until='load',timeout=50000)
 else:
  page.add_init_script(script='if(localStorage.getItem('+json.dumps(KEY)+')===null)localStorage.setItem('+json.dumps(KEY)+','+json.dumps(raw,ensure_ascii=False)+');')
  assert page.goto(URL,wait_until='load',timeout=45000).ok
 assert page.locator('body').get_attribute('data-current')==scene
 return ctx,page

def advance(page):
 for _ in range(5):
  if page.locator('[data-v11-choice]').count():return
  tap(page,'[data-v11-next]')
 raise AssertionError('never reached real date options')

def date_trial(browser,engine,scene,index):
 ctx,page=load(browser,scene,*[(320,568),(390,844),(430,932)][index%3])
 errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 try:
  intro=page.evaluate('v11Props().intro')
  assert len(intro)==2,(scene,intro)
  advance(page)
  assert page.locator('.v11-director[data-mode="decision"]').count()==1
  action=page.locator('[data-v11-choice="open"]')
  assert action.count()==1,(scene,'missing nonexclusive real date')
  old=page.evaluate('state.history.length')
  action.tap()
  state=page.evaluate('''(id)=>({history:state.history.slice(-2),size:state.history.length,
     active:state.f['active_'+id[0]],scope:state.f['scope_'+id[0]],
     message:v11AfterLines().map(x=>({voice:x.voice,text:x.text}))})''',scene)
  assert state['size']==old+2 and state['history'][-1]['id']=='open',(scene,state)
  assert state['active'] and state['scope']=='open',(scene,'wrong relationship status',state)
  assert len(state['message'])==2,(scene,'result never confirms accepted date',state)
  assert state['message'][0]['text']==ARCS[scene]['choices']['open']['response']['text']
  assert state['message'][1]['voice']==NAMES[scene]
  assert page.locator('.v11-director[data-v11-after="1"]').count()==1
  text_node=page.locator('.v11-director .mobile-text p')
  assert text_node.is_visible(),(scene,'result text hidden')
  first=text_node.text_content().strip()
  step=page.evaluate('v11.after.step')
  assert step==0,(scene,'WebKit duplicate tap advanced consequence unexpectedly',step)
  assert first==state['message'][0]['text'],(scene,repr(first),repr(state['message'][0]['text']),page.locator('.v11-director .mobile-text').inner_text())
  tap(page,'[data-v11-next]')
  text_node=page.locator('.v11-director .mobile-text p')
  assert text_node.is_visible(),(scene,'follow-up text hidden')
  second=text_node.text_content().strip()
  assert second==state['message'][1]['text'],(scene,repr(second),repr(state['message'][1]['text']))
  if engine=='chromium':
   page.screenshot(path=str(OUT/(scene+'-accepted.png')))
   if not OFFLINE:
    page.reload(wait_until='load')
    assert page.locator('.v11-director .mobile-text p').text_content().strip()==second,(scene,'lost second result after reload')
  assert not errors,errors
  return {'scene':scene,'savedCommands':2,'actualRelation':'open','afterBeats':2}
 finally:ctx.close()

def conflict_visual(browser,engine):
 ctx,page=load(browser,'s03',390,844)
 try:
  # The previous exclusive commitment exists in memory but is never turned
  # into a moral warning or a spoiler subtitle on the next heroine's choices.
  seen=page.evaluate('''()=>{
    state.f.active_t=true;state.f.scope_t='exclusive';render();
    return v11Props().intro.map(x=>({voice:x.voice,text:x.text}));
  }''')
  assert len(seen)==2,seen
  assert all('骗她们' not in x['text'] and '必须' not in x['text'] for x in seen),seen
  advance(page)
  assert page.locator('.v11-choice-risk').count()==0,'predicted costs appeared in choices'
  for action in ('open','exclusive'):
   item=page.locator('[data-v11-choice="'+action+'"]')
   assert item.count()==1,action
   assert '唐映雪' not in item.inner_text(),(action,item.inner_text())
  assert page.evaluate("state.f.active_t===true&&state.f.scope_t==='exclusive'"), 'engine forgot commitment'
  if engine=='chromium':page.screenshot(path=str(OUT/'s03-no-spoilers.png'))
  return {'scene':'s03','prior':'t03/exclusive','riskVisible':False,'protagonistLecture':False}
 finally:ctx.close()

def finale_visual(browser,engine):
 ctx,page=load(browser,'A7a',430,932)
 try:
  for kind,active in [('none',[]),('one',['t']),('multiple',['t','s'])]:
   visual=page.evaluate('''(active)=>{
     for(const c of 'tslg'){state.f['active_'+c]=active.includes(c);state.f['scope_'+c]=active.includes(c)?'open':'none';}
     v11.page=0;v11.step=0;
     const props=v11Props(),lab=id=>v21FinaleLabel(state.f,id,props.arc.choices[id].label);
     const result={intro:props.intro.map(x=>x.text),together:lab('together'),
       none:lab('none'),reply:v21FinaleReply(state.f,'together',props.arc.choices.together.response.text)};
     v11.step=props.intro.length;render();return result;
   }''',active)
   assert all(x not in visual['together'] for x in ['接受关系变冷','不准备兑现','必须','会受伤']),visual
   if kind=='none':
    assert '消息' in visual['intro'][-1] and '她们' not in visual['together'],visual
   elif kind=='one':
    assert '唐映雪' in visual['intro'][-1] and '她' in visual['together'],visual
   else:
    assert '几条消息' in visual['intro'][-1] and '她们' in visual['together'],visual
   assert page.locator('.v11-choice-risk').count()==0,kind
  if engine=='chromium':page.screenshot(path=str(OUT/'A7a-actions-not-warnings.png'))
  return {'scene':'A7a','displayStates':['none','one','multiple']}
 finally:ctx.close()

with sync_playwright() as pw:
 for engine in ['chromium']+(['webkit'] if os.getenv('R4_WEBKIT')=='1' else []):
  opts={'headless':True,'args':['--no-sandbox']} if engine=='chromium' else {'headless':True}
  if engine=='chromium' and os.getenv('R4_CHROMIUM_EXECUTABLE'):
   opts['executable_path']=os.getenv('R4_CHROMIUM_EXECUTABLE')
  browser=getattr(pw,engine).launch(**opts)
  cases=[('date-'+scene,lambda s=scene,i=i:date_trial(browser,engine,s,i)) for i,scene in enumerate(DATES)]
  cases.extend([('prior-exclusive',lambda:conflict_visual(browser,engine)),('zero-one-many-finale',lambda:finale_visual(browser,engine))])
  for name,fn in cases:
   try:
    result=fn();REPORT['cases'].append({'engine':engine,'status':'PASS',**result})
    print('PASS V21',engine,name,flush=True)
   except Exception as error:
    REPORT['cases'].append({'engine':engine,'status':'FAIL','name':name,'error':repr(error)})
    print('FAIL V21',engine,name,repr(error),flush=True);traceback.print_exc()
  browser.close()
REPORT['status']='PASS' if all(x['status']=='PASS' for x in REPORT['cases']) else 'FAIL'
(ROOT/'qa/current/romance-v21-report.json').write_text(json.dumps(REPORT,ensure_ascii=False,indent=2)+'\n')
print('V21',REPORT['status'],len(REPORT['cases']))
if REPORT['status']!='PASS':sys.exit(1)
