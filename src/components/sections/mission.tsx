import { ScrollText } from "@/components/reveal/scroll-text";
import { container, eyebrow, section, serif } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const Mission = () => (
  <section className="light">
    <div className={cn(container, section, "grid gap-12 md:grid-cols-12")}>
      <h2 className={cn(eyebrow, "self-start md:col-span-3 md:mt-4")}>
        Mission
      </h2>
      <ScrollText
        className={cn(
          serif,
          "text-pretty text-4xl/none md:col-span-9 md:text-5xl lg:text-6xl",
        )}
        text={[
          "Making established companies the",
          { text: "leaders of their market", em: true },
          "again,",
          {
            text: "with strategy people trust and technology that actually gets used.",
            className: "text-foreground/45",
          },
        ]}
      />
    </div>
  </section>
);
