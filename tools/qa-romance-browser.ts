import { createHash } from 'node:crypto';
import { execFileSync, spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, relative, resolve } from 'node:path';
import {chromium,webkit,type BrowserType,type Browser,type Page} from '@playwright/test';
import {ROMANCE_STORY,evaluateRomance,getContentCatalog} from '../runs/20260831-010324-village-south-text-v1/workspace/game/src/romance-content.js';

const RUN_ID = '20260831-010324-village-south-text-v1';
const REPOSITORY = '23chen990/gonglue-meishaonv-game';
const MODULE_PATHS = {
  content: `../runs/${RUN_ID}/workspace/game/src/romance-content.ts`,
  validation: `../runs/${RUN_ID}/planning/2026-10-01-life-redesign/story-validation.ts`,
} as const;
const VIEWPORTS = [
  { width: 320, height: 568, label: 'phone-small' },
  { width: 390, height: 844, label: 'phone-standard' },
  { width: 844, height: 390, label: 'phone-landscape' },
] as const;
const SOURCE_PATHS = [
  `runs/${RUN_ID}/workspace/game/index.html`,
  `runs/${RUN_ID}/workspace/game/src/main.ts`,
  `runs/${RUN_ID}/workspace/game/src/romance-engine.ts`,
  `runs/${RUN_ID}/workspace/game/src/romance-content.ts`,
  `runs/${RUN_ID}/workspace/game/src/romance-input.ts`,
  `runs/${RUN_ID}/workspace/game/src/romance-view.ts`,
  `runs/${RUN_ID}/planning/2026-10-01-life-redesign/story-graph.json`,
  `runs/${RUN_ID}/planning/2026-10-01-life-redesign/story-schema.ts`,
  `runs/${RUN_ID}/planning/2026-10-01-life-redesign/story-validation.ts`,
] as const;

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type PathCase = { choices: string[]; expectedEndingId: string };
type BrowserTypeLike = BrowserType;
type BrowserLike = Browser;
type PageLike = Page;

function repoRoot(): string { return resolve(dirname(fileURLToPath(import.meta.url)), '..'); }
function relativePath(path: string): string { return relative(repoRoot(), path) || '.'; }
function errorText(error: unknown): string { return error instanceof Error ? `${error.name}: ${error.message}` : String(error); }
function sha256(value: Uint8Array): string { return createHash('sha256').update(value).digest('hex'); }

function gitCommit(): string | null {
  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], { cwd: repoRoot(), encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

async function sourceHashes(): Promise<Record<string, string | null>> {
  const result: Record<string, string | null> = {};
  for (const source of SOURCE_PATHS) {
    try { result[source] = sha256(await readFile(resolve(repoRoot(), source))); }
    catch { result[source] = null; }
  }
  return result;
}

async function writeJson(path: string, value: unknown): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function pathCase(raw: unknown): PathCase {
  if (!raw || typeof raw !== 'object') throw new Error('Story path is not an object.');
  const object = raw as Record<string, unknown>;
  if (!Array.isArray(object.choices) || object.choices.some((choice) => typeof choice !== 'string')) throw new Error('Story path has invalid choices.');
  const ending = object.endingId ?? object.ending;
  if (typeof ending !== 'string' || !ending) throw new Error('Story path has no endingId.');
  return { choices: [...object.choices], expectedEndingId: ending };
}

function pathId(path: PathCase): string {
  return `path-${createHash('sha256').update(path.choices.join('/')).digest('hex').slice(0, 12)}`;
}

async function loadStories(): Promise<{ paths: PathCase[] }> {
  const [contentModule, validationModule] = await Promise.all([import(MODULE_PATHS.content), import(MODULE_PATHS.validation)]);
  const content = contentModule as unknown as Record<string, unknown>;
  const validation = validationModule as unknown as Record<string, unknown>;
  const enumerate = validation.enumerateStoryPaths as (story: unknown) => unknown[];
  return { paths: enumerate(content.ROMANCE_STORY).map(pathCase) };
}

async function startPreview(workspace: string): Promise<{ url: string; child: ChildProcessWithoutNullStreams; output: string }> {
  const child = spawn(process.execPath, [resolve(repoRoot(),'node_modules/vite/bin/vite.js'), 'preview', '--host', '127.0.0.1', '--port', '0'], { cwd: workspace, stdio: ['pipe', 'pipe', 'pipe'] });
  let output = '';
  const append = (value: Buffer): void => { output += value.toString(); };
  child.stdout.on('data', append);
  child.stderr.on('data', append);
  const url = await new Promise<string>((resolvePromise, reject) => {
    const timer = setTimeout(() => {child.kill('SIGTERM');reject(new Error(`Preview did not report a local URL within 15s. Output: ${output}`));}, 15_000);
    const check = (): void => {
      const match = output.match(/http:\/\/127\.0\.0\.1:(\d+)\//);
      if (match) { clearTimeout(timer); resolvePromise(match[0]); }
    };
    child.stdout.on('data', check);
    child.stderr.on('data', check);
    child.once('exit', (code) => { clearTimeout(timer); reject(new Error(`Preview exited with ${code}. Output: ${output}`)); });
  });
  return { url, child, output };
}

async function clickChoice(page: PageLike, id: string): Promise<void> {
  const choices = page.locator('[data-choice]');
  for (let index = 0; index < await choices.count(); index += 1) {
    const candidate = choices.nth(index);
    if (await candidate.getAttribute('data-choice') === id) {
      await candidate.scrollIntoViewIfNeeded();
      await candidate.click();
      return;
    }
  }
  throw new Error(`Visible choice ${id} was not found.`);
}

async function phase(page: PageLike): Promise<string | null> { return page.locator('[data-run-phase]').getAttribute('data-run-phase'); }
async function sceneId(page: PageLike): Promise<string | null> { return page.locator('[data-scene-id]').getAttribute('data-scene-id'); }
async function saved(page:PageLike):Promise<string|null> {return page.evaluate(()=>localStorage.getItem('20260831-010324-village-south-text-v1:romance:v1'));}
function assert(check:boolean,message:string):asserts check {if(!check)throw new Error(message);}
async function recordScreenshot(page:PageLike,path:string){await page.screenshot({path,fullPage:true});return {path:relativePath(path),sha256:sha256(await readFile(path))};}
async function displayed(page: PageLike): Promise<string> { return page.locator('body').innerText(); }

async function waitForRuntime(page: PageLike): Promise<void> {
  await page.waitForSelector('[data-run-phase]', { state: 'attached', timeout: 10_000 });
  await page.waitForSelector('[data-scene-id]', { state: 'attached', timeout: 10_000 });
}

async function replayNaturalPath(page: PageLike, url: string, path: PathCase, viewport: typeof VIEWPORTS[number], engineName: string, screenshotDir: string, errors: string[]): Promise<Record<string, Json>> {
  await page.goto(url, { waitUntil: 'networkidle' });
  await waitForRuntime(page);
  const scenes: Array<Record<string, Json>> = [];
  const screenshots: Array<{path:string;sha256:string}>=[];
  let choiceIndex = 0;
  for (let guard = 0; guard < 256; guard += 1) {
    const currentPhase = await phase(page);
    const currentScene = await sceneId(page);
    scenes.push({ phase: currentPhase, sceneId: currentScene, text: await displayed(page) });
    if (currentPhase === 'ending') break;
    if (currentPhase === 'decision') {
      const choice = path.choices[choiceIndex];
      if (!choice) throw new Error(`Path ${pathId(path)} has no choice for scene ${currentScene ?? '<unknown>'}.`);
      const body = await displayed(page);
      if (body.includes('村口向南') || body.includes('家况签') || body.includes('纪念物')) throw new Error(`Legacy rural text rendered in romance path ${pathId(path)}.`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth || document.body.scrollWidth > window.innerWidth);
      if (overflow) throw new Error(`Horizontal overflow at ${viewport.width}x${viewport.height}.`);
      await clickChoice(page, choice);
      choiceIndex += 1;
    } else if (currentPhase === 'prologue' || currentPhase === 'response') {
      const continueButton = page.locator('[data-action="continue"]');
      if (await continueButton.count() === 0) throw new Error(`No continue action in ${currentPhase} scene ${currentScene ?? '<unknown>'}.`);
      await continueButton.nth(0).click();
    } else {
      throw new Error(`Unknown runtime phase ${currentPhase ?? '<missing>'}.`);
    }
  }
  const ending = await page.locator('[data-ending-id]').getAttribute('data-ending-id');
  if (ending !== path.expectedEndingId) throw new Error(`Expected ending ${path.expectedEndingId}, got ${ending ?? '<none>'}.`);
  if (choiceIndex !== path.choices.length) throw new Error(`Consumed ${choiceIndex}/${path.choices.length} choices.`);
  const fileStem = `${engineName}-${viewport.width}x${viewport.height}-${pathId(path)}`;
  const endingScreenshot = resolve(screenshotDir, `${fileStem}-ending.png`);
  screenshots.push(await recordScreenshot(page,endingScreenshot));
  assert(await phase(page)==='ending','Did not reach terminal phase');
  const beforeRestart = await displayed(page);
  const firstState=JSON.parse((await saved(page))!);
  assert(firstState.endingIds.includes(ending),'Rendered ending missing in collection');
  await page.locator('[data-action=collection]').click();
  assert((await page.locator(`[data-collection-ending="${ending}"]`).innerText()).includes('✓'),'Ending not visibly unlocked');
  await page.locator('[data-action=back]').click();
  const beforeReload=await saved(page);await page.reload();await waitForRuntime(page);
  assert(await saved(page)===beforeReload && await displayed(page)===beforeRestart,'Ending changed on refresh');
  const restart = page.locator('[data-action="restart"]');
  if (await restart.count() === 0) throw new Error('Ending has no restart action.');
  await restart.nth(0).click();
  await waitForRuntime(page);
  assert(JSON.parse((await saved(page))!).loop===2,'Replay failed to start loop two');
  const expected=evaluateRomance(path.choices).memoryIds;
  const found=new Set<string>();
  const secondLoopScenes: Array<Record<string, Json>> = [];
  for (let guard = 0; guard < 128; guard += 1) {
    const loopPhase = await phase(page);
    const loopScene = await sceneId(page);
    const visible=await displayed(page);
    const state=JSON.parse((await saved(page))!);
    for(const id of Object.values(expected)){const memory=ROMANCE_STORY.memoryTemplates.find(m=>m.id===id)!;if(visible.includes(memory.text)){assert(state.choices.length===(memory.characterId==='zhixia'?0:1),'Own memory appears after its decision');found.add(id);}}
    if(state.phase==='response' && state.choices.length===3) assert(ROMANCE_STORY.secondLoop.initiatives.every(event=>visible.includes(event.text)),'Both replay initiatives missing');
    secondLoopScenes.push({ phase: loopPhase, sceneId: loopScene, text: visible });
    if (loopPhase === 'ending') break;
    if (loopPhase === 'decision') {
      if(state.choices.length===0)assert(found.has(expected.zhixia),'Zhixia early memory not visible');
      if(state.choices.length===1)assert(found.has(expected.wenxi),'Wenxi early memory not visible');
      await clickChoice(page,path.choices[state.choices.length]);
    } else if (loopPhase === 'prologue' || loopPhase === 'response') {
      const continueButton = page.locator('[data-action="continue"]');
      if (await continueButton.count() === 0) throw new Error(`Second-loop ${loopPhase} has no continue action.`);
      await continueButton.nth(0).click();
    } else throw new Error(`Unknown second-loop phase ${loopPhase ?? '<missing>'}.`);
  }
  const memoryScreenshot = resolve(screenshotDir, `${fileStem}-second-loop.png`);
  assert(await phase(page)==='ending' && found.size===2,'Replay/memory evidence incomplete');
  screenshots.push(await recordScreenshot(page,memoryScreenshot));
  return { pathId: pathId(path), expectedEndingId: path.expectedEndingId, status:'PASS', actualEndingId: ending, choiceCount: choiceIndex, scenes, secondLoopScenes, endingText: beforeRestart, screenshots, errors };
}

async function supplementalInteractionChecks(page: PageLike, url: string, viewport: typeof VIEWPORTS[number]): Promise<Record<string, Json>[]> {
  const results:Record<string,Json>[]=[];
  const fresh=async()=>{await page.goto(url,{waitUntil:'networkidle'});await waitForRuntime(page);await page.locator('[data-action=continue]').click();};
  const check=async(id:string,run:()=>Promise<unknown>)=>{try{results.push({id,status:'PASS',evidence:await run() as Json});}catch(error){results.push({id,status:'FAIL',evidence:errorText(error)});}};
  await fresh();
  await check('same-position-double-click',async()=>{
    const before=JSON.parse((await saved(page))!);await page.locator('[data-choice]').first().dblclick();
    const after=JSON.parse((await saved(page))!);
    assert(after.phase==='response'&&after.choices.length===before.choices.length+1,'Double-click crossed response into another decision');
    return {beforePhase:before.phase,afterPhase:after.phase,choices:after.choices};
  });
  await check('refresh-response',async()=>{const before=await saved(page),text=await displayed(page);await page.reload();await waitForRuntime(page);assert(before===await saved(page)&&text===await displayed(page),'Response reload changed state/text');return {sameSave:true,sameText:true};});
  await check('held-enter-space',async()=>{
    for(const key of ['Enter',' ']){
      await page.locator('[data-action=continue]').focus();await page.keyboard.down(key);await page.keyboard.down(key);await page.keyboard.up(key);
      const state=JSON.parse((await saved(page))!);assert(state.phase==='decision','Held key crossed into an unchosen decision');
      const before=await saved(page);await page.locator('[data-choice]').first().focus();
      await page.keyboard.down(key);await page.keyboard.down(key);await page.keyboard.up(key);
      const after=JSON.parse((await saved(page))!);assert(after.phase==='response','Held activation crossed response or failed to choose');assert(before!==await saved(page),'Focused keyboard activation did not choose');
    }
    return {viewport,heldInputs:'One activated control per press; native keyboard focus used'};
  });
  await check('history-collection-no-mutation',async()=>{
    for(const action of ['history','collection']){const before=await saved(page);const scene=await sceneId(page);await page.locator(`[data-action=${action}]`).click();await page.locator('[data-action=back]').click();assert(await saved(page)===before&&await sceneId(page)===scene,'Menu triggered story mutation');assert(await page.locator(`[data-action=${action}]`).evaluate(el=>el===document.activeElement),'Return focus not restored');}
    return {menus:['history','collection'],saveUnchanged:true,focusRestored:true};
  });
  await check('reset-cancel-and-confirm',async()=>{
    const before=await saved(page);page.once('dialog',dialog=>void dialog.dismiss());await page.locator('[data-action=reset]').click();assert(await saved(page)===before,'Cancelled reset changed save');
    page.once('dialog',dialog=>void dialog.accept());await page.locator('[data-action=reset]').click();
    const after=JSON.parse((await saved(page))!);assert(after.loop===1&&after.phase==='prologue'&&after.choices.length===0,'Confirmed reset did not create a fresh loop');
    const prior=JSON.parse(before!);assert(JSON.stringify(prior.endingIds)===JSON.stringify(after.endingIds)&&JSON.stringify(prior.readTextIds)===JSON.stringify(after.readTextIds),'Reset lost collections/reads');return {cancelUnchanged:true,confirmedFresh:true,collectionsPreserved:true};
  });
  results.push({id:'real-device-touch-scroll',status:'BLOCKED',evidence:'Phone viewport emulation does not verify WeChat/Douyin/TapTap or physical touch gestures.'});
  results.push({id:'pixel-perceptual-review',status:'BLOCKED',evidence:'Screenshots require independent pixel review; browser automation alone cannot approve readability or emotional effect.'});
  return results;
}

async function runBrowserType(browserType: BrowserTypeLike, engineName: string, url: string, paths: PathCase[], screenshotDir: string, consoleErrors: string[], pageErrors: string[]): Promise<Record<string, Json>> {
  let browser: BrowserLike;
  try { browser = await browserType.launch({ headless: true, timeout:15000 }); }
  catch (error) { return { engine: engineName, status: 'BLOCKED', launchError: errorText(error), naturalInput: true, debugInjection: false }; }
  const viewportResults: Record<string, Json>[] = [];
  try {
    const representatives = [...new Map(paths.map((path) => [path.expectedEndingId, path])).values()];
    for (const viewport of VIEWPORTS) {
      const pathResults:Record<string,Json>[]=[];
      for(const path of representatives){
        const context=await browser.newContext({viewport});const page=await context.newPage();
        page.on('pageerror',error=>pageErrors.push(`${engineName}/${viewport.label}: ${String(error)}`));
        page.on('console',message=>{if(message.type()==='error')consoleErrors.push(`${engineName}/${viewport.label}: ${message.text()}`);});
        try{pathResults.push(await replayNaturalPath(page,url,path,viewport,engineName,screenshotDir,[]));}
        catch(error){pathResults.push({pathId:pathId(path),expectedEndingId:path.expectedEndingId,status:'FAIL',error:errorText(error)});}
        finally{await context.close();}
      }
      const context=await browser.newContext({viewport});const page=await context.newPage();
      let supplemental:Record<string,Json>[]=[];
      try{supplemental=await supplementalInteractionChecks(page,url,viewport);}catch(error){supplemental=[{id:'supplemental',status:'BLOCKED',evidence:errorText(error)}];}finally{await context.close();}
      viewportResults.push({viewport,paths:pathResults,supplemental});
    }
  } finally { await browser.close(); }
  const failed = JSON.stringify(viewportResults).includes('"status":"FAIL"') || consoleErrors.length > 0 || pageErrors.length > 0;
  const blocked=JSON.stringify(viewportResults).includes('"status":"BLOCKED"');
  return { engine: engineName, status: failed ? 'FAIL' : blocked ? 'BLOCKED' : 'PASS', naturalInput: true, debugInjection: false, viewports: viewportResults };
}

export async function runBrowserQa(args = process.argv.slice(2)): Promise<Record<string, Json>> {
  const outputArg = args.indexOf('--out');
  const outputPath = resolve(repoRoot(), outputArg >= 0 && args[outputArg + 1] ? args[outputArg + 1] : 'docs/release-audit/2026-10-08/qa-romance-browser-report.json');
  const screenshotArg = args.indexOf('--screenshots-dir');
  const screenshotDir = resolve(repoRoot(), screenshotArg >= 0 && args[screenshotArg + 1] ? args[screenshotArg + 1] : 'docs/release-audit/2026-10-08/qa-browser-screenshots');
  const workspace = resolve(repoRoot(), `runs/${RUN_ID}/workspace/game`);
  const errors: string[] = [];
  let paths: PathCase[] = [];
  try { paths = (await loadStories()).paths; } catch (error) { errors.push(`story-modules: ${errorText(error)}`); }
  let preview: { url: string; child: ChildProcessWithoutNullStreams | null; output: string } | null = null;
  const protocol = args.includes('--file') ? 'file' : 'http';
  try {
    if(protocol === 'file') {
      const entry=resolve(workspace,'dist/index.html');
      await readFile(entry);
      preview={url:pathToFileURL(entry).href,child:null,output:'Existing Vite file-protocol inline build; no preview server.'};
    } else preview = await startPreview(workspace);
  }
  catch (error) { errors.push(`preview-launch: ${errorText(error)}`); }
  if (!preview || paths.length === 0) {
    const report = { schemaVersion: 1, status: 'BLOCKED', naturalInput: true, debugInjection: false, source: { repository: REPOSITORY, runId: RUN_ID, baseCommit: gitCommit(), sourceHashes: await sourceHashes() }, expectedRepresentatives: [...new Set(paths.map((path) => path.expectedEndingId))], errors, rawLaunchLog: preview?.output ?? '', limitation: 'Browser execution did not reach the real default page; no natural-input PASS is emitted.' } as unknown as Record<string, Json>;
    preview?.child?.kill('SIGTERM');
    await writeJson(outputPath, report);
    process.exitCode = 1;
    return report;
  }
  await mkdir(screenshotDir, { recursive: true });
  const consoleErrors:string[]=[],pageErrors:string[]=[];
  const chromiumResult=await runBrowserType(chromium,'chromium',preview.url,paths,screenshotDir,consoleErrors,pageErrors);
  const webkitResult=await runBrowserType(webkit,'webkit',preview.url,paths,screenshotDir,consoleErrors,pageErrors);
  preview.child?.kill('SIGTERM');
  const browserBlocked = chromiumResult.status === 'BLOCKED' || webkitResult.status === 'BLOCKED';
  const failed = chromiumResult.status === 'FAIL' || webkitResult.status === 'FAIL' || consoleErrors.length > 0 || pageErrors.length > 0;
  const report = {
    schemaVersion: 1,
    status: failed ? 'FAIL' : browserBlocked ? 'BLOCKED' : 'PASS',
    naturalInput: true,
    debugInjection: false,
    source: { repository: REPOSITORY, runId: RUN_ID, baseCommit: gitCommit(), sourceHashes: await sourceHashes() },
    runtimeWiring: { entry: `runs/${RUN_ID}/workspace/game/index.html`, servedDist: `runs/${RUN_ID}/workspace/game/dist` },
    protocol,
    representatives: [...new Map(paths.map((path) => [path.expectedEndingId, pathId(path)])).entries()].map(([endingId, id]) => ({ endingId, pathId: id })),
    engines: { chromium:chromiumResult, webkit:webkitResult },
    consoleErrors,
    pageErrors,
    longestAuthoredScene: getContentCatalog().reduce((longest,scene)=>scene.paragraphs.join('').length>longest.paragraphs.join('').length?scene:longest).id,
    fixtureEngineering: [{ id: 'storage-faults', status: 'SKIP', evidence: 'Storage fault injection is intentionally separate fixture-only engineering evidence and is never counted as natural-input PASS.' }],
    rawLaunchLog: preview.output,
    limitation: 'Natural track uses only real DOM actions and selectors. A browser launch failure is BLOCKED; fixture-only storage checks are never promoted to natural PASS.',
  } as unknown as Record<string, Json>;
  await writeJson(outputPath, report);
  if (report.status !== 'PASS') process.exitCode = 1;
  return report;
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) void runBrowserQa();
