import type { ImageSlot } from "@/data/Images";

export type ServiceDetail = {
  slug: string;
  title: string;
  intro: string;
  offers: string[];
  signs?: string[];
  image: ImageSlot;
};

/* To add a real photo, add `src: "/images/garage-doors.jpg"` to that entry's image. */
export const serviceDetails: ServiceDetail[] = [
  {
    slug: "garage-doors",
    title: "Garage doors",
    intro:
      "Your garage door is one of the main ways into your home, so when it jams or won't close, your security suffers. We install new garage doors and repair existing ones, with flexible appointments and fast repairs.",
    offers: ["Installation", "Repairs"],
    signs: [
      "The door won't open or close",
      "Grinding or banging noises",
      "The door sticks or moves unevenly",
      "The remote or wall button has stopped responding",
    ],
    image: {
      src: "/images/service-garage-doors.jpeg",
      alt: "Garage door installed by OP Garage & Gate Repairs",
      placeholder: "bg-gradient-to-br from-steel/40 via-surface to-accent/20",
      label: "Garage door photo",
    },
  },
  {
    slug: "gate-motors",
    title: "Gate motors",
    intro:
      "A gate motor that fails leaves your property open and your driveway blocked. Our skilled technicians install and repair a variety of gate motors so your gate keeps opening and closing securely and efficiently.",
    offers: ["Installation", "Repairs"],
    signs: [
      "The gate won't open or close",
      "The motor hums but the gate doesn't move",
      "Your remotes have stopped working",
      "The gate stops or reverses partway",
    ],
    image: {
      src: "/images/service-gate-motors.jpeg",

      alt: "Gate motor installation by OP Garage & Gate Repairs",
      placeholder: "bg-gradient-to-tr from-accent/20 via-surface to-steel/40",
      label: "Gate motor photo",
    },
  },
  {
    slug: "electric-fences",
    title: "Electric fences",
    intro:
      "An electric fence is a strong deterrent around your property. We provide professional installation of electric fences, along with maintenance to keep them working as they should.",
    offers: ["Installation", "Maintenance"],
    image: {
      src: "/images/service-electric-fences1.jpg",

      alt: "Electric fence installed by OP Garage & Gate Repairs",
      placeholder: "bg-gradient-to-bl from-steel/40 via-surface to-accent/20",
      label: "Electric fence photo",
    },
  },
  {
    slug: "burglar-guards",
    title: "Burglar guards",
    intro:
      "Burglar guards add a visible layer of protection to your home. We install reliable burglar guards that boost your home's security.",
    offers: ["Installation"],
    image: {
      src: "/images/service-burglar-guards.jpg",

      alt: "Burglar guards installed by OP Garage & Gate Repairs",
      placeholder: "bg-gradient-to-br from-accent/20 via-surface to-steel/40",
      label: "Burglar guards photo",
    },
  },
  {
    slug: "clearview-fencing",
    title: "Clearview fencing",
    intro:
      "Clearview fencing keeps your boundary secure without blocking your view. Our expert technicians install secure, clear fencing so you keep an unobstructed view of your surroundings.",
    offers: ["Installation"],
    image: {
      src: "/images/service-clearview-fencing.jpg",

      alt: "Clearview fencing installed by OP Garage & Gate Repairs",
      placeholder: "bg-gradient-to-tr from-steel/40 via-surface to-accent/20",
      label: "Clearview fencing photo",
    },
  },
  {
    slug: "carports",
    title: "Carports",
    intro:
      "A carport shields your vehicle from harsh sun and the elements. We install a variety of carport styles, from freestanding to attached, to complement your home, and we handle carport repairs too.",
    offers: ["Installation", "Repairs"],
    image: {
      src: "/images/service-carports.jpg",

      alt: "Carport installed by OP Garage & Gate Repairs",
      placeholder: "bg-gradient-to-bl from-accent/20 via-surface to-steel/40",
      label: "Carport photo",
    },
  },
];
