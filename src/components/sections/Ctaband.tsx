import { MessageCircle, Phone } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";

/* Shared side padding: keep identical in Header.tsx and Footer.tsx */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

/*
  The one loud moment on the page: a solid gold band between Reviews and FAQ.
  Faint gate slats run down the right side, fading out to the left.
*/
export default function CtaBand() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden bg-accent-strong text-on-accent"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full lg:w-3/5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(10,31,23,0.12) 0 6px, transparent 6px 30px)",
          maskImage: "linear-gradient(to left, black 10%, transparent 90%)",
          WebkitMaskImage:
            "linear-gradient(to left, black 10%, transparent 90%)",
        }}
      />

      <div className={`relative w-full py-16 sm:py-20 lg:py-24 ${gutter}`}>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <h2
              id="cta-heading"
              className="font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-6xl"
            >
              Gate stuck or garage door won&apos;t open?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-on-accent/80 sm:text-lg">
              Message us on WhatsApp for a quote, or call and speak to a
              technician.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-on-accent px-7 py-4 text-base font-semibold text-foreground transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_30px_-8px_rgba(10,31,23,0.6)] active:scale-95"
            >
              <MessageCircle
                className="size-5"
                aria-hidden
              />
              Get a quote on WhatsApp
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full border-2 border-on-accent/30 px-7 py-3.5 text-base font-semibold transition-all duration-300 hover:border-on-accent hover:bg-on-accent/10 active:scale-95"
            >
              <Phone
                className="size-5"
                aria-hidden
              />
              Call {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
