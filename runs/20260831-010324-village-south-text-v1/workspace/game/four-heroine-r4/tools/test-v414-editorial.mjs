/** v4.14 audited first-night editorial changes (not perceptual or device QA). */
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {verifiedV414} from './v414-baseline.mjs';
const {latest,legacy,patch,currentHash}=verifiedV414();
const scenes=Object.values(latest.scenes);
assert.equal(scenes.length,228);
assert.equal(scenes.flatMap(s=>s.choices).length,751);
assert.equal(scenes.filter(s=>s.kind==='ending').length,24);
assert.equal(latest.scenes.ENTRY_WAKE.body.length,28);
assert.deepEqual(latest.scenes.ENTRY_WAKE.choices.map(c=>c.id),['canon','rescue','investigate']);
const editedIds=new Set(patch.changes.map(c=>c.id));
assert.equal(editedIds.size,31);
assert.equal(new Set(patch.changes.map(c=>c.scene)).size,8);
const H=b=>crypto.createHash('sha256').update(b.speaker+'\0'+b.text).digest('hex').slice(0,16);
for(const scene of scenes){
 const rows=[...(scene.body||[]),...(scene.blocks||[]).flatMap(b=>b.lines||[]),
  ...(scene.choices||[]).flatMap(o=>[...(o.reply||[]),...(o.replyBlocks||[]).flatMap(b=>b.lines||[])])];
 for(const b of rows)assert.equal(b.textHash,H(b),'text hash mismatch '+b.id);
 for(const group of scene.decisionSteps||[])for(const b of [...group.reply,...group.after])
  assert.equal(b.textHash,H(b),'intent beat hash mismatch '+b.id);
}
const intro=latest.scenes.ENTRY_WAKE.body;
const beat=id=>intro.find(b=>b.id===id)?.text||'';
assert(beat('ENTRY_WAKE.intro.001').includes('第十三章')&&beat('ENTRY_WAKE.intro.001').includes('清退'));
assert(beat('ENTRY_WAKE.intro.016').includes('我记得')&&beat('ENTRY_WAKE.intro.016').includes('陆景行'));
assert(beat('ENTRY_WAKE.intro.025').includes('第七天')&&beat('ENTRY_WAKE.intro.025').includes('炮灰'));
assert(beat('ENTRY_WAKE.intro.028').includes('只剩几个呼吸'));
assert(latest.scenes.OP_TALK_l.body.find(b=>b.id==='OP_TALK_l.r4.body.004').text.startsWith('那就先不拍你'));
assert(!latest.scenes.OP_TALK_g.body.find(b=>b.id==='OP_TALK_g.r4.body.002').text.includes('质问'));
for(const c of patch.changes){
 const after=latest.scenes[c.scene].body.find(b=>b.id===c.id);
 const before=legacy.scenes[c.scene].body.find(b=>b.id===c.id);
 assert.equal(after.text,c.after);assert.equal(before.text,c.before);
}
console.log(JSON.stringify({status:'PASS',storySha256:currentHash,modifiedBeats:31,modifiedScenes:8,
 originalChoices:751,originalEndings:24,originalOpeningBeats:28,scope:'authored text only; not human retention or real phone QA'}));

