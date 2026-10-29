import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { localizePageLink } from '../src/lib/localized-links.mjs';
import { localizeHtmlLinks } from '../src/lib/localize-html.mjs';
import { LOCALE_CODES } from '../src/i18n/locales.mjs';

// Synthetic route fixtures; no network calls.
const options = {
  locale: 'de', pageUrl: 'http://localhost:4323/de/docs/getting-started/',
  siteUrl: 'https://appfair.org', routes: new Set(['/', '/app-rules', '/privacy', '/docs', '/docs/releases']),
};

test('page links retain the selected locale, query and fragment', () => {
  assert.equal(localizePageLink('/app-rules/', options), '/de/app-rules/');
  assert.equal(localizePageLink('/privacy?source=docs#developers', options), '/de/privacy?source=docs#developers');
  assert.equal(localizePageLink('https://appfair.org/privacy/', options), '/de/privacy/');
  assert.equal(localizePageLink('/docs/releases/', { ...options, locale: 'ja' }), '/ja/docs/releases/');
  assert.equal(localizePageLink('app-rules/', { ...options, pageUrl: 'https://appfair.org/' }), '/de/app-rules/');
});

test('assets, external links, anchors and explicit locales are preserved', () => {
  for (const href of ['/blog/rss.xml', '/assets/icon.svg', '/download.apk', '/missing/', '#section', '?tab=2', 'mailto:support@appfair.net', 'https://github.com/appfair', '/fr/privacy/', '/de/app-rules/', '../releases/']) {
    assert.equal(localizePageLink(href, options), href);
  }
  assert.equal(localizePageLink('/privacy/', { ...options, locale: 'en' }), '/privacy/');
});

test('rendered HTML changes only eligible links, including SVG links', () => {
  const html = '<p>English prose</p><a href="/app-rules/?a=1&amp;b=2#top">App rules</a><svg><a href="/docs/">Guide</a></svg>';
  assert.equal(localizeHtmlLinks(html, options), '<p>English prose</p><a href="/de/app-rules/?a=1&amp;b=2#top">App rules</a><svg><a href="/de/docs/">Guide</a></svg>');
});

test('language switching, downloads, code examples and opt-outs are untouched', () => {
  const html = '<a href="/" hreflang="en">English</a><a href="/privacy/" download>Download</a><a href="/privacy/" data-keep-language>English policy</a><code>&lt;a href="/docs/"&gt;</code><pre><a href="/docs/">Example</a></pre><script>const example = `<a href="/docs/">`;</script>';
  assert.equal(localizeHtmlLinks(html, options), html);
});

test('every chrome translation and its placeholders are present in each locale', () => {
  const flatten = (value, prefix = '') => Object.fromEntries(Object.entries(value).flatMap(([key, child]) =>
    child && typeof child === 'object' && !Array.isArray(child) ? Object.entries(flatten(child, `${prefix}${key}.`)) : [[prefix + key, child]]));
  const read = locale => flatten(JSON.parse(readFileSync(new URL(`../src/i18n/${locale}.json`, import.meta.url))));
  const english = read('en');
  const keys = Object.keys(english).filter(key => /^(nav|footer|theme|blog|page|notFound|search|a11y|docs|copy)\./.test(key));
  const placeholders = value => [...value.matchAll(/\{\w+\}/g)].map(match => match[0]).sort();
  for (const locale of LOCALE_CODES) {
    const translated = read(locale);
    for (const key of keys) {
      assert.equal(typeof translated[key], 'string', `${locale}: ${key}`);
      assert.ok(translated[key].length, `${locale}: ${key}`);
      assert.deepEqual(placeholders(translated[key]), placeholders(english[key]), `${locale}: ${key}`);
    }
  }
});
