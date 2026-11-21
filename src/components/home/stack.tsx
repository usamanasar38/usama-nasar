import {
  BrainIcon,
  OpenAiLogoIcon,
  PlugsConnectedIcon,
  SquaresFourIcon,
  StackIcon,
  WaveSineIcon,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

import { EXTERNAL, NewTabNote } from "@/components/site/external-note";
import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import type { StackGroup } from "@/lib/portfolio.functions";
import { useSounds } from "@/lib/sound";

const FALLBACKS = {
  BrainIcon,
  OpenAiLogoIcon,
  PlugsConnectedIcon,
  SquaresFourIcon,
  StackIcon,
  WaveSineIcon,
} satisfies Record<string, Icon>;

const isFallbackName = (name: string): name is keyof typeof FALLBACKS =>
  Object.hasOwn(FALLBACKS, name);

const LogoPath = ({ path }: { path: string }) => (
  <svg
    aria-hidden
    className="size-3.5 shrink-0"
    fill="currentColor"
    focusable="false"
    viewBox="0 0 24 24"
  >
    <path d={path} />
  </svg>
);

type StackItem = StackGroup["items"][number];

const ItemIcon = ({ item }: { item: StackItem }) => {
  if (item.path !== undefined) {
    return <LogoPath path={item.path} />;
  }

  const Fallback =
    item.fallback !== undefined && isFallbackName(item.fallback)
      ? FALLBACKS[item.fallback]
      : undefined;

  return Fallback === undefined ? null : (
    <Fallback aria-hidden className="size-3.5" />
  );
};

const StackChip = ({ item }: { item: StackItem }) => {
  const { hoverProps } = useSounds();

  return (
    <li>
      <Badge
        render={<a href={item.href} {...EXTERNAL} {...hoverProps} />}
        variant="chip"
      >
        <ItemIcon item={item} />
        {item.title}
        <NewTabNote />
      </Badge>
    </li>
  );
};

export const Stack = ({ groups }: { groups: StackGroup[] }) => (
  <section aria-labelledby="h-stack" className="mt-16 md:mt-20" id="stack">
    <SectionHeading anchor="stack" id="h-stack">
      Stack
    </SectionHeading>
    <div className="flex flex-col gap-5">
      {groups.map((group) => (
        <div key={group.title}>
          <h3 className="text-caption text-muted-foreground mb-2.5 font-mono lowercase">
            {group.title}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <StackChip item={item} key={item.key} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);
