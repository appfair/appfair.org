import { localizePageLink } from './localized-links.mjs';

/** Shared by search and guide controls that generate links after the HTML is rendered. */
export function localizeBrowserPageLink(href: string): string {
  const data = document.body.dataset;
  return localizePageLink(href, {
    locale: data.pageLocale, siteUrl: data.siteUrl, pageUrl: location.href,
    routes: new Set<string>(JSON.parse(data.pageRoutes!)),
  });
}
