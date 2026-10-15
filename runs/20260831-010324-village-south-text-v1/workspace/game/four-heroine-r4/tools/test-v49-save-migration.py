#!/usr/bin/env python3
"""Validate exact whitelist/backup of v4.5 and v4.8 canonical saves after v4.9 text-only edit.
Fixture mode is not native. R4_MODE=native uses real HTTP/localStorage.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import hashlib,json,os,traceback
R=Path(__file__).resolve().parent.parent
KEY='gonglue:revision-r4.5-portrait:canonical'
OLD={'v45':'c457d2158f27e231cecb7dfc3b4d49031891c7f19d8bfeb99a2542658af7f059',
     'v48':'fae2d536b2b2a12436d0f39cf7a40abe516cde13a87c4295662ecba181dedbf8',
     'v49':'e8128d5133cfd7e00677c3bde69d757f6a6c0e1e3ca67fcc4056b2a00cdeaec0',
     'v410':'473d7b1aa3d1eb64531c2c6654ec5bc22ea791005070a3b621719a6d7ba3717b',
     'v411':'fd98ab48cb24dfab91ae0af8b1c13df59457237b25afe99cfe4ac2dee0e6d40a',
     'v412':'d473c470ade54b09c35b3bdaedcf4e0559c92f8c5ea96a3052d094fbc7dc10a3',
     'v413':'e7e368dff5e07d70337a492d6d79b9daaf1e61dc5f870ad0f9775bef935a44c3',
     'v414':'30c8d0fce47448ddff2c3d99a86b32b4205a16012e9b50cdab9fca6738f81594',
     'v415':'f1cee3680592a366c6a7dae8ffda615b7d828e165bb743f94181268df58abfa0'}
CURRENT=hashlib.sha256((R/'data/STORY.json').read_bytes()).hexdigest()
HTML=(R/'index.html').read_text();NATIVE=os.environ.get('R4_MODE')=='native'
URL=os.environ.get('R4_REAL_URL','http://127.0.0.1:8765/index.html')
REPORT={'scope':'native HTTP+real localStorage' if NATIVE else 'injected DOM+mock storage','cases':[],'errors':[]}
def page(browser,seed=None):
 ctx=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)
 pg=ctx.new_page();pg.set_default_timeout(6000)
 errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
 if NATIVE:
  # Only script literals can be passed to add_init_script; use a serialized literal.
  if seed:
   ctx.add_init_script('''(()=>{const seed='''+json.dumps(seed,ensure_ascii=False)+''';for(const [k,v] of Object.entries(seed))localStorage.setItem(k,v)})()''')
  resp=pg.goto(URL,wait_until='load');assert resp and resp.ok
 else:
  pg.evaluate('''init=>{const m=new Map(Object.entries(init||{}));window.__mockStore=m;
   Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)}})}''',seed or {})
  pg.set_content(HTML,wait_until='load')
 assert pg.locator('meta[name="story-sha256"]').get_attribute('content')==CURRENT
 return ctx,pg,errs
with sync_playwright() as pw:
 kwargs={'headless':True}
 if Path('/usr/bin/chromium').exists():kwargs.update(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 browser=pw.chromium.launch(**kwargs)
 try:
  ctx,p,errors=page(browser)
  try:
   for i in range(7):p.locator('[data-page-next]').tap()
   p.locator('[data-choice="canon"]').tap()
   base=json.loads(p.evaluate('(k)=>localStorage.getItem(k)',KEY));assert len(base['commands'])==1
   assert not errors
  finally:ctx.close()
  for name,h in list(OLD.items())+[('unrecognized','0'*64)]:
   try:
    fixture=dict(base,storyHash=h);raw=json.dumps(fixture,ensure_ascii=False,separators=(',',':'))
    ctx,p,errors=page(browser,{KEY:raw})
    try:
     saved=p.evaluate('(k)=>localStorage.getItem(k)',KEY)
     backups=p.evaluate('''k=>{const keys=window.__mockStore?[...window.__mockStore.keys()]:Object.keys(localStorage);
      return keys.filter(x=>x.startsWith(k+':backup:')).map(x=>localStorage.getItem(x));}''',KEY)
     if name=='unrecognized':
      assert saved==raw and not backups,'unknown hash was imported or archived'
      assert '无法验证' in p.locator('#notice').inner_text()
     else:
      updated=json.loads(saved);assert updated['storyHash']==CURRENT
      assert updated['commands']==fixture['commands']
      assert raw in backups,'legacy original must be retained verbatim'
      assert '原始记录已备份' in p.locator('#notice').inner_text()
     assert not errors,errors
     REPORT['cases'].append({'name':name,'result':'PASS','commands':len(fixture['commands'])})
     print('PASS v4.9 saved session',name,flush=True)
    finally:ctx.close()
   except Exception as e:
    REPORT['cases'].append({'name':name,'result':'FAIL','error':str(e)})
    REPORT['errors'].append(traceback.format_exc())
    print('FAIL v4.9 saved session',name,repr(e),flush=True)
 finally:browser.close()
out=R/'qa/current/v49-save-report.json';out.parent.mkdir(parents=True,exist_ok=True)
out.write_text(json.dumps(REPORT,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
if REPORT['errors']:raise SystemExit(1)
