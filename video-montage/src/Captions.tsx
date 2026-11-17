import { createTikTokStyleCaptions, type Caption } from "@remotion/captions";
import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT } from "./font";

export const ACCENT = "#FFD60A";
export const ACCENT_2 = "#3DFFB0";

export const WordCaptions: React.FC<{
  name?: string;
  captions: Caption[];
  combineMs?: number;
  top?: number;
}> = ({ captions, combineMs = 650, top = 2800 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;

  const { pages } = useMemo(
    () =>
      createTikTokStyleCaptions({
        captions,
        combineTokensWithinMilliseconds: combineMs,
      }),
    [captions, combineMs],
  );

  const page = pages.find(
    (p, i) =>
      ms >= p.startMs &&
      ms < (pages[i + 1]?.startMs ?? p.startMs + p.durationMs + 400),
  );
  if (!page) return null;

  const pageFrame = frame - Math.round((page.startMs / 1000) * fps);
  const pop = spring({
    frame: pageFrame,
    fps,
    config: { damping: 12, stiffness: 220, mass: 0.6 },
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        dir="rtl"
        style={{
          position: "absolute",
          top,
          left: 140,
          right: 140,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          columnGap: 40,
          rowGap: 10,
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 126,
          lineHeight: 1.12,
          textAlign: "center",
          transform: `scale(${interpolate(pop, [0, 1], [0.78, 1])}) translateY(${interpolate(pop, [0, 1], [40, 0])}px)`,
          opacity: interpolate(pop, [0, 0.4], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        {page.tokens.map((t, i) => {
          const word = t.text.trim();
          const active = ms >= t.fromMs && ms < t.toMs;
          const activeFrame = frame - Math.round((t.fromMs / 1000) * fps);
          const wordPop = active
            ? spring({
                frame: activeFrame,
                fps,
                config: { damping: 10, stiffness: 300, mass: 0.5 },
              })
            : 1;
          const color = "#FFFFFF";
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                margin: active ? "0 16px" : 0,
                color,
                WebkitTextStroke: "11px #000",
                paintOrder: "stroke fill",
                textShadow:
                  "0 8px 0 rgba(0,0,0,0.85), 0 0 32px rgba(0,0,0,0.55)",
                transform: `scale(${active ? interpolate(wordPop, [0, 1], [1.28, 1.08]) : 1}) rotate(${active ? interpolate(wordPop, [0, 1], [-4, 0]) : 0}deg)`,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
