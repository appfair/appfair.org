type Values = { token: string; title: string; host: string };
type Snapshot = { values: Values; valid: boolean };
let current: Snapshot | undefined;
const listeners = new Set<(snapshot: Snapshot) => void>();

// Replay the current values so initialization does not depend on script order.
export function publishChecklist(snapshot: Snapshot) {
  current = snapshot;
  for (const listener of listeners) listener(snapshot);
}
export function subscribeChecklist(listener: (snapshot: Snapshot) => void) {
  listeners.add(listener);
  if (current) listener(current);
  return () => listeners.delete(listener);
}
