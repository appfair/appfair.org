// The locale table, in plain JS so astro.config.mjs can import it too.
// `code` is the URL prefix (/de/…); `lang` is the BCP-47 tag for <html lang> and hreflang.
export const DEFAULT_LOCALE = 'en';
export const LOCALES = [
  { code: 'en', lang: 'en', label: 'English' },
  { code: 'fr', lang: 'fr', label: 'Français' },
  { code: 'es', lang: 'es', label: 'Español' },
  { code: 'de', lang: 'de', label: 'Deutsch' },
  { code: 'pt', lang: 'pt-BR', label: 'Português' },
  { code: 'ja', lang: 'ja', label: '日本語' },
  { code: 'ko', lang: 'ko', label: '한국어' },
  { code: 'zh', lang: 'zh-CN', label: '简体中文' },
];
export const LOCALE_CODES = LOCALES.map((l) => l.code);
