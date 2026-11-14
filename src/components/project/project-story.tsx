import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import { type Photo, type Project, projectImage } from "@/lib/projects";
import { container, eyebrow, section, serif } from "@/lib/styles";
import { cn } from "@/lib/utils";

const Chapter = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div className="grid gap-6 border-t pt-10 md:grid-cols-12 md:gap-12">
    <h2 className={cn(eyebrow, "self-start md:col-span-3 md:mt-2")}>{title}</h2>
    <div className="md:col-span-9">{children}</div>
  </div>
);

const Frame = ({
  photo,
  className,
  sizes,
}: {
  photo: Photo;
  className: string;
  sizes: string;
}) => (
  <div className={cn("relative overflow-hidden", className)}>
    <Image
      alt={photo.alt}
      className="object-cover grayscale-40"
      fill
      sizes={sizes}
      src={projectImage(photo.id, 2000)}
    />
  </div>
);

const lede = cn(serif, "text-pretty text-3xl/tight md:text-4xl/tight");

/** The case told in three chapters, with the work shown between them. */
export const ProjectStory = ({ project }: { project: Project }) => {
  const [wide, left, right] = project.gallery;

  return (
    <section className="light">
      <div className={cn(container, section, "grid gap-20 md:gap-28")}>
        <Chapter title="The situation">
          <p className={lede} data-reveal="unblur">
            {project.situation}
          </p>
        </Chapter>

        <Frame
          className="aspect-4/3 sm:aspect-video"
          photo={wide}
          sizes="(min-width: 1440px) 1344px, 100vw"
        />

        <Chapter title="What we did">
          <ol className="grid gap-10">
            {project.approach.map((step, index) => (
              <li
                className="grid gap-3 sm:grid-cols-6"
                data-reveal="unblur"
                key={step}
              >
                <span className="text-muted-foreground text-sm tabular-nums">
                  0{index + 1}
                </span>
                <p className="max-w-xl text-foreground/80 text-lg/relaxed sm:col-span-5">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </Chapter>

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
          <Frame
            className="aspect-4/5"
            photo={left}
            sizes="(min-width: 640px) 50vw, 100vw"
          />
          <Frame
            className="aspect-4/5 sm:mt-24"
            photo={right}
            sizes="(min-width: 640px) 50vw, 100vw"
          />
        </div>

        <Chapter title="Where it stands">
          <p className={lede} data-reveal="unblur">
            {project.outcome}
          </p>
          <Link
            className={buttonVariants({ size: "lg", className: "mt-10" })}
            href="#contact"
          >
            Discuss a project like this
          </Link>
        </Chapter>
      </div>
    </section>
  );
};
