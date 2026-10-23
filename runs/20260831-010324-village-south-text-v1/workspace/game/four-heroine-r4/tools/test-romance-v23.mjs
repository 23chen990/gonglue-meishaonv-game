import fs from 'node:fs';import assert from 'node:assert/strict';import {createHash} from 'node:crypto';
import {parseRomance23,V23_CANON} from './romance-v23-parser.mjs';
import {replay,choose,renderScene,condition} from './engine.mjs';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8'),raw=read('../data/STORY.json'),data=JSON.parse(raw);
assert.equal(createHash('sha256').update(raw).digest('hex'),V23_CANON);
const text=read('romance-v23-script.txt'),script=parseRomance23(text),fx=JSON.parse(read('../qa/current/romance-v23-fixtures.json'));
assert.equal(Object.keys(script).length,44);
let actions=0,replies=0,stageCues=0;
for(const [id,s] of Object.entries(script)){
 const sc=data.scenes[id];assert.ok(sc,id);
 assert.deepEqual(Object.keys(s.choices).sort(),sc.choices.map(c=>c.id).sort(),id+' altered actions');
 assert.ok(s.intro.length>=2&&s.intro.length<=3,id);
 for(const b of s.intro)assert.ok([...b.text].length<=44&&b.speaker!=='P'&&b.speaker!=='N',id+' automatic protagonist or exposition');
 for(const [key,c] of Object.entries(s.choices)){
  actions++;replies+=c.replies.length;stageCues+=c.replies.filter(x=>x.stage).length;
  assert.ok([...c.label].length<=32);
  assert.ok(!/\u3010|\uff08|\u53ef\u80fd\u4f1a\u5931\u53bb/.test(c.label),id+'/'+key+' spoiler annotation');
  for(const b of c.replies){assert.ok([...b.text].length<=43);if(b.stage)assert.ok([...b.stage].length<=34);}
  const fixture=fx.cases[id+'/'+key];if(!fixture){assert.equal(id+'/'+key,'t05/ordinary');continue;}let s0=replay(data,fixture.commands);
  assert.equal(s0.current,id);assert.ok(condition(s0,sc.choices.find(x=>x.id===key).when));
  const originalLength=s0.history.length;
  if(sc.decisionSteps){const group=sc.decisionSteps.find(x=>x.options.includes(key));s0=choose(s0,data,'intent:'+group.id,s0.revision).state;}
  assert.ok(renderScene(s0,data).choices.some(c=>c.id===key&&c.enabled));
  const done=choose(s0,data,key,s0.revision).state;
  assert.equal(done.history.length,originalLength+(sc.decisionSteps?2:1));
  assert.deepEqual(replay(data,done.history).f,done.f);
 }
}
assert.equal(Object.keys(fx.cases).length,143);
assert.deepEqual(fx.routes.map(x=>x.ending).sort(),['R_g','R_l','R_s','R_t']);
for(const route of fx.routes){const end=replay(data,route.commands);assert.ok(end.complete);assert.equal(end.ending,route.ending);}
assert.equal(actions,144);assert.equal(replies,276);assert.equal(stageCues,47);
// Exact semantic traps discovered in this audit: a kiss cannot hide behind a
// harmless listening option; a rescue is not successful until the switch.
assert.match(script.t05.choices.closer.label,/\u4eb2/);
assert.ok(data.scenes.t05.choices.find(c=>c.id==='closer').effects.some(e=>e.key==='kissed_t'&&e.value===true));
assert.notEqual(script.t02.choices.fan.replies.at(-1).text,script.t02.choices.honest.replies.at(-1).text);
for(const c of 'tslg'){
 const sc=c+'03';assert.ok(script[sc].choices.open.replies[0].text);
 assert.ok(data.scenes[sc].choices.find(x=>x.id==='open').effects.some(e=>e.key==='active_'+c&&e.value===true));
}
const controller=read('romance-v23.js');assert.ok(!controller.includes('choose('),'presentation must not invent commands');
assert.ok(controller.includes("h?.id===id"));
assert.ok(controller.includes("state.f.knows_foreknowledge_claim_t===true"));
assert.ok(controller.includes("state.history.length===n+(bridge?2:1)"));
assert.ok(controller.includes("v10.pending?.key===h.from+'/'+id"));
assert.ok(!script.t02.choices.honest.label.includes('\u5c0f\u8bf4'),'partial revelation must not disclose a new fact');
assert.ok(data.scenes.g07.choices.find(x=>x.id==='ask').effects.some(e=>e.key==='proof_g_account'&&e.value===true));
assert.ok(script.g07.choices.ask.replies.some(b=>b.stage),'new proof must be visibly acquired');

for(const file of ['../play.html','../index.html','../runtime.mjs']){
 const bundle=read(file);for(const variable of ['ROMANCE_V11_ARCS','ROMANCE_V13_SCENES','ROMANCE_V19_SCENES','ROMANCE_V23'])assert.ok(bundle.includes('const '+variable+'='),file+' missing '+variable);
}
assert.throws(()=>parseRomance23('[t01]\nO|share|hello|yes\nO|share|again|no'));
assert.throws(()=>parseRomance23('[t01]\nK|none|0|missing'));
console.log('PASS V23:',actions,'canonical actions;',replies,'authored reactions;',stageCues,'physical beats; story hash preserved');
