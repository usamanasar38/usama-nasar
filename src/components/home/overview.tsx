import { useSyncExternalStore } from "react";
import type { ReactNode } from "react";

import { ICONS } from "@/components/site/icons";
import type { IconName } from "@/components/site/icons";
import { SectionHeading } from "@/components/site/section-heading";
import { site } from "@/content/site";
import { USER } from "@/features/portfolio/data/user";
import { decodeB64 } from "@/features/portfolio/lib/format";

const EXPERIENCE_PATTERN = /(?<years>\d+\+?\s*years)/u;
const PK_MOBILE = /^\+92(?<operator>\d{3})(?<first>\d{3})(?<rest>\d{4})$/u;
const TICK_MS = 1000;

const EXPERIENCE_YEARS = EXPERIENCE_PATTERN.exec(USER.about)?.groups?.years;
const PHONE = decodeB64(USER.phoneNumberB64);

const formatPhone = (e164: string) => {
  const parts = PK_MOBILE.exec(e164)?.groups;

  return parts === undefined
    ? e164
    : `+92 ${parts.operator} ${parts.first} ${parts.rest}`;
};

const TIME_FORMAT = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: USER.timeZone,
});

const OFFSET_LABEL =
  new Intl.DateTimeFormat("en-US", {
    timeZone: USER.timeZone,
    timeZoneName: "shortOffset",
  })
    .formatToParts(0)
    .find((part) => part.type === "timeZoneName")?.value ?? USER.timeZone;

const subscribeToClock = (onTick: () => void) => {
  const id = setInterval(onTick, TICK_MS);

  return () => {
    clearInterval(id);
  };
};

const readClock = () => TIME_FORMAT.format(Date.now());

const readServerClock = () => null;

const LocalTime = () => {
  const time = useSyncExternalStore(
    subscribeToClock,
    readClock,
    readServerClock
  );

  return (
    <>
      <span className="tabular-nums">{time ?? "--:--"}</span>
      <span className="text-muted-foreground"> · {OFFSET_LABEL}</span>
    </>
  );
};

interface Fact {
  label: string;
  icon: IconName;
  value: ReactNode;
}

const LINK = "text-brand underline-offset-4 hover:underline";

const FACTS: Fact[] = [
  { icon: "role", label: "role", value: USER.jobTitle },
  ...(EXPERIENCE_YEARS === undefined
    ? []
    : [
        {
          icon: "experience" as const,
          label: "experience",
          value: EXPERIENCE_YEARS,
        },
      ]),
  { icon: "location", label: "based in", value: USER.address },
  { icon: "time", label: "local time", value: <LocalTime /> },
  {
    icon: "email",
    label: "email",
    value: (
      <a className={LINK} href={`mailto:${site.email}`}>
        {site.email}
      </a>
    ),
  },
  {
    icon: "phone",
    label: "phone",
    value: (
      <a className={LINK} href={`tel:${PHONE}`}>
        {formatPhone(PHONE)}
      </a>
    ),
  },
];

export const Overview = () => (
  <section
    aria-labelledby="h-overview"
    className="mt-16 md:mt-20"
    id="overview"
  >
    <SectionHeading anchor="overview" id="h-overview">
      Overview
    </SectionHeading>
    <dl className="grid gap-x-8 gap-y-4 md:grid-cols-2">
      {FACTS.map((fact) => {
        const Icon = ICONS[fact.icon];

        return (
          <div className="flex items-center gap-3" key={fact.label}>
            <span className="bg-muted grid size-9 shrink-0 place-items-center rounded-full">
              <Icon aria-hidden className="size-4" />
            </span>
            <div className="min-w-0">
              <dt className="text-micro text-muted-foreground font-mono">
                {fact.label}
              </dt>
              <dd className="text-detail truncate">{fact.value}</dd>
            </div>
          </div>
        );
      })}
    </dl>
  </section>
);
