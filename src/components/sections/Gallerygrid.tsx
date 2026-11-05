"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, MapPin, MessageCircle, X } from "lucide-react";
import ImageSlot from "@/components/ui/ImagesSlot";
import type { ImageSlotData } from "@/data/Images";
import {
  categories,
  categoryGradients,
  galleryItems,
  type Aspect,
  type CategoryId,
  type GalleryItem,
} from "@/data/gallery";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/* Shared side padding: keep identical in every section */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

const aspectClass: Record<Aspect, string> = {
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
};

function toSlot(item: GalleryItem): ImageSlotData {
  return {
    src: item.src,
    alt: item.alt,
    placeholder:
      categoryGradients[item.category] ?? "linear-gradient(135deg, #0b4a37, #2a8a69)",
    label: "Photo coming soon",
    position: item.position,
  };
}

/* ───────── Lightbox ───────── */
function Lightbox({
  items,
  index,
  setIndex,
  onClose,
}: {
  items: GalleryItem[];
  index: number;
  setIndex: (i: number) => void;
  onClose: () => void;
}) {
  const item = items[index];
  const closeRef = useRef<HTMLButtonElement>(null);

  const go = useCallback(
    (dir: number) => setIndex((index + dir + items.length) % items.length),
    [index, items.length, setIndex]
  );

  useEffect(() => {
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const message = `Hi OP Garage & Gate Repairs, I saw your work "${item.title}" and I'd like a similar job.`;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[70] flex flex-col bg-background/95 backdrop-blur-xl"
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 pb-2 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm text-muted">
          {index + 1} / {items.length}
        </p>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close gallery"
          className="grid size-11 place-items-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Photo */}
      <div className="relative flex flex-1 items-center justify-center px-4 sm:px-16">
        {items.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-background/70 backdrop-blur transition-colors hover:border-accent hover:text-accent sm:left-5"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-background/70 backdrop-blur transition-colors hover:border-accent hover:text-accent sm:right-5"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={item.id}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(1);
              else if (info.offset.x > 80) go(-1);
            }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease }}
            onClick={(e) => e.stopPropagation()}
            className="relative h-[58vh] w-full max-w-5xl cursor-grab overflow-hidden rounded-2xl border border-line bg-surface active:cursor-grabbing sm:h-[64vh]"
          >
            <ImageSlot
              image={toSlot(item)}
              fit="contain"
              sizes="100vw"
              className="absolute inset-0"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Caption */}
      <div
        className="flex flex-col items-center justify-between gap-4 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 text-center sm:flex-row sm:px-6 sm:text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <p className="font-display text-lg font-semibold tracking-tight">{item.title}</p>
          {item.location && (
            <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted sm:justify-start">
              <MapPin className="size-3.5 text-accent" aria-hidden />
              {item.location}
            </p>
          )}
        </div>
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-accent-strong px-6 py-3.5 text-sm font-semibold text-on-accent transition-all duration-300 hover:bg-accent hover:shadow-[0_0_30px_-4px_rgba(245,197,24,0.6)] active:scale-95 sm:w-auto"
        >
          <MessageCircle className="size-5" aria-hidden />
          Get a quote like this
        </a>
      </div>
    </motion.div>
  );
}

/* ───────── Gallery ───────── */
export default function GalleryGrid() {
  const [active, setActive] = useState<CategoryId>("all");
  const [open, setOpen] = useState<number | null>(null);

  /* Only show tabs that have photos */
  const visibleCategories = useMemo(
    () =>
      categories.filter(
        (c) => c.id === "all" || galleryItems.some((item) => item.category === c.id)
      ),
    []
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: galleryItems.length };
    for (const item of galleryItems) map[item.category] = (map[item.category] ?? 0) + 1;
    return map;
  }, []);

  const filtered = useMemo(
    () => (active === "all" ? galleryItems : galleryItems.filter((i) => i.category === active)),
    [active]
  );

  const close = useCallback(() => setOpen(null), []);

  const selectTab = (id: CategoryId) => {
    setActive(id);
    setOpen(null);
  };

  return (
    <section className="relative py-16 sm:py-24">
      <div className={cn("w-full", gutter)}>
        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Filter the gallery by service"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {visibleCategories.map((c) => {
            const selected = active === c.id;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={selected}
                onClick={() => selectTab(c.id)}
                className={cn(
                  "relative shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-300",
                  selected ? "border-transparent" : "border-line hover:border-accent/60"
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="gallery-tab"
                    className="absolute inset-0 rounded-full bg-accent-strong"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span
                  className={cn(
                    "relative flex items-center gap-2",
                    selected ? "text-on-accent" : "text-muted"
                  )}
                >
                  {c.label}
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[11px] leading-none",
                      selected ? "bg-black/15" : "bg-white/10"
                    )}
                  >
                    {counts[c.id] ?? 0}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="mt-6 text-center text-sm text-muted">
          Showing {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        </p>

        {/* Grid */}
        <motion.ul
          key={active}
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          className="mt-8 columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3"
        >
          {filtered.map((item, i) => (
            <motion.li
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
              className="mb-4 break-inside-avoid sm:mb-5"
            >
              <button
                onClick={() => setOpen(i)}
                aria-label={`View ${item.title}`}
                className="group relative block w-full overflow-hidden rounded-3xl border border-line text-left transition-colors duration-300 hover:border-accent/50"
              >
                <div className={cn("relative", aspectClass[item.aspect])}>
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                    <ImageSlot
                      image={toSlot(item)}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="absolute inset-0"
                    />
                  </div>

                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(6,36,27,0.85), rgba(6,36,27,0) 55%)",
                    }}
                  />

                  <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/70 text-foreground opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                    <Expand className="size-4" aria-hidden />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <p className="font-display text-base font-semibold tracking-tight sm:text-lg">
                      {item.title}
                    </p>
                    {item.location && (
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-foreground/75">
                        <MapPin className="size-3 text-accent" aria-hidden />
                        {item.location}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <AnimatePresence>
        {open !== null && filtered[open] && (
          <Lightbox items={filtered} index={open} setIndex={setOpen} onClose={close} />
        )}
      </AnimatePresence>
    </section>
  );
}