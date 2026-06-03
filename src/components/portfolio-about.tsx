import { getTechIcons } from '@/lib/tech-icons';

const categories = [
  {
    items: ['Javascript', 'Typescript', 'HTML & CSS'],
    label: 'Languages',
  },
  {
    items: ['React.js', 'Next.js', 'Vue.js', 'Angular', 'NestJS', 'Node.js'],
    label: 'Frameworks',
  },
  {
    items: ['Redux', 'Pinia', 'Vuex', 'NgRx', 'TailwindCSS'],
    label: 'State & Styling',
  },
  {
    items: ['Jest', 'Vitest', 'Playwright', 'Cypress', 'Git', 'CI/CD'],
    label: 'Testing & DevOps',
  },
];

export function PortfolioAbout() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-14">
          <div className="mb-6 h-px w-8 bg-primary" />
          <span className="font-mono text-xs tracking-widest text-primary uppercase">
            About
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">
            Tools I work with
          </h2>
        </div>

        <div className="space-y-8">
          {categories.map((group) => (
            <div key={group.label}>
              <p className="mb-3 font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, i) => {
                  const icons = getTechIcons(skill);

                  return (
                    <div
                      key={skill}
                      className="motion-safe:animate-tech-card inline-flex items-center gap-2 rounded-md bg-card px-3 py-2 text-xs"
                      style={
                        {
                          animationDelay: `${i * 20}ms`,
                          animationFillMode: 'both',
                        } as React.CSSProperties
                      }
                    >
                      <span className="flex shrink-0 items-center gap-1">
                        {icons.map((entry) =>
                          entry.icon ? (
                            <img
                              key={entry.label}
                              src={entry.icon}
                              alt={entry.label}
                              className="size-3.5"
                            />
                          ) : (
                            <span
                              key={entry.label}
                              className="flex size-3.5 items-center justify-center rounded-sm bg-muted text-[0.45rem] font-bold text-muted-foreground"
                            >
                              {entry.label[0]}
                            </span>
                          )
                        )}
                      </span>
                      <span className="text-muted-foreground">{skill}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
