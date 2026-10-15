/** v4.9 gameplay-meaning audit. Exercises real legal choices using the canonical
 * interpreter. A downstream dependency is a code-level proxy, NOT a player
 * judgement; sampled counterfactuals prove early actions change persistent facts.
 */
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {createState,renderScene,choose,replay} from './engine.mjs';
const root=new URL('../',import.meta.url);
const D=JSON.parse(fs.readFileSync(new URL('data/STORY.json',root),'utf8'));
const contract=JSON.parse(fs.readFileSync(new URL('data/CHOICE_CONTRACTS.json',root),'utf8'));
const sha=crypto.createHash('sha256').update(fs.readFileSync(new URL('data/STORY.json',root))).digest('hex');
assert.equal(contract.storySha256,sha);
function reach(target,entry='rescue',overrides={}){
 let s=createState();
 for(let i=0;i<165;i++){
  if(s.current===target)return s;
  assert(!s.complete,`Reached ending before ${target}: ${s.ending}`);
  const sid=s.current;
  const avail=renderScene(s,D).choices.filter(x=>x.enabled);
  assert(avail.length,`No enabled action in ${sid}`);
  let id=sid==='ENTRY_WAKE'?entry:(overrides[sid]||(sid==='@schedule'?avail.find(x=>x.id==='rest')?.id:null)||avail[0].id);
  if(avail.some(x=>x.intentStage)){
   const group=D.scenes[sid].decisionSteps.find(g=>g.options.includes(id));
   id=group?'intent:'+group.id:avail[0].id;
  }
  assert(avail.some(x=>x.id===id),`Configured impossible ${sid}/${id}`);
  s=choose(s,D,id,s.revision).state;
 }
 throw Error('Stalled before '+target);
}
function choicesAt(id,entry='rescue',overrides={}){
 const s=reach(id,entry,overrides);
 const cs=renderScene(s,D).choices.filter(x=>x.enabled);
 assert(cs.length>=2,`Too few alternatives at ${id}`);
 const optionsToCompare=D.scenes[id]?.decisionSteps
  ?D.scenes[id].choices.filter(x=>D.scenes[id].decisionSteps.some(g=>g.options.includes(x.id)))
  :cs;
 const output=optionsToCompare.map(x=>{
  let state=s;
  if(D.scenes[id]?.decisionSteps){
   const group=D.scenes[id].decisionSteps.find(g=>g.options.includes(x.id));
   state=choose(state,D,'intent:'+group.id,state.revision).state;
  }
  const result=choose(state,D,x.id,state.revision);
  return {id:x.id,from:id,to:result.state.current,
    facts:result.state.f,
    reply:result.reply.map(b=>b.text).join('\n'),
    actionCount:result.state.history.length,
    result:result.state};
 });
 // A strategic choice must not be merely the same result behind a new label.
 for(let i=0;i<output.length;i++)for(let j=i+1;j<output.length;j++){
  const a=output[i],b=output[j];
  const factKeys=new Set([...Object.keys(a.facts),...Object.keys(b.facts)]);
  const changed=[...factKeys].filter(k=>JSON.stringify(a.facts[k])!==JSON.stringify(b.facts[k]));
  assert(changed.length||a.to!==b.to,`${id}/${a.id} and ${b.id} are same persistent outcome`);
 }
 return {scene:id,count:output.length,options:output.map(x=>({id:x.id,next:x.to}))};
}
const samples=[];
for(const [sid,entry,override] of [
 ['ENTRY_WAKE','rescue',{}],['ENTRY_CLUES','canon',{}],['ENTRY_MEMORY','investigate',{}],
 ['COLD','rescue',{}],['OP_CANON','canon',{ENTRY_CLUES:'witness'}],
 ['OP_FORK','rescue',{COLD:'t'}],['A1b','canon',{ENTRY_CLUES:'witness',OP_CANON:'question'}],
 ['A2a','rescue',{}],['A2b','canon',{ENTRY_CLUES:'witness',OP_CANON:'question'}],
 ['A3a','rescue',{}],['A4a','rescue',{}],['A4b','rescue',{}],
 ['A5a','rescue',{}],['A5b','rescue',{}],['A6a','canon',{ENTRY_CLUES:'witness',OP_CANON:'question',A1b:'check',A4b:'extract'}],
 ['UNWRITTEN','rescue',{A6a:'public'}],['A6b','rescue',{A6a:'public'}]
]){
 try{samples.push(choicesAt(sid,entry,override));}
 catch(e){if(e.message.includes('Reached ending before'))continue;throw e;}
}
assert(samples.length>=13,`Only ${samples.length} anchor samples`);
const score=contract.choices.filter(x=>
 [x.laterFlagReads,x.exactChoiceReads,x.runtimeConsumers].some(v=>Array.isArray(v)&&v.length>0)).length;
const pct=score/contract.choices.length*100;
assert(pct>=80,`Only ${pct.toFixed(1)}% have traceable downstream reference`);
// Prove concrete seventh-day proof access follows actual early evidence collection.
const noProof=reach('A6a','canon',{ENTRY_CLUES:'obey',OP_CANON:'silence',A1b:'look',A4b:'wait'});
const withProof=reach('A6a','canon',{ENTRY_CLUES:'witness',OP_CANON:'question',A1b:'check',A4b:'extract'});
const choices=s=>renderScene(s,D).choices.filter(x=>x.enabled).map(x=>x.id);
const few=choices(noProof),more=choices(withProof);
assert(!noProof.f.proof_audio && !noProof.f.proof_handoff,'noProof route gained phantom evidence');
assert(withProof.f.proof_audio || withProof.f.proof_handoff,'proof route lost evidence');
assert.deepEqual(few,['intent:leave'],'without evidence the script must not offer a miracle public turnaround');
assert(more.includes('intent:prove'),'valid evidence should unlock the real evidence-based counterattack approach');
const candidate={storySha256:sha,baselineChoiceCount:contract.choices.length,
 traceableLaterConsumers:score,traceableConsumerPct:+pct.toFixed(1),
 disclaimer:'代码引用率不等于玩家觉得80%的选择有意义；还需目标玩家盲测及实玩路线反事实。',
 counterfactualScenes:samples.length,counterfactualOptions:samples.reduce((v,x)=>v+x.count,0),
 samples,daySeven:{noProofChoices:few,proofChoices:more}};
const dest=new URL('qa/current/v49-consequences-report.json',root);
fs.mkdirSync(new URL('qa/current/',root),{recursive:true});fs.writeFileSync(dest,JSON.stringify(candidate,null,2)+'\n');
console.log('PASS counterfactual sample '+samples.length+' scenes / '+candidate.counterfactualOptions+' choices, '+pct.toFixed(1)+'% static traceable downstream');
