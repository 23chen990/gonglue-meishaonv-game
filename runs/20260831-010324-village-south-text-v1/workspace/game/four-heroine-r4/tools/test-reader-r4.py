"""Dual-mode reader QA: R4_REAL_URL uses actual HTTP/native storage; otherwise explicitly injected markup with mock storage. Full route uses touch; archives import validated commands through UI. No relationship state injection."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json, hashlib, os
R=Path(__file__).resolve().parent.parent
D=R/('qa/current/browser/native-reader' if os.environ.get('R4_REAL_URL') else 'qa/current/browser/fixture-reader');D.mkdir(parents=True,exist_ok=True)
html=(R/'play.html').read_text()
witnesses=json.loads((R/'qa/current/witnesses.json').read_text())['witnesses']
expected=json.loads((R/'qa/current/archive-expectations.json').read_text())
bonus=json.loads((R/'data/BONUS.json').read_text())['items']
eps=json.loads((R/'data/EPILOGUES.json').read_text())['modules']
KEY='gonglue:revision-r4.1:canonical'
VERSION=expected['version'];SHA=hashlib.sha256((R/'data/STORY.json').read_bytes()).hexdigest()
report={'url':os.environ.get('R4_REAL_URL'), 'mode':'actual-navigation' if os.environ.get('R4_REAL_URL') else 'injected-markup', 'scope':'Chromium injected-markup DOM + simulated Storage. Not URL startup, durable save, physical phone or human play. Full-four route is ordinary touch; archives are verified-command file imports.','sourceStandaloneHtmlSha256':hashlib.sha256(html.encode()).hexdigest(),'storySha256':SHA,'cases':[],'failures':[]}
fixture=r'''() => {const box=new Map();const storage={getItem:k=>box.get(k)||null,setItem:(k,v)=>box.set(k,String(v)),removeItem:k=>box.delete(k)};Object.defineProperty(window,'localStorage',{configurable:true,value:storage});window.__failWrites=()=>{storage.setItem=()=>{throw Error('simulated quota failure')}};}'''
def ctx(browser,w=390,h=844):
 c=browser.new_context(viewport={'width':w,'height':h},has_touch=True,is_mobile=True)
 p=c.new_page();p.set_default_timeout(8000)
 errors=[];p.on('pageerror',lambda e:errors.append(str(e)))
 if os.environ.get('R4_REAL_URL'):
  response=p.goto(os.environ['R4_REAL_URL'],wait_until='load')
  assert response is not None and response.ok
  report['testedDocumentSha256']=hashlib.sha256(response.body()).hexdigest()
  assert p.locator('meta[name="story-sha256"]').get_attribute('content')==SHA
  p.evaluate("""() => {window.__failWrites=()=>{const old=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='gonglue:revision-r4.1:canonical')throw Error('deliberately injected quota failure');return old.call(this,k,v);};};}""")
 else:
  p.evaluate(fixture);p.set_content(html,wait_until='load')
 p.on('dialog',lambda d:d.accept())
 return c,p,errors
def tap(p,s):
 loc=p.locator(s).first;loc.scroll_into_view_if_needed();loc.tap();p.wait_for_timeout(25)
def raw(p):return p.evaluate('(k)=>localStorage.getItem(k)',KEY)
def choices(p):
 for _ in range(80):
  if p.locator('[data-page-next]').count():tap(p,'[data-page-next]')
  elif p.locator('[data-reply-next]').count():tap(p,'[data-reply-next]')
  else:return
 raise AssertionError('Pagination did not settle')
def payload(commands,profile=None,phase='scene'):
 return {'version':VERSION,'storyHash':SHA,'commands':commands,'ui':{'phase':phase,'page':0,'large':False},'profile':profile or {'endings':{},'bonuses':{},'readPages':[]}}
def import_log(p,v):
 if not p.locator('#importFile').count():raise AssertionError('Missing UI import')
 p.locator('#importFile').set_input_files({'name':'verified-commands.json','mimeType':'application/json','buffer':json.dumps(v,ensure_ascii=False).encode()})
 p.wait_for_timeout(240)
 assert '未导入' not in p.locator('#notice').inner_text()
def test(name,fn):
 if os.environ.get('CASE') and os.environ['CASE'] not in name:return
 try:report['cases'].append({'name':name,'status':'PASS','details':fn()})
 except Exception as e:report['cases'].append({'name':name,'status':'FAIL','error':str(e)});report['failures'].append({'name':name,'error':str(e)})
 report['passed']=sum(x['status']=='PASS' for x in report['cases']);report['failed']=len(report['failures'])
 (D/('reader-'+os.environ.get('R4_BROWSER','chromium')+'-'+os.environ.get('CASE','all')+'-report.json')).write_text(json.dumps(report,ensure_ascii=False,indent=2))
 print(name,report['cases'][-1]['status'],flush=True)
def read_archive(p):
 texts=[]
 for _ in range(100):
  texts.extend(p.locator('main > .line p').all_text_contents())
  if p.locator('[data-archive-next]').count():tap(p,'[data-archive-next]')
  else:return ''.join(texts)
 raise AssertionError('Archive pagination did not finish')
if os.environ.get('R4_REAL_URL'):
 report['scope']='Actual HTTP navigation and native localStorage; ordinary full-route touch; archives via validated command-file UI imports. QUOTA case deliberately faults native setItem. Not physical hardware or human reading.'
with sync_playwright() as pw:
 kind=os.environ.get('R4_BROWSER','chromium')
 options={'headless':True}
 if kind=='chromium':
  options['args']=['--no-sandbox']
  if os.environ.get('CHROMIUM') or Path('/usr/bin/chromium').exists():options['executable_path']=os.environ.get('CHROMIUM','/usr/bin/chromium')
 browser=getattr(pw,kind).launch(**options)
 def full_four():
  c,p,errors=ctx(browser);w=next(w for w in witnesses if w['name']=='romance_glst');count=0;shots=[]
  for command in w['commands']:
   choices(p)
   assert p.locator('body').get_attribute('data-current')==command['from'],(command,p.locator('body').get_attribute('data-current'))
   loc=p.locator('[data-choice]').filter(has_text='__never__')
   loc=p.locator('[data-choice="'+command['id']+'"]')
   assert loc.count()==1,command
   if not loc.is_visible():
    p.locator('details.other-actions > summary').tap();p.wait_for_timeout(25)
   loc.scroll_into_view_if_needed();box=loc.bounding_box();assert box['height']>=44 and box['x']>=0 and box['x']+box['width']<=391
   if command['from'] in ['H_glst','REL_t','REL_l']:
    path='full_four_'+command['from']+'.png';p.screenshot(path=str(D/path),full_page=True);shots.append(path)
   tap(p,'[data-choice="'+command['id']+'"]');count+=1
   if count%10==0:print('TOUCH_PROGRESS',count,'of',len(w['commands']),flush=True)
   assert len(json.loads(raw(p))['commands'])==count,(command,p.locator('#notice').inner_text(),p.locator('body').get_attribute('data-phase'),len(json.loads(raw(p))['commands']),count)
   assert not errors,errors
  choices(p)
  assert p.locator('body').get_attribute('data-ending')=='R_glst'
  assert json.loads(raw(p))['commands']==w['commands']
  p.screenshot(path=str(D/'full_four_complete.png'),full_page=True)
  # Rewind via actual history UI, with read-only historical body/reply inspection.
  tap(p,'#menu');tap(p,'[data-nav="history"]')
  index=next(i for i,x in enumerate(w['commands']) if x['from']=='t02')
  tap(p,'[data-history="'+str(index)+'"] > summary')
  assert p.locator('[data-history="'+str(index)+'"] .line').count()>0
  tap(p,'[data-restore="'+str(index)+'"]')
  assert len(json.loads(raw(p))['commands'])==index
  assert p.locator('body').get_attribute('data-current')=='t02'
  assert p.locator('[data-skip-read]').count()>0
  before=len(json.loads(raw(p))['commands']);tap(p,'[data-skip-read]');assert len(json.loads(raw(p))['commands'])==before
  assert not errors,errors;c.close()
  return {'ordinaryTouchCommands':count,'ending':'R_glst','fullHistoryAndRewind':True,'skipReadDoesNotChoose':True,'screenshots':shots}
 test('FULL_FOUR_ORDINARY_TOUCH_AND_REWIND',full_four)
 def archives():
  c,p,errors=ctx(browser,360,640)
  profile={'endings':{k:v['commands'] for k,v in expected['endings'].items()},'bonuses':{},'readPages':[]}
  for b in bonus:
   q=b['requires']
   w=next(w for w in witnesses if (w['ending']==q['id'] if q['kind']=='ending' else w['stages'][q['character']]>=2 and w['facts'].get('reciprocal_'+q['character']) and not w['facts'].get('early_end')))
   profile['bonuses'][b['id']]=w['commands']
  ongoing=next(w for w in witnesses if w['name']=='romance_s')['commands'][:1]
  import_log(p,payload(ongoing,profile,phase='reply'));before_raw=raw(p);before_story=p.locator('main').inner_text()
  tap(p,'#menu');tap(p,'[data-nav="collection"]')
  read_ids=[]
  for eid,exp in expected['endings'].items():
   tap(p,'button[data-ending="'+eid+'"]')
   assert p.locator('h2').inner_text()==exp['title']
   text=read_archive(p);assert text==''.join(x['text'] for x in exp['body']),eid
   assert raw(p)==before_raw,eid+' modified ongoing snapshot'
   read_ids.append(eid);tap(p,'[data-nav="collection"]')
  for b in bonus:
   tap(p,'[data-bonus="'+b['id']+'"]');content=read_archive(p)
   for row in b['body']:assert row['text'] in content,b['id']
   assert raw(p)==before_raw,b['id']+' modified state';tap(p,'[data-nav="collection"]')
  tap(p,'[data-nav="story"]');assert p.locator('main').inner_text()==before_story;assert raw(p)==before_raw
  assert not errors,errors;c.close()
  return {'mainEndingsRenderedExactly':read_ids,'bonusCount':len(bonus),'currentRouteBytesUnchanged':True,'mode':'UI imports of verified command logs, then touch-only readback'}
 test('ALL_MAIN_ENDINGS_BONUS_AND_READ_ONLY_ARCHIVES',archives)
 def epilogues():
  c,p,errors=ctx(browser,320,568);seen=set();imports=0
  remaining={x['id'] for x in eps};catalog={x['id']:x for x in eps}
  while remaining:
   w=max(witnesses,key=lambda w:len(set(w['epilogues'])&remaining))
   wanted=set(w['epilogues'])&remaining;assert wanted
   import_log(p,payload(w['commands']));choices(p);imports+=1
   got=set(p.locator('[data-epilogue]').evaluate_all('xs=>xs.map(x=>x.dataset.epilogue)'))
   assert got==set(w['epilogues']),w['name']
   for eid in sorted(wanted):
    loc='[data-epilogue="'+eid+'"]';tap(p,loc+' > summary')
    text=p.locator(loc).inner_text()
    for row in catalog[eid]['body']:assert row['text'] in text,eid
    assert p.evaluate('document.documentElement.scrollWidth<=innerWidth'),eid
    seen.add(eid)
   remaining-=wanted
  p.screenshot(path=str(D/'epilogues_320.png'),full_page=True)
  assert len(seen)==40;assert not errors,errors;c.close()
  return {'conditionsRendered':len(seen),'moduleIds':sorted(seen),'commandFileImports':imports,'viewport':[320,568]}
 test('ALL_40_EPILOGUES_ACTUAL_DOM_DISPLAY',epilogues)
 def failed_save_collection():
  c,p,errors=ctx(browser);w=next(w for w in witnesses if w['name']=='romance_g')
  import_log(p,payload(w['commands'][:-1]));choices(p);before=raw(p)
  p.evaluate('window.__failWrites()');tap(p,'[data-choice="'+w['commands'][-1]['id']+'"]')
  assert p.locator('#menu').evaluate("e=>e.classList.contains('unsaved')") and '未自动保存' in p.locator('#menu').get_attribute('aria-label');assert raw(p)==before,'Quota failure overwrote record'
  tap(p,'#menu');tap(p,'[data-nav="collection"]')
  assert p.locator('button[data-ending="R_g"]').count()==1,'In-memory ending not available';tap(p,'button[data-ending="R_g"]');assert p.locator('h2').inner_text()==expected['endings']['R_g']['title'],'Wrong archive title'
  assert not errors,errors;c.close();return {'quotaFailure':'simulated','inMemoryCollectionUnlocked':True,'persistedRecordUntouched':True}
 test('QUOTA_FAILURE_STILL_UNLOCKS_IN_MEMORY_COLLECTION',failed_save_collection)
 def views():
  checks=[]
  for w,h,large in [(320,568,False),(360,640,True),(390,844,True),(844,390,False)]:
   c,p,errors=ctx(browser,w,h)
   if large:tap(p,'#menu');tap(p,'[data-action="font"]');tap(p,'[data-nav="story"]')
   # Long conditional scenes remain paginated and all choices reachable.
   witness=next(x for x in witnesses if x['name']=='romance_glst')
   i=next(i for i,x in enumerate(witness['commands']) if x['from']=='H_glst')
   v=payload(witness['commands'][:i]);v['ui']['large']=large;import_log(p,v);choices(p)
   assert p.evaluate('document.documentElement.scrollWidth<=innerWidth')
   for b in p.locator('[data-choice]').all():
    b.scroll_into_view_if_needed();r=b.bounding_box();assert r['height']>=44 and r['y']>=-1 and r['y']+r['height']<=h+1,(w,h,r)
   p.screenshot(path=str(D/f'group_{w}x{h}_large_{large}.png'),full_page=True)
   assert not errors,errors;c.close();checks.append({'width':w,'height':h,'large':large,'allChoicesReachable':True})
  return checks
 test('GROUP_SCENE_PHONE_SIZES_LARGE_FONT_AND_LANDSCAPE',views)
 browser.close()
report['passed']=sum(c['status']=='PASS' for c in report['cases']);report['failed']=len(report['failures'])
(D/('reader-'+os.environ.get('R4_BROWSER','chromium')+'-'+os.environ.get('CASE','all')+'-report.json')).write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps({'passed':report['passed'],'failed':report['failed'],'failures':report['failures']},ensure_ascii=False,indent=2))
if report['failed']:raise SystemExit(1)
