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
| Show all open/close | `grid-template-rows` 0fr → 1fr, 500ms ease-out-quint to open, 250ms to close. The only entrance: rows inside don't animate (no double entry) | Experience, projects |
| Experience / project row open | `<details>` + `::details-content` + `interpolate-size`, 300ms to open, 200ms to close; caret 200ms ease-in-out-quint | Experience, projects |
| Hover states | `transition-colors` 150ms; cover `scale-[1.02]` 200ms; arrow nudge 200ms | Everywhere |
| Logo colour | `grayscale opacity-60` → `grayscale-0 opacity-100`, 150ms, on row hover / keyboard focus | Experience, projects |
| Copy-link reveal | `opacity-0` → `100`, 150ms, on heading hover / button focus | Section headings |
| Press feedback | `transition-press active:scale-97`: color, background, border and `scale`, 150ms `--ease-out-quad` | Dock, back-to-top, social chips, copy buttons, stack chips |
| Tooltip groups | First dock tooltip waits 400ms; the rest open instantly with no zoom (`data-instant:animate-none`) | Dock |
| Theme icon | One sky angle on a critically damped spring (ω = 8, ~1s): the sun sets right (yellow → orange, rays in) while a crescent rises left and waxes to full; dawn is the reverse. Quick clicks reverse in place. Rare action, so it gets a delight budget. Reduced motion: no movement | Theme toggle |
| Dialog in/out | None for ⌘K: a keyboard-opened palette opens and closes instantly (`animate-none` on panel and backdrop) | ⌘K |
| Theme switch | View Transitions API (`document.startViewTransition`) cross-fade, 250ms | Theme toggle |

## Where Motion is used

Only for presence animations that CSS can't do cleanly. (The theme icon's sky uses its own tiny
spring in `requestAnimationFrame` instead: it needs a continuous, reversible value with velocity, and
loading Motion's animation engine into the header just for that would cost first-paint bundle.)

1. **Icon swaps** with `AnimatePresence mode="popLayout"`: dock Envelope → Check,
   Speaker on ↔ off. Scale 0.6 → 1 and opacity, 160ms.
2. **Copy feedback** in code blocks, section headings and the overview email and phone: Copy / Link → Check icon swap (same as 1).

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
| slow | 500ms | Show all (opening only) |
| `ease-out-quint` | `cubic-bezier(0.22, 1, 0.36, 1)` | Things entering or growing |
| `ease-in-out-quint` | `cubic-bezier(0.83, 0, 0.17, 1)` | The logo draw |
