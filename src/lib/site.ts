// Site-wide constants that are not translated: URLs, handles, and identifiers.
export const site = {
  url: 'https://appfair.org',
  catalog: 'https://appfair.net',
  email: 'contact@appfair.org',
  forums: 'https://github.com/orgs/appfair/discussions',
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
  stores: [
    { id: 'app-store', badge: '/assets/badges/apple-app-store.svg', href: 'https://appfair.net', live: true },
    { id: 'play-store', badge: '/assets/badges/google-play-store.svg', href: 'https://appfair.net', live: true },
    { id: 'f-droid', badge: '/assets/badges/f-droid.svg', href: 'https://appfair.net', live: false },
    { id: 'altstore', badge: '/assets/badges/altstore.svg', href: 'https://appfair.net', live: false },
  ],
};

/** Option sets for the development-only design picker (DesignPicker.astro). The site default is set in BaseLayout. */
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
};
