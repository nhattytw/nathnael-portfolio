import { ImageResponse } from "next/og";
import { generalData } from "@/lib/generalData";
import { projectData } from "@/lib/projectData";

export const alt = "Nathnael Tesfaye Woldekidan, Senior Software Engineer: systems in production";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#f4f2ec";
const INK = "#151513";
const MUTED = "#5f5e57";
const BORDER = "#dcd8cc";
const PRIMARY = "#2e6cba";
const LIVE = "#15803d";

/** Loads a Google font as TTF for the image; falls back to the default font if offline. */
async function googleFont(family: string, style = "") {
  try {
    const css = await fetch(`https://fonts.googleapis.com/css2?family=${family}${style}`).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return url ? await fetch(url).then((r) => r.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

/** The link preview: the home page headline over the status board. */
export default async function OpengraphImage() {
  const [serif, serifItalic] = await Promise.all([
    googleFont("Instrument+Serif"),
    googleFont("Instrument+Serif", ":ital@1"),
  ]);
  const fonts = [
    serif && { name: "Serif", data: serif, style: "normal" as const, weight: 400 as const },
    serifItalic && { name: "Serif", data: serifItalic, style: "italic" as const, weight: 400 as const },
  ].filter((f) => !!f);

  const systems = projectData.filter((p) => p.featured);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: PAPER,
          color: INK,
          padding: "56px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: `1px solid ${BORDER}`,
            paddingBottom: 18,
            fontSize: 22,
            color: MUTED,
          }}
        >
          <span>
            {generalData.name} · {generalData.title}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 10, color: INK }}>
            <span style={{ width: 12, height: 12, borderRadius: 12, background: LIVE }} />
            Available for new roles
          </span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", fontFamily: "Serif", fontSize: 96, lineHeight: 0.95, marginTop: 44 }}>
          <span>I build software people rely on&nbsp;</span>
          <span style={{ color: PRIMARY, fontStyle: "italic" }}>day to day.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", borderTop: `2px solid ${INK}` }}>
          {systems.map((p) => (
            <div
              key={p.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: `1px solid ${BORDER}`,
                padding: "12px 0",
                fontSize: 24,
              }}
            >
              <span>{p.title}</span>
              <span style={{ color: MUTED }}>{p.headline ?? p.status}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
