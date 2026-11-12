import type { Metadata, Viewport } from 'next';
import { Footer } from '@/components/layout/Footer';
import { MobileBar } from '@/components/layout/MobileBar';
import { Navbar } from '@/components/layout/Navbar';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/bustan/Hero';
import { Intro, Listings } from '@/components/sections/bustan/Listings';
import { Night, Service } from '@/components/sections/bustan/Service';
import { bustan } from '@/lib/constants';
import { Prism } from '@/components/effects/Prism';
import { Marquee } from '@/components/effects/Marquee';
import { SiteEffects } from '@/components/effects/SiteEffects';
import { Tilt3D } from '@/components/effects/Tilt3D';
import { HouseTour } from '@/components/sections/HouseTour';

export const metadata: Metadata = {
  title: 'בוסתן | וילות פרטיות על קו החוף',
  description: 'וילות פרטיות עם בריכה בארסוף, בהרצליה פיתוח, בקיסריה, בסביון ובכפר שמריהו.',
};

export const viewport: Viewport = { themeColor: '#141c17' };

export default function Page() {
  return (
    <div data-site="bustan">
      <SiteEffects name={bustan.name} />
      <Navbar site={bustan} />
      <main>
        <Hero />
        <Tilt3D>
          <Intro />
        </Tilt3D>
        <Marquee items={['ארסוף', 'הרצליה פיתוח', 'קיסריה', 'סביון', 'כפר שמריהו']} />
        <Listings />
        <HouseTour
          name="בית הגלים, מבפנים"
          intro="הדמיה תלת־ממדית סכמטית. גללו כדי להיכנס."
          theme={{ bg: '#101713', wall: '#e9e2d2', floor: '#2c3d32', furniture: '#8d7c56', accent: '#6fc7bb', podium: 'ground', water: true }}
          stops={[
            { at: 0, title: 'מבט מבחוץ', text: 'חזית זכוכית בגובה שתי קומות, מול בריכה של 22 מטר.' },
            { at: 0.2, title: 'הכניסה', text: 'נכנסים מהדק של הבריכה ישר אל לב הבית.' },
            { at: 0.34, title: 'סלון ומטבח, 110 מ״ר', text: 'חלל מגורים אחד, עם אי מטבח באורך שלושה מטרים.' },
            { at: 0.6, title: 'הגלריה וחדר השינה', text: 'יחידת ההורים בקומת הגלריה, מעל הסלון.' },
            { at: 0.8, title: 'המרפסת והבריכה', text: 'מהקומה העליונה רואים את הים מעל קו העצים.' },
          ]}
        />
        <Prism
          heading="ומה מחכה בפנים"
          faces={[
            { image: 'villa-salon', title: 'סלון בגובה כפול', text: 'אח גז, קיר אבן וגלריה שמשקיפה מלמעלה. בית הזכוכית, הרצליה פיתוח.' },
            { image: 'villa-open', title: 'קומה פתוחה לגינה', text: 'ויטרינות של שישה מטרים שנעלמות לתוך הקיר. וילה תמר, קיסריה.' },
            { image: 'villa-poolside', title: 'שפת הבריכה', text: 'דק מעץ איפאה ומעקה זכוכית בלי מסגרת. החצר הפנימית, כפר שמריהו.' },
            { image: 'villa-tall', title: 'החזית אל המים', text: 'שלוש קומות שפונות כולן מערבה. בית הגלים, ארסוף.' },
          ]}
        />
        <Tilt3D>
          <Night />
        </Tilt3D>
        <Tilt3D>
          <Service />
        </Tilt3D>
        <Tilt3D>
          <Contact
          site={bustan}
          title="נדבר לפני שנוסעים לראות"
          text="שיחה ראשונה של עשרים דקות חוסכת סיורים מיותרים. ספרו לנו מה חשוב לכם, ונחזור עם שתיים או שלוש וילות שמתאימות."
          interests={['רכישת וילה', 'מכירת וילה שבבעלותי', 'הערכת שווי', 'ליווי לתושבי חוץ']}
          submitLabel="בקשה לשיחה"
          doneText="רונית או אחד הסוכנים יחזרו אליכם בתוך יום עסקים אחד."
          headingClass="font-light"
        />
        </Tilt3D>
      </main>
      <Footer site={bustan} />
      <MobileBar site={bustan} cta="בקשה לשיחה" />
    </div>
  );
}
