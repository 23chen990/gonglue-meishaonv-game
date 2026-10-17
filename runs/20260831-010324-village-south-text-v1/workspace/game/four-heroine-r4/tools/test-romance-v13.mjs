/** V13 personal episodes: exact origin, meaningful action, no state rewrites. */
import fs from 'node:fs';import assert from 'node:assert/strict';import crypto from 'node:crypto';
const base=new URL('../',import.meta.url);
const original=fs.readFileSync(new URL('data/STORY.json',base));
const data=JSON.parse(original.toString('utf8'));
const v13=JSON.parse(fs.readFileSync(new URL('tools/romance-v13-scenes.json',base),'utf8'));
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
assert.equal(v13.storyHash,sha(original),'only for this exact canonical game');
const expected=new Set(Array.from('tslg',c=>Array.from({length:10},(_,i)=>c+String(i+1).padStart(2,'0'))).flat().filter(x=>!x.endsWith('03')));
assert.deepEqual(new Set(Object.keys(v13.scenes)),expected,'all 36 untouched character episodes and nothing else');
let beats=0,choices=0,replies=0;
const allChoiceLabels=[];
for(const [id,editorial] of Object.entries(v13.scenes)){
 const scene=data.scenes[id];assert.ok(scene,id);
 assert.deepEqual(new Set(Object.keys(editorial.labels)),new Set(scene.choices.map(x=>x.id)),id+' choices must be complete');
 for(const [rowId,p] of Object.entries(editorial.beats)){
  const found=scene.body.find(r=>r.id===rowId);
  assert.ok(found,'missing body beat '+rowId);
  assert.equal(found.textHash,p.hash,'source changed '+rowId);
  assert.equal(found.speaker,p.speaker,'speaker changed '+rowId);
  assert.ok(p.text.length>=3&&p.text.length<=75&&p.text!==found.text,'edited text must be short and different '+rowId);
  assert.ok(!p.text.includes('玩家请选择')&&!p.text.includes('好感值'));
  beats++;
 }
 for(const [action,p] of Object.entries(editorial.labels)){
  const canon=scene.choices.find(x=>x.id===action);assert.ok(canon);
  assert.ok(p.label.length>=2&&p.label.length<=75&&p.label!==canon.label,'must edit '+id+'/'+action);
  assert.ok(canon.effects?.length>=1,'need real canonical consequence '+id+'/'+action);
  allChoiceLabels.push(p.label);choices++;
 }
 for(const [rowId,p] of Object.entries(editorial.replies)){
  const originalChoice=scene.choices.find(x=>x.id===p.choice);
  assert.ok(originalChoice,'reply to missing canonical choice '+id+'/'+p.choice);
  const found=originalChoice.reply.find(r=>r.id===rowId);
  assert.ok(found,'missing reply beat '+rowId);
  assert.equal(found.textHash,p.hash);assert.equal(found.speaker,p.speaker);
  assert.ok(p.text.length>=3&&p.text.length<=75&&p.text!==found.text);
  replies++;
 }
}
assert.deepEqual({scenes:expected.size,beats,choices,replies},{scenes:36,beats:84,choices:112,replies:14});
// Fail on accidental reintroduction of technical labels for high-risk choices.
assert.match(v13.scenes.s06.labels.dismiss.label,/撒谎/);
assert.match(v13.scenes.g06.labels.deny.label,/不诚实/);
assert.match(v13.scenes.l07.labels.control.label,/剪掉/);
assert.match(v13.scenes.s02.labels.promise.label,/没有这笔钱/);
assert.ok(new Set(allChoiceLabels).size>95,'not enough distinct speech choices');
const originalSceneCount=Object.keys(data.scenes).length;
const originalChoiceCount=Object.values(data.scenes).flatMap(x=>x.choices).length;
assert.equal(originalSceneCount,228);assert.equal(originalChoiceCount,751);
for(const f of ['play.html','runtime.mjs']){
 const html=fs.readFileSync(new URL(f,base),'utf8');
 assert.ok(html.includes('ROMANCE_V13_SCENES')&&html.includes('function v13Scene()'),f+' missing live editorial implementation');
}
console.log('PASS V13: 36 personal episodes, 84 human dialogue beats, 112 canonical choice labels, 14 sensitive consequence reactions, original 228/751/24 game unchanged');
