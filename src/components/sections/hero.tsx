import Image from "next/image";
import Link from "next/link";
import rings from "@/assets/rings.jpg";
import { RiseText } from "@/components/reveal/rise-text";
import { Roll } from "@/components/reveal/roll";
import { buttonVariants } from "@/components/ui/button";
import { container, serif } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const Hero = () => (
  <section className="relative isolate overflow-hidden">
    <div
      className={cn(
        container,
        "grid gap-10 pt-36 pb-12 md:grid-cols-12 md:items-end md:pt-44 md:pb-16",
      )}
    >
      <RiseText
        as="h1"
        className={cn(
          serif,
          "text-balance text-5xl sm:text-6xl lg:text-7xl xl:text-8xl md:col-span-8",
        )}
        text={[
          "We transform established businesses into",
          { text: "digital leaders.", em: true, className: "text-violet-400" },
        ]}
      />

      <div className="md:col-span-4 md:pb-2">
        <p className="max-w-md text-pretty text-foreground/75 text-lg/relaxed">
          We build websites, platforms, AI workflows and data systems for
          established companies whose digital side has fallen behind the
          business.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className={buttonVariants({ size: "lg" })} href="#contact">
            <Roll>Book a call</Roll>
          </Link>
          <Link
            className={buttonVariants({ size: "lg", variant: "outline" })}
            href="#services"
          >
            <Roll>What we do</Roll>
          </Link>
        </div>
      </div>
    </div>

    <Image
      alt=""
      className="mx-auto h-auto w-full max-w-560 sm:mt-12"
      preload
      sizes="(min-width: 2240px) 2240px, 100vw"
      src={rings}
    />
  </section>
);
