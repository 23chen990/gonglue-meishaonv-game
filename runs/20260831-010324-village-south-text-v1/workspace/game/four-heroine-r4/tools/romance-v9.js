/* V9 interactive emotion direction. Purely presentational beats; choices and
 * consequences remain exclusively in the canonical STORY/engine. The original
 * reply content remains playable and no affection flag is invented here. */
const V9_FORK=Object.freeze({
 canon:[
  {voice:'陆景行 · 琴台',shot:'stage',text:'先跟我的琴。映雪，看我手势！'},
  {voice:'程放 · 身后',shot:'console',text:'交接单拿过来。许照，你还没签字。'}
 ],
 rescue:[
  {voice:'许照',shot:'usbHeld',text:'蓝标盘找到了！阿衡，先确认原版。'},
  {voice:'唐映雪',shot:'singerBond',text:'我看见你了。等你的信号，我就接上。'}
 ],
 investigate:[
  {voice:'许照',shot:'usbHeld',text:'原版在手。谁换的伴奏，也得查清。'},
  {voice:'沈清辞',shot:'shen',text:'我来留切换记录。交接单先不要签。'}
 ]
});
const V9_TALK=Object.freeze({
 OP_TALK_t:[
  {voice:'唐映雪',shot:'singerBond',text:'灯那么亮，我还是看见你了。'},
  {voice:'唐映雪',shot:'singerBond',text:'差点唱不出来的那一刻……你在想什么？'}
 ],
 OP_TALK_s:[
  {voice:'沈清辞',shot:'shen',text:'今晚本来会很难收场。谢谢你肯帮忙。'},
  {voice:'沈清辞',shot:'shen',text:'等会儿，你能留个联系方式吗？'}
 ],
 OP_TALK_l:[
  {voice:'林见月',shot:'lin',text:'我拍到你冲过去找盘的背影了。'},
  {voice:'林见月',shot:'lin',text:'照片挺好看的。要留给你吗？'}
 ],
 OP_TALK_g:[
  {voice:'顾晚棠',shot:'gu',text:'授权邮件已经核对过了。错不在你。'},
  {voice:'顾晚棠',shot:'gu',text:'先不聊那张表了。重新认识一下？'}
 ]
});
const V9_ROUTE=Object.freeze({canon:'ENTRY_CLUES',rescue:'COLD',investigate:'ENTRY_MEMORY'});
const V9_VERSION=1;
const v9New=()=>({v:V9_VERSION,after:null,talkSeen:{}});
let v9=v9New();
function v9Read(x){
 const out=v9New();
 if(!x||x.v!==V9_VERSION||typeof x!=='object')return out;
 const a=x.after;
 if(a&&Object.hasOwn(V9_FORK,a.fork)&&Number.isInteger(a.index)&&a.index>=0&&a.index<=2)
  out.after={fork:a.fork,index:a.index};
 if(x.talkSeen&&typeof x.talkSeen==='object'&&!Array.isArray(x.talkSeen)){
  for(const [key,val] of Object.entries(x.talkSeen).slice(0,16))
   if(/^OP_TALK_[tslg]:\d{1,3}$/.test(key)&&val===true)out.talkSeen[key]=true;
 }
 return out;
}
const v9SnapshotBefore=snapshot,v9ReadBefore=readPayload,v9InstallBefore=install,v9ResetBefore=reset;
snapshot=function(){const x=v9SnapshotBefore();x.ui.emotionV9={v:V9_VERSION,after:v9.after?{...v9.after}:null,talkSeen:{...v9.talkSeen}};return x;};
readPayload=function(raw){const x=v9ReadBefore(raw);x.emotionV9=v9Read(raw?.ui?.emotionV9);return x;};
install=function(x){v9InstallBefore(x);v9=x.emotionV9||v9New();};
reset=function(){const prior=state;v9ResetBefore();if(prior!==state&&state.history.length===0){v9=v9New();save();render();}};

// Capture only the first real engine choice, never UI-only helper actions.
const v9OriginalOpeningAction=ioAction;
ioAction=function(action){
 const isFirst=ioActive()&&io.step==='final'&&Object.hasOwn(V9_FORK,action);
 v9OriginalOpeningAction(action);
 if(isFirst&&state.history[0]?.from==='ENTRY_WAKE'&&state.history[0]?.id===action){
  v9.after={fork:action,index:0};save();render();arm();
 }
};
function v9AfterActive(){
 return panel==='story'&&phase==='scene'&&!!v9.after&&
  state.history[0]?.from==='ENTRY_WAKE'&&state.history[0]?.id===v9.after.fork&&
  state.current===V9_ROUTE[v9.after.fork]&&v9.after.index<2;
}
function v9TalkKey(){return state.current+':'+state.history.length;}
function v9TalkActive(){return panel==='story'&&phase==='scene'&&state.history.length>0&&Object.hasOwn(V9_TALK,state.current)&&ioFollowActive();}
function v9TalkIntroActive(){return v9TalkActive()&&!v9.talkSeen[v9TalkKey()];}
let v9LastEventPhoto='';
function v9Photo(shot){
 const stable=shot===v9LastEventPhoto;v9LastEventPhoto=shot;
 const ready=ioCGReady();
 const url=ready?(ADV8_MEDIA[shot]||ADV8_MEDIA.stage):(
  shot==='shen'?SCENERY:shot==='lin'?ADV6_MEDIA.lin:shot==='gu'?ADV6_MEDIA.gu:
  shot==='singerBond'?ADV6_MEDIA.singer:shot==='usbHeld'?ADV6_MEDIA.usbHeld:SCENERY);
 return '<div class="io-film'+(stable?' io-stable':'')+'" data-io-shot="'+esc(shot)+'"><img class="io-film-image" src="'+url+'" alt="" draggable="false" loading="eager"></div><div class="io-film-vignette" aria-hidden="true"></div>';
}
function v9Scene(info,opts){
 const m=mobileMetrics(),decision=opts.kind==='talk'&&opts.choices;
 const h=Math.min(168,Math.max(146,Math.floor(m.h*.20)));
 const style='--mobile-panel:'+h+'px;--mobile-font:'+Math.min(20,m.font)+'px;--mobile-line:'+m.line+'px;--mobile-safe:'+m.safe+'px;--mobile-vh:'+m.h+'px';
 const button=opts.kind==='after'?'<button type="button" class="io-single" data-v9-next="after">继续 <span aria-hidden="true">›</span></button>':
  opts.choices?'':'<button type="button" class="io-single" data-v9-next="talk">继续 <span aria-hidden="true">›</span></button>';
 const controls=decision?'<div class="io-options"><div class="io-choice-stack">'+ioFollowOptions()+'</div></div>':'';
 return '<div class="vn-frame mobile-vn io-vn v9-cinema '+(ioCGReady()?'io-cg-ready':'')+(decision?' io-follow':'')+'" data-mode="'+(decision?'decision':'reading')+'" data-v9-kind="'+opts.kind+'" data-v9-shot="'+info.shot+'" style="'+style+'">'+
  '<div class="io-stage">'+v9Photo(info.shot)+'<div class="io-corner">第一夜 · '+(opts.kind==='after'?'选择之后':'余音')+'</div></div>'+controls+
  '<section class="mobile-sheet io-sheet" aria-label="当前角色的对白"><div class="mobile-speaker">'+esc(info.voice)+'</div>'+
  '<div class="mobile-text" aria-live="polite" aria-atomic="true"><div class="line"><p>'+esc(info.text)+'</p></div></div>'+
  '<div class="io-bottom">'+(button?'<div class="io-choice-stack">'+button+'</div>':'')+'</div></section></div>';
}
const v9OriginalStoryHTML=storyHTML;
storyHTML=function(){
 if(v9AfterActive())return v9Scene(V9_FORK[v9.after.fork][v9.after.index],{kind:'after'});
 if(v9TalkActive()){
  const intro=v9TalkIntroActive(),beats=V9_TALK[state.current];
  return v9Scene(beats[intro?0:1],{kind:'talk',choices:!intro});
 }
 return v9OriginalStoryHTML();
};
// Do not use .vn-stage / .vn-scroll in V9 interludes: the legacy reader's
// pointerup delegation would otherwise advance the underlying engine scene.
document.addEventListener('click',e=>{
 if(!v9AfterActive()&&!v9TalkIntroActive())return;
 const el=e.target instanceof Element?e.target:null;
 if(!el?.closest('.v9-cinema'))return;
 if(!el.closest('button,.io-stage,.io-sheet'))return;
 e.preventDefault();e.stopImmediatePropagation();
 if(v9AfterActive()){
  if(v9.after.index<1)v9.after.index++;
  else v9.after=null;
 }else if(v9TalkIntroActive()){
  v9.talkSeen[v9TalkKey()]=true;
 }
 choiceSound();save();render();arm();
},true);
// Never flash/re-fade the same unchanged CG every time a dialogue line turns.
let v9PreviousShot='';
const v9OriginalArt=ioArt;
ioArt=function(info){
 const markup=v9OriginalArt(info),hit=/data-io-shot="([^"]+)"/.exec(markup),key=hit?.[1]||'';
 const stable=key&&key===v9PreviousShot;v9PreviousShot=key;
 return stable?markup.replace('class="io-film"','class="io-film io-stable"'):markup;
};