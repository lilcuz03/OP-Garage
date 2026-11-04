import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionBand from "@/components/ui/Sectionband";
import ContactSection from "@/components/sections/ContactSection";
import { images } from "@/data/Images";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get a quote for garage door, gate motor or electric fence repairs and installations in Durban. Message us on WhatsApp or call. Flexible appointments and 24/7 support.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        crumb="Contact"
        title="Contact"
        highlight="us"
        description="Get a quote or book an appointment. Message us on WhatsApp or give us a call, and we'll take it from there."
        image={images.heroContact}
      />

      <SectionBand tone="deep">
        <ContactSection />
      </SectionBand>
    </main>
  );
}
