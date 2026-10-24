import { ImageResponse } from "next/og";

export const alt = "Dmitry Tynkov (kalisdev), fullstack developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Встроенный шрифт ImageResponse не содержит кириллицу,
// поэтому карточка для соцсетей на латинице.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0b0c0e",
          color: "#ececee",
        }}
      >
        <div style={{ display: "flex", fontSize: 36, color: "#45d18f", letterSpacing: 1 }}>kalisdev</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>Dmitry Tynkov</div>
          <div style={{ fontSize: 44, marginTop: 28, color: "#9a9ea6" }}>
            Fullstack developer. Vue.js, Node.js, MongoDB
          </div>
        </div>
      </div>
    ),
    size,
  );
}
