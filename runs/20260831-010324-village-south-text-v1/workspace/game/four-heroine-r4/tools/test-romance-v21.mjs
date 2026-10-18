/** V21 prevents spoken relationship outcomes from contradicting canonical active
 * flags, while making prior promises visible without fabricating knowledge for
 * heroines. Real date state/effects/replay stay entirely in the engine.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {replay,choose,condition} from './engine.mjs';
import {V21_NAMES,v21PriorRelationship,v21ChoiceRisk,v21FinaleLabel,v21FinaleReply} from './romance-v21-context.mjs';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8');
const data=JSON.parse(read('../data/STORY.json'));
const arcs=JSON.parse(read('romance-v11-arcs.json')).arcs;
const fixtures=JSON.parse(read('../qa/current/romance-v11-fixtures.json')).fixtures;
assert.equal(createHash('sha256').update(read('../data/STORY.json')).digest('hex'),
 '84842ca69a861849f16b20d72b4b45421675ea5a934cad51d5f7866e703acf93');
const scenarios=['t03','s03','l03','g03'];
for(const scene of scenarios){
 const c=scene[0],source=data.scenes[scene].choices.find(x=>x.id==='open');
 assert.ok(source.effects.some(x=>x.op==='set'&&x.key==='active_'+c&&x.value===true));
 assert.ok(source.effects.some(x=>x.op==='set'&&x.key==='scope_'+c&&x.value==='open'));
 const message=arcs[scene].choices.open.response.text;
 assert.match(message,/可以|愿意|先约会|约会试试/,'actress must actually accept an active date '+scene);
 assert.doesNotMatch(message,/我需要想想|还没答应|不会现在|想想自己接不接受/);
 const beat=arcs[scene].choices.open.afterBeat;
 assert.ok(beat&&beat.voice===V21_NAMES[c]);
 assert.ok(Array.from(beat.text).length<=58&&Array.from(message).length<=58);
 const state=replay(data,fixtures[scene].commands);
 assert.equal(state.current,scene);
 assert.equal(condition(state,{canDate:c}),true,scene+' cannot date in fixture');
 const staged=choose(state,data,'intent:date',state.revision).state;
 const next=choose(staged,data,'open',staged.revision).state;
 assert.equal(next.f['active_'+c],true);
 assert.equal(next.f['scope_'+c],'open');
 assert.equal(next.f['commitment_'+c],'dating');
 assert.deepEqual(replay(data,next.history).f,next.f,'replay proof: '+scene);
}
const fresh={};
assert.equal(v21PriorRelationship(fresh,'s03'),null);
assert.equal(v21ChoiceRisk(fresh,'s03','exclusive','original'),'original');
const prior={active_t:true,scope_t:'exclusive',active_s:false,scope_s:'none'};
assert.deepEqual(v21PriorRelationship(prior,'s03'),{code:'t',name:'唐映雪',scope:'exclusive'});
assert.match(v21ChoiceRisk(prior,'s03','exclusive','original'),/唐映雪/);
assert.match(v21ChoiceRisk(prior,'s03','open','original'),/只和唐映雪/);
assert.equal(v21ChoiceRisk(prior,'s03','friend','original'),'original');
const broken={...prior,active_t:false};
assert.equal(v21ChoiceRisk(broken,'s03','exclusive','original'),'original');
const before={active_t:true,scope_t:'open',active_s:false};
assert.match(v21ChoiceRisk(before,'s03','open','original'),/唐映雪.*不能隐瞒/);
assert.match(v21ChoiceRisk(before,'s03','exclusive','original'),/唐映雪.*先讲清楚/);
const multi={active_t:true,scope_t:'open',active_s:true,scope_s:'exclusive',active_l:false,scope_l:'none'};
assert.equal(v21PriorRelationship(multi,'g03').name,'沈清辞','exclusive promise must win');
assert.match(v21ChoiceRisk(multi,'g03','exclusive','original'),/沈清辞/);
for(const ref of ['t03','s03','l03','g03']){
 for(const id of ['open','exclusive']){
  const warning=v21ChoiceRisk(multi,ref,id,'safe');
  assert.ok([...warning].length<=26);
 }
}
const noPartner={active_t:false,active_s:false,active_l:false,active_g:false};
const single={...noPartner,active_t:true};
const plural={...single,active_s:true};
for(const id of data.scenes.A7a.choices.map(x=>x.id)){
 const original=arcs.A7a.choices[id].label,reply=arcs.A7a.choices[id].response.text;
 assert.ok(v21FinaleLabel(noPartner,id,original)!==original,'missing no-romance path '+id);
 assert.ok(v21FinaleLabel(single,id,original)!==original,'missing one-romance path '+id);
 assert.equal(v21FinaleLabel(plural,id,original),original);
 assert.equal(v21FinaleReply(plural,id,reply),reply);
 assert.ok(Array.from(v21FinaleLabel(noPartner,id,original)).length<=23);
 assert.ok(Array.from(v21FinaleLabel(single,id,original)).length<=23);
 assert.ok(Array.from(v21FinaleReply(noPartner,id,reply)).length<=58);
 assert.ok(Array.from(v21FinaleReply(single,id,reply)).length<=58);
}
assert.doesNotMatch(v21FinaleReply(noPartner,'together',''),/她们/);
assert.doesNotMatch(v21FinaleReply(single,'together',''),/她们/);
const v11=read('romance-v11.js'),builder=read('build-preview.mjs');
for(const required of ['v21PriorRelationship(state.f,state.current)',
 'v21ChoiceRisk(state.f,state.current,c.id,info.risk)',
 'v21FinaleLabel(state.f,c.id,label)',
 'v21FinaleReply(state.f,a.choice,response.text)',
 "currentDates.length===0",
 "currentDates.length===1"]){
 assert.ok(v11.includes(required),'V21 runtime unused '+required);
}
assert.ok(builder.includes("read('tools/romance-v21-context.mjs').replace(/^export"));
const html=read('../index.html');
assert.ok(html.includes('function v21ChoiceRisk(')&&html.includes('v21FinaleLabel('));
console.log('PASS V21: truthful open dating for 4 heroines; prior exclusive promises visible, zero/one/multiple finale label consistency; no canonical state changes');
