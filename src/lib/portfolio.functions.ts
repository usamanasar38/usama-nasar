import { createServerFn } from "@tanstack/react-start";

import { profilePageJsonLd, websiteJsonLd } from "@/config/json-ld";
import { TECH_STACK_GROUPS } from "@/features/portfolio/data/tech-stack";
import { jsonLdScript } from "@/lib/seo";

/**
 * Data that only the server needs to touch. JSON-LD pulls in the whole tech stack
 * (the simple-icons objects for `knowsAbout`), so it's built here and handed to head()
 * through loaders instead of being bundled for the client.
 */

/** Serialised (and <-escaped) JSON-LD, ready for a head() script tag. */
export const getSiteJsonLd = createServerFn({ method: "GET" }).handler(
  () => jsonLdScript(websiteJsonLd).children
);

/** Home: the featured stack as plain data (icon paths, not simple-icons objects) + ProfilePage JSON-LD. */
export const getHomeData = createServerFn({ method: "GET" }).handler(() => ({
  jsonLd: jsonLdScript(profilePageJsonLd()).children,
  stack: TECH_STACK_GROUPS.map((group) => ({
    items: group.items.map((item) => ({
      fallback: item.fallbackIcon?.displayName,
      href: item.href,
      key: item.key,
      path: item.icon?.path,
      title: item.title,
    })),
    title: group.title,
  })),
}));

export type StackGroup = Awaited<ReturnType<typeof getHomeData>>["stack"][number];
