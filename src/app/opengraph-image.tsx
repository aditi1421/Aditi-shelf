import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "aditi's shelf — articles i loved, on one colorful shelf";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fdf6ec",
        }}
      >
        <div style={{ display: "flex", gap: 16, marginBottom: 40 }}>
          {["#7c5cff", "#ff5d8f", "#ff8a3d", "#00b8a9", "#f9c80e"].map((color) => (
            <div
              key={color}
              style={{
                width: 72,
                height: 96,
                background: color,
                borderRadius: 16,
                transform: `rotate(${(["#7c5cff", "#ff5d8f", "#ff8a3d", "#00b8a9", "#f9c80e"].indexOf(color) - 2) * 6}deg)`,
              }}
            />
          ))}
        </div>
        <div
          style={{
            fontSize: 92,
            fontWeight: 700,
            background: "linear-gradient(90deg, #7c5cff, #ff5d8f, #ff8a3d)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          aditi&apos;s shelf
        </div>
        <div style={{ fontSize: 34, color: "#6b6478", marginTop: 16 }}>
          articles i loved, on one colorful shelf
        </div>
      </div>
    ),
    { ...size }
  );
}
