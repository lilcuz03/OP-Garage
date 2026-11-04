import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import NotFoundDoor from "@/components/sections/NotFoundDoor";
import { nav, whatsappLink } from "@/lib/site";

/* Shared side padding: keep identical in Header.tsx and Footer.tsx */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      className={`relative flex min-h-[80svh] w-full flex-col items-center justify-center overflow-hidden pb-16 pt-32 text-center sm:pt-40 ${gutter}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/3 size-80 rounded-full bg-steel/30 blur-3xl"
      />

      <NotFoundDoor />

      <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Error 404
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
        This door&apos;s <span className="text-gold-gradient">stuck</span>
      </h1>
      <p className="mt-4 max-w-md text-base text-muted sm:text-lg">
        The page you&apos;re looking for has moved or doesn&apos;t exist.
        Let&apos;s get you back on track.
      </p>

      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Link
          href="/"
          className="group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-accent-strong px-7 py-4 text-base font-semibold text-on-accent transition-all duration-300 hover:scale-[1.03] hover:bg-accent active:scale-95"
        >
          <ArrowLeft
            className="size-5 transition-transform duration-300 group-hover:-translate-x-0.5"
            aria-hidden
          />
          Back to home
        </Link>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-line px-7 py-4 text-base font-semibold transition-colors duration-300 hover:border-accent hover:text-accent active:scale-95"
        >
          <MessageCircle
            className="size-5"
            aria-hidden
          />
          WhatsApp us
        </a>
      </div>

      <nav
        aria-label="Helpful pages"
        className="mt-10 flex flex-wrap items-center justify-center gap-2"
      >
        <span className="mr-1 text-sm text-muted">Or try:</span>
        {nav
          .filter((item) => item.href !== "/")
          .map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
      </nav>
    </main>
  );
}
