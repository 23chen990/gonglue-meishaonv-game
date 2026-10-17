#!/usr/bin/env python3
"""V20 direct-leaf mobile acceptance: all 18 key scenes show actionable
canonical choices, not opaque intent categories. The engine still records
both genuine commands for decisionSteps, preserving old saves and replay.
Run real HTTP with Playwright Chromium and WebKit in CI.
"""
import os, json, sys, traceback
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
BASE=os.getenv('R4_REAL_URL','http://127.0.0.1:8765/index.html').split('?')[0]
OUT=ROOT/'qa/current/browser/romance-v20'
OUT.mkdir(parents=True,exist_ok=True)
KEY='gonglue:revision-r4.5-portrait:canonical'
FIX=json.loads((ROOT/'qa/current/romance-v11-fixtures.json').read_text())['fixtures']
ARCS=json.loads((ROOT/'tools/romance-v11-arcs.json').read_text())['arcs']
PREFER={'A1b':'check','A2a':'negotiated','A2b':'quiet','A3a':'shared','A3b':'g',
        'A4a':'fellowship','A4b':'extract','A5a':'bounded','A5b':'rival','A6a':'accept',
        'UNWRITTEN':'offer','A6b':'relationships','A7a':'private','A7b':'pause',
        't03':'exclusive','s03':'wait','l03':'open','g03':'decline'}
SCENES=list(ARCS)
REPORT={'scope':'18 key moments, all concrete choices, source-accurate context, true 1 or 2 engine commands, HTTP mobile Chromium/WebKit','cases':[]}

def tap(page,css):
 q=page.locator(css).first
 assert q.count()==1,(css,page.locator('#app').inner_text()[-360:])
 q.tap(timeout=12000)

def visible(page,scene,height):
 el=page.locator('.v11-director[data-v11-scene="'+scene+'"]')
 assert el.count()==1,(scene,page.locator('#app').inner_text()[-400:])
 v=el.evaluate('''e=>{
 const t=e.querySelector('.mobile-text'),p=t?.querySelector('p'),s=e.querySelector('.io-sheet');
 const r=p?.getBoundingClientRect(),b=t?.getBoundingClientRect(),q=s?.getBoundingClientRect();
 return {text:p?.innerText||'',voice:e.querySelector('.mobile-speaker')?.innerText||'',mode:e.dataset.mode,
 visible:!!r&&!!b&&r.height>0&&r.top>=b.top-3&&r.bottom<=b.bottom+3,
 scroll:t?.scrollHeight||0,client:t?.clientHeight||0,sheet:q?.height||0,
 overflow:document.documentElement.scrollWidth>innerWidth+2,
 heights:[...e.querySelectorAll('button:not([disabled])')].map(x=>x.getBoundingClientRect().height),
 photo:!!e.querySelector('.io-film-image')?.naturalWidth};
 }''')
 assert v['text'] and v['voice'] and v['visible'],(scene,v)
 assert v['scroll']<=v['client']+2 and v['sheet']<=height/3+3,(scene,v)
 assert not v['overflow'] and v['photo'],(scene,v)
 assert all(h>=44 for h in v['heights']),(scene,'small tap target',v)
 return v

def test_case(browser,engine,scene,i):
 w,h=[(320,568),(390,844),(430,932)][i%3]
 ctx=browser.new_context(viewport={'width':w,'height':h},is_mobile=True,has_touch=True)
 page=ctx.new_page();errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 try:
  raw=json.dumps(FIX[scene],ensure_ascii=False)
  page.add_init_script(script='if(window.localStorage.getItem('+json.dumps(KEY)+')===null)window.localStorage.setItem('+json.dumps(KEY)+','+json.dumps(raw,ensure_ascii=False)+');')
  assert page.goto(BASE,wait_until='load',timeout=45000).ok
  intro=page.evaluate('v11Props().intro.map(x=>x.text)')
  assert 2<=len(intro)<=3,(scene,intro)
  for line in intro:
   v=visible(page,scene,h)
   assert v['mode']=='reading' and v['text']==line,(scene,line,v)
   tap(page,'[data-v11-next]')
  decision=visible(page,scene,h)
  assert decision['mode']=='decision' and decision['text']==intro[-1],(scene,decision,intro)
  allowed=page.evaluate('''()=>DATA.scenes[state.current].choices.filter(c=>condition(state,c.when)).map(c=>c.id)''')
  assert allowed,scene
  shown={}
  for _ in range(12):
   visible(page,scene,h)
   for c in page.locator('[data-v11-choice]').evaluate_all('es=>es.map(e=>({id:e.dataset.v11Choice,label:e.querySelector(".v11-choice-main")?.innerText}))'):
    shown[c['id']]=c['label']
   next_button=page.locator('[data-v11-page="1"]:not([disabled])')
   if next_button.count():next_button.first.tap()
   else:break
  assert set(shown)==set(allowed),(scene,'wrong set of concrete choices',shown,allowed)
  assert not any(id.startswith('intent:') for id in shown),(scene,'opaque category still displayed')
  for id,label in shown.items():
   assert label==ARCS[scene]['choices'][id]['label'] or (scene=='A3b' and id in ('l','g')),(scene,id,label)
  if scene=='A3b':
   assert '面馆' in shown['g'] and '对账' not in shown['g']
  if scene=='A4a':assert any('报名截止' in s for s in intro)
  if scene=='A4b':assert any('不是许照导出的' in s for s in intro)
  if scene=='A6a':
   assert any('视频只截' in s or '视频剪掉' in s for s in intro)
   if any(k in allowed for k in ('public','partner','backstage')):
    assert not any('我手里还没有能公开核验的证据' in s for s in intro)
  if scene in ('t03','s03','l03','g03'):assert any('约会' in s for s in intro)
  wanted=PREFER[scene]
  for _ in range(12):
   if page.locator('[data-v11-choice="'+wanted+'"]').count():break
   prev=page.locator('[data-v11-page="-1"]:not([disabled])')
   if not prev.count():break
   prev.first.tap()
  for _ in range(12):
   if page.locator('[data-v11-choice="'+wanted+'"]').count():break
   nxt=page.locator('[data-v11-page="1"]:not([disabled])')
   if not nxt.count():break
   nxt.first.tap()
  assert page.locator('[data-v11-choice="'+wanted+'"]').count()==1,(scene,wanted,shown)
  before=page.evaluate('state.history.length')
  if engine=='chromium' and scene in ('A3b','A4a','A4b','A6a','t03'):
   page.screenshot(path=str(OUT/(scene+'-choices.png')))
  tap(page,'[data-v11-choice="'+wanted+'"]')
  expected=2 if page.evaluate('(id)=>DATA.scenes[id].decisionSteps!=null',scene) else 1
  result=page.evaluate('''()=>({size:state.history.length,last:state.history.at(-1),
     prev:state.history.at(-2),intent:state.decisionIntent})''')
  assert result['size']==before+expected,(scene,wanted,'lost real commands',result)
  assert result['last']['from']==scene and result['last']['id']==wanted,(scene,wanted,result)
  if expected==2:assert result['prev']['id'].startswith('intent:') and result['prev']['from']==scene,(scene,result)
  assert result['intent'] is None,(scene,'phantom intent remains',result)
  assert page.locator('.v11-director[data-v11-after="1"]').count()==1,(scene,'no immediate visible consequence')
  feedback=visible(page,scene,h)
  assert feedback['text']==ARCS[scene]['choices'][wanted]['response']['text'],(scene,feedback,wanted)
  if engine=='chromium' and scene in ('A3b','A4a','A6a'):
   page.reload(wait_until='load')
   assert page.locator('.v11-director[data-v11-after="1"]').count()==1,(scene,'lost result on refresh')
   assert visible(page,scene,h)['text']==feedback['text'],scene
  assert not errors,(scene,errors)
  return {'scene':scene,'choice':wanted,'eligible':len(allowed),'beats':len(intro),'commands':expected,'screen':str(w)+'x'+str(h)}
 finally:ctx.close()

with sync_playwright() as pw:
 for name in ['chromium']+(['webkit'] if os.getenv('R4_WEBKIT')=='1' else []):
  opts={'headless':True,'args':['--no-sandbox']} if name=='chromium' else {'headless':True}
  if name=='chromium' and os.getenv('R4_CHROMIUM_EXECUTABLE'):
   opts['executable_path']=os.getenv('R4_CHROMIUM_EXECUTABLE')
  browser=getattr(pw,name).launch(**opts)
  for i,scene in enumerate(SCENES):
   try:
    result=test_case(browser,name,scene,i)
    REPORT['cases'].append({'engine':name,'status':'PASS',**result})
    print('PASS V20',name,scene,result['choice'],result['commands'],'commands',flush=True)
   except Exception as err:
    REPORT['cases'].append({'engine':name,'scene':scene,'status':'FAIL','error':repr(err)})
    print('FAIL V20',name,scene,repr(err),flush=True)
    traceback.print_exc()
  browser.close()
REPORT['status']='PASS' if all(r['status']=='PASS' for r in REPORT['cases']) else 'FAIL'
(ROOT/'qa/current/romance-v20-report.json').write_text(json.dumps(REPORT,ensure_ascii=False,indent=2)+'\n')
print('V20',REPORT['status'],len(REPORT['cases']))
if REPORT['status']!='PASS':sys.exit(1)
