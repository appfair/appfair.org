// Run against a production preview; no checkout is opened or payment submitted.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.SITE_URL || 'http://127.0.0.1:4323';
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {}) });
// These are the donation destinations from the original page, preserved during the redesign.
const destinations = [
  'https://donate.stripe.com/bIYcOD6R7c8lgWA3cj',
  'https://donate.stripe.com/9AQ15Va3j0pD8q4eV0',
  'https://donate.stripe.com/bIY8yna3j1tH35K5kk',
  'https://donate.stripe.com/8wM29ZgrHgoBgWAbIJ',
  'https://donate.stripe.com/8wMeWL0sJa0ddKo28a',
  'https://donate.stripe.com/3cs3e34IZ3BPfSwaEJ',
];
const errors = [];
try {
  for (const colorScheme of ['light', 'dark']) {
    const page = await browser.newPage({ colorScheme });
    page.on('pageerror', error => errors.push(String(error)));
    for (const width of [320, 390, 768, 1280, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.equal((await page.goto(base + '/donate/')).status(), 200);
      assert.equal(await page.locator('main h1').count(), 1);
      assert.equal(await page.locator('.gift-option').count(), 6);
      assert.deepEqual(await page.locator('.gift-option').evaluateAll(nodes => nodes.map(n => n.href)), destinations);
      assert.equal(await page.locator('.patreon-link').getAttribute('href'), 'https://www.patreon.com/appfair');
      const boxes = await page.locator('.gift-option').evaluateAll(nodes => nodes.map(n => ({ width: n.getBoundingClientRect().width, height: n.getBoundingClientRect().height })));
      for (const box of boxes) {
        assert.ok(box.width >= 48 && box.height >= 48, `${width}: small touch target`);
        assert.ok(Math.abs(box.width - boxes[0].width) < 1, `${width}: uneven button widths`);
        assert.ok(Math.abs(box.height - boxes[0].height) < 1, `${width}: uneven button heights`);
      }
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${colorScheme}/${width}: overflow`);
    }
    await page.locator('.gift-option').first().focus();
    for (let i = 0; i < 6; i++) {
      assert.equal(await page.locator('.gift-option').nth(i).evaluate(n => n === document.activeElement), true);
      const focus = await page.locator('.gift-option').nth(i).evaluate(n => ({ style: getComputedStyle(n).outlineStyle, width: parseFloat(getComputedStyle(n).outlineWidth) }));
      assert.notEqual(focus.style, 'none');
      assert.ok(focus.width >= 2);
      await page.keyboard.press('Tab');
    }
    assert.equal(await page.locator('.patreon-link').evaluate(n => n === document.activeElement), true);
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  for (const locale of ['en', 'fr', 'de', 'es', 'pt', 'ja', 'ko', 'zh']) {
    const translations = JSON.parse(await readFile(new URL(`../src/i18n/${locale}.json`, import.meta.url), 'utf8')).donation;
    assert.equal((await page.goto(base + (locale === 'en' ? '' : '/' + locale) + '/donate/')).status(), 200);
    assert.equal(await page.locator('#giving-title').textContent(), translations.panelTitle);
    assert.equal(await page.locator('.gift-custom').textContent(), translations.customAmount);
    assert.equal(await page.locator('main h1').count(), 1);
    assert.equal(await page.locator('.gift-option').count(), 6);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${locale}: overflow`);
  }
  assert.deepEqual(errors, []);
  console.log('PASS: equal donation buttons, preserved payment links, keyboard focus, light/dark responsive layouts, eight languages and no-JavaScript support');
} finally { await browser.close(); }
