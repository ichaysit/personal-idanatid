/* כל התוכן של שלושת האתרים: שמות, טלפונים, נכסים. הכול בדוי. */

export type Property = {
  id: string;
  name: string;
  place: string;
  image: string;
  price: number;
  rooms: number;
  sqm: number;
  note: string;
  /** שדה ייחודי לכל אתר: קומה, שטח מגרש או גובה מעל פני הים */
  extra: string;
  extraLabel: string;
};

export type Agent = { name: string; role: string; phone: string };

export type Site = {
  key: 'rakia' | 'bustan' | 'even';
  path: string;
  name: string;
  tagline: string;
  phone: string;
  mobile: string;
  email: string;
  address: string;
  hours: string;
  license: string;
  nav: { label: string; href: string }[];
  properties: Property[];
  agents: Agent[];
};

export const rakia: Site = {
  key: 'rakia',
  path: '/kav-rakia/',
  name: 'קו רקיע',
  tagline: 'פנטהאוזים ודירות במגדלי תל אביב',
  phone: '03-617-4082',
  mobile: '054-881-2096',
  email: 'office@kav-rakia.example',
  address: 'שדרות רוטשילד 22, קומה 31, תל אביב',
  hours: 'ראשון עד חמישי 9:00 עד 19:00, שישי 9:00 עד 13:00',
  license: 'רישיון תיווך 3120457',
  nav: [
    { label: 'נכסים', href: '#listings' },
    { label: 'סיור תלת־ממדי', href: '#tour' },
    { label: 'שכונות', href: '#areas' },
    { label: 'הצוות', href: '#team' },
    { label: 'תיאום סיור', href: '#contact' },
  ],
  properties: [
    {
      id: 'r1',
      name: 'פנטהאוז האופק',
      place: 'פארק צמרת',
      image: 'pent-sea',
      price: 28500000,
      rooms: 6,
      sqm: 412,
      note: 'קומה מלאה עם בריכת שחייה פרטית ומרפסת של 140 מ״ר שפונה לים.',
      extra: '44',
      extraLabel: 'קומה',
    },
    {
      id: 'r2',
      name: 'מגדל לבן 2901',
      place: 'שרונה',
      image: 'tower-white',
      price: 9800000,
      rooms: 4,
      sqm: 148,
      note: 'דירת פינה עם חלונות מהרצפה עד התקרה, שתי חניות ומחסן.',
      extra: '29',
      extraLabel: 'קומה',
    },
    {
      id: 'r3',
      name: 'דופלקס רוטשילד',
      place: 'שדרות רוטשילד',
      image: 'pent-living',
      price: 17200000,
      rooms: 5,
      sqm: 236,
      note: 'סלון בגובה כפול, קיר עץ אלון וגישה ישירה לגג משותף עם בריכה.',
      extra: '33',
      extraLabel: 'קומה',
    },
    {
      id: 'r4',
      name: 'הזווית',
      place: 'נמל תל אביב',
      image: 'tower-angular',
      price: 13400000,
      rooms: 4,
      sqm: 189,
      note: 'בניין בוטיק של 22 דירות בלבד, מול הירקון והים.',
      extra: '18',
      extraLabel: 'קומה',
    },
    {
      id: 'r5',
      name: 'מרפסת השקיעה',
      place: 'נווה צדק',
      image: 'terrace-dusk',
      price: 21900000,
      rooms: 5,
      sqm: 274,
      note: 'בריכת זרמים על המרפסת ונוף פתוח מיפו העתיקה ועד הרצליה.',
      extra: '38',
      extraLabel: 'קומה',
    },
    {
      id: 'r6',
      name: 'סטודיו השחר',
      place: 'הצפון הישן',
      image: 'apt-block',
      price: 6450000,
      rooms: 3,
      sqm: 96,
      note: 'בניין חדש עם לובי מאויש, חדר כושר וחניון רובוטי.',
      extra: '21',
      extraLabel: 'קומה',
    },
  ],
  agents: [
    { name: 'נועה בן דוד', role: 'פארק צמרת ושרונה', phone: '054-881-2096' },
    { name: 'איתי שגב', role: 'רוטשילד ונווה צדק', phone: '052-734-6018' },
    { name: 'מאיה קורן', role: 'קונים מחו״ל, עברית, צרפתית ואנגלית', phone: '058-405-7723' },
  ],
};

export const rakiaAreas = [
  { name: 'פארק צמרת', image: 'tower-glass', count: 11, sqmPrice: 71000 },
  { name: 'שדרות רוטשילד', image: 'pent-kitchen', count: 9, sqmPrice: 78500 },
  { name: 'נווה צדק', image: 'terrace-dusk', count: 6, sqmPrice: 82000 },
  { name: 'שרונה', image: 'tower-white', count: 8, sqmPrice: 66000 },
  { name: 'נמל תל אביב', image: 'tower-angular', count: 7, sqmPrice: 69500 },
];

export const bustan: Site = {
  key: 'bustan',
  path: '/bustan/',
  name: 'בוסתן',
  tagline: 'וילות פרטיות על קו החוף',
  phone: '09-958-2310',
  mobile: '050-672-9140',
  email: 'shalom@bustan-villas.example',
  address: 'רחוב הדקל 7, הרצליה פיתוח',
  hours: 'ראשון עד חמישי 8:30 עד 18:00, סיורים גם בשישי בבוקר',
  license: 'רישיון תיווך 2987103',
  nav: [
    { label: 'וילות', href: '#listings' },
    { label: 'סיור תלת־ממדי', href: '#tour' },
    { label: 'השירות', href: '#service' },
    { label: 'צור קשר', href: '#contact' },
  ],
  properties: [
    {
      id: 'b1',
      name: 'בית הגלים',
      place: 'ארסוף',
      image: 'villa-white',
      price: 42000000,
      rooms: 8,
      sqm: 620,
      note: 'קו ראשון לים על צוק הכורכר. בריכת אינסוף של 22 מטר, יחידת אורחים נפרדת ומעלית פנימית.',
      extra: '1,450 מ״ר',
      extraLabel: 'מגרש',
    },
    {
      id: 'b2',
      name: 'וילה תמר',
      place: 'קיסריה, שכונה 13',
      image: 'villa-lawn',
      price: 19800000,
      rooms: 7,
      sqm: 480,
      note: 'חמש דקות הליכה ממגרש הגולף. חצר דרומית עם מטבח חוץ ובריכה מחוממת.',
      extra: '1,020 מ״ר',
      extraLabel: 'מגרש',
    },
    {
      id: 'b3',
      name: 'בית הזכוכית',
      place: 'הרצליה פיתוח',
      image: 'villa-glass',
      price: 33500000,
      rooms: 6,
      sqm: 540,
      note: 'קומת קרקע שנפתחת כולה לגינה. 300 מטר מחוף הנכים, רחוב ללא מוצא.',
      extra: '890 מ״ר',
      extraLabel: 'מגרש',
    },
    {
      id: 'b4',
      name: 'אחוזת הברוש',
      place: 'סביון',
      image: 'villa-hill',
      price: 27400000,
      rooms: 9,
      sqm: 710,
      note: 'שני דונם עם עצי זית ותיקים, בריכה באורך 18 מטר ומרתף יין ל־900 בקבוקים.',
      extra: '2,100 מ״ר',
      extraLabel: 'מגרש',
    },
    {
      id: 'b5',
      name: 'החצר הפנימית',
      place: 'כפר שמריהו',
      image: 'villa-court',
      price: 23900000,
      rooms: 6,
      sqm: 455,
      note: 'בית שבנוי סביב פטיו עם בריכת שיקוף. כל חדרי השינה פונים אל המים.',
      extra: '1,180 מ״ר',
      extraLabel: 'מגרש',
    },
  ],
  agents: [
    { name: 'רונית אלמוג', role: 'מייסדת, הרצליה פיתוח וארסוף', phone: '050-672-9140' },
    { name: 'יואב פרידמן', role: 'קיסריה', phone: '052-318-4476' },
    { name: 'דנה שושן', role: 'סביון וכפר שמריהו', phone: '054-290-5581' },
  ],
};

export const bustanServices = [
  {
    title: 'הערכת שווי לפני שמפרסמים',
    text: 'שמאי מקרקעין בודק את הנכס ואת עסקאות הרחוב בשלוש השנים האחרונות. אתם מקבלים מספר אחד, עם ההסבר מאחוריו.',
  },
  {
    title: 'סיורים בתיאום בלבד',
    text: 'אין שלט על הגדר ואין בית פתוח. כל מתעניין עובר אימות יכולת כלכלית לפני שהוא נכנס אליכם הביתה.',
  },
  {
    title: 'ליווי לתושבי חוץ',
    text: 'פתיחת חשבון נאמנות, ייצוג מול רשות המסים וניהול הנכס אחרי הרכישה. בעברית, בצרפתית ובאנגלית.',
  },
];

export const even: Site = {
  key: 'even',
  path: '/even-vakav/',
  name: 'אבן וקו',
  tagline: 'בתי אדריכלים בהרי ירושלים, בכרמל ובגליל',
  phone: '02-539-7741',
  mobile: '053-826-1904',
  email: 'studio@even-vakav.example',
  address: 'דרך הגפן 3, עין כרם, ירושלים',
  hours: 'ראשון עד חמישי 9:00 עד 17:30',
  license: 'רישיון תיווך 3304618',
  nav: [
    { label: 'הקטלוג', href: '#listings' },
    { label: 'סיור תלת־ממדי', href: '#tour' },
    { label: 'חומרים', href: '#materials' },
    { label: 'ביקור בבית', href: '#contact' },
  ],
  properties: [
    {
      id: 'e1',
      name: 'בית האלון',
      place: 'עין כרם, ירושלים',
      image: 'house-tree',
      price: 14800000,
      rooms: 6,
      sqm: 340,
      note: 'נבנה סביב אלון בן מאה שנה. אדריכלות: סטודיו לביא־רום, 2023.',
      extra: '742 מ׳',
      extraLabel: 'גובה',
    },
    {
      id: 'e2',
      name: 'בית הגמלון',
      place: 'זכרון יעקב',
      image: 'house-gable',
      price: 9600000,
      rooms: 5,
      sqm: 265,
      note: 'גג רעפים אפור וחזית אבן, עם נוף פתוח לים מקומת השינה.',
      extra: '168 מ׳',
      extraLabel: 'גובה',
    },
    {
      id: 'e3',
      name: 'בית הארז',
      place: 'ראש פינה',
      image: 'house-wood',
      price: 7900000,
      rooms: 5,
      sqm: 230,
      note: 'חיפוי ארז אדום ופלדה מושחרת. מרפסת שמשקיפה על עמק החולה והחרמון.',
      extra: '465 מ׳',
      extraLabel: 'גובה',
    },
    {
      id: 'e4',
      name: 'בית המדרון',
      place: 'דניה, חיפה',
      image: 'house-timber',
      price: 11200000,
      rooms: 6,
      sqm: 310,
      note: 'שלושה מפלסים שיורדים עם הכרמל. חורש טבעי מתחיל בקצה הגינה.',
      extra: '381 מ׳',
      extraLabel: 'גובה',
    },
    {
      id: 'e5',
      name: 'הבית הלבן',
      place: 'מצפה רמון',
      image: 'house-white',
      price: 5400000,
      rooms: 4,
      sqm: 190,
      note: 'קוביות טיח לבן מול המכתש. קירות עבים שמחזיקים את הקרירות של הלילה.',
      extra: '860 מ׳',
      extraLabel: 'גובה',
    },
    {
      id: 'e6',
      name: 'בית הסף',
      place: 'מבשרת ציון',
      image: 'house-entry',
      price: 8700000,
      rooms: 5,
      sqm: 245,
      note: 'חזית סגורה לרחוב ופתוחה כולה לוואדי. רבע שעה מהכניסה לירושלים.',
      extra: '698 מ׳',
      extraLabel: 'גובה',
    },
  ],
  agents: [
    { name: 'אדר׳ תמר לביא', role: 'שותפה, ירושלים וההרים', phone: '053-826-1904' },
    { name: 'עומר חדד', role: 'כרמל וזכרון יעקב', phone: '052-477-3059' },
    { name: 'שירה נחום', role: 'גליל ונגב', phone: '054-612-8840' },
  ],
};

/* מיקומי הסיכות על מפת התבליט, ביחידות של המפה (‎-1 עד 1) */
export const evenPins: { id: string; x: number; z: number }[] = [
  { id: 'e1', x: 0.18, z: 0.22 },
  { id: 'e2', x: -0.42, z: -0.2 },
  { id: 'e3', x: 0.46, z: -0.5 },
  { id: 'e4', x: -0.3, z: -0.48 },
  { id: 'e5', x: -0.12, z: 0.62 },
  { id: 'e6', x: 0.02, z: 0.02 },
];

export const evenMaterials = [
  {
    title: 'אבן',
    image: 'in-grey',
    text: 'אבן גיר מקומית מסותתת ביד. היא מתחממת לאט ושומרת על הבית קריר עד הערב.',
  },
  {
    title: 'עץ',
    image: 'in-warm',
    text: 'אלון וארז בלי לכה מבריקה. העץ מקבל גוון אפור עם השנים, וזה בכוונה.',
  },
  {
    title: 'אור',
    image: 'in-plants',
    text: 'חלון צפוני גבוה בכל חלל מגורים. אור אחיד כל היום, בלי סנוור ובלי וילונות.',
  },
];

export const sites = [rakia, bustan, even];
