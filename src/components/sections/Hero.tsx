"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent } from "react";
import {
  motion,
  useAnimate,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  CalendarCheck,
  Check,
  Clock,
  MessageCircle,
  Phone,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ImageSlot from "@/components/ui/ImagesSlot";
import { images } from "@/data/Images";
import type { ImageSlot as ImageSlotType } from "@/data/Images";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/* Shared side padding: keep identical in Header.tsx, Footer.tsx and Hero.tsx */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

const headlineWords = ["Get", "your", "garage", "door", "or", "gate"];

const features = ["Flexible appointments", "Affordable prices", "Fast repairs"];

const tickerItems = [
  "Garage doors",
  "Gate motors",
  "Electric fences",
  "Burglar guards",
  "Clearview fencing",
  "Carports",
  "Installations & repairs",
];

/*
  Photos shown inside the garage door, one per opening.
  Add or remove slots in src/data/Images.ts (heroGate1, heroGate2, ...) and list them here.
*/
const gateSlides: ImageSlotType[] = [
  images.heroGate1,
  images.heroGate2,
  images.heroGate3,
];

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

/* ───────── Floating glass chip ───────── */
function Chip({
  icon: Icon,
  label,
  className,
  delay,
  reduced,
}: {
  icon: LucideIcon;
  label: string;
  className?: string;
  delay: number;
  reduced: boolean;
}) {
  return (
    <motion.div
      className={cn(
        "absolute z-10 flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-background/80 px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-xl sm:px-3.5 sm:py-2 sm:text-sm",
        className,
      )}
      animate={reduced ? undefined : { y: [0, -8, 0] }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <span className="grid size-6 place-items-center rounded-full bg-accent/15 text-accent">
        <Icon
          className="size-3.5"
          aria-hidden
        />
      </span>
      {label}
    </motion.div>
  );
}

/* ───────── Animated garage door with 3D tilt ───────── */
function GarageVisual({ reduced }: { reduced: boolean }) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), {
    stiffness: 120,
    damping: 16,
  });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), {
    stiffness: 120,
    damping: 16,
  });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  /*
    The door loop: open, hold, close, then swap to the next photo while the
    door is fully closed (so the swap is never seen), pause, repeat.
    Photos are switched directly on the elements, so no React state is
    set inside the effect.
  */
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (reduced) return;

    let cancelled = false;
    let current = 0;
    const root = scope.current as HTMLElement | null;
    const slideEls = root
      ? Array.from(root.querySelectorAll<HTMLElement>("[data-slide]"))
      : [];

    const move = (open: boolean) => {
      const opts = { duration: 2.7, ease: "easeInOut" as const };
      return Promise.all([
        animate("[data-door]", { y: open ? "-92%" : "0%" }, opts),
        animate("[data-glow]", { opacity: open ? 1 : 0.1 }, opts),
        animate("[data-spill]", { opacity: open ? 0.9 : 0.1 }, opts),
      ]);
    };

    (async () => {
      try {
        await sleep(1200);
        while (!cancelled) {
          await move(true);
          if (cancelled) break;
          await sleep(2600);
          if (cancelled) break;
          await move(false);
          if (cancelled) break;

          /* Door is shut: switch to the next photo unseen */
          if (slideEls.length > 1) {
            const next = (current + 1) % slideEls.length;
            slideEls[current].style.opacity = "0";
            slideEls[next].style.opacity = "1";
            current = next;
          }
          await sleep(900);
        }
      } catch {
        /* animation was stopped because the component unmounted */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [animate, reduced, scope]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease }}
      className="relative mx-auto w-full max-w-md lg:max-w-none"
      style={{ perspective: 1200 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-[5/4] w-full rounded-[2rem] border border-line bg-surface p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] sm:p-4"
      >
        {/* Wall */}
        <div
          ref={scope}
          className="relative size-full overflow-hidden rounded-[1.4rem] bg-background"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 28px)",
            }}
          />

          {/* Gold light spilling onto the driveway */}
          <div
            data-spill
            aria-hidden
            className="absolute inset-x-[18%] bottom-[2%] h-[18%] rounded-full bg-accent/40 blur-2xl"
            style={{ opacity: reduced ? 0.5 : 0.1 }}
          />

          {/* Door frame */}
          <div className="absolute inset-x-[10%] bottom-[12%] top-[20%] overflow-hidden rounded-t-xl border-2 border-line bg-[#030f0a]">
            {/* Photos shown behind the door, one at a time */}
            {gateSlides.map((slide, i) => (
              <div
                key={i}
                data-slide
                className="absolute inset-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <ImageSlot
                  image={slide}
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="absolute inset-0"
                />
              </div>
            ))}

            {/* Darkening so the gold light and the door stay readable */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(3,15,10,0.55), rgba(3,15,10,0.15) 60%, rgba(3,15,10,0.35))",
              }}
            />

            {/* Light inside the garage */}
            <div
              data-glow
              aria-hidden
              className="absolute inset-0"
              style={{
                opacity: reduced ? 0.6 : 0.1,
                background:
                  "radial-gradient(70% 80% at 50% 100%, rgba(245,197,24,0.4), rgba(245,197,24,0.05) 60%, transparent)",
              }}
            />

            {/* The door itself: six panels rolling up */}
            <div
              data-door
              className="absolute inset-0 flex flex-col"
              style={reduced ? { transform: "translateY(-55%)" } : undefined}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="relative flex-1 border-b border-black/40 bg-brand"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom, rgba(255,255,255,0.10), rgba(0,0,0,0.18))",
                  }}
                >
                  {i === 0 && (
                    <div className="absolute inset-x-[12%] inset-y-[22%] flex gap-[4%]">
                      {Array.from({ length: 4 }).map((__, j) => (
                        <div
                          key={j}
                          className="flex-1 rounded-[2px] bg-black/35"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Ground */}
          <div className="absolute inset-x-0 bottom-0 h-[12%] bg-black/30" />
        </div>

        {/* Floating chips: tucked inside the card on phones, hanging over the edge from sm up */}
        <Chip
          icon={Zap}
          label="Fast repairs"
          delay={0}
          reduced={reduced}
          className="left-2 top-[16%] sm:-left-8"
        />
        <Chip
          icon={Clock}
          label="24/7 support"
          delay={0.8}
          reduced={reduced}
          className="right-2 top-[46%] sm:-right-8"
        />
        <Chip
          icon={CalendarCheck}
          label="Flexible appointments"
          delay={1.6}
          reduced={reduced}
          className="bottom-5 left-5 sm:-bottom-4 sm:left-8"
        />
      </motion.div>
    </motion.div>
  );
}

/* ───────── Services ticker ───────── */
function Ticker({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative border-t border-line bg-background/40 py-4 backdrop-blur-sm">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          className="flex w-max whitespace-nowrap"
          animate={reduced ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
        >
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              aria-hidden={i >= tickerItems.length}
              className="flex items-center gap-10 pr-10 font-display text-xs font-medium uppercase tracking-[0.2em] text-muted sm:text-sm"
            >
              {item}
              <span className="size-1.5 rotate-45 bg-accent" />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ───────── Hero ───────── */
export default function Hero() {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);

  /* Mouse spotlight */
  const mx = useMotionValue(-600);
  const my = useMotionValue(-600);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(245,197,24,0.10), transparent 65%)`;
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  /* Content drifts and fades as you scroll away */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      onPointerMove={onMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Background photo: very faint, slowly settling in */}
      <motion.div
        aria-hidden
        initial={{ scale: reduced ? 1 : 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease }}
        className="absolute inset-0 -z-30 opacity-[0.5]"
      >
        <ImageSlot
          image={images.heroHome}
          sizes="100vw"
          priority
          variant="bare"
          className="absolute inset-0"
        />
      </motion.div>

      {/* Heavy green overlay on top of the photo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,36,27,0.6) 0%, rgba(6,36,27,0.78) 60%, rgba(6,36,27,1) 100%)",
        }}
      />

      {/* Background layers */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 15%, rgba(245,197,24,0.12), transparent 60%), radial-gradient(55% 60% at 5% 85%, rgba(28,107,82,0.4), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 75%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: spotlight }}
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className={cn(
          "flex w-full flex-1 items-center pb-12 pt-28 sm:pt-32 lg:pb-16",
          gutter,
        )}
      >
        {/*
          Phones and tablets: 1) heading + paragraph, 2) animation, 3) buttons + checks.
          Desktop (lg): text on the left, animation on the right, vertically centred.
          The two outer rows are 1fr spacers that centre the text block.
        */}
        <div className="grid w-full grid-cols-1 gap-y-10 lg:grid-cols-12 lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-8 lg:gap-y-0">
          {/* 1. Badge, heading, paragraph */}
          <div className="min-w-0 text-center lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:text-left">
            <motion.p
              {...fadeUp(0)}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-1.5 text-xs font-medium text-muted backdrop-blur"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Garage doors · Gate motors · Electric fences
            </motion.p>

            <h1 className="mt-6 font-display text-[clamp(2.4rem,5.6vw,5rem)] font-semibold leading-[1.05] tracking-tight">
              {headlineWords.map((word, i) => (
                <span key={word + i}>
                  <span className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
                    <motion.span
                      className="inline-block"
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.15 + i * 0.07,
                        ease,
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>{" "}
                </span>
              ))}
              <span className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
                <motion.span
                  className="text-gold-gradient inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.15 + headlineWords.length * 0.07,
                    ease,
                  }}
                >
                  fixed
                </motion.span>
              </span>
            </h1>

            <motion.p
              {...fadeUp(0.75)}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0"
            >
              Fast, affordable garage door and gate repairs, plus new
              installations. Flexible appointments and expert service. Secure
              your home today.
            </motion.p>
          </div>

          {/* 2. Animation: in the middle on phones, right-hand column on desktop */}
          <div className="min-w-0 lg:col-span-5 lg:col-start-8 lg:row-span-4 lg:row-start-1 lg:self-center">
            <GarageVisual reduced={reduced} />
          </div>

          {/* 3. Buttons and checkmarks */}
          <div className="min-w-0 text-center lg:col-span-7 lg:col-start-1 lg:row-start-3 lg:text-left">
            <motion.div
              {...fadeUp(0.9)}
              className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:mt-8 lg:justify-start"
            >
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-accent-strong px-7 py-4 text-base font-semibold text-on-accent transition-all duration-300 hover:scale-[1.03] hover:bg-accent hover:shadow-[0_0_36px_-4px_rgba(245,197,24,0.6)] active:scale-95"
              >
                <MessageCircle
                  className="size-5"
                  aria-hidden
                />
                Get a quote on WhatsApp
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-7 py-4 text-base font-semibold backdrop-blur transition-all duration-300 hover:border-accent hover:bg-white/10 hover:text-accent active:scale-95"
              >
                <Phone
                  className="size-5"
                  aria-hidden
                />
                Call {site.phone}
              </a>
            </motion.div>

            <motion.ul
              {...fadeUp(1.05)}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 lg:justify-start"
            >
              {features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm text-muted"
                >
                  <span className="grid size-5 place-items-center rounded-full bg-accent/15 text-accent">
                    <Check
                      className="size-3"
                      aria-hidden
                    />
                  </span>
                  {f}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </motion.div>

      <Ticker reduced={reduced} />
    </section>
  );
}
