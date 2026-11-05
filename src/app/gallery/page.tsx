import type { Metadata } from "next";
import { MessageCircle, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/sections/Gallerygrid";
import { images } from "@/data/Images";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our work: gallery of installations and repairs",
  description:
    "See recent garage door, gate motor, electric fence, burglar guard, clearview fencing and carport installations and repairs by OP Garage & Gate Repairs.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <main>
      <PageHero
        crumb="Gallery"
        title="Our"
        highlight="work"
        description="Real installations and repairs by our team. Browse by service, tap a photo to see it bigger."
        image={images.heroGallery}
      />

      <GalleryGrid />

      <section className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-10 xl:px-14 2xl:px-20">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-dashed border-line p-6 text-center sm:p-10 lg:flex-row lg:text-left">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Want a result like this at your place?
            </h2>
            <p className="mt-2 text-sm text-muted sm:text-base">
              Tell us what you need and we&apos;ll take it from there. Flexible
              appointments and support available 24/7.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={whatsappLink(
                "Hi OP Garage & Gate Repairs, I saw your gallery and I'd like a quote.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-accent-strong px-7 py-4 text-base font-semibold text-on-accent transition-all duration-300 hover:scale-[1.03] hover:bg-accent hover:shadow-[0_0_36px_-4px_rgba(245,197,24,0.6)] active:scale-95"
            >
              <MessageCircle
                className="size-5"
                aria-hidden
              />
              Get a quote
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-7 py-4 text-base font-semibold transition-all duration-300 hover:border-accent hover:text-accent active:scale-95"
            >
              <Phone
                className="size-5"
                aria-hidden
              />
              Call now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
