import { DATA } from '../data';
import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function Education() {
  return (
    <section id="education" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading id="education-heading" label="Education" />

        <div className="space-y-10">
          {DATA.education.map((edu, i) => (
            <Reveal key={`${edu.school}-${edu.degree}`} delay={i * 100}>
              <div className="border-border border-l-2 py-2 pl-6">
                <div className="text-muted-foreground mb-1 text-sm">
                  {edu.dates}
                </div>

                <h3 className="text-foreground mb-1 text-lg font-semibold">
                  {edu.href ? (
                    <a
                      href={edu.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground underline-offset-4 transition-colors hover:underline"
                    >
                      {edu.school}
                    </a>
                  ) : (
                    edu.school
                  )}
                </h3>

                <p className="text-muted-foreground">{edu.degree}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
