import { guideValues } from './submission-values.mjs';
import { subscribeChecklist } from './submission-state';

export function setupSubmissionGuide() {
  const root = document.querySelector<HTMLElement>('#submission-guide');
  if (!root) return;
  subscribeChecklist(snapshot => {
    root.querySelector<HTMLElement>('#ios-ci-note')!.hidden = snapshot.values.host === 'macos';
    const values = guideValues(snapshot.values);
    for (const node of root.querySelectorAll<HTMLElement>('[data-guide-value]')) {
      node.textContent = values[node.dataset.guideValue!];
      if (node instanceof HTMLAnchorElement && node.hasAttribute('data-guide-link')) node.href = values[node.dataset.guideValue!];
    }
    root.dataset.ready = 'true';
  });
}
