#!/usr/bin/env python3
"""Mobile VN single-turn reader, replay, save migration and conflict QA.
Chromium viewport automation is not a physical iOS/Android or human test.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json, hashlib, os, traceback
ROOT=Path(__file__).resolve().parent.parent
HTML=(ROOT/'index.html').read_text(encoding='utf-8')
KEY='gonglue:revision-r4.5-portrait:canonical'
OLD='c457d2158f27e231cecb7dfc3b4d49031891c7f19d8bfeb99a2542658af7f059'
CURRENT=hashlib.sha256((ROOT/'data/STORY.json').read_bytes()).hexdigest()
NATIVE=os.getenv('R4_MODE')=='native'
URL=os.getenv('R4_REAL_URL','http://127.0.0.1:8765/index.html')
REPORT={'scope':'Native HTTP Chromium' if NATIVE else 'Injected DOM + mocked storage; no native URL','cases':[],'errors':[]}

def start(browser,w,h,seed=None):
 ctx=browser.new_context(viewport={'width':w,'height':h},is_mobile=True,has_touch=True)
 if NATIVE and seed:
  ctx.add_init_script("(()=>{const data="+json.dumps(seed,ensure_ascii=False)+";for(const [k,v] of Object.entries(data))localStorage.setItem(k,v)})()")
 pg=ctx.new_page();pg.set_default_timeout(6000)
 errors=[];pg.on('pageerror',lambda e:errors.append(str(e)));pg.on('dialog',lambda d:d.accept())
 if NATIVE:
  rsp=pg.goto(URL,wait_until='load');assert rsp and rsp.ok
 else:
  pg.evaluate("""seed=>{
   const values=new Map(Object.entries(seed||{}));window.__simStore=values;
   Object.defineProperty(window,'localStorage',{configurable:true,value:{
    getItem:k=>values.has(k)?values.get(k):null,setItem:(k,v)=>values.set(k,String(v)),removeItem:k=>values.delete(k)
   }});
  }""",seed or {})
  pg.set_content(HTML,wait_until='load')
 assert pg.locator('meta[name="story-sha256"]').get_attribute('content')==CURRENT
 return ctx,pg,errors

def advance_to_choices(p):
 ids=[];parts=0
 for i in range(120):
  if p.locator('[data-choice]').count():break
  assert p.locator('[data-page-next]').count()==1,('reader stalled',i)
  assert p.locator('.mobile-text .line').count()<=1
  geom=p.evaluate("""()=>{let x=document.querySelector('.mobile-text'),s=document.querySelector('.mobile-sheet');
   return {content:x.scrollHeight,client:x.clientHeight,sheet:s.getBoundingClientRect().height,inner:innerHeight}}""")
  assert geom['content']<=geom['client']+2,geom
  assert geom['sheet']<=geom['inner']/3+2,geom
  ids.append(p.locator('.vn-frame').get_attribute('data-source'));parts+=1
  p.locator('[data-page-next]').first.click()
 else:raise AssertionError('opening reader did not reach choices')
 return ids,parts

def seek_choice(p,id):
 for _ in range(12):
  if p.locator(f'.mobile-options [data-choice="{id}"]').count():return
  nxt=p.locator('.mobile-options [data-mobile-options="1"]:not([disabled])')
  if not nxt.count():break
  nxt.tap()
 raise AssertionError('choice not reachable: '+id)

def run_case(browser,w,h):
 ctx,p,errors=start(browser,w,h)
 try:
  assert p.locator('.vn-reader-toggle').count()==0,'obsolete expandable reader returned'
  assert p.locator('[data-choice]').count()==0,'choice appeared before required intro'
  ids,taps=advance_to_choices(p)
  assert len(set(ids))==6,(w,h,len(set(ids)))
  source=p.locator('.vn-frame').get_attribute('data-source')
  text=p.locator('.mobile-text').inner_text()
  p.locator('#menu').click();p.locator('[data-nav="story"]').first.click()
  assert p.locator('.vn-frame').get_attribute('data-source')==source
  assert p.locator('.mobile-text').inner_text()==text,'menu round-trip changed source cursor'
  seek_choice(p,'canon');p.locator('.mobile-options [data-choice="canon"]').click()
  assert p.locator('body').get_attribute('data-current')=='ENTRY_CLUES'
  p.locator('#menu').click();p.locator('[data-nav="history"]').click()
  assert '戴耳机的男人' in p.locator('[data-history="0"]').first.inner_html()
  raw=p.evaluate('(k)=>localStorage.getItem(k)',KEY)
  original=json.loads(raw);original['storyHash']=OLD
  old_raw=json.dumps(original,ensure_ascii=False,separators=(',',':'))
  second,page,errs=start(browser,w,h,{KEY:old_raw})
  try:
   migrated=page.evaluate('(k)=>JSON.parse(localStorage.getItem(k))',KEY)
   assert migrated['storyHash']==CURRENT
   assert migrated['commands']==original['commands']
   assert migrated['ui']['phase']==original['ui']['phase']
   backups=page.evaluate("""k=>{
     const keys=window.__simStore?[...window.__simStore.keys()]:Object.keys(localStorage);
     return keys.filter(x=>x.startsWith(k+':backup:')).map(x=>localStorage.getItem(x));
   }""",KEY)
   assert old_raw in backups,'old record was not backed up'
   assert '原始记录已备份' in page.locator('#notice').inner_text()
   assert not errs,errs
  finally:second.close()
  unknown=dict(original,storyHash='0'*64)
  unknown_raw=json.dumps(unknown,ensure_ascii=False,separators=(',',':'))
  third,bad,errs=start(browser,w,h,{KEY:unknown_raw})
  try:
   assert bad.evaluate('(k)=>localStorage.getItem(k)',KEY)==unknown_raw
   assert bad.locator('body').get_attribute('data-current')=='ENTRY_WAKE'
   assert '无法验证' in bad.locator('#notice').inner_text()
   assert not errs,errs
  finally:third.close()
  replacement_obj=json.loads(raw)
  replacement_obj['ui']['page']=replacement_obj['ui'].get('page',0)+1
  replacement=json.dumps(replacement_obj,ensure_ascii=False,separators=(',',':'))
  p.evaluate('([k,v])=>localStorage.setItem(k,v)',[KEY,replacement])
  p.locator('[data-nav="story"]').first.click() if p.locator('[data-nav="story"]').count() else None
  p.locator('#menu').click();p.locator('[data-action="reset"]').click()
  assert p.evaluate('(k)=>localStorage.getItem(k)',KEY)==replacement
  assert '另一个窗口' in p.locator('#notice').inner_text()
  assert not errors,errors
  return {'viewport':str(w)+'x'+str(h),'openingPresentationPages':taps,
          'singleTurnPages':True,'noInnerScroll':True,'noExpandableReader':True,
          'sourceCursorRoundTrip':'PASS','historicalIdentity':'PASS','v45BackupMigration':'PASS',
          'rejectUnknownSave':'PASS','multiTabResetGuard':'PASS'}
 finally:ctx.close()

with sync_playwright() as play:
 kwargs={'headless':True}
 if Path('/usr/bin/chromium').exists():kwargs.update(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 browser=play.chromium.launch(**kwargs)
 try:
  for w,h in [(320,568),(390,844),(430,932)]:
   try:
    d=run_case(browser,w,h)
    REPORT['cases'].append({'status':'PASS','detail':d});print('PASS mobile reader',d,flush=True)
   except Exception as exc:
    REPORT['cases'].append({'status':'FAIL','viewport':str(w)+'x'+str(h),'error':str(exc)})
    REPORT['errors'].append(traceback.format_exc());print('FAIL mobile reader',w,h,repr(exc),flush=True)
 finally:browser.close()
report=ROOT/'qa/current/v46-reader-report.json'
report.parent.mkdir(parents=True,exist_ok=True)
report.write_text(json.dumps(REPORT,ensure_ascii=False,indent=2)+'\n')
if REPORT['errors']:raise SystemExit(1)
