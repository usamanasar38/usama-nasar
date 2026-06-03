import { CalendarBlank } from '@phosphor-icons/react';

import { Badge } from '@/components/ui/badge';
import { DATA } from '@/data';
import { getTechIcons } from '@/lib/tech-icons';

const highlights: Record<string, string[]> = {
  'Contrive Solutions': [
    'Led Express.js → NestJS migration, improving maintainability and scalability.',
    'Built high-accuracy web scraping with Node.js + Puppeteer — 80% captcha bypass rate.',
  ],
  'Love, Bonito': [
    'Migrated legacy Vue.js e-commerce to Next.js — 3x web performance gain, 50% load time reduction.',
    'Integrated global payment solutions and streamlined checkout by reducing API call count.',
  ],
  'Mahjoz | محجوز': [
    'Optimized front-end performance and delivered pixel-perfect UI with rigorous testing.',
  ],
  'Rehani Soko': [
    "Led development of scalable full-stack solutions for Africa's premier property marketplace.",
  ],
};

export function PortfolioExperience() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-14">
          <div className="mb-6 h-px w-8 bg-primary" />
          <span className="font-mono text-xs tracking-widest text-primary uppercase">
            Experience
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">
            Where I have worked
          </h2>
        </div>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-[6px] w-px bg-border" />

          <div className="space-y-16">
            {(DATA.work ?? []).map((job) => (
              <div
                key={`${job.company}-${job.start}`}
                className="relative pl-10"
              >
                <span
                  className="absolute top-1.5 left-0 block size-3 rounded-full border-2 border-primary bg-background"
                  aria-hidden
                />

                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <span className="flex shrink-0 items-center gap-1.5 font-mono text-xs text-muted-foreground">
                    <CalendarBlank className="size-3" />
                    {job.start} — {job.end}
                  </span>
                </div>

                <p className="text-sm font-medium text-foreground">
                  {job.company}
                  {job.location && (
                    <span className="ml-1.5 font-normal text-muted-foreground">
                      {job.location}
                    </span>
                  )}
                </p>

                {highlights[job.company] && (
                  <div className="mt-3 flex flex-col gap-2">
                    {highlights[job.company].map((h) => (
                      <div key={h} className="flex gap-2">
                        <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-primary/60" />
                        <p className="text-sm leading-relaxed text-foreground/85">
                          {h}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {job.description && !highlights[job.company] && (
                  <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted-foreground">
                    {job.description}
                  </p>
                )}

                {job.description && highlights[job.company] && (
                  <details className="group mt-3">
                    <summary className="cursor-pointer font-mono text-xs text-muted-foreground transition-colors hover:text-foreground select-none">
                      Read more
                    </summary>
                    <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
                      {job.description}
                    </p>
                  </details>
                )}

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {(job.technologiesUsed ?? []).map((tech) => {
                    const icons = getTechIcons(tech);

                    return icons.map((entry) => (
                      <Badge
                        key={entry.label}
                        variant="outline"
                        className="border-border/50 text-xs"
                      >
                        {entry.icon ? (
                          <img
                            src={entry.icon}
                            alt={entry.label}
                            className="size-3"
                          />
                        ) : null}
                        {entry.label}
                      </Badge>
                    ));
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
