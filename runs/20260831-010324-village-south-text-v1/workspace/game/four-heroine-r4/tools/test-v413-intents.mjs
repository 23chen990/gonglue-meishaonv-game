import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {renderScene,choose,replay,rewind} from './engine.mjs';
const root=new URL('../',import.meta.url);
const data=JSON.parse(fs.readFileSync(new URL('data/STORY.json',root)));
const witness=JSON.parse(fs.readFileSync(new URL('qa/current/choice-witness-prefixes.json',root))).choices;
const hash=x=>crypto.createHash('sha256').update(x).digest('hex').slice(0,16);
let verified=0, staged=0;
for(const sc of Object.values(data.scenes)){
 if(!sc.decisionSteps)continue;
 const w=Object.entries(witness).find(([key])=>key.startsWith(sc.id+'/')&&!key.includes('/intent:'));
 assert(w,'No reachable witness '+sc.id);
 const prefix=w[1].prefix,at=prefix.findIndex(c=>c.from===sc.id&&c.id.startsWith('intent:'));
 assert(at>=0,'First stage absent from replay '+sc.id);
 const entry=replay(data,prefix.slice(0,at)),first=renderScene(entry,data);
 assert.equal(entry.current,sc.id);
 assert(first.choices.length<=3);
 assert.equal(first.choices.length,2,'Two authored actual attitude choices');
 assert.throws(()=>choose(entry,data,sc.choices[0].id),/Intent required/);
 const paths=[];
 for(const group of sc.decisionSteps){
  const id='intent:'+group.id;
  const firstChoice=first.choices.find(o=>o.id===id);
  assert(firstChoice);
  if(!firstChoice.enabled)continue;
  const result=choose(entry,data,id);
  const second=renderScene(result.state,data);
  assert.deepEqual(result.reply,group.reply);
  assert.equal(result.state.current,sc.id,'Intent must not skip original scene');
  assert.equal(result.state.slot,entry.slot,'Intent must not consume action slot');
  assert.deepEqual(replay(data,result.state.history),result.state);
  assert(second.body.some(row=>row.id===group.after[0].id),'Missing visible emotional consequence '+sc.id+'/'+group.id);
  const opts=second.choices.filter(o=>o.enabled);
  assert(opts.length>=1&&opts.length<=4,'Second stage >4 '+sc.id);
  assert(opts.every(o=>group.options.includes(o.id)));
  const rival=sc.choices.find(o=>!group.options.includes(o.id));
  assert.throws(()=>choose(result.state,data,rival.id),/Intent required/);
  const outcome=choose(result.state,data,opts[0].id);
  assert.deepEqual(replay(data,outcome.state.history),outcome.state);
  assert.deepEqual(rewind(result.state,data,at),entry);
  paths.push({group:group.id,choices:opts.map(o=>o.id),after:group.after.map(o=>o.text).join('')});
  staged++;
 }
 assert(paths.length>=1);
 if(paths.length===2){
  assert.notDeepEqual(paths[0].choices,paths[1].choices);
  assert.notEqual(paths[0].after,paths[1].after);
 }
 for(const group of sc.decisionSteps)for(const beat of [...group.reply,...group.after]){
  assert.equal(beat.textHash,hash(beat.speaker+'\0'+beat.text),beat.id);
 }
 verified++;
}
assert.equal(verified,16);
assert.equal(Object.values(data.scenes).flatMap(s=>s.choices).length,751);
console.log(JSON.stringify({status:'PASS',authoredTwoStageScenes:verified,reachableAttitudes:staged,originalLeafOutcomes:751,scope:'ordinary-command states only; phone and human QA separate'}));
