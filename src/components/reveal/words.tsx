import { Fragment, type ReactNode } from "react";

const WHITESPACE = /\s+/;

/** A run of text sharing one style. Runs always meet at a space. */
export type Segment =
  | string
  | { text: string; em?: boolean; className?: string };

export interface Word {
  text: string;
  /** Position across the whole text, not just this run. */
  index: number;
  count: number;
}

interface WordsProps {
  text: string | Segment[];
  children: (word: Word) => ReactNode;
}

/** Splits text into words numbered end to end, keeping each run's markup. */
export const Words = ({ text, children }: WordsProps) => {
  const runs = (typeof text === "string" ? [text] : text).map((segment) => {
    const run = typeof segment === "string" ? { text: segment } : segment;
    return { ...run, words: run.text.trim().split(WHITESPACE) };
  });
  const count = runs.reduce((total, run) => total + run.words.length, 0);
  let index = 0;

  return runs.map((run) => {
    const content = run.words.map((word) => {
      const current = index++;
      return (
        <Fragment key={current}>
          {children({ text: word, index: current, count })}
          {current < count - 1 && " "}
        </Fragment>
      );
    });
    const Tag = run.em ? "em" : "span";

    return run.em || run.className ? (
      <Tag className={run.className} key={run.text}>
        {content}
      </Tag>
    ) : (
      <Fragment key={run.text}>{content}</Fragment>
    );
  });
};
