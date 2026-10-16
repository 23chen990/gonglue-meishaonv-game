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
def visible_option_ids(page):
 found=[]
 for _ in range(12):
  for x in page.locator('.mobile-options [data-choice]').evaluate_all('els=>els.map(x=>x.dataset.choice)'):
   if x not in found:found.append(x)
  nxt=page.locator('.mobile-options [data-mobile-options="1"]:not([disabled])')
  if not nxt.count():break
  nxt.tap()
 return found

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
    source_ids=[]
    for i in range(120):
     if page.locator('[data-choice]').count():break
     visible=page.evaluate("""()=>{const x=document.querySelector('.mobile-text'),sheet=document.querySelector('.mobile-sheet');return {
      viewport:x.clientHeight,content:x.scrollHeight,top:x.scrollTop,blocks:x.querySelectorAll('.line').length,
      sheet:sheet.getBoundingClientRect().height,inner:innerHeight};}""")
     assert visible['content']<=visible['viewport']+2,(
      'mandatory beat is clipped behind inner scroll',w,h,i,visible)
     assert visible['blocks']<=1,('multiple speakers/text blocks shown together',w,h,i,visible)
     assert visible['sheet']<=visible['inner']/3+2,('dialogue sheet exceeds one third',w,h,i,visible)
     assert visible['sheet']<=visible['inner']/4+2,('normal phone dialogue sheet exceeds one quarter',w,h,i,visible)
     source_ids.append(page.locator('.vn-frame').get_attribute('data-source'))
     assert page.locator('[data-page-next]').count()==1,(w,i)
     page.locator('[data-page-next]').tap()
    else:raise AssertionError(('opening reader stalled',w,h))
    assert len(set(source_ids))==6,(w,h,'6 story advances before the seventh decisive beat; all 28 canonical rows remain in DATA/History',len(set(source_ids)))
    assert page.locator('.vn-frame').get_attribute('data-mode')=='decision'
    option_ids=visible_option_ids(page)
    assert set(option_ids)=={'canon','rescue','investigate'},(w,h,option_ids)
    assert page.locator('.mobile-options [data-mobile-options]').count()==0,(w,h,'first three choices must fit without option paging')
    # The choice screen is a new interaction beat. Previous dialogue must not
    # remain as a transcript just to preserve the old reader layout.
    layout=page.evaluate("""()=>{
      const box=x=>x.getBoundingClientRect();
      const sheet=box(document.querySelector('.mobile-sheet'));
      const dockEl=document.querySelector('.mobile-options'),dock=box(dockEl);
      const text=document.querySelector('.mobile-text'),portrait=document.querySelector('.mobile-portrait');
      const actor=portrait&&box(portrait);const cg=document.querySelector('.adv6-scene-photo');
      const choices=[...dockEl.querySelectorAll('[data-choice]')].map(x=>{
        const r=box(x);return {height:r.height,visible:Math.max(0,Math.min(dock.bottom,r.bottom)-Math.max(dock.top,r.top))};
      });
      return {sheetHeight:sheet.height,inner:innerHeight,
        dialogueBlocks:text.querySelectorAll('.line').length,
        dialogueOverflow:text.scrollHeight>text.clientHeight+2,
        optionOverflow:dock.scrollHeight>dock.clientHeight+2,
        actorVisible:actor?Math.max(0,Math.min(sheet.top,actor.bottom)-Math.max(65,actor.top)):0,
        sceneCG:!!(cg&&cg.complete&&cg.naturalWidth>0&&box(cg).height>100),
        choices,overflow:document.documentElement.scrollWidth>innerWidth};
    }""")
    assert layout['sheetHeight']<=72,(w,h,'decision prompt strip regressed into a large empty dialogue sheet',layout)
    assert layout['dialogueBlocks']<=1 and not layout['dialogueOverflow'],(w,h,layout)
    assert not layout['optionOverflow'],(w,h,'choice layer requires hidden scroll',layout)
    assert layout['sceneCG'],(w,h,'decision requires loaded cinematic scene, not heroine picker cards',layout)
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

 def menu_font_cursor():
  ctx,page=open_game(320,568)
  try:
   for _ in range(1):
    assert page.locator('[data-page-next]').count()==1
    page.locator('[data-page-next]').tap()
   before=page.locator('.vn-frame').get_attribute('data-source')
   assert before=='ENTRY_WAKE.intro.007',before
   page.locator('#menu').tap()
   page.locator('[data-action="font"]').tap()
   page.locator('[data-nav="story"]').first.tap()
   assert page.locator('body.large').count()==1
   after=page.locator('.vn-frame').get_attribute('data-source')
   assert after==before,('menu font toggle lost narrative position',before,after)
   assert page.locator('[data-adv6-inspect]').count()==1
   page.locator('[data-adv6-inspect]').tap()
   assert page.locator('[role="dialog"]').count()==1
   assert page.locator('.vn-frame').get_attribute('data-source')==before
   page.locator('.cinema-close').tap()
   assert page.locator('.vn-frame').get_attribute('data-source')==before
   page.locator('[data-page-next]').tap()
   next_beat=page.locator('.vn-frame').get_attribute('data-source')
   assert next_beat=='ENTRY_WAKE.intro.011',next_beat
   return {'before':before,'after':after,'next':next_beat}
  finally:ctx.close()
 record('MENU_FONT_ANCHOR_AND_PROP_INSPECTION',menu_font_cursor)

 def large_first_fork():
  ctx,page=open_game(320,568)
  try:
   page.locator('#menu').tap()
   page.locator('[data-action="font"]').tap()
   page.locator('[data-nav="story"]').first.tap()
   assert page.locator('body.large').count()==1
   source_ids=[]
   for _ in range(120):
    if page.locator('[data-choice]').count():break
    assert page.locator('.mobile-text .line').count()<=1
    source_ids.append(page.locator('.vn-frame').get_attribute('data-source'))
    page.locator('[data-page-next]').first.tap()
   else:raise AssertionError('large-font opening reader stalled')
   assert len(set(source_ids))==6
   option_ids=visible_option_ids(page)
   assert set(option_ids)=={'canon','rescue','investigate'},option_ids
   page.wait_for_timeout(250)
   data=page.evaluate("""()=>{
    const text=document.querySelector('.mobile-text'),dock=document.querySelector('.mobile-options'),
      sheet=document.querySelector('.mobile-sheet'),d=dock.getBoundingClientRect();
    return {sheet:sheet.getBoundingClientRect().height,inner:innerHeight,
      blocks:text.querySelectorAll('.line').length,overflow:text.scrollHeight>text.clientHeight+2,
      optionOverflow:dock.scrollHeight>dock.clientHeight+2,
      buttons:[...dock.querySelectorAll('[data-choice]')].map(x=>{let r=x.getBoundingClientRect();return {height:r.height,visible:Math.max(0,Math.min(d.bottom,r.bottom)-Math.max(d.top,r.top))}})};
   }""")
   assert data['sheet']<=72,('large-font decision prompt strip regressed into empty dialogue sheet',data)
   assert data['blocks']<=1 and not data['overflow'],data
   assert not data['optionOverflow'],data
   assert data['buttons'] and all(b['height']>=44 and b['visible']>=b['height']-2 for b in data['buttons']),data
   page.screenshot(path=str(D/'intro-320-large.png'))
   return data
  finally:ctx.close()
 record('LARGE_FONT_320_FIRST_FORK',large_first_fork)


 def v62_short_dialogue_and_save_notice():
  ctx,page=open_game(390,844)
  try:
   original=page.locator('.mobile-sheet').evaluate('(x)=>x.getBoundingClientRect().height')
   assert original<=844*.22,('short line wastes too much of the scene',original)
   assert page.locator('#notice').is_hidden()
   page.evaluate("""() => {
    const note=document.querySelector('#notice');
    note.hidden=false;
    note.innerHTML='<div>保存失败，请导出当前进度。</div><button data-action="export">导出</button>';
   }""")
   info=page.locator('#notice').evaluate("""x=>{
    const r=x.getBoundingClientRect(),s=getComputedStyle(x);
    return {opacity:s.opacity,events:s.pointerEvents,top:r.top,bottom:r.bottom,buttons:x.querySelectorAll('button').length};
   }""")
   assert info['opacity']=='1' and info['events']=='auto',info
   assert info['top']>=45 and info['bottom']<844 and info['buttons']==1,info
   page.screenshot(path=str(D/'v62-save-notice.png'))
   return {'shortSubtitleHeight':original,'noticeVisibleAndActionable':True}
  finally:ctx.close()
 record('V62_COMPACT_DIALOGUE_AND_SAVE_NOTICE',v62_short_dialogue_and_save_notice)


 def v63_optical_shot_modal_and_missing_art():
  ctx,page=open_game(390,844)
  try:
   page.wait_for_function("()=>document.querySelector('.adv6')?.dataset.mediaState==='ready'")
   assert page.locator('.adv6').get_attribute('data-art-tier')=='preview-legacy'
   assert page.locator('.adv6-stage img').count()==1
   assert page.locator('[data-page-next]').count()==1
   page.locator('[data-page-next]').tap()
   source=page.locator('.adv6').get_attribute('data-source')
   assert source=='ENTRY_WAKE.intro.007',source
   page.locator('[data-adv6-inspect]').tap()
   assert page.locator('.adv6-modal [role="dialog"]').count()==1
   page.keyboard.press('Escape')
   assert page.locator('.adv6-modal').count()==0
   assert page.locator('[data-adv6-inspect]').evaluate('(x)=>document.activeElement===x')
   assert page.locator('.adv6').get_attribute('data-source')==source
   page.locator('[data-page-next]').tap()
   page.locator('[data-page-next]').tap()
   assert page.locator('.adv6').get_attribute('data-source')=='ENTRY_WAKE.intro.012'
   assert page.locator('.adv6').get_attribute('data-camera')=='stage',('offscreen pianist falsely shown as on-screen actor')
   assert page.locator('.mobile-speaker').inner_text()=='琴台方向的男声'
   assert page.locator('.adv6-stage img').count()==1
   page.locator('.adv6-scene-photo').dispatch_event('error')
   assert page.locator('.adv6').get_attribute('data-media-state')=='failed'
   assert page.locator('.adv6-media-error').is_visible()
   assert page.locator('.adv6').get_attribute('data-source')=='ENTRY_WAKE.intro.012'
   return {'offscreenSpeaker':'琴台方向的男声','realSingleScene':True,'modalFocusRestore':True,'missingArtworkHonest':True,'artTier':'preview-legacy'}
  finally:ctx.close()
 record('V63_OFFSCREEN_OPTICS_MODAL_AND_MEDIA_ERROR',v63_optical_shot_modal_and_missing_art)

 browser.close()
REPORT['status']='PASS' if all(c['status']=='PASS' for c in REPORT['cases']) else 'FAIL'
(R/'qa/current'/('vn-cinematic-webkit-report.json' if ENGINE=='webkit' else 'vn-cinematic-report.json')).write_text(json.dumps(REPORT,ensure_ascii=False,indent=2)+'\n')
if REPORT['status']!='PASS':raise SystemExit(1)
