// Translation helper. Every user-facing string in the site chrome and on the homepage is looked up
// here by dot-path key from src/i18n/<locale>.json, falling back to English for any key a locale
// has not translated yet. Markdown content (blog posts, policy pages) is not routed through this;
// translating a page means adding a localized copy of the file, which is a follow-up.
import { DEFAULT_LOCALE, LOCALES, LOCALE_CODES } from './locales.mjs';
import en from './en.json';
import fr from './fr.json';
import es from './es.json';
import de from './de.json';
import pt from './pt.json';
import ja from './ja.json';
import ko from './ko.json';
import zh from './zh.json';

export { DEFAULT_LOCALE, LOCALES, LOCALE_CODES };
export type LocaleCode = (typeof LOCALE_CODES)[number];

const tables: Record<string, unknown> = { en, fr, es, de, pt, ja, ko, zh };

function lookup(table: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((node, key) => {
    if (node && typeof node === 'object' && key in (node as Record<string, unknown>)) {
      return (node as Record<string, unknown>)[key];
    }
    return undefined;
  }, table);
}

/** Normalize whatever Astro.currentLocale gives us to a code in the table (or the default). */
export function resolveLocale(locale: string | undefined): LocaleCode {
  return (locale && LOCALE_CODES.includes(locale) ? locale : DEFAULT_LOCALE) as LocaleCode;
}

/** The BCP-47 language tag for a locale code, for <html lang>. */
export function langOf(locale: string | undefined): string {
  return LOCALES.find((l) => l.code === resolveLocale(locale))?.lang ?? 'en';
}

export function useTranslations(locale: string | undefined) {
  const code = resolveLocale(locale);
  /** A string, with `{name}` placeholders filled from `vars`. */
  const t = (key: string, vars: Record<string, string | number> = {}): string => {
    const raw = lookup(tables[code], key) ?? lookup(tables[DEFAULT_LOCALE], key);
    let s = typeof raw === 'string' ? raw : key;
    for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
    return s;
  };
  /** A structured value (an array of feature cards, say), with the same fallback. */
  const tr = <T = unknown>(key: string): T => {
    return (lookup(tables[code], key) ?? lookup(tables[DEFAULT_LOCALE], key)) as T;
  };
  return { t, tr, locale: code };
}

/** Prefix a site-relative path with the locale segment (none for the default locale). */
export function localizePath(path: string, locale: string | undefined): string {
  const code = resolveLocale(locale);
  const clean = path.startsWith('/') ? path : `/${path}`;
  return code === DEFAULT_LOCALE ? clean : `/${code}${clean === '/' ? '/' : clean}`;
}

/** Strip a leading locale segment from a pathname, so the language switcher can re-prefix it. */
export function stripLocale(pathname: string): string {
  const m = pathname.match(/^\/([a-z]{2})(\/|$)/);
  if (m && LOCALE_CODES.includes(m[1]) && m[1] !== DEFAULT_LOCALE) {
    const rest = pathname.slice(m[0].length);
    return `/${rest}`;
  }
  return pathname;
}

/** Date formatting in the reader's locale. */
export function formatDate(date: Date, locale: string | undefined): string {
  return new Intl.DateTimeFormat(langOf(locale), { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(date);
}
