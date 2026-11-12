import { Container } from '@/components/layout/Container';
import { ParallaxWrapper } from '@/components/animations/ParallaxWrapper';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { bustanServices } from '@/lib/constants';
import { img } from '@/lib/utils';
import { SplitText } from '@/components/effects/SplitText';

export function Night() {
  return (
    <section className="relative h-[92vh] min-h-[540px]">
      <ParallaxWrapper className="absolute inset-0" strength={9}>
        <img src={img('pool-night')} alt="בריכה מוארת בחצר של וילה בשעת ערב" loading="lazy" className="h-full w-full object-cover" />
      </ParallaxWrapper>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-bg via-bg/20 to-bg" />
      <Container className="relative flex h-full items-center">
        <figure className="m-0">
          <blockquote className="m-0 max-w-[17ch] font-display text-[clamp(2.2rem,4.6vw,4.4rem)] font-light leading-[1.15]">
            ״ראינו את הבית פעם אחת, בתשע בערב. בעשר כבר ידענו.״
          </blockquote>
          <figcaption className="mt-6 text-mute">משפחת ר., עברה לקיסריה באביב 2025</figcaption>
        </figure>
      </Container>
    </section>
  );
}

export function Service() {
  return (
    <section id="service" className="scroll-mt-16 py-24 md:py-36">
      <Container>
        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <ScrollReveal variant="curtain" className="md:col-span-7">
            <img src={img('villa-open')} alt="סלון פתוח עם מדרגות עץ וקיר זכוכית אל הגינה" loading="lazy" className="aspect-[3/2] w-full object-cover" />
          </ScrollReveal>
          <ScrollReveal variant="curtain" delay={0.15} className="md:col-span-5 md:mt-24">
            <img src={img('villa-salon')} alt="סלון בהיר בגובה כפול עם אח וקיר אבן" loading="lazy" className="aspect-[4/5] w-full object-cover md:aspect-auto md:h-full" />
          </ScrollReveal>
        </div>

        <h2 className="mt-20 max-w-[18ch] text-[clamp(2.75rem,6vw,5.5rem)] font-light leading-[1.02]">
          <SplitText text="מה כלול בליווי שלנו" />
        </h2>
        <div className="mt-12 grid border-t border-line md:grid-cols-3">
          {bustanServices.map((s) => (
            <div key={s.title} className="border-b border-line py-8 md:border-b-0 md:border-s md:px-8 md:first:border-s-0 md:first:ps-0">
              <h3 className="text-[1.7rem] font-normal leading-tight">{s.title}</h3>
              <p className="mt-4 text-mute">{s.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
