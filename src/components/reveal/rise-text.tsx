import type { CSSProperties } from "react";
import { type Segment, Words } from "./words";

interface RiseTextProps {
  as?: "h1" | "h2" | "h3";
  text: string | Segment[];
  className?: string;
}

/**
 * Each word rises out of its own mask once the title scrolls into view. Pure
 * markup and CSS, so a page full of titles costs no client JavaScript; the
 * shared RevealObserver only flips one attribute per title.
 */
export const RiseText = ({
  as: Tag = "h2",
  text,
  className,
}: RiseTextProps) => (
  <Tag className={className} data-reveal="rise">
    <Words text={text}>
      {({ text: word, index }) => (
        <span className="rise-mask">
          <span className="rise-word" style={{ "--i": index } as CSSProperties}>
            {word}
          </span>
        </span>
      )}
    </Words>
  </Tag>
);
