# 002 — Quicken the theme-icon sky so it ends with the page cross-fade

- **Commit:** 51120be (plus the uncommitted working tree that adds `src/components/site/theme-icon.tsx`)
- **Severity:** LOW
- **Category:** Cohesion, hierarchy & spatial consistency
- **Estimated scope:** 1 file, 1 line

## Problem

A theme switch runs two motions: the page cross-fade (250ms, `src/styles/app.css`, the
`::view-transition-old(root)` / `::view-transition-new(root)` rule) and the icon's sky. The sky is a
critically damped spring with `SPRING_OMEGA = 8`: it covers 90% of its travel in ~0.49s and settles
(within 1%) in ~0.83s. The page finishes changing long before the icon does, so the two can read as two
separate events. This is a rare action with a delight budget, so a longer narrative is allowed — but a
20px icon should not still be moving well after the page has settled.

## Where

| File | Lines | What's there |
| --- | --- | --- |
| `src/components/site/theme-icon.tsx` | ~21 | `const SPRING_OMEGA = 8;` |

### Current code

```tsx
// src/components/site/theme-icon.tsx
const SPRING_OMEGA = 8;
```

## Target

```tsx
const SPRING_OMEGA = 10;
```

**Why this value:** for a critically damped spring from rest, 90% of the travel takes `3.89 / ω` and
settling to 1% takes `6.64 / ω`. At ω = 10 that is ~0.39s and ~0.66s (from ~0.49s and ~0.83s): the
sunset and moonrise still read as a continuous sky turn, but the bulk of it overlaps the page fade. Do
not go above 12: past that the twilight overlap (sun setting while the crescent rises) becomes too brief
to see at 20px.

## Conventions to follow

- Only the constant changes. The integration in `tick` already derives damping from `SPRING_OMEGA`
  (`2 * SPRING_OMEGA * velocity`), which keeps the spring critically damped (no bounce).

## Steps

1. Change `const SPRING_OMEGA = 8;` to `const SPRING_OMEGA = 10;`.
2. Run `pnpm typecheck` and `pnpm build`.

## Out of scope

- The page cross-fade duration in `app.css`.
- Every other constant in `theme-icon.tsx`.

## Verification

**Build**
- [ ] `pnpm typecheck` and `pnpm build` pass.

**Behavior**
- [ ] Toggle the theme: the sun still visibly sets on the right while the crescent rises on the left.
- [ ] Click twice quickly: the scene still reverses in place without a snap.

**Feel**
- [ ] Record a light→dark switch and scrub it next to the page fade: the icon's main movement should
      land within roughly 150ms of the page finishing.
- [ ] Compare ω = 8, 10 and 12 side by side before deciding; this is a taste call.

## Notes

Whether the longer, slower sky (ω = 8) is part of the charm is a human decision. This plan is the
reviewer's recommendation, not a rule violation.
