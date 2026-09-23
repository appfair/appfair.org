// Site-wide constants that are not translated: URLs, handles, and identifiers.
export const site = {
  url: 'https://appfair.org',
  catalog: 'https://appfair.net',
  email: 'contact@appfair.org',
  forums: 'https://github.com/orgs/appfair/discussions',
  /** The FSF's definition, linked from the "Free" popup on the hero graphic. */
  freedoms: 'https://www.gnu.org/philosophy/free-sw.html',
  rss: '/blog/rss.xml',
  social: [
    { id: 'forums', label: 'Forums', href: 'https://github.com/orgs/appfair/discussions', color: '#10B981' },
    { id: 'github', label: 'GitHub', href: 'https://github.com/orgs/appfair', color: 'currentColor', me: true },
    { id: 'mastodon', label: 'Mastodon', href: 'https://fosstodon.org/@appfair', color: '#6364FF', me: true },
    { id: 'bluesky', label: 'Bluesky', href: 'https://bsky.app/profile/appfair.bsky.social', color: '#1185FE', me: true },
    { id: 'discord', label: 'Discord', href: 'https://discord.com/invite/KkmhEQTmgh', color: '#5865F2', me: true },
    { id: 'reddit', label: 'Reddit', href: 'https://www.reddit.com/r/appfair/', color: '#FF4500', me: true },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/appfair/', color: '#0A66C2', me: true },
    { id: 'twitter', label: 'Twitter', href: 'https://twitter.com/TheAppFair', color: '#1DA1F2', me: true },
    { id: 'email', label: 'contact@appfair.org', href: 'mailto:contact@appfair.org', color: '#EAB308' },
    { id: 'rss', label: 'RSS', href: '/blog/rss.xml', color: '#F26522' },
  ],
  stores: <{ id: string; badge: string; href?: string; live: boolean }[]>[
    // The two live channels link to the App Fair Project's developer page on each store.
    { id: 'app-store', badge: '/assets/badges/apple-app-store.svg', href: 'https://apps.apple.com/developer/the-app-fair-project-inc/id1638877580', live: true },
    { id: 'play-store', badge: '/assets/badges/google-play-store.svg', href: 'https://play.google.com/store/apps/developer?id=The+App+Fair+Project', live: true },
    // Roadmap channels have nothing to link to yet, so they render as plain badges.
    { id: 'f-droid', badge: '/assets/badges/f-droid.svg', live: false },
    { id: 'altstore', badge: '/assets/badges/altstore.svg', live: false },
  ],
};

/** The site's design. BaseLayout puts style/layout on <html>; HeroVisual renders the chosen graphic. */
export const design = { style: 'midnight', layout: 'split', visual: 'catalog' };

/** Option sets for the development-only design picker (DesignPicker.astro). */
export const designOptions = {
  styles: [
    { id: 'midnight', label: 'Midnight (default)', blurb: 'Dark-first, indigo→sky gradient accents, glassy surfaces.' },
    { id: 'fairground', label: 'Fairground', blurb: 'Brand blue, clean system sans.' },
    { id: 'editorial', label: 'Editorial', blurb: 'Serif display type on warm paper. Advocacy-journal feel.' },
    { id: 'civic', label: 'Civic', blurb: 'Teal accent, high contrast, squared corners. Institutional.' },
  ],
  layouts: [
    { id: 'split', label: 'Split (default)', blurb: 'Two-column hero with a catalog mock-up; alternating sections.' },
    { id: 'classic', label: 'Classic', blurb: 'Centered hero, three-column cards, stacked sections.' },
    { id: 'bold', label: 'Bold', blurb: 'Full-bleed oversized hero, floating pill nav, bento grid.' },
  ],
  visuals: [
    { id: 'catalog', label: 'Catalog (default)', blurb: 'One phone showing the catalog, the four tags pinned around it.' },
    { id: 'stacked', label: 'Stacked', blurb: 'Phone on the left, the four tags in a tidy column beside it.' },
    { id: 'duo', label: 'Duo', blurb: 'Two overlapping phones (iPhone and Android), tags in a row below.' },
    { id: 'emblem', label: 'Emblem', blurb: 'No phone: the App Fair mark in a glow, tags at the four corners.' },
  ],
};
