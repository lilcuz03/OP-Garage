import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionBand from "@/components/ui/Sectionband";
import CtaBand from "@/components/sections/Ctaband";
import PostCard from "@/components/sections/PostCard";
import { getPosts } from "@/data/posts";
import { images } from "@/data/Images";

/* Shared side padding: keep identical in Header.tsx and Footer.tsx */
const gutter = "px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20";

export const metadata: Metadata = {
  title: "Blog: garage door, gate motor & security tips",
  description:
    "Practical advice on garage doors, gate motors, electric fences and home security from OP Garage & Gate Repairs in Durban.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const [latest, ...rest] = getPosts();

  return (
    <main>
      <PageHero
        crumb="Blog"
        title="Tips &"
        highlight="advice"
        description="Practical advice on garage doors, gate motors, electric fences and keeping your home secure."
        image={images.heroBlog}
      />

      <SectionBand tone="deep">
        <section
          aria-labelledby="posts-heading"
          className={`py-16 sm:py-24 ${gutter}`}
        >
          <h2
            id="posts-heading"
            className="sr-only"
          >
            Latest articles
          </h2>

          <div
            className={`grid gap-6 sm:grid-cols-2 lg:gap-8 ${
              rest.length > 2 ? "lg:grid-cols-3" : "lg:grid-cols-2"
            }`}
          >
            {latest && (
              <PostCard
                post={latest}
                featured
              />
            )}
            {rest.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
              />
            ))}
          </div>
        </section>
      </SectionBand>

      <CtaBand />
    </main>
  );
}