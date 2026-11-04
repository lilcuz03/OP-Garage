/*
  EVERY PHOTO SLOT ON THE SITE LIVES HERE.

  HOW TO ADD A PHOTO
  1. Save the photo in  public/images/pages/   (use a descriptive file name)
  2. Uncomment the `src` line for that slot and set the real file name
  3. Write an honest `alt` describing what is in the photo

  Until `src` is set, a colored placeholder is shown.
  Service card photos are separate: see src/data/services.ts
*/

export type ImageSlotData = {
  /** Path inside /public, e.g. "/images/pages/team-at-work.jpg" */
  src?: string;
  /** Describe what is in the photo (SEO and accessibility) */
  alt: string;
  /** Temporary gradient shown until a real photo is added */
  placeholder: string;
  /** Short note shown on the placeholder so you know what photo belongs here */
  label: string;
  /** Which part of the photo stays visible when cropped, e.g. "center 30%" */
  position?: string;
};

export const images = {
  /* Page banners: wide landscape photos, 2000px or more, with calm areas for text */
  heroServices: {
    // src: "/images/pages/hero-services.jpg",
    alt: "OP Garage & Gate Repairs technician installing a gate motor",
    placeholder: "linear-gradient(135deg, #5a4300 0%, #a67c00 100%)",
    label: "Banner: technician installing or repairing a gate or door",
  },
  heroAbout: {
    // src: "/images/pages/hero-about.jpg",
    alt: "The OP Garage & Gate Repairs team",
    placeholder: "linear-gradient(135deg, #0b4a37 0%, #2a8a69 100%)",
    label: "Banner: the owner and team",
  },
  heroContact: {
    // src: "/images/pages/hero-contact.jpg",
    alt: "OP Garage & Gate Repairs vehicle ready for a call-out",
    placeholder: "linear-gradient(135deg, #0a3a4a 0%, #2aa3c4 100%)",
    label: "Banner: branded vehicle or technician with tools",
  },

  /* About page photos: landscape, about 1600px wide */
  aboutTeam: {
    // src: "/images/pages/about-team.jpg",
    alt: "The OP Garage & Gate Repairs team on a job",
    placeholder: "linear-gradient(135deg, #2c2a4a 0%, #7a6fd6 100%)",
    label: "Photo: the team at work",
  },
  aboutVan: {
    // src: "/images/pages/about-vehicle.jpg",
    alt: "OP Garage & Gate Repairs branded vehicle",
    placeholder: "linear-gradient(135deg, #4a1d12 0%, #e07a3a 100%)",
    label: "Photo: branded vehicle",
  },
} satisfies Record<string, ImageSlotData>;

export type ImageKey = keyof typeof images;
