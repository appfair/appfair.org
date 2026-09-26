// Run against the local preview with Playwright available through PLAYWRIGHT_MODULE.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { guideValues } from '../src/lib/submission-values.mjs';
import { steps, stepIds } from '../src/lib/submission.mjs';
const require = createRequire(import.meta.url);
const engines = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.SITE_URL || 'http://127.0.0.1:4323';
const browser = await engines[process.env.BROWSER || 'chromium'].launch({ headless: true });
const errors = [];
const waitForAnchor = (page, id) => page.waitForFunction(id => {
  const top = document.getElementById(id).getBoundingClientRect().top;
  return top >= 63 && top <= 100;
}, id);
const settle = page => page.evaluate(() => new Promise(resolve => {
  let lastY = scrollY, lastChange = performance.now();
  function tick(now) {
    if (scrollY !== lastY) { lastY = scrollY; lastChange = now; }
    if (now - lastChange >= 150) resolve();
    else requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}));
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, permissions: process.env.BROWSER === 'webkit' ? [] : ['clipboard-read', 'clipboard-write'] });
  await context.route('https://api.github.com/users/*', route => route.fulfill({status: 404, body: '{}'}));
  const page = await context.newPage();
  page.on('pageerror', e => errors.push(String(e)));
  await page.goto(`${base}/docs/getting-started/`);
  await page.locator('#submission-guide[data-ready=true]').waitFor();
  assert.equal(await page.locator('.guide-scroll, .guide-switch, #current-step-title').count(), 0);
  assert.equal(await page.locator('.developer-nav').isVisible(), true);
  assert.equal(await page.locator('.developer-nav [aria-current=page]').textContent(), 'Getting started');
  assert.equal(await page.locator('.developer-nav a[href="/docs/checklist/"]').count(), 0);
  assert.equal(await page.locator('.guide-overview .flow-horizontal').isVisible(), true);
  assert.equal(await page.locator('.check-step').count(), 11);
  assert.equal(await page.locator('#checklist-steps details, input[type=checkbox], #checklist-reset').count(), 0);
  assert.equal(await page.locator('#submission-form').count(), 1);
  const assertIntegratedSteps = async p => {
    for (const id of stepIds) {
      const step = p.locator(`#step-${id}`);
      assert.equal(await step.locator(':scope > h2').count(), 1);
      assert.equal(await step.locator(':scope > .step-explanation').count(), 1);
      assert.equal(await step.locator(':scope > .step-content').count(), 1);
      assert.ok(await step.evaluate(n => {
        const prose=n.querySelector('.step-explanation').getBoundingClientRect();
        const actions=n.querySelector('.step-content').getBoundingClientRect();
        return prose.bottom <= actions.top + 1;
      }), `${id}: explanations must precede actions`);
    }
  };
  await assertIntegratedSteps(page);
  await page.screenshot({path:'/private/tmp/appfair-guide-single-overview.png'});
  await page.getByRole('link',{name:'Start setup',exact:true}).click();
  await waitForAnchor(page, 'submission-form');
  const refresh = await page.locator('#checklist-shuffle').boundingBox();
  const tokenField = await page.locator('#app-token').boundingBox();
  assert.ok(refresh.x + refresh.width <= tokenField.x);

  await page.locator('[name=token]').fill('Copper-Test');
  await page.locator('[name=title]').fill("Reader's $(echo example) Notes");
  await page.getByRole('radio',{name:'Windows',exact:true}).check();
  assert.equal(await page.locator('#ios-ci-note').isVisible(),true);
  assert.equal(await page.locator('#step-local .optional-command code').textContent(), 'code .');
  assert.match(await page.locator('#step-local .optional-instructions').textContent(), /windows-xaml/);
  const values={token:'Copper-Test',title:"Reader's $(echo example) Notes",host:'windows'};
  const commands=steps(values), text=guideValues(values);
  for (const node of await page.locator('[data-guide-value]').all()) assert.equal(await node.textContent(),text[await node.getAttribute('data-guide-value')]);
  assert.equal(await page.locator('#step-token .step-label').textContent(),'Create the Copper-Test organization on GitHub');
  assert.equal(await page.locator('#step-create pre code').textContent(),commands.find(s=>s.id==='create').command);
  assert.equal(await page.locator('#step-repository .alternative-command code').textContent(),commands.find(s=>s.id==='repository').alternative.command);
  assert.equal(await page.locator('#step-repository .optional-command code').textContent(),commands.find(s=>s.id==='repository').optional.command);
  const newRepo=new URL(await page.getByRole('link',{name:'Create a new repository',exact:true}).getAttribute('href'));
  assert.equal(newRepo.pathname,'/organizations/Copper-Test/repositories/new');
  assert.equal(newRepo.searchParams.get('name'),'Copper-Test');
  assert.equal(await page.locator('#step-install .optional-command code').textContent(),'code --install-extension daybrite.day-vscode\ncode --install-extension rust-lang.rust-analyzer');
  await page.screenshot({path:'/private/tmp/appfair-guide-single-settings.png'});

  // Invalid edits suppress executable instructions but retain the explanation.
  await page.locator('[name=token]').fill('bad;token');
  assert.equal(await page.locator('#checklist-steps').isVisible(),true);
  assert.equal(await page.locator('#step-create .step-content').isVisible(),false);
  assert.equal(await page.locator('#step-create .step-explanation').isVisible(),true);
  await page.locator('[name=token]').fill('Copper-Test');
  await settle(page);
  const beforeRefresh=await page.evaluate(()=>scrollY);
  await page.locator('#checklist-shuffle').click();
  await settle(page);
  assert.equal(await page.evaluate(()=>scrollY),beforeRefresh);
  const suggested=await page.locator('[name=token]').inputValue();
  assert.notEqual(suggested,'Copper-Test');
  await page.reload();
  await page.locator('#submission-guide[data-ready=true]').waitFor();
  assert.equal(await page.locator('[name=token]').inputValue(),suggested);

  // Native anchors work for both prose headings and command sections.
  for (const anchor of ['choose-a-token','using-git-and-the-browser','step-create']) {
    await page.goto(`${base}/docs/getting-started/#${anchor}`);
    await page.locator('#submission-guide[data-ready=true]').waitFor();
    await waitForAnchor(page, anchor);
  }
  await page.locator('#step-create .copy-command').click();
  if (process.env.BROWSER!=='webkit') assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),await page.locator('#step-create pre code').textContent());
  await page.screenshot({path:'/private/tmp/appfair-guide-single-step.png'});
  // Scrolling moves the document; content containers cannot trap wheel input.
  const beforeWheel=await page.evaluate(()=>scrollY);
  await page.mouse.move(350,500);
  await page.mouse.wheel(0,200);
  await page.waitForFunction(y=>scrollY>y,beforeWheel);
  assert.ok(await page.locator('#submission-guide, #checklist-steps').evaluateAll(nodes=>nodes.every(n=>!['auto','scroll','hidden'].includes(getComputedStyle(n).overflowY))));
  await page.locator('body > .footer').scrollIntoViewIfNeeded();
  assert.equal(await page.locator('body > .footer').isVisible(),true);

  await page.goto(`${base}/docs/getting-started/#process-overview`);
  await page.locator('.flow-horizontal a[aria-label="Tag a release"]').click();
  assert.equal(new URL(page.url()).hash,'#release');
  await waitForAnchor(page, 'release');
  for (const size of [{width:390,height:844},{width:640,height:360}]) {
    await page.setViewportSize(size);
    await page.goto(`${base}/docs/getting-started/#install-day`);
    await page.locator('#submission-guide[data-ready=true]').waitFor();
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    await assertIntegratedSteps(page);
    await page.screenshot({path:`/private/tmp/appfair-guide-single-${size.width}.png`});
  }
  await page.goto(`${base}/docs/getting-started/#submission-form`);
  await page.getByRole('radio',{name:'Linux',exact:true}).check();
  assert.match(await page.locator('#step-local .step-content > .code-block pre').textContent(),/^day launch$/m);
  assert.match(await page.locator('#step-local .optional-instructions').textContent(), /linux-gtk/);
  // The server renders the same order with JavaScript disabled.
  const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const staticPage=await noJS.newPage();
  await staticPage.goto(`${base}/docs/getting-started/`);
  await assertIntegratedSteps(staticPage);
  assert.equal(await staticPage.locator('.check-step').count(),11);
  assert.equal(await staticPage.locator('#step-create pre code').isVisible(),true);
  await noJS.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: single-column server rendering, explanation/action order, native scrolling and anchors, live settings, saved values, optional commands, clipboard, responsive layout, footer and no-JS');
} finally { await browser.close(); }
