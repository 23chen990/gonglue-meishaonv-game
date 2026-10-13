import fs from 'node:fs';
import assert from 'node:assert/strict';
import {run,data as d} from './route-runner.mjs';
import {choose,renderScene,createState,replay,active,condition} from './engine.mjs';
const out=[];
const check=(name,f)=>{try{out.push({name,status:'PASS',detail:f()});}catch(e){out.push({name,status:'FAIL',error:String(e)});}};
const txt=(r,id,part='body')=>r.trace.find(t=>t.from===id)?.[part].map(b=>b.text).join('\n')||'';
check('NEW-01 deferred disclosure is not remembered before it occurs',()=>{
 const r=run({chars:['s','t'],options:{s06:'time'}});
 assert.ok(!txt(r,'s07').includes('后来你补说'));assert.ok(txt(r,'s07').includes('散场前'));
});
check('NEW-02 leaving an outing does not force the follow-up activity',()=>{
 const r=run({chars:['t'],options:{t10:'leave'}});
 const row=r.trace.find(t=>t.from==='t10');
 assert.notEqual(row.next,'t11');return row.next;
});
check('NEW-03 late private visit after resignation has no old keys or operator authority',()=>{
 const r=run({chars:['s'],options:{A3a:'exit',EXEC_s:'handover'},schedule:(s,as,f)=>s.stage.s===3&&s.slot<13?'rest':f()});
 const text=txt(r,'s05');assert.ok(!text.includes('清辞把舞台灯依次关掉'));assert.ok(text.includes('接班'));
});
check('NEW-04 l09 watch is remembered as watching, not diagnosing; learn is not why-shot',()=>{
 const a=run({chars:['l'],options:{l09:'watch'}}),b=run({chars:['l'],options:{l09:'learn'}});
 assert.ok(txt(a,'l10').includes('没硬夸'));assert.ok(!txt(a,'l10').includes('自己挑出了一处'));
 assert.ok(!txt(b,'l10').includes('你问我那天为什么拍'));
});
check('NEW-05 shared outings do not fabricate an intervening dinner or newly sent call',()=>{
 const s=run({chars:['s']}),g=run({chars:['g'],options:{g08:'child'}}),t=run({chars:['t'],options:{t08:'defend'}});
 assert.ok(!txt(s,'s05').includes('上次你'));assert.ok(!txt(g,'g09').includes('我后来自己去买'));
 assert.ok(!txt(t,'t09').includes('我照做了'));
});
check('NEW-06 named memories preserve actual words, giver and location',()=>{
 const t=run({chars:['t']}),s=run({chars:['s'],options:{s09:'person'}}),g=run({chars:['g']});
 assert.ok(!txt(t,'t03').includes('分我半盒'));assert.ok(!txt(t,'R_t').includes('货梯边'));
 assert.ok(!txt(s,'s10').includes('你上次问我不当负责人'));assert.ok(!txt(g,'g09').includes('上次说'));
});
check('NEW-07 authoring ending min-depth config is consumed by the runtime',()=>{
 const engine=fs.readFileSync(new URL('engine.mjs',import.meta.url),'utf8');
 assert.ok(engine.includes('minimumStageSingle')&&engine.includes('minimumStageMulti'));
});
check('NEW-08 work fate chain points to actual earlier self-rescue choice',()=>{
 const s=run({chars:[]}).state;
 assert.equal(s.fateLog.xu.plan.source,'A6a/public');
});
check('NEW-09 repeated group invitation does not say first meeting each time',()=>{
 const r=run({chars:['g','l','s','t'],options:{H_glst_TALK:s=>s.history.filter(h=>h.from==='H_glst_TALK').length<1?'wait':'tell'}});
 const rows=r.trace.filter(x=>x.from==='H_glst');assert.ok(rows.length>=2);
 assert.ok(!rows[1].body.some(b=>b.text.includes('第一次五个人')));
});
check('NEW-10 minimum romance ending never recalls an unvisited private date',()=>{
 const r=run({chars:['t'],noDeep:true});
 assert.equal(r.state.stage.t,3);assert.equal(r.state.ending,'R_t');
 assert.ok(!txt(r,'R_t').includes('耳机线太短的借口'));
});
fs.mkdirSync(new URL('../qa/current/',import.meta.url),{recursive:true});
const report={scope:'New issues found during independent second-pass editing; legal inputs only',passed:out.filter(x=>x.status==='PASS').length,failed:out.filter(x=>x.status==='FAIL').length,cases:out};
fs.writeFileSync(new URL('../qa/current/independent-regression.json',import.meta.url),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));process.exitCode=report.failed?1:0;
