/** Replay only real engine commands. Never set scene or invent relationship flags. */
import fs from 'node:fs';import crypto from 'node:crypto';
import {createState,choose,renderScene,replay} from './engine.mjs';
const root=new URL('../',import.meta.url);
const raw=fs.readFileSync(new URL('data/STORY.json',root));const DATA=JSON.parse(raw);
const storyHash=crypto.createHash('sha256').update(raw).digest('hex');
const manifest=JSON.parse(fs.readFileSync(new URL('tools/romance-v13-scenes.json',root)));
const all=manifest.scenes;
const fixtures={};
const favored={ENTRY_WAKE:'rescue',COLD:'t',OP_SETTLE:'continue',OP_FORK:'backup',A1b:'check',A2a:'negotiated',A2b:'quiet',A3a:'cooperative',A3b:'none',A4a:'fellowship',A4b:'extract',A5a:'bounded',A5b:'ally',A6a:'partner',A6b:'self',A7a:'private',A7b:'future'};
for(const c of 'tslg'){
 let state=createState();
 for(let i=0;i<130&&!state.complete;i++){
  if(Object.hasOwn(all,state.current)&&!Object.hasOwn(fixtures,state.current)){
   const slot=state.current;
   fixtures[slot]={version:state.version,storyHash,commands:state.history,ui:{phase:'scene',page:0,choicePage:0,large:false,soundOn:false},profile:{endings:{},bonuses:{},readPages:[]}};
   const restored=replay(DATA,fixtures[slot].commands);
   if(restored.current!==slot)throw new Error('Fixture failed replay '+slot);
  }
  const view=renderScene(state,DATA);const options=view.choices.filter(a=>a.enabled);
  if(!options.length)throw new Error('No canonical action '+state.current);
  let want=favored[state.current];
  if(state.current==='@schedule')want='visit:'+c;
  if(view.decisionStep===1&&DATA.scenes[state.current]?.decisionSteps)want=null;
  const id=options.find(x=>x.id===want)?.id||options[0].id;
  state=choose(state,DATA,id,state.revision).state;
 }
}
if(Object.keys(fixtures).length!==36)throw new Error('Real replay cannot reach all 36 episodes: '+Object.keys(fixtures));
fs.mkdirSync(new URL('qa/current',root),{recursive:true});
fs.writeFileSync(new URL('qa/current/romance-v13-fixtures.json',root),JSON.stringify({status:'canonical-replay',storyHash,fixtures},null,2)+'\n');
console.log('PASS V13 fixture replay: '+Object.keys(fixtures).length+' real scenes; '+new Set(Object.keys(fixtures).map(x=>x[0])).size+' heroines');
