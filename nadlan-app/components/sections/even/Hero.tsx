'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { StaggerContainer, StaggerFade, StaggerLine } from '@/components/animations/StaggerContainer';
import { HeroScene } from '@/components/three/HeroScene';
import { GlassCard } from '@/components/ui/GlassCard';
import { even, evenPins } from '@/lib/constants';
import { img, price } from '@/lib/utils';

export function Hero() {
  const [active, setActive] = useState(even.properties[0].id);
  const touched = useRef(0);

  const pins = useMemo(
    () =>
      evenPins.map((pin) => {
        const p = even.properties.find((x) => x.id === pin.id)!;
        return { ...pin, label: p.name, sub: `${p.place}, ${p.extra}` };
      }),
    [],
  );

  /* כל עוד לא נגעו במפה, הסיכה הפעילה מתחלפת לבד */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => {
      if (performance.now() - touched.current < 9000) return;
      setActive((id) => {
        const i = even.properties.findIndex((p) => p.id === id);
        return even.properties[(i + 1) % even.properties.length].id;
      });
    }, 4200);
    return () => clearInterval(t);
  }, []);

  const p = even.properties.find((x) => x.id === active)!;

  return (
    <section className="relative h-[100svh] min-h-[700px] overflow-hidden">
      <HeroScene
        variant="terrain"
        pins={pins}
        active={active}
        onActive={(id) => {
          touched.current = performance.now();
          setActive(id);
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      {/* במסך צר הטקסט יושב מעל המפה, ולכן צריך מתחתיו רקע נקי */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[58%] bg-gradient-to-b from-bg via-bg/85 to-transparent md:hidden" />

      <Container className="pointer-events-none relative flex h-full flex-col justify-between pb-10 pt-28 md:pb-14">
        <StaggerContainer>
          <h1 className="max-w-[12ch] text-[clamp(3rem,7.4vw,7.25rem)] font-bold leading-[0.98]">
            <StaggerLine>בתים שנבנו</StaggerLine>
            <StaggerLine>עם ההר,</StaggerLine>
            <StaggerLine>לא עליו</StaggerLine>
          </h1>
          <StaggerFade>
            <p className="mt-6 max-w-[40ch] text-lg">
              שישה בתי אדריכלים למכירה, מהגליל ועד הנגב. כל סיכה במפה היא בית. עברו עליה כדי לראות אותו.
            </p>
          </StaggerFade>
        </StaggerContainer>

        <GlassCard className="pointer-events-auto ms-auto grid w-full max-w-[460px] grid-cols-[112px_1fr] gap-4 p-3">
          <img key={p.image} src={img(p.image)} alt="" className="h-28 w-28 object-cover" />
          <div className="min-w-0 py-1" aria-live="polite">
            <p className="font-display text-2xl font-bold leading-tight">{p.name}</p>
            <p className="text-[0.95rem] text-mute">
              {p.place}, {p.extraLabel} {p.extra}
            </p>
            <p className="mt-2 flex items-baseline justify-between gap-3">
              <span className="text-acc">{price(p.price)}</span>
              <a href="#listings" className="text-[0.95rem] text-fg">
                לקטלוג
              </a>
            </p>
          </div>
        </GlassCard>
      </Container>
    </section>
  );
}
