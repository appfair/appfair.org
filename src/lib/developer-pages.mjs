// Shared reading order for the sidebar and page-to-page navigation.
export const developerPages = [
  ['/docs/', 'Overview'],
  ['/docs/getting-started/', 'Getting started'],
  ['/docs/releases/', 'Releases & updates'],
  ['/docs/troubleshooting/', 'Troubleshooting'],
];

export function adjacentDeveloperPages(current) {
  // Supporting pages lead back into the main guide.
  if (current === '/docs/inclusion-criteria/') return { previous: developerPages[0], next: developerPages[1] };
  if (current === '/docs/checklist/') return { previous: developerPages[0], next: developerPages[2] };
  const index = developerPages.findIndex(([href]) => href === current);
  return index < 0 ? {} : { previous: developerPages[index - 1], next: developerPages[index + 1] };
}
