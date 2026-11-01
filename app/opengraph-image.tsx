import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0f172a",
          color: "#f8fafc",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#94a3b8" }}>SOUMOSTER APPS</div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.05,
            backgroundImage: "linear-gradient(105deg, #A9C7FF, #FFB59B, #8FD5B5, #CEBAFF)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Small apps. Big pockets.
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 28, color: "#94a3b8" }}>
          Offline Android tools with no account and no ads
        </div>
      </div>
    ),
    size,
  );
}
