import { z } from "zod";
import { FEATURE_ICONS } from "@/lib/icons";

export const CATEGORY_VALUES = ["Documents", "Media", "Notes"] as const;
export const STATUS_VALUES = ["live", "closed-test", "in-development", "coming-soon"] as const;

const accentSchema = z.object({
  light: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  dark: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});

const featureSchema = z.object({
  icon: z.string().refine((icon): icon is keyof typeof FEATURE_ICONS => icon in FEATURE_ICONS, {
    message: "Unknown feature icon",
  }),
  title: z.string().min(1),
  body: z.string().min(1),
});

const screenshotSchema = z
  .object({
    alt: z.string().min(1),
    id: z.string().optional(),
    src: z.string().optional(),
  })
  .refine((shot) => Boolean(shot.id || shot.src), {
    message: "A screenshot needs an id or a src",
  });

const privacySchema = z.object({
  account: z.boolean(),
  ads: z.boolean(),
  internet: z.boolean(),
  storage: z.string().min(1),
  export: z.string().min(1),
});

const faqSchema = z.object({
  q: z.string().min(1),
  a: z.string().min(1),
});

export const appSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string().min(1),
    tagline: z.string().min(1),
    category: z.enum(CATEGORY_VALUES),
    status: z.enum(STATUS_VALUES),
    order: z.number().int(),
    spotlight: z.boolean().default(false),
    accent: accentSchema.optional(),
    icon: z.string().optional(),
    package: z.string().optional(),
    version: z.string().optional(),
    minAndroid: z.string().optional(),
    playUrl: z.string().url().nullable().optional(),
    testUrl: z.string().url().nullable().optional(),
    highlights: z.array(z.string()).default([]),
    features: z.array(featureSchema).default([]),
    screenshots: z.array(screenshotSchema).default([]),
    privacy: privacySchema.optional(),
    privacyPolicy: z.string().optional(),
    released: z.string().nullable().optional(),
    faqs: z.array(faqSchema).default([]),
  })
  .superRefine((app, ctx) => {
    if (app.status === "coming-soon") return;

    const required: (keyof typeof app)[] = [
      "accent",
      "icon",
      "package",
      "version",
      "minAndroid",
      "privacy",
      "privacyPolicy",
    ];

    for (const key of required) {
      const value = app[key];
      if (value == null || value === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [key],
          message: `${key} is required unless status is coming-soon`,
        });
      }
    }

    if (app.features.length !== 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["features"],
        message: "The feature grid expects exactly six features",
      });
    }

    if (app.highlights.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["highlights"],
        message: "A card needs at least two highlight chips",
      });
    }
  });

export type AppRecord = z.output<typeof appSchema>;

export const pageSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  updated: z.string().optional(),
});

export const policySchema = z.object({
  updated: z.string().min(1),
});
