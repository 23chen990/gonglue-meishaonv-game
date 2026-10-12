const names={N:'',P:'你',T:'唐映雪',S:'沈清辞',L:'林见月',G:'顾晚棠',LU:'陆景行',C:'程放',B:'原著记忆',U:'',A:'阿衡',X:'现场'};
const KEY='gonglue:revision-r4.1:canonical';
const PREVIOUS_KEY='gonglue:revision-r4:canonical';
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let state=createState(), phase='scene', page=0, lastReply=[], panel='story', busy=false;
let archiveView=null, archivePage=0;
let profile={endings:{},bonuses:{},readPages:[]}, notice='', saveBlocked=false, lastRaw=null;
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
         ui:{phase,page,large},profile};
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
 if(!v||v.version!==VERSION||v.storyHash!==STORY_HASH)throw Error('这不是本版的选择记录；旧记录没有被改写。');
 const s=replay(DATA,v.commands);
 const reply=replyFromLog(v.commands);
 const ui=v.ui||{};
 const ph=ui.phase==='reply'&&reply.length?'reply':'scene';
 const pg=Number.isInteger(ui.page)&&ui.page>=0&&ui.page<1000?ui.page:0;
 return {state:s,reply,phase:ph,page:pg,large:!!ui.large,profile:safeProfile(v.profile)};
}
function install(v){
 state=v.state;lastReply=v.reply;phase=v.phase;page=v.page;large=v.large;profile=v.profile;
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
  install(readPayload(JSON.parse(lastRaw)));
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
 const flat=rows.flatMap(splitLongBeat), pages=[];let p=[],n=0;
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
  return {id:'reply:'+h.from+'/'+h.id,title:h.from==='COLD'?'原著，改了。':(DATA.scenes[h.from]?.title||'你的选择之后'),
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
function rowsHTML(rows){
 return rows.map(b=>{
  const sid=phase==='reply'?state.history.at(-1)?.from:state.current;
  const earlyNames=sid==='ENTRY_WAKE'?{A:'戴耳机的男人'}:sid==='ENTRY_CLUES'?{C:'场务负责人',T:'台上的女孩',LU:'钢琴旁的男人'}:{};
  const who=earlyNames[b.speaker]??names[b.speaker];
  const cls=b.speaker==='N'?'narrator':b.speaker==='B'?'memory':b.speaker==='U'?'system':'dialogue';
  return `<div class="line ${cls}" data-speaker="${esc(b.speaker)}" data-beat="${esc(b.id||'')}">${who?`<span class="who">${esc(who)}</span>`:''}<p>${esc(b.text)}</p></div>`;
 }).join('');
}
function controls(cp){
 if(!cp.last){
  const read=profile.readPages.includes(pageKey(cp));
  return `<div class="pager"><button class="next" data-page-next="1">继续</button>${read?'<button class="quiet" data-skip-read="1">跳过这页已读文字</button>':''}</div>`;
 }
 if(cp.view.isReply)return `<div class="pager"><button class="next" data-reply-next="1">${cp.view.firstWin?'先缓口气':'接着看'}</button></div>`;
 if(cp.view.terminal)return '<div class="pager"><button class="next" data-ending="'+esc(state.ending)+'">重读这个主要结局</button><button class="quiet" data-nav="history">回到读过的选择</button><button class="quiet" data-nav="collection">结局与番外收藏</button></div>'+fateHTML(state);
 const enabled=cp.view.choices.filter(o=>o.enabled);
 const disabled=cp.view.choices.filter(o=>!o.enabled);
 const button=o=>`<button class="choice" data-choice="${esc(o.id)}" data-revision="${state.revision}" data-render="${renderToken}">${esc(o.label)}</button>`;
 const primary=state.current==='@schedule'?enabled.filter(o=>!['side','rest'].includes(o.kind)):enabled;
 const secondary=state.current==='@schedule'?enabled.filter(o=>['side','rest'].includes(o.kind)):[];
 const meetButton=(o,i)=>{
  const c=o.id.startsWith('visit:')?o.id.slice(6):null;
  if(!c||!heroineDesign[c])return button(o);
  const m=heroineDesign[c],label=o.label.split('·').slice(1).join('·').trim()||o.label;
  return `<button class="meet-card" data-choice="${esc(o.id)}" data-revision="${state.revision}" data-render="${renderToken}" data-char="${c}" aria-label="今晚找${esc(m.name)}：${esc(label)}"><span class="meet-portrait">${portraitSVG(c,'meet'+i)}</span><span class="meet-copy"><span class="meet-chip">今晚见她 ↗</span><strong>${esc(m.name)}</strong><small>${esc(label)}</small></span></button>`;
 };
 let html=state.current==='@schedule'?
  '<div class="choices meet-grid">'+primary.map(meetButton).join('')+'</div>':
  '<div class="choices">'+primary.map(button).join('')+'</div>';
 if(secondary.length)html+='<details class="other-actions" '+(!primary.length?'open':'')+'><summary>给自己留的安排 · '+secondary.length+'项</summary><div class="choices">'+secondary.map(button).join('')+'</div></details>';
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
 const first=h.some(x=>x.from==='COLD');
 const replayed=h.some(x=>x.from==='OP_TALK_'+c)||h.some(x=>x.from==='OP_TALK_self');
 const asked=!!(c&&h.some(x=>x.from==='OP_CHECK_'+c))||h.some(x=>x.from==='OP_DATE_'+c);
 return [{label:'抢回名场面',done:first},{label:state.f.first==='self'?'留下你的名字':'她记住了你',done:replayed},{label:'今晚的新邀约',done:asked}];
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
 return `<div class="opening-mast"><span><i class="live-dot"></i>19:02 · 北岸艺术中心</span><span class="volume-label">首次改写</span></div>
 <section class="crisis-scene"><span class="kicker">原著：陆景行即将弹琴救场</span><h2>盘找到了。<em>你来改写。</em></h2></section>
 <div class="meta"><span>没有阅读倒计时，慢慢决定</span><span>${page+1} / ${cp.pages.length}</span></div>
 ${rowsHTML(cp.rows)}
 ${cp.last?`<div class="decision-title"><h3>怎样把原版送回舞台？</h3></div><div class="rescue-options">${opts.map(action).join('')}</div><p class="small">这是救场方式，不是选定恋人。每条路都有人真正做事。</p>`:controls(cp)}`;
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
 const text=id==='ENTRY_WAKE'?'先站稳，弄清谁在叫你':id==='ENTRY_CLUES'?'核对名字和现场，不要急着下结论':id==='ENTRY_MEMORY'?'先缓口气，再找能改变剧情的线索':id==='COLD'?'找到了盘，接下来决定怎样救场':state.slot<11?'首演已经改变。第七天的清退风险还没解除。':'你已经留下来了。接下来，认真选你想过的生活。';
 return `<div class="current-goal"><span aria-hidden="true">◇</span><span>${esc(text)}</span></div>`;
}

function openingWinHTML(cp){
 const c=state.f.first,has=!!heroineDesign[c],m=heroineDesign[c]||null;
 return `<div class="opening-mast"><span>第一夜 · 命运已偏移</span><span class="volume-label">第一次改写成功</span></div>
 <section class="payoff-visual" data-char="${esc(c||'self')}"><div class="payoff-copy"><div class="payoff-head">原著 · 已改变</div><h2>这一次，<br>剧情真的改了。</h2><p>${has?esc(m.name)+'第一次真正注意到了你。':'你第一次在原著中留下了自己的名字。'}</p></div>${has?`<div class="win-portrait">${portraitSVG(c,'win')}</div>`:''}<span class="payoff-trophy">✦ 第一处命运改写 · 已记录</span></section>
 <div class="meta"><span>发生过的行动已记下</span><span>${page+1} / ${cp.pages.length}</span></div>${rowsHTML(cp.rows)}${controls(cp)}${trackHTML()}`;
}

function storyHTML(){
 const cp=currentPage(), h=state.history.at(-1);
 if(state.current==='COLD'&&phase==='scene'&&!state.complete)return openingHTML(cp);
 if(cp.view.firstWin&&phase==='reply')return openingWinHTML(cp);
 const day=state.current==='@schedule'?DATA.calendar[state.slot]?.day:state.clock?.day||1;
 const meta=state.complete?'本轮结局':state.slot===0?'第一夜':`第${day||1}日`;
 const showTrack=!state.complete&&!!state.f.first_win&&sourceScene().id==='OP_SETTLE';
 const banner=sceneBannerHTML(cp);
 return `${goalHTML()}${showTrack?trackHTML():''}<div class="meta"><span>${esc(meta)}</span><span>${page+1} / ${cp.pages.length}</span></div>${banner||`<h2>${esc(cp.view.title)}</h2>`}${rowsHTML(cp.rows)}${controls(cp)}${state.current==='COLD'&&phase==='scene'?'<p class="endnote">不锁定攻略路线</p>':''}`;
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
  html+=`<section class="panel"><div class="small">${i+1} · ${esc(v.title)}</div><p>${esc(o?.label||h.id)}</p><details data-history="${i}"><summary>这次实际读到的内容</summary>${rowsHTML(v.body)}<p class="small">你的选择之后</p>${rowsHTML(result.reply)}</details><button class="quiet" data-restore="${i}">从这里重选</button></section>`;
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
 <button class="quiet" data-nav="collection">结局收藏</button><button class="quiet" data-action="font">${large?'恢复普通字号':'大字阅读'}</button>
 <button class="quiet" data-action="export">导出这局记录</button><button class="quiet" data-action="import">导入本版记录</button>
 <button class="quiet" data-action="reset">备份后新开局</button><button class="quiet" data-action="reload">读取已保存记录</button></div>
 <section class="panel small"><h3>这份版本的范围</h3><p>r4 穿书开场与全文修订版。以 r3 四女主 JSON 为内容基线，整部故事与解释器内置，可离线玩到结局。旧版记录独立保留，不静默迁移。</p>
 <p>角色均为成年人。本版没有成品立绘、音频、广告或真人留存结论。原始文件和旧版存档不改写。</p>
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
function render(scroll=true){
 renderToken++; document.body.dataset.current=state.current;document.body.dataset.phase=phase;document.body.dataset.panel=panel;
 document.body.dataset.ending=state.complete?state.ending:'';
 document.body.classList.toggle('large',large);
 let html=panel==='story'?storyHTML():panel==='menu'?menuHTML():panel==='handbook'?handbookHTML():panel==='relations'?relationsHTML():panel==='history'?historyHTML():panel==='collection'?collectionHTML():panel==='archive'?archiveHTML():'';
 document.getElementById('app').innerHTML=(panel==='story'?'':'<button class="quiet return" data-nav="story">返回剧情</button>')+html;
 document.getElementById('menu').setAttribute('aria-expanded',String(panel==='menu'));
 showNotice();
 if(scroll)window.scrollTo(0,0);
}
function arm(){downToken=null;pointerStart=null;moved=false;}
function exportLog(){
 const blob=new Blob([JSON.stringify(snapshot(),null,2)],{type:'application/json'});
 const url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download='gonglue-r4-choices.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function backToStory(){
 panel='story';render(false);window.scrollTo(0,previousScroll);
}
function reset(){
 if(!confirm('开始新局？当前本版记录会先备份，旧版本记录不变，已读与结局收藏保留。'))return;
 if(storage&&lastRaw){
  try{storage.setItem(KEY+':backup:'+Date.now(),lastRaw);}
  catch{notice='备份没有成功，未清除当前记录。请先导出。';showNotice();return;}
 }
 state=createState();lastReply=[];phase='scene';page=0;panel='story';notice='';
 if(storage){try{lastRaw=storage.getItem(KEY);saveBlocked=false;}catch{saveBlocked=true;}}
 save();render();
}
function doAction(action){
 if(action==='export')exportLog();
 else if(action==='import')document.getElementById('importFile').click();
 else if(action==='reset')reset();
 else if(action==='font'){large=!large;save();render();}
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
  if(b.dataset.choice){
   if(phase!=='scene'||Number(b.dataset.render)!==renderToken||Number(b.dataset.revision)!==state.revision)return;
   const cp=currentPage();if(!cp.last)return;
   markRead(cp);
   const out=choose(state,DATA,b.dataset.choice,state.revision);
   state=out.state;lastReply=out.reply;phase=lastReply.length?'reply':'scene';page=0;
   save();render();arm();return;
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
   state=rewind(state,DATA,Number(b.dataset.restore));lastReply=[];phase='scene';page=0;panel='story';
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
  if(storage&&lastRaw)storage.setItem(KEY+':backup:'+Date.now(),lastRaw);
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

