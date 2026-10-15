#!/usr/bin/env python3
"""Native HTTP / ordinary-touch cinematic reader regression. Not a hardware test."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import hashlib,json,os
R=Path(__file__).resolve().parent.parent
URL=os.environ.get('R4_REAL_URL','http://127.0.0.1:8765/index.html')
KEY='gonglue:revision-r4.5-portrait:canonical'
H=hashlib.sha256((R/'data/STORY.json').read_bytes()).hexdigest()
W=json.loads((R/'qa/current/choice-witness-prefixes.json').read_text())['choices']
REPORT={'scope':'real HTTP Chromium touch; not physical device','head':os.environ.get('GITHUB_SHA'),'cases':[]}
D=R/'qa/current/browser/cinematic';D.mkdir(parents=True,exist_ok=True)
def record(name,work):
 try:
  detail=work();REPORT['cases'].append({'name':name,'status':'PASS','detail':detail});print('PASS',name,flush=True)
 except Exception as exc:
  REPORT['cases'].append({'name':name,'status':'FAIL','error':repr(exc)});print('FAIL',name,repr(exc),flush=True)
def local_save(commands):
 return {'version':'bookside-revision-r4.3','storyHash':H,'commands':commands,'ui':{'phase':'scene','page':0,'choicePage':0,'large':False,'soundOn':False},'profile':{'endings':{},'bonuses':{},'readPages':[]}}
with sync_playwright() as play:
 browser=play.chromium.launch(headless=True,args=['--no-sandbox'])
 def open_game(w,h,commands=None):
  ctx=browser.new_context(viewport={'width':w,'height':h},is_mobile=True,has_touch=True)
  page=ctx.new_page();page.set_default_timeout(7000)
  assert page.goto(URL,wait_until='load').ok
  if commands is not None:
   payload=local_save(commands)
   page.evaluate('([k,v])=>localStorage.setItem(k,JSON.stringify(v))',[KEY,payload])
   page.reload(wait_until='load')
  assert page.locator('meta[name="story-sha256"]').get_attribute('content')==H
  return ctx,page
 for w,h in [(320,568),(360,780),(375,812),(390,844),(430,932)]:
  def scenario(w=w,h=h):
   ctx,page=open_game(w,h)
   try:
    assert page.locator('.vn-frame').get_attribute('data-mode')=='reading'
    assert page.locator('[data-choice]').count()==0
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    for i in range(7):
     assert page.locator('[data-page-next]').count()==1,(w,i)
     page.locator('[data-page-next]').tap()
    assert page.locator('.vn-frame').get_attribute('data-mode')=='decision'
    assert page.locator('.vn-dock [data-choice]').count()==3
    page.screenshot(path=str(D/f'intro-{w}.png'))
    return {'size':f'{w}x{h}','firstDecisionVisible':True}
   finally:ctx.close()
  record(f'INTRO_{w}',scenario)
 def scene_case():
  cmds=W['A6a/accept']['prefix'][:-1]
  ctx,page=open_game(390,844,cmds)
  try:
   assert page.locator('body').get_attribute('data-current')=='A6a'
   before=page.evaluate('([k])=>JSON.parse(localStorage.getItem(k)).commands.length',[KEY])
   seen=0
   while page.locator('[data-page-next]').count() and seen<35:
    page.locator('.vn-stage').tap(position={'x':15,'y':210})
    seen+=1
   assert seen<35
   assert page.locator('.vn-frame').get_attribute('data-mode')=='decision'
   after=page.evaluate('([k])=>JSON.parse(localStorage.getItem(k)).commands.length',[KEY])
   assert before==after,('reading changed canonical history',before,after)
   assert page.locator('.vn-dock [data-choice-group]').count()>=2
   page.screenshot(path=str(D/'A6a-decision.png'))
   return {'readingAdvances':seen,'commandsPreserved':after}
  finally:ctx.close()
 record('CANONICAL_LONG_SCENE_AND_TAP_GUARD',scene_case)
 browser.close()
REPORT['status']='PASS' if all(c['status']=='PASS' for c in REPORT['cases']) else 'FAIL'
(R/'qa/current/vn-cinematic-report.json').write_text(json.dumps(REPORT,ensure_ascii=False,indent=2)+'\n')
if REPORT['status']!='PASS':raise SystemExit(1)
