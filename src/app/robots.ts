import type { MetadataRoute } from "next";
import { INDEXAR, ROBOS_DE_IA, SITE_URL } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  if (!INDEXAR) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Explícito para os buscadores de IA (ChatGPT, Claude, Perplexity, Gemini, Apple).
      ...ROBOS_DE_IA.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
