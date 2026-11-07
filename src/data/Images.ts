export type ImageSlot = {
  /* Add this when you have the photo, e.g. "/images/hero-services.jpg" */
  src?: string;
  alt: string;
  position?: string;
  /* Tailwind classes or a CSS colour/gradient shown while there is no photo */
  placeholder?: string;
  label?: string;
};

/* Same type under a second name, so files that also have a component called
   ImageSlot can import it without a name clash. */
export type ImageSlotData = ImageSlot;

type ImageKey =
  | "heroServices"
  | "heroAbout"
  | "heroFaq"
  | "heroContact"
  | "heroBlog"
  | "heroGallery"
  | "heroHome"
  | "heroGate1"
  | "heroGate2"
  | "heroGate3"
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
  heroGallery: {
    alt: "A finished installation by OP Garage & Gate Repairs",
    placeholder: "bg-gradient-to-tl from-steel/50 via-surface to-accent/20",
    label: "Gallery hero photo",
  },
  heroHome: {
    src: "/images/hero-home.png",
    alt: "OP Garage & Gate Repairs technician at work",
    placeholder: "bg-gradient-to-br from-steel/50 via-surface to-accent/20",
    label: "Home hero background photo",
  },
  /* The three photos that appear inside the animated garage door on the home page.
     Each time the door opens, the next photo is shown. Add more slots the same way. */
  heroGate1: {
    src: "/images/hero-gate-1.jpg",
    alt: "A gate installed by OP Garage & Gate Repairs",
    placeholder: "linear-gradient(135deg, #0b4a37 0%, #2a8a69 100%)",
    label: "Gate photo 1",
  },
  heroGate2: {
    src: "/images/hero-gate-2.jpeg",
    alt: "A garage door installed by OP Garage & Gate Repairs",
    placeholder: "linear-gradient(135deg, #0a3a4a 0%, #2aa3c4 100%)",
    label: "Gate photo 2",
  },
  heroGate3: {
    src: "/images/hero-gate-3.jpeg",

    alt: "A gate motor installed by OP Garage & Gate Repairs",
    placeholder: "linear-gradient(135deg, #4a1d12 0%, #e07a3a 100%)",
    label: "Gate photo 3",
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
  heroBlog: {
    alt: "OP Garage & Gate Repairs tips and advice",
    placeholder: "bg-gradient-to-tr from-steel/50 via-surface to-accent/20",
    label: "Blog hero photo",
  },
};
