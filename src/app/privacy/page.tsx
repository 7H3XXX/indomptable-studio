import type { Metadata } from "next";
import { Chapter } from "@/components/chapter";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Contact } from "@/components/sections/contact/contact";
import { email, openGraph } from "@/lib/site";
import { container, eyebrow, heading, section } from "@/lib/styles";
import { cn } from "@/lib/utils";

const title = "Privacy policy";
const description =
  "What Indomptable collects when you contact the studio, why, who else handles it, how long it is kept and how to use your rights.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { ...openGraph, title, description, url: "/privacy" },
};

const mail = (
  <a className="underline underline-offset-4" href={`mailto:${email}`}>
    {email}
  </a>
);

// Draft. Have it reviewed, and add the legal entity name and registered
// address under "Who is responsible" before launch.
const chapters = [
  {
    title: "Who is responsible",
    body: (
      <p>
        Indomptable Studio is responsible for the personal data described on
        this page. Write to {mail} about anything here.
      </p>
    ),
  },
  {
    title: "What we collect",
    body: (
      <p>
        Only what you send us. The inquiry form asks for your name, work email
        and company, what you need, your budget range, when you would like to
        start and any details you choose to add. The same applies to anything
        you write to us by email.
      </p>
    ),
  },
  {
    title: "What we do not collect",
    body: (
      <p>
        This site sets no cookies and runs no analytics or advertising trackers.
        Fonts and images are served from our own domain, so reading a page
        shares nothing with third parties.
      </p>
    ),
  },
  {
    title: "Why we use it",
    body: (
      <p>
        To answer your inquiry, prepare a first call and, if we work together,
        run the project. We never sell your data or use it for advertising. We
        rely on the steps you ask us to take before a possible contract, and on
        our legitimate interest in answering business requests.
      </p>
    ),
  },
  {
    title: "Who else handles it",
    body: (
      <p>
        Our hosting provider, Netlify, processes technical logs such as IP
        addresses to deliver the site and keep it secure. Inquiries reach us
        through the email and project tools we run the studio with, under
        agreements that protect your data.
      </p>
    ),
  },
  {
    title: "How long we keep it",
    body: (
      <p>
        Inquiries that do not lead to a project are deleted within two years of
        our last exchange. Client records are kept as long as the law requires.
      </p>
    ),
  },
  {
    title: "Your rights",
    body: (
      <p>
        You can ask to see, correct, export or delete your data, or object to
        how we use it, by writing to {mail}. We answer within one month. You can
        also complain to your data protection authority.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <section className={cn(container, "pt-36 pb-24 md:pt-44 md:pb-36")}>
          <p className={eyebrow}>Last updated 15 November 2026</p>
          <h1 className={cn(heading, "mt-6")}>{title}</h1>
          <p className="mt-8 max-w-xl text-foreground/75 text-lg/relaxed">
            What happens to the details you share with the studio, in plain
            words.
          </p>
        </section>

        <section className="light">
          <div className={cn(container, section, "grid gap-16 md:gap-20")}>
            {chapters.map((chapter) => (
              <Chapter key={chapter.title} title={chapter.title}>
                <div className="max-w-2xl text-foreground/80 text-lg/relaxed">
                  {chapter.body}
                </div>
              </Chapter>
            ))}
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
