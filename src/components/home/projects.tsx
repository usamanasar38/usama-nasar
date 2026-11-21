import { ArrowUpRightIcon, CaretDownIcon } from "@phosphor-icons/react";
import type { MouseEvent } from "react";

import { CompanyMark } from "@/components/site/company-mark";
import { EXTERNAL, NewTabNote } from "@/components/site/external-note";
import {
  InlineMarkdown,
  markdownLines,
} from "@/components/site/inline-markdown";
import { SectionHeading } from "@/components/site/section-heading";
import { ShowMore, StaggerItem } from "@/components/site/show-more";
import { Badge } from "@/components/ui/badge";
import { PROJECTS_HOME } from "@/features/portfolio/data/projects";
import { formatPeriod, periodDateTime } from "@/features/portfolio/lib/format";
import type { Project } from "@/features/portfolio/types/projects";
import { useSounds } from "@/lib/sound";

const Period = ({ project }: { project: Project }) => {
  const { start, end } = project.period;
  const [from, to] = formatPeriod(project.period).split(" — ");

  return (
    <span className="text-caption text-muted-foreground block font-mono">
      <time dateTime={periodDateTime(start)}>{from}</time> —{" "}
      {end === undefined ? (
        to
      ) : (
        <time dateTime={periodDateTime(end)}>{to}</time>
      )}
    </span>
  );
};

const ProjectLink = ({ project }: { project: Project }) => {
  const { hoverProps } = useSounds();

  if (project.link === undefined) {
    return null;
  }

  return (
    <a
      aria-label={`Open ${project.title}`}
      className="text-muted-foreground hover:bg-background hover:text-foreground absolute top-4 right-7.5 grid size-8 place-items-center rounded-full transition-colors duration-150 after:absolute after:-inset-1.5"
      href={project.link}
      {...EXTERNAL}
      {...hoverProps}
    >
      <ArrowUpRightIcon aria-hidden className="size-4" />
      <NewTabNote />
    </a>
  );
};

const ProjectRow = ({ project }: { project: Project }) => {
  const { play, hoverProps } = useSounds();
  const [summary, ...points] = markdownLines(project.description);

  const onSummaryClick = (event: MouseEvent<HTMLElement>) => {
    const details = event.currentTarget.parentElement;

    if (details instanceof HTMLDetailsElement) {
      play(details.open ? "collapse" : "expand");
    }
  };

  return (
    <div className="group/item relative">
      <details className="group/project" open={project.isExpanded === true}>
        <summary
          className="hover:bg-muted -mx-3 flex cursor-pointer list-none items-center gap-3.5 rounded-xl p-3 transition-colors duration-150 [&::-webkit-details-marker]:hidden"
          onClick={onSummaryClick}
          {...hoverProps}
        >
          <CompanyMark
            icon={project.icon}
            logo={project.logo}
            name={project.title}
          />
          <span className="min-w-0 flex-1">
            <h3 className="text-body font-semibold">{project.title}</h3>
            <Period project={project} />
          </span>
          {project.link === undefined ? null : (
            <span aria-hidden className="size-8 shrink-0" />
          )}
          <CaretDownIcon
            aria-hidden
            className="text-muted-foreground size-4 shrink-0 transition-transform duration-200 group-open/project:rotate-180 motion-reduce:transition-none"
          />
        </summary>
        <div className="flex flex-col gap-3 pb-4 pl-13.5">
          {summary === undefined ? null : (
            <p className="text-detail text-muted-foreground">
              <InlineMarkdown text={summary} />
            </p>
          )}
          {points.length > 0 ? (
            <ul className="text-detail text-muted-foreground marker:text-muted-foreground/60 flex list-disc flex-col gap-1.5 pl-4">
              {points.map((line) => (
                <li key={line}>
                  <InlineMarkdown text={line} />
                </li>
              ))}
            </ul>
          ) : null}
          <ul aria-label="Technologies" className="flex flex-wrap gap-1.5">
            {project.skills.map((skill) => (
              <li key={skill}>
                <Badge variant="tag">{skill}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </details>
      <ProjectLink project={project} />
    </div>
  );
};

export const Projects = () => (
  <section
    aria-labelledby="h-projects"
    className="mt-16 md:mt-20"
    id="projects"
  >
    <SectionHeading
      anchor="projects"
      count={PROJECTS_HOME.length}
      id="h-projects"
    >
      Projects
    </SectionHeading>
    <ShowMore initial={4} items={PROJECTS_HOME} label="projects">
      {(items, part) => (
        <div
          className={
            part === "hidden"
              ? "flex flex-col gap-1 pt-1"
              : "flex flex-col gap-1"
          }
        >
          {items.map((project, index) =>
            part === "hidden" ? (
              <StaggerItem index={index} key={project.id}>
                <ProjectRow project={project} />
              </StaggerItem>
            ) : (
              <ProjectRow key={project.id} project={project} />
            )
          )}
        </div>
      )}
    </ShowMore>
  </section>
);
