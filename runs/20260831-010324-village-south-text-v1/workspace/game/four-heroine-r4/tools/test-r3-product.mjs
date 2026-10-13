import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {run,data,root} from './route-runner.mjs';
import {renderScene,choose,active,VERSION} from './engine.mjs';
const cases=[];
for(const c of 'tslg'){
 let before;
 const route=run({chars:[c],stop:s=>s.current==='SPARK_'+c});
 before=route.state;
 assert.equal(before.current,'SPARK_'+c);
 const snapshot=JSON.stringify(before);
 for(const opt of renderScene(before,data).choices.filter(x=>x.enabled)){
  const r=choose(before,data,opt.id);
  assert.equal(JSON.stringify(before),snapshot,'input state mutated');
  assert.equal(r.state.f['active_'+c],before.f['active_'+c],'early interest forced agreement');
  assert.equal(r.state.f['scope_'+c],before.f['scope_'+c],'early interest forced scope');
  assert.equal(r.state.f['commitment_'+c],before.f['commitment_'+c],'early interest forced commitment');
  assert(r.reply.length>0);
  cases.push({name:'early_interest_'+c+'_'+opt.id,status:'PASS'});
 }
 const r=run({chars:[c],spark:'bold'});
 assert.equal(r.state.ending,'R_'+c);
 assert(r.state.stage[c]>=10);
 cases.push({name:'deep_single_'+c,status:'PASS',stage:r.state.stage[c]});
}
const four=run({chars:['g','l','s','t']});
assert.equal(four.state.ending,'R_glst');
assert.equal(four.state.slot,20);
assert.equal(active(four.state).length,4);
for(const c of 'tslg')assert(four.state.stage[c]>=5);
cases.push({name:'four_person_budget_and_depth',status:'PASS',stage:four.state.stage,actions:four.state.slot});
const report={version:VERSION,hashes:{story:crypto.createHash('sha256').update(fs.readFileSync(new URL('data/STORY.json',root))).digest('hex'),engine:crypto.createHash('sha256').update(fs.readFileSync(new URL('tools/engine.mjs',root))).digest('hex')},scope:'Ordinary scene/choice commands, no injected relationship state. Not player retention.',cases,failed:0};
fs.writeFileSync(new URL('qa/current/r3-product.json',root),JSON.stringify(report,null,2)+'\n');
console.log('R3 product regressions',cases.length,'PASS');
