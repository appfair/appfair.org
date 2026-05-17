// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator'
import starlightBlog from 'starlight-blog'
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import { remarkHeadingId } from "remark-custom-heading-id";

// https://astro.build/config
export default defineConfig({
  site: 'https://appfair.org',
  //trailingSlash: 'always', // aspirational
  markdown: {
    remarkPlugins: [remarkHeadingId],
    rehypePlugins: [[rehypeExternalLinks, {
			target: "_blank",
			rel: ["noopener", "noreferrer"],
			// External links get the "external-link" class. A subtle SVG marker is
			// added via CSS (::after) so the page text stays clean.
			properties: { className: ["external-link"] },
		}]
    ],
  },
	integrations: [
		starlight({
			title: 'The App Fair Project',
      favicon: '/favicon.png',
      head: [
        // Restore the persisted theme-palette before paint to avoid FOUC.
        {
          tag: 'script',
          content: `(function(){try{var t=localStorage.getItem('appfair-theme-style');if(t&&t!=='original'){document.documentElement.setAttribute('data-theme-style',t);}}catch(e){}})();`,
        },
        // JSON-LD Organization schema, declaring every social profile we control
        // as canonically belonging to the App Fair Project (sameAs).
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          content: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'The App Fair Project',
            url: 'https://appfair.org',
            logo: 'https://appfair.org/assets/icons/appfair-icon.svg',
            email: 'contact@appfair.org',
            sameAs: [
              'https://fosstodon.org/@appfair',
              'https://bsky.app/profile/appfair.bsky.social',
              'https://twitter.com/TheAppFair',
              'https://www.linkedin.com/company/appfair/',
              'https://www.reddit.com/r/appfair/',
              'https://github.com/orgs/appfair',
            ],
          }),
        },
        // rel="me" link tags for IndieWeb / Mastodon profile verification.
        { tag: 'link', attrs: { rel: 'me', href: 'https://fosstodon.org/@appfair' } },
        { tag: 'link', attrs: { rel: 'me', href: 'https://bsky.app/profile/appfair.bsky.social' } },
        { tag: 'link', attrs: { rel: 'me', href: 'https://twitter.com/TheAppFair' } },
        { tag: 'link', attrs: { rel: 'me', href: 'https://www.linkedin.com/company/appfair/' } },
        { tag: 'link', attrs: { rel: 'me', href: 'https://www.reddit.com/r/appfair/' } },
        { tag: 'link', attrs: { rel: 'me', href: 'https://github.com/orgs/appfair' } },
        { tag: 'link', attrs: { rel: 'me', href: 'mailto:contact@appfair.org' } },
      ],
      logo: {
        src: './public/assets/icons/appfair-icon.svg',
        replacesTitle: true,
      },
      defaultLocale: 'root',
      locales: {
        'root': {
          label: 'English',
          lang: 'en',
        },
        'fr': {
          lang: 'fr',
          label: 'Français',
        },
        'es': {
          label: 'Español',
          lang: 'es',
        },
        'de': {
          label: 'Deutsch',
          lang: 'de',
        },
        'pt': {
          label: 'Português',
          lang: 'pt-BR',
        },
        'ja': {
          label: '日本語',
          lang: 'ja',
        },
        'ko': {
          label: '한국어',
          lang: 'ko',
        },
        'zh': {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },
      components: {
        // Override the default Header component
        Header: './src/components/CustomHeader.astro',
        Footer: './src/components/CustomFooter.astro',
      },
      plugins: [
        starlightLinksValidator({
          errorOnRelativeLinks: false,
        }),
        starlightBlog({
          prefix: 'blog',
          navigation: 'header-start',
          recentPostCount: 200,
          metrics: {
            readingTime: true,
            words: 'total',
          },
        }),

      ],
      routeMiddleware: './src/routeData.ts',
      customCss: [
        // Relative path to your custom CSS file
        './src/styles/custom.css',
      ],
			social: [
        { icon: 'discourse', label: 'Forums', href: 'https://github.com/orgs/appfair/discussions' },
        //{ icon: 'slack', label: 'Slack', href: '/slack/' },
        // Mastodon and GitHub are linked from the footer instead.
        // RSS is added automatically by the starlight-blog plugin.
      ],
      // editLink disabled to remove "Edit page" links
      sidebar: [
        {
          label: 'Creator Guide',
          items: [
            { label: 'Welcome', link: '/docs/' },
            { label: 'Inclusion Criteria', link: '/docs/inclusion-criteria/' },
            { label: 'Building Your App', link: '/docs/building/' },
            { label: 'Submitting Your App', link: '/docs/submitting/' },
            { label: 'Deployment & Distribution', link: '/docs/deploying/' },
            { label: 'Maintaining Your App', link: '/docs/maintenance/' },
            { label: 'FAQ & Glossary', link: '/docs/faq/' },
          ],
        },
      ],
		}),
	],
});
