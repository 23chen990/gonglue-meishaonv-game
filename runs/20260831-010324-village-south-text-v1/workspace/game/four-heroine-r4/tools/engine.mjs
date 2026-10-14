/* Deterministic, command-replay interpreter. Canonical text is data/STORY.json.
 * No network, money, implicit consent, mutable collection replay, or state injection.
 */
export const VERSION = 'bookside-revision-r4.3';
const CHARS = ['t','s','l','g'];
const copy = x => JSON.parse(JSON.stringify(x));
const sorted = xs => [...new Set(xs)].sort();
const keyPair = xs => sorted(xs).join('');
const pairKeys = cs => cs.flatMap((c,i)=>cs.slice(i+1).map(z=>keyPair([c,z])));
export function createState(){
 const f={evidence:0,early_end:false,saved:false,promise_target:'none',promise_due:7};
 for(const c of CHARS)Object.assign(f,{['active_'+c]:false,['scope_'+c]:'none',
  ['pending_'+c]:false,['value_conflict_'+c]:false,['reciprocal_'+c]:false,
  ['latent_'+c]:false,['breach_'+c]:false,['pursued_'+c]:false,['issue_'+c]:0,
  ['commitment_'+c]:'none'});
 return {version:VERSION,revision:0,current:'ENTRY_WAKE',slot:0,apPending:false,clock:{day:1,time:'18:59'},f,
  visited:[],stage:Object.fromEntries(CHARS.map(c=>[c,0])),
  known:Object.fromEntries(CHARS.map(c=>[c,[]])),sources:[],denials:{},history:[],
  breakups:[],ever:[],read:[],pendingAction:null,ending:null,complete:false,
  factOrigins:{},issueOrigins:{},fateLog:{},groupVotes:{},groupHistory:[],
  disclosureDue:[],calendarResume:null,discoveryQueue:[],discoveryResume:null};
}
export const active = s => sorted(CHARS.filter(c=>s.f['active_'+c]));
const issue = (s,c) => !!(s.f['pending_'+c]||s.f['value_conflict_'+c]);
const canDate = (s,c) => s.stage[c]>=2 && !!s.f['reciprocal_'+c] &&
 !issue(s,c)&&!s.f['opening_lie_'+c]&&!s.f['latent_'+c]&&!s.f['breach_'+c];
const goodBridge = (s,k) => !!s.f['bridge_'+k]&&s.f['bridge_'+k]!=='unfair';
const clean = (s,c) => canDate(s,c)&&!(s.denials[c]?.others.length);
export function condition(s,q){
 if(!q)return true;
 if(q.all)return q.all.every(x=>condition(s,x));
 if(q.any)return q.any.some(x=>condition(s,x));
 if(q.not)return !condition(s,q.not);
 if(q.eq)return (s.f[q.eq[0]]??null)===q.eq[1];
 if(q.ne)return (s.f[q.ne[0]]??null)!==q.ne[1];
 if(q.ge)return Number(s.f[q.ge[0]]||0)>=q.ge[1];
 if(q.seen)return s.visited.includes(q.seen);
 if(q.chosen)return s.history.some(h=>h.from===q.chosen[0]&&h.id===q.chosen[1]);
 if(q.deniedPeer)return !!s.denials[q.deniedPeer[0]]?.others.includes(q.deniedPeer[1])&&!s.denials[q.deniedPeer[0]]?.discovered;
 if(q.hasDenial)return !!s.denials[q.hasDenial]?.others.length;
 if(q.otherActive)return active(s).some(c=>c!==q.otherActive);
 if(q.canDate)return canDate(s,q.canDate);
 if(q.pairReady){const cs=[...q.pairReady];return goodBridge(s,q.pairReady)&&
  cs.every(c=>s.f['active_'+c]&&s.f['scope_'+c]==='open'&&clean(s,c));}
 throw Error('Unknown condition '+JSON.stringify(q));
}
function origin(s){return {command:s.revision,source:s.executing||s.current,slot:s.slot};}
function source(s,c,fact,people){
 s.sources.push({observer:c,fact,...(people?{people:sorted(people)}:{}),...origin(s)});
}
function invalidate(s,c){
 for(const k of Object.keys(s.f)){
  if(/^pair_[glst]{2}$/.test(k)&&k.slice(5).includes(c)&&s.f[k]==='agreed')s.f[k]='needs_reconfirmation';
  if(/^group_accepted_[glst]+$/.test(k)&&k.slice(15).includes(c))s.f[k]=false;
 }
}
function setFlag(s,k,v){
 const old=s.f[k];
 if(/^(pending_|value_conflict_)/.test(k)&&v===true){
  const c=k.split('_').at(-1),o=origin(s);
  // Multiple effects in one command are one incident; a fresh incident invalidates a prior repair.
  if(!s.issueOrigins[c]?.some(x=>x.command===o.command)){
   s.f['issue_'+c]=(s.f['issue_'+c]||0)+1;
   (s.issueOrigins[c]??=[]).push({...o,key:k});invalidate(s,c);
  }
 }
 if(/^active_[glst]$/.test(k)&&old!==v)invalidate(s,k.slice(-1));
 if(/^scope_[glst]$/.test(k)&&old!==v)invalidate(s,k.slice(-1));
 s.f[k]=copy(v);
 if(old!==v||!s.factOrigins[k])s.factOrigins[k]={...origin(s),value:copy(v)};
}
function disclose(s,c,proactive=false){
 const actual=active(s).filter(x=>x!==c);
 s.known[c]=sorted(actual);source(s,c,'current_relationships',actual);
 s.sources.at(-1).commitments=Object.fromEntries(actual.map(x=>[x,s.f['scope_'+x]]));
 const denied=s.denials[c];
 const revealed=denied&&denied.others.some(x=>actual.includes(x));
 if(revealed&&!denied.discovered){
  denied.discovered=true;denied.discoverySource=origin(s);
  setFlag(s,'pending_'+c,true);setFlag(s,'latent_'+c,false);
  source(s,c,'contradiction_with_own_prior_denial',denied.others.filter(x=>actual.includes(x)));
  if(!proactive&&!s.discoveryQueue.includes(c))s.discoveryQueue.push(c);
 }
 if(s.f['scope_'+c]==='exclusive'&&actual.length&&!s.f['pending_'+c])setFlag(s,'pending_'+c,true);
}
function endRelationship(s,c,reason){
 if(s.f['active_'+c]&&reason==='conflict')s.breakups=sorted([...s.breakups,c]);
 source(s,c,'relationship_ended_explicitly');
 setFlag(s,'active_'+c,false);setFlag(s,'scope_'+c,'ended');setFlag(s,'commitment_'+c,'none');
 setFlag(s,'last_end_reason_'+c,reason||'explicit');
}
function finishRepair(s,e){
 const c=e.character;
 if(!s.f['repair_started_'+c]||!s.f['repair_action_'+c])throw Error('Repair requires acknowledgement AND an executed repair action');
 if(s.f['issue_'+c]!==s.f['repair_issue_'+c]||s.f['repair_action_issue_'+c]!==s.f['issue_'+c])throw Error('New issue invalidates repair');
 if(e.scope==='exclusive')active(s).filter(x=>x!==c).forEach(x=>endRelationship(s,x,'respectful_change'));
 for(const k of ['pending','value_conflict','latent','breach','opening_lie'])setFlag(s,k+'_'+c,false);
 setFlag(s,'reciprocal_'+c,true);setFlag(s,'trust_'+c,'rebuilding');
 setFlag(s,'repair_started_'+c,false);setFlag(s,'repaired_'+c,true);
 delete s.denials[c];
 if(s.stage[c]>=3&&s.f['pursued_'+c]&&e.scope!=='friend'){
  setFlag(s,'active_'+c,true);setFlag(s,'scope_'+c,e.scope);
  setFlag(s,'commitment_'+c,e.scope==='exclusive'?'relationship':'dating');
  s.ever=sorted([...s.ever,c]);
 }else if(e.scope==='friend'){
  endRelationship(s,c,'respectful_change');setFlag(s,'scope_'+c,'friend');setFlag(s,'pursued_'+c,false);
 }
 disclose(s,c,true);source(s,c,'repair_accepted_'+e.scope);
}
function applyEffect(s,e){
 const c=e.character;
 switch(e.op){
 case 'set':setFlag(s,e.key,e.value);break;
 case 'add':setFlag(s,e.key,Number(s.f[e.key]||0)+e.value);break;
 case 'learnFact':
  if(!CHARS.includes(c)||typeof e.fact!=='string'||e.fact.length>80)throw Error('Invalid knowledge event');
  source(s,c,e.fact);setFlag(s,'knows_'+e.fact+'_'+c,true);break;
 case 'disclose':disclose(s,c,s.executing.startsWith('R1_'));break;
 case 'discloseAll':active(s).forEach(x=>disclose(s,x));break;
 case 'denyRelations':{
  const others=active(s).filter(x=>x!==c);
  // Keep an unresolved original denial; repeating it cannot erase a past lie after a breakup.
  if(!s.denials[c]?.others.length)s.denials[c]={others,...origin(s),discovered:false};
  source(s,c,'heard_player_denial');
  if(others.length)setFlag(s,'latent_'+c,true);
  break;}
 case 'latentLie':setFlag(s,'latent_'+c,true);setFlag(s,'lie_kind_'+c,e.kind);source(s,'player',e.kind);break;
 case 'pairConsent':{
  const k=keyPair(e.members);
  if(!condition(s,{pairReady:k}))throw Error('Invalid pair consent '+k);
  e.members.forEach(x=>disclose(s,x));
  if(e.members.every(x=>!issue(s,x))){
   setFlag(s,'pair_'+k,'agreed');
   e.members.forEach(x=>{source(s,x,'accept_peer',e.members.filter(z=>z!==x));setFlag(s,'commitment_'+x,'relationship');});
  }else setFlag(s,'pair_'+k,'pending_after_disclosure');
  break;}
 case 'confessKnown':
  if(s.f['latent_'+c]||s.f['breach_'+c]){
   if(!issue(s,c))setFlag(s,'pending_'+c,true);
   setFlag(s,'latent_'+c,false);source(s,c,'admitted_prior_false_statement');
  }
  disclose(s,c,true);break;
 case 'beginRepair':
  if(s.f['latent_'+c]||s.f['breach_'+c]){
   if(!issue(s,c))setFlag(s,'pending_'+c,true);
   setFlag(s,'latent_'+c,false);source(s,c,'admitted_prior_false_statement');
  }
  setFlag(s,'repair_started_'+c,true);setFlag(s,'repair_action_'+c,false);
  setFlag(s,'repair_issue_'+c,s.f['issue_'+c]);break;
 case 'performRepair':
  if(!s.f['repair_started_'+c]||s.f['repair_issue_'+c]!==s.f['issue_'+c])throw Error('Stale repair task');
  if(s.denials[c]?.others.length){
   active(s).forEach(x=>disclose(s,x,true));
   s.denials[c].discovered=true;source(s,c,'prior_denial_corrected_to_affected_people',s.denials[c].others);
  }else disclose(s,c,true);
  if(s.f['opening_lie_'+c]){source(s,c,'aheng_source_corrected');setFlag(s,'opening_lie_'+c,false);}
  source(s,c,'repair_action_performed');
  setFlag(s,'repair_issue_'+c,s.f['issue_'+c]);setFlag(s,'repair_action_issue_'+c,s.f['issue_'+c]);
  setFlag(s,'repair_action_'+c,true);break;
 case 'finishRepair':finishRepair(s,e);break;
 case 'endRelationship':endRelationship(s,c,e.reason);break;
 case 'endAll':active(s).forEach(x=>endRelationship(s,x,'withdrawal'));break;
 case 'cooldownReopen':setFlag(s,'reopen_after_'+c,s.slot+1);break;
 case 'deferDisclosure':
  if(!s.disclosureDue.includes(c))s.disclosureDue.push(c);
  setFlag(s,'disclosure_deferred_'+c,true);break;
 case 'revealFromPeer':{
  if(!s.f['active_'+c]||!s.f['active_'+e.peer]||!s.denials[c]?.others.includes(e.peer))throw Error('No concrete peer contradiction');
  source(s,c,'heard_peer_confirm_relationship',[e.peer]);s.sources.at(-1).commitment=s.f['scope_'+e.peer];
  s.denials[c].discovered=true;s.denials[c].discoverySource=origin(s);
  setFlag(s,'pending_'+c,true);setFlag(s,'latent_'+c,false);break;}
 case 'ackDiscovery':source(s,c,'acknowledged_discovered_lie');break;
 case 'lateApplication':
  setFlag(s,s.f.plan_l==='fellowship'?'proof_l_application':'proof_l_screen',true);break;
 case 'groupStart':{
  const k=keyPair(e.members);
  s.groupVotes[k]={};setFlag(s,'group_seen_'+k,true);setFlag(s,'group_accepted_'+k,false);
  s.groupHistory.push({members:sorted(e.members),...origin(s)});break;}
 case 'groupVote':{
  const k=keyPair(e.members);
  if(!s.groupVotes[k])throw Error('Group vote without meeting');
  if(e.answer==='yes'&&(!s.f['active_'+c]||s.f['scope_'+c]!=='open'||!clean(s,c)))throw Error('Invalid individual group consent');
  s.groupVotes[k][c]=e.answer;
  if(e.answer==='yes')setFlag(s,'commitment_'+c,'relationship');
  source(s,c,'group_vote_'+e.answer,e.members.filter(x=>x!==c));
  e.members.filter(x=>x!==c).forEach(x=>source(s,x,'heard_group_vote_'+e.answer,[c]));break;}
 case 'groupWait':setFlag(s,'group_accepted_'+keyPair(e.members),false);break;
 case 'groupFinish':{
  const k=keyPair(e.members),cs=sorted(e.members);
  const agreed=keyPair(active(s))===k&&cs.every(x=>s.groupVotes[k]?.[x]==='yes'&&clean(s,x)&&
    s.f['scope_'+x]==='open'&&cs.filter(z=>z!==x).every(z=>s.known[x].includes(z)));
  setFlag(s,'group_accepted_'+k,agreed);
  if(agreed)for(const p of pairKeys(cs)){
   if(!goodBridge(s,p))setFlag(s,'bridge_'+p,'shared_event:'+k);
   setFlag(s,'pair_'+p,'agreed');
  }
  break;}
 case 'recordFate':{
  if(!s.f[e.proof]||!s.factOrigins[e.proof])throw Error('Fate without acquired proof '+e.proof);
  s.fateLog[c]={plan:s.factOrigins['plan_'+c]||null,execution:s.factOrigins[e.proof],
    outcome:e.outcome,proof:e.proof,final:origin(s)};break;}
 case 'resolveWork':{
  const result=s.f.xu_result,earlierPlan=copy(s.factOrigins.final_xu||null);
  setFlag(s,'self_rescue_method',s.f.final_xu);
  if(s.f.final_xu!=='outside'){
   setFlag(s,'final_xu',result==='rest'?'rebuilding':result==='steady'?'backstage':
    (result==='portfolio'&&s.f.final_xu==='partner'?'partner':'independent'));
  }
  s.fateLog.xu={plan:earlierPlan,execution:origin(s),outcome:s.f.final_xu,proof:'xu_result',final:origin(s)};
  break;}
 default:throw Error('Unknown effect '+e.op);
 }
}
function reconcilePromises(s){
 const cs=active(s);
 for(const c of cs)if(s.f['scope_'+c]==='exclusive'&&cs.length>1&&!s.f['breach_'+c]){
  setFlag(s,'breach_'+c,true);invalidate(s,c);
 }
 s.ever=sorted([...s.ever,...cs]);
}
export function availableActions(s,data){
 if(s.current!=='@schedule')return [];
 const out=[];
 for(const c of CHARS){
  if(s.f['opening_lie_'+c]&&data.scenes['OPEN_CLEAR_'+c])out.push({id:'source-repair:'+c,scene:'OPEN_CLEAR_'+c,label:data.uiText.sourceRepair.replace('{name}',data.cast[c]),kind:'source_repair',character:c});
  if(['waiting','friend','ended','declined'].includes(s.f['scope_'+c])&&s.stage[c]>=3&&canDate(s,c)&&s.slot>=(s.f['reopen_after_'+c]||0))
   out.push({id:'reopen:'+c,scene:'REOPEN_'+c,label:data.uiText.reopen.replace('{name}',data.cast[c]),kind:'reopen',character:c});
  const id=c+String(s.stage[c]+1).padStart(2,'0'),sc=data.scenes[id];
  if(sc&&s.slot>=sc.minSlot)out.push({id:'visit:'+c,scene:id,label:data.cast[c]+' : '+sc.title,kind:'visit',character:c});
  if((issue(s,c)||s.f['latent_'+c]||s.f['breach_'+c])&&(!s.f['repair_started_'+c]||s.f['repair_issue_'+c]!==s.f['issue_'+c]))
   out.push({id:'repair1:'+c,scene:'R1_'+c,label:data.uiText.repairFirst.replace('{name}',data.cast[c]),kind:'repair'});
  if(s.f['repair_started_'+c]&&s.f['repair_issue_'+c]===s.f['issue_'+c])
   out.push({id:'repair2:'+c,scene:'RA_'+c,label:data.uiText.repairAct.replace('{name}',data.cast[c]),kind:'repair'});
 }
 for(const sc of Object.values(data.scenes)){
  if(sc.kind==='pair'&&s.slot>=sc.minSlot&&s.f['pair_'+keyPair(sc.members)]!=='agreed'&&
    sc.members.every(c=>s.stage[c]>=3&&s.f['active_'+c]))
   out.push({id:'pair:'+keyPair(sc.members),scene:sc.id,label:sc.members.map(c=>data.cast[c]).join(' / ')+' : '+sc.title,kind:'pair'});
  if(sc.kind==='group'&&s.slot>=sc.minSlot&&keyPair(active(s))===keyPair(sc.members)&&
    sc.members.every(c=>s.stage[c]>=3&&s.f['scope_'+c]==='open')&&!s.f['group_accepted_'+keyPair(sc.members)])
   out.push({id:'group:'+keyPair(sc.members),scene:sc.id,label:sc.title,kind:'group'});
  if(sc.kind==='encounter'&&s.slot>=sc.minSlot&&condition(s,sc.when))
   out.push({id:'encounter:'+sc.observer+':'+sc.peer,scene:sc.id,label:sc.actionLabel,kind:'encounter'});
  if(sc.kind==='side'&&s.slot>=sc.minSlot&&!s.visited.includes(sc.id)&&(sc.requires||[]).every(x=>s.visited.includes(x)))
   out.push({id:'side:'+sc.id,scene:sc.id,label:sc.title,kind:'side'});
 }
 out.push({id:'rest',scene:'REST',label:data.uiText.rest,kind:'rest'});
 return out;
}
function pairComplete(s,cs){return pairKeys(cs).every(k=>s.f['pair_'+k]==='agreed');}
export function endingFacts(s,data){
 const cs=active(s),problems=cs.filter(c=>issue(s,c)||s.f['latent_'+c]||s.f['breach_'+c]||s.f['opening_lie_'+c]);
 const informed=cs.every(c=>cs.filter(x=>x!==c).every(x=>s.known[c].includes(x)));
 const rules=data?.endingRules||{};
 const requiredDepth=cs.length>1?(rules.minimumStageMulti??5):(rules.minimumStageSingle??3);
 const deep=cs.every(c=>s.stage[c]>=requiredDepth);
 const group=cs.length<3||data?.endingRules?.groupEncounterRequiredForThreePlus===false||!!s.f['group_accepted_'+keyPair(cs)];
 const ready=cs.length>0&&deep&&cs.every(c=>s.f['reciprocal_'+c])&&!problems.length&&
  (cs.length===1||cs.every(c=>s.f['scope_'+c]==='open')&&informed&&pairComplete(s,cs)&&group);
 return {cs,serious:s.ever,problems,informed,deep,group,ready};
}
export function classifyEnding(s,data){
 if(s.f.early_end||s.f.final_xu==='expelled')return 'X01';
 const {cs,ready}=endingFacts(s,data);
 if(ready)return 'R_'+keyPair(cs);
 if(cs.length||s.breakups.length>=2)return 'X04';
 const regrets=sorted(CHARS.filter(c=>s.f['pursued_'+c]));
 if(regrets.length===1)return 'G_'+regrets[0];
 if(CHARS.every(c=>s.f[c+'_goal']===true))return 'X03';
 if(s.f.final_xu==='outside')return 'X05';
 return 'X02';
}
function choiceText(data,ref){
 if(!ref?.source)return '';
 const [sid,id]=ref.source.split('/');return data.scenes[sid]?.choices.find(o=>o.id===id)?.label||ref.source;
}
function reasonRows(s,data,only){
 const t=data.reasonText,rows=[],cs=only?[only]:active(s);
 const add=(c,text,ref)=>rows.push({id:'reason.'+c+'.'+rows.length,speaker:'N',text:
  text.replace('{name}',data.cast[c]||c)+(ref?t.quote.replace('{choice}',choiceText(data,ref)):'')});
 for(const c of cs){
  if(s.f['latent_'+c])add(c,t.hidden,s.denials[c]||s.factOrigins['latent_'+c]);
  else if(issue(s,c))add(c,s.f['repair_action_'+c]?t.unaccepted:s.f['repair_started_'+c]?t.unperformed:t.conflict,s.issueOrigins[c]?.at(-1));
  else if(s.f['breach_'+c])add(c,t.exclusive,s.factOrigins['scope_'+c]);
  else if(s.f['opening_lie_'+c])add(c,t.falseSource,s.factOrigins['opening_lie_'+c]);
  else if(['waiting','friend','ended','declined'].includes(s.f['scope_'+c]))add(c,t[s.f['scope_'+c]],s.factOrigins['scope_'+c]);
  else if(s.stage[c]<3)add(c,t.notAsked,null);
  else if(active(s).length>1&&s.stage[c]<5)add(c,t.noPrivate,null);
 }
 if(!only){
  for(const k of pairKeys(cs))if(s.f['pair_'+k]!=='agreed'){
   rows.push({speaker:'N',text:t.pair.replace('{names}',[...k].map(c=>data.cast[c]).join(' / ')),id:'reason.pair.'+k});
  }
  if(cs.length>=3&&!s.f['group_accepted_'+keyPair(cs)])rows.push({speaker:'N',text:t.group,id:'reason.group'});
  for(const c of cs)if(cs.some(x=>x!==c&&!s.known[c].includes(x)))add(c,t.unknown,null);
  if(!cs.length&&s.breakups.length>=2)rows.push({speaker:'N',text:t.breakups.replace('{names}',s.breakups.map(c=>data.cast[c]).join(' / ')),id:'reason.breakups'});
 }
 return rows;
}
export function renderScene(s,data){
 if(s.complete)return {id:s.ending,title:data.scenes[s.ending].title,body:[],choices:[],complete:true};
 if(s.current==='@schedule'){
  const now=data.calendar[s.slot];if(!now)throw Error('Invalid calendar index');
  const cs=active(s);
  return {id:'schedule:'+s.slot,title:data.uiText.schedule.replace('{day}',now.day).replace('{time}',now.time).replace('{left}',data.actionBudget-s.slot),
   body:[{speaker:'U',text:data.uiText.scheduleHelp},{speaker:'U',text:cs.length?data.uiText.active.replace('{names}',cs.map(c=>data.cast[c]).join(' / ')):data.uiText.noActive}],
   choices:availableActions(s,data).map(a=>({...a,enabled:true,intent:data.uiText.actionCost}))};
 }
 const sc=data.scenes[s.current];if(!sc)throw Error('Missing scene '+s.current);
 let rows=[...sc.body,...sc.blocks.filter(b=>condition(s,b.when)).flatMap(b=>b.lines)];
 if(sc.reasonCharacter)rows.push(...reasonRows(s,data,sc.reasonCharacter));
 if(sc.renderReasons)rows.push(...reasonRows(s,data));
 if(sc.kind==='repair_action'){
  const ref=s.issueOrigins[sc.character]?.at(-1)||s.denials[sc.character]||s.factOrigins['breach_'+sc.character];
  if(ref)rows.push({speaker:'N',text:data.reasonText.repairQuote.replace('{choice}',choiceText(data,ref)),id:sc.id+'.actual_issue'});
 }
 return {...sc,body:copy(rows),choices:sc.choices.map(o=>({...copy(o),enabled:condition(s,o.when)}))};
}
function resumeCalendar(s){
 const c=s.disclosureDue.shift();
 if(c){s.current='DUE_'+c;return;}
 s.current=s.calendarResume||'@schedule';s.calendarResume=null;
}
function finishAction(s,data){
 if(!s.apPending)throw Error('Action completion without action');
 s.apPending=false;s.slot++;
 if(s.slot>data.actionBudget)throw Error('Action budget overflow');
 s.calendarResume=data.anchors[String(s.slot)]||'@schedule';resumeCalendar(s);
}
function defaultPersonalOrMeeting(s,data,c){
 const id=c+String(s.stage[c]+1).padStart(2,'0');return data.scenes[id]&&s.slot>=data.scenes[id].minSlot?id:'MEET_'+c;
}
function enterNext(s,data,sc,o){
 const n=o.next??sc.next;
 if(n==='@personalRelationshipCheck'){
  const c=sc.character;
  s.current=s.f['active_'+c]&&active(s).some(x=>x!==c)?'REL_'+c:c+'07';return;
 }
 if(n==='@openingTalk'){s.current='OP_TALK_'+s.f.first;return;}
 if(n==='@openingCheck'){s.current=s.f.first==='self'?'OP_SELF':'OP_CHECK_'+s.f.first;return;}
 if(n==='@openingWork'){s.current='OP_WORK_'+s.f.opening_work;return;}
 if(n==='@afterA6'){
  if(s.f.early_end){s.ending='X01';s.current='X01';}else s.current='UNWRITTEN';return;
 }
 if(n==='@promiseReturn'){
  const a=s.pendingAction;if(!a)throw Error('No promised destination');
  s.current=o.id==='honor'?defaultPersonalOrMeeting(s,data,s.f.promise_owner):a.scene;s.pendingAction=null;return;
 }
 if(n==='@calendarResume'){resumeCalendar(s);return;}
 if(n==='@afterDiscovery'){
  const c=s.discoveryQueue.shift();
  if(c)s.current='FOUND_'+c;else{s.current=s.discoveryResume;s.discoveryResume=null;}
  if(!s.current)throw Error('Missing discovery continuation');return;
 }
 if(n==='@ending'){s.ending=classifyEnding(s,data);s.current=s.ending;return;}
 if(n==='@end'){s.complete=true;s.current='@complete';return;}
 if(n==='@schedule'){
  if(s.apPending){finishAction(s,data);return;}
  if(/^A[1-7]b$/.test(sc.id))setFlag(s,'anchor_'+sc.id.slice(0,2),true);
  s.current='@schedule';return;
 }
 if(!n&&sc.kind==='personal'){finishAction(s,data);return;}
 if(n){s.current=n;return;}
 throw Error('No continuation from '+sc.id);
}
function observeOnEntry(s,data){
 if(data.scenes[s.current]?.clock)s.clock=copy(data.scenes[s.current].clock);
 for(const e of data.scenes[s.current]?.onEnter||[])applyEffect(s,e);
 // A posted photograph grants knowledge of a photograph, not of a romantic promise.
 if(['s06','g06'].includes(s.current)&&s.f.public_photo_t){
  const c=s.current[0];source(s,c,'saw_public_photo_t',['t']);setFlag(s,'knows_public_photo_t_'+c,true);
 }
 // Anchor facts record completed mandatory work even when new scenes bridge the return.
 if(s.visited.includes('A6b'))s.f.anchor_A6=true;
}
export function choose(state,data,id,expectedRevision=state.revision){
 if(expectedRevision!==state.revision)throw Error('Stale command');
 if(state.version!==VERSION)throw Error('Version isolation: replay the correct version, do not hydrate old state');
 if(state.complete)throw Error('Story already ended');
 const s=copy(state),from=s.current;let reply=[];
 s.executing=from+'/'+id;
 if(from==='@schedule'){
  const a=availableActions(s,data).find(x=>x.id===id);if(!a)throw Error('Unavailable action '+id);
  s.apPending=true;s.clock=copy(data.calendar[s.slot]);
  const target=s.f.promise_target;
  if(s.slot+1===s.f.promise_due&&CHARS.includes(target)&&s.f.promise_status===undefined){
   if(a.character===target){setFlag(s,'promise_status','kept');setFlag(s,'promise_owner',target);s.current=a.scene;}
   else{s.pendingAction=a;s.current='MIS_'+target;}
  }else s.current=a.scene;
 }else{
  const sc=data.scenes[from],o=sc?.choices.find(x=>x.id===id);
  if(!o||!condition(s,o.when))throw Error('Unavailable choice '+from+'/'+id);
  reply=copy([...o.reply,...(o.replyBlocks||[]).filter(b=>condition(s,b.when)).flatMap(b=>b.lines)]);
  for(const e of o.effects)applyEffect(s,e);
  if(from.startsWith('R1_')&&id==='own')setFlag(s,'repair_issue_'+from.slice(3),s.f['issue_'+from.slice(3)]);
  if(!s.visited.includes(from))s.visited.push(from);
  if(sc.kind==='personal')s.stage[sc.character]=Math.max(s.stage[sc.character],sc.stage);
  if(sc.kind==='pair')setFlag(s,'pair_attempts_'+keyPair(sc.members),(s.f['pair_attempts_'+keyPair(sc.members)]||0)+1);
  reconcilePromises(s);enterNext(s,data,sc,o);
 }
 if(s.discoveryQueue.length&&!from.startsWith('FOUND_')&&!s.discoveryResume){
  s.discoveryResume=s.current;s.current='FOUND_'+s.discoveryQueue.shift();
 }
 observeOnEntry(s,data);
 s.history.push({from,id,revision:s.revision});s.revision++;delete s.executing;
 if(s.history.length>600)throw Error('Command bound exceeded');
 return {state:s,reply};
}
export function replay(data,commands){
 if(!Array.isArray(commands)||commands.length>600)throw Error('Invalid log size');
 let s=createState();
 for(const cmd of commands){
  if(!cmd||typeof cmd.id!=='string'||cmd.id.length>100)throw Error('Invalid command');
  if(cmd.from!==undefined&&cmd.from!==s.current)throw Error('History source mismatch');
  if(cmd.revision!==undefined&&cmd.revision!==s.revision)throw Error('History revision sequence mismatch');
  s=choose(s,data,cmd.id,s.revision).state;
 }
 return s;
}
export function rewind(s,data,index){
 if(!Number.isInteger(index)||index<0||index>s.history.length)throw Error('Invalid rewind');
 return replay(data,s.history.slice(0,index));
}
export function reviewEnding(data,commands){
 const ctx=replay(data,commands);if(!ctx.complete)throw Error('Not a completed ending');
 const i=commands.findIndex(h=>h.from===ctx.ending);if(i<0)throw Error('Ending scene was not played');
 const before=replay(data,commands.slice(0,i));
 const view=renderScene(before,data),r=choose(before,data,commands[i].id);
 return {context:ctx,title:view.title,body:[...view.body,...r.reply],ending:ctx.ending};
}
