import type { Metadata } from "next";
import Image from "next/image";
import { Chapter } from "@/components/chapter";
import { JsonLd } from "@/components/json-ld";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { RiseText } from "@/components/reveal/rise-text";
import { Contact } from "@/components/sections/contact/contact";
import { openGraph, studioId, url } from "@/lib/site";
import { container, eyebrow, section, serif } from "@/lib/styles";
import { portrait, team } from "@/lib/team";
import { cn } from "@/lib/utils";

const title = "About the studio";
const description =
  "Indomptable is one team of strategists, designers, engineers and data specialists for established businesses whose digital side has fallen behind.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { ...openGraph, title, description, url: "/about" },
};

const aboutPage = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${url}/about`,
  name: title,
  description,
  about: { "@id": studioId },
};

// Draft copy and photo. Replace with the studio's own story and team before launch.
const principles = [
  "We start with an honest audit, because the right plan depends on what is already there.",
  "One team carries the work from strategy to launch, so nothing gets lost between agencies.",
  "We ship in stages, so the business sees results while the larger change takes shape.",
  "We stay until your own teams run what we built, then we step back.",
];

const lede = cn(serif, "text-pretty text-3xl/tight md:text-4xl/tight");

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPage} />
      <Header current="About" />
      <main>
        <section className={cn(container, "pt-36 md:pt-44")}>
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className={eyebrow}>{title}</p>
              <RiseText
                as="h1"
                className={cn(
                  serif,
                  "mt-6 text-balance text-5xl sm:text-6xl lg:text-7xl xl:text-8xl",
                )}
                text={[
                  "A studio for businesses that outgrew their",
                  {
                    text: "digital side.",
                    em: true,
                    className: "text-violet-400",
                  },
                ]}
              />
            </div>
            <p
              className="max-w-md text-pretty text-foreground/75 text-lg/relaxed md:col-span-4 md:pb-2"
              data-reveal="unblur"
            >
              Strategists, designers, engineers and data specialists in one
              team, for leaders who want their technology to match the company
              they have built.
            </p>
          </div>
          <div className="relative mt-16 aspect-4/3 overflow-hidden sm:aspect-video md:mt-20 lg:aspect-2/1">
            <Image
              alt="A team working together around a table with laptops"
              className="object-cover grayscale-40"
              fill
              preload
              sizes="(min-width: 1440px) 1344px, 100vw"
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=2400&q=80"
            />
          </div>
        </section>

        <section className="light mt-24 md:mt-36">
          <div className={cn(container, section, "grid gap-20 md:gap-28")}>
            <Chapter title="Who we work with">
              <p className={lede} data-reveal="unblur">
                Established companies with a strong business and a digital side
                that has fallen behind it. Usually a leadership team that knows
                something has to change and wants one partner to own the result.
              </p>
            </Chapter>

            <Chapter title="How we work">
              <ol className="grid gap-10">
                {principles.map((principle, index) => (
                  <li
                    className="grid gap-3 sm:grid-cols-6"
                    data-reveal="unblur"
                    key={principle}
                  >
                    <span className="text-muted-foreground text-sm tabular-nums">
                      0{index + 1}
                    </span>
                    <p className="max-w-xl text-foreground/80 text-lg/relaxed sm:col-span-5">
                      {principle}
                    </p>
                  </li>
                ))}
              </ol>
            </Chapter>

            <Chapter title="The team">
              <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
                {team.map((member) => (
                  <li data-reveal="unblur" key={member.role}>
                    <div className="relative aspect-4/5 overflow-hidden">
                      <Image
                        alt={`Portrait of ${member.name}`}
                        className="object-cover grayscale"
                        fill
                        sizes="(min-width: 1024px) 20vw, 50vw"
                        src={portrait(member.photo, 800)}
                      />
                    </div>
                    <p className="mt-4 text-lg">{member.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {member.role}
                    </p>
                  </li>
                ))}
              </ul>
            </Chapter>

            <Chapter title="Where we work">
              <p className={lede} data-reveal="unblur">
                With clients worldwide, remotely by default, and in the same
                room for the moments that need everyone around one table.
              </p>
            </Chapter>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
