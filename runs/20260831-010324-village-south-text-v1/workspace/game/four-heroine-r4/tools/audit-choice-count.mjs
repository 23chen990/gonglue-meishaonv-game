/* Strict v4.13 native-player decision count using authenticated command witnesses.
 * Old 751 author-action prefixes are replayed, switched to the current staged
 * interpreter, and checked through the actual two-step legal command path.
 * The legacy 5-6-option states are retained separately as provenance, not passed off
 * as v4.13 stage-one alternatives. The dynamic day planner is UI navigation, tested separately.
 */
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {replay,renderScene,choose,VERSION,TRUE_DECISION_SCENES} from './engine.mjs';
const root=new URL('../',import.meta.url),read=n=>fs.readFileSync(new URL(n,root));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const storyRaw=read('data/STORY.json'),data=JSON.parse(storyRaw);
const witness=JSON.parse(read('qa/current/choice-witness-prefixes.json'));
const hashes={story:sha(storyRaw),engine:sha(read('tools/engine.mjs'))};
assert.deepEqual(witness.hashes,hashes,'Choice witness stale: rebuild current normal-command coverage first');
const original=Object.values(data.scenes).flatMap(s=>s.choices.map(c=>s.id+'/'+c.id));
assert.deepEqual(new Set(Object.keys(witness.choices)),new Set(original));
const stages=new Map(),historical=new Map(),failed=[],shown=new Map(),byChoiceWitness={},states=new Map();
for(const [name,item] of Object.entries(witness.choices)){
 try{
  const prefix=item.prefix.slice(0,-1),last=item.prefix.at(-1);
  assert(prefix&&last,'missing replayable witness');
  const previous=replay(data,prefix),state=replay(data,prefix,{intentMode:true,legacyPrefixLength:prefix.length});
  assert.equal(state.current,last.from);assert.equal(previous.current,last.from);
  const orig=renderScene(previous,data).choices.filter(x=>x.enabled);
  assert(orig.some(x=>x.id===last.id),'stale choice witness '+name);
  const first=renderScene(state,data),options=first.choices.filter(x=>x.enabled);
  assert(options.length<=4,'v4.13 first-stage >4 '+last.from);
  byChoiceWitness[options.length]=(byChoiceWitness[options.length]||0)+1;
  if(orig.length>4){
   const historicalKey=last.from+'\0'+orig.map(x=>x.id).join('|');
   historical.set(historicalKey,{scene:last.from,count:orig.length,choices:orig.map(x=>x.id)});
   assert.equal(first.intentStep,1,'missing true first-stage command '+last.from);
   const matched=options.filter(x=>x.coveredChoices?.includes(last.id));
   assert.equal(matched.length,1,'missing or duplicated legal choice coverage '+name);
   const result=choose(state,data,matched[0].id,state.revision);
   const second=renderScene(result.state,data);
   assert.equal(second.intentStep,2);
   const available=second.choices.filter(x=>x.enabled);
   assert(available.length<=4 && available.length>0,'v4.13 second-stage >4 '+last.from);
   assert(available.some(x=>x.id===last.id),'witness not accessible after attitude '+name);
   const outcome=choose(result.state,data,last.id,result.state.revision);
   const backup=choose(previous,data,last.id,previous.revision);
   assert.equal(outcome.state.current,backup.state.current,'new stage alters existing continuation');
   shown.set(name,{attitude:matched[0].id,selected:last.id});
   const key=last.from+'\0'+first.choices.map(x=>x.id).join('|');
   if(!stages.has(key))stages.set(key,{scene:last.from,attitudes:options.map(x=>x.id),count:options.length});
   const leafKey=last.from+'/'+matched[0].id+'\0'+available.map(x=>x.id).join('|');
   if(!states.has(leafKey))states.set(leafKey,{scene:last.from,step:2,count:available.length,choices:available.map(x=>x.id)});
  }else{
   assert(options.some(x=>x.id===last.id),'original choice missing '+name);
  }
  const key=last.from+'\0'+options.map(x=>x.id).join('|');
  if(!states.has(key))states.set(key,{scene:last.from,step:first.intentStep||0,count:options.length,choices:options.map(x=>x.id)});
 }catch(e){failed.push({choice:name,error:String(e)});}
}
const over4=[...states.values()].filter(x=>x.count>4);
const stagedScenes=[...new Set([...stages.values()].map(x=>x.scene))];
if(stagedScenes.length!==16||!TRUE_DECISION_SCENES.every(s=>stagedScenes.includes(s)))
 failed.push({choice:'required-16-stage-coverage',error:'Missing staged witnessed decisions '+JSON.stringify(stagedScenes)});
if(over4.length)failed.push({choice:'MAX_FOUR',error:JSON.stringify(over4)});
const report={status:failed.length?'FAIL':'PASS',version:VERSION,
 scope:'Authenticated ordinary-command witness paths, replayed through actual v4.13 first-stage/second-stage interpreter options; non-exhaustive across all conceivable flag combinations.',hashes,
 observedChoices:Object.keys(witness.choices).length,uniqueStates:states.size,byChoiceWitness,
 stagedScenes:stagedScenes.length,stageOneChoices:stagedScenes.map(s=>({scene:s,count:[...stages.values()].find(v=>v.scene===s).count})),
 convertedOriginalChoices:shown.size,reachableStatesWith5OrMore:over4.length,over4,
 legacyOver4:[...historical.values()],legacyOverFourStates:historical.size,failures:failed,
 decisionConstraint:failed.length?'BLOCKED':'STRICT_REAL_DECISIONS_MAX_4_PASS',
 additionalChecks:'run test-v413-intents.mjs and native test-v45-browser.py / test-v45-route.py; UI-only groups do not count as first-stage narrative decisions'};
fs.writeFileSync(new URL('qa/current/r42-choice-count-audit.json',root),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({status:report.status,originalChoices:report.observedChoices,stagedScenes:report.stagedScenes,stagedWitnessOptions:report.convertedOriginalChoices,strictOver4:over4.length,historicalOver4:historical.size,failures:failed.slice(0,4)}));
if(failed.length)process.exitCode=1;
