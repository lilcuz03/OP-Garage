import { services } from "@/data/Services";

/*
  HOW TO ADD A PROJECT PHOTO
  1. Save the photo in  public/images/gallery/   (descriptive file name, e.g. sliding-gate-motor-suburb.jpg)
  2. Add an entry to `projects` below
  3. Pick the right `category` (a service id from services.ts, or "team")

  While `projects` is empty the page shows colored placeholder tiles.
  As soon as you add your first real project, ALL placeholders disappear
  automatically, and tabs with no photos are hidden.

  Tips for authenticity and SEO:
  - `title` says what was done ("Sliding gate motor installation")
  - `location` is the suburb ("Suburb name"), good for local search
  - `alt` describes what is in the photo, plainly and honestly
  - Landscape photos at about 1600px wide work best
*/

export type CategoryId = string;
export type Aspect = "landscape" | "portrait" | "square";

export type GalleryItem = {
  id: string;
  category: CategoryId;
  title: string;
  /** Suburb or area, shown on the photo and in the preview */
  location?: string;
  /** Path inside /public, e.g. "/images/gallery/gate-motor-1.jpg" */
  src?: string;
  alt: string;
  aspect: Aspect;
  /** Which part stays visible when cropped, e.g. "center 30%" */
  position?: string;
  isPlaceholder?: boolean;
};

/* One tab per service, plus "Our team" for people and vehicle photos */
export const categories: { id: CategoryId; label: string }[] = [
  { id: "all", label: "All" },
  ...services.map((s) => ({ id: s.id, label: s.title })),
  { id: "team", label: "Our team" },
];

/* Placeholder colors follow the service colors */
export const categoryGradients: Record<string, string> = {
  ...Object.fromEntries(services.map((s) => [s.id, s.placeholder])),
  team: "linear-gradient(135deg, #1c3a2c 0%, #2a8a69 100%)",
};

/* ───────── ADD REAL PROJECTS HERE ───────── */
export const projects: GalleryItem[] = [
  // {
  //   id: "gate-motor-1",
  //   category: "gate-motors",
  //   title: "Sliding gate motor installation",
  //   location: "Suburb name",
  //   src: "/images/gallery/gate-motor-1.jpg",
  //   alt: "Sliding gate motor installed by OP Garage & Gate Repairs",
  //   aspect: "landscape",
  // },
];

/* ───────── Automatic placeholders (shown only while `projects` is empty) ───────── */
const aspects: Aspect[] = ["landscape", "portrait", "square", "landscape"];

const placeholders: GalleryItem[] = categories
  .filter((c) => c.id !== "all")
  .flatMap((c, ci) =>
    [0, 1].map((n) => ({
      id: `placeholder-${c.id}-${n}`,
      category: c.id,
      title: `${c.label} project`,
      alt: `${c.label} project photo coming soon`,
      aspect: aspects[(ci + n) % aspects.length],
      isPlaceholder: true,
    })),
  );

export const galleryItems: GalleryItem[] =
  projects.length > 0 ? projects : placeholders;
