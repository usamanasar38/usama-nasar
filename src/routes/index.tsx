import { createFileRoute } from '@tanstack/react-router';

import { About } from '../components/about';
import { Education } from '../components/education';
import { Experience } from '../components/experience';
import { Footer } from '../components/footer';
import { Hero } from '../components/hero';
import { Navbar } from '../components/navbar';
import { OpenSource } from '../components/open-source';
import { Projects } from '../components/projects';

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <OpenSource />
        <Projects />
      </main>
      <Footer />
    </>
  );
}

export const Route = createFileRoute('/')({ component: Home });
