import Image from "next/image";
import Link from "next/link";
import { RiseText } from "@/components/reveal/rise-text";
import { featured, projectImage, tone } from "@/lib/projects";
import { container, eyebrow, heading, section, serif } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const Work = () => (
  <section className="scroll-mt-24" id="work">
    <div className={cn(container, section)}>
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className={eyebrow}>Selected work</p>
          <RiseText
            className={cn(heading, "mt-6")}
            text="A selection of our best work across industries."
          />
        </div>
        <p
          className="max-w-md text-foreground/70 text-lg/relaxed md:col-span-4 md:col-start-9"
          data-reveal="unblur"
        >
          From our own React library to Cameroon's fight against sickle cell.
          Different markets, the same five steps, starting with an honest audit.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:mt-24">
        {featured.map(
          ({
            slug,
            sector,
            title,
            description,
            services,
            image,
            alt,
            card = { src: image, alt },
            theme,
          }) => (
            // From md up every card has the same height and sticks at the same
            // line, so each one fully covers the last. Phones simply stack them.
            <article
              className={cn(
                "group relative flex flex-col overflow-hidden md:sticky md:top-28 md:grid md:h-152 md:grid-cols-2",
                theme,
              )}
              key={title}
            >
              <div className="flex shrink-0 flex-col gap-5 p-6 sm:p-10 md:gap-6 lg:p-14">
                <p className="font-medium text-sm uppercase tracking-widest">
                  {sector}
                </p>
                {/* The project name is the link, stretched over the whole card. */}
                <Link
                  className="block w-fit rounded-xs outline-offset-4 after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-current"
                  href={`/work/${slug}`}
                >
                  <RiseText
                    as="h3"
                    className={cn(serif, "text-balance text-5xl lg:text-7xl")}
                    text={title}
                  />
                  {/* Drawn as a rule, since each word sits in its own clipped mask. */}
                  <span
                    aria-hidden="true"
                    className="mt-2 block h-0.5 origin-left scale-x-0 bg-current will-change-[scale] transition-transform duration-500 group-hover:scale-x-100 group-has-focus-visible:scale-x-100 motion-reduce:transition-none"
                  />
                </Link>
                <p
                  className="max-w-md text-base/relaxed opacity-80 sm:text-lg/relaxed"
                  data-reveal="unblur"
                >
                  {description}
                </p>
                <ul className="mt-auto flex flex-wrap gap-x-6 gap-y-2 border-current/20 border-t pt-6 text-sm">
                  {services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </div>
              {/* One frame for every photo on phones, the full card height above. */}
              <div className="p-3 pt-0 md:p-4 md:ps-0">
                <div className="relative aspect-2/1 overflow-hidden md:aspect-auto md:h-full">
                  <Image
                    alt={card.alt}
                    className={cn("object-cover", tone(card.src))}
                    fill
                    // Cover scales a wide picture to the card height, so it
                    // renders about 1024px wide whatever the box. Ask for that.
                    sizes="(min-width: 768px) 1024px, 100vw"
                    src={projectImage(card.src, 1400)}
                  />
                </div>
              </div>
            </article>
          ),
        )}
      </div>
    </div>
  </section>
);
