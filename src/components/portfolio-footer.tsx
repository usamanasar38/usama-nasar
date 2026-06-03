import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react';

import { DATA } from '@/data';

const socialIcons: Record<string, React.ReactNode> = {
  GitHub: <GithubLogo className="size-4" />,
  LinkedIn: <LinkedinLogo className="size-4" />,
};

export function PortfolioFooter() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
          <a
            href={`mailto:${DATA.contact.email}`}
            className="transition-colors hover:text-foreground"
          >
            {DATA.contact.email}
          </a>
          {Object.values(DATA.contact.social).map(
            (social) =>
              social.navbar && (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                >
                  {socialIcons[social.name]}
                  {social.name}
                </a>
              )
          )}
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {DATA.name}
        </p>
      </div>
    </footer>
  );
}
