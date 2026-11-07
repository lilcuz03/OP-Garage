import { MessageCircle, Phone } from "lucide-react";
import FaqList from "@/components/sections/FaqList";
import { faqCategories, faqs } from "@/data/Faqs";
import { site, whatsappLink } from "@/lib/site";

/* Shared side padding: keep identical in Header.tsx and Footer.tsx */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

export default function FaqGroups() {
  return (
    <section
      aria-label="Frequently asked questions"
      className="relative overflow-clip py-16 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 top-24 size-80 rounded-full bg-accent/10 blur-3xl"
      />

      <div className={`relative w-full ${gutter}`}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* ───────── Topic menu (sticky on desktop) ───────── */}
          <aside className="min-w-0 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <nav
                aria-label="FAQ topics"
                className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
              >
                <p className="mb-1 hidden text-xs font-semibold uppercase tracking-[0.18em] text-accent lg:block">
                  Topics
                </p>
                {faqCategories.map((c) => (
                  <a
                    key={c.id}
                    href={`#${c.id}`}
                    className="flex shrink-0 items-center justify-between gap-3 whitespace-nowrap rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-accent lg:rounded-2xl lg:bg-surface lg:py-3.5"
                  >
                    {c.name}
                    <span className="text-xs text-muted/70">
                      {faqs.filter((f) => f.category === c.name).length}
                    </span>
                  </a>
                ))}
              </nav>

              <div className="mt-6 hidden rounded-3xl border border-line bg-surface p-6 lg:block">
                <h2 className="font-display text-lg font-semibold tracking-tight">
                  Can&apos;t find your answer?
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Message or call us. Support is available 24/7.
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent-strong px-5 py-3 text-sm font-semibold text-on-accent transition-all duration-300 hover:scale-[1.03] hover:bg-accent active:scale-95"
                  >
                    <MessageCircle
                      className="size-4"
                      aria-hidden
                    />
                    WhatsApp us
                  </a>
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-line px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent active:scale-95"
                  >
                    <Phone
                      className="size-4"
                      aria-hidden
                    />
                    {site.phone}
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* ───────── Question groups ───────── */}
          <div className="flex min-w-0 flex-col gap-14 sm:gap-16 lg:col-span-8">
            {faqCategories.map((c, i) => (
              <div
                key={c.id}
                id={c.id}
                className="scroll-mt-28"
              >
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  {c.name}
                </h2>
                <p className="mt-2 text-sm text-muted sm:text-base">
                  {c.blurb}
                </p>
                <div className="mt-6">
                  <FaqList
                    items={faqs.filter((f) => f.category === c.name)}
                    defaultOpen={i === 0 ? 0 : null}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
