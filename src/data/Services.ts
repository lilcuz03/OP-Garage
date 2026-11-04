import {
  Car,
  DoorOpen,
  Grid3x3,
  ShieldCheck,
  Warehouse,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  /** Path inside /public, e.g. "/images/services/garage-doors.jpg". Leave out to show the colored placeholder. */
  image?: string;
  /** Describe what is in the photo (helps SEO and accessibility). */
  imageAlt?: string;
  /** Placeholder gradient shown until a real photo is added. */
  placeholder: string;
};

/*
  HOW TO ADD A PHOTO
  1. Save the photo in  public/images/services/
  2. Uncomment the `image` line for that service and set the real file name
  3. Write a short, honest `imageAlt` describing the photo

  Descriptions are taken from the owner's old website.
  Tags: installation and repairs are stated on the old site for garage doors,
  gates, electric fences and carports. Burglar guards and clearview fencing are
  tagged as installation only. Confirm with the owner and edit if needed.
*/
export const services: Service[] = [
  {
    id: "garage-doors",
    title: "Garage doors",
    description:
      "Enhance your home's safety with prompt garage door installation and repairs.",
    tags: ["Installation", "Repairs"],
    icon: Warehouse,
    // image: "/images/services/garage-doors.jpg",
    // imageAlt: "Garage door installed by OP Garage & Gate Repairs",
    placeholder:
      "linear-gradient(135deg, #0b4a37 0%, #1c6b52 55%, #2a8a69 100%)",
  },
  {
    id: "gate-motors",
    title: "Gate motors",
    description:
      "Our skilled technicians ensure secure and efficient operation of various gate motors.",
    tags: ["Installation", "Repairs"],
    icon: DoorOpen,
    // image: "/images/services/gate-motors.jpg",
    // imageAlt: "Gate motor installed by OP Garage & Gate Repairs",
    placeholder:
      "linear-gradient(135deg, #5a4300 0%, #a67c00 55%, #f5c518 100%)",
  },
  {
    id: "electric-fences",
    title: "Electric fences",
    description: "We provide professional installation of electric fences.",
    tags: ["Installation", "Maintenance"],
    icon: Zap,
    // image: "/images/services/electric-fences.jpg",
    // imageAlt: "Electric fence installed by OP Garage & Gate Repairs",
    placeholder:
      "linear-gradient(135deg, #0a3a4a 0%, #14677f 55%, #2aa3c4 100%)",
  },
  {
    id: "burglar-guards",
    title: "Burglar guards",
    description: "Boost your home's security with reliable burglar guards.",
    tags: ["Installation"],
    icon: ShieldCheck,
    // image: "/images/services/burglar-guards.jpg",
    // imageAlt: "Burglar guards fitted by OP Garage & Gate Repairs",
    placeholder:
      "linear-gradient(135deg, #2c2a4a 0%, #4b4691 55%, #7a6fd6 100%)",
  },
  {
    id: "clearview-fencing",
    title: "Clearview fencing",
    description:
      "Our expert technicians create a secure and clear fence for an unobstructed view.",
    tags: ["Installation"],
    icon: Grid3x3,
    // image: "/images/services/clearview-fencing.jpg",
    // imageAlt: "Clearview fencing installed by OP Garage & Gate Repairs",
    placeholder:
      "linear-gradient(135deg, #3d4a12 0%, #6b8a1f 55%, #a6c93a 100%)",
  },
  {
    id: "carports",
    title: "Carports",
    description:
      "Discover a variety of carport styles, from freestanding to attached, that complement your home.",
    tags: ["Installation", "Repairs"],
    icon: Car,
    // image: "/images/services/carports.jpg",
    // imageAlt: "Carport built by OP Garage & Gate Repairs",
    placeholder:
      "linear-gradient(135deg, #4a1d12 0%, #9a3f1f 55%, #e07a3a 100%)",
  },
];
