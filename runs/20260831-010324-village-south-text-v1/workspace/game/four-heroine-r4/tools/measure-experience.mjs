
import fs from 'node:fs';
import crypto from 'node:crypto';
import {createState,renderScene,choose} from './engine.mjs';
import {root,data} from './route-runner.mjs';
const src=JSON.parse(fs.readFileSync(new URL('qa/current/witnesses.json',root)));
const count=t=>(t.match(/[\u3400-\u9fff]/g)||[]).length;
const out={scope:'阅读时长推演，不是真人实测。正文、回应、全部可用选项字数；300–450汉字/分钟，每次决策3–6秒。翻页、滚动、停顿、菜单回看未计，因此仍可能偏乐观。',hashes:{story:crypto.createHash('sha256').update(fs.readFileSync(new URL('data/STORY.json',root))).digest('hex')},routes:[]};
for(const name of ['romance_t','romance_s','romance_l','romance_g','romance_glst']){
 const w=src.witnesses.find(x=>x.name===name); if(!w)throw Error(name);
 let s=createState(),fast=0,slow=0;const events=[];
 for(const cmd of w.commands){
  const v=renderScene(s,data),b=count(v.body.map(x=>x.text).join('')),buttons=count(v.choices.filter(x=>x.enabled).map(x=>x.label).join(''));
  const r=choose(s,data,cmd.id),a=count(r.reply.map(x=>x.text).join(''));
  const start=[fast,slow];fast+=(b+buttons+a)/450*60+3;slow+=(b+buttons+a)/300*60+6;
  events.push({scene:s.current,title:v.title,choice:cmd.id,label:v.choices.find(x=>x.id===cmd.id)?.label,bodyChars:b,allEnabledChoiceChars:buttons,responseChars:a,modeledStartSeconds:start,modeledCompleteSeconds:[fast,slow],response:r.reply.map(x=>x.text)});
  s=r.state;
 }
 out.routes.push({name,ending:s.ending,events});
}
fs.writeFileSync(new URL('qa/current/experience-model.json',root),JSON.stringify(out,null,2));
for(const r of out.routes){
 console.log(r.name);
 for(const seconds of [15,30,180,300,600,1200]){
  const rows=[0,1].map(i=>r.events.find(e=>e.modeledCompleteSeconds[i]>=seconds)||r.events.at(-1));
  console.log(seconds,rows.map(e=>`${e.scene} / ${e.title}`).join(' | '));
 }
 console.log('first complete',r.events[0].modeledCompleteSeconds,'3rd',r.events[2].modeledCompleteSeconds);
}
