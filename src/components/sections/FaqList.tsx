"use client";
import { useId, useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Faq } from "@/data/Faqs";

const ease = [0.22, 1, 0.36, 1] as const;

export default function FaqList({ items }: { items: Faq[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;

        return (
          <motion.li
            key={item.question}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease, delay: i * 0.04 }}
            className={cn(
              "rounded-2xl border bg-surface transition-colors duration-300",
              isOpen
                ? "border-accent/50"
                : "border-line hover:border-accent/30",
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
              >
                <span className="font-display text-base font-semibold tracking-tight sm:text-lg">
                  {item.question}
                </span>
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                    isOpen
                      ? "rotate-45 border-accent text-accent"
                      : "border-line text-muted",
                  )}
                >
                  <Plus
                    className="size-4"
                    aria-hidden
                  />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6 sm:pb-6 sm:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          </motion.li>
        );
      })}
    </ul>
  );
}
