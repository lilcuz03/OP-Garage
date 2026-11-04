"use client";
import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/Services";
import { site, whatsappLink } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

/* Shared side padding: keep identical in Header.tsx and Footer.tsx */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

/* WhatsApp number in international format, taken from site.phoneHref */
const WA_NUMBER = site.phoneHref.replace(/\D/g, "");

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease },
} as const;

/* text-base keeps iOS from zooming into the field */
const field =
  "w-full rounded-2xl border border-line bg-background px-4 py-3.5 text-base text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/30";

type InfoItem = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

const info: InfoItem[] = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Message us for a quote",
    href: whatsappLink(),
    external: true,
  },
  {
    icon: Phone,
    label: "Call us",
    value: site.phone,
    href: site.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "Durban, KwaZulu-Natal",
  },
  {
    icon: Clock,
    label: "Support",
    value: "Available 24/7",
  },
];

function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 flex items-baseline justify-between text-sm font-medium"
      >
        {label}
        {optional && (
          <span className="text-xs font-normal text-muted">Optional</span>
        )}
      </label>
      {children}
    </div>
  );
}

export default function ContactSection() {
  const [opened, setOpened] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const lines = [
      `Hi ${site.name}, I'd like a quote.`,
      "",
      `Name: ${get("name")}`,
      `Service: ${get("service")}`,
    ];
    if (get("suburb")) lines.push(`Suburb: ${get("suburb")}`);
    if (get("details")) lines.push(`Details: ${get("details")}`);

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpened(true);
  }

  return (
    <section
      id="quote"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 top-1/4 size-96 rounded-full bg-accent/10 blur-3xl"
      />

      <div className={`relative w-full ${gutter}`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* ───────── Contact details ───────── */}
          <motion.div
            {...reveal}
            className="lg:col-span-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Get in touch
            </p>
            <h2
              id="contact-heading"
              className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl"
            >
              Tell us what&apos;s{" "}
              <span className="text-gold-gradient">giving you trouble</span>
            </h2>
            <p className="mt-4 max-w-md text-base text-muted sm:text-lg">
              Message us, call us or fill in the form. Flexible appointments,
              affordable prices and fast repairs.
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {info.map(({ icon: Icon, label, value, href, external }) => {
                const content = (
                  <>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-background">
                      <Icon
                        className="size-5 text-accent"
                        aria-hidden
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-[0.14em] text-muted">
                        {label}
                      </span>
                      <span className="mt-0.5 block break-words text-base font-medium">
                        {value}
                      </span>
                    </span>
                  </>
                );

                const base =
                  "flex items-center gap-4 rounded-2xl border border-line bg-surface p-4";

                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className={`${base} transition-colors duration-300 hover:border-accent/50`}
                      >
                        {content}
                      </a>
                    ) : (
                      <div className={base}>{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* ───────── Quote form ───────── */}
          <motion.div
            {...reveal}
            transition={{ duration: 0.7, ease, delay: 0.08 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-line bg-surface p-5 sm:p-8"
            >
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                Request a quote
              </h3>
              <p className="mt-2 text-sm text-muted sm:text-base">
                Fill this in and we&apos;ll open WhatsApp with your details
                ready to send.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field
                  label="Your name"
                  htmlFor="name"
                >
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="e.g. Sipho"
                    className={field}
                  />
                </Field>

                <Field
                  label="Service needed"
                  htmlFor="service"
                >
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      required
                      defaultValue=""
                      className={`${field} cursor-pointer appearance-none pr-11`}
                    >
                      <option
                        value=""
                        disabled
                      >
                        Select a service
                      </option>
                      {services.map((s) => (
                        <option
                          key={s.id}
                          value={s.title}
                        >
                          {s.title}
                        </option>
                      ))}
                      <option value="Something else">Something else</option>
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted"
                      aria-hidden
                    />
                  </div>
                </Field>

                <div className="sm:col-span-2">
                  <Field
                    label="Suburb or area"
                    htmlFor="suburb"
                    optional
                  >
                    <input
                      id="suburb"
                      name="suburb"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="e.g. Umhlanga"
                      className={field}
                    />
                  </Field>
                </div>

                <div className="sm:col-span-2">
                  <Field
                    label="What's the problem?"
                    htmlFor="details"
                    optional
                  >
                    <textarea
                      id="details"
                      name="details"
                      rows={4}
                      placeholder="e.g. My gate motor hums but the gate won't open."
                      className={`${field} resize-y`}
                    />
                  </Field>
                </div>
              </div>

              <button
                type="submit"
                className="group mt-6 inline-flex w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-accent-strong px-7 py-4 text-base font-semibold text-on-accent transition-all duration-300 hover:scale-[1.02] hover:bg-accent active:scale-95 sm:w-auto"
              >
                <Send
                  className="size-5"
                  aria-hidden
                />
                Send on WhatsApp
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </button>

              <p
                aria-live="polite"
                className="mt-4 text-sm text-muted"
              >
                {opened
                  ? "WhatsApp should have opened. Just press send to reach us. If nothing happened, tap the WhatsApp card above."
                  : "Nothing is stored on this website. Your details only go to us via WhatsApp."}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
