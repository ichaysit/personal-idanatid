import { Container } from '@/components/layout/Container';
import { ParallaxWrapper } from '@/components/animations/ParallaxWrapper';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { evenMaterials } from '@/lib/constants';
import { cn, img } from '@/lib/utils';

export function Materials() {
  return (
    <section id="materials" className="scroll-mt-16 bg-fg py-24 text-bg md:py-36">
      <Container>
        <h2 className="max-w-[16ch] text-[clamp(2.5rem,5.4vw,5rem)] font-bold leading-[1.02]">שלושה דברים שאנחנו בודקים בכל בית</h2>
        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {evenMaterials.map((m, i) => (
            <div key={m.title} className={cn(i === 1 && 'md:mt-24', i === 2 && 'md:mt-48')}>
              <ScrollReveal variant="curtain">
                <ParallaxWrapper strength={7} className="aspect-[4/5]">
                  <img src={img(m.image)} alt="" loading="lazy" className="h-full w-full object-cover" />
                </ParallaxWrapper>
              </ScrollReveal>
              <h3 className="mt-6 text-[2.75rem] font-bold leading-none">{m.title}</h3>
              <p className="mt-3 max-w-[36ch] text-bg/75">{m.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
