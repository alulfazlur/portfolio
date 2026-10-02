import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

type OgContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function renderOgImage({ eyebrow, title, subtitle }: OgContent) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#0f172a",
        backgroundImage:
          "radial-gradient(circle at 90% 0%, #0f766e 0%, #0f172a 60%)",
        color: "#f8fafc",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, color: "#5eead4" }}>
        {eyebrow}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#94a3b8",
            lineHeight: 1.35,
            maxWidth: 960,
          }}
        >
          {subtitle}
        </div>
      </div>
    </div>,
    ogSize,
  );
}
