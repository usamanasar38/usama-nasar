import type { ThemedSrc } from "@/features/portfolio/types/common"

/** Normalises a ThemedSrc to both variants (a plain string serves both themes). */
export function resolveThemedSrc(src: ThemedSrc): { light: string; dark: string } {
  return typeof src === "string" ? { light: src, dark: src } : src
}

/** True when the light and dark files differ, i.e. two <img> tags are needed. */
export function isThemed(src: ThemedSrc): src is { light: string; dark: string } {
  return typeof src !== "string" && src.light !== src.dark
}

/**
 * Class names for the two <img> tags that render a themed image. The app
 * theme is the `.dark` class on <html> (not the OS setting), so use Tailwind's
 * `dark:` variant rather than <picture media="(prefers-color-scheme)">.
 *
 *   <img src={light} className={THEMED_IMG.light} … />
 *   <img src={dark} className={THEMED_IMG.dark} alt="" aria-hidden … />
 *
 * Only the light <img> carries the alt text, so screen readers announce it once.
 */
export const THEMED_IMG = {
  light: "dark:hidden",
  dark: "hidden dark:block",
} as const
