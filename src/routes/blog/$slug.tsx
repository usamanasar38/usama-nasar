import { MDXContent } from "@content-collections/mdx/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { mdxComponents } from "@/components/blog/mdx-components";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { coverUrl } from "@/lib/covers";
import { formatPostDate } from "@/lib/dates";
import { getPost } from "@/lib/posts";
import { seo } from "@/lib/seo";
import { useSounds } from "@/lib/sound";

const PostPage = () => {
  const post = Route.useLoaderData();
  const { hoverProps } = useSounds();
  const cover = coverUrl(post.cover);

  return (
    <div className="max-w-post mx-auto grid gap-16 px-5 pt-14 pb-24 md:px-6 lg:grid-cols-[minmax(0,1fr)_200px]">
      <div className="max-w-reading min-w-0">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link to="/blog" />}>blog</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{post.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="mt-8 flex flex-col gap-4">
          <div className="text-caption text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime} min read</span>
            {post.draft ? (
              <>
                <span aria-hidden>·</span>
                <span>draft</span>
              </>
            ) : null}
            <ul aria-label="Tags" className="ml-1 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Badge
                    render={<Link search={{ tag }} to="/blog" />}
                    variant="tag"
                  >
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
          <h1 className="text-h1">{post.title}</h1>
          <p className="text-lead text-muted-foreground">{post.description}</p>
        </header>

        {cover ? (
          <img
            alt={post.coverAlt ?? ""}
            className="bg-muted mt-10 aspect-[1200/630] w-full rounded-xl border object-cover"
            decoding="async"
            fetchPriority="high"
            height={630}
            src={cover}
            width={1200}
          />
        ) : null}

        <article className="article mt-10">
          <MDXContent code={post.body} components={mdxComponents} />
        </article>

        {post.previous || post.next ? (
          <nav
            aria-label="More posts"
            className="mt-16 grid gap-4 md:grid-cols-2"
          >
            {post.previous ? (
              <Link
                className="group hover:border-muted-foreground flex flex-col gap-1.5 rounded-xl border p-4 transition-colors"
                params={{ slug: post.previous.slug }}
                rel="prev"
                to="/blog/$slug"
                {...hoverProps}
              >
                <span className="text-caption text-muted-foreground inline-flex items-center gap-1 font-mono">
                  <ArrowLeftIcon aria-hidden className="size-3.5" /> previous
                </span>
                <span className="text-h3">{post.previous.title}</span>
              </Link>
            ) : (
              <span aria-hidden className="hidden md:block" />
            )}
            {post.next ? (
              <Link
                className="group hover:border-muted-foreground flex flex-col items-end gap-1.5 rounded-xl border p-4 text-right transition-colors"
                params={{ slug: post.next.slug }}
                rel="next"
                to="/blog/$slug"
                {...hoverProps}
              >
                <span className="text-caption text-muted-foreground inline-flex items-center gap-1 font-mono">
                  next <ArrowRightIcon aria-hidden className="size-3.5" />
                </span>
                <span className="text-h3">{post.next.title}</span>
              </Link>
            ) : null}
          </nav>
        ) : null}

        <p className="text-caption text-muted-foreground mt-10 font-mono">
          <a
            className="text-brand underline-offset-4 hover:underline"
            href={`/blog/${post.slug}.md`}
          >
            View as markdown
          </a>
        </p>
      </div>

      <aside className="hidden lg:block">
        <TableOfContents headings={post.headings} />
      </aside>
    </div>
  );
};

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => await getPost({ data: { slug: params.slug } }),
  head: ({ loaderData: post }) => {
    if (!post) {
      return {};
    }
    const head = seo({
      article: { modifiedTime: post.updated, publishedTime: post.date, tags: post.tags },
      description: post.description,
      image: post.image,
      imageAlt: post.coverAlt ?? post.title,
      markdownPath: `/blog/${post.slug}.md`,
      noindex: post.draft,
      path: `/blog/${post.slug}`,
      title: post.title,
      type: "article",
    });
    return {
      ...head,
      scripts: post.jsonLd.map((children) => ({ children, type: "application/ld+json" })),
    };
  },
  component: PostPage,
});
