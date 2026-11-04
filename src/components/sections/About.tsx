"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { Award, ShieldCheck, SlidersHorizontal, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/Sectionheading";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/* Shared side padding: keep identical in every section */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

/*
  CONFIRM THESE WITH THE OWNER before launch.
  Old site: "over seven years of experience" and "272+ client satisfaction".
  The old counters for years and team showed 0+, so they were never filled in.
*/
const stats = [
  { value: 7, suffix: "+", label: "Years experience" },
  { value: 272, suffix: "+", label: "Happy clients" },
  { value: 24, suffix: "/7", label: "Support" },
];

/* Wording is taken from the owner's old website. */
const values: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: ShieldCheck,
    title: "Reliable",
    text: "We are dependable and professional, delivering on our promises with the highest standards.",
  },
  {
    icon: Award,
    title: "Experienced",
    text: "With over seven years of experience, we expertly serve our clients.",
  },
  {
    icon: Sparkles,
    title: "High-quality",
    text: "Outstanding and premium service delivery that surpasses expectations.",
  },
  {
    icon: SlidersHorizontal,
    title: "Flexible",
    text: "We provide flexible solutions tailored to your needs. Your satisfaction is our priority.",
  },
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  /* A motion value updates the DOM directly, so no React state is set inside the effect.
     It starts at the real number so the server HTML (and search engines) see the true value. */
  const count = useMotionValue(to);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView || reduced) return;
    count.set(0);
    const controls = animate(count, to, { duration: 1.8, ease });
    return () => controls.stop();
  }, [inView, reduced, to, count]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 py-20 sm:py-28 lg:py-32"
    >
      <div className={cn("w-full", gutter)}>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left: message and numbers */}
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Why us"
              align="responsive"
              description="Dependable service, done properly, at a price that suits your budget."
            >
              Dependable service at a{" "}
              <span className="text-gold-gradient">budget-friendly</span> cost
            </SectionHeading>

            <motion.dl
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="mt-10 grid grid-cols-3 gap-3 sm:gap-4"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-line bg-surface/60 px-3 py-5 text-center backdrop-blur sm:px-4 sm:py-6"
                >
                  <dd className="font-display text-3xl font-semibold tracking-tight text-gold-gradient sm:text-4xl">
                    <Counter
                      to={s.value}
                      suffix={s.suffix}
                    />
                  </dd>
                  <dt className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-muted sm:text-xs">
                    {s.label}
                  </dt>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Right: values */}
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:col-span-7">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.article
                  key={v.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease }}
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
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                    {v.text}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
