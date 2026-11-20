# 11 · Blog pages

```text
Read CLAUDE.md, docs/design/04-pages.md (Blog, Post), 03-components.md (Article, Table of contents, Post
card), 05-content.md and the "LLM and AI-search readability" section of 06-quality.md.

Build:
1. /blog (src/routes/blog/index.tsx):
   - validateSearch with Zod: { tag?: string } (must be one of getAllTags(), else ignore).
   - Header: <h1 className="text-h1">Blog</h1> + muted line with an RSS link.
   - Tag filter: pill Links (not buttons) to /blog?tag=x with replace navigation; active = bg-foreground
     text-background border-foreground + aria-current="page"; "all" first. Server-rendered for the initial URL.
   - Grid of PostCard (as="h2"), newest first; first card priority. Empty filter → shadcn Empty with the
     Wave mark, "No posts tagged {tag} yet." and a pill to clear the filter.
2. /blog/$slug (src/routes/blog/$slug.tsx):
   - Loader gets the post; unknown slug → notFound() (real 404).
   - Layout widens to max-w-post: grid lg:grid-cols-[minmax(0,1fr)_200px] gap-16, pt-14 pb-24.
   - Article column (max-w-reading): shadcn Breadcrumb (Blog / title), meta row (date · read time · tag
     badges), <h1 className="text-h1">, muted text-lead description, cover 1200×630 rounded-xl border
     (eager, fetchPriority high), then <article className="article"> with the compiled MDX.
   - MDX components: pre/figure from rehype-pretty-code → shadcn CodeBlock shell (file name header, copy
     button that plays "success"), keeping the build-time highlighted HTML; img → Kibo ImageZoom around
     <img loading="lazy" decoding="async" width height alt> with rounded-xl border; a → internal Link or
     external with rel="noreferrer" and an sr-only new-tab note; table → wrapped in div.table-wrap.
   - End: prev/next cards (2-col, rounded-xl border p-4, "← previous" / "next →" mono) and a
     "View as markdown" link to /blog/$slug.md.
   - Right column ≥ lg: sticky (top-24) table of contents from post.headings, IntersectionObserver for the
     active heading (text-foreground + foreground left border), no scroll listeners.
   - <link rel="alternate" type="text/markdown" href="/blog/$slug.md"> in head().
3. /blog/$slug.md: a server route returning "---\ntitle…\ndate…\nurl…\n---\n\n" + post.raw with
   Content-Type "text/markdown; charset=utf-8". 404 for drafts and unknown slugs.
4. Prerender /blog, every /blog/$slug and /blog/$slug.md for non-draft posts.

Acceptance:
- /blog?tag=<tag> server-renders filtered results; /blog/does-not-exist returns 404.
- Code blocks are highlighted in both themes with zero highlighter JS on the client; copy works.
- Images zoom with mouse and keyboard; table of contents tracks the current heading.
```
