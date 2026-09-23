# appfair.org

The source for the [App Fair Project](https://appfair.org) website: a static site built with
[Astro](https://astro.build) and deployed to GitHub Pages by `.github/workflows/`.

## Local development

Requires Node 22.12 or newer.

```console
npm install
npm run dev       # http://localhost:4321, with hot reload
npm run build     # production build into dist/, then the Pagefind search index
npm run preview   # serve dist/ (search only works here and in production, not in dev)
```

## Structure

```text
astro.config.mjs        site URL, i18n routing, markdown pipeline
src/
├── content/
│   ├── blog/           blog posts (markdown; the file name is the URL slug)
│   └── pages/          standalone pages, served at /<path>/ (marketplace/, imprint, privacy, …)
├── content.config.ts   the two collections' frontmatter schemas
├── i18n/               en.json and one JSON table per locale, plus the t() helper
├── layouts/            BaseLayout: <head>, nav, footer, theme + design bootstrap
├── components/         Nav, Footer, ThemeToggle, LangSwitcher, Search, HeroVisual, …
├── pages/              routes: index, blog/, blog/[slug], blog/rss.xml, [...slug], og/, 404
├── styles/             global.css (system), themes.css (styles × light/dark), layouts.css
└── lib/                site constants (URLs, social links, stores), post helpers
public/                 static assets (icons, store badges, images, the App Index schema)
```

## Localization

Every string in the site chrome and on the homepage is looked up by key from `src/i18n/<locale>.json`,
falling back to `en.json` for any key a locale has not translated. To translate more of the site,
add keys to the locale file; to add a locale, add it to `src/i18n/locales.mjs` and create its JSON.

Locale routes (`/fr/…`, `/de/…`, …) exist for every page. Pages without a translated copy — the blog
and the policy pages today — render their English content under the locale prefix with localized
chrome (Astro's i18n `fallback` with `fallbackType: 'rewrite'`). A translated page would be a
localized copy of the markdown file; wiring that up is the next step when translations arrive.

## Design picker (development only)

The site's design is **Midnight** (style) + **Split** (layout), set as `DESIGN` in `src/layouts/BaseLayout.astro`.
In `npm run dev` a **Design** button in the bottom-right corner switches between the alternative styles
and layouts that were built for comparison. It sets `data-style` / `data-layout` on `<html>`, remembers the
choice in `localStorage`, and honours `?style=…&layout=…&theme=…` in the URL. Production builds
(`npm run build`, and so the deployed site) render neither the picker nor its bootstrap script, so they
always show the default.

To retire the alternatives: delete `src/components/DesignPicker.astro`, its two `showPicker` includes in
`BaseLayout.astro`, `designOptions` in `src/lib/site.ts`, and the unused blocks in `themes.css` and `layouts.css`.

## Search

[Pagefind](https://pagefind.app) indexes `dist/` after the build (`npm run build`). Only
default-locale pages carry `data-pagefind-body`, and the index is forced to one language, so a
visitor on any locale searches the whole (English) site.

## License

The App Fair Project © 2026 by <a href="https://appfair.org">the App Fair</a> is licensed under
<a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.
