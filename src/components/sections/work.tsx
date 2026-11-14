import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { RiseText } from "@/components/reveal/rise-text";
import { container, eyebrow, heading, section, serif } from "@/lib/styles";
import { cn } from "@/lib/utils";

interface Project {
  sector: string;
  title: string;
  description: string;
  services: string[];
  /** An Unsplash photo id. */
  image: string;
  alt: string;
  /** An opaque background, since the cards overlap, and its text color. */
  theme: string;
}

const projects: Project[] = [
  {
    sector: "Digital bank",
    title: "Rebrand and platform",
    description:
      "A new identity and the product behind it, built side by side so the promise in the brand and the experience in the app finally match.",
    services: ["Brand", "Platform", "Data"],
    image: "photo-1486406146926-c627a92ad1ab",
    alt: "Glass office towers rising against a pale sky",
    theme: "bg-violet-400 text-background",
  },
  {
    sector: "Retail chain",
    title: "Commerce, rebuilt",
    description:
      "A storefront that carries the feel of the shops online and turns a first order into a habit.",
    services: ["Commerce", "Website", "Integration"],
    image: "photo-1441986300917-64674bd600d8",
    alt: "A clothing store with garments on rails under pendant lights",
    theme: "bg-foreground text-background",
  },
  {
    sector: "MedTech",
    title: "Operations stack",
    description:
      "Internal tools and integrations that replaced spreadsheets and email chains with one system the whole company runs on.",
    services: ["Platforms", "AI workflows", "Training"],
    image: "photo-1579684385127-1ef15d508118",
    alt: "A surgical team looking down from around an operating light",
    theme: "bg-primary text-primary-foreground",
  },
];

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
          Three mandates across banking, retail and health. Different markets,
          the same five steps, starting with an honest audit.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:mt-24">
        {projects.map(
          ({ sector, title, description, services, image, alt, theme }) => (
            // From md up every card has the same height and sticks at the same
            // line, so each one fully covers the last. Phones simply stack them.
            <article
              className={cn(
                "flex flex-col overflow-hidden md:sticky md:top-28 md:grid md:h-152 md:grid-cols-2",
                theme,
              )}
              key={title}
            >
              <div className="flex shrink-0 flex-col gap-5 p-6 sm:p-10 md:gap-6 lg:p-14">
                <p className="font-medium text-sm uppercase tracking-widest">
                  {sector}
                </p>
                <RiseText
                  as="h3"
                  className={cn(serif, "text-balance text-5xl lg:text-7xl")}
                  text={title}
                />
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
                <a
                  className="group inline-flex w-fit items-center gap-2 font-medium underline decoration-current/30 underline-offset-6 transition-colors hover:decoration-current"
                  href="#contact"
                >
                  Discuss a project like this
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                  />
                </a>
              </div>
              {/* One frame for every photo on phones, the full card height above. */}
              <div className="p-3 pt-0 md:p-4 md:ps-0">
                <div className="relative aspect-2/1 overflow-hidden md:aspect-auto md:h-full">
                  <Image
                    alt={alt}
                    className="object-cover grayscale-40"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    src={`https://images.unsplash.com/${image}?w=1400&h=1200&fit=crop&q=80`}
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
