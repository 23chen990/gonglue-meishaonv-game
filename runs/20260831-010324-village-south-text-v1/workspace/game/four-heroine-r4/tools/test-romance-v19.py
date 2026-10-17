#!/usr/bin/env python3
"""V19 real HTTP mobile causal-comprehension contract.
36 scripted scenes, contextual source-verified callbacks, truthfully worded
canonical choices, saved reads/returns, no stacked dialogue/no scrolling.
This tests the UI, not whether a stranger finds the romance appealing.
"""
import os, json, sys, traceback
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
URL=os.getenv('R4_REAL_URL','http://127.0.0.1:8765/index.html').split('?')[0]
DATA=json.loads((ROOT/'tools/romance-v19-scenes.json').read_text())['scenes']
FIX=json.loads((ROOT/'qa/current/romance-v13-fixtures.json').read_text())['fixtures']
KEY='gonglue:revision-r4.5-portrait:canonical'
OUT=ROOT/'qa/current/browser/romance-v19';OUT.mkdir(parents=True,exist_ok=True)
IDS=sorted(DATA,key=lambda x:('tslg'.index(x[0]),int(x[1:])))
SENSITIVE={'t02':'fan','s06':'dismiss','l06':'ban','g06':'deny','g07':'excuse','l07':'control','s07':'compare'}
OFFLINE=os.getenv('R4_OFFLINE_SMOKE')=='1'
HTML=(ROOT/'index.html').read_text() if OFFLINE else None
REPORT={'scope':'real HTTP Chromium/WebKit; offline smoke only when R4_OFFLINE_SMOKE=1','cases':[]}

def tap(page,selector):
 node=page.locator(selector).first
 assert node.count()==1,(selector,page.locator('#app').inner_text()[-300:])
 node.tap(timeout=12000)

def frame(page,scene,viewport):
 el=page.locator('.v19-director[data-v19-scene="'+scene+'"]')
 assert el.count()==1,(scene,page.locator('#app').inner_text()[-350:])
 x=el.evaluate('''e=>{
 const p=e.querySelector('.mobile-text p'),t=e.querySelector('.mobile-text');
 const cue=e.querySelector('.v18-scene-cue'),title=e.querySelector('.v11-scene-id');
 const a=p?.getBoundingClientRect(),b=t?.getBoundingClientRect(),c=cue?.getBoundingClientRect();
 const h=title?.getBoundingClientRect(),s=e.querySelector('.io-sheet')?.getBoundingClientRect();
 return {text:p?.innerText||'',voice:e.querySelector('.mobile-speaker')?.innerText||'',
  mode:e.dataset.mode,after:e.dataset.v17After==='1',cue:cue?.textContent?.trim(),art:e.dataset.v19Art,
  cueVisible:!!c&&c.width>0&&c.height>0,
  cueClash:!!c&&!!h&&c.width>0&&c.height>0&&Math.min(c.right,h.right)>Math.max(c.left,h.left)&&Math.min(c.bottom,h.bottom)>Math.max(c.top,h.top),
  cueVsSheet:!!c&&!!s&&c.width>0&&c.height>0&&c.bottom>s.top+3,
  textVisible:!!a&&!!b&&a.width>0&&a.height>0&&a.top>=b.top-3&&a.bottom<=b.bottom+3,
  lineCount:t?.querySelectorAll('.line').length,textScroll:t?.scrollHeight||0,textClient:t?.clientHeight||0,
  sheetHeight:s?.height||0,photo:e.querySelector('.io-film-image')?.naturalWidth||0,
  buttonHeights:[...e.querySelectorAll('button:not([disabled])')].map(n=>n.getBoundingClientRect().height),
  viewportOverflow:document.documentElement.scrollWidth>innerWidth+3};
 }''')
 assert x['voice'] and x['text'] and x['lineCount']==1,(scene,x)
 assert x['textVisible'] and x['textScroll']<=x['textClient']+3,(scene,x)
 assert x['sheetHeight']<=viewport[1]/3+3 and not x['viewportOverflow'],(scene,x)
 assert x['photo']>=1024 and x['art']=='existing-character-portrait-needs-specific-location-cg',(scene,x)
 assert all(h>=43 for h in x['buttonHeights']),(scene,x)
 assert x['cue']==DATA[scene]['cue'],(scene,x)
 if x['mode']=='reading' and x['after']:
  assert not x['cueVisible'],(scene,'old scene card blocks real consequence',x)
 elif x['mode']=='reading':
  assert x['cueVisible'] and not x['cueClash'] and not x['cueVsSheet'],(scene,'caption occlusion',x)
 else:
  assert x['mode']=='decision' and not x['cueVisible'],(scene,'cue still blocking decisions',x)
 return x

def run_case(browser,engine,scene,n):
 w,h=[(320,568),(390,844),(430,932)][n%3]
 ctx=browser.new_context(viewport={'width':w,'height':h},is_mobile=True,has_touch=True)
 page=ctx.new_page();errors=[]
 page.on('pageerror',lambda error:errors.append(str(error)))
 try:
  payload=json.loads(json.dumps(FIX[scene],ensure_ascii=False))
  if scene in ('t02','s06','l07','g06'):
   payload.setdefault('ui',{})['personalV17']={'v':2,'key':scene+':'+str(len(payload['commands'])),
           'cursor':99,'page':10,'after':None}
  raw=json.dumps(payload,ensure_ascii=False)
  if OFFLINE:
   js='''(()=>{const m=new Map();m.set(__KEY__,__RAW__);const fake={getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k),clear:()=>m.clear(),key:i=>[...m.keys()][i]||null,get length(){return m.size}};Object.defineProperty(window,'localStorage',{value:fake,configurable:true});})();'''.replace('__KEY__',json.dumps(KEY)).replace('__RAW__',json.dumps(raw,ensure_ascii=False))
   page.add_init_script(script=js)
   page.goto('about:blank')
   page.set_content(HTML,wait_until='load',timeout=50000)
  else:
   page.add_init_script(script='if(localStorage.getItem('+json.dumps(KEY)+')===null)localStorage.setItem('+json.dumps(KEY)+','+json.dumps(raw,ensure_ascii=False)+');')
   assert page.goto(URL,wait_until='load',timeout=50000).ok
  assert page.locator('body').get_attribute('data-current')==scene,(scene,'wrong loaded scene')
  expected=page.evaluate('v17Intro().map(b=>({text:b.text,voice:b.voice}))')
  assert len(expected)>=2 and len(expected)<=8,(scene,'too much text',expected)
  assert expected[0]['voice'] in ['唐映雪','沈清辞','林见月','顾晚棠'],(scene,expected[0])
  for index,item in enumerate(expected):
   view=frame(page,scene,(w,h))
   assert view['mode']=='reading' and view['text']==item['text'] and view['voice']==item['voice'],(scene,index,item,view)
   if not OFFLINE and engine=='chromium' and scene in ('t02','s06','l06','g06') and index==1:
    snap=(view['text'],view['voice'])
    page.reload(wait_until='load')
    again=frame(page,scene,(w,h))
    assert (again['text'],again['voice'])==snap,(scene,'cursor lost after refresh')
   if engine=='chromium' and scene in ('t02','s06','l07','g06') and index==1:
    page.screenshot(path=str(OUT/(scene+'-cause.png')))
   tap(page,'[data-v11-next]')
  decision=frame(page,scene,(w,h))
  assert decision['mode']=='decision',(scene,'no actual choice reached')
  assert decision['text']==expected[-1]['text'],(scene,'last question vanished')
  if engine=='chromium' and scene in ('t02','s06','l07','g06'):
   page.screenshot(path=str(OUT/(scene+'-decision.png')))
  choices={}
  for _ in range(12):
   visible=page.locator('.v17-choice').evaluate_all('es=>es.map(e=>({id:e.dataset.v17Choice,label:e.innerText.trim()}))')
   for c in visible:choices[c['id']]=c['label']
   if page.locator('[data-v17-page="1"]:not([disabled])').count():tap(page,'[data-v17-page="1"]')
   else:break
  legal=page.evaluate('renderScene(state,DATA).choices.filter(c=>c.enabled).map(c=>c.id)')
  assert set(choices)==set(legal),(scene,'hidden or fabricated choice',choices,legal)
  for key,label in DATA[scene]['labels'].items():
   if key in legal:assert choices[key]==label,(scene,'authored reply not presented',key,choices[key],label)
  want=SENSITIVE.get(scene) if SENSITIVE.get(scene) in legal else legal[0]
  for _ in range(12):
   if page.locator('[data-v17-choice="'+want+'"]').count():break
   prev=page.locator('[data-v17-page="-1"]:not([disabled])')
   if prev.count():tap(page,'[data-v17-page="-1"]')
   else:break
  for _ in range(12):
   if page.locator('[data-v17-choice="'+want+'"]').count():break
   nxt=page.locator('[data-v17-page="1"]:not([disabled])')
   if nxt.count():tap(page,'[data-v17-page="1"]')
   else:break
  assert page.locator('[data-v17-choice="'+want+'"]').count()==1,(scene,want)
  before=page.evaluate('state.history.length')
  tap(page,'[data-v17-choice="'+want+'"]')
  effects=page.evaluate('''()=>({history:state.history.at(-1),length:state.history.length,
   flags:state.f})''')
  assert effects['length']==before+1 and effects['history']['from']==scene and effects['history']['id']==want,(scene,effects)
  if page.locator('.v19-director[data-v17-after="1"]').count():
   line=frame(page,scene,(w,h))
   assert line['mode']=='reading' and line['text'],(scene,'invisible consequence')
  assert not errors,(scene,errors)
  return {'scene':scene,'displayedTurns':len(expected),'callbackDisplayed':len(expected)>len(DATA[scene]['beats']),
    'action':want,'width':w,'historyLength':effects['length']}
 finally:ctx.close()

with sync_playwright() as pw:
 for engine in ['chromium']+(['webkit'] if os.getenv('R4_WEBKIT')=='1' else []):
  options={'headless':True,'args':['--no-sandbox']} if engine=='chromium' else {'headless':True}
  if engine=='chromium' and os.getenv('R4_CHROMIUM_EXECUTABLE'):
   options['executable_path']=os.getenv('R4_CHROMIUM_EXECUTABLE')
  browser=getattr(pw,engine).launch(**options)
  for i,scene in enumerate(IDS):
   try:
    result=run_case(browser,engine,scene,i)
    REPORT['cases'].append({'status':'PASS','engine':engine,**result})
    print('PASS',engine,scene,'turns',result['displayedTurns'],flush=True)
   except Exception as error:
    REPORT['cases'].append({'status':'FAIL','engine':engine,'scene':scene,'error':repr(error)})
    print('FAIL',engine,scene,repr(error),flush=True);traceback.print_exc()
  browser.close()
REPORT['status']='PASS' if all(c['status']=='PASS' for c in REPORT['cases']) else 'FAIL'
(ROOT/'qa/current/romance-v19-report.json').write_text(json.dumps(REPORT,ensure_ascii=False,indent=2)+'\n')
print('V19',REPORT['status'],len(REPORT['cases']))
if REPORT['status']!='PASS':sys.exit(1)
