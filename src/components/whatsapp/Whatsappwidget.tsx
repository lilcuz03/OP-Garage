"use client";

import { useEffect, useId, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  MessageSquare,
  RotateCcw,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { services } from "@/data/Services";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/* ───────── Editable options ───────── */
const jobTypes = ["Repair", "Installation", "Not sure"] as const;
type JobType = (typeof jobTypes)[number];

const timeSlots = [
  "Morning (8am–12pm)",
  "Afternoon (12pm–4pm)",
  "Evening (4pm–6pm)",
  "Any time",
];

const options = [
  ...services.map((s) => ({ id: s.id, label: s.title })),
  { id: "other", label: "Other" },
];

const steps = [
  { id: "services", label: "Services", icon: Wrench },
  { id: "location", label: "Location", icon: MapPin },
  { id: "when", label: "Date & time", icon: CalendarDays },
  { id: "details", label: "Details", icon: MessageSquare },
];

/* ───────── Helpers ───────── */
function todayISO() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const inputCls =
  "mt-2 w-full rounded-xl border border-line bg-background/60 px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-accent [color-scheme:dark]";

/* ───────── Small pieces ───────── */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function Chip({
  selected,
  onClick,
  children,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200 active:scale-95",
        selected
          ? "border-accent bg-accent-strong text-on-accent"
          : "border-line bg-white/5 text-foreground/90 hover:border-accent/60",
        className,
      )}
    >
      {selected && (
        <Check
          className="size-3.5"
          aria-hidden
        />
      )}
      {children}
    </button>
  );
}

function StepHeading({ title, hint }: { title: string; hint: string }) {
  return (
    <>
      <h3 className="font-display text-lg font-semibold tracking-tight">
        {title}
      </h3>
      <p className="mt-1 text-sm text-muted">{hint}</p>
    </>
  );
}

/* ───────── Widget ───────── */
export default function WhatsAppWidget() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);

  const [selected, setSelected] = useState<string[]>([]);
  const [jobType, setJobType] = useState<JobType | null>(null);
  const [area, setArea] = useState("");
  const [street, setStreet] = useState("");
  const [asap, setAsap] = useState(false);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  /* Friendly nudge a few seconds after the page loads */
  useEffect(() => {
    const show = setTimeout(() => setTeaser(true), 4000);
    const hide = setTimeout(() => setTeaser(false), 14000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  /* Close with Escape */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggleService = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const serviceLabels = options
    .filter((o) => selected.includes(o.id))
    .map((o) => o.label);
  const canSend = selected.length > 0 && area.trim().length > 0;

  const done = [
    selected.length > 0,
    area.trim().length > 0,
    asap || date !== "" || slot !== "",
    name.trim() !== "" || notes.trim() !== "",
  ];

  const message = useMemo(() => {
    const lines = [`Hi ${site.name}, I'd like to request a quote.`, ""];
    if (name.trim()) lines.push(`*Name:* ${name.trim()}`);
    if (serviceLabels.length)
      lines.push(`*Service:* ${serviceLabels.join(", ")}`);
    if (jobType) lines.push(`*Type of job:* ${jobType}`);
    const place = [street.trim(), area.trim()].filter(Boolean).join(", ");
    if (place) lines.push(`*Location:* ${place}`);
    if (asap) {
      lines.push("*When:* As soon as possible (urgent)");
    } else {
      if (date) lines.push(`*Preferred date:* ${formatDate(date)}`);
      if (slot) lines.push(`*Preferred time:* ${slot}`);
    }
    if (notes.trim()) lines.push(`*Details:* ${notes.trim()}`);
    return lines.join("\n");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, selected, jobType, street, area, asap, date, slot, notes]);

  const reset = () => {
    setSelected([]);
    setJobType(null);
    setArea("");
    setStreet("");
    setAsap(false);
    setDate("");
    setSlot("");
    setName("");
    setNotes("");
    setSent(false);
    setStep(0);
  };

  const toggleOpen = () => {
    setOpen((v) => !v);
    setTeaser(false);
  };

  return (
    <>
      {/* ───────── Panel ───────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label="Request a quote on WhatsApp"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.3, ease }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed inset-x-3 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-30 flex max-h-[min(640px,calc(100dvh-8rem))] flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] sm:inset-x-auto sm:bottom-[calc(6.5rem+env(safe-area-inset-bottom))] sm:right-6 sm:w-[400px]"
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 border-b border-line px-5 py-4"
              style={{
                background:
                  "linear-gradient(135deg, rgba(11,74,55,0.95), rgba(10,51,38,0.95))",
              }}
            >
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-strong text-on-accent">
                <WhatsAppIcon className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-semibold leading-tight">
                  Request a quote
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                  <span
                    className="size-1.5 rounded-full bg-accent"
                    aria-hidden
                  />
                  Support available 24/7
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close quote form"
                className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Tabs */}
            <div
              role="tablist"
              className="grid grid-cols-4 border-b border-line"
            >
              {steps.map((s, i) => {
                const Icon = s.icon;
                const active = i === step;
                return (
                  <button
                    key={s.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setStep(i)}
                    className={cn(
                      "relative flex flex-col items-center gap-1 px-1 py-3 text-[11px] font-medium transition-colors",
                      active
                        ? "text-accent"
                        : "text-muted hover:text-foreground",
                    )}
                  >
                    <span className="relative">
                      <Icon
                        className="size-4"
                        aria-hidden
                      />
                      {done[i] && !active && (
                        <span className="absolute -right-2 -top-1.5 grid size-3.5 place-items-center rounded-full bg-accent text-on-accent">
                          <Check
                            className="size-2.5"
                            aria-hidden
                          />
                        </span>
                      )}
                    </span>
                    {s.label}
                    {active && (
                      <motion.span
                        layoutId="wa-tab-underline"
                        className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-accent"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                <motion.div
                  key={step}
                  role="tabpanel"
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -14 }}
                  transition={{ duration: 0.2, ease }}
                >
                  {step === 0 && (
                    <div>
                      <StepHeading
                        title="What do you need?"
                        hint="Pick one or more services."
                      />
                      <div className="mt-4 flex flex-wrap gap-2">
                        {options.map((o) => (
                          <Chip
                            key={o.id}
                            selected={selected.includes(o.id)}
                            onClick={() => toggleService(o.id)}
                          >
                            {o.label}
                          </Chip>
                        ))}
                      </div>

                      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                        Type of job
                      </p>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {jobTypes.map((t) => (
                          <Chip
                            key={t}
                            selected={jobType === t}
                            onClick={() => setJobType(jobType === t ? null : t)}
                            className="justify-center px-2"
                          >
                            {t}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <StepHeading
                        title="Where are you?"
                        hint="Tell us your suburb or area so we know where the job is."
                      />
                      <label className="mt-4 block">
                        <span className="text-xs font-medium text-muted">
                          Suburb or area <span className="text-accent">*</span>
                        </span>
                        <input
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                          placeholder="Your suburb or area"
                          autoComplete="address-level2"
                          className={inputCls}
                        />
                      </label>
                      <label className="mt-4 block">
                        <span className="text-xs font-medium text-muted">
                          Street, complex or landmark (optional)
                        </span>
                        <input
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          placeholder="Street name, complex or landmark"
                          autoComplete="street-address"
                          className={inputCls}
                        />
                      </label>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <StepHeading
                        title="When suits you?"
                        hint="Pick a date and time, or tell us it's urgent."
                      />
                      <button
                        type="button"
                        aria-pressed={asap}
                        onClick={() => setAsap((v) => !v)}
                        className={cn(
                          "mt-4 flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200 active:scale-[0.98]",
                          asap
                            ? "border-accent bg-accent-strong text-on-accent"
                            : "border-line bg-white/5 hover:border-accent/60",
                        )}
                      >
                        <Zap
                          className="size-4 shrink-0"
                          aria-hidden
                        />
                        <span>
                          It&apos;s urgent, as soon as possible
                          <span
                            className={cn(
                              "block text-xs font-normal",
                              asap ? "text-on-accent/80" : "text-muted",
                            )}
                          >
                            We&apos;ll note this as an emergency repair
                          </span>
                        </span>
                      </button>

                      {!asap && (
                        <>
                          <label className="mt-5 block">
                            <span className="text-xs font-medium text-muted">
                              Preferred date
                            </span>
                            <input
                              type="date"
                              min={todayISO()}
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              className={inputCls}
                            />
                          </label>

                          <p className="mt-5 text-xs font-medium text-muted">
                            Preferred time
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {timeSlots.map((t) => (
                              <Chip
                                key={t}
                                selected={slot === t}
                                onClick={() => setSlot(slot === t ? "" : t)}
                              >
                                {t}
                              </Chip>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <StepHeading
                        title="Anything else?"
                        hint="Add a few details, check your message, then send."
                      />
                      <label className="mt-4 block">
                        <span className="text-xs font-medium text-muted">
                          Your name (optional)
                        </span>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          autoComplete="name"
                          className={inputCls}
                        />
                      </label>
                      <label className="mt-4 block">
                        <span className="text-xs font-medium text-muted">
                          What&apos;s the problem? (optional)
                        </span>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={3}
                          placeholder="E.g. gate motor clicks but won't open"
                          className={cn(inputCls, "resize-none")}
                        />
                      </label>

                      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                        Your message
                      </p>
                      <pre className="mt-2 whitespace-pre-wrap break-words rounded-2xl border border-line bg-background/60 p-4 font-sans text-sm leading-relaxed text-foreground/90">
                        {message}
                      </pre>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer actions */}
            <div className="border-t border-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-4">
              <div className="flex items-center gap-3">
                {step > 0 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    aria-label="Previous step"
                    className="grid size-12 shrink-0 place-items-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent"
                  >
                    <ArrowLeft className="size-4" />
                  </button>
                )}

                {step < steps.length - 1 ? (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent-strong text-sm font-semibold text-on-accent transition-all hover:bg-accent active:scale-[0.98]"
                  >
                    Next
                    <ArrowRight className="size-4" />
                  </button>
                ) : canSend ? (
                  <a
                    href={whatsappLink(message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setSent(true)}
                    className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent-strong text-sm font-semibold text-on-accent transition-all hover:bg-accent hover:shadow-[0_0_30px_-4px_rgba(245,197,24,0.6)] active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="size-5" />
                    Send on WhatsApp
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex h-12 flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-full bg-white/10 text-sm font-semibold text-muted"
                  >
                    <WhatsAppIcon className="size-5" />
                    Send on WhatsApp
                  </button>
                )}
              </div>

              {step === steps.length - 1 && !canSend && (
                <p className="mt-3 text-center text-xs text-muted">
                  Choose at least one service and add your suburb to send.
                </p>
              )}

              {step === steps.length - 1 && canSend && !sent && (
                <p className="mt-3 text-center text-xs text-muted">
                  Nothing is sent until you press send inside WhatsApp.
                </p>
              )}

              {sent && (
                <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-white/5 px-3 py-2 text-xs text-muted">
                  <span>WhatsApp opened. Press send there to finish.</span>
                  <button
                    onClick={reset}
                    className="inline-flex shrink-0 items-center gap-1 font-semibold text-accent"
                  >
                    <RotateCcw
                      className="size-3"
                      aria-hidden
                    />
                    Start over
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────── Floating button ───────── */}
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {teaser && !open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.3, ease }}
              className="absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-2xl rounded-br-sm border border-line bg-surface px-4 py-2.5 text-sm font-medium shadow-xl"
            >
              Need a quote? <span className="text-accent">Chat with us</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggleOpen}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          aria-label={open ? "Close quote form" : "Open WhatsApp quote form"}
          aria-expanded={open}
          aria-controls={panelId}
          className="relative grid size-14 place-items-center rounded-full bg-accent-strong text-on-accent shadow-[0_10px_40px_-6px_rgba(245,197,24,0.55)] sm:size-16"
        >
          {!open && (
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-full bg-accent/40"
            />
          )}
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <X className="size-6 sm:size-7" />
              </motion.span>
            ) : (
              <motion.span
                key="whatsapp"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <WhatsAppIcon className="size-7 sm:size-8" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
