import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {createState,choose,renderScene,replay,active} from './engine.mjs';
import {run} from './route-runner.mjs';
const d=JSON.parse(fs.readFileSync(new URL('../data/STORY.json',import.meta.url),'utf8'));
const checks=[];
const check=(name,fn)=>{try{checks.push({name,status:'PASS',detail:fn()});}catch(e){checks.push({name,status:'FAIL',error:e.stack});}};
const opts=(s)=>renderScene(s,d).choices.filter(o=>o.enabled).map(o=>o.id);
const click=(s,id)=>choose(s,d,id).state;
check('first_real_choice_is_three_canon_aware_actions',()=>{
 const s=createState(),v=renderScene(s,d);assert.equal(s.current,'ENTRY_WAKE');
 assert.deepEqual(opts(s),['canon','rescue','investigate']);
 const text=v.body.map(x=>x.text).join('\n');
 for(const mark of ['第七天','陆景行','钢琴','蓝胶带','程放','许照'])assert.ok(text.includes(mark),mark);
 assert.ok(text.includes('听程放')&&text.includes('清退'));
 assert.ok(text.indexOf('眼前彻底黑了')<text.indexOf('工牌'));
 assert.ok(text.indexOf('工牌')<text.indexOf('《今夜偏爱男主》。北岸'));
 assert.ok(text.indexOf('第七天')<text.indexOf('蓝胶带'));
 assert.ok(v.body.length>=20,'Transmigration cannot be a single summary card');
 assert.throws(()=>choose(s,d,'steady'),/Unavailable/);
 return v.body.length;
});
check('canon_piano_route_keeps_original_no_blue_disc',()=>{
 let s=click(createState(),'canon');assert.equal(s.current,'ENTRY_CLUES');
 assert.equal(s.f.canon_kept,true);assert.equal(s.f.opening_changed,false);
 assert.deepEqual(opts(s),['obey','refuse','witness']);
 s=click(s,'obey');assert.equal(s.f.canon_signed_blame,true);assert.equal(s.current,'OP_CANON');
 assert.deepEqual(opts(s),['backstage','question','silence']);
 s=click(s,'silence');assert.equal(s.current,'A1b');assert.equal(s.f.opening_method,'piano_original');
 assert.ok(!s.f.source_blue_disc&&!s.f.blue_audio_checked&&!s.f.first_win);
 assert.ok(!s.history.some(x=>x.from==='COLD'||x.from==='OP_SETTLE'||x.from==='OP_FORK'));
 assert.deepEqual(active(s),[]);
 return s.history.map(x=>x.from+'/'+x.id);
});
check('canon_refusal_and_witness_are_distinct',()=>{
 const a=click(click(createState(),'canon'),'refuse');
 const b=click(click(createState(),'canon'),'witness');
 assert.ok(a.f.source_declined_handover&&!a.f.source_original_timeline);
 assert.ok(!b.f.source_declined_handover&&b.f.source_original_timeline);
 assert.equal(a.f.canon_signed_blame,false);
 return 'Different original-book preservation costs';
});
for(const [entry,ids] of [['rescue',['t','s','self']],['investigate',['l','g','self']]])
 check('first_deviation_'+entry+'_limits_staged_choices',()=>{
  let s=click(createState(),entry);
  if(entry==='investigate'){
   assert.equal(s.current,'ENTRY_MEMORY');assert.deepEqual(opts(s),['camera','email']);
   s=click(s,'camera');
  }
  assert.equal(s.current,'COLD');assert.deepEqual(opts(s),ids);
  assert.ok(s.f.blue_location_known&&!s.f.source_blue_disc);
  return ids;
 });
for(const first of ['t','s','l','g','self'])check('opening_'+first+'_real_cause',()=>{
 let s=click(createState(),['l','g'].includes(first)?'investigate':'rescue');
 if(s.current==='ENTRY_MEMORY')s=click(s,first==='g'?'email':'camera');
 const result=choose(s,d,first),out=result.state;
 assert.equal(out.current,'OP_SETTLE');assert.equal(out.f.opening_route,first);
 assert.equal(out.f.first_win,true);assert.ok(out.f.source_blue_disc&&out.f.blue_audio_checked);
 assert.equal(out.factOrigins.source_blue_disc.source,'COLD/'+first);
 assert.deepEqual(active(out),[]);
 s=click(out,'continue');assert.equal(s.current,'OP_FORK');
 assert.deepEqual(opts(s),['backup','confront','quiet']);
 s=click(s,'backup');assert.ok(s.f.proof_version_log);assert.equal(s.current,'OP_TALK_'+first);
 assert.deepEqual(replay(d,s.history),s);
 return {first,commands:s.history.length};
});
check('new_post_novel_scene_is_reached_by_real_choices',()=>{
 const r=run({first:'t',chars:[],stop:s=>s.current==='UNWRITTEN'});
 assert.equal(r.state.current,'UNWRITTEN');
 assert.deepEqual(opts(r.state),['offer','private','self']);
 const s=click(r.state,'offer');assert.equal(s.current,'A6b');
 assert.equal(s.f.unwritten_future,'public_method');return r.state.history.length;
});
check('all_previously_verified_canon_facts_remain',()=>{
 assert.equal(d.canon.book,'今夜偏爱男主');assert.equal(d.canon.expelledChapter,13);
 assert.equal(d.canon.criticalDay,7);assert.equal(d.canon.performanceChapter,null);
 assert.match(d.canon.originalProtagonistFirstAction.status,/creative canon expansion/);
 assert.equal(d.version,'revision-r4.2');return d.canon.originalProtagonistFirstAction.status;
});
const dir=new URL('../qa/current/',import.meta.url);fs.mkdirSync(dir,{recursive:true});
const report={scope:'r4.2 first-choice canon-vs-deviation normal interpreter regression; not real player or device evidence',hashes:{story:crypto.createHash('sha256').update(fs.readFileSync(new URL('../data/STORY.json',import.meta.url))).digest('hex')},checks,passed:checks.filter(c=>c.status==='PASS').length,failed:checks.filter(c=>c.status==='FAIL').length};
fs.writeFileSync(new URL('r4-opening.json',dir),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(report.failed)process.exitCode=1;
