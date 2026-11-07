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
  /** Short points shown on the services page, based on the owner's own wording */
  highlights: string[];
  /** Typical faults, shown on the services page. OWNER TO REVIEW AND EDIT. */
  commonProblems?: string[];
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
  3. Write an honest `imageAlt` describing the photo

  Descriptions and highlights come from the owner's old website.
  Tags: installation and repairs are stated on the old site for garage doors,
  gates, electric fences and carports. Burglar guards and clearview fencing are
  tagged as installation only. Confirm with the owner and edit if needed.

  `commonProblems` are typical faults written as general examples. The owner
  should review them and remove anything he does not handle.
*/
export const services: Service[] = [
  {
    id: "garage-doors",
    title: "Garage doors",
    image: "/images/home-garage-doors.jpg",
    imageAlt: "A garage door installed by OP Garage & Gate Repairs",
    description:
      "Enhance your home's safety with prompt garage door installation and repairs.",
    tags: ["Installation", "Repairs"],
    icon: Warehouse,
    highlights: [
      "New garage door installation",
      "Garage door repairs",
      "Emergency repairs, just a call away",
    ],
    commonProblems: [
      "Door won't open or close",
      "Door stuck or off its track",
      "Remote or opener not responding",
      "Noisy or jerky movement",
    ],
    // image: "/images/services/garage-doors.jpg",
    // imageAlt: "Garage door installed by OP Garage & Gate Repairs",
    placeholder:
      "linear-gradient(135deg, #0b4a37 0%, #1c6b52 55%, #2a8a69 100%)",
  },
  {
    id: "gate-motors",
    title: "Gate motors",
    image: "/images/home-gate-motors.jpg",
    imageAlt:
      "A gate motor fitted to a sliding gate by OP Garage & Gate Repairs",
    description:
      "Our skilled technicians ensure secure and efficient operation of various gate motors.",
    tags: ["Installation", "Repairs"],
    icon: DoorOpen,
    highlights: [
      "Installation of various gate motors",
      "Gate motor repairs and servicing",
      "Secure, efficient day-to-day operation",
    ],
    commonProblems: [
      "Gate won't open or close",
      "Remote not working",
      "Motor clicking, humming or stalling",
      "Gate stopping halfway",
    ],
    // image: "/images/services/gate-motors.jpg",
    // imageAlt: "Gate motor installed by OP Garage & Gate Repairs",
    placeholder:
      "linear-gradient(135deg, #5a4300 0%, #a67c00 55%, #f5c518 100%)",
  },
  {
    id: "electric-fences",
    title: "Electric fences",
    image: "/images/home-electric-fences.jpg",
    imageAlt: "An electric fence installed along a boundary wall",
    description: "We provide professional installation of electric fences.",
    tags: ["Installation", "Maintenance"],
    icon: Zap,
    highlights: [
      "Professional electric fence installation",
      "Electric fence maintenance",
      "Extra security for your property",
    ],
    commonProblems: [
      "Fence not energising",
      "Alarm or energiser fault",
      "Damaged or broken wires",
    ],
    // image: "/images/services/electric-fences.jpg",
    // imageAlt: "Electric fence installed by OP Garage & Gate Repairs",
    placeholder:
      "linear-gradient(135deg, #0a3a4a 0%, #14677f 55%, #2aa3c4 100%)",
  },
  {
    id: "burglar-guards",
    title: "Burglar guards",
    image: "/images/home-burglar-guards.jpg",
    imageAlt: "Burglar guards fitted to a window by OP Garage & Gate Repairs",
    description: "Boost your home's security with reliable burglar guards.",
    tags: ["Installation"],
    icon: ShieldCheck,
    highlights: [
      "Reliable burglar guards",
      "Boosts your home's security",
      "Installed by skilled technicians",
    ],
    // image: "/images/services/burglar-guards.jpg",
    // imageAlt: "Burglar guards fitted by OP Garage & Gate Repairs",
    placeholder:
      "linear-gradient(135deg, #2c2a4a 0%, #4b4691 55%, #7a6fd6 100%)",
  },
  {
    id: "clearview-fencing",
    title: "Clearview fencing",
    image: "/images/home-clearview-fencing.jpg",
    imageAlt: "A clearview fence installed by OP Garage & Gate Repairs",
    description:
      "Our expert technicians create a secure and clear fence for an unobstructed view.",
    tags: ["Installation"],
    icon: Grid3x3,
    highlights: [
      "Secure, clear fencing",
      "An unobstructed view",
      "Installed by expert technicians",
    ],
    // image: "/images/services/clearview-fencing.jpg",
    // imageAlt: "Clearview fencing installed by OP Garage & Gate Repairs",
    placeholder:
      "linear-gradient(135deg, #3d4a12 0%, #6b8a1f 55%, #a6c93a 100%)",
  },
  {
    id: "carports",
    title: "Carports",
    image: "/images/home-carports.jpg",
    imageAlt:
      "A carport with a car parked underneath, installed by OP Garage & Gate Repairs",
    description:
      "Discover a variety of carport styles, from freestanding to attached, that complement your home.",
    tags: ["Installation", "Repairs"],
    icon: Car,
    highlights: [
      "Freestanding and attached styles",
      "Carport installation and repairs",
      "Designed to complement your home",
    ],
    // image: "/images/services/carports.jpg",
    // imageAlt: "Carport built by OP Garage & Gate Repairs",
    placeholder:
      "linear-gradient(135deg, #4a1d12 0%, #9a3f1f 55%, #e07a3a 100%)",
  },
];
