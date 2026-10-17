/* V18: edited, source-anchored human dialogue for each of 36 personal scenes.
 * No new story effects, no fake romance points and no invented access to
 * knowledge the heroine has not acquired. UI-only lines are deliberately
 * separate from the canonical story, which still powers every real action.
 * If a source scene or anchor changes, fall back to the full V17 direction.
 */
const V18_AUTHORING=ROMANCE_V18_MOMENTS.moments;
function v18Moment(id){
 const scene=DATA.scenes[id],moment=V18_AUTHORING[id];
 if(!scene||!moment)return null;
 const rows=[...scene.body,...scene.blocks.flatMap(block=>block.lines)];
 const match=rows.find(x=>x.id===moment.anchor.id);
 if(!match||match.textHash!==moment.anchor.hash||match.speaker!==moment.anchor.speaker)return null;
 if(id===state.current&&phase==='scene'){
  const rendered=renderScene(state,DATA).body;
  if(!rendered.some(row=>row.id===match.id&&row.textHash===match.textHash))return null;
 }
 return moment;
}
const v18BeforeIntro=v17Intro;
v17Intro=function(){
 const id=state.current,moment=v18Moment(id);
 if(!moment)return v18BeforeIntro();
 const actor=id[0].toUpperCase(),raw=moment.lines.map((text,index)=>({
  id:'v18.'+id+'.'+index,speaker:actor,text,
  textHash:'v18-edited:'+id+':'+index
 }));
 // mobileSplit preserves whole graphemes and produces "continue" segments
 // rather than shrinking text or putting multiple people in one reading panel.
 return v17Segments(raw,id[0]);
};
const v18BeforeFrame=v17Frame;
v17Frame=function(beat,scene,decide=false,after=false){
 const frame=v18BeforeFrame(beat,scene,decide,after),moment=v18Moment(scene);
 if(!moment)return frame;
 let html=frame.replace('v17-director ','v17-director v18-director ')
  .replace('data-v17-scene="','data-v18-scene="'+esc(scene)+
   '" data-v18-tone="'+esc(moment.tone)+
   '" data-v18-camera="'+esc(moment.camera)+
   '" data-v18-art="portrait-reused-not-location-cg" data-v17-scene="');
 const anchor='<div class="v11-scene-id">';
 if(html.includes(anchor))
  html=html.replace(anchor,'<div class="v18-scene-cue" aria-label="这一幕的动作">'+
   esc(moment.cue)+'</div>'+anchor);
 return html;
};
