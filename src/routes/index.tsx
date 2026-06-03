import { createFileRoute } from '@tanstack/react-router';

import { PortfolioAbout } from '@/components/portfolio-about';
import { PortfolioExperience } from '@/components/portfolio-experience';
import { PortfolioFooter } from '@/components/portfolio-footer';
import { PortfolioHero } from '@/components/portfolio-hero';
import { PortfolioNav } from '@/components/portfolio-nav';
import { PortfolioOpenSource } from '@/components/portfolio-opensource';
import { PortfolioProjects } from '@/components/portfolio-projects';

function Home() {
  return (
    <>
      <PortfolioHero />
      <PortfolioNav />
      <PortfolioAbout />
      <PortfolioExperience />
      <PortfolioOpenSource />
      <PortfolioProjects />
      <PortfolioFooter />
    </>
  );
}

export const Route = createFileRoute('/')({ component: Home });
