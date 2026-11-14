import { cn } from "@/lib/utils";

/** One width and gutter for every section, so edges line up down the page. */
export const container = "mx-auto w-full max-w-360 px-5 sm:px-8 lg:px-12";

/** Vertical rhythm shared by every section. */
export const section = "py-24 md:py-72";

/** Instrument Serif, only ever at display sizes. */
export const serif = "font-serif font-normal";

/** Section headings, one size across the page. */
export const heading = cn(
  serif,
  "text-balance text-5xl md:text-6xl lg:text-7xl",
);

/** The small label above a heading. */
export const eyebrow =
  "flex items-center gap-3 font-mono text-muted-foreground text-sm uppercase tracking-widest";
