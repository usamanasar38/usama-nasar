import { Badge } from '@/components/ui/badge';
import { TECH_STACK } from '@/data/tech-stack';

export function TechStackSection() {
  return (
    <section id="stack" className="scroll-mt-20">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Stack
      </h2>
      <div className="mt-8 flex flex-wrap gap-2">
        {TECH_STACK.map((item) => (
          <Badge
            key={item.name}
            variant="outline"
            render={
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
              />
            }
            className="gap-1 font-normal [&>svg]:size-4!"
          >
            <item.Icon className="size-4 shrink-0" />
            {item.name}
          </Badge>
        ))}
      </div>
    </section>
  );
}
