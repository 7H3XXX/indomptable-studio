"use client";

import { useEffect } from "react";

/**
 * One IntersectionObserver for every [data-reveal] element on the page. Each
 * element is marked once and dropped, and the CSS does the animating.
 */
export const RevealObserver = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting, boundingClientRect } of entries) {
          // Anything already above the viewport, after a jump to an anchor, shows too.
          if (isIntersecting || boundingClientRect.bottom < 0) {
            target.setAttribute("data-revealed", "");
            observer.unobserve(target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    for (const element of document.querySelectorAll(
      "[data-reveal]:not([data-revealed])",
    )) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return null;
};
