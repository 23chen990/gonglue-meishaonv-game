/* V19 | Cause-before-choice visual novel direction.
 * Visual scene cue = where + observable trigger, never an author's judgment.
 * Character speaks in one short turn per tap. Protagonist speech is ONLY
 * on canonical choice buttons; one necessary internal thought (B) explains
 * the book-song paradox. Save/state/story/replay and all effects are untouched.
 * QA ?qa=v18 runs the previous two-line edition for regression, while
 * ?qa=legacy-reader preserves full source text. Never disguise reused
 * 1024px portraits as unique café, rain or studio event CGs.
 */
const V19_SCENES=ROMANCE_V19_SCENES.scenes;
function v19Legacy(){return new URLSearchParams(location.search).get('qa')==='v18';}
function v19Episode(id){
 if(v19Legacy()||!Object.hasOwn(V19_SCENES,id))return null;
 const episode=V19_SCENES[id],sc=DATA.scenes[id],p=episode.source;
 if(!sc||!p)return null;
 const source=sc.body.find(r=>r.id===p.id);
 if(!source||source.speaker!==p.speaker||source.textHash!==p.hash)return null;
 if(id===state.current&&phase==='scene'&&!renderScene(state,DATA).body.some(r=>
  r.id===p.id&&r.textHash===p.hash&&r.speaker===p.speaker))return null;
 return episode;
}
function v19Callback(entry){
 const rows=renderScene(state,DATA).body;
 for(const c of entry.callbacks||[]){
  if(rows.some(r=>r.id===c.source.id&&r.textHash===c.source.hash&&
    r.speaker===c.source.speaker))return c;
 }
 return null;
}
const v19BeforeIntro=v17Intro;
v17Intro=function(){
 const entry=v19Episode(state.current);
 if(!entry||!v17Active())return v19BeforeIntro();
 const scene=state.current;
 const script=entry.beats.map((b,i)=>({
  id:'v19.'+scene+'.'+i,speaker:b.speaker,text:b.text,
  textHash:'v19-authored:'+scene+':'+i
 }));
 const previous=v19Callback(entry);
 // Only one source-verified callback; the present concern always speaks last.
 if(previous)script.splice(script.length-1,0,{
  id:'v19.callback.'+scene,speaker:previous.speaker,text:previous.text,
  textHash:previous.source.hash
 });
 return v17Segments(script,scene[0]);
};
const v19BeforeFrame=v17Frame;
v17Frame=function(beat,scene,decide=false,after=false){
 const source=v19BeforeFrame(beat,scene,decide,after),entry=v19Episode(scene);
 if(!entry)return source;
 const previous=V18_AUTHORING[scene];
 const oldCue='<div class="v18-scene-cue" aria-label="这一幕的动作">'+
  esc(previous?.cue||'')+'</div>';
 if(!source.includes(oldCue))return source;
 return source.replace(oldCue,'<div class="v18-scene-cue" aria-label="这一幕的动作">'+
  esc(entry.cue)+'</div>')
 .replace('v18-director ','v18-director v19-director ')
 .replace('data-v18-scene="','data-v19-scene="'+esc(scene)+'" data-v18-scene="')
 .replace('data-v18-art="','data-v19-art="existing-character-portrait-needs-specific-location-cg" data-v18-art="');
};
const v19BeforeOptions=v17Options;
v17Options=function(){
 let html=v19BeforeOptions();
 const entry=v19Episode(state.current);
 if(!entry||!v17Active())return html;
 const choices=renderScene(state,DATA).choices.filter(c=>c.enabled);
 for(const c of choices){
  const label=entry.labels?.[c.id];if(!label)continue;
  const old=V17_PERSONAL[state.current].labels[c.id]?.label||c.label;
  const a='<span class="v11-choice-main">'+esc(old)+'</span>';
  if(html.includes(a))html=html.replace(a,
   '<span class="v11-choice-main">'+esc(label)+'</span>');
 }
 return html;
};
