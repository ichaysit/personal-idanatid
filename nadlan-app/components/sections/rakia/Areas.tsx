'use client';

import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { ParallaxWrapper } from '@/components/animations/ParallaxWrapper';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { rakiaAreas } from '@/lib/constants';
import { cn, img } from '@/lib/utils';
import { SplitText } from '@/components/effects/SplitText';

/* רשימת שכונות באותיות ענק. מעבר עכבר על שורה מציף תמונה שעוקבת אחרי הסמן
   ונוטה במרחב לפי כיוון התנועה. */
export function Areas() {
  const [active, setActive] = useState(-1);
  const float = useRef<HTMLDivElement>(null);
  const last = useRef({ x: 0, t: 0 });
  const list = useRef<HTMLUListElement>(null);

  /* בטלפון אין מעבר עכבר: השכונה שנמצאת במרכז המסך היא הפעילה */
  useEffect(() => {
    if (!window.matchMedia('(hover: none), (pointer: coarse)').matches || !list.current) return;
    const rows = Array.from(list.current.children);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(rows.indexOf(e.target));
      },
      { rootMargin: '-42% 0px -42% 0px' },
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  function move(e: React.PointerEvent) {
    const el = float.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    const now = performance.now();
    const vx = (e.clientX - last.current.x) / Math.max(1, now - last.current.t);
    last.current = { x: e.clientX, t: now };
    const tilt = Math.max(-14, Math.min(14, vx * 14));
    el.style.transform = `translate3d(${e.clientX - r.left}px, ${e.clientY - r.top}px, 0) translate(-50%, -50%) perspective(900px) rotateY(${tilt}deg) rotateZ(${tilt * 0.25}deg)`;
  }

  return (
    <section id="areas" className="scroll-mt-16 py-24 md:py-36">
      <Container>
        <p className="max-w-[52ch] text-lg text-fg/85">
          אנחנו עובדים בחמש שכונות בלבד, ומכירים בהן כל מגדל: מי בנה, מה גובה דמי הניהול ואיזה צד מקבל שקיעה.
        </p>
      </Container>

      <div className="relative mt-12" onPointerMove={move} onPointerLeave={(e) => e.pointerType === 'mouse' && setActive(-1)}>
        <ul ref={list} className="m-0 list-none border-t border-line p-0">
          {rakiaAreas.map((a, i) => (
            <li
              key={a.name}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
              className={cn(
                'border-b border-line transition-colors duration-500',
                active === i ? 'text-acc' : active >= 0 ? 'text-fg/35' : 'text-fg',
              )}
            >
              <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-5 md:py-6">
                <h3 className="text-[clamp(3.25rem,9vw,8rem)] font-bold leading-[0.9]">{a.name}</h3>
                <p className="flex gap-8 text-[0.98rem] text-mute">
                  <span>{a.count} נכסים</span>
                  <span>{a.sqmPrice.toLocaleString('en-US')} ₪ למ״ר</span>
                </p>
                <ScrollReveal variant="curtain" className="w-full md:hidden">
                  <img src={img(a.image)} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
                </ScrollReveal>
              </Container>
            </li>
          ))}
        </ul>

        <div
          ref={float}
          aria-hidden
          className={cn(
            'pointer-events-none absolute left-0 top-0 z-10 hidden h-[380px] w-[290px] overflow-hidden transition-[opacity,transform] duration-300 ease-out md:block',
            active >= 0 ? 'opacity-100' : 'opacity-0',
          )}
        >
          {rakiaAreas.map((a, i) => (
            <img
              key={a.name}
              src={img(a.image)}
              alt=""
              loading="lazy"
              className={cn(
                'absolute inset-0 h-full w-full object-cover transition-[opacity,scale] duration-500',
                active === i ? 'scale-100 opacity-100' : 'scale-110 opacity-0',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Coast() {
  return (
    <section className="relative h-[90vh] min-h-[520px]">
      <ParallaxWrapper className="absolute inset-0" strength={10}>
        <img src={img('tlv-coast')} alt="קו החוף של תל אביב ממבט מדרום, עם מגדלי העיר ברקע" loading="lazy" className="h-full w-full object-cover" />
      </ParallaxWrapper>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-bg/55" />
      <Container className="relative flex h-full items-end pb-14">
        <p className="max-w-[16ch] font-display text-[clamp(3.5rem,8vw,7.5rem)] font-bold leading-[0.88]">
          <SplitText text="הים במערב, העיר מתחת, והשקט מקומה 30" />
        </p>
      </Container>
    </section>
  );
}
