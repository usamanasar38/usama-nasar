import type { BrandIcon, PhosphorIcon } from "./common"

export type TechStackCategory =
  | "Language"
  | "Frontend"
  | "State"
  | "Styling"
  | "Backend"
  | "Database"
  | "Tooling"
  | "Testing"
  | "DevOps"
  | "Observability"
  | "Infrastructure"
  | "AI"

export type TechStack = {
  key: string
  title: string
  href: string
  /**
   * Monochrome brand logo from simple-icons (named import). It's drawn in
   * currentColor, so it works on light and dark without variants.
   * Omit for concepts that have no logo; `fallbackIcon` or a monogram is used.
   */
  icon?: BrandIcon
  fallbackIcon?: PhosphorIcon
  categories: TechStackCategory[]
  /** Shown in the home page Stack section (the rest only on /about.md, llms-full) */
  isFeatured?: boolean
}
