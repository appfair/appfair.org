// Small helpers for the blog: an excerpt from a post's markdown body, and a reading-time estimate.

/** Plain-text excerpt: the first prose paragraph, stripped of markdown and HTML, cut to `max` chars. */
export function excerpt(body: string, max = 180): string {
  const lines = body.replace(/\r/g, '').split('\n');
  let i = 0;
  const skipBlank = () => { while (i < lines.length && lines[i].trim() === '') i++; };
  skipBlank();
  // Skip leading headings, images, HTML blocks, and italic-only cross-posting notes.
  while (i < lines.length && (/^#{1,6}\s/.test(lines[i]) || /^<[^>]+>/.test(lines[i].trim()) || /^!\[/.test(lines[i]) || /^_.*_$/.test(lines[i].trim()))) {
    // Skip a whole HTML block until a blank line.
    if (/^<[^>]+>/.test(lines[i].trim())) { while (i < lines.length && lines[i].trim() !== '') i++; } else { i++; }
    skipBlank();
  }
  const para: string[] = [];
  while (i < lines.length && lines[i].trim() !== '') { para.push(lines[i]); i++; }
  let text = para.join(' ')
    .replace(/<[^>]+>/g, '')
    .replace(/^>\s?/gm, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/\[\^[^\]]+\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length > max) text = text.slice(0, max).replace(/\s+\S*$/, '').trim() + '…';
  return text;
}

/** Minutes at ~220 words per minute, never below 1. */
export function readingTime(body: string): number {
  const words = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
