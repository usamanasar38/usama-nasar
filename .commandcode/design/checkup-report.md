# Design Checkup Report — Usama Nasar Portfolio

**Date:** 2026-06-03
**Surface:** Single-page portfolio (Brand register)
**Target:** `src/routes/index.tsx` + 6 portfolio components + `src/styles.css`
**Score:** 40/60

---

## Vital Sign Summary

| Vital          | Status   | Score |
| -------------- | -------- | ----- |
| Intentionality | Watch    | 8/10  |
| Readability    | Watch    | 7/10  |
| Usability      | Critical | 6/10  |
| Responsiveness | Watch    | 7/10  |
| Speed          | Watch    | 8/10  |
| Accessibility  | Critical | 4/10  |

---

## 1. Intentionality — Watch (8/10)

Dark-mode-first, system tokens, svgl.app icons, Inter Variable. Choices read as deliberate.

**Watch:** `DATA.navbar` defines nav items but no nav bar renders.

---

## 2. Readability — Watch (7/10)

`max-w-2xl` constrains measure well. `leading-relaxed` on body copy. Section headers use `tracking-widest` for distinction.

**Watch:** Four experience descriptions are very long single paragraphs. Progressive disclosure or tighter editing would improve scan-ability.

---

## 3. Usability — Critical (6/10)

**Critical:** No visible navigation. Users cannot jump between sections without scrolling. `DATA.navbar` exists in data but is not rendered.

**Critical:** Focus ring `outline-ring/50` is too subtle on dark backgrounds. Keyboard users cannot reliably see where they are.

---

## 4. Responsiveness — Watch (7/10)

Cards collapse well: 2-col → 3-col. Footer stacks on mobile.

**Watch:** No container queries. No specific tablet breakpoint optimization.

---

## 5. Speed — Watch (8/10)

SSR output is lean: 163KB client JS, 21KB route chunk. No hero image avoids LCP issues.

**Watch:** svgl.app images load from external CDN with no loading state or fallback. Animation runs unconditionally (no `prefers-reduced-motion` check).

---

## 6. Accessibility — Critical (4/10)

**Critical:** No skip-to-content link.

**Critical:** Missing semantic landmarks: no `<main>`, no `<nav>`, no `<header>`. Only `<footer>` uses the correct element.

**Critical:** `prefers-reduced-motion` not respected. Tech-card fade-up animations fire regardless of user preference.

**Critical:** Focus ring visibility is insufficient — `outline-ring/50` is nearly invisible against dark card backgrounds.

---

## Prescriptions

| #   | Severity | Issue                        | Fix                                                                             |
| --- | -------- | ---------------------------- | ------------------------------------------------------------------------------- |
| 1   | Critical | Missing landmarks            | Wrap sections in `<main>`, add `<nav>` for section jumps                        |
| 2   | Critical | No skip-to-content           | Add visible-on-focus skip link at top of `<body>`                               |
| 3   | Critical | No `prefers-reduced-motion`  | Guard tech-card animation with media query, disable when user prefers reduction |
| 4   | Critical | Weak focus rings             | Strengthen outline to `outline-2 outline-ring` with offset                      |
| 5   | Critical | No visible navigation        | Build sticky nav bar using `DATA.navbar` with active section highlighting       |
| 6   | Watch    | Long experience descriptions | Trim or add progressive disclosure (expand/collapse)                            |
