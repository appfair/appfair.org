// Decorate display text without changing command text, clipboard contents or URLs.
export function highlightAppValues(root: HTMLElement, values: { token: string; title: string }) {
  for (const mark of root.querySelectorAll('[data-app-value]')) {
    const parent = mark.parentNode!;
    mark.replaceWith(document.createTextNode(mark.textContent ?? ''));
    parent.normalize();
  }
  const names = [...new Set([values.token, values.title])].filter(Boolean).sort((a, b) => b.length - a.length);
  const word = /[\p{L}\p{N}_-]/u;
  const targets = root.querySelectorAll('.step-label, .step-location, [data-guide-value], pre code, .method-description, .step-description, .optional-instructions, .step-operations, .method-operations');
  for (const target of targets) {
    const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    while (walker.nextNode()) nodes.push(walker.currentNode as Text);
    for (const node of nodes) {
      if (node.parentElement?.closest('[data-app-value]')) continue;
      const text = node.data;
      const parts: (string | HTMLElement)[] = [];
      let start = 0;
      for (let index = 0; index < text.length; index++) {
        const name = names.find(name => text.startsWith(name, index)
          && (index === 0 || !word.test(text[index - 1]))
          && (index + name.length === text.length || !word.test(text[index + name.length])));
        if (!name) continue;
        parts.push(text.slice(start, index));
        const mark = document.createElement('span');
        mark.dataset.appValue = '';
        mark.textContent = name;
        parts.push(mark);
        index += name.length - 1;
        start = index + 1;
      }
      if (parts.length) node.replaceWith(...parts, text.slice(start));
    }
  }
}
