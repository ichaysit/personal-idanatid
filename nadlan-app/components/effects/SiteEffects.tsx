'use client';

import { useEffect, useRef, useState } from 'react';

/* שכבת האפקטים הכללית של כל אתר: מסך פתיחה, גרעיניות וסמן מותאם. */
export function SiteEffects({ name }: { name: string }) {
  const cursor = useRef<HTMLDivElement>(null);
  const anchor = useRef<HTMLSpanElement>(null);

  /* כל האתר זז בעומק לפי הסמן. בטלפון: לפי האצבע ולפי הטיית המכשיר,
     וכשאין קלט הוא ממשיך להתנדנד לאט בעצמו. הערכים נכתבים למשתני CSS (‎--mx, ‎--my)
     וכללי העיצוב מזיזים כל שכבה בעוצמה אחרת. */
  useEffect(() => {
    const site = anchor.current?.closest<HTMLElement>('[data-site]');
    if (!site || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    let tx = 0, ty = 0, x = 0, y = 0, kick = 0, lastY = window.scrollY, lastInput = -1e9, frame = 0;
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    const point = (cx: number, cy: number) => {
      tx = clamp((cx / window.innerWidth) * 2 - 1);
      ty = clamp((cy / window.innerHeight) * 2 - 1);
      lastInput = performance.now();
    };
    const onPointer = (e: PointerEvent) => e.pointerType === 'mouse' && point(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => e.touches[0] && point(e.touches[0].clientX, e.touches[0].clientY);
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      tx = clamp(e.gamma / 22);
      ty = clamp((e.beta - 45) / 28);
      lastInput = performance.now();
    };
    const onScroll = () => {
      kick = clamp((window.scrollY - lastY) / 50);
      lastY = window.scrollY;
    };
    const tick = (now: number) => {
      /* בלי קלט במכשיר מגע: תנודה איטית, כדי שהאפקט יהיה קיים גם שם */
      if (coarse && now - lastInput > 2500) {
        tx = Math.sin(now / 2300) * 0.75;
        ty = Math.cos(now / 3100) * 0.5;
      }
      x += (tx - x) * 0.07;
      y += (ty + kick * 0.8 - y) * 0.07;
      kick *= 0.9;
      site.style.setProperty('--mx', x.toFixed(4));
      site.style.setProperty('--my', y.toFixed(4));
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('touchstart', onTouch, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('deviceorientation', onTilt, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('deviceorientation', onTilt);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  /* מסך הפתיחה יוצא באנימציית CSS, ובכל מקרה מוסר אחרי שהיא אמורה להסתיים */
  const [intro, setIntro] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setIntro(false), 2400);
    return () => clearTimeout(t);
  }, []);

  /* סמן מרובע שעוקב אחרי העכבר וגדל מעל קישורים. רק במכשיר עם עכבר. */
  useEffect(() => {
    const el = cursor.current;
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let x = -100, y = -100, tx = -100, ty = -100, s = 1, ts = 1, frame = 0;
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      ts = (e.target as HTMLElement).closest?.('a,button,[data-card],canvas') ? 3.4 : 1;
      el.style.opacity = '1';
    };
    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      s += (ts - s) * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(45deg) scale(${s})`;
      frame = requestAnimationFrame(tick);
    };
    const leave = () => (el.style.opacity = '0');
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <span ref={anchor} hidden />
      {/* מסך פתיחה: אנימציית CSS בלבד, כך שהוא נעלם גם אם משהו אחר נכשל */}
      {intro && (
        <div aria-hidden className="fx-intro" data-fx-intro>
          <span className="fx-intro-name font-display">{name}</span>
        </div>
      )}
      <div aria-hidden className="fx-grain" />
      <div
        ref={cursor}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] h-2.5 w-2.5 bg-white opacity-0 mix-blend-difference transition-opacity duration-300"
      />
    </>
  );
}
