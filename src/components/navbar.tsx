import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react';
import { useMemo } from 'react';

import { DATA } from '../data';
import { useActiveSection } from '../hooks/use-active-section';
import { cn } from '../lib/utils';
import { ThemeToggle } from './theme-toggle';

export function Navbar() {
  const sectionIds = useMemo(
    () => [
      ...DATA.navbar.map((item) => item.href.replace('#', '')),
      'education',
    ],
    []
  );
  const activeId = useActiveSection(sectionIds);

  const socialLinks = useMemo(
    () => Object.values(DATA.contact.social).filter((s) => s.navbar),
    []
  );

  const getIcon = (name: string) => {
    if (name === 'GitHub') {
      return <GithubLogo size={18} weight="duotone" />;
    }
    if (name === 'LinkedIn') {
      return <LinkedinLogo size={18} weight="duotone" />;
    }
    return null;
  };

  const allNavItems = [
    ...DATA.navbar,
    { href: '#education', label: 'Education' },
  ];

  return (
    <header className="bg-background/80 border-border sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="text-foreground text-sm font-semibold tracking-tight transition-colors"
        >
          {DATA.initials}
        </a>

        <nav className="hidden items-center gap-6 sm:flex">
          {allNavItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'text-muted-foreground hover:text-foreground text-sm transition-colors',
                activeId === item.href.replace('#', '') &&
                  'text-foreground font-medium'
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground rounded-full p-2 transition-colors"
              aria-label={link.name}
            >
              {getIcon(link.name)}
            </a>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
