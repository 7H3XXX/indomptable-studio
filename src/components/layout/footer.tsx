import Image from "next/image";
import Link from "next/link";
import film from "@/assets/film.jpg";
import { Roll } from "@/components/reveal/roll";
import { buttonVariants } from "@/components/ui/button";
import { email, links } from "@/lib/site";
import { container, serif } from "@/lib/styles";
import { cn } from "@/lib/utils";

// The hit area reaches into the gap between links, so a tap lands without
// spacing the list out.
const linkClassName =
  "relative text-foreground/65 transition-colors after:absolute after:-inset-y-1 after:-inset-x-1 hover:text-foreground";

export const Footer = () => (
  <footer className="overflow-hidden">
    <div className={cn(container, "border-t pt-16")}>
      <div className="grid gap-12 md:grid-cols-12">
        <p className="max-w-sm text-balance text-2xl/snug md:col-span-5">
          Strategy, technology and data for businesses that intend to lead.
        </p>
        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <p className="text-muted-foreground text-sm">Studio</p>
          <ul className="mt-4 grid gap-2">
            {links.map(({ label, href }) => (
              <li key={href}>
                <Link className={linkClassName} href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <p className="text-muted-foreground text-sm">New business</p>
          <a
            className={cn(linkClassName, "mt-4 block w-fit")}
            href={`mailto:${email}`}
          >
            {email}
          </a>
          <Link
            className={buttonVariants({ size: "lg", className: "mt-6" })}
            href="#contact"
          >
            <Roll>Book a call</Roll>
          </Link>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-2 border-t py-8 text-muted-foreground text-sm sm:flex-row sm:justify-between">
        <p className={cn(serif, "text-lg")}>© Indomptable Studio</p>
        <div className="flex gap-6">
          <p>Working worldwide</p>
          <Link className={linkClassName} href="/privacy">
            Privacy policy
          </Link>
        </div>
      </div>
    </div>

    {/* The page closes on an image instead of a name, cropped from the
        bottom and sides, never the faded top. */}
    <div className="relative mx-auto -mt-8 h-72 w-full max-w-480 mask-t-from-0% mask-b-from-30% sm:h-96 sm:mask-b-from-60%">
      <Image
        alt=""
        className="object-cover object-top"
        fill
        sizes="(min-width: 1920px) 1920px, 100vw"
        src={film}
      />
    </div>
  </footer>
);
