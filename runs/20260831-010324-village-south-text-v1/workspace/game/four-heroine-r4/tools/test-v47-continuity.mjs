/** v4.7 canonical continuity: actual interpreter replay, not UI-string mocks. */
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {createState,renderScene,choose,replay} from './engine.mjs';
const base=new URL('../',import.meta.url);
const load=p=>JSON.parse(fs.readFileSync(new URL(p,base),'utf8'));
const DATA=load('data/STORY.json'), patch=load('patch/v47_canon_continuity.json');
const contracts=load('data/CHOICE_CONTRACTS.json');
const sha=crypto.createHash('sha256').update(fs.readFileSync(new URL('data/STORY.json',base))).digest('hex');
assert.equal(patch.newStorySha256,sha);
assert.equal(contracts.storySha256,sha);
assert.equal(Object.keys(DATA.scenes).length,228);
assert.equal(Object.values(DATA.scenes).flatMap(x=>x.choices||[]).length,751);
assert.equal(patch.changes.length,9);
function find(x,id){
 if(!x||typeof x!=='object')return null;
 if(x.id===id)return x;
 for(const v of Object.values(x)){const result=find(v,id);if(result)return result;}
 return null;
}
for(const c of patch.changes){
 const line=find(DATA.scenes[c.scene],c.lineId);
 assert(line&&line.text===c.after,c.lineId+' patch missing');
 assert(!JSON.stringify(DATA.scenes[c.scene]).includes(c.before),c.lineId+' old text remains');
 assert.equal(line.textHash,crypto.createHash('sha256').update(line.speaker+'\0'+line.text).digest('hex').slice(0,16));
}
function route(first,choiceByScene={}){
 let s=createState(),log=[];
 for(let i=0;i<150&&!s.complete;i++){
  const scene=s.current, view=renderScene(s,DATA), choices=view.choices.filter(x=>x.enabled);
  assert(choices.length,'dead end '+scene);
  let id=scene==='ENTRY_WAKE'?first:choiceByScene[scene]||
   (scene==='@schedule'?choices.find(x=>x.id==='rest')?.id:null)||choices[0].id;
  if(!choices.some(x=>x.id===id)){
   assert(!choiceByScene[scene],'unavailable explicit action '+scene+'/'+id);
   id=choices[0].id;
  }
  const result=choose(s,DATA,id,s.revision);
  log.push({scene,id,reply:result.reply.map(x=>x.text)});
  s=result.state;
 }
 assert(s.complete,'route never completed');
 assert.equal(replay(DATA,s.history).ending,s.ending);
 return {s,log};
}
const canon=route('canon',{ENTRY_CLUES:'witness',OP_CANON:'question',A1b:'check',A2b:'public',A4b:'witness',A6a:'public'});
assert.equal(canon.s.f.source_blue_disc,undefined);
for(const sid of ['A1b','A2b','A4b']){
 const line=canon.log.find(x=>x.scene===sid); assert(line,'missing '+sid);
 assert(!/我找到备用盘|许照醒来后找到备用盘|你只确认自己找盘/.test(line.reply.join('')),sid+' wrong USB credit');
}
const witness=route('canon',{ENTRY_CLUES:'witness',OP_CANON:'question',A1b:'ask',A2b:'cooperate',A4b:'wait',A6a:'public'});
assert(witness.log.find(x=>x.scene==='A6a').reply.some(x=>x.includes('许照接手时版本已经不对')));
const rescue=route('rescue',{COLD:'t'}), investigate=route('investigate',{ENTRY_MEMORY:'camera',COLD:'l'});
assert.equal(rescue.s.f.source_blue_disc,true);
assert.equal(investigate.s.f.source_blue_disc,true);
console.log('PASS v4.7 continuity: 9 text hashes, 228 scenes, 751 choices, four real replayed endings');
