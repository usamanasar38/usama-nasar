import { ArrowUpRightIcon } from '@phosphor-icons/react';

import { Badge } from '@/components/ui/badge';
import { DATA } from '@/data';

interface ProjectItem {
  description: string;
  featured: boolean;
  hidden: boolean;
  href: string;
  image: string;
  position: number;
  technologies: readonly string[];
  title: string;
}

const projects = DATA.work
  .flatMap((job) => [...job.projects] as ProjectItem[])
  .filter((p) => !p.hidden)
  .toSorted((a, b) => a.position - b.position);

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-20">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Projects
      </h2>
      <div className="mt-8 space-y-8">
        {projects.map((project) => (
          <div key={project.title} className="flex gap-5">
            <div className="shrink-0">
              <img
                src={project.image}
                alt={project.title}
                className="h-14 w-20 rounded-md object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-foreground">
                  {project.title}
                </h3>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label={`Visit ${project.title}`}
                >
                  <ArrowUpRightIcon className="size-3" />
                </a>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="font-normal">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
