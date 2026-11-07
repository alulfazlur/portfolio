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
        background: "#1c1917",
        borderBottom: "16px solid #e5482c",
        color: "#f6f3ee",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, color: "#ef5a3c" }}>
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
            color: "#a8a29e",
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
