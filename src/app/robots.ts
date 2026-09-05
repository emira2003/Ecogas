import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/schema";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/showcase"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
