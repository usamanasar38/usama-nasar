import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react';

import { DATA } from '../data';
import { cn } from '../lib/utils';
import { Button } from './ui/button';

export function Hero() {
  const getSocialIcon = (name: string) => {
    if (name === 'GitHub') {
      return <GithubLogo size={20} weight="duotone" />;
    }
    if (name === 'LinkedIn') {
      return <LinkedinLogo size={20} weight="duotone" />;
    }
    return null;
  };

  return (
    <section className="flex min-h-[calc(100vh-5rem)] flex-col justify-center px-6">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-muted-foreground mb-4 text-sm tracking-wide uppercase">
          {DATA.role} · {DATA.location}
        </p>

        <h1 className="text-foreground mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          {DATA.name}
        </h1>

        <p className="text-muted-foreground mb-10 max-w-xl text-lg leading-relaxed sm:text-xl">
          {DATA.description}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a href={DATA.resumeLink} target="_blank" rel="noopener noreferrer">
            <Button variant="default" size="lg">
              Resume
            </Button>
          </a>

          <div className="flex items-center gap-1">
            {Object.values(DATA.contact.social).map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'text-muted-foreground hover:text-foreground rounded-full p-2.5 transition-colors'
                )}
                aria-label={link.name}
              >
                {getSocialIcon(link.name)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
