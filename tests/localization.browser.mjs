import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { LOCALE_CODES } from '../src/i18n/locales.mjs';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless: true });
const base = process.env.SITE_URL || 'http://127.0.0.1:4323';
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  await page.route('https://api.github.com/users/*', route => route.fulfill({ status: 404, body: '{}' }));
  for (const locale of LOCALE_CODES) {
    const prefix = locale === 'en' ? '' : `/${locale}`;
    const strings = JSON.parse(readFileSync(new URL(`../src/i18n/${locale}.json`, import.meta.url)));
    await page.goto(base + prefix + '/docs/getting-started/');
    await page.locator('#submission-guide[data-ready=true]').waitFor();
    assert.equal(await page.locator('.nav-links a[href$="/docs/"]').innerText(), strings.nav.developers);
    const rules = page.locator('.footer a[href$="/app-rules/"]');
    assert.equal(await rules.innerText(), strings.footer.appRules);
    assert.equal(await rules.getAttribute('href'), prefix + '/app-rules/');
    assert.equal(await page.locator('[data-social=forums]').innerText(), strings.footer.social.forums);
    assert.equal(await page.locator('.docs-home').innerText(), strings.docs.guide);
    assert.equal(await page.locator('.developer-nav a[aria-current=page]').innerText(), strings.docs.gettingStarted);
    // Interactive editing must not restore English URLs or copy-control labels.
    await page.locator('[name=token]').fill('Locale-Test');
    for (const href of await page.locator('#checklist-steps .step-links a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')))) {
      const url = new URL(href, base);
      if (url.origin === new URL(base).origin) assert.ok(url.pathname.startsWith(prefix + '/docs/'), `${locale}: ${href}`);
    }
    const copy = page.locator('#step-create .copy-command');
    assert.equal(await copy.getAttribute('title'), strings.copy.title);
    await copy.focus();
    assert.equal(await copy.getAttribute('aria-label'), strings.copy.commandsFor.replace('{title}', 'Create the app'));
    for (const width of [390, 900, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${locale}: overflow at ${width}`);
    }
  }
  await page.goto(base + '/de/docs/getting-started/');
  await page.locator('.footer a[href="/de/app-rules/"]').click();
  assert.equal(new URL(page.url()).pathname, '/de/app-rules/');
  assert.equal(await page.locator('h1').innerText(), 'App rules'); // Content stays English.
  await page.locator('.lang-btn').first().click();
  await page.locator('.lang-menu:visible a[hreflang=en]').click();
  assert.equal(new URL(page.url()).pathname, '/app-rules/');

  await page.goto(base + '/de/docs/getting-started/');
  await page.locator('[data-search-open]').click();
  await page.locator('.pagefind-ui__search-input').fill('privacy');
  await page.locator('.pagefind-ui__result-link').first().waitFor();
  for (const href of await page.locator('.pagefind-ui__results a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')))) {
    assert.ok(new URL(href, base).pathname.startsWith('/de/'), href);
  }
  await page.keyboard.press('Escape');
  await page.screenshot({ path: '/private/tmp/appfair-chrome-desktop.png', fullPage: true });

  const noScript = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noScript.newPage();
  await staticPage.goto(base + '/de/marketplace/');
  assert.equal(await staticPage.locator('a[href="/de/privacy/"]').count() > 0, true);
  assert.equal(await staticPage.locator('.lang-menu a[hreflang=en]').first().getAttribute('href'), '/marketplace/');
  await staticPage.locator('a[href="/de/privacy/"]').first().click();
  assert.equal(new URL(staticPage.url()).pathname, '/de/privacy/');
  await staticPage.setViewportSize({ width: 390, height: 844 });
  await staticPage.locator('.footer').scrollIntoViewIfNeeded();
  await staticPage.screenshot({ path: '/private/tmp/appfair-chrome-mobile.png' });
  await noScript.close();
  assert.deepEqual(errors, []);
  console.log('PASS: all locales, navigation, dynamic guide links, copy labels, search results, language switching, no-JS links and responsive layouts.');
} finally { await browser.close(); }
