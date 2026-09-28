import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import * as methods from '../src/lib/release-methods.mjs';
const require = createRequire(import.meta.url);
const engines = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await engines[process.env.BROWSER || 'chromium'].launch({ headless: true });
const base = process.env.SITE_URL || 'http://127.0.0.1:4323';
try {
  for (const group of Object.values(methods)) for (const method of group) {
    if (!method.command) continue;
    assert.equal(spawnSync('bash', ['-n'], { input: method.command }).status, 0);
    if (method.id === 'web') assert.doesNotMatch(method.command, /\bgh /);
  }
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await context.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { value: { writeText: async text => { window.copiedText = text; } } }));
  const page = await context.newPage(), errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  await page.goto(`${base}/docs/releases/`);
  assert.equal(await page.getByRole('tablist').count(), 5);
  for (const root of await page.locator('[data-instruction-tabs]').all()) {
    const gh = root.getByRole('tab', { name: 'GitHub CLI', exact: true });
    const web = root.getByRole('tab', { name: 'GitHub website', exact: true });
    assert.equal(await gh.getAttribute('aria-selected'), 'true');
    await gh.focus(); await page.keyboard.press('ArrowRight');
    assert.equal(await web.getAttribute('aria-selected'), 'true');
    const panel = root.locator('[data-method=web]');
    assert.equal(await panel.isVisible(), true);
    assert.equal(await panel.locator('pre code').filter({ hasText: /^\s*$/ }).count(), 0);
    assert.doesNotMatch(await panel.innerText(), /\bgh (run|pr|release|repo|api)\b/);
  }
  for (const code of await page.locator('pre code').all()) {
    if (/\bgh (run|pr|release|repo|api)\b/.test(await code.textContent())) {
      assert.equal(await code.evaluate(n => Boolean(n.closest('[data-method=gh]'))), true);
    }
  }
  await page.goto(`${base}/docs/releases/#first-submission-method-web`);
  assert.equal(await page.locator('#first-submission-tab-web').getAttribute('aria-selected'), 'true');
  await page.locator('#first-submission-tab-gh').click();
  await page.locator('#first-submission-method-gh .copy-command').click();
  assert.equal(await page.evaluate(() => window.copiedText), methods.firstSubmissionMethods[0].command);
  await page.locator('#release-assets-tab-web').click();
  await page.locator('#release-assets-method-web').scrollIntoViewIfNeeded();
  await page.screenshot({ path: '/private/tmp/appfair-release-methods.png' });
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  await page.emulateMedia({ media: 'print' });
  for (const panel of await page.locator('.method-panel').all()) assert.equal(await panel.isVisible(), true);
  const nojs = await browser.newContext({ javaScriptEnabled: false });
  const fallback = await nojs.newPage();
  await fallback.goto(`${base}/docs/releases/`);
  for (const panel of await fallback.locator('.method-panel').all()) assert.equal(await panel.isVisible(), true);
  assert.deepEqual(errors, []);
  console.log('PASS: release methods, shell syntax, CLI/browser separation, keyboard tabs, deep links, copy, mobile, print and no-JS');
} finally { await browser.close(); }
