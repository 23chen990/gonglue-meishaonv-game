import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, relative, resolve } from 'node:path';

const REPOSITORY = '23chen990/gonglue-meishaonv-game';
const RUN_ID = '20260831-010324-village-south-text-v1';
const EXPECTED_FIRST_PATHS = 208;
const EXPECTED_MEMORY_COUNT = 14;
const DEFAULT_MAX_STATES = 50_000;
const DEFAULT_MAX_EDGES = 500_000;
const MODULE_PATHS = {
  engine: `../runs/${RUN_ID}/workspace/game/src/romance-engine.ts`,
  content: `../runs/${RUN_ID}/workspace/game/src/romance-content.ts`,
  validation: `../runs/${RUN_ID}/planning/2026-10-01-life-redesign/story-validation.ts`,
} as const;
const SOURCE_PATHS = [
  `runs/${RUN_ID}/workspace/game/index.html`,
  `runs/${RUN_ID}/workspace/game/src/main.ts`,
  `runs/${RUN_ID}/workspace/game/src/romance-engine.ts`,
  `runs/${RUN_ID}/workspace/game/src/romance-content.ts`,
  `runs/${RUN_ID}/workspace/game/src/romance-input.ts`,
  `runs/${RUN_ID}/workspace/game/src/romance-view.ts`,
  `runs/${RUN_ID}/workspace/game/src/style.css`,
  `runs/${RUN_ID}/planning/2026-10-01-life-redesign/story-graph.json`,
  `runs/${RUN_ID}/planning/2026-10-01-life-redesign/story-schema.ts`,
  `runs/${RUN_ID}/planning/2026-10-01-life-redesign/story-validation.ts`,
] as const;
const LEGACY_RUNTIME_TEXTS = [
  '村口向南', '家况签', '纪念物', '家底', '本事', '筋骨', '乡情', '卷宗',
  '煤油灯下的准考证', '河滩边的三亩荒地',
] as const;

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type Phase = 'prologue' | 'decision' | 'response' | 'ending';
type EngineState = {
  revision: number;
  runId: string;
  phase: Phase;
  choices: string[];
  loop: number;
  previousChoices: string[];
  history: unknown[];
  readTextIds: string[];
  endingIds: string[];
};
type SceneChoice = { id: string; label: string };
type Scene = { id: string; title: string; time: string; paragraphs: string[]; choices: SceneChoice[]; endingId?: string };
type StorageLike = { getItem(key: string): string | null; setItem(key: string, value: string): void; removeItem(key: string): void };
type EngineLike = {
  getState(): EngineState;
  getScene(): Scene;
  getDecisionToken(): string;
  choose(id: string, token: string): boolean;
  continue(token: string): boolean;
  restart(token: string): boolean;
  reset(token: string): void;
  restoreCheckpoint(index: number, token: string): void;
  isCurrentRead(): boolean;
  markRead(token: string): void;
  getNotice(): unknown;
  retrySave(): void;
  reloadLatest(): void;
};
type EngineConstructor = new (storage: StorageLike | undefined, options: { storyVersion: string; getScene: (context: {choices:string[];loop:number;previousChoices:string[]}, phase: Phase) => Scene }) => EngineLike;
type ActualModules = {
  RomanceEngine: EngineConstructor;
  getRomanceScene: (context: {choices:string[];loop:number;previousChoices:string[]}, phase: Phase) => Scene;
  STORY_VERSION: string;
  evaluateRomance: (choices: string[]) => unknown;
  ROMANCE_STORY: unknown;
  enumerateStoryPaths: (story: unknown) => unknown[];
  getContentCatalog: () => Scene[];
};
type Action = { kind: 'choose' | 'continue'; id: string };
type RelevantState = Omit<EngineState,'runId'|'revision'>;
type SceneSnapshot = Scene & { text: string; variantHash: string };
type ReplayStep = {
  index: number;
  before: RelevantState;
  beforeScene: SceneSnapshot;
  action: Action;
  after: RelevantState;
  afterScene: SceneSnapshot;
};
type ReplayTrace = {
  pathId: string;
  choices: string[];
  expectedEndingId: string;
  actualEndingId: string | null;
  steps: ReplayStep[];
  issues: string[];
};
type PathCase = { choices: string[]; expectedEndingId: string; raw: unknown };
type QaIssue = { id: string; severity: 'P0' | 'P1'; message: string; pathId?: string; step?: number };

class MemoryStorage implements StorageLike {
  private readonly values = new Map<string, string>();
  getItem(key: string): string | null { return this.values.get(key) ?? null; }
  setItem(key: string, value: string): void { this.values.set(key, value); }
  removeItem(key: string): void { this.values.delete(key); }
}

function rootDirectory(): string {
  return resolve(dirname(fileURLToPath(import.meta.url)), '..');
}

function relativePath(path: string): string {
  return relative(rootDirectory(), path) || '.';
}

function stringifyError(error: unknown): string {
  return error instanceof Error ? `${error.name}: ${error.message}` : String(error);
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function stable(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`;
  const entries = Object.entries(value as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b));
  return `{${entries.map(([key, item]) => `${JSON.stringify(key)}:${stable(item)}`).join(',')}}`;
}

function sha256(value: string | Uint8Array): string {
  return createHash('sha256').update(value).digest('hex');
}

function shortHash(value: unknown): string {
  return sha256(stable(value)).slice(0, 16);
}

function gitCommit(): string | null {
  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], { cwd: rootDirectory(), encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

async function sourceHashes(): Promise<Record<string, string | null>> {
  const result: Record<string, string | null> = {};
  for (const source of SOURCE_PATHS) {
    const absolute = resolve(rootDirectory(), source);
    try {
      result[source] = sha256(await readFile(absolute));
    } catch {
      result[source] = null;
    }
  }
  return result;
}

export function relevantState(state: EngineState): RelevantState {
  return cloneJson({
    phase: state.phase,
    choices: state.choices,
    loop: state.loop,
    previousChoices: state.previousChoices,
    history: state.history,
    readTextIds: state.readTextIds,
    endingIds: state.endingIds,
  });
}

function sceneSnapshot(scene: Scene): SceneSnapshot {
  const normalized: Scene = cloneJson({
    id: scene.id,
    title: scene.title,
    time: scene.time,
    paragraphs: scene.paragraphs,
    choices: scene.choices,
    ...(scene.endingId ? { endingId: scene.endingId } : {}),
  });
  const text = [normalized.title, normalized.time, ...normalized.paragraphs, ...normalized.choices.map((choice) => `${choice.id}:${choice.label}`)].join('\n');
  return { ...normalized, text, variantHash: shortHash(normalized) };
}

function stateKey(state: RelevantState, scene: SceneSnapshot): string {
  return `${scene.id}|${state.phase}|${shortHash(state)}`;
}

function pathCase(raw: unknown): PathCase {
  if (!raw || typeof raw !== 'object') throw new Error('enumerateStoryPaths returned a non-object path.');
  const object = raw as Record<string, unknown>;
  if (!Array.isArray(object.choices) || object.choices.some((choice) => typeof choice !== 'string')) throw new Error('Every story path must expose string choices.');
  const expected = object.endingId ?? object.ending;
  if (typeof expected !== 'string' || expected.length === 0) throw new Error('Every story path must expose endingId.');
  return { choices: [...object.choices], expectedEndingId: expected, raw };
}

function actualEnding(state: RelevantState, scene: SceneSnapshot): string | null {
  return state.phase === 'ending' && scene.endingId && state.endingIds.includes(scene.endingId) ? scene.endingId : null;
}

function oracleEnding(evaluate: ActualModules['evaluateRomance'], choices: string[]): string | null {
  const result = evaluate(choices);
  if (typeof result === 'string') return result;
  if (!result || typeof result !== 'object') return null;
  const object = result as Record<string, unknown>;
  for (const key of ['endingId', 'ending', 'id']) {
    if (typeof object[key] === 'string' && object[key]) return object[key];
  }
  return null;
}

function legacyTextHits(scene: SceneSnapshot): string[] {
  return LEGACY_RUNTIME_TEXTS.filter((text) => scene.text.includes(text));
}

function inspectScene(scene: SceneSnapshot, issues: QaIssue[], pathId: string, step: number): void {
  if (!scene.id || !scene.title || !scene.time || scene.paragraphs.length === 0) {
    issues.push({ id: 'scene-shape', severity: 'P0', message: `Scene ${scene.id || '<empty>'} has missing identity, timing or paragraphs.`, pathId, step });
  }
  if (scene.paragraphs.some((paragraph) => !paragraph.trim())) issues.push({ id: 'empty-paragraph', severity: 'P1', message: `Scene ${scene.id} contains an empty paragraph.`, pathId, step });
  const ids = scene.choices.map((choice) => choice.id);
  if (new Set(ids).size !== ids.length || scene.choices.some((choice) => !choice.id || !choice.label.trim())) {
    issues.push({ id: 'choice-id', severity: 'P0', message: `Scene ${scene.id} has duplicate or empty choice IDs/labels.`, pathId, step });
  }
  const hits = legacyTextHits(scene);
  if (hits.length > 0) issues.push({ id: 'legacy-runtime-text', severity: 'P0', message: `Scene ${scene.id} contains legacy runtime text: ${hits.join(', ')}`, pathId, step });
}

function makeEngine(modules: ActualModules): EngineLike {
  return new modules.RomanceEngine(new MemoryStorage(), {
    storyVersion: modules.STORY_VERSION,
    getScene: modules.getRomanceScene,
  });
}

function actionToken(engine: EngineLike): string {
  return engine.getDecisionToken();
}

function applyAction(engine: EngineLike, action: Action): void {
  const token = actionToken(engine);
  if (action.kind === 'choose') {
    if (!engine.choose(action.id, token)) throw new Error(`Engine rejected legal choice ${action.id}.`);
  } else {
    if (!engine.continue(token)) throw new Error(`Engine rejected continue at ${engine.getScene().id}.`);
  }
}

type ReplayBudget = {maxStates:number;maxEdges:number;states:Set<string>;edges:Set<string>;hit:boolean};

function runFirstPath(modules: ActualModules, path: PathCase, globalIssues: QaIssue[], budget?:ReplayBudget): ReplayTrace {
  const pathId = `path-${shortHash(path.choices.join('/'))}`;
  const engine = makeEngine(modules);
  const trace: ReplayTrace = { pathId, choices: [...path.choices], expectedEndingId: path.expectedEndingId, actualEndingId: null, steps: [], issues: [] };
  try {
    const oracle = oracleEnding(modules.evaluateRomance, path.choices);
    if (oracle !== path.expectedEndingId) trace.issues.push(`evaluateRomance mismatch: enumerated ${path.expectedEndingId}, oracle ${oracle ?? '<none>'}.`);
  } catch (error) {
    trace.issues.push(`evaluateRomance threw: ${stringifyError(error)}`);
  }
  let choiceIndex = 0;
  for (let guard = 0; guard < 256; guard += 1) {
    const before = relevantState(engine.getState());
    const beforeScene = sceneSnapshot(engine.getScene());
    inspectScene(beforeScene, globalIssues, pathId, guard);
    if (before.phase === 'ending') {
      trace.actualEndingId = actualEnding(before, beforeScene);
      break;
    }
    let action: Action;
    if (before.phase === 'decision') {
      const id = path.choices[choiceIndex];
      if (!id) {
        trace.issues.push(`Missing path choice at decision ${choiceIndex} in scene ${beforeScene.id}.`);
        break;
      }
      if (!beforeScene.choices.some((choice) => choice.id === id)) {
        trace.issues.push(`Choice ${id} is not legal in scene ${beforeScene.id}.`);
        break;
      }
      action = { kind: 'choose', id };
      choiceIndex += 1;
    } else if (before.phase === 'prologue' || before.phase === 'response') {
      if (beforeScene.choices.length > 0) trace.issues.push(`Non-decision scene ${beforeScene.id} exposes choices.`);
      action = { kind: 'continue', id: `continue:${before.phase}:${beforeScene.id}` };
    } else {
      trace.issues.push(`Unknown engine phase ${String(before.phase)}.`);
      break;
    }
    try {
      applyAction(engine, action);
    } catch (error) {
      trace.issues.push(`${action.kind} ${action.id} threw: ${stringifyError(error)}`);
      break;
    }
    const after = relevantState(engine.getState());
    const afterScene = sceneSnapshot(engine.getScene());
    inspectScene(afterScene, globalIssues, pathId, guard);
    if(budget) {
      const keys=[stateKey(before,beforeScene),stateKey(after,afterScene)];
      const edge=`${keys[0]}|${action.kind}:${action.id}`;
      const extra=keys.filter(key=>!budget.states.has(key));
      if(budget.states.size+new Set(extra).size>budget.maxStates || !budget.edges.has(edge) && budget.edges.size>=budget.maxEdges){budget.hit=true;break;}
      keys.forEach(key=>budget.states.add(key));budget.edges.add(edge);
    }
    trace.steps.push({ index: trace.steps.length, before, beforeScene, action, after, afterScene });
  }
  if (trace.steps.length >= 256) trace.issues.push('Replay guard reached 256 operations.');
  const finalState = relevantState(engine.getState());
  const finalScene = sceneSnapshot(engine.getScene());
  trace.actualEndingId = trace.actualEndingId ?? actualEnding(finalState, finalScene);
  if (choiceIndex !== path.choices.length) trace.issues.push(`Consumed ${choiceIndex}/${path.choices.length} first-loop choices.`);
  if (finalState.phase !== 'ending') trace.issues.push(`Path ended in phase ${finalState.phase}, not ending.`);
  if (trace.actualEndingId !== path.expectedEndingId) trace.issues.push(`Ending mismatch: expected ${path.expectedEndingId}, got ${trace.actualEndingId ?? '<none>'}.`);
  if (budget?.hit) {trace.issues.push('Export budget reached; this path is intentionally incomplete.');return trace;}
  if (trace.issues.length > 0) globalIssues.push(...trace.issues.map((message) => ({ id: 'first-loop-replay', severity: 'P0' as const, message, pathId })));
  return trace;
}

function memoryIdsFromStory(story: unknown): string[] {
  if (!story || typeof story !== 'object') return [];
  const object = story as Record<string, unknown>;
  const arrays = Object.entries(object).filter(([key, value]) => /memory/i.test(key) && Array.isArray(value)).flatMap(([, value]) => value as unknown[]);
  const ids = arrays.flatMap((item) => item && typeof item === 'object' && typeof (item as Record<string, unknown>).id === 'string' ? [(item as Record<string, unknown>).id as string] : []);
  return [...new Set(ids)].sort();
}

type MemoryTemplate = {id:string;characterId:'zhixia'|'wenxi';text:string;sourceChoices:string[];requiredEndingId?:string};
function replaySecondLoop(modules: ActualModules, first: ReplayTrace, _knownMemoryIds: Set<string>, issues: QaIssue[]): { scenes: SceneSnapshot[]; observedMemoryIds: string[]; operations: number; milestones: string[]; witnesses:unknown[] } {
  const engine=makeEngine(modules);
  const scenes:SceneSnapshot[]=[];
  const found=new Set<string>();
  const milestones:string[]=[];
  const witnesses:unknown[]=[];
  const source=modules.ROMANCE_STORY as {memoryTemplates:MemoryTemplate[];secondLoop:{initiatives:{text:string;characterId:string}[]}};
  const evaluated=modules.evaluateRomance(first.choices) as {memoryIds:Record<string,string>};
  const expected=Object.values(evaluated.memoryIds).map(id=>source.memoryTemplates.find(memory=>memory.id===id)!);
  try {
    for(const step of first.steps) applyAction(engine,step.action);
    if(actualEnding(relevantState(engine.getState()),sceneSnapshot(engine.getScene()))!==first.actualEndingId) throw new Error('First-loop precondition ending differs.');
    if(!engine.restart(actionToken(engine)) || engine.getState().loop!==2 || stable(engine.getState().previousChoices)!==stable(first.choices)) throw new Error('Public restart did not retain the latest completed choices.');
  } catch(error){issues.push({id:'restart',severity:'P0',message:stringifyError(error),pathId:first.pathId});return {scenes,observedMemoryIds:[],operations:0,milestones,witnesses};}
  let operations=0;
  for(;operations<32;operations++) {
    const state=relevantState(engine.getState()),scene=sceneSnapshot(engine.getScene());scenes.push(scene);
    for(const memory of expected){
      const owner=memory.characterId==='zhixia'?'知夏':'闻溪';
      const paragraph=scene.paragraphs.find(text=>text.includes(owner)&&text.includes(memory.text));
      if(paragraph&&!found.has(memory.id)){
        const sourceValid=memory.sourceChoices.every(id=>first.choices.includes(id))&&(!memory.requiredEndingId||memory.requiredEndingId===first.actualEndingId);
        const early=memory.characterId==='zhixia'?state.choices.length===0:state.choices.length===1;
        if(!sourceValid||!early) issues.push({id:'memory-source-or-timing',severity:'P0',message:`${memory.id} has wrong source or appears after its decision.`,pathId:first.pathId});
        found.add(memory.id);witnesses.push({memoryId:memory.id,character:owner,sourceChoices:first.choices,firstEndingId:first.actualEndingId,secondScene:scene.id,paragraph,sourceValid,beforeOwnDecision:early});
      }
    }
    if(state.phase==='response'&&state.choices.length===3&&source.secondLoop.initiatives.every(event=>scene.paragraphs.includes(event.text))) milestones.push('q3-both-visible-initiatives');
    if(state.phase==='response'&&state.choices.length===4&&scene.paragraphs.join(' ').includes('重开')&&scene.paragraphs.join(' ').includes('23:20')) milestones.push(`q4-${state.choices[3]}`);
    if(state.phase==='ending')break;
    try {
      if(state.phase==='decision'){
        if(state.choices.length===0&&!found.has(evaluated.memoryIds.zhixia))throw new Error('Zhixia own memory was not visible before q1.');
        if(state.choices.length===1&&!found.has(evaluated.memoryIds.wenxi))throw new Error('Wenxi own memory was not visible before q2.');
        const id=first.choices[state.choices.length];
        applyAction(engine,{kind:'choose',id});
      }else applyAction(engine,{kind:'continue',id:`continue:${state.phase}:${scene.id}`});
    }catch(error){issues.push({id:'second-loop-replay',severity:'P0',message:stringifyError(error),pathId:first.pathId});break;}
  }
  if(engine.getState().phase!=='ending'||found.size!==2||!milestones.includes('q3-both-visible-initiatives')||!milestones.some(id=>id.startsWith('q4-')))issues.push({id:'memory-milestones',severity:'P0',message:'Incomplete visible memory/initiative/replay-conversation evidence.',pathId:first.pathId});
  return {scenes,observedMemoryIds:[...found].sort(),operations,milestones,witnesses};
}

function addCatalog(catalog: Map<string, Record<string, Json>>, scene: SceneSnapshot, pathId: string): void {
  const key = `${scene.id}|${scene.variantHash}`;
  const existing = catalog.get(key);
  if (existing) {
    const paths = Array.isArray(existing.pathIds) ? existing.pathIds as Json[] : [];
    if (!paths.includes(pathId)) paths.push(pathId);
    existing.pathIds = paths;
    existing.count = Number(existing.count ?? 0) + 1;
    return;
  }
  catalog.set(key, {
    sceneId: scene.id,
    variantHash: scene.variantHash,
    title: scene.title,
    time: scene.time,
    paragraphs: scene.paragraphs,
    choices: scene.choices,
    endingId: scene.endingId ?? null,
    count: 1,
    pathIds: [pathId],
  });
}

function addLedger(ledger: Map<string, Record<string, Json>>, step: ReplayStep, pathId: string): void {
  if (step.action.kind !== 'choose') return;
  const key = `${step.beforeScene.id}|${step.action.id}`;
  const existing = ledger.get(key);
  const target = step.afterScene.id;
  if (existing) {
    existing.selectedCount = Number(existing.selectedCount ?? 0) + 1;
    const targets = Array.isArray(existing.targetSceneIds) ? existing.targetSceneIds as Json[] : [];
    if (!targets.includes(target)) targets.push(target);
    existing.targetSceneIds = targets;
    const paths = Array.isArray(existing.pathIds) ? existing.pathIds as Json[] : [];
    if (!paths.includes(pathId)) paths.push(pathId);
    existing.pathIds = paths;
    return;
  }
  const choice = step.beforeScene.choices.find((candidate) => candidate.id === step.action.id);
  ledger.set(key, {
    sceneId: step.beforeScene.id,
    choiceId: step.action.id,
    label: choice?.label ?? '',
    selectedCount: 1,
    targetSceneIds: [target],
    pathIds: [pathId],
    beforeStateHash: shortHash(step.before),
    afterStateHash: shortHash(step.after),
  });
}

type ModelNode = { id: string; key: string; text: string; choices: SceneChoice[]; endingId?: string; state: RelevantState; scene: SceneSnapshot };

function buildStorycheck(traces: ReplayTrace[], baseCommit: string, maxStates: number, maxEdges: number, issues: QaIssue[]): { model: Record<string, Json>; complete: boolean; transitionCount: number; nodeCount: number; edgeCount: number } {
  const nodesByKey = new Map<string, ModelNode>();
  const edges = new Map<string, { from: string; action: Action; to: string; label: string }>();
  const ensureNode = (state: RelevantState, scene: SceneSnapshot): ModelNode => {
    const key = stateKey(state, scene);
    const existing = nodesByKey.get(key);
    if (existing) return existing;
    const id = `node-${shortHash(key)}`;
    const node: ModelNode = { id, key, text: [scene.title, scene.time, ...scene.paragraphs].filter(Boolean).join('\n'), choices: scene.choices, ...(scene.endingId ? { endingId: scene.endingId } : state.phase === 'ending' && state.endingIds.length > 0 ? { endingId: state.endingIds[state.endingIds.length - 1] } : {}), state, scene };
    nodesByKey.set(key, node);
    return node;
  };
  for (const trace of traces) {
    for (const step of trace.steps) {
      const from = ensureNode(step.before, step.beforeScene);
      const to = ensureNode(step.after, step.afterScene);
      const edgeKey = `${from.key}|${step.action.kind}:${step.action.id}`;
      const choice = step.beforeScene.choices.find((candidate) => candidate.id === step.action.id);
      const existing = edges.get(edgeKey);
      if (existing && existing.to !== to.id) issues.push({ id: 'model-edge-conflict', severity: 'P0', message: `State/action edge ${edgeKey} resolves to multiple targets.` });
      else edges.set(edgeKey, { from: from.id, action: step.action, to: to.id, label: choice?.label ?? (step.action.kind === 'continue' ? '继续' : step.action.id) });
    }
  }
  let complete = true;
  if (nodesByKey.size > maxStates) complete = false;
  if (edges.size > maxEdges) complete = false;
  if (!complete) issues.push({ id: 'storycheck-cap', severity: 'P0', message: `Storycheck export capped at ${maxStates} states/${maxEdges} edges; report is INCOMPLETE.` });
  const includedNodes = [...nodesByKey.values()].slice(0, maxStates);
  const included = new Set(includedNodes.map((node) => node.id));
  const choicesFor = (node: ModelNode): Record<string, Json>[] => {
    if (node.state.phase === 'ending') return [];
    const sourceChoices = node.state.phase === 'decision' ? node.choices.map((choice) => ({ id: choice.id, label: choice.label })) : [{ id: `continue:${node.state.phase}:${node.scene.id}`, label: '继续' }];
    return sourceChoices.flatMap((choice) => {
      const edge = edges.get(`${node.key}|${node.state.phase === 'decision' ? `choose:${choice.id}` : `continue:${choice.id}`}`);
      if (!edge || !included.has(edge.to)) {
        complete = false;
        return [];
      }
      return [{ id: choice.id, label: choice.label, target: edge.to, kind: node.state.phase === 'decision' ? 'substantive' : 'continue' }];
    });
  };
  const serializedNodes = includedNodes.map((node) => ({ id: node.id, text: node.text || node.scene.id, ...(node.endingId ? { ending: node.endingId } : {}), choices: choicesFor(node) }));
  const endingIds = [...new Set(includedNodes.flatMap((node) => node.endingId ? [node.endingId] : []))];
  const entryNode = traces[0]?.steps[0] ? ensureNode(traces[0].steps[0].before, traces[0].steps[0].beforeScene).id : '';
  const model = {
    format: 'storycheck/1',
    source: { kind: 'repository_export', repository: REPOSITORY, commit: baseCommit },
    entry: entryNode,
    variables: {},
    endings: endingIds,
    nodes: serializedNodes,
  } as unknown as Record<string, Json>;
  return { model, complete, transitionCount: edges.size, nodeCount: serializedNodes.length, edgeCount: serializedNodes.reduce((count, node) => count + node.choices.length, 0) };
}

async function loadModules(): Promise<ActualModules> {
  const [engineModule, contentModule, validationModule] = await Promise.all([
    import(MODULE_PATHS.engine),
    import(MODULE_PATHS.content),
    import(MODULE_PATHS.validation),
  ]);
  const engine = engineModule as unknown as Record<string, unknown>;
  const content = contentModule as unknown as Record<string, unknown>;
  const validation = validationModule as unknown as Record<string, unknown>;
  return {
    RomanceEngine: engine.RomanceEngine as EngineConstructor,
    getRomanceScene: content.getRomanceScene as ActualModules['getRomanceScene'],
    STORY_VERSION: content.STORY_VERSION as string,
    evaluateRomance: content.evaluateRomance as ActualModules['evaluateRomance'],
    ROMANCE_STORY: content.ROMANCE_STORY,
    enumerateStoryPaths: validation.enumerateStoryPaths as ActualModules['enumerateStoryPaths'],
    getContentCatalog: content.getContentCatalog as ActualModules['getContentCatalog'],
  };
}

function parseNumber(args: string[], name: string, fallback: number): number {
  const index = args.indexOf(name);
  if (index < 0) return fallback;
  const value = Number(args[index + 1]);
  return Number.isInteger(value) && value > 0 ? value : fallback;
}

function parsePath(args: string[], name: string, fallback: string): string {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
}

async function writeJson(path: string, value: unknown): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

async function blockedReport(error: unknown, outputPath: string): Promise<never> {
  const commit = gitCommit();
  const report = {
    schemaVersion: 1,
    status: 'BLOCKED',
    complete: false,
    expectedFirstLoopPaths: EXPECTED_FIRST_PATHS,
    observedFirstLoopPaths: 0,
    source: { repository: REPOSITORY, runId: RUN_ID, baseCommit: commit, sourceHashes: await sourceHashes() },
    runtimeWiring: { entry: `runs/${RUN_ID}/workspace/game/index.html`, modules: Object.values(MODULE_PATHS), loaded: false },
    issues: [{ id: 'runtime-modules-unavailable', severity: 'P0', message: stringifyError(error) }],
    limitation: 'No synthetic PASS is emitted. Root must integrate romance-engine.ts and romance-content.ts, then rerun this tool.',
  };
  await writeJson(outputPath, report);
  process.exitCode = 1;
  return report as never;
}

export async function runQa(args = process.argv.slice(2)): Promise<Record<string, Json>> {
  const defaultOutput = resolve(rootDirectory(), `docs/release-audit/2026-10-08/qa-romance-report.json`);
  const defaultStorycheck = resolve(rootDirectory(), `docs/release-audit/2026-10-08/repository-story.json`);
  const outputPath = resolve(rootDirectory(), parsePath(args, '--out', relativePath(defaultOutput)));
  const storycheckPath = resolve(rootDirectory(), parsePath(args, '--storycheck-out', relativePath(defaultStorycheck)));
  const maxStates = parseNumber(args, '--max-states', DEFAULT_MAX_STATES);
  const maxEdges = parseNumber(args, '--max-edges', DEFAULT_MAX_EDGES);
  let modules: ActualModules;
  try {
    modules = await loadModules();
  } catch (error) {
    return blockedReport(error, outputPath);
  }
  const issues: QaIssue[] = [];
  let paths: PathCase[] = [];
  try {
    paths = modules.enumerateStoryPaths(modules.ROMANCE_STORY).map(pathCase);
  } catch (error) {
    issues.push({ id: 'path-enumeration', severity: 'P0', message: stringifyError(error) });
  }
  if (paths.length !== EXPECTED_FIRST_PATHS) issues.push({ id: 'path-count', severity: 'P0', message: `Expected ${EXPECTED_FIRST_PATHS} legal first-loop paths, found ${paths.length}.` });
  const expectedEndingIds = [...new Set(paths.map((path) => path.expectedEndingId))].sort();
  const memoryIds = memoryIdsFromStory(modules.ROMANCE_STORY);
  if (memoryIds.length !== EXPECTED_MEMORY_COUNT) issues.push({ id: 'memory-count', severity: 'P0', message: `Expected ${EXPECTED_MEMORY_COUNT} memory IDs in ROMANCE_STORY, found ${memoryIds.length}.` });
  const traces: ReplayTrace[] = [];
  const endingCounts = new Map<string, number>();
  const catalog = new Map<string, Record<string, Json>>();
  const ledger = new Map<string, Record<string, Json>>();
  const memoryEvidence: Array<Record<string, Json>> = [];
  const budget:ReplayBudget={maxStates,maxEdges,states:new Set(),edges:new Set(),hit:false};
  for (const path of paths) {
    const trace = runFirstPath(modules, path, issues,budget);
    traces.push(trace);
    if (trace.actualEndingId) endingCounts.set(trace.actualEndingId, (endingCounts.get(trace.actualEndingId) ?? 0) + 1);
    trace.steps.forEach((step) => {
      addCatalog(catalog, step.beforeScene, trace.pathId);
      addCatalog(catalog, step.afterScene, trace.pathId);
      addLedger(ledger, step, trace.pathId);
    });
    if(budget.hit) {issues.push({id:'export-cap',severity:'P0',message:`Stopped early at ${budget.states.size} states/${budget.edges.size} edges.`});break;}
    const second = replaySecondLoop(modules, trace, new Set(memoryIds), issues);
    memoryEvidence.push({ pathId: trace.pathId, firstEndingId: trace.actualEndingId, secondLoopOperations: second.operations, milestones: second.milestones, observedMemoryIds: second.observedMemoryIds, witnesses: second.witnesses as Json[] });
    for(const scene of second.scenes) addCatalog(catalog,scene,`${trace.pathId}-replay`);
  }
  const transitionChecks: Array<Record<string, Json>> = [];
  let transitionMismatchCount = 0;
  for (const trace of traces) {
    if(budget.hit) break;
    const replay = runFirstPath(modules, { choices: trace.choices, expectedEndingId: trace.expectedEndingId, raw: null }, []);
    for (const step of trace.steps) {
      const counterpart = replay.steps[step.index];
      const matches = Boolean(counterpart) && stable(counterpart.after) === stable(step.after) && counterpart.afterScene.variantHash === step.afterScene.variantHash;
      if (!matches) transitionMismatchCount += 1;
      if (transitionChecks.length < 5_000 || !matches) transitionChecks.push({ pathId: trace.pathId, step: step.index, action: step.action, matches, expectedAfterStateHash: shortHash(step.after), actualAfterStateHash: counterpart ? shortHash(counterpart.after) : null, expectedSceneVariant: step.afterScene.variantHash, actualSceneVariant: counterpart?.afterScene.variantHash ?? null });
    }
  }
  if (transitionMismatchCount > 0) issues.push({ id: 'transition-replay', severity: 'P0', message: `${transitionMismatchCount} extracted transitions failed independent fresh-engine replay.` });
  const modelResult = buildStorycheck(traces, gitCommit() ?? '0'.repeat(40), maxStates, maxEdges, issues);
  await writeJson(storycheckPath, modelResult.model);
  if(budget.hit) modelResult.complete=false;
  const observedMemoryIds = [...new Set(memoryEvidence.flatMap((item) => Array.isArray(item.observedMemoryIds) ? item.observedMemoryIds as string[] : []))].sort();
  const missingMemoryIds = memoryIds.filter((id) => !observedMemoryIds.includes(id));
  if (missingMemoryIds.length > 0) issues.push({ id: 'memory-coverage', severity: 'P0', message: `Missing first-to-second-loop memory evidence for: ${missingMemoryIds.join(', ')}` });
  const complete = issues.length === 0 && traces.length === EXPECTED_FIRST_PATHS && modelResult.complete && transitionMismatchCount === 0 && missingMemoryIds.length === 0;
  const report = {
    schemaVersion: 1,
    status: complete ? 'PASS' : budget.hit || !modelResult.complete ? 'INCOMPLETE' : 'FAIL',
    complete,
    earlyBudgetStop:budget.hit,
    expectedFirstLoopPaths: EXPECTED_FIRST_PATHS,
    observedFirstLoopPaths: traces.length,
    expectedMemoryCount: EXPECTED_MEMORY_COUNT,
    observedMemoryIds,
    missingMemoryIds,
    endingCounts: Object.fromEntries([...endingCounts.entries()].sort()),
    source: { repository: REPOSITORY, runId: RUN_ID, baseCommit: gitCommit(), sourceHashes: await sourceHashes() },
    runtimeWiring: { entry: `runs/${RUN_ID}/workspace/game/index.html`, modules: Object.values(MODULE_PATHS), loaded: true },
    catalog: [...catalog.values()],
    authoredCatalog: budget.hit ? [] : modules.getContentCatalog(),
    catalogScope: 'Full finite authored variants at loop 1 and replay-equivalent loop 2; engine witnesses separately record actually replayed paths.',
    choiceLedger: [...ledger.values()],
    endingReplays: Object.fromEntries(expectedEndingIds.map((endingId) => {
      const matching = traces.filter((trace) => trace.actualEndingId === endingId);
      return [endingId, { pathCount: matching.length, representative: matching[0] ?? null, pathIds: matching.map((trace) => trace.pathId) }];
    })),
    memoryEvidence,
    transitionVerification: { extractedTransitions: modelResult.transitionCount, independentlyReplayed: transitionChecks.length, mismatchCount: transitionMismatchCount, samples: transitionChecks.slice(0, 5_000) },
    storycheck: { path: relativePath(storycheckPath), complete: modelResult.complete, nodes: modelResult.nodeCount, edges: modelResult.edgeCount, maxStates, maxEdges, repeatedLoopsCovered: false, savesCovered: false, uiCovered: false },
    issues,
    limitation: 'The finite storycheck model covers the first-loop state tree only when complete is true; replay witnesses cover each first-loop history with the same current choice sequence. Repeated loops, persistence and UI require the separate browser/engine tracks.',
  } as unknown as Record<string, Json>;
  await writeJson(outputPath, report);
  if (!complete) process.exitCode = 1;
  return report;
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) void runQa();
