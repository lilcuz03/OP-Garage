import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";

/*
  GOING LIVE
  While NEXT_PUBLIC_SITE_URL is NOT set in Vercel (or points to a vercel.app address),
  the whole site is marked noindex so Google ignores the preview copy.

  At launch: in Vercel > Settings > Environment Variables, set
    NEXT_PUBLIC_SITE_URL = https://opgaragegaterepairs.co.za
  then redeploy. The site becomes indexable and the sitemap switches on.
*/
const PREVIEW_URL = "https://opgaragegaterepairs-one.vercel.app";
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const siteUrl = (rawUrl ?? PREVIEW_URL).replace(/\/$/, "");
export const isLive = Boolean(rawUrl) && !siteUrl.includes("vercel.app");

const defaultTitle = `${site.name} | Garage Doors, Gate Motors & Electric Fences`;

/* CONFIRM "Durban" with the owner. It comes from the old site's location data. */
const defaultDescription =
  "Fast, affordable garage door, gate motor and electric fence repairs and installations in Durban. Flexible appointments, expert service and warranties on most services.";

/* Use in src/app/layout.tsx:  export const metadata = siteMetadata; */
export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: defaultDescription,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: site.name,
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: isLive
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

/* Use in src/app/layout.tsx:  export const viewport = siteViewport; */
export const siteViewport: Viewport = {
  themeColor: "#06241b",
  width: "device-width",
  initialScale: 1,
};

/*
  Use in every page so it gets its own title, description, canonical URL and
  social preview (Open Graph + Twitter). The preview image comes from
  src/app/opengraph-image.tsx automatically.
*/
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  /** Page path such as "/services" */
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_ZA",
      siteName: site.name,
      title: fullTitle,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
