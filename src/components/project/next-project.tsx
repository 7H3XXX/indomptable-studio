import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { container, eyebrow, serif } from "@/lib/styles";
import { cn } from "@/lib/utils";

/** One clear way forward when the story ends, before the contact form. */
export const NextProject = ({ project }: { project: Project }) => (
  <nav aria-label="Next project" className={cn(container, "py-24 md:py-36")}>
    <Link className="group block" href={`/work/${project.slug}`}>
      <p className={eyebrow}>Next project, {project.sector}</p>
      <p
        className={cn(
          serif,
          "mt-6 flex items-center gap-6 text-5xl transition-colors group-hover:text-violet-400 md:text-7xl",
        )}
      >
        {project.title}
        <ArrowRight
          aria-hidden="true"
          className="size-10 shrink-0 transition-transform group-hover:translate-x-2 motion-reduce:transition-none md:size-14"
        />
      </p>
    </Link>
  </nav>
);
