import { ImageResponse } from "next/og"
import { siteDescription } from "@/lib/site-config"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "radial-gradient(circle at top left, rgba(78, 183, 167, 0.20), transparent 32%), linear-gradient(135deg, #f7f8f5 0%, #eef2ef 48%, #f8faf8 100%)",
          color: "#111827",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "56px 64px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 22,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "#0f9d8a",
                }}
              >
                Raffi Windarto
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 28,
                  fontSize: 74,
                  lineHeight: 1.02,
                  fontWeight: 700,
                  letterSpacing: "-0.05em",
                }}
              >
                Product-minded
                <br />
                software engineer
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 24,
                  fontSize: 28,
                  lineHeight: 1.45,
                  color: "rgba(17,24,39,0.74)",
                }}
              >
                {siteDescription}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                width: 280,
              }}
            >
              {["AI Ops Room Demo", "Record Sync Service Demo", "3 public case studies"].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(17,24,39,0.10)",
                    background: "rgba(255,255,255,0.82)",
                    borderRadius: 24,
                    padding: "18px 22px",
                    fontSize: 22,
                    color: "rgba(17,24,39,0.76)",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(17,24,39,0.08)",
              paddingTop: 24,
              fontSize: 22,
              color: "rgba(17,24,39,0.60)",
            }}
          >
            <div style={{ display: "flex" }}>Internal tools, operator software, workflow automation</div>
            <div style={{ display: "flex", textTransform: "uppercase", letterSpacing: "0.22em" }}>Osaka / Remote</div>
          </div>
        </div>
      </div>
    ),
    size
  )
}
