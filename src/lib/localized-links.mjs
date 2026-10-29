import { DEFAULT_LOCALE, LOCALE_CODES } from '../i18n/locales.mjs';

export const routeKey = (path) => path.replace(/\/+$/, '') || '/';

/** Localize only known HTML pages. Assets, external links and explicit language choices stay intact. */
export function localizePageLink(href, { locale, pageUrl, siteUrl, routes }) {
  if (locale === DEFAULT_LOCALE || !LOCALE_CODES.includes(locale) || !href || /^[#?]/.test(href)) return href;
  let target;
  try { target = new URL(href, pageUrl); } catch { return href; }
  if (!['http:', 'https:'].includes(target.protocol)) return href;
  if (![new URL(pageUrl).origin, new URL(siteUrl).origin].includes(target.origin)) return href;
  if (LOCALE_CODES.includes(target.pathname.split('/')[1])) return href;
  if (!routes.has(routeKey(target.pathname))) return href;
  return `/${locale}${target.pathname}${target.search}${target.hash}`;
}
