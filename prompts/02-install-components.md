# 02 · Install components

```text
Read CLAUDE.md and docs/design/07-registries.md (all of it), plus the Radius and Icons sections of
02-foundations.md.

Goal: every registry component the site needs is installed and restyled to our design. No pages yet.

Steps:
1. Check components.json has style "base-mira", baseColor "neutral", iconLibrary "phosphor" and the
   "@kibo-ui" and "@soundcn" registries. Install @phosphor-icons/react and simple-icons if missing.
2. Install from shadcn:
   pnpm dlx shadcn@latest add button badge avatar kbd tooltip card item empty breadcrumb dialog command code-block
3. Install from Kibo UI:
   pnpm dlx shadcn@latest add @kibo-ui/image-zoom
   (contribution-graph is optional; don't install it now.)
4. Install from soundcn:
   pnpm dlx shadcn@latest add @soundcn/use-sound @soundcn/hover-tick @soundcn/click-soft @soundcn/tick-001 @soundcn/switch-on @soundcn/switch-off @soundcn/open-001 @soundcn/close-001 @soundcn/success-chime
   Note where the CLI put sound-engine, sound-types and the sound modules; report the paths.
5. If any install fails because a namespace isn't resolved, use the full URL form from 07-registries.md
   ("https://www.kibo-ui.com/r/<name>.json", "https://soundcn.xyz/r/<name>.json") and report it.
6. Restyle to the design:
   - button: base shape rounded-full in every size; keep variants default, outline, secondary, ghost, link.
     No blue variant.
   - badge: rounded-full; add variant "brand" = bg-brand-subtle text-brand-subtle-foreground; add variant
     "tag" = bg-muted text-muted-foreground font-mono text-micro lowercase.
   - kbd: rounded-full, font-mono text-micro.
   - card: rounded-xl, no shadow, border, hover:border-muted-foreground transition-colors.
   - dialog: content rounded-2xl; overlay bg-scrim.
   - avatar: rounded-full (default).
   - code-block: header in font-mono text-caption text-muted-foreground; body bg-code-background;
     rounded-lg; copy button = ghost icon button rounded-full. Remove the useHighlightedCode usage from any
     default path we'd use for the blog (we highlight at build time).
   - item: media slot supports a 36–40px rounded-full bg-muted icon disc.
   - image-zoom: zoom/unzoom buttons use our tokens (bg-foreground/70 text-background is fine) and rounded-full.
7. Remove lucide-react if anything installed it: replace icons with Phosphor equivalents
   (e.g. CopyIcon, CheckIcon, XIcon, CaretDownIcon, MagnifyingGlassIcon) and uninstall the package.
8. Grep the installed files for hard-coded colours (zinc-, neutral-, gray-, #) and replace them with tokens.

Constraints: don't build any page UI. Keep the shadcn file structure.

Acceptance:
- `rg lucide` returns nothing; `pnpm typecheck` and `pnpm build` pass.
- Report a table: component → source registry → file path → changes made.
```
