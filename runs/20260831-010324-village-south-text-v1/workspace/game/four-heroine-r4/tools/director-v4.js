/* ADV V4 stage direction. Presentation-only: story, conditions, endings and commands remain canonical.
   All prop and character art must be image assets; never draw faux IDs, illustrated faces or UI cards in CSS. */
const VN4_ART = typeof VN4_ART_PACK === 'object' && VN4_ART_PACK ? VN4_ART_PACK : {};
const VN4_ART_FILES = Object.freeze({
 crew:'scene_crew_headset.webp', badge:'scene_pov_badge.webp', lin:'scene_lin_camera.webp', gu:'scene_gu_email.webp',
 usb:'scene_usb_case.webp', usbHeld:'scene_usb_hand.webp', piano:'scene_stage_piano.webp', singer:'scene_girl_singer.webp'
});
const VN4_SCENE_IMAGES = Object.freeze({
 'crew-close':'crew', 'pov-badge':'badge', 'lin-camera':'lin', 'gu-mail':'gu',
 'stage-piano':'piano', 'usb-nearby':'usb','usb-in-hand':'usbHeld','singer-shock':'singer'
});
const VN4_VIDEO_CONFIG = {
 'ENTRY_WAKE.intro.003': ['035417c6613d7855','crew-close','许照！醒醒！马上就要开唱了！','A'],
 'ENTRY_WAKE.intro.005': ['5ec6ba33e4014c0c','crew-close','……你在叫我？','P'],
 'ENTRY_WAKE.intro.006': ['747d9712034ff332','crew-close','不叫你叫谁？你刚才还蹲在箱子旁边。','A'],
 'ENTRY_WAKE.intro.007': ['c2f8e655544b9b3f','pov-badge','许照……临时场务？这不是我的名字。','P'],
 'ENTRY_WAKE.intro.011': ['7d202bbf705155d6','singer-shock','停！这不是我排练的版本！','T'],
 'ENTRY_WAKE.intro.012': ['403e45897ece8106','stage-piano','映雪，先看我。我用钢琴撑四小节！','LU'],
 'ENTRY_WAKE.intro.015.l': ['1fcd12a327ad111d','lin-camera','咔嚓。相机后面的女孩抬眼看向你。','N'],
 'ENTRY_WAKE.intro.015.g': ['1fcd12a327ad111d','gu-mail','另一边，有人正追着一封版本确认邮件核对。','N'],
 'ENTRY_WAKE.intro.025': ['4c35bbdfe4a7730e','crew-close','等等……这是我刚看过的小说。七天后，“许照”会替这场事故背锅。','B'],
 'ENTRY_WAKE.intro.026': ['8c19f6181d538484','usb-nearby','小说里提过：贴蓝胶带的原版 U 盘，就在接线板下面。','B'],
 'ENTRY_WAKE.intro.028': ['416aa34ad470571c','stage-piano','琴声马上要响了。现在还来得及。','B'],
 'ENTRY_WAKE.r42.reply.rescue.001':['42afa151967e603b','usb-in-hand','找到了。先让音控确认版本。','P'],
 'ENTRY_WAKE.r42.reply.investigate.001':['813b9fd1476bdca9','usb-in-hand','原版在手。还有谁动过错版？','P'],
 'ENTRY_WAKE.r42.reply.canon.001':['3631bd70b4b82c24','usb-nearby','先看清他们要我签什么。','P'],
 't01.r4.body.001':['a0396b89328c6f11','singer-shock','她把盒饭往身后藏了藏。','N'],
 'l01.r1.body.001':['cc91e51f52899d6c','lin-camera','她把一边耳机递了过来。','N'],
 's01.r4.body.001':['095858140221e6d2','gu-mail','一沓排期表被风吹乱。她腾出一只手去按住。','N']
};
for(const [id,[hash,kind,speech,speaker]] of Object.entries(VN4_VIDEO_CONFIG)){
 mobileShotSpecs[id]={hash,kind,speech,speaker};
}
// The legacy prototype used decorative CSS 'props'. Unillustrated visual beats must never
// become empty screens; fall back to their original source dialogue until proper CG exists.
const VN4_IMAGE_KINDS = new Set([...Object.keys(VN4_SCENE_IMAGES)]);
const VN4_PREVIOUS_SOURCE = new Map();
function vn4ReconcileShots(rows){
 for(const r of rows){
  const old=mobileShotSpecs[r.id];
  if(old && !VN4_IMAGE_KINDS.has(old.kind)){
   if(!VN4_PREVIOUS_SOURCE.has(r.id)) VN4_PREVIOUS_SOURCE.set(r.id,old);
   delete mobileShotSpecs[r.id];
  }
 }
}
const vn4CorePaginate = cinemaOldPaginate; // v2: each authored source turn becomes one visual-novel page.
const VN4_OPENING_IDS=['ENTRY_WAKE.intro.003','ENTRY_WAKE.intro.005','ENTRY_WAKE.intro.006','ENTRY_WAKE.intro.007',
 'ENTRY_WAKE.intro.011','ENTRY_WAKE.intro.012','ENTRY_WAKE.intro.015','ENTRY_WAKE.intro.025',
 'ENTRY_WAKE.intro.026','ENTRY_WAKE.intro.028'];
const VN4_OPENING_SET=new Set(VN4_OPENING_IDS);
paginate=function(rows){
 if(panel==='story'&&phase==='scene'&&state.current==='ENTRY_WAKE'&&
    rows.length>=25&&rows[0]?.id==='ENTRY_WAKE.intro.001'){
  // A single authored encounter is staged as two camera cuts, not as two portrait cards.
  const selected=[];
  for(const b of rows){
   if(!VN4_OPENING_SET.has(b.id))continue;
   if(b.id==='ENTRY_WAKE.intro.015'){
    selected.push({...b,id:'ENTRY_WAKE.intro.015.l'});
    selected.push({...b,id:'ENTRY_WAKE.intro.015.g'});
   }else selected.push(b);
  }
  return vn4CorePaginate(selected);
 }
 vn4ReconcileShots(rows);
 return vn4CorePaginate(rows);
};
// The original story and reply text are still present in DATA and History.
// Only the on-stage performance is condensed and rewritten for clarity.
Object.assign(CINEMA_LABELS.ENTRY_WAKE,{
 canon:'先别碰设备，我去看交接记录。',
 rescue:'先把原版伴奏拿出来。',
 investigate:'带走原版，先留一份证据。'
});
Object.assign(CINEMA_LABELS.COLD||{},{});
CINEMA_LABELS.COLD={t:'让唐映雪确认这份原版。',s:'请沈清辞安排安全切换。',l:'让林见月把切换过程拍下来。',g:'请顾晚棠核对授权邮件。',self:'我拿原版，阿衡负责音控。'};

function vn4Art(kind){
 const key=VN4_SCENE_IMAGES[kind];if(!key)return null;
 return VN4_ART[key] || ('assets/v4/'+VN4_ART_FILES[key]);
}
// The prop-inspection modal reuses the original safe, click-stopping dispatch,
// but its content is always actual artwork rather than a program-drawn card.
const vn4PrevProps=cinemaProps;
cinemaProps=function(kind){
 const sourceKind=kind==='badge'?'badge':kind==='usb-memory'?'usb':kind==='usb-found'||kind==='usb-evidence'?'usbHeld':null;
 const src=sourceKind?(VN4_ART[sourceKind+'Raw']||('assets/v4/'+({badge:'pov_badge.webp',usb:'usb_case.webp',usbHeld:'usb_hand.webp'})[sourceKind])):null;
 return src?'<img class="vn4-modal-cg" src="'+src+'" alt="剧情物件特写" />':'';
};
const VN4_INSPECT_KIND = {'pov-badge':'badge','usb-nearby':'usb-memory','usb-in-hand':'usb-found'};
function vn4Name(b){
 if(b.speaker==='P'&&!b._thought)return '许照';
 if(b._thought)return '许照 · 心声';
 if(b.speaker==='LU')return '钢琴旁的男人';
 if(b.speaker==='T'&&sourceScene().id==='ENTRY_WAKE')return '台上的女孩';
 return mobileVoice(b);
}
function vn4CleanOptions(html,cp){
 const root=document.createElement('div');root.innerHTML=cinemaChoices(html,cp);
 for(const el of root.querySelectorAll('.meet-card')){
  const label=el.getAttribute('aria-label')||el.textContent.trim();
  const name=label.replace(/^今晚找/,'去见').replace('：',' · ');
  el.textContent=name;el.classList.remove('meet-card');el.classList.add('choice');
 }
 for(const el of root.querySelectorAll('.vn-choice-question'))el.remove();
 for(const el of root.querySelectorAll('details'))el.remove();
 for(const el of root.querySelectorAll('[data-choice]')){
  const raw=el.dataset.canonicalLabel||el.innerText||'';
  if(!el.title)el.title=raw;
  el.classList.add('vn4-action');
 }
 return root.innerHTML;
}
function vn4SceneBackdrop(scene){
 const set=scene?.background||'backstage';
 return ['backstage','theatre','stage','control','corridor'].includes(set)?
  ' style="background-image:url(\''+SCENERY+'\')"':'';
}
function vn4Character(cp){
 const b=cp.rows[0],char=b.speaker;
 if(['T','S','L','G'].includes(char)&&!b._shot)return char.toLowerCase();
 if(['A','C','LU','X'].includes(char))return null;
 if(b._shot)return null;
 const c=sourceScene().scene?.character||activePortrait();
 return ['t','s','l','g'].includes(c)?c:null;
}
const VN4_CAMERA={
 'crew-close':'actor','pov-badge':'pov','lin-camera':'actor','gu-mail':'actor',
 'stage-piano':'wide','usb-nearby':'insert','usb-in-hand':'pov','singer-shock':'actor'
};
storyHTML=function(){
 const cp=currentPage(),b=cp.rows[0],m=mobileMetrics(),scene=sourceScene().scene||{},
  selection=cp.last&&!cp.view.isReply&&!cp.view.terminal&&cp.view.choices.some(o=>o.enabled);
 const mode=cp.view.terminal?'ending':selection?'decision':phase==='reply'?'reply':'reading';
 const artSrc=vn4Art(b._shot),cam=VN4_CAMERA[b._shot]||'medium';
 const portrait=artSrc?null:vn4Character(cp);
 const role=b._shot&&artSrc?'illustration':b._thought?'thought':b.speaker==='N'?'narration':'dialogue';
 const voice=vn4Name(b),room=scene.background||'backstage',
  mood=cinemaMood(b,scene),kind=b._shot||'';
 const controlsHTML=vn4CleanOptions(mobileButtons(cp),cp),
  options=selection||cp.view.terminal?'<div class="vn-dock mobile-options vn4-options" role="group" aria-label="选择下一步行动">'+controlsHTML+'</div>':'';
 const footer=selection||cp.view.terminal?'':controlsHTML;
 const showText=!!b.text,quietVisual=!showText&&!!artSrc;
 const panelHeight=selection?Math.ceil(8+m.safe):quietVisual?Math.ceil(56+m.safe):m.height;
 const style='--mobile-panel:'+panelHeight+'px;--mobile-font:'+m.font+'px;--mobile-line:'+m.line+'px;--mobile-safe:'+m.safe+'px;--mobile-vh:'+m.h+'px';
 const bg=vn4SceneBackdrop(scene);
 const cg=artSrc?'<div class="vn4-cg vn4-cg-'+cam+'"><img src="'+artSrc+'" alt="" draggable="false" loading="eager" onerror="this.closest(\'.vn4-cg\').style.display=\'none\'"></div>':'';
 const portraitHTML=portrait?'<div class="vn-portrait mobile-portrait vn4-portrait"><img src="'+PORTRAITS[portrait]+'" alt="" draggable="false"></div>':'';
 const inspect=VN4_INSPECT_KIND[kind];
 const inspectButton=inspect&&artSrc?'<button class="vn4-inspect-target" data-cinema-inspect="'+inspect+'" type="button" aria-label="仔细看这件物品"><span>点按查看</span></button>':'';
 const title=(phase==='scene'&&page===0)?({ENTRY_WAKE:'第一夜 · 侧幕',A1b:'第一夜 · 交接单',A6a:'第七天 · 公开质询'}[state.current]||''):'';
 return '<div class="vn-frame mobile-vn cinema-vn vn4" data-mode="'+mode+'" data-beat-kind="'+role+'" data-shot="'+esc(kind)+'" data-mood="'+mood+'" data-camera="'+cam+'" data-room="'+esc(room)+'" data-source="'+esc(b._sourceId)+'" data-reader-key="'+esc(cp.view.id+':'+page)+'" style="'+style+'">'+
 '<section class="vn-stage mobile-stage vn4-stage" data-set="'+esc(room)+'"><div class="vn-scenery mobile-scenery"'+bg+' aria-hidden="true"></div>'+portraitHTML+cg+inspectButton+ (title?'<div class="vn4-chapter">'+esc(title)+'</div>':'')+'</section>'+options+
 '<section class="vn-sheet mobile-sheet" aria-label="当前对白"><div class="mobile-speaker">'+esc(voice)+'</div><div class="vn-scroll mobile-text" aria-live="polite" aria-atomic="true">'+
 (showText?'<div class="line" data-speaker="'+esc(b.speaker)+'" data-beat="'+esc(b._sourceId)+'"><p>'+esc(b.text)+'</p></div>':'')+
 '</div><div class="vn-dock mobile-dock">'+footer+'</div></section></div>';
};