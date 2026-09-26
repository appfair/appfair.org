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

The site's design is **Midnight** (style) + **Split** (layout) + **Catalog** (hero graphic), set as `design`
in `src/lib/site.ts`. In `npm run dev` a **Design** button in the bottom-right corner switches between the
alternative styles, layouts and graphics that were built for comparison. It sets `data-style` /
`data-layout` / `data-visual` on `<html>`, remembers the choice in `localStorage`, and honours
`?style=…&layout=…&visual=…&theme=…` in the URL. Production builds (`npm run build`, and so the deployed
site) render neither the picker nor its bootstrap script, and `HeroVisual.astro` emits only the chosen
graphic, so they always show the default. In dev, `?popup=free|noAds|openSource|noTracking` opens one of
the graphic's dialogs on load, for reviewing it without a pointer.

To retire the alternatives: delete `src/components/DesignPicker.astro`, its two `showPicker` includes in
`BaseLayout.astro`, `designOptions` in `src/lib/site.ts`, the non-default variants in `HeroVisual.astro`,
and the unused blocks in `themes.css` and `layouts.css`.

## Search

[Pagefind](https://pagefind.app) indexes `dist/` after the build (`npm run build`). Only
default-locale pages carry `data-pagefind-body`, and the index is forced to one language, so a
visitor on any locale searches the whole (English) site.

## License

The App Fair Project © 2026 by <a href="https://appfair.org">the App Fair</a> is licensed under
<a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.

## Developer documentation

`src/content/pages/docs/` supplies `/docs/`, linked as **Developers** in the header. MDX pages
embed `SubmissionFlow.astro` (linked SVG) and `SubmissionChecklist.astro`. The checklist's command
generation, input validation and versioned local-storage parsing live in `src/lib/submission.mjs`.
Run `npm test` for their regression tests. No commands are executed by the checklist.

`SubmissionGuide.astro` renders a normal single-column document. Each `SubmissionStep.astro`
contains one numbered heading, explanatory prose, and its actions and reference links. The same
step component serves the standalone checklist. The overview and section anchors use native page
scrolling; there are no nested scrolling panes or synchronization handlers.

`SubmissionForm.astro` initializes `submission-checklist.ts`, which updates commands, validates
input and saves app details. `SubmissionValue.astro` updates prose identities through
`submission-state.ts` and `submission-values.mjs`. Commands live in `submission.mjs`; keep guide
step IDs matched to `stepIds`. `/docs/checklist/` remains available as a commands-only view.

Docs use the normal content collection, localized fallback routes, sitemap and Pagefind build.
Use `npm run build` followed by `npm run preview` to test search; Astro dev does not build its index.
When changing the submission process, check the App Fair template and catalog workflow before
updating command examples. Generated checklist commands assume a personal catalog fork.

With Playwright available, run the end-to-end checks against the preview server:

```sh
SITE_URL=http://127.0.0.1:4323 node tests/checklist.browser.mjs
SITE_URL=http://127.0.0.1:4323 node tests/guide.browser.mjs
# Set PLAYWRIGHT_MODULE to a package path if Playwright is installed outside this checkout.
```


## Admonitions

Use GitHub-style alerts in Markdown or MDX. The shared renderer supplies a label, icon and
light/dark colors. Ordinary blockquotes remain quotations.

```md
> [!INFO] iOS testing in CI
> GitHub CI can run iOS tests and capture screenshots.
```

Supported types: `NOTE` (context), `INFO` (platform facts), `TIP` (shortcuts), `IMPORTANT`
(requirements), `WARNING` (likely mistakes), and `CAUTION` (irreversible changes). The optional
title is plain text. The body supports normal Markdown, including links, lists and code blocks.
Use callouts for exceptions and supporting advice; keep the main instructions in the guide.

For Astro components or interactive MDX, use the equivalent component:

```astro
import Admonition from '../components/Admonition.astro';

<Admonition kind="info" title="iOS testing in CI" id="ios-ci-note">
  GitHub CI can run iOS tests and capture screenshots.
</Admonition>
```

`src/lib/admonitions.mjs` defines the variants and icons. `rehype-admonitions.mjs` renders
Markdown alerts; `Admonition.astro` renders component callouts. Both use the site-wide styles in
`src/styles/admonitions.css`. Static callouts use `role="note"`, not an interrupting live alert.

### Copyable code samples

Markdown fenced code blocks automatically get a floating copy button. In Astro or MDX,
use `CodeBlock.astro` for generated examples:

```astro
import CodeBlock from './components/CodeBlock.astro';
<CodeBlock code="day launch" label="Copy launch command" />
```

`CodeCopy.astro` is included by `BaseLayout.astro`; it shares the button template, styles
and clipboard handler across both forms. Code remains selectable without JavaScript.
A successful copy shows a checkmark and “Copied” for two seconds. Clipboard failure
selects the text and shows manual-copy instructions instead. Copying reads the current
code text, including edits to generated commands, and preserves whitespace. Add
`data-no-copy` to a `pre` or an ancestor to opt out. Inline code is unaffected.

### Token availability

The app token field checks `https://api.github.com/users/{token}` after 600 ms without an
edit. This unauthenticated endpoint resolves both users and organizations and supports
[CORS](https://docs.github.com/en/rest/using-the-rest-api/using-cors-and-jsonp-to-make-cross-origin-requests).
Green means a 404 (apparently available), red means an existing account, blue means checking,
and amber means the check failed. GitHub can still reserve or reject a name at creation.
Results are cached in memory for five minutes; obsolete requests are aborted and ignored.
Checks time out after eight seconds and pause on API rate limits. They never block the guide
or request credentials. Invalid tokens do not trigger requests.
