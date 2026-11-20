import type { Icon } from "@phosphor-icons/react"
import type { SimpleIcon } from "simple-icons"

/**
 * An image that may need a different file per theme (e.g. a black company logo
 * that disappears on the dark background). Use a plain string when one file
 * works on both themes; use { light, dark } otherwise.
 *
 * Render with `ThemedImage` (see lib/themed-image.ts): it outputs both <img>
 * tags and hides one with Tailwind's `dark:` variant, so it follows the
 * app's `.dark` class (not the OS setting) and never flashes.
 */
export type ThemedSrc = string | { light: string; dark: string }

/** A Phosphor icon component, e.g. `CodeIcon`. Rendered in currentColor. */
export type PhosphorIcon = Icon

/** A simple-icons object, e.g. `siReact`. Rendered monochrome in currentColor. */
export type BrandIcon = SimpleIcon

/**
 * Period used across experiences, projects and education.
 * Format "MM.YYYY" (e.g. "08.2024") or "YYYY" when the month isn't known.
 * Omit `end` for "Present".
 */
export type Period = {
  start: string
  end?: string
}
