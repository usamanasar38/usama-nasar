# 03 · Components

Build every component from these specs with the tokens in `02-foundations.md`. Where a component
comes from a registry, it's marked **[shadcn: name]**, **[kibo: name]** or **[custom]**; install commands
are in `07-registries.md`. Suggested file paths are given as `→ path`.
Every interactive element plays `hover` on pointer enter and the listed sound on activation
(`useSounds()` from `src/lib/sound.tsx`).

## Header [custom] → `src/components/site/site-header.tsx`

- Sticky, `h-16`, `bg-background/80 backdrop-blur-md`, **no bottom border**, inner `max-w-site`.
- Left: name lockup (`<Logo animate pending>` + "usama nasar" in mono). Hover turns the wave `text-brand`.
- Right ≥ md: `projects · blog` pill links, a pill search trigger ("Search" + `⌘K`), theme toggle.
- Right < md: search icon + theme toggle. Navigation lives in the dock.
- Theme toggle plays `on` (to light) / `off` (to dark).

## Section heading [custom] → `src/components/site/section-heading.tsx` {#section-heading}

`<SectionHeading id="h-exp" count={6}>Experience</SectionHeading>`
- `<h2 class="text-section">` with an optional right side: a two-digit mono counter (`06`, with an
  sr-only "6 items") or a link (`All posts →`).
- The section element gets `aria-labelledby` pointing at the heading id.
- No border above or below. Sections are separated by `mt-16 md:mt-20`.

## Hero / intro [shadcn: avatar, badge]

- Row (stacks below md): avatar `size-28 rounded-full border` (`<img width=112 height=112
  fetchpriority="high">`, AVIF), then badge, `text-display` name (56px max on this layout), role line
  (`text-lead font-medium text-foreground`).
- Intro paragraph below: `text-lead text-muted-foreground max-w-[640px]` with an inline brand link.
- Social chips below that.
- **Availability badge:** pill `h-7 px-3 bg-brand-subtle text-brand-subtle-foreground font-mono text-caption`
  with a 6px `bg-status` dot. Hidden when `site.availableForWork` is false.

## Chips (social, stack, tag filter) [shadcn: button / badge variants]

- **Social chip:** link, `h-9 rounded-full border pl-3 pr-3.5 gap-2 text-small` + 16px Phosphor icon. Hover `bg-muted`.
- **Badge size (shared):** availability badge, stack chips and tags are all `<Badge>`: `h-7 rounded-full px-3
  gap-1.5 text-caption`, 14px icons. Only the variant (fill, border, font) differs.
- **Stack chip:** list item (not a link), `<Badge variant="chip">` (hairline border) +
  `<TechIcon className="size-3.5" />`. Group names above each row in `font-mono text-caption text-muted-foreground`.
- **Tag:** `<Badge variant="tag">`: `bg-muted font-mono text-muted-foreground`, lowercase.
- **Filter chip** (/blog): a `<Link>` to `/blog?tag=x` (crawlable, shareable), `h-8 rounded-full border
  px-3.5 text-small`; active = `bg-foreground text-background border-foreground` + `aria-current="page"`.

## Overview list [shadcn: item]

`<dl>` in two columns (`md:grid-cols-2 gap-x-8 gap-y-4`). Item: 36px `rounded-full bg-muted` icon disc +
`<dt>` (mono micro, muted) over `<dd>` (15px).

## Experience [custom: native `<details>`] → `src/components/home/experience.tsx`

- Max **4** rows visible; the rest behind **Show all N** (see Show more).
- Each row is a native `<details name="experience">` (only one open at a time, zero JS, SSR-friendly):
  - `<summary>`: 40px `rounded-full bg-muted` monogram disc, company (16/600) over role (14 muted),
    dates on the right (≥ md, mono caption), `CaretDownIcon` rotating 180° when open. Hover `bg-muted
    rounded-xl`, padding `p-3 -mx-3`. Remove the default marker (`list-none`, `[&::-webkit-details-marker]:hidden`).
  - Content (`pl-[54px] pb-4`): bullets 15px muted, then tags.
  - First row has `open` by default. Height animates via `::details-content` (in `app.css`).
  - `onToggle` plays `expand` / `collapse`.
- Rows are separated by `gap-1`, never lines.

## Show more [custom] → `src/components/site/show-more.tsx` {#show-more}

`<ShowMore items={projects} initial={4} label="projects" render={(items) => <Grid>…</Grid>} />`
- Renders the first 4, then the rest in a wrapper that animates `grid-template-rows: 0fr → 1fr`
  (500ms ease-out-quint), then a centred pill button "Show all N" / "Show less" with a rotating caret.
- All items are in the server HTML (good for SEO and LLMs). The hidden part is `inert` until opened.
- Button: `aria-expanded`, `aria-controls`. Opening moves focus to the first revealed link.
- Sounds: `expand` / `collapse`. Reduced motion: no transition.

## Project card [shadcn: card]

- `<article>` `rounded-xl border bg-card overflow-hidden`, hover `border-muted-foreground`.
- Image 16:10, no inner border, `<img loading="lazy" decoding="async" width height>`; no image = `bg-muted`.
- Body `p-4 gap-2.5`: title (`text-h3`) + `ArrowUpRightIcon` link (`aria-label="Open {title}"`),
  description (`text-small text-muted-foreground`), tags.
- Grid `grid gap-4 md:grid-cols-2`. Home: max 4 + Show all (no separate page needed for projects).

## Post card [custom on shadcn card styles] → `src/components/blog/post-card.tsx` {#post-card}

- The whole card is one link to `/blog/$slug`.
- Cover 1200:630 (the same image is the post's OG image), `rounded-xl border overflow-hidden bg-muted`,
  scales to 1.02 on hover (500ms, off under reduced motion). No cover = title in mono on `bg-muted`.
- Below: title (`text-h3`, underline fades in on hover), then mono caption `Mmm d, yyyy · n min read`
  in a `<time dateTime>`.
- Heading level: `h3` on home (under "Blog"), `h2` on /blog.
- Grid `grid gap-x-4 gap-y-8 md:grid-cols-2`. Home shows the latest 4 + "All posts →" in the heading.
- Only the first card on /blog gets `priority` (eager + high fetch priority).

## Credential row (education, recognition) [shadcn: item]

Separate sections ("Education", "Recognition"). Row: 40px `rounded-full bg-muted` icon disc
(`GraduationCapIcon` / `TrophyIcon`) + title (16/600) over org (14 muted), year on the right (mono caption).

## Contact links [custom] → `src/components/home/contact-links.tsx`

"Say hi." (`text-h2` size 48px on desktop, `text-h1` scale) + one muted line, with a pill sound toggle on
the right. Then big links: index (`01`…), label `text-say`, hint (≥ md), `ArrowUpRightIcon` that nudges
up-right. Hover and focus play the next note of the pentatonic run (`note(i)`); click plays `click`.
No dividers between rows.

## Dock [custom + shadcn: tooltip, kbd] → `src/components/site/dock.tsx` {#dock}

Pill toolbar `fixed bottom-6` centred, `rounded-full border bg-dock backdrop-blur-md p-1.5 shadow-lg`.
- ≥ md: pill search field (232px, opens ⌘K) · copy email (`CheckIcon` + `success` sound + live
  announcement) · book a call · sound toggle (`aria-pressed`).
- < md: Home · Projects · Blog · Search, 44px circles, active = `bg-muted` + `aria-current="page"`.
- Back to top is **not** in the dock.

## Back to top [custom] → `src/components/site/back-to-top.tsx` {#back-to-top}

Floating circle, **bottom right** (`fixed right-4 bottom-4`, `md:right-6 md:bottom-6`), `size-12
rounded-full border bg-dock backdrop-blur-md shadow-lg`, `ArrowUpIcon` 18px.
- Progress ring: brand stroke, `un-progress` (CSS scroll-driven, no listener).
- Appears after ~120–400px of scroll (`un-reveal`, also CSS scroll-driven); before that it's
  `visibility: hidden`, so it's out of the tab order.
- Click: `rise` sound, smooth scroll (instant under reduced motion), focus to `#main`.
- On mobile it sits to the right of the centred dock; they never overlap at 360px.

## Command palette (⌘K) [shadcn: dialog, command, kbd] → `src/components/search/`

- Opens from the header, the dock, ⌘K / Ctrl+K and `/` (`src/hooks/use-search-hotkey.ts`). Plays `open`.
- Dialog `max-w-[580px] rounded-2xl`, `12vh` from the top, scrim `bg-scrim`.
- Input row 54px with `MagnifyingGlassIcon`, placeholder "Search pages, posts, projects, actions…", pill `esc` kbd.
- Groups (mono micro labels): **pages** · **posts** (title + tags, hint: date) · **projects** · **actions**
  (Copy email, Book a call, Switch theme `⌘D`, Turn sound on/off) · **links**.
- Item `h-10 rounded-[10px] px-3 text-small`, icon 17px muted, selected `bg-muted`.
- Footer: `↑↓ navigate · ↵ open · esc close`.
- Index built at build time into a static JSON module; the dialog is `React.lazy` and prefetched on
  hover/focus of any search trigger.

## Footer [custom] → `src/components/site/site-footer.tsx`

No top border. `<PromptMark>` + "designed & built by usama nasar" · `rss · llms.txt · sitemap · source · © year`.

## Buttons [shadcn: button]

Variants `default` (primary fill), `outline`, `secondary`, `ghost`, `link`. Add `rounded-full` to every
button (override in `components/ui/button.tsx` base classes). Never a blue button.

## Article [custom CSS + shadcn: code-block + kibo: image-zoom] {#article}

Wrap rendered markdown in `<article className="article">` (styles in `src/styles/article.css`): 17px
prose, heading anchors, brand underlined links, muted list markers, hairline blockquote, inline code chip,
tables in `.table-wrap`.
- **Code blocks:** map MDX `pre` (with rehype-pretty-code's `figure`/`figcaption` title) to shadcn
  `CodeBlock` for the header, file name and copy button. Insert the build-time highlighted HTML; never
  highlight on the client. Copy button: ghost circle, `CopyIcon` → `CheckIcon`, `success` sound.
- **Images:** map MDX `img` to Kibo `ImageZoom` wrapping an `<img>` with width, height, alt,
  `loading="lazy"`, `rounded-xl border`.

## Table of contents (post, ≥ lg) [custom]

Sticky `top-24`, "on this page" (mono micro), links 13px muted with a 1px left border; current heading
`text-foreground` with a foreground border (IntersectionObserver).

## Theme toggle [custom] → `src/components/site/theme-toggle.tsx`

`useTheme()` from `src/lib/theme.ts` (generated in prompt 01). Label names the target theme. The
inline `THEME_SCRIPT` in `<head>` sets `.dark` before paint. Switching wraps the class change in
`document.startViewTransition` when available (250ms cross-fade, skipped under reduced motion). Icon
swap uses Motion `AnimatePresence` (see 08-motion.md). Sound `on` / `off`.
