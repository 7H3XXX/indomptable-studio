import { RiseText } from "@/components/reveal/rise-text";
import { container, eyebrow, heading, section, serif } from "@/lib/styles";
import { cn } from "@/lib/utils";
import "./process.css";

const steps = [
  {
    title: "Audit",
    description:
      "We map where you stand today. Your systems, your brand, your data and the gaps between them.",
  },
  {
    title: "Diagnose",
    description:
      "We find where change pays back the most, so the budget goes there first.",
  },
  {
    title: "Design",
    description:
      "Strategy, architecture and creative direction, agreed with you before anyone writes a line of code.",
  },
  {
    title: "Build",
    description:
      "We ship with precision and speed, and we answer for every deadline we set.",
  },
  {
    title: "Accelerate",
    description:
      "After launch we measure, refine and scale what works. The launch is where the real gains start.",
  },
];

export const Process = () => (
  <section className="light scroll-mt-24" id="process">
    <div className={cn(container, section, "grid gap-16 md:grid-cols-12")}>
      <div className="self-start md:sticky md:top-32 md:col-span-5">
        <p className={eyebrow}>How we work</p>
        <RiseText
          className={cn(heading, "mt-6")}
          text="Five steps from where you are to where you lead."
        />
        <p
          className="mt-8 max-w-md text-foreground/70 text-lg/relaxed"
          data-reveal="unblur"
        >
          Every engagement follows the same path. It keeps large programs honest
          and small ones fast.
        </p>
      </div>

      <ol className="md:col-span-6 md:col-start-7">
        {steps.map(({ title, description }, index) => (
          <li
            className="process-step relative ps-10 pb-20 last:pb-0 md:ps-16 md:pb-28"
            key={title}
          >
            {/* Runs from this marker to the next, so the rail ends at both outer steps. */}
            {index < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="process-segment absolute inset-s-0 top-4 -bottom-1 w-px bg-border"
              >
                <span className="process-fill absolute inset-0 bg-foreground" />
              </span>
            )}
            <span
              aria-hidden="true"
              className="absolute -start-1.5 top-2.5 size-3 bg-violet-400 ring-6 ring-background"
            />
            <p className="text-muted-foreground text-sm tabular-nums">
              Step 0{index + 1}
            </p>
            <RiseText
              as="h3"
              className={cn(
                serif,
                "mt-3 text-4xl/none md:text-5xl lg:text-6xl",
              )}
              text={title}
            />
            <p
              className="mt-5 max-w-md text-foreground/70 text-lg/relaxed"
              data-reveal="unblur"
            >
              {description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
