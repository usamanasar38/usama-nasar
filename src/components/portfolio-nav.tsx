import { useEffect, useState } from 'react';

import { DATA } from '@/data';

const navItems = DATA.navbar ?? [];

export function PortfolioNav() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sectionIds = navItems
      .map((item) => item.href.replace('#', ''))
      .filter(Boolean);

    if (sectionIds.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    for (const id of sectionIds) {
      const el = document.querySelector(`#${id}`);
      if (el) {
        observer.observe(el);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  if (navItems.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Section navigation"
      className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-xs"
    >
      <div className="mx-auto flex max-w-3xl items-center gap-8 overflow-x-auto px-6 py-4">
        {navItems.map((item) => {
          const isActive = activeSection === item.href;

          return (
            <a
              key={item.href}
              href={item.href}
              className="relative shrink-0 pb-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
              {isActive && (
                <span className="absolute right-0 bottom-0 left-0 h-px bg-primary" />
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
