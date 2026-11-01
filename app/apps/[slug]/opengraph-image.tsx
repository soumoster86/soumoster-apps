import { ImageResponse } from "next/og";
import { getApp, getApps } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const apps = await getApps();
  return apps.map((app) => ({ slug: app.slug }));
}

export default async function AppOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = await getApp(slug);
  const accent = app?.accent?.dark ?? "#C4BFFF";
  const name = app?.name ?? "SouMoster Apps";
  const tagline = app?.tagline ?? "Offline Android tools";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f172a",
          color: "#f8fafc",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#94a3b8" }}>SOUMOSTER APPS</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1 }}>{name}</div>
          <div style={{ marginTop: 20, fontSize: 32, color: accent }}>{tagline}</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#94a3b8" }}>No account · No ads · On this phone</div>
      </div>
    ),
    size,
  );
}
