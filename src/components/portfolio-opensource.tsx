import { ArrowSquareOut, GitFork, Star } from '@phosphor-icons/react';

import { DATA } from '@/data';

export function PortfolioOpenSource() {
  const items = DATA.openSource ?? [];

  if (items.length === 0) {
    return null;
  }

  return (
    <section id="open-source" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-14">
          <div className="mb-6 h-px w-8 bg-primary" />
          <span className="font-mono text-xs tracking-widest text-primary uppercase">
            Open Source
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">
            Contributions
          </h2>
        </div>

        <div className="rounded-lg border border-border bg-card/50 p-6">
          {items.map((item, i) => (
            <div key={item.title}>
              {i > 0 && <div className="my-6 h-px bg-border" />}
              <div className="flex gap-5">
                <div className="mt-1 shrink-0">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <GitFork className="size-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                    >
                      {item.title}
                      <ArrowSquareOut className="size-3.5" />
                    </a>
                  </h3>

                  <div className="mt-1 mb-2 flex items-center gap-1.5">
                    <Star className="size-3.5 text-primary" weight="fill" />
                    <span className="font-mono text-xs font-medium text-primary">
                      25K+
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      GitHub stars
                    </span>
                  </div>

                  {item.description && (
                    <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
