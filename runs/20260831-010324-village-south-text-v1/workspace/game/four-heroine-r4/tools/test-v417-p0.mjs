/** v4.17 17 text-only P0 changes; route and historical integrity guard. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {createState, renderScene, choose} from './engine.mjs';
const R=new URL('../',import.meta.url);
const read=f=>JSON.parse(fs.readFileSync(new URL(f,R),'utf8'));
const raw=fs.readFileSync(new URL('data/STORY.json',R));
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const story=read('data/STORY.json'), plan=read('patch/v417_p0_scene_plan.json');
const audit=read('patch/v417_p0_scene_edits.json');
const prior=read('patch/v416_first_night_edits.json');
assert.equal(hash(raw),audit.newStorySha256);
assert.equal(audit.baseStorySha256,prior.newStorySha256);
assert.equal(plan.baseStorySha256,prior.newStorySha256);
assert.deepEqual(audit.counts,{beats:17,scenes:10,body:2,reply:15});
assert.equal(audit.changes.length,17);
assert.equal(Object.keys(story.scenes).length,228);
assert.equal(Object.values(story.scenes).flatMap(s=>s.choices).length,751);
assert.equal(Object.values(story.scenes).filter(s=>s.kind==='ending').length,24);
assert.equal(story.scenes.ENTRY_WAKE.body.length,28);
assert.equal(Object.values(story.scenes).filter(s=>s.decisionSteps?.length).length,16);
const ids=new Set();
for(const p of plan.changes){
 assert(!ids.has(p.id),'duplicate change '+p.id);ids.add(p.id);
 const a=audit.changes.find(x=>x.id===p.id);
 const sc=story.scenes[p.scene];
 const b=p.location==='body'?sc.body.find(x=>x.id===p.id):
  sc.choices.find(x=>x.id===p.choice).reply.find(x=>x.id===p.id);
 assert(b && b.speaker===p.speaker,p.id);
 assert.equal(b.text,p.text,p.id);
 assert.equal(b.textHash,hash(b.speaker+'\0'+b.text).slice(0,16),p.id);
 assert.equal(a.before,p.before,p.id);
 assert.equal(a.beforeHash,p.beforeHash,p.id);
 assert.equal(a.afterHash,b.textHash,p.id);
}
const run=(state,id)=>{
 const render=renderScene(state,story);
 assert(render.choices.some(o=>o.id===id&&o.enabled),state.current+'/'+id);
 return choose(state,story,id).state;
};
for(const path of [
 ['canon','obey','backstage'],
 ['canon','refuse','question'],
 ['canon','witness','silence'],
 ['investigate','email','g','continue','backup','slow'],
 ['investigate','camera','l','continue','backup','slow'],
 ['rescue','s','continue','backup','slow'],
 ['rescue','t','continue','backup','flirt']
]){
 let state=createState();
 for(const choice of path)state=run(state,choice);
 assert(state.history.length===path.length);
}
console.log(JSON.stringify({status:'PASS',storySha256:audit.newStorySha256,changedBeats:17,changedScenes:10,retainedActions:751,retainedEndings:24,exampleRoutes:7}));
