#!/usr/bin/env python3
"""V22 mobile UX: 18 core scenes show only playable answers, no cost previews.
Real HTTP Chromium/WebKit in CI; R4_OFFLINE_SMOKE for restricted local QA.
"""
import json,os,sys,traceback
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
URL=os.getenv('R4_REAL_URL','http://127.0.0.1:8765/index.html').split('?')[0]
OFFLINE=os.getenv('R4_OFFLINE_SMOKE')=='1'
HTML=(ROOT/'index.html').read_text() if OFFLINE else None
KEY='gonglue:revision-r4.5-portrait:canonical'
FIX=json.loads((ROOT/'qa/current/romance-v11-fixtures.json').read_text())['fixtures']
ARCS=json.loads((ROOT/'tools/romance-v11-arcs.json').read_text())['arcs']
OUT=ROOT/'qa/current/browser/romance-v22'
OUT.mkdir(parents=True,exist_ok=True)
RESULT={'scope':'18 key scenes / real touch Chromium and WebKit / no pre-choice warning','cases':[]}
def tap(page,css):
 b=page.locator(css).first
 assert b.count()==1,(css,page.locator('#app').inner_text()[-210:])
 b.tap(timeout=15000)
def episode(browser,engine,scene,i):
 w,h=[(320,568),(390,844),(430,932)][i%3]
 ctx=browser.new_context(viewport={'width':w,'height':h},is_mobile=True,has_touch=True)
 page=ctx.new_page()
 raw=json.dumps(FIX[scene],ensure_ascii=False)
 try:
  if OFFLINE:
   script='''(()=>{const m=new Map([[__K__,__D__]]);const store={getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k),clear:()=>m.clear(),key:i=>[...m.keys()][i]||null,get length(){return m.size}};Object.defineProperty(window,'localStorage',{value:store,configurable:true});})();'''.replace('__K__',json.dumps(KEY)).replace('__D__',json.dumps(raw,ensure_ascii=False))
   page.add_init_script(script=script)
   page.goto('about:blank')
   page.set_content(HTML,wait_until='load',timeout=50000)
  else:
   page.add_init_script(script='if(localStorage.getItem('+json.dumps(KEY)+')===null)localStorage.setItem('+json.dumps(KEY)+','+json.dumps(raw,ensure_ascii=False)+');')
   assert page.goto(URL,wait_until='load',timeout=45000).ok
  assert page.locator('body').get_attribute('data-current')==scene
  lines=page.evaluate('v11Props().intro')
  assert 2<=len(lines)<=3
  assert not any('就是骗她们' in x['text'] for x in lines)
  for part in lines:
   assert page.locator('.v11-director .mobile-text p').text_content().strip()==part['text']
   tap(page,'[data-v11-next]')
  assert page.locator('.v11-director[data-mode="decision"]').count()==1
  seen={}
  for _ in range(10):
   assert page.locator('.v11-choice-risk').count()==0,scene
   cards=page.locator('[data-v11-choice]').evaluate_all('''els=>els.map(e=>({
    id:e.dataset.v11Choice,text:e.innerText.trim(),
    extra:e.querySelectorAll('small,.v11-choice-risk').length,
    height:e.getBoundingClientRect().height}))''')
   for card in cards:
    assert card['extra']==0 and card['height']>=44,(scene,card)
    assert not any(x in card['text'] for x in ['你已答应只和','她可能','接受关系变冷','可能会失去']),(scene,card)
    seen[card['id']]=card['text']
   if page.locator('[data-v11-page="1"]:not([disabled])').count():
    tap(page,'[data-v11-page="1"]')
   else:break
  legal=page.evaluate('DATA.scenes[state.current].choices.filter(c=>condition(state,c.when)).map(c=>c.id)')
  assert set(seen)==set(legal),(scene,seen,legal)
  if engine=='chromium' and scene in ('A3b','s03','A7a'):
   page.screenshot(path=str(OUT/(scene+'-clean-choices.png')))
  for _ in range(10):
   if not page.locator('[data-v11-page="-1"]:not([disabled])').count():break
   tap(page,'[data-v11-page="-1"]')
  choice=page.locator('[data-v11-choice]').first.get_attribute('data-v11-choice')
  before=page.evaluate('state.history.length')
  tap(page,'[data-v11-choice="'+choice+'"]')
  done=page.evaluate('''()=>({size:state.history.length,entry:state.history.at(-1),
   spoken:document.querySelector('.v11-director .mobile-text p')?.textContent})''')
  count=2 if page.evaluate('!!DATA.scenes[state.history.at(-1).from].decisionSteps') else 1
  assert done['size']==before+count and done['entry']['from']==scene and done['entry']['id']==choice,(scene,done)
  assert done['spoken'] and page.locator('.v11-director[data-v11-after="1"]').count()==1
  if scene=='A7a':
   old=page.evaluate('''()=>v11Safe({v:1,key:'old',step:2,page:2,after:{
    scene:'A7a',choice:state.history.at(-1).id,revision:state.history.length,step:1}})''')
   assert old['step']==0 and old['page']==0 and old['after']['scene']=='A7a',old
  return {'scene':scene,'visibleActions':len(seen),'commands':count,'viewport':str(w)+'x'+str(h)}
 finally:ctx.close()
with sync_playwright() as pw:
 for engine in ['chromium']+(['webkit'] if os.getenv('R4_WEBKIT')=='1' else []):
  kw={'headless':True,'args':['--no-sandbox']} if engine=='chromium' else {'headless':True}
  if engine=='chromium' and os.getenv('R4_CHROMIUM_EXECUTABLE'):kw['executable_path']=os.getenv('R4_CHROMIUM_EXECUTABLE')
  browser=getattr(pw,engine).launch(**kw)
  for i,scene in enumerate(ARCS):
   try:
    case=episode(browser,engine,scene,i)
    RESULT['cases'].append({'engine':engine,'status':'PASS',**case})
    print('PASS V22',engine,scene,flush=True)
   except Exception as e:
    RESULT['cases'].append({'engine':engine,'scene':scene,'status':'FAIL','error':repr(e)})
    print('FAIL V22',engine,scene,repr(e),flush=True)
    traceback.print_exc()
  browser.close()
RESULT['status']='PASS' if all(x['status']=='PASS' for x in RESULT['cases']) else 'FAIL'
(ROOT/'qa/current/romance-v22-report.json').write_text(json.dumps(RESULT,ensure_ascii=False,indent=2)+'\n')
print('V22',RESULT['status'],len(RESULT['cases']))
if RESULT['status']!='PASS':sys.exit(1)
