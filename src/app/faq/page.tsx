import type { Metadata } from "next";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import FaqList from "@/components/sections/FaqList";
import { faqs } from "@/data/Faqs";
import { site, whatsappLink } from "@/lib/site";

/* Shared side padding: keep identical in Header.tsx and Footer.tsx */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

export const metadata: Metadata = {
  title: "FAQ | OP Garage & Gate Repairs Durban",
  description:
    "Answers to common questions about garage door, gate motor and electric fence repairs and installations in Durban: quotes, appointments, warranties and areas covered.",
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

      <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-20 size-80 rounded-full bg-accent/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 bottom-20 size-80 rounded-full bg-steel/30 blur-3xl"
        />

        <div className={`relative mx-auto w-full max-w-4xl ${gutter}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            FAQ
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Questions?{" "}
            <span className="text-gold-gradient">We&apos;ve got answers.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
            Everything people ask us about garage door, gate motor and electric
            fence repairs and installations in Durban.
          </p>

          <div className="mt-10 sm:mt-12">
            <FaqList items={faqs} />
          </div>

          <div className="mt-12 rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Still have a question?
            </h2>
            <p className="mt-2 text-muted">
              Message us on WhatsApp or give us a call. Support is available
              24/7.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-accent-strong px-6 py-3.5 text-sm font-semibold text-on-accent transition-all duration-300 hover:scale-[1.03] hover:bg-accent active:scale-95"
              >
                <MessageCircle
                  className="size-4"
                  aria-hidden
                />
                WhatsApp us
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-line px-6 py-3.5 text-sm font-semibold transition-colors duration-300 hover:border-accent hover:text-accent active:scale-95"
              >
                <Phone
                  className="size-4"
                  aria-hidden
                />
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
