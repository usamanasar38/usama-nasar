/**
 * Page copy derived from the portfolio data in src/features/portfolio (the source of truth).
 * Components import from here or from the data modules directly; no copy lives in JSX
 * except UI labels. Spec: docs/design/05-content.md.
 */
import { CAL_URL, SITE_INFO } from "@/config/site";
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links";
import { USER } from "@/features/portfolio/data/user";
import { decodeB64 } from "@/features/portfolio/lib/format";

/** True when a value still holds a `[BRACKETS]` placeholder for Usama to fill in. */
export const isPlaceholder = (value: string | undefined) =>
  value === undefined || /\[[^\]]+\]/u.test(value);

/** Drops drafts in production builds so placeholders never ship. */
export const visible = <T extends { draft?: boolean }>(items: T[]) =>
  import.meta.env.PROD ? items.filter((item) => item.draft !== true) : items;

export const site = {
  /** Booking link; undefined while CAL_URL is still a placeholder (hides "Book a call"). */
  calendar: isPlaceholder(CAL_URL) ? undefined : CAL_URL,
  /** Decoded for mailto links and copy-to-clipboard. */
  email: decodeB64(USER.emailB64),
  name: USER.displayName,
  resume: USER.resume.default,
  url: SITE_INFO.url,
} as const;

export type ContactLink = { label: string; href: string; hint: string; external: boolean };

export const contactLinks: ContactLink[] = [
  { external: false, hint: site.email, href: `mailto:${site.email}`, label: "Email me" },
  ...(site.calendar
    ? [{ external: true, hint: "cal.com", href: site.calendar, label: "Book a 20-min call" }]
    : []),
  ...SOCIAL_LINKS.map((link) => ({
    external: true,
    hint: link.handle,
    href: link.href,
    label: link.title,
  })),
];
