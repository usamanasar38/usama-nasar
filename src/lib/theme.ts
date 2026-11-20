import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const CHANGE_EVENT = "un:theme-change";

/**
 * Inline <head> script: sets the `.dark` class before first paint, from localStorage
 * "theme" or the OS preference. Keep it tiny and dependency-free.
 */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

const readTheme = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Applies the theme, saves it, and cross-fades with a view transition when allowed. */
export const setTheme = (theme: Theme) => {
  const apply = () => {
    document.documentElement.classList.toggle("dark", theme === "dark");
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

  window.dispatchEvent(new Event(CHANGE_EVENT));
};

const subscribe = (onChange: () => void) => {
  window.addEventListener(CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
};

/** The server can't know the theme; the client corrects it right after hydration. */
const getServerSnapshot = (): Theme => "light";

export const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, readTheme, getServerSnapshot);
  const toggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return { theme, toggle };
};
