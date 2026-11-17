import Image from "next/image";
import Link from "next/link";
import cubes from "@/assets/iridescent-cubes.png";
import type { Project } from "@/lib/projects";
import { container, eyebrow, serif } from "@/lib/styles";
import { cn } from "@/lib/utils";

/** One clear way forward when the story ends, before the contact form. */
export const NextProject = ({ project }: { project: Project }) => (
  <nav aria-label="Next project" className="relative overflow-hidden">
    {/* Pinned to the right edge of the screen, fading into the page on its
        left. Blended on the mask itself, which would otherwise isolate the
        photo and keep its black ground. */}
    <div className="absolute inset-y-0 right-0 w-3/4 mask-l-from-40% mix-blend-screen max-md:opacity-60 md:w-1/2">
      <Image
        alt=""
        className="object-cover object-right"
        fill
        quality={90}
        // Cover scales the wide photo to the section height, so it renders
        // far wider than its box. Ask for that width, not the box's.
        sizes="(min-width: 768px) 1600px, 1100px"
        src={cubes}
      />
    </div>

    <div className={cn(container, "relative py-24 md:py-36")}>
      <Link className="group block w-fit" href={`/work/${project.slug}`}>
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
    </div>
  </nav>
);
