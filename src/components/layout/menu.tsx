"use client";

import Image from "next/image";
import Link from "next/link";
import { type MouseEvent, useEffect, useId, useState } from "react";
import { Roll } from "@/components/reveal/roll";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { email, links } from "@/lib/site";
import { container, eyebrow, serif } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const Menu = () => {
  const id = useId();
  const [open, setOpen] = useState(false);

  // Following any link inside closes the menu.
  const closeOnLink = ({ target }: MouseEvent<HTMLElement>) => {
    if (target instanceof Element && target.closest("a")) {
      setOpen(false);
    }
  };

  // Non-modal so the header stays usable, which means locking scroll here.
  useEffect(() => {
    if (!open) {
      return;
    }
    const { style } = document.documentElement;
    style.overflow = "hidden";
    style.scrollbarGutter = "stable";
    return () => {
      style.overflow = "";
      style.scrollbarGutter = "";
    };
  }, [open]);

  return (
    // The header's own button opens and closes the sheet, so the sheet needs
    // no header of its own and slides in underneath the real one.
    <Sheet modal={false} onOpenChange={setOpen} open={open}>
      <SheetTrigger
        render={
          <Button
            className="grid text-foreground *:col-start-1 *:row-start-1"
            size="lg"
            variant="link"
          />
        }
      >
        {/* Both labels share one cell, so the button keeps its width as they swap. */}
        <span
          aria-hidden={open}
          className={cn("transition-opacity", open && "opacity-0")}
        >
          Menu
        </span>
        <span
          aria-hidden={!open}
          className={cn("transition-opacity", !open && "opacity-0")}
        >
          Close
        </span>
      </SheetTrigger>
      <SheetContent
        className="gap-0 border-0"
        onClick={closeOnLink}
        showCloseButton={false}
        side="top"
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>

        {/* Starts below the header, which stays on top of the sheet. */}
        <div
          className={cn(container, "flex h-dvh flex-col overflow-y-auto pt-24")}
        >
          <div className="grid flex-1 gap-12 border-t py-10 lg:grid-cols-12 lg:py-16">
            <nav
              aria-label="Main"
              className="flex flex-col justify-between gap-16 lg:col-span-7"
            >
              <ul className="group/list grid">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      className={cn(
                        serif,
                        "flex items-baseline py-2 text-5xl transition-colors group-hover/list:text-foreground/30 hover:text-foreground! sm:text-7xl lg:text-8xl",
                      )}
                      href={href}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>

              <section aria-labelledby={`${id}-contact`}>
                <h2 className={eyebrow} id={`${id}-contact`}>
                  New business
                </h2>
                <a
                  className="mt-4 inline-block text-2xl underline decoration-foreground/30 underline-offset-8 transition-colors hover:decoration-violet-400"
                  href={`mailto:${email}`}
                >
                  {email}
                </a>
              </section>
            </nav>

            <section
              aria-labelledby={`${id}-cta`}
              className="flex flex-col justify-end gap-6 lg:col-span-4 lg:col-start-9"
            >
              <div className="relative aspect-video overflow-hidden lg:aspect-4/5">
                <Image
                  alt=""
                  className="object-cover grayscale"
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&h=1125&fit=crop&q=80"
                />
                <div className="absolute inset-0 bg-violet-400 mix-blend-multiply" />
              </div>
              <h2 className="text-balance text-lg" id={`${id}-cta`}>
                Tell us where you stand and where you want to lead. We take it
                from there.
              </h2>
              <Link
                className={buttonVariants({
                  size: "lg",
                  className: "self-start",
                })}
                href="#contact"
              >
                <Roll>Book a call</Roll>
              </Link>
            </section>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
