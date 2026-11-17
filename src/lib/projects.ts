import type { StaticImageData } from "next/image";
import cover from "@/assets/enterprise-ui/cover.jpg";
import hero from "@/assets/enterprise-ui/hero.webp";
import renderHero from "@/assets/enterprise-ui/render-hero.webp";
import pricing from "@/assets/enterprise-ui/spotlight-pricing.webp";
import tabs from "@/assets/enterprise-ui/spotlight-tabs.webp";
import stacking from "@/assets/enterprise-ui/stacking-cards.webp";

/** An Unsplash photo id, or a screenshot of our own work. */
export type Source = string | StaticImageData;

export interface Photo {
  src: Source;
  alt: string;
}

export interface Choice {
  title: string;
  detail?: string;
}

export interface Project {
  slug: string;
  sector: string;
  title: string;
  description: string;
  services: string[];
  image: Source;
  alt: string;
  /** An opaque background for the home page card, and its text color. */
  theme: string;
  /** The page title, when "title for a sector" doesn't read. */
  searchTitle?: string;
  /** *Asterisks* mark key terms, here, in the approach summary and outcome. */
  situation: string;
  approach: string[] | { summary: string; choices: Choice[] };
  outcome: string;
  quote?: { text: string; author: string };
  live?: string;
  /** One wide frame after the situation, then a pair after the approach. */
  gallery: [Photo, Photo, Photo];
  /** One wide frame, two landscapes or three portraits before the outcome. */
  showcase?: Photo[];
}

// Draft case study copy. Replace with the real story and figures before launch.
export const projects: Project[] = [
  {
    slug: "enterprise-ui",
    sector: "Developer tools",
    title: "Enterprise UI",
    description:
      "Our own library of production-ready React blocks on shadcn and Base UI, for builders and teams who ship trust.",
    services: ["Product", "Design", "Engineering"],
    image: cover,
    alt: "Hero, pricing, testimonial and feature blocks from Enterprise UI, laid out side by side",
    theme: "bg-primary text-primary-foreground",
    searchTitle: "Enterprise UI, production-ready React blocks",
    situation:
      "The web started to *look the same*. Landing pages, marketing sites, internal tools, all generated, all carrying the same flaws. Broken on mobile, closed to keyboards, careless in the details.",
    approach: {
      summary:
        "Blocks and effects with the *usual concerns already solved*. Code quality, accessibility, responsiveness, dark mode. All of it *code teams own*.",
      choices: [
        {
          title: "Built on shadcn and Base UI",
          detail: "The stack most Next.js teams already maintain.",
        },
        { title: "Your code, not a dependency" },
        { title: "Accessible by default" },
        { title: "Every width, every theme" },
        {
          title: "Held to the standard of Linear, Vercel and Stripe",
          detail:
            "Teams whose design discipline shows in every product they ship.",
        },
      ],
    },
    outcome: "We *build with it* ourselves.",
    // Placeholder on Enterprise UI too. Use it only with Dilane's permission.
    quote: {
      text: "I replaced two weeks of front-end work with an afternoon. The blocks looked finished on day one, and I spent the time on the product instead.",
      author: "Dilane Kombou, creator of RasenganJS",
    },
    live: "https://enterprise-ui.indomptable.studio",
    gallery: [
      {
        src: hero,
        alt: "The Enterprise UI home page, headed Ship trust, not AI slop",
      },
      {
        src: pricing,
        alt: "The Spotlight Pricing block in the light theme",
      },
      {
        src: stacking,
        alt: "The Stacking Cards block in the dark theme, one card sliding over the last",
      },
    ],
    showcase: [
      {
        src: renderHero,
        alt: "The Render Hero block, a sculpted arc beside the headline",
      },
      {
        src: tabs,
        alt: "The Spotlight Tabs block, a mountain photo framed by its tabs",
      },
    ],
  },
  {
    slug: "digital-bank",
    sector: "Digital bank",
    title: "Rebrand and platform",
    description:
      "A new identity and the product behind it, built side by side so the promise in the brand and the experience in the app finally match.",
    services: ["Brand", "Platform", "Data"],
    image: "photo-1486406146926-c627a92ad1ab",
    alt: "Glass office towers rising against a pale sky",
    theme: "bg-violet-400 text-background",
    situation:
      "The bank had grown faster than its brand. The app still looked like its first version, and customers judged the whole company by it. Marketing promised one thing and the product delivered another.",
    approach: [
      "We audited the brand, the app and the data behind both before proposing anything.",
      "Brand and product worked as one team, so every new screen was designed with the identity instead of after it.",
      "The platform shipped in stages, starting with onboarding, the moment most customers decide to stay.",
    ],
    outcome:
      "The brand and the app now tell the same story, and the bank owns a design system its own teams extend without us.",
    gallery: [
      {
        src: "photo-1460925895917-afdab827c52f",
        alt: "A laptop on a desk showing a dashboard of charts and figures",
      },
      {
        src: "photo-1563986768609-322da13575f3",
        alt: "Someone checking a phone in front of an open laptop",
      },
      {
        src: "photo-1563013544-824ae1b704d3",
        alt: "A hand holding a bank card over a laptop keyboard",
      },
    ],
  },
  {
    slug: "retail-chain",
    sector: "Retail chain",
    title: "Commerce, rebuilt",
    description:
      "A storefront that carries the feel of the shops online and turns a first order into a habit.",
    services: ["Commerce", "Website", "Integration"],
    image: "photo-1441986300917-64674bd600d8",
    alt: "A clothing store with garments on rails under pendant lights",
    theme: "bg-foreground text-background",
    situation:
      "Shoppers loved the stores and ignored the website. It was slow, hard to search and blind to the stock sitting on the shelves.",
    approach: [
      "We mapped how customers actually buy, in store and online, before touching the storefront.",
      "The new store runs on live inventory, so what people see online is what the shops really have.",
      "Accounts, reorders and loyalty were built in, so a first order has a reason to become a second.",
    ],
    outcome:
      "The online store finally feels like the shops, and the team runs promotions and catalog changes on its own.",
    gallery: [
      {
        src: "photo-1483985988355-763728e1935b",
        alt: "A shopper in a red coat carrying several shopping bags",
      },
      {
        src: "photo-1472851294608-062f824d29cc",
        alt: "An open sign hanging in a shop window",
      },
      {
        src: "photo-1556742502-ec7c0e9f34b1",
        alt: "A card held over a white payment reader",
      },
    ],
  },
  {
    slug: "medtech",
    sector: "MedTech",
    title: "Operations stack",
    description:
      "Internal tools and integrations that replaced spreadsheets and email chains with one system the whole company runs on.",
    services: ["Platforms", "AI workflows", "Training"],
    image: "photo-1579684385127-1ef15d508118",
    alt: "A surgical team looking down from around an operating light",
    theme: "bg-primary text-primary-foreground",
    situation:
      "Orders, approvals and stock lived in spreadsheets and email threads. Every handoff between teams meant retyping, and every mistake cost a day.",
    approach: [
      "We sat with each team to see where work actually stalled.",
      "One internal platform replaced the spreadsheets, connected to the tools the company already paid for.",
      "Every team had hands-on training, so the new system was adopted instead of tolerated.",
    ],
    outcome:
      "The company runs on one system, and work moves between teams without anyone copying it by hand.",
    gallery: [
      {
        src: "photo-1581091226825-a6a2a5aee158",
        alt: "An engineer working on a laptop beside lab machinery",
      },
      {
        src: "photo-1576091160550-2173dba999ef",
        alt: "Hands typing on a laptop next to a stethoscope",
      },
      {
        src: "photo-1556761175-5973dc0f32e7",
        alt: "A team gathered in an office for a presentation",
      },
    ],
  },
];

export const featured = projects.slice(0, 3);

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

/** The project after this one, wrapping back to the first. */
export const nextProject = (project: Project) =>
  projects[(projects.indexOf(project) + 1) % projects.length] ?? project;

/** Cropped to the height when one is given, as share images need. */
export function projectImage(
  src: string,
  width: number,
  height?: number,
): string;
export function projectImage(
  src: Source,
  width: number,
  height?: number,
): Source;
export function projectImage(src: Source, width: number, height?: number) {
  return typeof src === "string"
    ? `https://images.unsplash.com/${src}?w=${width}${height ? `&h=${height}&fit=crop` : ""}&q=80`
    : src;
}

/** Photos are toned down, screenshots keep their color. */
export const tone = (src: Source) =>
  typeof src === "string" ? "grayscale-40" : undefined;
