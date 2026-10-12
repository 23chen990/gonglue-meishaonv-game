
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {createState,choose,replay,renderScene} from './engine.mjs';
import {run,data,root} from './route-runner.mjs';
const checks=[];
function check(name,fn){try{fn();checks.push({name,status:'PASS'});}catch(e){checks.push({name,status:'FAIL',error:e.message});}}
check('command_revision_is_not_ignored',()=>{
 const s=choose(createState(),data,'steady').state;
 assert.throws(()=>replay(data,[{...s.history[0],revision:90}]),/revision|sequence/i);
});
check('half_demo_is_not_a_master',()=>{
 const r=run({chars:['t'],stop:s=>s.visited.includes('t02')});
 assert.equal(r.state.f.song_access_t,'half');
 assert.notEqual(r.state.f.t_has_master,true);
 assert.ok(!r.state.f.proof_t_master);
});
for(const c of ['t','s','l','g']){
 check('unresolved_opening_source_has_specific_scene_'+c,()=>{
  const r=run({chars:[c],origin:'lie',openingCheck:'double',stop:s=>s.current===c+'03'});
  assert.equal(r.state.current,c+'03');
  assert.ok(renderScene(r.state,data).body.some(b=>b.text.includes('阿衡')&&b.id?.includes('unresolved_source')));
 });
}
fs.mkdirSync(new URL('qa/current/',root),{recursive:true});
fs.writeFileSync(new URL(process.env.RED?'provenance/r2_verified_input/new-red-cases.json':'qa/current/r3-regressions.json',root),JSON.stringify({hashes:{story:crypto.createHash('sha256').update(fs.readFileSync(new URL('data/STORY.json',root))).digest('hex'),engine:crypto.createHash('sha256').update(fs.readFileSync(new URL('tools/engine.mjs',root))).digest('hex')},checks,passed:checks.filter(x=>x.status==='PASS').length,failed:checks.filter(x=>x.status==='FAIL').length},null,2));
console.log(JSON.stringify(checks,null,2));
if(checks.some(x=>x.status==='FAIL'))process.exitCode=1;
