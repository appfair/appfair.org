import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';

const entries = await getCollection('docs');

const pages = Object.fromEntries(
  entries.map(({ data, id }) => [id, { data }])
);

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  param: 'slug',
  getImageOptions: (_id, page: (typeof pages)[number]) => {
    return {
      title: page.data.title,
      description: page.data.description,
      logo: {
        path: './src/assets/appfair-icon.png',
        size: [60],
      },
      bgGradient: [[15, 23, 42], [30, 64, 120], [56, 97, 150]],
      border: { color: [96, 165, 250], width: 20, side: 'inline-start' },
      padding: 80,
      font: {
        title: {
          color: [255, 255, 255],
          size: 64,
          lineHeight: 1.2,
          weight: 'Bold',
        },
        description: {
          color: [186, 210, 245],
          size: 32,
          lineHeight: 1.4,
        },
      },
    };
  },
});
