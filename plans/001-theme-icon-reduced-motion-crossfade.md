# 001 — Cross-fade the theme icon under reduced motion instead of jumping

- **Commit:** 51120be (plus the uncommitted working tree that adds `src/components/site/theme-icon.tsx`)
- **Severity:** MEDIUM
- **Category:** Accessibility
- **Estimated scope:** 1 file, ~25 lines

## Problem

With `prefers-reduced-motion: reduce`, a theme switch makes the icon jump: the sun disappears and the
full moon appears on the same frame. Removing the movement is right, but removing *all* transition is
not — reduced motion means gentler, not zero, and a hard swap makes it harder to see that the control
changed state. The fix keeps everything still and fades the icon out and back in around the pose swap.

## Where

| File | Lines | What's there |
| --- | --- | --- |
| `src/components/site/theme-icon.tsx` | ~41 (`interface SkyParts`) | The refs the sky writes to |
| `src/components/site/theme-icon.tsx` | ~129–133 (inside `follow`) | The reduced-motion branch |
| `src/components/site/theme-icon.tsx` | `ThemeIcon` component | The refs and the `<svg>` element |

### Current code

```tsx
// src/components/site/theme-icon.tsx — inside follow()
    if (prefersReducedMotion()) {
      cancelAnimationFrame(frame);
      settle();

      return;
    }
```

```tsx
// src/components/site/theme-icon.tsx
interface SkyParts {
  sun: SVGGElement;
  rays: SVGGElement;
  core: SVGCircleElement;
  moon: SVGGElement;
  shadow: SVGCircleElement;
}
```

## Target

Under reduced motion: fade the whole `<svg>` to `opacity: 0` over **100ms**, swap the pose while it is
invisible, then fade back to `opacity: 1` over **120ms**, all with the built-in `ease` (it is an
opacity-only change, where `ease` is the right curve). Nothing moves, rotates or changes phase on screen.

```tsx
const FADE_OUT_MS = 100;
const FADE_IN_MS = 120;

interface SkyParts {
  icon: SVGSVGElement;
  sun: SVGGElement;
  rays: SVGGElement;
  core: SVGCircleElement;
  moon: SVGGElement;
  shadow: SVGCircleElement;
}

// inside follow(), replacing the current reduced-motion branch:
    if (prefersReducedMotion()) {
      cancelAnimationFrame(frame);
      const fadeOut = parts.icon.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: FADE_OUT_MS,
        easing: "ease",
        fill: "forwards",
      });

      fadeOut.onfinish = () => {
        settle();
        parts.icon.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: FADE_IN_MS,
          easing: "ease",
        });
        fadeOut.cancel();
      };

      return;
    }
```

**Why these values:** 100ms out + 120ms in = 220ms total, inside the 200–300ms budget for a small
state change, and close to the page's own 250ms cross-fade. The fade-in is slightly longer than the
fade-out because exits get out of the way and the new state deserves a beat. `ease` because only
opacity changes. `fill: "forwards"` holds opacity 0 until the swap; `fadeOut.cancel()` then removes that
held value so the fade-in's result (opacity 1, no fill) is what remains.

## Conventions to follow

- Keep the house style in this file: constants at module scope in SCREAMING_CASE, arrow functions,
  braces on every `if`, a blank line before `return`, no comments except TSDoc on exports (the linter
  enforces this).
- `src/components/site/theme-icon.tsx` already writes styles through refs instead of React state — keep
  doing that; do not add `useState` for the fade.
- WAAPI (`element.animate`) is fine here: it is native, no dependency.

## Steps

1. Add `FADE_OUT_MS = 100` and `FADE_IN_MS = 120` next to the other constants.
2. Add `icon: SVGSVGElement;` as the first field of `SkyParts`.
3. In `ThemeIcon`, add `const icon = useRef<SVGSVGElement>(null);`, pass `ref={icon}` on the `<svg>`,
   add `icon.current === null ||` to the null check in the effect and `icon: icon.current,` to the
   `parts` object.
4. Replace the reduced-motion branch in `follow` with the Target code above.
5. Run `pnpm exec oxlint src/components/site/theme-icon.tsx`, `pnpm typecheck`, `pnpm build`.

## Out of scope

- The normal (motion-allowed) sky animation, its spring and every constant it uses.
- `app.css` `theme-icon-*` rules (first-paint poses).
- Any other component's reduced-motion handling.
- Do not introduce a new animation library.

## Verification

**Build**
- [ ] `pnpm exec oxlint src/components/site/theme-icon.tsx` shows no findings; `pnpm typecheck` and `pnpm build` pass.

**Behavior**
- [ ] DevTools → Rendering → emulate `prefers-reduced-motion: reduce`. Toggle the theme: the icon fades
      out and back in; the sun and moon never move, rotate or change phase while visible.
- [ ] Click the toggle five times quickly with reduced motion on: the icon always ends on the pose that
      matches the page theme, and never stays invisible.
- [ ] With reduced motion off, the sky animation is unchanged.

**Feel**
- [ ] Record the reduced-motion toggle and scrub it: there should be one soft blink, not a flash.
- [ ] Look at it again with fresh eyes before calling it done.

## Notes

Rapid clicks under reduced motion start a new fade while one is running. Each fade ends in `settle()`,
which always draws the pose for the current `target`, so the icon converges on the right state; a feel
check on rapid clicks is still worth doing.
