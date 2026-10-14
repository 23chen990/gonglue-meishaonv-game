"""Actual normal touch-command route(s), with zero-tap OP_SETTLE continuation.
Fixture DOM + simulated localStorage. No internal relationship-state injection.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json,os,hashlib,sys
R=Path(__file__).resolve().parent.parent
W=json.loads((R/'qa/current/witnesses.json').read_text())['witnesses']
D=R/'qa/current/v45-routes'/os.environ.get('ROUTES','all').replace(',','_');D.mkdir(parents=True,exist_ok=True)
K='gonglue:revision-r4.5-portrait:canonical'
HTML=(R/'index.html').read_text()
report={'scope':('Native HTTP Chromium storage route replay; not physical hardware or human play.' if os.environ.get('R4_REAL_URL') else 'Chromium touch with simulated localStorage. Commands must match actual story-engine witnesses; not real hardware or human play.'),'sha256':hashlib.sha256((R/'data/STORY.json').read_bytes()).hexdigest(),'routes':[],'failures':[]}
with sync_playwright() as pw:
 b=pw.chromium.launch(**dict({'headless':True,'args':['--no-sandbox']},**({'executable_path':os.environ.get('CHROMIUM','/usr/bin/chromium')} if os.environ.get('CHROMIUM') or Path('/usr/bin/chromium').exists() else {})))
 def run(name):
  w=next(x for x in W if x['name']==name)
  ctx=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)
  p=ctx.new_page();p.set_default_timeout(4000)
  issues=[];p.on('pageerror',lambda e:issues.append(str(e)))
  if os.environ.get('R4_REAL_URL'):
   response=p.goto(os.environ['R4_REAL_URL'],wait_until='load');assert response and response.ok
   assert p.locator('meta[name="story-sha256"]').get_attribute('content')==report['sha256']
  else:
   p.evaluate("""()=>{const m=new Map;Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)}})}""")
   p.set_content(HTML,wait_until='load')
  p.on('dialog',lambda d:d.accept())
  def tap(sel):
   x=p.locator(sel).first;x.scroll_into_view_if_needed();x.tap(timeout=4000)
  def settle():
   for _ in range(30):
    if p.locator('[data-page-next]').count():tap('[data-page-next]')
    elif p.locator('[data-reply-next]').count():tap('[data-reply-next]')
    else:return
   raise AssertionError('stuck page/reply loop current='+str(p.locator('body').get_attribute('data-current'))+' phase='+str(p.locator('body').get_attribute('data-phase'))+' buttons='+str(p.locator('main button').evaluate_all('els=>els.map(e=>e.outerHTML.slice(0,200))'))+' errors='+str(issues)+' notice='+p.locator('#notice').inner_text())
  def act(c):
   sel='[data-choice="'+c['id']+'"]'
   def find(depth=0):
    if p.locator(sel).count():return True
    if depth>6:raise AssertionError('too many nested decision screens')
    groups=p.locator('[data-choice-group]').evaluate_all('xs=>xs.map(x=>x.dataset.choiceGroup)')
    for gid in groups:
     tap(f'[data-choice-group="{gid}"]')
     if find(depth+1):return True
     tap('[data-choice-back]')
    return False
   if not find():raise AssertionError('cannot see '+str(c)+' current='+p.locator('body').get_attribute('data-current'))
   x=p.locator(sel);x.scroll_into_view_if_needed();box=x.bounding_box();assert box and box['height']>=44 and box['x']>=0 and box['x']+box['width']<=392,(c,box)
   tap(sel)
  skipped=0
  try:
   commands=w['commands']
   for i,c in enumerate(commands):
    settle()
    current=p.locator('body').get_attribute('data-current')
    if c['from']=='OP_SETTLE' and c['id']=='continue':
     assert current=='OP_SETTLE' and p.locator('[data-choice="continue"]').count()==0
     skipped+=1;continue
    if i and commands[i-1]['from']=='OP_SETTLE' and commands[i-1]['id']=='continue':
     assert current=='OP_SETTLE' and p.locator('[data-choice="'+c['id']+'"]').count()==1,(c,current)
    else:assert current==c['from'],(i,c,current)
    act(c)
    saved=json.loads(p.evaluate('(k)=>localStorage.getItem(k)',K))['commands']
    assert saved==commands[:i+1],('non-matching commands at',i,c,saved[-4:])
    assert not issues,issues
    if i in [0,15,35,60,len(commands)-1] and name=='romance_glst':
     p.screenshot(path=str(D/f'{name}_{i:03}.png'))
    if i%20==0:print('TOUCH',name,i+1,'/',len(commands),flush=True)
   settle()
   assert p.locator('body').get_attribute('data-ending')==w['ending']
   # Read-only history/rewind on actual touch path.
   tap('#menu');tap('[data-nav="history"]')
   mark=next(i for i,c in enumerate(commands) if c['from']=='t02') if any(c['from']=='t02' for c in commands) else 12
   tap(f'[data-restore="{mark}"]')
   after=json.loads(p.evaluate('(k)=>localStorage.getItem(k)',K))['commands']
   assert len(after)==mark and p.locator('body').get_attribute('data-current')==commands[mark]['from']
   report['routes'].append({'route':name,'status':'PASS','ending':w['ending'],'realTouchChoices':len(commands)-skipped,'recordedCommands':len(commands),'zeroTapContinuation':skipped,'rewind':True})
   print('PASS',name,report['routes'][-1],flush=True)
  except Exception as e:
   report['failures'].append({'route':name,'error':str(e)});print('FAIL',name,str(e),flush=True)
  finally:
   ctx.close();(D/'route-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
 for name in os.environ.get('ROUTES','romance_glst,romance_t,romance_s,romance_l,romance_g').split(','):
  run(name)
 b.close()
report['status']='FAIL' if report['failures'] else 'PASS'
(D/'route-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print('OVERALL',report['status'],len(report['routes']),'/',len(report['routes'])+len(report['failures']),flush=True)
if report['failures']:sys.exit(1)
