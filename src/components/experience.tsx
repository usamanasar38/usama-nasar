import { DATA } from '../data';
import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';
import { Badge } from './ui/badge';

export function Experience() {
  return (
    <section id="experience" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading id="experience-heading" label="Experience" />

        <div className="space-y-16">
          {DATA.work.map((job, i) => (
            <Reveal key={job.company} delay={i * 100}>
              <div className="border-border border-l-2 py-2 pl-6">
                <div className="text-muted-foreground mb-1 text-sm">
                  {job.start} — {job.end}
                </div>

                <h3 className="text-foreground mb-1 text-xl font-semibold">
                  {job.title}{' '}
                  <span className="text-muted-foreground font-normal">@</span>{' '}
                  <a
                    href={job.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground underline-offset-4 transition-colors hover:underline"
                  >
                    {job.company}
                  </a>
                </h3>

                <p className="text-muted-foreground mb-1 text-sm">
                  {job.location}
                </p>

                <p className="text-muted-foreground mt-4 leading-relaxed">
                  {job.description}
                </p>

                {job.technologiesUsed.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {job.technologiesUsed.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-muted-foreground border-border text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
