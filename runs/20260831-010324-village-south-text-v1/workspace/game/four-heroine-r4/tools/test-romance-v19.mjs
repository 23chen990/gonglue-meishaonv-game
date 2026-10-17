import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const read=x=>fs.readFileSync(new URL(x,import.meta.url),'utf8');
const story=JSON.parse(read('../data/STORY.json'));
const v18=JSON.parse(read('romance-v18-moments.json')).moments;
const pack=JSON.parse(read('romance-v19-scenes.json'));
const episodes=pack.scenes;
assert.equal(pack.version,1);
assert.equal(pack.storyHash,crypto.createHash('sha256').update(read('../data/STORY.json')).digest('hex'));
assert.deepEqual(new Set(Object.keys(episodes)),new Set(Object.keys(v18)));
assert.equal(Object.keys(episodes).length,36);
let turns=0,callbacks=0,labels=0,internalThoughts=0;
const actors={t:'T',s:'S',l:'L',g:'G'};
for(const [id,episode] of Object.entries(episodes)){
 const canon=story.scenes[id];
 assert.ok(canon&&canon.choices.length>=3,id);
 assert.ok(episode.cue.includes('｜'),id+' has no place and observable incident');
 assert.ok([...episode.cue].length<=35,id+' cue too long');
 assert.ok(episode.beats.length>=2&&episode.beats.length<=3,id+' wrong speaking beat count');
 assert.ok(/[？?]/.test(episode.beats.at(-1).text),id+' last line must invite a decision');
 assert.ok(episode.beats[0].speaker===actors[id[0]],id+' must introduce heroine');
 for(const [i,b] of episode.beats.entries()){
  assert.ok(b.speaker===actors[id[0]]||(id==='t02'&&i===1&&b.speaker==='B'),id+' unauthorized automatic protagonist speech');
  assert.ok([...b.text].length>=4&&[...b.text].length<=35,id+' line too long');
  assert.ok(!/好感度|剧情数值|请选择|（|）|赋能|闭环/.test(b.text),id+' meta-language');
  if(b.speaker==='B')internalThoughts++;
  turns++;
 }
 const matches=canon.body.filter(x=>x.id===episode.source.id);
 assert.equal(matches.length,1,id+' source missing');
 assert.equal(matches[0].speaker,episode.source.speaker);
 assert.equal(matches[0].textHash,episode.source.hash);
 for(const c of episode.callbacks){
  const found=canon.blocks.flatMap(b=>b.lines).find(x=>x.id===c.source.id);
  assert.ok(found,id+' callback not sourced');
  assert.equal(found.textHash,c.source.hash,id+' callback stale');
  assert.equal(found.speaker,c.source.speaker,id+' callback speaker drift');
  assert.equal(c.speaker,actors[id[0]],id+' callback impersonates heroine');
  assert.ok([...c.text].length<=30,id+' callback too long');
  callbacks++;
 }
 for(const [choice,label] of Object.entries(episode.labels)){
  assert.ok(canon.choices.some(x=>x.id===choice),id+' untracked command');
  assert.ok(label&&label.length<=36,id+' option unplayable');
  labels++;
 }
}
assert.equal(turns,88);
assert.equal(callbacks,14);
assert.equal(labels,9);
assert.equal(internalThoughts,1);
const controller=read('romance-v19.js'),builder=read('build-preview.mjs'),save=read('romance-v17.js');
for(const token of ['v19Episode','v19Callback','v19BeforeIntro','v19BeforeOptions','v17Segments',"new URLSearchParams(location.search).get('qa')==='v18'",'renderScene(state,DATA).body'])assert.ok(controller.includes(token),token);
assert.ok(!controller.includes('choose(state,DATA'),'V19 cannot forge choice state');
assert.ok(save.includes('const V17_VERSION=3;'));
assert.ok(save.includes('![1,2,V17_VERSION].includes(x.v)'));
for(const token of ["read('tools/romance-v19-scenes.json')","read('tools/romance-v19.js')","read('tools/romance-v19.css')"])assert.ok(builder.includes(token),token);
for(const file of ['../play.html','../index.html','../runtime.mjs']){
 const html=read(file);
 assert.ok(html.includes('ROMANCE_V19_SCENES'),file+' missing compiled rewrite');
 assert.ok(html.includes('v19-director'),file+' missing stage');
}

// V19 second editorial pass: never claim a scene has happened when only
// registration exists, never attribute unclicked gaze/speech to the player.
assert.ok(episodes.s07.beats[0].text.includes('报名表'));
assert.ok(!episodes.s07.beats[0].text.includes('只来了'));
assert.ok(!episodes.g05.beats.at(-1).text.includes('盯着我'));
assert.ok(!episodes.t09.beats[0].text.startsWith('别找你名字'));
const rewritten=JSON.parse(read('romance-v11-arcs.json')).arcs;
for(const id of ['UNWRITTEN','A6b','A7a','A7b']){
 assert.equal(rewritten[id].intro.length,2);
 assert.ok(rewritten[id].intro.every(b=>b.text.length<=45));
}
assert.match(rewritten.A6b.intro[1].text,/见面邀约.*团队.*新项目/);
assert.match(rewritten.A7a.intro[1].text,/约过.*答应过/);
assert.ok(read('romance-v19.css').includes('.v19-director .v11-scene-id{display:none!important}'));
console.log('PASS V19: 36 causal episodes, 88 spoken turns, 14 optional canon-grounded callbacks, 9 truthful playable choice labels; original story unchanged');
