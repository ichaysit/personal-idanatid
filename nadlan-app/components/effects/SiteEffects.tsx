'use client';

import { useEffect, useRef, useState } from 'react';

/* שכבת האפקטים הכללית של כל אתר: מסך פתיחה, גרעיניות וסמן מותאם. */
export function SiteEffects({ name }: { name: string }) {
  const cursor = useRef<HTMLDivElement>(null);
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
