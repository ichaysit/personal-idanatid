import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

/**
 * Liquid Glass surface for video overlays (CSS port of Apple's design rules).
 * - "clear" variant: we sit on top of video, so content on top must be bold.
 * - Light dimming baked in (footage is night-time, so dark already).
 * - Specular rim on top, darkened edge at the bottom, slow light sweep.
 * - `tint` only for the primary action (the follow CTA).
 */
export const Glass: React.FC<{
  children: React.ReactNode;
  radius?: number;
  padding?: string;
  tint?: string;
  style?: React.CSSProperties;
  sweepDelay?: number;
}> = ({
  children,
  radius = 999,
  padding = "26px 70px 34px",
  tint,
  style,
  sweepDelay = 0,
}) => {
  const frame = useCurrentFrame();
  // Light sweep across the glass every ~2.5s.
  const t = ((frame - sweepDelay) % 150) / 150;
  const sweepX = interpolate(t, [0, 0.45, 1], [-60, 160, 160]);

  return (
    <div
      style={{
        position: "relative",
        borderRadius: radius,
        padding,
        overflow: "hidden",
        isolation: "isolate",
        backdropFilter: "blur(38px) saturate(190%) brightness(1.12)",
        WebkitBackdropFilter: "blur(38px) saturate(190%) brightness(1.12)",
        background: tint
          ? `linear-gradient(160deg, ${tint} 0%, ${tint.replace(/[\d.]+\)$/, "0.32)")} 100%)`
          : "linear-gradient(160deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.08) 55%, rgba(0,0,0,0.14) 100%)",
        border: "3px solid rgba(255,255,255,0.42)",
        boxShadow: [
          "inset 0 6px 12px -2px rgba(255,255,255,0.65)", // specular top rim
          "inset 0 -10px 22px -6px rgba(0,0,0,0.35)", // darkened lower edge
          "inset 0 0 0 1px rgba(255,255,255,0.12)",
          "0 30px 80px rgba(0,0,0,0.38)", // lift off the video
        ].join(", "),
        ...style,
      }}
    >
      {/* Top highlight lens */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          background:
            "radial-gradient(120% 70% at 30% -10%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 55%)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
      {/* Moving specular sweep */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          bottom: "-50%",
          width: "28%",
          left: `${sweepX}%`,
          transform: "rotate(20deg)",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0) 100%)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
      {children}
    </div>
  );
};

/** Bold primary text style for content on glass (no secondary/grey text). */
export const onGlassText: React.CSSProperties = {
  color: "#fff",
  textShadow: "0 3px 14px rgba(0,0,0,0.45)",
};
