import { createFileRoute } from "@tanstack/react-router";

import { projectsMarkdown } from "@/features/portfolio/lib/markdown";
import { markdownResponse } from "@/lib/markdown-response";

export const Route = createFileRoute("/projects.md")({
  server: { handlers: { GET: () => markdownResponse(projectsMarkdown()) } },
});
