export interface Service {
  title: string;
  description: string;
  /** An Unsplash photo id. */
  image: string;
}

export const services: Service[] = [
  {
    title: "AI workflows and integrations",
    description:
      "Custom AI agents and automation pipelines that take repetitive work off your teams and add intelligence to the systems you already run.",
    image: "photo-1550751827-4bd374c3f58b",
  },
  {
    title: "Website development",
    description:
      "Marketing sites, landing pages and CMS builds that load fast, rank well and give your sales team something they are proud to send.",
    image: "photo-1531297484001-80022131f5a1",
  },
  {
    title: "Enterprise platforms",
    description:
      "Internal tools, portals and dashboards that pull scattered operations into one place your people actually want to use.",
    image: "photo-1504384308090-c894fdcc538d",
  },
  {
    title: "End-to-end transformation",
    description:
      "For full mandates. We set the strategy, choose the stack and run the execution with you until the change holds.",
    image: "photo-1497366216548-37526070297c",
  },
  {
    title: "Commerce platforms",
    description:
      "E-commerce and marketplace builds designed around conversion, and around the customers who come back.",
    image: "photo-1556742049-0cfed4f6a45d",
  },
  {
    title: "Software integration",
    description:
      "The tools you already pay for, connected. Data moves between them on its own and nobody copies it by hand again.",
    image: "photo-1558494949-ef010cbdcc31",
  },
  {
    title: "Corporate training",
    description:
      "Hands-on sessions that make your teams confident with AI and the digital tools they will use every day.",
    image: "photo-1522202176988-66273c2fd55f",
  },
  {
    title: "Data and analytics",
    description:
      "Dashboards, reporting pipelines and a data strategy, so the big calls rest on numbers instead of instinct.",
    image: "photo-1551288049-bebda4e38f71",
  },
];

/** A square crop, so the photo covers any stage shape at no more than its side. */
export const serviceImage = (id: string, size: number) =>
  `https://images.unsplash.com/${id}?w=${size}&h=${size}&fit=crop&q=80`;
