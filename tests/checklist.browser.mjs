// Optional browser regression test. Start `npm run preview -- --port 4323` first.
// Set PLAYWRIGHT_MODULE to an installed Playwright package path, or install it locally.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.SITE_URL || 'http://127.0.0.1:4323';
const browser = await chromium.launch({ headless: true });
const errors = [];
const readNames = async p => ({ token: await p.locator('[name=token]').inputValue(), title: await p.locator('[name=title]').inputValue() });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await context.route('https://api.github.com/users/*', route => route.fulfill({status: 404, body: '{}'}));
  const page = await context.newPage();
  page.on('pageerror', e => errors.push(String(e)));
  await page.goto(`${base}/docs/checklist/`);
  assert.equal(await page.locator('#submission-form input:not([type=radio])').count(), 2);
  assert.equal(await page.locator('#submission-form select').count(), 0);
  assert.equal(await page.getByRole('group', { name: 'Development Computer' }).getByRole('radio').count(), 3);
  assert.equal(await page.locator('#step-prerequisites .step-index').textContent(), '00');
  assert.equal(await page.getByText('Your app, your commands').count(), 0);
  assert.equal(await page.getByRole('button', { name: 'Update checklist' }).count(), 0);
  assert.deepEqual(await page.locator('#step-token .step-operations a').allTextContents(), ['Create the organization', 'Install the App Fair Publisher']);
  assert.equal(await page.locator('#step-token .step-links a').count(), 1);
  assert.ok((await page.locator('#step-prerequisites .step-links').textContent()).includes('Host requirements'));
  assert.equal(await page.locator('#step-token .step-operations').evaluate(n => getComputedStyle(n).listStyleType), 'disc');
  const linkSizes = await page.locator('#step-token').evaluate(n => [n.querySelector('.step-operations a'), n.querySelector('.step-links a')].map(a => parseFloat(getComputedStyle(a).fontSize)));
  assert.ok(linkSizes[0] > linkSizes[1]);
  assert.ok(!(await page.locator('#checklist-steps').textContent()).includes('↗'));
  const initial = await readNames(page);
  assert.match(initial.token, /^[A-Z][a-z]+-[A-Z][a-z]+$/);
  assert.equal(initial.title, initial.token.replace('-', ' '));
  await page.reload();
  assert.deepEqual(await readNames(page), initial);
  await page.locator('#checklist-shuffle').click();
  const shuffled = await readNames(page);
  assert.notEqual(shuffled.token, initial.token);
  assert.equal(shuffled.title, shuffled.token.replace('-', ' '));
  await page.getByRole('radio', { name: 'Windows', exact: true }).check();
  const xcode = page.locator('[data-installation=xcode] a');
  assert.equal(await xcode.getAttribute('href'), null);
  assert.equal(await xcode.getAttribute('aria-disabled'), 'true');
  assert.equal(await xcode.getAttribute('tabindex'), '-1');
  assert.equal(await page.locator('.ios-note').count(), 0);
  assert.equal(await page.locator('[data-installation=git] a').getAttribute('href'), 'https://gitforwindows.org/');
  assert.match(await page.locator('[data-installation=git]').textContent(), /Git Bash/);
  assert.equal(await page.locator('[data-installation=desktop]').isVisible(), true);
  // Arrow keys change the radio selection and refresh the generated commands.
  await page.getByRole('radio', { name: 'Windows', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.getByRole('radio', { name: 'Linux', exact: true }).isChecked(), true);
  assert.match(await page.locator('#step-local .step-content > .code-block pre').textContent(), /^day launch$/m);
  assert.equal(await xcode.getAttribute('href'), null);
  await page.getByRole('radio', { name: 'Windows', exact: true }).check();
  await page.screenshot({ path: '/private/tmp/appfair-checklist-windows.png', fullPage: true });
  assert.match(await page.locator('#step-local .step-content > .code-block pre').textContent(), /^day launch$/m);
  assert.match(await page.locator('#step-submit pre').textContent(), /Scripts\/python.exe/);
  await page.locator('[name=token]').fill('Review-App');
  await page.locator('[name=title]').fill("Reviewer's Notes");
  assert.match(await page.locator('#step-create pre').first().textContent(), /Review-App/);
  assert.equal(await page.locator('#step-pages a').first().getAttribute('href'), 'https://github.com/Review-App/Review-App/settings/pages');
  assert.equal(await page.locator('input[type=checkbox], #checklist-steps details').count(), 0);
  assert.equal(await page.locator('#checklist-meter, #checklist-progress').count(), 0);
  assert.equal(await page.locator('.check-step').count(), 11);
  await page.reload();
  assert.equal(await page.locator('[name=token]').inputValue(), 'Review-App');
  await page.locator('[name=token]').fill('bad;command');
  assert.equal(await page.locator('[name=token]').getAttribute('aria-invalid'), 'true');
  assert.equal(await page.locator('#checklist-steps').isVisible(), false);
  await page.reload();
  assert.equal(await page.locator('[name=token]').inputValue(), 'Review-App');
  assert.equal(await page.getByRole('radio', { name: 'Windows', exact: true }).isChecked(), true);
  await page.getByRole('radio', { name: 'macOS', exact: true }).check();
  assert.equal(await xcode.getAttribute('href'), 'https://developer.apple.com/xcode/');
  assert.equal(await xcode.getAttribute('aria-disabled'), null);
  assert.equal(await page.locator('[data-installation=git] a').getAttribute('href'), 'https://git-scm.com/downloads');
  assert.equal(await page.locator('[data-installation=desktop]').isVisible(), false);
  assert.match(await page.locator('#step-local .step-content > .code-block pre').textContent(), /^day launch$/m);
  await page.locator('[name=title]').fill("Another App");
  await page.reload();
  assert.equal(await page.locator('[name=title]').inputValue(), 'Another App');
  await page.goto(`${base}/docs/checklist/#step-submit`);
  assert.equal(await page.getByRole('button', { name: 'Reset', exact: true }).count(), 0);

  // Site search must index all six guides, not just browser-generated checklist text.
  await page.goto(`${base}/docs/`);
  const indexed = await page.evaluate(async () => {
    const search = await import('/pagefind/pagefind.js');
    const result = await search.search('App Fair');
    const data = await Promise.all(result.results.map(r => r.data()));
    return data.map(d => new URL(d.url, location.origin).pathname.replace(/\/$/, ''));
  });
  for (const route of ['/docs', '/docs/checklist', '/docs/getting-started', '/docs/releases', '/docs/troubleshooting', '/docs/inclusion-criteria']) assert.ok(indexed.includes(route), `${route} missing from search`);
  await page.locator('[data-search-open]').click();
  await page.locator('.pagefind-ui__search-input').fill('token');
  await page.locator('.pagefind-ui__result-link').first().waitFor();
  assert.ok((await page.locator('.pagefind-ui__result-link').count()) > 0);
  await page.keyboard.press('Escape');
  await page.screenshot({ path: '/private/tmp/appfair-docs-overview.png', fullPage: true });
  await page.evaluate(() => localStorage.setItem('appfair-theme', 'dark'));
  await page.reload();
  await page.screenshot({ path: '/private/tmp/appfair-docs-dark.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ['/docs/', '/docs/getting-started/', '/docs/checklist/']) {
    await page.goto(base + path);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${path} overflows mobile viewport`);
  }
  await page.screenshot({ path: '/private/tmp/appfair-docs-mobile.png', fullPage: true });
  for (const [userAgent, expected] of [
    ['Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'windows'],
    ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 'macos'],
    ['Mozilla/5.0 (X11; Linux x86_64)', 'linux'],
    ['Mozilla/5.0 (Linux; Android 16; Pixel 9)', 'windows'],
    ['Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)', 'macos'],
    ['Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X)', 'macos'],
    ['Unknown Browser', 'linux'],
  ]) {
    const detected = await browser.newContext({ userAgent });
    await detected.route('https://api.github.com/users/*', route => route.fulfill({status: 404, body: '{}'}));
    const p = await detected.newPage();
    p.on('pageerror', e => errors.push(String(e)));
    await p.goto(`${base}/docs/checklist/`);
    assert.equal(await p.locator('[name=host]:checked').inputValue(), expected, userAgent);
    const override = expected === 'windows' ? 'macos' : 'windows';
    await p.locator(`[name=host][value=${override}]`).check();
    await p.reload();
    assert.equal(await p.locator('[name=host]:checked').inputValue(), override);
    await detected.close();
  }
  const blocked = await browser.newContext();
  await blocked.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage disabled'); } }));
  await blocked.route('https://api.github.com/users/*', route => route.fulfill({status: 404, body: '{}'}));
  const blockedPage = await blocked.newPage();
  blockedPage.on('pageerror', e => errors.push(String(e)));
  await blockedPage.goto(`${base}/docs/checklist/`);
  await blockedPage.locator('#checklist-shuffle').click();
  assert.match(await blockedPage.locator('#storage-note').textContent(), /unavailable/);
  await blocked.close();
  const noJS = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJS.newPage();
  await staticPage.goto(`${base}/docs/checklist/`);
  assert.equal(await staticPage.locator('.check-step').count(), 11);
  assert.match(await staticPage.locator('noscript').textContent(), /JavaScript is off/);
  await noJS.close();
  assert.deepEqual(errors, []);
  console.log('PASS: random suggestions, shuffle, live edits, segmented host picker, UA detection, prerequisites, host-specific commands, validation, saved app details, anchors, Pagefind, search UI, mobile layout, blocked storage and no-JS fallback');
} finally { await browser.close(); }
