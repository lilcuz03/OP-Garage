import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import About from "@/components/sections/About";
import Faq from "@/components/sections/FaqPreview";
import ImageSlot from "@/components/ui/ImagesSlot";
import { images } from "@/data/Images";

export const metadata: Metadata = {
  title: "About us",
  description:
    "OP Garage & Gate Repairs: reliable, experienced and flexible garage door, gate motor and electric fence specialists with warranties on most services.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        crumb="About"
        title="About"
        highlight="OP Garage & Gate Repairs"
        description="Opening doors, securing futures. Dependable garage door, gate and fence specialists."
        image={images.heroAbout}
      />

      {/* Photo strip: real team and vehicle photos go here (see src/data/images.ts) */}
      <section className="px-4 pt-16 sm:px-6 sm:pt-24 lg:px-10 xl:px-14 2xl:px-20">
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          <ImageSlot
            image={images.aboutTeam}
            sizes="(min-width: 640px) 66vw, 100vw"
            className="aspect-[4/3] rounded-3xl border border-line sm:col-span-2"
          />
          <ImageSlot
            image={images.aboutVan}
            sizes="(min-width: 640px) 33vw, 100vw"
            className="aspect-[4/3] rounded-3xl border border-line sm:aspect-auto"
          />
        </div>
      </section>

      <About />
      <Faq />
    </main>
  );
}
