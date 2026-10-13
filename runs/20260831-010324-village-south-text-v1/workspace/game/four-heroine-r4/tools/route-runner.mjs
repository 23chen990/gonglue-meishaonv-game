import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createState,choose,renderScene,availableActions} from './engine.mjs';
export const root=new URL('../',import.meta.url);
export const data=JSON.parse(fs.readFileSync(new URL('data/STORY.json',root),'utf8'));
export const ep=JSON.parse(fs.readFileSync(new URL('data/EPILOGUES.json',root),'utf8'));
export const base={
 t01:'share',s01:'honest',l01:'listen',g01:'trade',t02:'honest',s02:'reason',l02:'ask',g02:'fair',
 A1b:'check',A2a:'negotiated',A2b:'quiet',A3a:'shared',A3b:'none',A4a:'stay',A4b:'extract',A5a:'bounded',A5b:'ally',
 A6a:'public',A6b:'relationships',A7a:'together',A7b:'honor',LU_MOVE1:'own',LU_MOVE2:'ally',
 EXEC_t:'terms',EXEC_s:'slots',EXEC_l:'own',EXEC_g:'bounded',XU_WORK:'portfolio',
 E01:'facts',SELF01:'create',SELF02:'sample',REST:'prepare',
 t04:'tease',s04:'ask',l04:'plain',g04:'ask',t05:'closer',s05:'kiss',l05:'yes',g05:'ask',
 s06:'truth',g06:'clear',l06:'ask',t07:'compare',s07:'together',l07:'demand',g07:'ask',
 t08:'direct',l08:'specific',g08:'self',t09:'ask',s09:'need',l09:'watch',g09:'true'
};
export const count=(s,from,id)=>s.history.filter(h=>h.from===from&&(id===undefined||h.id===id)).length;
export function defaultAction(s,cfg={}){
 const acts=availableActions(s,data),has=id=>acts.some(x=>x.id===id),cs=cfg.chars??['t'];
 if(cfg.repair)for(const c of cs){if(has('repair2:'+c))return 'repair2:'+c;if(has('repair1:'+c))return 'repair1:'+c;}
 if(cfg.correctSource)for(const c of cs)if(has('source-repair:'+c))return 'source-repair:'+c;
 if(cfg.reopen)for(const c of cs)if(has('reopen:'+c))return 'reopen:'+c;
 for(const n of [2,3])for(const c of cs)if(s.stage[c]<n&&has('visit:'+c))return 'visit:'+c;
 if(cs.length===2&&!cfg.skipPairs){const id='pair:'+cs.slice().sort().join('');if(has(id))return id;}
 if(cs.length>=3&&!cfg.skipGroups){const id='group:'+cs.slice().sort().join('');if(has(id))return id;}
 if(!cfg.noDeep){
  const candidates=cs.filter(c=>has('visit:'+c)).sort((a,b)=>s.stage[a]-s.stage[b]);
  if(candidates.length)return 'visit:'+candidates[0];
 }
 if(!cfg.noSides)for(const id of ['E01','SELF01','SELF02'])if(has('side:'+id))return 'side:'+id;
 return 'rest';
}
function preferred(s,cfg){
 const id=s.current,c=cfg.first||cfg.chars?.[0]||'self';
 if(id==='ENTRY_WAKE')return cfg.canon?'canon':['l','g'].includes(c)||cfg.investigation?'investigate':'rescue';
 if(id==='ENTRY_CLUES')return cfg.canonResponse||'witness';
 if(id==='ENTRY_MEMORY')return cfg.investigation||(c==='g'?'email':'camera');
 if(id==='OP_CANON')return cfg.canonAfter||'backstage';
 if(id==='OP_FORK')return cfg.fork||'backup';
 if(id==='UNWRITTEN')return cfg.future||'offer';
 if(id==='OP_SETTLE')return 'continue';
 if(id==='COLD')return c;
 if(id.startsWith('SPARK_'))return cfg.spark||'bold';
 if(id.startsWith('OP_TALK_'))return id==='OP_TALK_self'?'credit':cfg.style||'flirt';
 if(id.startsWith('OP_SECRET_'))return cfg.origin||'truth';
 if(id==='OP_RIVAL')return cfg.work||'own';
 if(id.startsWith('OP_CHECK_'))return cfg.openingCheck||((cfg.origin||'truth')==='lie'?'admit':(cfg.origin||'truth')==='partial'?'ask':'present');
 if(id.startsWith('OP_DATE_'))return cfg.openingDate||'attend';
 if(id==='OP_SELF')return 'take';
 if(id.startsWith('OP_WORK_'))return id==='OP_WORK_free'?'plan':'do';
 if(/^[tslg]03$/.test(id))return cfg.date||'open';
 if(id.startsWith('REOPEN_'))return cfg.reopenChoice||'open';
 if(id.startsWith('OPEN_CLEAR_'))return 'correct';
 if(id.startsWith('Q_'))return 'together';
 if(id.startsWith('R1_'))return 'own';
 if(id.startsWith('RA_'))return 'act';
 if(id.startsWith('R2_'))return cfg.repairScope||'open';
 if(id.startsWith('DUE_'))return 'truth';
 if(id.startsWith('FOUND_'))return 'admit';
 if(id.startsWith('CROSS_'))return 'admit';
 if(/^H_.*_ASK_/.test(id))return 'ask';
 if(id.startsWith('H_')&&id.endsWith('_TALK'))return 'tell';
 if(id.startsWith('H_'))return 'favor_'+(cfg.favor||cfg.chars[0]);
 return base[id];
}
export function run(cfg={}){
 let s=createState(),trace=[],iterations=0;
 while(!s.complete&&iterations++<550){
  if(cfg.stop?.(s))return {state:s,trace};
  const v=renderScene(s,data),opts=v.choices.filter(o=>o.enabled);
  assert.ok(opts.length,'No enabled input at '+s.current);
  let target;
  if(s.current==='@schedule')target=cfg.schedule?.(s,availableActions(s,data),()=>defaultAction(s,cfg))??defaultAction(s,cfg);
  else target=preferred(s,cfg);
  const override=cfg.options?.[s.current];
  if(override!==undefined){target=typeof override==='function'?override(s,v):override;}
  let selected=opts.find(o=>o.id===target);
  if(!selected&&override!==undefined)throw Error('Configured input unavailable: '+s.current+'/'+target+'; enabled: '+opts.map(o=>o.id));
  if(!selected&&s.current==='@schedule')throw Error('Scheduled input unavailable: '+target);
  selected??=opts[0];
  const before=JSON.stringify(s),result=choose(s,data,selected.id);
  assert.equal(JSON.stringify(s),before,'Input state mutated');
  if(cfg.trace!==false)trace.push({at:s.revision,from:s.current,clock:s.clock,slot:s.slot,title:v.title,
   body:v.body,choice:selected.id,label:selected.label,reply:result.reply,next:result.state.current,
   stage:result.state.stage});
  cfg.observe?.(s,selected,result,v);
  s=result.state;
 }
 assert.ok(s.complete,'Run did not terminate');return {state:s,trace};
}
