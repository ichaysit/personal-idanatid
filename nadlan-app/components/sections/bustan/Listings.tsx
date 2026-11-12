import { Container } from '@/components/layout/Container';
import { ParallaxWrapper } from '@/components/animations/ParallaxWrapper';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { TiltCard } from '@/components/ui/Card';
import { bustan } from '@/lib/constants';
import { cn, img, price } from '@/lib/utils';
import { SplitText } from '@/components/effects/SplitText';

export function Intro() {
  return (
    <section className="py-24 md:py-36">
      <Container className="grid gap-10 md:grid-cols-[2fr_1fr] md:gap-20">
        <p className="font-display text-[clamp(1.9rem,3.6vw,3.4rem)] font-light leading-[1.25]">
          אנחנו מייצגים מעט בתים, ורק כאלה שהיינו גרים בהם בעצמנו. כל וילה כאן נבדקה על ידי מהנדס, שמאי ועורך דין לפני
          שהגיעה לעמוד הזה.
        </p>
        <p className="self-end text-mute">
          בוסתן פועלת מ־2009 מהרצליה פיתוח. חמישה סוכנים, כשלושים עסקאות בשנה, ורוב הקונים מגיעים בהמלצה של קונה קודם.
        </p>
      </Container>
    </section>
  );
}

export function Listings() {
  return (
    <section id="listings" className="scroll-mt-16 pb-24 md:pb-36">
      <Container>
        <h2 className="border-b border-line pb-6 text-[clamp(2.75rem,6vw,5.5rem)] font-light leading-none">
          <SplitText text="הווילות" />
        </h2>
      </Container>

      {bustan.properties.map((p, i) => (
        <Container key={p.id} className="grid items-center gap-8 pt-16 md:grid-cols-12 md:gap-14 md:pt-28">
          <TiltCard max={5} className={cn('md:col-span-7', i % 2 === 1 && 'md:order-2')}>
            <ScrollReveal variant="curtain">
              <ParallaxWrapper strength={6} className="aspect-[4/3]">
                <img src={img(p.image)} alt={`${p.name}, ${p.place}`} loading="lazy" className="h-full w-full object-cover" />
              </ParallaxWrapper>
            </ScrollReveal>
            <p className="absolute bottom-5 start-5 bg-bg px-4 py-2 text-[0.95rem] text-fg [transform:translateZ(50px)]">{p.place}</p>
          </TiltCard>

          <div className="md:col-span-5">
            <h3 className="text-[clamp(2.5rem,4.6vw,4.5rem)] font-light leading-[1.02]">{p.name}</h3>
            <p className="mt-5 max-w-[44ch] text-fg/85">{p.note}</p>
            <dl className="mt-8 grid grid-cols-3 border-y border-line">
              {[
                [p.extraLabel, p.extra],
                ['בנוי', `${p.sqm} מ״ר`],
                ['חדרים', String(p.rooms)],
              ].map(([k, v]) => (
                <div key={k} className="border-s border-line py-4 ps-4 first:border-s-0 first:ps-0">
                  <dt className="text-[0.88rem] text-mute">{k}</dt>
                  <dd className="m-0 font-display text-2xl">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <p className="font-display text-[2rem] text-acc">{price(p.price)}</p>
              <Button href="#contact" variant="outline">
                תיאום ביקור
              </Button>
            </div>
          </div>
        </Container>
      ))}
    </section>
  );
}
