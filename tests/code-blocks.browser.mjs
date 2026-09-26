import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const engines = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await engines[process.env.BROWSER || 'chromium'].launch({headless: true});
const base = process.env.SITE_URL || 'http://127.0.0.1:4323';
try {
  const page = await browser.newPage({viewport: {width: 1440, height: 1000}});
  await page.route('https://api.github.com/users/*', route => route.fulfill({status: 404, body: '{}'}));
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  await page.addInitScript(() => {
    window.copyMode = 'success';
    window.copiedText = [];
    Object.defineProperty(navigator, 'clipboard', {configurable: true, value: {
      writeText: async text => {
        if (window.copyMode === 'failure') throw new Error('Clipboard denied');
        if (window.copyMode === 'pending') await new Promise(resolve => { window.finishCopy = resolve; });
        window.copiedText.push(text);
      }
    }});
  });
  await page.goto(`${base}/docs/getting-started/`);
  await page.locator('#submission-guide[data-ready=true]').waitFor();
  await page.locator('[name=token]').fill('Copy-Test');
  const block = page.locator('#step-create .code-block');
  const button = block.locator('button');
  await button.waitFor();
  const expected = await block.locator('code').textContent();
  await page.evaluate(() => { window.copyMode = 'pending'; });
  await button.click();
  assert.equal(await button.isDisabled(), true);
  assert.equal(await button.getAttribute('data-copied'), null);
  assert.equal(await block.locator('[role=status]').textContent(), '');
  await page.evaluate(() => window.finishCopy());
  await page.waitForFunction(() => document.querySelector('#step-create button').dataset.copied === 'true');
  assert.equal(await block.locator('.copied-icon').isVisible(), true);
  assert.equal(await block.locator('.copy-icon').isVisible(), false);
  assert.equal(await block.locator('[role=status]').textContent(), 'Copied');
  assert.equal(await page.evaluate(() => window.copiedText.at(-1)), expected);
  await page.screenshot({path: '/private/tmp/appfair-code-copied.png'});
  await page.evaluate(() => { window.copyMode = 'success'; });
  await button.focus();
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => window.copiedText.length === 2);
  await page.waitForFunction(() => !document.querySelector('#step-create button').hasAttribute('data-copied'));
  assert.equal(await block.locator('[role=status]').textContent(), '');
  assert.equal(await button.getAttribute('aria-label'), 'Copy commands for Create the app');
  await page.evaluate(() => { window.copyMode = 'failure'; });
  await button.click();
  await page.waitForFunction(() => document.querySelector('#step-create [role=status]').textContent.includes('unavailable'));
  assert.equal(await button.getAttribute('data-copied'), null);
  assert.equal(await page.evaluate(() => getSelection().toString()), expected);
  assert.equal(await page.evaluate(() => window.copiedText.length), 2);

  // Markdown fences use the same template, retaining highlighting and exact code text.
  await page.goto(`${base}/docs/releases/`);
  const markdown = page.locator('.code-block').first();
  await markdown.locator('button').waitFor();
  assert.ok(await markdown.locator('code span').count() > 0);
  const markdownText = await markdown.locator('code').textContent();
  await markdown.locator('button').click();
  await page.waitForFunction(() => document.querySelector('.code-block button').dataset.copied === 'true');
  assert.equal(await page.evaluate(() => window.copiedText.at(-1)), markdownText);
  for (const width of [1440, 390]) {
    await page.setViewportSize({width, height: 1000});
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    assert.equal(await page.locator('.code-block').evaluateAll(blocks => blocks.every(block => {
      const pre = block.querySelector('pre'), button = block.querySelector('button');
      return pre.getBoundingClientRect().right <= button.getBoundingClientRect().left && parseFloat(getComputedStyle(pre).paddingTop) === 14;
    })), true);
  }
  const noJS = await browser.newContext({javaScriptEnabled: false});
  const staticPage = await noJS.newPage();
  await staticPage.goto(`${base}/docs/getting-started/`);
  assert.equal(await staticPage.locator('.copy-command').count(), 0);
  assert.equal(await staticPage.locator('#step-create pre code').isVisible(), true);
  await noJS.close();
  assert.deepEqual(errors, []);
  console.log('PASS: pending/success/reset/failure feedback, keyboard copy, current generated text, Markdown highlighting, responsive gutter and no-JS');
} finally { await browser.close(); }
