import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionBand from "@/components/ui/Sectionband";
import CtaBand from "@/components/sections/Ctaband";
import ServiceDetails from "@/components/sections/ServiceDetails";
import HowItWorks from "@/components/sections/HowItWorks";
import { images } from "@/data/Images";
import Expectations from "@/components/sections/Expectations";

export const metadata: Metadata = {
  title: "Garage door, gate motor & electric fence services",
  description:
    "Garage door, gate motor, electric fence, burglar guard, clearview fencing and carport installations and repairs. Flexible appointments and fast repairs.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        crumb="Services"
        title="Our"
        highlight="services"
        description="Installations and repairs for garage doors, gate motors, electric fences, burglar guards, clearview fencing and carports."
        image={images.heroServices}
      />

      <SectionBand tone="deep">
        <ServiceDetails />
      </SectionBand>

      <SectionBand tone="base">
        <HowItWorks />
      </SectionBand>

      <SectionBand tone="base">
        <Expectations />
      </SectionBand>

      <CtaBand />
    </main>
  );
}
