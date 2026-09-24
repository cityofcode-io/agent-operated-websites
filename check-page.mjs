import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const [url, name = 'page', dir = 'reports'] = process.argv.slice(2);
if (!url) throw new Error('Usage: node check-page.mjs <url> [name] [report-directory]');
const origin = new URL(url).origin;
await mkdir(dir, { recursive: true });
const browser = await chromium.launch();
let failed = false;
try {
  for (const width of [390, 1440]) {
    // @axe-core/playwright refuses a page from browser.newPage(); it needs its own context.
    const context = await browser.newContext({ viewport: { width, height: 844 } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('requestfailed', request => errors.push(`Request failed: ${request.url()}`));
    page.on('response', response => {
      if (response.status() < 400) return;
      const party = new URL(response.url()).origin === origin ? 'own' : 'third-party';
      errors.push(`HTTP ${response.status()} (${party}): ${response.url()}`);
    });
    const response = await page.goto(url, { waitUntil: 'load' });
    if (!response || !response.ok()) errors.push('Page did not load successfully');
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth);
    if (overflow) errors.push(`Horizontal overflow at ${width}px`);
    const { violations, incomplete, testEngine } = await new AxeBuilder({ page })
      // axe ships the WCAG 2.2 target-size rule disabled.
      .options({ rules: { 'target-size': { enabled: true } } })
      .analyze();
    await page.screenshot({ path: `${dir}/${name}-${width}-first-viewport.png` });
    await writeFile(`${dir}/${name}-${width}-browser.json`, JSON.stringify({
      url: page.url(), width, axe: testEngine.version, errors, violations, incomplete
    }, null, 2));
    console.log(`${name} ${width}px: ${errors.length} errors, ${violations.length} axe violations, ${incomplete.length} needing review`);
    if (errors.length || violations.length) failed = true;
    await context.close();
  }
} finally {
  await browser.close();
}
if (failed) process.exitCode = 1;
