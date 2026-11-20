# 07 · Components and registries

**Rule:** take a component from **shadcn** first. Use another registry only when shadcn doesn't have it,
or write it yourself when it's small and design-specific (a registry version would need more changes than
it saves). Every registry component must be restyled to the tokens in `02-foundations.md` and use
**Phosphor** icons (replace any `lucide-react` import).

## 1. Registries in `components.json`

```json
{
  "registries": {
    "@kibo-ui": "https://www.kibo-ui.com/r/{name}.json",
    "@soundcn": "https://soundcn.xyz/r/{name}.json"
  }
}
```

`@kibo-ui` and `@soundcn` may also resolve from the built-in shadcn registry index. Adding them explicitly
makes installs work either way. The full file is `components.json` in this bundle (style `base-mira`,
base colour `neutral`, `iconLibrary: phosphor`).

## 2. Install list

### shadcn: `@shadcn` (style base-mira, Base UI)

```bash
pnpm dlx shadcn@latest add button badge avatar kbd tooltip card item empty breadcrumb dialog command code-block
```

| Component | Used for | Notes |
|---|---|---|
| `button` | Every button and button-styled link | Make `rounded-full` the base shape in `components/ui/button.tsx` |
| `badge` | "available for work" badge, tags | Add variant `brand` (bg-brand-subtle / text-brand-subtle-foreground); `rounded-full` |
| `avatar` | Round profile photo with fallback | `size-28`, fallback = `LogoTile` on `bg-muted` |
| `kbd` | ⌘K / esc hints | `rounded-full`, mono micro |
| `tooltip` | Labels on dock icon buttons (desktop only) | Delay 400ms; never the only label (keep `aria-label`) |
| `card` | Project cards | `rounded-xl`, no shadow, hover `border-muted-foreground` |
| `item` | Overview facts, education, recognition rows | Icon disc as `ItemMedia`, `rounded-full bg-muted` |
| `empty` | Empty blog filter, 404, empty search | Wave mark as the media |
| `breadcrumb` | Post page ("Blog / title"), mirrors BreadcrumbList JSON-LD | |
| `dialog` + `command` | ⌘K command palette | Lazy-loaded; `rounded-2xl` dialog |
| `code-block` | Shell for MDX code blocks (header, file name, copy button) | **Don't** use its `useHighlightedCode` hook on the blog: highlighting is done at build time by rehype-pretty-code. Pass the pre-rendered HTML in |

Optional, later: `pagination` (blog past 24 posts), `hover-card` (if link previews are added).

### Kibo UI: `@kibo-ui`

```bash
pnpm dlx shadcn@latest add @kibo-ui/image-zoom
pnpm dlx shadcn@latest add @kibo-ui/contribution-graph   # optional
```

| Component | Used for | Notes |
|---|---|---|
| `image-zoom` | Click-to-zoom images in posts (MDX `img`) | Uses `react-medium-image-zoom`. Map MDX `img` to it; keep width/height and alt |
| `contribution-graph` (optional) | A "GitHub activity" block under Stack | Fetch contributions **at build time** and pass data in; monochrome levels only (no green). Skip if it adds noise |

Not used from Kibo: `theme-switcher` (lucide icons, three-state UI we don't need), `pill` (lucide, and
a pill is just a styled Badge here), `snippet`, `marquee`, `ticker`.

### soundcn: `@soundcn` (CC0 sounds, Web Audio, no files to fetch)

```bash
pnpm dlx shadcn@latest add @soundcn/use-sound \
  @soundcn/hover-tick @soundcn/click-soft @soundcn/tick-001 \
  @soundcn/switch-on @soundcn/switch-off \
  @soundcn/open-001 @soundcn/close-001 @soundcn/success-chime
```

This installs `useSound`, `sound-engine` (`playSound`, `getAudioContext`), `sound-types`, and one module
per sound exporting e.g. `hoverTickSound` (a base64 `dataUri`). Check the CLI output for the exact paths.

| Our event | soundcn sound | Volume | Notes |
|---|---|---|---|
| `hover` | `hover-tick` (0.22s, 2 kB) | 0.25 | Links, chips, cards, dock buttons |
| `click` | `click-soft` (1 kB) | 0.5 | Button presses, nav taps |
| `on` / `off` | `switch-on` / `switch-off` | 0.4 | Theme → light / dark, sound on / off |
| `expand` / `collapse` | `open-001` / `close-001` | 0.4 | Show all, experience rows, dialog close |
| `open` | `open-001` at `playbackRate 1.15` | 0.35 | Command palette |
| `success` | `success-chime` (0.49s, 4 kB) | 0.4 | Email copied |
| `rise` | `open-001` at `playbackRate 0.8` | 0.4 | Back to top |
| `note(i)` | `tick-001` at `playbackRate` 1, 1.125, 1.25, 1.5, 1.667 | 0.35 | Contact links: a pentatonic run down the list |

**Don't call `useSound` in every component.** It decodes audio and creates an AudioContext on mount, and
the base64 data would ship in the initial bundle. Instead, build `src/lib/sound.tsx` (prompt 05):
- A `SoundProvider` + `useSounds()` hook exposing `play(name)`, `note(i)`, `enabled`, `toggle()`.
- On the first `pointerdown` or `keydown` anywhere, `import()` the sound modules (a separate chunk,
  about 20 kB) and play through soundcn's `playSound(dataUri, { volume, playbackRate })`.
- Nothing is created or decoded before that first interaction. Calls before it are no-ops.
- `enabled` is stored in `localStorage` (`un:sound`), on by default.

### Phosphor icons (not a registry)

`pnpm add @phosphor-icons/react`. With `iconLibrary: "phosphor"`, shadcn components install with
Phosphor icons. Import by name with the `Icon` suffix (`MagnifyingGlassIcon`); the full map is in
`02-foundations.md#icons`. Remove `lucide-react` if any registry adds it.

### simple-icons (tech logos, not a registry)

`pnpm add simple-icons`. Named imports only (`import { siReact } from "simple-icons"`), rendered
monochrome in `currentColor`. Already wired in `src/content/site.ts`.

## 3. Built custom (and why)

| Component | Why not a registry |
|---|---|
| Header, name lockup | Brand-specific; uses `Logo` from `src/components/brand/logo.tsx` |
| Dock (desktop toolbar / mobile nav) | Registry docks (e.g. Magic UI) add magnification via Motion; ours is a static pill, simpler and lighter |
| Back-to-top with progress ring | CSS scroll-driven animation, about 30 lines; registry versions use scroll listeners or Motion `useScroll` |
| Theme toggle | Tiny. Uses the inline `THEME_SCRIPT` + View Transitions; registry togglers ship lucide icons |
| Show more | Specific behaviour (SSR all items, `inert`, focus move, sound) |
| Experience rows | Native `<details name>`; zero JS |
| Post card, project card | Compositions of `card` + tokens |
| Contact links | Design-specific, with the note run |
| Section heading | 15 lines |
| Command palette contents | Built from `command`; data from the build-time index |

## 4. Fonts (not a registry)

```bash
pnpm add @fontsource-variable/host-grotesk @fontsource/commit-mono
```

Imported in `src/styles/app.css`. Preload `host-grotesk-latin-wght-normal.woff2` only.

## 5. Content and build-time packages

```bash
pnpm add -D @content-collections/core @content-collections/mdx @content-collections/vite \
  rehype-slug rehype-autolink-headings rehype-pretty-code shiki
pnpm add -D fontaine
```

`zod` (already installed) validates frontmatter and route search params. **TanStack Form** isn't needed
for these pages (contact is email/calendar links). Use it only if a contact form is added later, with the
Zod schema shared between client and server function.
