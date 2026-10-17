import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const read=(p)=>readFileSync(new URL('../'+p, import.meta.url),'utf8');
const canon=JSON.parse(read('data/STORY.json'));
const io=read('tools/interactive-opening.js');
const v10=read('tools/romance-v10.js');
const ui=read('tools/interactive-opening.css');
assert.equal(canon.canon.book,'今夜偏爱男主');
assert.equal(canon.canon.venue,'北岸艺术中心');
assert.equal(canon.canon.criticalDay,7);
assert.equal(canon.canon.realWorldName,null,'the real-world player name has not been established');
assert.equal(canon.entry,'ENTRY_WAKE');
assert.match(io,/IO_VERSION = 2;/);
assert.match(io,/step:'reader'/,'new saves start in the REAL WORLD, not the backstage emergency');
for (const key of ['reader', 'transport', 'wake', 'badge', 'recognize', 'spotlight', 'crisis', 'hunt']) {
 assert.match(io,new RegExp("'"+key+"'"),'lost a playable onboarding step: '+key);
}
for (const phrase of ['《今夜偏爱男主》','没碰过控台','在家里看小说','今天第一天来','书里那个名字','第七天','背锅','台上是唐映雪','原版盘']) {
 assert.ok((io+v10).includes(phrase),'opening no longer explains '+phrase);
}
assert.ok(io.includes("v.v===1&&v.step==='spotlight'&&!v.finished?'reader':v.step"),'old chapter saves must migrate');
assert.ok(io.includes('io.step=\'recognize\''),'player must inspect the badge before learning the book identity');
assert.ok(io.includes("step==='final'"),'three old canonical actions must remain reachable');
assert.match(ui,/io-reading-film/,'do not show stage art for a real-world phone opening');
assert.equal(canon.scenes.ENTRY_WAKE.choices.length,3,'original branch semantics stay intact');
console.log('PASS V14 novel→stage→identity→stakes→heroine→mission onboarding and unchanged canonical 3-way fork');
