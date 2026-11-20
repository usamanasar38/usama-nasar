# Usama Nasar · portfolio: agent rules

Personal portfolio and blog for Usama Nasar, senior frontend & full-stack engineer. Monochrome, one blue
accent, pill-and-circle shapes, sections separated by space, small UI sounds.

## How to work

1. Read `docs/design/README.md` once, then follow the prompts in `prompts/` **in order**, one per session
   or PR. Each prompt lists the docs to read, the steps, and the acceptance criteria.
2. The docs in `docs/design/` are the source of truth. If a prompt and a doc disagree, the doc wins.
   Say so in your summary.
3. Finish each prompt by running `pnpm typecheck` and `pnpm build`, checking the page at 390px and
   1440px in light and dark, and reporting what you did and anything left open.

## Stack (already set up; don't swap)

TanStack Start (React 19, SSR, Vite) · TypeScript strict · Tailwind CSS 4 · shadcn/ui `base-mira` on
Base UI · Motion (`motion/react`, via LazyMotion only) · Zod · TanStack Form (only if a form is ever
added) · Phosphor icons · simple-icons for tech logos · content-collections for `.md`/`.mdx` posts ·
rehype-pretty-code + Shiki at build time · soundcn sounds behind our own `SoundProvider`.

## Hard rules

1. **Tokens only.** No hex/rgb/oklch or Tailwind palette colours in components. Use `bg-background`,
   `text-foreground`, `text-muted-foreground`, `border`, `bg-muted`, `text-brand`, `bg-brand-subtle`… from
   `src/styles/app.css`. Missing token → add it to `app.css` and `02-foundations.md`.
2. **Blue is an accent:** links, focus rings, active state, logo hover, progress ring, availability badge.
   No blue buttons, cards or backgrounds.
3. **Shapes:** pills (`rounded-full`) for chips, tags, buttons, inputs, kbd and the dock; circles for the avatar,
   icon discs and back-to-top; `rounded-xl` for cards and images; `rounded-2xl` for the command dialog;
   `rounded-lg` for code blocks.
4. **No section dividers.** Space and a `SectionHeading` separate sections. No borders or rules between them.
5. **Components:** shadcn first, then Kibo UI / soundcn as listed in `docs/design/07-registries.md`, then
   custom. Restyle every registry component to our tokens and Phosphor icons. **No `lucide-react`.**
6. **Type scale classes only** (`text-display`, `text-h1`, `text-h2`, `text-section`, `text-h3`, `text-say`,
   `text-lead`, `text-body`, `text-prose`, `text-small`, `text-label`, `text-caption`, `text-micro`).
   Commit Mono (`font-mono`) only for metadata, counters, tags, kbd, code and the name lockup.
7. **Brand assets are fixed.** Use `Logo`, `LogoTile`, `PromptMark` from `src/components/brand/logo.tsx`
   and files in `public/`. Never redraw or recolour the paths.
8. **Never invent content.** `[BRACKETS]` in `src/content/site.ts` are for Usama. Drafts are hidden in
   production by `visible()`.
9. **SSR and CWV first.** Every fact is in the server HTML. No splash/loader. No above-the-fold entrance
   animations. CSS for motion by default; Motion only as `08-motion.md` allows. No scroll listeners.
10. **Sound** only through `useSounds()` (`src/lib/sound.tsx`): never on load or scroll, nothing loaded
    before the first interaction, a toggle always available.
11. **Accessibility is part of done:** semantic elements, visible focus, labels on icon buttons, 44px touch
    targets, `prefers-reduced-motion` respected, WCAG AA (the tokens pass; don't lighten them).
12. **SEO and LLMs:** each route sets title, description, canonical, OG and JSON-LD; posts appear in the
    sitemap, RSS, `llms.txt` and have a `.md` twin.

## Definition of done (every prompt)

- `pnpm typecheck` and `pnpm build` pass with no new warnings.
- Keyboard-only pass works; no console errors; no hydration warnings.
- Lighthouse mobile on changed pages: Performance ≥ 95, Accessibility / Best Practices / SEO = 100.
