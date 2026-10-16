/* First-night playable director pass. Canonical engine commands remain the source of truth.
 * UI-only microchoices persist in the existing save but never masquerade as story commands.
 * This layer is mounted only at the untouched ENTRY_WAKE scene; all other scenes use the engine.
 */
const IO_VERSION = 1;
const IO_STEPS = new Set(['wake','answer','badge','badge-read','alarm','crisis','ask','ask-answer','hunt','find','confront','confront-answer','bond','final']);
function ioNew(){return {v:IO_VERSION,step:'wake',tone:'',ally:'',defiance:'',seen:[],lastFind:'',visits:0,finished:false};}
let io = ioNew();
const ioOldSnapshot=snapshot, ioOldReadPayload=readPayload, ioOldInstall=install, ioOldReset=reset, ioOldStoryHTML=storyHTML;
const ioSafe=(x,possible)=>possible.includes(x)?x:'';
function ioRead(v){
 if(!v || v.v!==IO_VERSION || !IO_STEPS.has(v.step))return ioNew();
 const seen=Array.isArray(v.seen)?[...new Set(v.seen.filter(x=>['usb','sheet','board'].includes(x)))].slice(0,3):[];
 return {v:IO_VERSION,step:v.step,tone:ioSafe(v.tone,['help','steady','confused']),ally:ioSafe(v.ally,['shen','tang','solo']),defiance:ioSafe(v.defiance,['ask','hide','stand']),seen,lastFind:ioSafe(v.lastFind,['usb','sheet','board']),visits:Math.min(40,Math.max(0,Number(v.visits)||0)),finished:!!v.finished};
}
function ioActive(){return new URLSearchParams(location.search).get('qa')!=='canonical' && panel==='story' && phase==='scene' && state.current==='ENTRY_WAKE' && !io.finished && state.history.length===0;}
snapshot=function(){const save=ioOldSnapshot();save.ui.firstNight={...io,seen:[...io.seen]};return save;};
readPayload=function(raw){const result=ioOldReadPayload(raw);result.firstNight=ioRead(raw?.ui?.firstNight);if(!raw?.ui?.firstNight&&raw?.ui?.page>0)result.firstNight.finished=true;return result;};
install=function(result){ioOldInstall(result);io=result.firstNight||ioNew();if(state.current!=='ENTRY_WAKE'||state.history.length)io.finished=true;};
reset=function(){const before=state;ioOldReset();if(state!==before && state.current==='ENTRY_WAKE' && state.history.length===0){io=ioNew();save();render();}};
function ioLine(){
 switch(io.step){
 case 'wake': return {voice:'沈清辞',portrait:'s',mood:'wake',text:'许照！你能听见我说话吗？',hint:'她正朝你伸出手。'};
 case 'answer': return {
    voice:'沈清辞',portrait:'s',mood:'wake',text:io.tone==='help'?'慢点。抓住我，别踩到那些线。':io.tone==='steady'?'还逞强？脸都白了。':'……你连自己叫什么都忘了？',hint:'她看了你一眼，没松开手。'};
 case 'badge': return {voice:'',portrait:null,mood:'badge',text:'胸前挂着一张陌生的工牌。',hint:'点开工牌确认身份。'};
 case 'badge-read': return {voice:'许照 · 心声',portrait:null,mood:'badge',text:'许照……我刚读过的小说里，也有这个名字。',hint:'你突然听见舞台上传来尖叫。'};
 case 'alarm': return {voice:'唐映雪',portrait:'t',mood:'stage',text:'停！这根本不是我排练的歌！',hint:'音乐骤停。观众已经在等。'};
 case 'crisis': return {voice:'沈清辞',portrait:'s',mood:'stage',text:'有人换了伴奏。原版应该还在后台。',hint:'她盯着控台，指尖攥得发白。'};
 case 'ask': return {voice:'沈清辞',portrait:'s',mood:'stage',text:'许照，你愿意帮我找吗？',hint:'你可以向她们靠近，也可以自己行动。'};
 case 'ask-answer': return {
    voice:io.ally==='tang'?'唐映雪':io.ally==='shen'?'沈清辞':'许照 · 心声',portrait:io.ally==='tang'?'t':io.ally==='shen'?'s':null,mood:'stage',
    text:io.ally==='tang'?'我不怕重唱。我怕他们让我唱错的版本。':io.ally==='shen'?'谢谢你。我拦住他们，你去找原版。':'先把证据找出来，再决定信谁。',
    hint:'离你最近的是控制台和一堆设备箱。'};
 case 'hunt': return {voice:'',portrait:null,mood:'search',text:io.seen.includes('usb')?'找到蓝标盘了。还想检查别的地方吗？':'后台很乱。先找到一条真正的线索。',hint:'点击场景中的物品调查。'};
 case 'find': return {voice:'',portrait:null,mood:'search',text:io.lastFind==='usb'?'接线板下，露出蓝胶带。是原版 U 盘！':io.lastFind==='sheet'?'交接单上预留了你的签名。你还没签。':'屏幕上播放的文件名，和排练单对不上。',hint:io.lastFind==='usb'?'你知道原版在哪里了。':'还能继续调查别的地方。'};
 case 'confront': return {voice:'程放',portrait:null,mood:'block',text:'谁让你翻箱子的？先把这张单子签了。',hint:'他挡在你和接线板之间。'};
 case 'confront-answer': return {voice:'程放',portrait:null,mood:'block',text:io.defiance==='ask'?'问这么多做什么？责任人写你名字就行。':io.defiance==='hide'?'还不签？演出要是出事，你担得起吗？':'……你去问沈清辞？行，我等着。',hint:'他看上去比你更急。'};
 case 'bond': return {voice:io.ally==='tang'?'唐映雪':'沈清辞',portrait:io.ally==='tang'?'t':'s',mood:'bond',text:io.ally==='tang'?'你找到能让我唱回来的东西了吗？':io.ally==='shen'?'我相信你找到了什么。给我看一眼？':'别把东西交给程放。你得自己决定。',hint:'你已经知道蓝标盘的位置。'};
 case 'final': return {voice:'许照 · 心声',portrait:null,mood:'decision',text:'这次，我来决定怎么做。',hint:'下一步会改变整场演出，也会改变她们对你的看法。'};
 }
 throw Error('Unknown interactive opening step');
}
const ioActions={
 wake:[['help','让她扶自己站起来'],['steady','自己站起来'],['confused','“你刚才叫我什么？”']],
 answer:[['next','继续']],
 badge:[['badge','翻开工牌']],
 'badge-read':[['next','继续']],
 alarm:[['next','继续']],crisis:[['next','继续']],
 ask:[['shen','去帮沈清辞'],['tang','去问唐映雪'],['solo','先自己查查']],
 'ask-answer':[['next','去找线索']],
 find:[['back','继续查看']],
 confront:[['ask','“为什么非要我签？”'],['hide','把发现藏好'],['stand','“我要找沈清辞确认。”']],
 'confront-answer':[['next','继续']],
 bond:[['next','面对选择']],
 final:[['rescue','把原版送上台 · 救场'],['investigate','找沈清辞核验 · 留证'],['canon','暂不碰音控 · 拒绝背锅']]
};
const ioNext={answer:'badge','badge-read':'alarm',alarm:'crisis',crisis:'ask','ask-answer':'hunt','confront-answer':'bond',bond:'final'};
function ioAction(action){
 if(!ioActive())return;
 const step=io.step;
 const allowed=step==='hunt'?['usb','sheet','board',...(io.seen.includes('usb')?['move']:[])]:ioActions[step]?.map(x=>x[0])||[];
 if(!allowed.includes(action))return;
 if(step==='wake'){io.tone=action;io.step='answer';}
 else if(step==='badge'){io.step='badge-read';}
 else if(step==='ask'){io.ally=action;io.step='ask-answer';}
 else if(step==='hunt'){
  if(action==='move'){io.step='confront';}
  else{io.lastFind=action;if(!io.seen.includes(action))io.seen.push(action);io.visits++;io.step='find';}
 }
 else if(step==='find'){io.step='hunt';}
 else if(step==='confront'){io.defiance=action;io.step='confront-answer';}
 else if(step==='final'){
  const options=renderScene(state,DATA).choices.filter(x=>x.enabled);
  if(!options.some(x=>x.id===action))throw Error('Canonical first decision not available');
  const out=choose(state,DATA,action,state.revision);
  io.finished=true;state=out.state;lastReply=out.reply;phase=lastReply.length?'reply':'scene';page=0;choicePage=0;
 } else io.step=ioNext[step]||step;
 save();render();arm();
}
function ioArt(info){
 const img=info.portrait?'<img draggable="false" class="io-person" src="'+PORTRAITS[info.portrait]+'" alt="">':'';
 const phone='<div class="io-phone"><span>北岸艺术中心</span><b>临时场务：许照</b><small>距离开场，不到一分钟</small></div>';
 const badge='<div class="io-badge-art" aria-hidden="true"><small>北岸艺术中心</small><span class="io-badge-head">◉</span><strong>许照</strong><em>临时场务</em></div>';
 const stage='<div class="io-theatre-art"><div class="io-theatre-light"></div><div class="io-music">♫</div></div>';
 const search='<div class="io-search-art"><div class="io-box io-box-one">音控台<br><small>LIVE / TAKE</small></div><div class="io-box io-box-two">交接单<br><small>等待签字</small></div><div class="io-box io-box-three"><div class="io-wire">╭────╮</div><div class="io-blue">▰</div>接线板</div></div>';
 const block='<div class="io-block-art"><div class="io-folder">现场版本确认<br><small>签名：_______</small></div><div class="io-shade"></div></div>';
 const cases={wake:"",badge,stage,search,block,bond:stage,decision:stage};
 return '<div class="io-backdrop" style="background-image:url(\''+SCENERY+'\')"></div>'+img+(cases[info.mood]||'');
}
function ioChoices(step){
 if(step==='hunt'){
  const items=[['board','看控台屏幕','monitor'],['sheet','翻交接单','document'],['usb','检查接线板','plug']];
  return '<div class="io-hotspots" aria-label="调查场景">'+items.map(([action,title,klass])=>
   '<button type="button" class="io-hotspot io-'+klass+' '+(io.seen.includes(action)?'seen':'')+'" data-io="'+action+'"><span aria-hidden="true">'+(io.seen.includes(action)?'✓':'◉')+'</span>'+title+'</button>').join('')+'</div>'+
   (io.seen.includes('usb')?'<button class="io-advance" data-io="move">先处理眼前危机 →</button>':'<div class="io-search-cue">先找到原版伴奏</div>');
 }
 const list=ioActions[step]||[];
 return '<div class="io-choice-stack" role="group" aria-label="选择你的行动">'+list.map(([id,label])=>
  '<button type="button" data-io="'+id+'" class="'+(list.length===1?'io-single':'io-choice')+'">'+esc(label)+' <span aria-hidden="true">'+(list.length===1?'›':'↗')+'</span></button>').join('')+'</div>';
}
function ioStoryHTML(){
 const info=ioLine(), m=mobileMetrics(), actionCount=(ioActions[io.step]||[]).length;
 const decision=actionCount>1 || io.step==='hunt';
 const speaker=info.voice;
 const art=ioArt(info);
 const sheet=Math.floor(Math.min(m.h/3,(m.h>=650?m.h/4:m.h/3)));
 const style='--mobile-panel:'+sheet+'px;--mobile-font:'+Math.min(20,m.font)+'px;--mobile-line:'+m.line+'px;--mobile-safe:'+m.safe+'px;--mobile-vh:'+m.h+'px';
 return '<div class="vn-frame mobile-vn io-vn" data-mode="'+(decision?'decision':'reading')+'" data-current-io="'+esc(io.step)+'" style="'+style+'">'+
 '<section class="vn-stage mobile-stage io-stage" aria-label="第一夜后台">'+art+'<div class="io-corner">第一夜 <span>·</span> 北岸剧场</div>'+
 (io.step==='hunt'?ioChoices(io.step):'')+'</section>'+
 (io.step!=='hunt'&&decision?'<div class="io-options">'+ioChoices(io.step)+'</div>':'')+
 '<section class="vn-sheet mobile-sheet io-sheet"><div class="mobile-speaker">'+esc(speaker)+'</div><div class="vn-scroll mobile-text"><div class="line"><p>'+esc(info.text)+'</p></div></div>'+
 '<div class="io-bottom">'+(io.step==='hunt'?'<span class="io-hint">'+esc(info.hint)+'</span>':!decision?ioChoices(io.step):'<span class="io-hint">'+esc(info.hint)+'</span>')+'</div></section></div>';
}
storyHTML=function(){return ioActive()?ioStoryHTML():ioOldStoryHTML();};
// Capture before the legacy delegated controller. No fake story commands are generated.
document.addEventListener('pointerup',e=>{
 if(ioActive() && e.target instanceof Element && e.target.closest('.io-vn'))e.stopImmediatePropagation();
},true);
document.addEventListener('click',e=>{
 if(!ioActive())return;
 const element=e.target instanceof Element?e.target:null;
 const btn=element?.closest('[data-io]');
 if(!btn && element?.closest('.io-vn')){e.stopImmediatePropagation();return;}
 if(!btn)return;
 e.preventDefault();e.stopImmediatePropagation();
 if(btn.disabled||!btn.isConnected)return;
 try{ioAction(btn.dataset.io);}catch(err){notice='本次互动未完成：'+err.message;showNotice();}
},true);
