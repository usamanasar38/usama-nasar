import { NotebookIcon, RssSimpleIcon } from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { Logo } from "@/components/brand/logo";
import { PostCard } from "@/components/blog/post-card";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getBlogIndex } from "@/lib/posts";
import { seo } from "@/lib/seo";
import { useSounds } from "@/lib/sound";
import { cn } from "@/lib/utils";

const FILTER =
  "inline-flex h-8 items-center rounded-full border px-3.5 text-small transition-colors duration-150 hover:bg-muted aria-[current=page]:border-foreground aria-[current=page]:bg-foreground aria-[current=page]:text-background";

const BlogIndex = () => {
  const { posts, tags, tag } = Route.useLoaderData();
  const { hoverProps } = useSounds();

  return (
    <div className="mx-auto max-w-site px-5 pt-14 md:px-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-h1">Blog</h1>
        <p className="text-lead text-muted-foreground">
          Notes on frontend architecture, performance and the work behind it.{" "}
          <a
            className="inline-flex items-center gap-1 text-brand underline-offset-4 hover:underline"
            href="/rss.xml"
          >
            <RssSimpleIcon aria-hidden className="size-4" />
            RSS
          </a>
        </p>
      </header>

      {tags.length > 0 ? (
        <nav aria-label="Filter posts by tag" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link
                activeOptions={{ includeSearch: true }}
                className={FILTER}
                replace
                search={{}}
                to="/blog"
                {...hoverProps}
              >
                all
              </Link>
            </li>
            {tags.map((name) => (
              <li key={name}>
                <Link
                  activeOptions={{ includeSearch: true }}
                  className={FILTER}
                  replace
                  search={{ tag: name }}
                  to="/blog"
                  {...hoverProps}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      {posts.length > 0 ? (
        <div className="mt-10 grid gap-x-4 gap-y-10 md:grid-cols-2">
          {posts.map((post, index) => (
            <PostCard as="h2" key={post.slug} post={post} priority={index === 0} />
          ))}
        </div>
      ) : (
        <Empty className="mt-10">
          <EmptyHeader>
            <EmptyMedia>
              {tag ? (
                <Logo className="size-16 text-foreground" title="" />
              ) : (
                <NotebookIcon aria-hidden className="size-10 text-muted-foreground" />
              )}
            </EmptyMedia>
            <EmptyTitle>{tag ? `No posts tagged ${tag} yet.` : "No posts yet."}</EmptyTitle>
            <EmptyDescription>
              {tag ? "Try another tag or see everything." : "The first one is on its way."}
            </EmptyDescription>
          </EmptyHeader>
          {tag ? (
            <EmptyContent>
              <Link className={cn(buttonVariants({ size: "sm", variant: "outline" }))} replace search={{}} to="/blog">
                Clear filter
              </Link>
            </EmptyContent>
          ) : null}
        </Empty>
      )}
    </div>
  );
};

export const Route = createFileRoute("/blog/")({
  validateSearch: (search: Record<string, unknown>): { tag?: string } =>
    typeof search.tag === "string" && search.tag !== "" ? { tag: search.tag } : {},
  loaderDeps: ({ search }) => ({ tag: search.tag }),
  loader: ({ deps: { tag } }) => getBlogIndex({ data: { tag } }),
  head: ({ loaderData }) => {
    const head = seo({
      description:
        "Writing by Usama Nasar on frontend architecture, performance, SSR and the work behind them.",
      path: "/blog",
      title: "Blog",
    });
    return loaderData
      ? { ...head, scripts: [{ children: loaderData.jsonLd, type: "application/ld+json" }] }
      : head;
  },
  component: BlogIndex,
});
