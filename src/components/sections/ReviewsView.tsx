"use client";
import { motion } from "motion/react";
import { ArrowUpRight, Star } from "lucide-react";
import type { Review, ReviewsData } from "@/data/Reviews";

const ease = [0.22, 1, 0.36, 1] as const;

/* Shared side padding: keep identical in Header.tsx and Footer.tsx */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

const MAX_REVIEWS = 6;

function Stars({ rating }: { rating: number }) {
  return (
    <span
      role="img"
      aria-label={`${rating} out of 5 stars`}
      className="flex gap-0.5"
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span
            key={i}
            className="relative inline-flex"
          >
            <Star
              aria-hidden
              className="size-4 text-foreground/20"
            />
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className="size-4 fill-accent text-accent" />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease, delay: (index % 3) * 0.08 }}
      className="group flex w-[85%] shrink-0 snap-center flex-col rounded-3xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-accent/50 sm:w-[55%] sm:p-6 lg:w-auto"
    >
      <Stars rating={review.rating} />
      {review.job && (
        <p className="mt-3 text-xs font-medium text-accent">{review.job}</p>
      )}
      <p className="mt-4 line-clamp-6 flex-1 text-sm leading-relaxed text-muted sm:text-base">
        {review.text}
      </p>
      <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <span
          aria-hidden
          className="grid size-10 shrink-0 place-items-center rounded-full bg-accent/15 text-sm font-semibold text-accent"
        >
          {initials(review.author)}
        </span>
        <div className="min-w-0">
          {review.authorUrl ? (
            <a
              href={review.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block truncate text-sm font-semibold transition-colors hover:text-accent"
            >
              {review.author}
            </a>
          ) : (
            <p className="truncate text-sm font-semibold">{review.author}</p>
          )}
          <p className="text-xs text-muted">
            {review.when ? `${review.when} · ` : ""}
            {review.source === "google" ? "Google review" : "Customer review"}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function ReviewsView({ data }: { data: ReviewsData }) {
  const reviews = data.reviews.slice(0, MAX_REVIEWS);
  const hasReviews = reviews.length > 0;

  return (
    <section
      aria-labelledby="reviews-heading"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 top-1/4 size-96 rounded-full bg-accent/10 blur-3xl"
      />

      <div className={`relative w-full ${gutter}`}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Customer reviews
            </p>
            <h2
              id="reviews-heading"
              className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
            >
              What our customers{" "}
              <span className="text-gold-gradient">say about us</span>
            </h2>
          </div>

          {data.rating !== null && (
            <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface px-5 py-4">
              <span className="font-display text-5xl font-bold leading-none tracking-tight">
                {data.rating.toFixed(1)}
              </span>
              <div>
                <Stars rating={data.rating} />
                <p className="mt-1.5 text-xs text-muted">
                  {data.total
                    ? `Based on ${data.total} Google reviews`
                    : "Rated on Google"}
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {hasReviews ? (
          <div
            role="region"
            aria-label="Customer reviews"
            tabIndex={0}
            className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:snap-none lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {reviews.map((review, i) => (
              <ReviewCard
                key={review.id}
                review={review}
                index={i}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
            className="mt-10 rounded-3xl border border-line bg-surface p-6 sm:p-10"
          >
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              Happy with our work? Tell others.
            </h3>
            <p className="mt-2 max-w-xl text-muted">
              Your Google review helps other Durban homeowners find a repair
              team they can trust.
            </p>
          </motion.div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={data.writeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-accent-strong px-6 py-3.5 text-sm font-semibold text-on-accent transition-all duration-300 hover:scale-[1.03] hover:bg-accent active:scale-95"
          >
            Leave a Google review
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
          {hasReviews && data.reviews.some((r) => r.source === "google") && (
            <a
              href={data.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-line px-6 py-3.5 text-sm font-semibold transition-colors duration-300 hover:border-accent hover:text-accent active:scale-95"
            >
              See all reviews on Google
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
