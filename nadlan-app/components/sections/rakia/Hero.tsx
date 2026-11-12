import { Container } from '@/components/layout/Container';
import { StaggerContainer, StaggerFade, StaggerLine } from '@/components/animations/StaggerContainer';
import { HeroScene } from '@/components/three/HeroScene';
import { Button } from '@/components/ui/Button';
import { img } from '@/lib/utils';
import { HeroExit } from '@/components/effects/HeroExit';

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[660px] overflow-hidden">
      {/* תמונת הסצנה מוצגת מיד, והעיר החיה מכסה אותה כשה־WebGL מוכן */}
      <img src={img('poster-city')} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <HeroScene variant="city" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-bg via-bg/70 to-transparent" />

      <Container className="pointer-events-none relative flex h-full flex-col justify-end pb-10 md:pb-14">
        <HeroExit>
        <StaggerContainer>
          <h1 className="text-[clamp(6.5rem,18vw,18rem)] font-bold leading-[0.8]">
            <StaggerLine>גרים מעל</StaggerLine>
            <StaggerLine>העיר</StaggerLine>
          </h1>

          <StaggerFade className="mt-8 grid items-end gap-8 border-t border-line pt-6 md:grid-cols-[1fr_auto]">
            <p className="max-w-[44ch] text-lg text-fg/85">
              פנטהאוזים ודירות במגדלי תל אביב, מקומה 18 ומעלה. 41 נכסים זמינים היום, חלקם לא מפורסמים בשום מקום אחר.
            </p>
            <div className="pointer-events-auto flex flex-wrap gap-3">
              <Button href="#listings">לצפייה בנכסים</Button>
              <Button href="#contact" variant="outline">
                תיאום סיור
              </Button>
            </div>
          </StaggerFade>
        </StaggerContainer>
        </HeroExit>
      </Container>
    </section>
  );
}
