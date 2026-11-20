# Portfolio handoff: Usama Nasar

Everything a coding agent needs to build the portfolio in an existing TanStack Start project. The pages
themselves are generated in your project by running the prompts in order.

| Path | What |
|---|---|
| `prompts/` | 15 step-by-step prompts for Claude Code. Start with `00-start-here.md` |
| `CLAUDE.md` | Rules the agent follows in every session |
| `docs/design/` | The design system: brand, foundations, components, pages, content, quality, registries, motion |
| `components.json` | shadcn config: `base-mira`, neutral, Phosphor, `@kibo-ui` and `@soundcn` registries |
| `src/styles/` | `app.css` (tokens, type scale, theme, motion utilities) and `article.css` (blog prose) |
| `src/components/brand/logo.tsx` | Wave, Tile and Prompt marks as React components (currentColor) |
| `src/content/site.ts` | All home-page copy as typed data, with `[BRACKETS]` to fill in |
| `public/` | Favicons, manifest, default OG images, `brand/` SVGs (currentColor, light, dark, adaptive, outlined lockups) |

Components to install, by registry, are listed in `docs/design/07-registries.md`.
