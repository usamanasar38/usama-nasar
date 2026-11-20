# 07 · Content pipeline (.md and .mdx)

```text
Read CLAUDE.md and docs/design/05-content.md (all of it).

Goal: blog posts written as .md or .mdx in content/posts/ compile at build time with typed frontmatter,
build-time code highlighting and derived fields.

Steps:
1. Install: pnpm add -D @content-collections/core @content-collections/mdx @content-collections/vite
   rehype-slug rehype-autolink-headings rehype-pretty-code shiki. Check content-collections' current docs
   and adapt the config in 05-content.md to its current API; keep the output contract (slug, title,
   description, date, updated, tags, cover, coverAlt, draft, readingTime, headings, body, raw).
2. Add the Vite plugin and the tsconfig path alias content-collections needs.
3. Collection "posts": include "*.{md,mdx}", Zod schema exactly as in 05-content.md, transform that
   compiles MDX with rehype-slug, rehype-autolink-headings (behavior "wrap") and rehype-pretty-code (themes
   vitesse-light / vitesse-black, keepBackground false), and derives readingTime (words / 230) and headings
   (h2/h3 text + id for the table of contents).
4. Covers: support a relative cover path (./<slug>/cover.avif) resolved to a hashed asset URL, or an
   absolute /public path.
5. src/lib/posts.ts: getPosts({ tag? }) (newest first, drafts excluded in production), getPost(slug),
   getAdjacentPosts(slug), getAllTags(). Server-only.
6. Two sample posts with draft: true: content/posts/hello-world.md (headings, list, inline code, a ts code
   block with a title and a highlighted line, a table, a blockquote, an image) and
   content/posts/mdx-demo.mdx (same plus one small React component).
7. Feed posts into the search index from prompt 06.

Acceptance:
- A frontmatter error fails the build with a readable message.
- No Shiki / highlighter code in the client bundle (check the build output).
- getPosts() returns both drafts in dev and none in a production build.
```
