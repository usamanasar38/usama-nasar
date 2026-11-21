# 004 — Let the theme-icon spring rest once movement is invisible

- **Commit:** 51120be (plus the uncommitted working tree that adds `src/components/site/theme-icon.tsx`)
- **Severity:** LOW
- **Category:** Performance
- **Estimated scope:** 1 file, 2 lines

## Problem

The spring only stops when it is within 0.05° of its target and slower than 0.5°/s. For a critically
damped spring with ω = 8 that takes ~1.33s, but anything under ~0.5° of arc moves the bodies by less
than 0.1px at the icon's 20px size. The last ~0.3–0.4s are invisible `requestAnimationFrame` work that
also rewrites five inline styles per frame.

## Where

| File | Lines | What's there |
| --- | --- | --- |
| `src/components/site/theme-icon.tsx` | ~23–24 | `REST_ANGLE`, `REST_VELOCITY` |

### Current code

```tsx
const REST_ANGLE = 0.05;
const REST_VELOCITY = 0.5;
```

## Target

```tsx
const REST_ANGLE = 0.5;
const REST_VELOCITY = 2;
```

**Why these values:** 0.5° on the arc (radius 13 viewBox units) is 0.11 units, about 0.09px at 20px —
below what anyone can see. 2°/s is a speed that moves less than 0.03px per frame at 60fps. `settle()`
then snaps to the exact target, so the final pose is unchanged.

## Steps

1. Change the two constants to the Target values.
2. Run `pnpm typecheck` and `pnpm build`.

## Out of scope

- `SPRING_OMEGA` (see plan 002) and every drawing constant.

## Verification

**Build**
- [ ] Typecheck and build pass.

**Behavior**
- [ ] DevTools Performance: record a theme toggle. The rAF callbacks from `theme-icon` stop earlier
      than before; the end pose is pixel-identical.
- [ ] Click twice quickly: reversal still works.

**Feel**
- [ ] Scrub the last frames of a recording: there should be no visible "snap" when it settles.
