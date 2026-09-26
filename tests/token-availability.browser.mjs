import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const engines = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await engines[process.env.BROWSER || 'chromium'].launch({headless: true});
const base = process.env.SITE_URL || 'http://127.0.0.1:4323';
try {
  const page = await browser.newPage({viewport: {width: 1440, height: 1000}});
  const requests = [], errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  let slow;
  await page.route('https://api.github.com/users/*', async route => {
    const token = new URL(route.request().url()).pathname.split('/').at(-1);
    requests.push(token);
    assert.equal(route.request().headers().authorization, undefined);
    assert.equal(route.request().headers().cookie, undefined);
    if (token === 'slow-token') { slow = route; return; }
    if (token === 'offline-token') { await route.abort(); return; }
    const status = token === 'limited-token' ? 429 : token === 'server-error' ? 503 : ['taken-user', 'taken-org'].includes(token) ? 200 : 404;
    await route.fulfill({status, contentType: 'application/json', headers: {'retry-after': '60'}, body: JSON.stringify(status === 200 ? {type: token === 'taken-org' ? 'Organization' : 'User'} : {message: 'Not found'})});
  });
  await page.goto(`${base}/docs/getting-started/`);
  assert.equal(await page.locator('h1').textContent(), 'Create an App Fair app');
  const input = page.locator('#app-token'), indicator = page.locator('#token-availability');
  const state = expected => page.waitForFunction(expected => document.querySelector('#token-availability').dataset.state === expected, expected);
  await state('available');
  assert.equal(await indicator.isVisible(), true);
  assert.match(await indicator.getAttribute('title'), /appears available/);
  const initialCount = requests.length;
  await input.fill('Typing-A'); await input.fill('Typing-B'); await input.fill('Typing-Final');
  await state('checking');
  await state('available');
  assert.deepEqual(requests.slice(initialCount), ['typing-final']);
  await input.fill('Taken-User'); await state('taken');
  await input.fill('Taken-Org'); await state('taken');
  assert.match(await indicator.textContent(), /already taken/);
  const beforeCache = requests.length;
  await input.fill('TYPING-FINAL'); await state('available');
  await page.locator('[name=title]').fill('Another name');
  await page.getByRole('radio', {name: 'Windows', exact: true}).check();
  await page.waitForTimeout(700);
  assert.equal(requests.length, beforeCache);
  await input.fill('bad;token'); await state('idle');
  await page.waitForTimeout(700);
  assert.equal(requests.length, beforeCache);
  await input.fill('Slow-Token');
  await page.waitForFunction(() => document.querySelector('#token-availability').dataset.state === 'checking');
  while (!slow) await page.waitForTimeout(50);
  await input.fill('Latest-Token');
  await state('available');
  await slow.fulfill({status: 200, body: '{}'}).catch(() => {});
  await page.waitForTimeout(100);
  assert.equal(await indicator.getAttribute('data-state'), 'available');
  assert.match(await indicator.textContent(), /Latest-Token/);
  await input.fill('Offline-Token'); await state('unknown');
  assert.match(await indicator.textContent(), /connection/);
  await input.fill('Server-Error'); await state('unknown');
  assert.match(await indicator.textContent(), /could not confirm/);
  await input.fill('Fresh-Token'); await state('available');
  await page.locator('#checklist-shuffle').click(); await state('available');
  assert.equal(requests.at(-1), (await input.inputValue()).toLowerCase());
  await page.reload(); await state('available');
  assert.equal(requests.at(-1), (await input.inputValue()).toLowerCase());
  for (const width of [1440, 390]) {
    await page.setViewportSize({width, height: 1000});
    await input.scrollIntoViewIfNeeded();
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    const fieldBox = await input.boundingBox(), statusBox = await indicator.boundingBox();
    assert.ok(fieldBox.x + fieldBox.width <= statusBox.x);
    assert.ok(statusBox.x + statusBox.width <= width);
    await page.screenshot({path: `/private/tmp/appfair-token-${width}.png`});
  }
  await input.fill('Limited-Token'); await state('unknown');
  assert.match(await indicator.textContent(), /request limit/);
  const limitedCount = requests.length;
  await input.fill('Another-Fresh-Token'); await state('unknown');
  await page.waitForTimeout(700);
  assert.equal(requests.length, limitedCount);
  // Availability is advisory: even an unknown/taken name leaves valid commands accessible.
  assert.equal(await page.locator('#step-create pre').isVisible(), true);
  assert.deepEqual(errors, []);
  console.log('PASS: title, user/org conflicts, 404, debounce/cache, invalid input, stale requests, network/server/rate-limit failures, shuffle/reload and mobile layout');
} finally { await browser.close(); }
