/** v4.12: assert actual relationship choice replies differ by person and pair. */
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {verifiedV414} from './v414-baseline.mjs';
const R=new URL('../',import.meta.url);
const read=p=>fs.readFileSync(new URL(p,R),'utf8');
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const text=read('data/STORY.json'),D=JSON.parse(text),p=JSON.parse(read('patch/v412_reaction_copy.json'));
assert.equal(sha(text),JSON.parse(read('patch/v416_first_night_edits.json')).newStorySha256);
const v413=JSON.parse(read('patch/v413_decision_steps.json'));assert.equal(v413.baseStorySha256,p.newStorySha256);
assert.deepEqual(p.counts,{beats:56,scenes:26,crossEnd:12,pairSlow:18,pairSeparate:18,reopenWait:4,repairDelay:4});
const seen=new Set();
for(const ch of p.changes){
 const s=D.scenes[ch.scene],c=s?.choices.find(x=>x.id===ch.choice),b=c?.reply[ch.index];
 assert(b && b.id===ch.id && b.speaker===ch.speaker,ch.id);
 assert(!seen.has(ch.id),'duplicate revised beat '+ch.id);seen.add(ch.id);
 assert.equal(b.text,ch.after);assert.equal(b.textHash,sha(b.speaker+'\0'+b.text).slice(0,16));
 assert.equal(ch.beforeTextHash,sha(ch.speaker+'\0'+ch.before).slice(0,16));
}
assert.equal(seen.size,56);
const distinct=a=>new Set(a).size===a.length;
const cross=[];
for(const a of 'tslg')for(const b of 'tslg'){
 if(a===b)continue;
 const c=D.scenes['CROSS_'+a+'_'+b].choices.find(x=>x.id==='end');
 assert(c.effects.some(e=>e.op==='endRelationship'&&e.character===a));
 cross.push(c.reply[1].text);
}
assert(distinct(cross),'crossed endings still use copied replies');
for(const id of ['slow','separate'])for(const i of [1,2,3]){
 const lines=['st','lt','gt','ls','gs','gl'].map(pair=>D.scenes['Q_'+pair].choices.find(c=>c.id===id).reply[i].text);
 assert(distinct(lines),'pair '+id+' row '+i+' reused boilerplate');
}
for(const c of 'tslg'){
 assert.notEqual(D.scenes['REOPEN_'+c].choices.find(x=>x.id==='wait').reply[0].text,'好。那今天先好好相处，不急着给它起名字。');
 assert.notEqual(D.scenes['RA_'+c].choices.find(x=>x.id==='delay').reply[0].text,'那就先不谈复合。什么时候真的做了，再说。');
}
assert.equal(Object.keys(D.scenes).length,228);
assert.equal(Object.values(D.scenes).flatMap(s=>s.choices).length,751);
assert.equal(Object.values(D.scenes).filter(s=>s.kind==='ending').length,24);
assert.equal(D.scenes.ENTRY_WAKE.body.length,28);
console.log('PASS v4.12: 56 varied genuine post-choice replies, 26 scenes, stable 228/751/24/28 structure');
