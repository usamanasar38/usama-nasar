import { ArrowUpRightIcon, GraduationCapIcon, TrophyIcon } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

import { EXTERNAL, NewTabNote } from "@/components/site/external-note";
import { SectionHeading } from "@/components/site/section-heading";
import { EDUCATION } from "@/features/portfolio/data/education";
import { RECOGNITION } from "@/features/portfolio/data/recognition";
import { formatPeriod } from "@/features/portfolio/lib/format";
import { useSounds } from "@/lib/sound";

type Credential = { key: string; title: string; org: string; year?: string; href?: string };

const EDUCATION_ROWS: Credential[] = EDUCATION.map((item) => ({
  href: item.schoolWebsite,
  key: item.id,
  org: [item.school, item.location].filter(Boolean).join(" · "),
  title: [item.degree, item.fieldOfStudy].filter(Boolean).join(" in "),
  year: formatPeriod(item.period),
}));

const RECOGNITION_ROWS: Credential[] = RECOGNITION.map((entry) =>
  entry.kind === "open-source"
    ? {
        href: entry.contribution.contributionsUrl ?? entry.contribution.repo,
        key: entry.key,
        org: ["Open-source contributor", entry.contribution.highlight].filter(Boolean).join(" · "),
        title: `${entry.contribution.project}: ${entry.contribution.title}`,
      }
    : {
        href: entry.credential.credentialURL,
        key: entry.key,
        org: [entry.credential.issuer, entry.credential.instructor].filter(Boolean).join(" · "),
        title: entry.credential.title,
        year: entry.credential.issueDate.slice(0, 4),
      }
);

const CredentialRow = ({ row, icon: RowIcon }: { row: Credential; icon: Icon }) => {
  const { hoverProps } = useSounds();
  const content = (
    <>
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-muted">
        <RowIcon aria-hidden className="size-[18px]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5 font-semibold text-body">
          {row.title}
          {row.href ? (
            <ArrowUpRightIcon
              aria-hidden
              className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ease-out-quint group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
            />
          ) : null}
        </span>
        <span className="block text-muted-foreground text-small">{row.org}</span>
      </span>
      {row.year ? (
        <span className="shrink-0 font-mono text-caption text-muted-foreground">{row.year}</span>
      ) : null}
    </>
  );
  const rowClass = "-mx-3 flex items-center gap-3.5 rounded-xl p-3";
  return (
    <li>
      {row.href ? (
        <a
          className={`group ${rowClass} transition-colors duration-150 hover:bg-muted`}
          href={row.href}
          {...EXTERNAL}
          {...hoverProps}
        >
          {content}
          <NewTabNote />
        </a>
      ) : (
        <div className={rowClass}>{content}</div>
      )}
    </li>
  );
};

const CredentialSection = ({
  id,
  title,
  rows,
  icon,
}: {
  id: string;
  title: string;
  rows: Credential[];
  icon: Icon;
}) =>
  rows.length === 0 ? null : (
    <section aria-labelledby={id} className="mt-16 md:mt-20">
      <SectionHeading id={id}>{title}</SectionHeading>
      <ul className="flex flex-col gap-1">
        {rows.map((row) => (
          <CredentialRow icon={icon} key={row.key} row={row} />
        ))}
      </ul>
    </section>
  );

export const Education = () => (
  <CredentialSection icon={GraduationCapIcon} id="h-education" rows={EDUCATION_ROWS} title="Education" />
);

export const Recognition = () => (
  <CredentialSection icon={TrophyIcon} id="h-recognition" rows={RECOGNITION_ROWS} title="Recognition" />
);
