import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { appSchema, pageSchema, policySchema, type AppRecord } from "@/lib/schema";
import { renderMarkdown } from "@/lib/markdown";

const appsDir = path.join(process.cwd(), "content", "apps");
const pagesDir = path.join(process.cwd(), "content", "pages");

export interface AppContent extends AppRecord {
  bodyHtml: string;
}

export interface PageContent {
  title: string;
  description: string;
  updated?: string;
  html: string;
}

export interface PolicyContent {
  updated: string;
  html: string;
}

let productionCache: Promise<AppContent[]> | null = null;

function fail(file: string, message: string): never {
  throw new Error(`${file}: ${message}`);
}

function publicFile(urlPath: string) {
  return path.join(process.cwd(), "public", urlPath.replace(/^\//, ""));
}

async function loadApps(): Promise<AppContent[]> {
  const files = fs
    .readdirSync(appsDir)
    .filter((name) => name.endsWith(".mdx") && !name.startsWith("_"));

  const apps = await Promise.all(
    files.map(async (file) => {
      const absolute = path.join(appsDir, file);
      const raw = fs.readFileSync(absolute, "utf8");
      const { data, content } = matter(raw);
      const parsed = appSchema.safeParse(data);

      if (!parsed.success) {
        const details = parsed.error.issues
          .map((issue) => `${issue.path.join(".") || "front matter"}: ${issue.message}`)
          .join("; ");
        fail(file, details);
      }

      const app = parsed.data;
      const expected = file.replace(/\.mdx$/, "");
      if (app.slug !== expected) {
        fail(file, `slug "${app.slug}" must match the file name`);
      }

      if (app.icon && !fs.existsSync(publicFile(app.icon))) {
        fail(file, `icon file not found at public${app.icon}`);
      }

      for (const shot of app.screenshots) {
        if (shot.src && !fs.existsSync(publicFile(shot.src))) {
          fail(file, `screenshot not found at public${shot.src}`);
        }
      }

      if (app.privacyPolicy) {
        const policyPath = path.resolve(appsDir, app.privacyPolicy);
        if (!policyPath.startsWith(appsDir) || !fs.existsSync(policyPath)) {
          fail(file, `privacy policy not found at ${app.privacyPolicy}`);
        }
      }

      const body = content.trim();
      if (app.status !== "coming-soon" && body.length === 0) {
        fail(file, "the description body is empty");
      }

      return {
        ...app,
        bodyHtml: body ? await renderMarkdown(body) : "",
      };
    }),
  );

  return apps.sort((a, b) => a.order - b.order);
}

export function getApps() {
  if (process.env.NODE_ENV === "production") {
    if (!productionCache) productionCache = loadApps();
    return productionCache;
  }
  return loadApps();
}

export async function getApp(slug: string) {
  const apps = await getApps();
  return apps.find((app) => app.slug === slug) ?? null;
}

export async function getPolicy(app: AppRecord): Promise<PolicyContent> {
  if (!app.privacyPolicy) {
    throw new Error(`${app.slug} has no privacy policy`);
  }
  const absolute = path.resolve(appsDir, app.privacyPolicy);
  const { data, content } = matter(fs.readFileSync(absolute, "utf8"));
  const parsed = policySchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(`${app.privacyPolicy} is missing an updated date`);
  }
  return {
    updated: parsed.data.updated,
    html: await renderMarkdown(content),
  };
}

export async function getPage(name: "about" | "support" | "privacy"): Promise<PageContent> {
  const absolute = path.join(pagesDir, `${name}.mdx`);
  const { data, content } = matter(fs.readFileSync(absolute, "utf8"));
  const parsed = pageSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(`content/pages/${name}.mdx has invalid front matter`);
  }
  return {
    ...parsed.data,
    html: await renderMarkdown(content),
  };
}
