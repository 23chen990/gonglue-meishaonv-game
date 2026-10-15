/** v4.15 exact editorial scope; no player-retention claim. */
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(new URL(p,import.meta.url),'utf8'));
const s=read('../data/STORY.json'), p=read('../patch/v415_first_night_edits.json'),plan=read('../patch/v415_first_night_plan.json'), successor=read('../patch/v416_first_night_edits.json');
const H=x=>crypto.createHash('sha256').update(x).digest('hex');
const hash=b=>H(b.speaker+'\0'+b.text).slice(0,16);
assert.equal(H(fs.readFileSync(new URL('../data/STORY.json',import.meta.url))),successor.newStorySha256);
assert.deepEqual(p.counts,{beats:24,scenes:10});
assert.equal(p.baseStorySha256,plan.baseStorySha256);
assert.equal(Object.keys(s.scenes).length,228);
assert.equal(Object.values(s.scenes).flatMap(x=>x.choices).length,751);
assert.equal(Object.values(s.scenes).filter(x=>x.kind==='ending').length,24);
assert.equal(s.scenes.ENTRY_WAKE.body.length,28);
assert.equal(Object.values(s.scenes).filter(x=>x.decisionSteps?.length).length,16);
assert.equal(s.scenes.ENTRY_WAKE.choices.map(x=>x.id).join(','),'canon,rescue,investigate');
assert.equal(p.changes.length,24);
const seen=new Set();
for(const c of p.changes){
 assert(!seen.has(c.id),'duplicate '+c.id);seen.add(c.id);
 const scene=s.scenes[c.scene];
 const row=(c.location==='body'?scene.body:scene.choices.find(x=>x.id===c.choice).reply).find(x=>x.id===c.id);
 assert(row&&row.speaker===c.speaker&&row.text===c.after&&row.textHash===c.afterHash&&hash(row)===row.textHash,c.id);
 assert(plan.changes.find(x=>x.id===c.id).text===row.text,c.id);
}
const beat=(scene,id)=>s.scenes[scene].body.find(x=>x.id===id).text;
assert(beat('OP_FORK','OP_FORK.r42.body.002').includes('没来得及截图'));
assert(beat('ENTRY_MEMORY','ENTRY_MEMORY.r42.body.003').includes('还不能知道是谁'));
assert(beat('OP_SETTLE','OP_SETTLE.r4.body.002').includes('怎么回去'));
const witness=s.scenes.A1b.choices.find(x=>x.id==='ask').reply[0].text;
assert(witness.includes('我没见到')&&!witness.includes('不是许照导出'));
console.log(JSON.stringify({status:'PASS',storySha256:successor.newStorySha256,changes:24,scenes:10,oldActions:751,decisionPhases:16}));
