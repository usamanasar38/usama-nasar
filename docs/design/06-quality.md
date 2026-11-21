# 06 · Quality: performance, SEO, accessibility

## Budgets (mobile, slow 4G, Lighthouse)

| Metric | Target |
|---|---|
| LCP | ≤ 1.8s (hero name text or avatar) |
| CLS | ≤ 0.02 |
| INP | ≤ 150ms |
| JS shipped on `/` | ≤ 90 kB gzip (search dialog lazy-loaded) |
| CSS | ≤ 25 kB gzip |
| Fonts on first view | 1 preloaded file (Host Grotesk latin, 20 kB); Commit Mono loads when used |

## How the design protects Core Web Vitals

- SSR for every route; no client-only rendering of content; no splash or skeletons.
- Fonts self-hosted, `font-display: swap`, one preload. Add the `fontaine` Vite plugin for metric-matched
  fallbacks so the swap doesn't shift layout.
- Theme set by an inline script before paint (no flash, no shift).
- Logo motion, cursor blink, scroll progress and the back-to-top reveal are CSS only
  (`animation-timeline: scroll()`, Baseline since Firefox 159). No scroll listeners anywhere.
- Show all uses `grid-template-rows` (no height measuring, no layout thrash). Experience rows are native
  `<details>`, so they work before hydration.
- Sounds (soundcn, about 20 kB of base64 MP3) are a separate chunk imported on the first pointer/key
  interaction; no AudioContext is created before that.
- Motion loads through `LazyMotion` with async features, so it never blocks first paint (08-motion.md).
- Blog cards: covers are `loading="lazy"` with width/height; only the first card on /blog is eager.
- Code highlighting and the search index are built at build time. cmdk and the dialog are lazy-loaded on
  first open (and prefetched on hover/focus of a search trigger).
- Icons: named imports from Phosphor and simple-icons only. Never `import *`.
- Images: AVIF, explicit dimensions, lazy below the fold.

## SEO checklist

- Per-route `head()`: `<title>` ("Post title · Usama Nasar"), meta description, canonical URL,
  Open Graph (`og:title`, `og:description`, `og:image` 1200×630, `og:type`), `twitter:card=summary_large_image`.
- JSON-LD: `ProfilePage` + `Person` on `/` (name, url, jobTitle, image, sameAs: socials, knowsAbout: stack),
  `Blog` on /blog, `BlogPosting` on posts (headline, description, datePublished, dateModified, author →
  Person @id, image, keywords: tags), `BreadcrumbList` on posts.
- `sitemap.xml` (all non-draft routes with `lastmod`), `robots.txt`, `rss.xml` (full posts).
- OG images generated at build time: tile mark, title in Host Grotesk 600, mono date, on white or black.
- One `<h1>` per page; headings in order; descriptive link text (no "click here").
- `lang="en"`, one `theme-color` meta that follows the chosen theme (set by `THEME_SCRIPT`), manifest and icons from `public/`.

## LLM and AI-search readability {#llms}

Goal: assistants and AI search engines can read, quote and cite the site accurately.

- **Server-rendered, semantic HTML.** Every fact is in the initial HTML (including the items behind
  Show all, which are only `inert`). Real headings in order, `<article>`, `<time dateTime>`, `<dl>` for facts.
- **`/llms.txt`**: short markdown index following the llmstxt.org convention (H1 name, one-line summary,
  link lists). **`/llms-full.txt`**: the whole site as one markdown file. Generated at build by
  `src/lib/llms.ts` (prompt 12). This is a community convention, not a standard, so treat it as a cheap extra.
- **`/blog/<slug>.md`**: each post's markdown source with a small frontmatter header, served as
  `text/markdown; charset=utf-8`, linked from the post with `<link rel="alternate" type="text/markdown">`.
- **JSON-LD** (below) is the most reliable structured signal; keep it complete and accurate.
- **Clear, quotable writing:** each post's `description` states the takeaway in one or two sentences;
  headings are descriptive ("Defer the filter panel") not clever.
- **robots.txt:** allow everything by default and list the sitemap. Whether to allow or block AI
  training crawlers (e.g. GPTBot, ClaudeBot, Google-Extended) is Usama's call; leave a commented block
  listing them so he can switch them off in one edit.
- Footer links to `llms.txt` so it's discoverable.

## Accessibility checklist

- Skip link first in tab order; `<main id="main" tabIndex={-1}>`.
- Landmarks: header, nav (labelled "Main", "Mobile", "Footer"), main, footer.
- All icon-only controls have `aria-label`; toggles use `aria-pressed`; accordion uses `aria-expanded`.
- Focus visible everywhere (2px brand outline, 2px offset). Never `outline: none` without a replacement.
- Command palette: focus trapped, returns to the trigger on close, `esc` closes, results announced
  by cmdk.
- Touch targets ≥ 44px in the mobile dock, header and back-to-top (48px).
- Show all: `aria-expanded` + `aria-controls`, hidden items `inert`, focus moves into the revealed items.
- Experience rows: native `<details>`/`<summary>` (keyboard and screen-reader support built in).
- Sounds never carry meaning on their own: every sound accompanies a visible change, and sound can be turned off.
- Contrast: all token pairs pass AA. Muted text on `muted` backgrounds is the tightest pair (5.1:1); don't go lighter.
- Motion and smooth scroll disabled under `prefers-reduced-motion`. Sound can be switched off and stays off.
- External links announce "(opens in a new tab)".
