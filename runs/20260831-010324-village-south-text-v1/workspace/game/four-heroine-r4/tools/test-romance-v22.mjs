/** V22 UX gate: choices are actions, not moral predictions. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {replay,choose} from './engine.mjs';
import {v21FinaleLabel,v21FinaleReply} from './romance-v21-context.mjs';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8');
const raw=read('../data/STORY.json'),data=JSON.parse(raw);
assert.equal(createHash('sha256').update(raw).digest('hex'),
 '84842ca69a861849f16b20d72b4b45421675ea5a934cad51d5f7866e703acf93');
const arcs=JSON.parse(read('romance-v11-arcs.json')).arcs;
const director=read('romance-v11.js'),css=read('romance-v11.css');
assert.equal(Object.keys(arcs).length,18);
const actions=Object.entries(arcs).flatMap(([id,a])=>Object.entries(a.choices).map(([choice,record])=>({id,choice,record})));
assert.equal(actions.length,79);
for(const a of actions){
 assert.ok(a.record.risk&&a.record.label&&a.record.response.text);
 assert.ok(data.scenes[a.id].choices.find(c=>c.id===a.choice).effects.some(e=>e.op==='set'));
}
assert.ok(director.includes('const V11_VERSION=2;'));
assert.ok(director.includes('[1,V11_VERSION].includes(raw.v)'));
assert.ok(director.includes('v11PageSize(metrics)'));
assert.ok(read('romance-v17.js').includes('v11PageSize(mobileMetrics())'));
for(const banned of ['v11ChoiceRisk(', 'v21ChoiceRisk(', 'v11-choice-risk',
 '再许一个同样的承诺，就是骗她们'])assert.ok(!director.includes(banned),banned);
assert.ok(css.includes('.v11-choice-risk{display:none!important}'));
assert.ok(!read('romance-v21-context.mjs').includes('function v21ChoiceRisk('));
const fallback=read('preview-ui.js');
for(const phrase of ['选项会改变后续事件；不替你预先选定恋人。',
 '这是救场方式，不是选定恋人。每条路都有人真正做事。'])
 assert.ok(!fallback.includes(phrase),phrase);
for(const state of [
 {active_t:false,active_s:false,active_l:false,active_g:false},
 {active_t:true,active_s:false,active_l:false,active_g:false},
 {active_t:true,active_s:true,active_l:false,active_g:false}
]){
 for(const id of Object.keys(arcs.A7a.choices)){
  const label=v21FinaleLabel(state,id,arcs.A7a.choices[id].label);
  const reaction=v21FinaleReply(state,id,arcs.A7a.choices[id].response.text);
  assert.ok([...label].length<=23&&[...reaction].length<=58);
  assert.ok(!/接受关系变冷|可能会失去|必须|不准备兑现/.test(label),label);
 }
}
const fixtures=JSON.parse(read('../qa/current/romance-v11-fixtures.json')).fixtures;
for(const [id,action] of [['A6a','accept'],['s03','friend'],['g03','decline']]){
 let state=replay(data,fixtures[id].commands),scene=data.scenes[id];
 if(scene.decisionSteps){
  const group=scene.decisionSteps.find(x=>x.options.includes(action));
  state=choose(state,data,'intent:'+group.id,state.revision).state;
 }
 const next=choose(state,data,action,state.revision).state;
 assert.equal(next.history.at(-1).id,action);
 assert.deepEqual(replay(data,next.history).f,next.f);
}
for(const path of ['../index.html','../play.html','../runtime.mjs']){
 const html=read(path);
 assert.ok(html.includes('const V11_VERSION=2')&&!html.includes('function v21ChoiceRisk('),path);
}
console.log('PASS V22: 18 scenes, 79 real actions, no predicted risks, negative branches preserved');
