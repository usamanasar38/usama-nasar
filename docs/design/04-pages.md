# 04 · Pages

## Site map

| Route | Purpose |
|---|---|
| `/` | Everything about Usama on one page (sections below) |
| `/blog` | All posts as cards, tag filter (`?tag=`), newest first |
| `/blog/$slug` | Post page, rendered from `content/posts/<slug>.md` or `.mdx` |
| `/blog/$slug.md` | The same post as raw markdown (`text/markdown`), for LLMs and readers |
| `/projects` | Optional later: all projects. Until then the home "Show all" covers it |
| `/llms.txt`, `/llms-full.txt` | Machine-readable site summary (see 06-quality.md) |
| `/rss.xml`, `/sitemap.xml`, `/robots.txt` | Generated at build |
| `/og/$slug.png` | Generated OG image when a post has no cover |
| 404 | Wave mark 96px, "This page doesn't exist." + links home / blog + search trigger |

Every page: skip link → `#main`, header, `<main id="main" tabIndex={-1}>`, footer, dock, floating
back-to-top, command palette (lazy).

## Home `/`: section order

No dividers anywhere. Each section after the hero starts with a `SectionHeading`.

| # | Section | Heading (right side) | Content |
|---|---|---|---|
| 1 | Intro `#about` | (none, the name is the h1) | Round avatar, badge, name, role, intro, social chips |
| 2 | Overview | Overview | 6 facts, 2 columns |
| 3 | Stack | Stack | 3 groups of pill chips |
| 4 | Experience `#experience` | Experience (counter) | 4 `<details>` rows + Show all |
| 5 | Projects `#projects` | Projects (counter) | 4 cards (2-col) + Show all |
| 6 | Blog `#blog` | Blog (All posts →) | Latest 4 post cards (2-col) |
| 7 | Education | Education | Credential rows |
| 8 | Recognition | Recognition | Credential rows |
| 9 | Contact `#contact` | "Say hi." large + sound pill | Contact links |

If a list is empty after hiding drafts, the section is not rendered.

## Blog `/blog`

- `max-w-site`. `text-h1` "Blog" + one muted line with an RSS link.
- Tag filter: pill links to `?tag=` (`aria-current="page"` on the active one), "all" first, `replace`
  navigation, server-rendered for the initial URL, so `/blog?tag=angular` is shareable and crawlable.
- Grid of `PostCard`s with `as="h2"`, newest first. No pagination until there are more than 24 posts
  (then 24 per page, `/blog/page/2`, with `rel="next"/"prev"` links).
- Empty filter: "No posts tagged {tag} yet." + a pill to clear the filter.

## Post `/blog/$slug`

- `max-w-post`, grid `lg:grid-cols-[minmax(0,1fr)_200px] gap-16`, `pt-14 pb-24`.
- Article column (`max-w-reading`): "← all posts" · meta (date · read time · tag pills) · `text-h1` title ·
  muted `text-lead` description · cover 1200×630 `rounded-xl` (eager, `fetchpriority="high"`) · `.article` body.
- End: prev/next cards (2-col, `rounded-xl border p-4`), and a line "View as markdown" linking to
  `/blog/$slug.md`.
- Right column ≥ lg: sticky table of contents.
- `<link rel="alternate" type="text/markdown" href="/blog/$slug.md">` in the head.

## Responsive behaviour

- < md: single column, hero stacks (avatar above name), 2-col grids become 1-col, header nav hidden
  (the dock is the nav), experience dates move into the open panel, contact hints hidden, `text-say` 26px.
- Back-to-top stays bottom right; the dock is centred.
- Tested widths: 360, 390, 768, 1024, 1440.

## States

- Route loading: header wave `pending` signal only. No skeletons.
- Copy email: `CheckIcon` + `success` + polite announcement.
- Empty search: "No results for "{query}"".
- Image failure: muted box with the title in mono.
