/** V18 author integrity: all 36 female voice scenes, no fake engine branches. */
import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8');
const momentPack=JSON.parse(read('romance-v18-moments.json'));
const v13=JSON.parse(read('romance-v13-scenes.json'));
const story=JSON.parse(read('../data/STORY.json'));
const build=read('build-preview.mjs'),controller=read('romance-v18.js');
const ids=Object.keys(momentPack.moments);
assert.deepEqual(new Set(ids),new Set(Object.keys(v13.scenes)));
assert.equal(ids.length,36,'four heroines x nine personal scenes');
assert.equal(momentPack.storyHash,crypto.createHash('sha256').update(read('../data/STORY.json')).digest('hex'));
const validTones=new Set(['warm','tense','work','rain','quiet','intimate']);
let count=0;
for(const [scene,m] of Object.entries(momentPack.moments)){
 assert.equal(m.voice,({t:'唐映雪',s:'沈清辞',l:'林见月',g:'顾晚棠'})[scene[0]]);
 assert.ok(validTones.has(m.tone)&&['near','mid'].includes(m.camera),scene);
 assert.equal(m.lines.length,2,scene+' needs an actionable dialogue exchange');
 assert.ok(m.lines.every(t=>typeof t==='string'&&Array.from(t).length>=5&&Array.from(t).length<=26),scene);
 assert.ok(Array.from(m.cue).length<=24);
 assert.ok(!m.lines.some(t=>/好感度|请选择|系统提示|道德|赋能|闭环|（|）/.test(t)),scene);
 const sc=story.scenes[scene];
 const origin=[...sc.body,...sc.blocks.flatMap(b=>b.lines)].find(r=>r.id===m.anchor.id);
 assert.ok(origin,scene+' missing anchor');
 assert.equal(origin.textHash,m.anchor.hash,scene+' source has changed');
 assert.equal(origin.speaker,m.anchor.speaker,scene+' speaker has changed');
 assert.ok(story.scenes[scene].choices.length>=3);
 count+=m.lines.length;
}
assert.equal(count,72);
for(const part of ['v18BeforeIntro','v18BeforeFrame','v18Moment','v17Segments',
 'v18-scene-cue','portrait-reused-not-location-cg'])assert.ok(controller.includes(part),part);
assert.ok(build.includes("read('tools/romance-v18.js')"));
assert.ok(build.includes("read('tools/romance-v18.css')"));
assert.ok(build.includes("read('tools/romance-v18-moments.json')"));
for(const file of ['runtime.mjs','play.html','index.html']){
 const src=read('../'+file);
 assert.ok(src.includes('ROMANCE_V18_MOMENTS')&&src.includes('v18-scene-cue'),
  'generated V18 not connected to the real player: '+file);
}
console.log('PASS V18: 36 first-person interactions, 72 spoken lines, strict source anchors, canonical game untouched');
