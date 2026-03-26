import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    pose: z.enum(['thinking', 'reading', 'writing', 'presenting', 'enforcement']).optional(),
  }),
});

export const collections = { posts };
