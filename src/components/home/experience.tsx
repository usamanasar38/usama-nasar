import { CaretDownIcon } from "@phosphor-icons/react";
import type { MouseEvent } from "react";

import { CompanyMark } from "@/components/site/company-mark";
import { InlineMarkdown, markdownLines } from "@/components/site/inline-markdown";
import { SectionHeading } from "@/components/site/section-heading";
import { ShowMore, StaggerItem } from "@/components/site/show-more";
import { Badge } from "@/components/ui/badge";
import { EXPERIENCES } from "@/features/portfolio/data/experiences";
import type { Experience } from "@/features/portfolio/types/experiences";
import { formatPeriod, periodDateTime } from "@/features/portfolio/lib/format";
import { useSounds } from "@/lib/sound";

const Dates = ({ experience }: { experience: Experience }) => {
  const position = experience.positions[0];
  if (!position) {
    return null;
  }
  const { start, end } = position.employmentPeriod;
  const [from, to] = formatPeriod(position.employmentPeriod, "now").split(" — ");
  return (
    <span className="font-mono text-caption text-muted-foreground">
      <time dateTime={periodDateTime(start)}>{from}</time> —{" "}
      {end ? <time dateTime={periodDateTime(end)}>{to}</time> : to}
    </span>
  );
};

const ExperienceRow = ({ experience, open }: { experience: Experience; open: boolean }) => {
  const { play, hoverProps } = useSounds();
  const position = experience.positions[0];

  /** Sound on the user's own toggle only (the initial `open` also fires a toggle event). */
  const onSummaryClick = (event: MouseEvent<HTMLElement>) => {
    const details = event.currentTarget.parentElement;
    if (details instanceof HTMLDetailsElement) {
      play(details.open ? "collapse" : "expand");
    }
  };

  return (
    <details className="group/exp group/item" name="experience" open={open}>
      <summary
        className="-mx-3 flex cursor-pointer list-none items-center gap-3.5 rounded-xl p-3 transition-colors duration-150 hover:bg-muted [&::-webkit-details-marker]:hidden"
        onClick={onSummaryClick}
        {...hoverProps}
      >
        <CompanyMark
          icon={experience.companyIcon}
          logo={experience.companyLogo}
          name={experience.companyName}
        />
        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-body">{experience.companyName}</span>
          <span className="block text-muted-foreground text-small">
            {position?.title}
            {experience.locationType ? ` · ${experience.locationType}` : ""}
          </span>
        </span>
        <span className="hidden md:block">
          <Dates experience={experience} />
        </span>
        <CaretDownIcon
          aria-hidden
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open/exp:rotate-180 motion-reduce:transition-none"
        />
      </summary>
      <div className="flex flex-col gap-3 pb-4 pl-13.5">
        <span className="md:hidden">
          <Dates experience={experience} />
        </span>
        <ul className="flex list-disc flex-col gap-1.5 pl-4 text-detail text-muted-foreground marker:text-muted-foreground/60">
          {markdownLines(position?.description).map((line) => (
            <li key={line}>
              <InlineMarkdown text={line} />
            </li>
          ))}
        </ul>
        {position?.skills?.length ? (
          <ul aria-label="Skills" className="flex flex-wrap gap-1.5">
            {position.skills.map((skill) => (
              <li key={skill}>
                <Badge variant="tag">{skill}</Badge>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </details>
  );
};

export const ExperienceSection = () => (
  <section aria-labelledby="h-experience" className="mt-16 md:mt-20" id="experience">
    <SectionHeading anchor="experience" count={EXPERIENCES.length} id="h-experience">
      Experience
    </SectionHeading>
    <ShowMore initial={4} items={EXPERIENCES} label="roles">
      {(items, part) => (
        <div className={part === "hidden" ? "flex flex-col gap-1 pt-1" : "flex flex-col gap-1"}>
          {items.map((experience, index) =>
            part === "hidden" ? (
              <StaggerItem index={index} key={experience.id}>
                <ExperienceRow experience={experience} open={false} />
              </StaggerItem>
            ) : (
              <ExperienceRow experience={experience} key={experience.id} open={index === 0} />
            )
          )}
        </div>
      )}
    </ShowMore>
  </section>
);
