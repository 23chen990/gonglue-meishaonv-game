import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';

const read = (name) => fs.readFileSync(new URL(name, import.meta.url), 'utf8');
const arcs=JSON.parse(read('romance-v11-arcs.json')).arcs;
const story=JSON.parse(read('../data/STORY.json'));
const director=read('romance-v11.js'),opening=read('romance-v10.js');
const night=read('interactive-opening.js'),follow=read('interactive-follow.js');
const scenes=Object.entries(arcs);
const approvedShots=new Set(['stage','singer','singerBond','console','shen','lin','gu','crew','badge','usbDetail']);
assert.equal(scenes.length,18,'V12 cannot quietly drop any approved milestone');
const nonNatural=/好感\s*[+＋]|恋爱值\s*[+＋]|完成任务|选择会带来不同后果|独立验证通过|系统提示：|请选择以下选项|用户体验|可配置/;
let leaves=0,acting=0;
const flat=[];
for (const [sid,a] of scenes){
 const canonical=story.scenes[sid];
 assert.ok(canonical,'missing canonical story scene: '+sid);
 assert.ok(a.intro.length>=2 && a.intro.length<=3,sid);
 if(canonical.decisionSteps?.length){
  const intents=canonical.decisionSteps.map(s=>s.id);
  assert.deepEqual(Object.keys(a.intentLabels||{}).sort(),intents.sort(),sid+' raw stage-one prompt leaked');
  for(const line of Object.values(a.intentLabels)){
   assert.ok(line.length>=4&&line.length<=24,'unreadable stage-one response '+sid);
  }
  assert.ok(a.secondStage && a.secondStage.length<=48,sid+' missing spoken second-stage cue');
 }
 for (const beat of a.intro){
  assert.ok(beat.voice&&beat.text&&beat.text.length<=56,sid+' intro length');
  assert.ok(!nonNatural.test(beat.text),sid+' unnatural narration');
  flat.push(beat.text);
 }
 assert.deepEqual(Object.keys(a.choices).sort(),canonical.choices.map(c=>c.id).sort(),sid+' changed story branches');
 for (const [id,choice] of Object.entries(a.choices)){
  leaves++;
  assert.ok(choice.label.length>=3 && choice.label.length<=23,sid+'/'+id+' label');
  assert.ok(choice.risk.length>=3 && choice.risk.length<=26,sid+'/'+id+' risk');
  assert.ok(choice.response.text.length>=5 && choice.response.text.length<=58,sid+'/'+id+' human response');
  assert.ok(approvedShots.has(choice.response.shot),sid+'/'+id+' source shot');
  assert.ok(!nonNatural.test(choice.label+choice.risk+choice.response.text),sid+'/'+id+' fake UI reward');
  assert.notEqual(choice.label,choice.risk,sid+'/'+id+' empty decision');
  const canonicalChoice=canonical.choices.find(c=>c.id===id);
  assert.ok(canonicalChoice.effects.some(e=>e.op==='set'),'choice must write a real canonical state '+sid+'/'+id);
  if(choice.afterBeat){
   acting++;
   assert.ok(choice.afterBeat.voice.length>0 && choice.afterBeat.text.length>=5 && choice.afterBeat.text.length<=38,sid+'/'+id+' act');
   assert.ok(!nonNatural.test(choice.afterBeat.text),sid+'/'+id+' unnatural acting note');
   assert.ok(approvedShots.has(choice.afterBeat.shot||choice.response.shot),sid+'/'+id+' act shot');
  }
  flat.push(choice.response.text);
 }
}
assert.equal(leaves,79,'lost any humanized meaningful action');
assert.ok(acting>=15,'visual acting/action callbacks lost');
assert.ok(new Set(flat).size===flat.length,'different stories should not reuse identical speeches');
assert.ok(!director.includes('function v11ShortLine'),'do not cut canonical speech mid-word');
assert.ok(!director.includes("lastReply.find(x=>x.speaker"),'do not concatenate random canonical source fragments');
assert.ok(director.includes('v11BoundEffect(a.scene,a.choice);'),'must bind performed consequence to engine flag');
assert.ok(director.includes('if(rule.afterBeat)'),'narrative callback missing');
assert.ok(director.includes('arc.intentLabels?.[c.id.slice'),'human stage-one labels not rendered');
assert.ok(!director.includes('v11-choice-risk')&&
 !director.includes('v21ChoiceRisk(')&&
 director.includes('v11DirectLeafMode'),
 'V22 normal choices show only the selected action, not consequence predictions');
assert.ok(!/赋能|闭环|抓手|拉通/.test(JSON.stringify(arcs)),'product meeting words are not speech');
// V14 moves the crisis AFTER the reader knows they were reading a novel.
// Keep checking the actual spoken lines, not the obsolete V12 sudden start.
for (const line of [
 '伴奏怎么少了一段？别切麦！我还能唱！',
 '小许！醒醒！你今天第一天来，别吓我啊。',
 '临时场务是吧？交接单签一下，你今天就可以走了。',
 '今晚也算认识了。以后你是只想找我谈工作吗？'
]) assert.ok(opening.includes(line),'human conversation missing: '+line);
for(const line of ['step:\'reader\'','正在阅读','这个叫许照的临时工','书里第七天','io.step=\'recognize\'']){
 assert.ok(night.includes(line),'newcomer orientation missing: '+line);
}
assert.ok(follow.includes('不签，明天还想不想来上班')||follow.includes('明天还想不想来上班'),'fallback manager pressure not revised');
assert.equal(fs.statSync(new URL('../data/STORY.json', import.meta.url)).size,1691962,'do not mutate canonical engine/story in a presentation pass');
const hash=createHash('sha256').update(fs.readFileSync(new URL('../data/STORY.json',import.meta.url))).digest('hex');
assert.equal(hash,'84842ca69a861849f16b20d72b4b45421675ea5a934cad51d5f7866e703acf93');
console.log(JSON.stringify({status:'PASS',revisedMilestones:scenes.length,canonicalActions:leaves,authoredPhysicalActingBeats:acting,canonHash:hash,scope:'display script only'}));
