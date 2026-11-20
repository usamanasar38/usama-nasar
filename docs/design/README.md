# Design system: usama nasar

Monochrome, typographic, technical. Black and white with one blue accent, small radius,
mono metadata, and motion that lives in the logo instead of in loaders.

**Design canvas (for humans):** https://claude.ai/artifact/KwEe7wCmtR5YTXSs4ULfb9.
Pages: *Portfolio* (home light/dark/mobile, ⌘K search, blog index, blog post), *Design system*
(foundations, radius study, blog/code, motion), *Logo*. The docs below are the source of truth; the
canvas illustrates them.

| File | What it covers |
|---|---|
| [01-brand.md](01-brand.md) | Logo, favicon, name lockup, voice |
| [02-foundations.md](02-foundations.md) | Colour tokens, type scale, fonts, spacing, layout grid, radius, elevation, icons, motion |
| [03-components.md](03-components.md) | Every component with anatomy, classes, states and a11y notes |
| [04-pages.md](04-pages.md) | Site map and section-by-section page specs (home, projects, blog, post, 404) |
| [05-content.md](05-content.md) | Content model: `site.ts`, MDX frontmatter, images, placeholders |
| [06-quality.md](06-quality.md) | Performance budgets, Core Web Vitals, SEO, LLM readability, accessibility |
| [07-registries.md](07-registries.md) | Which components come from shadcn, Kibo UI, soundcn, or are custom; install commands |
| [08-motion.md](08-motion.md) | CSS vs Motion, LazyMotion setup, durations |

Build order: follow the prompts in `/prompts` (`00-start-here.md`).

## Principles

1. **Content first.** The page is a well-set document. Decoration is hairlines, spacing and type weight.
2. **One accent.** Blue marks what you can act on, or where you are. Everything else is greyscale.
3. **Precise, not cold.** Pills and circles for what you touch, 10px surfaces, a soft wave mark and small
   sounds keep it human.
4. **Fast by construction.** Server-rendered HTML, self-hosted fonts, CSS-only motion, build-time
   highlighting and search index. Nothing blocks the first paint.
5. **Inspired, not copied.** Patterns borrowed from good portfolios (floating dock, ⌘K search, sound on
   links) are re-drawn in this system's own language: one narrow column, sections separated by space, pill chips,
   mono counters and metadata, and a pentatonic sound palette.
