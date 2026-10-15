/** Source-level continuity and character-voice regression for v4.10.
 * This is an objective code guard; not a substitute for a real player review. */
import assert from 'node:assert/strict';
import {verifiedV414} from './v414-baseline.mjs';
import fs from 'node:fs';
import crypto from 'node:crypto';
const R=new URL('../',import.meta.url);
const read=p=>fs.readFileSync(new URL(p,R),'utf8');
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const canonical=read('data/STORY.json');
const D=JSON.parse(canonical);
const patch=JSON.parse(read('patch/v410_scene_polish.json'));
const next=JSON.parse(read('patch/v411_dialogue_pov.json'));
const newest=JSON.parse(read('patch/v412_reaction_copy.json'));
assert.equal(JSON.parse(read('patch/v413_decision_steps.json')).baseStorySha256,newest.newStorySha256);
assert.equal(hash(canonical),verifiedV414().patch.newStorySha256);
assert.equal(newest.baseStorySha256,next.newStorySha256);
assert.equal(next.baseStorySha256,patch.newStorySha256);
assert.deepEqual(patch.counts,{total:47,scenesTouched:19,cancelledVenue:3,groupWaitSpoken:16,groupWaitNarrator:16,groupAskNarrator:12});
assert.equal(Object.keys(D.scenes).length,228);
assert.equal(Object.values(D.scenes).flatMap(s=>s.choices).length,751);
assert.equal(Object.values(D.scenes).filter(s=>s.kind==='ending').length,24);
assert.equal(D.scenes.ENTRY_WAKE.body.length,28);
assert.deepEqual(D.scenes.ENTRY_WAKE.choices.map(x=>x.id),['canon','rescue','investigate']);
const seen=new Set();
for(const ch of patch.changes){
 const key=ch.scene+'/'+ch.choice+'/'+ch.id;
 assert(!seen.has(key),'duplicate revised text '+key);seen.add(key);
 const scene=D.scenes[ch.scene];assert(scene,'missing '+ch.scene);
 const choice=scene.choices.find(x=>x.id===ch.choice);
 const row=choice?.reply.find(x=>x.id===ch.id);
 assert(row,'missing '+key);
 assert.equal(row.speaker,ch.speaker);
 assert.equal(row.text,ch.after);
 assert.equal(row.textHash,hash(row.speaker+'\0'+row.text).slice(0,16));
 assert.equal(ch.beforeTextHash,hash(ch.speaker+'\0'+ch.before).slice(0,16));
}
assert.equal(seen.size,47);
for(const [hero,correct] of [['s','旁厅'],['l','剪辑室'],['g','面馆']]){
 const option=D.scenes['OP_DATE_'+hero].choices.find(x=>x.id==='respect');
 assert(option.when,'lost cancellation guard '+hero);
 assert(option.reply[0].text.includes(correct),'wrong destination '+hero);
 assert(!option.reply[0].text.includes('录音室'),'foreign scene leaked '+hero);
}
let consentCount=0;
for(const [id,s] of Object.entries(D.scenes)){
 if(!/^H_(gls|glt|gst|lst|glst)_ASK_[glst]$/.test(id))continue;
 const wait=s.choices.find(x=>x.id==='wait'),yes=s.choices.find(x=>x.id==='ask');
 assert(wait&&yes&&wait.effects.some(x=>x.op==='groupVote'),'group decision damaged '+id);
 assert.notEqual(wait.reply[0].text,'好，那这部分先不定。以后想再谈，重新约我.');
 assert.notEqual(wait.reply[1].text,'你确认了她的意思，没有把一次同桌见面算成同意。');
 consentCount++;
}
assert.equal(consentCount,16);
console.log('PASS v4.10 47 exact beats / 19 scenes / 3 locations / 16 multi-person choice scenes; no altered counts');
