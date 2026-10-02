import type { MetadataRoute } from "next";
import { projectData } from "@/lib/projectData";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/experience", "/about", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const caseStudies = projectData
    .filter((p) => p.caseStudy)
    .map((p) => ({ url: `${SITE_URL}/projects/${p.id}`, changeFrequency: "monthly" as const, priority: 0.7 }));
  return [...pages, ...caseStudies];
}
