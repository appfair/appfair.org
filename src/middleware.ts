import { defineMiddleware } from 'astro:middleware';
import { DEFAULT_LOCALE, resolveLocale } from './i18n';
import { site } from './lib/site';
import { getPageRoutes } from './lib/page-routes';
import { localizeHtmlLinks } from './lib/localize-html.mjs';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const locale = resolveLocale(context.currentLocale);
  if (locale === DEFAULT_LOCALE || !response.headers.get('content-type')?.includes('text/html')) return response;

  const routes = await getPageRoutes();
  const html = localizeHtmlLinks(await response.text(), {
    locale, routes, pageUrl: context.url.href, siteUrl: site.url,
  });
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
});
