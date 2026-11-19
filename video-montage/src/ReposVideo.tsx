import React from "react";
import {
  AbsoluteFill,
  Audio,
  Composition,
  Easing,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT } from "./font";
import { Glass, onGlassText } from "./Glass";
import { EVENTS, PHRASES, RANGE_STARTS, SEGS, TOTAL_S } from "./reposTimeline";
import { useFonts } from "./useFonts";

const FPS = 60;
const f = (s: number) => Math.round(s * FPS);
const CARD_S = 3.4;

// #1 Motion Video Director and #2 BeatSync both come from mattypark/Motion-graphics-skill
// (#2 zooms toward the "animate, edit, caption and sound-design" description);
// #3 Script-to-Timeline is digitalsamba/claude-code-video-toolkit.
const REPOS: { src: string; at: number; label: string; origin: string }[] = [
  { src: "repo1.png", at: EVENTS.repo1, label: "1", origin: "40% 0%" },
  { src: "repo1.png", at: EVENTS.repo2, label: "2", origin: "92% 28%" },
  { src: "repo2.png", at: EVENTS.repo3, label: "3", origin: "40% 0%" },
];

export const ReposVideoComposition = () => (
  <Composition
    id="ReposVideo"
    component={ReposVideo}
    durationInFrames={f(TOTAL_S)}
    fps={FPS}
    width={2160}
    height={3840}
  />
);

/** Decaying camera shake + punch used on the "wait" beat. */
const punchAt = (frame: number, at: number) => {
  const local = frame - f(at);
  if (local < 0 || local > 24) return { s: 0, x: 0, y: 0 };
  const k = Math.exp(-local / 6);
  return {
    s: 0.1 * k,
    x: Math.sin(local * 2.7) * 26 * k,
    y: Math.cos(local * 3.3) * 18 * k,
  };
};

const Base: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const seg =
    SEGS.find((g) => t >= g.o && t < g.o + g.d) ?? SEGS[SEGS.length - 1];
  const drift = interpolate(t, [seg.o, seg.o + seg.d], [0, 0.02], {
    easing: Easing.inOut(Easing.quad),
  });
  // Opening punch-in from wide.
  const intro = interpolate(frame, [0, 22], [0.22, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  // Small snap at each new beat.
  const lastBeat = [...RANGE_STARTS].reverse().find((b) => t >= b) ?? -1;
  const snap =
    lastBeat < 0
      ? 0
      : interpolate(frame - f(lastBeat), [0, 6], [0.03, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
  const p = punchAt(frame, EVENTS.wait);
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#000" }}>
      <OffthreadVideo
        src={staticFile("repos_base.mov")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `translate(${p.x}px, ${p.y}px) scale(${seg.z + drift + intro + snap + p.s})`,
          transformOrigin: "50% 30%",
        }}
      />
    </AbsoluteFill>
  );
};

/** Short white flash on the "wait" beat. */
const Flash: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame - f(at), [0, 1, 6], [0, 0.55, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ backgroundColor: "#fff", opacity: o }} />;
};

/** Calm captions: small, low, soft fade between phrases, no jumping. */
const CalmCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const p = PHRASES.find(([, s, e]) => t >= s && t < e);
  if (!p) return null;
  const local = frame - f(p[1]);
  const opacity = interpolate(local, [0, 5], [0, 1], {
    extrapolateRight: "clamp",
  });
  const latin = !/[\u0590-\u05FF]/.test(p[0]);
  return (
    <div
      dir={latin ? "ltr" : "rtl"}
      style={{
        position: "absolute",
        top: 2860,
        left: 160,
        right: 160,
        textAlign: "center",
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 112,
        lineHeight: 1.15,
        color: "#fff",
        WebkitTextStroke: "10px #000",
        paintOrder: "stroke fill",
        textShadow: "0 6px 0 rgba(0,0,0,0.8), 0 0 28px rgba(0,0,0,0.5)",
        opacity,
      }}
    >
      {p[0]}
    </div>
  );
};

/** Big, readable GitHub repo card with a slow zoom toward the repo title. */
const RepoCard: React.FC<{
  src: string;
  label: string;
  frames: number;
  origin: string;
}> = ({ src, label, frames, origin }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 15, stiffness: 150 } });
  const exit = interpolate(frame, [frames - 16, frames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const kenBurns = interpolate(frame, [12, frames - 10], [1, 1.32], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 300,
        left: 100,
        width: 1960,
        transform: `translateX(${interpolate(enter, [0, 1], [-700, 0]) - 600 * exit}px) scale(${interpolate(enter, [0, 1], [0.7, 1])}) rotate(${interpolate(enter, [0, 1], [-5, -1.2])}deg)`,
        transformOrigin: "top left",
        opacity: Math.min(enter * 1.5, 1) * (1 - exit),
      }}
    >
      <Glass radius={72} padding="24px" sweepDelay={10}>
        <div
          style={{
            borderRadius: 50,
            overflow: "hidden",
            boxShadow: "0 12px 34px rgba(0,0,0,0.35)",
          }}
        >
          <Img
            src={staticFile(src)}
            style={{
              width: "100%",
              display: "block",
              transform: `scale(${kenBurns})`,
              transformOrigin: origin,
            }}
          />
        </div>
      </Glass>
      <div style={{ position: "absolute", top: -70, right: -30 }}>
        <Glass padding="12px 54px 22px">
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 130,
              ...onGlassText,
            }}
          >
            #{label}
          </div>
        </Glass>
      </div>
    </div>
  );
};

const Pill: React.FC<{
  children: React.ReactNode;
  top: number;
  tinted?: boolean;
  size?: number;
  frames?: number;
}> = ({ children, top, tinted, size = 120, frames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 13, stiffness: 170 } });
  const out = frames
    ? interpolate(frame, [frames - 12, frames], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;
  return (
    <div
      dir="rtl"
      style={{
        position: "absolute",
        top,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        transform: `scale(${s * (0.85 + 0.15 * out)})`,
        opacity: out,
      }}
    >
      <Glass
        tint={tinted ? "rgba(255,255,255,0.5)" : undefined}
        padding="24px 80px 36px"
      >
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: size,
            ...(tinted ? { color: "#111" } : onGlassText),
          }}
        >
          {children}
        </div>
      </Glass>
    </div>
  );
};

const Sfx: React.FC<{ at: number; file: string; volume: number }> = ({
  at,
  file,
  volume,
}) => (
  <Sequence from={Math.max(0, f(at))} durationInFrames={f(1.3)}>
    <Audio src={staticFile(`sfx/${file}.wav`)} volume={volume} />
  </Sequence>
);

export const ReposVideo: React.FC = () => {
  useFonts();
  const cardFrames = f(CARD_S);
  const busy = [EVENTS.wait, EVENTS.repo1, EVENTS.repo2, EVENTS.repo3, EVENTS.cta];
  const ticks = RANGE_STARTS.filter((b) => busy.every((x) => Math.abs(x - b) > 0.4));
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Base />
      <Flash at={EVENTS.wait} />

      <Sequence from={f(EVENTS.claude)} durationInFrames={f(1.9)}>
        <Pill top={420} size={104} frames={f(1.9)}>
          נערך ע״י Claude
        </Pill>
      </Sequence>

      {REPOS.map((r) => (
        <Sequence key={r.label} from={f(r.at)} durationInFrames={cardFrames}>
          <RepoCard src={r.src} label={r.label} frames={cardFrames} origin={r.origin} />
        </Sequence>
      ))}

      <Sequence from={f(EVENTS.cta)}>
        <Pill top={470} size={130} tinted>
          תגיבו "סקיל"
        </Pill>
      </Sequence>

      <CalmCaptions />

      {/* Sound design: one effect per visible event. */}
      <Sfx at={0} file="impact" volume={0.55} />
      <Sfx at={EVENTS.wait - 0.75} file="riser" volume={0.22} />
      <Sfx at={EVENTS.wait} file="impact" volume={0.4} />
      <Sfx at={EVENTS.claude} file="ding" volume={0.28} />
      {REPOS.map((r) => (
        <React.Fragment key={r.label}>
          <Sfx at={r.at - 0.3} file="whoosh_in" volume={0.4} />
          <Sfx at={r.at + CARD_S - 0.3} file="swish_out" volume={0.25} />
        </React.Fragment>
      ))}
      {ticks.map((b) => (
        <Sfx key={b} at={b - 0.02} file="tick" volume={0.18} />
      ))}
      <Sfx at={EVENTS.cta} file="pop2" volume={0.45} />
      <Sfx at={EVENTS.cta + 0.08} file="ding" volume={0.22} />
    </AbsoluteFill>
  );
};
