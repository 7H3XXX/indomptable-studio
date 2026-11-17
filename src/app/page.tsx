import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Contact } from "@/components/sections/contact/contact";
import { Hero } from "@/components/sections/hero";
import { Mission } from "@/components/sections/mission";
import { Process } from "@/components/sections/process";
import { Product } from "@/components/sections/product";
import { services } from "@/components/sections/services/data";
import { Services } from "@/components/sections/services/services";
import { Statement } from "@/components/sections/statement";
import { Work } from "@/components/sections/work";
import { description, email, studioId, url } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Who the studio is and what it offers, for search results and AI answers.
const studio = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": studioId,
  name: "Indomptable",
  url,
  email,
  description,
  logo: `${url}/icon.svg`,
  image: `${url}/opengraph-image.png`,
  areaServed: "Worldwide",
  makesOffer: services.map(({ title, description }) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: title, description },
  })),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={studio} />
      <Header />
      <main>
        <Hero />
        <Statement />
        <Work />
        <Mission />
        <Services />
        <Process />
        <Product />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
