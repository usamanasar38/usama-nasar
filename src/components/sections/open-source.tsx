import { GithubLogoIcon } from '@phosphor-icons/react';

import { DATA } from '@/data/resume';

type OpenSourceItem = (typeof DATA.openSource)[number];

function OpenSourceCard({ item }: { item: OpenSourceItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-border p-5 transition-colors hover:bg-muted/30"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
        <GithubLogoIcon
          className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
          aria-hidden
        />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
    </a>
  );
}

export function OpenSourceSection() {
  return (
    <section id="open-source" className="scroll-mt-20">
      <h2 className="text-balance text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Open Source
      </h2>
      <div className="mt-8 flex flex-col gap-4">
        {DATA.openSource.map((item) => (
          <OpenSourceCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}
