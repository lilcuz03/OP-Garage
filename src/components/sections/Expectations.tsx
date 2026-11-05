"use client";

import { motion } from "motion/react";
import {
  CalendarCheck,
  Clock,
  MessageCircle,
  Phone,
  PhoneCall,
  ShieldCheck,
  Wallet,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/Sectionheading";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/* Shared side padding: keep identical in every section */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

/* Based on claims made on the owner's old website. */
const tiles: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: CalendarCheck,
    title: "Flexible appointments",
    text: "We work around your schedule with solutions tailored to your needs.",
  },
  {
    icon: Wallet,
    title: "Affordable prices",
    text: "Dependable service at a cost that suits your budget.",
  },
  {
    icon: Zap,
    title: "Fast repairs",
    text: "Prompt, efficient repairs so your property is secure again.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty on most services",
    text: "We stand behind the quality and reliability of our work.",
  },
  {
    icon: PhoneCall,
    title: "Emergency repairs",
    text: "Unexpected problem? We're just a call away.",
  },
  {
    icon: Clock,
    title: "Support available 24/7",
    text: "Our support and sales team is there to answer your questions.",
  },
];

export default function Expectations() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className={cn("w-full", gutter)}>
        <SectionHeading
          eyebrow="Every job"
          description="Whatever you need fixed or installed, this is what you can count on."
        >
          What you can <span className="text-gold-gradient">expect</span>
        </SectionHeading>

        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {tiles.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease }}
                whileHover={{ y: -6 }}
                className="group rounded-3xl border border-line bg-surface/60 p-6 backdrop-blur transition-colors duration-300 hover:border-accent/40 sm:p-7"
              >
                <div className="grid size-12 place-items-center rounded-2xl bg-accent/15 text-accent ring-1 ring-accent/20 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon
                    className="size-6"
                    aria-hidden
                  />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {t.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Closing prompt */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease }}
          className="mt-10 flex flex-col items-center justify-between gap-6 rounded-3xl border border-dashed border-line p-6 text-center sm:mt-14 sm:p-10 lg:flex-row lg:text-left"
        >
          <div className="max-w-xl">
            <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Not sure what you need?
            </h3>
            <p className="mt-2 text-sm text-muted sm:text-base">
              Tell us your problem, in person or over the phone, and we&apos;ll
              inspect it on-site. We do much more than what&apos;s listed here.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-accent-strong px-7 py-4 text-base font-semibold text-on-accent transition-all duration-300 hover:scale-[1.03] hover:bg-accent hover:shadow-[0_0_36px_-4px_rgba(245,197,24,0.6)] active:scale-95"
            >
              <MessageCircle
                className="size-5"
                aria-hidden
              />
              Chat on WhatsApp
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
        </motion.div>
      </div>
    </section>
  );
}
