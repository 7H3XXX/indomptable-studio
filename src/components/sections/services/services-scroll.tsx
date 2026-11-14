"use client";

import {
  type MotionValue,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { container, serif } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { type Service, serviceImage, services } from "./data";

const last = services.length - 1;
const ease = [0.22, 1, 0.36, 1] as const;

// Each service is either still to come, on stage, or already scrolled past.
type Placement = "below" | "shown" | "above";

const placement = (index: number, active: number): Placement => {
  if (index < active) {
    return "above";
  }
  return index === active ? "shown" : "below";
};

// The outgoing title clears before the incoming one rises. The span carries the
// descender padding, so a full 100% shift leaves nothing inside the clip.
const leave = { duration: 0.3, ease: [0.4, 0, 1, 1] } as const;

const title: Variants = {
  below: { y: "100%", transition: leave },
  shown: { y: 0, transition: { duration: 0.7, delay: 0.2, ease } },
  above: { y: "-100%", transition: leave },
};

const description: Variants = {
  below: { opacity: 0, y: 12, transition: { duration: 0.2 } },
  shown: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.35, ease } },
  above: { opacity: 0, transition: { duration: 0.2 } },
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
 * The pinned version for wide, landscape screens: a stage capped at 50rem tall,
 * with one service per stretch of scroll. Every title and description stays in
 * the document, so screen readers and search engines get all of them.
 */
export const ServicesScroll = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) =>
    setActive(Math.min(last, Math.max(0, Math.round(value * last)))),
  );

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
      <div className="sticky top-0 flex h-svh items-center pt-28 pb-10">
        <div
          className={cn(container, "grid h-full max-h-200 grid-cols-12 gap-8")}
        >
          <div className="col-span-5 flex flex-col justify-end gap-12">
            <ul className="grid gap-1.5">
              {services.map((service, index) => (
                <li key={service.title}>
                  <button
                    aria-current={index === active}
                    data-current={index === active || undefined}
                    className="group relative flex items-center rounded-xs text-start text-muted-foreground outline-offset-4 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring data-current:text-foreground"
                    onClick={() => goTo(index)}
                    type="button"
                  >
                    {/* Transforms only, so marking the current service never reflows the list. */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 h-px w-6 origin-left scale-x-0 bg-violet-400 transition-transform duration-500 group-data-current:scale-x-100"
                    />
                    <span className="transition-transform duration-500 group-data-current:translate-x-9">
                      {service.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="grid">
              {services.map((service, index) => (
                <motion.div
                  animate={placement(index, active)}
                  className="col-start-1 row-start-1"
                  initial={false}
                  key={service.title}
                >
                  <h3
                    className={cn(
                      serif,
                      "overflow-hidden text-6xl xl:text-7xl",
                    )}
                  >
                    <motion.span className="block pb-3" variants={title}>
                      {service.title}
                    </motion.span>
                  </h3>
                  <motion.p
                    className="mt-5 max-w-md text-foreground/70 text-lg/relaxed"
                    variants={description}
                  >
                    {service.description}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative col-span-7 overflow-hidden">
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
      {services.slice(1).map((service) => (
        <div
          aria-hidden="true"
          className="h-svh max-h-200"
          key={service.title}
        />
      ))}
    </div>
  );
};
