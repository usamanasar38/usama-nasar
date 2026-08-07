import { ArrowLeftIcon } from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';

export function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          Page not found
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          variant="outline"
          size="sm"
          render={<Link to="/" />}
          className="mt-8"
        >
          <ArrowLeftIcon />
          Back home
        </Button>
      </div>
    </div>
  );
}
