import type { ReactNode } from "react";
import { eyebrow } from "@/lib/styles";
import { cn } from "@/lib/utils";

/** A titled block of a long page, its label in the margin on wide screens. */
export const Chapter = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div className="grid gap-6 border-t pt-10 md:grid-cols-12 md:gap-12">
    <h2 className={cn(eyebrow, "self-start md:col-span-3 md:mt-2")}>{title}</h2>
    <div className="md:col-span-9">{children}</div>
  </div>
);
