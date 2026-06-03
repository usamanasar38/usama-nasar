import { ArrowSquareOut } from '@phosphor-icons/react';

import { Badge } from '@/components/ui/badge';
import { DATA } from '@/data';
import { getTechIcons } from '@/lib/tech-icons';

const visibleProjects = (DATA.work ?? [])
  .flatMap(
    (job) =>
      (job.projects ?? [])
        .filter((p) => !p.hidden)
        .map((p) => ({ ...p, company: job.company })) ?? []
  )
  .toSorted((a, b) => (a.position ?? 0) - (b.position ?? 0));

export function PortfolioProjects() {
  if (visibleProjects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-14">
          <div className="mb-6 h-px w-8 bg-primary" />
          <span className="font-mono text-xs tracking-widest text-primary uppercase">
            Projects
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">
            Things I have built
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {visibleProjects.map((project) => (
            <div
              key={project.title}
              className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/30"
            >
              <h3 className="mb-1 text-sm font-semibold">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                >
                  {project.title}
                  <ArrowSquareOut className="size-3 shrink-0" />
                </a>
              </h3>

              {project.company && (
                <p className="mb-3 font-mono text-xs text-muted-foreground">
                  {project.company}
                </p>
              )}

              {project.description && (
                <p className="mb-4 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-4">
                  {project.description}
                </p>
              )}

              {!project.description && <div className="mb-4 flex-1" />}

              <div className="flex flex-wrap gap-1">
                {(project.technologies ?? []).slice(0, 6).map((tech) => {
                  const icons = getTechIcons(tech);

                  return icons.map((entry) => (
                    <Badge
                      key={entry.label}
                      variant="outline"
                      className="border-border/50 text-[0.625rem]"
                    >
                      {entry.icon ? (
                        <img
                          src={entry.icon}
                          alt={entry.label}
                          className="size-2.5"
                        />
                      ) : null}
                      {entry.label}
                    </Badge>
                  ));
                })}
                {(project.technologies ?? []).length > 6 && (
                  <span className="pl-1 text-[0.625rem] leading-5 text-muted-foreground">
                    +{(project.technologies ?? []).length - 6} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
