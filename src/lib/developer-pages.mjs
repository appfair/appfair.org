// Shared reading order for the sidebar and page-to-page navigation.
export const developerPages = [
  ['/docs/', 'docs.overview'],
  ['/docs/getting-started/', 'docs.gettingStarted'],
  ['/docs/releases/', 'docs.releases'],
  ['/docs/inclusion-criteria/', 'docs.inclusion'],
  ['/docs/troubleshooting/', 'docs.troubleshooting'],
  ['/docs/faq/', 'docs.faq'],
];

export function adjacentDeveloperPages(current) {
  const index = developerPages.findIndex(([href]) => href === current);
  return index < 0 ? {} : { previous: developerPages[index - 1], next: developerPages[index + 1] };
}
