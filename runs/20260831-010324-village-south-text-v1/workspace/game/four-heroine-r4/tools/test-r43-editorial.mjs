import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const base=new URL('../',import.meta.url);
const d=JSON.parse(fs.readFileSync(new URL('data/STORY.json',base),'utf8'));
const ui=fs.readFileSync(new URL('tools/preview-ui.js',base),'utf8');
const intro=d.scenes.ENTRY_WAKE;
assert.equal(d.version,'revision-r4.3');
assert.equal(intro.body.length,28,'mandatory physical transmigration remains complete');
assert.deepEqual(intro.choices.map(c=>c.id),['canon','rescue','investigate']);
const firstCanonRecall=intro.body.find(b=>b.id==='ENTRY_WAKE.intro.016');
assert.ok(firstCanonRecall&&firstCanonRecall.speaker==='B'&&/我记得|原著/.test(firstCanonRecall.text)&&firstCanonRecall.text.includes('陆景行'),'first-person knowledge of book must be in character');
assert.ok(intro.body.some(b=>b.text.includes('第十三章')&&b.text.includes('清退')),'opening must reveal the original expulsion');
assert.ok(intro.body.some(b=>b.text.includes('第七天')&&b.text.includes('炮灰')),'identity recognition must carry a seven-day deadline');
assert.ok(intro.body.some(b=>b.text.includes('听程放的话')));
assert.ok(ui.includes("b.speaker==='B'?'thought'"));
assert.ok(ui.includes("if(!cp.last){"));
assert.ok(!ui.includes('first-fork-facts" aria-label'));
assert.ok(ui.includes('穿书经过 · 主线必读'));
const expected=Object.keys(d.scenes);
assert.equal(expected.length,228);
let checks=0;
for(const scene of Object.values(d.scenes)){
 const groups=[scene.body||[],...(scene.blocks||[]).map(b=>b.lines||[])];
 for(const c of scene.choices||[]){groups.push(c.reply||[]);for(const b of c.replyBlocks||[])groups.push(b.lines||[])}
 for(const group of groups)for(const b of group){
  if(!b?.textHash)continue;
  const h=crypto.createHash('sha256').update(b.speaker+'\0'+b.text).digest('hex').slice(0,16);
  assert.equal(h,b.textHash,b.id);checks++;
 }
}
console.log(JSON.stringify({status:'PASS',introBeats:28,openingChoices:3,hashes:checks,unboxedOriginalMemory:true}));
