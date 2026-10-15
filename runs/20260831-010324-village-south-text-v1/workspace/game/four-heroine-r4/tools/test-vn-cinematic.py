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
DATA=json.loads((R/'data/STORY.json').read_text())
ENGINE=os.environ.get('R4_BROWSER','chromium')
assert ENGINE in ('chromium','webkit')
REPORT={'scope':'real HTTP '+ENGINE+' touch; not physical device','head':os.environ.get('GITHUB_SHA'),'cases':[]}
D=R/'qa/current/browser'/('cinematic-webkit' if ENGINE=='webkit' else 'cinematic');D.mkdir(parents=True,exist_ok=True)
def record(name,work):
 try:
  detail=work();REPORT['cases'].append({'name':name,'status':'PASS','detail':detail});print('PASS',name,flush=True)
 except Exception as exc:
  REPORT['cases'].append({'name':name,'status':'FAIL','error':repr(exc)});print('FAIL',name,repr(exc),flush=True)
def local_save(commands):
 return {'version':'bookside-revision-r4.3','storyHash':H,'commands':commands,'ui':{'phase':'scene','page':0,'choicePage':0,'large':False,'soundOn':False},'profile':{'endings':{},'bonuses':{},'readPages':[]}}
with sync_playwright() as play:
 browser=getattr(play,ENGINE).launch(**({'headless':True,'args':['--no-sandbox']} if ENGINE=='chromium' else {'headless':True}))
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
     # Every current canonical beat must be readable without another swipe.
     visible=page.locator('.vn-scroll').evaluate(
      'x=>({viewport:x.clientHeight,content:x.scrollHeight,top:x.scrollTop})')
     assert visible['content']<=visible['viewport']+2,(
      'mandatory beat is clipped behind inner scroll',w,h,i,visible)
     assert page.locator('[data-page-next]').count()==1,(w,i)
     page.locator('[data-page-next]').tap()
    assert page.locator('.vn-frame').get_attribute('data-mode')=='decision'
    assert page.locator('.vn-dock [data-choice]').count()==3
    # Fully visible real choices and the last causal beat, not just DOM presence.
    layout=page.evaluate("""()=>{
      const box=x=>x.getBoundingClientRect();
      const sheet=box(document.querySelector('.vn-sheet'));
      const dock=box(document.querySelector('.vn-dock'));
      const scroll=box(document.querySelector('.vn-scroll'));
      const last=[...document.querySelectorAll('.vn-scroll .line')].at(-1);
      const beat=last&&box(last),portrait=document.querySelector('.vn-portrait');
      const actor=portrait&&box(portrait);
      const choices=[...document.querySelectorAll('.vn-dock [data-choice]')].map(x=>{
        const r=box(x);return {height:r.height,visible:Math.max(0,Math.min(dock.bottom,r.bottom)-Math.max(dock.top,r.top))};
      });
      return {sheetTop:sheet.top,
        beatVisible:beat?Math.max(0,Math.min(scroll.bottom,beat.bottom)-Math.max(scroll.top,beat.top)):0,
        actorVisible:actor?Math.max(0,Math.min(sheet.top,actor.bottom)-Math.max(65,actor.top)):0,
        choices,overflow:document.documentElement.scrollWidth>innerWidth};
    }""")
    assert layout['beatVisible']>=45,(w,h,'last causal beat obscured',layout)
    assert layout['actorVisible']>=37,(w,h,'heroine invisible behind reader sheet',layout)
    assert not layout['overflow'],(w,h,'horizontal overflow')
    assert all(x['height']>=44 and x['visible']>=x['height']-2 for x in layout['choices']),(w,h,layout)
    page.screenshot(path=str(D/f'intro-{w}.png'))
    return {'size':f'{w}x{h}','firstDecisionVisible':True}
   finally:ctx.close()
  record(f'INTRO_{w}',scenario)
 def scene_case():
  witness=W['A6a/accept']['prefix']
  split=next(i for i,cmd in enumerate(witness) if cmd['from']=='A6a' and cmd['id'].startswith('intent:'))
  cmds=witness[:split]  # Before the genuine first-stage choice, not after it.
  ctx,page=open_game(390,844,cmds)
  taps=0;stalled=0;last_key=None
  try:
   current=page.locator('body').get_attribute('data-current')
   assert current=='A6a',('save replay restored unexpected scene',current)
   before=page.evaluate('([k])=>JSON.parse(localStorage.getItem(k)).commands.length',[KEY])
   while page.locator('[data-page-next]').count() and taps<35:
    key_before=page.locator('.vn-frame').get_attribute('data-reader-key')
    page.locator('.vn-stage').tap(position={'x':15,'y':210})
    taps+=1
    key_after=page.locator('.vn-frame').get_attribute('data-reader-key')
    if key_after==key_before:stalled+=1
    last_key=key_after
    if stalled>=3:break
   assert stalled<3,('touch was received but reader did not advance',taps,last_key)
   assert taps<35,('unexpected number of reading pages',taps,last_key)
   mode=page.locator('.vn-frame').get_attribute('data-mode')
   assert mode=='decision',('reader did not reach decision',mode,taps,last_key)
   after=page.evaluate('([k])=>JSON.parse(localStorage.getItem(k)).commands.length',[KEY])
   assert before==after,('reading changed canonical history',before,after)
   groups=page.locator('.vn-dock [data-choice-group]').count()
   intents=page.locator('.vn-dock [data-choice^="intent:"]').evaluate_all(
    '(buttons)=>buttons.map(b=>b.dataset.choice)')
   expected=['intent:'+g['id'] for g in DATA['scenes']['A6a']['decisionSteps']]
   assert sorted(intents)==sorted(expected),(
    'genuine first-stage decisions not visible',intents,expected)
   assert groups==0,('genuine staged decision must not be replaced by obsolete UI navigation',groups)
   page.screenshot(path=str(D/'A6a-decision.png'))
   return {'readingAdvances':taps,'commandsPreserved':after,'stalledTaps':stalled,
           'trueIntentOptions':intents,'obsoleteGroups':groups}
  except Exception as exc:
   try:
    diagnostic=page.evaluate("""() => ({
      scene:document.body?.dataset.current,
      mode:document.querySelector('.vn-frame')?.dataset.mode,
      readerKey:document.querySelector('.vn-frame')?.dataset.readerKey,
      nextButtons:document.querySelectorAll('[data-page-next]').length,
      choiceGroups:document.querySelectorAll('.vn-dock [data-choice-group]').length,
      stageHit:document.elementFromPoint(15,210)?.className,
      dockTail:document.querySelector('.vn-dock')?.innerText.slice(-260),
      notice:document.querySelector('#notice')?.innerText.slice(-180)
    })""")
    page.screenshot(path=str(D/'A6a-diagnostic-failure.png'))
   except Exception as capture_exc:diagnostic={'captureError':repr(capture_exc)}
   raise AssertionError(f'long scene {ENGINE}: taps={taps} stalled={stalled} DOM={diagnostic} original={exc!r}') from exc
  finally:ctx.close()
 record('CANONICAL_LONG_SCENE_AND_TAP_GUARD',scene_case)
 def dynamic_height():
  ctx,page=open_game(390,844)
  try:
   page.set_viewport_size({'width':360,'height':700})
   page.wait_for_timeout(150)
   before=page.locator('.vn-scroll').evaluate('x=>({client:x.clientHeight,total:x.scrollHeight})')
   assert before['total']<=before['client']+2,('dynamic height clipped first beat',before)
   assert not page.evaluate('document.documentElement.scrollWidth>innerWidth')
   page.locator('[data-page-next]').tap()
   after=page.locator('.vn-scroll').evaluate('x=>({client:x.clientHeight,total:x.scrollHeight})')
   assert after['total']<=after['client']+2,('dynamic height clipped next beat',after)
   return {'resizedWidth':360,'resizedHeight':700,'firstTwoPagesFullyVisible':True}
  finally:ctx.close()
 record('DYNAMIC_BROWSER_VIEWPORT_RELAYOUT',dynamic_height)

 def large_first_fork():
  ctx,page=open_game(320,568)
  try:
   page.locator('#menu').tap()
   page.locator('[data-action="font"]').tap()
   page.locator('[data-nav="story"]').first.tap()
   assert page.locator('body.large').count()==1
   for _ in range(7):page.locator('[data-page-next]').first.tap()
   page.wait_for_timeout(250)
   data=page.evaluate("""()=>{
    let area=document.querySelector('.vn-scroll'),dock=document.querySelector('.vn-dock'),
      beat=[...area.querySelectorAll('.line')].at(-1);
    const a=area.getBoundingClientRect(),b=beat.getBoundingClientRect(),d=dock.getBoundingClientRect();
    return {beatVisible:Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)),
      buttons:[...dock.querySelectorAll('[data-choice]')].map(x=>{let r=x.getBoundingClientRect();return {height:r.height,visible:Math.max(0,Math.min(d.bottom,r.bottom)-Math.max(d.top,r.top))}})};
   }""")
   assert data['beatVisible']>=45,('large font hid causal beat',data)
   assert len(data['buttons'])==3 and all(b['height']>=44 and b['visible']>=b['height']-2 for b in data['buttons']),data
   page.screenshot(path=str(D/'intro-320-large.png'))
   return data
  finally:ctx.close()
 record('LARGE_FONT_320_FIRST_FORK',large_first_fork)

 browser.close()
REPORT['status']='PASS' if all(c['status']=='PASS' for c in REPORT['cases']) else 'FAIL'
(R/'qa/current'/('vn-cinematic-webkit-report.json' if ENGINE=='webkit' else 'vn-cinematic-report.json')).write_text(json.dumps(REPORT,ensure_ascii=False,indent=2)+'\n')
if REPORT['status']!='PASS':raise SystemExit(1)
