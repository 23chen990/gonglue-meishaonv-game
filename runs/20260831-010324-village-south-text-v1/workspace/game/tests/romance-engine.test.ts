import { describe, expect, it } from 'vitest';
import {
  LEGACY_SAVE_KEY,
  ROMANCE_SAVE_KEY,
  type Scene,
  type SceneProvider,
  type StorageLike,
  RomanceEngine,
} from '../src/romance-engine.js';

class MemoryStorage implements StorageLike {
  private readonly values = new Map<string, string>();

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }

  removeItem(key: string): void {
    this.values.delete(key);
  }
}

class ThrowingReadStorage implements StorageLike {
  getItem(): string | null {
    throw new Error('storage-read-denied');
  }

  setItem(): void {
    throw new Error('storage-write-denied');
  }

  removeItem(): void {
    throw new Error('storage-remove-denied');
  }
}

class QuotaStorage extends MemoryStorage {
  failWrites = true;

  override setItem(key: string, value: string): void {
    if (this.failWrites) throw new Error('QuotaExceededError');
    super.setItem(key, value);
  }
}

function makeScene(id: string, phase: 'prologue' | 'decision' | 'response' | 'ending', choices: string[], endingId?: string): Scene {
  return {
    id,
    title: phase === 'prologue' ? '周末之前' : phase === 'ending' ? '周末之后' : `场景 ${id}`,
    time: `t-${id}`,
    paragraphs: [`正文 ${id}`],
    choices: choices.map((choice) => ({ id: choice, label: `选择 ${choice}` })),
    ...(endingId ? { endingId } : {}),
  };
}

function makeProvider(options: { storyVersion?: string; throwOn?: string } = {}): SceneProvider {
  const storyVersion = options.storyVersion ?? 'romance-story-v1';
  return {
    storyVersion,
    getScene: (context, phase) => {
      const key = `${phase}:${context.choices.join(',')}:${context.previousChoices.join(',')}`;
      if (options.throwOn === key) throw new Error(`provider:${key}`);
      if (phase === 'prologue') {
        const replay = context.loop > 1 ? '回卷后的周末' : '第一次周末';
        return { ...makeScene(`prologue-${context.loop}`, phase, [], undefined), title: replay };
      }
      if (phase === 'decision') {
        const index = context.choices.length + 1;
        return makeScene(`q${index}-loop${context.loop}`, phase, [`q${index}-a`, `q${index}-b`]);
      }
      if (phase === 'response') return makeScene(`response-${context.choices.length}-loop${context.loop}`, phase, []);
      return makeScene(`ending-${context.choices.join('-')}`, phase, [], context.choices[0] === 'q1-a' ? 'ending-a' : 'ending-b');
    },
  };
}

function token(game: RomanceEngine): string {
  return game.getDecisionToken();
}

function reachEnding(game: RomanceEngine): void {
  expect(game.continue(token(game))).toBe(true);
  for (let i = 0; i < 6; i += 1) {
    expect(game.choose(`q${i + 1}-a`, token(game))).toBe(true);
    expect(game.continue(token(game))).toBe(true);
  }
  expect(game.getState().phase).toBe('ending');
}

describe('RomanceEngine transactional state and persistence contract', () => {
  it('starts at a prologue and advances through six decisions with rendered history', () => {
    const game = new RomanceEngine(new MemoryStorage(), makeProvider());
    expect(game.getState()).toMatchObject({ schemaVersion: 1, storyVersion: 'romance-story-v1', phase: 'prologue', loop: 1, choices: [], previousChoices: [], endingIds: [] });
    expect(game.getScene().id).toBe('prologue-1');
    expect(game.continue(token(game))).toBe(true);
    expect(game.getState().phase).toBe('decision');
    expect(game.getScene().id).toBe('q1-loop1');
    expect(game.choose('q1-a', token(game))).toBe(true);
    expect(game.getState().phase).toBe('response');
    expect(game.getState().history.at(-1)?.scene.id).toBe('response-1-loop1');
    expect(game.getState().history.at(-1)?.choices).toEqual(['q1-a']);
    expect(game.getState().history.at(-1)?.context).toEqual({ choices: ['q1-a'], loop: 1, previousChoices: [] });
  });

  it('rejects duplicate, stale, invalid and concurrent choices without mutation', () => {
    const game = new RomanceEngine(new MemoryStorage(), makeProvider());
    game.continue(token(game));
    const stale = token(game);
    const before = game.getState();
    expect(game.choose('wrong', stale)).toBe(false);
    expect(game.getState()).toEqual(before);
    expect(game.choose('q1-a', stale)).toBe(true);
    const after = game.getState();
    expect(game.choose('q1-b', stale)).toBe(false);
    expect(game.getState()).toEqual(after);
    expect(game.continue(stale)).toBe(false);
  });

  it('keeps provider exceptions transactional after validating the current choice', () => {
    const provider = makeProvider({ throwOn: 'response:q1-a:' });
    const storage = new MemoryStorage();
    const game = new RomanceEngine(storage, provider);
    game.continue(token(game));
    const before = game.getState();
    const raw = storage.getItem(ROMANCE_SAVE_KEY);
    expect(game.choose('q1-a', token(game))).toBe(false);
    expect(game.getState()).toEqual(before);
    expect(storage.getItem(ROMANCE_SAVE_KEY)).toBe(raw);
    expect(game.getNotice()?.code).toBe('provider-error');
  });

  it('marks only the current content-specific scene and does not increment for a no-op', () => {
    const game = new RomanceEngine(new MemoryStorage(), makeProvider());
    expect(game.isCurrentRead()).toBe(false);
    const before = game.getState().revision;
    expect(game.markRead(token(game))).toBe(true);
    expect(game.isCurrentRead()).toBe(true);
    expect(game.getState().revision).toBe(before + 1);
    const unchanged = game.getState();
    expect(game.markRead(token(game))).toBe(false);
    expect(game.getState()).toEqual(unchanged);
    expect(game.getState().readTextIds).toEqual(['romance-story-v1:prologue-1']);
  });

  it('preserves a response save across a fresh engine and awards an ending once', () => {
    const storage = new MemoryStorage();
    const game = new RomanceEngine(storage, makeProvider());
    reachEnding(game);
    const ending = game.getState();
    expect(ending.endingIds).toEqual(['ending-a']);
    const restored = new RomanceEngine(storage, makeProvider());
    expect(restored.getState()).toEqual(ending);
    expect(restored.getScene()).toEqual(game.getScene());
    expect(restored.restart(token(restored))).toBe(true);
    expect(restored.getState()).toMatchObject({ phase: 'prologue', loop: 2, previousChoices: ['q1-a', 'q2-a', 'q3-a', 'q4-a', 'q5-a', 'q6-a'] });
    reachEnding(restored);
    expect(restored.getState().endingIds).toEqual(['ending-a']);
  });

  it('does not duplicate an ending collection when the same route is replayed for three loops', () => {
    const game = new RomanceEngine(new MemoryStorage(), makeProvider());
    reachEnding(game);
    expect(game.restart(token(game))).toBe(true);
    reachEnding(game);
    expect(game.restart(token(game))).toBe(true);
    reachEnding(game);
    expect(game.getState()).toMatchObject({ loop: 3, endingIds: ['ending-a'] });
    expect(game.getState().previousChoices).toHaveLength(6);
  });

  it('restores a response without awarding an ending or replaying a reward', () => {
    const storage = new MemoryStorage();
    const game = new RomanceEngine(storage, makeProvider());
    game.continue(token(game));
    game.choose('q1-a', token(game));
    const response = game.getState();
    expect(response.phase).toBe('response');
    expect(response.endingIds).toEqual([]);
    const restored = new RomanceEngine(storage, makeProvider());
    expect(restored.getState()).toEqual(response);
    expect(restored.continue(token(restored))).toBe(true);
    expect(restored.getState().endingIds).toEqual([]);
  });

  it('resets to loop one while preserving collection and read IDs', () => {
    const game = new RomanceEngine(new MemoryStorage(), makeProvider());
    const initialToken = token(game);
    game.markRead(initialToken);
    reachEnding(game);
    const endingToken = token(game);
    const beforeRevision = game.getState().revision;
    expect(game.reset(endingToken)).toBe(true);
    expect(game.getState()).toMatchObject({ phase: 'prologue', loop: 1, choices: [], previousChoices: [], endingIds: ['ending-a'], readTextIds: ['romance-story-v1:prologue-1'] });
    expect(game.getState().revision).toBeGreaterThan(beforeRevision);
  });

  it('restores an exact earlier decision snapshot and discards future branch state', () => {
    const game = new RomanceEngine(new MemoryStorage(), makeProvider());
    game.continue(token(game));
    game.choose('q1-a', token(game));
    game.continue(token(game));
    game.choose('q2-b', token(game));
    const beforeRestore = game.getState();
    const checkpointIndex = beforeRestore.history.findIndex((snapshot) => snapshot.phase === 'decision' && snapshot.scene.id === 'q1-loop1');
    expect(checkpointIndex).toBeGreaterThanOrEqual(0);
    expect(game.restoreCheckpoint(checkpointIndex, token(game))).toBe(true);
    const restored = game.getState();
    expect(restored.phase).toBe('decision');
    expect(restored.choices).toEqual([]);
    expect(restored.history).toHaveLength(checkpointIndex + 1);
    expect(restored.history.at(-1)?.scene.id).toBe('q1-loop1');
    expect(restored.choices).not.toContain('q2-b');
  });

  it('preserves read state collected after a checkpoint when restoring the branch', () => {
    const game = new RomanceEngine(new MemoryStorage(), makeProvider());
    expect(game.markRead(token(game))).toBe(true);
    expect(game.continue(token(game))).toBe(true);
    const decisionIndex = game.getState().history.findIndex((snapshot) => snapshot.phase === 'decision');
    expect(decisionIndex).toBe(1);
    expect(game.markRead(token(game))).toBe(true);
    expect(game.choose('q1-a', token(game))).toBe(true);
    expect(game.markRead(token(game))).toBe(true);
    expect(game.continue(token(game))).toBe(true);
    expect(game.markRead(token(game))).toBe(true);
    const collectedReads = game.getState().readTextIds;

    expect(game.restoreCheckpoint(decisionIndex, token(game))).toBe(true);
    expect(game.getState().readTextIds).toEqual(collectedReads);
    expect(game.getState().history.at(-1)?.readTextIds).toEqual(collectedReads);
    expect(game.isCurrentRead()).toBe(true);
  });

  it('rejects a saved ending whose collection omits the rendered ending', () => {
    const storage = new MemoryStorage();
    const source = new RomanceEngine(storage, makeProvider());
    reachEnding(source);
    const forged = { ...source.getState(), endingIds: [] };
    storage.setItem(ROMANCE_SAVE_KEY, JSON.stringify(forged));

    const rejected = new RomanceEngine(storage, makeProvider());
    expect(rejected.getNotice()?.code).toBe('save-corrupt');
    expect(rejected.getState().phase).toBe('prologue');
    expect(storage.getItem(ROMANCE_SAVE_KEY)).toBe(JSON.stringify(forged));
  });

  it('rejects saved previous choices that are not a legal completed route', () => {
    const storage = new MemoryStorage();
    const source = new RomanceEngine(storage, makeProvider());
    reachEnding(source);
    expect(source.restart(token(source))).toBe(true);
    const valid = source.getState();
    const forgedChoices = ['forged-1', 'forged-2', 'forged-3', 'forged-4', 'forged-5', 'forged-6'];
    const forgedHistory = valid.history.map((snapshot) => ({
      ...snapshot,
      previousChoices: [...forgedChoices],
      context: { ...snapshot.context, previousChoices: [...forgedChoices] },
    }));
    const forged = { ...valid, previousChoices: forgedChoices, history: forgedHistory };
    storage.setItem(ROMANCE_SAVE_KEY, JSON.stringify(forged));

    const rejected = new RomanceEngine(storage, makeProvider());
    expect(rejected.getNotice()?.code).toBe('save-corrupt');
    expect(storage.getItem(ROMANCE_SAVE_KEY)).toBe(JSON.stringify(forged));
  });

  it('requires explicit opt-in for a memory-only session and never writes the save', () => {
    const storage = new ThrowingReadStorage();
    const game = new RomanceEngine(storage, makeProvider());
    expect(game.startTemporarySession(token(game))).toBe(true);
    expect(game.getNotice()).toMatchObject({ code: 'session-only' });

    reachEnding(game);
    expect(game.restart(token(game))).toBe(true);
    expect(game.getState().loop).toBe(2);
    expect(game.getNotice()).toMatchObject({ code: 'session-only' });
  });

  it('keeps an existing valid save unchanged during an explicit temporary session', () => {
    const storage = new MemoryStorage();
    const source = new RomanceEngine(storage, makeProvider());
    expect(source.getState().phase).toBe('prologue');
    const originalRaw = storage.getItem(ROMANCE_SAVE_KEY);
    const game = new RomanceEngine(storage, makeProvider());
    expect(game.startTemporarySession(token(game))).toBe(true);
    expect(game.continue(token(game))).toBe(true);
    expect(storage.getItem(ROMANCE_SAVE_KEY)).toBe(originalRaw);
  });

  it('blocks a defective provider without persisting a fake prologue', () => {
    const storage = new MemoryStorage();
    const brokenProvider: SceneProvider = {
      storyVersion: 'broken-story-v1',
      getScene: () => {
        throw new Error('broken-content');
      },
    };
    const game = new RomanceEngine(storage, brokenProvider);
    expect(game.getNotice()?.code).toBe('provider-error');
    expect(storage.getItem(ROMANCE_SAVE_KEY)).toBeNull();
    expect(game.continue(token(game))).toBe(false);
    expect(storage.getItem(ROMANCE_SAVE_KEY)).toBeNull();
  });

  it('preserves corrupt and unsupported saves byte-for-byte until explicit reset', () => {
    const storage = new MemoryStorage();
    const raw = JSON.stringify({ schemaVersion: 999, storyVersion: 'future', phase: 'ending', choices: ['future'] });
    storage.setItem(ROMANCE_SAVE_KEY, raw);
    const game = new RomanceEngine(storage, makeProvider());
    expect(game.getNotice()?.code).toBe('save-incompatible');
    expect(storage.getItem(ROMANCE_SAVE_KEY)).toBe(raw);
    expect(game.continue(token(game))).toBe(false);
    expect(storage.getItem(ROMANCE_SAVE_KEY)).toBe(raw);
    expect(game.reset(token(game))).toBe(true);
    expect(storage.getItem(ROMANCE_SAVE_KEY)).not.toBe(raw);
    expect(storage.getItem(`${ROMANCE_SAVE_KEY}:recovery`)).toBe(raw);
  });

  it('rejects malformed nested arrays and does not trust read IDs from another story version', () => {
    const storage = new MemoryStorage();
    const source = new RomanceEngine(storage, makeProvider());
    source.markRead(token(source));
    const validWithRead = source.getState();
    const malformed = { ...validWithRead, choices: [42] };
    const malformedRaw = JSON.stringify(malformed);
    storage.setItem(ROMANCE_SAVE_KEY, malformedRaw);
    const rejected = new RomanceEngine(storage, makeProvider());
    expect(rejected.getNotice()?.code).toBe('save-corrupt');
    expect(storage.getItem(ROMANCE_SAVE_KEY)).toBe(malformedRaw);

    storage.setItem(ROMANCE_SAVE_KEY, JSON.stringify(validWithRead));
    const changedVersion = new RomanceEngine(storage, makeProvider({ storyVersion: 'romance-story-v2' }));
    expect(changedVersion.getNotice()?.code).toBe('save-incompatible');
    expect(changedVersion.isCurrentRead()).toBe(false);
    expect(storage.getItem(ROMANCE_SAVE_KEY)).toEqual(JSON.stringify(validWithRead));
  });

  it('reports getter and quota failures without changing the last valid raw save', () => {
    const readDenied = new RomanceEngine(new ThrowingReadStorage(), makeProvider());
    expect(readDenied.getNotice()?.code).toBe('storage-read-failed');
    expect(readDenied.continue(token(readDenied))).toBe(false);

    const storage = new QuotaStorage();
    const game = new RomanceEngine(storage, makeProvider());
    expect(game.getNotice()?.code).toBe('storage-write-failed');
    const before = game.getState();
    expect(game.continue(token(game))).toBe(false);
    expect(game.getState()).toEqual(before);
    expect(storage.getItem(ROMANCE_SAVE_KEY)).toBeNull();
    storage.failWrites = false;
    expect(game.retrySave()).toBe(true);
  });

  it('keeps a legacy rural save read-only and uses an independent romance key', () => {
    const storage = new MemoryStorage();
    const legacy = JSON.stringify({ version: 3, screen: 'event', stats: { skill: 9 } });
    storage.setItem(LEGACY_SAVE_KEY, legacy);
    const game = new RomanceEngine(storage, makeProvider());
    expect(game.getNotice()?.code).toBe('legacy-save-preserved');
    expect(storage.getItem(LEGACY_SAVE_KEY)).toBe(legacy);
    expect(storage.getItem(ROMANCE_SAVE_KEY)).toBeTruthy();
    expect(game.getState().storyVersion).toBe('romance-story-v1');
  });

  it('detects sequential stale-tab conflicts before overwriting newer progress', () => {
    const storage = new MemoryStorage();
    const first = new RomanceEngine(storage, makeProvider());
    const second = new RomanceEngine(storage, makeProvider());
    expect(first.continue(token(first))).toBe(true);
    const secondBefore = second.getState();
    expect(second.continue(token(second))).toBe(false);
    expect(second.getState()).toEqual(secondBefore);
    expect(second.getNotice()?.code).toBe('save-conflict');
    expect(second.reloadLatest()).toBe(true);
    expect(second.getState()).toEqual(first.getState());
  });

  it('rejects two conflicting choices from stale instances without applying either stale branch', () => {
    const storage = new MemoryStorage();
    const first = new RomanceEngine(storage, makeProvider());
    const second = new RomanceEngine(storage, makeProvider());
    expect(first.continue(token(first))).toBe(true);
    expect(second.reloadLatest()).toBe(true);
    expect(second.getState().phase).toBe('decision');
    expect(first.choose('q1-a', token(first))).toBe(true);
    const firstState = first.getState();
    expect(second.choose('q1-b', token(second))).toBe(false);
    expect(second.getState().choices).toEqual([]);
    expect(second.getState().phase).toBe('decision');
    expect(new RomanceEngine(storage, makeProvider()).getState()).toEqual(firstState);
  });
});
