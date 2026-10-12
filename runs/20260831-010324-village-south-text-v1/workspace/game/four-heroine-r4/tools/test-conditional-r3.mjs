/**
 * Witness-driven *displayed* conditional coverage.
 * No flag assignment, debug teleport or fabricated final state.
 * Reply blocks count only when their enclosing choice was actually selected.
 */
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {createState,choose,renderScene,condition,active,VERSION} from './engine.mjs';
import {data as d,root,run,defaultAction,count} from './route-runner.mjs';
const catalogue=new Map(), covered=new Map(), witnesses=[], errors=[], attempted=[];
for(const sc of Object.values(d.scenes)){
 (sc.blocks||[]).forEach((b,i)=>catalogue.set(sc.id+'/blocks/'+i,{scene:sc.id,q:b.when,rows:b.lines,type:'body'}));
 for(const o of sc.choices)(o.replyBlocks||[]).forEach((b,i)=>catalogue.set(sc.id+'/'+o.id+'/replyBlocks/'+i,{scene:sc.id,choice:o.id,q:b.when,rows:b.lines,type:'reply'}));
}
let currentName='';
function record(s,o,result,v){
 const sc=d.scenes[s.current];if(!sc)return;
 const prefix=[...s.history,{from:s.current,id:o.id,revision:s.revision}];
 const save=(key,rows)=>{
  if(!covered.has(key)||covered.get(key).commands.length>prefix.length){
   covered.set(key,{case:currentName,commands:prefix,beatIds:rows.map(x=>x.id),text:rows.map(x=>x.text)});
  }
 };
 for(const [i,b] of (sc.blocks||[]).entries())if(condition(s,b.when)){
  assert.ok(b.lines.every(x=>v.body.some(y=>y.id===x.id&&y.text===x.text)),sc.id+' body not rendered');
  save(sc.id+'/blocks/'+i,b.lines);
 }
 for(const [i,b] of (o.replyBlocks||[]).entries())if(condition(s,b.when)){
  assert.ok(b.lines.every(x=>result.reply.some(y=>y.id===x.id&&y.text===x.text)),sc.id+' reply not rendered');
  save(sc.id+'/'+o.id+'/replyBlocks/'+i,b.lines);
 }
}
function commands(name,log){
 currentName=name;let s=createState();
 for(const cmd of log){
  assert.equal(cmd.from,s.current);const v=renderScene(s,d),o=v.choices.find(x=>x.id===cmd.id&&x.enabled);
  assert.ok(o,'disabled witness '+cmd.from+'/'+cmd.id);
  const r=choose(s,d,o.id,cmd.revision);record(s,o,r,v);s=r.state;
 }
}
for(const file of ['witnesses.json','information-witnesses.json','exploration-witnesses.json']){
 const input=JSON.parse(fs.readFileSync(new URL('qa/current/'+file,root)));
 for(const w of input.witnesses)commands('replayed_inputs:'+w.name,w.commands);
}
const writer=new Map();
for(const sc of Object.values(d.scenes))for(const o of sc.choices)for(const e of o.effects||[]){
 if(e.op==='set'){
  const key=JSON.stringify([e.key,e.value]);if(!writer.has(key))writer.set(key,[]);
  writer.get(key).push({sid:sc.id,id:o.id,when:o.when});
 }
}
function alternatives(q,depth=0){
 if(!q||depth>5)return [[]];
 if(q.all)return q.all.reduce((a,b)=>a.flatMap(x=>alternatives(b,depth+1).map(y=>[...x,...y])).slice(0,50),[[]]);
 if(q.any)return q.any.flatMap(x=>alternatives(x,depth+1)).slice(0,50);
 if(q.eq)return [[{kind:'eq',key:q.eq[0],value:q.eq[1]}]];
 if(q.chosen)return [[{kind:'chosen',sid:q.chosen[0],id:q.chosen[1]}]];
 return [[]];
}
function configsFor(item){
 const sid=item.scene;
 let chars=[];
 if(/^R_[glst]+$/.test(sid))chars=[...sid.slice(2)];
 else if(/^(P|Q|H)_/.test(sid))chars=[...(sid.split('_')[1])];
 else if(/^[tslg]\d\d$/.test(sid))chars=[sid[0]];
 else if(/_(t|s|l|g)$/.test(sid))chars=[sid.at(-1)];
 const cfg={chars,options:{},trace:false,correctSource:false,repair:false};
 if(sid==='X02')cfg.options.EXEC_g='none';
 if(sid==='X05'){cfg.options.EXEC_g='none';cfg.options.A6a='exit';}
 if(item.choice)cfg.options[sid]=item.choice;
 if(item.q.otherActive){
  const c=item.q.otherActive;cfg.chars=[c,c==='t'?'s':'t'];cfg.repair=true;cfg.repairScope='exclusive';
  cfg.repairSubject=c;
  cfg.options[c+'02']={t:'fan',s:'promise',l:'rival',g:'leverage'}[c];
 }
 if(item.q.not?.seen&&/^R_/.test(sid)&&/^[tslg]\d\d$/.test(item.q.not.seen)){
  cfg.capChar=item.q.not.seen[0];cfg.capStage=Number(item.q.not.seen.slice(1))-1;
 }
 const out=[];
 for(const atoms of alternatives(item.q)){
  let choices=[structuredClone(cfg)];
  for(const a of atoms){
   if(a.kind==='chosen'){for(const c of choices)c.options[a.sid]=a.id;continue;}
   if(a.key==='first'){for(const c of choices)c.first=a.value;continue;}
   if(a.key.startsWith('opening_lie_')&&a.value===true){
    const who=a.key.at(-1);for(const c of choices){c.first=who;c.origin='lie';c.openingCheck='double';}
    continue;
   }
   const ws=writer.get(JSON.stringify([a.key,a.value]))||[];
   if(ws.length){
    choices=choices.flatMap(c=>ws.slice(0,5).map(w=>{
      const n=structuredClone(c);n.options[w.sid]=w.id;
      // Only satisfiable preconditions are layered; enabled-choice validation remains authoritative.
      const prereq=alternatives(w.when)[0]||[];
      for(const p of prereq){
       if(p.kind==='chosen')n.options[p.sid]=p.id;
       if(p.kind==='eq'){
        const prior=writer.get(JSON.stringify([p.key,p.value]))?.[0];if(prior)n.options[prior.sid]=prior.id;
       }
      }
      if(a.key.startsWith('bridge_'))n.forcePair=a.key.slice(7);
      if(a.key.startsWith('pair_')&&a.value==='pending'){n.forcePair=a.key.slice(5);delete n.options[n.forcePair[0]+'02'];n.options[n.forcePair[0]+'03']='exclusive';n.pairPending=true;}
      if(a.key==='s_left_operator'){n.latePersonal='s';n.delayStage=Number(sid.slice(1))-1;if(n.delayStage%2===0)n.delayStage--;}
      if(a.key==='g_left_job'){n.latePersonal='g';n.delayStage=Number(sid.slice(1))-1;if(n.delayStage%2===0)n.delayStage--;}
      if(d.scenes[w.sid]?.kind==='side')n.forceSide=w.sid;
      if(/^[tslg]\d\d$/.test(w.sid)&&!n.chars.includes(w.sid[0]))n.chars.push(w.sid[0]);
      if(w.sid.startsWith('RES_')){
       const proof=d.scenes[w.sid].choices.find(x=>x.id===w.id).effects.find(x=>x.op==='recordFate')?.proof;
       const a2=proof&&writer.get(JSON.stringify([proof,true]))?.find(x=>x.sid.startsWith('EXEC_'));
       if(a2){
        n.options[a2.sid]=a2.id;
        for(const p of alternatives(a2.when)[0]||[])if(p.kind==='eq'){
         const wr=writer.get(JSON.stringify([p.key,p.value]))?.[0];if(wr)n.options[wr.sid]=wr.id;
        }
       }
      }
      return n;
    })).slice(0,30);
   }
  }
  out.push(...choices);
 }
 return out;
}
function execute(name,cfg){
 currentName=name;
 const start=covered.size;
 const schedule=(s,acts,fallback)=>{
  // Establish the other relationship through ordinary available visits BEFORE
  // repairing the subject. No state assignment is used to satisfy otherActive.
  if(cfg.repairSubject){
   const other=cfg.chars.find(c=>c!==cfg.repairSubject);
   if(!s.f['active_'+other] && acts.some(a=>a.id==='visit:'+other))return 'visit:'+other;
  }
  if(cfg.forceSide&&!s.visited.includes(cfg.forceSide)){
   const candidates=[],seek=id=>{for(const req of d.scenes[id]?.requires||[])seek(req);candidates.push(id);};
   seek(cfg.forceSide);
   for(const id of candidates)if(acts.some(a=>a.id==='side:'+id))return 'side:'+id;
  }
  if(cfg.capChar&&s.stage[cfg.capChar]>=cfg.capStage)return 'rest';
  if(cfg.forcePair&&acts.some(a=>a.id==='pair:'+cfg.forcePair)){
   if(cfg.pairPending&&count(s,'P_'+cfg.forcePair)>=2)return fallback();
   return 'pair:'+cfg.forcePair;
  }
  if(cfg.latePersonal){
   const c=cfg.latePersonal,min=c==='s'?12:16;
   if(s.stage[c]>=cfg.delayStage&&s.slot<min)return 'rest';
  }
  return fallback();
 };
 const options={...cfg.options};
 if(cfg.pairPending)options['Q_'+cfg.forcePair]=s=>count(s,'Q_'+cfg.forcePair)===0?'reveal':'slow';
 attempted.push(name);
 try{
  const r=run({...cfg,options,schedule,observe:record});
  if(covered.size>start)witnesses.push({name,commands:r.state.history,ending:r.state.ending});
  return true;
 }catch(e){
  // A proposed scenario may request a disabled option. This is an unsuccessful search,
  // not a successful test, and does not manufacture any state to force it.
  errors.push({name,error:e.message,options});
  return false;
 }
}
for(let round=0;round<3;round++){
 const todo=[...catalogue].filter(([k])=>!covered.has(k));
 for(const [key,item] of todo){
  if(covered.has(key))continue;
  for(const [i,cfg] of configsFor(item).entries()){
   execute('direct:'+key+':'+i,cfg);
   if(covered.has(key))break;
  }
 }
}
// Combined source lies and personal conflicts need an explicit repair route.
for(const c of ['t','s','l','g'])execute('source-plus-conflict:'+c,{
 chars:[c],first:c,origin:'lie',openingCheck:'double',repair:true,trace:false,
 options:{[c+'02']:{t:'fan',s:'promise',l:'rival',g:'leverage'}[c]}
});
function emit(){
 const missing=[...catalogue].filter(([k])=>!covered.has(k)).map(([id,x])=>({id,condition:x.q,text:x.rows.map(b=>b.text)}));
 const report={version:VERSION,scope:'Actual rendered conditional body/reply blocks from ordinary commands. Not all possible state combinations or human play.',
  hashes:{story:crypto.createHash('sha256').update(fs.readFileSync(new URL('data/STORY.json',root))).digest('hex'),engine:crypto.createHash('sha256').update(fs.readFileSync(new URL('tools/engine.mjs',root))).digest('hex')},
  total:catalogue.size,covered:covered.size,missing,attempts:attempted.length,searchRejections:errors.length,
  status:missing.length?'GAPS_REMAIN':'ALL_CONDITIONAL_TEXT_WITNESSED'};
 fs.writeFileSync(new URL('qa/current/conditional-r3.json',root),JSON.stringify(report,null,2));
 fs.writeFileSync(new URL('qa/current/conditional-witnesses.json',root),JSON.stringify({hashes:report.hashes,witnesses},null,2));
 fs.writeFileSync(new URL('qa/current/conditional-prefixes.json',root),JSON.stringify({hashes:report.hashes,conditions:Object.fromEntries(covered)},null,2));
 fs.writeFileSync(new URL('qa/current/conditional-search-rejections.json',root),JSON.stringify(errors,null,2));
 console.log(JSON.stringify(report,null,2));
 if(missing.length)process.exitCode=1;
}
emit();
