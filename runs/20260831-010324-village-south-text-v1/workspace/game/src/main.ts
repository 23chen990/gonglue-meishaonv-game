import './style.css';
import { RomanceEngine } from './romance-engine.js';
import { getRomanceScene, STORY_VERSION, ROMANCE_STORY } from './romance-content.js';
import { InputGuard } from './romance-input.js';
import { chrome, escapeHtml, renderStory, type ViewNotice } from './romance-view.js';

const root=document.querySelector<HTMLElement>('#app');
if(!root) throw new Error('Missing #app root');
const app:HTMLElement=root;
let storage:Storage|undefined;
try {storage=window.localStorage;} catch { /* Engine reports unavailable persistence visibly. */ }
const game=new RomanceEngine(storage,{storyVersion:STORY_VERSION,getScene:getRomanceScene});
const input=new InputGuard();
let panel:'story'|'history'|'collection'='story';
let returnAction='history';
let externalNotice:ViewNotice|null=null;
let finished=false;

function render(focus=false):void {
  const state=game.getState();
  const notice=externalNotice??game.getNotice();
  if(panel==='story'){
    app.innerHTML=renderStory(game.getScene(),state,notice,game.isCurrentRead());
    if(finished){
      app.querySelector('[data-action="finish"]')?.setAttribute('disabled','');
      const heading=app.querySelector('h2');
      if(heading) heading.insertAdjacentHTML('afterend','<p class="result-card" role="status">照片已收好。本章停在这里；你随时可以查看记录或选择回卷。</p>');
    }
  }else if(panel==='history'){
    app.innerHTML=chrome(`<h2 class="event-title" tabindex="-1">阅读记录</h2><p class="lead">这里只回看已发生的内容。重新选择会恢复到那次决定之前。</p>
      ${state.history.map((entry,index)=>`<section class="summary-card" data-history-index="${index}"><h3>${escapeHtml(entry.scene.title)}</h3>${entry.scene.paragraphs.map(p=>`<p>${escapeHtml(p)}</p>`).join('')}${entry.phase==='decision'?`<button class="primary" data-restore-index="${index}">从这次选择前重玩</button>`:''}</section>`).join('')||'<p class="event-body">还没有已阅读的记录。</p>'}<button class="primary" data-action="back">返回当前剧情</button>`,notice);
  }else{
    app.innerHTML=chrome(`<h2 class="event-title" tabindex="-1">结局收藏</h2><p class="lead">收藏是你的阅读记录，不会替角色增加本周目的知识或物品。</p>${ROMANCE_STORY.endings.map(ending=>`<div class="summary-card" data-collection-ending="${escapeHtml(ending.id)}">${state.endingIds.includes(ending.id)?'✓ '+escapeHtml(ending.title):'○ 尚未读到'}</div>`).join('')}<button class="primary" data-action="back">返回当前剧情</button>`,notice);
  }
  if(focus){app.querySelector<HTMLElement>('h2')?.focus({preventScroll:true});window.scrollTo(0,0);}
}
function runCommand(button:HTMLElement,token:string):void {
  const action=button.dataset.action;
  if(button.dataset.choice){game.markRead(token);game.choose(button.dataset.choice,game.getDecisionToken());}
  else if(button.dataset.restoreIndex!==undefined){
    if(!window.confirm('回到这次选择之前？本次分支后续进度会替换，已读记录与结局收藏保留。'))return;
    game.restoreCheckpoint(Number(button.dataset.restoreIndex),token);panel='story';finished=false;
  }else if(action==='history'||action==='collection'){
    returnAction=action;panel=action;render(true);return;
  }else if(action==='back'){
    panel='story';render();app.querySelector<HTMLElement>(`[data-action="${returnAction}"]`)?.focus();return;
  }else if(action==='continue'||action==='skip-read'){
    if(action==='skip-read'&&!game.isCurrentRead())return;
    game.markRead(token);game.continue(game.getDecisionToken());
  }else if(action==='restart'){
    game.markRead(token);game.restart(game.getDecisionToken());panel='story';finished=false;
  }else if(action==='reset'){
    if(!window.confirm('从第一周目重新开始？当前剧情会替换，已读记录、结局收藏和旧版存档保留。'))return;
    game.reset(token);panel='story';externalNotice=null;finished=false;
  }else if(action==='finish'){
    game.markRead(token);finished=true;
  }else if(action==='retry-save'){
    game.retrySave();externalNotice=null;
  }else if(action==='temporary-session'){
    if(!window.confirm('仅在本窗口继续，不保存新进度。关闭后本次游玩会丢失；已有存档保留。'))return;
    game.startTemporarySession(token);externalNotice=null;
  }else if(action==='reload-save'){
    if(!window.confirm('读取这个浏览器里最新保存的进度？本窗口尚未保存的进度会放下。'))return;
    game.reloadLatest();externalNotice=null;panel='story';finished=false;
  }else return;
  render(true);
}
app.addEventListener('pointerdown',event=>{
  if(event.isPrimary)input.pointerDown(event.clientX,event.clientY,game.getDecisionToken());
},{passive:true});
window.addEventListener('pointermove',event=>input.pointerMove(event.clientX,event.clientY),{passive:true});
window.addEventListener('pointercancel',()=>input.cancel(),{passive:true});
window.addEventListener('blur',()=>input.cancel());
document.addEventListener('visibilitychange',()=>{if(document.hidden)input.cancel();});
document.addEventListener('keydown',event=>{
  if(!input.keyDown(event.key,event.repeat)){event.preventDefault();event.stopPropagation();}
  if(event.key==='Escape'&&panel!=='story'){
    panel='story';render();app.querySelector<HTMLElement>(`[data-action="${returnAction}"]`)?.focus();
  }
},true);
document.addEventListener('keyup',event=>input.keyUp(event.key),true);
app.addEventListener('click',event=>{
  const target=event.target instanceof Element?event.target.closest<HTMLElement>('button'):null;
  if(!target||target.hasAttribute('disabled'))return;
  const token=game.getDecisionToken();
  if(!input.acceptClick(event.detail,token))return;
  runCommand(target,token);
});
window.addEventListener('storage',event=>{
  if(event.storageArea===storage && event.key==='20260831-010324-village-south-text-v1:romance:v1'){
    externalNotice={code:'external-update',message:'另一个窗口更新了进度。请读取已保存进度后继续，避免覆盖。'};render();
  }
});
render();
