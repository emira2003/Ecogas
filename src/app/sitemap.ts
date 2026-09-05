import type { MetadataRoute } from "next";
import { areas } from "@/data/areas";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/schema";

/** Every public page (PLAN.md D1). The showcase page and the API are deliberately left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly",
    priority,
  });

  return [
    entry("/", 1),
    entry("/services", 0.9),
    ...services.map((s) => entry(`/services/${s.slug}`, 0.9)),
    entry("/estimate", 0.9),
    entry("/areas", 0.7),
    ...areas.map((a) => entry(`/areas/${a.slug}`, 0.7)),
    entry("/our-work", 0.6),
    entry("/reviews", 0.6),
    entry("/about", 0.6),
    entry("/contact", 0.8),
    entry("/privacy-policy", 0.2),
  ];
}
