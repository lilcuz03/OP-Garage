"use client";
import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

/* Shared side padding: keep identical in Header.tsx and Footer.tsx */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

/* From the Elfsight embed code */
const ELFSIGHT_APP_ID = "f59ff70d-f217-4e5d-a12e-3b4948abc597";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/CLWjHakPe8jSWuB57";

export default function Reviews() {
  const widgetRef = useRef<HTMLDivElement>(null);

  /* True once the widget area is within 400px of the screen */
  const nearViewport = useInView(widgetRef, {
    once: true,
    margin: "400px 0px",
  });

  /* Load Elfsight's script only when it is needed */
  useEffect(() => {
    if (!nearViewport) return;
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, [nearViewport]);

  return (
    <section
      aria-labelledby="reviews-heading"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 top-1/4 size-96 rounded-full bg-accent/10 blur-3xl"
      />

      <div className={`relative w-full ${gutter}`}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Customer reviews
          </p>
          <h2
            id="reviews-heading"
            className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
          >
            What our customers{" "}
            <span className="text-gold-gradient">say about us</span>
          </h2>
        </motion.div>

        {/* Elfsight Google Reviews widget. The min-height stops the page
            jumping while the widget loads. */}
        <div
          ref={widgetRef}
          className="mt-10 min-h-[320px]"
        >
          <div
            className={`elfsight-app-${ELFSIGHT_APP_ID}`}
            data-elfsight-app-lazy
          />
        </div>

        {/* Always visible, so there is still a way to leave a review
            if the widget is blocked or slow to load */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-accent-strong px-6 py-3.5 text-sm font-semibold text-on-accent transition-all duration-300 hover:scale-[1.03] hover:bg-accent active:scale-95"
          >
            Leave a Google review
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-line px-6 py-3.5 text-sm font-semibold transition-colors duration-300 hover:border-accent hover:text-accent active:scale-95"
          >
            See all reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
