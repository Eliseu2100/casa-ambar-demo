import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date("2026-11-01"),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE_URL}/images/fachada-2400.webp`, `${SITE_URL}/images/sala-2400.webp`],
    },
  ];
}
