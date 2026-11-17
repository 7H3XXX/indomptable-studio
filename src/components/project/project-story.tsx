import Image from "next/image";
import Link from "next/link";
import { Chapter } from "@/components/chapter";
import { Roll } from "@/components/reveal/roll";
import { buttonVariants } from "@/components/ui/button";
import { type Photo, type Project, projectImage, tone } from "@/lib/projects";
import { container, section, serif } from "@/lib/styles";
import { cn } from "@/lib/utils";

const Frame = ({
  photo,
  className,
  sizes,
}: {
  photo: Photo;
  className: string;
  sizes: string;
}) => (
  <div
    className={cn("relative overflow-hidden", className)}
    style={
      typeof photo.src === "string"
        ? undefined
        : { aspectRatio: `${photo.src.width} / ${photo.src.height}` }
    }
  >
    <Image
      alt={photo.alt}
      className={cn("object-cover", tone(photo.src))}
      fill
      sizes={sizes}
      src={projectImage(photo.src, 2000)}
    />
  </div>
);

const lede = cn(serif, "text-pretty text-3xl/tight md:text-4xl/tight");

/** Violet-600, since violet-400 is too faint on the light page. */
const Accent = ({ text }: { text: string }) =>
  text.split(/\*(.+?)\*/).map((part, index) =>
    index % 2 ? (
      <em className="text-violet-600" key={part}>
        {part}
      </em>
    ) : (
      part
    ),
  );

/** The case told in three chapters, with the work shown between them. */
export const ProjectStory = ({ project }: { project: Project }) => {
  const { approach, gallery, showcase, quote, live } = project;
  const [wide, left, right] = gallery;
  const steps = Array.isArray(approach);

  return (
    <section className="light">
      <div className={cn(container, section, "grid gap-20 md:gap-28")}>
        <Chapter title="The situation">
          <p className={lede} data-reveal="unblur">
            <Accent text={project.situation} />
          </p>
        </Chapter>

        <Frame
          className="aspect-4/3 sm:aspect-video"
          photo={wide}
          sizes="(min-width: 1440px) 1344px, 100vw"
        />

        <Chapter title={steps ? "What we did" : "What we built"}>
          {steps ? (
            <ol className="grid gap-10">
              {approach.map((step, index) => (
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
          ) : (
            <>
              <p className={lede} data-reveal="unblur">
                <Accent text={approach.summary} />
              </p>
              <ul className="mt-12 divide-y md:mt-16">
                {approach.choices.map(({ title, detail }) => (
                  <li
                    className="grid gap-2 py-6 sm:grid-cols-9 sm:gap-6"
                    data-reveal="unblur"
                    key={title}
                  >
                    <p className="text-pretty text-xl sm:col-span-5">{title}</p>
                    {detail && (
                      <p className="text-pretty text-muted-foreground sm:col-span-4 sm:pt-1">
                        {detail}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
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

        {/* Always aligned. A wide frame, two landscapes or three portraits. */}
        {showcase && (
          <div
            className={cn(
              "grid gap-4 md:gap-6",
              showcase.length === 2 && "sm:grid-cols-2",
              showcase.length === 3 && "sm:grid-cols-3",
            )}
          >
            {showcase.map((photo) => (
              <Frame
                className={
                  showcase.length === 3 ? "aspect-4/5" : "aspect-video"
                }
                key={photo.alt}
                photo={photo}
                sizes={`(min-width: 640px) ${Math.round(100 / showcase.length)}vw, 100vw`}
              />
            ))}
          </div>
        )}

        <Chapter title="The outcome">
          <p className={lede} data-reveal="unblur">
            <Accent text={project.outcome} />
          </p>
          {quote && (
            <figure className="mt-10 max-w-2xl" data-reveal="unblur">
              <blockquote className="text-pretty text-foreground/80 text-xl/relaxed">
                “{quote.text}”
              </blockquote>
              <figcaption className="mt-4 text-muted-foreground text-sm">
                {quote.author}
              </figcaption>
            </figure>
          )}
          <div className="mt-10 flex flex-wrap gap-3">
            <Link className={buttonVariants({ size: "lg" })} href="#contact">
              <Roll>Discuss a project like this</Roll>
            </Link>
            {live && (
              <Link
                className={buttonVariants({ size: "lg", variant: "outline" })}
                href={live}
                rel="noopener"
                target="_blank"
              >
                <Roll>{`Visit ${project.title}`}</Roll>
              </Link>
            )}
          </div>
        </Chapter>
      </div>
    </section>
  );
};
