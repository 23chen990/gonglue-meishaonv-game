import { describe, expect, it } from 'vitest';
import { RomanceEngine, ROMANCE_SAVE_KEY, ROMANCE_RECOVERY_KEY, LEGACY_SAVE_KEY, type StorageLike } from '../src/romance-engine.js';
import { STORY_VERSION, ROMANCE_STORY, getRomanceScene, evaluateRomance } from '../src/romance-content.js';
import { enumerateStoryPaths } from '../../../planning/2026-10-01-life-redesign/story-validation.js';

class Store implements StorageLike {
  values = new Map<string, string>();
  writes = 0;
  rejectWrites = false;
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) {
    if (this.rejectWrites) throw new Error('quota');
    this.writes += 1;
    this.values.set(key, value);
  }
  removeItem(key: string) { this.values.delete(key); }
}
const provider = { storyVersion: STORY_VERSION, getScene: getRomanceScene };
const paths = enumerateStoryPaths(ROMANCE_STORY);
const make = (store: Store) => new RomanceEngine(store, provider);
const token = (game: RomanceEngine) => game.getDecisionToken();
function step(game: RomanceEngine, choices: string[]) {
  const state = game.getState();
  game.markRead(token(game));
  return state.phase === 'decision'
    ? game.choose(choices[state.choices.length], token(game))
    : game.continue(token(game));
}
function finish(game: RomanceEngine, choices: string[]) {
  for (let n = 0; game.getState().phase !== 'ending' && n < 14; n++) expect(step(game, choices)).toBe(true);
  expect(game.getState().phase).toBe('ending');
}

describe('actual romance engine with released source provider', () => {
  it('restores every before/after decision and ending across all 208 legal paths', () => {
    expect(paths).toHaveLength(208);
    for (const path of paths) {
      const store = new Store();
      let game = make(store);
      for (let n = 0; n < 14; n++) {
        const before = game.getState(), scene = game.getScene();
        const restored = make(store);
        expect(restored.getNotice()).toBeNull();
        expect(restored.getState()).toEqual(before);
        expect(restored.getScene()).toEqual(scene);
        game = restored;
        if (before.phase === 'ending') break;
        expect(step(game, path.choices)).toBe(true);
      }
      expect(game.getState().phase).toBe('ending');
      expect(game.getScene().endingId).toBe(path.endingId);
      expect(game.getState().endingIds).toEqual([path.endingId]);
      const raw = store.getItem(ROMANCE_SAVE_KEY);
      const ending = make(store);
      expect(ending.getState()).toEqual(game.getState());
      expect(ending.continue(token(ending))).toBe(false);
      expect(store.getItem(ROMANCE_SAVE_KEY)).toBe(raw);
    }
  }, 30_000);

  it('restores an earlier real decision with no future portrait, private disclosure or relationship leakage', () => {
    const store = new Store(), game = make(store);
    finish(game, ['q1-z', 'q2-later', 'q3-w', 'q4-all', 'q5-w', 'q6-commit']);
    const collected = game.getState();
    const index = collected.history.findIndex(s => s.phase === 'decision' && s.choices.length === 2);
    expect(game.restoreCheckpoint(index, token(game))).toBe(true);
    const after = make(store);
    expect(after.getState().choices).toEqual(['q1-z', 'q2-later']);
    expect(after.getState().readTextIds).toEqual(collected.readTextIds);
    expect(after.getState().endingIds).toEqual(['wenxi']);
    finish(after, ['q1-z', 'q2-later', 'q3-z', 'q4-private', 'q5-w', 'q6-commit']);
    expect(after.getScene().endingId).toBe('open');
    expect(after.getScene().paragraphs.join('\n')).not.toContain('那张画');
    expect(after.getState().history.find(s => s.phase === 'response' && s.choices.length === 3)?.scene.paragraphs.join('\n')).toContain('椅子空了二十分钟');
    expect(after.getState().endingIds).toEqual(['wenxi', 'open']);
  });

  it('uses only the most recent completed loop through loop three for every authored memory source', () => {
    const witnesses = new Map<string, typeof paths[number]>();
    for (const path of paths) for (const id of Object.values(path.memoryIds)) if (!witnesses.has(id)) witnesses.set(id, path);
    expect(witnesses.size).toBe(14);
    const previous = [...witnesses.values()];
    for (let i = 0; i < previous.length; i++) {
      const store = new Store(), first = previous[i], second = previous[(i + 1) % previous.length];
      const game = make(store);
      finish(game, first.choices);
      expect(game.restart(token(game))).toBe(true);
      finish(game, second.choices);
      expect(game.restart(token(game))).toBe(true);
      const restored = make(store);
      expect(restored.getState().loop).toBe(3);
      expect(restored.getState().previousChoices).toEqual(second.choices);
      const memory = evaluateRomance(second.choices).memoryIds;
      const textFor = (id: string) => ROMANCE_STORY.memoryTemplates.find(m => m.id === id)!.text;
      expect(restored.getScene().paragraphs.join('\n')).toContain(textFor(memory.zhixia));
      expect(step(restored, first.choices)).toBe(true);
      expect(step(restored, first.choices)).toBe(true);
      expect(step(restored, first.choices)).toBe(true);
      expect(restored.getState().phase).toBe('decision');
      expect(restored.getScene().paragraphs.join('\n')).toContain(textFor(memory.wenxi));
    }
  });

  it('keeps actual q5 yes, pending and unasked answers distinct without promoting partial shared consent', () => {
    const observed = new Set<string>();
    for (const path of paths) {
      const game = make(new Store());
      while (game.getState().choices.length < 5) expect(step(game, path.choices)).toBe(true);
      const response = game.getScene().paragraphs.join('\n');
      for (const character of ['zhixia', 'wenxi'] as const) {
        observed.add(path.responseIds[character]);
        const answer = ROMANCE_STORY.characterAnswers.find(a => a.characterId === character)!;
        if (path.responseIds[character] === answer.yesResponseId) expect(response).toContain(answer.yesText);
        if (path.responseIds[character] === answer.pendingResponseId) {
          expect(response).toContain(answer.pendingText);
          expect(response).not.toContain(answer.yesText);
        }
      }
      finish(game, path.choices);
      if (path.choices[4] === 'q5-both' && path.choices[5] === 'q6-commit' && path.consent.zhixia !== path.consent.wenxi) expect(game.getScene().endingId).toBe('open');
    }
    expect(observed.size).toBe(6);
  }, 30_000);

  it('preserves actual legacy/corrupt/versioned saves and writes no temporary progress', () => {
    for (const raw of ['{broken', JSON.stringify({schemaVersion: 999}), JSON.stringify({...make(new Store()).getState(), storyVersion: 'romance-0'})]) {
      const store = new Store();
      store.setItem(ROMANCE_SAVE_KEY, raw);
      store.setItem(LEGACY_SAVE_KEY, 'legacy-byte-for-byte');
      const game = make(store);
      expect(game.continue(token(game))).toBe(false);
      expect(store.getItem(ROMANCE_SAVE_KEY)).toBe(raw);
      expect(game.startTemporarySession(token(game))).toBe(true);
      const writes = store.writes;
      finish(game, paths.find(p => p.endingId === 'together')!.choices);
      expect(game.restart(token(game))).toBe(true);
      expect(store.writes).toBe(writes);
      expect(store.getItem(ROMANCE_SAVE_KEY)).toBe(raw);
      expect(store.getItem(LEGACY_SAVE_KEY)).toBe('legacy-byte-for-byte');
      const recovered = make(store);
      expect(recovered.reset(token(recovered))).toBe(true);
      expect(store.getItem(ROMANCE_RECOVERY_KEY)).toBe(raw);
      expect(make(store).getNotice()).toBeNull();
    }
  });

  it('rejects real stale-session writes and quota failures without replacing valid saved progress', () => {
    const store = new Store(), a = make(store), b = make(store);
    expect(a.continue(token(a))).toBe(true);
    expect(b.reloadLatest()).toBe(true);
    expect(a.choose('q1-z', token(a))).toBe(true);
    const raw = store.getItem(ROMANCE_SAVE_KEY), before = b.getState();
    expect(b.choose('q1-w', token(b))).toBe(false);
    expect(b.getState()).toEqual(before);
    expect(b.getNotice()?.code).toBe('save-conflict');
    expect(store.getItem(ROMANCE_SAVE_KEY)).toBe(raw);
    expect(b.reloadLatest()).toBe(true);
    store.rejectWrites = true;
    const savedState = b.getState();
    expect(b.continue(token(b))).toBe(false);
    expect(b.getState()).toEqual(savedState);
    expect(store.getItem(ROMANCE_SAVE_KEY)).toBe(raw);
    expect(b.getNotice()?.code).toBe('storage-write-failed');
  });
});
