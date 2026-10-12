import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {createState,choose,renderScene,replay,active} from './engine.mjs';
const data=JSON.parse(fs.readFileSync(new URL('../data/STORY.json',import.meta.url),'utf8'));
const checks=[];
const check=(name,fn)=>{try {fn();checks.push({name,status:'PASS'});}catch(e){checks.push({name,status:'FAIL',error:e.message});}};
function opening(){
 let s=createState();
 for(const id of ['steady','look','focus']){s=choose(s,data,id,s.revision).state;}
 return s;
}
check('new_game_wakes_instead_of_starting_with_omniscience',()=>{
 const s=createState();assert.equal(s.current,'ENTRY_WAKE');
 assert.ok(!s.f.novel_recognized);assert.ok(!s.f.source_blue_disc);
 const v=renderScene(s,data);assert.ok(v.body.some(x=>x.text.includes('头晕')));
 assert.ok(!v.body.some(x=>x.speaker==='B'));
 assert.deepEqual(v.choices.filter(x=>x.enabled).map(x=>x.id),['steady']);
 assert.throws(()=>choose(s,data,'t'),/Unavailable/);
});
check('independent_identity_clues_precede_recognition',()=>{
 let s=choose(createState(),data,'steady').state;
 assert.equal(s.current,'ENTRY_CLUES');assert.ok(s.f.badge_checked);assert.ok(!s.f.novel_recognized);
 const v=renderScene(s,data),txt=v.body.map(x=>x.text).join('\n');
 for(const needle of ['许照','栖光','唐映雪','陆景行'])assert.ok(txt.includes(needle),needle);
 s=choose(s,data,'look').state;
 assert.ok(s.f.novel_recognized);assert.equal(s.current,'ENTRY_MEMORY');
 assert.ok(!s.f.source_blue_disc);
});
check('canon_is_verified_and_not_a_proposed_chapter_number',()=>{
 const s=opening();assert.equal(s.current,'COLD');
 assert.equal(data.canon.book,'今夜偏爱男主');assert.equal(data.canon.expelledChapter,13);
 assert.equal(data.canon.criticalDay,7);assert.equal(data.canon.performanceChapter,null);
 assert.equal(s.clock.time,'19:02');assert.ok(s.f.blue_location_known);
 assert.ok(!s.f.source_blue_disc);assert.ok(s.f.novel_recognized);
 assert.ok(!JSON.stringify(data.scenes.ENTRY_MEMORY).includes('第六章'));
});
for(const first of ['t','s','l','g','self'])check('first_choice_'+first+'_actual_action_proof_and_no_instant_romance',()=>{
 const before=opening(),out=choose(before,data,first),s=out.state;
 assert.equal(s.current,'OP_SETTLE');assert.equal(s.f.opening_route,first);
 assert.equal(s.f.opening_method,{t:'performer_cue',s:'producer_switch',l:'record_switch',g:'authorization_check',self:'audio_handoff'}[first]);
 assert.ok(s.f.source_blue_disc);assert.ok(s.f.blue_audio_checked);
 assert.ok(s.factOrigins.source_blue_disc.source==='COLD/'+first);
 assert.equal(s.f.first_win,true);assert.deepEqual(active(s),[]);
 const txt=out.reply.map(x=>x.text).join('\n');
 for(const bad of ['最后一句，唱给你听','不是加班','勾了勾手指','不是助理的'])assert.ok(!txt.includes(bad),bad);
 assert.ok(txt.includes('阿衡'));assert.ok(txt.includes('陆景行'));
 const after=choose(s,data,'continue').state;
 assert.equal(after.current,'OP_TALK_'+first);
 assert.deepEqual(replay(data,after.history),after);
});
const outdir=new URL('../qa/current/',import.meta.url);fs.mkdirSync(outdir,{recursive:true});
const report={scope:'New r4 opening tests; normal interpreter choices, not human timing',storyHash:crypto.createHash('sha256').update(fs.readFileSync(new URL('../data/STORY.json',import.meta.url))).digest('hex'),checks};
fs.writeFileSync(new URL(process.env.RED?'r4-opening-red.json':'r4-opening.json',outdir),JSON.stringify(report,null,2));
console.log(JSON.stringify(checks,null,2));
if(checks.some(x=>x.status==='FAIL'))process.exitCode=1;
