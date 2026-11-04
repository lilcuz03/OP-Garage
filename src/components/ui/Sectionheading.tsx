"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export default function SectionHeading({
  eyebrow,
  children,
  description,
  align = "center",
  className,
}: {
  eyebrow: string;
  children: ReactNode;
  description?: string;
  /** "center" always centers. "responsive" centers on phones and left-aligns from lg up. */
  align?: "center" | "responsive";
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease }}
      className={cn(
        "max-w-2xl",
        align === "center"
          ? "mx-auto text-center"
          : "mx-auto text-center lg:mx-0 lg:text-left",
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
        {children}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}

