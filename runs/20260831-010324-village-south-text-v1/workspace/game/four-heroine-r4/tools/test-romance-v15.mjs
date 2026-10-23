import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8');
const follow=read('interactive-follow.js'),talk=read('romance-v10.js'),director=read('romance-v11.js');
const src=JSON.parse(read('../data/STORY.json'));
const arcs=JSON.parse(read('romance-v11-arcs.json')).arcs;
assert.equal(Object.keys(arcs).length,18);
assert.equal(Object.values(arcs).reduce((s,a)=>s+Object.keys(a.choices).length,0),79);
assert.match(talk,/找侧幕的摄影师，把切歌过程拍下来/);
assert.match(talk,/找负责授权的人，核对原来的节目单/);
assert.match(talk,/我叫林见月，今晚负责拍摄/);
assert.match(talk,/顾晚棠，负责这场的授权/);
assert.match(talk,/source_pre_switch_timestamp/);
assert.match(talk,/source_programme_approval_note/);
assert.match(follow,/state\.current==='COLD'&&c\.id==='l'&&state\.f\.source_pre_switch_timestamp/);
assert.match(follow,/state\.current==='COLD'&&c\.id==='g'&&state\.f\.source_programme_approval_note/);
for(const [scene,fragment] of Object.entries({
 A2a:'昨晚弹钢琴的那个',A3a:'赞助商',A3b:'后街吃面',
 A4a:'报名截止',A5a:'主办方',A5b:'我叫陆景行',
 A6a:'视频只截了',A7a:'第二十一天'
})){
 assert.ok(arcs[scene].intro.some(row=>row.text.includes(fragment)),scene+' first-player context still missing');
}
assert.ok(!arcs.A3b.intro.some(x=>/四个人.约的都是/.test(x.text)),
 'Public invitations are not four pre-established private relationships');
assert.ok(!arcs.A6a.intro.some(x=>/七天前/.test(x.text)),
 'Day 7 cannot refer to day 1 as seven full days earlier');
assert.match(director,/钢琴家陆景行替我弹的/);
for(const [name,arc] of Object.entries(arcs)){
 assert.ok(src.scenes[name]);
 assert.deepEqual(Object.keys(arc.choices).sort(),src.scenes[name].choices.map(c=>c.id).sort(),name);
 for(const x of arc.intro)assert.ok(x.text.length<57,name+' first line overlong');
}
const canonical=createHash('sha256').update(fs.readFileSync(new URL('../data/STORY.json',import.meta.url))).digest('hex');
assert.equal(canonical,'84842ca69a861849f16b20d72b4b45421675ea5a934cad51d5f7866e703acf93');
console.log(JSON.stringify({status:'PASS',milestones:18,canonicalChoices:79,roleIntroductions:['林见月','顾晚棠','陆景行'],revisedMilestoneBeats:11,canonicalHash:canonical}));
