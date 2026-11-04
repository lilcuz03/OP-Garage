import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Wrench } from "lucide-react";
import { formatDate, readingMinutes, type Post } from "@/data/posts";
import { cn } from "@/lib/utils";

export default function PostCard({
  post,
  featured = false,
}: {
  post: Post;
  featured?: boolean;
}) {
  const { image } = post;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-colors duration-300 hover:border-accent/50",
        featured && "col-span-full lg:grid lg:grid-cols-2",
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden",
          featured && "lg:aspect-auto lg:min-h-[340px]",
        )}
      >
        {image.src ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={
              featured
                ? "(min-width: 1024px) 50vw, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            }
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted",
              image.placeholder ??
                "bg-gradient-to-br from-steel/40 via-surface to-accent/20",
            )}
          >
            <Wrench
              className="size-9 text-accent"
              aria-hidden
            />
            <span className="px-2 text-center text-sm">
              {image.label ?? "Photo coming soon"}
            </span>
          </div>
        )}
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col p-5 sm:p-6",
          featured && "lg:justify-center lg:p-10",
        )}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {post.category}
        </p>

        <h3
          className={cn(
            "mt-3 font-display font-semibold leading-snug tracking-tight",
            featured ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl",
          )}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors duration-300 after:absolute after:inset-0 group-hover:text-accent"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted sm:text-base">
          {post.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 text-xs text-muted sm:text-sm">
          <span>
            {formatDate(post.date)} · {readingMinutes(post)} min read
          </span>
          <span
            aria-hidden
            className="inline-flex items-center gap-1 font-semibold text-accent"
          >
            Read
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
