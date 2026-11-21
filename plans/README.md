# Animation plans

Plans written by the `improve-animations` skill. Each is self-contained; execute in this order.

| # | Plan | Severity | Depends on | Status |
| --- | --- | --- | --- | --- |
| 001 | [Cross-fade the theme icon under reduced motion](001-theme-icon-reduced-motion-crossfade.md) | MEDIUM | — | TODO |
| 002 | [Quicken the theme-icon sky](002-theme-icon-quicker-sky.md) | LOW | — | TODO |
| 003 | [Stop the sun's rays spinning](003-theme-icon-rays-no-spin.md) | LOW | — | TODO |
| 004 | [Let the spring rest once movement is invisible](004-theme-icon-earlier-rest.md) | LOW | after 002 (its timing note assumes ω = 8; re-check if 002 landed) | TODO |

All four touch only `src/components/site/theme-icon.tsx` and can land as one change. 002 is a taste call:
compare ω = 8, 10 and 12 before merging.

## Missed opportunities (not planned)

- Tint the moon warm (towards `--sunset`, ~25% `color-mix`) while it is near the horizon, as a real
  rising moon looks. Additive polish; only worth it if the sky motion stays as is.
