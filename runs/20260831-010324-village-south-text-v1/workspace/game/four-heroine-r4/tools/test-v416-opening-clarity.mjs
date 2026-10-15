/** Regression on actual first-night interpreter states; static copy proof is separate
 * from human reader delight and physical-device testing.
 */
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import {createState,renderScene,choose} from './engine.mjs';

const root=new URL('../',import.meta.url);
const load=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const story=load('data/STORY.json');
const patch=load('patch/v416_first_night_edits.json');
const plan=load('patch/v416_first_night_plan.json');
const digest=x=>crypto.createHash('sha256').update(x).digest('hex');
const beatHash=x=>digest(x.speaker+'\0'+x.text).slice(0,16);
const raw=fs.readFileSync(new URL('data/STORY.json',root));
assert.equal(digest(raw),patch.newStorySha256,'current v4.16 SHA');
assert.equal(patch.baseStorySha256,plan.baseStorySha256);
assert.deepEqual(patch.counts,{beats:28,scenes:13,body:11,reply:13,labels:4});
const scenes=Object.values(story.scenes);
assert.equal(scenes.length,228);
assert.equal(scenes.reduce((n,s)=>n+s.choices.length,0),751);
assert.equal(scenes.filter(s=>s.kind==='ending').length,24);
assert.equal(story.scenes.ENTRY_WAKE.body.length,28);
assert.equal(scenes.filter(s=>s.decisionSteps?.length).length,16);
const edits=new Set();
for(const c of patch.changes){
 assert(!edits.has(c.id),'duplicate '+c.id);edits.add(c.id);
 const scene=story.scenes[c.scene];
 const opt=c.choice?scene.choices.find(x=>x.id===c.choice):null;
 const item=c.location==='body'?scene.body.find(x=>x.id===c.id):
  c.location==='reply'?opt.reply.find(x=>x.id===c.id):opt;
 assert(item,c.id);
 assert.equal(c.after,plan.changes.find(x=>x.id===c.id).text);
 if(c.location==='label'){
  assert.equal(item.label,c.after);
  assert.equal(item.id,c.choice);
 } else {
  assert.equal(item.speaker,c.speaker);
  assert.equal(item.text,c.after);
  assert.equal(item.textHash,c.afterHash);
  assert.equal(beatHash(item),c.afterHash);
 }
}
const text=(sid,id)=>story.scenes[sid].body.find(b=>b.id===id).text;
assert.equal(story.scenes.OP_WORK_free.clock.time,'20:30');
assert(text('OP_WORK_free','OP_WORK_free.r1.body.001').startsWith('20:30'));
assert(text('OP_WORK_free','OP_WORK_free.r1.body.002').includes('结束后再整理'));
assert(!text('OP_WORK_free','OP_WORK_free.r1.body.003').includes('试听结束'));
assert(text('A1b','A1b.r42.body.004').includes('先把责任分开'));
for(const role of ['t','s','l']){
 const label=story.scenes['OP_DATE_'+role].choices.find(x=>x.id==='attend').label;
 assert(!/差评|听歌|新歌|我想看看|旁厅/.test(label),role+': shared label assumes the wrong invitation');
}
const click=(s,id)=>{
 const visible=renderScene(s,story).choices.filter(x=>x.enabled);
 assert(visible.some(x=>x.id===id),s.current+'/'+id+' not available: '+visible.map(x=>x.id).join(','));
 return choose(s,story,id).state;
};
function opening({role,origin='partial',answer='space',work='free'}){
 let s=createState();
 const entry=['l','g'].includes(role)?'investigate':'rescue';
 s=click(s,entry);
 if(entry==='investigate')s=click(s,role==='g'?'email':'camera');
 assert.equal(s.current,'COLD');
 s=click(s,role);
 assert.equal(s.current,'OP_SETTLE');
 s=click(s,'continue');
 assert.equal(s.current,'OP_FORK');
 s=click(s,'backup');
 assert.equal(s.current,'OP_TALK_'+role);
 s=click(s,'slow');
 assert.equal(s.current,'OP_SECRET_'+role);
 s=click(s,origin);
 assert.equal(s.current,'OP_RIVAL');
 s=click(s,work);
 assert.equal(s.current,'OP_CHECK_'+role);
 s=click(s,answer);
 assert.equal(s.current,'OP_DATE_'+role);
 return s;
}
const tOrdinary=opening({role:'t'});
const tBody=renderScene(tOrdinary,story).body.map(x=>x.text).join(' ');
assert(tBody.includes('新歌先留着'));
assert(renderScene(tOrdinary,story).choices.some(x=>x.id==='attend' && x.enabled));
const tPrivate=opening({role:'t',origin:'truth',answer:'present'});
assert.equal(tPrivate.f.opening_access_t,'private');
assert(renderScene(tPrivate,story).body.some(x=>x.text.includes('新歌')));
const sOrdinary=opening({role:'s',work:'join'});
assert.equal(sOrdinary.f.opening_access_s,'ordinary');
assert(renderScene(sOrdinary,story).body.some(x=>x.text.includes('热饮')));
const sLater=choose(sOrdinary,story,'work');
assert(sLater.reply.some(x=>x.text.includes('先忙')),'work reply must match both regular drink and venue invite');
assert(!sLater.reply.some(x=>x.text.includes('我自己去旁厅')),'ordinary drink should not assume private venue visit');
const lOrdinary=opening({role:'l'});
assert.equal(lOrdinary.f.opening_access_l,'ordinary');
assert(renderScene(lOrdinary,story).body.some(x=>x.text.includes('沿河走')));
const afterDate=click(tOrdinary,'attend');
assert.equal(afterDate.current,'OP_WORK_free');
const freeText=renderScene(afterDate,story).body.map(x=>x.text).join(' ');
assert(freeText.includes('20:30')&&freeText.includes('九点'));
assert(!freeText.includes('试听结束后整理'),'20:30 may not narrate a finished 21:00 audition');
let canon=click(createState(),'canon');
canon=click(canon,'obey');
canon=click(canon,'backstage');
assert.equal(canon.current,'A1b');
const afterCanon=renderScene(canon,story).body.map(x=>x.text).join(' ');
assert(afterCanon.includes('已经签过一张模糊交接单'));
assert(afterCanon.includes('先把责任分开'));
console.log(JSON.stringify({status:'PASS',storySha256:patch.newStorySha256,
 auditedRows:28,auditedScenes:13,sharedContextLabels:4,
 realInterpreterPaths:['t-ordinary','t-private','s-ordinary-work-defer','l-ordinary','free-clock','canon-signed-handover'],
 retainedChoices:751,retainedEndings:24}));
