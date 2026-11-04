import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionBand from "@/components/ui/Sectionband";
import CtaBand from "@/components/sections/Ctaband";
import HowItWorks from "@/components/sections/HowItWorks";
import { serviceDetails } from "@/data/serviceDetails";
import { site } from "@/lib/site";

/* Shared side padding: keep identical in Header.tsx and Footer.tsx */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

/* WhatsApp number in international format, taken from site.phoneHref */
const WA_NUMBER = site.phoneHref.replace(/\D/g, "");

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return serviceDetails.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceDetails.find((s) => s.slug === slug);
  if (!service) return {};

  const description =
    service.intro.length > 155
      ? `${service.intro.slice(0, 152).trimEnd()}…`
      : service.intro;

  return {
    title: `${service.title} in Durban | ${service.offers.join(" & ")}`,
    description,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = serviceDetails.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = serviceDetails.filter((s) => s.slug !== service.slug);
  const quote = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hi ${site.name}, I'd like a quote for: ${service.title}.`,
  )}`;

  return (
    <main>
      <PageHero
        crumb={service.title}
        title={service.title}
        highlight={service.offers.join(" & ").toLowerCase()}
        description={service.intro}
        image={service.image}
      >
        <a
          href={quote}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-accent-strong px-7 py-4 text-base font-semibold text-on-accent transition-all duration-300 hover:scale-[1.03] hover:bg-accent active:scale-95"
        >
          <MessageCircle
            className="size-5"
            aria-hidden
          />
          Get a quote
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
        </a>
      </PageHero>

      <SectionBand tone="deep">
        <section
          aria-labelledby="service-offer-heading"
          className="relative overflow-clip py-16 sm:py-24"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-28 top-24 size-80 rounded-full bg-accent/10 blur-3xl"
          />

          <div className={`relative w-full ${gutter}`}>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  What we offer
                </p>
                <h2
                  id="service-offer-heading"
                  className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl"
                >
                  {service.title}{" "}
                  <span className="text-gold-gradient">
                    {service.offers.join(" & ").toLowerCase()}
                  </span>
                </h2>

                <ul
                  aria-label={`${service.title} services`}
                  className="mt-8 grid gap-4 sm:grid-cols-2"
                >
                  {service.offers.map((offer) => (
                    <li
                      key={offer}
                      className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-5"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent/15">
                        <Check
                          className="size-4 text-accent"
                          aria-hidden
                        />
                      </span>
                      <span className="font-display text-lg font-semibold tracking-tight">
                        {offer}
                      </span>
                    </li>
                  ))}
                </ul>

                {service.signs && (
                  <>
                    <h3 className="mt-12 font-display text-2xl font-semibold tracking-tight">
                      Common problems we can help with
                    </h3>
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {service.signs.map((sign) => (
                        <li
                          key={sign}
                          className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4 text-sm text-muted sm:text-base"
                        >
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-accent"
                            aria-hidden
                          />
                          {sign}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <p className="mt-10 max-w-2xl text-base leading-relaxed text-muted">
                  Flexible appointments, affordable prices and fast repairs,
                  with warranties on most of our services. Can&apos;t see what
                  you need? We do much more, so just ask.
                </p>
              </div>

              <aside className="lg:col-span-4">
                <div className="rounded-3xl border border-line bg-surface p-6 lg:sticky lg:top-28">
                  <h2 className="font-display text-lg font-semibold tracking-tight">
                    Other services
                  </h2>
                  <ul className="mt-4 flex flex-col gap-1">
                    {others.map((o) => (
                      <li key={o.slug}>
                        <Link
                          href={`/services/${o.slug}`}
                          className="group flex items-center justify-between gap-3 rounded-xl px-3 py-3 text-sm text-muted transition-colors hover:bg-white/5 hover:text-accent"
                        >
                          {o.title}
                          <ArrowUpRight
                            className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/services"
                    className="mt-4 inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border border-line px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent active:scale-95"
                  >
                    View all services
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </SectionBand>

      <SectionBand tone="base">
        <HowItWorks />
      </SectionBand>

      <CtaBand />
    </main>
  );
}
