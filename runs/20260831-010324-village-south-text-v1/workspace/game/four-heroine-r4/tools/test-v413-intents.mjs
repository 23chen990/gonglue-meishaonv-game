/** v4.13: all 16 real decisions have replayable emotional first stages.
 * Every original outcome remains a reachable, legally gated second-stage act.
 * Separate full-route and native HTTP tests cover actual UI events and storage.
 */
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {replay,renderScene,choose,rewind,TRUE_DECISION_SCENES} from './engine.mjs';
const root=new URL('../',import.meta.url);
const read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const data=read('data/STORY.json'), catalog=read('qa/current/choice-witness-prefixes.json').choices;
const legacy=read('qa/current/r42-choice-count-audit.json');
const targets=['A2a','A3a','A3b','t03','s03','l03','g03','A4a','A5a','A5b','A6a','LU_MOVE2','A7a','H_glst','EXEC_s','EXEC_l'];
assert.deepEqual(new Set(TRUE_DECISION_SCENES),new Set(targets));
let checked=0, alternatives=0, distinctResponses=0, noEvidenceCases=0;
const result={scope:'Normal-command replay of genuine v4.13 two-stage story choices, not a human review',scenes:[],originalAlternatives:0,attitudes:0,failed:[]};
for(const scene of targets){
 const samples=Object.entries(catalog).filter(([name])=>name.startsWith(scene+'/'));
 assert(samples.length,'missing real historical witness '+scene);
 let representative=null;
 for(const [,sample] of samples){
  const prefix=sample.prefix.slice(0,-1);
  const base=replay(data,prefix);
  assert.equal(base.current,scene);
  const actual=renderScene(base,data).choices.filter(o=>o.enabled);
  if(actual.length<5){noEvidenceCases++;continue;}
  const first=replay(data,prefix,{intentMode:true,legacyPrefixLength:prefix.length});
  assert.equal(first.current,scene);
  const view=renderScene(first,data);
  assert.equal(view.intentStep,1,scene+' should present an authored attitude');
  assert(view.choices.length>=2&&view.choices.length<=3);
  assert(view.choices.every(x=>x.id.startsWith('intent:')));
  const optionsSeen=new Set(),labels=new Set(),replies=new Set();
  for(const decision of view.choices){
   labels.add(decision.label);
   assert(decision.coveredChoices?.length>0);
   const step=choose(first,data,decision.id,first.revision);
   assert.equal(step.state.current,scene,'attitude must stay in current scene');
   assert.equal(step.state.slot,first.slot,'attitude cannot consume time');
   assert.deepEqual(step.state.f,first.f,'attitude cannot hallucinate evidence or relationship consent');
   assert(step.state.history.at(-1).id===decision.id);
   assert(step.reply.length>=2,'must acknowledge choice with actual authored feedback');
   assert(step.reply.some(x=>x.speaker!=='B'),'other character/world must answer the player');
   replies.add(step.reply.map(x=>x.text).join('|'));
   const second=renderScene(step.state,data);
   assert.equal(second.intentStep,2);
   const items=second.choices.filter(x=>x.enabled);
   assert(items.length>0&&items.length<=4,scene+' second-stage choice count');
   assert.deepEqual(new Set(items.map(x=>x.id)),new Set(decision.coveredChoices));
   assert(!second.body.some(x=>x.text===data.scenes[scene].body[0]?.text),'must not replay original body');
   for(const item of items){
    assert(!optionsSeen.has(item.id),'repeated original action '+scene+'/'+item.id);optionsSeen.add(item.id);
    const finished=choose(step.state,data,item.id,step.state.revision);
    const old=choose(base,data,item.id,base.revision);
    for(const prop of ['current','slot','stage','f','visited','apPending','ending','complete'])
     assert.deepEqual(finished.state[prop],old.state[prop],scene+'/'+item.id+' differs in '+prop);
    const repeated=replay(data,finished.state.history,{intentMode:true,legacyPrefixLength:prefix.length});
    assert.deepEqual(repeated,finished.state,scene+'/'+item.id+' history replay drift');
    assert.deepEqual(rewind(finished.state,data,prefix.length+1),step.state,'rewind should restore selected attitude');
    const back=rewind(finished.state,data,prefix.length);
    assert.equal(back.decisionIntent,null);
    assert.equal(renderScene(back,data).intentStep,1);
    alternatives++;
   }
   const other=actual.find(x=>!decision.coveredChoices.includes(x.id));
   if(other)assert.throws(()=>choose(step.state,data,other.id,step.state.revision),/不属于/);
   assert.throws(()=>choose(step.state,data,decision.id,step.state.revision),/Attitude already committed/);
  }
  assert.equal(labels.size,view.choices.length,'empty/repeated attitudes '+scene);
  assert.equal(replies.size,view.choices.length,'copied response '+scene);
  assert.deepEqual(optionsSeen,new Set(actual.map(x=>x.id)),'deleted/hidden original option '+scene);
  assert.throws(()=>choose(first,data,actual[0].id,first.revision),/先说清态度/);
  assert.throws(()=>choose(first,data,view.choices[0].id,first.revision+1),/Stale/);
  representative={scene,originalActions:actual.length,attitudes:view.choices.length,replay:prefix.length};
  break;
 }
 assert(representative,'could not reproduce target '+scene);
 checked++;distinctResponses+=representative.attitudes;result.scenes.push(representative);
}
assert.equal(checked,16);
assert(alternatives>=80,'missed original option coverage');
result.originalAlternatives=alternatives;result.attitudes=distinctResponses;
console.log('PASS v4.13: '+checked+' scenes, '+distinctResponses+' unique emotional attitudes, '+alternatives+' original real actions, state/replay/rewind/migration');
fs.writeFileSync(new URL('qa/current/v413-intent-report.json',root),JSON.stringify(result,null,2)+'\n');
