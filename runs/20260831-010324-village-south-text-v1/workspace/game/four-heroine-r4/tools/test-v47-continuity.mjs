/** v4.7 source-of-truth continuity regression (no external dependencies).
 * Uses the actual command interpreter, not a fabricated mock story or screen text.
 */
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {createState,renderScene,choose,replay} from './engine.mjs';
const root = new URL('../', import.meta.url);
const DATA = JSON.parse(fs.readFileSync(new URL('data/STORY.json',root),'utf8'));
const patch = JSON.parse(fs.readFileSync(new URL('patch/v47_canon_continuity.json',root),'utf8'));
const contracts = JSON.parse(fs.readFileSync(new URL('data/CHOICE_CONTRACTS.json',root),'utf8'));
const sha = crypto.createHash('sha256').update(fs.readFileSync(new URL('data/STORY.json',root))).digest('hex');
const v49=JSON.parse(fs.readFileSync(new URL('patch/v49_story_punchup.json',root),'utf8'));
const v410=JSON.parse(fs.readFileSync(new URL('patch/v410_scene_polish.json',root),'utf8'));
assert.equal(patch.newStorySha256,v49.baseStorySha256,'v4.7 baseline must be preserved');
assert.equal(v49.newStorySha256,v410.baseStorySha256,'v4.9 baseline must be preserved');
const v411=JSON.parse(fs.readFileSync(new URL('patch/v411_dialogue_pov.json',root),'utf8'));
assert.equal(v410.newStorySha256,v411.baseStorySha256,'v4.10 predecessor must match');
const v412=JSON.parse(fs.readFileSync(new URL('patch/v412_reaction_copy.json',root),'utf8'));
assert.equal(v411.newStorySha256,v412.baseStorySha256,'v4.11 baseline linkage');
assert.equal(sha,v412.newStorySha256,'v4.12 current story');
assert.equal(sha,contracts.storySha256);
assert.equal(Object.keys(DATA.scenes).length,228);
assert.equal(Object.values(DATA.scenes).flatMap(x=>x.choices||[]).length,751);
assert.equal(patch.changes.length,9);
for(const e of patch.changes){
  assert(!e.after.includes('许照醒来后找到备用盘'),'canon-specific false claim');
  const s=DATA.scenes[e.scene]; assert(s, e.scene);
  const text=JSON.stringify(s);
  assert(text.includes(e.after),`${e.lineId}: revised text missing`);
  assert(!text.includes(e.before),`${e.lineId}: old text still present`);
  const idmatch = JSON.stringify(s).match(new RegExp(`"id":"${e.lineId.replaceAll('.','\\.')}"`));
  assert(idmatch,`missing stable line ID ${e.lineId}`);
  const line = JSON.parse(JSON.stringify(s), (k,v)=>v); // tree scan to ensure speaker+text hash preserved
  let found;
  (function scan(node){if(!node||typeof node!=='object')return;if(node.id===e.lineId)found=node;for(const x of Object.values(node))scan(x)})(line);
  assert(found && found.text===e.after,`line changed unexpectedly ${e.lineId}`);
  assert.equal(found.textHash,crypto.createHash('sha256').update(found.speaker+'\0'+found.text).digest('hex').slice(0,16));
}
function run(first,overrides={}){
 let s=createState(),log=[],visited=new Set();
 for(let n=0;n<150;n++){
  if(s.complete){
   const again=replay(DATA,s.history);
   assert.equal(again.ending,s.ending);assert.equal(again.complete,true);
   return {state:s,log,visited};
  }
  const before=s.current,view=renderScene(s,DATA),choices=view.choices.filter(c=>c.enabled);
  assert(choices.length,`no enabled actions in ${before}`);
  let id=before==='ENTRY_WAKE'?first:overrides[before]||
   (before==='@schedule'?choices.find(c=>c.id==='rest')?.id:undefined)||choices[0].id;
  if(!choices.some(c=>c.id===id)){
   if(overrides[before])throw Error(`requested choice ${id} in ${before} inaccessible`);
   id=choices[0].id;
  }
  const result=choose(s,DATA,id,s.revision);
  log.push({scene:before,choice:id,body:view.body.map(x=>x.text),reply:result.reply.map(x=>x.text),flags:{...s.f}});
  visited.add(before);s=result.state;
 }
 throw Error('route exceeded 150 legitimate commands');
}
function must(route,scene,choice){
 const c=route.log.find(x=>x.scene===scene && (!choice||x.choice===choice));
 assert(c,`route did not visit ${scene}/${choice||'*'}`);return c;
}
const canon=run('canon',{ENTRY_CLUES:'witness',OP_CANON:'question',A1b:'check',A2b:'public',A4b:'witness',A6a:'public'});
assert.equal(canon.state.f.first,'canon');
assert.equal(canon.state.f.source_blue_disc,undefined);
for(const sid of ['A1b','A2b','A4b']){
 const stage=must(canon,sid); const output=stage.reply.join(' ');
 assert(!/我找到备用盘|许照醒来后找到备用盘|你只确认自己找盘/.test(output),`${sid}: false found-disk claim on canon path`);
}
must(canon,'A6a','public');
const witness=run('canon',{ENTRY_CLUES:'witness',OP_CANON:'question',A1b:'ask',A2b:'cooperate',A4b:'wait',A6a:'public'});
const last=must(witness,'A6a','public');
assert(last.reply.some(x=>x.includes('许照接手时版本已经不对')), 'witness-only evidence did not use source-true dialogue');
assert(!last.reply.some(x=>x.includes('许照找到备用盘')));
const changed=run('rescue',{COLD:'t'});
assert.equal(changed.state.f.first,'t');assert.equal(changed.state.f.source_blue_disc,true);
const investigation=run('investigate',{ENTRY_MEMORY:'camera',COLD:'l'});
assert.equal(investigation.state.f.first,'l');assert.equal(investigation.state.f.source_blue_disc,true);
console.log('PASS v4.7 causal text changes: 9 hash-matched lines, 228 scenes, 751 choices');
console.log('PASS actual replay to endings: canon',canon.log.length, 'witness-only',witness.log.length,'rescue',changed.log.length,'investigate',investigation.log.length);
