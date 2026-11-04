import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactSection from "@/components/sections/ContactSection";
import { images } from "@/data/Images";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Contact OP Garage & Gate Repairs by WhatsApp, phone or email. Flexible appointments and support available 24/7.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        crumb="Contact"
        title="Get in"
        highlight="touch"
        description="Message us on WhatsApp, give us a call or send an email. Support is available 24/7."
        image={images.heroContact}
      />
      <ContactSection />
    </main>
  );
}
