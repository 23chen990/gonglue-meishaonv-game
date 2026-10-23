#!/usr/bin/env python3
"""Verify that actively harmful vs honest personal choices lead to distinct
canonical flags AND distinct first visible consequences. No fake affection.
"""
import json,os,sys,traceback
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
URL=os.getenv('R4_REAL_URL','http://127.0.0.1:8765/index.html').split('?')[0]
FIX=json.loads((ROOT/'qa/current/romance-v13-fixtures.json').read_text())['fixtures']
KEY='gonglue:revision-r4.5-portrait:canonical'
PAIRS={'t02':('fan','honest'),'s06':('dismiss','truth'),'l06':('ban','jealous'),'g06':('deny','clear')}
REPORT={'type':'canonical-harm-versus-truth-visual-contrast','cases':[]}
def tap(page,s):
 node=page.locator(s).first
 assert node.count()==1,(s,page.locator('body').inner_text()[-280:])
 node.tap(timeout=10000)
def take(browser,scene,choice):
 context=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)
 page=context.new_page()
 try:
  raw=json.dumps(FIX[scene],ensure_ascii=False)
  page.add_init_script(script="if(localStorage.getItem("+json.dumps(KEY)+")===null)localStorage.setItem("+json.dumps(KEY)+","+json.dumps(raw,ensure_ascii=False)+");")
  assert page.goto(URL,wait_until='load').ok
  for i in range(18):
   if page.locator('.v17-choice').count():break
   tap(page,'[data-v11-next]')
  else:raise AssertionError('missing decision '+scene)
  for i in range(8):
   if page.locator('[data-v17-choice="'+choice+'"]').count():break
   nxt=page.locator('[data-v17-page="1"]:not([disabled])')
   if nxt.count():nxt.first.tap()
   else:break
  assert page.locator('[data-v17-choice="'+choice+'"]').count()==1,(scene,choice)
  tap(page,'[data-v17-choice="'+choice+'"]')
  effect=page.evaluate('''()=>({last:state.history.at(-1),flag:state.f,raw:lastReply.map(x=>x.text)})''')
  lines=[]
  for i in range(20):
   if not page.locator('.v17-director[data-v17-after="1"]').count():break
   lines.append(page.locator('.v17-director .mobile-text').inner_text())
   tap(page,'[data-v11-next]')
  assert lines,(scene,choice,'no visible reaction')
  assert effect['last']['from']==scene and effect['last']['id']==choice
  return {'choice':choice,'flags':effect['flag'],'reaction':' '.join(lines),'sourceReply':effect['raw']}
 finally:context.close()
with sync_playwright() as pw:
 for engine in ['chromium']+(['webkit'] if os.getenv('R4_WEBKIT')=='1' else []):
  args={'headless':True,'args':['--no-sandbox']} if engine=='chromium' else {'headless':True}
  if engine=='chromium' and os.getenv('R4_CHROMIUM_EXECUTABLE'):
   args['executable_path']=os.getenv('R4_CHROMIUM_EXECUTABLE')
  browser=getattr(pw,engine).launch(**args)
  for scene,(harm,truth) in PAIRS.items():
   try:
    a=take(browser,scene,harm)
    b=take(browser,scene,truth)
    assert a['flags']!=b['flags'],(scene,'identical canonical state')
    assert a['reaction']!=b['reaction'],(scene,'identical on-screen outcome')
    REPORT['cases'].append({'scene':scene,'engine':engine,'status':'PASS','harm':harm,'truth':truth,
                            'harmResponse':a['reaction'],'truthResponse':b['reaction']})
    print('PASS',engine,scene,'distinct state and response',flush=True)
   except Exception as e:
    REPORT['cases'].append({'scene':scene,'engine':engine,'status':'FAIL','error':repr(e)})
    print('FAIL',engine,scene,repr(e),flush=True);traceback.print_exc()
  browser.close()
REPORT['status']='PASS' if all(x['status']=='PASS' for x in REPORT['cases']) else 'FAIL'
(ROOT/'qa/current/romance-v17-contrast-report.json').write_text(json.dumps(REPORT,ensure_ascii=False,indent=2)+'\n')
if REPORT['status']!='PASS':sys.exit(1)
