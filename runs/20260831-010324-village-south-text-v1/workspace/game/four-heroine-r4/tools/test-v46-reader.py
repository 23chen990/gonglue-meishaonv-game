#!/usr/bin/env python3
"""v4.7 mobile reader, replay, save migration and conflict QA.
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
  rsp=pg.goto(URL,wait_until='load')
  assert rsp and rsp.ok
 else:
  pg.evaluate("""seed=>{
   const values=new Map(Object.entries(seed||{}));window.__simStore=values;
   Object.defineProperty(window,'localStorage',{configurable:true,value:{
    getItem:k=>values.has(k)?values.get(k):null,
    setItem:(k,v)=>values.set(k,String(v)),
    removeItem:k=>values.delete(k)
   }});
  }""",seed or {})
  pg.set_content(HTML,wait_until='load')
 assert pg.locator('meta[name="story-sha256"]').get_attribute('content')==CURRENT
 return ctx,pg,errors

def run_case(browser,w,h):
 ctx,p,errors=start(browser,w,h)
 try:
  assert p.locator('.vn-reader-toggle').count()==1
  assert p.locator('[data-choice]').count()==0,'choice appeared before required intro'
  before=p.locator('.vn-sheet').bounding_box()['height']
  p.locator('.vn-reader-toggle').click()
  expanded=p.locator('.vn-sheet').bounding_box()['height']
  assert expanded-before >= 45,(w,h,before,expanded)
  assert p.locator('.vn-reader-toggle').get_attribute('aria-expanded')=='true'
  p.locator('.vn-reader-toggle').click()
  taps=0
  while p.locator('[data-page-next]').count():
   assert taps<11
   p.locator('[data-page-next]').first.click();taps+=1
  assert taps==7 and p.locator('.vn-dock [data-choice]').count()==3,(taps,w)
  p.locator('.vn-scroll').evaluate('e=>e.scrollTop=80')
  scroll_before=p.locator('.vn-scroll').evaluate('e=>e.scrollTop')
  p.locator('#menu').click();p.locator('[data-nav="story"]').first.click()
  scroll_after=p.locator('.vn-scroll').evaluate('e=>e.scrollTop')
  assert abs(scroll_after-scroll_before)<=2
  p.locator('[data-choice="canon"]').click()
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
  replacement=raw.replace('"page":0','"page":1',1);assert replacement!=raw
  p.evaluate('([k,v])=>localStorage.setItem(k,v)',[KEY,replacement])
  p.locator('#menu').click();p.locator('[data-action="reset"]').click()
  assert p.evaluate('(k)=>localStorage.getItem(k)',KEY)==replacement
  assert '另一个窗口' in p.locator('#notice').inner_text()
  assert not errors,errors
  return {'viewport':str(w)+'x'+str(h),'requiredIntroNext':taps,'readerHeightGain':round(expanded-before),
          'returnScroll':round(scroll_after),'historicalIdentity':'PASS','v45BackupMigration':'PASS',
          'rejectUnknownSave':'PASS','multiTabResetGuard':'PASS'}
 finally:ctx.close()

with sync_playwright() as play:
 kwargs={'headless':True}
 if Path('/usr/bin/chromium').exists():
  kwargs.update(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 browser=play.chromium.launch(**kwargs)
 try:
  for w,h in [(320,568),(390,844),(430,932)]:
   try:
    d=run_case(browser,w,h)
    REPORT['cases'].append({'status':'PASS','detail':d});print('PASS v4.7 reader',d,flush=True)
   except Exception as exc:
    REPORT['cases'].append({'status':'FAIL','viewport':str(w)+'x'+str(h),'error':str(exc)})
    REPORT['errors'].append(traceback.format_exc());print('FAIL v4.7 reader',w,h,repr(exc),flush=True)
 finally:browser.close()
report=ROOT/'qa/current/v46-reader-report.json'
report.parent.mkdir(parents=True,exist_ok=True)
report.write_text(json.dumps(REPORT,ensure_ascii=False,indent=2)+'\n')
if REPORT['errors']:raise SystemExit(1)
