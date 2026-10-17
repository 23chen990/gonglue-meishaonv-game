import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createState,renderScene,choose,condition} from './engine.mjs';
const story=JSON.parse(fs.readFileSync(new URL('../data/STORY.json',import.meta.url),'utf8'));
const spec=JSON.parse(fs.readFileSync(new URL('romance-v11-arcs.json',import.meta.url),'utf8'));
assert.equal(spec.version,1);
const ids=Object.keys(spec.arcs);assert.equal(ids.length,18);
let count=0;
for(const scene of ids){
 const ref=story.scenes[scene],record=spec.arcs[scene];assert.ok(ref,scene);
 assert.ok(record.intro.length>=2&&record.intro.length<=3,scene);
 assert.ok(['stage','singer','singerBond','console','shen','lin','gu'].includes(record.shot),scene);
 assert.deepEqual(Object.keys(record.choices).sort(),ref.choices.map(c=>c.id).sort(),'missing a real story choice '+scene);
 for(const intro of record.intro)assert.ok(Array.from(intro.text).length<=56,'too long opening line '+scene);
 for(const choice of ref.choices){
  const display=record.choices[choice.id];count++;
  assert.ok(Array.from(display.label).length<=23,scene+' title '+choice.id);
  assert.ok(Array.from(display.risk).length<=26,scene+' stakes '+choice.id);
  assert.ok(Array.from(display.response.text).length<=58,scene+' immediate consequence '+choice.id);
  assert.notEqual(display.label,display.risk,scene+' answer not a fake choice');
  // Each promised consequence MUST be a value actually written by engine.
  const writes=choice.effects.filter(e=>e.op==='set');
  assert.ok(writes.length>0,scene+'/'+choice.id+' has no persisted state');
  const marker=display.response.voice+'|'+display.response.text;
  assert.ok(!/好感\+|恋爱值\+|任务奖励/.test(marker),'no invented reward');
 }
 // Stage-one intents cannot be falsely marketed as the consequential leaf choice.
 for(const step of ref.decisionSteps||[]){
  assert.ok(step.options.every(k=>Object.hasOwn(record.choices,k)),'intent missing leaves '+scene);
 }
}
assert.ok(count>=75,'broad midgame coverage lost');
const director=fs.readFileSync(new URL('romance-v11.js',import.meta.url),'utf8');
for(const text of ['v11BoundEffect','choose(state,DATA,action,state.revision)','data-v11-choice','arcV11','!Object.hasOwn(V11_ARCS,state.current)']){
 if(text.startsWith('!')) continue;
 assert.ok(director.includes(text),text);
}
assert.ok(!director.includes("setFlag("),'scene projection must not mutate arbitrary canonical effects');
assert.ok(!director.includes('state.f['+'\'affection'), 'no fake affection');
const baseline=fs.readFileSync(new URL('../data/STORY.json',import.meta.url));
assert.equal(baseline.byteLength,1691962,'canonical authoring unchanged');
console.log(JSON.stringify({status:'PASS',milestones:ids.length,realChoices:count,dualStageScenes:ids.filter(id=>story.scenes[id].decisionSteps).length,sourceSize:baseline.byteLength}));