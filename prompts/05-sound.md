# 05 · Sound

```text
Read CLAUDE.md, docs/design/02-foundations.md#sound and 07-registries.md (soundcn section).

Goal: one SoundProvider that plays soundcn sounds, loads nothing before the first interaction, and is
used by every interactive control in the shell.

Build src/lib/sound.tsx:
1. SoundProvider (client) + useSounds() returning { enabled, toggle, play(name), note(index) }.
   Names: hover, click, on, off, expand, collapse, open, success, rise. Mapping, volumes and playback rates:
   use the table in 07-registries.md exactly.
2. Lazy loading: register ONE capture listener for pointerdown and keydown on window. On the first event,
   dynamic-import a module (src/lib/sound-assets.ts) that re-exports the soundcn sound objects
   (hoverTickSound, clickSoftSound, tick001Sound, switchOnSound, switchOffSound, open001Sound,
   close001Sound, successChimeSound) so they become a separate chunk. Then remove the listeners.
3. Playing: call soundcn's playSound(asset.dataUri, { volume, playbackRate }) from its sound-engine.
   Before the assets have loaded, play() is a no-op. Don't use the useSound hook per component (it decodes
   on mount and would pull the base64 into the main bundle).
4. enabled: stored in localStorage "un:sound" ("on" by default). useSyncExternalStore so all toggles stay in
   sync; SSR snapshot = false. toggle() plays "off" before muting and "on" after unmuting.
5. Respect the user: never play on page load, scroll, or route change; volumes as specified (≤ 0.5).
6. Wrap the app in SoundProvider in the root layout (inside MotionProvider).
7. Wire sounds in the shell: header links/buttons and dock buttons hover → "hover"; search trigger → "open";
   theme toggle → "on" (to light) / "off" (to dark); copy email success → "success"; back-to-top click →
   "rise"; mobile nav taps → "click"; dock sound toggle → toggle().

Acceptance:
- The initial JS on "/" doesn't contain the base64 sound data (check the build output: the sound
  assets are their own chunk).
- No AudioContext is created before the first click/key press (no autoplay warning in the console).
- After one click, hovering header links ticks; the toggle mutes everything and persists across reloads.
```
