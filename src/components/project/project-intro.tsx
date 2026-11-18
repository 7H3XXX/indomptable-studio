import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RiseText } from "@/components/reveal/rise-text";
import { type Project, projectImage, tone } from "@/lib/projects";
import { container, eyebrow, serif } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const ProjectIntro = ({ project }: { project: Project }) => (
  <section className={cn(container, "pt-36 md:pt-44")}>
    <Link
      className="inline-flex min-h-11 items-center gap-2 text-foreground/70 text-sm transition-colors hover:text-foreground"
      href="/#work"
    >
      <ArrowLeft aria-hidden="true" className="size-4" />
      All work
    </Link>

    <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8">
        <p className={eyebrow}>{project.sector}</p>
        <RiseText
          as="h1"
          className={cn(
            serif,
            "mt-6 text-balance text-5xl sm:text-6xl lg:text-7xl xl:text-8xl",
          )}
          text={project.title}
        />
      </div>
      <p
        className="max-w-md text-pretty text-foreground/75 text-lg/relaxed md:col-span-4 md:pb-2"
        data-reveal="unblur"
      >
        {project.description}
      </p>
    </div>
    <div className="relative mt-16 aspect-4/3 overflow-hidden sm:aspect-video md:mt-20 lg:aspect-2/1">
      <Image
        alt={project.alt}
        className={cn("object-cover", tone(project.image))}
        fill
        preload
        sizes="(min-width: 1440px) 1344px, 100vw"
        src={projectImage(project.image, 2400)}
      />
    </div>

    <dl
      className={cn(
        "grid gap-8 border-b py-10 sm:grid-cols-2 md:py-12",
        project.live && "md:grid-cols-3",
      )}
    >
      <div>
        <dt className="text-muted-foreground text-sm">Sector</dt>
        <dd className="mt-2 text-lg">{project.sector}</dd>
      </div>
      <div>
        <dt className="text-muted-foreground text-sm">Services</dt>
        <dd className="mt-2 text-lg">{project.services.join(", ")}</dd>
      </div>
      {project.live && (
        <div>
          <dt className="text-muted-foreground text-sm">Live</dt>
          <dd className="mt-2 text-lg">
            <a
              className="underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
              href={project.live}
              rel="noopener"
              target="_blank"
            >
              {new URL(project.live).host}
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </dd>
        </div>
      )}
    </dl>
  </section>
);
