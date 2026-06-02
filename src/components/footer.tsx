import { GithubLogo, LinkedinLogo, Envelope } from '@phosphor-icons/react';

import { DATA } from '../data';
import { cn } from '../lib/utils';
import { Separator } from './ui/separator';

export function Footer() {
  const getSocialIcon = (name: string) => {
    if (name === 'GitHub') {
      return <GithubLogo size={16} weight="duotone" />;
    }
    if (name === 'LinkedIn') {
      return <LinkedinLogo size={16} weight="duotone" />;
    }
    return null;
  };

  return (
    <footer className="border-border border-t px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-foreground text-sm font-semibold">{DATA.name}</p>
            <p className="text-muted-foreground text-sm">{DATA.location}</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${DATA.contact.email}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Envelope size={18} weight="duotone" />
            </a>
            {Object.values(DATA.contact.social).map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'text-muted-foreground hover:text-foreground transition-colors'
                )}
                aria-label={link.name}
              >
                {getSocialIcon(link.name)}
              </a>
            ))}
          </div>
        </div>

        <Separator className="bg-border my-8" />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} {DATA.name}
          </p>
          <a
            href={DATA.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground text-xs underline-offset-4 transition-colors hover:underline"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
