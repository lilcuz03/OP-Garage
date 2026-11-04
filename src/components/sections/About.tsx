"use client";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  CalendarCheck,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Wallet,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { images, type ImageSlot } from "@/data/Images";
import { whatsappLink } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

/* Shared side padding: keep identical in Header.tsx and Footer.tsx */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

const values: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Fast repairs",
    text: "Gate stuck or garage door jammed? We get to the problem quickly.",
    icon: Zap,
  },
  {
    title: "Affordable prices",
    text: "Honest quotes with no nasty surprises.",
    icon: Wallet,
  },
  {
    title: "Flexible appointments",
    text: "We work around your schedule, with support available 24/7.",
    icon: CalendarCheck,
  },
  {
    title: "Warranty on most services",
    text: "Quality work we're happy to stand behind.",
    icon: ShieldCheck,
  },
];

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
      className={`relative overflow-hidden rounded-3xl border border-line bg-surface ${className}`}
    >
      {slot.src ? (
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          sizes="(min-width: 1024px) 25vw, 45vw"
          className="object-cover"
        />
      ) : (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted ${
            slot.placeholder ??
            "bg-gradient-to-br from-steel/40 via-surface to-accent/20"
          }`}
        >
          <Wrench
            className="size-8 text-accent"
            aria-hidden
          />
          <span className="px-2 text-center text-xs sm:text-sm">
            {slot.label ?? "Photo coming soon"}
          </span>
        </div>
      )}
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/4 size-96 rounded-full bg-steel/30 blur-3xl"
      />

      <div className={`relative w-full ${gutter}`}>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ───────── Photos ───────── */}
          <motion.div
            {...reveal}
            className="lg:col-span-5"
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Photo
                slot={images.aboutTeam}
                className="aspect-[3/4]"
              />
              <Photo
                slot={images.aboutVan}
                className="mt-8 aspect-[3/4] sm:mt-12"
              />
            </div>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-xs font-medium text-muted sm:text-sm">
              <MapPin
                className="size-4 text-accent"
                aria-hidden
              />
              Serving Durban, KwaZulu-Natal
            </div>
          </motion.div>

          {/* ───────── Copy ───────── */}
          <motion.div
            {...reveal}
            transition={{ duration: 0.7, ease, delay: 0.08 }}
            className="lg:col-span-7"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Who we are
            </p>
            <h2
              id="about-heading"
              className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
            >
              Opening doors,{" "}
              <span className="text-gold-gradient">securing futures</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              OP Garage &amp; Gate Repairs looks after the doors, gates and
              fences that keep your home safe. From garage doors and gate motors
              to electric fences, burglar guards, clearview fencing and
              carports, we handle both new installations and repairs.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Our skilled technicians focus on prompt, reliable work at fair
              prices, so a broken gate or stuck door never leaves your property
              exposed for long.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {values.map(({ title, text, icon: Icon }) => (
                <li
                  key={title}
                  className="group flex gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors duration-300 hover:border-accent/50 sm:p-5"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-background">
                    <Icon
                      className="size-[18px] text-accent"
                      aria-hidden
                    />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold tracking-tight">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-accent-strong px-7 py-4 text-base font-semibold text-on-accent transition-all duration-300 hover:scale-[1.03] hover:bg-accent active:scale-95"
            >
              <MessageCircle
                className="size-5"
                aria-hidden
              />
              Chat to us on WhatsApp
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
