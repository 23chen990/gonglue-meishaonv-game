import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium, type Browser, type Page } from '@playwright/test';

// Legacy Village South test ONLY. The r4.1 default game does not expose this API.
// The unknown bridge keeps this archived test type-checkable without declaring a
// runtime Window global that would falsely promise __NARRATIVE_TEST__ exists.
interface NarrativeApi {
  reset(): unknown;
  revealFamilyCondition(): unknown;
  selectKeepsake(id: string): unknown;
  choose(id: string): unknown;
  getState(): { screen: string; completedChoices: number; eventIndex: number; stats: Record<string, number> };
}

interface Check {
  name: string;
  passed: boolean;
  evidence: string;
}

const workspace = path.resolve(import.meta.dirname, '..');
const runRoot = path.resolve(workspace, '../..');
const screenshotDirectory = path.join(runRoot, 'screenshots');
const logDirectory = path.join(runRoot, 'logs');

async function startPreview(): Promise<{ url: string; stop: () => void }> {
  const child = spawn(path.resolve(workspace, '../../../../node_modules/.bin/vite'), ['preview', '--host', '127.0.0.1', '--port', '0'], {
    cwd: workspace,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const url = await new Promise<string>((resolve, reject) => {
    let output = '';
    const onData = (value: Buffer) => {
      output += value.toString();
      const match = output.match(/http:\/\/127\.0\.0\.1:(\d+)\//);
      if (match) resolve(match[0]);
    };
    child.stdout.on('data', onData);
    child.stderr.on('data', onData);
    child.on('exit', (code) => reject(new Error(`preview exited (${code}): ${output}`)));
    setTimeout(() => reject(new Error(`preview timeout: ${output}`)), 15_000);
  });
  return { url, stop: () => child.kill('SIGTERM') };
}

async function choiceLayout(page: Page, width: number, height: number) {
  return page.locator('[data-choice]:visible').evaluateAll((elements, viewport) => elements.map((element) => {
    const box = element.getBoundingClientRect();
    return {
      label: (element.textContent ?? '').trim().replace(/\s+/g, ' '),
      x: box.x,
      y: box.y,
      width: box.width,
      height: box.height,
      inside: box.x >= 0 && box.y >= 0 && box.right <= viewport.width && box.bottom <= viewport.height,
      touchTarget: box.width >= 44 && box.height >= 44,
    };
  }), { width, height });
}

async function main() {
  await mkdir(screenshotDirectory, { recursive: true });
  await mkdir(logDirectory, { recursive: true });
  const preview = await startPreview();
  let browser: Browser | undefined;
  const consoleLines: string[] = [];
  const checks: Check[] = [];
  const issues: Array<{ id: string; severity: 'error'; message: string; evidence: string }> = [];
  const screenshots: string[] = [];
  try {
    browser = await chromium.launch({ headless: true });
    for (const viewport of [{ width: 360, height: 800 }, { width: 390, height: 844 }, { width: 430, height: 932 }]) {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      page.on('console', (message) => {
        consoleLines.push(`[${viewport.width}x${viewport.height}:${message.type()}] ${message.text()}`);
        if (message.type() === 'error') issues.push({ id: `console-${issues.length + 1}`, severity: 'error', message: message.text(), evidence: 'logs/mobile-console.log' });
      });
      page.on('pageerror', (error) => issues.push({ id: `page-${issues.length + 1}`, severity: 'error', message: error.message, evidence: 'logs/mobile-console.log' }));
      await page.goto(preview.url, { waitUntil: 'networkidle' });
      await page.waitForFunction(() => Boolean((window as Window & { __NARRATIVE_TEST__?: unknown }).__NARRATIVE_TEST__));
      await page.evaluate(() => {
        const api = (window as unknown as Window & { __NARRATIVE_TEST__: NarrativeApi }).__NARRATIVE_TEST__;
        api.reset();
        api.revealFamilyCondition();
        api.selectKeepsake('keepsake_book');
      });
      const layout = await choiceLayout(page, viewport.width, viewport.height);
      const passed = layout.length === 2 && layout.every((item) => item.inside && item.touchTarget);
      checks.push({ name: `mobile-choice-layout-${viewport.width}x${viewport.height}`, passed, evidence: JSON.stringify(layout) });
      if (!passed) issues.push({ id: `layout-${viewport.width}`, severity: 'error', message: `Choices do not fit ${viewport.width}x${viewport.height}`, evidence: JSON.stringify(layout) });
      const relativeScreenshot = `screenshots/chapter-one-${viewport.width}x${viewport.height}.png`;
      await page.screenshot({ path: path.join(runRoot, relativeScreenshot) });
      screenshots.push(relativeScreenshot);

      if (viewport.width === 390) {
        const before = await page.evaluate(() => (window as unknown as Window & { __NARRATIVE_TEST__: NarrativeApi }).__NARRATIVE_TEST__.getState());
        await page.evaluate(() => (window as unknown as Window & { __NARRATIVE_TEST__: NarrativeApi }).__NARRATIVE_TEST__.choose('event_01_choice_a'));
        const afterChoice = await page.evaluate(() => (window as unknown as Window & { __NARRATIVE_TEST__: NarrativeApi }).__NARRATIVE_TEST__.getState());
        await page.reload({ waitUntil: 'networkidle' });
        const afterReload = await page.evaluate(() => (window as unknown as Window & { __NARRATIVE_TEST__: NarrativeApi }).__NARRATIVE_TEST__.getState());
        const recoveryPassed = afterChoice.stats.skill === before.stats.skill + 2
          && afterChoice.screen === 'result'
          && afterChoice.completedChoices === 1
          && JSON.stringify(afterChoice) === JSON.stringify(afterReload);
        checks.push({ name: 'refresh-save-recovery', passed: recoveryPassed, evidence: JSON.stringify({ before, afterChoice, afterReload }) });
        if (!recoveryPassed) issues.push({ id: 'refresh-save-recovery', severity: 'error', message: 'Versioned save did not restore the exact post-choice result.', evidence: '390x844 Chromium reload' });
      }
      await context.close();
    }
  } finally {
    await browser?.close();
    preview.stop();
  }
  const report = {
    schemaVersion: 1,
    passed: issues.length === 0 && checks.every((check) => check.passed),
    checks,
    issues,
    screenshots,
    consoleLog: 'logs/mobile-console.log',
    testedAt: new Date().toISOString(),
  };
  await writeFile(path.join(logDirectory, 'mobile-console.log'), `${consoleLines.join('\n')}\n`);
  console.log(`MOBILE_QA_JSON=${JSON.stringify(report)}`);
  if (!report.passed) process.exitCode = 1;
}

void main();
