/* V17 scene director. Normal playback uses cinematic panels for 36 personal
 * episodes; ?qa=legacy-reader keeps the full V13 text parity reference.
 * Source turns, choice commands, saves and relation effects stay canonical.
 */
const V17_VERSION=3;
const V17_PERSONAL=ROMANCE_V13_SCENES.scenes;
const V17_SHOTS={t:'singerBond',s:'shen',l:'lin',g:'gu'};
const V17_VOICES={T:'唐映雪',S:'沈清辞',L:'林见月',G:'顾晚棠',P:'许照',B:'我 · 心声',N:'现场',U:'现场'};
let v17={v:V17_VERSION,key:'',cursor:0,page:0,after:null};
const v17New=()=>({v:V17_VERSION,key:'',cursor:0,page:0,after:null});
function v17Read(x){
 const o=v17New();
 if(!x||![1,2,V17_VERSION].includes(x.v))return o;
 // Existing V17 saves counted long narrator pages. Never interpret those
 // positions as V18 spoken turns; replay the two new lines instead.
 // Preserve an already committed canonical choice and its pending reaction.
 if(x.v===V17_VERSION){
  if(typeof x.key==='string'&&x.key.length<120)o.key=x.key;
  if(Number.isInteger(x.cursor)&&x.cursor>=0&&x.cursor<200)o.cursor=x.cursor;
  if(Number.isInteger(x.page)&&x.page>=0&&x.page<20)o.page=x.page;
 }
 const a=x.after;
 if(a&&Object.hasOwn(V17_PERSONAL,a.scene)&&Object.hasOwn(V17_PERSONAL[a.scene].labels,a.choice)&&
  Number.isInteger(a.revision)&&a.revision>0&&a.revision<=600&&
  Number.isInteger(a.cursor)&&a.cursor>=0&&a.cursor<200)
  o.after={scene:a.scene,choice:a.choice,revision:a.revision,cursor:a.cursor};
 return o;
}
const v17OldSnapshot=snapshot,v17OldRead=readPayload,v17OldInstall=install,v17OldReset=reset;
snapshot=function(){const out=v17OldSnapshot();out.ui.personalV17={...v17,after:v17.after?{...v17.after}:null};return out;};
readPayload=function(raw){const result=v17OldRead(raw);result.personalV17=v17Read(raw?.ui?.personalV17);return result;};
install=function(result){v17OldInstall(result);v17=result.personalV17||v17New();};
reset=function(){const old=state;v17OldReset();if(old!==state&&state.history.length===0)v17=v17New();};

function v17Active(){return panel==='story'&&phase==='scene'&&
 !['canonical','legacy-reader'].includes(new URLSearchParams(location.search).get('qa'))&&
 Object.hasOwn(V17_PERSONAL,state.current)&&!DATA.scenes[state.current]?.decisionSteps;}
function v17Ensure(){const k=state.current+':'+state.history.length;if(v17.key!==k){v17.key=k;v17.cursor=0;v17.page=0;}}
function v17Match(row,rule){return !!rule&&row.textHash===rule.hash&&row.speaker===rule.speaker;}
function v17Segments(rows,character){
 const m=mobileMetrics(),shot=V17_SHOTS[character]||'stage';
 return rows.flatMap((row,i)=>mobileSplit(row,m,i).map(part=>({
  voice:V17_VOICES[row.speaker]||'现场',text:part.text,shot
 })));
}
function v17Intro(){
 const id=state.current,edit=V17_PERSONAL[id],view=renderScene(state,DATA);
 const hits=view.body.filter(row=>v17Match(row,edit.beats[row.id]));
 if(hits.length<2)return null; // Fail closed to the full native reading path.
 const character=id[0].toUpperCase();
 const lastQuestion=view.body.findLastIndex(row=>row.speaker===character&&
  /[？?]/u.test(row.text)&&row.text.length<=75);
 let rows=[];
 view.body.forEach((row,i)=>{
  const rule=edit.beats[row.id];
  if(v17Match(row,rule))rows.push({...row,text:rule.text});
  else if(i===lastQuestion)rows.push(row);
 });
 if(rows.length>6)rows=rows.slice(0,5).concat(rows.at(-1));
 return v17Segments(rows,id[0]);
}
function v17Reaction(){
 const a=v17.after;if(!a)return [];
 const all=lastReply||[],edits=V17_PERSONAL[a.scene].replies||{};
 if(!all.length)return [];
 const selected=new Set(),character=a.scene[0].toUpperCase();
 all.forEach((row,i)=>{
  const rule=edits[row.id];
  if(rule&&rule.choice===a.choice&&v17Match(row,rule))selected.add(i);
 });
 const heroine=all.findIndex(row=>row.speaker===character);
 const other=all.findIndex(row=>['T','S','L','G','P'].includes(row.speaker));
 if(heroine>=0)selected.add(heroine);
 else if(other>=0)selected.add(other);
 if(!selected.size)selected.add(0);
 if(selected.size<2&&all.length>1)selected.add(all.length-1);
 const rows=[...selected].sort((x,y)=>x-y).slice(0,3).map(i=>{
  const row=all[i],rule=edits[row.id];
  return {...row,text:rule?.choice===a.choice&&v17Match(row,rule)?rule.text:row.text};
 });
 return v17Segments(rows,a.scene[0]);
}
function v17AfterActive(){
 const a=v17.after,h=state.history.at(-1);
 return !!a&&panel==='story'&&phase==='reply'&&!!h&&h.from===a.scene&&
  h.id===a.choice&&state.history.length===a.revision;
}
function v17Options(){
 const candidates=renderScene(state,DATA).choices.filter(c=>c.enabled),id=state.current;
 const size=v11PageSize(mobileMetrics()),total=Math.max(1,Math.ceil(candidates.length/size));
 v17.page=Math.max(0,Math.min(total-1,v17.page));
 const part=candidates.slice(v17.page*size,(v17.page+1)*size);
 const buttons=part.map(c=>{
  const label=V17_PERSONAL[id].labels[c.id]?.label||c.label;
  return '<button type="button" class="v11-choice v17-choice" data-v17-choice="'+esc(c.id)+'">'+
   '<span class="v11-choice-main">'+esc(label)+'</span></button>';
 }).join('');
 const pages=total>1?'<div class="v11-pages">'+
  '<button type="button" data-v17-page="-1"'+(v17.page===0?' disabled':'')+'>上一组</button>'+
  '<span>'+ (v17.page+1)+' / '+total+'</span>'+
  '<button type="button" data-v17-page="1"'+(v17.page===total-1?' disabled':'')+'>下一组</button></div>':'';
 return '<div class="v11-choices v17-choices" role="group" aria-label="现在怎么回应">'+buttons+pages+'</div>';
}
function v17Frame(beat,scene,decide=false,after=false){
 return v11Frame(beat,{scene,decide,after,options:decide?v17Options():''})
  .replace('v11-director ','v11-director v17-director ')
  .replace('data-v11-scene="','data-v17-scene="'+esc(scene)+'" data-v17-after="'+(after?'1':'0')+
   '" data-v17-art="character-portrait-not-location-cg" data-v11-scene="');
}
const v17BeforeStory=storyHTML;
storyHTML=function(){
 if(v17AfterActive()){
  const scenes=v17Reaction();
  if(scenes.length)return v17Frame(scenes[Math.min(v17.after.cursor,scenes.length-1)],v17.after.scene,false,true);
 }
 if(v17Active()){
  v17Ensure();const intro=v17Intro();
  if(intro?.length){
   if(v17.cursor<intro.length)return v17Frame(intro[v17.cursor],state.current);
   return v17Frame(intro.at(-1),state.current,true);
  }
 }
 return v17BeforeStory();
};
function v17Advance(){
 if(v17AfterActive()){
  const scenes=v17Reaction();
  if(v17.after.cursor+1<scenes.length)v17.after.cursor++;
  else{v17.after=null;phase='scene';page=0;choicePage=0;}
 }else if(v17Active()){
  const intro=v17Intro();
  if(intro)v17.cursor=Math.min(v17.cursor+1,intro.length);
 }
}
document.addEventListener('pointerup',e=>{
 if(e.target instanceof Element&&e.target.closest('.v17-director'))e.stopImmediatePropagation();
},true);
document.addEventListener('click',e=>{
 if(!v17AfterActive()&&!v17Active())return;
 const el=e.target instanceof Element?e.target:null;
 if(!el?.closest('.v17-director'))return;
 const btn=el.closest('[data-v17-choice],[data-v17-page],[data-v11-next]');
 if(!btn&&!el.closest('.io-stage,.io-sheet'))return;
 e.preventDefault();e.stopImmediatePropagation();
 if(btn?.disabled||(btn&&!btn.isConnected))return;
 try{
  if(v17AfterActive())v17Advance();
  else if(btn?.dataset.v17Page){
   const count=renderScene(state,DATA).choices.filter(c=>c.enabled).length;
   const limit=Math.max(1,Math.ceil(count/v11PageSize(mobileMetrics())));
   v17.page=Math.max(0,Math.min(limit-1,v17.page+Number(btn.dataset.v17Page)));
  }else if(btn?.dataset.v17Choice){
   const choice=btn.dataset.v17Choice,valid=renderScene(state,DATA).choices.filter(c=>c.enabled);
   if(!valid.some(c=>c.id===choice))throw Error('Unavailable canonical choice '+choice);
   const scene=state.current,result=choose(state,DATA,choice,state.revision);
   state=result.state;lastReply=result.reply;phase=lastReply.length?'reply':'scene';
   page=0;choicePage=0;
   v17.after=lastReply.length?{scene,choice,revision:state.history.length,cursor:0}:null;
  }else if(btn||!el.closest('.v17-choices'))v17Advance();
  choiceSound();save();render();arm();
 }catch(err){notice='剧情选择未生效：'+err.message;showNotice();}
},true);
