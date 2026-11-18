import type { ReactNode } from "react";
import { eyebrow } from "@/lib/styles";
import { cn } from "@/lib/utils";

/** A titled block of a long page, its label in the margin on wide screens. */
export const Chapter = ({
  title,
  bordered = true,
  children,
}: {
  title: string;
  bordered?: boolean;
  children: ReactNode;
}) => (
  <div className={cn("grid gap-6 pt-10 md:grid-cols-12 md:gap-12", bordered && "border-t")}>
    <h2 className={cn(eyebrow, "self-start md:col-span-3 md:mt-2")}>{title}</h2>
    <div className="md:col-span-9">{children}</div>
  </div>
);
