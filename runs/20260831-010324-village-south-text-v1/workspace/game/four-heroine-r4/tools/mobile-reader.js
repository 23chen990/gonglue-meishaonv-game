/* Mobile VN v2. Presentation only; canonical commands and story stay untouched.
 * One source turn per page. No expanding sheets, scrolling, or font shrinking.
 */
const MOBILE_READER_VERSION=2;
let mobilePageCache=null, mobilePosition=null, mobilePendingAnchor=null;
const mobileMeasure=document.createElement('div');
mobileMeasure.className='mobile-measure';mobileMeasure.setAttribute('aria-hidden','true');
document.body.append(mobileMeasure);
const mobileShotSpecs={
 'ENTRY_WAKE.intro.001':{hash:'46c0a8eb694c02b0',kind:'phone'},
 'ENTRY_WAKE.intro.002':{hash:'4322482b78a38d1a',kind:'blackout'},
 'ENTRY_WAKE.intro.004':{hash:'381613baa945a9ef',kind:'wake'},
 'ENTRY_WAKE.intro.007':{hash:'c2f8e655544b9b3f',kind:'badge'},
 'ENTRY_WAKE.intro.009':{hash:'31059f03648e45fe',kind:'venue'},
 'ENTRY_WAKE.intro.013':{hash:'e242ed10f076b76f',kind:'piano',speech:'陆景行，交给你了！',speaker:'X'},
 'ENTRY_WAKE.intro.015':{hash:'1fcd12a327ad111d',kind:'introductions'},
 'ENTRY_WAKE.intro.018':{hash:'0fba1700b8bcdc19',kind:'pain',speech:'嘶……不是梦。',speaker:'P'},
 'ENTRY_WAKE.intro.026':{hash:'8c19f6181d538484',kind:'usb-memory'},
 'ENTRY_WAKE.intro.028':{hash:'416aa34ad470571c',kind:'standoff'},
 'ENTRY_WAKE.r42.reply.canon.001':{hash:'3631bd70b4b82c24',kind:'handover'},
 'ENTRY_WAKE.r42.reply.rescue.001':{hash:'42afa151967e603b',kind:'usb-found'},
 'ENTRY_WAKE.r42.reply.investigate.001':{hash:'813b9fd1476bdca9',kind:'usb-evidence'}
};
function mobileShot(b){const s=mobileShotSpecs[b.id];return s&&s.hash===b.textHash?s:null;}
function mobileMetrics(){
 const h=Math.max(1,Math.floor(window.visualViewport?.height||window.innerHeight));
 const shell=document.querySelector('.game-shell');
 const w=Math.floor(shell?.getBoundingClientRect().width||Math.min(innerWidth,460));
 const ratio=large||h<520?1/3:1/4;
 const height=Math.floor(h*ratio),font=large?22:18,line=font*1.5;
 mobileMeasure.style.cssText='position:fixed;left:-9999px;top:0;visibility:hidden;pointer-events:none;contain:layout style;box-sizing:content-box;white-space:pre-wrap;overflow-wrap:anywhere;word-break:normal;font-family:system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;font-weight:400;font-style:normal;letter-spacing:0;width:'+Math.max(60,w-40)+'px;font-size:'+font+'px;line-height:'+line+'px;padding-bottom:env(safe-area-inset-bottom)';
 const safe=parseFloat(getComputedStyle(mobileMeasure).paddingBottom)||0;
 mobileMeasure.style.paddingBottom='0px';
 const lines=Math.max(1,Math.min(3,Math.floor((height-24-44-12-safe)/line)));
 const textHeight=Math.max(line,Math.min(lines*line,height-24-44-12-safe));
 return {w,h,height,font,line,safe,textHeight,key:[w,h,font,safe,lines].join(':')};
}
function mobileSplit(b,m,index){
 const shot=mobileShot(b),text=shot?(shot.speech||''):b.text;
 const who=shot?.speaker||b.speaker;
 const base={...b,speaker:who,_sourceId:b.id||'row:'+index,_row:index,_shot:shot?.kind||'',_sourceText:b.text,_thought:b.speaker==='B'||(b.speaker==='P'&&/^[（(]/.test(b.text))};
 if(!text)return [{...base,text:'',_start:0,_end:0}];
 const chars=typeof Intl.Segmenter==='function'?Array.from(new Intl.Segmenter('zh',{granularity:'grapheme'}).segment(text),x=>x.segment):Array.from(text);
 const out=[];let start=0;
 const fits=t=>{mobileMeasure.textContent=t;return mobileMeasure.getBoundingClientRect().height<=m.textHeight+.1;};
 while(start<chars.length){
  let low=start+1,high=Math.min(chars.length,start+90),end=start;
  while(low<=high){const mid=(low+high)>>1;if(fits(chars.slice(start,mid).join(''))){end=mid;low=mid+1;}else high=mid-1;}
  if(end===start)throw Error('Mobile dialogue cannot fit one glyph in this viewport');
  if(end<chars.length){
   const minimum=start+Math.max(1,Math.floor((end-start)*.45));
   for(let i=end-1;i>=minimum;i--)if(/[。！？!?；;\n]/u.test(chars[i])){end=i+1;break;}
  }
  out.push({...base,text:chars.slice(start,end).join(''),_start:start,_end:end});start=end;
 }
 return out;
}
paginate=function(rows){
 const m=mobileMetrics();
 const signature=rows.map(b=>[b.id,b.speaker,b.text,b.textHash].join('\u0000')).join('\u0001');
 if(mobilePageCache?.signature===signature&&mobilePageCache.key===m.key)return mobilePageCache.pages;
 const pages=rows.flatMap((b,i)=>mobileSplit(b,m,i).map(part=>[part]));
 if(!pages.length)pages.push([{speaker:'U',text:'',_row:0,_sourceId:'empty',_start:0,_end:0}]);
 mobilePageCache={signature,key:m.key,pages};return pages;
};
function mobileAnchor(row){return {id:row._sourceId,row:row._row,offset:row._start};}
function mobileFindAnchor(pages,a){
 const exact=pages.findIndex(p=>p[0]._sourceId===a.id&&p[0]._start<=a.offset&&(p[0]._end>a.offset||p[0]._start===p[0]._end));
 return exact>=0?exact:Math.max(0,pages.findIndex(p=>p[0]._row===a.row));
}
currentPage=function(){
 let view=getView(),bridge=null;
 // OP_SETTLE contains an internal canonical "continue" bridge. Keep that
 // command invisible, but do not skip the destination scene's authored turns:
 // present both scenes as one mobile reading sequence and commit the hidden
 // bridge only together with the player's real destination choice.
 if(phase==='scene'&&state.current==='OP_SETTLE'){
  bridge=directBridge();
  if(bridge){
   view={...view,id:view.id+':bridge',title:bridge.next.title,
     body:[...(view.body||[]),...(bridge.next.body||[])],
     choices:bridge.next.choices};
  }
 }
 const pages=paginate(view.body),key=mobilePageCache.key;
 if(mobilePendingAnchor){page=mobileFindAnchor(pages,mobilePendingAnchor);mobilePendingAnchor=null;}
 else if(mobilePosition?.view===view.id&&mobilePosition.page===page&&mobilePosition.key!==key)page=mobileFindAnchor(pages,mobilePosition.anchor);
 page=Math.max(0,Math.min(page,pages.length-1));
 const rows=pages[page];mobilePosition={view:view.id,page,key,anchor:mobileAnchor(rows[0])};
 return {view,pages,rows,last:page===pages.length-1,bridge};
};
const mobileOldSnapshot=snapshot,mobileOldReadPayload=readPayload,mobileOldInstall=install;
snapshot=function(){const cp=currentPage(),v=mobileOldSnapshot();v.ui.readerVersion=MOBILE_READER_VERSION;v.ui.cursor=mobileAnchor(cp.rows[0]);v.ui.readerExpanded=false;return v;};
readPayload=function(v){
 const result=mobileOldReadPayload(v),a=v?.ui?.cursor;
 result.readerExpanded=false;
 result.mobileCursor=v.ui?.readerVersion===MOBILE_READER_VERSION&&a&&typeof a.id==='string'&&a.id.length<240&&Number.isInteger(a.offset)&&a.offset>=0&&a.offset<100000&&Number.isInteger(a.row)&&a.row>=0?{id:a.id,row:a.row,offset:a.offset}:null;
 if(v.ui?.readerVersion!==MOBILE_READER_VERSION)result.page=0;
 return result;
};
install=function(v){mobileOldInstall(v);mobilePendingAnchor=v.mobileCursor||null;mobilePosition=null;mobilePageCache=null;};
function mobileVoice(b){
 const early=sourceScene().id==='ENTRY_WAKE'?{A:'戴耳机的男人',C:'对讲机里的场务',T:'台上的女孩',LU:'钢琴旁的男人'}:{};
 if(b.speaker==='N'||b.speaker==='U')return '';
 return b._thought?'许照 · 心声':early[b.speaker]??names[b.speaker]??'';
}
function mobileProp(kind){
 const usb='<div class="mobile-usb"><span>USB</span></div>';
 const socket='<div class="mobile-socket"><i></i><i></i><i></i></div>';
 const folder='<div class="mobile-document"><small>现场交接</small><strong>版本确认</strong><hr><p>签名：<span class="mobile-sign">许照</span></p></div>';
 if(kind==='phone')return '<div class="mobile-phone"><small>《今夜偏爱男主》·第十三章</small><div class="mobile-dismissal"><b>清退通知</b><span>许照：因现场失误清退</span></div><div class="mobile-guards" aria-hidden="true"><i></i><i></i><i></i></div><small>← 往前两页</small>'+folder+'</div>';
 if(kind==='blackout')return '<div class="mobile-falling-phone"></div><div class="mobile-blackout"></div>';
 if(kind==='badge')return '<div class="mobile-lanyard"></div><div class="mobile-badge"><small>北岸艺术中心</small><div class="mobile-id-photo" aria-hidden="true"><i></i></div><strong>许照</strong><span>临时场务</span></div>';
 if(kind==='venue')return '<div class="mobile-placard"><small>北岸艺术中心</small><strong>栖光计划</strong></div><div class="mobile-road-case"><b>STAGE / 03</b></div>';
 if(kind==='wake')return '<div class="mobile-light-rays"></div><div class="mobile-road-case"><b>STAGE / 03</b></div>';
 if(kind==='piano')return '<div class="mobile-piano"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>';
 if(kind==='introductions')return '<div class="mobile-cast-reveal">'+['l','g'].map(c=>'<div><img src="'+PORTRAITS[c]+'" alt=""><strong>'+esc(names[c.toUpperCase()])+'</strong><small>'+(c==='l'?'相机后面的人':'正在核对邮件')+'</small></div>').join('')+'</div>';
 if(kind==='pain')return '<div class="mobile-console"><span>GAIN</span><i></i><i></i><i></i><i></i><span>MONITOR</span></div>';
 if(kind==='usb-memory')return '<div class="mobile-memory-label">原著记忆 · 还未拿到</div><div class="mobile-usb-location">'+socket+usb+'</div><div class="mobile-cue-caption">蓝标原版·接线板下</div>';
 if(kind==='usb-found'||kind==='usb-evidence')return '<div class="mobile-found">'+usb+'</div><div class="mobile-cue-caption">'+(kind==='usb-found'?'原版到手':'原版到手·换版者仍未确认')+'</div>';
 if(kind==='handover')return '<div class="mobile-handover">'+folder.replace('<span class="mobile-sign">许照</span>','<span class="mobile-sign">____________</span>')+'</div>';
 if(kind==='standoff')return '<div class="mobile-stop" aria-hidden="true">✋</div><div class="mobile-cue-caption">箱子被挡住了</div>';
 return '';
}
function mobilePortrait(cp){
 const b=cp.rows[0],by={T:'t',S:'s',L:'l',G:'g'};
 if(by[b.speaker])return by[b.speaker];
 if(sourceScene().id==='ENTRY_WAKE')return b._shot==='standoff'?'t':null;
 return activePortrait()||null;
}
function mobileButtons(cp){
 if(cp.last&&cp.bridge){
  const buttons=cp.bridge.next.choices.filter(o=>o.enabled).map(o=>
   `<button class="choice" data-choice="${esc(o.id)}" data-bridge="continue" data-revision="${state.revision}" data-render="${renderToken}">${esc(o.label)}</button>`).join('');
  return '<div class="choices">'+buttons+'</div>';
 }
 const holder=document.createElement('div');holder.innerHTML=controls(cp);
 holder.querySelectorAll('[data-skip-read]').forEach(n=>n.remove());
 const next=holder.querySelector('[data-page-next]');if(next)next.textContent='继续';
 if(cp.view.terminal)holder.querySelector('.fates')?.remove();
 return holder.innerHTML;
}
storyHTML=function(){
 const cp=currentPage(),b=cp.rows[0],m=mobileMetrics(),c=mobilePortrait(cp),voice=mobileVoice(b);
 const decision=cp.last&&!cp.view.isReply&&!cp.view.terminal&&cp.view.choices.some(o=>o.enabled);
 const mode=cp.view.terminal?'ending':decision?'decision':phase==='reply'?'reply':'reading';
 const scene=sourceScene(),set=scene.scene?.background||scene.background||'backstage';
 const isVisual=!!b._shot&&!b.text,thought=!!b._thought;
 const kind=isVisual?'visual':thought?'thought':b.speaker==='N'?'narration':'dialogue';
 const heading=scene.id==='ENTRY_WAKE'?'第一夜 · 醒来':(cp.bridge?.next?.title||cp.view.title);
 const art=c?'<div class="vn-portrait mobile-portrait"><img src="'+PORTRAITS[c]+'" alt="" draggable="false"></div>':'';
 const controlsHTML=mobileButtons(cp);
 const stageImage=['backstage','theatre','stage','control','corridor'].includes(set)?' style="background-image:url(\''+SCENERY+'\')"':'';
 const options=decision||cp.view.terminal?'<div class="vn-dock mobile-options" role="group" aria-label="选择你的行动">'+controlsHTML+'</div>':'';
 const footer=decision?'<span class="mobile-prompt">你会怎么做？</span>':cp.view.terminal?'':controlsHTML;
 const panelHeight=decision?Math.ceil(56+m.safe):m.height;
 const style='--mobile-panel:'+panelHeight+'px;--mobile-font:'+m.font+'px;--mobile-line:'+m.line+'px;--mobile-safe:'+m.safe+'px;--mobile-vh:'+m.h+'px';
 return '<div class="vn-frame mobile-vn" style="'+style+'" data-mode="'+mode+'" data-beat-kind="'+kind+'" data-shot="'+esc(b._shot)+'" data-source="'+esc(b._sourceId)+'" data-reader-key="'+esc(cp.view.id+':'+page)+'">'+
 '<section class="vn-stage mobile-stage" data-set="'+esc(set)+'"><div class="vn-scenery mobile-scenery"'+stageImage+' aria-hidden="true"></div>'+art+
 '<div class="mobile-scene-name">'+esc(heading)+'</div><div class="mobile-prop" '+(b._shot?'role="img" aria-label="'+esc(b._sourceText)+'"':'aria-hidden="true"')+'>'+mobileProp(b._shot)+'</div></section>'+options+
 '<section class="vn-sheet mobile-sheet" aria-label="当前对白"><div class="mobile-speaker">'+esc(voice)+'</div><div class="vn-scroll mobile-text" aria-live="polite" aria-atomic="true">'+
 (b.text?'<div class="line" data-speaker="'+esc(b.speaker)+'" data-beat="'+esc(b._sourceId)+'"><p>'+esc(b.text)+'</p></div>':'')+'</div><div class="vn-dock mobile-dock">'+footer+'</div></section></div>';
};
const mobileOldMenu=menuHTML;
menuHTML=function(){const holder=document.createElement('div');holder.innerHTML=mobileOldMenu();holder.querySelectorAll('[data-action=reader]').forEach(n=>n.remove());return holder.innerHTML+'<details class="panel"><summary>当前场景文字记录</summary>'+rowsHTML(getView().body)+'</details>';};
fitOpeningReader=function(){};
render=function(scrollWindow=true){
 renderToken++;readerExpanded=false;
 document.body.dataset.current=state.current;document.body.dataset.phase=phase;document.body.dataset.panel=panel;document.body.dataset.ending=state.complete?state.ending:'';
 document.body.classList.toggle('large',large);document.body.classList.remove('reader-expanded');
 const html=panel==='story'?storyHTML():panel==='menu'?menuHTML():panel==='handbook'?handbookHTML():panel==='relations'?relationsHTML():panel==='history'?historyHTML():panel==='collection'?collectionHTML():panel==='archive'?archiveHTML():'';
 document.getElementById('app').innerHTML=(panel==='story'?'':'<button class="quiet return" data-nav="story">返回剧情</button>')+html;
 if(panel==='story')mobileFitOptions();
 document.getElementById('menu').setAttribute('aria-expanded',String(panel==='menu'));showNotice();
 if(scrollWindow)window.scrollTo(0,0);
};
let mobileOptionIndex=0,mobileOptionKey='';
function mobileFitOptions(){
 const box=document.querySelector('.mobile-options');if(!box)return;
 const metrics=mobileMetrics(),key=[getView().id,choicePage,large,metrics.key].join(':');
 if(key!==mobileOptionKey){mobileOptionIndex=0;mobileOptionKey=key;}
 const all=Array.from(box.querySelectorAll('button')).filter(b=>!b.matches('[data-mobile-options]'));
 if(!all.length)return;
 const maxHeight=parseFloat(getComputedStyle(box).maxHeight);
 if(!Number.isFinite(maxHeight)||box.scrollHeight<=maxHeight+1)return;
 // Short screens must never rely on hidden scrolling. Use deterministic
 // presentation-only pages so every canonical action remains reachable.
 const perPage=(large||metrics.h<620)?1:2;
 const pages=[];
 for(let i=0;i<all.length;i+=perPage)pages.push(all.slice(i,i+perPage));
 if(pages.length<2)return;
 mobileOptionIndex=Math.max(0,Math.min(mobileOptionIndex,pages.length-1));
 box.classList.add('mobile-options-paged');box.replaceChildren();
 const host=document.createElement('div');host.className='mobile-option-items';
 host.replaceChildren(...pages[mobileOptionIndex]);box.append(host);
 const nav=document.createElement('div');nav.className='mobile-option-navigation';
 nav.innerHTML='<button type="button" data-mobile-options="-1" '+(mobileOptionIndex===0?'disabled':'')+' aria-label="上一组选项">上一组</button><span>'+(mobileOptionIndex+1)+' / '+pages.length+'</span><button type="button" data-mobile-options="1" '+(mobileOptionIndex===pages.length-1?'disabled':'')+' aria-label="下一组选项">下一组</button>';
 box.append(nav);
 if(box.scrollHeight>box.clientHeight+2)throw Error('Paged action layer exceeds the supported viewport');
}
document.addEventListener('click',e=>{
 const b=e.target.closest?.('[data-mobile-options]');if(!b||b.disabled)return;
 e.preventDefault();e.stopImmediatePropagation();mobileOptionIndex+=Number(b.dataset.mobileOptions);render(false);arm();
},true);
let mobileResizePending=false;
function mobileResize(){if(mobileResizePending)return;mobileResizePending=true;requestAnimationFrame(()=>{mobileResizePending=false;if(panel==='story'){render(false);save();}});}
window.addEventListener('resize',mobileResize,{passive:true});
window.visualViewport?.addEventListener('resize',mobileResize,{passive:true});
if(document.fonts)document.fonts.ready.then(()=>{mobilePageCache=null;if(panel==='story')render(false);});
