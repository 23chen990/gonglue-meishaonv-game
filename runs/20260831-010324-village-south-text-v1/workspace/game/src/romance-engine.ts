export const ROMANCE_SAVE_KEY = '20260831-010324-village-south-text-v1:romance:v1';
export const ROMANCE_RECOVERY_KEY = `${ROMANCE_SAVE_KEY}:recovery`;
export const LEGACY_SAVE_KEY = 'village-south-save';
export const SAVE_KEY = ROMANCE_SAVE_KEY;
export const ROMANCE_SCHEMA_VERSION = 1 as const;

export type Phase = 'prologue' | 'decision' | 'response' | 'ending';

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface StoryContext {
  choices: string[];
  loop: number;
  previousChoices: string[];
}

export interface SceneChoice {
  id: string;
  label: string;
}

export interface Scene {
  id: string;
  title: string;
  time: string;
  paragraphs: string[];
  choices: SceneChoice[];
  endingId?: string;
}

export interface SceneProvider {
  storyVersion: string;
  getScene(context: StoryContext, phase: Phase): Scene;
}

export interface SceneSnapshot {
  storyVersion: string;
  phase: Phase;
  context: StoryContext;
  loop: number;
  choices: string[];
  previousChoices: string[];
  readTextIds: string[];
  scene: Scene;
}

export interface RomanceState {
  schemaVersion: typeof ROMANCE_SCHEMA_VERSION;
  storyVersion: string;
  revision: number;
  runId: string;
  phase: Phase;
  choices: string[];
  loop: number;
  previousChoices: string[];
  history: SceneSnapshot[];
  readTextIds: string[];
  endingIds: string[];
  settings: Record<string, unknown>;
}

export type State = RomanceState;

export interface SaveNotice {
  code: string;
  message: string;
}

type ValidationResult = { state: RomanceState } | { reason: string; incompatible?: boolean };

let runCounter = 0;

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
const same = (left: unknown, right: unknown): boolean => JSON.stringify(left) === JSON.stringify(right);
const isRecord = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const isText = (value: unknown): value is string => typeof value === 'string' && value.length > 0;
const isPhase = (value: unknown): value is Phase => value === 'prologue' || value === 'decision' || value === 'response' || value === 'ending';
const isInt = (value: unknown, min = 0): value is number => typeof value === 'number' && Number.isInteger(value) && value >= min;
const unique = (values: string[]): boolean => new Set(values).size === values.length;
const contextOf = (state: Pick<RomanceState, 'choices' | 'loop' | 'previousChoices'>): StoryContext => ({
  choices: [...state.choices],
  loop: state.loop,
  previousChoices: [...state.previousChoices],
});

function validateScene(value: unknown): value is Scene {
  if (!isRecord(value) || !isText(value.id) || !isText(value.title) || !isText(value.time)) return false;
  if (!Array.isArray(value.paragraphs) || value.paragraphs.length === 0 || !value.paragraphs.every(isText)) return false;
  if (!Array.isArray(value.choices) || !value.choices.every((choice) => isRecord(choice) && isText(choice.id) && isText(choice.label))) return false;
  if (!unique(value.choices.map((choice) => (choice as SceneChoice).id))) return false;
  return value.endingId === undefined || isText(value.endingId);
}

function unavailableScene(): Scene {
  return {
    id: 'content-unavailable',
    title: '剧情暂时无法读取',
    time: '—',
    paragraphs: ['请重新加载页面。当前进度不会因这次读取失败而被替换。'],
    choices: [],
  };
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export class RomanceEngine {
  private state: RomanceState;
  private loadedRaw: string | null = null;
  private pendingState: RomanceState | null = null;
  private recoveryRaw: string | null = null;
  private overwriteBlocked = false;
  private sessionOnly = false;
  private providerBlocked = false;
  private notice: SaveNotice | null = null;

  constructor(private readonly storage: StorageLike | undefined, private readonly provider: SceneProvider) {
    if (!isText(provider.storyVersion)) throw new Error('SceneProvider.storyVersion must be non-empty.');
    this.state = this.makeFreshState(1, [], [], 0);
    if (!this.providerBlocked) this.loadInitial();
  }

  getState(): RomanceState {
    return clone(this.state);
  }

  getScene(): Scene {
    const snapshot = this.state.history[this.state.history.length - 1];
    return clone(snapshot.scene);
  }

  getDecisionToken(): string {
    return [this.state.revision, this.state.runId, this.getScene().id, this.state.phase].join('|');
  }

  choose(id: string, expectedToken: string): boolean {
    if (!this.acceptToken(expectedToken) || this.state.phase !== 'decision') return false;
    const current = this.getScene();
    if (!current.choices.some((choice) => choice.id === id)) {
      this.setNotice('invalid-event', '这个选择不属于当前场景。');
      return false;
    }
    const choices = [...this.state.choices, id];
    const response = this.deriveScene(contextOf({ ...this.state, choices }), 'response');
    if (!response) return false;
    const next: RomanceState = {
      ...this.state,
      revision: this.state.revision + 1,
      phase: 'response',
      choices,
      history: [...this.state.history, this.snapshot(response, 'response', choices, this.state.previousChoices, this.state.readTextIds)],
    };
    return this.commit(next);
  }

  continue(expectedToken: string): boolean {
    if (!this.acceptToken(expectedToken)) return false;
    if (this.state.phase === 'prologue') {
      const decision = this.deriveScene(contextOf(this.state), 'decision');
      if (!decision) return false;
      const next: RomanceState = {
        ...this.state,
        revision: this.state.revision + 1,
        phase: 'decision',
        history: [...this.state.history, this.snapshot(decision, 'decision', this.state.choices, this.state.previousChoices, this.state.readTextIds)],
      };
      return this.commit(next);
    }
    if (this.state.phase !== 'response') return false;
    const phase: Phase = this.state.choices.length === 6 ? 'ending' : 'decision';
    const scene = this.deriveScene(contextOf(this.state), phase);
    if (!scene || (phase === 'ending' && !scene.endingId)) return false;
    const endingIds = phase === 'ending' && scene.endingId && !this.state.endingIds.includes(scene.endingId)
      ? [...this.state.endingIds, scene.endingId]
      : [...this.state.endingIds];
    const next: RomanceState = {
      ...this.state,
      revision: this.state.revision + 1,
      phase,
      endingIds,
      history: [...this.state.history, this.snapshot(scene, phase, this.state.choices, this.state.previousChoices, this.state.readTextIds)],
    };
    return this.commit(next);
  }

  restart(expectedToken: string): boolean {
    if (!this.acceptToken(expectedToken) || this.state.phase !== 'ending' || this.state.choices.length !== 6) return false;
    const previousChoices = [...this.state.choices];
    const loop = this.state.loop + 1;
    const scene = this.deriveScene({ choices: [], loop, previousChoices }, 'prologue');
    if (!scene) return false;
    const next: RomanceState = {
      ...this.state,
      revision: this.state.revision + 1,
      runId: this.newRunId(loop),
      phase: 'prologue',
      choices: [],
      loop,
      previousChoices,
      history: [this.snapshot(scene, 'prologue', [], previousChoices, this.state.readTextIds, loop)],
    };
    return this.commit(next);
  }

  reset(expectedToken: string): boolean {
    if (!this.acceptToken(expectedToken)) return false;
    const scene = this.deriveScene({ choices: [], loop: 1, previousChoices: [] }, 'prologue');
    if (!scene) return false;
    const next: RomanceState = {
      ...this.state,
      revision: this.state.revision + 1,
      runId: this.newRunId(1),
      phase: 'prologue',
      choices: [],
      loop: 1,
      previousChoices: [],
      history: [this.snapshot(scene, 'prologue', [], [], this.state.readTextIds, 1)],
    };
    return this.commit(next, true);
  }

  restoreCheckpoint(historyIndex: number, expectedToken: string): boolean {
    if (!this.acceptToken(expectedToken) || !Number.isInteger(historyIndex) || historyIndex < 0 || historyIndex >= this.state.history.length) return false;
    const checkpoint = this.state.history[historyIndex];
    if (!checkpoint || (checkpoint.phase !== 'prologue' && checkpoint.phase !== 'decision')) return false;
    const context = { choices: [...checkpoint.choices], loop: checkpoint.loop, previousChoices: [...checkpoint.previousChoices] };
    const scene = this.deriveScene(context, checkpoint.phase);
    if (!scene || !same(scene, checkpoint.scene)) return false;
    const history = clone(this.state.history.slice(0, historyIndex + 1));
    history[history.length - 1].readTextIds = [...this.state.readTextIds];
    const next: RomanceState = {
      ...this.state,
      revision: this.state.revision + 1,
      runId: this.newRunId(checkpoint.loop),
      phase: checkpoint.phase,
      loop: checkpoint.loop,
      choices: [...checkpoint.choices],
      previousChoices: [...checkpoint.previousChoices],
      readTextIds: [...this.state.readTextIds],
      history,
    };
    return this.commit(next);
  }

  isCurrentRead(): boolean {
    return this.state.readTextIds.includes(this.readKey(this.getScene()));
  }

  markRead(expectedToken: string): boolean {
    if (!this.acceptToken(expectedToken)) return false;
    const key = this.readKey(this.getScene());
    if (this.state.readTextIds.includes(key)) return false;
    const readTextIds = [...this.state.readTextIds, key];
    const history = clone(this.state.history);
    history[history.length - 1] = { ...history[history.length - 1], readTextIds: [...readTextIds] };
    return this.commit({ ...this.state, revision: this.state.revision + 1, readTextIds, history });
  }

  getNotice(): SaveNotice | null {
    return this.notice ? { ...this.notice } : null;
  }

  startTemporarySession(expectedToken: string): boolean {
    if (!this.acceptToken(expectedToken)) return false;
    this.pendingState = null;
    this.sessionOnly = true;
    this.setNotice('session-only', '仅本次游玩：新进度不会保存，关闭窗口后会丢失。已有存档保留。');
    return true;
  }

  retrySave(): boolean {
    if (this.sessionOnly || this.providerBlocked || !this.pendingState) return false;
    const pending = this.pendingState;
    if (!this.writeState(pending, false)) return false;
    this.state = clone(pending);
    this.pendingState = null;
    this.clearTransientNotice();
    return true;
  }

  reloadLatest(): boolean {
    if (!this.storage) {
      this.setNotice('storage-unavailable', '当前环境没有可用的存档存储。');
      return false;
    }
    let raw: string | null;
    try {
      raw = this.storage.getItem(ROMANCE_SAVE_KEY);
    } catch (error) {
      this.setNotice('storage-read-failed', `读取存档失败：${errorMessage(error)}`);
      return false;
    }
    if (raw === null) return false;
    const result = this.parseRaw(raw);
    if ('reason' in result) {
      this.blockRaw(raw, result.reason, result.incompatible);
      return false;
    }
    this.state = clone(result.state);
    this.loadedRaw = raw;
    this.pendingState = null;
    this.overwriteBlocked = false;
    this.recoveryRaw = null;
    this.sessionOnly = false;
    this.notice = null;
    return true;
  }

  private loadInitial(): void {
    if (!this.storage) {
      this.setNotice('storage-unavailable', '当前环境没有可用的存档存储。');
      return;
    }
    let raw: string | null;
    try {
      raw = this.storage.getItem(ROMANCE_SAVE_KEY);
    } catch (error) {
      this.setNotice('storage-read-failed', `读取存档失败：${errorMessage(error)}`);
      return;
    }
    this.loadedRaw = raw;
    if (raw !== null) {
      const result = this.parseRaw(raw);
      if ('state' in result) {
        this.state = result.state;
        return;
      }
      this.blockRaw(raw, result.reason, result.incompatible);
      return;
    }
    try {
      if (this.storage.getItem(LEGACY_SAVE_KEY) !== null) this.setNotice('legacy-save-preserved', '检测到旧版记录；它已保留，恋爱篇使用独立存档。');
    } catch (error) {
      this.setNotice('storage-read-failed', `读取旧版记录失败：${errorMessage(error)}`);
      return;
    }
    if (!this.writeState(this.state, false)) this.pendingState = clone(this.state);
  }

  private parseRaw(raw: string): ValidationResult {
    let value: unknown;
    try {
      value = JSON.parse(raw);
    } catch {
      return { reason: '存档不是有效 JSON。' };
    }
    if (!isRecord(value) || value.schemaVersion !== ROMANCE_SCHEMA_VERSION || value.storyVersion !== this.provider.storyVersion) {
      return { reason: '存档版本与当前恋爱篇不兼容。', incompatible: true };
    }
    return this.validateState(value);
  }

  private validateState(value: unknown): ValidationResult {
    if (!isRecord(value) || value.schemaVersion !== ROMANCE_SCHEMA_VERSION || value.storyVersion !== this.provider.storyVersion) return { reason: '存档版本与当前恋爱篇不兼容。', incompatible: true };
    const choices = value.choices;
    const previousChoices = value.previousChoices;
    const readTextIds = value.readTextIds;
    const endingIds = value.endingIds;
    if (!isText(value.storyVersion) || !isInt(value.revision) || !isText(value.runId) || !isPhase(value.phase) || !isInt(value.loop, 1)) return { reason: '存档基础字段无效。' };
    if (!Array.isArray(choices) || !choices.every(isText) || choices.length > 6) return { reason: '存档 choices 无效。' };
    if (!Array.isArray(previousChoices) || !previousChoices.every(isText) || (previousChoices.length !== 0 && previousChoices.length !== 6)) return { reason: '存档 previousChoices 无效。' };
    if (value.loop === 1 && previousChoices.length !== 0 || value.loop > 1 && previousChoices.length !== 6) return { reason: '存档周目与上轮经历不一致。' };
    if (previousChoices.length && !this.legalCompletedPath(previousChoices)) return { reason: '存档上轮经历不是合法的完整路径。' };
    if (!Array.isArray(readTextIds) || !readTextIds.every(isText) || !unique(readTextIds) || readTextIds.some((id) => !id.startsWith(`${this.provider.storyVersion}:`))) return { reason: '存档 readTextIds 无效。' };
    if (!Array.isArray(endingIds) || !endingIds.every(isText) || !unique(endingIds)) return { reason: '存档 endingIds 无效。' };
    if (!isRecord(value.settings)) return { reason: '存档 settings 无效。' };
    if (!Array.isArray(value.history) || value.history.length === 0 || value.history.length > 100) return { reason: '存档 history 无效。' };
    const history = value.history as unknown[];
    for (let index = 0; index < history.length; index += 1) {
      const snapshot = history[index];
      if (!this.validSnapshot(snapshot)) return { reason: `存档 history[${index}] 无效。` };
      const typed = snapshot as SceneSnapshot;
      if (typed.storyVersion !== this.provider.storyVersion || typed.loop !== value.loop || !same(typed.previousChoices, previousChoices) || !same(typed.context, contextOf(typed))) return { reason: `存档 history[${index}] 上下文不一致。` };
      if (index === 0 && (typed.phase !== 'prologue' || typed.choices.length !== 0)) return { reason: '存档必须从空 choices 的 prologue 开始。' };
      if (index > 0 && !this.validHistoryTransition(history[index - 1] as SceneSnapshot, typed)) return { reason: `存档 history[${index}] 转移不合法。` };
      let expectedScene: Scene;
      try {
        expectedScene = this.provider.getScene(contextOf(typed), typed.phase);
      } catch {
        return { reason: `存档 history[${index}] 无法由当前内容重建。`, incompatible: true };
      }
      if (!validateScene(expectedScene) || !same(expectedScene, typed.scene)) return { reason: `存档 history[${index}] 与当前内容不一致。`, incompatible: true };
      if (typed.readTextIds.some((id) => !readTextIds.includes(id))) return { reason: `存档 history[${index}] 读取记录超出当前集合。` };
    }
    const last = history[history.length - 1] as SceneSnapshot;
    if (last.phase !== value.phase || !same(last.choices, choices) || !same(last.readTextIds, readTextIds)) return { reason: '存档末尾场景与当前状态不一致。' };
    if (value.phase === 'ending' && (choices.length !== 6 || !last.scene.endingId)) return { reason: 'ending 存档必须包含六次选择和 endingId。' };
    if (value.phase === 'ending' && last.scene.endingId && !endingIds.includes(last.scene.endingId)) return { reason: '结局收藏缺少当前已结算的结局。' };
    if (value.phase === 'decision' && choices.length >= 6) return { reason: '六次选择后不能继续处于 decision。' };
    if (value.phase === 'prologue' && choices.length !== 0) return { reason: 'prologue 不能包含 choices。' };
    if (value.phase === 'response' && (choices.length === 0 || choices.length > 6)) return { reason: 'response choices 数量无效。' };
    return { state: clone(value) as unknown as RomanceState };
  }

  private legalCompletedPath(choices: string[]): boolean {
    // Choice IDs keep their meaning across loops. Only the latest completed
    // sequence is retained; no earlier-loop physical state is reconstructed.
    try {
      for (let index = 0; index < choices.length; index += 1) {
        const scene = this.provider.getScene({ choices: choices.slice(0, index), loop: 1, previousChoices: [] }, 'decision');
        if (!validateScene(scene) || !scene.choices.some(choice => choice.id === choices[index])) return false;
      }
      const ending = this.provider.getScene({ choices: [...choices], loop: 1, previousChoices: [] }, 'ending');
      return validateScene(ending) && Boolean(ending.endingId);
    } catch { return false; }
  }

  private validSnapshot(value: unknown): value is SceneSnapshot {
    if (!isRecord(value) || !isText(value.storyVersion) || !isPhase(value.phase) || !isInt(value.loop, 1)) return false;
    if (!Array.isArray(value.choices) || !value.choices.every(isText) || value.choices.length > 6) return false;
    if (!Array.isArray(value.previousChoices) || !value.previousChoices.every(isText) || (value.previousChoices.length !== 0 && value.previousChoices.length !== 6)) return false;
    if (!Array.isArray(value.readTextIds) || !value.readTextIds.every(isText) || !unique(value.readTextIds) || value.readTextIds.some((id) => !id.startsWith(`${value.storyVersion}:`))) return false;
    if (!isRecord(value.context) || value.context.loop !== value.loop) return false;
    if (!Array.isArray(value.context.choices) || !value.context.choices.every(isText) || !same(value.context.choices, value.choices)) return false;
    if (!Array.isArray(value.context.previousChoices) || !value.context.previousChoices.every(isText) || !same(value.context.previousChoices, value.previousChoices)) return false;
    return validateScene(value.scene);
  }

  private validHistoryTransition(previous: SceneSnapshot, current: SceneSnapshot): boolean {
    if (previous.phase === 'prologue') return current.phase === 'decision' && same(previous.choices, current.choices);
    if (previous.phase === 'decision') {
      if (current.phase !== 'response' || current.choices.length !== previous.choices.length + 1) return false;
      if (!same(current.choices.slice(0, -1), previous.choices)) return false;
      return previous.scene.choices.some((choice) => choice.id === current.choices[current.choices.length - 1]);
    }
    if (previous.phase === 'response') {
      const expected = previous.choices.length === 6 ? 'ending' : 'decision';
      return current.phase === expected && same(previous.choices, current.choices);
    }
    return false;
  }

  private makeFreshState(loop: number, previousChoices: string[], readTextIds: string[], revision: number, endingIds: string[] = [], settings: Record<string, unknown> = {}): RomanceState {
    const context = { choices: [], loop, previousChoices: [...previousChoices] };
    const content = this.deriveScene(context, 'prologue');
    if (!content) this.providerBlocked = true;
    const scene = content ?? unavailableScene();
    return {
      schemaVersion: ROMANCE_SCHEMA_VERSION,
      storyVersion: this.provider.storyVersion,
      revision,
      runId: this.newRunId(loop),
      phase: 'prologue',
      choices: [],
      loop,
      previousChoices: [...previousChoices],
      history: [this.snapshot(scene, 'prologue', [], previousChoices, readTextIds)],
      readTextIds: [...readTextIds],
      endingIds: [...endingIds],
      settings: clone(settings),
    };
  }

  private snapshot(scene: Scene, phase: Phase, choices: string[], previousChoices: string[], readTextIds: string[], loop = this.state?.loop ?? 1): SceneSnapshot {
    return {
      storyVersion: this.provider.storyVersion,
      phase,
      context: {
        choices: [...choices],
        loop,
        previousChoices: [...previousChoices],
      },
      loop,
      choices: [...choices],
      previousChoices: [...previousChoices],
      readTextIds: [...readTextIds],
      scene: clone(scene),
    };
  }

  private deriveScene(context: StoryContext, phase: Phase, setNotice = true): Scene | null {
    let value: Scene;
    try {
      value = this.provider.getScene(clone(context), phase);
    } catch (error) {
      if (setNotice) this.setNotice('provider-error', `读取场景失败：${errorMessage(error)}`);
      return null;
    }
    if (!validateScene(value)) {
      if (setNotice) this.setNotice('provider-error', '场景内容不符合运行时契约。');
      return null;
    }
    return clone(value);
  }

  private readKey(scene: Scene): string {
    return `${this.provider.storyVersion}:${scene.id}`;
  }

  private newRunId(loop: number): string {
    runCounter += 1;
    return `${this.provider.storyVersion}:run-${loop}-${runCounter}`;
  }

  private acceptToken(expectedToken: string): boolean {
    if (this.providerBlocked) return false;
    if (expectedToken === this.getDecisionToken()) return true;
    this.setNotice('stale-event', '当前操作已经过期，请重新选择。');
    return false;
  }

  private commit(next: RomanceState, allowOverwrite = false): boolean {
    const parsed = this.validateState(next);
    if ('reason' in parsed) {
      this.setNotice(parsed.incompatible ? 'provider-error' : 'invalid-state', parsed.reason);
      return false;
    }
    const candidate = parsed.state;
    if (this.sessionOnly) {
      this.state = clone(candidate);
      this.pendingState = null;
      this.setNotice('session-only', '仅本次游玩：新进度不会保存，关闭窗口后会丢失。已有存档保留。');
      return true;
    }
    if (!this.writeState(candidate, allowOverwrite)) {
      this.pendingState = clone(candidate);
      return false;
    }
    this.state = clone(candidate);
    this.pendingState = null;
    this.clearTransientNotice();
    return true;
  }

  private writeState(next: RomanceState, allowOverwrite: boolean): boolean {
    if (!this.storage) {
      this.setNotice('storage-unavailable', '当前环境没有可用的存档存储。');
      return false;
    }
    if (this.overwriteBlocked && !allowOverwrite) {
      this.setNotice('save-blocked', '当前存档已被保留；请先显式重置以创建新档。');
      return false;
    }
    let currentRaw: string | null;
    try {
      currentRaw = this.storage.getItem(ROMANCE_SAVE_KEY);
    } catch (error) {
      this.setNotice('storage-read-failed', `检查存档版本失败：${errorMessage(error)}`);
      return false;
    }
    if (currentRaw !== this.loadedRaw) {
      this.setNotice('save-conflict', '存档已在其他标签页更新，请先重新加载。');
      return false;
    }
    const raw = JSON.stringify(next);
    try {
      if (allowOverwrite && this.recoveryRaw !== null) this.storage.setItem(ROMANCE_RECOVERY_KEY, this.recoveryRaw);
      this.storage.setItem(ROMANCE_SAVE_KEY, raw);
      if (this.storage.getItem(ROMANCE_SAVE_KEY) !== raw) throw new Error('存档写入后校验失败');
    } catch (error) {
      this.setNotice('storage-write-failed', `保存失败：${errorMessage(error)}`);
      return false;
    }
    this.loadedRaw = raw;
    if (allowOverwrite) this.overwriteBlocked = false;
    return true;
  }

  private blockRaw(raw: string, reason: string, incompatible = false): void {
    this.recoveryRaw = raw;
    this.overwriteBlocked = true;
    this.setNotice(incompatible ? 'save-incompatible' : 'save-corrupt', reason);
  }

  private setNotice(code: string, message: string): void {
    this.notice = { code, message };
  }

  private clearTransientNotice(): void {
    if (this.notice && ['legacy-save-preserved', 'save-incompatible', 'save-corrupt'].includes(this.notice.code)) return;
    this.notice = null;
  }
}
