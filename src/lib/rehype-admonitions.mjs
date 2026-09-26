import { admonitions, admonitionHeading } from './admonitions.mjs';

const element = (tagName, properties, children) => ({ type: 'element', tagName, properties, children });
const text = value => ({ type: 'text', value });

// GitHub-style alerts work in every Markdown and MDX page. Ordinary quotations
// stay blockquotes. An optional plain-text title follows the marker on its line.
export default function rehypeAdmonitions() {
  return function transform(tree) {
    function visit(node) {
      if (node.type === 'element' && node.tagName === 'blockquote') {
        const first = node.children.find(child => child.type === 'element');
        const lead = first?.tagName === 'p' ? first.children[0] : undefined;
        const match = lead?.type === 'text' && /^\[!(NOTE|INFO|TIP|IMPORTANT|WARNING|CAUTION)\](?:[ \t]+([^\n]+))?(?:\r?\n|$)/i.exec(lead.value);
        if (match) {
          const kind = match[1].toLowerCase();
          const heading = admonitionHeading(kind, match[2]?.trim());
          lead.value = lead.value.slice(match[0].length);
          if (!lead.value) first.children.shift();
          if (!first.children.some(child => child.type !== 'text' || child.value.trim())) {
            node.children.splice(node.children.indexOf(first), 1);
          }
          const body = node.children;
          node.tagName = 'aside';
          node.properties = { className: ['admonition', `admonition-${kind}`], role: 'note', ariaLabel: heading };
          node.children = [
            element('p', { className: ['admonition-heading'] }, [
              element('svg', { className: ['admonition-icon'], width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', ariaHidden: 'true', focusable: 'false' }, [element('path', { d: admonitions[kind].icon }, [])]),
              element('span', {}, [text(heading)]),
            ]),
            element('div', { className: ['admonition-body'] }, body),
          ];
        }
      }
      for (const child of node.children ?? []) visit(child);
    }
    visit(tree);
  };
}
