/* First-night playable director pass. Canonical engine commands remain the source of truth.
 * UI-only microchoices persist in the existing save but never masquerade as story commands.
 * This layer is mounted only at the untouched ENTRY_WAKE scene; all other scenes use the engine.
 */
const IO_VERSION = 1;
const IO_STEPS = new Set(['spotlight','pressure','wake','answer','badge','badge-read','alarm','crisis','ask','ask-answer','hunt','find','confront','confront-answer','bond','final']);
function ioNew(){return {v:IO_VERSION,step:'spotlight',tone:'',ally:'',defiance:'',seen:[],lastFind:'',visits:0,finished:false};}
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
 const find=io.lastFind;
 switch(io.step){
 case 'spotlight': return {voice:'唐映雪',portrait:'t',mood:'stage',text:'等一下。伴奏不是这一版……别关麦，我还能唱。'};
 case 'pressure': return {voice:'程放 · 身后',portrait:null,mood:'block',text:'把交接单签了。错版责任人写你，就能收场。'};
 case 'wake': return {voice:'戴耳机的工作人员',portrait:null,mood:'wake',text:'许照！站得起来吗？她的伴奏出问题了！'};
 case 'answer': return {voice:'戴耳机的工作人员',portrait:null,mood:'wake',text:io.tone==='help'?'小心脚下的线。来，抓住我。':io.tone==='steady'?'没事就快起来，舞台那边等急了。':'许照啊！你的工牌不就挂着吗？'};
 case 'badge': return {voice:'许照 · 心声',portrait:null,mood:'badge',text:io.tone==='confused'?'许照？这是我的工牌？我真的进了那本小说？':io.tone==='help'?'他把工牌塞回我手心。许照……小说里背锅的那个？':'胸口这张工作牌写着许照。我成了那个替人背锅的场务？'};
 case 'badge-read': return {voice:'许照 · 心声',portrait:null,mood:'badge',text:'许照……那个七天后会替人背锅的小说角色？'};
 case 'alarm': return {voice:'唐映雪',portrait:'t',mood:'stage',text:'别关我的麦。伴奏错了，我还能唱。'};
 case 'crisis': return {voice:'沈清辞 · 对讲机',portrait:null,mood:'stage',text:'原版盘应该在后台。找到先别乱插，我来安排切换。'};
 case 'ask': return {voice:'唐映雪',portrait:'t',mood:'stage',text:'侧幕那边的人，是你吗？看着我，给我一个信号。'};
 case 'ask-answer': return {
   voice:io.ally==='tang'?'唐映雪':io.ally==='shen'?'沈清辞 · 对讲机':'许照 · 心声',portrait:io.ally==='tang'?'t':null,mood:'stage',
   text:io.ally==='tang'?'我听你的信号。哪怕只有四小节，我也能接住。':io.ally==='shen'?'我替你拖住现场。原版盘交给音控确认。':'先找到原版，也许还能查清是谁换的。'};
 case 'hunt': return {voice:'许照 · 心声',portrait:null,mood:'search',text:io.seen.includes('usb')?'蓝标盘找到了。该去处理台上的事了。':'控台、交接单、接线板……先查哪儿？'};
 case 'find': return {voice:'许照 · 心声',portrait:null,mood:'search',text:find==='usb'?'接线板下面……蓝胶带！原版盘就在这儿。':find==='sheet'?'交接单上写着我的名字，但我还没签。':'控台文件名和排练单上的，根本不是同一版。'};
 case 'confront': return {voice:'程放 · 身后',portrait:null,mood:'block',text:'许照，别乱碰设备。先把交接单签了。'};
 case 'confront-answer': return {voice:'程放 · 身后',portrait:null,mood:'block',text:io.defiance==='ask'?'问那么多干什么？责任人写你就行。':io.defiance==='hide'?'还不签？出了事你一个人担得起？':'沈清辞？……行，你去找她。'};
 case 'bond': return {voice:'唐映雪',portrait:'t',mood:'bond',text:'我看见你了。你能让我把这首歌唱完吗？'};
 case 'final': return {voice:'许照 · 心声',portrait:null,mood:'decision',text:'帮她把歌唱回来，还是先保住换版证据？'};
 }
 throw Error('Unknown interactive first-night step');
}
const ioActions={
 spotlight:[['next','继续']],
 pressure:[['next','继续']],
 wake:[['help','握住他的手站起来'],['steady','自己撑着设备箱起身'],['confused','“你叫我什么？”']],
 answer:[['next','继续']],
 badge:[['badge','翻开工牌']],
 'badge-read':[['next','继续']],
 alarm:[['next','继续']],crisis:[['next','继续']],
 ask:[['shen','联系沈清辞稳住舞台'],['tang','先答应唐映雪'],['solo','先查清是谁换了音乐']],
 'ask-answer':[['next','去找线索']],
 find:[['back','继续查看']],
 confront:[['ask','“为什么非要我签？”'],['hide','把发现藏好'],['stand','“我要找沈清辞确认。”']],
 'confront-answer':[['next','继续']],
 bond:[['next','面对选择']],
 final:[['rescue','把原版送上台 · 救场'],['investigate','找沈清辞核验 · 留证'],['canon','暂不碰音控 · 拒绝背锅']]
};
const ioNext={spotlight:'wake',pressure:'bond',answer:'badge','badge-read':'alarm',alarm:'crisis',crisis:'hunt','ask-answer':'hunt','confront-answer':'bond',bond:'final'};
function ioAction(action){
 if(!ioActive())return;
 const step=io.step;
 const allowed=step==='hunt'?['usb','sheet','board',...(io.seen.includes('usb')?['move']:[])]:ioActions[step]?.map(x=>x[0])||[];
 if(!allowed.includes(action))return;
 if(step==='wake'){io.tone=action;io.step='badge';}
 else if(step==='badge'){io.step='crisis';}
 else if(step==='ask'){io.ally=action;io.step='ask-answer';}
 else if(step==='hunt'){
  if(action==='move'){io.step='pressure';}
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
 // The only visual layer is one physically coherent event photograph.
 // Older portrait cutouts, CSS ID cards and fake prop drawings are never mounted.
 const key=info.mood==='wake'?'crew':info.mood==='badge'?'badge':
   (info.portrait==='t'&&(info.mood==='stage'||info.mood==='bond'))?'singer':'stage';
 const url=key==='stage'?SCENERY:(ADV6_MEDIA[key]||('assets/v6-preview/'+ADV6_MEDIA_FILES[key]));
 return '<div class="io-film" data-io-shot="'+esc(key)+'"><img class="io-film-image" src="'+url+'" draggable="false" loading="eager" alt="" /></div>'+
 '<div class="io-film-vignette" aria-hidden="true"></div>';
}
function ioChoices(step){
 if(step==='hunt'){
  const items=[['board','控台'],['sheet','交接单'],['usb','接线板']];
  return '<div class="io-hotspots" role="group" aria-label="亲手调查后台">'+items.map(([action,label])=>
   '<button type="button" class="io-hotspot '+(io.seen.includes(action)?'seen':'')+'" data-io="'+action+'"><span aria-hidden="true">'+(io.seen.includes(action)?'✓':'⌕')+'</span>'+esc(label)+'</button>').join('')+'</div>'+
   (io.seen.includes('usb')?'<button type="button" class="io-advance" data-io="move">去处理舞台危机 <span aria-hidden="true">›</span></button>':'');
 }
 const list=ioActions[step]||[];
 return '<div class="io-choice-stack" role="group" aria-label="选择接下来的行动">'+list.map(([id,label])=>
  '<button type="button" data-io="'+esc(id)+'" class="'+(list.length===1?'io-single':'io-choice')+'">'+esc(label)+' <span aria-hidden="true">'+(list.length===1?'›':'↗')+'</span></button>').join('')+'</div>';
}
function ioStoryHTML(){
 const info=ioLine(),m=mobileMetrics(),actionCount=(ioActions[io.step]||[]).length;
 const decision=actionCount>1||io.step==='hunt';
 const panelHeight=Math.min(220,Math.floor(m.h*(m.h<650?.30:.24)));
 const style='--mobile-panel:'+panelHeight+'px;--mobile-font:'+Math.min(20,m.font)+'px;--mobile-line:'+m.line+'px;--mobile-safe:'+m.safe+'px;--mobile-vh:'+m.h+'px';
 return '<div class="vn-frame mobile-vn io-vn" data-mode="'+(decision?'decision':'reading')+'" data-current-io="'+esc(io.step)+'" data-io-art-tier="candidate-not-approved" style="'+style+'">'+
 '<section class="vn-stage mobile-stage io-stage" aria-label="第一夜的舞台后台">'+ioArt(info)+'<div class="io-corner">第一夜 · 侧幕</div>'+
 (io.step==='hunt'?ioChoices('hunt'):'')+'</section>'+
 (io.step!=='hunt'&&decision?'<div class="io-options">'+ioChoices(io.step)+'</div>':'')+
 '<section class="vn-sheet mobile-sheet io-sheet" aria-label="当前角色的一句对白"><div class="mobile-speaker">'+esc(info.voice)+'</div>'+
 '<div class="vn-scroll mobile-text" aria-live="polite" aria-atomic="true"><div class="line"><p>'+esc(info.text)+'</p></div></div>'+
 '<div class="io-bottom">'+(!decision?ioChoices(io.step):'')+'</div></section></div>';
}
storyHTML=function(){return ioActive()?ioStoryHTML():ioOldStoryHTML();};
// The first-night menu/history must describe the actual played sequence,
// never expose the discarded 28-paragraph draft as if the player had read it.
const ioOldMenuHTML=menuHTML,ioOldHistoryHTML=historyHTML,ioOldRowsHTML=rowsHTML;
menuHTML=function(){
 const old=ioOldMenuHTML();
 if(new URLSearchParams(location.search).get('qa')!=='canonical'&&state.current==='ENTRY_WAKE'&&!io.finished)return old.replace(/<details class="panel"><summary>当前场景文字记录<\/summary>[\s\S]*?<\/details>$/,
  '<section class="panel small"><h3>这一夜</h3><p>对话、调查和已作出的行动已经自动保存。</p></section>');
 return old;
};
historyHTML=function(){
 if(new URLSearchParams(location.search).get('qa')!=='canonical'&&state.current==='ENTRY_WAKE'&&!io.finished){
  const detail=io.seen.length?'已查看：'+io.seen.map(k=>({usb:'接线板',sheet:'交接单',board:'控台'}[k])).join('、'):'还没有发现可记录的线索。';
  return '<h2>第一夜 · 我的行动</h2><section class="panel"><p>'+esc(detail)+'</p><p class="small">回到剧情继续调查。</p></section>';
 }
 return ioOldHistoryHTML();
};
rowsHTML=function(rows,id){
 if(new URLSearchParams(location.search).get('qa')!=='canonical'&&panel==='history'&&id==='ENTRY_WAKE'&&io.finished){
  const who=({shen:'沈清辞',tang:'唐映雪',solo:'自己'}[io.ally])||'现场的人';
  return '<div class="line dialogue"><p>我自己确认了工牌，检查过后台，决定先找'+esc(who)+'。之后，才做出了真正改变演出的选择。</p></div>';
 }
 return ioOldRowsHTML(rows,id);
};

// Capture before the legacy delegated controller. No fake story commands are generated.
document.addEventListener('pointerup',e=>{
 if(ioActive() && e.target instanceof Element && e.target.closest('.io-vn'))e.stopImmediatePropagation();
},true);
document.addEventListener('click',e=>{
 if(!ioActive())return;
 const element=e.target instanceof Element?e.target:null;
 const btn=element?.closest('[data-io]');
 if(!btn && element?.closest('.io-vn')){e.preventDefault();e.stopImmediatePropagation();const actions=ioActions[io.step];if(actions?.length===1&&actions[0][0]==='next')ioAction('next');return;}
 if(!btn)return;
 e.preventDefault();e.stopImmediatePropagation();
 if(btn.disabled||!btn.isConnected)return;
 try{ioAction(btn.dataset.io);}catch(err){notice='本次互动未完成：'+err.message;showNotice();}
},true);
