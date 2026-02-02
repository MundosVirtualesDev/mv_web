import { defineCollection, z } from "astro:content";

const areaEnum = z.enum(["automatizacion", "efectivo"]);

const services = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      area: areaEnum,
      summary: z.string().min(20).max(200),

      heroImage: image().optional(),

      bullets: z.array(z.string()).min(3).max(8).optional(),
      useCases: z.array(z.string()).min(3).max(12).optional(),
      capabilities: z.array(z.string()).min(3).max(16).optional(),

      order: z.number().int().min(1).max(99).default(50),
      featured: z.boolean().default(false),
    }),
});

const projects = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      area: areaEnum,

      excerpt: z.string().min(20).max(240),

      coverImage: image(),
      gallery: z.array(image()).max(12).optional(),

      tags: z.array(z.string()).min(1).max(20).default([]),
      serviceRefs: z.array(z.string()).max(8).optional(),

      client: z.string().optional(),
      industry: z.string().optional(),
      location: z.string().optional(),
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),

      featured: z.boolean().default(false),
    }),
});

export const collections = { services, projects };
