import { services } from "@/data/Services";
import { siteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

/*
  Structured data that tells Google who the business is.

  Only real, confirmed facts go in here. Deliberately NOT included:
  - ratings or reviews (never add these unless they are real and verifiable)
  - opening hours (confirm first: the old site only says support is available 24/7)
  - social links: add them to `sameAs` once the owner has real profiles

  CONFIRM WITH THE OWNER: street address and the suburbs he serves. Add a
  `streetAddress` and `postalCode` to `address`, and list areas in `areaServed`.
*/
export default function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${siteUrl}/#business`,
    name: site.name,
    url: siteUrl,
    description:
      "Garage door, gate motor and electric fence repairs and installations with flexible appointments and warranties on most services.",
    slogan: site.tagline,
    image: `${siteUrl}/logo.png`,
    logo: `${siteUrl}/logo.png`,
    telephone: `+${site.whatsappNumber}`,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Durban",
      addressRegion: "KwaZulu-Natal",
      addressCountry: "ZA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -29.9118637,
      longitude: 30.8598374,
    },
    areaServed: { "@type": "City", name: "Durban" },
    sameAs: [] as string[],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
