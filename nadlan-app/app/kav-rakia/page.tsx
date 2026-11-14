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
import { HouseTour } from '@/components/sections/HouseTour';

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
        <HouseTour
          frames="kav-rakia"
          photos={['pent-living', 'pent-kitchen', 'bedroom-light', 'pent-sea', 'terrace-dusk']}
          name="פנטהאוז האופק, מבפנים"
          intro="סיור תלת־ממדי בחדרי הדירה. גללו כדי ללכת במסדרון ולהיכנס לכל חדר."
          theme={{ bg: '#17111c', wall: '#2e2233', floor: '#241a28', furniture: '#70505a', accent: '#f0a05c', podium: 'ground', water: false }}
          stops={[
            { at: 0, title: 'הסלון', text: 'חלל בגובה כפול עם קיר עץ אלון ויציאה לגג.' },
            { at: 0.23, title: 'המטבח', text: 'אי מטבח מאבן לבנה, ארבעה מושבים ומדרגות אל הגלריה.' },
            { at: 0.43, title: 'חדר השינה הראשי', text: 'חלון בגובה מלא אל העצים, וחדר ארונות צמוד.' },
            { at: 0.63, title: 'המרפסת אל הים', text: 'בריכה פרטית מאחורי מעקה זכוכית, ונוף פתוח מערבה.' },
            { at: 0.83, title: 'מרפסת השקיעה', text: 'דק עץ ובריכת זרמים, מול שקיעה מעל גגות העיר.' },
          ]}
        />
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
