import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { buttonVariants } from "@/components/ui/button";
import { email } from "@/lib/site";
import { container, eyebrow, heading } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className={cn(container, "flex min-h-svh flex-col py-8")}>
      <Link aria-label="Indomptable home" className="self-start" href="/">
        <Logo className="h-7" />
      </Link>

      <div className="my-auto py-24">
        <p className={eyebrow}>Error 404</p>
        <h1 className={cn(heading, "mt-6 max-w-3xl")}>
          This page took a <em className="text-violet-400">different road.</em>
        </h1>
        <p className="mt-8 max-w-md text-foreground/70 text-lg/relaxed">
          The link may be old or mistyped. Everything we do starts from the home
          page.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link className={buttonVariants({ size: "lg" })} href="/">
            Back to the home page
          </Link>
          <a
            className="text-foreground/70 underline decoration-foreground/30 underline-offset-8 transition-colors hover:text-foreground hover:decoration-violet-400"
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </div>
      </div>
    </main>
  );
}
