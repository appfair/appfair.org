import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const engines = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await engines[process.env.BROWSER || 'chromium'].launch({headless: true});
const base = process.env.SITE_URL || 'http://127.0.0.1:4323';
try {
  const page = await browser.newPage({viewport: {width: 1280, height: 900}});
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  const routes = ['/app-rules/', '/docs/', '/docs/inclusion-criteria/', '/docs/getting-started/', '/docs/releases/', '/docs/troubleshooting/', '/docs/faq/'];
  const links = new Set();
  for (const route of routes) {
    const response = await page.goto(base + route);
    assert.equal(response.status(), 200, route);
    for (const href of await page.locator('a[href^="/docs/"], a[href^="/app-rules/"]').evaluateAll(nodes => nodes.map(n => n.getAttribute('href')))) links.add(href);
    for (const code of await page.locator('pre code').all()) {
      if (/\bgh (auth|repo|api|pr|run|release)\b/.test(await code.textContent())) {
        assert.ok(await code.evaluate(n => Boolean(n.closest('[data-method=gh]'))), route);
      }
    }
  }
  // Validate local documentation links, including anchors after the MDX conversion.
  for (const href of links) {
    const response = await page.goto(base + href);
    assert.equal((response ?? await page.request.get(base + href)).status(), 200, href);
    const hash = new URL(base + href).hash.slice(1);
    if (hash) assert.ok(await page.evaluate(id => Boolean(document.getElementById(id)), decodeURIComponent(hash)), href);
  }
  await page.goto(base + '/docs/inclusion-criteria/');
  assert.match(await page.locator('.admonition').first().innerText(), /policies are evolving/);
  await page.screenshot({path:'/private/tmp/appfair-inclusion-criteria.png', fullPage:true});
  const indexed = await page.evaluate(async () => {
    const search = await import('/pagefind/pagefind.js');
    const result = await search.search('App Fair');
    const data = await Promise.all(result.results.map(r => r.data()));
    return data.map(d => new URL(d.url, location.origin).pathname.replace(/\/$/, ''));
  });
  for (const route of routes) assert.ok(indexed.includes(route.replace(/\/$/, '')), route + ' missing from search');
  assert.ok(!indexed.includes('/docs/checklist'));
  assert.equal((await page.goto(base + '/docs/checklist/')).status(), 404);
  await page.setViewportSize({width:390, height:844});
  for (const route of ['/app-rules/', '/docs/inclusion-criteria/']) {
    await page.goto(base + route);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route);
  }
  await page.screenshot({path:'/private/tmp/appfair-policies-mobile.png', fullPage:true});
  assert.deepEqual(errors, []);
  console.log('PASS: policy routes, warning, documentation anchors, CLI alternatives, search index, removed checklist and mobile layout');
} finally { await browser.close(); }
