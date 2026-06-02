import { ArrowUpRight } from '@phosphor-icons/react';
import { useMemo } from 'react';

import { DATA } from '../data';
import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';
import { Badge } from './ui/badge';

export function Projects() {
  const projects = useMemo(() => {
    const all = DATA.work.flatMap((job) =>
      job.projects
        .filter((p) => !p.hidden)
        .map((p) => ({ ...p, company: job.company }))
    );
    return all.toSorted((a, b) => a.position - b.position);
  }, []);

  if (projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading id="projects-heading" label="Projects" />

        <div className="space-y-12">
          {projects.map((project, i) => (
            <Reveal key={`${project.company}-${project.title}`} delay={i * 100}>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div
                  className={
                    project.featured
                      ? 'border-border ring-foreground/5 bg-secondary/30 rounded-lg border p-6 ring-1 transition-all hover:ring-foreground/10'
                      : 'border-border border-l-2 py-2 pl-6 transition-colors hover:border-foreground/40'
                  }
                >
                  <h3 className="text-foreground mb-2 flex items-center gap-1.5 text-lg font-semibold">
                    {project.title}
                    <ArrowUpRight
                      size={16}
                      className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                      weight="bold"
                    />
                  </h3>

                  {project.description && (
                    <p className="text-muted-foreground mb-3 leading-relaxed">
                      {project.description}
                    </p>
                  )}

                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="text-muted-foreground border-border text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
