import CtaBand from "@/components/sections/Ctaband";
import FaqPreview from "@/components/sections/FaqPreview";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Reviews from "@/components/sections/Reviews";
import Services from "@/components/sections/Services";
import SectionBand from "@/components/ui/Sectionband";

export default function Home() {
  return (
    <main>
      <Hero />

      <SectionBand tone="base">
        <Services />
      </SectionBand>

      <SectionBand tone="deep">
        <HowItWorks />
      </SectionBand>

      <SectionBand tone="base">
        <Reviews />
      </SectionBand>

      <CtaBand />

      <SectionBand
        tone="deep"
        divider={false}
      >
        <FaqPreview />
      </SectionBand>
    </main>
  );
}
