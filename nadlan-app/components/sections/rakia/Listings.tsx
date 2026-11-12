'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { Container } from '@/components/layout/Container';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Badge } from '@/components/ui/Badge';
import { TiltCard } from '@/components/ui/Card';
import { rakia, type Property } from '@/lib/constants';
import { img, price } from '@/lib/utils';

/* גלילה אנכית שמזיזה את שורת הנכסים לרוחב, כמו נסיעה לאורך קו הרקיע.
   במסך צר או כשהמשתמש ביקש פחות תנועה: גלילה אופקית רגילה. */

function Tower({ p }: { p: Property }) {
  return (
    <article className="w-[min(80vw,430px)] shrink-0 snap-start">
      <TiltCard className="aspect-[3/4]">
        <ScrollReveal variant="curtain" className="h-full">
          <img src={img(p.image)} alt={`${p.name}, ${p.place}`} className="h-full w-full object-cover" />
        </ScrollReveal>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-bg/90 to-transparent p-5 pt-24 [transform:translateZ(44px)]">
          <span className="font-display text-[5.5rem] font-bold leading-[0.7] text-fg">{p.extra}</span>
          <Badge className="text-fg">{p.extraLabel}</Badge>
        </div>
      </TiltCard>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="text-[2.6rem] font-normal leading-none">{p.name}</h3>
        <span className="shrink-0 text-mute">{p.place}</span>
      </div>
      <p className="mt-2 max-w-[40ch] text-[0.98rem] text-mute">{p.note}</p>
      <p className="mt-4 flex items-baseline justify-between border-t border-line pt-3">
        <span>
          {p.rooms} חדרים, {p.sqm} מ״ר
        </span>
        <span className="text-lg text-acc">{price(p.price)}</span>
      </p>
    </article>
  );
}

export function Listings() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [shift, setShift] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const measure = () => {
      const wide = window.matchMedia('(min-width: 900px)').matches && !reduce;
      setPinned(wide);
      if (track.current) setShift(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [reduce]);

  /* ההתקדמות נמדדת ישירות ממיקום האזור, כי הגובה שלו משתנה אחרי המדידה.
     בכיוון RTL התוכן גולש שמאלה, לכן ההזזה חיובית. */
  const raw = useMotionValue(0);
  const x = useSpring(raw, { stiffness: 120, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (!pinned) return;
    const onScroll = () => {
      const top = section.current?.getBoundingClientRect().top ?? 0;
      raw.set(Math.min(shift, Math.max(0, -top)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pinned, shift, raw]);

  const head = (
    <Container className="flex flex-wrap items-end justify-between gap-6 pb-10">
      <h2 className="text-[clamp(3.5rem,8vw,7.5rem)] font-bold leading-[0.85]">נכסים על קו הרקיע</h2>
      <p className="max-w-[34ch] text-mute">שישה מתוך 41. המספר הגדול על כל תמונה הוא הקומה.</p>
    </Container>
  );

  return (
    <section
      ref={section}
      id="listings"
      className="relative scroll-mt-16"
      style={pinned ? { height: `calc(100vh + ${shift}px)` } : undefined}
    >
      <div className={pinned ? 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16' : 'py-24'}>
        {head}
        {pinned ? (
          <motion.div ref={track} style={{ x }} className="flex w-max gap-10 px-14">
            {rakia.properties.map((p) => (
              <Tower key={p.id} p={p} />
            ))}
          </motion.div>
        ) : (
          <div ref={track} className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 sm:px-8">
            {rakia.properties.map((p) => (
              <Tower key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
