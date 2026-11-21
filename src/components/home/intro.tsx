import { LogoTile } from "@/components/brand/logo";
import { EXTERNAL, NewTabNote } from "@/components/site/external-note";
import { ICONS } from "@/components/site/icons";
import type { IconName } from "@/components/site/icons";
import { Badge } from "@/components/ui/badge";
import { site } from "@/content/site";
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links";
import { USER } from "@/features/portfolio/data/user";
import { hasPublicFile } from "@/lib/public-asset";
import { useSounds } from "@/lib/sound";

const SOCIAL_CHIPS: { label: string; href: string; icon: IconName; external: boolean }[] = [
  ...SOCIAL_LINKS.map((link) => ({
    external: true,
    href: link.href,
    icon: link.name,
    label: link.title,
  })),
  { external: false, href: `mailto:${site.email}`, icon: "email", label: "Email" },
  { external: true, href: site.resume, icon: "resume", label: "Résumé" },
];

const Avatar = () => (
  <div className="relative size-28 shrink-0 overflow-hidden rounded-full border bg-muted">
    {hasPublicFile(USER.avatar) ? (
      <img
        alt={USER.displayName}
        className="size-full object-cover"
        decoding="async"
        fetchPriority="high"
        height={112}
        src={USER.avatar}
        width={112}
      />
    ) : (
      <div className="grid size-full place-items-center text-foreground">
        <LogoTile className="size-14" title={USER.displayName} />
      </div>
    )}
  </div>
);

export const Intro = () => {
  const { hoverProps } = useSounds();
  return (
    <section aria-labelledby="h-about" className="flex flex-col gap-5.5 pt-14" id="about">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-7">
        <Avatar />
        <div className="flex flex-col items-start gap-2.5">
          {USER.availableForWork ? (
            <Badge variant="brand">
              <span aria-hidden className="size-1.5 rounded-full bg-status" />
              available for work
            </Badge>
          ) : null}
          <h1 className="text-display" id="h-about">
            {USER.displayName}
          </h1>
          <p className="font-medium text-foreground text-lead">{USER.jobTitle}</p>
        </div>
      </div>

      <p className="max-w-[640px] text-lead text-muted-foreground">
        {USER.bio} {USER.intro}
      </p>

      <ul aria-label="Social links" className="flex flex-wrap gap-2">
        {SOCIAL_CHIPS.map((chip) => {
          const Icon = ICONS[chip.icon];
          return (
            <li key={chip.label}>
              <a
                className="inline-flex h-9 items-center gap-2 rounded-full border pr-3.5 pl-3 text-small transition-press active:scale-97 hover:bg-muted"
                href={chip.href}
                {...(chip.external ? EXTERNAL : {})}
                {...hoverProps}
              >
                <Icon aria-hidden className="size-4" />
                {chip.label}
                {chip.external ? <NewTabNote /> : null}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
