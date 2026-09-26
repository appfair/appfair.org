import test from 'node:test';
import assert from 'node:assert/strict';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import rehypeAdmonitions from '../src/lib/rehype-admonitions.mjs';
import { admonitions } from '../src/lib/admonitions.mjs';

const renderer = await createMarkdownProcessor({ rehypePlugins: [rehypeAdmonitions] });
test('all callout variants render with labels, icons and Markdown bodies', async () => {
  for (const kind of Object.keys(admonitions)) {
    const { code } = await renderer.render(`> [!${kind.toUpperCase()}] A useful detail\n> Read **this** and [the guide](/docs/).\n>\n> - First item\n> - Second item`);
    assert.match(code, new RegExp(`admonition-${kind}`));
    assert.match(code, /role="note"/);
    assert.match(code, /<svg[^>]+aria-hidden="true"/);
    assert.match(code, /A useful detail/);
    assert.match(code, /<strong>this<\/strong>/);
    assert.match(code, /href="\/docs\/"/);
    assert.match(code, /<li>First item<\/li>/);
    assert.doesNotMatch(code, /\[!/);
  }
});
test('callouts support default titles, separate body paragraphs and nested blocks', async () => {
  const { code } = await renderer.render('> [!NOTE]\n>\n> A paragraph.\n>\n> ```sh\n> echo hello\n> ```\n>\n> > [!TIP]\n> > Nested advice.');
  assert.match(code, /aria-label="Note"/);
  assert.match(code, /A paragraph/);
  assert.match(code, /echo/);
  assert.match(code, /admonition-tip/);
});
test('ordinary quotations and unknown markers retain blockquote semantics', async () => {
  const { code } = await renderer.render('> Someone said this.\n\n> [!UNKNOWN]\n> Not a supported callout.');
  assert.equal((code.match(/<blockquote>/g) ?? []).length, 2);
  assert.doesNotMatch(code, /<aside/);
});
test('callout titles remain escaped text', async () => {
  const { code } = await renderer.render('> [!WARNING] &lt;script&gt;alert(1)&lt;/script&gt;\n> Body.');
  assert.match(code, /admonition-warning/);
  // Angle brackets are legal inside quoted attributes; they must not become elements.
  assert.doesNotMatch(code.replace(/"[^"]*"/g, ''), /<script>/);
  assert.match(code, /&#x3C;script>|&lt;script&gt;/);
});
