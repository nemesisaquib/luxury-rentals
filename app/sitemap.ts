import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: "daily", priority: 1 },
    { url: `${SITE.url}/stays`, changeFrequency: "daily", priority: 0.9 },
  ];

  let properties: { slug: string; createdAt: Date }[] = [];
  try {
    properties = await prisma.property.findMany({
      select: { slug: true, createdAt: true },
    });
  } catch (error) {
    console.warn("Could not connect to database during sitemap generation. Returning static routes only.");
  }

  const listingRoutes: MetadataRoute.Sitemap = properties.map((l) => ({
    url: `${SITE.url}/stays/${l.slug}`,
    lastModified: l.createdAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...listingRoutes];
}
