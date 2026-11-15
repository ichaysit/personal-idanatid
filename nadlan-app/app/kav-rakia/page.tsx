import type { Metadata, Viewport } from 'next';
import { Footer } from '@/components/layout/Footer';
import { MobileBar } from '@/components/layout/MobileBar';
import { Navbar } from '@/components/layout/Navbar';
import { Contact } from '@/components/sections/Contact';
import { Areas, Coast } from '@/components/sections/rakia/Areas';
import { Hero } from '@/components/sections/rakia/Hero';
import { Listings } from '@/components/sections/rakia/Listings';
import { rakia } from '@/lib/constants';
import { DepthGallery } from '@/components/effects/DepthGallery';
import { SiteEffects } from '@/components/effects/SiteEffects';
import { Tilt3D } from '@/components/effects/Tilt3D';

export const metadata: Metadata = {
  title: 'קו רקיע | פנטהאוזים ודירות במגדלי תל אביב',
  description: 'פנטהאוזים ודירות במגדלי תל אביב, מקומה 18 ומעלה. פארק צמרת, רוטשילד, נווה צדק, שרונה ונמל תל אביב.',
};

export const viewport: Viewport = { themeColor: '#17111c' };

export default function Page() {
  return (
    <div data-site="rakia">
      <SiteEffects name={rakia.name} />
      <Navbar site={rakia} />
      <main>
        <Hero />
        <Listings />
        <DepthGallery
          title="מבפנים החוצה"
          shots={[
            { image: 'tower-glass', caption: 'פארק צמרת, מבט מהרחוב' },
            { image: 'pent-kitchen', caption: 'מטבח, דופלקס רוטשילד' },
            { image: 'tower-bw', caption: 'מגדלי המשרדים של שרונה' },
            { image: 'bedroom-light', caption: 'חדר שינה, קומה 29' },
            { image: 'pent-living', caption: 'סלון בגובה כפול' },
            { image: 'terrace-dusk', caption: 'המרפסת בשעת שקיעה' },
          ]}
        />
        <Tilt3D>
          <Areas />
        </Tilt3D>
        <Tilt3D>
          <Coast />
        </Tilt3D>
        <Tilt3D>
          <Contact
          site={rakia}
          title="עולים לראות?"
          text="סיור נמשך כשעה ומתואם ישירות עם הסוכן של השכונה. אפשר לראות עד שלושה נכסים באותו ביקור, גם בשעת השקיעה."
          interests={['פנטהאוז', 'דירה במגדל, 4 עד 5 חדרים', 'דירה במגדל, עד 3 חדרים', 'השקעה להשכרה', 'מכירת נכס שבבעלותי']}
          submitLabel="שליחת בקשה לסיור"
          doneText="הסוכן של השכונה יתקשר אליכם עד מחר בצהריים כדי לקבוע שעה."
          headingClass="font-bold text-[clamp(4rem,9vw,8.5rem)] leading-[0.85]"
        />
        </Tilt3D>
      </main>
      <Footer site={rakia} />
      <MobileBar site={rakia} cta="תיאום סיור" />
    </div>
  );
}
