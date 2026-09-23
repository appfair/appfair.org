import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog posts: src/content/blog/<slug>.md. The id (URL slug) is the lower-cased file name.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().default('The App Fair Project'),
    tags: z.array(z.string()).default([]),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    // Ignored, kept so the existing posts' frontmatter validates unchanged.
    layout: z.string().optional(),
  }),
});

// Standalone pages: src/content/pages/<path>.md is served at /<path>/ (an `index` file at the folder).
const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // 'wide' drops the reading-column limit for long reference documents.
    width: z.enum(['prose', 'wide']).default('prose'),
    date: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    // Legacy frontmatter from the Jekyll/Starlight eras, accepted and ignored.
    name: z.string().optional(),
    template: z.string().optional(),
    layout: z.string().optional(),
    editUrl: z.boolean().optional(),
    tableOfContents: z.boolean().optional(),
    sideBar: z.boolean().optional(),
  }),
});

export const collections = { blog, pages };
