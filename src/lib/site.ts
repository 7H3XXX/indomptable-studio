export const url = "https://indomptable.studio";
export const email = "hello@indomptable.studio";

/** The home page and default description, sized for a search result. */
export const description =
  "Digital transformation studio building websites, platforms, AI workflows and data systems that turn established businesses into digital leaders.";

/** The studio's id in structured data, so every page points at one entity. */
export const studioId = `${url}/#studio`;

// Shared by every page that sets its own Open Graph fields, since a page's
// openGraph replaces the layout's instead of merging with it.
export const openGraph = {
  siteName: "Indomptable",
  locale: "en_US",
  type: "website",
  images: "/opengraph-image.png",
} as const;

// Home sections are linked from the root, so they work from any page. Every
// page ends with the contact form, so #contact always lands on it.
export const links = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "#contact" },
];
