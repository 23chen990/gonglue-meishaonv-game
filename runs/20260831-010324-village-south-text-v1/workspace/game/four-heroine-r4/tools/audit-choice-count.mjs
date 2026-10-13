/* Read-only normal-command audit of candidate count in actual reachable states.
   Browser tests enforce visible group size; this report separately preserves the
   fact that some narrative decisions have five or more total alternatives. */
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {replay,renderScene,VERSION} from './engine.mjs';
const root=new URL('../',import.meta.url);
const read=name=>fs.readFileSync(new URL(name,root));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const storyRaw=read('data/STORY.json');
const data=JSON.parse(storyRaw);
const witness=JSON.parse(read('qa/current/choice-witness-prefixes.json'));
const hashes={story:sha(storyRaw),engine:sha(read('tools/engine.mjs'))};
assert.deepEqual(witness.hashes,hashes,'Choice witness is stale for this story and engine');
const allChoices=Object.values(data.scenes).flatMap(s=>s.choices.map(c=>s.id+'/'+c.id));
assert.deepEqual(new Set(Object.keys(witness.choices)),new Set(allChoices),'Missing/extra choice witnesses');
const byChoiceWitness={},states=new Map(),failures=[];
for(const [name,item] of Object.entries(witness.choices)){
 try{
  const path=item.prefix;
  assert.ok(path?.length,'Missing witness prefix');
  const state=replay(data,path.slice(0,-1));
  const last=path.at(-1);
  assert.equal(state.current,last.from,'Witness from mismatch');
  const opts=renderScene(state,data).choices.filter(x=>x.enabled);
  assert.ok(opts.some(x=>x.id===last.id),'Witness choice not enabled');
  const count=opts.length;
  byChoiceWitness[count]=(byChoiceWitness[count]||0)+1;
  const signature=state.current+'\0'+opts.map(o=>o.id).join('|');
  if(!states.has(signature))states.set(signature,{scene:state.current,count,choices:opts.map(o=>o.id)});
 }catch(e){failures.push({choice:name,error:String(e)});}
}
const over4=[...states.values()].filter(x=>x.count>4);
const report={status:failures.length?'FAIL':'PASS',version:VERSION,scope:'Ordinary-command replay of all authored choice witnesses; non-exhaustive state exploration, not human experience',hashes,
 observedChoices:Object.keys(witness.choices).length,uniqueStates:states.size,byChoiceWitness,reachableStatesWith5OrMore:over4.length,over4,failures,
 decisionConstraint:over4.length?'VISIBLE_CHOICES_MAX_3_BY_UI_PAGING; STRICT_TOTAL_CHOICES_MAX_4_NOT_MET':'NO_OVER_FOUR_OBSERVED_IN_THIS_WITNESS_SET',
 independentBrowserAssertion:'RUN tools/test-ui-r4.py; ordinary-command count alone does not verify presentation'};
fs.writeFileSync(new URL('qa/current/r42-choice-count-audit.json',root),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({status:report.status,observedChoices:report.observedChoices,uniqueStates:states.size,reachableStatesWith5OrMore:over4.length,failures:failures.length}));
if(failures.length)process.exitCode=1;
