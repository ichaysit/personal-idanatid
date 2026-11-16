import type { Caption } from "@remotion/captions";
import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  Composition,
  continueRender,
  delayRender,
  Easing,
  interpolate,
  OffthreadVideo,
  Sequence,
  Series,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ACCENT, ACCENT_2, WordCaptions } from "./Captions";
import { FONT } from "./font";

const FPS = 60;
const W = 2160;
const H = 3840;

// Segment lengths in frames (segments are pre-cut, denoised, 60fps, 4K).
const SEG = {
  s1: 119,
  s2: 220,
  s3: 94,
  s4: 317,
  s5: 243,
  s6: 306,
  s7: 97,
};
const TOTAL = Object.values(SEG).reduce((a, b) => a + b, 0);

// [word, startMs, endMs] relative to the segment start.
const cap = (words: [string, number, number][]): Caption[] =>
  words.map(([text, s, e], i) => ({
    text: (i === 0 ? "" : " ") + text,
    startMs: s,
    endMs: e,
    timestampMs: (s + e) / 2,
    confidence: null,
  }));

export const MyComposition = () => {
  return (
    <Composition
      id="IdanAtidAd"
      component={Montage}
      durationInFrames={TOTAL}
      fps={FPS}
      width={W}
      height={H}
    />
  );
};

const useFonts = () => {
  const [handle] = useState(() => delayRender("fonts"));
  useEffect(() => {
    Promise.all([
      document.fonts.load(`900 100px Rubik`, "אבגד"),
      document.fonts.load(`700 100px Rubik`, "אבגד"),
      document.fonts.load(`900 100px Rubik`, "AI"),
    ]).then(() => continueRender(handle));
  }, [handle]);
};

/** A video shot with a slow zoom (punch-ins on jump cuts). */
const Shot: React.FC<{
  src: string;
  zoomFrom: number;
  zoomTo: number;
  originY?: string;
  originX?: string;
}> = ({ src, zoomFrom, zoomTo, originY = "38%", originX = "50%" }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const z = interpolate(frame, [0, durationInFrames], [zoomFrom, zoomTo], {
    easing: Easing.inOut(Easing.quad),
  });
  // Snap-in: a fast 6-frame settle at the start of each cut.
  const snap = interpolate(frame, [0, 6], [1.035, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <OffthreadVideo
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${z * snap})`,
          transformOrigin: `${originX} ${originY}`,
        }}
      />
    </AbsoluteFill>
  );
};

const Flash: React.FC<{ frames?: number }> = ({ frames = 7 }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, frames], [0.85, 0], {
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ backgroundColor: "#fff", opacity: o }} />;
};

const Grade: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 52%, rgba(0,0,0,0.55) 100%)",
    }}
  />
);

const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        height: 18,
        width: `${(frame / durationInFrames) * 100}%`,
        background: `linear-gradient(270deg, ${ACCENT}, ${ACCENT_2})`,
        boxShadow: `0 0 30px ${ACCENT}`,
      }}
    />
  );
};

/** Pill label that springs in. */
const Pill: React.FC<{
  children: React.ReactNode;
  top: number;
  bg?: string;
  color?: string;
  size?: number;
}> = ({ children, top, bg = ACCENT, color = "#000", size = 110 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 11, stiffness: 180 } });
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
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: size,
          color,
          background: bg,
          padding: "26px 70px 34px",
          borderRadius: 999,
          boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
          transform: `scale(${s}) rotate(${interpolate(s, [0, 1], [-8, -2])}deg)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** Name tag for the intro shot. */
const NameTag: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 14, stiffness: 160 } });
  return (
    <div
      dir="rtl"
      style={{
        position: "absolute",
        top: 470,
        right: 120,
        transform: `translateX(${interpolate(s, [0, 1], [900, 0])}px)`,
        fontFamily: FONT,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 14,
      }}
    >
      <div
        style={{
          fontWeight: 900,
          fontSize: 120,
          color: "#000",
          background: ACCENT,
          padding: "14px 50px 22px",
          borderRadius: 26,
        }}
      >
        ישי סיטבון
      </div>
      <div
        style={{
          fontWeight: 700,
          fontSize: 78,
          color: "#fff",
          background: "rgba(0,0,0,0.72)",
          padding: "12px 40px 18px",
          borderRadius: 22,
        }}
      >
        אתרים ואפליקציות לעסקים
      </div>
    </div>
  );
};

const Check: React.FC<{ label: string; delay: number; index: number }> = ({
  label,
  delay,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  if (frame < delay) return null;
  return (
    <div
      dir="rtl"
      style={{
        position: "absolute",
        top: 470 + index * 200,
        right: 140,
        display: "flex",
        alignItems: "center",
        gap: 34,
        transform: `translateX(${interpolate(s, [0, 1], [700, 0])}px) scale(${interpolate(s, [0, 1], [0.6, 1])})`,
        transformOrigin: "right center",
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 104,
        color: "#fff",
        background: "rgba(0,0,0,0.7)",
        padding: "16px 50px 24px 60px",
        borderRadius: 30,
        border: `5px solid ${ACCENT_2}`,
      }}
    >
      <svg width="96" height="96" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="12" fill={ACCENT_2} />
        <path
          d="M6.5 12.5l3.5 3.5 7.5-8"
          stroke="#000"
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="20"
          strokeDashoffset={interpolate(s, [0, 1], [20, 0])}
        />
      </svg>
      {label}
    </div>
  );
};

const FollowCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - 40,
    fps,
    config: { damping: 9, stiffness: 160 },
  });
  const pulse = 1 + 0.04 * Math.sin((frame / fps) * Math.PI * 4);
  if (frame < 40) return null;
  return (
    <div
      dir="rtl"
      style={{
        position: "absolute",
        top: 560,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 30,
        fontFamily: FONT,
        transform: `scale(${s * pulse})`,
      }}
    >
      <div
        style={{
          fontWeight: 900,
          fontSize: 150,
          color: "#000",
          background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_2})`,
          padding: "30px 100px 44px",
          borderRadius: 999,
          boxShadow: `0 0 80px ${ACCENT}`,
        }}
      >
        + עקבו עכשיו
      </div>
      <div
        style={{
          fontWeight: 700,
          fontSize: 92,
          color: "#fff",
          textShadow: "0 6px 20px rgba(0,0,0,0.8)",
        }}
      >
        עידן עתיד · אתרים לעסקים
      </div>
    </div>
  );
};

export const Montage: React.FC = () => {
  useFonts();
  const ms = (m: number) => Math.round((m / 1000) * FPS);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Series>
        {/* HOOK */}
        <Series.Sequence name="Hook" durationInFrames={SEG.s1}>
          <Shot src="s1.mov" zoomFrom={1.3} zoomTo={1.42} originY="52%" />
          <Grade />
          <Pill top={430} size={96} bg="#fff">
            בניית אתר לעסק?
          </Pill>
          <WordCaptions
            name="Hook captions"
            combineMs={500}
            captions={cap([
              ["רכישת", 0, 420],
              ["אתרי", 420, 660],
              ["אינטרנט", 660, 1000],
              ["מעולם", 1000, 1260],
              ["לא", 1260, 1330],
              ["הייתה", 1330, 1440],
              ["כזאת", 1440, 1800],
              ["קלה!", 1800, 2020],
            ])}
          />
        </Series.Sequence>

        {/* INTRO */}
        <Series.Sequence name="Intro" durationInFrames={SEG.s2}>
          <Shot src="s2.mov" zoomFrom={1.48} zoomTo={1.4} originY="50%" />
          <Flash />
          <Grade />
          <Sequence from={ms(250)}>
            <NameTag />
          </Sequence>
          <WordCaptions
            name="Intro captions"
            captions={cap([
              ["היי,", 0, 320],
              ["אני", 320, 500],
              ["ישי", 500, 640],
              ["סיטבון", 640, 1040],
              ["ויוצר", 1040, 1560],
              ["אתרים", 1560, 1840],
              ["ואפליקציות", 1840, 2320],
              ["ווב", 2320, 2480],
              ["לכל", 2480, 2760],
              ["מיני", 2760, 2920],
              ["עסקים", 2920, 3200],
              ["בישראל.", 3200, 3670],
            ])}
          />
        </Series.Sequence>

        {/* CURIOSITY */}
        <Series.Sequence name="Question" durationInFrames={SEG.s3}>
          <Shot src="s3.mov" zoomFrom={1.22} zoomTo={1.3} originY="30%" originX="36%" />
          <Flash frames={5} />
          <Grade />
          <WordCaptions
            name="Question captions"
            combineMs={900}
            captions={cap([
              ["רוצים", 0, 280],
              ["שאני", 280, 440],
              ["אגלה", 440, 640],
              ["לכם", 640, 840],
              ["איך", 840, 960],
              ["זה", 960, 1040],
              ["עובד?", 1040, 1570],
            ])}
          />
        </Series.Sequence>

        {/* OFFER */}
        <Series.Sequence name="Offer" durationInFrames={SEG.s4}>
          <Shot src="s4.mov" zoomFrom={1.1} zoomTo={1.2} originY="35%" />
          <Flash />
          <Grade />
          <Sequence from={ms(380)}>
            <Pill top={470} size={130}>
              עידן עתיד
            </Pill>
          </Sequence>
          <WordCaptions
            name="Offer captions"
            captions={cap([
              ["אצלנו", 0, 360],
              ["בעידן", 360, 620],
              ["עתיד,", 620, 1000],
              ["כל", 1060, 1250],
              ["עסק", 1250, 1480],
              ["מהכי", 1480, 1740],
              ["קטן", 1740, 1960],
              ["ועד", 1960, 2140],
              ["הכי", 2140, 2300],
              ["גדול", 2300, 2540],
              ["מקבל", 2540, 2940],
              ["את", 2940, 3020],
              ["האתר", 3020, 3360],
              ["שהכי", 3360, 3880],
              ["מתאים", 3880, 4140],
              ["לו", 4140, 4220],
              ["והכי", 4220, 4580],
              ["מקצועי", 4580, 4900],
              ["שיש.", 4900, 5330],
            ])}
          />
        </Series.Sequence>

        {/* PROCESS */}
        <Series.Sequence name="Process" durationInFrames={SEG.s5}>
          <Shot src="s5.mov" zoomFrom={1.28} zoomTo={1.16} originY="30%" />
          <Flash frames={5} />
          <Grade />
          <Check label="עיצוב" delay={ms(2260)} index={0} />
          <Check label="עלייה לאוויר" delay={ms(2780)} index={1} />
          <Check label="תחזוקה" delay={ms(3400)} index={2} />
          <WordCaptions
            name="Process captions"
            captions={cap([
              ["אתם", 0, 260],
              ["מסבירים", 260, 580],
              ["לי", 580, 620],
              ["מה", 620, 740],
              ["העסק", 740, 920],
              ["צריך", 920, 1220],
              ["ואני", 1220, 1560],
              ["דואג", 1560, 1680],
              ["לכל", 1680, 1940],
              ["השאר:", 1940, 2260],
              ["עיצוב,", 2260, 2780],
              ["עלייה", 2780, 3060],
              ["לאוויר", 3060, 3400],
              ["ותחזוקה.", 3400, 4100],
            ])}
          />
        </Series.Sequence>

        {/* VALUE */}
        <Series.Sequence name="Content" durationInFrames={SEG.s6}>
          <Shot src="s6.mov" zoomFrom={1.12} zoomTo={1.22} originY="32%" />
          <Flash />
          <Grade />
          <WordCaptions
            name="Content captions"
            captions={cap([
              ["אצלנו", 20, 340],
              ["בעמוד", 340, 700],
              ["תמצאו", 700, 1200],
              ["המון", 1200, 1320],
              ["המון", 1320, 1460],
              ["תכנים", 1460, 1840],
              ["על", 1840, 2340],
              ["תכנות", 2340, 2740],
              ["בעולם", 2740, 3060],
              ["ה-AI,", 3060, 3560],
              ["פרויקטים,", 3660, 4200],
              ["רעיונות", 4300, 4540],
              ["וטיפים.", 4540, 5120],
            ])}
          />
        </Series.Sequence>

        {/* CTA */}
        <Series.Sequence name="CTA" durationInFrames={SEG.s7}>
          <Shot src="s7.mov" zoomFrom={1.3} zoomTo={1.36} originY="30%" />
          <Flash frames={5} />
          <Grade />
          <FollowCTA />
          <WordCaptions
            name="CTA captions"
            combineMs={1200}
            captions={cap([
              ["אם", 0, 140],
              ["אתם", 140, 320],
              ["בעניין,", 320, 700],
              ["תעקבו!", 780, 1640],
            ])}
          />
        </Series.Sequence>
      </Series>

      {/* Sound design on the cuts */}
      {[
        SEG.s1,
        SEG.s1 + SEG.s2 + SEG.s3,
        SEG.s1 + SEG.s2 + SEG.s3 + SEG.s4 + SEG.s5,
      ].map((f) => (
        <Sequence key={f} from={f - 22} durationInFrames={30}>
          <Audio src={staticFile("whoosh.wav")} volume={0.55} />
        </Sequence>
      ))}
      {[
        SEG.s1 + SEG.s2 + SEG.s3 + ms(380),
        SEG.s1 + SEG.s2 + SEG.s3 + SEG.s4 + ms(2260),
        SEG.s1 + SEG.s2 + SEG.s3 + SEG.s4 + ms(2780),
        SEG.s1 + SEG.s2 + SEG.s3 + SEG.s4 + ms(3400),
        TOTAL - SEG.s7 + 40,
      ].map((f) => (
        <Sequence key={f} from={f} durationInFrames={10}>
          <Audio src={staticFile("pop.wav")} volume={0.6} />
        </Sequence>
      ))}

      <ProgressBar />
    </AbsoluteFill>
  );
};
