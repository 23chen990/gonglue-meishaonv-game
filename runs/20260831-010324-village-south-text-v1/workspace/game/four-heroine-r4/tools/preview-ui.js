
// Offline r4 controller: canonical replay, separately scoped read-only archives.
// No remote resources, ad SDK, analytics, or silent legacy-save migration.
const names={N:'',P:'你',T:'唐映雪',S:'沈清辞',L:'林见月',G:'顾晚棠',LU:'陆景行',C:'程放',B:'',U:'',A:'阿衡',X:'现场'};
const KEY='gonglue:revision-r4.5-portrait:canonical';
const PREVIOUS_KEY='gonglue:revision-r4.3-intro:canonical';
// v4.12 relationship feedback is text-only; known v4.5/v4.8/v4.9/v4.10/v4.11 saves are replayed, backed up and migrated.
// Existing verified v4.5-v4.8 saves are replayed before backing up and migrating.
const COMPATIBLE_STORY_HASHES=new Set(['c457d2158f27e231cecb7dfc3b4d49031891c7f19d8bfeb99a2542658af7f059','fae2d536b2b2a12436d0f39cf7a40abe516cde13a87c4295662ecba181dedbf8','e8128d5133cfd7e00677c3bde69d757f6a6c0e1e3ca67fcc4056b2a00cdeaec0','473d7b1aa3d1eb64531c2c6654ec5bc22ea791005070a3b621719a6d7ba3717b','fd98ab48cb24dfab91ae0af8b1c13df59457237b25afe99cfe4ac2dee0e6d40a']);
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let state=createState(), phase='scene', page=0, lastReply=[], panel='story', busy=false;
let archiveView=null, archivePage=0;
let profile={endings:{},bonuses:{},readPages:[]}, notice='', saveBlocked=false, lastRaw=null;
let choicePage=0, soundOn=false, soundContext=null, readerExpanded=false;
// UI-only reading position: preserve scroll on menus and semantic choice navigation.
let storyScroll={key:null,text:0,dock:0,choicePage:0};
let renderToken=0, downToken=null, pointerStart=null, moved=false, previousScroll=0, large=false;
let storage=null;
try{storage=window.localStorage;}catch{saveBlocked=true;notice='这个窗口暂时不能保存。仍可继续阅读；离开前请在菜单导出记录。';}
const hashText=t=>{let h=2166136261;for(let i=0;i<t.length;i++){h^=t.charCodeAt(i);h=Math.imul(h,16777619);}return (h>>>0).toString(16);};
function replyFromLog(log){
 if(!log.length)return [];
 const before=replay(DATA,log.slice(0,-1));
 return choose(before,DATA,log.at(-1).id).reply;
}
function qualify(s,b){
 const q=b.requires;
 return q.kind==='ending'?s.complete&&s.ending===q.id:
 s.slot>=11&&s.stage[q.character]>=2&&!!s.f['reciprocal_'+q.character]&&!s.f.early_end;
}
function dataSceneKind(id){return Object.hasOwn(DATA.scenes,id)?DATA.scenes[id].kind:null;}
function safeProfile(raw){
 if(raw?.endings && (typeof raw.endings!=='object'||Object.keys(raw.endings).length>24))throw Error('Invalid ending collection');
 if(raw?.bonuses && (typeof raw.bonuses!=='object'||Object.keys(raw.bonuses).length>8))throw Error('Invalid bonus collection');
 const next={endings:{},bonuses:{},readPages:[]};
 for(const [id,log] of Object.entries(raw?.endings||{})){
  if(dataSceneKind(id)!=='ending')throw Error('Unknown collected ending');
  const a=replay(DATA,log);if(a.complete&&a.ending===id)next.endings[id]=log;
 }
 for(const [id,log] of Object.entries(raw?.bonuses||{})){
  const b=BONUS.items.find(x=>x.id===id);if(b&&qualify(replay(DATA,log),b))next.bonuses[id]=log;
 }
 if(Array.isArray(raw?.readPages))next.readPages=raw.readPages.filter(x=>typeof x==='string'&&x.length<180).slice(-10000);
 return next;
}
function snapshot(){
 return {version:VERSION,storyHash:STORY_HASH,commands:state.history,
         ui:{phase,page,choicePage,large,soundOn,readerExpanded},profile};
}
function save(){
 // Collection unlocks belong to memory first; a quota or permission error only prevents persistence.
 if(state.complete)profile.endings[state.ending]=state.history.slice();
 for(const b of BONUS.items)if(!profile.bonuses[b.id]&&qualify(state,b))profile.bonuses[b.id]=state.history.slice();
 if(saveBlocked||!storage)return;
 try{
  const now=storage.getItem(KEY);
  if(now!==lastRaw){
   saveBlocked=true;notice='另一个窗口更新了进度。本窗口不会覆盖它。请读取最新记录，或导出本窗口。';return;
  }
  const raw=JSON.stringify(snapshot());storage.setItem(KEY,raw);lastRaw=raw;
 }catch{
  saveBlocked=true;notice='这次进度没有保存成功。可以继续阅读；离开前请在菜单导出记录。';
 }
}
function readPayload(v){
 if(!v||v.version!==VERSION||(v.storyHash!==STORY_HASH&&!COMPATIBLE_STORY_HASHES.has(v.storyHash)))throw Error('这不是兼容版本的选择记录；旧记录没有被改写。');
 const s=replay(DATA,v.commands);
 const reply=replyFromLog(v.commands);
 const ui=v.ui||{};
 const ph=ui.phase==='reply'&&reply.length?'reply':'scene';
 const pg=Number.isInteger(ui.page)&&ui.page>=0&&ui.page<1000?ui.page:0;
 const choiceGroup=Number.isInteger(ui.choicePage)&&ui.choicePage>=0&&ui.choicePage<100?ui.choicePage:0;
 return {state:s,reply,phase:ph,page:pg,choiceGroup,large:!!ui.large,soundOn:!!ui.soundOn,readerExpanded:!!ui.readerExpanded,profile:safeProfile(v.profile)};
}
function install(v){
 state=v.state;lastReply=v.reply;phase=v.phase;page=v.page;choicePage=v.choiceGroup||0;large=v.large;soundOn=v.soundOn||false;readerExpanded=v.readerExpanded||false;profile=v.profile;
 storyScroll={key:null,text:0,dock:0,choicePage:0};
 panel='story';
}
function load(){
 if(!storage)return;
 try{
  lastRaw=storage.getItem(KEY);
  if(!lastRaw){
   if(storage.getItem(PREVIOUS_KEY))notice='检测到上一版进度。本次文字已修订，旧存档仍在浏览器中，未覆盖；请从新开场开始。';
   return;
  }
  if(lastRaw.length>2400000)throw Error('记录过大');
  const original=JSON.parse(lastRaw);
   install(readPayload(original));
   if(COMPATIBLE_STORY_HASHES.has(original.storyHash)&&original.storyHash!==STORY_HASH){
    try{
     storage.setItem(KEY+':backup:'+Date.now(),lastRaw);
     save();
     if(!saveBlocked)notice='已续接上一版进度，原始记录已备份。剧情措辞升级，你做过的选择保持不变。';
    }catch{saveBlocked=true;notice='旧版进度已读到，但备份或更新未完成。请先在菜单导出记录，原始存档未覆盖。';}
   }
 }catch{
  saveBlocked=true;
  notice='这份本版记录无法验证，原记录未覆盖。当前是临时新局；可继续玩、导出，或在菜单备份后新开。';
 }
}
function splitLongBeat(b){
 // Stable across font/viewport changes, and no unbroken sentence can bypass the length cap.
 const chars=Array.from(b.text),out=[];let start=0;
 while(start<chars.length){
  let end=Math.min(start+180,chars.length);
  if(end<chars.length){
   for(let i=end-1;i>start+100;i--)if('。！？!?；;'.includes(chars[i])){end=i+1;break;}
  }
  out.push({...b,text:chars.slice(start,end).join(''),id:chars.length<=180?b.id:(b.id||'')+':part'+out.length});
  start=end;
 }
 return out.length?out:[b];
}
function paginate(rows){
 // Only the 28-beat book-entry prologue is paced in chapters; everywhere else
 // the actor's words and consequential choices share one scrollable sheet.
 const flat=rows.flatMap(splitLongBeat);
 if(!(phase==='scene'&&state.current==='ENTRY_WAKE'))return [flat];
 const pages=[];let p=[],n=0;
 for(const b of flat){
  if(p.length&&(n+b.text.length>190||p.length>=4)){pages.push(p);p=[];n=0;}
  p.push(b);n+=b.text.length;
 }
 if(p.length||!pages.length)pages.push(p);
 return pages;
}
function endingRows(){
 if(state.f.early_end)return [{speaker:'N',text:'这一轮停在这里。回到读过的决定，你仍可以换一种做法。'}];
 return [{speaker:'U',text:DATA.uiText.finished},
   ...CODA.items.filter(x=>condition(state,x.when)).flatMap(x=>x.body)];
}
function actualChoice(ref){
 if(!ref?.source)return '';
 const [sid,id]=ref.source.split('/');
 return DATA.scenes[sid]?.choices.find(o=>o.id===id)?.label||'这轮实际做过的行动';
}
function fateHTML(ctx){
 if(ctx.f.early_end)return '';
 return '<section class="fates"><h3>后来，他们走向哪里</h3><p class="small">逐项展开 · 不影响本轮进度</p>'+
 EP.modules.filter(m=>condition(ctx,m.when)).map(m=>{
   const causal=ctx.fateLog?.[m.axis];
   const cause=causal?'<div class="cause"><strong>这条路怎么走来的</strong>'+
    [['最初',causal.plan],['实际做过',causal.execution],['最后确认',causal.final]].filter(([,ref])=>ref).map(([label,ref])=>'<p>'+label+'：'+esc(actualChoice(ref))+'</p>').join('')+'</div>':'';
   return '<details class="panel fate" data-epilogue="'+esc(m.id)+'"><summary>'+esc(m.title)+'</summary>'+
    rowsHTML(m.body)+cause+'</details>';
 }).join('')+'</section>';
}
function openEnding(id){
 const log=profile.endings[id];if(!log)throw Error('没有这份已完成记录');
 const v=reviewEnding(DATA,log);
 archiveView={...v,kind:'ending',id};archivePage=0;panel='archive';render();
}
function openBonus(id){
 const b=BONUS.items.find(x=>x.id===id),log=profile.bonuses[id];
 if(!b||!log)throw Error('这个篇章尚未解锁');
 const ctx=replay(DATA,log);
 archiveView={title:b.title,id,kind:'bonus',context:ctx,
 body:[...b.body,...(b.blocks||[]).filter(x=>condition(ctx,x.when)).flatMap(x=>x.lines)]};
 archivePage=0;panel='archive';render();
}
function archiveHTML(){
 if(!archiveView)return '<p>没有打开回看记录。</p>';
 const pages=paginate(archiveView.body);
 archivePage=Math.max(0,Math.min(archivePage,pages.length-1));
 const last=archivePage===pages.length-1;
 return '<div class="meta"><span>只读回看 · 当前路线保留</span><span>'+ (archivePage+1)+' / '+pages.length+'</span></div>'+
 '<h2>'+esc(archiveView.title)+'</h2>'+rowsHTML(pages[archivePage])+
 '<div class="pager archive-controls">'+
 (archivePage>0?'<button class="quiet" data-archive-prev="1">上一页</button>':'')+
 (!last?'<button class="next" data-archive-next="1">继续回看</button>':'<button class="next" data-nav="collection">返回收藏</button>')+'</div>'+
 (last&&archiveView.kind==='ending'?fateHTML(archiveView.context):'');
}
function getView(){
 if(phase==='reply'){
  const h=state.history.at(-1);
  return {id:'reply:'+h.from+'/'+h.id,title:h.from==='ENTRY_WAKE'?'第一道岔路':h.from==='COLD'?'原著，改了。':(DATA.scenes[h.from]?.title||'你的选择之后'),
    body:lastReply,choices:[],firstWin:h.from==='COLD',isReply:true};
 }
 if(state.complete)return {id:'complete:'+state.ending,title:DATA.scenes[state.ending].title,body:endingRows(),choices:[],terminal:true};
 return renderScene(state,DATA);
}
function currentPage(){
 const view=getView(), pages=paginate(view.body);
 if(page>=pages.length)page=pages.length-1;
 return {view,pages,rows:pages[page],last:page===pages.length-1};
}
function pageKey(cp){
 return VERSION+':'+cp.view.id+':'+page+':'+hashText(cp.rows.map(b=>b.speaker+'\0'+b.text).join('\n'));
}
function markRead(cp){
 const k=pageKey(cp);if(!profile.readPages.includes(k))profile.readPages.push(k);
}
function rowsHTML(rows,sceneId){
 return rows.map(b=>{
  const sid=sceneId??(phase==='reply'?state.history.at(-1)?.from:state.current);
  const earlyNames=sid==='ENTRY_WAKE'?{A:'戴耳机的男人',C:'对讲机里的场务',T:'台上的女孩',LU:'钢琴旁的男人'}:sid==='ENTRY_CLUES'?{C:'场务负责人',T:'台上的女孩',LU:'钢琴旁的男人'}:{};
  const who=earlyNames[b.speaker]??names[b.speaker];
  const cls=b.speaker==='N'?'narrator':b.speaker==='B'?'thought':b.speaker==='U'?'system':'dialogue';
  return `<div class="line ${cls}" data-speaker="${esc(b.speaker)}" data-beat="${esc(b.id||'')}">${who?`<span class="who">${esc(who)}</span>`:''}<p>${esc(b.text)}</p></div>`;
 }).join('');
}

const decisionFamilies={
 'A2a':[['保住她的作品',['independent','negotiated','duet']],['尊重她自己的节奏',['pause','unchanged']]],
 'A3a':[['让旁厅继续',['cooperative','shared','residency']],['接受不同的未来',['exit','leave']]],
 'A3b':[['去找映雪或清辞',['t','s']],['见月或晚棠',['l','g']],['留给自己',['none']]],
 'A4a':[['支持见月自己的下一步',['fellowship','stay','film']],['先处理眼前的事',['cut','none']]],
 'A5a':[['争取真正的决定权',['independent','bounded','account']],['离开或保持距离',['leave','none']]],
 'A5b':[['正面回应陆景行',['ally','rival','repair']],['先走自己的路',['distance','independent']]],
 'A6a':[['留下来，讲清真相',['public','partner','backstage']],['考虑自己的去留',['exit','rebuild','accept']]],
 'A7a':[['认真把关系说清',['together','private','work']],['独处或结束承诺',['separate','none']]],
 'COLD':[['先找舞台上的人',['t','s']],['让记录说话',['l','g']],['先把盘交音控',['self']]],
 'H_glst':[['先顾好眼前的人',['favor_g','favor_l']],['再看看其他人的需要',['favor_s','favor_t']],['先一起避雨',['all']]]
};
for(const c of ['t','s','l','g']){
 decisionFamilies[c+'03']=[['认真靠近她',['open','exclusive']],['现在先慢一点',['wait','friend','decline']]];
 decisionFamilies['OP_CHECK_'+c]=[['纠正刚才不真实的话',['admit','double','withdraw']],['把疑问说清',['present','predict','privacy']],['试着接近，或先缓一缓',['ask','space']]];
 decisionFamilies['OP_DATE_'+c]=[['现在赴约',['attend','respect']],['另约或先处理自己的事',['work','slow','apology']]];
 for(const family of ['EXEC_','RES_']){
   decisionFamilies[family+c]=[['帮她实现正在做的事',[]],['接受变化，不替她决定',[]]];
 }
}
const decisionTwoPlusThree={
 'EXEC_t':[['master','terms','duet'],['hold','none']], 'RES_t':[['master','terms','duet'],['hold','none']],
 'EXEC_s':[['trial','slots','venue'],['handover','none']], 'RES_s':[['trial','slots','venue'],['handover','none']],
 'EXEC_l':[['application','own','screen'],['permissions','none']], 'RES_l':[['application','own','screen'],['permissions','none']],
 'EXEC_g':[['vote','bounded','account'],['leave','none']], 'RES_g':[['vote','bounded','account'],['leave','none']],
 'LU_MOVE2':[['ally','rival','reconciled'],['distant','independent']],
 'RES_lu':[['ally','rival','reconciled'],['distant','independent']]
};
for(const [k,parts] of Object.entries(decisionTwoPlusThree))decisionFamilies[k]=[
 ['参与眼前的变化',parts[0]],['调整距离或另走一步',parts[1]]];
function semanticGroups(id,enabled){
 let definitions=decisionFamilies[id];
 if(id==='@schedule')definitions=[
  ['这晚去见映雪或清辞',['visit:t','visit:s']],
  ['这晚见见月或晚棠',['visit:l','visit:g']],
  ['把时间留给自己的生活',enabled.map(x=>x.id).filter(x=>!x.startsWith('visit:'))]
 ];
 if(!definitions){
  // Deterministic safe fallback on unfamiliar stories; not a hidden next-page drawer.
  definitions=[];
  for(let i=0;i<enabled.length;i+=3)definitions.push(['先看看这些做法',enabled.slice(i,i+3).map(x=>x.id)]);
 }
 const groups=definitions.map(([title,ids])=>{
  const items=ids.map(id=>enabled.find(x=>x.id===id)).filter(Boolean);
  const hint=items.map(x=>x.label.replace(/[“”]/g,'').slice(0,9)).join(' / ');
  return {title,hint,items};
 }).filter(x=>x.items.length);
 // Fail loud for missing/duplicate routes; never hide a legitimate action.
 const visible=groups.flatMap(g=>g.items.map(x=>x.id));
 if(visible.length!==enabled.length||new Set(visible).size!==enabled.length||groups.some(g=>g.items.length>4))
  throw Error('选择分类不完整：'+id);
 return groups;
}

function scheduleControls(enabled){
 // At most four actual alternatives on ANY visible decision level, even after
 // relationships and all side quests unlock. No legitimate engine action is hidden.
 const visits=enabled.filter(x=>x.id.startsWith('visit:'));
 const side=enabled.filter(x=>x.id.startsWith('side:'));
 const relations=enabled.filter(x=>!x.id.startsWith('visit:')&&!x.id.startsWith('side:')&&x.id!=='rest');
 const rest=enabled.filter(x=>x.id==='rest');
 const button=o=>`<button class="choice" data-choice="${esc(o.id)}" data-revision="${state.revision}" data-render="${renderToken}">${esc(o.label)}</button>`;
 const group=(name,desc,index)=>`<button class="vn-group" data-choice-group="${index}"><span><strong>${esc(name)}</strong><small>${esc(desc)}</small></span><i aria-hidden="true">›</i></button>`;
 const desc=xs=>xs.slice(0,3).map(x=>x.label.replace(/[“”]/g,'').slice(0,12)).join(' / ');
 const byFamily=(xs,rule)=>{
  const left=[...xs],groups=[];
  for(const [title,filter] of rule){
   const selected=left.filter(filter);selected.forEach(x=>left.splice(left.indexOf(x),1));
   if(selected.length)groups.push({title,items:selected});
  }
  if(left.length)groups.push({title:'其他事情',items:left});
  return groups;
 };
 const sideBuckets=byFamily(side,[
  ['那场首演留下的事',x=>/^side:E[0-9]/.test(x.id)],
  ['先顾好自己的生活',x=>/^side:SELF/.test(x.id)],
  ['其他书外的新消息',x=>true]
 ]);
 const relBuckets=byFamily(relations,[
  ['认真面对已经靠近的人',x=>/^(pair:|group:)/.test(x.id)],
  ['把误会讲清楚',x=>/^(repair|reopen)/.test(x.id)],
  ['一次新的相遇',x=>true]
 ]);
 const back=parent=>`<button class="vn-choice-back" data-choice-back="1" data-choice-parent="${parent}">‹ ${parent===0?'返回今晚安排':'回到上一层'}（不消耗剧情行动）</button>`;
 const leaf=(xs,parent)=>'<div class="choices">'+xs.map(button).join('')+back(parent)+'</div>';
 const category=(xs,base,parent,title)=>'<div class="choices vn-choice-groups"><p class="vn-choice-question">'+esc(title)+'</p>'+xs.map((x,i)=>group(x.title,desc(x.items),base+i)).join('')+back(parent)+'</div>';
 const parts=(xs,title)=>{
  const out=[];for(let i=0;i<xs.length;i+=3){const items=xs.slice(i,i+3);out.push({title:items.length===1?'先处理这一件':`${title}：${items[0].label.replace(/[“”]/g,'').slice(0,11)}等`,items});}
  return out;
 };
 if(choicePage===1)return leaf(visits,0);
 if(choicePage===2)return side.length<=4?leaf(side,0):category(sideBuckets,3,0,'哪种新事更要紧？');
 if(choicePage>=3&&choicePage<=5){
  const bucket=sideBuckets[choicePage-3];if(!bucket)throw Error('无效日程分类');
  return bucket.items.length<=4?leaf(bucket.items,2):category(parts(bucket.items,bucket.title),20+(choicePage-3)*10,2,'先回应哪一件？');
 }
 if(choicePage>=20&&choicePage<50){
  const n=Math.floor((choicePage-20)/10),index=(choicePage-20)%10,bucket=sideBuckets[n];
  return leaf(parts(bucket?.items||[],bucket?.title||'事件')[index]?.items||[],n+3);
 }
 if(choicePage===8)return relations.length<=4?leaf(relations,0):category(relBuckets,9,0,'怎样回应新关系？');
 if(choicePage>=9&&choicePage<=11){
  const bucket=relBuckets[choicePage-9];if(!bucket)throw Error('无效关系分类');
  return bucket.items.length<=4?leaf(bucket.items,8):category(parts(bucket.items,bucket.title),60+(choicePage-9)*10,8,'先把哪一句说清楚？');
 }
 if(choicePage>=60&&choicePage<90){
  const n=Math.floor((choicePage-60)/10),index=(choicePage-60)%10,bucket=relBuckets[n];
  return leaf(parts(bucket?.items||[],bucket?.title||'关系')[index]?.items||[],n+9);
 }
 if(choicePage!==0)throw Error('无效日程选择阶段');
 let html='<div class="choices vn-choice-groups"><p class="vn-choice-question">今晚，把时间留给谁？</p>';
 if(visits.length)html+=group('去见一个想见的人',visits.map(x=>x.label.split(':')[0].trim()).join('、'),1);
 if(side.length)html+=group('看看书外的新事情',desc(side),2);
 if(relations.length)html+=group('处理关系的新变化',desc(relations),8);
 html+=rest.map(button).join('');
 if(visits.length+side.length+relations.length+rest.length!==enabled.length)throw Error('日程动作遗漏');
 return html+'</div>';
}
function controls(cp){
 if(!cp.last){
  const read=profile.readPages.includes(pageKey(cp));
  return `<div class="pager"><button class="next" data-page-next="1">${state.current==='ENTRY_WAKE'?'继续阅读':'继续'}</button>${read?'<button class="quiet" data-skip-read="1">跳过这页已读文字</button>':''}</div>`;
 }
 if(cp.view.isReply)return `<div class="pager"><button class="next" data-reply-next="1">${cp.view.firstWin?'先缓口气':'接着看'}</button></div>`;
 if(cp.view.terminal)return '<div class="pager"><button class="next" data-ending="'+esc(state.ending)+'">重读这个主要结局</button><button class="quiet" data-nav="history">回到读过的选择</button><button class="quiet" data-nav="collection">结局与番外收藏</button></div>'+fateHTML(state);
 const enabled=cp.view.choices.filter(o=>o.enabled);
 const disabled=cp.view.choices.filter(o=>!o.enabled);
 if(state.current==='@schedule'&&enabled.length>4)return scheduleControls(enabled);
 const button=o=>`<button class="choice" data-choice="${esc(o.id)}" data-revision="${state.revision}" data-render="${renderToken}">${esc(o.label)}</button>`;
 const primaryAll=enabled;
 const groups=primaryAll.length>4?semanticGroups(state.current,primaryAll):null;
 if(groups){
  choicePage=Math.max(0,Math.min(choicePage,groups.length));
  if(choicePage===0)return '<div class="choices vn-choice-groups"><p class="vn-choice-question">你更想怎么做？</p>'+groups.map((g,i)=>
    `<button class="vn-group" type="button" data-choice-group="${i+1}"><span><strong>${esc(g.title)}</strong><small>${esc(g.hint)} · ${g.items.length}种做法</small></span><i aria-hidden="true">›</i></button>`).join('')+'</div>';
 }
 const primary=groups?groups[choicePage-1].items:primaryAll;
 const navigation=groups?'<button type="button" class="vn-choice-back" data-choice-back="1">‹ 我想换一种方向（不消耗剧情行动）</button>':'';
 const meetButton=(o,i)=>{
  const c=o.id.startsWith('visit:')?o.id.slice(6):null;
  if(!c||!heroineDesign[c])return button(o);
  const m=heroineDesign[c],label=o.label.split('·').slice(1).join('·').trim()||o.label;
  return `<button class="meet-card" data-choice="${esc(o.id)}" data-revision="${state.revision}" data-render="${renderToken}" data-char="${c}" aria-label="今晚找${esc(m.name)}：${esc(label)}"><span class="meet-portrait"><img src="${PORTRAITS[c]}" alt=""></span><span class="meet-copy"><span class="meet-chip">今晚见她 ↗</span><strong>${esc(m.name)}</strong><small>${esc(label)}</small></span></button>`;
 };
 let html=state.current==='@schedule'?
  '<div class="choices meet-grid">'+primary.map(meetButton).join('')+navigation+'</div>':
  '<div class="choices">'+primary.map(button).join('')+navigation+'</div>';

 // Hidden conditional dialogue alternatives are not tease-paywalls. Show only true alternatives.
 if(!enabled.length)html+='<p class="system">这里没有可用选择，请保留记录并回到上一决定。</p>';
 if(disabled.some(o=>o.requirementHint))html+='<details class="small"><summary>暂不可选的其他做法</summary>'+disabled.filter(o=>o.requirementHint).map(o=>`<p>${esc(o.label)}<br>${esc(o.requirementHint)}</p>`).join('')+'</details>';
 return html;
}
// Presentation-only art: locally drawn vector portraits. No third-party images or downloads.
const heroineDesign={
 t:{name:'唐映雪',role:'舞台上的主唱',verb:'把原版送回舞台',hook:'她会把最后一句唱给谁？',accent:'#f8b6d3',hair:'#994777',hairLight:'#ea98b1',shirt:'#e7b4ba'},
 s:{name:'沈清辞',role:'制作人兼策展人',verb:'抢先告诉她真相',hook:'她的私人号码，会给谁？',accent:'#b5e5f2',hair:'#213a59',hairLight:'#597e9b',shirt:'#6d8da5'},
 l:{name:'林见月',role:'藏在镜头后',verb:'让她换回原版',hook:'她的镜头，第一次为谁转向？',accent:'#dbbdfb',hair:'#5f467e',hairLight:'#ab8bce',shirt:'#aba1c9'},
 g:{name:'顾晚棠',role:'掌握决策的人',verb:'请她亲自叫停',hook:'她为什么单独留下你？',accent:'#ffe1af',hair:'#663a42',hairLight:'#bd7a68',shirt:'#c6a077'}
};
function portraitSVG(c,token='p'){
 const m=heroineDesign[c]||heroineDesign.t;
 const p=`p-${token}-${c}`;
 const long=c==='t'||c==='g';
 const smile=c==='t'? 'M133 167 Q145 172 159 164':'M134 166 Q145 168 157 165';
 const fringe=c==='s'?'M91 94 Q89 55 114 38 Q165 18 194 60 Q201 75 194 107 L184 87 Q157 96 138 77 Q120 102 92 107 Z':c==='l'?'M88 103 Q78 60 112 35 Q161 14 197 57 L192 91 Q162 94 153 76 Q126 117 90 115Z':c==='g'?'M87 99 Q86 48 125 31 Q176 17 201 58 L196 115 Q180 76 173 66 Q147 95 88 104 Z':'M88 112 Q69 74 108 35 Q144 12 179 40 Q199 50 204 94 L187 110 Q178 74 160 65 Q130 108 88 112 Z';
 const accessory=c==='t'?'<g transform="translate(200 173)"><path d="M0 0 L16 -25" stroke="#f5d7de" stroke-width="5" stroke-linecap="round"/><rect x="14" y="-36" width="12" height="20" rx="5" fill="#d5b9c5" transform="rotate(27 18 -28)"/><circle cx="19" cy="-32" r="4" fill="#fff0f3"/></g>':c==='s'?'<g stroke="#d7e1f0" stroke-opacity=".67" stroke-width="2.3" fill="none"><rect x="106" y="117" width="30" height="19" rx="9"/><rect x="153" y="117" width="30" height="19" rx="9"/><path d="M137 123 L153 123"/></g>':c==='l'?'<g transform="translate(51 164)"><rect x="3" y="35" width="44" height="27" rx="6" fill="#383546" stroke="#ddd0ec" stroke-width="2"/><circle cx="25" cy="48" r="11" fill="#8f83b1" stroke="#eae3f5" stroke-width="3"/><circle cx="25" cy="48" r="5" fill="#3b354c"/><path d="M13 32 l5 -8 h14 l4 8" stroke="#e2daef" stroke-width="3" fill="none"/></g>':'<g fill="#f7d39d"><circle cx="97" cy="146" r="3.2"/><path d="M93 150 Q97 170 102 151" fill="none" stroke="#f3c88f" stroke-width="2"/><circle cx="194" cy="145" r="3.2"/><path d="M190 151 Q194 169 198 150" fill="none" stroke="#f3c88f" stroke-width="2"/></g>';
 const hairSide=long?`<path d="M83 78 Q65 125 74 192 Q58 222 45 282 L106 284 Q101 209 101 167Z" fill="url(#${p}-hair)"/><path d="M188 73 Q218 121 211 188 Q239 224 232 282 L183 282 Q190 212 185 163Z" fill="url(#${p}-hair)"/>`:`<path d="M86 83 Q65 131 78 194 L105 212 L104 150Z" fill="url(#${p}-hair)"/><path d="M188 77 Q213 119 209 184 L190 206 L183 141Z" fill="url(#${p}-hair)"/>`;
 const earring=c==='g'?accessory:'';
 return `<svg viewBox="0 0 280 280" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${p}-hair" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${m.hairLight}"/><stop offset="1" stop-color="${m.hair}"/></linearGradient><linearGradient id="${p}-skin" x1=".1" x2=".8" y1=".1" y2="1"><stop stop-color="#fff0e5"/><stop offset=".62" stop-color="#f6c9b8"/><stop offset="1" stop-color="#d89895"/></linearGradient><radialGradient id="${p}-blush"><stop stop-color="#d68591" stop-opacity=".47"/><stop offset="1" stop-color="#d68591" stop-opacity="0"/></radialGradient><linearGradient id="${p}-shirt" x1="0" x2="1"><stop stop-color="${m.shirt}"/><stop offset="1" stop-color="#322c4b"/></linearGradient></defs>
 <ellipse cx="142" cy="272" rx="93" ry="22" fill="#090713" opacity=".14"/><path d="M77 82 Q76 22 140 20 Q210 19 214 95 L221 242 Q175 280 70 254Z" fill="url(#${p}-hair)"/>
 ${hairSide}
 <path d="M123 173 L126 212 L162 216 L169 169Z" fill="url(#${p}-skin)"/><path d="M60 285 Q62 226 95 212 L124 204 Q145 221 166 204 L195 212 Q230 229 233 285Z" fill="url(#${p}-shirt)"/><path d="M117 208 L142 238 L169 206" fill="#f3dfdd" opacity=".9"/><path d="M142 238 L142 281" stroke="#e4b3c8" stroke-opacity=".6" stroke-width="2"/>
 <path d="M92 94 Q87 59 120 51 Q153 43 181 57 Q199 69 193 101 L189 153 Q189 192 147 202 Q109 197 99 165Z" fill="url(#${p}-skin)"/>
 <ellipse cx="105" cy="145" rx="25" ry="16" fill="url(#${p}-blush)"/><ellipse cx="177" cy="145" rx="25" ry="16" fill="url(#${p}-blush)"/>
 <path d="M107 115 Q123 110 133 116 M155 115 Q172 109 183 117" stroke="#5b4556" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".8"/>
 <path d="M107 131 Q118 124 131 130 M154 130 Q166 124 182 131" fill="none" stroke="#493748" stroke-width="3" stroke-linecap="round"/><path d="M109 133 Q120 137 130 133 M155 133 Q167 137 181 133" fill="none" stroke="#8f697b" stroke-width="1" opacity=".65"/><ellipse cx="120" cy="130.5" rx="3.2" ry="4.3" fill="#2e2c3d"/><ellipse cx="167" cy="130.5" rx="3.2" ry="4.3" fill="#2e2c3d"/><circle cx="121" cy="129" r="1.25" fill="#fff"/><circle cx="168" cy="129" r="1.25" fill="#fff"/>
 <path d="M146 136 L142 149 Q145 151 150 148" stroke="#d7a7a8" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="${smile}" stroke="#b96f7c" stroke-width="2" fill="none" stroke-linecap="round"/>
 <path d="${fringe}" fill="url(#${p}-hair)"/>
 ${c==='l'?'<path d="M176 91 L198 96" stroke="#e6ccef" stroke-width="6" stroke-linecap="round"/>':''}
 ${c==='g'?earring:''}
 ${c==='g'?'<path d="M82 100 Q64 168 72 238 M205 104 Q228 189 210 256" stroke="#cb8f7d" stroke-opacity=".6" stroke-width="7" fill="none"/>':''}
 ${c==='t'?accessory:c==='s'?accessory:c==='l'?accessory:''}
 </svg>`;
}
function journeyBits(){
 const h=state.history, c=state.f.first;
 const first=h.some(x=>x.from==='COLD'||x.from==='ENTRY_WAKE');
 const replayed=h.some(x=>x.from==='OP_TALK_'+c)||h.some(x=>x.from==='OP_TALK_self');
 const asked=!!(c&&h.some(x=>x.from==='OP_CHECK_'+c))||h.some(x=>x.from==='OP_DATE_'+c);
 return [{label:'第一次改变命运',done:first},{label:state.f.first==='self'?'留下你的名字':'她记住了你',done:replayed},{label:'今晚的新邀约',done:asked}];
}
function trackHTML(){return `<div class="fate-track" aria-label="首夜命运进度">${journeyBits().map((v,i)=>`<div class="step ${v.done?'passed':journeyBits().slice(0,i).every(x=>x.done)?'active':''}"><span class="dot"></span><span>${esc(v.label)}</span></div>`).join('')}</div>`;}
function openingHTML(cp){
 const opts=cp.view.choices.filter(o=>o.enabled);
 const hints={
 t:['让歌手决定','切换时机交给映雪，阿衡核对音频'],
 s:['先稳住全场','清辞发出统一指令，功劳记进工作单'],
 l:['留下可核对的过程','多花一点时间，由见月保留切换画面'],
 g:['先问清楚权限','晚棠查节目单；程放会注意到你的质疑'],
 self:['不替自己假装专业','你找盘，阿衡切换；陆景行协助过渡']
 };
 const action=o=>`<button type="button" class="rescue-option" data-choice="${esc(o.id)}" data-revision="${state.revision}" data-render="${renderToken}" data-char="${esc(o.id)}"><span class="option-number">${opts.indexOf(o)+1}</span><span><strong>${esc(o.label)}</strong><small>${esc(hints[o.id][1])}</small></span><span aria-hidden="true">↗</span></button>`;
 return `<div class="opening-mast"><span><i class="live-dot"></i>19:02 · 北岸艺术中心</span><span class="volume-label">原著已有了岔路</span></div>
 <section class="crisis-scene"><span class="kicker">原著：陆景行即将弹琴救场</span><h2>盘找到了。<em>你来改写。</em></h2></section>
 <div class="meta"><span>没有阅读倒计时，慢慢决定</span><span>${page+1} / ${cp.pages.length}</span></div>
 ${rowsHTML(cp.rows)}
 ${cp.last?`<div class="decision-title"><h3>怎么让找回来的原版真正改变现场？</h3></div><div class="rescue-options">${opts.map(action).join('')}</div><p class="small">这是救场方式，不是选定恋人。每条路都有人真正做事。</p>`:controls(cp)}`;
}

function firstForkHTML(cp){
 const opts=cp.view.choices.filter(o=>o.enabled);
 const notes={
  canon:'不抢陆景行的名场面，先看清程放准备甩锅的那张单。',
  rescue:'按原著线索抢到原版。真正试听和切换交给音控，先赢一局。',
  investigate:'原版要找，错版更要追：先拿真证据，防他事后改口。'
 };
 const shortTitles={
  canon:'按原著走：盯住背锅线',
  rescue:'抢先救场：找出原版U盘',
  investigate:'先锁证据：找盘查错版'
 };
 const actions=opts.map((o,i)=>`<button type="button" class="rescue-option first-fork-choice" aria-label="${esc(o.label)}" data-choice="${esc(o.id)}" data-revision="${state.revision}" data-render="${renderToken}"><span class="option-number">${i+1}</span><span><strong>${esc(shortTitles[o.id]||o.label)}</strong><small>${esc(notes[o.id])}</small></span><span aria-hidden="true">↗</span></button>`).join('');
 // Narrative is the main first-session experience, not an optional accordion.
 // Page progress is saved without issuing a story command. The first decisive
 // choice exists in the interpreter from the start but is not rendered or
 // accepted by the UI until the canonical opening has actually been read.
 const consumed=cp.pages.slice(0,page+1).flat();
 const recognized=consumed.some(x=>x.speaker==='B');
 const readCost=consumed.some(x=>x.text.includes('第七天')&&x.text.includes('清退'));
 const recognizedStage=recognized?'原著的记忆对上了':consumed.some(x=>x.text.includes('工牌'))?'醒在一个陌生的身体里':'现实突然断了线';
 const subtitle=readCost?'你已经知道照原著走的代价':recognizedStage;
 const progress=`<div class="intro-progress"><span>穿书经过 · 主线必读</span><span>${page+1} / ${cp.pages.length}</span></div>`;
 if(!cp.last){
  return `<section class="first-fork-head intro-reading-head"><span class="kicker">第一章 · 醒来的不是原来的你</span><h2>${page===0?'手机上的那一页，<em>突然黑了。</em>':esc(subtitle)}</h2><p>跟着现场发生的事，一点点想起自己的处境。</p></section>`+
   progress+`<section class="intro-story-pages" aria-label="穿书经过第${page+1}页">${rowsHTML(cp.rows)}</section>`+
   `<p class="intro-reading-note">还没有到决定的时刻。继续阅读，不会替你作选择。</p>`+controls(cp);
 }
 return `<div class="intro-progress"><span>第一章 · 原著的岔路口</span><span>${page+1} / ${cp.pages.length}</span></div>`+
  `<section class="intro-story-pages" aria-label="穿书经过最后一页">${rowsHTML(cp.rows)}</section>`+
  `<div class="first-fork-prompt"><strong>你会怎么做？</strong><span>3 种选择 · 没有倒计时</span></div><div class="rescue-options first-fork-options">${actions}</div>`+
  `<p class="small first-fork-disclaimer">选项会改变后续事件；不替你预先选定恋人。</p>`;
}

function sourceScene(){
 const id=phase==='reply'?state.history.at(-1)?.from:state.current;
 return {id,scene:DATA.scenes[id]};
}
function activePortrait(){
 const {id,scene}=sourceScene();
 if(scene?.character&&heroineDesign[scene.character])return scene.character;
 return id?.match(/^OP_(?:TALK|SECRET|CHECK|DATE)_([tslg])$/)?.[1]||
 id?.match(/^(?:SPARK|REOPEN|OPEN_CLEAR|FOUND|RA|R1|R2|REL)_([tslg])$/)?.[1]||null;
}
function sceneBannerHTML(cp){
 const {id,scene}=sourceScene(),c=activePortrait(),m=c?heroineDesign[c]:null;
 if(cp.view.terminal||id==='@schedule')return '';
 if(id?.startsWith('ENTRY_'))return `<section class="wake-banner"><span class="kicker">${id==='ENTRY_WAKE'?'意识正在恢复':id==='ENTRY_CLUES'?'先看清眼前的事':'你开始想起来了'}</span><h2>${esc(cp.view.title)}</h2><div class="wake-light" aria-hidden="true"></div></section>`;
 if(id==='OP_RIVAL')return `<section class="rival-banner"><span class="kicker">陆景行 · 他也在争取机会</span><h2>${esc(cp.view.title)}</h2></section>`;
 if(!m)return `<h2>${esc(cp.view.title)}</h2>`;
 return `<section class="scene-banner compact-banner" data-char="${c}"><div class="banner-portrait">${portraitSVG(c,'banner')}</div><div class="banner-copy"><div class="kicker">${esc(m.name)} · ${esc(m.role)}</div><h2>${esc(cp.view.title)}</h2></div></section>`;
}
function goalHTML(){
 if(state.complete)return '';
 const id=sourceScene().id;
 if(id!=='@schedule'&&!['A1b','A6a','A7a'].includes(id))return '';
 const text=state.slot<11?(state.f.canon_kept?'钢琴救场照原著，但第七天背锅线仍能改。':'首演已经偏离原著，第七天的风险还没解除。'):'你已跨过原著的退场点，接下来是书里没有的生活。';
 return `<div class="current-goal"><span aria-hidden="true">◇</span><span>${esc(text)}</span></div>`;
}

function openingWinHTML(cp){
 const c=state.f.first,has=!!heroineDesign[c],m=heroineDesign[c]||null;
 return `<div class="opening-mast"><span>第一夜 · 命运已偏移</span><span class="volume-label">第一次改写成功</span></div>
 <section class="payoff-visual" data-char="${esc(c||'self')}"><div class="payoff-copy"><div class="payoff-head">原著 · 已改变</div><h2>这一次，<br>剧情真的改了。</h2><p>${has?esc(m.name)+'第一次真正注意到了你。':'你第一次在原著中留下了自己的名字。'}</p></div>${has?`<div class="win-portrait">${portraitSVG(c,'win')}</div>`:''}<span class="payoff-trophy">✦ 第一处命运改写 · 已记录</span></section>
 <div class="meta"><span>发生过的行动已记下</span><span>${page+1} / ${cp.pages.length}</span></div>${rowsHTML(cp.rows)}${controls(cp)}${trackHTML()}`;
}

function directBridge(){
 if(phase!=='scene'||state.complete||state.current!=='OP_SETTLE')return null;
 const v=renderScene(state,DATA),opts=v.choices.filter(o=>o.enabled);
 if(opts.length!==1||opts[0].id!=='continue')return null;
 const moved=choose(state,DATA,'continue',state.revision);
 if(moved.reply.length)return null;
 const next=renderScene(moved.state,DATA);
 if(!next.choices.some(o=>o.enabled))return null;
 return {pre:v,next,moved};
}
function sceneStagePortrait(cp){
 const activeChar=activePortrait();
 if(activeChar)return activeChar;
  if(state.current==='ENTRY_WAKE'&&phase==='scene'&&currentPage().last)return 't';
  if(state.current==='ENTRY_WAKE'&&phase==='scene'&&page<3)return null;
 const rows=cp.rows||[];
 for(let i=rows.length-1;i>=0;i--){
  const c={T:'t',S:'s',L:'l',G:'g'}[rows[i].speaker];if(c)return c;
 }
 return state.f?.first&&heroineDesign[state.f.first]?state.f.first:null;
}
function vnFrame(cp,interior,sceneTitle,bridge=null){
 const source=sourceScene();const set=(source.scene?.background||'backstage').replace(/[^a-z0-9-]/gi,'');
 const c=sceneStagePortrait(cp);
 const mood=/危机|错误|清退|归责|撤回|背锅|删除/.test(sceneTitle)?'tense':'soft';
 const day=state.current==='@schedule'?DATA.calendar[state.slot]?.day:state.clock?.day||1;
 const chapter=state.complete?'结局·改写的终点':state.current==='ENTRY_WAKE'?'序章 · 醒来':`第${day||1}日 · ${phase==='reply'?'决定之后':'故事继续'}`;
 const portrait=c?`<div class="vn-portrait"><img src="${PORTRAITS[c]}" alt="" draggable="false" loading="eager"></div>`:'';
 const scenery=['stage','theatre','backstage','control','corridor'].includes(set)?`<div class="vn-scenery" style="background-image:url('${SCENERY}')"></div>`:'';
 const stage=`<section class="vn-stage" data-char="${c||'none'}" data-set="${esc(set)}" data-mood="${mood}" aria-hidden="true">${scenery}<div class="vn-lights"></div>${portrait}<div class="vn-stage-top"><div class="vn-scene-label">${esc(chapter)}</div><div class="vn-scene-title">${esc(sceneTitle)}</div><div class="vn-scene-index">${cp.last?'选择在下方直接进行':'轻触下方继续阅读'}</div></div></section>`;
 return `<div class="vn-frame" data-phase="${phase}" data-intro-decision="${state.current==='ENTRY_WAKE'&&phase==='scene'&&cp.last}" data-reader-key="${esc(state.current+':'+state.revision+':'+phase+':'+page)}" data-choice-page="${choicePage}">${stage}<section class="vn-sheet" aria-label="剧情与选择"><div class="vn-sheet-heading"><strong>${esc(sceneTitle)}</strong><button type="button" class="vn-reader-toggle" data-action="reader" aria-expanded="${readerExpanded}" aria-label="${readerExpanded?'收起阅读区，显示更多人物画面':'展开阅读区，看更多剧情文字'}">${readerExpanded?'收起文字 ↓':'展开文字 ↑'}</button></div><div class="vn-scroll" tabindex="0">${interior}</div><div class="vn-dock"></div></section></div>`;
}
function storyHTML(){
 const cp=currentPage();let interior='',bridge=null,heading=cp.view.title;
 if(state.current==='ENTRY_WAKE'&&phase==='scene'&&!state.complete){
  interior=firstForkHTML(cp);
 }else if(state.current==='COLD'&&phase==='scene'&&!state.complete){
  interior=openingHTML(cp);
 }else if(cp.view.firstWin&&phase==='reply'){
  interior=openingWinHTML(cp);
 }else {
  bridge=directBridge();
  if(bridge){
   heading=bridge.next.title;
   const src=cp.rows;
   const nextRows=bridge.next.body||[];
   const futureActions=bridge.next.choices.filter(o=>o.enabled).map(o=>
    `<button class="choice" data-choice="${esc(o.id)}" data-bridge="continue" data-revision="${state.revision}" data-render="${renderToken}">${esc(o.label)}</button>`).join('');
   interior=`<div class="meta"><span>今晚，新的决定</span><span>同屏选择</span></div>${rowsHTML(src)}<div class="vn-choice-question">${esc(bridge.next.title)}</div>${rowsHTML(nextRows)}<div class="choices">${futureActions}</div>`;
  }else {
   const day=state.current==='@schedule'?DATA.calendar[state.slot]?.day:state.clock?.day||1;
   const meta=state.complete?'本轮结局':state.slot===0?'第一夜':`第${day||1}日`;
   interior=`${goalHTML()}<div class="meta"><span>${esc(meta)}</span><span>这是你经历过的事</span></div>${rowsHTML(cp.rows)}${controls(cp)}`;
  }
 }
 return vnFrame(cp,interior,heading,bridge);
}
function handbookHTML(){
 if(!state.f.novel_recognized)return '<h2>记忆还没有对上</h2><p>你刚刚醒来，还没弄清这里是什么地方。先回到现场，看看工作证和舞台。</p>';
 return '<h2>你带进书里的记忆</h2><section class="panel"><h3>你与原男主</h3><p>'+esc(HB.protagonist)+'</p><p>'+esc(HB.originalHero)+'</p></section>'+
 HB.characters.map(c=>`<section class="panel"><h3>${esc(c.name)} · ${c.age}岁</h3><p>${esc(c.public)}</p><p>${esc(c.memory)}</p><p class="small">原著里的未来：${esc(c.originalFate)}</p><p>${esc(c.secret)}</p></section>`).join('');
}
function relationsHTML(){
 let html='<h2>我们实际经历过的事</h2>';
 for(const c of ['t','s','l','g']){
  const met=state.f['opening_date_'+c],sc=state.f['scope_'+c];
  const committed=state.f['commitment_'+c]==='relationship';
  let text=state.f['active_'+c]?(committed?(sc==='exclusive'?'正在交往 · 已约定排他':'正在交往 · 愿意非排他'):(sc==='exclusive'?'愿意约会 · 已约定排他':'愿意约会 · 尚未正式交往')):(sc==='friend'?'明确做朋友':sc==='waiting'?'喜欢，但想慢一点':sc==='declined'?'暂时拒绝，尚未再次邀约':sc==='ended'?'已经明确分开':state.stage[c]?'已经有私人相处':'尚未确认恋爱');
  html+=`<section class="panel"><h3>${esc(DATA.cast[c])}</h3><p>${text}</p>`;
  const unknown=active(state).filter(x=>x!==c&&!state.known[c].includes(x));
  if(state.f['active_'+c]&&unknown.length)html+='<p class="small">还没向她说明：'+esc(unknown.map(x=>DATA.cast[x]).join('、'))+'的当前关系。</p>';
  if(met)html+=`<p class="small">${esc(({attended:'首夜赴约，实际见过面。',deferred:'首夜暂缓，尚未赴约。',work:'首夜提前说明，去准备工作。',cancelled:'首夜见面已取消，没有补算约会。'})[met]||'')}</p>`;
  if(state.f['knows_foreknowledge_claim_'+c])html+='<p class="small">听过你的“知道原著”说法，不代表她已相信。</p>';
  if(state.f['pending_'+c]||state.f['value_conflict_'+c])html+='<p class="small">有已经提出、尚未解决的分歧。</p>';
  html+='</section>';
 }
 return html;
}
function historyHTML(){
 let html='<h2>你做过的选择</h2><p class="small">回到某次选择之前，会替换其后的本轮经历。结局收藏保留。</p>';
 let s=createState();
 for(let i=0;i<state.history.length;i++){
  const h=state.history[i],v=renderScene(s,DATA),o=v.choices.find(o=>o.id===h.id);
  const result=choose(s,DATA,h.id);
  html+=`<section class="panel"><div class="small">${i+1} · ${esc(v.title)}</div><p>${esc(o?.label||h.id)}</p><details data-history="${i}"><summary>这次实际读到的内容</summary>${rowsHTML(v.body,h.from)}<p class="small">你的选择之后</p>${rowsHTML(result.reply,h.from)}</details><button class="quiet" data-restore="${i}">从这里重选</button></section>`;
  s=result.state;
 }
 if(!state.history.length)html+='<p>还没有作出第一个决定。</p>';
 return html;
}
function collectionHTML(){
 const unlocked=Object.keys(profile.endings).length;
 let html=`<h2>改写命运的收藏册</h2><p class="small">不是任务清单。这里是你亲手走出的结局；回看不会改变当前路线。</p><div class="collection-count"><strong>${unlocked} / 24</strong><small>已收录的主要结局 · 换一种决定，看看还有谁会主动靠近</small></div><div class="collection-list">`;
 for(const s of Object.values(DATA.scenes).filter(x=>x.kind==='ending')){
  const known=!!profile.endings[s.id];
  html+=`<section class="collection-card"><small>${known?'✦ 已写入命运':'○ 尚未遇见'}</small><h3>${known?esc(s.title):'未解锁的结局'}</h3>${known?`<button class="quiet" data-ending="${esc(s.id)}">回看这段故事 →</button>`:'<small>靠真实选择解锁</small>'}</section>`;
 }
 html+='</div><h3 style="margin-top:25px">她们故事之外的视角</h3>';
 for(const b of BONUS.items)html+=`<section class="panel"><h3>${esc(b.title)}</h3>${profile.bonuses[b.id]?`<button class="quiet" data-bonus="${esc(b.id)}">读这篇番外</button>`:'<p class="small">真实相处与结局达成后开放。不设广告门槛。</p>'}</section>`;
 return html;
}
function menuHTML(){
 return `<h2>暂停在这里</h2><div class="menu-grid">
 <button class="quiet" data-nav="story">继续剧情</button><button class="quiet" data-nav="handbook">原著与四位女主</button>
 <button class="quiet" data-nav="relations">相处记录</button><button class="quiet" data-nav="history">回看重选</button>
 <button class="quiet" data-nav="collection">结局收藏</button><button class="quiet" data-action="font">${large?'恢复普通字号':'大字阅读'}</button><button class="quiet" data-action="sound">${soundOn?'关闭轻音效':'开启轻音效'}</button>
 <button class="quiet" data-action="export">导出这局记录</button><button class="quiet" data-action="import">导入本版记录</button>
 <button class="quiet" data-action="reset">备份后新开局</button><button class="quiet" data-action="reload">读取已保存记录</button></div>
 <section class="panel small"><h3>这份版本的范围</h3><p>v4.9 竖屏全剧情候选。保留四位独立角色正式剧情与真实回放；所选方向仅是免消耗的选项分类。旧存档保持独立，可自行导出。</p>
 <p>角色均为成年人。本版使用原创候选立绘和自制轻音效；没有平台广告接入或真人留存结论。原始文件和旧版存档不改写。</p>
 <p>${saveBlocked?'当前未自动保存，请离开前导出记录。':'选择、回应页与阅读位置会保存在此浏览器的本版独立记录中。'}</p></section>`;
}
function showNotice(){
 const el=document.getElementById('notice');
 const menu=document.getElementById('menu');
 menu.classList.toggle('unsaved',saveBlocked);menu.innerHTML='<span></span><span></span><span></span>';
 menu.setAttribute('aria-label',saveBlocked?'打开菜单，当前进度未自动保存':'打开菜单');
 el.hidden=!notice;
 el.innerHTML=notice?`<div>${esc(notice)}</div><button data-action="export">导出</button><button data-action="hide-notice">收起提示</button>`:'';
}
function render(scrollWindow=true){
 // A menu, a font-size change or a semantic category is not a new scene.
 // Read the OLD DOM before repainting to avoid jumping back to the start.
 const oldFrame=document.querySelector('.vn-frame');
 if(oldFrame){
  const a=oldFrame.querySelector('.vn-scroll'),d=oldFrame.querySelector('.vn-dock');
  storyScroll={key:oldFrame.dataset.readerKey,text:a?.scrollTop||0,dock:d?.scrollTop||0,choicePage:Number(oldFrame.dataset.choicePage||0)};
 }
 renderToken++;
 document.body.dataset.current=state.current;document.body.dataset.phase=phase;document.body.dataset.panel=panel;
 document.body.dataset.ending=state.complete?state.ending:'';
 document.body.classList.toggle('large',large);
 document.body.classList.toggle('reader-expanded',readerExpanded);
 let html=panel==='story'?storyHTML():panel==='menu'?menuHTML():panel==='handbook'?handbookHTML():panel==='relations'?relationsHTML():panel==='history'?historyHTML():panel==='collection'?collectionHTML():panel==='archive'?archiveHTML():'';
 document.getElementById('app').innerHTML=(panel==='story'?'':'<button class="quiet return" data-nav="story">返回剧情</button>')+html;
 if(panel==='story'){
  const frame=document.querySelector('.vn-frame'),area=frame?.querySelector('.vn-scroll'),dock=frame?.querySelector('.vn-dock');
  // Choices and dialogue stay in one fixed scene; categories do not spend actions.
  const candidates=area?.querySelectorAll('.rescue-options, .choices, .pager');
  const target=candidates?.length?candidates[candidates.length-1]:null;
  if(target&&dock)dock.append(target);
  if(frame?.dataset.readerKey===storyScroll.key){
   if(area)area.scrollTop=storyScroll.text;
   if(dock&&storyScroll.choicePage===choicePage)dock.scrollTop=storyScroll.dock;
  }else{
   // At the final required intro beat, lead with the immediate dilemma.
   // Earlier words stay readable by scrolling up, without extra taps.
   if(area&&state.current==='ENTRY_WAKE'&&phase==='scene'&&currentPage().last)
    area.scrollTop=Math.max(0,area.scrollHeight-area.clientHeight);
   storyScroll={key:frame?.dataset.readerKey||null,text:area?.scrollTop||0,dock:0,choicePage};
  }
 }
 document.getElementById('menu').setAttribute('aria-expanded',String(panel==='menu'));
 showNotice();
 if(scrollWindow)window.scrollTo(0,0);
}

function arm(){downToken=null;pointerStart=null;moved=false;}
function exportLog(){
 const blob=new Blob([JSON.stringify(snapshot(),null,2)],{type:'application/json'});
 const url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download='gonglue-r4-5-choices.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function backToStory(){
 panel='story';render(false);window.scrollTo(0,previousScroll);
}
function reset(){
 if(!confirm('开始新局？当前本版记录会先备份，旧版本记录不变，已读与结局收藏保留。'))return;
 if(storage){
  try{
   if(storage.getItem(KEY)!==lastRaw){saveBlocked=true;notice='另一个窗口已有更新，不能用新开局覆盖它。请先读取新记录或导出这里。';showNotice();return;}
   if(lastRaw)storage.setItem(KEY+':backup:'+Date.now(),lastRaw);
  }catch{notice='备份没有成功，未清除当前记录。请先导出。';showNotice();return;}
 }
 state=createState();lastReply=[];phase='scene';page=0;choicePage=0;panel='story';notice='';
 if(storage){try{lastRaw=storage.getItem(KEY);saveBlocked=false;}catch{saveBlocked=true;}}
 save();render();
}
function choiceSound(){
 if(!soundOn)return;
 try{
  const Audio=window.AudioContext||window.webkitAudioContext;
  if(!Audio)return;
  if(!soundContext)soundContext=new Audio();
  if(soundContext.state==='suspended')void soundContext.resume();
  const o=soundContext.createOscillator(),v=soundContext.createGain();
  o.type='sine';o.frequency.value=520;
  v.gain.setValueAtTime(.0001,soundContext.currentTime);
  v.gain.exponentialRampToValueAtTime(.018,soundContext.currentTime+.01);
  v.gain.exponentialRampToValueAtTime(.0001,soundContext.currentTime+.12);
  o.connect(v).connect(soundContext.destination);o.start();o.stop(soundContext.currentTime+.125);
 }catch{} // Sound permission is optional; never blocks a valid choice.
}
function doAction(action){
 if(action==='export')exportLog();
 else if(action==='import')document.getElementById('importFile').click();
 else if(action==='reset')reset();
 else if(action==='font'){large=!large;save();render();}
  else if(action==='reader'){readerExpanded=!readerExpanded;save();render(false);}
 else if(action==='sound'){soundOn=!soundOn;save();render();}
 else if(action==='hide-notice'){notice='';showNotice();}
 else if(action==='reload'){
  if(!confirm('读取这个浏览器已保存的本版进度？本窗口尚未保存的选择将放下；可先取消并导出。'))return;
  try{
   const raw=storage?.getItem(KEY);if(!raw)throw Error('没有可读取的本版记录');
   install(readPayload(JSON.parse(raw)));lastRaw=raw;saveBlocked=false;notice='';render();
  }catch(e){notice='没有替换当前进度：'+e.message;showNotice();}
 }
}
document.addEventListener('pointerdown',e=>{
 if(e.isPrimary){downToken=renderToken;pointerStart={x:e.clientX,y:e.clientY,id:e.pointerId};moved=false;}
},{passive:true});
document.addEventListener('pointermove',e=>{
 if(pointerStart&&e.pointerId===pointerStart.id&&Math.hypot(e.clientX-pointerStart.x,e.clientY-pointerStart.y)>10)moved=true;
},{passive:true});
document.addEventListener('pointercancel',()=>{downToken=null;pointerStart=null;moved=true;});
window.addEventListener('blur',()=>{downToken=null;pointerStart=null;moved=true;});
document.addEventListener('keydown',e=>{
 if(e.repeat&&(e.key==='Enter'||e.key===' '))e.preventDefault();
 if(e.key==='Escape'&&panel!=='story'){e.preventDefault();backToStory();}
});
document.addEventListener('click',ev=>{
 const b=ev.target instanceof Element?ev.target.closest('button'):null;
 // A new rendered button may receive detail=2 after a legitimate fast touch.
 // The revision/render token and disconnected-node guard reject duplicates without swallowing that touch.
 if(!b||!b.isConnected||b.disabled||busy)return;
 if(ev.detail>0&&(moved||(downToken!==null&&downToken!==renderToken)))return;
 busy=true;
 try{
  if(b.dataset.action){doAction(b.dataset.action);return;}
  if(b.id==='menu'){
   if(panel==='menu')backToStory();else{previousScroll=window.scrollY;panel='menu';render();}
   arm();return;
  }
  if(b.dataset.nav){
   if(b.dataset.nav==='story')backToStory();
   else{if(panel==='story')previousScroll=window.scrollY;panel=b.dataset.nav;render();}
   arm();return;
  }
  if(b.dataset.choiceGroup){
   if(phase!=='scene'||!currentPage().last)return;
   choicePage=Number(b.dataset.choiceGroup);save();render();arm();return;
  }
  if(b.dataset.choiceBack){
   if(phase!=='scene')return;
   choicePage=Math.max(0,Number(b.dataset.choiceParent||0));save();render();arm();return;
  }
  if(b.dataset.choice){
   if(phase!=='scene'||Number(b.dataset.render)!==renderToken||Number(b.dataset.revision)!==state.revision)return;
   const cp=currentPage();if(!cp.last)return;
   markRead(cp);choiceSound();
   if(b.dataset.bridge){
    if(b.dataset.bridge!=='continue'||state.current!=='OP_SETTLE')return;
    const bridge=directBridge();
    if(!bridge||!bridge.next.choices.some(x=>x.id===b.dataset.choice&&x.enabled))return;
    const first=choose(state,DATA,'continue',state.revision);
    state=first.state;
   }
   const out=choose(state,DATA,b.dataset.choice,state.revision);
   state=out.state;lastReply=out.reply;phase=lastReply.length?'reply':'scene';page=0;choicePage=0;
   save();render();arm();return;
  }
  if(b.dataset.choiceNext||b.dataset.choicePrev){
   if(phase!=='scene'||!currentPage().last)return;
   choicePage=Math.max(0,choicePage+(b.dataset.choiceNext?1:-1));save();render();arm();return;
  }
  if(b.dataset.pageNext||b.dataset.skipRead){
   const cp=currentPage();
   if(cp.last||(b.dataset.skipRead&&!profile.readPages.includes(pageKey(cp))))return;
   markRead(cp);page++;save();render();arm();return;
  }
  if(b.dataset.replyNext){
   const cp=currentPage();if(phase!=='reply'||!cp.last)return;
   markRead(cp);phase='scene';page=0;save();render();arm();return;
  }
  if(b.dataset.restore!==undefined){
   if(!confirm('回到这个决定前？之后的本轮经历会替换，收藏保留。'))return;
   state=rewind(state,DATA,Number(b.dataset.restore));lastReply=[];phase='scene';page=0;choicePage=0;panel='story';
   save();render();arm();return;
  }
  if(b.dataset.ending){openEnding(b.dataset.ending);arm();return;}
  if(b.dataset.bonus){openBonus(b.dataset.bonus);arm();return;}
  if(b.dataset.archiveNext){archivePage++;render();arm();return;}
  if(b.dataset.archivePrev){archivePage--;render();arm();return;}
 }catch(e){notice='本次操作未能完成，请先导出记录：'+e.message;showNotice();}
 finally{busy=false;}
});
document.getElementById('importFile').addEventListener('change',async ev=>{
 const f=ev.target.files?.[0];if(!f)return;
 try{
  if(f.size>2400000)throw Error('记录文件过大');
  const candidate=readPayload(JSON.parse(await f.text()));
  if(!confirm('记录已验证。用这份记录替换本窗口进度？'))return;
  if(storage){
   if(storage.getItem(KEY)!==lastRaw)throw Error('另一个窗口已经更新了记录，不能直接覆盖。请先导出这里或读取最新记录。');
   if(lastRaw)storage.setItem(KEY+':backup:'+Date.now(),lastRaw);
  }
  install(candidate);saveBlocked=!storage;notice='';
  if(storage)lastRaw=storage.getItem(KEY);
  save();render();
 }catch(e){notice='未导入，也未改动原进度：'+e.message;showNotice();}
 finally{ev.target.value='';}
});
window.addEventListener('storage',e=>{
 if(e.key===KEY){
  saveBlocked=true;notice='另一个窗口更新了记录。本窗口不再自动覆盖它；可在菜单读取最新记录，或先导出这里。';showNotice();
 }
});
load();render();
