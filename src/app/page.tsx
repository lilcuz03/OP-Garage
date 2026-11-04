import FaqPreview from "@/components/sections/FaqPreview";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Services from "@/components/sections/Services";
import Reviews from "@/components/sections/Reviews";
export default function Home() {
  return (
    <main>
      <Hero />
      <Services />

      <HowItWorks />
      <Reviews />
      <FaqPreview />
    </main>
  );
}
