"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import ImageSlot from "@/components/ui/ImagesSlot";
import type { ImageSlotData } from "@/data/Images";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/* Shared side padding: keep identical in every section */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

export default function PageHero({
  title,
  highlight,
  description,
  crumb,
  image,
}: {
  title: string;
  /** Optional words shown in gold after the title */
  highlight?: string;
  description?: string;
  /** Name shown in the breadcrumb, e.g. "About" */
  crumb: string;
  /** Banner photo slot from src/data/images.ts */
  image?: ImageSlotData;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line pb-14 pt-32 sm:pb-20 sm:pt-44">
      {/* Banner photo or colored placeholder */}
      {image && (
        <>
          <ImageSlot
            image={image}
            sizes="100vw"
            priority
            variant="bare"
            className="absolute inset-0 -z-30"
          />
          {/* Dark green fade keeps the title readable on any photo */}
          <div
            aria-hidden
            className="absolute inset-0 -z-20"
            style={{
              background:
                "linear-gradient(to bottom, rgba(6,36,27,0.65) 0%, rgba(6,36,27,0.82) 55%, rgba(6,36,27,1) 100%)",
            }}
          />
        </>
      )}

      {/* Glow and grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 70% at 85% 0%, rgba(245,197,24,0.12), transparent 60%), radial-gradient(50% 60% at 0% 100%, rgba(28,107,82,0.4), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at 50% 0%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 0%, black 20%, transparent 75%)",
        }}
      />

      <div className={cn("w-full", gutter)}>
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-4xl lg:text-left">
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <ol className="inline-flex items-center gap-2 rounded-full border border-line bg-background/50 px-4 py-1.5 text-xs font-medium text-muted backdrop-blur">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-accent"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3" />
              </li>
              <li
                aria-current="page"
                className="text-foreground"
              >
                {crumb}
              </li>
            </ol>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mt-6 font-display text-[clamp(2.2rem,5.4vw,4.5rem)] font-semibold leading-[1.05] tracking-tight"
          >
            {title}
            {highlight && (
              <>
                {" "}
                <span className="text-gold-gradient">{highlight}</span>
              </>
            )}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease }}
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg lg:mx-0"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
