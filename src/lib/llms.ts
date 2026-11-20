import { absoluteUrl } from "@/config/site";
import { llmsFullTxt, llmsTxt } from "@/features/portfolio/lib/markdown";
import { publishedPosts } from "@/lib/posts.server";

/** Server-only builders for /llms.txt and /llms-full.txt (06-quality.md#llms). */

const posts = () =>
  publishedPosts()
    .filter((post) => !post.draft)
    .map((post) => ({
      date: post.date.slice(0, 10),
      description: post.description,
      raw: post.raw,
      slug: post.slug,
      title: post.title,
    }));

export const buildLlmsTxt = () => llmsTxt(posts());

export const buildLlmsFullTxt = () => llmsFullTxt(posts());

/** "/blog/<slug>.md": a small frontmatter header plus the post's markdown source. */
export const postMarkdown = (post: ReturnType<typeof publishedPosts>[number]) =>
  `---
title: ${JSON.stringify(post.title)}
description: ${JSON.stringify(post.description)}
date: ${post.date.slice(0, 10)}${post.updated ? `\nupdated: ${post.updated.slice(0, 10)}` : ""}
tags: [${post.tags.join(", ")}]
url: ${absoluteUrl(`/blog/${post.slug}`)}
author: Usama Nasar
---

# ${post.title}

${post.raw.trim()}
`;
