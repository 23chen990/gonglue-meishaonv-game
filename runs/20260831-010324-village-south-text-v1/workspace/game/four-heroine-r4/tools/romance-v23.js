/* V23: authored chemistry beats, not arbitrary first/last reply fragments.
 * Every option still uses the existing canonical command and effects.
 * QA profiles retain predecessor renderers; normal/default play uses V23.
 */
const V23_SCENES=ROMANCE_V23.scenes;
const V23_ARCHIVE=new Set(['canonical','legacy-reader','v18','v20','intent','v22']);
function v23Enabled(){return STORY_HASH===ROMANCE_V23.canonHash&&!V23_ARCHIVE.has(new URLSearchParams(location.search).get('qa'));}
function v23Scene(id){return v23Enabled()&&Object.hasOwn(V23_SCENES,id)?V23_SCENES[id]:null;}
function v23Voice(id){return V21_NAMES[id.startsWith('OP_TALK_')?id.at(-1):id[0]];}
function v23Segments(rows,id){
 const shot=V17_SHOTS[id[0]]||V17_SHOTS[id.at(-1)]||'stage';
 return rows.flatMap((r,i)=>mobileSplit({id:'v23.'+id+'.'+i,speaker:r.speaker||id[0].toUpperCase(),text:r.text},mobileMetrics(),i)
  .map((part,j)=>({voice:r.speaker==='B'?V17_VOICES.B:v23Voice(id),text:part.text,shot,stage:j===0?r.stage:''})));
}
function v23Replies(id,choice){
 const authored=v23Scene(id)?.choices[choice],h=state.history.at(-1);
 if(!authored||h?.from!==id||h.id!==choice)return null;
 // A displayed outcome must follow the real committed engine command.
 if(!DATA.scenes[id]?.choices.some(c=>c.id===choice)||!lastReply.length)return null;
 return v23Segments(authored.replies,id);
}
const v23OldIntro=v17Intro,v23OldReaction=v17Reaction,v23OldOptions=v17Options,v23OldFrame=v17Frame;
v17Intro=function(){
 const id=state.current,s=v23Scene(id);
 if(!s||!v17Active())return v23OldIntro();
 const beats=s.intro.map(x=>({...x}));
 if(state.f.knows_foreknowledge_claim_t===true){
  if(id==='t02'){
   beats[0].text='你说故事变了。那今天这段，可得重新听。';
   beats.at(-1).text='等下。那本书里，也有这两个音？';
  }
  if(id==='t06'){
   beats[0].text='这一句我换了。你先别看，猜不到的。';
   beats.at(-1).text='你说的那本书，写到这里是什么样？';
  }
 }
 // Only use actual source-conditioned history; no warning about future risks.
 const past=V19_SCENES[id]&&v19Callback(V19_SCENES[id]);
 if(past&&!(id==='t06'&&state.f.knows_foreknowledge_claim_t===true))beats.splice(beats.length-1,0,{speaker:past.speaker,text:past.text});
 return v23Segments(beats,id);
};
v17Reaction=function(){return v17.after&&v23Replies(v17.after.scene,v17.after.choice)||v23OldReaction();};
v17Options=function(){
 let html=v23OldOptions();const id=state.current,s=v23Scene(id);
 if(!s||!v17Active())return html;
 for(const c of renderScene(state,DATA).choices.filter(x=>x.enabled)){
  const old=V19_SCENES[id]?.labels[c.id]||V17_PERSONAL[id]?.labels[c.id]?.label||c.label;
  let revised=s.choices[c.id]?.label;if(!revised)continue;
  if(id==='t06'&&c.id==='book'&&state.f.knows_foreknowledge_claim_t===true)
   revised='“你今天改的这一句，书里没有。”';
  html=html.replace('<span class="v11-choice-main">'+esc(old)+'</span>','<span class="v11-choice-main">'+esc(revised)+'</span>');
 }
 return html;
};
function v23Decorate(html,info,id,decide,after){
 const s=v23Scene(id);if(!s)return html;
 if(!html.includes('data-v23-scene='))html=html.replace('v11-director ','v11-director v23-directed ')
  .replace('data-v11-scene="','data-v23-scene="'+esc(id)+'" data-v11-scene="');
 if(s.cue&&V19_SCENES[id])html=html.replace(esc(V19_SCENES[id].cue)+'</div>',esc(s.cue)+'</div>');
 if(after&&!decide&&info.stage&&!html.includes('class="v23-physical-beat"'))html=html.replace('</section>','<div class="v23-physical-beat">'+esc(info.stage)+'</div></section>');
 return html;
}
v17Frame=function(info,id,decide=false,after=false){return v23Decorate(v23OldFrame(info,id,decide,after),info,id,decide,after);};
const v23OldProps=v11Props,v23OldAfter=v11AfterLines,v23OldV11Frame=v11Frame;
v11Props=function(){
 const p=v23OldProps(),id=state.current,s=v23Scene(id);
 if(!s||!id.endsWith('03')||state.decisionIntent)return p;
 const choices=Object.fromEntries(Object.entries(p.arc.choices).map(([k,v])=>[k,{...v,label:s.choices[k].label}]));
 return {...p,arc:{...p.arc,choices},intro:v23Segments(s.intro,id)};
};
v11AfterLines=function(){return v11.after&&v23Replies(v11.after.scene,v11.after.choice)||v23OldAfter();};
v11Frame=function(info,opts={}){return v23Decorate(v23OldV11Frame(info,opts),info,opts.scene,opts.decide,opts.after);};
if(v23Enabled()){
 for(const c of 'tslg'){
  const id='OP_TALK_'+c,s=V23_SCENES[id];
  s.intro.forEach((b,i)=>{V10_TALK[id][i].text=b.text;});
  for(const [choice,value] of Object.entries(s.choices)){
   IF_FOLLOW[id].labels[choice]=value.label;
   V10_AFTER[id+'/'+choice].text=value.replies[0].text;
  }
 }
 // Choosing to rescue is not the successful switch yet. Success is committed
 // only after COLD's real performer/crew choice. Preserve the two-beat shot.
 V10_FORK.rescue[0].text='我看见盘了！交给阿衡，等他切歌。';
}
// Reset only obsolete presentation cursors, never player decisions or flags.
const v23Snapshot=snapshot,v23Read=readPayload;
snapshot=function(){const x=v23Snapshot();if(v23Enabled())x.ui.sceneEdition=ROMANCE_V23.contentHash;return x;};
readPayload=function(raw){
 const x=v23Read(raw);
 if(v23Enabled()&&raw?.ui?.sceneEdition!==ROMANCE_V23.contentHash){
  if(x.personalV17){x.personalV17.key='';x.personalV17.cursor=0;x.personalV17.page=0;if(x.personalV17.after)x.personalV17.after.cursor=0;}
  if(x.arcV11){x.arcV11.key='';x.arcV11.step=0;x.arcV11.page=0;if(x.arcV11.after)x.arcV11.after.step=0;}
 }
 return x;
};
// Existing first-night choices show their validated response immediately.
// Keep the full canonical reply in history rather than forcing two repeats.
const v23OldFollow=ioFollowPick;
ioFollowPick=function(id){
 const from=state.current,n=state.history.length;
 v23OldFollow(id);
 const h=state.history.at(-1),bridge=from==='OP_SETTLE'&&h?.from==='OP_FORK';
 if(v23Enabled()&&state.history.length===n+(bridge?2:1)&&
    h?.id===id&&(h.from===from||bridge)&&v10.pending?.key===h.from+'/'+id){
  phase='scene';page=0;choicePage=0;save();render();arm();
 }
};
