# Design Review — Usama Nasar Portfolio

**Date:** 2026-06-03
**Surface:** Single-page portfolio (Brand register)
**Score:** 32/50

---

## Lens Scores

| Lens             | Score | Verdict                                       |
| ---------------- | ----- | --------------------------------------------- |
| First impression | 7/10  | Has a point of view, doesn't fully commit     |
| Hierarchy        | 6/10  | Consistent but monotonous section rhythm      |
| Color voice      | 7/10  | Distinctive accent, systemic contrast failure |
| Type voice       | 6/10  | Solid foundation, mechanically applied        |
| Interaction feel | 6/10  | Core works, missing refinements               |

---

## Lens 1: First Impression — 7/10

The amber divider line in the hero is the strongest visual gesture on the page. It says "this is authored, not assembled." The warm-tinted dark background (0.004 chroma) is subtle enough to feel intentional but not ornamental. A 2-second sniff test returns: dark, warm amber accent, bold name, someone with taste.

The problem is that nothing after the hero reinforces that editorial voice. The divider line is a one-note signal. There are no rules, no pull quotes, no visual callouts, no section dividers that echo the hero's confidence. The page starts with a statement and then defaults to a standard single-column scroll.

**What would move the score**: Extend the editorial language beyond the hero — section-intro rules, a pull-quote treatment for the best experience bullet, or a different background treatment for one high-impact section.

---

## Lens 2: Hierarchy — 6/10

Every section shares the same structural pattern: mono label → 3xl heading → body. This is consistent, which is good. It is also mechanically identical across six sections, which makes the page scan as a flat list rather than a paced narrative.

Specific issues:

- **About section** is a chip cloud with no grouping, no categories, no visual distinction between language, framework, tooling, and testing.
- **Experience descriptions** are single-block walls of text. The Contrive Solutions entry alone is ~300 words without any visual break, pull highlight, or rhythm change.
- **Timeline dots** are 2.5px at `border-2` — they read as 2px rendered circles against oklch(0.24) border background. Easy to miss.
- **Project cards** have uneven heights due to varying description lengths, creating a ragged grid with no compensating treatment.

**What would move the score**: Group tech by category (Languages, Frameworks, Testing, Tools). Add a featured pull-out for the most impactful experience bullet. Increase timeline dot size to 3px or use a filled dot. Equal-height project cards via min-height or line-clamp.

---

## Lens 3: Color Voice — 7/10

The amber accent (`oklch(0.72 0.15 85)`) is warm, distinctive, and not the generic cool-gray/blue-violet of most developer portfolios. The warm-tinted background with 0.004 chroma at 80° hue reads as authored rather than flat neutral.

**Critical issue: contrast failure on project cards.** `text-muted-foreground` (oklch 0.52) on `bg-card` (oklch 0.17) produces 2.59:1 contrast ratio. WCAG AA requires 4.5:1 for normal text. Every project card description is below the accessibility threshold.

Secondary issues:

- The accent only appears in four places: hero divider, section labels, nav underline, and resume button. It never appears in section body content, which makes the palette feel like decoration rather than a working system.
- `muted-foreground` at 0.52 on background 0.13 gives 3.17:1 — just barely scraping AA for large text. The body copy at text-sm is not large text, so this is also a contrast concern.
- No color variation between sections — every section has the same background, same card color, same border treatment.

**What would move the score**: Fix project card contrast (use lighter muted-foreground or darker card bg). Introduce one section with a different background treatment to break the visual monotony. Use accent in more places — hover states, active states, key numbers or highlights.

---

## Lens 4: Type Voice — 6/10

Inter Variable with antialiasing is a solid foundation. The heading scale (mono xs label → 3xl bold heading → body) is readable and distinct. The max-w-3xl measure constrains line length well.

Issues:

- The mono label + 3xl heading pattern is applied to every section without exception. It reads as a formula, not a voice.
- Experience company names and locations are rendered in regular text with the same muted-foreground as body copy. Company names should be visually distinct from the location string.
- Long experience descriptions (Contrive Solutions, Love Bonito) are single paragraphs with no typographic treatment. No lead-in, no highlight, no pull.
- The `flex-col-reverse` on mobile experience items puts the date above the title. The date should always be secondary to the role title.

**What would move the score**: Make company names visually distinct (semi-bold, different color, or mono). Add a lead-in sentence or highlight for the longest descriptions. Fix mobile date placement to always follow the title. Use section-specific heading treatments rather than the same formula everywhere.

---

## Lens 5: Interaction Feel — 6/10

Core interactions work: nav scroll-spy, theme toggle with hotkey, external links with `target="_blank"`. Focus rings are visible at `outline-2 outline-ring outline-offset-2`. The skip-to-content link is present and works on focus.

Issues:

- **Project cards as full-card links** prevent text selection inside the card. Users who want to copy a project name or description cannot.
- **External link icons** (`ArrowSquareOut`) only appear on hover via `opacity-0 → opacity-100`. This means the visual affordance that a link is external is hidden until the user has already committed to hovering.
- **Social links** in the hero and footer have no underline, only color changes. The difference between hovered and idle is subtle at low text contrast levels.
- **Staggered animation** is only on the About tech chips. Other sections have no scroll-reveal treatment.
- **No interaction on tech chips** in the About section — they're not links, just decorative badges. This is fine for the tech stack, but the `hover:bg-card/80` makes them feel interactive when they're not.

**What would move the score**: Make only the title the link in project cards, not the entire card. Always show external-link icons, or use a different affordance. Add subtle scroll-reveal to section headings and experience items. Remove hover effect from About chips since they're not interactive.

---

## Top Priority Fixes (ordered by impact)

1. **P0 — Fix project card contrast** (2.59:1 → target 4.5:1). Change muted-foreground on card backgrounds or lighten card bg.
2. **P0 — Fix body copy contrast** (3.17:1 on text-sm). Bump muted-foreground lightness from 0.52 to at least 0.58.
3. **P1 — Break section monotony**. Vary at least one section's structural treatment. A background change, a different heading style, or an asymmetric layout.
4. **P1 — Group tech stack into categories**. Languages, Frameworks, Testing/CI — with visual separators.
5. **P2 — Make company names visually distinct** in experience section.
6. **P2 — Fix mobile experience date order** (remove flex-col-reverse).
7. **P2 — Decouple project card link from entire card**. Make the title the link, not the whole surface.
8. **P3 — External link icons should be always visible**, not hover-only.
