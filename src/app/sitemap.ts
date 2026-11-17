import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { url } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url, priority: 1 },
    ...projects.map(({ slug }) => ({
      url: `${url}/work/${slug}`,
      priority: 0.8,
    })),
    { url: `${url}/about`, priority: 0.6 },
    { url: `${url}/privacy`, priority: 0.2 },
  ];
}
