export interface ViewScene {id:string;title:string;time:string;paragraphs:string[];choices:{id:string;label:string}[];endingId?:string}
export interface ViewState {phase:string;loop:number;choices:string[];endingIds:string[]}
export interface ViewNotice {code:string;message:string}
export const escapeHtml=(text:string):string=>text.replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]!));
const button=(action:string,label:string,style='primary')=>`<button class="${style}" data-action="${action}">${label}</button>`;
export function chrome(body:string,notice:ViewNotice|null):string {
  return `<header class="topbar"><div><span class="brand-kicker">欠你一个周末</span><h1 class="brand">攻略美少女</h1></div>${button('reset','新开局','text-button')}</header>
  <section class="dossier" data-dossier-label="欠你一个周末 · 第一章"><div class="paper">${body}</div></section>
  <nav class="choices" aria-label="阅读菜单">${button('history','阅读记录','primary')}${button('collection','结局收藏','primary')}</nav>
  ${notice?`<aside class="echo-card" role="status" data-save-notice="${escapeHtml(notice.code)}"><strong>⚠ ${escapeHtml(notice.message)}</strong>${button('retry-save','重试保存')}${button('reload-save','读取已保存进度')}${notice.code!=='session-only'?button('temporary-session','仅本次游玩（不保存）'):''}</aside>`:'<p class="save-note">阅读进度自动记录在此浏览器 · 旧版记录独立保留</p>'}`;
}
export function renderStory(scene:ViewScene,state:ViewState,notice:ViewNotice|null,isRead:boolean):string {
  const progress=Array.from({length:6},(_,i)=>`<i class="${i<state.choices.length?'done':''}"></i>`).join('');
  const body=`<article data-scene-id="${escapeHtml(scene.id)}" data-run-phase="${escapeHtml(state.phase)}" ${scene.endingId?`data-ending-id="${escapeHtml(scene.endingId)}"`:''}>
  <div class="meta-row"><span>${escapeHtml(scene.time)} · 第 ${state.loop} 周目</span><span class="progress" aria-label="已完成 ${state.choices.length} / 6 次决定">${progress}</span></div>
  <h2 class="event-title" tabindex="-1">${escapeHtml(scene.title)}</h2>
  ${scene.paragraphs.map(line=>`<p class="event-body">${escapeHtml(line)}</p>`).join('')}
  ${state.phase==='decision'?`<div class="rule">选择后先阅读回应</div><div class="choices">${scene.choices.map(choice=>`<button class="choice" data-choice="${escapeHtml(choice.id)}"><span class="choice-title">${escapeHtml(choice.label)}</span></button>`).join('')}</div>`:''}
  ${['prologue','response'].includes(state.phase)?button('continue','继续阅读')+(isRead?button('skip-read','跳过这段已读正文'):''):''}
  ${state.phase==='ending'?`<div class="rule">本章已收束 · 由你决定是否回卷</div>${button('finish','收好照片，停在这个结局')}${button('restart','按下回卷，再过一次这个周末')}`:''}
  </article>`;
  return chrome(body,notice);
}
