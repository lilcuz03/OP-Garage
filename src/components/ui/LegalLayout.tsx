import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SectionBand from "@/components/ui/Sectionband";

/* Shared side padding: keep identical in Header.tsx and Footer.tsx */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

export type LegalSectionData = {
  id: string;
  title: string;
  content: ReactNode;
};

export default function LegalLayout({
  crumb,
  title,
  intro,
  updated,
  sections,
}: {
  crumb: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSectionData[];
}) {
  return (
    <main>
      <header
        className={`relative overflow-hidden pb-12 pt-36 sm:pb-16 sm:pt-44 ${gutter}`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/3 size-80 rounded-full bg-accent/10 blur-3xl"
        />
        <div className="relative max-w-3xl">
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

          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted sm:text-lg">
            {intro}
          </p>
          <p className="mt-4 text-sm text-muted">Last updated: {updated}</p>
        </div>
      </header>

      <SectionBand tone="deep">
        <div className={`py-16 sm:py-24 ${gutter}`}>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* In-page menu (desktop only) */}
            <aside className="hidden lg:col-span-3 lg:block">
              <nav
                aria-label="On this page"
                className="sticky top-28"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  On this page
                </p>
                <ol className="flex flex-col gap-1">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block rounded-xl px-3 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-accent"
                      >
                        {i + 1}. {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            {/* Content */}
            <div className="max-w-3xl lg:col-span-9">
              {sections.map((s, i) => (
                <section
                  key={s.id}
                  id={s.id}
                  className="scroll-mt-28 border-b border-line pb-10 pt-10 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    {i + 1}. {s.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-base leading-relaxed text-muted [&_a:hover]:underline [&_a]:text-accent [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                    {s.content}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </SectionBand>
    </main>
  );
}
