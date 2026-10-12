/* Differential exploration uses ONLY replayed command prefixes and enabled choices. */
import fs from 'node:fs';
import crypto from 'node:crypto';
import {createState,choose,renderScene,availableActions,replay,condition,active,VERSION} from './engine.mjs';
import {data as d,root,base,defaultAction} from './route-runner.mjs';
const input=JSON.parse(fs.readFileSync(new URL('qa/current/witnesses.json',root)));
const extra=JSON.parse(fs.readFileSync(new URL('qa/current/information-witnesses.json',root)));input.witnesses.push(...extra.witnesses);
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(new URL(p,root))).digest('hex');
const report={version:VERSION,scope:'Legal-command single-choice mutations and seeded random inputs; reachability/consistency only, not story quality or exhaustive path proof',hashes:{story:sha('data/STORY.json'),engine:sha('tools/engine.mjs')},failures:[],runs:0,seeds:80,mutationLimit:900};
const covered=new Map(),pending=new Map(),conditions=new Map(),scenes=new Set(),endingSet=new Set(),newWitnesses=[];
const allChoices=Object.values(d.scenes).flatMap(s=>s.choices.map(o=>s.id+'/'+o.id));
function observe(s,v){
 scenes.add(s.current);
 const sc=d.scenes[s.current];
 const record=(key,q)=>{if(!q)return;const x=conditions.get(key)||{true:0,false:0};x[condition(s,q)?'true':'false']++;conditions.set(key,x);};
 if(sc){(sc.blocks||[]).forEach((b,i)=>record(sc.id+'/blocks/'+i,b.when));for(const o of sc.choices){record(sc.id+'/'+o.id+'/when',o.when);(o.replyBlocks||[]).forEach((b,i)=>record(sc.id+'/'+o.id+'/replyBlocks/'+i,b.when));}}
 for(const o of v.choices.filter(o=>o.enabled)){
  const key=s.current+'/'+o.id;
  if(s.current==='@schedule'&& !o.id.startsWith('encounter:'))continue;
  if(!covered.has(key)&&(!pending.has(key)||pending.get(key).length>s.history.length+1))pending.set(key,[...s.history,{from:s.current,id:o.id,revision:s.revision}]);
 }
}
function consumed(s,id){const k=s.current+'/'+id;if(!covered.has(k))covered.set(k,{prefix:[...s.history,{from:s.current,id,revision:s.revision}],run:report.runs});pending.delete(k);}
function step(s,id){const before=JSON.stringify(s);const out=choose(s,d,id);if(JSON.stringify(s)!==before)throw Error('Input mutation');consumed(s,id);return out.state;}
function fallback(s,opts,cs){
 if(s.current==='@schedule'){
  const selected=defaultAction(s,{chars:cs,repair:true,correctSource:true});return opts.find(o=>o.id===selected)?.id||opts[0].id;
 }
 const id=s.current;
 let target=base[id];
 if(id==='COLD')target=cs[0]||'self';
 if(id.startsWith('OP_TALK'))target=id.endsWith('self')?'credit':'flirt';
 if(id.startsWith('OP_SECRET'))target='truth';
 if(id==='OP_RIVAL')target='own';
 if(id.startsWith('OP_CHECK'))target='present';
 if(id.startsWith('OP_DATE'))target='attend';
 if(id==='OP_SELF')target='take';
 if(id.startsWith('OP_WORK'))target=id.endsWith('free')?'plan':'do';
 if(/^[tslg]03$/.test(id)||id.startsWith('REOPEN'))target='open';
 if(id.startsWith('Q_'))target='together';
 if(id.startsWith('R1_'))target='own';if(id.startsWith('RA_'))target='act';if(id.startsWith('R2_'))target='open';
 if(id.startsWith('OPEN_CLEAR'))target='correct';
 if(id.startsWith('DUE_'))target='truth';if(id.startsWith('CROSS')||id.startsWith('FOUND'))target='admit';
 if(/^H_.*_ASK_/.test(id))target='ask';else if(id.startsWith('H_')&&id.endsWith('_TALK'))target='tell';else if(id.startsWith('H_'))target='all';
 return opts.find(o=>o.id===target)?.id||opts[0].id;
}
function run(prefix,seed=0){
 report.runs++;let s=createState();const startCount=covered.size;let rng=seed||1;
 const random=()=>{rng=(Math.imul(1664525,rng)+1013904223)>>>0;return rng/4294967296;};
 let cs=seed?['t','s','l','g'].filter(()=>random()>.4):[];
 try{
  for(const cmd of prefix){const v=renderScene(s,d);observe(s,v);if(s.current!==cmd.from)throw Error('Prefix from mismatch');s=step(s,cmd.id);}
  if(!seed){cs=active(s);if(!cs.length)cs=['t','s','l','g'].filter(c=>s.f['pursued_'+c]);if(!cs.length)cs=['t'];}
  while(!s.complete&&s.history.length<550){
   const v=renderScene(s,d);observe(s,v);const opts=v.choices.filter(o=>o.enabled);if(!opts.length)throw Error('No enabled input at '+s.current);
   const id=seed&&random()<.33?opts[Math.floor(random()*opts.length)].id:fallback(s,opts,cs);
   s=step(s,id);
  }
  if(!s.complete)throw Error('Nonterminal bound');
  endingSet.add(s.ending);
  if(covered.size>startCount)newWitnesses.push({name:'explore_'+report.runs,ending:s.ending,commands:s.history});
 }catch(e){report.failures.push({run:report.runs,seed,error:e.message,commands:s.history,current:s.current,prefix});}
}
// Replay each curated witness verbatim, rather than hydrating its saved state.
for(const w of input.witnesses)run(w.commands);
for(let i=1;i<=report.seeds;i++)run([],i*7919);
let mutations=0;
while(pending.size&&mutations<report.mutationLimit){const [key,prefix]=pending.entries().next().value;pending.delete(key);if(covered.has(key))continue;run(prefix);mutations++;}
report.mutations=mutations;report.coveredChoices=allChoices.filter(k=>covered.has(k)).length;
report.totalChoices=allChoices.length;report.uncoveredChoices=allChoices.filter(k=>!covered.has(k));
report.coveredScenes=scenes.size-(scenes.has('@schedule')?1:0);report.totalScenes=Object.keys(d.scenes).length;
report.endings=[...endingSet].sort();report.conditionalCoverage=Object.fromEntries(conditions);report.status=report.failures.length?'FAIL':'PASS_WITH_COVERAGE_LIMITS';
fs.writeFileSync(new URL('qa/current/exploration.json',root),JSON.stringify(report,null,2));
fs.writeFileSync(new URL('qa/current/exploration-witnesses.json',root),JSON.stringify({hashes:report.hashes,witnesses:newWitnesses},null,2));
fs.writeFileSync(new URL('qa/current/choice-witness-prefixes.json',root),JSON.stringify({hashes:report.hashes,choices:Object.fromEntries([...covered].filter(([k])=>!k.startsWith('@')))},null,2));
console.log(JSON.stringify({runs:report.runs,mutations,coveredChoices:report.coveredChoices,totalChoices:report.totalChoices,coveredScenes:report.coveredScenes,failures:report.failures.length,uncovered:report.uncoveredChoices},null,2));
if(report.failures.length)process.exitCode=1;
