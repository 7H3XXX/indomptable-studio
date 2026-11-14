"use client";

import { type MotionStyle, motion, useScroll } from "motion/react";
import { type CSSProperties, useRef } from "react";
import { cn } from "@/lib/utils";
import { type Segment, Words } from "./words";

/** The share of the scroll each word takes to go from dim to full. */
const WINDOW = 0.2;

interface ScrollTextProps {
  text: string | Segment[];
  className?: string;
}

/**
 * Words brighten one after another as the paragraph scrolls through the
 * viewport. Motion writes a single --progress variable per frame and CSS turns
 * it into each word's opacity, so the cost stays flat however many words.
 */
export const ScrollText = ({ text, className }: ScrollTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.6"],
  });

  return (
    <motion.p
      className={cn("scroll-text", className)}
      ref={ref}
      // Motion types CSS properties only, but renders variables the same way.
      style={
        { "--progress": scrollYProgress, "--window": WINDOW } as MotionStyle
      }
    >
      <Words text={text}>
        {({ text: word, index, count }) => (
          <span
            className="scroll-word"
            // Starts spread so the last word lands exactly at the end.
            style={
              {
                "--start": count > 1 ? (index / (count - 1)) * (1 - WINDOW) : 0,
              } as CSSProperties
            }
          >
            {word}
          </span>
        )}
      </Words>
    </motion.p>
  );
};
