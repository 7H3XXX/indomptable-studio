import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import brokenCube from "@/assets/broken-cube.jpg";
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

      <div className="my-auto grid items-center gap-8 py-16 md:grid-cols-12 md:py-24">
        {/* Screen blending drops the photo's black ground into the page. */}
        <Image
          alt=""
          className="mx-auto w-full max-w-64 mask-radial-from-50% mix-blend-screen md:order-last md:col-span-5 md:max-w-none"
          preload
          sizes="(min-width: 768px) 40vw, 16rem"
          src={brokenCube}
        />
        <div className="md:col-span-7">
          <p className={eyebrow}>Error 404</p>
          <h1 className={cn(heading, "mt-6 max-w-3xl")}>
            This page took a{" "}
            <em className="text-violet-400">different road.</em>
          </h1>
          <p className="mt-8 max-w-md text-foreground/70 text-lg/relaxed">
            The link may be old or mistyped. Everything we do starts from the
            home page.
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
      </div>
    </main>
  );
}
