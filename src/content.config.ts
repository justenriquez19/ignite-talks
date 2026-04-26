import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const talks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    event: z.string(),
    date: z.coerce.date(),
    location: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    slideCount: z.number(),
    hero: z.string().optional(),
  }),
});

export const collections = { talks };
