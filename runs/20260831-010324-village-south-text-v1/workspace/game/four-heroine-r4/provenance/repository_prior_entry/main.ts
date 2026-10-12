import './style.css';
import { AdService } from './ad-service.js';
import { CHAPTER_EVENTS, CHAPTER_TITLE, CHAPTER_YEARS, KEEPSAKES, STAT_DEFINITIONS, type StatId } from './chapter-data.js';
import { GameEngine, type GameState } from './game.js';

declare global {
  interface Window {
    __GAME_TEST__: GameTestApi;
    __NARRATIVE_TEST__: NarrativeTestApi;
  }
}

interface CompatibilityState {
  randomSeed: number;
  inventory: number;
  currency: number;
  customerWaiting: boolean;
  level: number;
}

interface GameTestApi {
  resetGame(): ReturnType<GameTestApi['getState']>;
  getState(): GameState & CompatibilityState;
  spawnCustomer(): GameState & CompatibilityState;
  completeOrder(): GameState & CompatibilityState;
  grantCurrency(amount: number): GameState & CompatibilityState;
  upgradeStation(): GameState & CompatibilityState;
  setRandomSeed(seed: number): GameState & CompatibilityState;
}

interface NarrativeTestApi {
  revealFamilyCondition(): GameState;
  selectKeepsake(id: string): GameState;
  choose(id: string): GameState;
  continue(): GameState;
  getChoices(): ReturnType<GameEngine['getAvailableChoices']>;
  getState(): GameState;
  reset(): GameState;
  restart(): GameState;
  chooseInheritance(id: string): GameState;
}

const app = (() => {
  const element = document.querySelector<HTMLElement>('#app');
  if (!element) throw new Error('Missing #app root');
  return element;
})();

const game = new GameEngine(window.localStorage);
const ads = new AdService();
let compatibility: CompatibilityState = { randomSeed: 1, inventory: 0, currency: 0, customerWaiting: false, level: 1 };

const effectText = (effects: Partial<Record<StatId, number>>) => Object.entries(effects).map(([id, delta]) => {
  const stat = STAT_DEFINITIONS.find((item) => item.id === id)!;
  const sign = (delta ?? 0) > 0 ? '+' : '';
  return `<span class="effect ${(delta ?? 0) < 0 ? 'negative' : ''}">${stat.label} ${sign}${delta}</span>`;
}).join('');

function chrome(state: GameState, content: string): string {
  const hud = STAT_DEFINITIONS.map((stat) => {
    const value = state.stats[stat.id];
    const percentage = Math.round(((value - stat.min) / (stat.max - stat.min)) * 100);
    return `<div class="stat" data-stat="${stat.id}"><span class="stat-label">${stat.label}</span><span class="stat-value">${value}</span><span class="stat-track"><span class="stat-fill" style="width:${percentage}%"></span></span></div>`;
  }).join('');
  return `
    <header class="topbar">
      <div><span class="brand-kicker">A LIFE IN CHANGE</span><h1 class="brand">村口向南</h1></div>
      <button class="text-button" data-action="reset" aria-label="重新开始">重开</button>
    </header>
    <section id="hud" aria-label="人物状态">${hud}</section>
    <section class="dossier"><div class="paper">${content}</div></section>
    <p class="save-note">卷宗会自动保存 · 本章无强制广告</p>`;
}

function progress(index: number): string {
  return `<span class="progress" aria-label="本章进度 ${index + 1} / ${CHAPTER_EVENTS.length}">${CHAPTER_EVENTS.map((_, item) => `<i class="${item <= index ? 'done' : ''}"></i>`).join('')}</span>`;
}

function renderFamilyCondition(state: GameState): string {
  const family = (game as GameEngine).getState().familyCondition;
  const card = family ? `家况签已翻开：${family}` : '你还不知道这一年会把什么递到手里。';
  return chrome(state, `<div class="meta-row"><span>${CHAPTER_TITLE}</span><span>${CHAPTER_YEARS}</span></div><h2 class="screen-title">先看看家里站在哪一边</h2><p class="lead">同一个年代，不同的家况，会让同一个选择长出不同的后果。</p><div class="family-card"><span class="result-label">今年的家况签</span>${card}</div><button class="primary" data-action="reveal-family">翻开家况签</button>`);
}

function renderKeepsake(state: GameState): string {
  return chrome(state, `
    <div class="meta-row"><span>${CHAPTER_TITLE}</span><span>${CHAPTER_YEARS}</span></div>
    <h2 class="screen-title">离家前，你带上什么？</h2>
    <p class="lead">一个旧物，会让同样的年代从不同起点开始。</p>
    <div class="rule">选择一件纪念物</div>
    <div class="keepsakes">${KEEPSAKES.map((item) => `
      <button class="keepsake" data-keepsake="${item.id}">
        <span class="keepsake-title">${item.name}</span>
        <span class="keepsake-copy">${item.description}</span>
        <span class="effects">${effectText(item.effects)}</span>
      </button>`).join('')}</div>`);
}

function renderEvent(state: GameState): string {
  const event = game.getCurrentEvent();
  const options = game.getAvailableChoices();
  return chrome(state, `
    <div class="meta-row"><span>${CHAPTER_TITLE}</span>${progress(state.eventIndex)}</div>
    <div class="meta-row"><span class="year-stamp">${event.year} 年</span><span>卷 ${String(state.eventIndex + 1).padStart(2, '0')}</span></div>
    <h2 class="event-title">${event.title}</h2>
    <p class="event-body">${event.body}</p>
    <div class="rule">你准备怎么做</div>
    <div class="choices">${options.map((option, index) => `
      <button class="choice" data-choice="${option.id}" ${option.available ? '' : 'disabled'} data-gameplay-decision data-gameplay-role="primary-action">
        <span class="choice-title">${String.fromCharCode(65 + index)} · ${option.label}</span>
        <span class="effects">${effectText(option.immediateEffects)}</span>
        <span class="choice-meta">两次选择后 · ${effectText(option.delayedEffects)}</span>
        ${option.reason ? `<span class="choice-meta">暂不可选：${option.reason}</span>` : '<span class="choice-meta">选择后立即推进卷宗</span>'}
      </button>`).join('')}</div>`);
}

function renderResult(state: GameState): string {
  const event = game.getCurrentEvent();
  const isLast = state.eventIndex === 5;
  return chrome(state, `
    <div class="meta-row"><span>${event.year} 年 · 已归档</span>${progress(state.eventIndex)}</div>
    <h2 class="event-title">决定已经落笔</h2>
    <div class="rule">短期后果</div>
    <div class="result-card"><span class="result-label">当下</span>${state.lastResult ?? ''}<div class="effects">${effectText(state.lastEffects)}</div></div>
    ${state.recentEchoes.map((echo) => `<div class="echo-card"><span class="result-label">旧选择的回响</span>${echo}</div>`).join('')}
    <button class="primary" data-action="continue">${isLast ? '查看第一章卷宗' : `继续 · ${CHAPTER_EVENTS[state.eventIndex + 1].year} 年`}</button>`);
}

function renderComplete(state: GameState): string {
  const highest = [...STAT_DEFINITIONS].sort((a, b) => state.stats[b.id] - state.stats[a.id])[0];
  return chrome(state, `
    <div class="meta-row"><span>${CHAPTER_TITLE}</span><span class="year-stamp">已封卷</span></div>
    <h2 class="screen-title">田埂松动，路还很长</h2>
    <p class="lead">四年里你做了六次决定。最高的不是成败，而是你积下的“${highest.label}”。下一章将从这些痕迹继续生长。</p>
    <div class="summary-card"><span class="result-label">第一章选择档案</span><div class="timeline">${state.history.map((item) => `<div class="timeline-item"><span class="timeline-year">${item.year}</span><span class="timeline-choice"><strong>${item.title}</strong><br>${item.choiceLabel}</span></div>`).join('')}</div></div>
    <div class="rule">带走一项经验，下一局会从这里继续</div><div class="inheritances">${game.getInheritanceChoices().map((item) => `<button class="keepsake inheritance" data-inheritance="${item.id}">${item.title}<span class="choice-meta">${item.stat} +1 · 影响下一局起点</span></button>`).join('')}</div><button class="primary" data-action="restart">开始下一局</button>`);
}

function render(): void {
  const state = game.getState();
  const output = state.screen === 'family-condition' ? renderFamilyCondition(state)
    : state.screen === 'keepsake' ? renderKeepsake(state)
    : state.screen === 'event' ? renderEvent(state)
      : state.screen === 'result' ? renderResult(state)
        : renderComplete(state);
  app.innerHTML = output;
  app.querySelectorAll<HTMLElement>('[data-keepsake]').forEach((button) => button.addEventListener('click', () => {
    game.selectKeepsake(button.dataset.keepsake!);
    render();
  }));
  app.querySelectorAll<HTMLElement>('[data-action="reveal-family"]').forEach((button) => button.addEventListener('click', () => { game.revealFamilyCondition(); render(); }));
  app.querySelectorAll<HTMLElement>('[data-inheritance]').forEach((button) => button.addEventListener('click', () => { game.chooseInheritance(button.dataset.inheritance!); render(); }));
  app.querySelectorAll<HTMLElement>('[data-action="restart"]').forEach((button) => button.addEventListener('click', () => { game.restart(); render(); window.scrollTo(0, 0); }));
  app.querySelectorAll<HTMLElement>('[data-choice]').forEach((button) => button.addEventListener('click', () => {
    game.choose(button.dataset.choice!);
    render();
  }));
  app.querySelectorAll<HTMLElement>('[data-action="continue"]').forEach((button) => button.addEventListener('click', () => {
    game.continue();
    render();
    window.scrollTo(0, 0);
  }));
  app.querySelectorAll<HTMLElement>('[data-action="reset"]').forEach((button) => button.addEventListener('click', () => {
    if (state.completedChoices > 0 && !window.confirm('放下当前卷宗，从 1978 年重新开始？')) return;
    game.reset();
    ads.startRun();
    render();
    window.scrollTo(0, 0);
  }));
}

function combinedState(): GameState & CompatibilityState {
  return { ...game.getState(), ...compatibility };
}

window.__GAME_TEST__ = {
  resetGame: () => {
    game.reset();
    ads.startRun();
    compatibility = { randomSeed: 1, inventory: 0, currency: 0, customerWaiting: false, level: 1 };
    render();
    return combinedState();
  },
  getState: combinedState,
  spawnCustomer: () => {
    compatibility.customerWaiting = true;
    compatibility.inventory = Math.max(1, compatibility.inventory);
    return combinedState();
  },
  completeOrder: () => {
    if (compatibility.customerWaiting && compatibility.inventory > 0) {
      compatibility.inventory -= 1;
      compatibility.currency += 10;
      compatibility.customerWaiting = false;
    }
    return combinedState();
  },
  grantCurrency: (amount) => {
    compatibility.currency += Math.max(0, amount);
    return combinedState();
  },
  upgradeStation: () => {
    const cost = compatibility.level * 10;
    if (compatibility.currency >= cost) {
      compatibility.currency -= cost;
      compatibility.level += 1;
    }
    return combinedState();
  },
  setRandomSeed: (seed) => {
    compatibility.randomSeed = seed;
    return combinedState();
  },
};

window.__NARRATIVE_TEST__ = {
  revealFamilyCondition: () => { const state = game.revealFamilyCondition(); render(); return state; },
  selectKeepsake: (id) => { const state = game.selectKeepsake(id); render(); return state; },
  choose: (id) => { const state = game.choose(id); render(); return state; },
  continue: () => { const state = game.continue(); render(); return state; },
  getChoices: () => game.getAvailableChoices(),
  getState: () => game.getState(),
  reset: () => { const state = game.reset(); render(); return state; },
  restart: () => { const state = game.restart(); render(); return state; },
  chooseInheritance: (id) => { const state = game.chooseInheritance(id); render(); return state; },
};

function drawArchiveCanvas(): void {
  const canvas = document.querySelector<HTMLCanvasElement>('#archive-canvas');
  if (!canvas) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
  const context = canvas.getContext('2d');
  if (!context) return;
  context.scale(ratio, ratio);
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  context.strokeStyle = 'rgba(204, 174, 104, .20)';
  context.lineWidth = 1;
  for (let y = 24; y < window.innerHeight; y += 46) {
    context.beginPath();
    context.moveTo(0, y + .5);
    context.lineTo(window.innerWidth, y + .5);
    context.stroke();
  }
  context.strokeStyle = 'rgba(204, 174, 104, .34)';
  context.beginPath();
  context.arc(window.innerWidth / 2, window.innerHeight * .32, Math.min(window.innerWidth * .42, 180), 0, Math.PI * 2);
  context.stroke();
}

window.addEventListener('resize', drawArchiveCanvas, { passive: true });
drawArchiveCanvas();
render();
