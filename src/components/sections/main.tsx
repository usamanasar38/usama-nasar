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
        <div>
          <p className="mb-4">
            I'm a Full-Stack Developer passionate about building seamless,
            scalable, and user-friendly web applications that merge thoughtful
            design with robust engineering. I thrive at the intersection of
            front-end and back-end development, creating solutions that are not
            only visually appealing but also optimized for performance,
            security, and usability.
          </p>
          <p className="mb-4">
            Currently, I'm a Lead Front-End Engineer at
            <a
              className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
              href="https://www.rehanisoko.com/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Rehani Soko (opens in a new tab)"
            >
              Rehani Soko
            </a>
            , specializing ....
          </p>
        </div>
      </section>


      
    </main>
  );
};

export default Main;
