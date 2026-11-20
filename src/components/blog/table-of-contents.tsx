import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type Heading = { id: string; text: string; depth: 2 | 3 };

/** Sticky "on this page" list. IntersectionObserver marks the current heading (no scroll listeners). */
export const TableOfContents = ({ headings }: { headings: Heading[] }) => {
  const [active, setActive] = useState(headings[0]?.id);

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element) => element !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .toSorted((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -65% 0px" }
    );
    for (const element of elements) {
      observer.observe(element);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav aria-labelledby="toc-title" className="sticky top-24">
      <p className="mb-3 font-mono text-micro text-muted-foreground" id="toc-title">
        on this page
      </p>
      <ul className="flex flex-col border-l">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              aria-current={active === heading.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l py-1 text-label text-muted-foreground transition-colors hover:text-foreground aria-[current=location]:border-foreground aria-[current=location]:text-foreground",
                heading.depth === 3 ? "pl-6" : "pl-3",
                active === heading.id ? "border-foreground" : "border-transparent"
              )}
              href={`#${heading.id}`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
