import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import GithubSlugger from "github-slugger";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { z } from "zod";

/** Words per minute for `readingTime` (docs/design/05-content.md). */
const WORDS_PER_MINUTE = 230;

const HEADING = /^(#{2,3})\s+(.+?)\s*#*\s*$/;
const FENCE = /^(```|~~~)/;

/** Strips inline markdown so heading text matches what rehype-slug sees. */
const plainText = (markdown: string) =>
  markdown
    .replaceAll(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replaceAll(/[*_~`]/g, "")
    .replaceAll(/<[^>]+>/g, "")
    .trim();

/** h2/h3 headings with the same ids rehype-slug gives them, for the table of contents. */
const extractHeadings = (markdown: string) => {
  const slugger = new GithubSlugger();
  const headings: { depth: 2 | 3; text: string; id: string }[] = [];
  let inFence = false;

  for (const line of markdown.split("\n")) {
    if (FENCE.test(line.trim())) {
      inFence = !inFence;
      continue;
    }

    const match = inFence ? null : HEADING.exec(line);

    if (match?.[1] && match[2]) {
      const text = plainText(match[2]);
      headings.push({
        depth: match[1].length === 2 ? 2 : 3,
        id: slugger.slug(text),
        text,
      });
    }
  }

  return headings;
};

const posts = defineCollection({
  directory: "content/posts",
  include: "*.{md,mdx}",
  name: "posts",
  schema: z.object({
    content: z.string(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    date: z.coerce.date(),
    description: z.string().min(80).max(170),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).min(1).max(3),
    title: z.string().max(70),
    updated: z.coerce.date().optional(),
  }),
  transform: async (doc, ctx) => {
    if (doc.cover && !doc.coverAlt) {
      throw new Error(
        `${doc._meta.filePath}: "coverAlt" is required when "cover" is set.`
      );
    }

    const body = await compileMDX(ctx, doc, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          { behavior: "wrap", properties: { className: ["heading-anchor"] } },
        ],
        [
          rehypePrettyCode,
          {
            keepBackground: false,
            theme: { dark: "vitesse-black", light: "vitesse-light" },
          },
        ],
      ],
    });

    const words = doc.content.trim().split(/\s+/).length;
    const slug = doc._meta.path;

    return {
      body,
      cover: doc.cover,
      coverAlt: doc.coverAlt,
      date: doc.date.toISOString(),
      description: doc.description,
      draft: doc.draft,
      headings: extractHeadings(doc.content),
      raw: doc.content,
      readingTime: Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)),
      slug,
      tags: doc.tags.map((tag) => tag.toLowerCase()),
      title: doc.title,
      updated: doc.updated?.toISOString(),
    };
  },
});

export default defineConfig({ content: [posts] });
