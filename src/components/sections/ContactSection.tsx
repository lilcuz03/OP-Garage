"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { services } from "@/data/Services";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/* Shared side padding: keep identical in every section */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

/* From the owner's old website */
const MAPS_LINK = "https://maps.app.goo.gl/CLWjHakPe8jSWuB57";

type Item = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

const items: Item[] = [
  { icon: Phone, label: "Call us", value: site.phone, href: site.phoneHref },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Message us anytime",
    href: whatsappLink(),
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Durban, KwaZulu-Natal",
    href: MAPS_LINK,
    external: true,
  },
  { icon: Clock, label: "Support", value: "Available 24/7" },
];

const inputCls =
  "mt-2 w-full rounded-xl border border-line bg-background/60 px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-accent [color-scheme:dark]";

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
} as const;

export default function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [area, setArea] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const lines = [`Hi ${site.name}, I'd like to get in touch.`, ""];
    lines.push(`*Name:* ${name.trim()}`);
    if (phone.trim()) lines.push(`*Phone:* ${phone.trim()}`);
    if (service) lines.push(`*Service:* ${service}`);
    if (area.trim()) lines.push(`*Suburb or area:* ${area.trim()}`);
    lines.push(`*Message:* ${message.trim()}`);
    window.open(
      whatsappLink(lines.join("\n")),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section className="relative py-16 sm:py-24">
      <div className={cn("w-full", gutter)}>
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Contact details */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {items.map((item, i) => {
              const Icon = item.icon;
              const inner = (
                <>
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent ring-1 ring-accent/20 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon
                      className="size-5"
                      aria-hidden
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                      {item.label}
                    </span>
                    <span className="mt-1 block break-words font-display text-base font-semibold tracking-tight sm:text-lg">
                      {item.value}
                    </span>
                  </span>
                  {item.href && (
                    <ArrowUpRight
                      className="size-5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden
                    />
                  )}
                </>
              );

              const cls =
                "group flex items-center gap-4 rounded-3xl border border-line bg-surface/60 p-5 backdrop-blur transition-colors duration-300 sm:p-6";

              return (
                <motion.div
                  key={item.label}
                  {...reveal}
                  transition={{ duration: 0.7, delay: i * 0.07, ease }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      {...(item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={cn(cls, "hover:border-accent/50")}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Form */}
          <motion.div
            {...reveal}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-line bg-surface/60 p-6 backdrop-blur sm:p-8 lg:p-10"
            >
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Send us a <span className="text-gold-gradient">message</span>
              </h2>
              <p className="mt-2 text-sm text-muted sm:text-base">
                Fill this in and it opens WhatsApp with your message ready to
                send. Nothing is sent until you press send there.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-medium text-muted">
                    Your name <span className="text-accent">*</span>
                  </span>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    placeholder="Your name"
                    className={inputCls}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-muted">
                    Phone (optional)
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    placeholder="Your phone number"
                    className={inputCls}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-muted">
                    Service
                  </span>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={inputCls}
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option
                        key={s.id}
                        value={s.title}
                      >
                        {s.title}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-muted">
                    Suburb or area
                  </span>
                  <input
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    autoComplete="address-level2"
                    placeholder="Your suburb or area"
                    className={inputCls}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-medium text-muted">
                    How can we help? <span className="text-accent">*</span>
                  </span>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="E.g. my gate motor clicks but won't open"
                    className={cn(inputCls, "resize-none")}
                  />
                </label>
              </div>

              <button
                type="submit"
                className="mt-7 inline-flex w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-accent-strong px-7 py-4 text-base font-semibold text-on-accent transition-all duration-300 hover:scale-[1.02] hover:bg-accent hover:shadow-[0_0_36px_-4px_rgba(245,197,24,0.6)] active:scale-95 sm:w-auto"
              >
                <Send
                  className="size-5"
                  aria-hidden
                />
                Send on WhatsApp
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
