import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Contact } from "@/components/sections/contact/contact";
import { Hero } from "@/components/sections/hero";
import { Mission } from "@/components/sections/mission";
import { Process } from "@/components/sections/process";
import { Product } from "@/components/sections/product";
import { Services } from "@/components/sections/services/services";
import { Statement } from "@/components/sections/statement";
import { Work } from "@/components/sections/work";

export default function HomePage() {
  return (
    <>
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
