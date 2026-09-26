// Shared by Markdown alerts and the Astro/MDX component.
export const admonitions = {
  note: { label: 'Note', icon: 'M6 3h9l4 4v14H5V3h1m8 0v5h5M8 12h8M8 16h6' },
  info: { label: 'Info', icon: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M12 11v6M12 7v.01' },
  tip: { label: 'Tip', icon: 'M9 18h6M10 21h4M9 15c0-2-3-3-3-7a6 6 0 0 1 12 0c0 4-3 5-3 7H9' },
  important: { label: 'Important', icon: 'm12 2 10 10-10 10L2 12 12 2M12 7v6M12 17v.01' },
  warning: { label: 'Warning', icon: 'M12 3 2 21h20L12 3M12 10v5M12 18v.01' },
  caution: { label: 'Caution', icon: 'M8 2h8l6 6v8l-6 6H8l-6-6V8l6-6M12 7v6M12 17v.01' },
};
export function admonitionHeading(kind, title) {
  const label = admonitions[kind].label;
  return title ? `${label}: ${title}` : label;
}
