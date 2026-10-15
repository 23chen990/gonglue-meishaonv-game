import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {VERSION,createState,choose,renderScene,availableActions,condition,replay,rewind,endingFacts,reviewEnding,active} from './engine.mjs';
import {data as d,ep,run,count,defaultAction,root} from './route-runner.mjs';
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(new URL(p,root))).digest('hex');
const report={version:VERSION,scope:'Fresh r2 deterministic normal-command regression; not human play or retention',
 hashes:{story:sha('data/STORY.json'),engine:sha('tools/engine.mjs'),epilogues:sha('data/EPILOGUES.json'),bonus:sha('data/BONUS.json')},checks:[],failures:[]};
const witnesses=[],traces=[];
const save=(name,r)=>{
 const s=r.state;
 witnesses.push({name,ending:s.ending,commands:s.history,stages:s.stage,actions:s.slot,
  facts:s.f,known:s.known,sources:s.sources,fateLog:s.fateLog,
  epilogues:s.f.early_end?[]:ep.modules.filter(m=>condition(s,m.when)).map(m=>m.id)});
 if(r.trace?.length)traces.push({name,ending:s.ending,trace:r.trace});return s;
};
function check(name,fn){try{const detail=fn();report.checks.push({name,status:'PASS',...(detail?{detail}: {})});console.log('PASS',name);}
 catch(e){report.failures.push({name,error:e.stack});report.checks.push({name,status:'FAIL',error:e.message});console.log('FAIL',name,e.message);}}
const executed = (s,sid,id)=>s.history.some(h=>h.from===sid&&h.id===id);
const corpus = r=>r.trace.flatMap(x=>[...x.body,...x.reply]).map(b=>b.text).join('\n');
function at(r,sid){const x=r.trace.find(x=>x.from===sid);assert.ok(x,'Missing rendered scene '+sid);return x;}
check('Canonical IDs, display hashes and all continuations',()=>{
 const ids=new Set(),macros=new Set(['@schedule','@afterA6','@promiseReturn','@ending','@end','@openingTalk','@openingCheck','@openingWork','@afterDiscovery','@calendarResume','@personalRelationshipCheck']);
 const beats=bs=>bs.forEach(b=>{
  assert.equal(typeof b.text,'string');assert.ok(b.text.length);assert.ok(!ids.has(b.id),'Duplicate '+b.id);ids.add(b.id);
  assert.equal(b.textHash,crypto.createHash('sha256').update(b.speaker+'\0'+b.text).digest('hex').slice(0,16),b.id);
 });
 let choices=0;
 for(const [id,sc]of Object.entries(d.scenes)){
  assert.equal(id,sc.id);assert.ok(sc.choices.length);
  if(sc.next)assert.ok(d.scenes[sc.next]||macros.has(sc.next),'Invalid '+sc.next);
  beats(sc.body);sc.blocks.forEach(b=>beats(b.lines));
  const options=new Set();for(const o of sc.choices){
   choices++;assert.ok(!options.has(o.id),'Duplicate choice '+id+'/'+o.id);options.add(o.id);assert.equal(o.idGlobal,id+'/'+o.id);
   beats(o.reply);(o.replyBlocks||[]).forEach(b=>beats(b.lines));
   if(o.next)assert.ok(d.scenes[o.next]||macros.has(o.next),'Invalid '+o.next);
  }
 }
 assert.equal(Object.values(d.scenes).filter(x=>x.kind==='ending').length,24);assert.equal(ep.modules.length,40);
 assert.equal(JSON.parse(fs.readFileSync(new URL('data/BONUS.json',root))).items.length,8);
 assert.equal(JSON.parse(fs.readFileSync(new URL('data/CODA.json',root))).items.length,6);
 return {scenes:Object.keys(d.scenes).length,choices,beats:ids.size};
});
const chars=['t','s','l','g'];
for(let mask=1;mask<16;mask++){
 const cs=chars.filter((_,i)=>mask&(1<<i)),code=cs.slice().sort().join('');
 check('NORMAL_COMBINATION_'+code,()=>{
  const r=run({chars:cs}),s=save('romance_'+code,r);
  assert.equal(s.ending,'R_'+code);assert.ok(endingFacts(s).ready);
  assert.deepEqual(active(s),cs.slice().sort());
  for(const c of cs){
   assert.ok(executed(s,c+'03','open'));
   if(cs.length>1){assert.ok(s.stage[c]>=5);assert.ok(s.f['private_reward_'+c]);}
   for(const z of cs.filter(z=>z!==c))assert.ok(s.known[c].includes(z));
  }
  if(cs.length>=3)for(const c of cs){
   assert.ok(executed(s,'H_'+code+'_ASK_'+c,'ask'));
   assert.ok(s.sources.some(x=>x.observer===c&&x.fact==='group_vote_yes'));
  }
  assert.equal(JSON.stringify(replay(d,s.history)),JSON.stringify(s));
  return {ending:s.ending,stages:s.stage,actions:s.slot,commands:s.history.length};
 });
}
for(const c of chars){
 for(const method of ['wait','friend','decline'])check('INVITE_AGAIN_'+c+'_'+method,()=>{
  const r=run({chars:[c],date:method,reopen:true}),s=save('again_'+c+'_'+method,r);
  assert.ok(executed(s,c+'03',method));assert.ok(executed(s,'REOPEN_'+c,'open'));assert.equal(s.ending,'R_'+c);
 });
 check('SLOW_INTIMACY_'+c,()=>{
  const id={t:'slow',s:'hold',l:'slow',g:'hand'}[c];
  const r=run({chars:[c],options:{[c+'05']:id}}),s=save('slow_touch_'+c,r);
  assert.equal(s.ending,'R_'+c);assert.ok(!s.f['kissed_'+c]||s.history.some(x=>x.from==='R_'+c));
 });
 check('RESPECT_REFUSAL_AND_RESUME_'+c,()=>{
  const r=run({chars:[c],date:'decline'}),s=save('regret_'+c,r);assert.equal(s.ending,'G_'+c);assert.ok(!s.f['active_'+c]);
  const end=at(r,'G_'+c);assert.ok(end.body.some(b=>b.id?.startsWith('reason.')));
 });
}
for(let i=0;i<4;i++)for(let j=i+1;j<4;j++){
 const cs=[chars[i],chars[j]],code=cs.slice().sort().join('');
 check('PAIR_SLOW_TWICE_CAN_RETURN_'+code,()=>{
  let second=false;
  const r=run({chars:cs,options:{['Q_'+code]:s=>count(s,'Q_'+code,'slow')<2?'slow':'together'},
    observe:(s,o,res)=>{if(s.current==='Q_'+code&&o.id==='slow'&&count(s,'Q_'+code,'slow')===1){
      second=true;
      if(res.state.current==='@schedule')assert.ok(availableActions(res.state,d).some(x=>x.id==='pair:'+code));
    }}}),s=save('pair_slow_twice_'+code,r);
  assert.ok(second);assert.equal(count(s,'Q_'+code,'slow'),2);assert.ok(executed(s,'Q_'+code,'together'));assert.equal(s.ending,'R_'+code);
 });
}
check('All three-plus group votes are independently optional',()=>{
 const results=[];
 for(const skipped of chars){
  let r=run({chars,options:{['H_glst_ASK_'+skipped]:'wait'},trace:false});
  const s=save('withheld_group_'+skipped,r);assert.notEqual(s.ending,'R_glst');assert.ok(!s.f.group_accepted_glst);
  assert.ok(s.sources.some(x=>x.observer===skipped&&x.fact==='group_vote_wait'));results.push(s.ending);
 }
 return results;
});
// The remaining five non-romance endings, reached through actual scene choices.
for(const [name,cfg,expected]of [
 ['early',{chars:[],options:{A6a:'accept'}},'X01'],
 ['single_rise',{chars:[],options:{EXEC_g:'none'}},'X02'],
 ['all_futures_no_romance',{chars:[]},'X03'],
 ['unresolved',{chars:['t','s'],skipPairs:true},'X04'],
 ['outside',{chars:[],options:{A6a:'exit',EXEC_g:'none'}},'X05']])check('OTHER_ENDING_'+name,()=>{
 const r=run(cfg),s=save(name,r);assert.equal(s.ending,expected);
 if(name==='single_rise'){assert.ok(s.f.saved);assert.ok(executed(s,'XU_WORK','portfolio'));assert.deepEqual(active(s),[]);}
 if(name==='outside'){assert.ok(s.visited.includes('RES_g'));assert.equal(s.f.final_xu,'outside');}
});
// Every epilogue is evaluated from a legal completed run, not by assigning final flags.
for(const m of ep.modules)check('EPILOGUE_'+m.id,()=>{
 const cfg={chars:[],trace:false,options:{}};
 if(chars.includes(m.axis)){
  const c=m.axis,res=d.scenes['RES_'+c].choices.find(o=>o.effects.some(e=>e.op==='recordFate'&&e.outcome===m.value));
  assert.ok(res);const proof=res.effects.find(e=>e.op==='recordFate').proof;
  const act=d.scenes['EXEC_'+c].choices.find(o=>o.effects.some(e=>e.key===proof&&e.value===true));assert.ok(act);
  cfg.options['EXEC_'+c]=act.id;cfg.options['RES_'+c]=res.id;
  const early={t:'A2a',s:'A3a',l:'A4a',g:'A5a'}[c];
  const plan=d.scenes[early].choices.find(o=>o.effects.some(e=>e.key==='plan_'+c&&e.value===m.value));
  // The master can be obtained by an independently booked session even without the early song route.
  if(c!=='t'||m.value!=='independent')cfg.options[early]=plan.id;
  if(c==='t'&&m.value==='chosen_duet')cfg.options.LU_MOVE1='share';
 }else if(m.axis==='lu'){cfg.options.LU_MOVE2=m.value;cfg.options.RES_lu=m.value;}
 else if(m.axis==='xu'){
  const pair={independent:['public','original'],partner:['partner','portfolio'],backstage:['backstage','steady'],rebuilding:['rebuild','rest'],outside:['exit','portfolio']}[m.value];
  cfg.options.A6a=pair[0];cfg.options.XU_WORK=pair[1];
 }else if(m.axis==='visibility')cfg.options.A7a={open:'together',private:'private',unresolved:'separate',work:'work',closed:'none'}[m.value];
 else if(m.axis==='bias')cfg.first=m.value;
 const r=run(cfg),s=save(m.id,r);assert.ok(condition(s,m.when));assert.ok(!s.f.early_end);
 if(chars.includes(m.axis)||m.axis==='lu'){
  const f=s.fateLog[m.axis];assert.ok(f.execution&&f.final);assert.ok(f.execution.command<f.final.command);
  assert.ok(s.history[f.execution.command]);
 }
 return {ending:s.ending,epilogue:m.id,commands:s.history.length};
});
for(const [name,record,raw,expected]of [['record','check','wait','proof_handoff'],['witness','ask','witness','proof_witness'],['audio','look','extract','proof_audio']])check('SELF_RESCUE_WITH_REAL_'+name,()=>{
 const r=run({chars:[],noSides:true,options:{A1b:record,A4b:raw,EXEC_g:'none'}}),s=save('proof_'+name,r);
 assert.ok(s.f[expected]);assert.ok(s.f.saved);assert.deepEqual(active(s),[]);
 if(name!=='audio')assert.ok(!s.f.proof_audio);
 const block=r.trace.filter(x=>x.from==='A6a'&&!x.choice.startsWith('intent:')).flatMap(x=>x.reply).map(b=>b.id).join(' ');assert.ok(block.includes('.'+(name==='record'?'record':name)+'.'));
});
check('Same early plan, different execution, different tangible future',()=>{
 const a=save('causal_plan_shared_slots',run({chars:[],options:{A3a:'shared',EXEC_s:'slots',RES_s:'slots'}}));
 const b=save('causal_plan_shared_handover',run({chars:[],options:{A3a:'shared',EXEC_s:'handover',RES_s:'handover'}}));
 assert.equal(a.f.plan_s,b.f.plan_s);assert.notEqual(a.f.final_s,b.f.final_s);
 assert.equal(a.fateLog.s.execution.source,'EXEC_s/slots');assert.equal(b.fateLog.s.execution.source,'EXEC_s/handover');
});
check('Late actual scene repairs a previously unexecuted future',()=>{
 const a=save('late_t_recovery',run({chars:['t'],options:{EXEC_t:'none',t07:'compare',RES_t:'terms'}}));
 assert.equal(a.f.exec_t,'none');assert.equal(a.f.final_t,'negotiated');assert.equal(a.fateLog.t.execution.source,'t07/compare');
});
// A delayed disclosure stays unsaid until the explicit later input.
for(const c of ['s','g'])check('DELAYED_DISCLOSURE_'+c,()=>{
 let checked=false;
 const oid=c==='s'?'time':'wait';
 const r=run({chars:['t',c],options:{[c+'06']:oid},observe:(before,o,res)=>{
  if(before.current===c+'06'&&o.id===oid){
   checked=true;assert.equal(res.state.sources.filter(x=>x.fact==='current_relationships').length,before.sources.filter(x=>x.fact==='current_relationships').length);
  }
 }}),s=save('delayed_'+c,r);assert.ok(checked);assert.ok(executed(s,'DUE_'+c,'truth'));assert.equal(s.ending,'R_'+[c,'t'].sort().join(''));
});
check('Hidden denial remains unknown without a disclosure or witnessed source',()=>{
 const r=run({chars:['s','t'],options:{s06:'dismiss',A7a:'separate'}}),s=save('hidden_not_discovered',r);
 assert.ok(s.f.latent_s);assert.ok(!s.denials.s.discovered);assert.equal(s.ending,'X04');
 assert.ok(!s.sources.some(x=>x.observer==='s'&&x.fact==='contradiction_with_own_prior_denial'));
});
check('Witnessed exposure, actual two-appointment repair, renewed consent',()=>{
 let encountered=false;
 const cfg={chars:['s','t'],options:{s06:'dismiss'},schedule:(s,as,fallback)=>{
  const cross=as.find(x=>x.id==='encounter:s:t');if(cross&&!encountered){encountered=true;return cross.id;}
  if(s.denials.s?.discovered){
   if(as.some(x=>x.id==='repair2:s'))return 'repair2:s';
   if(as.some(x=>x.id==='repair1:s'))return 'repair1:s';
  }
  return fallback();
 }};
 const r=run(cfg),s=save('exposure_repair',r);
 assert.ok(encountered);assert.ok(executed(s,'CROSS_s_t','admit'));assert.ok(executed(s,'RA_s','act'));assert.ok(executed(s,'R2_s','open'));
 assert.ok(s.sources.some(x=>x.fact==='heard_peer_confirm_relationship'&&x.observer==='s'&&x.people.includes('t')));
 assert.equal(s.ending,'R_st');assert.ok(!s.f.pending_s&&!s.f.latent_s);
});
check('Acknowledgement alone is not repair; failed action cannot be bypassed',()=>{
 let cross=false;
 const r=run({chars:['s','t'],options:{s06:'dismiss',RA_s:'delay',A7a:'separate'},schedule:(s,as,fallback)=>{
  const a=as.find(x=>x.id==='encounter:s:t');if(a&&!cross){cross=true;return a.id;}
  if(s.denials.s?.discovered){if(as.some(x=>x.id==='repair2:s'))return 'repair2:s';if(as.some(x=>x.id==='repair1:s'))return 'repair1:s';}
  return fallback();
 }}),s=save('repair_failed',r);
 assert.ok(executed(s,'RA_s','delay'));assert.ok(!executed(s,'R2_s','open'));assert.equal(s.ending,'X04');
});
check('Voluntary confession can be repaired without a surprise omniscient reveal',()=>{
 const r=run({chars:['s','t'],options:{s06:'dismiss'},repair:true}),s=save('voluntary_repair',r);
 assert.ok(executed(s,'R1_s','own'));assert.ok(executed(s,'RA_s','act'));assert.ok(s.f.repaired_s);assert.equal(s.ending,'R_st');
});
check('Readonly ending review includes main ending and cannot change a live route',()=>{
 const log=witnesses.find(x=>x.name==='romance_t').commands;
 const live=run({chars:['g'],stop:s=>s.slot===5}).state,raw=JSON.stringify(live);
 const reviewed=reviewEnding(d,log);assert.equal(JSON.stringify(live),raw);assert.equal(reviewed.ending,'R_t');
 assert.ok(reviewed.body.some(b=>b.id.startsWith('R_t.')));assert.ok(reviewed.context.complete);
});
check('Refresh replay, rewind and stale command rejection',()=>{
 const s=run({chars:['l'],stop:s=>s.slot===9}).state;
 assert.equal(JSON.stringify(replay(d,s.history)),JSON.stringify(s));
 assert.equal(rewind(s,d,3).history.length,3);
 assert.throws(()=>choose(s,d,renderScene(s,d).choices.find(x=>x.enabled).id,s.revision-1),/Stale/);
 assert.throws(()=>replay(d,[{from:'A7a',id:'together'}]),/mismatch/);
});
check('All 24 endings and all 40 epilogues have ordinary-input witnesses',()=>{
 const endings=new Set(witnesses.map(x=>x.ending)),modules=new Set(witnesses.flatMap(x=>x.epilogues));
 assert.equal(endings.size,24);assert.equal(modules.size,40);return {endings:[...endings].sort(),epilogues:modules.size};
});
report.passed=report.checks.filter(x=>x.status==='PASS').length;report.failed=report.failures.length;
fs.mkdirSync(new URL('qa/current/',root),{recursive:true});
fs.writeFileSync(new URL('qa/current/regression.json',root),JSON.stringify(report,null,2));
fs.writeFileSync(new URL('qa/current/witnesses.json',root),JSON.stringify({hashes:report.hashes,witnesses},null,2));
fs.writeFileSync(new URL('qa/current/rendered-routes.json',root),JSON.stringify({hashes:report.hashes,traces},null,2));
console.log(JSON.stringify({passed:report.passed,failed:report.failed,failures:report.failures.map(x=>({name:x.name,error:x.error.split('\n')[0]}))},null,2));
process.exitCode=report.failed?1:0;
