"use client";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/* Horizontal door slats, drawn with a fixed pixel rhythm so they never stretch */
const slats =
  "repeating-linear-gradient(to bottom, rgba(255,255,255,0.08) 0 2px, transparent 2px 36px)";

export default function NotFoundDoor() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="relative mx-auto aspect-[16/10] w-full max-w-2xl overflow-hidden rounded-3xl border border-line bg-surface"
    >
      {/* Glow behind the number */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" />

      {/* 404 revealed as the door opens */}
      <div className="absolute inset-0 flex items-center justify-center pt-8">
        <motion.span
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.8, ease }}
          className="font-display text-[clamp(5rem,24vw,12rem)] font-bold leading-none tracking-tighter text-gold-gradient"
        >
          404
        </motion.span>
      </div>

      {/* Garage door that rolls up */}
      <motion.div
        initial={reduce ? false : { height: "100%" }}
        animate={{ height: "16%" }}
        transition={{ delay: 0.5, duration: 1.4, ease }}
        style={{ backgroundImage: slats }}
        className="absolute inset-x-0 top-0 border-b-4 border-accent bg-steel shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
      >
        <span className="absolute bottom-3 left-1/2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-accent/80" />
      </motion.div>

      {/* Floor line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-line" />
    </div>
  );
}
