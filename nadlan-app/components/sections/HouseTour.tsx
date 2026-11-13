'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { HeroScene } from '@/components/three/HeroScene';
import type { HouseTheme } from '@/components/three/HouseScene';
import { GlassCard } from '@/components/ui/GlassCard';
import { clamp, cn, img } from '@/lib/utils';

/* סיור תלת־ממדי בבית. האזור גבוה פי כמה מהמסך, הסצנה דביקה בתוכו,
   והגלילה מקדמת את המצלמה. אותו מנגנון בדיוק בטלפון ובמחשב. */

export type TourStop = { at: number; title: string; text: string };

type Props = {
  theme: HouseTheme;
  /** מפתח התמונות של שלבי הסיור: tour-<frames>-<מספר> */
  frames: string;
  name: string;
  intro: string;
  stops: TourStop[];
  /** true כשהרקע של הסצנה בהיר והטקסט צריך להיות כהה */
  light?: boolean;
};

export function HouseTour({ theme, frames, name, intro, stops, light }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const on = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = clamp(-r.top / Math.max(1, r.height - window.innerHeight));
      let i = 0;
      stops.forEach((s, k) => {
        if (p >= s.at) i = k;
      });
      setStep(i);
      if (bar.current) bar.current.style.transform = `scaleY(${p})`;
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, [stops]);

  const s = stops[step];

  return (
    <section ref={ref} id="tour" className="relative scroll-mt-0" style={{ height: '560vh', background: theme.bg }}>
      <div className={cn('sticky top-0 h-screen overflow-hidden', light ? 'text-[#191613]' : 'text-[#f3ede2]')}>
        {/* תמונה של כל שלב בסיור. הן מוצגות עד שהתלת־ממד מוכן, ונשארות במקומו
            במכשיר שאין בו WebGL או JavaScript. */}
        <div data-tour-frames className="absolute inset-0">
          {stops.map((st, i) => (
            <figure key={st.title} data-on={i === step ? '' : undefined} className="tour-frame" style={{ ['--i' as string]: i }}>
              <img src={img(`tour-${frames}-${i}`)} alt="" />
              <figcaption>
                <strong>{st.title}</strong>
                <span>{st.text}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <HeroScene variant="house" theme={theme} scrollTarget={ref} />

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-6 px-5 pt-20 sm:px-8 lg:px-14">
          <div>
            <h2 className="text-[clamp(2rem,5vw,4.5rem)] leading-[0.95]">{name}</h2>
            <p className="mt-2 max-w-[34ch] text-[0.95rem] opacity-75">{intro}</p>
          </div>
          <p data-app-only className="ltr shrink-0 pt-2 text-[0.95rem] opacity-75">
            {step + 1} / {stops.length}
          </p>
        </div>

        {/* פס התקדמות אנכי של הסיור */}
        <div aria-hidden data-app-only className="absolute bottom-28 end-5 top-44 w-px bg-current/20 sm:end-8 lg:end-14">
          <span ref={bar} className="absolute inset-0 origin-top" style={{ background: theme.accent, transform: 'scaleY(0)' }} />
        </div>

        <div data-app-only className="pointer-events-none absolute inset-x-0 bottom-0 px-5 pb-20 sm:px-8 md:pb-12 lg:px-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 24, rotateX: -35 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -18, rotateX: 25 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 800 }}
            >
              <GlassCard className={cn('max-w-[440px] p-5', light ? 'bg-[#dcd8d0]/70' : 'bg-black/35')}>
                <p className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-tight">{s.title}</p>
                <p className="mt-1.5 text-[0.98rem] opacity-80">{s.text}</p>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
