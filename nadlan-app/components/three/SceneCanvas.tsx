'use client';

import { createContext, Suspense, useContext, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import { clamp, cn } from '@/lib/utils';

/* מצב משותף לסצנה: מיקום הסמן (‎-1 עד 1) והתקדמות הגלילה בתוך האזור (0 עד 1).
   נשמר ב־ref כדי שלא לגרום לרינדור מחדש בכל תזוזה. */
export type SceneState = { px: number; py: number; scroll: number; moved: number; coarse: boolean };
const Ctx = createContext<React.RefObject<SceneState> | null>(null);

export function useSceneState() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useSceneState must be used inside <SceneCanvas>');
  return c;
}

type Props = {
  children: React.ReactNode;
  className?: string;
  camera?: { position: [number, number, number]; fov: number };
  bloom?: { threshold: number; intensity: number };
  vignette?: number;
  /** צבעי תאורת הסביבה, לפי הזהות של האתר */
  lights?: [string, string];
  /** אזור גלילה גבוה שהסצנה דביקה בתוכו. ההתקדמות נמדדת לאורכו. */
  scrollTarget?: React.RefObject<HTMLElement | null>;
};

export default function SceneCanvas({
  children,
  className,
  camera = { position: [0, 0, 5], fov: 45 },
  bloom = { threshold: 0.8, intensity: 0.5 },
  vignette = 0,
  lights = ['#ffffff', '#ffffff'],
  scrollTarget,
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const state = useRef<SceneState>({ px: 0, py: 0, scroll: 0, moved: -1e9, coarse: false });
  const [visible, setVisible] = useState(true);
  const [reduce, setReduce] = useState(false);
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(mq.matches);
    const onMq = () => setReduce(mq.matches);
    mq.addEventListener('change', onMq);

    /* בטלפון אין סמן: הסצנה מגיבה למגע, ובין מגע למגע היא נעה בעצמה */
    const touch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    state.current.coarse = touch;
    setCoarse(touch);

    const point = (x: number, y: number) => {
      state.current.px = (x / window.innerWidth) * 2 - 1;
      state.current.py = -((y / window.innerHeight) * 2 - 1);
      state.current.moved = performance.now();
    };
    const onPointer = (e: PointerEvent) => point(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) point(t.clientX, t.clientY);
    };
    const onScroll = () => {
      const target = scrollTarget?.current;
      if (target) {
        const t = target.getBoundingClientRect();
        state.current.scroll = clamp(-t.top / Math.max(1, t.height - window.innerHeight));
        return;
      }
      const r = el.getBoundingClientRect();
      state.current.scroll = clamp(-r.top / Math.max(1, r.height));
    };
    onScroll();
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('touchstart', onTouch, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '80px' });
    io.observe(el);
    return () => {
      mq.removeEventListener('change', onMq);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      io.disconnect();
    };
  }, [scrollTarget]);

  return (
    <div ref={wrap} aria-hidden className={cn('canvas-fill', className)}>
      <Canvas
        camera={camera}
        dpr={[1, coarse ? 1.5 : 1.75]}
        frameloop={!visible ? 'never' : reduce ? 'demand' : 'always'}
        gl={{ antialias: !coarse, powerPreference: 'high-performance' }}
      >
        <Ctx.Provider value={state}>
          <Suspense fallback={null}>
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            {/* 3D Content */}
            {children}

            {/* Environment & Effects: סביבה מקומית, בלי הורדת HDR מהרשת */}
            <Environment resolution={64}>
              <Lightformer form="rect" intensity={3} color={lights[0]} position={[6, 5, -8]} scale={[12, 4, 1]} />
              <Lightformer form="rect" intensity={1.5} color={lights[1]} position={[-8, 3, 6]} scale={[10, 3, 1]} />
            </Environment>
            <EffectComposer>
              <Bloom luminanceThreshold={bloom.threshold} intensity={bloom.intensity} mipmapBlur luminanceSmoothing={0.2} />
              <Vignette eskil={false} offset={0.2} darkness={vignette} />
            </EffectComposer>
          </Suspense>
        </Ctx.Provider>
      </Canvas>
    </div>
  );
}
