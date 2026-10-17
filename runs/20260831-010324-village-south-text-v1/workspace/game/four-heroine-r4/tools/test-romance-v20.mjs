/** V20 source-to-screen semantic contracts, not merely option-ID parity. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { choose, replay, condition, renderScene } from './engine.mjs';
const read = p => fs.readFileSync(new URL(p, import.meta.url), 'utf8');
const canon = JSON.parse(read('../data/STORY.json')).scenes;
const arcs = JSON.parse(read('romance-v11-arcs.json')).arcs;
const runtime = read('romance-v11.js');
const intro = name => arcs[name].intro.map(line => line.text).join(' ');
const chooseLabel = (scene, id) => arcs[scene].choices[id].label;
const outcome = (scene, id) => arcs[scene].choices[id].response.text;
const source = scene => canon[scene].body.map(x => x.text).join(' ');
assert.equal(Object.keys(arcs).length, 18);
const sha = createHash('sha256').update(read('../data/STORY.json')).digest('hex');
assert.equal(sha, '84842ca69a861849f16b20d72b4b45421675ea5a934cad51d5f7866e703acf93');
assert.match(source('A3b'), /后街.*面馆/);
assert.match(intro('A3b'), /后街吃面/);
assert.match(chooseLabel('A3b', 'g'), /面馆/);
assert.match(outcome('A3b', 'g'), /面馆/);
assert.doesNotMatch(intro('A3b') + chooseLabel('A3b', 'g') + outcome('A3b', 'g'), /对账|签合同|工时/);
assert.ok(!runtime.includes("label='去和授权负责人对账'"), 'newcomer override must not revert to accounting');
assert.match(source('A4a'), /报名/);
assert.match(intro('A4a'), /报名截止/);
assert.match(intro('A4a'), /还能之后补交/);
assert.doesNotMatch(intro('A4a'), /短片今晚.*截止/);
assert.match(intro('A4a'), /别人哭/);
assert.match(source('A4b'), /错版文件不是许照导出的/);
assert.match(intro('A4b'), /不是许照导出的/);
assert.match(intro('A4b'), /宣传片|字幕/);
assert.match(intro('A4b'), /不能整段发/);
assert.match(source('A6a'), /临时人员操作失误/);
assert.match(intro('A6a'), /视频只截/);
assert.match(intro('A6a'), /保安/);
assert.match(intro('A1b'), /伴奏不是我导出的/);
assert.match(intro('A5a'), /背整场合同的责任/);
assert.match(intro('A5a'), /不让我修改/);
assert.match(intro('A5b'), /演出名额|作品争/);
assert.match(intro('A2b'), /工作群/);
assert.match(intro('A7a'), /约过.*答应过/);
for(const char of 'tslg') {
 const s=char+'03';
 assert.match(intro(s), /约会/, s+' must explicitly reveal the type of meeting');
 assert.deepEqual(Object.keys(arcs[s].choices).sort(), canon[s].choices.map(x=>x.id).sort());
}
for(const [id,arc] of Object.entries(arcs)){
 assert.ok(arc.intro.length>=2 && arc.intro.length<=3, id);
 assert.ok(arc.intro.every(b=>Array.from(b.text).length<=56), id);
 assert.deepEqual(Object.keys(arc.choices).sort(), canon[id].choices.map(c=>c.id).sort(), id);
 for(const c of Object.values(arc.choices)){
  assert.ok(Array.from(c.label).length<=23 && Array.from(c.risk).length<=26, id);
  assert.ok(Array.from(c.response.text).length<=58, id);
 }
}
// A DIRECT tap may silently record the required canonical intent, but must
// not bypass its permission conditions, effects, replay order or final action.
const data = JSON.parse(read('../data/STORY.json'));
const fixtures = JSON.parse(read('../qa/current/romance-v11-fixtures.json')).fixtures;
let verifiedLeaves=0,verifiedIntentPairs=0;
for(const [id,arc] of Object.entries(arcs)){
 const origin=replay(data,fixtures[id].commands);
 assert.equal(origin.current,id,id+' fixture incorrect');
 const sc=canon[id];
 for(const opt of sc.choices){
  if(!condition(origin,opt.when))continue;
  const h0=origin.history.length;
  let intermediate=origin;
  if(sc.decisionSteps){
   const group=sc.decisionSteps.find(g=>g.options.includes(opt.id));
   assert.ok(group,id+'/'+opt.id+' unmapped intent');
   intermediate=choose(intermediate,data,'intent:'+group.id,intermediate.revision).state;
   assert.equal(intermediate.history.length,h0+1);
   assert.equal(intermediate.decisionIntent?.id,group.id);
   assert.ok(renderScene(intermediate,data).choices.find(x=>x.id===opt.id&&x.enabled),id+'/'+opt.id);
   verifiedIntentPairs++;
  }
  const done=choose(intermediate,data,opt.id,intermediate.revision).state;
  assert.equal(done.history.at(-1).from,id);
  assert.equal(done.history.at(-1).id,opt.id);
  assert.equal(done.decisionIntent,null,id+'/'+opt.id+' left a phantom intent');
  assert.equal(done.history.length,h0+(sc.decisionSteps?2:1));
  const redone=replay(data,done.history);
  assert.deepEqual(redone.f,done.f,id+'/'+opt.id+' effects differ after replay');
  assert.equal(redone.current,done.current,id+'/'+opt.id+' replay diverges');
  verifiedLeaves++;
 }
}
assert.ok(verifiedLeaves>=65 && verifiedIntentPairs>=40,{verifiedLeaves,verifiedIntentPairs});
assert.ok(runtime.includes('v11DirectLeafMode'));
assert.ok(runtime.includes("choose(state,DATA,'intent:'+group.id,state.revision)"));
assert.ok(runtime.includes('v11DirectLeafMode()&&!action.startsWith'));
const expectedHeadings={
 A3b:'第四晚 · 项目群的四条邀请', A4a:'第五天 · 独立拍摄报名',
 A4b:'第五夜 · 能作证的录音', A6a:'第七天 · 被剪过的宣传视频',
 t03:'唐映雪 · 约会邀请', s03:'沈清辞 · 约会邀请',
 l03:'林见月 · 约会邀请', g03:'顾晚棠 · 约会邀请'
};
assert.ok(runtime.includes('const V11_VISIBLE_HEADINGS={'));
for(const [scene,heading] of Object.entries(expectedHeadings))
 assert.ok(runtime.includes(scene+":'"+heading+"'"),scene+' must show contextual event title');
assert.ok(runtime.includes('V11_VISIBLE_HEADINGS[scene]||DATA.scenes[scene]?.title'));
console.log('PASS V20 transparent direct-leaf staging:',verifiedLeaves,'true actions and',verifiedIntentPairs,'canonical intent+leaf pairs');
console.log('PASS V20 source-grounded semantic accuracy: group dinner, late project signup, recording privacy, fake-video trap, four real date invitations, 79 canonical choices');
