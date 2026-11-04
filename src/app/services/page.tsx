import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import { images } from "@/data/Images";

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
      <Services />
      <HowItWorks />
    </main>
  );
}
