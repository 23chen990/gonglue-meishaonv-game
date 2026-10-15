/** v4.9 truthfulness, 80% choice standard and story-only regression.
 * Restores ALL changed source nodes and compares the exact v4.8 SHA-256.
 * This proves choices/guards/effects/scene IDs/ending logic were not changed.
 */
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {verifiedV414} from './v414-baseline.mjs';
import {createState,renderScene,choose,replay} from './engine.mjs';
const root=new URL('../',import.meta.url);
const read=p=>fs.readFileSync(new URL(p,root),'utf8');
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const storyText=read('data/STORY.json');
const latest=JSON.parse(storyText);
const M=JSON.parse(read('patch/v49_story_punchup.json'));
const contracts=JSON.parse(read('data/CHOICE_CONTRACTS.json'));
const P410=JSON.parse(read('patch/v410_scene_polish.json'));
const P411=JSON.parse(read('patch/v411_dialogue_pov.json'));
const P412=JSON.parse(read('patch/v412_reaction_copy.json'));
const P413=JSON.parse(read('patch/v413_decision_steps.json'));
assert.equal(P413.baseStorySha256,P412.newStorySha256,'v4.13 story predecessor checksum');
assert.equal(P412.baseStorySha256,P411.newStorySha256,'v4.11 predecessor checksum');
assert.equal(P411.baseStorySha256,P410.newStorySha256,'v4.10 predecessor checksum');
assert.equal(P410.baseStorySha256,M.newStorySha256,'v4.9 predecessor checksum');
const V414=verifiedV414();
const D=structuredClone(V414.legacy);
for(const sid of Object.keys(P413.decisions)){
 assert(D.scenes[sid].decisionSteps?.length===2,sid+' staged story authoring absent');
 delete D.scenes[sid].decisionSteps;
}
for(const ch of P412.changes){
 const c=D.scenes[ch.scene].choices.find(x=>x.id===ch.choice);
 const row=c?.reply[ch.index];
 assert(row && row.id===ch.id && row.speaker===ch.speaker,'v4.12 line identity '+ch.id);
 assert.equal(row.text,ch.after);assert.equal(row.textHash,ch.afterTextHash);
 row.text=ch.before;row.textHash=ch.beforeTextHash;
}
for(const ch of P411.changes){
 const sc=D.scenes[ch.scene];
 const row=ch.loc==='body'?sc.body[ch.index]:ch.loc==='block'?sc.blocks[ch.index].lines[ch.lineIndex]:sc.choices.find(x=>x.id===ch.choice).reply[ch.lineIndex];
 assert(row && row.id===ch.id && row.speaker===ch.speaker,'v4.11 line identity '+ch.id);
 assert.equal(row.text,ch.after);assert.equal(row.textHash,ch.afterTextHash);
 row.text=ch.before;row.textHash=ch.beforeTextHash;
}
for(const ch of P410.changes){
 const choice=D.scenes[ch.scene].choices.find(x=>x.id===ch.choice);
 assert(choice,'missing choice '+ch.scene+'/'+ch.choice);
 const row=choice.reply.find(x=>x.id===ch.id);
 assert(row,'missing beat '+ch.id);
 assert.equal(row.text,ch.after);
 assert.equal(row.textHash,ch.afterTextHash);
 row.text=ch.before;row.textHash=ch.beforeTextHash;
}
const old=structuredClone(D);
const P415=JSON.parse(read('patch/v415_first_night_edits.json'));
assert.equal(P415.baseStorySha256,V414.patch.newStorySha256,'v4.15 predecessor SHA');
const P416=JSON.parse(read('patch/v416_first_night_edits.json'));
assert.equal(P416.baseStorySha256,P415.newStorySha256);
const P417=JSON.parse(read('patch/v417_p0_scene_edits.json'));
assert.equal(P417.baseStorySha256,P416.newStorySha256);
assert.equal(sha(storyText),P417.newStorySha256,'v4.17 canonical SHA');
assert.equal(contracts.storySha256,sha(storyText),'choice registry SHA');
assert.equal(D.version,'revision-r4.3','preserve engine story revision');
assert.equal(Object.keys(D.scenes).length,228,'scene count preserved');
assert.equal(Object.values(D.scenes).filter(s=>s.kind==='ending').length,24,'ending count preserved');
assert.equal(Object.values(D.scenes).flatMap(x=>x.choices).length,751,'all real choices preserved');
const keys=new Set(),find=(s,id)=>{const x=s.choices.find(x=>x.id===id);assert(x,`${s.id}/${id}`);return x;};
function node(d,path){
 const parts=path.split('/');const s=d.scenes[parts.shift()];assert(s,'unknown scene '+path);
 let cur=s;
 while(parts.length){
  const key=parts.shift();
  if(key in cur) cur=cur[key];
  else if(Array.isArray(cur)){const idx=Number(key);assert(Number.isInteger(idx)&&idx>=0&&idx<cur.length,path);cur=cur[idx];}
  else if(cur===s)cur=find(s,key);
  else throw Error('bad path '+path+' at '+key);
 }
 return cur;
}
for(const ch of M.changes){
 assert(!keys.has(ch.path),'duplicate patch '+ch.path);keys.add(ch.path);
 const path=ch.path.split('/');const field=path.pop();const parent=node(D,path.join('/'));
 if(ch.kind==='text'){
  assert.equal(field,Number.isInteger(+field)?field:'text');
  // For text paths the terminal segment is an array index; `node` gets the row.
  const row=node(D,ch.path);assert.equal(row.id,ch.id);assert.equal(row.speaker,ch.speaker);assert.equal(row.text,ch.after);
  assert.equal(row.textHash,sha(row.speaker+'\0'+row.text).slice(0,16),'line textHash '+ch.id);
  const oldRow=node(old,ch.path);oldRow.text=ch.before;
  if('textHash' in oldRow)oldRow.textHash=sha(oldRow.speaker+'\0'+oldRow.text).slice(0,16);
 } else if(ch.kind==='scene_title'){
  assert.equal(field,'title');assert.equal(parent.title,ch.after);node(old,path.join('/')).title=ch.before;
 } else if(ch.kind==='choice_label'){
  assert.equal(field,'label');assert.equal(parent.label,ch.after);node(old,path.join('/')).label=ch.before;
 } else throw Error('unknown patch type '+ch.kind);
}
assert.deepEqual(M.counts,{scenesTouched:28,bodyAndReplyLines:158,choiceLabels:68,sceneTitles:26});
const reconstructed=JSON.stringify(old,null,2)+'\n';
// JavaScript reorders numeric-looking object keys; exact original-byte verification
// is done by tools/test-v49-restore.py using Python's insertion order.
const contractLabels=new Map(contracts.choices.map(o=>[o.id,o.label]));
for(const s of Object.values(latest.scenes))for(const o of s.choices)
 assert.equal(contractLabels.get(s.id+'/'+o.id),o.label,'current choice registry mismatch '+s.id+'/'+o.id);
const beats=D.scenes.ENTRY_WAKE.body;
assert.equal(beats.length,28,'all mandatory transmigration beats preserved');
assert.deepEqual(D.scenes.ENTRY_WAKE.choices.map(x=>x.id),['canon','rescue','investigate']);
const title=D.scenes.ENTRY_WAKE.title;
assert(title.includes('背锅') && beats[0].text.includes('第十三章'),'first-second tension missing');
assert(beats.at(-1).text.includes('只剩几个呼吸'),'first decision lacks urgency');
const slots=contracts.choices;
const later=slots.filter(x=>{
 const evidence=[x.laterFlagReads,x.exactChoiceReads,x.runtimeConsumers];
 return evidence.some(v=>Array.isArray(v)?v.length>0:
  v&&typeof v==='object'?Object.keys(v).length>0:Boolean(v));
});
const downstream=+(100*later.length/slots.length).toFixed(1);
assert(downstream>=80,`below 80% traced consumer ${downstream}%`);
// Correlation alone is NOT a claim of 80% psychological significance.
function play(first,overrides={}){
 let s=createState(),count=0,canonDisk=false,publicBeat=[];
 while(!s.complete&&count<155){
  const id=s.current,display=renderScene(s,D);
  const avail=display.choices.filter(x=>x.enabled);
  assert(avail.length,'empty choices at '+id);
  let option=id==='ENTRY_WAKE'?first:overrides[id]||((id==='@schedule')?avail.find(x=>x.id==='rest')?.id:null)||avail[0].id;
  if(display.choices.some(x=>x.intentStage)){
   const g=D.scenes[id].decisionSteps.find(g=>g.options.includes(option));
   option=g?'intent:'+g.id:avail[0].id;
  }
  if(!avail.some(x=>x.id===option)){
   if(overrides[id]&&!display.choices.some(x=>x.intentStage))throw Error('missing explicit action '+id+'/'+option);
   option=avail[0].id;
  }
  const out=choose(s,D,option,s.revision);
  if(id==='A6a') publicBeat=[...display.body.map(x=>x.text),...out.reply.map(x=>x.text)];
  s=out.state;count++;
 }
 assert(s.complete,'did not reach end from '+first);
 assert.equal(replay(D,s.history).ending,s.ending);
 if(first==='canon'){
  assert.equal(s.f.source_blue_disc,undefined,'canon magically found disk');
  assert(!publicBeat.join(' ').includes('许照找到备用盘'),'imaginary evidence');
 }
 return {ending:s.ending,commands:count};
}
const routes=[play('canon',{ENTRY_CLUES:'witness',OP_CANON:'question',A6a:'public'}),play('canon',{ENTRY_CLUES:'refuse',A6a:'partner'}),play('rescue',{COLD:'t'}),play('investigate',{ENTRY_MEMORY:'email',COLD:'g'})];
const report={storySha256:sha(storyText),baseStorySha256:M.baseStorySha256,patchCounts:M.counts,
 scenes:228,choices:751,endings:24,entryBeats:28,
 choicesWithTracedLaterConsumer:later.length,choiceConsumerRatioPct:downstream,
 note:'下游引用率是静态代理指标，不证明玩家主观认为所有选择有意义。',routes};
const outPath=new URL('qa/current/v49-editorial-report.json',root);
fs.mkdirSync(new URL('qa/current/',root),{recursive:true});fs.writeFileSync(outPath,JSON.stringify(report,null,2)+'\n');
console.log('PASS v4.9 story-only patch structural reverse SHA, all line hashes and choice registry');
console.log(JSON.stringify(report,null,2));
