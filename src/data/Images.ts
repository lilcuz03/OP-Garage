export type ImageSlot = {
  /* Add this when you have the photo, e.g. "/images/hero-services.jpg" */
  src?: string;
  alt: string;
  position?: string;
  /* Tailwind classes or a CSS colour/gradient shown while there is no photo */
  placeholder?: string;
  label?: string;
};

type ImageKey =
  | "heroServices"
  | "heroAbout"
  | "heroFaq"
  | "heroContact"
  | "aboutTeam"
  | "aboutVan"
  | "process";

/* Photos go in /public/images. Until a slot has a `src`, its placeholder shows. */
export const images: Record<ImageKey, ImageSlot> = {
  heroServices: {
    alt: "OP Garage & Gate technician installing a garage door",
    placeholder: "bg-gradient-to-br from-steel/50 via-surface to-accent/20",
    label: "Services hero photo",
  },
  heroAbout: {
    alt: "The OP Garage & Gate team at work",
    placeholder: "bg-gradient-to-tr from-accent/20 via-surface to-steel/50",
    label: "About hero photo",
  },
  heroFaq: {
    alt: "OP Garage & Gate technician answering a customer's question",
    placeholder: "bg-gradient-to-bl from-steel/50 via-surface to-accent/20",
    label: "FAQ hero photo",
  },
  heroContact: {
    alt: "Contact OP Garage & Gate Repairs in Durban",
    placeholder: "bg-gradient-to-br from-accent/20 via-surface to-steel/50",
    label: "Contact hero photo",
  },
  aboutTeam: {
    alt: "The OP Garage & Gate repair team",
    placeholder: "bg-gradient-to-br from-steel/40 via-surface to-accent/20",
    label: "Team photo",
  },
  aboutVan: {
    alt: "OP Garage & Gate service vehicle",
    placeholder: "bg-gradient-to-br from-steel/40 via-surface to-accent/20",
    label: "Service vehicle photo",
  },
  process: {
    alt: "OP Garage & Gate technician inspecting a gate motor",
    placeholder: "bg-gradient-to-br from-steel/40 via-surface to-accent/20",
    label: "Process photo",
  },
};
