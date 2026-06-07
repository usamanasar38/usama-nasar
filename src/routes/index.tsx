import { createFileRoute } from '@tanstack/react-router';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { ExperienceSection } from '@/components/sections/experience';
import { HeroSection } from '@/components/sections/hero';
import { OpenSourceSection } from '@/components/sections/open-source';
import { ProjectsSection } from '@/components/sections/projects';
import { TechStackSection } from '@/components/sections/tech-stack';

function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-md focus-visible:bg-background focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="mx-auto max-w-2xl px-6 pb-16 pt-28">
        <div className="flex flex-col gap-20">
          <HeroSection />
          <TechStackSection />
          <ExperienceSection />
          <ProjectsSection />
          <OpenSourceSection />
        </div>
      </main>
      <Footer />
    </>
  );
}

export const Route = createFileRoute('/')({ component: Home });
