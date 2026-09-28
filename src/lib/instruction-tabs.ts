/** Progressively enhance alternative instructions; without JS both methods stay readable. */
export function setupInstructionTabs() {
  for (const root of document.querySelectorAll<HTMLElement>('[data-instruction-tabs]')) {
    if (root.dataset.tabsReady) continue;
    const list = root.querySelector<HTMLElement>('.method-tabs')!;
    const tabs = [...list.querySelectorAll<HTMLButtonElement>('button')];
    const panels = [...root.querySelectorAll<HTMLElement>('.method-panel')];
    function select(index: number, focus = false) {
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
        panels[i].hidden = i !== index;
      });
      if (focus) tabs[index].focus({ preventScroll: true });
    }
    tabs.forEach((tab, i) => {
      tab.setAttribute('role', 'tab');
      panels[i].setAttribute('role', 'tabpanel');
      panels[i].setAttribute('aria-labelledby', tab.id);
      panels[i].tabIndex = 0;
      tab.addEventListener('click', () => select(i));
      tab.addEventListener('keydown', event => {
        const next = { ArrowRight: (i + 1) % tabs.length, ArrowLeft: (i + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 }[event.key];
        if (next === undefined) return;
        event.preventDefault(); select(next, true);
      });
    });
    list.setAttribute('role', 'tablist');
    list.hidden = false;
    root.dataset.tabsReady = 'true';
    function selectHash() {
      const index = panels.findIndex(panel => `#${panel.id}` === location.hash);
      if (index < 0) return false;
      select(index);
      panels[index].scrollIntoView({ block: 'start' });
      return true;
    }
    select(0);
    selectHash();
    window.addEventListener('hashchange', selectHash);
  }
}
