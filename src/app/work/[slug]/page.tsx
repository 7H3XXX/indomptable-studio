import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { NextProject } from "@/components/project/next-project";
import { ProjectIntro } from "@/components/project/project-intro";
import { ProjectStory } from "@/components/project/project-story";
import { Contact } from "@/components/sections/contact/contact";
import {
  getProject,
  nextProject,
  type Project,
  projectImage,
  projects,
} from "@/lib/projects";
import { openGraph, studioId, url } from "@/lib/site";

// Every case study is built ahead of time, and any other slug is a 404.
export const dynamicParams = false;

export const generateStaticParams = () =>
  projects.map(({ slug }) => ({ slug }));

// Names the client's sector, so the result says whose story it is.
const pageTitle = (project: Project) =>
  `${project.title} for a ${project.sector.toLowerCase()}`;

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) {
    return {};
  }
  const path = `/work/${project.slug}`;
  return {
    title: pageTitle(project),
    description: project.description,
    alternates: { canonical: path },
    openGraph: {
      ...openGraph,
      type: "article",
      title: pageTitle(project),
      description: project.description,
      url: path,
      images: { url: projectImage(project.image, 1200, 630), alt: project.alt },
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/work/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) {
    notFound();
  }

  const page = `${url}/work/${project.slug}`;
  const caseStudy = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": page,
        url: page,
        name: pageTitle(project),
        headline: project.title,
        description: project.description,
        image: projectImage(project.image, 1200, 630),
        genre: "Case study",
        keywords: project.services.join(", "),
        creator: { "@id": studioId },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Work",
            item: `${url}/#work`,
          },
          { "@type": "ListItem", position: 3, name: project.title, item: page },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={caseStudy} />
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
