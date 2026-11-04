"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import {
  ArrowUpRight,
  CalendarCheck,
  MessageCircle,
  Phone,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { images } from "@/data/Images";
import { site, whatsappLink } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

/* Shared side padding: keep identical in Header.tsx and Footer.tsx */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

const steps: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Tell us your problem",
    text: "Message or call us and describe what's wrong with your garage door, gate motor or fence. Support is available 24/7.",
    icon: MessageCircle,
  },
  {
    title: "We inspect it on-site",
    text: "A technician comes out and carefully inspects the problem so we know exactly what needs fixing. Appointments are flexible.",
    icon: CalendarCheck,
  },
  {
    title: "We get it fixed",
    text: "Once we know what's wrong, we repair or install it so your property is secure again.",
    icon: Wrench,
  },
  {
    title: "Backed by a warranty",
    text: "We offer warranties on the vast majority of our services, so you can have peace of mind.",
    icon: ShieldCheck,
  },
];

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease },
} as const;

export default function HowItWorks() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const photo = images.process;

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 size-96 rounded-full bg-accent/10 blur-3xl"
      />

      <div className={`relative w-full ${gutter}`}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ───────── Intro (sticky on desktop) ───────── */}
          <motion.div
            {...reveal}
            className="lg:col-span-5"
          >
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                How it works
              </p>
              <h2
                id="process-heading"
                className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
              >
                From <span className="text-gold-gradient">first message</span>{" "}
                to fixed, in four steps
              </h2>
              <p className="mt-4 max-w-md text-base text-muted sm:text-lg">
                No complicated process. Reach out, get a quote, and we sort the
                rest.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
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
                  Get a quote
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

              {/* Photo / placeholder (from images.process) */}
              <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-surface sm:block">
                {photo.src ? (
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted ${
                      photo.placeholder ??
                      "bg-gradient-to-br from-steel/40 via-surface to-accent/20"
                    }`}
                  >
                    <Wrench
                      className="size-10 text-accent"
                      aria-hidden
                    />
                    <span className="text-sm">
                      {photo.label ?? "Photo coming soon"}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-line bg-surface/90 px-3 py-1.5 text-xs font-medium backdrop-blur-xl">
                    Support 24/7
                  </span>
                  <span className="rounded-full border border-line bg-surface/90 px-3 py-1.5 text-xs font-medium backdrop-blur-xl">
                    Warranty on most services
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ───────── Steps timeline ───────── */}
          <div className="lg:col-span-7">
            <ol
              ref={listRef}
              className="relative flex flex-col gap-6 sm:gap-8"
            >
              {/* Track + animated fill */}
              <span
                aria-hidden
                className="absolute bottom-5 left-5 top-5 w-px -translate-x-1/2 bg-line"
              />
              <motion.span
                aria-hidden
                style={{ scaleY: reduceMotion ? 1 : progress }}
                className="absolute bottom-5 left-5 top-5 w-px origin-top -translate-x-1/2 bg-accent"
              />

              {steps.map(({ title, text, icon: Icon }, i) => (
                <motion.li
                  key={title}
                  {...reveal}
                  transition={{ duration: 0.7, ease, delay: i * 0.05 }}
                  className="relative pl-16"
                >
                  <span className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full border border-line bg-surface">
                    <Icon
                      className="size-[18px] text-accent"
                      aria-hidden
                    />
                  </span>

                  <div className="group rounded-3xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-accent/50 sm:p-7">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                        {title}
                      </h3>
                      <span
                        aria-hidden
                        className="font-display text-3xl font-bold text-foreground/10 transition-colors duration-300 group-hover:text-accent/40 sm:text-4xl"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                      {text}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
