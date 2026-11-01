import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getApps } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const apps = await getApps();
  const staticRoutes = ["", "/apps", "/about", "/support", "/privacy"].map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const appRoutes: MetadataRoute.Sitemap = apps.flatMap((app) => {
    const routes: MetadataRoute.Sitemap = [
      {
        url: `${SITE_URL}/apps/${app.slug}`,
        changeFrequency: "weekly",
        priority: 0.8,
      },
    ];
    if (app.privacyPolicy) {
      routes.push({
        url: `${SITE_URL}/apps/${app.slug}/privacy`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    return routes;
  });

  return [...staticRoutes, ...appRoutes];
}
