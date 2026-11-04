export const site = {
  name: "OP Garage & Gate Repairs",
  tagline: "Opening Doors, Securing Futures",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://opgaragegaterepairs.co.za",
  phone: "+27 64 151 1483",
  phoneHref: "tel:+27641511483",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "27641511483",
  email: "info@opgaragegaterepairs.co.za",
} as const;

export const nav = [
  { label: "Services", href: "/#services" },
  { label: "How it works", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export const whatsappLink = (
  message = "Hi OP Garage & Gate Repairs, I'd like a quote.",
) => `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
