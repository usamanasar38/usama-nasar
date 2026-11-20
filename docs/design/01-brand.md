# 01 · Brand

## Primary mark: Wave

A lowercase **u** and **n** drawn as one stroke. It looks the same rotated 180°, so it reads both as the
initials and as a signal wave.

- Component: `<Logo />` from `src/components/brand/logo.tsx`
- Path (64×64 grid, stroke 6, butt caps): `M10 16V37A11 11 0 0 0 32 37V27A11 11 0 0 1 54 27V48`
- Colour: `currentColor` only. Style with `text-foreground`; hover `text-brand`.
- Sizes: header 26px · footer/OG 48–96px. **Minimum 16px.** Below 24px use stroke 7 (`strokeWidth={7}`).
- Clear space: at least 25% of the mark's width on every side.
- Header behaviour: `animate` (draws in once, 1.1s) and `pending` (blue signal while routing).

## Name lockup

`[Wave 26px] + 10px gap + "usama nasar"` in Commit Mono 14px / 500, lowercase. Always lowercase in the
lockup. Use the full name "Usama Nasar" in title case in prose and metadata.

## Tile mark: favicon and avatar fallback

The wave knocked out of a rounded square (`rx 14` on 64). Component `<LogoTile />`. Used for the favicon,
app icons, OG images and as the avatar fallback. Never in the header.

## Prompt mark (secondary)

`> un_` with a blinking cursor. **Footer only**, as `<PromptMark />` next to "designed & built by usama
nasar". Never as the main logo.

## Asset files (`public/`)

| File | What | Use it for |
|---|---|---|
| `brand/wave.svg`, `brand/tile.svg`, `brand/prompt.svg`, `brand/lockup.svg` | `currentColor` | Copying into JSX or other SVGs. **In the app, use the React components instead** (`Logo`, `LogoTile`, `PromptMark` in `src/components/brand/logo.tsx`) |
| `brand/*-light.svg` | Black #0a0a0a artwork | Light backgrounds, when the asset must be an `<img>` |
| `brand/*-dark.svg` | White #fafafa artwork | Dark backgrounds, when the asset must be an `<img>` |
| `brand/*-adaptive.svg` | Switches with the **OS** colour scheme | Places that follow the system theme: README, email signatures, external profiles |
| `brand/prompt-animated-{light,dark}.svg` | `> un_` with a blinking cursor | Static contexts (README, slides) |
| `brand/lockup-*.svg` | Wave + "usama nasar" with the text **outlined** (no font needed) | Résumé, slides, README, social banners |
| `favicon.ico` (16/32/48) | Tile, black | `<link rel="icon" sizes="48x48">` |
| `favicon.svg` | Tile, follows the OS scheme | `<link rel="icon" type="image/svg+xml">` |
| `apple-touch-icon.png` (180) | Full-bleed black, white wave | iOS home screen |
| `icon-192.png`, `icon-512.png` | Full-bleed, maskable-safe | `site.webmanifest` |
| `logo-512.png` | Tile, black on transparent | JSON-LD `Person.image` fallback, profiles |
| `og-default-light.png`, `og-default-dark.png` (1200×630) | Tile + name + role | Default OG image for pages without their own. Light is the default; dark is an alternative. Replace `[yourdomain.dev]` before launch, or regenerate at build (see 06-quality.md) |

## Light and dark: which method where

1. **Inside the app (preferred):** inline the React components. They draw in `currentColor`, so
   `text-foreground` follows the `.dark` class automatically, and `hover:text-brand` works.
   ```tsx
   <Logo className="size-7 text-foreground" />
   ```
2. **An `<img>` that must follow the app theme** (class-based, not the OS): render both and toggle
   with Tailwind's `dark:` variant.
   ```tsx
   <img src="/brand/lockup-light.svg" alt="Usama Nasar" width={252} height={44} className="dark:hidden" />
   <img src="/brand/lockup-dark.svg" alt="" aria-hidden width={252} height={44} className="hidden dark:block" />
   ```
3. **Outside the app** (README, markdown, email), follow the OS with `<picture>`:
   ```html
   <picture>
     <source srcset="/brand/lockup-dark.svg" media="(prefers-color-scheme: dark)">
     <img src="/brand/lockup-light.svg" alt="Usama Nasar" width="252" height="44">
   </picture>
   ```
   Or use the single `*-adaptive.svg` file.
4. **Favicons** can't see the app's theme. `favicon.svg` follows the OS via an internal
   `prefers-color-scheme` media query. That's expected.

## Don't

- Recolour the mark blue at rest, add gradients, outlines or shadows.
- Stretch, rotate (other than the built-in symmetry) or redraw the path.
- Put the wave inside a circle or any shape other than the tile.
- Use the tile in the header.

## Voice

First person, plain and specific. Say what you built and what changed because of it. No buzzwords
("passionate", "rockstar", "synergy"), no exclamation marks, no emoji in UI copy.
Lowercase for UI chrome (nav, section labels, footer links); sentence case for headings and buttons.
