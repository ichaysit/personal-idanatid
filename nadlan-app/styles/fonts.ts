import {
  Assistant,
  Frank_Ruhl_Libre,
  Heebo,
  IBM_Plex_Sans_Hebrew,
  Karantina,
  Miriam_Libre,
} from 'next/font/google';

/* קו רקיע: כותרות דחוסות וגבוהות כמו המגדלים, גוף טכני ונקי */
export const karantina = Karantina({
  weight: ['300', '400', '700'],
  subsets: ['hebrew', 'latin'],
  variable: '--font-karantina',
  display: 'swap',
});
export const plex = IBM_Plex_Sans_Hebrew({
  weight: ['300', '400', '500', '600'],
  subsets: ['hebrew', 'latin'],
  variable: '--font-plex',
  display: 'swap',
});

/* בוסתן: סריף עברי קלאסי בניגודיות גבוהה */
export const frank = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  variable: '--font-frank',
  display: 'swap',
});
export const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  variable: '--font-heebo',
  display: 'swap',
});

/* אבן וקו: אות שרטוטית, כמו כיתוב על תוכנית אדריכלית */
export const miriam = Miriam_Libre({
  weight: ['400', '700'],
  subsets: ['hebrew', 'latin'],
  variable: '--font-miriam',
  display: 'swap',
});
export const assistant = Assistant({
  subsets: ['hebrew', 'latin'],
  variable: '--font-assistant',
  display: 'swap',
});

export const fontVars = [karantina, plex, frank, heebo, miriam, assistant]
  .map((f) => f.variable)
  .join(' ');
