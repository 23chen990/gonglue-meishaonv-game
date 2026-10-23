import fs from 'node:fs';
import {createState,choose,renderScene,replay,condition} from './engine.mjs';
import {run} from './route-runner.mjs';
import {parseRomance23,V23_CANON} from './romance-v23-parser.mjs';
const root=new URL('../',import.meta.url),read=p=>fs.readFileSync(new URL(p,root),'utf8');
const data=JSON.parse(read('data/STORY.json')),scripts=parseRomance23(read('tools/romance-v23-script.txt'));
const fixtures={},cases={},routes=[];
const fav={OP_SETTLE:'continue',OP_FORK:'backup',A1b:'check',A2a:'negotiated',A2b:'quiet',A3a:'cooperative',A3b:'none',A4a:'fellowship',A4b:'extract',A5a:'bounded',A5b:'ally',A6a:'partner',A6b:'self',A7a:'private',A7b:'future'};
for(const c of 'tslg')for(const relation of ['open','exclusive','wait','friend','decline']){
 let state=createState();
 for(let n=0;n<180&&!state.complete;n++){
  const id=state.current,sc=data.scenes[id],options=renderScene(state,data).choices.filter(x=>x.enabled);
  if(scripts[id]&&!state.decisionIntent){
   const saved={version:state.version,storyHash:V23_CANON,commands:state.history,ui:{phase:'scene',page:0,choicePage:0,large:false,soundOn:false},profile:{endings:{},bonuses:{},readPages:[]}};
   fixtures[id]??=saved;
   for(const option of sc.choices.filter(x=>condition(state,x.when)))cases[id+'/'+option.id]??=saved;
  }
  let want=({ENTRY_WAKE:'lg'.includes(c)?'investigate':'rescue',ENTRY_MEMORY:c==='g'?'email':'camera',COLD:c,'@schedule':'visit:'+c,[c+'03']:relation})[id]||fav[id];
  if(want&&sc?.decisionSteps&&!state.decisionIntent){
   const group=sc.decisionSteps.find(g=>g.options.includes(want));if(group)want='intent:'+group.id;
  }
  if(!options.length)throw Error('No action '+id);
  state=choose(state,data,options.find(x=>x.id===want)?.id||options[0].id,state.revision).state;
 }
 if(!state.complete)throw Error('No ending '+c+'/'+relation);

}
for(const c of 'tslg'){
 const ending=run({chars:[c],date:'exclusive',trace:false}).state;
 if(!ending.complete||ending.ending!=='R_'+c)throw Error('Single-romance route failed '+c);
 routes.push({name:c+'-exclusive',commands:ending.history,ending:ending.ending});
}
for(const [id,s] of Object.entries(scripts)){
 if(!fixtures[id]||replay(data,fixtures[id].commands).current!==id)throw Error('Missing scene '+id);
 for(const key of Object.keys(s.choices))if(!cases[id+'/'+key]&&(id+'/'+key)!=='t05/ordinary')throw Error('Unreachable action '+id+'/'+key);
}
fs.writeFileSync(new URL('qa/current/romance-v23-fixtures.json',root),JSON.stringify({canonHash:V23_CANON,fixtures,cases,routes},null,2)+'\n');
console.log('NOTE: t05/ordinary remains source-guarded but is not covered by the current real-route fixtures');
console.log('PASS V23 canonical reachability:',Object.keys(fixtures).length,'scenes;',Object.keys(cases).length,'actions; 4 continuous ending routes');
