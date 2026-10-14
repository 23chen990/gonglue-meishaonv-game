"""2026-10-14 independent render/interaction QA. Fixture DOM + simulated localStorage.
Does NOT claim native HTTP persistence, hardware or human usability."""
from pathlib import Path
import json,hashlib,sys,os,traceback
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parent.parent
HTML=(R/'index.html').read_text()
STORY_SHA=hashlib.sha256((R/'data/STORY.json').read_bytes()).hexdigest()
KEY='gonglue:revision-r4.5-portrait:canonical'
NATIVE=os.environ.get('R4_MODE')=='native'
URL=os.environ.get('R4_REAL_URL','http://127.0.0.1:8765/index.html')
report={'scope':('Real HTTP Chromium and native localStorage; not device or human QA' if NATIVE else 'Injected inline DOM and simulated localStorage; not native URL/localStorage or humans'),'storySha256':STORY_SHA,'cases':[],'errors':[]}
shots=R/'qa/current/v45-screens';shots.mkdir(parents=True,exist_ok=True)
def check(name,cb):
 try:
  detail=cb();report['cases'].append({'name':name,'status':'PASS','detail':detail});print('PASS',name,detail,flush=True)
 except Exception as e:
  report['cases'].append({'name':name,'status':'FAIL','error':str(e)});report['errors'].append({'name':name,'error':str(e) or repr(e),'trace':traceback.format_exc()});print('FAIL',name,repr(e),flush=True)
 (R/'qa/current/v45-browser-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
def page_for(browser,w=390,h=844,seed=None):
 ctx=browser.new_context(viewport={'width':w,'height':h},is_mobile=True,has_touch=True)
 pg=ctx.new_page();pg.set_default_timeout(3000);errors=[]
 pg.on('pageerror',lambda e:errors.append(str(e)))
 pg.on('dialog',lambda d:d.accept())
 if NATIVE:
  response=pg.goto(URL,wait_until='load')
  assert response and response.ok and pg.locator('meta[name="story-sha256"]').get_attribute('content')==STORY_SHA
  if seed:
   pg.evaluate('seed=>{for(const [k,v] of Object.entries(seed))localStorage.setItem(k,v)}',seed)
   pg.reload(wait_until='load')
 else:
  pg.evaluate("""initial => {const v=new Map(Object.entries(initial||{}));window.__simStore=v;Object.defineProperty(window,'localStorage',{value:{getItem:k=>v.has(k)?v.get(k):null,setItem:(k,x)=>v.set(k,String(x)),removeItem:k=>v.delete(k)},configurable:true});}""",seed or {})
  pg.set_content(HTML,wait_until='load')
 return ctx,pg,errors
def touch(pg,sel):
 locator=pg.locator(sel).first;locator.scroll_into_view_if_needed(timeout=3000);locator.tap(timeout=3000)
def finish_beats(pg):
 for i in range(35):
  if pg.locator('[data-page-next]').count():touch(pg,'[data-page-next]')
  elif pg.locator('[data-reply-next]').count():touch(pg,'[data-reply-next]')
  else:return i
 raise AssertionError('repeated pagination stalled')
def pick(pg,id):
 loc=pg.locator(f'[data-choice="{id}"]')
 if not loc.count():
  gs=pg.locator('[data-choice-group]')
  if not gs.count():raise AssertionError('choice not rendered: '+id)
  for i in range(gs.count()):
   touch(pg,f'[data-choice-group="{i+1}"]')
   if pg.locator(f'[data-choice="{id}"]').count():break
   touch(pg,'[data-choice-back]')
  else:raise AssertionError('choice missing even after groups: '+id)
 touch(pg,f'[data-choice="{id}"]')
def current(pg):return pg.locator('body').get_attribute('data-current')
def snapshot(pg):return json.loads(pg.evaluate('localStorage.getItem(k=>k)' if False else '(k)=>localStorage.getItem(k)',KEY))
def load_native_witness(pg,prefix):
 """Restore canonical replay via the real persisted-save contract; never reach into module globals."""
 payload={'version':'bookside-revision-r4.3','storyHash':STORY_SHA,'commands':prefix,
          'ui':{'phase':'scene','page':0,'choicePage':0,'large':False,'soundOn':False},
          'profile':{'endings':{},'bonuses':{},'readPages':[]}}
 pg.evaluate('(v)=>localStorage.setItem(v.key,JSON.stringify(v.payload))',{'key':KEY,'payload':payload})
 pg.reload(wait_until='load')
 finish_beats(pg)
 return {'id':current(pg),'groupCount':pg.locator('[data-choice-group]').count()}
def traverse_choices(pg,depth=0):
 if depth>6:raise AssertionError('category nesting exceeds 6 levels')
 direct=pg.locator('.vn-dock [data-choice]').evaluate_all('els=>els.map(x=>x.dataset.choice)')
 groups=pg.locator('.vn-dock [data-choice-group]').evaluate_all('els=>els.map(x=>x.dataset.choiceGroup)')
 assert len(direct)<=4 and len(groups)<=4,(direct,groups)
 found=list(direct)
 for gid in groups:
  touch(pg,f'[data-choice-group="{gid}"]')
  found.extend(traverse_choices(pg,depth+1))
  touch(pg,'[data-choice-back]')
 return found
with sync_playwright() as pw:
 browser=pw.chromium.launch(**dict({'headless':True,'args':['--no-sandbox']},**({'executable_path':os.environ.get('CHROMIUM','/usr/bin/chromium')} if os.environ.get('CHROMIUM') or Path('/usr/bin/chromium').exists() else {})))
 def all_viewports():
  out=[]
  for w,h in [(320,568),(360,640),(375,667),(390,844),(430,932)]:
   ctx,pg,errors=page_for(browser,w,h)
   assert current(pg)=='ENTRY_WAKE' and pg.locator('.vn-frame').count()==1
   assert pg.locator('[data-choice]').count()==0
   assert pg.evaluate('document.documentElement.scrollWidth<=window.innerWidth'),(w,h,'overflow')
   finish_beats(pg)
   assert pg.locator('[data-choice]').count()==3 and not pg.locator('[data-page-next]').count()
   assert pg.locator('.vn-dock [data-choice]').count()==3
   assert not errors,errors
   for a in pg.locator('[data-choice]').all():
    box=a.bounding_box();assert box['height']>=44,(w,h,box)
   if w in (320,390,430):pg.screenshot(path=str(shots/f'intro-{w}.png'))
   out.append(f'{w}x{h}');ctx.close()
  return {'viewports':out,'singlePageDecision':True}
 check('PORTRAIT_FIVE_TOUCH_VIEWPORTS_AND_REQUIRED_INTRO',all_viewports)
 def three_forks():
  info=[]
  for action,follow in [('canon','obey'),('rescue','t'),('investigate','camera')]:
   ctx,pg,errors=page_for(browser)
   finish_beats(pg);pick(pg,action);finish_beats(pg)
   assert current(pg)=={'canon':'ENTRY_CLUES','rescue':'COLD','investigate':'ENTRY_MEMORY'}[action]
   pick(pg,follow);finish_beats(pg)
   assert not errors,errors
   info.append({'fork':action,'after':current(pg),'commands':len(snapshot(pg)['commands'])});ctx.close()
  return info
 check('ALL_THREE_STORY_OPENINGS_ORDINARY_TOUCH',three_forks)
 def no_fake_page():
  ctx,pg,errors=page_for(browser)
  finish_beats(pg);pick(pg,'rescue');finish_beats(pg);pick(pg,'t');finish_beats(pg)
  assert current(pg)=='OP_SETTLE'
  assert not pg.locator('[data-choice="continue"]').count(),'extra continue was rendered'
  assert pg.locator('.vn-dock [data-choice="backup"]').count()==1
  assert pg.locator('.vn-scroll').inner_text().find('下一首歌')>=0
  assert pg.locator('.vn-scroll').inner_text().find('程放')>=0
  before=len(snapshot(pg)['commands'])
  pick(pg,'backup');after=snapshot(pg)
  assert len(after['commands'])==before+2
  assert [x['id'] for x in after['commands'][-2:]]==['continue','backup']
  assert current(pg)=='OP_TALK_t'
  assert not errors,errors
  pg.screenshot(path=str(shots/'after-bridge.png'));ctx.close()
  return {'bridgeCommands':['continue','backup'],'extraTap':0,'sameSceneChoice':True}
 check('REMOVES_EMPTY_TRANSITION_BUT_PRESERVES_TWO_STORY_COMMANDS',no_fake_page)
 def all_group_signatures():
  ctx,pg,errors=page_for(browser)
  witness=json.loads((R/'qa/current/choice-witness-prefixes.json').read_text())
  scenes=json.loads((R/'qa/current/r42-choice-count-audit.json').read_text())['over4']
  sampled=[]
  for item in scenes:
   scene=item['scene'];choices=item['choices'];candidates=[v['prefix'][:-1] for name,v in witness['choices'].items() if name.startswith(scene+'/')]
   result=None
   for target in candidates:
    if NATIVE:
     candidate=load_native_witness(pg,target)
     if candidate['id']!=scene:continue
     candidate['expected']=traverse_choices(pg)
    else:
     candidate=pg.evaluate("""(prefix)=>{state=replay(DATA,prefix);phase='scene';page=0;choicePage=0;panel='story';render();const e=renderScene(state,DATA).choices.filter(x=>x.enabled);return {id:state.current,expected:e.map(x=>x.id),groupCount:document.querySelectorAll('[data-choice-group]').length};}""",target)
    if candidate['expected']==choices:result=candidate;break
   if result is None:raise AssertionError('missing exact witness '+scene)

   assert 2<=result['groupCount']<=3,(scene,result)
   found=[]
   for i in range(1,result['groupCount']+1):
    touch(pg,f'[data-choice-group="{i}"]')
    subset=pg.locator('[data-choice]').evaluate_all('els=>els.map(x=>x.dataset.choice)')
    assert 1<=len(subset)<=4 and all(x not in found for x in subset),scene
    found+=subset
    touch(pg,'[data-choice-back]')
   assert found==choices or set(found)==set(choices),(scene,found,choices)
   sampled.append(scene)
  assert not errors,errors
  ctx.close();return {'groupedReachableStates':len(sampled),'sample':sampled[:8]}
 check('ALL_OBSERVED_OVERFOUR_BRANCH_STATES_GROUPED_WITHOUT_LOST_CHOICES',all_group_signatures)
 def persisted_group_and_font():
  ctx,pg,errors=page_for(browser)
  witness=json.loads((R/'qa/current/choice-witness-prefixes.json').read_text())
  # A6a witnessed action from actual canonical commands: use imported valid save seed.
  pre=witness['choices']['A6a/accept']['prefix'][:-1]
  state_info=({'current':load_native_witness(pg,pre)['id']} if NATIVE else pg.evaluate("""prefix=>{state=replay(DATA,prefix);phase='scene';page=0;choicePage=0;render();return {current:state.current,history:state.history}}""",pre))
  assert state_info['current']=='A6a'
  pg.evaluate("""()=>{save()}""")
  touch(pg,'[data-choice-group="2"]')
  raw=pg.evaluate('(k)=>localStorage.getItem(k)',KEY)
  assert json.loads(raw)['ui']['choicePage']==2
  ctx2,pg2,e2=page_for(browser,seed={KEY:raw});assert current(pg2)=='A6a'
  assert pg2.locator('[data-choice="accept"]').count()==1
  touch(pg2,'#menu');touch(pg2,'[data-action="font"]');touch(pg2,'[data-nav="story"]')
  assert pg2.locator('body').get_attribute('class') is not None and pg2.evaluate('document.body.classList.contains("large")')
  assert not errors and not e2
  ctx2.close();ctx.close();return {'restoredChoiceCategory':2,'largeFont':True}
 check('GROUP_SELECTION_PERSISTENCE_AND_LARGE_FONT',persisted_group_and_font)
 browser.close()
report['status']='PASS' if not report['errors'] else 'FAIL'
(R/'qa/current/v45-browser-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print('OVERALL',report['status'],sum(c['status']=='PASS' for c in report['cases']),'/',len(report['cases']),flush=True)
if report['errors']:sys.exit(1)
