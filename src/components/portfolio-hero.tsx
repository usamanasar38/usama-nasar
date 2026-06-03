import {
  ArrowSquareOutIcon,
  GithubLogo,
  LinkedinLogo,
  MapPinIcon,
  ReadCvLogoIcon,
} from '@phosphor-icons/react';

import { ThemeToggle } from '@/components/theme-toggle';
import { DATA } from '@/data';

const socialIcons: Record<string, React.ReactNode> = {
  GitHub: <GithubLogo className="size-4" />,
  LinkedIn: <LinkedinLogo className="size-4" />,
};

export function PortfolioHero() {
  return (
    <section className="relative flex min-h-svh flex-col justify-center px-6 pb-20 pt-32">
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-16 h-px w-12 bg-primary" />

        <p className="mb-6 font-mono text-xs tracking-widest text-primary uppercase">
          {DATA.role}
        </p>

        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
          {DATA.name}
        </h1>

        <p className="mb-4 max-w-lg text-base leading-relaxed text-muted-foreground">
          {DATA.description}
        </p>

        <div className="mb-10 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPinIcon className="size-4" />
          <span>{DATA.location}</span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <a
            href={DATA.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            <ReadCvLogoIcon className="size-4" />
            Resume
          </a>

          <div className="flex items-center gap-5">
            {Object.values(DATA.contact.social).map(
              (social) =>
                social.navbar && (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {socialIcons[social.name] ?? social.name}
                    <span>{social.name}</span>
                    <ArrowSquareOutIcon className="size-3" />
                  </a>
                )
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-24 w-full max-w-3xl">
        <div className="h-px w-full bg-border" />
      </div>
    </section>
  );
}
