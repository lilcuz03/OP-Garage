import type { MetadataRoute } from "next";
import { isLive, siteUrl } from "@/lib/seo";

/*
  Crawling stays allowed on purpose. While the site is not live, every page
  carries a noindex tag (see src/lib/seo.ts), and Google can only obey that tag
  if it is allowed to crawl the page. The sitemap is only published once live.
*/
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    ...(isLive ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
