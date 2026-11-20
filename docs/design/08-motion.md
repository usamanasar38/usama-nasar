# 08 · Motion

**Default: CSS.** Most motion in this design is CSS only, so it runs before hydration and costs no
JavaScript. **Motion** (`motion/react`, already installed) is allowed only for the cases listed under
"Where Motion is used", and always through `LazyMotion` so it stays small.

## CSS only (no Motion)

| Effect | How | Where |
|---|---|---|
| Wave draws in | `un-draw` utility (stroke-dashoffset) | Header logo, full page load |
| Route-loading signal | `un-signal` utility | Header logo while the router is pending |
| Cursor blink | `un-blink` | Footer `> un_` |
| Scroll-progress ring | `un-progress` (`animation-timeline: scroll()`) | Back-to-top |
| Back-to-top reveal | `un-reveal` (scroll-driven, 120–400px) | Back-to-top |
| Show all open/close | `grid-template-rows` 0fr → 1fr, 500ms ease-out-quint | Experience, projects |
| Experience row open | `<details>` + `::details-content` + `interpolate-size` | Experience |
| Hover states | `transition-colors` 150ms; cover `scale-[1.02]` 500ms; arrow nudge 200ms | Everywhere |
| Dialog in/out | `tw-animate-css` classes shadcn already uses | ⌘K |
| Theme switch | View Transitions API (`document.startViewTransition`) cross-fade, 250ms | Theme toggle |

## Where Motion is used

Only for presence animations that CSS can't do cleanly:

1. **Icon swaps** with `AnimatePresence mode="popLayout"`: theme Sun ↔ Moon, dock Envelope → Check,
   Speaker on ↔ off. Scale 0.6 → 1 and opacity, 160ms.
2. **Show all stagger:** when the hidden items open, each fades in and moves up 8px with a 40ms
   stagger (on top of the CSS height animation). On close there's no stagger.
3. **Copy feedback** in code blocks: Copy → Check icon swap (same as 1).

## Setup rules

```tsx
// src/components/motion-provider.tsx
import { LazyMotion, MotionConfig } from "motion/react";
const loadFeatures = () => import("@/lib/motion-features").then((m) => m.default); // exports domAnimation

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
```

- Use `m.*` components (not `motion.*`) everywhere. `strict` makes `motion.*` throw.
- Features load asynchronously after hydration, so Motion never blocks first paint.
- **Never animate above-the-fold content in.** No `initial={{ opacity: 0 }}` on the hero, headings or
  anything LCP could pick. Server HTML must be the final visual state.
- No scroll-linked Motion (`useScroll`): scroll effects are CSS scroll-driven animations.
- No layout animations on lists (`layout` prop): they measure the DOM and hurt INP.
- `MotionConfig reducedMotion="user"` turns transforms off for people who ask for less motion; CSS
  utilities already handle `prefers-reduced-motion`.

## Durations and easing

| Token | Value | Use |
|---|---|---|
| fast | 150ms | colour, opacity |
| base | 200–250ms | icon swaps, arrows, theme fade |
| slow | 500ms | Show all, cover zoom |
| `ease-out-quint` | `cubic-bezier(0.22, 1, 0.36, 1)` | Things entering or growing |
| `ease-in-out-quint` | `cubic-bezier(0.83, 0, 0.17, 1)` | The logo draw |
