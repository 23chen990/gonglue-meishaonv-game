/* VN director v3: presentation-only stage direction; canonical DATA/engine are untouched. */
const CINEMA_CUT_IDS=new Set([
 'ENTRY_WAKE.intro.008','ENTRY_WAKE.intro.014','ENTRY_WAKE.intro.016',
 'ENTRY_WAKE.intro.017','ENTRY_WAKE.intro.020','ENTRY_WAKE.intro.021',
 'ENTRY_WAKE.intro.022','ENTRY_WAKE.intro.023','ENTRY_WAKE.intro.024'
]);
const CINEMA_SHOTS={
 'ENTRY_WAKE.intro.025':['4c35bbdfe4a7730e','countdown','七天后，背锅的人就是我。但舞台上只剩几秒了。','B'],
 'ENTRY_WAKE.intro.027':['6c7956246816f656','dilemma','先救她的歌，还是先抓住证据？','P'],
 'OP_SETTLE.r4.body.001':['25fa43e2c4820d73','new-phone','','N'],
 'OP_SETTLE.r4.body.003':['9ae5614f40c52146','lock-phone','这个名字……我竟然下意识答应了。','P'],
 'OP_SETTLE.r4.body.004':['002e423e3acde8da','record','','N'],
 'A1b.r42.body.001':['a4f953ff710c7e08','blame-paper','','N'],
 'A1b.r42.body.003':['9e7bcde56cdc6c15','pen-down','','N'],
 'A1b.r42.body.004':['0cf120a3080dc352','refuse-pen','我只签自己做过的事。','P'],
 'A6a.r42.body.001':['cc3acef89f20880f','fault-video','','N'],
 'A6a.r42.body.002':['78469cbecc7686d1','exit-notice','第七天，果然还是来了。','B'],
 'A6a.r42.body.004':['aa4b7cd8a4da8197','fault-video','这一次，我有多少证据能说话？','B'],
 'A6a.r42.body.005':['8c74a802efb2246e','witnesses','','N'],
 'A6a.r42.body.006':['1a93cea52a4a77aa','evidence-list','就用真正留下的证据说话。','P'],
 't01.r4.body.001':['a0396b89328c6f11','lunch','','N'],
 't01.r4.body.005':['654648f7cf6eb127','chopsticks','','N'],
 's01.r4.body.001':['095858140221e6d2','papers','','N'],
 's01.r4.body.003':['0b6c64e4aae1b44e','empty-cup','','N'],
 'l01.r1.body.001':['cc91e51f52899d6c','headphones','','N'],
 'g01.r1.body.001':['e46dcd788482bac6','balcony','','N']
};
for(const [id,[hash,kind,speech,speaker]] of Object.entries(CINEMA_SHOTS)){
 mobileShotSpecs[id]={hash,kind,speech,speaker};
}
const cinemaOldPaginate=paginate;
paginate=function(rows){
 // These exposition beats remain in the canonical scene, accessible in History.
 // Their plot facts are carried by the preceding/following shot and one stakes beat.
 if(panel==='story'&&phase==='scene'&&state.current==='ENTRY_WAKE' &&
    rows.length>=25 && rows[0]?.id==='ENTRY_WAKE.intro.001'){
  return cinemaOldPaginate(rows.filter(x=>!CINEMA_CUT_IDS.has(x.id)));
 }
 return cinemaOldPaginate(rows);
};
const CINEMA_LABELS={
 ENTRY_WAKE:{canon:'先别动设备。我得看看那张交接单。',rescue:'原版就在脚边！我去拿！',investigate:'先拿到原版，再查是谁换的。'},
 A1b:{check:'只签我做过的部分。',ask:'阿衡，帮我确认一下现场记录。',look:'这张表不能现在签。我先留一份。'},
 A6a:{'intent:prove':'我有证据。请把视频停一下。','intent:leave':'我可以离开，但别让我背这个锅。',public:'把完整时间线投上去。',partner:'请知情的人一起把话说清楚。',backstage:'先撤掉错字幕，再逐项复核。',exit:'更正书给我。我现在离开。',accept:'我不再申辩。',rebuild:'澄清以后，我要重新开始。'},
 t01:{share:'那分我一口？我什么都没看见。',guard:'你慢慢吃。我帮你看着门。',song:'我想听你刚才唱的最后一段。'},
 s01:{honest:'有点事想问。但先陪你坐会儿。',silent:'现在什么都不谈，就坐一会儿。',joke:'只坐五分钟。有人来就说椅子坏了。'},
 l01:{listen:'先留着两秒。我想知道后面的话。',honest:'我没听懂。你带我再听一遍？',endcard:'这次，片尾会有你的名字吗？'},
 g01:{trade:'其实我有件工作上的事想问。',person:'想聊点私事……又有点紧张。',flirt:'不是来汇报的。我想认识你。'}
};
function cinemaLabel(oid,original,scene){
 const replacement=CINEMA_LABELS[scene]?.[oid];if(replacement)return replacement;
 // Quoted choices are already the protagonist's own words; preserve them.
 const s=String(original||'').trim();
 if(/^“[^”]+”[。！？!?]?$/.test(s))return s.slice(1,s.lastIndexOf('”'));
 return s;
}
function cinemaChoices(html,cp){
 const holder=document.createElement('div');holder.innerHTML=html;
 const id=sourceScene().id, labels=new Map((cp.view.choices||[]).map(o=>[o.id,o.label]));
 for(const el of holder.querySelectorAll('[data-choice]')){
  const oid=el.dataset.choice;
  const canonical=labels.get(oid)||el.textContent.trim();
  const shown=cinemaLabel(oid,canonical,id);
  if(el.classList.contains('meet-card'))continue; // keep name and character portrait intact
  el.textContent=shown;
  el.setAttribute('aria-label',shown);
  el.dataset.canonicalLabel=canonical;
 }
 for(const el of holder.querySelectorAll('[data-choice-group]')){
  const small=el.querySelector('small');if(small)small.remove();
  const i=el.querySelector('i');if(i)i.remove();
 }
 for(const el of holder.querySelectorAll('.vn-choice-question'))el.remove();
 for(const el of holder.querySelectorAll('[data-choice-back]')){
  el.textContent='‹ 返回上一步';el.setAttribute('aria-label','返回上一组选项，不会执行剧情选择');
 }
 return holder.innerHTML;
}
const cinemaInspect={
 phone:['《今夜偏爱男主》','许照将因为“现场失误”被清退。签字的人究竟是谁？'],
 badge:['临时场务 · 许照','名字和照片都不属于你。舞台的呼喊却是真的。'],
 'usb-memory':['蓝标原版','小说里一直没人发现它。接线板就在你脚边。'],
 'usb-found':['蓝标原版 · 已找到','这次，伴奏不会凭空消失。'],
 'usb-evidence':['保留下来的原版','它是线索，不是现成的全部真相。'],
 'blame-paper':['现场交接单','三件不同的事，却只给临时场务留了一个签名栏。'],
 'fault-video':['错误归责视频','画面只有一秒，没有完整切换时间线。']
};
function cinemaProps(kind){
 const paper=(heading,detail)=>'<div class="cinema-paper"><small>北岸艺术中心 · 现场记录</small><strong>'+esc(heading)+'</strong><div class="cinema-paper-rule"></div><span>'+esc(detail)+'</span></div>';
 switch(kind){
 case 'countdown':return '<div class="cinema-clock"><small>北岸首演</small><strong>19:03</strong><span>序曲即将开始</span></div>';
 case 'dilemma':return '<div class="cinema-dilemma"><span>伴奏 · 原版</span><i></i><span>交接 · 证据</span></div>';
 case 'new-phone':return '<div class="cinema-message-phone"><small>许照的手机</small><strong>今晚 · 22:18</strong><p>工作群：8 条未读</p><p>房东：门禁已更新</p><p>租房地址：海岚 · 北区</p></div>';
 case 'lock-phone':return '<div class="cinema-message-phone"><small>锁屏</small><strong>22:19</strong><p>阿衡：许照？能听见吗？</p></div>';
 case 'record':return paper('现场切换记录','备用盘：许照提供 / 控台操作：阿衡');
 case 'blame-paper':return paper('责任确认','错版导出 · 音控切换 · 末场清点；临时场务负责：＿＿＿＿');
 case 'pen-down':return paper('未签名','临时场务负责：＿＿＿＿');
 case 'refuse-pen':return '<div class="cinema-pen-stroke"></div>'+paper('各自签字','只对自己实际做过的工作负责');
 case 'fault-video':return '<div class="cinema-video"><small>现场屏幕 · 回放画面</small><div class="cinema-video-grain">REC <span>00:01</span></div><strong>临时人员操作失误</strong><em>缺少完整时间线</em></div>';
 case 'exit-notice':return paper('清退通知','许照 · 立即离开后台');
 case 'witnesses':return '<div class="cinema-people"><div><i>摄</i><span>林见月</span></div><div><i>控</i><span>阿衡</span></div><div><i>件</i><span>沈清辞</span></div></div>';
 case 'evidence-list':return paper('可核验的材料','文件版本 / 切换记录 / 现场影像');
 case 'lunch':return '<div class="cinema-meal"><div class="cinema-carrot"></div><span>后台餐 · 少了两根胡萝卜</span></div>';
 case 'chopsticks':return '<div class="cinema-meal"><div class="cinema-chopsticks"></div><span>一双没拆封的筷子，被推向你</span></div>';
 case 'papers':return paper('栖光计划 · 排期表','最后一页被你按在桌边');
 case 'empty-cup':return '<div class="cinema-cup"><span></span></div>';
 case 'headphones':return '<div class="cinema-audio"><small>原始录音 · 00:02</small><div class="cinema-wave">▂▅▇▃▆▇▂▁▇▅▂</div><strong>“我其实……”</strong></div>';
 case 'balcony':return '<div class="cinema-balcony"><div class="cinema-window"></div><span>夜风把椅子旁的纸角吹起来</span></div>';
 default:return mobileProp(kind);
 }
}
function cinemaMood(b,scene){
 const text=b._sourceText||b.text||'';
 if(/怒|停！|不许|甩锅|清退|错误|事故|责任|逼|慌|撒谎|质疑|紧张|截成/.test(text))return 'tense';
 if(/笑|脸红|害羞|放松|开心|温柔|靠近|轻轻|接过|吃|坐下/.test(text))return 'warm';
 if(/想起|记得|沉默|回忆|不安|原著|不是梦|心慌|犹豫/.test(text))return 'reflect';
 return scene?.music==='warm'?'warm':'neutral';
}
function cinemaCamera(b){
 const k=b._shot;
 if(['phone','new-phone','lock-phone','badge','record','blame-paper','fault-video','piano','usb-memory','handover'].includes(k))return 'insert';
 if(['blackout','wake','countdown'].includes(k))return 'establish';
 if(['standoff','dilemma','exit-notice','evidence-list','refuse-pen'].includes(k))return 'close';
 if(b.speaker==='T'||b.speaker==='S'||b.speaker==='L'||b.speaker==='G')return 'close';
 return 'medium';
}
function cinemaPortrait(cp){
 const b=cp.rows[0];
 if(sourceScene().id==='ENTRY_WAKE'&&b._shot==='standoff')return 't';
 if(['blackout','phone','new-phone','lock-phone','badge','record','blame-paper','fault-video','pen-down','countdown','venue','piano','wake','usb-memory','handover','evidence-list','lunch','chopsticks','papers','empty-cup','headphones','balcony','witnesses'].includes(b._shot))return null;
 // Never show an unrelated woman while a non-illustrated man is speaking.
 if(['A','C','LU','X'].includes(b.speaker))return null;
 if(['T','S','L','G'].includes(b.speaker))return b.speaker.toLowerCase();
 const c=sourceScene().scene?.character||activePortrait();
 return ['t','s','l','g'].includes(c)?c:null;
}
function cinemaDialogueSpeaker(b){
 if(b.speaker==='P'&&!b._thought)return '许照';
 return mobileVoice(b);
}
const CINEMA_LIGHTS={stage:'stage',theatre:'stage',backstage:'night',control:'night',corridor:'night',recording:'studio',studio:'studio',diner:'warm',cafe:'warm',convenience:'warm',terrace:'sky',river:'sky',street:'sky'};
// Replace only the DOM projection. State/choices, story engine, history and save replay remain canonical.
storyHTML=function(){
 const cp=currentPage(),b=cp.rows[0],m=mobileMetrics(),scene=sourceScene().scene||{},
  set=scene.background||'backstage',portrait=cinemaPortrait(cp),voice=cinemaDialogueSpeaker(b);
 const hasDecisions=cp.last&&!cp.view.isReply&&!cp.view.terminal&&cp.view.choices.some(o=>o.enabled);
 const mode=cp.view.terminal?'ending':hasDecisions?'decision':phase==='reply'?'reply':'reading';
 const kind=b._shot&&!b.text?'visual':b._thought?'thought':b.speaker==='N'?'narration':'dialogue';
 const mood=cinemaMood(b,scene),camera=cinemaCamera(b),src=portrait?PORTRAITS[portrait]:null;
 const art=src?'<div class="vn-portrait mobile-portrait cinema-portrait"><img src="'+src+'" alt="" draggable="false"></div>':'';
 const bg=['backstage','theatre','stage','control','corridor'].includes(set)?' style="background-image:url(\''+SCENERY+'\')"':'';
 const setLight=CINEMA_LIGHTS[set]||'night',isStart=page===0&&phase==='scene';
 const chapter={ENTRY_WAKE:'第一夜 · 醒来',A1b:'第一夜 · 交接单',A6a:'第七天 · 反击'};
 const heading=isStart?(chapter[sourceScene().id]||scene.title||cp.view.title):'';
 const ins=cinemaInspect[b._shot],prop=cinemaProps(b._shot);
 const controlsHTML=cinemaChoices(mobileButtons(cp),cp);
 const options=hasDecisions||cp.view.terminal?'<div class="vn-dock mobile-options" role="group" aria-label="选择你的行动">'+controlsHTML+'</div>':'';
 const footer=hasDecisions||cp.view.terminal?'':controlsHTML;
 const panelHeight=hasDecisions?Math.ceil(8+m.safe):b._shot&&!b.text?Math.ceil(61+m.safe):m.height;
 const style='--mobile-panel:'+panelHeight+'px;--mobile-font:'+m.font+'px;--mobile-line:'+m.line+'px;--mobile-safe:'+m.safe+'px;--mobile-vh:'+m.h+'px';
 const shot=b._shot||'',label=b._sourceText||b.text||'';
 const propHTML=prop?'<div class="mobile-prop cinema-prop" role="img" aria-label="'+esc(label)+'">'+prop+'</div>':'';
 const inspectButton=ins?'<button class="cinema-inspect" type="button" data-cinema-inspect="'+esc(shot)+'" aria-label="放大查看'+esc(ins[0])+'"><span aria-hidden="true">⌕</span></button>':'';
 return '<div class="vn-frame mobile-vn cinema-vn" data-mode="'+mode+'" data-beat-kind="'+kind+'" data-shot="'+esc(shot)+'" data-mood="'+mood+'" data-camera="'+camera+'" data-room="'+setLight+'" data-source="'+esc(b._sourceId)+'" data-reader-key="'+esc(cp.view.id+':'+page)+'" style="'+style+'">'+
 '<section class="vn-stage mobile-stage cinema-stage" data-set="'+esc(set)+'"><div class="vn-scenery mobile-scenery"'+bg+' aria-hidden="true"></div><div class="cinema-ambient" aria-hidden="true"></div>'+art+
 (heading?'<div class="mobile-scene-name cinema-chapter">'+esc(heading)+'</div>':'')+propHTML+inspectButton+'</section>'+options+
 '<section class="vn-sheet mobile-sheet" aria-label="当前对白"><div class="mobile-speaker">'+esc(voice)+'</div><div class="vn-scroll mobile-text" aria-live="polite" aria-atomic="true">'+
 (b.text?'<div class="line" data-speaker="'+esc(b.speaker)+'" data-beat="'+esc(b._sourceId)+'"><p>'+esc(b.text)+'</p></div>':'')+'</div><div class="vn-dock mobile-dock">'+footer+'</div></section></div>';
};
const cinemaInspectView={open:null};
function cinemaCloseInspect(){document.querySelector('.cinema-inspect-modal')?.remove();cinemaInspectView.open=null;}
document.addEventListener('click',e=>{
 const show=e.target.closest?.('[data-cinema-inspect]');
 const close=e.target.closest?.('[data-cinema-close]');
 if(!show&&!close)return;
 e.preventDefault();e.stopImmediatePropagation();
 if(close){cinemaCloseInspect();return;}
 const key=show.dataset.cinemaInspect,cue=cinemaInspect[key];if(!cue)return;
 cinemaCloseInspect();cinemaInspectView.open=key;
 const modal=document.createElement('div');modal.className='cinema-inspect-modal';
 modal.innerHTML='<div class="cinema-inspect-backdrop" data-cinema-close="1"></div><section class="cinema-inspect-card" role="dialog" aria-modal="true" aria-labelledby="cinema-inspect-title"><button type="button" class="cinema-close" data-cinema-close="1" aria-label="关闭特写">×</button><div class="cinema-inspect-visual">'+cinemaProps(key)+'</div><h2 id="cinema-inspect-title">'+esc(cue[0])+'</h2><p>'+esc(cue[1])+'</p><button type="button" class="cinema-return" data-cinema-close="1">回到现场</button></section>';
 document.querySelector('.mobile-vn')?.append(modal);
 modal.querySelector('.cinema-close')?.focus();
},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&cinemaInspectView.open){e.preventDefault();cinemaCloseInspect();}},true);
