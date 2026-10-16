/* ADV V5: one complete CG is the entire stage, not a second image pasted on scenery.
 * Canonical story, choices, effects and saves remain in DATA and engine. */
const ADV5_FILES={crew:'crew_headset.webp',badge:'pov_badge.webp',singer:'girl_singer.webp',piano:'stage_piano.webp',lin:'lin_camera.webp',gu:'gu_email.webp',usb:'usb_case.webp',usbHeld:'usb_hand.webp'};
const ADV5_ART=typeof ADV5_ART_PACK==='object'&&ADV5_ART_PACK?ADV5_ART_PACK:{};
const ADV5_LINES={
 'ENTRY_WAKE.intro.003':['035417c6613d7855','crew','许照！原版伴奏盘呢？再不来就要开唱了！','A'],
 'ENTRY_WAKE.intro.007':['c2f8e655544b9b3f','badge','许照？……这不是我的名字。','P'],
 'ENTRY_WAKE.intro.011':['7d202bbf705155d6','singer','等等！这不是我排练的版本！','T'],
 'ENTRY_WAKE.intro.012':['403e45897ece8106','piano','先跟我的琴！我来撑住前奏。','LU'],
 'ENTRY_WAKE.intro.025':['4c35bbdfe4a7730e','crew','等等……这不就是我刚看完的小说？七天后，背锅的就是许照。','B'],
 'ENTRY_WAKE.intro.026':['8c19f6181d538484','piano','原版盘……我记得它藏在接线板下面！','B'],
 'ENTRY_WAKE.intro.028':['416aa34ad470571c','piano','还来得及。我得先做点什么。','P'],
 'ENTRY_WAKE.r42.reply.canon.001':['3631bd70b4b82c24','piano','我先核对交接单，不能乱动设备。','P'],
 'ENTRY_WAKE.r42.reply.rescue.001':['42afa151967e603b','usbHeld','找到原版了！交给音控确认。','P'],
 'ENTRY_WAKE.r42.reply.investigate.001':['813b9fd1476bdca9','usbHeld','原版在这里。换掉它的人还没找到。','P'],
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
};
const ADV5_OPENING=new Set(['ENTRY_WAKE.intro.003','ENTRY_WAKE.intro.007','ENTRY_WAKE.intro.011','ENTRY_WAKE.intro.012','ENTRY_WAKE.intro.025','ENTRY_WAKE.intro.026','ENTRY_WAKE.intro.028']);
for(const k of Object.keys(mobileShotSpecs))delete mobileShotSpecs[k];
for(const [id,[hash,kind,speech,speaker]] of Object.entries(ADV5_LINES))mobileShotSpecs[id]={hash,kind,speech,speaker};
/* The same authored page sequence is used by the story, menu, font-toggle and save cursor. */
paginate=function(rows){
 const m=mobileMetrics(),opening=phase==='scene'&&state.current==='ENTRY_WAKE'&&rows.length>=25&&rows[0]?.id==='ENTRY_WAKE.intro.001';
 const displayed=opening?rows.filter(r=>ADV5_OPENING.has(r.id)):rows;
 const signature=displayed.map(b=>[b.id,b.speaker,b.text,b.textHash].join('\0')).join('\1');
 if(mobilePageCache?.signature===signature&&mobilePageCache.key===m.key)return mobilePageCache.pages;
 const pages=displayed.flatMap((r,i)=>mobileSplit(r,m,i).map(x=>[x]));
 if(!pages.length)pages.push([{speaker:'U',text:'',_row:0,_sourceId:'empty',_start:0,_end:0}]);
 mobilePageCache={signature,key:m.key,pages};return pages;
};
const ADV5_LABELS={ENTRY_WAKE:{canon:'先核对交接记录',rescue:'马上去找原版伴奏',investigate:'先保住换版的证据'},COLD:{t:'请映雪确认这一版',s:'请清辞安排切换',l:'让见月记录切换过程',g:'请晚棠核对授权',self:'我找盘，阿衡来切换'}};
function adv5Buttons(cp){
 const d=document.createElement('div');d.innerHTML=mobileButtons(cp);
 d.querySelectorAll('[data-choice]').forEach(el=>{
  const label=ADV5_LABELS[sourceScene().id]?.[el.dataset.choice];
  if(label){el.textContent=label;el.setAttribute('aria-label',label);}
  else if(el.classList.contains('meet-card'))el.textContent=(el.getAttribute('aria-label')||el.textContent).replace('今晚找','去见').split('：')[0];
  el.classList.remove('meet-card','rescue-option','first-fork-choice');el.classList.add('adv5-action');
 });
 d.querySelectorAll('.meet-portrait,.meet-copy,.option-number,.vn-choice-question').forEach(e=>e.remove());
 d.querySelectorAll('[data-choice-group] small,[data-choice-group] i').forEach(e=>e.remove());
 d.querySelectorAll('details').forEach(e=>e.remove());
 return d.innerHTML;
}
function adv5Image(b,scene,decision){
 let key=b._shot;
 if(decision&&sourceScene().id==='ENTRY_WAKE')key='piano';
 if(!ADV5_FILES[key])key={T:'singer',L:'lin',G:'gu'}[b.speaker]||(['stage','theatre'].includes(scene.background)?'piano':null);
 return {key:key||'fallback',src:key?(ADV5_ART[key]||'assets/v4/'+ADV5_FILES[key]):SCENERY};
}
function adv5Voice(b){
 if(b.speaker==='P')return '许照';
 if(b.speaker==='B')return '许照 · 心声';
 if(b.speaker==='N'||b.speaker==='U')return '';
 if(sourceScene().id==='ENTRY_WAKE'){
  if(b.speaker==='A')return '戴耳机的工作人员';
  if(b.speaker==='T')return '台上的女孩';
  if(b.speaker==='LU')return '钢琴旁的男人';
 }
 return names[b.speaker]||mobileVoice(b);
}
storyHTML=function(){
 const cp=currentPage(),b=cp.rows[0],m=mobileMetrics(),s=sourceScene(),scene=s.scene||{};
 const decision=cp.last&&!cp.view.isReply&&!cp.view.terminal&&cp.view.choices?.some(o=>o.enabled);
 const mode=cp.view.terminal?'ending':decision?'decision':phase==='reply'?'reply':'reading';
 const art=adv5Image(b,scene,decision),speaker=adv5Voice(b),showText=!!b.text&&!decision;
 const css='--mobile-panel:'+(decision?0:m.height)+'px;--mobile-font:'+m.font+'px;--mobile-line:'+m.line+'px;--mobile-safe:'+m.safe+'px;--mobile-vh:'+m.h+'px';
 const btn=adv5Buttons(cp),opts=decision||cp.view.terminal?'<div class="vn-dock mobile-options adv5-options" role="group" aria-label="选择下一步行动">'+btn+'</div>':'';
 const footer=decision||cp.view.terminal?'':btn;
 const title=page===0&&phase==='scene'?({ENTRY_WAKE:'第一夜 · 侧幕',A1b:'第一夜 · 交接',A6a:'第七天 · 真相'}[s.id]||''):'';
 const inspect=s.id==='ENTRY_WAKE'&&b._shot==='badge'&&art.key==='badge';
 return '<div class="vn-frame mobile-vn adv5" data-mode="'+mode+'" data-camera="'+esc(art.key)+'" data-source="'+esc(b._sourceId)+'" data-beat-kind="'+(b._thought?'thought':b.speaker==='N'?'narration':'dialogue')+'" data-reader-key="'+esc(cp.view.id+':'+page)+'" style="'+css+'">'+
 '<section class="vn-stage mobile-stage adv5-stage"><div class="adv5-image"><img class="adv5-scene-photo" src="'+art.src+'" alt="" draggable="false" loading="eager"></div><div class="adv5-vignette" aria-hidden="true"></div>'+(title?'<div class="adv5-chapter">'+esc(title)+'</div>':'')+(inspect?'<button class="adv5-inspect" data-cinema-inspect="badge" type="button">查看工作牌 ⌕</button>':'')+'</section>'+opts+
 (decision?'<section class="vn-sheet mobile-sheet adv5-sheet adv5-sheet-hidden" aria-hidden="true"><div class="mobile-speaker"></div><div class="vn-scroll mobile-text"></div></section>':'<section class="vn-sheet mobile-sheet adv5-sheet" aria-label="当前对白"><div class="mobile-speaker adv5-speaker">'+esc(speaker)+'</div><div class="vn-scroll mobile-text adv5-text" aria-live="polite" aria-atomic="true">'+(showText?'<div class="line" data-speaker="'+esc(b.speaker)+'" data-beat="'+esc(b._sourceId)+'"><p>'+esc(b.text)+'</p></div>':'')+'</div><div class="vn-dock mobile-dock adv5-dock">'+footer+'</div></section>')+
 '</div>';
};
let adv5Modal=false;
function adv5Close(){document.querySelector('.adv5-modal')?.remove();adv5Modal=false;}
document.addEventListener('click',e=>{
 const show=e.target.closest?.('[data-cinema-inspect]'),close=e.target.closest?.('[data-adv5-close]');
 if(!show&&!close)return;
 e.preventDefault();e.stopImmediatePropagation();
 if(close){adv5Close();return;}
 adv5Close();adv5Modal=true;
 const url=ADV5_ART.badge||('assets/v4/'+ADV5_FILES.badge);
 const div=document.createElement('div');div.className='adv5-modal';
 div.innerHTML='<div class="adv5-modal-shade" data-adv5-close="1"></div><section class="adv5-modal-frame" role="dialog" aria-modal="true" aria-label="工作牌特写"><img src="'+url+'" alt="许照的工作牌"><p>许照 · 临时场务<br>……这是我现在的名字？</p><button type="button" class="cinema-close adv5-close" data-adv5-close="1" aria-label="关闭工作牌特写">×</button></section>';
 document.querySelector('.adv5')?.append(div);div.querySelector('.cinema-close')?.focus();
},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&adv5Modal){e.preventDefault();adv5Close();}},true);
