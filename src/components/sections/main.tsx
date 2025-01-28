import { Footer } from "../footer";
import Experiences from "./experiences";
import { Projects } from "./projects";

const Main = () => {
  return (
    <main id="content" className="pt-24 lg:w-[52%] lg:py-24">
      <section
        id="about"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
        aria-label="About me"
      >
        <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
            About
          </h2>
        </div>
        <div className="text-justify">
          <p className="mb-4">
            I&apos;m a passionate Full-Stack Developer who loves crafting seamless,
            high-performance web applications that blend elegant design with
            efficient engineering. I specialize in building scalable front-end
            and back-end solutions using modern technologies like React, Vue.js,
            Angular, NestJS and Node.js. My goal is to create intuitive and
            responsive digital experiences that not only look great but also
            perform flawlessly across all devices.
          </p>
          <p className="mb-4">
            Currently, I&apos;m Lead Front-End Engineer at{" "}
            <a
              className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
              href="https://www.rehanisoko.com/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Rehani Soko (opens in a new tab)"
            >
              Rehani Soko
            </a>{" "}
            specializing in performance and optimizing web applications. I work
            on creating seamless user experiences while ensuring the
            applications are scalable, efficient, and maintainable.
          </p>
          <p className="mb-4">
            Over the years, I&apos;ve had the opportunity to work on diverse
            projects—ranging from startups to large-scale enterprises — where I&apos;ve
            contributed to everything from UI/UX enhancements to backend
            integrations and performance optimizations. I enjoy solving complex
            problems, collaborating with teams, and continuously learning to
            stay ahead of industry trends.
          </p>
          <p className="mb-4">
            When I&apos;m not coding, you&apos;ll find me exploring new tech, reading,
            occasional gaming, spending time with my family or enjoying outdoor
            adventures.
          </p>
        </div>
      </section>
      <Experiences />
      <Projects />
      <Footer />
    </main>
  );
};

export default Main;
