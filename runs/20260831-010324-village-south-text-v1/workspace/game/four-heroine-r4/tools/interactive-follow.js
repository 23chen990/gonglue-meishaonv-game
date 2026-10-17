/* First-night continuity director: after the first fork, keep subsequent early
 * consequential scenes interactive. Choices always call the canonical engine. */
const IF_FOLLOW={
 ENTRY_MEMORY:{voice:'沈清辞',portrait:'s',mood:'stage',text:'原版在手。谁能帮我们留下证据？',labels:{camera:'请林见月拍下切换记录',email:'找顾晚棠核对授权邮件'}},
 ENTRY_CLUES:{voice:'程放',portrait:null,mood:'block',text:'交接单在这儿。来，把字签了。',labels:{obey:'签字，先离开',refuse:'当面拒签',witness:'先留下时间线'}},
 COLD:{voice:'阿衡',portrait:null,mood:'stage',text:'原版别自己插。我试听，你去找人喊切换。',labels:{t:'找唐映雪',s:'找沈清辞',l:'找林见月',g:'找顾晚棠',self:'和阿衡一起处理'}},
 OP_SETTLE:{voice:'阿衡',portrait:null,mood:'block',text:'有人要删错版文件。今晚得留个证据。',labels:{backup:'暗中备份两种版本',confront:'在工作群追问删档令',quiet:'先保留交接记录'}},
 OP_FORK:{voice:'阿衡',portrait:null,mood:'block',text:'录音我留着。你想现在追问，还是先等？',labels:{backup:'暗中备份两种版本',confront:'在工作群追问删档令',quiet:'先保留交接记录'}},
 OP_CANON:{voice:'程放',portrait:null,mood:'block',text:'还不签？难道这场错版跟你没关系？',labels:{backstage:'和阿衡一起核对',question:'当面追问程放',silence:'先记住谁要我签字'}},
 OP_TALK_t:{voice:'唐映雪',portrait:'t',mood:'bond',text:'刚才灯那么亮，我还是认出你了。',labels:{flirt:'“我只是很想再听你唱。”',slow:'“还没缓过来。”',work:'“下场演出，我还能来吗？”'}},
 OP_TALK_s:{voice:'沈清辞',portrait:'s',mood:'bond',text:'喝点水。还有，你能留个号码吗？',labels:{flirt:'“不谈工作，也能找你吗？”',slow:'“我还紧张，先慢一点。”',work:'“先留工作号吧。”'}},
 OP_TALK_l:{voice:'林见月',portrait:'l',mood:'bond',text:'这么多人，只有你一直躲我的镜头。',labels:{flirt:'“下一张，换我拍你？”',slow:'“今天先不拍，好吗？”',work:'“先记下谁救了场。”'}},
 OP_TALK_g:{voice:'顾晚棠',portrait:'g',mood:'bond',text:'那个原版盘，你怎么找到的？',labels:{flirt:'“现在不谈工作，能认识你吗？”',slow:'“先让我把话说顺。”',work:'“我想再争取一次机会。”'}}
};
let ioFollowGroup='';
const ioFPrevSnapshot=snapshot,ioFPrevReadPayload=readPayload,ioFPrevInstall=install,ioFPrevReset=reset,ioFPrevStoryHTML=storyHTML;
snapshot=function(){const x=ioFPrevSnapshot();x.ui.followGroup=ioFollowGroup;return x;};
readPayload=function(raw){const x=ioFPrevReadPayload(raw);x.followGroup=['stage','records'].includes(raw?.ui?.followGroup)?raw.ui.followGroup:'';return x;};
install=function(x){ioFPrevInstall(x);ioFollowGroup=x.followGroup||'';};
reset=function(){const original=state;ioFPrevReset();if(state!==original&&state.history.length===0)ioFollowGroup='';};
function ioFollowActive(){return new URLSearchParams(location.search).get('qa')!=='canonical'&&panel==='story'&&phase==='scene'&&state.history.length>0&&Object.hasOwn(IF_FOLLOW,state.current);}
function ioFollowEnabled(){
 if(state.current==='OP_SETTLE'){
  const bridge=directBridge();
  return bridge?.next?.choices.filter(x=>x.enabled)||[];
 }
 return renderScene(state,DATA).choices.filter(x=>x.enabled);
}
function ioFollowOptions(){
 const scene=IF_FOLLOW[state.current],actions=ioFollowEnabled();
 const button=(c)=>'<button type="button" data-if-pick="'+esc(c.id)+'" class="io-choice">'+esc(scene.labels[c.id]||c.label)+' <span aria-hidden="true">↗</span></button>';
 if(state.current==='COLD'&&actions.length>3){
  if(!ioFollowGroup){
   const self=actions.find(x=>x.id==='self');
   return [['stage','先去找台上的人'],['records','先问能留证的人']].map(([id,label])=>'<button class="io-choice" type="button" data-if-group="'+id+'">'+esc(label)+' <span aria-hidden="true">↗</span></button>').join('')+(self?button(self):'');
  }
  const keys=ioFollowGroup==='stage'?['t','s']:['l','g'];
  return keys.map(id=>actions.find(x=>x.id===id)).filter(Boolean).map(button).join('')+'<button class="io-choice io-back" type="button" data-if-back="1">‹ 换一组</button>';
 }
 return actions.map(button).join('');
}
function ioFollowHTML(){
 const scene=IF_FOLLOW[state.current],m=mobileMetrics(),sheet=Math.floor(Math.min(148,m.h/4));
 const style='--mobile-panel:'+sheet+'px;--mobile-font:'+Math.min(20,m.font)+'px;--mobile-line:'+m.line+'px;--mobile-safe:'+m.safe+'px;--mobile-vh:'+m.h+'px';
 return '<div class="vn-frame mobile-vn io-vn io-follow" data-mode="decision" data-follow-scene="'+esc(state.current)+'" style="'+style+'">'+
 '<section class="vn-stage mobile-stage io-stage">'+ioArt(scene)+'<div class="io-corner">第一夜 <span>·</span> 北岸剧场</div></section>'+
 '<div class="io-options"><div class="io-choice-stack" role="group" aria-label="选择行动">'+ioFollowOptions()+'</div></div>'+
 '<section class="vn-sheet mobile-sheet io-sheet"><div class="mobile-speaker">'+esc(scene.voice)+'</div><div class="vn-scroll mobile-text"><div class="line"><p>'+esc(scene.text)+'</p></div></div><div class="io-bottom"></div></section></div>';
}
storyHTML=function(){return ioFollowActive()?ioFollowHTML():ioFPrevStoryHTML();};
function ioFollowPick(id){
 const valid=ioFollowEnabled();if(!valid.some(x=>x.id===id))return;
 if(state.current==='OP_SETTLE'){
  const first=choose(state,DATA,'continue',state.revision);
  state=first.state;
 }
 const outcome=choose(state,DATA,id,state.revision);
 state=outcome.state;lastReply=outcome.reply;
 phase=lastReply.length?'reply':'scene';page=0;choicePage=0;ioFollowGroup='';
 save();render();arm();
}
document.addEventListener('pointerup',e=>{
 if(ioFollowActive()&&e.target instanceof Element&&e.target.closest('.io-follow'))e.stopImmediatePropagation();
},true);
document.addEventListener('click',e=>{
 if(!ioFollowActive())return;
 const element=e.target instanceof Element?e.target:null;
 const target=element?.closest('[data-if-pick],[data-if-group],[data-if-back]');
 if(!target&&element?.closest('.io-follow')){e.stopImmediatePropagation();return;}
 if(!target||target.disabled||!target.isConnected)return;
 e.preventDefault();e.stopImmediatePropagation();
 try{
  if(target.dataset.ifGroup){ioFollowGroup=target.dataset.ifGroup;save();render();arm();}
  else if(target.dataset.ifBack){ioFollowGroup='';save();render();arm();}
  else ioFollowPick(target.dataset.ifPick);
 }catch(err){notice='剧情选择失败：'+err.message;showNotice();}
},true);
