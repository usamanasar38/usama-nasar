import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";

import { Logo } from "@/components/brand/logo";
import { useSearch } from "@/components/search/search-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

/** 404: wave mark 96px, one line, links home / blog and a search trigger. */
export const NotFound = () => {
  const { openSearch, prefetchProps } = useSearch();

  return (
    <div className="max-w-site mx-auto px-5 py-16 md:px-6">
      <title>Page not found · Usama Nasar</title>
      <meta content="noindex" name="robots" />
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <Logo className="text-foreground size-24" title="" />
          </EmptyMedia>
          <EmptyTitle>
            <h1 className="text-h1">This page doesn’t exist.</h1>
          </EmptyTitle>
          <EmptyDescription>
            Check the address, or try one of these.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link className={buttonVariants({ variant: "default" })} to="/">
              Home
            </Link>
            <Link className={buttonVariants({ variant: "outline" })} to="/blog">
              Blog
            </Link>
            <Button onClick={openSearch} variant="outline" {...prefetchProps}>
              <MagnifyingGlassIcon aria-hidden />
              Search
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
};
