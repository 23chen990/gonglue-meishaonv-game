"""Cover real unlocked @schedule states from interpreter witnesses, all selectable actions.
UI category traversal only; final touch-command route tests separately validate committing choices.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json,hashlib,sys
R=Path(__file__).resolve().parent.parent
W=json.loads((R/'qa/current/witnesses.json').read_text())['witnesses']
all_prefixes=[]
for w in W:
 if not w['name'].startswith('romance_'):continue
 for i,c in enumerate(w['commands']):
  if c['from']=='@schedule':all_prefixes.append(w['commands'][:i])
report={'mode':'fixture simulated storage + script replay, all normal-witness schedule prefixes','candidateStates':len(all_prefixes),'visited':0,'differentSets':0,'maxRealOptions':0,'failures':[]}
script='''(arr)=>{
let seen=new Set(),failures=[],visited=0,maxReal=0;
saveBlocked=true;
function branch(depth){
 if(depth>6)throw Error('nested navigation loop');
 const roots=[...document.querySelectorAll('.vn-dock [data-choice-group]')].map(x=>x.dataset.choiceGroup);
 const direct=[...document.querySelectorAll('.vn-dock [data-choice]')].map(x=>x.dataset.choice);
 if(direct.length>4)throw Error('too many direct choices: '+direct.join(','));
 if(roots.length>4)throw Error('too many category choices: '+roots.join(','));
 const options=[...direct];
 for(const id of roots){
  const b=document.querySelector('.vn-dock [data-choice-group="'+id+'"]');if(!b)throw Error('missing group');
  b.click();options.push(...branch(depth+1));
  const back=document.querySelector('.vn-dock [data-choice-back]');if(!back)throw Error('missing back from group '+id);
  back.click();
 }
 return options;
}
for(const prefix of arr){
 try{
  const s=replay(DATA,prefix);if(s.current!=='@schedule')continue;
  const choices=renderScene(s,DATA).choices.filter(o=>o.enabled).map(o=>o.id);
  if(!seen.has(choices.join('|'))){seen.add(choices.join('|'));maxReal=Math.max(maxReal,choices.length)}
  state=s;phase='scene';page=0;choicePage=0;panel='story';render();
  const displayed=branch(0);
  if(displayed.length!==choices.length||new Set(displayed).size!==choices.length||displayed.some(id=>!choices.includes(id)))throw Error('lost or duplicated '+JSON.stringify({expected:choices,actual:displayed}));
  visited++;
 }catch(e){failures.push({history:prefix.slice(-4).map(x=>x.id),error:String(e)});if(failures.length>=8)break}
}
return {visited,differentSets:seen.size,maxRealOptions:maxReal,failures};
}'''
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 context=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)
 p=context.new_page();p.set_default_timeout(15000)
 p.evaluate("""()=>{let m=new Map;Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v)}})}""")
 p.set_content((R/'index.html').read_text(),wait_until='load')
 # Start with only one normal romance walkthrough per combination and up to 400 states;
 # these are real commands and tested by the canonical engine, not fabricated relationships.
 result=p.evaluate(script,all_prefixes[:400])
 report.update(result);context.close();b.close()
report['status']='FAIL' if report['failures'] else 'PASS'
(R/'qa/current/v45-schedule-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,ensure_ascii=False,indent=2))
if report['failures']:sys.exit(1)
