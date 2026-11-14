import { ScrollText } from "@/components/reveal/scroll-text";
import { container, eyebrow, section, serif } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const Statement = () => (
  <section className="light">
    <div className={cn(container, section, "grid gap-12 md:grid-cols-12")}>
      <h2 className={cn(eyebrow, "self-start md:col-span-3 md:mt-4")}>
        The studio
      </h2>
      <div className="md:col-span-9">
        <ScrollText
          className={cn(
            serif,
            "text-pretty text-4xl/none md:text-5xl lg:text-6xl",
          )}
          text={[
            "We combine deep technology with deep expertise",
            {
              text: "to serve the world's leading brands and businesses.",
              className: "text-foreground/45",
            },
          ]}
        />
        <div
          className="mt-14 grid gap-8 text-foreground/75 text-lg/relaxed sm:grid-cols-2 md:mt-20"
          data-reveal="unblur"
        >
          <p>
            We work with leadership teams whose business runs well and whose
            digital side has fallen behind it. Old systems, a website that
            undersells, data nobody quite trusts.
          </p>
          <p>
            Strategy, design, engineering and data sit in one team. Nothing gets
            lost between agencies, and one partner answers for the result.
          </p>
        </div>
      </div>
    </div>
  </section>
);
