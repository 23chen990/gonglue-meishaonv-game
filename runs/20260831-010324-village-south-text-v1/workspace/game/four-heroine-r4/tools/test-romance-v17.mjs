import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8');
const director=read('romance-v17.js'),builder=read('build-preview.mjs');
const edits=JSON.parse(read('romance-v13-scenes.json'));
const ids=Object.keys(edits.scenes);
assert.equal(ids.length,36);
assert.deepEqual(new Set(ids),new Set(Array.from('tslg',c=>Array.from({length:10},(_,i)=>c+String(i+1).padStart(2,'0'))).flat().filter(x=>!x.endsWith('03'))));
for(const scene of Object.values(edits.scenes)){
 assert.ok(Object.keys(scene.beats).length>=2);
 assert.ok(Object.keys(scene.labels).length>=3);
}
for(const part of [
 'Object.hasOwn(V17_PERSONAL,state.current)',
 'row.textHash===rule.hash&&row.speaker===rule.speaker',
 'renderScene(state,DATA).choices.filter(c=>c.enabled)',
 'choose(state,DATA,choice,state.revision)',
 'v17.after=lastReply.length?',
 'data-v17-choice',
 'data-v17-page',
 'v17BeforeStory()',
 'v17OldRead(raw)',
 "phase='scene';page=0;choicePage=0"
]) assert.ok(director.includes(part),'missing true-game contract '+part);
assert.ok(builder.includes("read('tools/romance-v17.js')"));
assert.ok(builder.includes("read('tools/romance-v17.css')"));
assert.equal(createHash('sha256').update(read('../data/STORY.json')).digest('hex'),'84842ca69a861849f16b20d72b4b45421675ea5a934cad51d5f7866e703acf93');
console.log('PASS: 36 source-guarded cinematic personal scenes, real engine decisions and outcome memory');
