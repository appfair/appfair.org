import { getCollection } from 'astro:content';
import { routeKey } from './localized-links.mjs';

export async function getPageRoutes() {
  const [pages, posts] = await Promise.all([getCollection('pages'), getCollection('blog')]);
  return new Set([
    '/', '/blog',
    ...pages.map(page => routeKey('/' + page.id.replace(/(^|\/)index$/, ''))),
    ...posts.filter(post => !post.data.draft || import.meta.env.DEV).map(post => `/blog/${post.id}`),
  ]);
}
