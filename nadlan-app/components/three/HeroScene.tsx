'use client';

import { Component, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { Pin } from './TerrainScene';

/* נקודת הכניסה לסצנות התלת־ממד. הכול נטען רק בדפדפן, אחרי שהטקסט כבר על המסך. */

const SceneCanvas = dynamic(() => import('./SceneCanvas'), { ssr: false });
const CityScene = dynamic(() => import('./CityScene'), { ssr: false });
const WaterScene = dynamic(() => import('./WaterScene'), { ssr: false });
const TerrainScene = dynamic(() => import('./TerrainScene'), { ssr: false });

type Props =
  | { variant: 'city'; className?: string }
  | { variant: 'water'; className?: string; src: string; waterline?: number }
  | { variant: 'terrain'; className?: string; pins: Pin[]; active: string; onActive: (id: string) => void };

/* אם ה־WebGL לא זמין או קורס, נשארת מתחת תמונת הסצנה והדף ממשיך לעבוד */
class SceneGuard extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export function HeroScene(props: Props) {
  const [ok, setOk] = useState(false);
  useEffect(() => setOk(hasWebGL()), []);
  if (!ok) return null;
  return (
    <SceneGuard>
      <Scene {...props} />
    </SceneGuard>
  );
}

function Scene(props: Props) {
  if (props.variant === 'city') {
    return (
      <SceneCanvas
        className={props.className}
        camera={{ position: [10, 7, 15], fov: 42 }}
        bloom={{ threshold: 1, intensity: 0.85 }}
        vignette={0.55}
        lights={['#ff9a52', '#c4687a']}
      >
        <CityScene />
      </SceneCanvas>
    );
  }
  if (props.variant === 'water') {
    return (
      <SceneCanvas
        className={props.className}
        camera={{ position: [0, 0, 5], fov: 45 }}
        bloom={{ threshold: 1, intensity: 0.7 }}
        vignette={0.5}
      >
        <WaterScene src={props.src} waterline={props.waterline} />
      </SceneCanvas>
    );
  }
  return (
    <SceneCanvas
      className={props.className}
      camera={{ position: [-7, 6.6, 11.5], fov: 40 }}
      bloom={{ threshold: 1, intensity: 0.9 }}
      lights={['#fff4e0', '#e8d9c8']}
    >
      <TerrainScene pins={props.pins} active={props.active} onActive={props.onActive} />
    </SceneCanvas>
  );
}
