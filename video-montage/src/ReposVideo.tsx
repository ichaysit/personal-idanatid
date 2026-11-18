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
import { useFonts } from "./useFonts";

const FPS = 60;
const DURATION_S = 40.4;

// Output-timeline cut points (seconds) of the base edit, used to alternate
// framing on every jump cut.
const CUTS = [0, 0.3, 2.883, 9.55, 12.083, 19.483, 23.017, 28.35, 35.017, DURATION_S];
const ZOOMS = [1.14, 1.0, 1.1, 1.0, 1.1, 1.0, 1.1, 1.0, 1.1];

// Caption phrases on the output timeline: [text, startS, endS].
const PHRASES: [string, number, number][] = [
  ["שנייה,", 0.0, 0.3],
  ["אתם עדיין עורכים", 0.3, 0.84],
  ["את הסרטונים שלכם בעצמכם?", 0.84, 2.12],
  ["חכו רגע.", 2.12, 2.89],
  ["יצאו ממש עכשיו", 2.89, 3.71],
  ["סקילים חדשים", 3.71, 4.55],
  ["שתוכלו לשים בקלוד,", 4.55, 5.8],
  ["שיערכו לכם את הסרטונים", 5.8, 7.23],
  ["כאילו עורך מקצועי", 7.23, 8.73],
  ["ערך לכם אותו.", 8.73, 9.55],
  ["ואגב,", 9.55, 10.05],
  ["הסרטון שאתם עכשיו רואים", 10.05, 11.17],
  ["נערך על ידי קלוד.", 11.17, 12.09],
  ["והראשון הוא", 12.09, 12.77],
  ["Motion Video Director", 12.77, 14.2],
  ["הוא בעצם ילמד", 14.2, 15.13],
  ["את הקלוד שלכם", 15.13, 15.75],
  ["בי-רול,", 15.75, 16.7],
  ["הוקים חזקים,", 16.7, 17.75],
  ["כתוביות דינמיות", 17.75, 18.65],
  ["ועוד המון דברים.", 18.65, 19.49],
  ["והשני הוא", 19.49, 19.95],
  ["Auto-Timeline &", 19.95, 21.0],
  ["Beat-Sync Video Editor", 21.0, 23.03],
  ["הוא בעצם מנתח את המוזיקה", 23.03, 24.41],
  ["ומוסיף לכם כל מיני אפקטים", 24.41, 26.21],
  ["בין כל מיני קאטים חשובים", 26.21, 27.53],
  ["שיש בריל שלכם.", 27.53, 28.37],
  ["והשלישי והכי חשוב בשבילי", 28.37, 29.67],
  ["הוא Script-to-Timeline.", 29.67, 30.95],
  ["לוקח את כל התסריט", 30.95, 32.01],
  ["והדיבור שלך", 32.01, 32.67],
  ["ומסדר אוטומטית", 32.67, 33.91],
  ["לכל הקטעים.", 33.91, 35.03],
  ["אם אתם רוצים את הקובץ המלא", 35.03, 36.23],
  ["שבו יש את כל הסקילים", 36.23, 37.29],
  ["מוכנים להורדה,", 37.29, 38.35],
  ["תגיבו \"סקיל\"", 38.35, 39.09],
  ["ואני אשלח לכם את זה בפרטי.", 39.09, 40.41],
];

// GitHub repo cards: [image, startS, endS, label]
const REPOS: [string, number, number, string][] = [
  ["repo1.png", 12.6, 15.4, "1"],
  ["repo2.png", 19.8, 22.6, "2"],
  ["repo3.png", 29.9, 32.7, "3"],
];

export const ReposVideoComposition = () => (
  <Composition
    id="ReposVideo"
    component={ReposVideo}
    durationInFrames={Math.round(DURATION_S * FPS)}
    fps={FPS}
    width={2160}
    height={3840}
  />
);

const Base: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  let i = CUTS.findIndex((c, k) => t >= c && t < (CUTS[k + 1] ?? Infinity));
  if (i < 0 || i >= ZOOMS.length) i = ZOOMS.length - 1;
  const segStart = CUTS[i];
  const segEnd = CUTS[i + 1];
  // gentle drift inside each shot
  const drift = interpolate(t, [segStart, segEnd], [0, 0.025], {
    easing: Easing.inOut(Easing.quad),
  });
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#000" }}>
      <OffthreadVideo
        src={staticFile("repos_base.mov")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${ZOOMS[i] + drift})`,
          transformOrigin: "50% 30%",
        }}
      />
    </AbsoluteFill>
  );
};

/** Calm captions: small, low, a soft fade between phrases, no jumping. */
const CalmCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const p = PHRASES.find(([, s, e]) => t >= s && t < e);
  if (!p) return null;
  const local = frame - Math.round(p[1] * FPS);
  const opacity = interpolate(local, [0, 5], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <div
      dir="rtl"
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

const RepoCard: React.FC<{ src: string; label: string; frames: number }> = ({
  src,
  label,
  frames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 170 } });
  const exit = interpolate(frame, [frames - 14, frames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const scale = interpolate(enter, [0, 1], [0.55, 1]) * (1 - 0.2 * exit);
  return (
    <div
      style={{
        position: "absolute",
        top: 330,
        left: 90,
        width: 1260,
        transform: `scale(${scale}) rotate(${interpolate(enter, [0, 1], [-6, -2])}deg)`,
        transformOrigin: "top left",
        opacity: Math.min(enter * 1.4, 1) * (1 - exit),
      }}
    >
      <Glass radius={64} padding="22px">
        <div
          style={{
            position: "relative",
            borderRadius: 42,
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          }}
        >
          <Img src={staticFile(src)} style={{ width: "100%", display: "block" }} />
        </div>
      </Glass>
      <div style={{ position: "absolute", top: -60, right: -40 }}>
        <Glass padding="10px 46px 18px">
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 110,
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

const CommentPill: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 13, stiffness: 160 } });
  return (
    <div
      dir="rtl"
      style={{
        position: "absolute",
        top: 470,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        transform: `scale(${s})`,
      }}
    >
      <Glass tint="rgba(255,255,255,0.5)" padding="26px 90px 38px">
        <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 130, color: "#111" }}>
          תגיבו "סקיל"
        </div>
      </Glass>
    </div>
  );
};

export const ReposVideo: React.FC = () => {
  useFonts();
  const f = (s: number) => Math.round(s * FPS);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Base />
      {REPOS.map(([src, s, e, label]) => (
        <Sequence key={src} from={f(s)} durationInFrames={f(e - s)}>
          <RepoCard src={src} label={label} frames={f(e - s)} />
          <Audio src={staticFile("whoosh.wav")} volume={0.35} startFrom={20} />
        </Sequence>
      ))}
      <Sequence from={f(38.35)}>
        <CommentPill />
        <Audio src={staticFile("pop.wav")} volume={0.5} />
      </Sequence>
      <CalmCaptions />
    </AbsoluteFill>
  );
};
