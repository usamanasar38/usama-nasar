import { cn } from '../lib/utils';
import { Reveal } from './reveal';

interface SectionHeadingProps {
  id?: string;
  label: string;
  className?: string;
}

export function SectionHeading({ id, label, className }: SectionHeadingProps) {
  return (
    <Reveal>
      <h2
        id={id}
        className={cn(
          'text-foreground mb-12 text-3xl font-semibold tracking-tight sm:text-4xl',
          className
        )}
      >
        {label}
      </h2>
    </Reveal>
  );
}
