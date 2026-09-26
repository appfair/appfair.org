// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeAdmonitions from './src/lib/rehype-admonitions.mjs';
import rehypeExternalLinks from 'rehype-external-links';
import { LOCALE_CODES, DEFAULT_LOCALE } from './src/i18n/locales.mjs';

// Deployed to GitHub Pages on the apex domain, so there is no base path (CNAME pins the domain).
export default defineConfig({
  site: 'https://appfair.org',
  trailingSlash: 'ignore',
  vite: {
    // esbuild leaves vendor-prefixed and @supports-guarded CSS alone; lightningcss rewrites it.
    build: { cssMinify: 'esbuild' },
  },
  // Only the homepage and the site chrome are translated today. `fallback` + `rewrite` renders every
  // other page's English content under the locale prefix (/de/blog/…) with localized chrome, which
  // is the behaviour the Starlight site had. Adding a translated page later needs no routing change.
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: LOCALE_CODES,
    fallback: Object.fromEntries(LOCALE_CODES.filter((l) => l !== DEFAULT_LOCALE).map((l) => [l, DEFAULT_LOCALE])),
    routing: {
      prefixDefaultLocale: false,
      fallbackType: 'rewrite',
    },
  },
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: Object.fromEntries(LOCALE_CODES.map((l) => [l, l === 'pt' ? 'pt-BR' : l === 'zh' ? 'zh-CN' : l])),
      },
    }),
  ],
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed', wrap: false },
    processor: unified({
      rehypePlugins: [
        rehypeAdmonitions,
        // External links open in a new tab and carry the "external-link" class; global.css appends
        // a small "open in new" glyph after them so the prose stays clean.
        [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'], properties: { className: ['external-link'] } }],
      ],
    }),
  },
});
