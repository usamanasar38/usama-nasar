# 12 · SEO, feeds and LLM files

```text
Read CLAUDE.md and docs/design/06-quality.md (SEO checklist, LLM and AI-search readability).

Build:
1. src/lib/seo.ts: a helper that returns head() meta/links for a route: <title> ("{page} · Usama Nasar";
   home = "Usama Nasar — Senior frontend & full-stack engineer"), description, canonical (absolute,
   site.url), og:title/description/url/type/image (+ width/height/alt), twitter:card summary_large_image.
   Apply it to every route.
2. JSON-LD (script type application/ld+json via head()):
   - "/": ProfilePage with mainEntity Person (@id site.url#person; name, url, jobTitle, image, sameAs
     socials, knowsAbout = stack item names).
   - "/blog": Blog with blogPost summaries.
   - "/blog/$slug": BlogPosting (headline, description, datePublished, dateModified, author → Person @id,
     image, keywords = tags, mainEntityOfPage) + BreadcrumbList.
3. OG images: posts with a cover use it. Posts without one get a build-time image at /og/$slug.png
   (1200×630, white, LogoTile top-left, title in Host Grotesk 600, date in Commit Mono), generated with
   satori + resvg (or the TanStack Start-compatible equivalent) during the build, not per request.
   Other pages use /og-default-light.png.
4. /sitemap.xml (all non-draft routes, lastmod from updated ?? date), /robots.txt (allow all, sitemap URL,
   plus a COMMENTED block listing GPTBot, ClaudeBot, Google-Extended, PerplexityBot, CCBot with Disallow so
   Usama can opt out in one edit), /rss.xml (RSS 2.0, full rendered HTML content, newest 20).
5. src/lib/llms.ts + routes /llms.txt and /llms-full.txt (text/plain; charset=utf-8):
   - llms.txt: "# Usama Nasar", a "> " summary (role + intro), then "## About", "## Blog" (each post as
     "- [title](site.url/blog/slug.md): description"), "## Projects", "## Optional" (socials).
   - llms-full.txt: the whole site as one markdown document (intro, stack, experience, projects, then
     every post's raw markdown under its title and URL). Drafts and [BRACKET] placeholders excluded.
6. Prerender all of the above at build.

Acceptance:
- Google Rich Results Test validates ProfilePage, BlogPosting and BreadcrumbList.
- The RSS feed and sitemap validate; robots.txt lists the sitemap.
- llms.txt follows the llmstxt.org shape and lists every non-draft post; no "[" placeholders appear in it.
```
