import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Breathe — Take a moment.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Subtle stars */}
        {[
          [120, 80], [300, 180], [900, 60], [1050, 200], [200, 500],
          [750, 520], [1100, 430], [450, 100], [650, 580], [80, 340],
        ].map(([x, y], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: i % 3 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 3 : 2,
              borderRadius: "50%",
              background: "rgba(200, 214, 229, 0.25)",
            }}
          />
        ))}

        {/* Outer glow ring */}
        <div
          style={{
            position: "absolute",
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(100, 149, 237, 0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Breathing circle */}
        <div
          style={{
            width: 260,
            height: 260,
            borderRadius: "50%",
            border: "1px solid rgba(100, 149, 237, 0.45)",
            background: "radial-gradient(circle at 40% 40%, rgba(100, 149, 237, 0.12), rgba(15, 52, 96, 0.3))",
            boxShadow: "0 0 80px rgba(100, 149, 237, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 48,
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontStyle: "italic",
            color: "#c8d6e5",
            letterSpacing: 8,
            lineHeight: 1,
            marginTop: -24,
          }}
        >
          breathe
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: "#8395a7",
            letterSpacing: 6,
            textTransform: "uppercase",
            marginTop: 20,
          }}
        >
          take a moment.
        </div>
      </div>
    ),
    { ...size }
  );
}
