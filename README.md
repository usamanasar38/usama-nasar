# usamanasar.dev

Personal portfolio and blog of **Usama Nasar**, senior frontend & full-stack engineer.

Monochrome with one blue accent, pill-and-circle shapes, sections separated by space, and small optional
UI sounds. Every page is server-rendered and prerendered to static HTML, and the whole site is readable
by LLMs as plain markdown.

## Features

- **Home:** intro with availability badge, overview, tech stack, experience timeline, projects, latest
  posts, education, recognition and contact links.
- **Blog:** `.md` / `.mdx` posts with build-time syntax highlighting (light and dark), table of contents,
  zoomable images, tag filter (`/blog?tag=react`) and previous/next links.
- **Command palette:** <kbd>⌘K</kbd> searches pages, posts, projects, links and actions.
- **Dock:** search, copy email, book a call and a sound toggle; a bottom nav bar on mobile.
- **Theme:** light, dark or system, with no flash on load.
- **Sound:** soft UI sounds through soundcn, loaded only after the first interaction and always mutable.
- **SEO and LLMs:** per-route meta, Open Graph and JSON-LD; `sitemap.xml`, `rss.xml`, `robots.txt`,
  `llms.txt`, `llms-full.txt`, a `.md` twin for every post and section, and a downloadable vCard.

## Stack

[TanStack Start](https://tanstack.com/start) (React 19, SSR, Vite, Nitro) · TypeScript · Tailwind CSS 4 ·
shadcn/ui (`base-mira` on Base UI) · Motion · Phosphor icons · simple-icons · content-collections ·
rehype-pretty-code + Shiki · soundcn · Ultracite (Oxlint + Oxfmt). Deployed on Vercel.

## Getting started

Requires a recent Node (22+) and pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

| Script | What it does |
|---|---|
| `pnpm dev` | Dev server on port 3000 |
| `pnpm build` | Production build; prerenders every page and feed |
| `pnpm preview` | Serve the production build locally |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm check` / `pnpm fix` | Lint and format with Ultracite |

Optional environment variable: `VITE_APP_URL` overrides the site URL used for canonicals, feeds and OG
tags (defaults to the website in `user.ts`).

## Project structure

```text
content/posts/              Blog posts (.md / .mdx) with frontmatter
content-collections.ts      Post schema, MDX pipeline, headings and reading time
docs/design/                Design system: brand, tokens, components, pages, content, quality, motion
prompts/                    Original build prompts and their agent rules (CLAUDE.md), kept for reference
public/                     Favicons, manifest, OG images, brand SVGs
src/
  components/
    ui/                     shadcn components, restyled to the design tokens
    brand/                  Logo marks (fixed; don't redraw)
    site/                   Header, footer, dock, theme toggle, shared pieces
    home/                   Home page sections
    blog/                   Post card, MDX components, table of contents
    search/                 ⌘K command palette
  config/                   Site config and JSON-LD
  content/site.ts           Home-page copy, contact links, placeholders
  features/portfolio/       Typed portfolio data: user, experience, projects, stack, education…
  lib/                      Server functions, SEO, feeds, llms.txt, theme, sound, utils
  routes/                   File-based routes, including .md / .txt / .xml endpoints
  styles/                   app.css (tokens, type scale, motion utilities), article.css (blog prose)
```

## Editing content

- **Profile, experience, projects, stack, education, recognition:** edit the files in
  `src/features/portfolio/data/`. Pages, search, JSON-LD and the `.md` endpoints all read from there.
- **Home-page copy and links:** `src/content/site.ts`. Values in `[BRACKETS]` are placeholders and stay
  hidden until they're filled in.
- **Booking link and source repo:** `CAL_URL` and `SOURCE_CODE_GITHUB_URL` in `src/config/site.ts`.
- **Avatar and project screenshots:** drop them in `public/`. Components render an image only when its
  file exists.

### Writing a post

Add `content/posts/<slug>.md` (or `.mdx`):

```md
---
title: Up to 70 characters
description: 80 to 170 characters, used for meta tags, cards and feeds.
date: 2026-11-21
tags: [react, performance]   # 1 to 3
cover: ./my-post/cover.avif  # optional, next to the post; needs coverAlt
coverAlt: What the cover shows
draft: true                  # visible in dev only
---
```

GitHub-flavoured markdown works (tables, task lists). Code fences are highlighted at build time. Posts
show up in the blog, search, sitemap, RSS and `llms.txt` automatically.

## Endpoints

| Path | Content |
|---|---|
| `/blog/<slug>.md` | A post as raw markdown |
| `/about.md`, `/experience.md`, `/projects.md`, `/education.md`, `/recognition.md` | Each section as markdown |
| `/llms.txt`, `/llms-full.txt` | Site index and full text for LLMs |
| `/rss.xml`, `/sitemap.xml`, `/robots.txt` | Feeds and crawler files |
| `/vcard` | Contact card download |

## Contributing (humans and agents)

Read [AGENTS.md](AGENTS.md) first: it holds the design rules (tokens only, one accent, type scale, sound
and motion limits) and the definition of done. The detailed specs live in [docs/design](docs/design/).
Before opening a PR, run `pnpm typecheck` and `pnpm build`, and check the change at 390px and 1440px in
light and dark.
