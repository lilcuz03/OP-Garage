import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionBand from "@/components/ui/Sectionband";
import CtaBand from "@/components/sections/Ctaband";
import About from "@/components/sections/About";
import { images } from "@/data/Images";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Garage door, gate motor and electric fence specialists in Durban, KwaZulu-Natal. Fast repairs, affordable prices, flexible appointments and warranties on most services.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        crumb="About"
        title="About"
        highlight="OP Garage & Gate"
        description="Garage door, gate motor and electric fence specialists serving Durban, KwaZulu-Natal."
        image={images.heroAbout}
      />

      <SectionBand tone="deep">
        <About />
      </SectionBand>

      <CtaBand />
    </main>
  );
}
