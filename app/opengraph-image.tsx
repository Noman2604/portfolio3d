import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Noman Patel — Full-Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0C0D0E",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#EFEFF1",
          border: "1px solid #23262D",
        }}
      >
        {/* Top Tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            border: "1px solid #23262D",
            borderRadius: "4px",
            padding: "8px 16px",
            fontSize: "15px",
            color: "#8B8F9A",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          <span>Full-Stack Engineering</span>
        </div>

        {/* Main Title & Role */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#EFEFF1",
            }}
          >
            Noman Patel
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#8B8F9A",
              maxWidth: "800px",
              lineHeight: 1.4,
            }}
          >
            Full-Stack Developer building practical web software with Next.js, TypeScript, and MongoDB.
          </div>
        </div>

        {/* Bottom Metadata */}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "32px",
            borderTop: "1px solid #23262D",
            fontSize: "16px",
            color: "#585C67",
          }}
        >
          <span>AptiCore • Autowhat.ai • Saiket Systems</span>
          <span>github.com/Noman2604</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
