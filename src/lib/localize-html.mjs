import { parse } from 'parse5';
import { localizePageLink } from './localized-links.mjs';

/** Edit href attributes by source position, preserving page prose, code examples and markup. */
export function localizeHtmlLinks(html, options) {
  const edits = [];
  function visit(node) {
    if (['pre', 'code', 'script', 'style'].includes(node.tagName)) return;
    if (node.tagName === 'a') {
      const attrs = Object.fromEntries(node.attrs.map(({ name, value }) => [name, value]));
      const location = node.sourceCodeLocation?.attrs?.href;
      if (location && !('hreflang' in attrs) && !('download' in attrs) && !('data-keep-language' in attrs)) {
        const href = localizePageLink(attrs.href, options);
        if (href !== attrs.href) {
          const escaped = href.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
          edits.push({ ...location, value: `href="${escaped}"` });
        }
      }
    }
    for (const child of node.childNodes ?? []) visit(child);
  }
  visit(parse(html, { sourceCodeLocationInfo: true }));
  for (const edit of edits.sort((a, b) => b.startOffset - a.startOffset)) {
    html = html.slice(0, edit.startOffset) + edit.value + html.slice(edit.endOffset);
  }
  return html;
}
