import { BrainIcon, SquaresFourIcon, StackIcon } from "@phosphor-icons/react";

import { SectionHeading } from "@/components/site/section-heading";
import type { StackGroup } from "@/lib/portfolio.functions";

/** Phosphor fallbacks for stack items without a simple-icons logo (by displayName). */
const FALLBACKS: Record<string, typeof StackIcon> = {
  BrainIcon,
  SquaresFourIcon,
  StackIcon,
};

/** Monochrome simple-icons path, drawn in currentColor. */
const LogoPath = ({ path }: { path: string }) => (
  <svg aria-hidden className="size-3.5 shrink-0" fill="currentColor" focusable="false" viewBox="0 0 24 24">
    <path d={path} />
  </svg>
);

export const Stack = ({ groups }: { groups: StackGroup[] }) => (
  <section aria-labelledby="h-stack" className="mt-16 md:mt-20">
    <SectionHeading id="h-stack">Stack</SectionHeading>
    <div className="flex flex-col gap-5">
      {groups.map((group) => (
        <div key={group.title}>
          <h3 className="mb-2.5 font-mono text-caption text-muted-foreground lowercase">
            {group.title}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {group.items.map((item) => {
              const Fallback = item.fallback ? FALLBACKS[item.fallback] : undefined;
              return (
                <li
                  className="inline-flex h-8 items-center gap-2 rounded-full border pr-3.5 pl-2.5 text-small"
                  key={item.key}
                >
                  {item.path ? (
                    <LogoPath path={item.path} />
                  ) : Fallback ? (
                    <Fallback aria-hidden className="size-3.5" />
                  ) : null}
                  {item.title}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  </section>
);
