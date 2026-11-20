# 13 · Motion polish

```text
Read CLAUDE.md and docs/design/08-motion.md (all of it).

Goal: add the few Motion animations the design allows, without hurting Core Web Vitals.

Steps:
1. Confirm MotionProvider (LazyMotion, async domAnimation, strict, MotionConfig reducedMotion="user")
   wraps the app, and that the codebase uses `m.*` only (strict mode would throw on `motion.*`).
2. Icon swaps with AnimatePresence mode="popLayout" (scale 0.6 → 1 + opacity, 160ms ease-out-quint):
   ThemeToggle Sun/Moon, dock copy Envelope/Check, dock sound Speaker on/off, code-block Copy/Check.
3. Show more stagger: when ShowMore opens, each revealed item fades in and rises 8px with a 40ms stagger
   (max 8 items staggered), after the height starts growing. No animation on close.
4. Theme switch: confirm setTheme uses document.startViewTransition (250ms cross-fade via
   ::view-transition-old/new(root) CSS in app.css), skipped under reduced motion.
5. Audit: remove any Motion use not listed in 08-motion.md; ensure nothing above the fold has an initial
   opacity of 0; no useScroll; no layout prop on lists.

Acceptance:
- Lighthouse Performance on "/" is unchanged or better compared with before this prompt.
- With reduced motion on, icon swaps are instant, Show more has no stagger, and the theme changes with no fade.
- Motion's feature bundle loads after hydration (check the network panel).
```
