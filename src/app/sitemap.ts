import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site-config";
import { odysseys } from "@/content/odysseys";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/odysseys", "/about", "/take-action", "/data"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
    })
  );

  const odysseyRoutes = odysseys.map((odyssey) => ({
    url: `${SITE_URL}/odysseys/${odyssey.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...odysseyRoutes];
}
