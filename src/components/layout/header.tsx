import Link from "next/link";
import { Roll } from "@/components/reveal/roll";
import { buttonVariants } from "@/components/ui/button";
import { links } from "@/lib/site";
import { container } from "@/lib/styles";
import { cn } from "@/lib/utils";
import "./header.css";
import { Logo } from "./logo";
import { Menu } from "./menu";

interface HeaderProps {
  /** The section the page belongs to, marked in the nav. */
  current?: string;
}

// The only header on the page. It stays above the menu sheet, whose own
// trigger turns into its close button, so opening and closing never swaps it.
export const Header = ({ current }: HeaderProps) => (
  <header className="group/header header-settle fixed inset-x-0 top-0 z-60 border-transparent border-b">
    <div className={cn(container, "flex h-18 items-center justify-between")}>
      <Link aria-label="Indomptable home" href="/">
        <Logo className="h-7" />
      </Link>
      <nav aria-label="Sections" className="max-lg:hidden">
        <ul className="flex gap-10 text-base">
          {links.slice(0, 3).map(({ label, href }) => (
            <li key={href}>
              <Link
                aria-current={label === current || undefined}
                className={cn(
                  "text-foreground/70 transition-colors hover:text-foreground",
                  label === current && "text-foreground",
                )}
                href={href}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-2">
        {/* Shows once the hero's own call to action has scrolled away, and
            steps aside while the menu, which carries one, is open. */}
        <Link
          className={buttonVariants({
            size: "lg",
            className:
              "header-cta group-has-data-popup-open/header:invisible max-sm:hidden",
          })}
          href="#contact"
        >
          <Roll>Book a call</Roll>
        </Link>
        <Menu />
      </div>
    </div>
  </header>
);
