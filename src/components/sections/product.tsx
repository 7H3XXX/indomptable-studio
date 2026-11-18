import Image from "next/image";
import Link from "next/link";
import cover from "@/assets/enterprise-ui-cover.png";
import { RiseText } from "@/components/reveal/rise-text";
import { Roll } from "@/components/reveal/roll";
import { buttonVariants } from "@/components/ui/button";
import { container, eyebrow, heading, section } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const Product = () => (
  <section>
    <div className={cn(container, section)}>
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className={eyebrow}>Our product</p>
          <RiseText
            className={cn(heading, "mt-6")}
            text="Improve your website conversion rate."
          />
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <p
            className="max-w-md text-foreground/70 text-lg/relaxed"
            data-reveal="unblur"
          >
            Access a curated library of ready-made blocks built on proven design
            patterns to convey trust to your clients at first sight.
          </p>
          <Link
            className={buttonVariants({
              size: "lg",
              variant: "outline",
              className: "mt-8",
            })}
            href="https://enterprise-ui.indomptable.studio"
            rel="noopener"
            target="_blank"
          >
            <Roll>Explore Enterprise UI</Roll>
            <span className="sr-only">(opens in a new tab)</span>
          </Link>
        </div>
      </div>

      <Image
        alt="Hero, pricing, testimonial and feature blocks from Enterprise UI, laid out side by side"
        className="mt-16 h-auto w-full md:mt-20"
        sizes="(min-width: 1440px) 1344px, 100vw"
        src={cover}
      />
    </div>
  </section>
);
