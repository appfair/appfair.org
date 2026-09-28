// Shared reading order for the sidebar and page-to-page navigation.
export const developerPages = [
  ['/docs/', 'Overview'],
  ['/docs/getting-started/', 'Getting started'],
  ['/docs/releases/', 'Releases & updates'],
  ['/docs/inclusion-criteria/', 'Inclusion criteria'],
  ['/docs/troubleshooting/', 'Troubleshooting'],
  ['/docs/faq/', 'FAQ'],
];

export function adjacentDeveloperPages(current) {
  const index = developerPages.findIndex(([href]) => href === current);
  return index < 0 ? {} : { previous: developerPages[index - 1], next: developerPages[index + 1] };
}
