import { Badge } from '@/components/ui/badge';
import { TECH_STACK } from '@/data/tech-stack';

type TechItem = (typeof TECH_STACK)[number];

function TechBadge({ item }: { item: TechItem }) {
  return (
    <Badge
      variant="outline"
      render={
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.name}
        />
      }
      className="gap-1 font-normal"
    >
      <item.Icon aria-hidden />
      {item.name}
    </Badge>
  );
}

export function TechStackSection() {
  return (
    <section id="stack" className="scroll-mt-20">
      <h2 className="text-balance text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Stack
      </h2>
      <div className="mt-8 flex flex-wrap gap-2">
        {TECH_STACK.map((item) => (
          <TechBadge key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}
