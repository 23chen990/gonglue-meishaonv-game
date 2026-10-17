#!/usr/bin/env python3
"""V18 real HTTP mobile QA. One heroine speaks from the very first beat in each
of 36 private scenes. The player can make a canonical choice after the spoken
exchange; choices and results still belong to the actual story engine.
"""
import os, json, traceback, sys
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
URL=os.getenv('R4_REAL_URL','http://127.0.0.1:8765/index.html').split('?')[0]
PACK=json.loads((ROOT/'tools/romance-v18-moments.json').read_text())['moments']
FIX=json.loads((ROOT/'qa/current/romance-v13-fixtures.json').read_text())['fixtures']
KEY='gonglue:revision-r4.5-portrait:canonical'
OUT=ROOT/'qa/current/browser/romance-v18'
OUT.mkdir(parents=True,exist_ok=True)
REPORT={'scope':'real HTTP mobile touch Chromium/WebKit; not physical device or human QA','cases':[]}
IDS=sorted(PACK,key=lambda x:('tslg'.index(x[0]),int(x[1:])))

def tap(page,selector):
    node=page.locator(selector).first
    assert node.count()==1,(selector,page.locator('body').inner_text()[-330:])
    node.tap(timeout=12000)

def validate(page,scene,viewport):
    frame=page.locator('.v18-director[data-v18-scene="'+scene+'"]')
    assert frame.count()==1,(scene,page.locator('body').inner_text()[-300:])
    info=frame.evaluate('''e=>{
      const p=e.querySelector('.mobile-text p'),t=e.querySelector('.mobile-text');
      const cue=e.querySelector('.v18-scene-cue'),q=e.querySelector('.io-sheet'),title=e.querySelector('.v11-scene-id');
      const a=p?.getBoundingClientRect(),b=t?.getBoundingClientRect(),c=cue?.getBoundingClientRect(),s=q?.getBoundingClientRect(),h=title?.getBoundingClientRect();
      return {mode:e.dataset.mode,voice:e.querySelector('.mobile-speaker')?.innerText||'',text:p?.innerText||'',
       lines:t?.querySelectorAll('.line').length,scroll:t?.scrollHeight||0,client:t?.clientHeight||0,
       visible:!!a&&a.width>0&&a.height>0&&a.top>=b.top-3&&a.bottom<=b.bottom+3,
       cue:cue?.textContent?.trim()||'',captionVisible:!!c&&c.width>0&&c.height>0&&c.top>=0&&c.bottom<innerHeight&&c.bottom<=s.top+3,
       captionClashesTitle:!!c&&!!h&&c.width>0&&c.height>0&&Math.min(c.right,h.right)>Math.max(c.left,h.left)&&Math.min(c.bottom,h.bottom)>Math.max(c.top,h.top),
       sheet:s?.height||0,photo:!!e.querySelector('.io-film-image')?.naturalWidth,
       code:e.dataset.v18Art,overflow:document.documentElement.scrollWidth>innerWidth+2};
    }''')
    expected=PACK[scene]
    assert info['voice']==expected['voice'],(scene,'narrator instead of heroine',info)
    assert info['cue']==expected['cue'],(scene,'lost scene geography',info)
    if info['mode']=='reading':
        assert info['captionVisible'] and not info['captionClashesTitle'],(scene,'scene cue covers title or sheet',info)
    else:
        assert info['mode']=='decision' and not info['captionVisible'],(scene,'caption blocks choice screen',info)
    assert info['text'] and info['lines']==1 and info['visible'],(scene,info)
    assert info['scroll']<=info['client']+2 and info['sheet']<=viewport[1]/3+3,(scene,info)
    assert info['photo'] and info['code']=='portrait-reused-not-location-cg',(scene,info)
    assert not info['overflow'],(scene,'horizontal overflow')
    return info

def case(browser,engine,scene,i):
    w,h=[(320,568),(390,844),(430,932)][i%3]
    ctx=browser.new_context(viewport={'width':w,'height':h},is_mobile=True,has_touch=True)
    page=ctx.new_page();errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    raw=json.loads(json.dumps(FIX[scene],ensure_ascii=False))
    # V17 UI state v1 once used indices for long narrator paragraphs.
    # The migration must re-open the NEW dialogue instead of silently skipping it.
    if scene in ('t04','s06','l07','g08'):
        raw.setdefault('ui',{})['personalV17']={
            'v':1,'key':scene+':'+str(len(raw['commands'])),'cursor':99,'page':0,'after':None
        }
    try:
        rawtext=json.dumps(raw,ensure_ascii=False)
        page.add_init_script(script='if(localStorage.getItem('+json.dumps(KEY)+')===null)localStorage.setItem('+json.dumps(KEY)+','+json.dumps(rawtext,ensure_ascii=False)+');')
        assert page.goto(URL,wait_until='load',timeout=45000).ok
        assert page.locator('body').get_attribute('data-current')==scene
        spoken=[];steps=0
        for _ in range(10):
            line=validate(page,scene,(w,h))
            if page.locator('.v17-choice').count():break
            spoken.append(line['text'])
            if steps==1 and scene in ('t05','l06','g06') and engine=='chromium':
                before=line['text']
                page.reload(wait_until='load')
                assert validate(page,scene,(w,h))['text']==before,(scene,'lost dialogue after refresh')
            tap(page,'[data-v11-next]')
            steps+=1
        else:raise AssertionError('heroine dialogue never led to a choice: '+scene)
        expected=''.join(PACK[scene]['lines'])
        assert ''.join(spoken)==expected,(scene,spoken,PACK[scene]['lines'])
        assert 1<=steps<=4,(scene,'too many clicks',steps)
        if engine=='chromium' and scene in ('t01','s05','l06','g06'):
            page.screenshot(path=str(OUT/(scene+'-heroine-choices.png')))
        before=page.evaluate('state.history.length')
        enabled=page.evaluate('renderScene(state,DATA).choices.filter(x=>x.enabled).map(x=>x.id)')
        for _ in range(8):
            local=page.locator('[data-v17-choice]').evaluate_all('els=>els.map(x=>x.dataset.v17Choice)')
            if local:break
            tap(page,'[data-v17-page="1"]')
        assert enabled and local,(scene,enabled)
        chosen=local[0]
        tap(page,'[data-v17-choice="'+chosen+'"]')
        value=page.evaluate('''()=>({size:state.history.length,from:state.history.at(-1)?.from,
          id:state.history.at(-1)?.id})''')
        assert value=={'size':before+1,'from':scene,'id':chosen},(scene,value)
        assert not errors,(scene,errors)
        return {'scene':scene,'tapsToDecision':steps,'choice':chosen,'viewport':str(w)+'x'+str(h)}
    finally:ctx.close()

with sync_playwright() as pw:
    engines=['chromium']+(['webkit'] if os.getenv('R4_WEBKIT')=='1' else [])
    for engine in engines:
        opts={'headless':True,'args':['--no-sandbox']} if engine=='chromium' else {'headless':True}
        if engine=='chromium' and os.getenv('R4_CHROMIUM_EXECUTABLE'):
            opts['executable_path']=os.getenv('R4_CHROMIUM_EXECUTABLE')
        browser=getattr(pw,engine).launch(**opts)
        for i,scene in enumerate(IDS):
            try:
                result=case(browser,engine,scene,i)
                REPORT['cases'].append({'engine':engine,'status':'PASS',**result})
                print('PASS',engine,scene,result['tapsToDecision'],flush=True)
            except Exception as err:
                REPORT['cases'].append({'engine':engine,'scene':scene,'status':'FAIL','error':repr(err)})
                print('FAIL',engine,scene,repr(err),flush=True)
                traceback.print_exc()
        browser.close()
REPORT['status']='PASS' if all(x['status']=='PASS' for x in REPORT['cases']) else 'FAIL'
(ROOT/'qa/current/romance-v18-report.json').write_text(json.dumps(REPORT,ensure_ascii=False,indent=2)+'\n')
print('V18',REPORT['status'],len(REPORT['cases']))
if REPORT['status']!='PASS':sys.exit(1)
