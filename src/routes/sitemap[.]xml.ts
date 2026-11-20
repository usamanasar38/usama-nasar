import { createFileRoute } from "@tanstack/react-router";

import { USER } from "@/features/portfolio/data/user";
import { sitemapXml } from "@/lib/feeds";
import { publishedPosts } from "@/lib/posts.server";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const posts = publishedPosts().filter((post) => !post.draft);
        const latest = posts[0]?.updated ?? posts[0]?.date;
        const body = sitemapXml([
          { lastmod: new Date().toISOString().slice(0, 10), path: "/", priority: 1 },
          { lastmod: (latest ?? USER.dateCreated).slice(0, 10), path: "/blog", priority: 0.8 },
          ...posts.map((post) => ({
            lastmod: (post.updated ?? post.date).slice(0, 10),
            path: `/blog/${post.slug}`,
            priority: 0.7,
          })),
        ]);
        return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
      },
    },
  },
});
