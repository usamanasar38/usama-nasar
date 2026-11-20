import { ArrowUpRightIcon } from "@phosphor-icons/react";

import { EXTERNAL, NewTabNote } from "@/components/site/external-note";
import { markdownLines } from "@/components/site/inline-markdown";
import { SectionHeading } from "@/components/site/section-heading";
import { ShowMore, StaggerItem } from "@/components/site/show-more";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PROJECTS_HOME } from "@/features/portfolio/data/projects";
import type { Project } from "@/features/portfolio/types/projects";
import { resolveThemedSrc, THEMED_IMG } from "@/features/portfolio/lib/themed-image";
import { hasPublicFile } from "@/lib/public-asset";
import { useSounds } from "@/lib/sound";

const ProjectImage = ({ project }: { project: Project }) => {
  const src = project.image ? resolveThemedSrc(project.image) : undefined;
  if (!(src && hasPublicFile(src.light))) {
    const Icon = project.icon;
    return (
      <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 bg-muted px-6 text-center text-muted-foreground">
        {Icon ? <Icon aria-hidden className="size-6" /> : null}
        <span className="font-mono text-caption">{project.title}</span>
      </div>
    );
  }
  const common = {
    className: "aspect-[16/10] w-full bg-muted object-cover object-top",
    decoding: "async",
    height: 800,
    loading: "lazy",
    width: 1280,
  } as const;
  return (
    <>
      <img alt={`${project.title} screenshot`} {...common} className={`${common.className} ${src.light === src.dark ? "" : THEMED_IMG.light}`} src={src.light} />
      {src.light === src.dark || !hasPublicFile(src.dark) ? null : (
        <img alt="" aria-hidden {...common} className={`${common.className} ${THEMED_IMG.dark}`} src={src.dark} />
      )}
    </>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const { hoverProps } = useSounds();
  const summary = markdownLines(project.description)[0];
  return (
    <Card as="article" className="h-full gap-0 py-0" {...hoverProps}>
      <ProjectImage project={project} />
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-h3">{project.title}</h3>
          {project.link ? (
            <a
              aria-label={`Open ${project.title}`}
              className="-m-1.5 grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              href={project.link}
              {...EXTERNAL}
            >
              <ArrowUpRightIcon aria-hidden className="size-4" />
              <NewTabNote />
            </a>
          ) : null}
        </div>
        {summary ? <p className="text-muted-foreground text-small">{summary}</p> : null}
        <ul aria-label="Technologies" className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {project.skills.map((skill) => (
            <li key={skill}>
              <Badge variant="tag">{skill}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export const Projects = () => (
  <section aria-labelledby="h-projects" className="mt-16 md:mt-20" id="projects">
    <SectionHeading count={PROJECTS_HOME.length} id="h-projects">
      Projects
    </SectionHeading>
    <ShowMore initial={4} items={PROJECTS_HOME} label="projects">
      {(items, part) => (
        <div className={part === "hidden" ? "grid gap-4 pt-4 md:grid-cols-2" : "grid gap-4 md:grid-cols-2"}>
          {items.map((project, index) =>
            part === "hidden" ? (
              <StaggerItem index={index} key={project.id}>
                <ProjectCard project={project} />
              </StaggerItem>
            ) : (
              <ProjectCard key={project.id} project={project} />
            )
          )}
        </div>
      )}
    </ShowMore>
  </section>
);
