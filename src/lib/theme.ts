import { useSyncExternalStore } from "react";

import { META_THEME_COLORS } from "@/config/site";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
/** Fired on `window` after the `.dark` class has changed. */
export const THEME_CHANGE_EVENT = "un:theme-change";
const META_SELECTOR = 'meta[name="theme-color"]';

/**
 * Inline <head> script: sets the `.dark` class and the browser-UI `theme-color` before
 * first paint, from localStorage "theme" or the OS preference. It runs after the
 * `theme-color` meta in the root document. Keep it tiny and dependency-free.
 */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);var m=document.querySelector('${META_SELECTOR}');if(m)m.setAttribute("content",d?"${META_THEME_COLORS.dark}":"${META_THEME_COLORS.light}")}catch(e){}})()`;

const syncMetaColor = (theme: Theme) => {
  document
    .querySelector(META_SELECTOR)
    ?.setAttribute("content", META_THEME_COLORS[theme]);
};

const readTheme = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let requestedTheme: Theme | undefined;

/** Applies the theme, saves it, and cross-fades with a view transition when allowed. */
export const setTheme = (theme: Theme) => {
  requestedTheme = theme;

  const apply = () => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    syncMetaColor(theme);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked (private mode); the class still applies for this visit.
  }

  if (
    typeof document.startViewTransition === "function" &&
    !prefersReducedMotion()
  ) {
    document.startViewTransition(apply);
  } else {
    apply();
  }
};

const subscribe = (onChange: () => void) => {
  window.addEventListener(THEME_CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);
  };
};

/** The server can't know the theme; the client corrects it right after hydration. */
const getServerSnapshot = (): Theme => "light";

/** Switches to the other theme and returns it (reads the pending choice, so rapid clicks alternate). */
export const toggleTheme = () => {
  const next: Theme =
    (requestedTheme ?? readTheme()) === "dark" ? "light" : "dark";

  setTheme(next);

  return next;
};

export const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, readTheme, getServerSnapshot);

  return { theme, toggle: toggleTheme };
};
