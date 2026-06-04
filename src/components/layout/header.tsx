import { Link } from '@tanstack/react-router';

import { ThemeToggle } from '@/components/theme-toggle';
import { DATA } from '@/data';

const NAV_ITEMS = [
  { href: '#experience', label: 'Experience' },
  { href: '#stack', label: 'Stack' },
  { href: '#projects', label: 'Projects' },
  { href: '#open-source', label: 'Open Source' },
] as const;

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-sm font-semibold text-foreground transition-colors hover:text-muted-foreground"
        >
          {DATA.initials}
        </Link>
        <nav className="hidden items-center gap-6 sm:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
