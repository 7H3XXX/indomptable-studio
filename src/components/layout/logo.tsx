import { cn } from "@/lib/utils";

/** The Indomptable mark, traced from the studio's logo file. */
export const Logo = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    className={cn("h-6 w-auto fill-current", className)}
    viewBox="77 138 246 123"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M163 138 322 139 77 260 188 158Z" />
  </svg>
);
