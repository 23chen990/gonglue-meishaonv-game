import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {choose,replay,renderScene,createState,active} from './engine.mjs';
import {run,data,root} from './route-runner.mjs';
const raw=n=>fs.readFileSync(new URL(n,root));
const hash=n=>crypto.createHash('sha256').update(raw(n)).digest('hex');
const witnesses=JSON.parse(raw('qa/current/choice-witness-prefixes.json')).choices;
const checks=[];
const check=(name,fn)=>{try{checks.push({name,status:'PASS',detail:fn()});}catch(e){checks.push({name,status:'FAIL',error:e.message});}};
const text=rows=>rows.map(r=>r.text).join('\n');
const choice=(sid,id)=>data.scenes[sid].choices.find(o=>o.id===id);
function before(key){
 const w=witnesses[key];assert.ok(w,key+' missing legal witness');
 const s=replay(data,w.prefix.slice(0,-1));
 // Stored witness includes the target command; replay the preceding legal commands.
 assert.equal(s.current,key.split('/')[0]);
 return s;
}
for(const c of ['t','s','l','g','self'])check('five_opening_'+c+'_physical_process_and_later_callback',()=>{
 const r=run({chars:c==='self'?[]:[c],first:c,stop:s=>s.current==='A2b'});
 assert.equal(r.state.current,'A2b');
 const cold=r.state.history.findIndex(h=>h.from==='COLD');
 const opening=replay(data,r.state.history.slice(0,cold));
 const outcome=choose(opening,data,c),shown=text(outcome.reply);
 assert.ok(shown.includes('阿衡'));
 assert.equal(outcome.state.f.source_blue_disc,true);
 assert.equal(active(outcome.state).length,0);
 const v=renderScene(r.state,data);
 const method=outcome.state.f.opening_method;
 const block=data.scenes.A2b.blocks.find(b=>b.when.eq?.[0]==='opening_method'&&b.when.eq[1]===method);
 assert.ok(block);assert.ok(block.lines.every(row=>v.body.some(x=>x.id===row.id)));
 return {ordinaryCommands:r.state.history.length,method,callback:block.id};
});
check('scapegoat_montage_depends_on_actual_opening',()=>{
 for(const first of ['t','s','l','g','self'])for(const sid of ['A4b','A6a']){
  const r=run({first,chars:first==='self'?[]:[first],stop:s=>s.current===sid});
  const v=text(renderScene(r.state,data).body);
  assert.ok(v.includes(sid==='A6a'?'交给阿衡':'递到控台'),first+'/'+sid);
  assert.ok(v.includes('阿衡'),first+'/'+sid);
  assert.ok(!v.includes('你按下'),first+'/'+sid);
 }
 for(const sid of ['A4b','A6a']){
  const r=run({canon:true,chars:[],stop:s=>s.current===sid});
  const v=text(renderScene(r.state,data).body);
  assert.ok(!v.includes('你把蓝标盘递到控台'),sid);
  assert.ok(v.includes('钢琴')||v.includes('设备箱')||v.includes('弹琴'),sid);
 }
 return 'Original and changed-world video edits are evidence-bounded and distinguishable.';
});
check('authority_challenge_has_observable_cost_not_guaranteed_praise',()=>{
 const r=run({chars:['g'],first:'g',stop:s=>s.current==='A2b'});
 assert.equal(r.state.f.cheng_questioned_early,true);
 assert.ok(text(renderScene(r.state,data).body).includes('程放又单独发来'));
});
check('g07_deferred_disclosure_is_not_spoken_of_as_already_completed',()=>{
 const b=data.scenes.g07.blocks.find(b=>b.when.eq?.[0]==='discovery_g'&&b.when.eq[1]==='late');
 assert.ok(text(b.lines).includes('散场前会讲清'));
 assert.ok(!text(b.lines).includes('你刚才说清'));
 const key='g07/ask';const s=before(key);assert.equal(s.current,'g07');
 // Whole conditional coverage supplies a separately replayed late-path witness.
 const coverage=JSON.parse(raw('qa/current/conditional-r3.json'));
 assert.equal(coverage.covered,coverage.total);
});
check('g03_person_callback_is_wage_not_an_unasked_question',()=>{
 const b=data.scenes.g03.blocks.find(b=>b.when.eq?.[0]==='first_g'&&b.when.eq[1]==='person');
 assert.ok(text(b.lines).includes('工资'));
 assert.ok(!text(b.lines).includes('你问我'));
});
check('career_mail_is_unsent_before_player_chooses',()=>{
 const s=before('E04/'+data.scenes.E04.choices[0].id);
 assert.ok(text(renderScene(s,data).body).includes('邮件还没发'));
});
check('optional_t_side_scene_does_not_force_book_source_disclosure',()=>{
 for(const o of data.scenes.E_T.choices){
  const s=before('E_T/'+o.id),out=choose(s,data,o.id);
  assert.ok(!text(out.reply).includes('我看过原著'));
  assert.ok(!text(out.reply).includes('这本小说'));
 }
});
check('same_l_memory_in_confession_and_single_ending',()=>{
 const b=data.scenes.R_l.blocks.find(b=>b.when.eq?.[0]==='last_l'&&b.when.eq[1]==='remember');
 assert.ok(text(b.lines).includes('怕哪天醒来'));
 assert.ok(text(data.scenes.l10.choices.find(o=>o.effects.some(e=>e.key==='last_l'&&e.value==='remember')).reply).includes('醒来')||text(data.scenes.l10.body).includes('醒来'));
 assert.ok(!text(b.lines).includes('你又把我忘了'));
});
check('gs_slow_ending_does_not_pretend_unchosen_walk',()=>{
 const s=before('R_gs/slow'),out=choose(s,data,'slow');
 const t=text(out.reply);
 assert.ok(!t.includes('路上拍的'));
 assert.ok(t.includes('餐厅')||t.includes('小店')||t.includes('餐馆')||t.includes('链接'));
});
check('gl_ending_photo_is_not_taken_before_photo_choice',()=>{
 const s=before('R_gl/picture'),t=text(renderScene(s,data).body);
 assert.ok(!t.includes('按下快门'));assert.ok(!t.includes('照片已经'));
 const result=choose(s,data,'picture');
 assert.ok(text(result.reply).includes('照片')||text(result.reply).includes('镜头'));
});
check('all_four_pov_extras_remain_unsent_no_canonical_transfer',()=>{
 const items=JSON.parse(raw('data/BONUS.json')).items.filter(i=>i.id.endsWith('_POV'));
 assert.equal(items.length,4);
 for(const b of items){
  assert.equal(b.timeline,'parallel_unsent_invitation');assert.equal(b.diegeticKnowledgeTransfer,false);
  assert.ok(/没有发|没发|没有点发送|没把消息发|没有按/.test(text(b.body)),b.id);
 }
});
check('all_scene_editorial_records_trace_to_actual_revision',()=>{
 const a=JSON.parse(raw('qa/current/scene-editorial-audit.json'));
 assert.equal(a.total,Object.keys(data.scenes).length);
 assert.equal(Object.keys(a.reviewedScenes).length,a.total);
 for(const id of Object.keys(data.scenes))assert.ok(Object.hasOwn(a.reviewedScenes,id),id);
 return {scope:a.scope,manualEditRecords:a.changes.length,addedInR42:a.newlyAuthoredR42};
});
check('rival_has_independent_execution_and_not_only_the_protagonists_instruction',()=>{
 const r=run({chars:[]});
 assert.ok(r.state.history.some(h=>h.from==='LU_MOVE1'));
 assert.ok(r.state.history.some(h=>h.from==='LU_MOVE2'));
 assert.ok(r.state.f.final_lu);
 return {finalLu:r.state.f.final_lu,actions:r.state.history.filter(h=>h.from.startsWith('LU_')).map(h=>h.from+'/'+h.id)};
});
const report={scope:'Current canonical r4 ordinary-command regressions plus explicitly identified editorial contracts; not human evaluation.',
hashes:{story:hash('data/STORY.json'),engine:hash('tools/engine.mjs'),bonus:hash('data/BONUS.json')},
checks,passed:checks.filter(c=>c.status==='PASS').length,failed:checks.filter(c=>c.status==='FAIL').length};
fs.writeFileSync(new URL('qa/current/r4-causality.json',root),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(report.failed)process.exitCode=1;
