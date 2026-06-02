import { DATA } from '../data';
import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function OpenSource() {
  if (DATA.openSource.length === 0) {
    return null;
  }

  return (
    <section id="open-source" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading id="open-source-heading" label="Open Source" />

        <div className="space-y-10">
          {DATA.openSource.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border-border border-l-2 py-2 pl-6 transition-colors hover:border-foreground/40"
              >
                <h3 className="text-foreground mb-3 text-lg font-semibold group-hover:underline group-hover:underline-offset-4">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
