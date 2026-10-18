/* V11: the story already has real costs. Show them while people are choosing.
 * This is a projection of 18 authored canonical scenes, NOT a second story engine.
 * Consent, routing, endings and saved effects come only from engine.choose().
 * Original rows and full replies remain in the scene source and read-only history.
 */
const V11_VERSION=1;
const V11_ARCS=ROMANCE_V11_ARCS.arcs;
let v11={v:V11_VERSION,key:'',step:0,page:0,after:null};
function v11Safe(raw){
 const blank={v:V11_VERSION,key:'',step:0,page:0,after:null};
 if(!raw||raw.v!==V11_VERSION)return blank;
 if(typeof raw.key==='string'&&raw.key.length<120)blank.key=raw.key;
 if(Number.isInteger(raw.step)&&raw.step>=0&&raw.step<=5)blank.step=raw.step;
 if(Number.isInteger(raw.page)&&raw.page>=0&&raw.page<=12)blank.page=raw.page;
 const a=raw.after;
 if(a&&typeof a.scene==='string'&&Object.hasOwn(V11_ARCS,a.scene)&&
    Object.hasOwn(V11_ARCS[a.scene].choices,a.choice)&&
    Number.isInteger(a.revision)&&a.revision>0&&a.revision<=600&&
    Number.isInteger(a.step)&&a.step>=0&&a.step<=3)
   blank.after={scene:a.scene,choice:a.choice,revision:a.revision,step:a.step};
 return blank;
}
const v11OriginalSnapshot=snapshot,v11OriginalRead=readPayload,v11OriginalInstall=install,v11OriginalReset=reset;
snapshot=function(){const x=v11OriginalSnapshot();x.ui.arcV11={v:V11_VERSION,key:v11.key,step:v11.step,page:v11.page,after:v11.after?{...v11.after}:null};return x;};
readPayload=function(raw){const x=v11OriginalRead(raw);x.arcV11=v11Safe(raw?.ui?.arcV11);return x;};
install=function(x){v11OriginalInstall(x);v11=x.arcV11||v11Safe(null);};
reset=function(){const original=state;v11OriginalReset();if(state!==original&&state.history.length===0)v11=v11Safe(null);};
let v11PreviousPhoto='';
function v11Photo(kind){
 const stable=kind===v11PreviousPhoto;v11PreviousPhoto=kind;
 const photo=ioCGReady()?(ADV8_MEDIA[kind]||ADV8_MEDIA.stage):SCENERY;
 return '<div class="io-film'+(stable?' io-stable':'')+'" data-io-shot="'+esc(kind)+'"><img class="io-film-image" alt="" draggable="false" loading="eager" src="'+photo+'"></div><div class="io-film-vignette" aria-hidden="true"></div>';
}
function v11SceneEnabled(){
 return new URLSearchParams(location.search).get('qa')!=='canonical'&&
   panel==='story'&&phase==='scene'&&Object.hasOwn(V11_ARCS,state.current);
}
function v11SceneKey(){return state.current+':'+state.history.length+':'+(state.decisionIntent?.id||'first');}
function v11Ensure(){
 const key=v11SceneKey();if(v11.key!==key){v11.key=key;v11.step=0;v11.page=0;}
}
function v11BoundEffect(scene,choice){
 const src=DATA.scenes[scene]?.choices?.find(x=>x.id===choice);
 if(!src)throw Error('Not a canonical leaf: '+scene+'/'+choice);
 const effects=src.effects.filter(x=>x.op==='set');
 const important=['cold_style','plan_t','visibility_xu','plan_s','promise_target','plan_l','raw_record','plan_g','plan_lu','final_xu','unwritten_future','post_intent','closing_mode','closing_answer',
  'scope_t','scope_s','scope_l','scope_g'];
 const e=effects.find(x=>important.includes(x.key))||effects[0];
 if(!e||state.f[e.key]!==e.value)throw Error('Missing canonical consequence: '+scene+'/'+choice);
 return e;
}
function v11AfterActive(){
 const a=v11.after,h=state.history.at(-1);
 if(!a||panel!=='story'||!h||h.from!==a.scene||h.id!==a.choice||state.history.length!==a.revision)return false;
 try{v11BoundEffect(a.scene,a.choice);}catch{return false;}
 return true;
}
// qa=intent keeps the original two-step interaction; qa=v20 keeps last
// release's date/finale phrasing while verifying direct concrete actions.
function v11V21Presentation(){
 return !['intent','v20','canonical'].includes(new URLSearchParams(location.search).get('qa'));
}
const V11_VOICES=Object.freeze({P:'许照',T:'唐映雪',S:'沈清辞',L:'林见月',G:'顾晚棠',C:'程放',A:'阿衡',LU:'陆景行',N:'许照 · 心声'});
function v11AfterLines(){
 const a=v11.after,arc=V11_ARCS[a.scene],rule=arc.choices[a.choice];
 v11BoundEffect(a.scene,a.choice);
 // The old director cut an arbitrary canonical reply to 38 glyphs, then
 // concatenated another response. It produced mid-sentence dialogue and
 // people apparently answering different questions. The fully authored
 // consequences below are guarded by real engine effects; complete source
 // replies remain available from history and are never mutated.
 const response=rule.response;
 const displayText=a.scene==='A7a'&&v11V21Presentation()?v21FinaleReply(state.f,a.choice,response.text):response.text;
 const lines=[{voice:response.voice,shot:response.shot,text:displayText}];
 if(rule.afterBeat)lines.push({
  voice:rule.afterBeat.voice,shot:rule.afterBeat.shot||response.shot,
  text:rule.afterBeat.text
 });
 return lines;
}
function v11DirectLeafMode(){
 // No fake two-step question in the player experience. ?qa=intent preserves
 // the exact original staging for existing replay/story QA and older saves.
 return new URLSearchParams(location.search).get('qa')!=='intent';
}
function v11Props(){
 const arc=V11_ARCS[state.current],view=renderScene(state,DATA),canonical=DATA.scenes[state.current];
 const all=canonical.decisionSteps&&!state.decisionIntent&&v11DirectLeafMode()
  ?canonical.choices.map(c=>({...c,enabled:condition(state,c.when)}))
  :view.choices;
 const choices=all.filter(x=>x.enabled);
 const ids=choices.map(x=>x.id);
 for(const id of ids){
  if(!id.startsWith('intent:')&&!Object.hasOwn(arc.choices,id))throw Error('V11 unmapped canonical choice '+state.current+'/'+id);
 }
 const second=!!state.decisionIntent&&state.decisionIntent.scene===state.current;
 const intro=second?[{voice:arc.intro[1].voice,text:arc.secondStage||'那咱们把话说具体点。',shot:arc.shot}]:arc.intro.map(x=>({...x,shot:arc.shot}));
 if(state.current==='A1b'&&state.f.canon_signed_blame)
  intro[0]={voice:'许照 · 心声',text:'第一晚我已经签错过一次了。这次别想再让我糊里糊涂签。',shot:'console'};
 if(state.current==='A2a'&&state.f.first_win===false)
  intro[1]={voice:'唐映雪',text:'那晚是钢琴家陆景行替我弹的。现在连歌都算他的？',shot:'singer'};
 if(state.current==='A2a'&&state.f.first_win===true)
  intro[1]={voice:'唐映雪',text:'那晚多亏你给的信号。现在这首歌，你还愿意帮我吗？',shot:'singer'};
 if(state.current==='A2b'&&state.f.canon_signed_blame)
  intro[0]={voice:'程放',text:'你自己签的字还在呢。现在跟我说不算？',shot:'console'};
 if(state.current==='A4a'&&state.f.private_photo==='not_taken')
  intro[0]={voice:'林见月',text:'上回你说不拍，我就没拍。今天独立拍摄报名截止，片子还能补交。',shot:'lin'};
 if(state.current==='A4a'&&state.f.private_photo==='two_people_only')
  intro[0]={voice:'林见月',text:'上回那张照片只发给你了。今天独立拍摄报名截止，片子还能补交。',shot:'lin'};
 if(state.current==='A4b'&&state.f.canon_signed_blame)intro[0]={voice:'林见月',text:'你第一晚确实签过字。但程放也承认了，错版不是你导出的。我录到了。',shot:'console'};
 if(state.current==='A5a'&&state.f.contact_g==='private')
  intro[0]={voice:'顾晚棠',text:'你有我私人号，也看到了合同。他们要我背全责，却不给我修改条款。',shot:'gu'};
 if(state.current==='A5b'&&['ally','partner'].includes(state.f.lu_relation))
  intro[0]={voice:'陆景行',text:'咱俩上次配合得不错。这回要不要各自拿点真本事出来？',shot:'stage'};
 if(state.current==='A6a'&&state.f.proof_audio&&!state.f.canon_signed_blame)
  intro[1]={voice:'许照 · 心声',text:'视频只截了我碰设备箱的画面，见月录音却证明不是我换的伴奏。',shot:'console'};
 if(state.current==='A7a'&&active(state).length>1)
  intro[1]={voice:'许照 · 心声',text:'我还答应过别人。再拖下去，她们只会更受伤。',shot:'stage'};
 if(state.current==='A6a'&&state.f.canon_signed_blame)intro[1]={voice:'许照 · 心声',text:'我第一晚签过责任单，可视频剪掉了真正换伴奏的人。我得说清楚。',shot:'console'};
 if(state.current==='A6a'&&!choices.some(c=>c.id==='intent:prove'||['public','partner','backstage'].includes(c.id))&&!second)
  intro[1]={voice:'许照 · 心声',text:'视频只截了我靠近设备箱的画面。我手里还没有能公开核验的证据。',shot:arc.shot};
 // We know our own prior commitments even if the new heroine does not.
 // Place this thought immediately before her final question, not after it.
 if(v11V21Presentation()&&!second&&/^[tslg]03$/.test(state.current)){
  const other=v21PriorRelationship(state.f,state.current);
  if(other)intro.splice(intro.length-1,0,{
   voice:'许照 · 心声',shot:arc.shot,
   text:other.scope==='exclusive'
    ?'我已经答应只和'+other.name+'交往。再许一个同样的承诺，就是骗她们。'
    :'我还在和'+other.name+'约会。要开始新的关系，必须把已有的约定讲清楚。'
  });
 }
 // Do not fabricate multiple girlfriends when the player chose none or one.
 if(v11V21Presentation()&&state.current==='A7a'){
  const currentDates=active(state);
  if(currentDates.length===0)intro[1]={voice:'许照 · 心声',shot:arc.shot,
   text:'我现在没有确定的恋人。之前的邀约与误会，还是得由我自己说清楚。'};
  else if(currentDates.length===1)intro[1]={voice:'许照 · 心声',shot:arc.shot,
   text:'现在我只和'+V21_NAMES[currentDates[0]]+'约会。要继续，还是认真结束，别让她猜。'};
 }
 return {arc,intro,choices};
}
function v11ChoicesHtml(choices,arc,metrics){
 const pageSize=metrics.h<650?2:3;
 const total=Math.max(1,Math.ceil(choices.length/pageSize));v11.page=Math.max(0,Math.min(v11.page,total-1));
 const part=choices.slice(v11.page*pageSize,(v11.page+1)*pageSize);
 return '<div class="v11-choices" role="group" aria-label="选一个真正影响剧情的行动">'+
  part.map(c=>{
   const intent=c.id.startsWith('intent:');
   const info=intent?null:arc.choices[c.id];
   let label=intent?(arc.intentLabels?.[c.id.slice('intent:'.length)]||c.label):info.label;
   // Public work invitations may include complete strangers.
   if(!intent&&state.current==='A3b'&&c.id==='l'&&
      !state.f.source_pre_switch_timestamp&&!state.f.opening_switch_video)
    label='去剪辑室看摄影师的新片';
   if(!intent&&state.current==='A3b'&&c.id==='g'&&
      !state.f.source_programme_approval_note&&!state.f.opening_authorization_checked)
    label='去后街面馆吃饭';
   if(!intent&&state.current==='A7a'&&v11V21Presentation())
    label=v21FinaleLabel(state.f,c.id,label);
   const cost=intent?'':v11V21Presentation()?v21ChoiceRisk(state.f,state.current,c.id,info.risk):info.risk;
   return '<button type="button" class="v11-choice" data-v11-choice="'+esc(c.id)+'"><span class="v11-choice-main">'+esc(label)+'</span>'+
    (cost?'<span class="v11-choice-risk">'+esc(cost)+'</span>':'')+'</button>';
  }).join('')+
  (total>1?'<div class="v11-pages"><button type="button" data-v11-page="-1"'+(v11.page===0?' disabled':'')+'>上一组</button><span>'+ (v11.page+1)+' / '+total+'</span><button type="button" data-v11-page="1"'+(v11.page===total-1?' disabled':'')+'>下一组</button></div>':'')+'</div>';
}
// Human-readable event labels for the SHOT, never replacements for canon data.
// Avoid source titles like "你先答应谁" that imply four strangers love the player.
const V11_VISIBLE_HEADINGS={
 A1b:'第一夜 · 责任单',A2a:'歌曲署名被抢',A2b:'第二天 · 后台责任核查',
 A3a:'第三天 · 赞助与旁厅',A3b:'第四晚 · 项目群的四条邀请',
 A4a:'第五天 · 独立拍摄报名',A4b:'第五夜 · 能作证的录音',
 A5a:'第六天 · 合同责任归属',A5b:'第六天 · 和陆景行争名额',
 A6a:'第七天 · 被剪过的宣传视频',UNWRITTEN:'第八天 · 新项目邀约',
 A6b:'第八天 · 工作和约会',A7a:'第二十一天 · 讲清承诺',
 A7b:'故事的下一步',t03:'唐映雪 · 约会邀请',s03:'沈清辞 · 约会邀请',
 l03:'林见月 · 约会邀请',g03:'顾晚棠 · 约会邀请'
};
function v11Frame(info,{scene,decide=false,options='',after=false}={}){
 const m=mobileMetrics(),h=Math.min(184,Math.max(144,Math.floor(m.h*.235)));
 const style='--mobile-panel:'+h+'px;--mobile-font:'+Math.min(20,m.font)+'px;--mobile-line:'+m.line+'px;--mobile-safe:'+m.safe+'px;--mobile-vh:'+m.h+'px';
 const button=decide?'':'<button type="button" class="io-single" data-v11-next="1">继续 <span aria-hidden="true">›</span></button>';
 const heading=scene?(V11_VISIBLE_HEADINGS[scene]||DATA.scenes[scene]?.title||''):'你的选择之后';
 return '<div class="vn-frame mobile-vn io-vn v9-cinema v11-director '+(ioCGReady()?'io-cg-ready':'')+'" data-mode="'+(decide?'decision':'reading')+'" data-v11-scene="'+esc(scene)+'" data-v11-after="'+(after?'1':'0')+'" data-v11-camera="'+esc(info.shot)+'" style="'+style+'">'+
  '<section class="io-stage" aria-label="视觉小说事件镜头">'+v11Photo(info.shot)+'<div class="v11-scene-id">'+esc(heading)+'</div></section>'+
  (decide?'<div class="io-options">'+options+'</div>':'')+
  '<section class="mobile-sheet io-sheet" aria-label="当前角色的一句对白"><div class="mobile-speaker">'+esc(info.voice)+'</div><div class="mobile-text" aria-live="polite" aria-atomic="true"><div class="line"><p>'+esc(info.text)+'</p></div></div><div class="io-bottom">'+(button?'<div class="io-choice-stack">'+button+'</div>':'')+'</div></section></div>';
}
const v11BeforeStory=storyHTML;
storyHTML=function(){
 if(v11AfterActive()){
  const arr=v11AfterLines(),index=Math.min(v11.after.step,arr.length-1);
  return v11Frame(arr[index],{scene:v11.after.scene,after:true});
 }
 if(v11SceneEnabled()){
  v11Ensure();const p=v11Props();
  if(v11.step<p.intro.length)return v11Frame(p.intro[v11.step],{scene:state.current});
  if(!p.choices.length)return v11BeforeStory();
  const answer=p.intro.at(-1);
  return v11Frame(answer,{scene:state.current,decide:true,options:v11ChoicesHtml(p.choices,p.arc,mobileMetrics())});
 }
 return v11BeforeStory();
};
/* The native reader is deliberately not given vn-stage/vn-scroll: it may not
 * steal a touch and silently skip a conversation or a canonical choice. */
document.addEventListener('click',e=>{
 if(!v11AfterActive()&&!v11SceneEnabled())return;
 const el=e.target instanceof Element?e.target:null;
 if(!el?.closest('.v11-director'))return;
 const btn=el.closest('[data-v11-choice],[data-v11-next],[data-v11-page]');
 if(!btn && !el.closest('.io-stage,.io-sheet'))return;
 e.preventDefault();e.stopImmediatePropagation();
 if(btn?.disabled|| (btn&&!btn.isConnected))return;
 try{
  if(v11AfterActive()){
   const arr=v11AfterLines();
   if(v11.after.step+1<arr.length)v11.after.step++;
   else{v11.after=null;phase='scene';page=0;choicePage=0;}
  }else{
   v11Ensure();const p=v11Props();
   if(btn?.dataset.v11Page){
    if(v11.step<p.intro.length)return;
    const n=Math.max(1,Math.ceil(p.choices.length/(mobileMetrics().h<650?2:3)));
    v11.page=Math.max(0,Math.min(n-1,v11.page+Number(btn.dataset.v11Page)));
   }else if(btn?.dataset.v11Choice){
    if(v11.step<p.intro.length)return;
    const action=btn.dataset.v11Choice;
    if(!p.choices.some(x=>x.id===action))throw Error('Unavailable canonical decision');
    const scene=state.current;
    // Selecting a concrete outcome in V20 also records its required genuine
    // canonical intent command. Both commands are atomic from the UI's point
    // of view: no state is installed until the actual leaf succeeds.
    let intermediary=state;
    const sc=DATA.scenes[scene],auto=!!(sc.decisionSteps&&!state.decisionIntent&&
      v11DirectLeafMode()&&!action.startsWith('intent:'));
    if(auto){
     const group=sc.decisionSteps.find(g=>g.options.includes(action));
     if(!group)throw Error('No canonical intent for '+scene+'/'+action);
     intermediary=choose(state,DATA,'intent:'+group.id,state.revision).state;
     if(!renderScene(intermediary,DATA).choices.some(c=>c.id===action&&c.enabled))
      throw Error('Unavailable concrete choice after intent');
    }
    const result=auto?choose(intermediary,DATA,action,intermediary.revision):
      choose(state,DATA,action,state.revision);
    state=result.state;lastReply=result.reply;page=0;choicePage=0;
    if(action.startsWith('intent:')){
     phase=lastReply.length?'reply':'scene';v11.key='';v11.step=0;v11.page=0;
    }else{
     phase='reply';
     v11.after={scene,choice:action,revision:state.history.length,step:0};
     v11BoundEffect(scene,action);
    }
   }else if(v11.step<p.intro.length){v11.step++;}
  }
  choiceSound();save();render();arm();
 }catch(err){notice='这个选择未能生效：'+err.message;showNotice();}
},true);
