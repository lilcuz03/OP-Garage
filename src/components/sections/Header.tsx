"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { nav, site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/* Shared side padding: keep identical in Header.tsx and Footer.tsx */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      aria-label={`${site.name} home`}
    >
      <Image
        src="/logo.png"
        alt={`${site.name} logo`}
        width={40}
        height={40}
        priority
        className="size-10 shrink-0 rounded-xl"
      />
      <span className="hidden whitespace-nowrap font-display text-[15px] font-semibold tracking-tight sm:inline">
        Garage &amp; Gate{" "}
        <span className="font-normal text-muted">Repairs</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    setHidden(latest > prev && latest > 200 && !open);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* Gold scroll progress line */}
      <motion.div
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
      />

      <motion.header
        animate={{ y: hidden ? "-120%" : 0 }}
        transition={{ duration: 0.35, ease }}
        className={cn("fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4", gutter)}
      >
        <div
          className={cn(
            "flex w-full items-center justify-between gap-3 rounded-full border py-2 pl-2.5 pr-2.5 transition-all duration-500 sm:pl-3 sm:pr-3",
            scrolled
              ? "border-line bg-background/70 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <Logo />

          <nav
            aria-label="Main"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onMouseEnter={() => setHovered(item.href)}
                className={cn(
                  "relative whitespace-nowrap px-4 py-2 text-sm transition-colors hover:text-foreground",
                  isActive(item.href) ? "text-foreground" : "text-muted",
                )}
              >
                {hovered === item.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.07]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 whitespace-nowrap px-3 text-sm text-muted transition-colors hover:text-accent xl:flex"
            >
              <Phone
                className="size-4"
                aria-hidden
              />
              {site.phone}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap rounded-full bg-accent-strong px-5 py-2.5 text-sm font-semibold text-on-accent transition-all duration-300 hover:scale-[1.04] hover:bg-accent hover:shadow-[0_0_30px_-4px_rgba(245,197,24,0.6)] active:scale-95"
            >
              Get a quote
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid size-10 shrink-0 place-items-center rounded-full border border-line lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.6, ease }}
            className={cn(
              "fixed inset-0 z-40 flex flex-col justify-center bg-background lg:hidden",
              gutter,
            )}
          >
            <nav
              aria-label="Mobile"
              className="flex flex-col gap-2"
            >
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.5, ease }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "block py-2 font-display text-4xl font-semibold tracking-tight transition-colors hover:text-accent",
                      isActive(item.href) && "text-accent",
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-10 text-sm text-accent"
            >
              {site.tagline}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
