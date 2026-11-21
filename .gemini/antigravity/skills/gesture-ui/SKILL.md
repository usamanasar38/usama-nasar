---
name: gesture-ui
description: Build drag, swipe, and sheet interactions that track the finger 1:1 and stay interruptible, the way the "Animations on the Web" course (animations.dev) teaches. Use when building or fixing anything the user drags, swipes, flings, holds, or dismisses with a gesture — drawers, sheets, swipe-to-dismiss toasts and cards, drag-to-reorder, pull-to-refresh, hold-to-confirm — or when a gesture feels laggy, disconnected from the finger, jumps on release, or can't be caught mid-animation. Triggers on — gesture, drag, draggable, swipe, swipe to dismiss, fling, momentum, velocity, drawer, sheet, bottom sheet, snap points, Vaul, dragConstraints, dragElastic, dragMomentum, onDragEnd, whileDrag, useMotionValue, rubber-band, overscroll, pull to refresh, hold to delete, press and hold, touch-action, dismiss threshold, "doesn't follow my finger", "jumps when I let go", "can't grab it mid-animation".
metadata:
  short-description: Build gestures that track the finger and stay interruptible (animations.dev)
---

# Gesture-Driven UI

How to build gestures that feel physical, from Emil Kowalski's *Animations on the Web* course ([animations.dev](https://animations.dev/)). A gesture is direct manipulation: while the finger is down, the UI is the finger; the moment it lifts, physics takes over. Every rule below follows from that split.

## First decision: build it, or use a solution that exists?

Doing a drawer gesture *right* means momentum-based dragging, overlay opacity matched to drag progress, velocity-aware dismissal, focus trapping, and Escape-to-close. That is weeks of edge cases, not an afternoon. **For a bottom sheet / drawer, default to [Vaul](https://vaul.emilkowal.ski/)** — it exists precisely because this is hard to hand-roll. Build the gesture yourself only when no library covers the interaction (custom swipe cards, bespoke drag interactions). Use the `pick-ui-library` skill when unsure.

## The two phases of every gesture

Walk this split for any gesture you build. Mixing the phases up is the #1 cause of gestures that feel wrong.

```
Is the pointer currently down?
├── Yes → TRACK phase: position maps 1:1 to the pointer.
│         No easing. No duration. No spring. The element IS the finger.
└── No  → RELEASE phase: physics finishes the motion.
          A spring seeded with the release velocity. Never a keyframe.
```

### Track phase rules

- **1:1 means 1:1.** Drive position from a `useMotionValue` (or direct `transform` writes), never a spring or a transition — a spring during tracking makes the element trail the finger and feel disconnected, like dragging something through syrup.
- **Write `transform` directly on the dragged element.** Never update a CSS variable on a parent to move children: CSS variables are inheritable, so every change recalculates styles for all descendants. This exact bug made Vaul's drag laggy past ~20 list items; setting `transform` on the element fixed it.
- **No React state per move event.** A re-render every pointermove drops frames. Motion values and direct style writes bypass the render cycle.
- **Rubber-band at the edges.** Dragging past a boundary should move the element a fraction of the distance (Motion: `dragElastic` ≈ 0.2), not stop dead — hard stops feel like hitting a wall; resistance communicates "there's nothing further" physically.

### Release phase rules

- **Finish with a spring, seeded with the gesture's velocity.** The element should leave the finger at the speed it was moving. A fixed-duration ease here makes every fling land identically, which reads as fake.
- **Dismiss on distance OR velocity.** Passing a distance threshold (~40–50% of travel) dismisses, but so does a fast flick over a short distance. In Motion, read both from `onDragEnd`'s `info.offset` and `info.velocity`. Distance-only thresholds make flicks feel ignored.
- **Bounce belongs only at the end of a drag.** A drag applies force — like throwing a ball at a wall — so a slight bounce on release feels physical. The same element closed by a button press gets **zero** bounce: no force was applied. Write it as `bounce`, not `stiffness`/`damping`, so the amount stays readable: `0` by default, about `0.2` when you want it. Smaller elements need more to read the same.
- **Snap-back is fast.** If the gesture doesn't pass the threshold, return quickly with the spring — a slow snap-back feels like the UI is disagreeing with the user in slow motion.

## Interruptibility is non-negotiable

The user must be able to catch a sheet mid-close and drag it back. Springs allow this: when retargeted mid-flight they keep their current velocity, so the redirect is seamless. CSS `@keyframes` restart from zero and cannot be caught — this is why Sonner's early CSS enter animation made toasts jump when a second toast arrived. **Never use a keyframe animation on anything a gesture can touch.** CSS transitions and springs only.

## Linked values

The dragged element is rarely alone — an overlay fades, the page behind scales. Derive these from drag progress, don't animate them separately:

```jsx
const y = useMotionValue(0);
const overlayOpacity = useTransform(y, [0, drawerHeight], [1, 0]);
```

One source of truth means the overlay is always exactly as faded as the drawer is dismissed — including mid-gesture, including when the user reverses. Two separate animations drift apart the moment a gesture is interrupted.

## Motion drag props

```jsx
<motion.div
  drag="y"
  dragConstraints={{ top: 0 }}
  dragElastic={0.2}
  onDragEnd={(e, info) => {
    if (info.offset.y > threshold || info.velocity.y > 500) dismiss();
  }}
/>
```

`dragMomentum` is on by default — right for a flung card, wrong for a simple reposition; disable it when the element should stop where the finger stops. `dragConstraints` takes a ref or bounds object.

## Sheets without springs: the Vaul curve

Vaul mimics the iOS sheet with pure CSS to stay small: `cubic-bezier(0.32, 0.72, 0, 1)` over **500ms**. The curve is extremely steep at the start — that's what lets a 500ms duration still feel snappy while landing with a spring-like gentle settle. Two rules from it:

- A **small floating drawer** (not touching the screen edge) should override to ~200ms — the 500ms iOS timing only reads right on a full-width edge-attached sheet:
  ```css
  [vaul-drawer]  { transition: transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1); }
  [vaul-overlay] { transition: opacity  0.2s cubic-bezier(0.165, 0.84, 0.44, 1); }
  ```
- **The component must feel like a single entity.** If the drawer opens in 200ms, its height changes and content crossfades must live in the same timing family — one slow sub-animation makes the whole thing feel broken.

Mark interactive children with `data-vaul-no-drag` so pressing a button inside the drawer doesn't start a drag.

## Spatial consistency

**An element dismisses in the direction it entered.** Sonner's toast slides up from the bottom, so swipe-down dismisses it — enter and exit share one axis, which is what makes the gesture feel discoverable and intuitive without instruction. A gesture that dismisses along an axis the element never moved on has to be learned; one that reverses the entrance is *felt*.

## Hold gestures are asymmetric

Hold-to-delete and similar press-and-hold interactions use **`linear`** during the hold — the animation visualizes time passing, and time passes linearly; any other curve lies about how long is left. On release before completion, snap back fast with `ease-out`. The deliberate phase is slow and honest; the cancel is instant. Symmetric timing here is a bug.

Build it from three parts:

- **Fill:** copy the button's content into a tinted overlay at `position: absolute; inset: 0`, hidden with `clip-path: inset(0 100% 0 0)` and revealed to `inset(0)` on `:active`. Never a `width` or `scaleX` fill: a bar behind the label cannot recolor it.
- **Timing:** `transition: clip-path 1.5s linear` on the `:active` rule, `clip-path 0.2s ease-out` on the default rule. The transition on the state being entered is the one that runs, so one shared transition makes the release as slow as the hold.
- **Press:** `transform: scale(0.97)` on `:active` with its own `0.16s` ease-out transition on the button.

## Touch checklist

Run through this for every gesture you ship:

- **Test on a real phone** — hit the dev server by local IP. Trackpad simulation lies about touch, and a 60Hz desktop monitor hides opacity-transition roughness that a 120Hz phone shows.
- **Hit targets ≥ 44×44px.** Enlarge small visual targets with an invisible `::before` hitbox instead of growing the layout.
- **`touch-action`** names the axis the browser keeps, so it doesn't fight the gesture with native scrolling: `pan-x` for a vertical drag, `pan-y` for a horizontal one, `none` for both axes. Motion's `drag` prop sets this for you; write it by hand only for your own pointer handlers.
- **Gate hover effects** behind `@media (hover: hover) and (pointer: fine)` — touch fires phantom hovers on tap. Tailwind v4's `hover:` is already gated.

## Reduced motion

Tracking is direct manipulation — the user is producing the motion — so it stays. Everything the finger is not producing loses its movement under `prefers-reduced-motion`: branch the entrance, the fly-off, and the snap-back, not only the bounce. The entrance and the dismissal become an opacity fade in place, and a cancelled drag returns to origin with no spring. See the `animation-accessibility` skill for the full two-variant workflow.

## When it still feels wrong

A "weird" spring is usually fixed by increasing `damping`. A gesture that stutters is a performance problem — check the track-phase rules above first, then use the `animation-performance` skill. To diagnose a feeling you can't name, use the `debug-animation` skill: record the gesture and scrub it frame by frame.
