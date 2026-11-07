import type { ImageSlot } from "@/data/Images";

export const SITE_URL = "https://opgaragegaterepairs.co.za";

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title: string; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: string;
  /** ISO date, yyyy-mm-dd */
  date: string;
  image: ImageSlot;
  /** Links to /services/[slug] at the bottom of the article */
  service?: { slug: string; label: string };
  body: PostBlock[];
};

/* To add a real photo, add `src: "/images/blog-gate-motor.jpg"` to a post's image. */
export const posts: Post[] = [
  {
    slug: "gate-motor-not-working-what-to-check",
    title: "Gate motor not working? 7 things to check before you call",
    description:
      "Gate won't open or close? Run through these quick, safe checks, from power and remotes to safety beams and the manual release, before calling a technician.",
    category: "Gate motors",
    date: "2026-11-04",
    image: {
      src: "/images/blog-gate-motor-check.jpg",
      alt: "A sliding gate with its motor and track",
      placeholder: "bg-gradient-to-br from-steel/40 via-surface to-accent/20",
      label: "Gate motor photo",
    },
    service: { slug: "gate-motors", label: "gate motor services" },
    body: [
      {
        type: "p",
        text: "A gate that won't move is stressful, especially when your car is stuck inside or outside. Many gate motor problems have simple causes, so these checks are worth a few minutes before you call anyone. Do them from outside the motor housing only, and never open the motor casing yourself.",
      },
      { type: "h2", text: "1. Check the power" },
      {
        type: "p",
        text: "Make sure the motor has power. Look at the indicator light or display on the motor if it has one, and check that the plug, the isolator switch and your distribution board's trip switch haven't been switched off or tripped. If the power was off recently and has just come back, give the motor a minute to start up.",
      },
      { type: "h2", text: "2. Check the backup battery" },
      {
        type: "p",
        text: "Many gate motors have a backup battery that keeps the gate working during power cuts. After several outages the battery can run flat, and an old battery may no longer hold a charge. If the gate worked during the day but stopped after an outage, this is a likely cause.",
      },
      { type: "h2", text: "3. Try another remote and the wall button" },
      {
        type: "p",
        text: "If only one remote fails, it's probably that remote's battery or the remote itself. If every remote and the wall button fail, the problem is more likely the motor, its receiver or its power supply.",
      },
      { type: "h2", text: "4. Look for obstructions" },
      {
        type: "p",
        text: "Check the gate's path for stones, sand, leaves, or anything wedged in the track. A gate that stops and reverses part-way has often hit something, or has become hard to move.",
      },
      { type: "h2", text: "5. Check the safety beams" },
      {
        type: "p",
        text: "Photo-beams (safety sensors) stop the gate from closing on a person or a car. If a beam is dirty, knocked out of line, or blocked by a plant or a spider web, the gate may refuse to close. Wipe the lenses gently and check that the two units face each other.",
      },
      { type: "h2", text: "6. Check the manual release" },
      {
        type: "p",
        text: "Gate motors have a manual release so you can move the gate by hand during a failure. If it was left disengaged, the motor can run or hum without moving the gate. Re-engage it as shown in your motor's manual and test again.",
      },
      { type: "h2", text: "7. Test the gate by hand" },
      {
        type: "p",
        text: "With the motor released, push the gate gently by hand. It should roll or swing freely. If it's stiff, heavy or catches, the problem may be the wheels, rails or hinges rather than the motor, and forcing the motor to drive a stuck gate can cause more damage.",
      },
      {
        type: "callout",
        title: "When to call a technician",
        text: "Call if the motor hums or clicks but the gate won't move, if you smell burning, if you see damaged or burnt wiring, if you hear grinding, or if none of the checks above help. Don't open the motor casing: it contains mains-powered electronics.",
      },
      { type: "h2", text: "Prevent it next time" },
      {
        type: "p",
        text: "Regular servicing helps catch worn batteries, dry moving parts and loose fittings before they stop your gate. Keep the track clear, the safety beams clean and your remotes' batteries fresh.",
      },
      {
        type: "p",
        text: "Gate still not working? Message or call us and describe what the gate is doing. The more detail you give, the faster we can help.",
      },
    ],
  },
  {
    slug: "garage-door-wont-open-or-close",
    title: "Garage door won't open or close? Common causes and what to do",
    description:
      "A garage door that jams, shudders or won't move usually points to a handful of causes. Here's what you can safely check and when to call a professional.",
    category: "Garage doors",
    date: "2026-11-04",
    image: {
      src: "/images/blog-garage-door.jpg",
      alt: "A garage door partly open",
      placeholder: "bg-gradient-to-tr from-accent/20 via-surface to-steel/40",
      label: "Garage door photo",
    },
    service: { slug: "garage-doors", label: "garage door services" },
    body: [
      {
        type: "p",
        text: "Your garage door is one of the main ways into your home, so when it jams or won't close, your security suffers too. Some causes are simple and safe to check yourself, and some are dangerous and need a professional. Here's how to tell the difference.",
      },
      { type: "h2", text: "Start with the simple things" },
      {
        type: "ul",
        items: [
          "Replace the battery in your remote, and try the wall button too.",
          "Check that the opener is plugged in and that the power is on.",
          "Make sure nothing, like a box or a bicycle, is in the door's path.",
        ],
      },
      { type: "h2", text: "Check the safety sensors" },
      {
        type: "p",
        text: "Most openers have sensors near the floor on either side of the door. If one is dirty, knocked out of line or blocked, the door may refuse to close, or close and then reverse. Wipe the lenses and check that both units point at each other.",
      },
      { type: "h2", text: "Look at the tracks and the door itself" },
      {
        type: "p",
        text: "Look for debris, dents or bends in the tracks, and for any part of the door that has come off the track. If the door looks crooked or uneven, don't keep trying to run it. Forcing it can turn a small repair into a big one.",
      },
      { type: "h2", text: "Check the manual release" },
      {
        type: "p",
        text: "If the release cord was pulled, the door is disconnected from the opener and the opener will run without moving it. If you're not sure about the condition of the springs, only use the release with the door fully closed.",
      },
      { type: "h2", text: "Listen for warning signs" },
      {
        type: "ul",
        items: [
          "Grinding or scraping often means rollers, hinges or tracks need attention.",
          "A loud bang, followed by a door that feels very heavy or won't lift, can mean a broken spring.",
          "Shaking or uneven movement can mean the door is out of balance.",
        ],
      },
      {
        type: "callout",
        title: "Springs and cables are dangerous",
        text: "Garage door springs and cables hold a great deal of tension. Never try to adjust, repair or remove them yourself. If you suspect a broken spring or cable, stop using the door and call a technician.",
      },
      { type: "h2", text: "Keep your door healthy" },
      {
        type: "p",
        text: "Keep the tracks clear of debris, avoid slamming the door, and have it serviced regularly. Small problems like worn rollers and loose fittings are cheaper to fix early than after they cause a breakdown.",
      },
      {
        type: "p",
        text: "If your door is stuck, noisy or won't close, message or call us. We handle garage door repairs and new installations, with flexible appointments.",
      },
    ],
  },
  {
    slug: "electric-fence-clearview-fencing-burglar-guards",
    title:
      "Electric fence, clearview fencing or burglar guards: which do you need?",
    description:
      "Each type of security protects your home in a different way. Here's how electric fences, clearview fencing and burglar guards compare, and why layering works best.",
    category: "Security tips",
    date: "2026-11-04",
    image: {
      src: "/images/blog-security-layers.jpg",
      alt: "A secured property boundary",
      placeholder: "bg-gradient-to-bl from-steel/40 via-surface to-accent/20",
      label: "Security photo",
    },
    service: { slug: "electric-fences", label: "electric fence services" },
    body: [
      {
        type: "p",
        text: "No single security measure does everything. Electric fences, clearview fencing and burglar guards each protect a different part of your property, and they work best together. Here's what each one does and what to ask before you buy.",
      },
      { type: "h2", text: "Electric fences: a deterrent at the boundary" },
      {
        type: "p",
        text: "An electric fence works at the edge of your property, discouraging people from climbing over before they get near your home. To keep one working properly, keep plants and debris off the wires, test it regularly, and have it maintained. Ask your installer about backup power and about any compliance paperwork that applies to your installation.",
      },
      {
        type: "h2",
        text: "Clearview fencing: security without blocking the view",
      },
      {
        type: "p",
        text: "Clearview fencing gives you a strong, secure boundary while keeping an unobstructed view. You can see what's happening outside, and anyone passing can see in too, which is its own deterrent.",
      },
      { type: "h2", text: "Burglar guards: protect doors and windows" },
      {
        type: "p",
        text: "Burglar guards add a physical barrier over doors and windows, the openings burglars most often target. Well-fitted guards keep an opening secure while still letting in light and air.",
      },
      { type: "h2", text: "Why layering works" },
      {
        type: "p",
        text: "Think of your property in layers. The boundary is the first layer, the entrances (your gate and garage door) are the second, and the doors and windows of the house are the last. If one layer is weak, a burglar will find it. A gate motor that works reliably and a garage door that closes properly are part of the same picture.",
      },
      { type: "h2", text: "Questions to ask before you buy" },
      {
        type: "ul",
        items: [
          "What exactly is included in the price?",
          "How will it be installed, and how is it maintained?",
          "Is there a warranty, and what does it cover?",
          "What happens during a power cut?",
          "Will I get any paperwork or compliance documents?",
        ],
      },
      {
        type: "callout",
        title: "Not sure what suits your property?",
        text: "Message us, tell us about your property and what worries you, and we'll talk you through the options.",
      },
    ],
  },
];

/* ───────── Helpers ───────── */

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/* "2026-11-04" -> "4 November 2026" (no Date object, so it is build-safe) */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function readingMinutes(post: Post) {
  const text = post.body
    .map((b) => {
      if (b.type === "p" || b.type === "h2") return b.text;
      if (b.type === "callout") return `${b.title} ${b.text}`;
      return b.items.join(" ");
    })
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function getPosts() {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getRelated(post: Post, count = 2) {
  const others = getPosts().filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...same, ...rest].slice(0, count);
}
