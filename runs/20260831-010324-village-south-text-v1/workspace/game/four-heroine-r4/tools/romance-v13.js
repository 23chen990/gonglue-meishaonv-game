/* V13: manually edited everyday date conversations for the four heroines.
 * A presentation-only overlay. Never edit canonical body/choice/reply objects,
 * state flags, commands, stored choice IDs or the story hash.
 * V11's 18 key scenes keep their own real-consequence director.
 */
const V13_AUTHORING=ROMANCE_V13_SCENES.scenes;
function v13Scene(){
 const id=phase==='reply'?state.history.at(-1)?.from:state.current;
 if(panel!=='story'||!Object.hasOwn(V13_AUTHORING,id))return null;
 return {id,edit:V13_AUTHORING[id]};
}
const v13OriginalPaginate=paginate;
paginate=function(rows){
 const scene=v13Scene();
 if(!scene)return v13OriginalPaginate(rows);
 const editingReply=phase==='reply',edited=editingReply?scene.edit.replies:scene.edit.beats;
 const last=editingReply?state.history.at(-1)?.id:null;
 const projected=rows.map(row=>{
  const change=edited[row.id];
  if(!change||(editingReply&&change.choice!==last))return row;
  // Fail closed when the source story is changed later. A mismatched row should
  // keep the original wording, never recast somebody else's dialogue.
  if(change.hash!==row.textHash||change.speaker!==row.speaker)return row;
  return {...row,text:change.text,_v13Natural:true};
 });
 return v13OriginalPaginate(projected);
};
const v13OriginalControls=adv6Controls;
adv6Controls=function(cp){
 const html=v13OriginalControls(cp),scene=v13Scene();
 if(!scene||phase!=='scene')return html;
 const host=document.createElement('div');host.innerHTML=html;
 host.querySelectorAll('button[data-choice]').forEach(button=>{
  const rule=scene.edit.labels[button.dataset.choice];
  if(!rule)return;
  const canonical=DATA.scenes[scene.id]?.choices?.find(x=>x.id===button.dataset.choice);
  if(!canonical)return;
  // The real action and its revision token remain on the original element.
  button.textContent=rule.label;
  button.setAttribute('aria-label',rule.label);
  button.dataset.v13Choice=scene.id+'/'+canonical.id;
 });
 return host.innerHTML;
};

/* V6's generic decision layout used to drop the FINAL source dialogue row.
 * That was often the line asking what the heroine wanted; choices felt unrelated.
 * Reattach that exact, one-person beat above the actionable buttons AFTER
 * mobileFitOptions has paginated buttons. It adds no extra story action.
 */
const v13OriginalRender=render;
render=function(scrollWindow=true){
 v13OriginalRender(scrollWindow);
 const current=v13Scene();
 if(!current||phase!=='scene')return;
 const frame=document.querySelector('.adv6[data-mode="decision"]');
 const options=frame?.querySelector('.mobile-options');
 if(!options)return;
 const cp=currentPage(),beat=cp.rows?.[0];
 if(!cp.last||!beat?.text)return;
 const prompt=document.createElement('div');
 prompt.className='v13-choice-prompt';prompt.dataset.v13FinalBeat=beat._sourceId;
 const name=adv6Speaker(beat);
 if(name){const speaker=document.createElement('strong');speaker.textContent=name;prompt.append(speaker);}
 const line=document.createElement('p');line.textContent=beat.text;prompt.append(line);
 options.prepend(prompt);
};
