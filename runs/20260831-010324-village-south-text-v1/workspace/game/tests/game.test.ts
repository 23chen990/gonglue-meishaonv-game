import { describe, expect, it } from 'vitest';
import { AdService } from '../src/ad-service.js';
import { GameEngine, createMemoryStorage, SAVE_VERSION } from '../src/game.js';
import { CHAPTER_EVENTS, FAMILY_CONDITIONS, KEEPSAKES } from '../src/chapter-data.js';

function begin(game: GameEngine, keepsake = 'keepsake_book') {
  game.revealFamilyCondition();
  game.selectKeepsake(keepsake);
}

function finish(game: GameEngine, choices: string[]) {
  begin(game);
  for (const id of choices) { game.choose(id === 'dynamic' ? game.getAvailableChoices()[0].id : id); game.continue(); }
}

describe('村口向南第一章 v3', () => {
  it('早期路线选择会改写后续事件，而不是只改结算数值', () => {
    const game = new GameEngine(createMemoryStorage(), { runNumber: 1, seed: 1 });
    begin(game);
    expect(game.getCurrentEvent().id).toBe('event_01');
    game.choose('event_01_choice_a'); game.continue();
    expect(game.getCurrentEvent().id).toBe('event_02_alt_riverland');
    game.choose(game.getAvailableChoices()[0].id); game.continue();
    expect(game.getCurrentEvent().id).toBe('event_03_alt_thresher');
  });

  it('延迟回响会解锁可执行的路线资源并在下一次选择卡上显示', () => {
    const game = new GameEngine(createMemoryStorage(), { runNumber: 1, seed: 1 });
    begin(game);
    game.choose('event_01_choice_a'); game.continue();
    game.choose(game.getAvailableChoices()[0].id); game.continue();
    game.choose(game.getAvailableChoices()[0].id);
    expect(game.getState().flags).toContain('event_01_choice_a_echoed');
    game.continue();
    const choices = game.getAvailableChoices();
    expect(choices.some((choice) => choice.available && choice.qualificationFlags.includes('echo_resource'))).toBe(true);
  });

  it('三条路线分别导向不同的事件结构与章末判词资格', () => {
    const run = (first: string, second: string) => {
      const game = new GameEngine(createMemoryStorage(), { seed: 1 }); begin(game);
      const ids = [game.getCurrentEvent().id];
      game.choose(first); game.continue(); ids.push(game.getCurrentEvent().id);
      const secondChoice = game.getAvailableChoices().find((choice) => choice.id === second && choice.available)
        ?? game.getAvailableChoices().find((choice) => choice.available)!;
      game.choose(secondChoice.id); game.continue(); ids.push(game.getCurrentEvent().id);
      return ids;
    };
    const study = run('event_01_choice_a', 'event_02_alt_choice_a');
    const contract = run('event_01_choice_b', 'event_02_choice_a');
    const mutual = run('event_01_choice_b', 'event_02_choice_b');
    expect(study).toEqual(['event_01', 'event_02_alt_riverland', 'event_03_alt_thresher']);
    expect(contract).toEqual(['event_01', 'event_02', 'event_03_alt_thresher']);
    expect(mutual).toEqual(['event_01', 'event_02', 'event_03']);
  });
  it('揭示家况后选择纪念物，并应用两层开局效果', () => {
    const game = new GameEngine(createMemoryStorage(), { seed: 17 });
    expect(game.getState().screen).toBe('family-condition');
    expect(game.getState().eventIds).toHaveLength(6);
    game.revealFamilyCondition();
    expect(game.getState().screen).toBe('keepsake');
    game.selectKeepsake('keepsake_book');
    expect(game.getState()).toMatchObject({ screen: 'event', eventIndex: 0, selectedKeepsake: 'keepsake_book' });
  });

  it('六张家况签、三件纪念物，六个槽位各有两个原创事件变体', () => {
    expect(FAMILY_CONDITIONS).toHaveLength(6);
    expect(KEEPSAKES).toHaveLength(3);
    expect(CHAPTER_EVENTS).toHaveLength(12);
    expect(new Set(CHAPTER_EVENTS.map((event) => event.slot))).toEqual(new Set([1, 2, 3, 4, 5, 6]));
    expect(CHAPTER_EVENTS.every((event) => event.choices.length === 2)).toBe(true);
  });

  it('第二局前两次看到的事件至少换一次，并且继承只应用一次', () => {
    const first = new GameEngine(createMemoryStorage(), { runNumber: 1, seed: 2 });
    const second = new GameEngine(createMemoryStorage(), { runNumber: 2, seed: 2 });
    begin(first); begin(second);
    const firstIds: string[] = []; const secondIds: string[] = [];
    for (let i = 0; i < 2; i += 1) {
      firstIds.push(first.getCurrentEvent().id); secondIds.push(second.getCurrentEvent().id);
      first.choose(first.getAvailableChoices()[0].id); second.choose(second.getAvailableChoices()[0].id);
      first.continue(); second.continue();
    }
    expect(firstIds.some((id, index) => id !== secondIds[index])).toBe(true);
  });

  it('选择卡同时暴露即时效果和两次选择后的回响，回响只结算一次', () => {
    const game = new GameEngine(createMemoryStorage()); begin(game);
    const option = game.getAvailableChoices()[0];
    expect(option.immediateEffects).toBeTruthy();
    expect(option.delayedAfterEvents).toBe(2);
    expect(option.delayedEffects).toBeTruthy();
    game.choose(option.id); game.continue();
    game.choose(game.getAvailableChoices()[0].id); game.continue();
    const afterEcho = game.choose(game.getAvailableChoices()[0].id);
    expect(afterEcho.recentEchoes.length).toBeGreaterThan(0);
    const value = afterEcho.stats.skill; game.continue();
    expect(game.getState().stats.skill).toBe(value);
  });

  it('学费条件会锁住一条路，但保留另一条可选路', () => {
    const game = new GameEngine(createMemoryStorage()); begin(game);
    for (let i = 0; i < 4; i += 1) { game.choose(game.getAvailableChoices()[0].id); game.continue(); }
    const options = game.getAvailableChoices();
    expect(options).toHaveLength(2);
    expect(options.some((choice) => !choice.available && choice.reason)).toBe(true);
    expect(options.some((choice) => choice.available)).toBe(true);
  });

  it('六事件后生成判词和两项经验，确认后进入下一局且属性获得一项+1', () => {
    const storage = createMemoryStorage();
    const game = new GameEngine(storage, { seed: 4 });
    finish(game, Array.from({ length: 6 }, () => 'dynamic'));
    expect(game.getState()).toMatchObject({ screen: 'chapter-complete', completedChoices: 6 });
    expect(game.getVerdicts()).toHaveLength(6); expect(game.getInheritanceChoices()).toHaveLength(2);
    const picked = game.getInheritanceChoices()[0]; const complete = game.chooseInheritance(picked.id);
    expect(complete.screen).toBe('chapter-complete');
    const next = game.restart();
    expect(next).toMatchObject({ screen: 'family-condition', runNumber: 2, inheritance: picked.id });
    expect(Object.values(next.stats).some((value) => value > 0)).toBe(true);
    expect(game.restart().runNumber).toBe(2);
  });

  it('v2 进行中存档迁移，损坏和未来版本 fail-closed 到结构完整的新状态', () => {
    const storage = createMemoryStorage();
    storage.setItem('village-south-save', JSON.stringify({ version: 2, screen: 'result', selectedKeepsake: 'keepsake_book', eventIndex: 2, stats: { economy: 8, skill: 9, health: 11, bonds: 14 }, flags: ['x'], pendingEchoes: [], recentEchoes: ['echo'], lastResult: '旧结果', lastEffects: { skill: 1 }, completedChoices: 2, history: [] }));
    expect(new GameEngine(storage).getState()).toMatchObject({ version: SAVE_VERSION, eventIndex: 2, flags: ['x'], recentEchoes: ['echo'] });
    storage.setItem('village-south-save', JSON.stringify({ version: 99, stats: null }));
    expect(new GameEngine(storage).getState()).toMatchObject({ version: SAVE_VERSION, screen: 'family-condition', completedChoices: 0 });
    storage.setItem('village-south-save', JSON.stringify({ version: 3, screen: 'event', stats: {}, eventIds: ['unknown'] }));
    expect(new GameEngine(storage).getState()).toMatchObject({ version: SAVE_VERSION, screen: 'family-condition', completedChoices: 0 });
  });
});

describe('IAA 浏览器 mock', () => {
  it('首轮不打断过程，结局位受 6 分钟和 2/3 次上限约束', async () => {
    let now = 1_000_000; const ads = new AdService({ now: () => now });
    expect(ads.canShow('chapter_clue', { firstRun: true })).toBe(false); expect(ads.canShow('ending', { firstRun: true })).toBe(true);
    await ads.showRewarded('ending', { firstRun: true }); now += 6 * 60_000; await ads.showRewarded('ending', { firstRun: true }); now += 6 * 60_000;
    expect(ads.canShow('ending', { firstRun: true })).toBe(false); ads.startRun(); await ads.showRewarded('chapter_clue', { firstRun: false });
    expect(ads.getSnapshot().sessionImpressions).toBe(3);
  });
});
