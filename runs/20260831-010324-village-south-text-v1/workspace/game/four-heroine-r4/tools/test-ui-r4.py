"""r4 UI regression. fixture = injected document + explicitly simulated Storage.
native = actual URL and native localStorage. No policy bypass; blocked navigation exits 2.
Offline memory-only opening is tested separately without a storage replacement."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import os,json,hashlib,tempfile
R=Path(__file__).resolve().parent.parent
MODE=os.environ.get('R4_MODE','fixture');URL=os.environ.get('R4_REAL_URL','http://127.0.0.1:8765/index.html')
D=R/'qa/current/browser'/('native-ui' if MODE=='native' else 'fixture-ui');D.mkdir(parents=True,exist_ok=True)
HTML=(R/'index.html').read_text();KEY='gonglue:revision-r4.2:canonical'
SHA=hashlib.sha256((R/'data/STORY.json').read_bytes()).hexdigest()
report={'mode':MODE,'scope':'Actual native navigation/storage' if MODE=='native' else 'Injected DOM and labelled simulated Storage; not native persistence or human play',
        'hashes':{n:hashlib.sha256((R/n).read_bytes()).hexdigest() for n in ['index.html','data/STORY.json','tools/engine.mjs','tools/preview-ui.js']},
        'url':URL if MODE=='native' else None,'cases':[],'failures':[]}
FIXTURE=r"""seed=>{const box=new Map(Object.entries(seed||{}));const store={getItem:k=>box.has(k)?box.get(k):null,setItem:(k,v)=>box.set(k,String(v)),removeItem:k=>box.delete(k),key:i=>[...box.keys()][i]||null,get length(){return box.size}};
 Object.defineProperty(window,'localStorage',{configurable:true,value:store});window.__entries=()=>Object.fromEntries(box);
 window.__fail=()=>store.setItem=()=>{throw Error('SIMULATED_QUOTA');};}"""
def write():
 report['passed']=sum(x['status']=='PASS' for x in report['cases'])
 report['status']='FAIL' if report['failures'] else 'PASS'
 (D/'ui-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
def test(name,fn):
 try:report['cases'].append({'name':name,'status':'PASS','details':fn()})
 except Exception as e:
  status='BLOCKED' if 'ERR_BLOCKED_BY_ADMINISTRATOR' in str(e) else 'FAIL'
  report['cases'].append({'name':name,'status':status,'error':str(e)});report['failures'].append(report['cases'][-1])
 write();print(name,report['cases'][-1]['status'],flush=True)
def entry(b,w=360,h=640,seed=None,no_storage=False):
 c=b.new_context(viewport={'width':w,'height':h},is_mobile=True,has_touch=True)
 p=c.new_page();p.set_default_timeout(6000);errors=[]
 p.on('pageerror',lambda e:errors.append(str(e)));p.on('dialog',lambda d:d.accept())
 if MODE=='native':
  response=p.goto(URL,wait_until='load')
  assert response and response.ok
  assert p.locator('meta[name="story-sha256"]').get_attribute('content')==SHA
  if seed:
   p.evaluate('(v)=>{for(const [k,x]of Object.entries(v))localStorage.setItem(k,x)}',seed);p.reload()
 elif no_storage:p.set_content(HTML,wait_until='load')
 else:p.evaluate(FIXTURE,seed or {});p.set_content(HTML,wait_until='load')
 return c,p,errors
def tap(p,selector):
 loc=p.locator(selector).first;loc.scroll_into_view_if_needed();loc.tap()
def raw(p):return p.evaluate('(k)=>localStorage.getItem(k)',KEY)
def count(p):return len(json.loads(raw(p))['commands']) if raw(p) else 0
def settle(p):
 for _ in range(60):
  if p.locator('[data-page-next]').count():tap(p,'[data-page-next]')
  elif p.locator('[data-reply-next]').count():tap(p,'[data-reply-next]')
  else:return
 raise AssertionError('Reader stuck')
def intro(p,first='t'):
 settle(p)
 assert p.locator('body').get_attribute('data-current')=='ENTRY_WAKE'
 assert p.locator('[data-choice]').evaluate_all('xs=>xs.map(x=>x.dataset.choice)')==['canon','rescue','investigate']
 assert '第七天' in p.locator('main').inner_text()
 if first in ('l','g'):
  tap(p,'[data-choice="investigate"]');settle(p)
  assert p.locator('body').get_attribute('data-current')=='ENTRY_MEMORY'
  tap(p,'[data-choice="'+('camera' if first=='l' else 'email')+'"]')
 else:
  tap(p,'[data-choice="rescue"]')
 settle(p)
 assert p.locator('body').get_attribute('data-current')=='COLD'
 ids=p.locator('[data-choice]').evaluate_all('xs=>xs.map(x=>x.dataset.choice)')
 assert ids==(['l','g','self'] if first in ('l','g') else ['t','s','self']),ids

def original_path(p,response='witness',after='backstage'):
 settle(p);tap(p,'[data-choice="canon"]');settle(p)
 assert p.locator('body').get_attribute('data-current')=='ENTRY_CLUES'
 tap(p,'[data-choice="'+response+'"]');settle(p)
 assert p.locator('body').get_attribute('data-current')=='OP_CANON'
 assert '钢琴' in p.locator('main').inner_text()
 tap(p,'[data-choice="'+after+'"]');settle(p)
 assert p.locator('body').get_attribute('data-current')=='A1b'
def import_json(p,payload):
 p.locator('#importFile').set_input_files({'name':'test-log.json','mimeType':'application/json','buffer':json.dumps(payload).encode()})
 p.wait_for_timeout(100)
def response_text(p):
 pieces=[]
 for _ in range(30):
  pieces.append(p.locator('main').inner_text())
  if p.locator('[data-page-next]').count():tap(p,'[data-page-next]')
  else:return '\n'.join(pieces)
 raise AssertionError('Reply pagination loop')
with sync_playwright() as pw:
 launch_options={'headless':True,'args':['--no-sandbox']}
 if os.environ.get('CHROMIUM') or Path('/usr/bin/chromium').exists():
  launch_options['executable_path']=os.environ.get('CHROMIUM','/usr/bin/chromium')
 browser=pw.chromium.launch(**launch_options)
 if MODE=='native':
  def native_entry():
   c,p,e=entry(browser)
   assert p.locator('body').get_attribute('data-current')=='ENTRY_WAKE';assert not e;c.close()
   return {'entry':'index.html','storage':'native'}
  test('ACTUAL_DEFAULT_URL_STARTUP',native_entry)
  if report['failures']:
   report['status']='BLOCKED';(D/'ui-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));browser.close();raise SystemExit(2)
 for first in ['t','s','l','g','self']:
  def opening(first=first):
   c,p,e=entry(browser)
   assert '原著' in p.locator('main').inner_text()
   if first=='t':p.screenshot(path=str(D/'01-first-canon-fork-360.png'),full_page=True)
   intro(p,first)
   baseline=2 if first in ('l','g') else 1
   assert count(p)==baseline
   ids=p.locator('[data-choice]').evaluate_all('xs=>xs.map(x=>x.dataset.choice)')
   assert len(ids)==3 and first in ids and p.evaluate('document.documentElement.scrollWidth<=innerWidth')
   for x in p.locator('[data-choice]').all():
    x.scroll_into_view_if_needed();box=x.bounding_box();assert box['height']>=44 and box['width']<=360
   if first=='t':p.screenshot(path=str(D/'02-rescue-methods-360.png'),full_page=True)
   tap(p,'[data-choice="'+first+'"]')
   assert count(p)==baseline+1
   assert p.locator('body').get_attribute('data-current')=='OP_SETTLE'
   shown=response_text(p)
   assert '陆景行' in shown and '阿衡' in shown
   assert p.locator('[data-reply-next]').count()==1
   if first=='t':p.screenshot(path=str(D/'03-t-payoff.png'),full_page=True)
   tap(p,'[data-reply-next]');settle(p)
   tap(p,'[data-choice="continue"]');settle(p)
   assert p.locator('body').get_attribute('data-current')=='OP_FORK'
   assert '原著没有' in p.locator('main').inner_text()
   assert p.locator('[data-choice]').count()==3
   tap(p,'[data-choice="backup"]');settle(p)
   assert p.locator('body').get_attribute('data-current')=='OP_TALK_'+first
   assert count(p)==baseline+3
   assert not e,e;c.close()
   return {'ordinaryCommands':baseline+3,'first':first,'firstDecisiveChoiceBeforeMethod':True,'newUnwrittenFork':True}
  test('OPENING_'+first,opening)
 def canon():
  outputs=[]
  for response in ['obey','refuse','witness']:
   c,p,e=entry(browser);original_path(p,response)
   values=json.loads(raw(p))['commands']
   assert [x['from'] for x in values][:3]==['ENTRY_WAKE','ENTRY_CLUES','OP_CANON']
   assert len(values)==3
   assert '原著' in p.locator('main').inner_text()
   assert p.locator('[data-choice]').count()==3
   assert not e,e;c.close();outputs.append({'paperChoice':response,'commands':3})
  return outputs
 test('TRUE_ORIGINAL_ROUTE_NO_BLUE_DISC',canon)
 def fast_and_double():
  c,p,e=entry(browser);intro(p)
  loc=p.locator('[data-choice="t"]');loc.scroll_into_view_if_needed();loc.dblclick(delay=15)
  assert count(p)==2
  settle(p);tap(p,'[data-choice="continue"]');settle(p)
  assert p.locator('body').get_attribute('data-current')=='OP_FORK'
  tap(p,'[data-choice="backup"]');settle(p)
  assert p.locator('body').get_attribute('data-current')=='OP_TALK_t'
  assert not e,e;c.close()
  return {'doubleClickCommands':1,'immediateNextRealButtonWorks':True}
 test('DOUBLE_CLICK_AND_LEGITIMATE_FAST_INPUT',fast_and_double)
 def drag():
  c,p,e=entry(browser);intro(p)
  loc=p.locator('[data-choice="t"]');loc.scroll_into_view_if_needed();box=loc.bounding_box()
  x,y=box['x']+box['width']/2,box['y']+box['height']/2
  p.mouse.move(x,y);p.mouse.down();p.mouse.move(x+26,y,steps=5);p.mouse.up()
  assert count(p)==1 and p.locator('body').get_attribute('data-current')=='COLD'
  tap(p,'[data-choice="t"]');assert count(p)==2
  assert not e,e;c.close();return {'dragPixels':26,'accidentalChoiceRejected':True,'nextTapWorks':True}
 test('DRAG_IS_NOT_A_STORY_CHOICE',drag)
 def imports():
  c,p,e=entry(browser);intro(p);tap(p,'[data-choice="s"]');saved=raw(p)
  variants=[]
  x=json.loads(saved);x['commands'][0]['revision']=99;variants.append(('revision',x))
  x=json.loads(saved);x['storyHash']='0'*64;variants.append(('hash',x))
  x=json.loads(saved);x['version']='bookside-revision-r3.0';variants.append(('old_version',x))
  x=json.loads(saved);x['profile']['endings']={'unknown':[]};variants.append(('unknown_ending',x))
  x=json.loads(saved);x['commands'][0]['id']='t';variants.append(('illegal_choice',x))
  for label,x in variants:
   import_json(p,x);assert raw(p)==saved,label;assert '未导入' in p.locator('#notice').inner_text(),label
  assert not e,e;c.close();return {'rejectedAtomically':[label for label,_ in variants]}
 test('UNTRUSTED_IMPORTS_ARE_ATOMIC',imports)
 def backup():
  seed={KEY:'{invalid','gonglue:revision-r3:canonical':'legacy-kept'}
  c,p,e=entry(browser,seed=seed)
  assert p.locator('#menu').evaluate("e=>e.classList.contains('unsaved')") and '未自动保存' in p.locator('#menu').get_attribute('aria-label')
  assert raw(p)=='{invalid'
  tap(p,'#menu');tap(p,'[data-action="reset"]')
  assert p.locator('body').get_attribute('data-current')=='ENTRY_WAKE'
  assert count(p)==0
  found=p.evaluate('(k)=>Array.from({length:localStorage.length},(_,i)=>localStorage.key(i)).some(x=>x.startsWith(k+":backup:")&&localStorage.getItem(x)==="{invalid")',KEY)
  assert found;assert p.evaluate('localStorage.getItem("gonglue:revision-r3:canonical")')=='legacy-kept'
  assert not e,e;c.close();return {'corruptOriginalBackedUp':True,'legacyUntouched':True}
 test('CORRUPT_SAVE_BACKUP_AND_OLD_VERSION_ISOLATION',backup)
 def roundtrip():
  c,p,e=entry(browser);intro(p,'l');tap(p,'[data-choice="l"]')
  if p.locator('[data-page-next]').count():tap(p,'[data-page-next]')
  saved=raw(p);shown=p.locator('main').inner_text()
  if MODE=='native':
   p.reload();assert raw(p)==saved;assert p.locator('main').inner_text()==shown
  else:
   c2,p2,e2=entry(browser,seed={KEY:saved})
   assert raw(p2)==saved and p2.locator('main').inner_text()==shown
   assert not e2;c2.close()
  assert not e;c.close();return {'exactReplyPageRestored':True,'storageEvidence':'native reload' if MODE=='native' else 'explicit mock-storage re-instantiation, NOT disk persistence'}
 test('SAVE_AND_REPLY_PAGE_RECONSTRUCTION',roundtrip)
 def decision_menu_limit():
  c,p,e=entry(browser)
  intro(p);assert p.locator('[data-choice]').count()==3
  assert not e,e;c.close()
  c,p,e=entry(browser)
  catalogue=json.loads((R/'qa/current/choice-witness-prefixes.json').read_text())['choices']
  witness=catalogue['A6a/rebuild']['prefix'][:-1]
  payload={'version':'bookside-revision-r4.2','storyHash':SHA,'commands':witness,
           'profile':{'endings':{},'bonuses':{},'readPages':[]},'ui':{'phase':'scene','page':0,'choicePage':0,'large':False}}
  import_json(p,payload);settle(p)
  assert p.locator('body').get_attribute('data-current')=='A6a'
  group1=p.locator('[data-choice]').evaluate_all('xs=>xs.map(x=>x.dataset.choice)')
  assert len(group1)==3 and p.locator('[data-choice-next]').count()==1,group1
  before=count(p)
  tap(p,'[data-choice-next]')
  group2=p.locator('[data-choice]').evaluate_all('xs=>xs.map(x=>x.dataset.choice)')
  assert len(group2)==3 and len(set(group1+group2))==6,(group1,group2)
  assert count(p)==before,'Non-story navigation must not consume an action'
  # Verified command export/import restores selected option page without changing game state.
  saved=raw(p)
  if MODE!='native':
   c2,p2,e2=entry(browser,seed={KEY:saved})
   assert p2.locator('[data-choice]').evaluate_all('xs=>xs.map(x=>x.dataset.choice)')==group2
   assert not e2;c2.close()
  tap(p,'[data-choice="rebuild"]');settle(p)
  assert count(p)==before+1
  assert not e,e;c.close()
  return {'firstForkChoices':3,'rescueChoices':3,'highOptionScene': 'A6a','menuGroupSizes':[len(group1),len(group2)],'allSixActionsStillReachable':True,'switchNoActionCost':True}
 test('DECISION_MENU_MAX_FOUR',decision_menu_limit)
 def devices():
  cases=[]
  for w,h,large in [(320,568,False),(360,640,True),(390,844,False),(844,390,True)]:
   c,p,e=entry(browser,w,h)
   if large:tap(p,'#menu');tap(p,'[data-action="font"]');tap(p,'[data-nav="story"]')
   intro(p)
   assert p.evaluate('document.documentElement.scrollWidth<=innerWidth')
   for b in p.locator('[data-choice]').all():
    b.scroll_into_view_if_needed();box=b.bounding_box()
    assert box['height']>=44 and box['y']>=-1 and box['y']+box['height']<=h+1,(w,h,box)
   p.screenshot(path=str(D/f'opening-{w}x{h}-large-{large}.png'),full_page=True)
   assert not e,e;c.close();cases.append({'viewport':[w,h],'large':large,'threeActualActions':True})
  return cases
 test('FOUR_VIEWPORTS_AND_LARGE_FONT',devices)
 if MODE!='native':
  def no_storage():
   c,p,e=entry(browser,no_storage=True)
   assert p.locator('#menu').evaluate("e=>e.classList.contains('unsaved')") and '未自动保存' in p.locator('#menu').get_attribute('aria-label')
   intro(p);tap(p,'[data-choice="self"]');settle(p)
   assert p.locator('body').get_attribute('data-current')=='OP_SETTLE'
   p.screenshot(path=str(D/'memory-only-no-storage.png'),full_page=True)
   assert not e,e;c.close()
   return {'storageFixture':False,'ordinaryClicksWork':True,'persistentSave':'unavailable'}
  test('NO_STORAGE_MEMORY_ONLY_STARTUP',no_storage)

 if MODE=='native':
  def tabs():
   c,p,e=entry(browser);intro(p)
   b=c.new_page();b.on('dialog',lambda d:d.accept());b.goto(URL,wait_until='load')
   tap(p,'[data-choice="t"]');saved=raw(p)
   b.wait_for_function("document.querySelector('#menu').classList.contains('unsaved')")
   settle(b);tap(b,'[data-choice="s"]');assert raw(b)==saved
   tap(b,'#menu');tap(b,'[data-action="reload"]')
   assert raw(b)==saved and b.locator('main').inner_text()==p.locator('main').inner_text()
   assert not e;c.close();return {'nativeStorageEvent':True,'noLostUpdate':True,'explicitReload':True}
  test('NATIVE_TWO_TABS_NO_LOST_UPDATE',tabs)
  def disk():
   opts=dict(launch_options)
   with tempfile.TemporaryDirectory(prefix='gonglue-r4-native-') as folder:
    c=pw.chromium.launch_persistent_context(folder,has_touch=True,is_mobile=True,**opts)
    p=c.new_page();p.goto(URL,wait_until='load');intro(p,'g');tap(p,'[data-choice="g"]')
    saved=raw(p);shown=p.locator('main').inner_text();c.close()
    c=pw.chromium.launch_persistent_context(folder,has_touch=True,is_mobile=True,**opts)
    p=c.new_page();p.goto(URL,wait_until='load')
    assert raw(p)==saved and p.locator('main').inner_text()==shown
    c.close()
   return {'newBrowserProcess':True,'diskProfileRetained':True,'storageStateInjection':False}
  test('NATIVE_BROWSER_PROCESS_RESTART',disk)
 browser.close()
write()
print(json.dumps({'status':report['status'],'passed':report['passed'],'failures':report['failures']},ensure_ascii=False,indent=2))
if report['failures']:raise SystemExit(1)
