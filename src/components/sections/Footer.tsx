"use client";
import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowUp,
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";
import SectionBand from "@/components/ui/Sectionband";
import { serviceDetails } from "@/data/serviceDetails";
import { nav, site, whatsappLink } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

/* Shared side padding: keep identical in Header.tsx and Footer.tsx */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

/* From the old site's geo meta tags and map link. Confirm with the owner. */
const MAP_COORDS = { lat: -29.9118637, lng: 30.8598374 };
const MAP_EMBED = `https://maps.google.com/maps?q=${MAP_COORDS.lat},${MAP_COORDS.lng}&z=15&output=embed`;
const MAPS_LINK = "https://maps.app.goo.gl/CLWjHakPe8jSWuB57";
const DIRECTIONS_LINK = `https://www.google.com/maps/dir/?api=1&destination=${MAP_COORDS.lat},${MAP_COORDS.lng}`;

const legal = [
  { label: "Legal Notice", href: "/legal-notice" },
  { label: "Privacy Policy", href: "/privacy" },
];

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease },
} as const;

/* Current year without calling new Date() during prerender */
const subscribe = () => () => {};
const getClientYear = () => new Date().getFullYear();
const getServerYear = () => 2026;

function useCurrentYear() {
  return useSyncExternalStore(subscribe, getClientYear, getServerYear);
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className =
    "group inline-flex items-center text-sm text-muted transition-colors duration-300 hover:text-accent";
  const content = (
    <span className="relative">
      {children}
      <span
        aria-hidden
        className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
      />
    </span>
  );

  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {content}
    </a>
  ) : (
    <Link
      href={href}
      className={className}
    >
      {content}
    </Link>
  );
}

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-foreground/60">
      {children}
    </h3>
  );
}

export default function Footer() {
  const year = useCurrentYear();

  return (
    <footer
      id="contact"
      className="relative scroll-mt-24 overflow-hidden"
    >
      {/* ───────── Map ───────── */}
      <motion.div
        {...reveal}
        className={`w-full pt-12 sm:pt-20 ${gutter}`}
      >
        <div className="group relative">
          <div className="relative h-[300px] overflow-hidden rounded-3xl border border-line sm:h-[400px] lg:h-[480px] xl:h-[540px]">
            <iframe
              src={MAP_EMBED}
              title={`Map showing the location of ${site.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 size-full border-0 transition-[filter] duration-700 [filter:grayscale(1)_invert(0.92)_contrast(0.9)] group-hover:[filter:none]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-brand/40 mix-blend-color transition-opacity duration-700 group-hover:opacity-0"
            />
          </div>

          {/* Info card: under the map on phones, floating over it from sm up */}
          <div className="mt-3 rounded-2xl border border-line bg-surface/90 p-4 backdrop-blur-xl sm:absolute sm:bottom-5 sm:left-5 sm:mt-0 sm:w-80 sm:p-5">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              <MapPin
                className="size-3.5"
                aria-hidden
              />
              Find us
            </p>
            <p className="mt-2 font-display text-lg font-semibold tracking-tight">
              Durban, KwaZulu-Natal
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-accent-strong px-4 py-2 text-xs font-semibold text-on-accent transition-colors hover:bg-accent"
              >
                Open in Maps
                <ArrowUpRight
                  className="size-3.5"
                  aria-hidden
                />
              </a>
              <a
                href={DIRECTIONS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line px-4 py-2 text-xs font-semibold transition-colors hover:border-accent hover:text-accent"
              >
                <Navigation
                  className="size-3.5"
                  aria-hidden
                />
                Directions
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ───────── Link columns ───────── */}
      <div className={`w-full pt-14 sm:pt-20 ${gutter}`}>
        <motion.div
          {...reveal}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8"
        >
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              href="/"
              className="inline-flex"
              aria-label={`${site.name} home`}
            >
              <Image
                src="/logo.png"
                alt={`${site.name} logo`}
                width={56}
                height={56}
                className="size-14 rounded-2xl"
              />
            </Link>
            <p className="mt-5 font-display text-xl font-semibold tracking-tight">
              {site.tagline}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Garage door, gate motor and electric fence repairs and
              installations, with flexible appointments and warranties on most
              services.
            </p>
          </div>

          {/* Explore */}
          <nav
            aria-label="Explore"
            className="lg:col-span-2"
          >
            <ColumnTitle>Explore</ColumnTitle>
            <ul className="flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav
            aria-label="Services"
            className="lg:col-span-3"
          >
            <ColumnTitle>Services</ColumnTitle>
            <ul className="flex flex-col gap-3">
              {serviceDetails.map((s) => (
                <li key={s.slug}>
                  <FooterLink href={`/services/${s.slug}`}>
                    {s.title}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <ColumnTitle>Contact</ColumnTitle>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-3 text-muted transition-colors hover:text-accent"
                >
                  <Phone
                    className="size-4 shrink-0 text-accent"
                    aria-hidden
                  />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted transition-colors hover:text-accent"
                >
                  <MessageCircle
                    className="size-4 shrink-0 text-accent"
                    aria-hidden
                  />
                  WhatsApp us
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-start gap-3 break-all text-muted transition-colors hover:text-accent"
                >
                  <Mail
                    className="mt-0.5 size-4 shrink-0 text-accent"
                    aria-hidden
                  />
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted">
                <MapPin
                  className="size-4 shrink-0 text-accent"
                  aria-hidden
                />
                Durban, KwaZulu-Natal
              </li>
              <li className="flex items-center gap-3 text-muted">
                <Clock
                  className="size-4 shrink-0 text-accent"
                  aria-hidden
                />
                Support available 24/7
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* ───────── Giant wordmark ───────── */}
      <div
        aria-hidden
        className={`mt-14 w-full select-none overflow-hidden sm:mt-20 ${gutter}`}
      >
        <motion.p
          initial={{ y: "45%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, ease }}
          className="whitespace-nowrap pb-1 text-center font-display font-bold uppercase leading-[0.9] tracking-tighter text-[clamp(1.5rem,7.6vw,14rem)]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          OP Garage &amp; Gate
        </motion.p>
      </div>

      {/* ───────── Bottom bar ───────── */}
      <div className="border-t border-line">
        <div
          className={`flex w-full flex-col items-center gap-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center sm:flex-row sm:justify-between sm:text-left ${gutter}`}
        >
          <div className="flex flex-col items-center gap-1.5 sm:items-start">
            <p className="text-xs text-muted">
              &copy; {year} {site.name}. All rights reserved.
            </p>
            <p className="text-xs text-muted">
              Developed by{" "}
              <a
                href="https://tafadzwa.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative font-semibold text-foreground transition-colors duration-300 hover:text-accent"
              >
                taachii
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
                />
              </a>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {legal.map((l) => (
              <FooterLink
                key={l.href}
                href={l.href}
              >
                <span className="text-xs">{l.label}</span>
              </FooterLink>
            ))}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent"
            >
              Back to top
              <ArrowUp
                className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
