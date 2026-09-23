import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { excerpt } from '../../lib/posts';

// The feed URL (/blog/rss.xml) is unchanged from the previous site so existing subscriptions keep working.
export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({
    title: 'The App Fair Project',
    description: 'News, talks, and policy writing from the App Fair Project.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description ?? excerpt(post.body ?? '', 300),
      link: `/blog/${post.id}/`,
      author: post.data.author,
      categories: post.data.tags,
    })),
    customData: '<language>en</language>',
  });
}
