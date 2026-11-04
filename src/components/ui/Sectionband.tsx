"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

type Tone = "base" | "deep";

/*
  base = the page colour
  deep = a darker green, so the cards (bg-surface) inside it stand out more
  Alternate the two down the page so every section reads as its own block.
*/
const tones: Record<Tone, string> = {
  base: "bg-background",
  deep: "bg-[#041510]",
};

/* Hairline across the full width, with a gold "gate" that slides open in the middle */
function GateDivider() {
  const reduced = useReducedMotion();
  const open = reduced ? 28 : 0;

  const seg = (side: "left" | "right") => ({
    initial: reduced ? false : { x: 0, opacity: 0 },
    whileInView: { x: side === "left" ? -28 : 28, opacity: 1 },
    viewport: { once: true, margin: "0px" },
    transition: { duration: 1, ease },
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-10"
    >
      {/* full-width hairline */}
      <div className="h-px w-full bg-white/10" />

      {/* gate: two gold bars that part, with a diamond appearing in the gap */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex items-center justify-center">
          <motion.span
            {...seg("left")}
            style={reduced ? { x: -open } : undefined}
            className="absolute right-0 h-0.5 w-24 bg-gradient-to-r from-transparent to-accent sm:w-40"
          />
          <motion.span
            {...seg("right")}
            style={reduced ? { x: open } : undefined}
            className="absolute left-0 h-0.5 w-24 bg-gradient-to-l from-transparent to-accent sm:w-40"
          />
          <motion.span
            initial={reduced ? false : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="size-2 rotate-45 bg-accent"
          />
        </div>
      </div>
    </div>
  );
}

export default function SectionBand({
  tone = "base",
  divider = true,
  className,
  children,
}: {
  tone?: Tone;
  /** Show the gate divider on the top edge. Turn off when the band above is a different colour block. */
  divider?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("relative", tones[tone], className)}>
      {divider && <GateDivider />}
      {children}
    </div>
  );
}
