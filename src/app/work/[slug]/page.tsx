import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { NextProject } from "@/components/project/next-project";
import { ProjectIntro } from "@/components/project/project-intro";
import { ProjectStory } from "@/components/project/project-story";
import { Contact } from "@/components/sections/contact/contact";
import { getProject, nextProject, projects } from "@/lib/projects";

// Every case study is built ahead of time, and any other slug is a 404.
export const dynamicParams = false;

export const generateStaticParams = () =>
  projects.map(({ slug }) => ({ slug }));

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project
    ? { title: project.title, description: project.description }
    : {};
}

export default async function ProjectPage({
  params,
}: PageProps<"/work/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) {
    notFound();
  }

  return (
    <>
      <Header current="Work" />
      <main>
        <ProjectIntro project={project} />
        <ProjectStory project={project} />
        <NextProject project={nextProject(project)} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
