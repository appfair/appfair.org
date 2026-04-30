// Customize edit links and inject OG image meta tags
// https://github.com/withastro/starlight/discussions/1468#discussioncomment-14074010

import { defineRouteMiddleware } from "@astrojs/starlight/route-data";

export const onRequest = defineRouteMiddleware((context) => {
  const { starlightRoute } = context.locals;

  // Inject OG image meta tags
  const ogImageUrl = new URL(
    `/og/${starlightRoute.id || 'index'}.png`,
    context.site,
  );
  starlightRoute.head.push({
    tag: 'meta',
    attrs: { property: 'og:image', content: ogImageUrl.href },
  });
  starlightRoute.head.push({
    tag: 'meta',
    attrs: { property: 'og:image:width', content: '1200' },
  });
  starlightRoute.head.push({
    tag: 'meta',
    attrs: { property: 'og:image:height', content: '630' },
  });
  starlightRoute.head.push({
    tag: 'meta',
    attrs: { name: 'twitter:image', content: ogImageUrl.href },
  });
  starlightRoute.head.push({
    tag: 'meta',
    attrs: { name: 'twitter:card', content: 'summary_large_image' },
  });

  // Customize edit links for sample modules and apps
  if (starlightRoute.editUrl) {
      const { entry, id } = starlightRoute;
      const parts = id.split('/');

      if ((parts[1] === 'modules' || parts[1] === 'samples') && parts.length >= 2) {
        const repoName = parts[2];
        starlightRoute.editUrl = new URL(`https://github.com/skiptools/${repoName}/edit/main/README.md`);
      }
  }
});

