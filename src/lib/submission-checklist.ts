import { defaults, steps, restore, STORAGE_KEY, validate, suggestName, detectHost } from './submission.mjs';
import { publishChecklist } from './submission-state';
import { setupTokenAvailability } from './token-availability';
type State = { schema: number; values: { token: string; title: string; host: string } };
export function setupSubmissionChecklist() {
  const form = document.querySelector<HTMLFormElement>('#submission-form')!;
  const list = document.querySelector<HTMLElement>('#checklist-steps')!;
  const status = document.querySelector<HTMLElement>('#checklist-status')!;
  const storageNote = document.querySelector<HTMLElement>('#storage-note')!;
  const checkToken = setupTokenAvailability(form.elements.namedItem('token') as HTMLInputElement, document.getElementById('token-availability')!);
  const host = detectHost(navigator.userAgent);
  let saved = null;
  try { saved = restore(localStorage.getItem(STORAGE_KEY)); } catch {}
  let state: State = { schema: 3, values: saved?.values ?? { ...suggestName(), host } };
  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch { storageNote.hidden = false; storageNote.querySelector('.admonition-body')!.textContent = 'Browser storage is unavailable. You can use this checklist, but app details will be lost when you leave.'; }
  }
  function fillForm() {
    for (const [name, value] of Object.entries(state.values)) (form.elements.namedItem(name) as HTMLInputElement | RadioNodeList).value = value;
    checkToken();
  }
  function render() {
    for (const step of steps(state.values)) {
      const detail = document.getElementById(`step-${step.id}`) as HTMLElement;
      detail.querySelector('.step-label')!.textContent = step.title;
      detail.querySelector('[data-code-block]')?.setAttribute('data-copy-label', `Copy commands for ${step.title}`);
      detail.querySelector('.step-location')!.textContent = step.location;
      detail.querySelector('.step-description')!.textContent = step.text;
      if (step.installations) {
        for (const item of step.installations) {
          const row = detail.querySelector<HTMLElement>(`[data-installation=${item.id}]`)!;
          const link = row.querySelector<HTMLAnchorElement>('a')!;
          row.hidden = item.hidden;
          row.classList.toggle('unavailable', item.disabled);
          link.textContent = item.title;
          if (item.disabled) { link.removeAttribute('href'); link.setAttribute('aria-disabled', 'true'); link.tabIndex = -1; }
          else { link.href = item.href; link.removeAttribute('aria-disabled'); link.removeAttribute('tabindex'); }
          row.querySelector('small')!.replaceChildren(...item.detail.split('`').map((part, i) => {
            if (i % 2 === 0) return document.createTextNode(part);
            const code = document.createElement('code'); code.textContent = part; return code;
          }));
        }
      }
      if (step.command) detail.querySelector('pre code')!.textContent = step.command;
      if (step.optional) detail.querySelector('.optional-command code')!.textContent = step.optional.command;
      if (step.optional?.instructions) {
        detail.querySelector('.optional-instructions')!.replaceChildren(...step.optional.instructions.map(text => {
          const item = document.createElement('li'); item.textContent = text; return item;
        }));
      }
      if (step.alternative) {
        detail.querySelector('.alternative-command code')!.textContent = step.alternative.command;
        const link = detail.querySelector<HTMLAnchorElement>('.command-alternative .step-operations a')!;
        link.href = step.alternative.href;
        link.textContent = step.alternative.label;
      }
      step.operations?.forEach(([label, href, text], i) => {
        const row = detail.querySelectorAll('.step-content > .step-operations li')[i];
        const link = row.querySelector<HTMLAnchorElement>('a')!;
        link.textContent = label; link.href = href;
        if (text) row.querySelector('small')!.textContent = text;
      });
      const links = detail.querySelectorAll<HTMLAnchorElement>('.step-links a');
      step.links.forEach(([label, href], i) => { links[i].textContent = label; links[i].href = href; });
      links[links.length - 1].href = step.help;
    }
    publishChecklist({ values: { ...state.values }, valid: true });
  }
  function showErrors(errors: Record<string, string>) {
    for (const key of Object.keys(defaults)) {
      document.getElementById(`${key}-error`)!.textContent = errors[key] ?? '';
      (key === 'host' ? document.getElementById('host-picker')! : form.elements.namedItem(key) as HTMLInputElement).setAttribute('aria-invalid', String(Boolean(errors[key])));
    }
    // Do not leave stale commands available while an edit is incomplete or invalid.
    const invalid = Object.keys(errors).length > 0;
    if (list.hasAttribute('data-integrated')) {
      for (const content of list.querySelectorAll<HTMLElement>('.step-content')) content.hidden = invalid;
    } else list.hidden = invalid;
  }
  function update() {
    checkToken();
    const values = {
      token: (form.elements.namedItem('token') as HTMLInputElement).value.trim(),
      title: (form.elements.namedItem('title') as HTMLInputElement).value.trim(),
      host: (form.elements.namedItem('host') as RadioNodeList).value,
    };
    const errors = validate(values);
    showErrors(errors);
    if (Object.keys(errors).length) { publishChecklist({ values: { ...state.values }, valid: false }); status.textContent = 'Correct the marked fields to show your commands.'; return; }
    state.values = values;
    render(); persist();
  }
  fillForm(); render(); persist();
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('submit', event => { event.preventDefault(); update(); });
  document.querySelector('#checklist-shuffle')!.addEventListener('click', () => {
    state = { schema: 3, values: { ...state.values, ...suggestName(state.values.token) } };
    fillForm(); showErrors({}); render(); persist();
    status.textContent = `Suggested ${state.values.title}.`;
  });
}
