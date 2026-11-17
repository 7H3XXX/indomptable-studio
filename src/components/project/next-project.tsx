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
          "mt-6 w-fit text-5xl transition-colors group-hover:text-violet-400 md:text-7xl",
        )}
      >
        {project.title}
        {/* The same drawn rule as the work cards, in place of the old arrow. */}
        <span
          aria-hidden="true"
          className="mt-2 block h-0.5 origin-left scale-x-0 bg-current will-change-[scale] transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
        />
      </p>
    </Link>
  </nav>
);
