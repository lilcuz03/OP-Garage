import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionBand from "@/components/ui/Sectionband";
import CtaBand from "@/components/sections/Ctaband";
import FaqGroups from "@/components/sections/FaqGroups";
import { faqs } from "@/data/Faqs";
import { images } from "@/data/Images";

export const metadata: Metadata = {
  title: "FAQ: garage door, gate motor & electric fence questions",
  description:
    "Answers to common questions about garage door, gate motor and electric fence repairs and installations in Durban: quotes, appointments, emergency repairs, warranties and areas covered.",
  alternates: { canonical: "/faq" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function FaqPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <PageHero
        crumb="FAQ"
        title="Frequently asked"
        highlight="questions"
        description="Everything people ask us about garage door, gate motor and electric fence repairs and installations in Durban."
        image={images.heroFaq}
      />

      <SectionBand tone="deep">
        <FaqGroups />
      </SectionBand>

      <CtaBand />
    </main>
  );
}
