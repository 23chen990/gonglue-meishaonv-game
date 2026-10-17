#!/usr/bin/env python3
"""V17 real HTTP: all 36 personal encounters use authored short-shot ADV, actual
choices, immediate effects, readable mobile panels and saved consequences.
V13 full source-reader regression runs separately in legacy-reader mode.
"""
import os, json, sys, traceback
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
URL=os.getenv('R4_REAL_URL','http://127.0.0.1:8765/index.html').split('?')[0]
FIX=json.loads((ROOT/'qa/current/romance-v13-fixtures.json').read_text())['fixtures']
SCENES=json.loads((ROOT/'tools/romance-v13-scenes.json').read_text())['scenes']
KEY='gonglue:revision-r4.5-portrait:canonical'
OUT=ROOT/'qa/current/browser/romance-v17'
OUT.mkdir(parents=True,exist_ok=True)
RISK={'t02':'fan','t07':'refuse','s02':'promise','s06':'dismiss','s07':'compare',
      'l02':'rival','l06':'ban','l07':'control','l08':'stay','g02':'leverage',
      'g06':'deny','g07':'excuse'}
IDS=sorted(SCENES,key=lambda x:('tslg'.index(x[0]),int(x[1:])))
REPORT={'scope':'real HTTP Chromium/WebKit 36 personal scenes; not physical phone','results':[]}

def tap(page,css):
    target=page.locator(css).first
    assert target.count()==1,(css,page.locator('#app').inner_text()[-320:])
    target.tap(timeout=12000)

def visible(page,scene,height):
    frame=page.locator('.v17-director[data-v17-scene="'+scene+'"]')
    assert frame.count()==1,(scene,page.locator('#app').inner_text()[-320:])
    val=frame.evaluate('''e=>{
      const t=e.querySelector('.mobile-text'),p=t?.querySelector('p'),s=e.querySelector('.io-sheet');
      const a=p?.getBoundingClientRect(),b=t?.getBoundingClientRect(),z=s?.getBoundingClientRect();
      return {voice:e.querySelector('.mobile-speaker')?.innerText||'',
        text:p?.innerText||'',blocks:t?.querySelectorAll('.line').length,
        visible:!!a&&a.width>0&&a.height>0&&a.top>=b.top-3&&a.bottom<=b.bottom+3,
        scroll:t?.scrollHeight||0,client:t?.clientHeight||0,sheet:z?.height||0,
        photo:e.querySelector('.io-film-image')?.complete&&
          e.querySelector('.io-film-image')?.naturalWidth>=1024,
        buttons:[...e.querySelectorAll('button:not([disabled])')].map(x=>x.getBoundingClientRect().height),
        overflow:document.documentElement.scrollWidth>innerWidth+2};
    }''')
    assert val['voice'] and val['text'] and val['blocks']==1,(scene,val)
    assert val['visible'] and val['scroll']<=val['client']+3,(scene,val)
    assert val['sheet']<=height/3+3 and not val['overflow'],(scene,val)
    assert val['photo'] and all(x>=43 for x in val['buttons']),val
    return val

def trial(browser,engine,scene,index):
    w,h=[(320,568),(390,844),(430,932)][index%3]
    context=browser.new_context(viewport={'width':w,'height':h},is_mobile=True,has_touch=True)
    page=context.new_page()
    errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    raw=json.dumps(FIX[scene],ensure_ascii=False)
    try:
        page.add_init_script(script="if(localStorage.getItem("+json.dumps(KEY)+")===null)localStorage.setItem("+json.dumps(KEY)+","+json.dumps(raw,ensure_ascii=False)+");")
        assert page.goto(URL,wait_until='load',timeout=45000).ok
        assert page.locator('body').get_attribute('data-current')==scene,scene
        steps=0
        for i in range(22):
            visible(page,scene,h)
            if page.locator('.v17-choice').count():break
            tap(page,'[data-v11-next]')
            steps+=1
        else:
            raise AssertionError('Never reached an actionable personal scene: '+scene)
        assert steps<=12,(scene,steps)
        options={}
        for _ in range(9):
            visible(page,scene,h)
            for c in page.locator('.v17-choice').evaluate_all('es=>es.map(e=>({id:e.dataset.v17Choice,label:e.innerText}))'):
                options[c['id']]=c['label'].strip()
            if page.locator('[data-v17-page="1"]:not([disabled])').count():
                tap(page,'[data-v17-page="1"]')
            else:break
        enabled=set(page.evaluate('renderScene(state,DATA).choices.filter(c=>c.enabled).map(c=>c.id)'))
        assert set(options)==enabled,(scene,options,enabled)
        for id,label in options.items():
            assert label==SCENES[scene]['labels'][id]['label'],(scene,id,label)
        wanted=RISK.get(scene) if RISK.get(scene) in enabled else sorted(enabled)[0]
        for _ in range(9):
            if page.locator('[data-v17-choice="'+wanted+'"]').count():break
            if page.locator('[data-v17-page="-1"]:not([disabled])').count():
                tap(page,'[data-v17-page="-1"]')
            else:break
        for _ in range(9):
            if page.locator('[data-v17-choice="'+wanted+'"]').count():break
            if page.locator('[data-v17-page="1"]:not([disabled])').count():
                tap(page,'[data-v17-page="1"]')
            else:break
        assert page.locator('[data-v17-choice="'+wanted+'"]').count()==1,(scene,wanted)
        old=page.evaluate('state.history.length')
        tap(page,'[data-v17-choice="'+wanted+'"]')
        actual=page.evaluate('''()=>({length:state.history.length,history:state.history.at(-1),
          effects:state.f,after:v17.after})''')
        assert actual['length']==old+1 and actual['history']['from']==scene and actual['history']['id']==wanted,(scene,actual)
        direct=page.evaluate('''(id)=>DATA.scenes[state.history.at(-1).from].choices.find(x=>x.id===id).effects.filter(e=>e.op==='set').map(e=>({k:e.key,v:e.value}))''',wanted)
        if direct:assert any(actual['effects'].get(e['k'])==e['v'] for e in direct),(scene,wanted,'fake payoff')
        if page.locator('.v17-director[data-v17-after="1"]').count():
            shown=visible(page,scene,h)['text']
            if engine=='chromium' and scene in ('t02','s06','l06','g06','g07'):
                page.screenshot(path=str(OUT/(scene+'-consequence.png')))
            if scene in ('t02','s06','l06','g06') and engine=='chromium':
                page.reload(wait_until='load')
                assert page.locator('.v17-director[data-v17-after="1"]').count()==1,scene+' lost result on refresh'
                assert visible(page,scene,h)['text']==shown
            for _ in range(30):
                if not page.locator('.v17-director[data-v17-after="1"]').count():break
                visible(page,scene,h)
                tap(page,'[data-v11-next]')
            else:raise AssertionError('Endless result beat '+scene)
        assert page.evaluate('state.history.length')==old+1,scene+' fabricated commands'
        assert not errors,(scene,errors)
        return {'scene':scene,'choice':wanted,'width':w,'beforeDecisionTaps':steps,'effectCount':len(direct)}
    finally:context.close()

with sync_playwright() as pw:
    engines=['chromium']+(['webkit'] if os.getenv('R4_WEBKIT')=='1' else [])
    for name in engines:
        kwargs={'headless':True,'args':['--no-sandbox']} if name=='chromium' else {'headless':True}
        if name=='chromium' and os.getenv('R4_CHROMIUM_EXECUTABLE'):
            kwargs['executable_path']=os.getenv('R4_CHROMIUM_EXECUTABLE')
        browser=getattr(pw,name).launch(**kwargs)
        for i,scene in enumerate(IDS):
            try:
                result=trial(browser,name,scene,i)
                REPORT['results'].append({'engine':name,'status':'PASS',**result})
                print('PASS',name,scene,flush=True)
            except Exception as err:
                REPORT['results'].append({'engine':name,'scene':scene,'status':'FAIL','error':repr(err)})
                print('FAIL',name,scene,repr(err),flush=True)
                traceback.print_exc()
        browser.close()
REPORT['status']='PASS' if all(x['status']=='PASS' for x in REPORT['results']) else 'FAIL'
(ROOT/'qa/current/romance-v17-report.json').write_text(json.dumps(REPORT,ensure_ascii=False,indent=2)+'\n')
print('V17',REPORT['status'],len(REPORT['results']))
if REPORT['status']!='PASS':sys.exit(1)
