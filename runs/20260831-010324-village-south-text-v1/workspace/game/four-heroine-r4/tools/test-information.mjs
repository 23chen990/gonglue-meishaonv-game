import fs from 'node:fs';import assert from 'node:assert/strict';import crypto from 'node:crypto';
import {run,root,defaultAction} from './route-runner.mjs';
const cases=[],witnesses=[],failures=[];
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(new URL(p,root))).digest('hex');
const save=(name,r)=>{witnesses.push({name,ending:r.state.ending,commands:r.state.history});return r.state;};
const seen=(s,id)=>s.history.some(h=>h.from===id);
function test(name,fn){try{fn();cases.push({name,status:'PASS'});}catch(e){failures.push({name,message:e.message});cases.push({name,status:'FAIL',error:e.stack});}}
const chars=['t','s','l','g'];
const deny=c=>c==='s'?{s06:'dismiss'}:c==='g'?{g06:'deny'}:{['REL_'+c]:'deny'};
for(const c of chars){
 test('PROMISE_FALLBACK_'+c,()=>{
  const r=run({chars:[c],options:{A3b:c,['MIS_'+c]:'honor'},schedule:(s,a,f)=>s.slot===6?'rest':f()});
  assert.ok(seen(save('promise_'+c,r),'MEET_'+c));
 });
 test('OPENING_SOURCE_REPAIR_'+c,()=>{
  const r=run({chars:[c],origin:'lie',openingCheck:'double',correctSource:true});
  assert.ok(seen(save('source_'+c,r),'OPEN_CLEAR_'+c));
 });
 test('DISCOVERY_FROM_EXPLICIT_DISCLOSURE_'+c,()=>{
  const other=c==='t'?'s':'t';
  const r=run({chars:[other,c],options:deny(c)}),s=save('found_'+c,r);
  assert.ok(seen(s,'FOUND_'+c));
  assert.ok(s.sources.some(x=>x.observer===c&&x.fact==='contradiction_with_own_prior_denial'));
 });
 for(const peer of chars.filter(x=>x!==c))test('ENCOUNTER_SOURCE_'+c+'_'+peer,()=>{
  let triggered=false;
  const r=run({chars:[peer,c],options:deny(c),schedule:(s,a,f)=>{
   const id='encounter:'+c+':'+peer;
   if(!triggered&&a.some(x=>x.id===id)){triggered=true;return id;}return f();
  }}),s=save('encounter_'+c+'_'+peer,r);
  assert.ok(seen(s,'CROSS_'+c+'_'+peer));
  assert.ok(s.sources.some(x=>x.observer===c&&x.fact==='heard_peer_confirm_relationship'&&x.people.includes(peer)));
 });
}
for(let i=0;i<4;i++)for(let j=i+1;j<4;j++){
 const cs=[chars[i],chars[j]],code=cs.slice().sort().join(''),c=cs[0];
 test('PAIR_CAN_DISCLOSE_PRIOR_WRONG_'+code,()=>{
  let talked=false;
  const r=run({chars:cs,skipPairs:true,options:{...deny(c),['Q_'+code]:'reveal'},schedule:(s,a,f)=>{
   const id='pair:'+code;
   if(!talked&&s.f['latent_'+c]&&a.some(x=>x.id===id)){talked=true;return id;}return f();
  }}),s=save('pair_reveal_'+code,r);
  assert.ok(s.history.some(h=>h.from==='Q_'+code&&h.id==='reveal'));
 });
}
const report={scope:'Legal inputs for all four source corrections, four promised fallback meetings, four disclosure discoveries, twelve peer evidence encounters, six pair disclosures',hashes:{story:sha('data/STORY.json'),engine:sha('tools/engine.mjs')},cases,passed:cases.filter(x=>x.status==='PASS').length,failed:failures.length,failures};
fs.writeFileSync(new URL('qa/current/information-regression.json',root),JSON.stringify(report,null,2));
fs.writeFileSync(new URL('qa/current/information-witnesses.json',root),JSON.stringify({hashes:report.hashes,witnesses},null,2));
console.log(JSON.stringify({passed:report.passed,failed:report.failed,failures},null,2));if(failures.length)process.exitCode=1;
