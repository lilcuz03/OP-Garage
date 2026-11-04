"use client";

import Image from "next/image";
import type { PointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { services, type Service } from "@/data/Services";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/* Shared side padding: keep identical in every section */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

/* Colored stand-in shown until a real photo is added in services.ts */
function Placeholder({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/80"
      style={{ background: service.placeholder }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <Icon
        className="relative size-12 opacity-60 sm:size-16"
        aria-hidden
      />
      <span className="relative text-[11px] font-medium uppercase tracking-[0.2em] opacity-70">
        Photo coming soon
      </span>
    </div>
  );
}

function ServiceCard({
  service,
  index,
  featured,
}: {
  service: Service;
  index: number;
  featured: boolean;
}) {
  const Icon = service.icon;

  /* Spotlight that follows the cursor inside the card */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(340px circle at ${mx}px ${my}px, rgba(245,197,24,0.14), transparent 70%)`;
  const edge = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, rgba(245,197,24,0.85), transparent 70%)`;

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease }}
      onPointerMove={onMove}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-line bg-surface/60 p-3 backdrop-blur sm:p-4",
        featured ? "lg:col-span-6" : "lg:col-span-3",
      )}
    >
      {/* Soft glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glow }}
      />
      {/* Glowing edge */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-3xl p-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: edge,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div className="relative flex h-full flex-col">
        {/* Media */}
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl",
            featured ? "aspect-[16/10] lg:aspect-[16/9]" : "aspect-[4/3]",
          )}
        >
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
            {service.image ? (
              <Image
                src={service.image}
                alt={
                  service.imageAlt ??
                  `${service.title} by OP Garage & Gate Repairs`
                }
                fill
                sizes={
                  featured
                    ? "(min-width: 640px) 50vw, 100vw"
                    : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                }
                className="object-cover"
              />
            ) : (
              <Placeholder service={service} />
            )}
          </div>

          {/* Dark green fade so overlaid text stays readable on any photo */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(6,36,27,0.7), rgba(6,36,27,0) 55%)",
            }}
          />

          <div className="absolute left-3 top-3 grid size-10 place-items-center rounded-xl bg-background/70 text-accent ring-1 ring-white/10 backdrop-blur-md transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
            <Icon
              className="size-5"
              aria-hidden
            />
          </div>
          <span className="absolute right-4 top-4 font-display text-sm font-semibold text-white/70">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col px-2 pb-2 pt-5 sm:px-3 sm:pb-3">
          <h3
            className={cn(
              "font-display text-xl font-semibold tracking-tight sm:text-2xl",
              featured && "lg:text-3xl",
            )}
          >
            {service.title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            {service.description}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs font-medium text-foreground/80"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6">
            <a
              href={whatsappLink(
                `Hi OP Garage & Gate Repairs, I'd like a quote for: ${service.title}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all duration-300 group-hover:gap-2.5"
            >
              Get a quote
              <ArrowUpRight
                className="size-4"
                aria-hidden
              />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 py-20 sm:py-28 lg:py-32"
    >
      <div className={cn("w-full", gutter)}>
        {/* Heading */}
        <div className="flex flex-col items-center gap-5 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease }}
            className="max-w-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Our services
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              What we can fix{" "}
              <span className="text-gold-gradient">and install</span> for you
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="max-w-md text-base leading-relaxed text-muted sm:text-lg"
          >
            From garage doors and gate motors to electric fences and carports,
            we handle new installations and repairs.
          </motion.p>
        </div>

        {/* Cards: two large on top, four smaller below on desktop */}
        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              featured={i < 2}
            />
          ))}
        </div>

        {/* Bottom prompt */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease }}
          className="mt-8 flex flex-col items-center justify-between gap-5 rounded-3xl border border-dashed border-line p-6 text-center sm:mt-10 sm:flex-row sm:p-8 sm:text-left"
        >
          <div>
            <p className="font-display text-lg font-semibold tracking-tight sm:text-xl">
              Can&apos;t see what you need? We do much more.
            </p>
            <p className="mt-1 text-sm text-muted sm:text-base">
              Tell us your problem in person or over the phone, and we&apos;ll
              take it from there.
            </p>
          </div>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-accent-strong px-7 py-3.5 text-sm font-semibold text-on-accent transition-all duration-300 hover:scale-[1.03] hover:bg-accent hover:shadow-[0_0_36px_-4px_rgba(245,197,24,0.6)] active:scale-95 sm:w-auto"
          >
            <MessageCircle
              className="size-5"
              aria-hidden
            />
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
