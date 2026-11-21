# 05 · Content

## Page copy: `src/content/site.ts`

Typed data for the home page: `site`, `socials`, `overview`, `stack`, `experience`, `projects`,
`education`, `recognition`, `contactLinks`. Components import from here; no copy is hard-coded in JSX
except UI labels.

**Placeholders:** values in `[BRACKETS]` are unknown and must be filled in by Usama. Agents must not
invent employers, dates, degrees, awards, metrics or handles. Items with `draft: true` render in dev
and are removed in production by `visible()`. A section with no visible items is not rendered.

What's known and already filled in: name, role, ~7 years experience, current work on daleelaqar.com
(real estate platform for Jordan and Oman), Angular web client, SEO infrastructure, partners portal on
NestJS / GraphQL / PostgreSQL, and the stack list.

## Blog posts: `content/posts/*.md` and `*.mdx`

Write plain **`.md`** for most posts; use **`.mdx`** only when a post needs a React component (an
interactive demo, a custom diagram). Both go through the same pipeline and render in `.article`.
One file per post; the file name is the slug: `content/posts/cutting-lcp.md` → `/blog/cutting-lcp`.
Images for a post live next to it: `content/posts/cutting-lcp/cover.avif`.

```yaml
---
title: "Cutting LCP on a listings page"   # ≤ 70 characters, sentence case, no site name
description: "One or two sentences. Lead, meta description, OG text and llms.txt summary."   # 120–160 chars
date: 2026-11-20
updated: 2026-11-28            # optional; drives dateModified and sitemap lastmod
tags: [angular, performance]   # lowercase, 1–3, from the tag list below
cover: ./cutting-lcp/cover.avif   # optional, 1200×630; card image and OG image
coverAlt: "Waterfall chart before and after"   # required when cover is set
draft: false
---
```

Tags in use: `angular`, `react`, `vue`, `nestjs`, `graphql`, `performance`, `design-systems`, `seo`,
`accessibility`, `career`. Add new ones sparingly.

Derived at build: `slug`, `readingTime` (words / 230, rounded up), `headings` (h2/h3 for the table of
contents), `ogImage` (cover, or a generated `/og/<slug>.png`), `raw` (markdown body for `/blog/<slug>.md`,
`llms-full.txt` and RSS). Drafts are excluded from lists, RSS, sitemap, llms files and search in production.

### Pipeline (content-collections)

```ts
// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "*.{md,mdx}",
  schema: z.object({
    title: z.string().max(70),
    description: z.string().min(80).max(170),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).min(1).max(3),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
  transform: async (doc, ctx) => {
    const body = await compileMDX(ctx, doc, {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        [rehypePrettyCode, { theme: { light: "vitesse-light", dark: "vitesse-black" }, keepBackground: false }],
      ],
    });
    const words = doc.content.trim().split(/\s+/).length;
    return { ...doc, slug: doc._meta.path, body, raw: doc.content, readingTime: Math.max(1, Math.ceil(words / 230)) };
  },
});

export default defineConfig({ collections: [posts] });
```

Check the content-collections docs for the current package names and options before installing; the
shape above is the contract the components rely on (`slug`, `title`, `description`, `date`, `tags`,
`cover`, `readingTime`, `body`, `raw`).

## Projects with case studies (optional)

`content/projects/<slug>.mdx` with frontmatter `{ title, description, date, tags, href?, repo? }`. If a
file exists for a project's `slug`, the card title links to `/projects/<slug>`.

## Images

- Avatar: square, ≥ 384px, AVIF + WebP fallback, `public/avatar.avif`.
- Project images: 16:10, ≥ 1280×800, `public/projects/<slug>.avif`.
- Company and project logos: square, ≥ 48px, `public/images/companies/<slug>.{png,svg}`; set
  `companyLogo` on an experience and `logo` on a project. Use `{ light, dark }` for single-colour marks.
- Always set `width`, `height` and meaningful `alt` (or `alt=""` if decorative).
- Only the avatar is `fetchpriority="high"`. Everything below the fold is `loading="lazy"`.

## Writing style

See `01-brand.md#voice`. Lead with the outcome, then how. Numbers only if they're real and measured.
