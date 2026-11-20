# 01 · Foundation

```text
Read CLAUDE.md and docs/design/README.md, 02-foundations.md and 08-motion.md.

Goal: the project uses our design tokens, fonts and theme system, with a correct root document. No page UI yet.

Steps:
1. Fonts: `pnpm add @fontsource-variable/host-grotesk @fontsource/commit-mono tw-animate-css` (skip any
   already installed). `pnpm add -D fontaine`.
2. Make src/styles/app.css the project's global stylesheet (it already contains the tokens, @theme,
   base layer and un-* utilities, and imports article.css). If the shadcn CLI created another global CSS
   file, merge: keep any @import lines it added (e.g. "shadcn/tailwind.css"), and keep our :root, .dark,
   @theme, @theme inline, @layer base and utilities exactly. Point components.json "tailwind.css" at it.
3. Add the fontaine Vite plugin so Host Grotesk and Commit Mono get metric-matched fallbacks (no layout
   shift on font swap). Check fontaine's current README for the Vite setup.
4. Create src/lib/theme.ts:
   - `THEME_SCRIPT`: an inline script string that reads localStorage "theme" (fallback: prefers-color-scheme)
     and toggles the `dark` class on <html> before first paint.
   - `setTheme(theme)`: toggles the class, saves to localStorage, dispatches a "un:theme-change" event,
     and wraps the class change in `document.startViewTransition` when available and reduced motion is off.
   - `useTheme()`: useSyncExternalStore over that event, returning { theme, toggle }.
5. Create src/components/motion-provider.tsx exactly as in 08-motion.md (LazyMotion with async
   domAnimation features from src/lib/motion-features.ts, strict, MotionConfig reducedMotion="user").
6. Root route (src/routes/__root.tsx):
   - <html lang="en" suppressHydrationWarning>, <body className="min-h-dvh">.
   - head(): charset, viewport (width=device-width, initial-scale=1, viewport-fit=cover), two theme-color metas
     (#ffffff light, #0a0a0a dark), preload the Host Grotesk latin woff2
     (@fontsource-variable/host-grotesk/files/host-grotesk-latin-wght-normal.woff2?url, as=font,
     type=font/woff2, crossOrigin=anonymous), the app.css stylesheet, and THEME_SCRIPT as an inline script
     placed before the stylesheet.
   - Body: a "Skip to content" link (sr-only until focused, pill styled) → #main, then
     <MotionProvider><Outlet/></MotionProvider>. Header/footer come in prompt 04.
7. A temporary index route that shows the type scale (text-display … text-micro) and the colour tokens
   as swatches, so tokens can be checked. Remove it in prompt 08.

Constraints: don't change token values. No lucide-react. No client-only rendering.

Acceptance:
- Reloading in dark mode shows no white flash; the theme persists.
- Fonts are Host Grotesk / Commit Mono; only one font file is preloaded.
- `pnpm typecheck` and `pnpm build` pass; no hydration warnings.
Report the files you changed.
```
