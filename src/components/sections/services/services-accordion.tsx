"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { serif } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { services } from "./data";

/** The small screen version, where a pinned scroll would feel cramped. */
export const ServicesAccordion = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(services[0]?.title ?? "");

  return (
    <Accordion
      className={className}
      // One service always stays open, so the list never looks closed off.
      onValueChange={([next]) => next && setOpen(next)}
      value={[open]}
    >
      {services.map(({ title, description }) => (
        <AccordionItem className="border-b" key={title} value={title}>
          <AccordionTrigger
            className={cn(
              serif,
              "gap-6 py-7 text-3xl/none hover:no-underline aria-expanded:text-violet-400 md:text-4xl/none",
            )}
          >
            {title}
          </AccordionTrigger>
          <AccordionContent className="pe-12 pb-8 text-foreground/70 text-lg/relaxed">
            <p className="max-w-lg">{description}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
