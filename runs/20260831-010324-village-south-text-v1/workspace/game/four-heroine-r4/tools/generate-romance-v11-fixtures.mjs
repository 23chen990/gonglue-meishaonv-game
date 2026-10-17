import fs from 'node:fs';
import {createState,choose,renderScene,replay} from './engine.mjs';
const d=JSON.parse(fs.readFileSync(new URL('../data/STORY.json',import.meta.url),'utf8'));
const manifest=JSON.parse(fs.readFileSync(new URL('romance-v11-arcs.json',import.meta.url),'utf8'));
const out={};
const favorable={ENTRY_WAKE:'rescue',COLD:'t',OP_SETTLE:'continue',OP_FORK:'backup',OP_TALK_t:'slow',ENTRY_MEMORY:'camera',ENTRY_CLUES:'witness',A1b:'check',A2a:'negotiated',A2b:'quiet',A3a:'cooperative',A4a:'fellowship',A4b:'extract',A5a:'bounded',A5b:'ally',A6a:'partner',UNWRITTEN:'offer',A6b:'self',A7a:'private',A7b:'future'};
const check=(s,id)=>{
 if(Object.hasOwn(out,id))return;
 out[id]={version:s.version,storyHash:'84842ca69a861849f16b20d72b4b45421675ea5a934cad51d5f7866e703acf93',commands:s.history,ui:{phase:'scene',page:0,choicePage:0,large:false,soundOn:false},profile:{endings:{},bonuses:{},readPages:[]}};
 const r=replay(d,out[id].commands);if(r.current!==id)throw Error('Fixture not real replay '+id);
};
let s=createState();let path=[];
for(let i=0;i<300&&!s.complete;i++){
 if(Object.hasOwn(manifest.arcs,s.current))check(s,s.current);
 const view=renderScene(s,d),enabled=view.choices.filter(x=>x.enabled);
 if(!enabled.length)throw Error('No actions '+s.current);
 let action=favorable[s.current];
 if(s.current==='@schedule')action='rest';
 if(view.decisionStep===2){action=enabled.find(x=>x.id===action)?.id||enabled[0].id;}
 else if(d.scenes[s.current]?.decisionSteps)action=enabled[0].id;
 if(!enabled.some(x=>x.id===action))action=enabled[0].id;
 const prev=s.current;s=choose(s,d,action,s.revision).state;path.push(prev+'/'+action);
}
console.log('reached',Object.keys(out).join(', '),'after steps',path.length,'current',s.current,'complete',s.complete,'flag',s.f.final_xu);
// Also intentionally create fixtures at four personal relationship milestones.
for(const c of ['t','s','l','g']){
 let p=createState();const steps=c==='l'||c==='g'? [['ENTRY_WAKE','investigate'],['ENTRY_MEMORY',c==='l'?'camera':'email'],['COLD',c],['OP_SETTLE','continue'],['OP_FORK','backup']] : [['ENTRY_WAKE','rescue'],['COLD',c],['OP_SETTLE','continue'],['OP_FORK','backup']];
 for(const [id,action] of steps){if(p.current!==id)break;p=choose(p,d,action,p.revision).state;}
 for(let i=0;i<300&&!p.complete;i++){
  if(p.current===c+'03'){check(p,p.current);break;}
  const v=renderScene(p,d),a=v.choices.filter(x=>x.enabled);
  if(!a.length)break;
  const preferred=p.current==='@schedule'?a.find(x=>x.id==='visit:'+c)?.id||'rest':p.current.startsWith('OP_TALK_')?'slow':p.current.startsWith('OP_SECRET_')?'honest':p.current.startsWith('OP_DATE_')?'attend':p.current==='A1b'?'check':null;
  const act=a.find(x=>x.id===preferred)?.id||a[0].id;
  p=choose(p,d,act,p.revision).state;
 }
}
const dest=new URL('../qa/current/romance-v11-fixtures.json',import.meta.url);
fs.mkdirSync(new URL('../qa/current',import.meta.url),{recursive:true});
fs.writeFileSync(dest,JSON.stringify({status:'replay-verified',fixtures:out},null,2)+'\n');
console.log(JSON.stringify({fixtures:Object.keys(out).length,bytes:fs.statSync(dest).size,notReached:Object.keys(manifest.arcs).filter(id=>!out[id])}));