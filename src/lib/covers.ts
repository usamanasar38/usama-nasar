/**
 * Resolves a post's `cover` frontmatter to a URL. Relative covers (`./<slug>/cover.avif`,
 * next to the post) become hashed Vite assets; absolute paths (`/blog/x.avif`) are served
 * from public/ as they are.
 */
const assets = import.meta.glob<string>("/content/posts/**/*.{avif,webp,png,jpg,jpeg}", {
  eager: true,
  import: "default",
  query: "?url",
});

export const coverUrl = (cover: string | undefined) => {
  if (cover === undefined) {
    return undefined;
  }
  if (cover.startsWith("/") || cover.startsWith("http")) {
    return cover;
  }
  return assets[`/content/posts/${cover.replace(/^\.\//u, "")}`];
};
