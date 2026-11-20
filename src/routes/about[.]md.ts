import { createFileRoute } from "@tanstack/react-router";

import { aboutMarkdown } from "@/features/portfolio/lib/markdown";
import { markdownResponse } from "@/lib/markdown-response";

export const Route = createFileRoute("/about.md")({
  server: { handlers: { GET: () => markdownResponse(aboutMarkdown()) } },
});
