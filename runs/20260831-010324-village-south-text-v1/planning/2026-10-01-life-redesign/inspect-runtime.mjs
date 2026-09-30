import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));
const captureDirectory = path.join(directory, 'runtime-evidence');
await fs.mkdir(captureDirectory, { recursive: true });
const browser = await chromium.launch({ headless: true });
const report = {
  schemaVersion: 1, targetGame: '村口向南',
  runId: '20260831-010324-village-south-text-v1',
  workspace: '/Users/kker/Documents/ChatGPT/妖怪夜市/runs/20260831-010324-village-south-text-v1/workspace',
  source: 'http://127.0.0.1:4187', mode: 'fresh-browser-normal-input-only',
  limitation: 'Automated natural-input diagnostic, not human playtesting or a release/perceptual pass.',
  generatedAt: new Date().toISOString(), journeys: [],
};
try {
  for (const spec of [
    { label: 'small-first', width: 360, height: 800, pickLast: false, rounds: 2 },
    { label: 'standard-last', width: 390, height: 844, pickLast: true, rounds: 2 },
    { label: 'landscape', width: 844, height: 390, pickLast: false, rounds: 1 },
  ]) {
    const context = await browser.newContext({ viewport: { width: spec.width, height: spec.height }, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    const journey = { ...spec, errors: [], roundsObserved: [], screenshots: [] };
    page.on('pageerror', error => journey.errors.push(error.message));
    await page.goto(report.source, { waitUntil: 'networkidle' });
    for (let round = 1; round <= spec.rounds; round += 1) {
      const run = { round, screens: [], choices: [], terminalReached: false };
      for (let step = 0; step < 70; step += 1) {
        const text = await page.locator('body').innerText();
        const headings = await page.locator('h2').allTextContents();
        const stage = await page.locator('[data-action=restart]').count() ? 'settlement'
          : await page.locator('[data-action=reveal-family]').count() ? 'family'
          : await page.locator('[data-keepsake]').count() ? 'keepsake'
          : await page.locator('[data-choice]').count() ? 'choice' : 'result';
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
        run.screens.push({ step, stage, headings, text, horizontalOverflow: overflow });
        if ((round === 1 && (step === 0 || (stage === 'choice' && run.choices.length === 0))) || stage === 'settlement') {
          const filename = `${spec.label}-round-${round}-${stage}.png`;
          await page.screenshot({ path: path.join(captureDirectory, filename), fullPage: true });
          journey.screenshots.push(filename);
        }
        if (stage === 'settlement') { run.terminalReached = true; break; }
        let buttons;
        if (stage === 'family') buttons = page.locator('[data-action=reveal-family]');
        else if (stage === 'keepsake') buttons = page.locator('[data-keepsake]');
        else if (stage === 'choice') {
          buttons = page.locator('[data-choice]:not([disabled])');
          run.choices.push({ headings, options: await page.locator('[data-choice]').evaluateAll(nodes => nodes.map(node => ({ id: node.dataset.choice, text: node.textContent, disabled: node.disabled }))) });
        } else buttons = page.locator('[data-action=continue]');
        if (!(await buttons.count())) { run.blocked = `No normal action at ${stage}`; break; }
        const selected = spec.pickLast ? buttons.last() : buttons.first();
        run.screens.at(-1).clicked = await selected.innerText();
        if (stage === 'choice') run.choices.at(-1).selected = await selected.getAttribute('data-choice');
        await selected.click();
      }
      journey.roundsObserved.push(run);
      if (!run.terminalReached) break;
      if (round < spec.rounds) {
        const inheritance = page.locator('[data-inheritance]');
        if (await inheritance.count()) await inheritance.first().click();
        await page.locator('[data-action=restart]').click();
      }
    }
    report.journeys.push(journey);
    await context.close();
  }
} finally {
  await browser.close();
  await fs.writeFile(path.join(directory, 'runtime-observations.json'), `${JSON.stringify(report, null, 2)}\n`);
}
console.log(JSON.stringify(report.journeys.map(j => ({ viewport: `${j.width}x${j.height}`, errors: j.errors, rounds: j.roundsObserved.map(r => ({ round: r.round, terminalReached: r.terminalReached, choices: r.choices.length, eventTitles: r.choices.map(c => c.headings), horizontalOverflow: r.screens.some(s => s.horizontalOverflow), ending: r.screens.at(-1)?.headings })) })), null, 2));
