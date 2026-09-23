import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';
import { excerpt } from '../../lib/posts';

// One share card per page (astro-og-canvas appends .png): /og/index.png, /og/blog.png, /og/blog/<slug>.png, /og/<page>.png.
const posts = await getCollection('blog', ({ data }) => !data.draft);
const pages = await getCollection('pages');

const entries: Record<string, { title: string; description: string }> = {
  index: { title: 'The App Fair Project', description: 'The free and open-source app store for the iPhone and Android' },
  blog: { title: 'The App Fair Blog', description: 'News, talks, and policy writing from the App Fair Project.' },
};
for (const post of posts) entries[`blog/${post.id}`] = { title: post.data.title, description: post.data.description ?? excerpt(post.body ?? '', 140) };
for (const page of pages) entries[page.id.replace(/(^|\/)index$/, '') || 'index'] = { title: page.data.title, description: page.data.description ?? 'The App Fair Project' };

export const { getStaticPaths, GET } = await OGImageRoute({
  pages: entries,
  param: 'slug',
  getImageOptions: (_id, page) => ({
    title: page.title,
    description: page.description,
    logo: { path: './src/assets/appfair-icon.png', size: [64] },
    bgGradient: [[11, 18, 32], [19, 28, 48], [0, 91, 163]],
    border: { color: [0, 145, 255], width: 18, side: 'inline-start' },
    padding: 80,
    font: {
      title: { color: [255, 255, 255], size: 62, lineHeight: 1.2, weight: 'Bold' },
      description: { color: [186, 210, 245], size: 30, lineHeight: 1.4 },
    },
  }),
});
