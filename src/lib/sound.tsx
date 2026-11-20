import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";
import type { PointerEvent, ReactNode } from "react";

/**
 * UI sounds (docs/design/02-foundations.md#sound, 07-registries.md#soundcn).
 * Nothing loads or plays before the first pointer/key press: the soundcn assets are a
 * separate chunk imported on that first interaction, and play() is a no-op until then.
 */

export type SoundName =
  | "hover"
  | "click"
  | "on"
  | "off"
  | "expand"
  | "collapse"
  | "open"
  | "success"
  | "rise";

type Assets = typeof import("@/lib/sound-assets");

type AssetKey = Exclude<keyof Assets, "playSound">;

const SOUNDS: Record<
  SoundName,
  { asset: AssetKey; volume: number; rate: number }
> = {
  click: { asset: "clickSoftSound", rate: 1, volume: 0.5 },
  collapse: { asset: "close001Sound", rate: 1, volume: 0.4 },
  expand: { asset: "open001Sound", rate: 1, volume: 0.4 },
  hover: { asset: "hoverTickSound", rate: 1, volume: 0.25 },
  off: { asset: "switchOffSound", rate: 1, volume: 0.4 },
  on: { asset: "switchOnSound", rate: 1, volume: 0.4 },
  open: { asset: "open001Sound", rate: 1.15, volume: 0.35 },
  rise: { asset: "open001Sound", rate: 0.8, volume: 0.4 },
  success: { asset: "successChimeSound", rate: 1, volume: 0.4 },
};

/** Pentatonic run for the contact links: note(0), note(1), … */
const NOTE_RATES = [1, 1.125, 1.25, 1.5, 1.667];
const NOTE_VOLUME = 0.35;
const HOVER_THROTTLE_MS = 45;

const STORAGE_KEY = "un:sound";
const CHANGE_EVENT = "un:sound-change";

const readEnabled = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
};

const writeEnabled = (enabled: boolean) => {
  try {
    localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
  } catch {
    // Blocked storage: the setting lasts for this page view only.
  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
};

const subscribe = (onChange: () => void) => {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      onChange();
    }
  };

  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
};

const getServerSnapshot = () => false;

const loadAssets = () => import("@/lib/sound-assets");

interface SoundContextValue {
  enabled: boolean;
  toggle: () => void;
  play: (name: SoundName) => void;
  note: (index: number) => void;
  /** Spread on interactive elements: plays "hover" for mouse pointers only (not taps). */
  hoverProps: { onPointerEnter: (event: PointerEvent) => void };
}

const SoundContext = createContext<SoundContextValue | null>(null);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const enabled = useSyncExternalStore(
    subscribe,
    readEnabled,
    getServerSnapshot
  );
  const assets = useRef<Assets | null>(null);
  const lastHover = useRef(0);

  useEffect(() => {
    const load = () => {
      window.removeEventListener("pointerdown", load, true);
      window.removeEventListener("keydown", load, true);
      loadAssets()
        .then((module) => {
          assets.current = module;
          return module;
        })
        .catch(() => {
          // Sounds are decoration; failing to load them must never break the page.
        });
    };

    window.addEventListener("pointerdown", load, {
      capture: true,
      passive: true,
    });
    window.addEventListener("keydown", load, { capture: true, passive: true });

    return () => {
      window.removeEventListener("pointerdown", load, true);
      window.removeEventListener("keydown", load, true);
    };
  }, []);

  const playAsset = useCallback(
    (asset: AssetKey, volume: number, playbackRate: number, force = false) => {
      const loaded = assets.current;

      if (!loaded || !(force || readEnabled())) {
        return;
      }

      loaded
        .playSound(loaded[asset].dataUri, { playbackRate, volume })
        .catch(() => {
          // Ignore autoplay or decode failures.
        });
    },
    []
  );

  const play = useCallback(
    (name: SoundName) => {
      const sound = SOUNDS[name];

      if (name === "hover") {
        const now = performance.now();

        if (now - lastHover.current < HOVER_THROTTLE_MS) {
          return;
        }

        lastHover.current = now;
      }

      playAsset(sound.asset, sound.volume, sound.rate);
    },
    [playAsset]
  );

  const note = useCallback(
    (index: number) => {
      const rate = NOTE_RATES[index % NOTE_RATES.length] ?? 1;
      playAsset("tick001Sound", NOTE_VOLUME, rate);
    },
    [playAsset]
  );

  const toggle = useCallback(() => {
    const next = !readEnabled();

    if (next) {
      writeEnabled(true);
      playAsset(SOUNDS.on.asset, SOUNDS.on.volume, SOUNDS.on.rate);
    } else {
      playAsset(SOUNDS.off.asset, SOUNDS.off.volume, SOUNDS.off.rate, true);
      writeEnabled(false);
    }
  }, [playAsset]);

  const value = useMemo<SoundContextValue>(
    () => ({
      enabled,
      hoverProps: {
        onPointerEnter: (event) => {
          if (event.pointerType === "mouse") {
            play("hover");
          }
        },
      },
      note,
      play,
      toggle,
    }),
    [enabled, note, play, toggle]
  );

  return <SoundContext value={value}>{children}</SoundContext>;
};

export const useSounds = () => {
  const context = useContext(SoundContext);

  if (!context) {
    throw new Error("useSounds() must be used inside <SoundProvider>.");
  }

  return context;
};
