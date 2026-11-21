# 02 · Foundations

All tokens are defined in `src/styles/app.css`. This file explains how to use them.

## Colour

shadcn token names, neutral greys (chroma 0) and one blue. Light = `:root`, dark = `.dark` on `<html>`.

| Token (class) | Light | Dark | Use |
|---|---|---|---|
| `background` | #ffffff | #0a0a0a | Page |
| `foreground` | #0a0a0a | #fafafa | Text, icons, the logo |
| `muted` | #f5f5f5 | #1f1f1f | Hover rows, tags, inline code, image placeholders |
| `muted-foreground` | #696969 | #a1a1a1 | Secondary text, labels, meta |
| `border` / `input` | #e5e5e5 | #262626 | Hairlines, outlines |
| `card` | #ffffff | #111111 | Project cards, dialogs |
| `primary` | #171717 | #e5e5e5 | Primary button fill (inverts per theme) |
| `brand` | blue-600 #155dfc | blue-400 #51a2ff | Links, focus ring, active state, logo hover, progress |
| `brand-subtle` / `-foreground` | blue-50 / blue-700 | blue-950 / blue-300 | "Available for work" badge only |
| `status` | green-600 #00a63e | green-400 #05df72 | "Available for work" dot only (6px). Never text, fills or other UI |
| `love` | red-500 #fb2c36 | red-400 #ff6467 | Footer "made with love" heart only (`un-heartbeat`, off under reduced motion). Nowhere else |
| `sun` / `sun-edge` / `sunset` | yellow-400 #fac800 / amber-600 #e17100 / orange-600 #f54900 (both themes) | same | Theme-toggle icon only: sun fill, sun outline and rays, setting sun. Nowhere else |
| `code-background` | #fafafa | #111111 | Code blocks |
| `dock` | white 82% | #171717 82% | Floating dock (with `backdrop-blur-md`) |
| `scrim` | black 28% | black 60% | Behind dialogs |

Contrast (WCAG): foreground 19.8:1 / 19:1. Muted-foreground 5.5:1 on background and 5.1:1 on muted in
light; 7.6:1 and 6.4:1 in dark. Brand 5.3:1 / 7.5:1. **Do not lighten muted-foreground**: shadcn's
default (#737373) fails on `muted`.

Rules: blue never fills a large area. Hover = `bg-muted`, not blue. Active tag filter = `bg-foreground text-background` pill. Selected/active = `text-foreground`
plus a 1px foreground or brand indicator. Destructive red is reserved for form errors.

## Typography

**Host Grotesk** (variable 300–800) for everything you read. **Commit Mono** (400, 500) for metadata
and code. Both OFL, self-hosted through Fontsource, `font-display: swap`. Preload only
`host-grotesk-latin-wght-normal.woff2` (20 kB).

| Class | Size | Line height | Weight · tracking | Use |
|---|---|---|---|---|
| `text-display` | 40 → 64 px (fluid) | 1.0 | 600 · −4% | Name in the hero |
| `text-h1` | 32 → 44 | 1.1 | 600 · −3.5% | Page titles, post titles |
| `text-h2` | 24 → 28 | 1.2 | 600 · −2.5% | Big section headings ("Say hi.", page sections) |
| `text-section` | 24 | 1.2 | 600 · −2.5% | Home section titles ("Experience", "Projects", "Blog") |
| `text-h3` | 17 | 1.35 | 600 · −1% | Card titles, post card titles |
| `text-say` | 26 → 32 | 1.2 | 500 · −2% | Contact links |
| `text-lead` | 18 | 1.65 | 400 | Hero intro, post lead (muted) |
| `text-body` | 16 | 1.7 | 400 | Default UI text |
| `text-prose` | 17 | 1.75 | 400 | Article body (set by `.article`) |
| `text-detail` | 15 | 1.6 | 400 | Overview values, experience bullets |
| `text-small` | 14 | 1.55 | 400–500 | Nav, buttons, descriptions |
| `font-mono text-label` | 13 | 1.7 | 400 | Footer line, small mono labels |
| `font-mono text-caption` | 12 | 1.45 | 400 | Dates, read time, handles |
| `font-mono text-micro` | 11 | 1.4 | 400 | Tags, kbd, palette group names |
| `font-mono text-code` | 14 | 1.7 | 400 | Code blocks (`article.css`) |

Headings get `text-wrap: balance`, paragraphs `text-wrap: pretty` (in the base layer).
UI chrome is lowercase (`about`, `projects`, `overview`); headings are sentence case.

## Layout

- One centred column: `mx-auto max-w-site px-5 md:px-6` (768px) for header, home, blog index and footer.
- **Sections are separated by space only.** No borders, rules or alternating backgrounds between sections.
  Each section starts with a `SectionHeading` (`text-section`, optional mono counter or "All posts →").
- Vertical rhythm: hero `pt-14`, each following section `mt-16 md:mt-20` (64/80px), contact `mt-24`,
  footer `pt-14 pb-32` (room for the dock).
- Inside sections, rows are separated by gap and hover backgrounds, not lines. Cards keep their own border.
- Blog post: `max-w-post` (1040px) with `grid lg:grid-cols-[minmax(0,1fr)_200px] gap-16`; article `max-w-reading` (680px).
- Breakpoints: Tailwind defaults. `md` (768) switches header nav, dock and 2-column grids;
  `lg` (1024) shows the post table of contents.

## Spacing

Tailwind's 4px scale. Use only these steps for layout: 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 14, 16, 20, 24, 32.
List rows use `py-3` with `gap-1` between rows. Chip rows use `gap-2`. Card padding `p-4`.

## Radius

Two rules: **anything round you click or read as a label is a pill or a circle; surfaces are 10px.**
`--radius: 0.375rem` drives shadcn's scale; compared on the canvas at 0, 4, 6 and 10px.

| Shape | Class | Use |
|---|---|---|
| Circle | `rounded-full` | Avatar photo, icon discs (overview, experience, education), back-to-top button, status dot |
| Pill | `rounded-full` | Chips (social, stack, tags, filters), buttons, search fields, kbd, dock, badge |
| Surface | `rounded-xl` (10px) | Project cards, blog covers and images, experience hover rows |
| Dialog | `rounded-2xl` (16px) | Command palette |
| Code | `rounded-lg` (6px) | Code blocks and their title bar; `rounded-sm` (2px) inline code |

Large rectangular images are never fully rounded (a 16:10 pill would crop the content). Only the
square avatar photo is a full circle.

## Elevation

Flat by default: borders, not shadows. Only floating layers get a shadow:
dock and dialog `shadow-lg shadow-black/5 dark:shadow-black/40`. No shadows on cards.

## Icons

**Phosphor** (`@phosphor-icons/react` v2), regular weight, `aria-hidden` unless standalone. Two exceptions: the footer heart is `HeartIcon weight="fill"` (set in `PHOSPHOR_WEIGHT_OVERRIDES`, vite.config.ts), and the theme toggle draws its own sun/moon SVG (`ThemeIcon`) because Phosphor can't animate moon phases.
Sizes: 16px (`size-4`) inline and in chips, 18px in header/dock buttons, 20px in the mobile dock,
22px on contact links. Import icons by name from `@phosphor-icons/react`; put the name → icon map for `site.ts` icon keys in `src/components/site/icons.tsx`.

| Purpose | Phosphor icon |
|---|---|
| Search | `MagnifyingGlassIcon` |
| Theme | `MoonIcon` / `SunIcon` |
| Email / copy / copied | `EnvelopeSimpleIcon` / `CopyIcon` / `CheckIcon` |
| Calendar | `CalendarDotsIcon` |
| Sound on / off | `SpeakerHighIcon` / `SpeakerSlashIcon` |
| Back to top | `ArrowUpIcon` |
| External link | `ArrowUpRightIcon` |
| Expand | `CaretDownIcon` |
| Nav: home / projects / blog | `HouseIcon` / `FolderSimpleIcon` / `NotebookIcon` |
| Social | `GithubLogoIcon`, `LinkedinLogoIcon`, `XLogoIcon`, `FileTextIcon` (résumé) |
| Overview facts | `CodeIcon` (role), `HourglassSimpleIcon` (experience), `MapPinIcon` (based in), `ClockIcon` (local time), `EnvelopeSimpleIcon` (email), `PhoneIcon` (phone) |
| Education / recognition | `GraduationCapIcon` / `TrophyIcon` |

**Tech logos** (stack section): simple-icons, monochrome, 14px, via `<TechIcon icon={siReact} />`.
Respect each brand's guidelines: no recolouring beyond monochrome, no distortion.

## Motion

| Utility | What | When |
|---|---|---|
| `un-draw` | Wave draws in (1.1s, ease-in-out-quint) | Header logo on a full page load |
| `un-signal` | Blue dash runs along the wave | While a route is pending; fades in after 150ms |
| `un-blink` | Cursor blinks | Footer `> un_` |
| `un-progress` | Ring fills with scroll (CSS scroll-driven) | Floating back-to-top button |
| `un-reveal` | Fades in between 120 and 400px of scroll | Floating back-to-top button |
| `<details>` open | Height animates via `::details-content`: 300ms open, 200ms close | Experience and project rows |
| `un-collapse` | Show more: `grid-template-rows` 0fr → 1fr (`data-open`), 500ms open / 250ms close, ease-out-quint | Experience, projects |
| `transition-press` | color, background, border and `scale` at 150ms `--ease-out-quad`; pair with `active:scale-97` | Hand-rolled pressables (03-components.md#press) |

Easing tokens (`app.css`): `--ease-out-quint` `cubic-bezier(0.22, 1, 0.36, 1)` for things entering or
growing; `--ease-in-out-quint` `cubic-bezier(0.83, 0, 0.17, 1)` for on-screen rotation and the logo draw;
`--ease-out-quad` `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for press feedback.

Micro-interactions: colour transitions 150ms; arrow nudge 200ms `ease-out-quint`; accordion open
200ms. Everything turns off under `prefers-reduced-motion` (handled in `app.css`; use `motion-reduce:`
for anything new). No page-transition or entrance animations on content.

## Sound

UI sounds come from **soundcn** (CC0, base64 MP3 played through the Web Audio API), wrapped in our own
`SoundProvider` so nothing loads before the first interaction. The mapping from events to sounds,
volumes and playback rates is in `07-registries.md#soundcn`.

| Event | Where |
|---|---|
| `hover` | Links, chips, cards, dock and header buttons |
| `click` | Button presses, nav taps |
| `on` / `off` | Theme → light / dark, sound on / off |
| `expand` / `collapse` | Show all / show less, experience rows, closing dialogs |
| `open` | Command palette opens |
| `success` | Email copied, code copied |
| `rise` | Back to top |
| `note(i)` | Contact links: each row plays the next step of a pentatonic run |

Rules: on by default; toggles in the dock, the contact section and ⌘K, saved in `localStorage`
(`un:sound`). Nothing plays or loads before the first click or key press. Volumes stay ≤ 0.5. Never
play on scroll, on page load, or for anything that happens without the user doing something. Sound
never carries meaning on its own.
