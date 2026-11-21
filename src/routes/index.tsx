import { createFileRoute } from "@tanstack/react-router";

import { BlogSection } from "@/components/home/blog";
import { BrandFigure } from "@/components/home/brand-figure";
import { Contact } from "@/components/home/contact-links";
import { Education, Recognition } from "@/components/home/credentials";
import { ExperienceSection } from "@/components/home/experience";
import { Intro } from "@/components/home/intro";
import { Overview } from "@/components/home/overview";
import { Projects } from "@/components/home/projects";
import { Stack } from "@/components/home/stack";
import { getPosts } from "@/lib/posts";
import { getHomeData } from "@/lib/portfolio.functions";
import { seo } from "@/lib/seo";

const Home = () => {
  const { posts, stack } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-site px-5 md:px-6">
      <BrandFigure />
      <Intro />
      <Overview />
      <Stack groups={stack} />
      <ExperienceSection />
      <Projects />
      <BlogSection posts={posts} />
      <Education />
      <Recognition />
      <Contact />
    </div>
  );
};

export const Route = createFileRoute("/")({
  loader: async () => {
    const [posts, home] = await Promise.all([getPosts(), getHomeData()]);
    return { jsonLd: home.jsonLd, posts: posts.slice(0, 4), stack: home.stack };
  },
  head: ({ loaderData }) => {
    const head = seo({ markdownPath: "/about.md", path: "/" });
    return loaderData
      ? { ...head, scripts: [{ children: loaderData.jsonLd, type: "application/ld+json" }] }
      : head;
  },
  component: Home,
});
