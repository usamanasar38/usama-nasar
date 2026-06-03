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
      <Header />
      <main className="mx-auto max-w-2xl px-6 pb-16 pt-28">
        <div className="space-y-20">
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
