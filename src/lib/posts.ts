import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { blogJsonLd, blogPostingJsonLd, breadcrumbListJsonLd } from "@/config/json-ld";
import { coverUrl } from "@/lib/covers";
import { allTags, publishedPosts, summarise } from "@/lib/posts.server";
import { jsonLdScript } from "@/lib/seo";

export type { PostSummary } from "@/lib/posts.server";

/**
 * Blog data for loaders and the search palette. These run on the server (during SSR and
 * prerendering, or as RPC on client navigation), so post bodies and JSON-LD builders never
 * ship in the client bundle; only what a page renders is serialised into it.
 */

/** Cover (resolved) or the generated /og/<slug>.png. */
const ogImage = (post: { slug: string; cover?: string }) =>
  coverUrl(post.cover) ?? `/og/${post.slug}.png`;

export const getPosts = createServerFn({ method: "GET" }).handler(() =>
  publishedPosts().map(summarise)
);

export const getBlogIndex = createServerFn({ method: "GET" })
  .validator((input: { tag?: string }) => input)
  .handler(({ data }) => {
    const tags = allTags();
    const tag = data.tag !== undefined && tags.includes(data.tag) ? data.tag : undefined;
    const all = publishedPosts();
    const posts = all.filter((post) => tag === undefined || post.tags.includes(tag)).map(summarise);
    const jsonLd = jsonLdScript(
      blogJsonLd(all.map((post) => ({ ...summarise(post), image: ogImage(post) })))
    ).children;
    return { jsonLd, posts, tag, tags };
  });

export const getPost = createServerFn({ method: "GET" })
  .validator((input: { slug: string }) => input)
  .handler(({ data }) => {
    const posts = publishedPosts();
    const index = posts.findIndex((post) => post.slug === data.slug);
    const post = posts[index];
    if (!post) {
      throw notFound();
    }
    const newer = posts[index - 1];
    const older = posts[index + 1];
    const image = ogImage(post);
    return {
      ...summarise(post),
      body: post.body,
      headings: post.headings,
      image,
      jsonLd: [
        blogPostingJsonLd({ ...summarise(post), image }),
        breadcrumbListJsonLd([
          { href: "/blog", name: "Blog" },
          { href: `/blog/${post.slug}`, name: post.title },
        ]),
      ].map((item) => jsonLdScript(item).children),
      next: newer ? { slug: newer.slug, title: newer.title } : null,
      previous: older ? { slug: older.slug, title: older.title } : null,
    };
  });
