/** v4.11 dialogue POV, source hash and identity checks. Not a human perception test. */
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {verifiedV414} from './v414-baseline.mjs';
const R=new URL('../',import.meta.url);
const read=p=>fs.readFileSync(new URL(p,R),'utf8');
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const raw=read('data/STORY.json');
const v414=verifiedV414();
const data=v414.legacy, fresh=JSON.parse(raw),patch=JSON.parse(read('patch/v411_dialogue_pov.json'));
const newest=JSON.parse(read('patch/v412_reaction_copy.json'));
assert.equal(JSON.parse(read('patch/v413_decision_steps.json')).baseStorySha256,newest.newStorySha256);
assert.equal(sha(raw),JSON.parse(read('patch/v417_p0_scene_edits.json')).newStorySha256);
assert.equal(newest.baseStorySha256,patch.newStorySha256);
assert.deepEqual(patch.counts,{beats:11,scenes:9});
const locate=c=>{
 const s=data.scenes[c.scene];
 assert(s,'missing '+c.scene);
 return c.loc==='body'?s.body[c.index]:c.loc==='block'?s.blocks[c.index].lines[c.lineIndex]:
  s.choices.find(x=>x.id===c.choice)?.reply[c.lineIndex];
};
const seen=new Set();
for(const c of patch.changes){
 const b=locate(c);
 assert(b&&b.id===c.id&&b.speaker===c.speaker,c.id);
 assert(!seen.has(c.id),'duplicate '+c.id);seen.add(c.id);
 assert.equal(b.text,c.after);
 assert.equal(b.textHash,sha(b.speaker+'\0'+b.text).slice(0,16));
 assert.equal(c.beforeTextHash,sha(c.speaker+'\0'+c.before).slice(0,16));
}
assert.equal(seen.size,11);
const sus=[];
const cast=new Set(['T','S','L','G']);
const scan=(b,loc)=>{if(cast.has(b.speaker)&&/(?:她|见月|晚棠)(?:把|抬眼|按下|发来)/.test(b.text))sus.push(loc)};
for(const [id,s] of Object.entries(fresh.scenes)){
 s.body.forEach((b,i)=>scan(b,id+'/body/'+i));
 (s.blocks||[]).forEach((bl,i)=>bl.lines.forEach((b,j)=>scan(b,id+'/block/'+i+'/'+j)));
 s.choices.forEach(c=>{
  c.reply.forEach((b,i)=>scan(b,id+'/'+c.id+'/reply/'+i));
  (c.replyBlocks||[]).forEach((bl,i)=>bl.lines.forEach((b,j)=>scan(b,id+'/'+c.id+'/replyBlock/'+i+'/'+j)));
 });
}
assert.deepEqual(sus,[],'Third-person stage direction in heroine speech');
assert.equal(Object.keys(data.scenes).length,228);
assert.equal(Object.values(data.scenes).flatMap(s=>s.choices).length,751);
assert.equal(Object.values(data.scenes).filter(s=>s.kind==='ending').length,24);
assert.equal(data.scenes.ENTRY_WAKE.body.length,28);
console.log('PASS v4.11 11 revised narrative beats / 9 scenes / no heroine speaker POV contamination');
