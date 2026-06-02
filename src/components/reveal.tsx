import { useReveal } from '../hooks/use-reveal';
import { cn } from '../lib/utils';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'none';
  delay?: number;
  threshold?: number;
}

export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  threshold,
}: RevealProps) {
  const [ref, isVisible] = useReveal({ threshold });

  const animationClass =
    direction === 'up'
      ? 'animate-fade-in-up'
      : (direction === 'down'
        ? 'animate-fade-in-down'
        : 'animate-fade-in');

  return (
    <div
      ref={ref}
      className={cn(
        !isVisible && 'opacity-0',
        isVisible && animationClass,
        isVisible && 'animate-duration-700 animate-ease-out',
        className
      )}
      style={
        isVisible && delay > 0 ? { animationDelay: `${delay}ms` } : undefined
      }
    >
      {children}
    </div>
  );
}
