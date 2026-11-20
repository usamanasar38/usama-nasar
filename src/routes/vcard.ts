import { createFileRoute } from "@tanstack/react-router";

import { buildVCard } from "@/features/portfolio/lib/vcard";

export const Route = createFileRoute("/vcard")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildVCard(), {
          headers: {
            "Content-Disposition": "attachment; filename=usama-nasar.vcf",
            "Content-Type": "text/vcard; charset=utf-8",
          },
        }),
    },
  },
});
