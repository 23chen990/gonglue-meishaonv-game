/* ADV V6 single-stage projection. Uses mobile-reader for cursors, fit and command bridge,
 * but replaces all former V3/V4 layers with a single complete photographic frame.
 * No portrait cutouts, masks or feather composites. DATA and engine remain untouched.
 */
const ADV6_MEDIA_FILES=Object.freeze({
 crew:'crew.webp',badge:'badge.webp',piano:'piano.webp',
 lin:'lin.webp',gu:'gu.webp',singer:'singer.webp',
 usb:'usb.webp',usbHeld:'usbHeld.webp'
});
const ADV6_MEDIA=typeof ADV6_ART_PACK==='object'&&ADV6_ART_PACK?ADV6_ART_PACK:{};
const ADV6_SCENES=Object.freeze({
 'crew':'crew','badge':'badge','piano':'piano','lin':'lin','gu':'gu',
 'singer':'singer','usb':'usb','usbHeld':'usbHeld'
});
// Story provenance check: the editorial performance only applies to precisely
// identified canonical rows, and will silently fall back if a row is revised.
const ADV6_CUTS=Object.freeze({
 'ENTRY_WAKE.intro.003':['035417c6613d7855','crew','许照！原版伴奏盘呢？台上都等着呢！','A'],
 'ENTRY_WAKE.intro.005':['5ec6ba33e4014c0c','crew','……你在叫我？','P'],
 'ENTRY_WAKE.intro.006':['747d9712034ff332','crew','许照啊！你不是去找盘了吗？','A'],
 'ENTRY_WAKE.intro.007':['c2f8e655544b9b3f','badge','许照？这不是我的名字……','P'],
 'ENTRY_WAKE.intro.011':['7d202bbf705155d6','singer','后台能听见吗？这版我没排过……能帮我换回来吗？','T'],
 'ENTRY_WAKE.intro.012':['403e45897ece8106','stage-wide','映雪，跟着我的琴！后台，原版盘快点！','LU'],
 'ENTRY_WAKE.intro.015.l':['1fcd12a327ad111d','lin','别挡镜头。……你是新来的场务？','L'],
 'ENTRY_WAKE.intro.015.g':['1fcd12a327ad111d','gu','伴奏是谁确认的？这封邮件不是我发的。','G'],
 'ENTRY_WAKE.intro.025':['4c35bbdfe4a7730e','stage-wide','等等，这不是我刚看的小说吗？第七天替别人背锅的许照……现在是我。','B'],
 'ENTRY_WAKE.intro.026':['8c19f6181d538484','stage-memory','原版盘就在接线板下面。现在动手，也许结局就能改。','B'],
 'ENTRY_WAKE.intro.028':['416aa34ad470571c','piano','还来得及。我必须马上决定。','P'],
 'ENTRY_WAKE.r42.reply.canon.001':['3631bd70b4b82c24','piano','我先核对交接单，不能乱动设备。','P'],
 'ENTRY_WAKE.r42.reply.rescue.001':['42afa151967e603b','usbHeld','找到了！阿衡，帮她换回原版！','P'],
 'ENTRY_WAKE.r42.reply.investigate.001':['813b9fd1476bdca9','usbHeld','原版在我手里。错版和切换记录也得留住。','P'],
 'COLD.r42.body.001':['30a027ba5aaa8838','usbHeld','盘在手里。能不能播，得让阿衡先听。','P'],
 'COLD.r42.body.002':['626b405719d8eb51','crew','别自己插！我来试听，你去叫人确认。','A'],
 'COLD.r42.body.003':['5490bd553f393cd1','piano','她站在侧幕边，等着最后一个信号。','N'],
 'ENTRY_MEMORY.r42.body.001':['5198afce537726e6','usbHeld','盘找到了。可我根本不会操作音控。','P'],
 'ENTRY_CLUES.r42.body.002':['cc1a86180ab869b6','singer','前奏被剪掉了！你们还要我怎么唱？','T'],
 'ENTRY_CLUES.r42.body.003':['77d070e8e70cfa95','piano','先看我手势，我撑四小节。','LU'],
 'ENTRY_CLUES.r42.body.004':['f02e6c149177869b','piano','琴声撑住开场，她终于接回了歌声。','N'],
 't01.r4.body.001':['a0396b89328c6f11','singer','她赶紧把饭盒往身后藏。','N'],
 'l01.r1.body.001':['cc91e51f52899d6c','lin','见月把相机放低，递过来一边耳机。','N'],
 'g01.r1.body.001':['e46dcd788482bac6','gu','晚棠把工作手机反扣到桌上，望向你。','N']
});
const ADV6_OPENING=[
 'ENTRY_WAKE.intro.003','ENTRY_WAKE.intro.007',
 'ENTRY_WAKE.intro.011','ENTRY_WAKE.intro.012',
 'ENTRY_WAKE.intro.025','ENTRY_WAKE.intro.026','ENTRY_WAKE.intro.028'
];
// No V2/V3 CSS-prop drawings can leak into V5.
for(const k of Object.keys(mobileShotSpecs))delete mobileShotSpecs[k];
for(const [k,[hash,kind,speech,speaker]] of Object.entries(ADV6_CUTS))
 mobileShotSpecs[k]={hash,kind,speech,speaker};

// Retain mobile-reader's grapheme-aware line breaks and source-row cursor;
// condense only the authored opening performance, independent of menu visibility.
paginate=function(rows){
 const m=mobileMetrics();let projected=rows;
 const isOpening=phase==='scene'&&state.current==='ENTRY_WAKE'&&
  rows.length>=25&&rows[0]?.id==='ENTRY_WAKE.intro.001';
 if(isOpening){
  const accepted=[];
  for(const row of rows){
   if(!ADV6_OPENING.includes(row.id))continue;
   if(row.id==='ENTRY_WAKE.intro.015'){
    accepted.push({...row,id:row.id+'.l'},{...row,id:row.id+'.g'});
   }else accepted.push(row);
  }
  projected=accepted;
 }
 const signature=projected.map(b=>[b.id,b.speaker,b.text,b.textHash].join(String.fromCharCode(0))).join(String.fromCharCode(1));
 if(mobilePageCache?.signature===signature&&mobilePageCache.key===m.key)return mobilePageCache.pages;
 const pages=projected.flatMap((row,i)=>mobileSplit(row,m,i).map(fragment=>[fragment]));
 if(!pages.length)pages.push([{speaker:'U',text:'',_row:0,_sourceId:'empty',_start:0,_end:0}]);
 mobilePageCache={signature,key:m.key,pages};return pages;
};

const ADV6_ACTION_LABELS=Object.freeze({
 ENTRY_WAKE:{canon:'先按流程，确认交接记录',rescue:'我去拿原版盘，让她唱回来',investigate:'先保住错版和切换的证据'},
 COLD:{t:'请映雪确认这一版',s:'请清辞安排切换',l:'让见月记录切换过程',g:'请晚棠核对授权',self:'我找盘，阿衡来切换'}
});
function adv6Controls(cp){
 const host=document.createElement('div');host.innerHTML=mobileButtons(cp);
 host.querySelectorAll('[data-choice]').forEach(button=>{
  const original=button.dataset.canonicalLabel||button.getAttribute('aria-label')||button.innerText||'';
  const override=ADV6_ACTION_LABELS[sourceScene().id]?.[button.dataset.choice];
  if(override){button.textContent=override;button.setAttribute('aria-label',override);}
  else if(button.classList.contains('meet-card')){
   button.textContent=original.replace('今晚找','去见').split('：')[0];
  }
  button.classList.remove('meet-card','rescue-option','first-fork-choice');
  button.classList.add('adv6-action');
 });
 host.querySelectorAll('.option-number,.meet-portrait,.meet-copy,.vn-choice-question,.first-fork-disclaimer').forEach(e=>e.remove());
 host.querySelectorAll('[data-choice-group]').forEach(button=>{
  button.querySelector('small')?.remove();button.querySelector('i')?.remove();
 });
 host.querySelectorAll('details').forEach(e=>e.remove());
 return host.innerHTML;
}
function adv6MediaForBeat(b,scene,decision){
 if(decision&&sourceScene().id==='ENTRY_WAKE')return {key:'stage',url:SCENERY};
 if(b._shot==='stage-wide')return {key:'stage',url:SCENERY};
 const key=ADV6_SCENES[b._shot];
 if(key)return {key,url:ADV6_MEDIA[key]||('assets/v6-preview/'+ADV6_MEDIA_FILES[key])};
 const speakerShots={T:'singer',L:'lin',G:'gu'};
 const voice=speakerShots[b.speaker];
 if(voice)return {key:voice,url:ADV6_MEDIA[voice]||('assets/v6-preview/'+ADV6_MEDIA_FILES[voice])};
 // One established CG per scene, not two unrelated images blended together.
 const bg=scene.background||'';
 if(['stage','theatre'].includes(bg))return {key:'piano',url:ADV6_MEDIA.piano||('assets/v6-preview/'+ADV6_MEDIA_FILES.piano)};
 return {key:'fallback',url:SCENERY};
}
function adv6Speaker(b){
 if(b.speaker==='B')return '许照 · 心声';
 if(b.speaker==='P')return '许照';
 if(b.speaker==='N'||b.speaker==='U')return '';
 if(sourceScene().id==='ENTRY_WAKE'){
  if(b.speaker==='A')return '戴耳机的工作人员';
  if(b.speaker==='T')return '台上的女孩';
  if(b.speaker==='LU')return '琴台方向的男声';
 }
 return names[b.speaker]||mobileVoice(b);
}
/* Compact subtitles preserve the scene without forcing one short sentence into
 * a 1/4-screen blank reading slab. Respect the canonical measured paginator. */
function adv6DialogueHeight(m,text){
 mobileMeasure.textContent=text||' ';
 const measured=mobileMeasure.getBoundingClientRect().height;
 const lines=Math.max(1,Math.min(3,Math.ceil((measured-.1)/m.line)));
 const chrome=27+42+11+3+m.safe+5;
 const needed=Math.ceil(chrome+lines*m.line);
 const minimum=Math.round(m.h*(m.font>18?.225:.19));
 return Math.min(m.height,Math.max(needed,minimum));
}
function adv6Chapter(id){return {ENTRY_WAKE:'第一夜 · 侧幕',A1b:'第一夜  ·  交接',A6a:'第七天  ·  真相'}[id]||'';}
storyHTML=function(){
 const cp=currentPage(),b=cp.rows[0],m=mobileMetrics(),s=sourceScene(),scene=s.scene||{};
 const decision=cp.last&&!cp.view.isReply&&!cp.view.terminal&&cp.view.choices?.some(o=>o.enabled);
 const mode=cp.view.terminal?'ending':decision?'decision':phase==='reply'?'reply':'reading';
 const media=adv6MediaForBeat(b,scene,decision);
 const voice=adv6Speaker(b),text=b.text||'',showText=!!text&&!decision;
 const panelHeight=decision?0:adv6DialogueHeight(m,text);
 const css='--mobile-panel:'+panelHeight+'px;--mobile-font:'+m.font+'px;--mobile-line:'+m.line+'px;--mobile-safe:'+m.safe+'px;--mobile-vh:'+m.h+'px';
 const isHeroOpening=phase==='scene'&&s.id==='ENTRY_WAKE';
 const chapter=(page===0&&phase==='scene')?adv6Chapter(s.id):'';
 const optionsHTML=adv6Controls(cp);
 const dock=decision||cp.view.terminal?'<div class="vn-dock mobile-options adv6-options" role="group" aria-label="选择接下来的行动">'+optionsHTML+'</div>':'';
 const footer=decision||cp.view.terminal?'':optionsHTML;
 const inspect=isHeroOpening&&b._shot==='badge'&&media.key==='badge';
 const visual= '<div class="adv6-image" data-visual-key="'+esc(media.key)+'"><img class="adv6-scene-photo" src="'+media.url+'" alt="" loading="eager" draggable="false"></div>';
 const inspectButton=inspect?'<button class="adv6-inspect" data-adv6-inspect="badge" type="button" aria-label="仔细看工作牌">查看工作牌 <span aria-hidden="true">⌕</span></button>':'';
 return '<div class="vn-frame mobile-vn adv6" data-mode="'+mode+'" data-camera="'+esc(media.key)+'" data-art-tier="preview-legacy" data-beat-kind="'+(b._thought?'thought':b.speaker==='N'?'narration':'dialogue')+'" data-source="'+esc(b._sourceId)+'" data-reader-key="'+esc(cp.view.id+':'+page)+'" style="'+css+'">'+
 '<section class="vn-stage mobile-stage adv6-stage" aria-label="剧情舞台">'+visual+'<div class="adv6-media-error" role="status">剧情图片暂时无法加载，请返回后重试。</div>'+'<div class="adv6-vignette" aria-hidden="true"></div>'+ (chapter?'<div class="adv6-chapter">'+esc(chapter)+'</div>':'')+inspectButton+'</section>'+dock+
 (decision?'<section class="vn-sheet mobile-sheet adv6-sheet adv6-sheet-hidden" aria-hidden="true"><div class="mobile-speaker"></div><div class="vn-scroll mobile-text"></div></section>':'<section class="vn-sheet mobile-sheet adv6-sheet" aria-label="当前对白"><div class="mobile-speaker adv6-speaker">'+esc(voice)+'</div><div class="vn-scroll mobile-text adv6-text" aria-live="polite" aria-atomic="true">'+
 (showText?'<div class="line" data-speaker="'+esc(b.speaker)+'" data-beat="'+esc(b._sourceId)+'"><p>'+esc(text)+'</p></div>':'')+'</div><div class="vn-dock mobile-dock adv6-dock">'+footer+'</div></section>')+
 '</div>';
};
// Real image inspection, not a fake ID card drawn with CSS. Capture and close
// must never issue canonical choices or move the reader cursor.
let adv6InspectOpen=false;
let adv6InspectReturnFocus=null;
function adv6CloseInspect(){document.querySelector('.adv6-modal')?.remove();adv6InspectOpen=false;if(adv6InspectReturnFocus?.isConnected)adv6InspectReturnFocus.focus();adv6InspectReturnFocus=null;}
document.addEventListener('click',event=>{
 const open=event.target.closest?.('[data-adv6-inspect]');
 const close=event.target.closest?.('[data-adv6-close]');
 if(!open&&!close)return;
 event.preventDefault();event.stopImmediatePropagation();
 if(close){adv6CloseInspect();return;}
 adv6CloseInspect();adv6InspectReturnFocus=open;adv6InspectOpen=true;
 const url=ADV6_MEDIA.badge||('assets/v6-preview/'+ADV6_MEDIA_FILES.badge);
 const box=document.createElement('div');box.className='adv6-modal';
 box.innerHTML='<div class="adv6-modal-shade" data-adv6-close="1"></div><section class="adv6-modal-frame" role="dialog" aria-modal="true" aria-label="手中的工作牌"><img src="'+url+'" alt="许照的临时场务工作牌"><p>许照 · 临时场务<br>……这是我现在的名字？</p><button type="button" class="cinema-close adv6-close" data-adv6-close="1" aria-label="关闭工作牌特写">×</button></section>';
 document.body.append(box);box.querySelector('.adv6-close')?.focus();
},true);
document.addEventListener('keydown',event=>{
 if(!adv6InspectOpen)return;
 if(event.key==='Escape'){
  event.preventDefault();event.stopImmediatePropagation();adv6CloseInspect();
 }else if(event.key==='Tab'){
  event.preventDefault();event.stopImmediatePropagation();document.querySelector('.adv6-close')?.focus();
 }
},true);
// Never substitute unrelated artwork if the intended frame cannot load.
document.addEventListener('error',event=>{
 const img=event.target;
 if(!img?.matches?.('.adv6-scene-photo'))return;
 const frame=img.closest('.adv6');if(frame)frame.dataset.mediaState='failed';
},true);
// Native source pixel density is reported to QA, never replaced with fake sharpening.
document.addEventListener('load',event=>{
 const img=event.target;
 if(!img?.matches?.('.adv6-scene-photo'))return;
 const frame=img.closest('.adv6');if(!frame)return;
 frame.dataset.mediaState='ready';
 const display=img.getBoundingClientRect(),dpr=Math.max(1,window.devicePixelRatio||1);
 const scale=Math.max(display.width/img.naturalWidth,display.height/img.naturalHeight);
 frame.dataset.mediaDensity=(1/scale>=dpr?'full':'below-device-density');
},true);
