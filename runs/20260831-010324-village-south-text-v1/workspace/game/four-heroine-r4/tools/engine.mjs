/* Deterministic, command-replay interpreter. Canonical text is data/STORY.json.
 * No network, money, implicit consent, mutable collection replay, or state injection.
 */
export const VERSION = 'bookside-revision-r4.3';
const CHARS = ['t','s','l','g'];

// v4.13 narrative commitments: an attitude is a legal, replayable, rewindable
// command. The second command performs the original 751-action story effects.
// No relationship consent, evidence, work progress or time is granted by an attitude alone.
const DECISION_PLANS={
 A2a:[
  ['署名','争回她的署名与作品权利',['independent','negotiated','duet'],'B','这首歌是谁做的，我先把证据和她的决定摆出来。','T','我会自己决定怎么唱。你能帮我把署名的来龙去脉讲清楚吗？'],
  ['留白','先尊重她的发行节奏',['pause','unchanged'],'B','抢着发歌不能代替尊重。她可以决定等一等。','T','谢谢你没有替我赶时间。下一步怎么做，我会说清楚。']],
 A3a:[
  ['继续','和清辞一起寻找旁厅的出路',['cooperative','shared','residency'],'B','我想让这个空间真正活下去，但不能替她拍板。','S','有方案就拿出来，我们逐条看风险。'],
  ['松手','给清辞保留离开与转身的权利',['exit','leave'],'B','有时候真正帮她，是不把留下当作唯一答案。','S','我不是不在乎，只是需要把未来放到眼前想清楚。']],
 A3b:[
  ['创作','先回复音乐或影像的邀请',['t','l'],'B','舞台和镜头都在等一个明确回复。我先认真听完。','N','一封邀约是一种责任，不是随手多开一条暧昧线。'],
  ['其他','处理制作、资源或保持独处',['s','g','none'],'B','我不能把每份邀请都说成同一件事。先定下今晚的方向。','N','这次回复之后，谁的时间被留下，谁的安排被改变，都有迹可循。']],
 t03:[
  ['靠近','认真回应映雪提出的关系',['open','exclusive'],'B','我得把正在交往的人、可能的承诺说清楚。','T','别只说好听的。把你真正愿意承担的范围告诉我。'],
  ['缓慢','尊重映雪暂时不恋爱的权利',['wait','friend','decline'],'B','被喜欢不等于一定要答应。我先把边界说在前面。','T','这样才像话。我们可以慢一点，也可以有别的答案。']],
 s03:[
  ['靠近','和清辞坦诚谈关系的可能',['open','exclusive'],'B','关系不是工作协议，但同样不能留下含糊的空白。','S','先谈清楚你到底想怎么开始，我会自己作决定。'],
  ['缓慢','让清辞保留个人安排和边界',['wait','friend','decline'],'B','不在此刻做承诺，也要清楚地对待她的时间。','S','那就别把我的日程先划进你的计划里。我们可以再商量。']],
 l03:[
  ['靠近','把和见月的靠近说清楚',['open','exclusive'],'B','我想走进她的镜头之外，却不能拿浪漫替她决定。','L','你可以把话说出来。至于我怎么答应，让我自己想。'],
  ['缓慢','给见月自由选择的空间',['wait','friend','decline'],'B','今天没有确定关系，也不代表之前的陪伴毫无意义。','L','好。我们先各自把眼前的片子做好。']],
 g03:[
  ['靠近','诚实回应晚棠的信任',['open','exclusive'],'B','她已经承担太多风险，我不能再用含混增加一道。','G','我听你讲明白，然后再决定自己的位置。'],
  ['缓慢','先保持晚棠想要的距离',['wait','friend','decline'],'B','别把她从谈判桌上请走以后，又替她签私人承诺。','G','这就够了。剩下的话，我们以后有机会再谈。']],
 A4a:[
  ['作品','支持见月自己选择创作方向',['fellowship','stay','film'],'B','我要先弄清她真正想拍什么，而不是抢替她写结尾。','L','你可以帮忙，但作品最后要写我的名字。'],
  ['界限','先保护见月的授权和边界',['cut','none'],'B','如果她不想公开这段素材，任何机会都不该强迫她。','L','你这次先问我了。那我也会认真想清楚。']],
 A5a:[
  ['争取','陪晚棠争回对自己的解释权',['independent','bounded','account'],'B','我要用能核对的事实帮忙，不能用替她发言充当胜利。','G','把证据给我看。我会决定什么该由我说出口。'],
  ['放手','尊重晚棠退出和保持距离',['leave','none'],'B','她不欠这里任何人一个留下的承诺。','G','有人肯听我说不，这比一句“我替你搞定”重要。']],
 A5b:[
  ['对话','当面处理与陆景行的关系',['ally','rival','repair'],'B','合作、竞争还是修复，都得放在同一张桌上谈清楚。','LU','我不怕你选竞争，但别把别人的工作拿来当筹码。'],
  ['独立','各走自己的路，不再抢定义权',['distance','independent'],'B','有些分歧不必用和解或输赢来包装。','LU','那就各凭本事。我们至少不用再替对方作主。']],
 A6a:[
  ['澄清','用实际拿到的证据争取澄清',['public','partner','backstage'],'B','第七天到了。我能说的只能是手里真正有的证据。','N','灯亮了。每一张工作单和每一次录音都有自己的来源。'],
  ['去留','承担后果，重新决定自己的位置',['exit','accept','rebuild'],'B','即使今天不能扳回局面，怎么承担结果仍由我选择。','N','台下有人等一份真实解释，不是一句万能翻盘。']],
 LU_MOVE2:[
  ['正面','和陆景行继续合作或竞争',['ally','rival','reconciled'],'B','新的机会摆在面前，我要说清这次的规矩。','LU','我们就谈工作，先把结果做出来。'],
  ['独立','彼此保留距离与独立路线',['distant','independent'],'B','不再争谁是原著的主角，我有自己的路。','LU','也好。谁需要帮忙，谁就自己开口。']],
 A7a:[
  ['说清','把所有关系和工作边界讲明',['together','private','work'],'B','感情不是一张合照，谁愿意公开、谁需要边界，都得亲自说。','N','每个人都有说是或不的机会，今晚不替任何人盖章。'],
  ['界限','尊重分开与独自生活的选择',['separate','none'],'B','能相遇很重要，能好好告别也同样重要。','N','说出口的不是失败，而是一份明白的安排。']],
 H_glst:[
  ['同行','先把四个人今晚的安全感放好',['all','favor_g','favor_s'],'B','雨下得正急，不能只把自己最想靠近的人留在伞下。','N','她们都在场。先确认谁需要陪伴，再决定具体往哪边走。'],
  ['靠近','听听还没开口的人怎么想',['favor_t','favor_l'],'B','不能用“大家”掩盖每个人不一样的需要。','N','映雪和见月都没催你表态；你可以先认真听其中一个。']],
 EXEC_s:[
  ['经营','让清辞的经营试验落到行动',['trial','slots','venue'],'B','这次我想和她把试验做扎实，不空口承诺。','S','预算和时间列出来，我们再一起决定能不能做。'],
  ['交接','接受交接或留给她自己的安排',['handover','none'],'B','我不应该把继续参与当作帮忙的唯一形式。','S','能按约定交接，也是对项目负责。']],
 EXEC_l:[
  ['影像','支持见月主导的新作品',['application','own','screen'],'B','拍摄的起点应该是她自己的想法。','L','镜头给我，细节我们再一点点谈。'],
  ['许可','先把影像许可与拒绝权说清楚',['permissions','none'],'B','未经同意的素材，不该为了好看的结尾被拿走。','L','先确定谁拥有这些画面，我才敢决定要不要继续。']]
};
export const TRUE_DECISION_SCENES=Object.freeze(Object.keys(DECISION_PLANS));
const intentChoices=(s,sc)=>{
 if(!s.intentMode||!DECISION_PLANS[sc.id])return null;
 const available=sc.choices.filter(o=>condition(s,o.when));
 if(available.length<=4)return null;
 const groups=DECISION_PLANS[sc.id].filter(g=>g[2].some(id=>available.some(o=>o.id===id)));
 const listed=groups.flatMap(g=>g[2].filter(id=>available.some(o=>o.id===id)));
 if(new Set(listed).size!==listed.length||listed.length!==available.length||groups.length>3)
  throw Error('v4.13 unaccounted original option '+sc.id);
 return groups;
};

const copy = x => JSON.parse(JSON.stringify(x));
const sorted = xs => [...new Set(xs)].sort();
const keyPair = xs => sorted(xs).join('');
const pairKeys = cs => cs.flatMap((c,i)=>cs.slice(i+1).map(z=>keyPair([c,z])));
export function createState(opts={}){
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
  disclosureDue:[],calendarResume:null,discoveryQueue:[],discoveryResume:null,
  intentMode:opts.intentMode===true,decisionIntent:null,legacyPrefixLength:0};
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
 const options=sc.choices.map(o=>({...copy(o),enabled:condition(s,o.when)}));
 const plans=intentChoices(s,sc);
 if(plans){
  if(s.decisionIntent?.scene===sc.id){
   const chosen=plans.find(g=>g[0]===s.decisionIntent.key);
   if(!chosen)throw Error('Stored attitude no longer matches decision '+sc.id);
   const ids=new Set(chosen[2]);
   const shown=options.filter(o=>o.enabled&&ids.has(o.id));
   if(!shown.length||shown.length>4)throw Error('Invalid staged alternatives '+sc.id);
   return {...sc,title:sc.title+' · 下一步怎么做',intentStep:2,
    body:[{speaker:'B',id:sc.id+'.intent.continuation',text:'刚才的话已经说出口。现在要拿出具体做法，而不是重新决定态度。'}],choices:shown};
  }
  const chosen=plans.map(g=>({id:'intent:'+g[0],label:g[1],enabled:true,coveredChoices:g[2].filter(id=>options.some(o=>o.enabled&&o.id===id)),
   reply:[{speaker:g[3],text:g[4]},{speaker:g[5],text:g[6]}],intent:true}));
  if(chosen.length<2||chosen.length>3)throw Error('Staged first decision should have 2–3 attitudes '+sc.id);
  return {...sc,title:sc.title+' · 你先怎么表态',intentStep:1,
   body:copy([...rows,{speaker:'B',id:sc.id+'.intent.question',text:'我得先选一个真正愿意承担的方向；接下来能做的事，会随这句话改变。'}]),choices:chosen};
 }
 return {...sc,body:copy(rows),choices:options};
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
export function choose(state,data,id,expectedRevision=state.revision,opts={}){
 if(expectedRevision!==state.revision)throw Error('Stale command');
 if(state.version!==VERSION)throw Error('Version isolation: replay the correct version, do not hydrate old state');
 if(state.complete)throw Error('Story already ended');
 const s=copy(state),from=s.current;let reply=[],attitudeOnly=false;
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
  const sc=data.scenes[from],plans=sc&&intentChoices(s,sc);
  if(plans&&id.startsWith('intent:')){
   if(s.decisionIntent)throw Error('Attitude already committed; pick a concrete action or rewind');
   const g=plans.find(x=>id==='intent:'+x[0]);
   if(!g)throw Error('Invalid attitude '+id);
   s.decisionIntent={scene:from,key:g[0]};
   reply=[{speaker:g[3],id:from+'.'+id+'.thought',text:g[4]},
    {speaker:g[5],id:from+'.'+id+'.answer',text:g[6]}];
   attitudeOnly=true;
  }else{
  const o=sc?.choices.find(x=>x.id===id);
  if(!o||!condition(s,o.when))throw Error('Unavailable choice '+from+'/'+id);
  if(plans){
   if(!s.decisionIntent){
    if(!opts.allowLegacy)throw Error('先说清态度，才能选择具体行动 '+from);
   }else{
    const g=plans.find(x=>x[0]===s.decisionIntent.key);
    if(s.decisionIntent.scene!==from||!g?.[2].includes(id))throw Error('该行动不属于你刚才的态度；请回退重新选择');
   }
  }else if(s.decisionIntent){throw Error('Unexpected unresolved narrative attitude');}
  s.decisionIntent=null;
  reply=copy([...o.reply,...(o.replyBlocks||[]).filter(b=>condition(s,b.when)).flatMap(b=>b.lines)]);
  for(const e of o.effects)applyEffect(s,e);
  if(from.startsWith('R1_')&&id==='own')setFlag(s,'repair_issue_'+from.slice(3),s.f['issue_'+from.slice(3)]);
  if(!s.visited.includes(from))s.visited.push(from);
  if(sc.kind==='personal')s.stage[sc.character]=Math.max(s.stage[sc.character],sc.stage);
  if(sc.kind==='pair')setFlag(s,'pair_attempts_'+keyPair(sc.members),(s.f['pair_attempts_'+keyPair(sc.members)]||0)+1);
  reconcilePromises(s);enterNext(s,data,sc,o);
  }
 }
 if(!attitudeOnly&&s.discoveryQueue.length&&!from.startsWith('FOUND_')&&!s.discoveryResume){
  s.discoveryResume=s.current;s.current='FOUND_'+s.discoveryQueue.shift();
 }
 if(!attitudeOnly)observeOnEntry(s,data);
 s.history.push({from,id,revision:s.revision});s.revision++;delete s.executing;
 if(s.history.length>600)throw Error('Command bound exceeded');
 return {state:s,reply};
}
export function replay(data,commands,opts={}){
 if(!Array.isArray(commands)||commands.length>600)throw Error('Invalid log size');
 const firstIntent=commands.findIndex(x=>x?.id?.startsWith('intent:'));
 const intentMode=opts.intentMode??firstIntent>=0;
 const legacyPrefixLength=opts.legacyPrefixLength??(intentMode?Math.max(0,firstIntent):0);
 if(!Number.isInteger(legacyPrefixLength)||legacyPrefixLength<0||legacyPrefixLength>commands.length)
  throw Error('Invalid historical migration boundary');
 let s=createState({intentMode});s.legacyPrefixLength=legacyPrefixLength;
 for(let i=0;i<commands.length;i++){
  const cmd=commands[i];
  if(!cmd||typeof cmd.id!=='string'||cmd.id.length>100)throw Error('Invalid command');
  if(cmd.from!==undefined&&cmd.from!==s.current)throw Error('History source mismatch');
  if(cmd.revision!==undefined&&cmd.revision!==s.revision)throw Error('History revision sequence mismatch');
  s=choose(s,data,cmd.id,s.revision,{allowLegacy:i<legacyPrefixLength}).state;
 }
 return s;
}
export function rewind(s,data,index){
 if(!Number.isInteger(index)||index<0||index>s.history.length)throw Error('Invalid rewind');
 return replay(data,s.history.slice(0,index),{intentMode:s.intentMode,legacyPrefixLength:Math.min(s.legacyPrefixLength||0,index)});
}
export function reviewEnding(data,commands){
 const ctx=replay(data,commands);if(!ctx.complete)throw Error('Not a completed ending');
 const i=commands.findIndex(h=>h.from===ctx.ending);if(i<0)throw Error('Ending scene was not played');
 const before=replay(data,commands.slice(0,i));
 const view=renderScene(before,data),r=choose(before,data,commands[i].id);
 return {context:ctx,title:view.title,body:[...view.body,...r.reply],ending:ctx.ending};
}
