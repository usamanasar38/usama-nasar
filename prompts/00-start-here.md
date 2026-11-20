# 00 · Start here

These prompts build Usama Nasar's portfolio step by step in an existing TanStack Start project
(TanStack Start, TanStack Form, Zod, Tailwind 4, shadcn, Motion already set up).

## Before the first prompt (do this by hand)

1. Copy into the repo root, keeping paths:
   - `CLAUDE.md`
   - `docs/design/*`
   - `src/styles/app.css`, `src/styles/article.css`
   - `src/components/brand/logo.tsx`
   - `src/content/site.ts`
   - `public/*` (favicons, manifest, `brand/` SVGs, OG images)
2. Merge `components.json`: keep your aliases if they differ, but take `style`, `baseColor`,
   `iconLibrary` and the `registries` block from this bundle.
3. Commit: "chore: add design system handoff".

## How to run the prompts

- One prompt per Claude Code session (or per PR). Paste the whole file content as the message.
- Order matters: each prompt assumes the earlier ones are done.
- After each prompt: review the diff, run the site, check 390px and 1440px in light and dark, commit.
- If Claude stops with a question, answer it, don't skip ahead.

| # | Prompt | Result |
|---|---|---|
| 01 | Foundation | Tokens, fonts, theme script, root document, Motion provider |
| 02 | Install components | shadcn, Kibo UI, soundcn installed and restyled |
| 03 | Brand assets | Logo components, favicons, manifest, OG defaults wired |
| 04 | Site shell | Header, theme toggle, dock, back-to-top, footer |
| 05 | Sound | `SoundProvider`, sounds on shell controls |
| 06 | Search | ⌘K palette with build-time index |
| 07 | Content pipeline | `.md` / `.mdx` posts with content-collections |
| 08 | Home: intro | Hero, social chips, overview, stack |
| 09 | Home: experience & projects | `<details>` rows, Show more, project cards |
| 10 | Home: blog, credentials, contact | Post cards, education, recognition, Say hi |
| 11 | Blog pages | `/blog`, `/blog/$slug`, `/blog/$slug.md` |
| 12 | SEO & LLM files | head, JSON-LD, sitemap, robots, RSS, OG, llms.txt |
| 13 | Motion polish | Icon swaps, Show-all stagger, theme transition |
| 14 | QA | Full audit and fixes |

## Design reference

Canvas (for humans): https://claude.ai/artifact/KwEe7wCmtR5YTXSs4ULfb9. Page *Portfolio* has home
(desktop light, dark, mobile), ⌘K search, blog index and blog post. The agent works from
`docs/design/`, which describes the same design in full.
