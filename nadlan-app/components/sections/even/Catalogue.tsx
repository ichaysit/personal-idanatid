'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { TiltCard } from '@/components/ui/Card';
import { even } from '@/lib/constants';
import { cn, img, price } from '@/lib/utils';
import { SplitText } from '@/components/effects/SplitText';

/* קטלוג בצורת טבלה. בחירה בשורה מחליפה את התמונה הדביקה שלצדה
   בסיבוב במרחב, כמו דף שמתהפך. */
export function Catalogue() {
  const [sel, setSel] = useState(0);
  const list = even.properties;

  return (
    <section id="listings" className="scroll-mt-16 py-24 md:py-36">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-fg pb-5">
          <h2 className="text-[clamp(2.5rem,5.4vw,5rem)] font-bold leading-none">
            <SplitText text="הקטלוג" />
          </h2>
          <p className="text-mute">שישה בתים, מעודכן לנובמבר 2026</p>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.25fr_1fr] md:gap-16">
          <ul className="m-0 list-none p-0">
            {list.map((p, i) => {
              const on = sel === i;
              return (
                <li key={p.id} className="border-b border-line">
                  <button
                    type="button"
                    aria-expanded={on}
                    onClick={() => setSel(i)}
                    onPointerEnter={(e) => e.pointerType === 'mouse' && setSel(i)}
                    className={cn(
                      'grid w-full cursor-pointer grid-cols-[1fr_auto] items-baseline gap-x-6 border-0 bg-transparent py-5 text-start transition-[padding,color] duration-500 ease-out-expo',
                      on ? 'ps-4 text-acc' : 'ps-0 text-fg',
                    )}
                  >
                    <span className="font-display text-[clamp(1.6rem,3vw,2.5rem)] font-bold leading-tight">{p.name}</span>
                    <span className="text-fg">{price(p.price)}</span>
                    <span className="text-[0.95rem] text-mute">{p.place}</span>
                    <span className="text-[0.95rem] text-mute">
                      {p.sqm} מ״ר, {p.rooms} חדרים, {p.extraLabel} {p.extra}
                    </span>
                  </button>
                  <div className={cn('grid transition-[grid-template-rows] duration-500 ease-out-expo', on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                    <div className="overflow-hidden">
                      <p className="max-w-[52ch] pb-5 ps-4">{p.note}</p>
                      <img src={img(p.image)} alt={`${p.name}, ${p.place}`} loading="lazy" className="mb-6 aspect-[4/3] w-full object-cover md:hidden" />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <TiltCard max={7} className="sticky top-24 mt-8 aspect-[4/5]">
              <div className="relative h-full w-full [perspective:1400px]">
                {list.map((p, i) => (
                  <img
                    key={p.id}
                    src={img(p.image)}
                    alt={sel === i ? `${p.name}, ${p.place}` : ''}
                    loading="lazy"
                    className={cn(
                      'absolute inset-0 h-full w-full origin-right object-cover transition-[transform,opacity] duration-700 ease-out-expo',
                      sel === i ? 'opacity-100 [transform:rotateY(0deg)]' : 'opacity-0 [transform:rotateY(-70deg)]',
                    )}
                  />
                ))}
              </div>
              <p className="absolute bottom-0 start-0 bg-fg px-4 py-2 font-display text-bg [transform:translateZ(46px)]">
                {list[sel].extraLabel} {list[sel].extra}
              </p>
            </TiltCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
