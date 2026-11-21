# 003 — Stop the sun's rays spinning as they retract

- **Commit:** 51120be (plus the uncommitted working tree that adds `src/components/site/theme-icon.tsx`)
- **Severity:** LOW
- **Category:** Physicality & origin
- **Estimated scope:** 1 file, 2 lines

## Problem

As the sun sinks, its rays fade, shrink to 50% and also rotate up to −30°. The sun doesn't spin as it
sets; the rotation adds motion that carries no meaning and competes with the arc movement, which is the
part that tells the story. Fading and shrinking already show the light dimming.

## Where

| File | Lines | What's there |
| --- | --- | --- |
| `src/components/site/theme-icon.tsx` | ~26 | `const RAY_TURN = -30;` |
| `src/components/site/theme-icon.tsx` | ~70 (in `drawSky`) | The rays transform |

### Current code

```tsx
const RAY_TURN = -30;
```

```tsx
  parts.rays.style.transform = `translate(12px, 12px) rotate(${(1 - rays) * RAY_TURN}deg) scale(${RAY_MIN_SCALE + (1 - RAY_MIN_SCALE) * rays}) translate(-12px, -12px)`;
```

## Target

```tsx
  parts.rays.style.transform = `translate(12px, 12px) scale(${RAY_MIN_SCALE + (1 - RAY_MIN_SCALE) * rays}) translate(-12px, -12px)`;
```

and delete `const RAY_TURN = -30;`.

**Why:** scale (to 0.5) plus opacity is enough to show the rays drawing in; rotation on an element that
is already moving along an arc makes two motions where one tells the story.

## Steps

1. Replace the rays transform line in `drawSky` with the Target line.
2. Delete the `RAY_TURN` constant.
3. Run `pnpm exec oxlint src/components/site/theme-icon.tsx`, `pnpm typecheck`, `pnpm build`.

## Out of scope

- Ray scale and opacity values, the arc, colours and the spring.

## Verification

**Build**
- [ ] Lint, typecheck and build pass.

**Behavior**
- [ ] Toggle the theme: the rays shrink and fade as the sun sets and grow back as it rises, without turning.

**Feel**
- [ ] Record and scrub: the sun should read as one object sliding along its arc.
