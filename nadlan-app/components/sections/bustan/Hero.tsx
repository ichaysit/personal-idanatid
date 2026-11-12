import { Container } from '@/components/layout/Container';
import { StaggerContainer, StaggerFade, StaggerLine } from '@/components/animations/StaggerContainer';
import { HeroScene } from '@/components/three/HeroScene';
import { Button } from '@/components/ui/Button';
import { img } from '@/lib/utils';

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[660px] overflow-hidden">
      {/* התמונה נטענת מיד; שכבת המים החיה מכסה אותה כשה־WebGL מוכן */}
      <img src={img('villa-hero')} alt="וילה לבנה בת שתי קומות מול בריכת שחייה ארוכה" className="absolute inset-0 h-full w-full object-cover" />
      <HeroScene variant="water" src={img('villa-hero')} waterline={0.4} />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/35 to-bg/30" />

      <Container className="pointer-events-none relative flex h-full flex-col justify-end pb-12 md:pb-16">
        <StaggerContainer delay={0.35}>
          <h1 className="max-w-[13ch] text-[clamp(3.25rem,8.2vw,8.25rem)] font-light leading-[1.02]">
            <StaggerLine>בית עם בריכה,</StaggerLine>
            <StaggerLine>שקט, וים קרוב</StaggerLine>
          </h1>
          <StaggerFade className="mt-9 flex flex-wrap items-end justify-between gap-8">
            <p className="max-w-[42ch] text-lg text-fg/90">
              וילות פרטיות בארסוף, בהרצליה פיתוח, בקיסריה, בסביון ובכפר שמריהו. הזיזו את הסמן על המים.
            </p>
            <div className="pointer-events-auto flex flex-wrap gap-3">
              <Button href="#listings">לווילות</Button>
              <Button href="#contact" variant="outline">
                שיחה עם רונית
              </Button>
            </div>
          </StaggerFade>
        </StaggerContainer>
      </Container>
    </section>
  );
}
