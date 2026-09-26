import { defaults, validate } from './submission.mjs';

type Availability = 'idle' | 'checking' | 'available' | 'taken' | 'unknown';
const icons: Record<Availability, string> = {
  idle: 'M8 12h8',
  checking: 'M12 2a10 10 0 1 1-10 10',
  available: 'm6 12 4 4 8-8',
  taken: 'm8 8 8 8M16 8l-8 8',
  unknown: 'M9 9a3 3 0 0 1 6 0c0 2-3 2-3 4M12 17h.01',
};

/** A 404 is a preliminary availability check, not a reservation or creation guarantee. */
export function setupTokenAvailability(input: HTMLInputElement, indicator: HTMLElement) {
  const text = indicator.querySelector<HTMLElement>('#token-availability-text')!;
  const icon = indicator.querySelector('path')!;
  const cache = new Map<string, { state: 'available' | 'taken'; expires: number }>();
  let current = '';
  let revision = 0;
  let debounce: ReturnType<typeof setTimeout>;
  let request: AbortController | undefined;
  let retryAt = 0;
  function show(state: Availability, message: string) {
    indicator.hidden = false;
    indicator.dataset.state = state;
    indicator.title = message;
    text.textContent = message;
    icon.setAttribute('d', icons[state]);
  }
  function result(state: 'available' | 'taken') {
    show(state, state === 'available'
      ? `${input.value.trim()}: appears available. No GitHub account found; GitHub confirms availability when you create the organization.`
      : `${input.value.trim()}: already taken by a GitHub user or organization.`);
  }
  return function checkToken() {
    const token = input.value.trim().toLowerCase();
    if (token === current && indicator.dataset.state) return;
    current = token;
    const version = ++revision;
    clearTimeout(debounce);
    request?.abort();
    if (validate({ ...defaults, token }).token) {
      show('idle', 'Enter a valid app token to check GitHub availability.');
      return;
    }
    const cached = cache.get(token);
    if (cached && cached.expires > Date.now()) { result(cached.state); return; }
    if (retryAt > Date.now()) {
      show('unknown', 'GitHub’s request limit was reached. Availability could not be checked; try again later.');
      return;
    }
    show('checking', `Checking ${input.value.trim()} on GitHub…`);
    debounce = setTimeout(async () => {
      const controller = new AbortController();
      request = controller;
      const timeout = setTimeout(() => controller.abort(), 8000);
      try {
        // /users also resolves organization accounts; both occupy the same namespace.
        const response = await fetch(`https://api.github.com/users/${encodeURIComponent(token)}`, {
          credentials: 'omit', referrerPolicy: 'no-referrer',
          headers: { Accept: 'application/vnd.github+json' }, signal: controller.signal,
        });
        if (version !== revision) return;
        if (response.status === 200 || response.status === 404) {
          const state = response.status === 404 ? 'available' : 'taken';
          cache.set(token, { state, expires: Date.now() + 5 * 60_000 });
          result(state);
        } else if (response.status === 403 || response.status === 429) {
          const retrySeconds = Number(response.headers.get('retry-after')) || 60;
          const reset = Number(response.headers.get('x-ratelimit-reset')) * 1000;
          retryAt = Math.max(Date.now() + retrySeconds * 1000, reset || 0);
          show('unknown', 'GitHub’s request limit was reached. Availability could not be checked; try again later.');
        } else {
          show('unknown', 'GitHub could not confirm availability. Try again later.');
        }
      } catch {
        if (version === revision) show('unknown', 'Could not reach GitHub. Availability is unknown; check your connection and try again.');
      } finally { clearTimeout(timeout); }
    }, 600);
  };
}
