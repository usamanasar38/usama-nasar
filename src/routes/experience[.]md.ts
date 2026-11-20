import { createFileRoute } from "@tanstack/react-router";

import { experienceMarkdown } from "@/features/portfolio/lib/markdown";
import { markdownResponse } from "@/lib/markdown-response";

export const Route = createFileRoute("/experience.md")({
  server: { handlers: { GET: () => markdownResponse(experienceMarkdown()) } },
});
