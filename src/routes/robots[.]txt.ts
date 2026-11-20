import { createFileRoute } from "@tanstack/react-router";

import { robotsTxt } from "@/lib/feeds";
import { TEXT_CONTENT_TYPE } from "@/lib/markdown-response";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () => new Response(robotsTxt(), { headers: { "Content-Type": TEXT_CONTENT_TYPE } }),
    },
  },
});
