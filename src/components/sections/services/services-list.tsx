"use client";

import { ChevronDownIcon } from "lucide-react";
import {
  type MotionValue,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { type CSSProperties, useId, useRef, useState } from "react";
import { container } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { type Service, serviceImage, services } from "./data";

const last = services.length - 1;

// Each service is either still to come, on stage, or already scrolled past.
type Placement = "below" | "shown" | "above";

const placement = (index: number, active: number): Placement => {
  if (index < active) {
    return "above";
  }
  return index === active ? "shown" : "below";
};

interface SlideProps {
  service: Service;
  index: number;
  progress: MotionValue<number>;
}

/**
 * Rises over the image before it inside its own stretch of the scroll: the mask
 * slides up while the photo slides down against it, so the photo holds still.
 */
const Slide = ({ service, index, progress }: SlideProps) => {
  const range = [(index - 0.85) / last, (index - 0.15) / last];
  const mask = useTransform(progress, range, ["100%", "0%"]);
  const photo = useTransform(progress, range, ["-100%", "0%"]);
  const scale = useTransform(progress, range, [1.15, 1]);
  // Hidden once the next slide covers it, so stacked edges never bleed through.
  const coveredAt = (index + 0.85) / last;
  const visibility = useTransform(progress, (value) =>
    index < last && value >= coveredAt ? "hidden" : "visible",
  );
  const first = index === 0;

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      style={first ? { visibility } : { visibility, y: mask }}
    >
      <motion.div
        className="absolute inset-0"
        style={first ? undefined : { y: photo, scale }}
      >
        <Image
          alt=""
          className="object-cover"
          fill
          sizes="50rem"
          src={serviceImage(service.image, 1600)}
        />
      </motion.div>
    </motion.div>
  );
};

/**
 * Every service is written once, in one list with two layouts. Small screens
 * read it as an accordion that always keeps one service open. The stage, a
 * wide landscape screen with motion allowed, pins the list beside the photos
 * and moves to the next service with each screen of scroll.
 */
export const ServicesList = ({ className }: { className?: string }) => {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // The scroll track only takes up room on the stage.
  const staged = () => Boolean(track.current?.offsetHeight);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (staged()) {
      setActive(Math.min(last, Math.max(0, Math.round(value * last))));
    }
  });

  // Scrolls to the point where that service has fully taken over.
  const goTo = (index: number) => {
    const element = ref.current;
    if (!element) {
      return;
    }
    const top = element.getBoundingClientRect().top + window.scrollY;
    const distance = element.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + (distance * index) / last,
      behavior: "smooth",
    });
  };

  return (
    <div className={className} ref={ref}>
      <div className="stage:sticky stage:top-0 stage:flex stage:h-svh stage:items-center stage:pt-28 stage:pb-10">
        <div
          className={cn(
            container,
            "stage:grid stage:h-full stage:max-h-200 stage:grid-cols-12 stage:gap-8",
          )}
        >
          <ol
            className="services-list stage:col-span-5 stage:grid stage:content-end stage:gap-y-1.5"
            style={{ "--count": services.length } as CSSProperties}
          >
            {services.map((service, index) => (
              <li
                className="group border-b stage:contents"
                data-current={index === active || undefined}
                data-placement={placement(index, active)}
                key={service.title}
              >
                <h3>
                  <button
                    aria-controls={`${id}-${index}`}
                    aria-expanded={index === active}
                    className="flex w-full items-center justify-between gap-6 rounded-xs py-7 text-start font-serif text-3xl/none outline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-ring group-data-current:text-violet-400 md:text-4xl/none stage:relative stage:w-auto stage:justify-start stage:py-0 stage:font-sans stage:text-base stage:text-muted-foreground stage:hover:text-foreground stage:group-data-current:text-foreground"
                    onClick={() => (staged() ? goTo(index) : setActive(index))}
                    type="button"
                  >
                    {/* Transforms only, so marking the current service never reflows the list. */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 hidden h-px w-6 origin-left scale-x-0 bg-violet-400 transition-transform duration-500 group-data-current:scale-x-100 stage:block"
                    />
                    <span className="transition-transform duration-500 stage:group-data-current:translate-x-9">
                      {service.title}
                    </span>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-4 shrink-0 text-muted-foreground transition-transform group-data-current:rotate-180 stage:hidden"
                    />
                  </button>
                </h3>
                <div className="services-panel" id={`${id}-${index}`}>
                  <div>
                    {/* The large title on the stage, drawn from the attribute
                        so the text itself is written once. */}
                    <span
                      aria-hidden="true"
                      className="services-title hidden overflow-hidden font-serif text-6xl xl:text-7xl stage:block"
                      data-title={service.title}
                    />
                    <p className="services-description max-w-lg pe-12 pb-8 text-foreground/70 text-lg/relaxed stage:mt-5 stage:max-w-md stage:p-0">
                      {service.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="relative hidden overflow-hidden stage:col-span-7 stage:block">
            {services.map((service, index) => (
              <Slide
                index={index}
                key={service.title}
                progress={scrollYProgress}
                service={service}
              />
            ))}
          </div>
        </div>
      </div>

      {/* One screen of scroll per service after the first, capped like the stage. */}
      <div className="hidden stage:block" ref={track}>
        {services.slice(1).map((service) => (
          <div
            aria-hidden="true"
            className="h-svh max-h-200"
            key={service.title}
          />
        ))}
      </div>
    </div>
  );
};
