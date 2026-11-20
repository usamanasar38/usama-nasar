import { allPosts } from "content-collections";

/** Server-only post access. Client code reaches it through the server functions in posts.ts. */

export type Post = (typeof allPosts)[number];

/** What lists, cards, search and feeds need: everything except bodies and headings. */
export type PostSummary = Pick<
  Post,
  | "cover"
  | "coverAlt"
  | "date"
  | "description"
  | "draft"
  | "readingTime"
  | "slug"
  | "tags"
  | "title"
  | "updated"
>;

/** Newest first; drafts only in development. */
export const publishedPosts = () =>
  allPosts
    .filter((post) => !(import.meta.env.PROD && post.draft))
    .toSorted((a, b) => b.date.localeCompare(a.date));

export const summarise = (post: Post): PostSummary => ({
  cover: post.cover,
  coverAlt: post.coverAlt,
  date: post.date,
  description: post.description,
  draft: post.draft,
  readingTime: post.readingTime,
  slug: post.slug,
  tags: post.tags,
  title: post.title,
  updated: post.updated,
});

/** Every tag in use, alphabetical. */
export const allTags = () =>
  [...new Set(publishedPosts().flatMap((post) => post.tags))].toSorted();
