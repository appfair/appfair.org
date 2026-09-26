/** Enhance both Markdown fences and CodeBlock components with the same copy control. */
export function setupCodeBlocks() {
  const template = document.querySelector<HTMLTemplateElement>('#code-copy-template');
  if (!template) return;
  for (const code of document.querySelectorAll<HTMLElement>('#main pre > code')) {
    const pre = code.parentElement!;
    if (pre.closest('[data-no-copy]')) continue;
    let block = pre.parentElement!;
    if (!block.hasAttribute('data-code-block')) {
      block = document.createElement('div');
      block.className = 'code-block';
      block.setAttribute('data-code-block', '');
      pre.before(block);
      block.append(pre);
    }
    if (block.dataset.copyReady) continue;
    // Preserve the syntax highlighter's background in the button gutter.
    if (pre.style.backgroundColor) block.style.setProperty('--code-background', pre.style.backgroundColor);
    if (pre.style.color) block.style.color = pre.style.color;
    block.append(template.content.cloneNode(true));
    block.dataset.copyReady = 'true';
    const button = block.querySelector<HTMLButtonElement>('.copy-command')!;
    const status = block.querySelector<HTMLElement>('.copy-feedback')!;
    const label = () => block.dataset.copyLabel || 'Copy code to clipboard';
    button.setAttribute('aria-label', label());
    let resetTimer: ReturnType<typeof setTimeout>;
    button.addEventListener('click', async () => {
      clearTimeout(resetTimer);
      delete button.dataset.copied;
      status.textContent = '';
      button.disabled = true;
      let copied = false;
      try {
        await navigator.clipboard.writeText(code.textContent ?? '');
        copied = true;
        button.dataset.copied = 'true';
        button.title = 'Copied';
        button.setAttribute('aria-label', 'Copied');
        status.textContent = 'Copied';
      } catch {
        const range = document.createRange();
        range.selectNodeContents(code);
        const selection = getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        button.title = 'Copy unavailable';
        status.textContent = 'Copy unavailable. Text selected; use your browser’s Copy command.';
      } finally {
        button.disabled = false;
        resetTimer = setTimeout(() => {
          delete button.dataset.copied;
          button.title = 'Copy to clipboard';
          button.setAttribute('aria-label', label());
          status.textContent = '';
        }, copied ? 2000 : 6000);
      }
    });
  }
}
