import { createFileRoute } from "@tanstack/react-router";

import { postMarkdown } from "@/lib/llms";
import { markdownResponse } from "@/lib/markdown-response";
import { publishedPosts } from "@/lib/posts.server";

export const Route = createFileRoute("/blog/{$slug}.md")({
  server: {
    handlers: {
      GET: ({ params }) => {
        const post = publishedPosts().find((item) => item.slug === params.slug && !item.draft);
        if (!post) {
          return new Response("Not found", { status: 404 });
        }
        return markdownResponse(postMarkdown(post));
      },
    },
  },
});
