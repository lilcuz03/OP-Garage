"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Check, MessageCircle, Wrench } from "lucide-react";
import { serviceDetails } from "@/data/serviceDetails";
import type { ImageSlot } from "@/data/Images";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/* Shared side padding: keep identical in Header.tsx and Footer.tsx */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

/* WhatsApp number in international format, taken from site.phoneHref */
const WA_NUMBER = site.phoneHref.replace(/\D/g, "");

function quoteLink(service: string) {
  const text = `Hi ${site.name}, I'd like a quote for: ${service}.`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease },
} as const;

function Photo({
  slot,
  className = "",
}: {
  slot: ImageSlot;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-background",
        className,
      )}
    >
      {slot.src ? (
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover"
        />
      ) : (
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted",
            slot.placeholder ??
              "bg-gradient-to-br from-steel/40 via-surface to-accent/20",
          )}
        >
          <Wrench
            className="size-9 text-accent"
            aria-hidden
          />
          <span className="px-2 text-center text-sm">
            {slot.label ?? "Photo coming soon"}
          </span>
        </div>
      )}
    </div>
  );
}

export default function ServiceDetails() {
  return (
    <section
      id="service-details"
      aria-labelledby="service-details-heading"
      className="relative overflow-hidden py-16 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-24 size-96 rounded-full bg-accent/10 blur-3xl"
      />

      <div className={`relative w-full ${gutter}`}>
        <motion.div
          {...reveal}
          className="max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            What we do
          </p>
          <h2
            id="service-details-heading"
            className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
          >
            Everything we{" "}
            <span className="text-gold-gradient">install and repair</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
            From garage doors to carports, here&apos;s what each service covers.
            Can&apos;t see what you need? We do much more, so just ask.
          </p>
        </motion.div>

        {/* Quick links to each service page */}
        <nav
          aria-label="Services"
          className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {serviceDetails.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="shrink-0 whitespace-nowrap rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {s.title}
            </Link>
          ))}
        </nav>

        <div className="mt-10 flex flex-col gap-6 sm:gap-8">
          {serviceDetails.map((s, i) => (
            <motion.article
              key={s.slug}
              id={s.slug}
              {...reveal}
              className="grid scroll-mt-28 items-center gap-6 rounded-3xl border border-line bg-surface p-4 sm:gap-8 sm:p-6 lg:grid-cols-12 lg:gap-12 lg:p-8"
            >
              <div
                className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-last")}
              >
                <Photo
                  slot={s.image}
                  className="aspect-[4/3]"
                />
              </div>

              <div className="lg:col-span-7">
                <p className="font-display text-sm font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
                  {s.intro}
                </p>

                <ul
                  aria-label={`${s.title} services`}
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {s.offers.map((o) => (
                    <li
                      key={o}
                      className="rounded-full border border-line bg-background px-3.5 py-1.5 text-xs font-medium"
                    >
                      {o}
                    </li>
                  ))}
                </ul>

                {s.signs && (
                  <>
                    <h4 className="mt-6 text-sm font-semibold">
                      Common problems we can help with
                    </h4>
                    <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                      {s.signs.map((sign) => (
                        <li
                          key={sign}
                          className="flex items-start gap-2.5 text-sm text-muted"
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

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={quoteLink(s.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-accent-strong px-6 py-3.5 text-sm font-semibold text-on-accent transition-all duration-300 hover:scale-[1.03] hover:bg-accent active:scale-95 sm:w-auto"
                  >
                    <MessageCircle
                      className="size-4"
                      aria-hidden
                    />
                    Get a quote for {s.title.toLowerCase()}
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </a>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border border-line px-6 py-3.5 text-sm font-semibold transition-colors duration-300 hover:border-accent hover:text-accent active:scale-95 sm:w-auto"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
