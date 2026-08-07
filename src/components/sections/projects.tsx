import { ArrowUpRightIcon } from '@phosphor-icons/react';

import { DATA } from '@/data/resume';
import { cn } from '@/lib/utils';

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

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <div className="py-4">
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${project.title}`}
        className={cn(
          'group/project not-prose relative block select-none',
          'before:absolute before:top-0 before:bottom-0 before:-left-1 before:-right-1 before:rounded-lg before:transition-colors hover:before:bg-muted/30'
        )}
      >
        <div className="relative z-1 flex gap-4">
          <div className="shrink-0">
            <img
              src={project.image}
              alt=""
              width={56}
              height={56}
              loading="lazy"
              className="size-14 rounded-lg border border-line object-cover"
              aria-hidden
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-start gap-3 text-base">
              <h3 className="flex-1 text-balance font-medium leading-snug text-foreground">
                {project.title}
              </h3>
              <span className="shrink-0 text-muted-foreground transition-colors group-hover/project:text-foreground [&_svg]:h-lh [&_svg]:w-4">
                <ArrowUpRightIcon aria-hidden />
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <ul className="not-prose mt-3 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <li key={tech} className="flex">
                  <span className="inline-flex items-center rounded-full border bg-muted/50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                    {tech}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </a>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-20">
      <h2 className="ml-4 py-3 font-heading text-3xl font-semibold tracking-tight">
        Projects
      </h2>
      <div className="px-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
