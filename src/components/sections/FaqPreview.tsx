import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FaqList from "@/components/sections/FaqList";
import { faqs } from "@/data/Faqs";

/* Shared side padding: keep identical in Header.tsx and Footer.tsx */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

const PREVIEW_COUNT = 5;

export default function FaqPreview() {
  return (
    <section
      aria-labelledby="faq-preview-heading"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 top-1/3 size-80 rounded-full bg-accent/10 blur-3xl"
      />

      <div className={`relative w-full ${gutter}`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                FAQ
              </p>
              <h2
                id="faq-preview-heading"
                className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
              >
                Quick answers to{" "}
                <span className="text-gold-gradient">common questions</span>
              </h2>
              <p className="mt-4 max-w-md text-base text-muted sm:text-lg">
                Can&apos;t find what you&apos;re looking for? See the full list or message
                us directly.
              </p>
              <Link
                href="/faq"
                className="group mt-7 inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-line px-6 py-3.5 text-sm font-semibold transition-colors duration-300 hover:border-accent hover:text-accent active:scale-95"
              >
                View all FAQs
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8">
            <FaqList items={faqs.slice(0, PREVIEW_COUNT)} />
          </div>
        </div>
      </div>
    </section>
  );
}
