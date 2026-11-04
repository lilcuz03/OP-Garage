import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  Clock,
  Info,
  MessageCircle,
  Wrench,
} from "lucide-react";
import SectionBand from "@/components/ui/Sectionband";
import CtaBand from "@/components/sections/Ctaband";
import PostCard from "@/components/sections/PostCard";
import {
  SITE_URL,
  formatDate,
  getPost,
  getPosts,
  getRelated,
  readingMinutes,
  slugify,
  type PostBlock,
} from "@/data/posts";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/* Shared side padding: keep identical in Header.tsx and Footer.tsx */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
    },
  };
}

function Block({ block }: { block: PostBlock }): ReactNode {
  switch (block.type) {
    case "h2":
      return (
        <h2
          id={slugify(block.text)}
          className="mt-6 scroll-mt-28 font-display text-2xl font-semibold tracking-tight text-foreground sm:mt-8 sm:text-3xl"
        >
          {block.text}
        </h2>
      );
    case "p":
      return <p>{block.text}</p>;
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-6 marker:text-accent">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-2 pl-6 marker:font-semibold marker:text-accent">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div className="rounded-2xl border border-accent/30 bg-accent/5 p-5 sm:p-6">
          <p className="flex items-center gap-2 font-display text-base font-semibold text-foreground sm:text-lg">
            <Info
              className="size-5 shrink-0 text-accent"
              aria-hidden
            />
            {block.title}
          </p>
          <p className="mt-2 text-sm sm:text-base">{block.text}</p>
        </div>
      );
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { image } = post;
  const headings = post.body.flatMap((b) =>
    b.type === "h2" ? [{ text: b.text, id: slugify(b.text) }] : [],
  );
  const related = getRelated(post, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    author: { "@type": "Organization", name: site.name, url: SITE_URL },
    publisher: { "@type": "Organization", name: site.name, url: SITE_URL },
    ...(image.src ? { image: `${SITE_URL}${image.src}` } : {}),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* ───────── Header ───────── */}
      <header
        className={`relative overflow-hidden pb-10 pt-36 sm:pb-14 sm:pt-44 ${gutter}`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/3 size-80 rounded-full bg-accent/10 blur-3xl"
        />
        <div className="relative max-w-4xl">
          <nav aria-label="Breadcrumb">
            <ol className="flex min-w-0 items-center gap-1.5 text-xs text-muted sm:text-sm">
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
              <li>
                <Link
                  href="/blog"
                  className="transition-colors hover:text-accent"
                >
                  Blog
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3.5" />
              </li>
              <li
                aria-current="page"
                className="min-w-0 max-w-[12rem] truncate font-medium text-foreground sm:max-w-md"
              >
                {post.title}
              </li>
            </ol>
          </nav>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {post.category}
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted sm:text-lg">
            {post.description}
          </p>
          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
            <span>{formatDate(post.date)}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock
                className="size-4 text-accent"
                aria-hidden
              />
              {readingMinutes(post)} min read
            </span>
            <span>By {site.name}</span>
          </p>
        </div>
      </header>

      {/* ───────── Article ───────── */}
      <SectionBand tone="deep">
        <div className={`py-12 sm:py-20 ${gutter}`}>
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-line bg-surface">
            {image.src ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 1280px) 1100px, 100vw"
                className="object-cover"
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
                  className="size-10 text-accent"
                  aria-hidden
                />
                <span className="text-sm">
                  {image.label ?? "Photo coming soon"}
                </span>
              </div>
            )}
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* In-article menu (desktop only) */}
            <aside className="hidden lg:col-span-3 lg:block">
              <nav
                aria-label="In this article"
                className="sticky top-28"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  In this article
                </p>
                <ul className="flex flex-col gap-1">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="block rounded-xl px-3 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-accent"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <div className="max-w-3xl lg:col-span-9">
              <div className="flex flex-col gap-5 text-base leading-relaxed text-muted sm:text-lg">
                {post.body.map((block, i) => (
                  <Block
                    key={i}
                    block={block}
                  />
                ))}
              </div>

              {/* Call to action */}
              <div className="mt-12 rounded-3xl border border-line bg-surface p-6 sm:p-8">
                <h2 className="font-display text-2xl font-semibold tracking-tight">
                  Need a hand?
                </h2>
                <p className="mt-2 text-muted">
                  Message or call us. Support is available 24/7, with flexible
                  appointments and fast repairs.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-accent-strong px-6 py-3.5 text-sm font-semibold text-on-accent transition-all duration-300 hover:scale-[1.03] hover:bg-accent active:scale-95"
                  >
                    <MessageCircle
                      className="size-4"
                      aria-hidden
                    />
                    WhatsApp us
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </a>
                  {post.service && (
                    <Link
                      href={`/services/${post.service.slug}`}
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-line px-6 py-3.5 text-sm font-semibold transition-colors duration-300 hover:border-accent hover:text-accent active:scale-95"
                    >
                      Our {post.service.label}
                    </Link>
                  )}
                </div>
              </div>

              <Link
                href="/blog"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
              >
                <ArrowLeft
                  className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                  aria-hidden
                />
                All articles
              </Link>
            </div>
          </div>
        </div>
      </SectionBand>

      {/* ───────── Related ───────── */}
      {related.length > 0 && (
        <SectionBand tone="base">
          <section
            aria-labelledby="related-heading"
            className={`py-16 sm:py-24 ${gutter}`}
          >
            <h2
              id="related-heading"
              className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Keep <span className="text-gold-gradient">reading</span>
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:gap-8">
              {related.map((p) => (
                <PostCard
                  key={p.slug}
                  post={p}
                />
              ))}
            </div>
          </section>
        </SectionBand>
      )}

      <CtaBand />
    </main>
  );
}
