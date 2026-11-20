import { MDXContent } from "@content-collections/mdx/react";
import { createFileRoute } from "@tanstack/react-router";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { rssXml } from "@/lib/feeds";
import { publishedPosts } from "@/lib/posts.server";

const RSS_LIMIT = 20;

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: () => {
        const items = publishedPosts()
          .filter((post) => !post.draft)
          .slice(0, RSS_LIMIT)
          .map((post) => ({
            date: post.date,
            description: post.description,
            html: renderToStaticMarkup(createElement(MDXContent, { code: post.body })),
            slug: post.slug,
            tags: post.tags,
            title: post.title,
          }));
        return new Response(rssXml(items), {
          headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
        });
      },
    },
  },
});
