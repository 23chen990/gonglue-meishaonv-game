import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {run,root,data} from './route-runner.mjs';
import {condition} from './engine.mjs';
const checks=[];
function test(name,fn){try{const detail=fn();checks.push({name,status:'PASS',detail});}catch(e){checks.push({name,status:'FAIL',error:e.message});}}
test('Clock never reverses on all curated ordinary traces',()=>{
 const traces=JSON.parse(fs.readFileSync(new URL('qa/current/rendered-routes.json',root))).traces;
 for(const r of traces){let last=-1;for(const t of r.trace){const [h,m]=t.clock.time.split(':').map(Number);const v=t.clock.day*1440+h*60+m;assert(v>=last,r.name+' '+t.from);last=v;}}
 return {routes:traces.length};
});
test('All free private appointments occur in evening; independent work anchors remain explicit',()=>{
 assert(data.calendar.every(x=>Number(x.time.split(':')[0])>=18));
 return {freeSlots:data.calendar.length};
});
test('A shared gathering does not erase a completed two-person experience',()=>{
 const r=run({chars:['t','s','l','g'],options:{P_st:'fixed'},schedule(s,a,fallback){
  if(!s.visited.includes('P_st')&&a.some(x=>x.id==='pair:st'))return 'pair:st';
  return fallback();
 }});
 assert(r.state.visited.includes('P_st'));assert(r.state.visited.includes('H_glst'));
 assert.equal(r.state.f.bridge_st,'fixed');assert.equal(r.state.ending,'R_glst');
 const e=r.trace.find(x=>x.from==='R_glst');
 assert(e.body.some(x=>x.text.includes('这次我照自己说的时间来')));
 return {ending:r.state.ending,commands:r.state.history.length,bridge:r.state.f.bridge_st};
});
for(const [id,plan] of [['ally','ally'],['rival','rival'],['distance','distant'],['independent','independent'],['repair','reconciled']]){
 test('Lu early plan receives a later independent response '+id,()=>{
  let matches=0;
  const r=run({chars:[],first:'self',options:{A5b:id},observe(s,o,result,v){
   if(s.current==='LU_MOVE2'&&!o.id.startsWith('intent:')){
    assert.equal(s.f.plan_lu,plan);
    const b=data.scenes.LU_MOVE2.blocks.find(x=>x.when?.eq?.[0]==='plan_lu'&&x.when.eq[1]===plan);
    assert(b&&condition(s,b.when));assert(b.lines.every(x=>v.body.some(z=>z.id===x.id)));matches++;
   }
  }});
  assert.equal(matches,1);return {ending:r.state.ending,plan};
 });
}
const sha=n=>crypto.createHash('sha256').update(fs.readFileSync(new URL(n,root))).digest('hex');
const report={scope:'Final-pass regressions, only ordinary legal inputs or supplied trace observations',hashes:{story:sha('data/STORY.json'),engine:sha('tools/engine.mjs')},checks,passed:checks.filter(x=>x.status==='PASS').length,failed:checks.filter(x=>x.status==='FAIL').length};
fs.writeFileSync(new URL('qa/current/final-edges.json',root),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));if(report.failed)process.exitCode=1;
