"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Camera, ChevronRight } from "lucide-react";
import type { ImageSlot } from "@/data/Images";
import { cn } from "@/lib/utils";

export type { ImageSlot };

const ease = [0.22, 1, 0.36, 1] as const;

/* Shared side padding: keep identical in Header.tsx and Footer.tsx */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

/* Door-slat pattern, same look as the 404 page */
const slats =
  "repeating-linear-gradient(to bottom, rgba(255,255,255,0.05) 0 2px, transparent 2px 36px)";

/* A placeholder is treated as a CSS value if it looks like one (colour or gradient),
   otherwise it is applied as Tailwind classes. */
const CSS_VALUE =
  /^(#|rgb|hsl|oklch|linear-gradient|radial-gradient|conic-gradient|var\()/i;

type PageHeroProps = {
  crumb: string;
  title: string;
  highlight?: string;
  description: string;
  image: ImageSlot | string | null;
  children?: React.ReactNode;
};

export default function PageHero({
  crumb,
  title,
  highlight,
  description,
  image,
  children,
}: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  const slot: ImageSlot | null =
    typeof image === "string" ? { src: image, alt: "" } : image;
  const src = slot?.src;
  const ph = slot?.placeholder?.trim();
  const phIsCss = !!ph && CSS_VALUE.test(ph);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[58svh] items-end overflow-hidden pb-12 pt-36 sm:min-h-[62svh] sm:pb-16 sm:pt-44"
    >
      {/* Background image (parallax) or branded placeholder */}
      <motion.div
        style={{ y: reduce ? 0 : y }}
        className="absolute inset-x-0 -top-[10%] -z-10 h-[120%]"
      >
        {src ? (
          <Image
            src={src}
            alt={slot?.alt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <>
            <div
              aria-hidden
              className={cn(
                "absolute inset-0",
                !ph &&
                  "bg-gradient-to-br from-steel/50 via-surface to-accent/20",
                ph && !phIsCss && ph,
              )}
              style={phIsCss ? { background: ph } : undefined}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ backgroundImage: slats }}
            />
          </>
        )}
      </motion.div>

      {/* Readability overlays */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/70 to-background/40"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-background/80 via-transparent to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/3 -z-10 size-80 rounded-full bg-accent/15 blur-3xl"
      />

      {/* Placeholder label (only while there is no photo) */}
      {!src && (
        <span className="absolute bottom-5 right-4 hidden items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1.5 text-xs text-muted backdrop-blur-xl sm:inline-flex lg:right-10">
          <Camera
            className="size-3.5 text-accent"
            aria-hidden
          />
          {slot?.label ?? "Photo coming soon"}
        </span>
      )}

      <div className={`relative w-full ${gutter}`}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="max-w-3xl"
        >
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-xs text-muted sm:text-sm">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-accent"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3.5" />
              </li>
              <li
                aria-current="page"
                className="font-medium text-foreground"
              >
                {crumb}
              </li>
            </ol>
          </nav>

          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            {title}{" "}
            {highlight && (
              <span className="text-gold-gradient">{highlight}</span>
            )}
          </h1>

          <p className="mt-5 max-w-2xl text-base text-muted sm:text-lg">
            {description}
          </p>

          {children && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {children}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
