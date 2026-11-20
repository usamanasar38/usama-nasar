import { SectionHeading } from "@/components/site/section-heading";
import { ICONS } from "@/components/site/icons";
import type { IconName } from "@/components/site/icons";
import { SITE_INFO } from "@/config/site";
import { USER } from "@/features/portfolio/data/user";

const current = USER.jobs[0];

/** "7+ years" is stated in USER.about; read it from there rather than restating it. */
const EXPERIENCE_YEARS = /(?<years>\d+\+?\s*years)/u.exec(USER.about)?.groups?.years;

const FACTS: { label: string; value: string; icon: IconName; href?: string }[] = [
  { icon: "role", label: "role", value: USER.jobTitle },
  ...(current
    ? [
        {
          icon: "company" as const,
          label: "currently",
          value: [current.title, current.company]
            .filter(Boolean)
            .join(" · "),
        },
      ]
    : []),
  ...(EXPERIENCE_YEARS ? [{ icon: "experience" as const, label: "experience", value: EXPERIENCE_YEARS }] : []),
  {
    icon: "focus",
    label: "focus",
    value: "Large migrations, SSR and Core Web Vitals, shared UI systems",
  },
  { icon: "location", label: "based in", value: USER.address },
  {
    href: SITE_INFO.url,
    icon: "website",
    label: "website",
    value: SITE_INFO.url.replace(/^https?:\/\//u, ""),
  },
];

export const Overview = () => (
  <section aria-labelledby="h-overview" className="mt-16 md:mt-20">
    <SectionHeading id="h-overview">Overview</SectionHeading>
    <dl className="grid gap-x-8 gap-y-4 md:grid-cols-2">
      {FACTS.map((fact) => {
        const Icon = ICONS[fact.icon];
        return (
          <div className="flex items-center gap-3" key={fact.label}>
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-muted">
              <Icon aria-hidden className="size-4" />
            </span>
            <div className="min-w-0">
              <dt className="font-mono text-micro text-muted-foreground">{fact.label}</dt>
              <dd className="text-detail">
                {fact.href ? (
                  <a className="text-brand underline-offset-4 hover:underline" href={fact.href}>
                    {fact.value}
                  </a>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          </div>
        );
      })}
    </dl>
  </section>
);
