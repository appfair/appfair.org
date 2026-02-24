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
			content: {
				type: "text",
				value: " ↗"
			}
		}]
    ],
  },
	integrations: [
		starlight({
			title: 'The App Fair Project',
      favicon: '/favicon.png',
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
        { icon: 'mastodon', label: 'Mastodon', href: 'https://fosstodon.org/@appfair' },
        { icon: 'github', label: 'GitHub', href: 'https://github.com/orgs/appfair' },
      ],
      editLink: {
        baseUrl: 'https://github.com/appfair/fairapps.github.io/edit/main/'
      },
      sidebar: [
        {
          label: 'Documentation',
          items: [
            'docs', // index
          ],
        },
      ],
		}),
	],
});
