import { DATA } from '../data';
import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';
import { Badge } from './ui/badge';

export function About() {
  return (
    <section id="about" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading id="about-heading" label="About" />

        <Reveal>
          <p className="text-muted-foreground mb-16 max-w-2xl text-base leading-relaxed sm:text-lg">
            {DATA.summary || DATA.description}
          </p>
        </Reveal>

        <div>
          <Reveal direction="none" delay={0}>
            <h3 className="text-foreground mb-8 text-sm font-semibold tracking-wide uppercase">
              Skills
            </h3>
          </Reveal>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, i) => (
              <Reveal key={skill} direction="none" delay={i * 50}>
                <Badge
                  variant="outline"
                  className="text-muted-foreground border-border px-3 py-1 text-sm"
                >
                  {skill}
                </Badge>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
