// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';

// 2. Define your collection(s)
const projectsCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        date: z.date(),
        description: z.string(),
        image: z.object({
            src: image(),
            alt: z.string(),
        }),
        tech: z.array(z.string()),
        priority: z.enum([
            'high',
            'medium',
            'low'
        ]),
        links: z.array(z.object({
            href: z.string().url(),
            label: z.enum([
                'github',
                'view'
            ]),
        })).optional(),
        draft: z.boolean().optional(),
    })
});

const experimentsCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        date: z.date(),
        description: z.string(),
        image: z.object({
            src: image(),
            alt: z.string()
        }),
        link: z.string()
    })
})

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
    projects: projectsCollection,
    experiments: experimentsCollection
}