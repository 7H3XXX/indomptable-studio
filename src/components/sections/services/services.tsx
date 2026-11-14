import Link from "next/link";
import { RiseText } from "@/components/reveal/rise-text";
import { Roll } from "@/components/reveal/roll";
import { buttonVariants } from "@/components/ui/button";
import { container, eyebrow, heading } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { ServicesAccordion } from "./services-accordion";
import { ServicesScroll } from "./services-scroll";
import "./services.css";

export const Services = () => (
  <section className="scroll-mt-24" id="services">
    <div
      className={cn(
        container,
        "grid gap-8 pt-24 md:grid-cols-12 md:items-end md:pt-36",
      )}
    >
      <div className="md:col-span-7">
        <p className={eyebrow}>What we do</p>
        <RiseText
          className={cn(heading, "mt-6")}
          text={[
            "We build what a company",
            { text: "leads", em: true, className: "text-violet-400" },
            "with.",
          ]}
        />
      </div>
      <div className="md:col-span-4 md:col-start-9">
        <p
          className="max-w-md text-foreground/70 text-lg/relaxed"
          data-reveal="unblur"
        >
          Software, data and the people who run them move forward together, so
          every change fits the business you already have.
        </p>
        <Link
          className={buttonVariants({
            size: "lg",
            variant: "outline",
            className: "mt-8",
          })}
          href="#contact"
        >
          <Roll>Talk through your case</Roll>
        </Link>
      </div>
    </div>

    <ServicesAccordion
      className={cn(container, "services-accordion mt-12 pb-24 md:pb-36")}
    />
    <ServicesScroll className="services-scroll mt-8 pb-16" />
  </section>
);
