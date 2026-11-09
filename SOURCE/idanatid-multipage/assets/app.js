
document.documentElement.classList.add('js');

/* ===== À MODIFIER : vos informations ===== */
const CONFIG = {
  nameFr: "Ichay Sitbon",
  nameHe: "ישי סיטבון",
  whatsapp: "972587884418",      // format international, sans + ni espaces
  email: "ichaysitsitbon@gmail.com"
};
/* ========================================== */

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Le bandeau est doublé avant la capture du texte français, pour une boucle sans coupure */

/* ================= Traductions (hébreu ; le français est le texte d'origine du HTML) ================= */
const HE = {
tk1:"דף נחיתה",tk2:"אתר תדמית",tk3:"ממשק ניהול",tk4:"חנות אונליין",tk5:"אפליקציה בהתאמה אישית",tk6:"אחסון ותחזוקה",tk7:"קוד המקור שלכם",
skip:"דלגו לתוכן",
nav1:"אודות", nav2:"חבילות ומחירים", nav3:"תהליך העבודה", nav4:"תנאים", nav5:"יצירת קשר",
navAria:"ניווט ראשי", menu:"תפריט",
h1:"האתר שלכם באוויר תוך 5-30 ימי עבודה, במחיר שנקבע מראש.",
eyebrow:"אתרים · אפליקציות · AI לעסקים בישראל",
lead:"Idanatid בונה דפי נחיתה, אתרי תדמית עם לוח ניהול, חנויות אונליין ואפליקציות. שאלו את העוזר החכם כאן למטה, או כתבו לנו ישירות בוואטסאפ.",
cta1:"לצפייה בחבילות ובמחירים", cta2:"לכתוב בוואטסאפ",
f1:"אספקה כבר מ-5 ימי עבודה", f2:"אחסון ו-SSL כלולים", f3:"אתר מותאם קודם כול לנייד",
abH:"אני <span data-name>ישי סיטבון</span>, בונה אתרים.",
ab1:"אני בונה אתרים לעצמאים, לעסקים קטנים ובינוניים ולסוכנויות שרוצים נוכחות דיגיטלית ברורה, מהירה ומקצועית. אני מטפל בהכול: תכנון, פיתוח, העלאה לאוויר וליווי שוטף.",
ab2:"הגישה שלי: אתר פשוט להבנה עבור המבקרים ופשוט לניהול עבורכם. כשצריך, אני מוסיף כלים עסקיים אמיתיים, כמו אזור ניהול לנכסים או למוצרים שלכם, או חתימה אלקטרונית על מנדטים ועוד.",
v1a:"בהתאמה אישית", v1b:"לא תבנית ממוחזרת: האתר מתאים לעסק שלכם.",
v2a:"שקוף", v2b:"מחיר, זמנים ומה כלול נקבעים לפני שמתחילים.",
v3a:"ליווי שוטף", v3b:"אחסון, גיבויים ושינויים חודשיים.",
ofH:"שלוש חבילות, מחירים ברורים.",
ofP:"כל חבילה כוללת את בניית האתר (תשלום חד-פעמי) ומנוי חודשי לאחסון, אבטחה ושינויים. כל המחירים בשקלים (₪).",
o1t1a:"1500 ₪ · סטנדרט",
o1t1f1:"עמוד יחיד (דף נחיתה זורם) עם 4 חלקים: Hero (כותרת H1, כותרת משנה, כפתורי וואטסאפ ועוגן), אודות, שירותים (3 כרטיסים ויזואליים), יצירת קשר",
o1t1f2:"טופס פשוט (שם, טלפון, הודעה) וכפתור וואטסאפ",
o1t1f3:"רספונסיבי ב-100%, SSL, SEO בסיסי, מהירות טעינה מיטבית",
o1t2a:"2000 ₪ · בינוני",
o1t2c:"כל מה שבמדרגת 1500 ₪, ובנוסף:",
o1t2f1:"דף נחיתה מורחב ל-6 חלקים",
o1t2f2:"חלק גלריית תמונות / תיק עבודות אינטראקטיבי",
o1t2f3:"חלק המלצות לקוחות / הוכחה חברתית",
o1t3a:"2500 ₪ · פרימיום",
o1t3c:"כל מה שבמדרגת 2000 ₪, ובנוסף:",
o1t3f1:"עיבוד ויזואלי מתקדם (אפקטי CSS / Canvas קלים)",
o1t3f2:"מודול קביעת פגישות (ווידג׳ט Calendly או לוח שנה אינטראקטיבי)",
o1t3f3:"הגדרת מקומות לפיקסלים של Meta ושל Google Analytics",
o2t1a:"3000 ₪ · בסיס תדמית",
o2t1f1:"אתר רב-עמודי של 3-4 עמודים: דף הבית, אודות, שירותים, יצירת קשר",
o2t1f2:"עיצוב אישי ב-100%",
o2t1f3:"ממשק ניהול פרטי: התחברות מאובטחת (אימייל / סיסמה) לעריכת הטקסטים והתמונות בעצמכם, בלי להיות תלויים במפתח",
o2t1f4:"שמירת נתונים (LocalStorage או חיבור ל-Supabase)",
o2t2a:"3800 ₪ · סטנדרט",
o2t2c:"כל מה שבמדרגת 3000 ₪, ובנוסף:",
o2t2f1:"5 עמודים: דף הבית, שירותים / קטלוג, אודות, המלצות, יצירת קשר",
o2t2f2:"מיקרו-אנימציות אינטראקטיביות מורכבות (גרפי סטטיסטיקה מונפשים, ויזואלים ב-Canvas JS)",
o2t2f3:"לוח ניהול מלא: ניהול דינמי של קטלוג מודעות או פריטים (נכסים, שירותים, מוצרים), עם הוספה, מחיקה ועריכה בזמן אמת",
o2t2f4:"שילוב מולטימדיה: גלריית תמונות דינמית, מפות אינטראקטיביות",
o2t3a:"5000 ₪ · מתקדם",
o2t3c:"כל מה שבמדרגת 3800 ₪, ובנוסף:",
o2t3f1:"6 עמודים ויותר",
o2t3f2:"פילטרים דינמיים מתקדמים (מחיר, קטגוריה, מיקום, קריטריונים ספציפיים)",
o2t3f3:"חתימה אלקטרונית במגע (canvas ב-HTML5): חתימה ידנית בטאבלט, בנייד או בעכבר, כפתורי מחיקה / אישור, חותמת זמן, שמירת כתובת IP והפקת מסמך מסכם",
o3t1a:"8000 ₪ · חנות סטנדרט",
o3t1f1:"קטלוג מוצרים אינטראקטיבי (עד 20 מוצרים)",
o3t1f2:"עגלה צדדית אינטראקטיבית (drawer) עם סכום מחושב בזמן אמת",
o3t1f3:"תהליך רכישה ב-2 שלבים, מותאם להמרה",
o3t1f4:"תשלום מאובטח: Tranzila, CreditGuard, Hyp, Stripe",
o3t1f5:"לוח ניהול: ניהול מלאי וקבלת הזמנות",
o3t2a:"15000 ₪ · חנות מתקדמת",
o3t2c:"כל מה שבמדרגת 8000 ₪, ובנוסף:",
o3t2f1:"קטלוג עד 100 פריטים",
o3t2f2:"וריאציות של פריטים: מידות, צבעים, גדלי מארזים",
o3t2f3:"אזור אישי ללקוחות: הרשמה, התחברות, היסטוריית הזמנות",
o3t2f4:"תזכורת אוטומטית לעגלות נטושות",
o3t3a:"17000 ₪+ · חנות מאסטר / פיתוח אישי",
o3t3c:"כל מה שבמדרגת 15000 ₪, ובנוסף:",
o3t3f1:"מעל 100 מוצרים, או אפליקציית ווב בהתאמה אישית",
o3t3f2:"ניהול מתקדם של משתמשים והרשאות (מנהל, סוכן, לקוח)",
o3t3f3:"חתימות אלקטרוניות מורכבות מרובות צדדים",
o3t3f4:"הפקה אוטומטית של חשבוניות PDF ושליחת מיילים טרנזקציוניים",
o3t3f5:"חיבור ל-API של צד שלישי (ERP, CRM, לוגיסטיקה)",
o1h:"סטארטר",
o1m:"דף נחיתה להמרה, לעצמאים, בעלי מלאכה, אירועים ומקצועות חופשיים.",
o1s:"ואז 150 ₪ לחודש · אספקה תוך 5-7 ימי עבודה",
o1b:"אני רוצה את הסטארטר",
tag:"החבילה המובילה",
o2h:"אתר תדמית Pro ולוח ניהול",
o2m:"לעסקים קטנים ובינוניים, סוכנויות נדל״ן, רופאים, ספרים, משרדים ונותני שירות תובעניים.",
o2s:"ואז 300 ₪ לחודש · אספקה תוך 10-15 ימי עבודה",
o2i3:"עמוד נוסף: 500 ₪ לעמוד מעבר למסגרת החבילה",
o2b:"אני רוצה אתר תדמית Pro",
o3h:"חנות אונליין ופיתוח בהתאמה אישית",
o3m:"חנויות אונליין, קטלוגים אינטראקטיביים ופלטפורמות עסקיות.",
o3s:"ואז 400 ₪ לחודש · אספקה תוך 15-30 ימי עבודה",
o3b:"אני רוצה את החנות",
cH:"הערכת מחיר לאתר תדמית Pro",
cL1:"חבילה",
cO1:"בסיס תדמית, 3000 ₪", cO2:"סטנדרט, 3800 ₪", cO3:"מתקדם, 5000 ₪",
cL2:"עמודים נוספים (500 ₪ לעמוד)",
minus:"להסיר עמוד", plus:"להוסיף עמוד",
r1:"חבילה", r2:"עמודים נוספים", r3:"סה״כ בנייה", r4:"מקדמה בתחילת העבודה (50%)", r5:"יתרה בהעלאה לאוויר", r6:"מנוי חודשי",
pH:"איך זה עובד.",
pP:"תהליך פשוט, עם תאריכים ואישורים בכל שלב.",
s1h:"אפיון והצעת מחיר", s1p:"מגדירים את הצורך, את החבילה המתאימה ואת המחיר. אתם משלמים מקדמה של 50% כדי להתחיל.",
s2h:"תכנים", s2p:"אתם שולחים לי טקסטים, לוגו ותמונות תוך 7 ימים. אפשר לעזור לכם בכתיבה, לפי החבילה.",
s3h:"הדמיה ותיקונים", s3p:"אני מציג לכם את האב-טיפוס. יש לכם 5 ימי עבודה לבקש תיקונים.",
s4h:"העלאה לאוויר", s4p:"אתם משלמים את היתרה, אני מפרסם את האתר ומוסר לכם את הגישות. המנוי מתחיל באותו יום.",
kH:"התנאים, בלי אותיות קטנות.",
kP:"אלה עיקרי מה שאתם חותמים עליו. הפירוט המלא מופיע בהצעת המחיר.",
k1h:"תשלום",
k1a:"מקדמה של 50% שאינה מוחזרת, לפני תחילת העבודה.",
k1b:"יתרה של 50% במסירת האתר (ביום העלאתו לאוויר או מסירת הגישות).",
k1c:"המנוי נגבה אוטומטית בתחילת כל חודש, מיום העלאת האתר.",
k2h:"מעבר בין חבילות",
k2a:"אינכם משלמים שוב מחיר מלא: משלמים רק את ההפרש בין מה ששילמתם על הבנייה לבין מחיר החבילה החדשה.",
k2b:"המנוי עובר לתעריף החבילה החדשה ברגע שהיא נמסרת.",
k3h:"התכנים שלכם והזמנים",
k3a:"טקסטים, לוגו ותמונות באיכות גבוהה יש להעביר תוך 7 ימים מהחתימה. איחור מצדכם דוחה את האספקה בהתאם.",
k3b:"אם לא התקבל מענה תוך 5 ימי עבודה מהצגת ההדמיה, הפרויקט נחשב כמאושר.",
k4h:"בעלות על האתר",
k4a:"קוד המקור של האתר (והוויזואלים) מועבר אליכם ב-100% לאחר תשלום מלא של היתרה.",
k4c:"אני רשאי לציין את הפרויקט בתיק העבודות שלי ולהוסיף שורת קרדיט דיסקרטית בתחתית האתר (״נבנה על ידי…״).",
k5h:"מנוי וביטול",
k5a:"התחייבות ראשונית של 6 חודשים, ולאחר מכן ביטול בכתב בהודעה מראש של 30 ימים.",
k5b:"דקות או שעות שינויים שלא נוצלו אינן עוברות לחודש הבא.",
k5c:"במקרה של עזיבה, האתר מועבר לספק האחסון לבחירתכם, בתוספת 500 ₪ דמי ייצוא.",
k6h:"חתימה אלקטרונית",
k6a:"המודול שומר את תמונת החתימה, כתובת ה-IP וחותמת הזמן. באחריותכם לוודא שסעיפי המנדטים תואמים לחקיקה המקומית בתוקף.",
tH:"בואו נדבר על הפרויקט שלכם.",
tP:"ספרו לי על העסק ועל מה שאתם מצפים מהאתר. אחזור אליכם עם החבילה המתאימה ומחיר.",
tB1:"לשוחח בוואטסאפ", tB2:"לשלוח מייל",
formAria:"טופס יצירת קשר",
fL1:"שם", fL2:"טלפון", fL3:"החבילה שמעניינת אתכם", fL4:"ההודעה שלכם",
fO0:"עדיין לא בטוח", fO1:"סטארטר", fO2:"אתר תדמית Pro", fO3:"חנות אונליין",
fSend:"שליחה בוואטסאפ",
fNote:"ההודעה נפתחת בוואטסאפ, מוכנה לשליחה. שום דבר לא נשלח לפני שתלחצו על שליחה.",
foot:"© <span class=\"yr\"></span> Idanatid · <span data-name>ישי סיטבון</span>. כל הזכויות שמורות.",
fpr:"מדיניות פרטיות", ftr:"תנאי שימוש", legalAria:"עמודים משפטיים",
top:"חזרה למעלה"
};
const META = {
  fr:{title:" — Sites web et applications pour les entreprises en Israël",desc:"Idanatid crée des landing pages, sites vitrines avec espace admin, boutiques en ligne et applications pour les entreprises en Israël. Prix annoncés d’avance, livraison en 5 à 30 jours ouvrés. Assistant IA et WhatsApp.",wa:"Bonjour, je souhaite un site web et j’aimerais en discuter.",mail:"Projet de site web",langLabel:"Langue",loc:"fr-FR"},
  he:{title:" — בניית אתרים ואפליקציות לעסקים בישראל",desc:"Idanatid בונה דפי נחיתה, אתרי תדמית עם לוח ניהול, חנויות אונליין ואפליקציות לעסקים בישראל. מחירים שנקבעים מראש, אספקה תוך 5-30 ימי עבודה. עוזר AI ווואטסאפ.",wa:"שלום, אני מעוניין באתר אינטרנט ורוצה לשוחח על כך.",mail:"פרויקט אתר אינטרנט",langLabel:"שפה",loc:"he-IL"}
};

Object.assign(HE,{"nav6": "מחשבון", "pHome": "דף הבית", "pAssist": "עוזר AI", "pContact": "יצירת קשר", "fcH1": "האתר", "fcH2": "חבילות", "fcH3": "מידע", "seeDetail": "לפרטים המלאים", "seeMethod": "לתהליך המלא", "seeAll": "לכל החבילות", "hm1H": "שלוש חבילות, מטרה אחת: האתר שלכם באוויר.", "hm1P": "בחרו את החבילה שמתאימה לעסק שלכם. לכל חבילה יש עמוד משלה עם כל הפרטים.", "hm2H": "למה Idanatid", "hm3H": "תהליך פשוט ב-4 שלבים", "hm3P": "משיחה ראשונה ועד העלאה לאוויר.", "ctaH": "מוכנים להתחיל?", "ctaP": "כתבו לנו בוואטסאפ, או שאלו את העוזר על חבילות, מחירים וזמני אספקה.", "goContact": "לעמוד יצירת הקשר", "goAssist": "לשאול את העוזר", "abPH": "אודות", "abPL": "מי עומד מאחורי Idanatid, ואיך אני עובד.", "cmpH": "השוואה מהירה", "cmpC": "מחיר יצירה", "cmpS": "מנוי חודשי", "cmpD": "זמן אספקה", "cmpA": "חבילה", "cmpS1": "150 ₪", "cmpS2": "300 ₪", "cmpS3": "400 ₪ (מינימום)", "cmpD1": "5-7 ימי עבודה", "cmpD2": "10-15 ימי עבודה", "cmpD3": "15-30 ימי עבודה", "estPH": "מחשבון הערכת מחיר", "estPL": "חשבו את מחיר היצירה של חבילת Pro ואת לוח התשלומים.", "estNote": "ההערכה היא לחבילת אתר תדמית Pro ולוח ניהול. למחיר סופי לכל חבילה, כתבו לנו.", "goEst": "להערכת מחיר", "otherH": "חבילות נוספות", "asPH": "עוזר AI", "asPL": "שאלו על חבילות, מחירים, זמני אספקה או יצירת קשר.", "coPH": "יצירת קשר", "oPrice": "מחירים", "tB1x": "לבקש חבילה זו", "cmpP1": "1500 - 2500 ₪", "cmpP2": "3000 - 5000 ₪", "cmpP3": "8000 - 17000+ ₪"});
Object.assign(HE,{"k1h": "תשלום", "k1a": "מקדמה של 50% לפני תחילת העבודה. אחרי שהעבודה התחילה, המקדמה אינה מוחזרת.", "k1b": "יתרה של 50% במסירת האתר (ביום העלאתו לאוויר או מסירת הגישות).", "k1c": "המנוי החודשי מתחיל ביום העלאת האתר ונגבה בתחילת כל חודש.", "k1d": "עמוד נוסף מעבר לחבילה: 500 ₪ לעמוד.", "k2h": "מעבר בין חבילות", "k2a": "במעבר לחבילה גבוהה יותר משלמים רק את ההפרש בין מחיר החבילה החדשה לבין מה ששולם עד כה על הבנייה. המנוי עובר לתעריף החבילה החדשה עם מסירתה.", "k3h": "התכנים שלכם והזמנים", "k3a": "מעבירים טקסטים, לוגו ותמונות באיכות טובה תוך 7 ימים מהחתימה. זמן האספקה נספר מקבלת המקדמה והתכנים. איחור בתכנים דוחה את האספקה בהתאם.", "k3b": "בכל חבילה כלולים 2 סבבי תיקונים על ההדמיה לפני העלאה לאוויר. תיקונים נוספים: 150 ₪ לשעה.", "k3c": "יש לכם 5 ימי עבודה להגיב להדמיה. בלי תגובה, ההדמיה נחשבת מאושרת.", "k3d": "אתם אחראים לכך שהתכנים שהעברתם לא מפרים זכויות של אחרים.", "k4h": "בעלות על האתר", "k4a": "אחרי תשלום מלא של היתרה, האתר, קוד המקור, העיצוב והתכנים שנוצרו עבורכם שייכים לכם ב-100%.", "k4b": "הדומיין נרשם על שמכם. גם חשבונות של שירותים חיצוניים (כמו מסד הנתונים של לוח הניהול) נפתחים על שמכם, ואני מקבל גישה טכנית בלבד.", "k4d": "רכיבים טכניים כלליים שאני משתמש בהם בכל הפרויקטים (קוד בסיס, ספריות וכלים) נשארים שלי, ואתם מקבלים רישיון שימוש קבוע בהם כחלק מהאתר.", "k4c": "אני רשאי להציג את הפרויקט בתיק העבודות שלי ולהוסיף שורת קרדיט דיסקרטית בתחתית האתר. אפשר לבקש להסיר אותה.", "k5h": "מנוי וביטול", "k5a": "המנוי כולל אחסון, אבטחה, גיבויים, תמיכה ושינויים באתר: עד 30 דקות בחודש בחבילת סטארטר, עד שעה בחודש באתר תדמית Pro, ועד שעתיים בחודש בחנות. זמן שלא נוצל לא עובר לחודש הבא. עבודה מעבר לכך: 150 ₪ לשעה.", "k5b": "התחייבות ראשונית ל-6 חודשים מיום העלאת האתר. אחרי 6 חודשים אפשר לבטל מתי שרוצים, בהודעה בכתב 30 יום מראש.", "k5c": "ביטול לפני תום 6 החודשים: משלמים את החודשים שנותרו עד סוף ההתחייבות.", "k5d": "בעזיבה: תוך 14 יום מקבלים בחינם את כל קבצי האתר ואת הגישות לדומיין.", "k5e": "אם תרצו שאני אעביר את האתר בעצמי לספק אחסון חדש (התקנה, חיבור הדומיין והעברת הנתונים של לוח הניהול), זה שירות אופציונלי ב-500 ₪.", "oAll": "בכל חבילה: מותאם לטלפון ולמחשב, עברית ו/או צרפתית, כפתור וואטסאפ, טופס יצירת קשר, הצהרת נגישות ומדיניות פרטיות.", "o1s": "מנוי: 150 ₪ לחודש (אחסון, אבטחה, שינויים ותמיכה) · התחייבות ל-6 חודשים", "o2s": "מנוי: 300 ₪ לחודש (אחסון, אבטחה, שינויים ותמיכה) · התחייבות ל-6 חודשים", "o3s": "מנוי: 400 ₪ לחודש (אחסון, אבטחה, שינויים ותמיכה) · התחייבות ל-6 חודשים", "o1d": "אספקה תוך 5-7 ימי עבודה", "o2d": "אספקה תוך 10-15 ימי עבודה", "o3d": "אספקה תוך 15-30 ימי עבודה", "o1t1a": "1500 ₪ · סטנדרט", "o1t1f1": "עמוד אחד שמציג את העסק בצורה ברורה: כותרת גדולה עם כפתור וואטסאפ, אודות, 3 שירותים מרכזיים ויצירת קשר", "o1t1f2": "טופס פנייה (שם, טלפון, הודעה) שמגיע ישר לוואטסאפ", "o1t1f3": "נראה מעולה בטלפון ובמחשב, מאובטח (https), מוכן לגוגל ונטען מהר", "o1t2a": "2000 ₪ · בינוני", "o1t2f1": "גלריית תמונות של העבודות שלכם, עם הגדלה בלחיצה", "o1t2f2": "המלצות של לקוחות, כדי שלקוחות חדשים יסמכו עליכם", "o1t2c": "כל מה שבסטנדרט, ובנוסף:", "o1t3a": "2500 ₪ · פרימיום", "o1t3f1": "עיצוב מתקדם עם אנימציות שנותנות לאתר מראה יוקרתי", "o1t3f2": "קביעת תור אונליין: הלקוח בוחר יום ושעה מהאתר", "o1t3f3": "הכנה לפרסום: חיבור לפייסבוק ואינסטגרם (Meta) ולגוגל אנליטיקס, כדי לדעת כמה פניות הגיעו מהאתר", "o1t3c": "כל מה שבבינוני, ובנוסף:", "o2t1a": "3000 ₪ · בסיס", "o2t1f1": "אתר של 3–4 עמודים: בית, אודות, שירותים, יצירת קשר", "o2t1f2": "עיצוב אישי לגמרי, לא תבנית", "o2t1f3": "לוח ניהול פרטי עם סיסמה: משנים לבד טקסטים ותמונות, בלי לחכות למתכנת", "o2t1f4": "השינויים נשמרים בצורה מאובטחת", "o2t2a": "3800 ₪ · סטנדרט", "o2t2f1": "5 עמודים: בית, שירותים או קטלוג, אודות, המלצות, יצירת קשר", "o2t2f2": "קטלוג שאתם מנהלים לבד: מוסיפים, עורכים ומוחקים נכסים, מוצרים או שירותים", "o2t2f3": "גלריה, מפה של העסק ומספרים מונפשים", "o2t2c": "כל מה שבבסיס, ובנוסף:", "o2t3a": "5000 ₪ · מתקדם", "o2t3f1": "6 עמודים ומעלה", "o2t3f2": "חיפוש וסינון מתקדם (לפי מחיר, קטגוריה, אזור ועוד)", "o2t3f3": "חתימה אלקטרונית על מסמכים: הלקוח חותם באצבע בטלפון, ונשמרים תאריך, שעה וכתובת IP, עם מסמך סיכום", "o2t3c": "כל מה שבסטנדרט, ובנוסף:", "o3t1a": "8000 ₪ · חנות", "o3t1f1": "חנות עם עד 20 מוצרים", "o3t1f2": "סל קניות שמחשב את הסכום בזמן אמת", "o3t1f3": "תשלום פשוט בשני שלבים, עם סליקה מאובטחת (Tranzila, CreditGuard, Hyp, Stripe)", "o3t1f4": "לוח ניהול למלאי ולהזמנות", "o3t2a": "15000 ₪ · חנות מתקדמת", "o3t2f1": "עד 100 מוצרים, עם מידות, צבעים וגדלים", "o3t2f2": "אזור אישי ללקוחות: הרשמה, כניסה והיסטוריית הזמנות", "o3t2f3": "תזכורת אוטומטית ללקוחות שהשאירו מוצרים בסל", "o3t2c": "כל מה שבחנות, ובנוסף:", "o3t3a": "17000+ ₪ · מערכת בהתאמה אישית", "o3t3f1": "יותר מ-100 מוצרים, או מערכת שנבנית במיוחד בשבילכם", "o3t3f2": "משתמשים עם הרשאות שונות (מנהל, סוכן, לקוח)", "o3t3f3": "חתימות אלקטרוניות של כמה צדדים", "o3t3f4": "חשבוניות PDF ומיילים אוטומטיים", "o3t3f5": "חיבור למערכות שלכם (ERP, CRM, משלוחים)", "o3t3c": "כל מה שבחנות המתקדמת, ובנוסף:", "cmpP1": "1500–2500 ₪", "cmpP2": "3000–5000 ₪", "cmpP3": "8000–17000+ ₪", "cmpS3": "400 ₪", "ctaP": "כתבו לי בוואטסאפ, או שאלו את העוזר על חבילות, מחירים וזמני אספקה.", "estNote": "ההערכה היא לחבילת אתר תדמית Pro ולוח ניהול. למחיר סופי לכל חבילה, כתבו לי.", "s1p": "אני מגדיר איתכם את הצורך, את החבילה המתאימה ואת המחיר. אתם משלמים מקדמה של 50% כדי להתחיל.", "s3p": "אני מציג לכם את האב-טיפוס. יש לכם 5 ימי עבודה להגיב, ובכל חבילה כלולים 2 סבבי תיקונים.", "lead": "Idanatid בונה דפי נחיתה, אתרי תדמית עם לוח ניהול, חנויות אונליין ואפליקציות. שאלו את העוזר החכם כאן למטה, או כתבו לי ישירות בוואטסאפ.", "o2i3": "עמוד נוסף: 500 ₪ לעמוד מעבר לחבילה"});
Object.assign(HE,{"fax": "הצהרת נגישות", "ckT": "האתר משתמש בעוגיות ובאחסון מקומי כדי לזכור את השפה וההעדפות שלכם.", "ckB": "הבנתי", "ckL": "מדיניות פרטיות"});
/*p5*/const TX={"en": {"formAria": "Contact form", "legalAria": "Legal pages", "skip": "Skip to content", "pHome": "Home", "nav1": "About", "nav2": "Offers &amp; pricing", "nav6": "Estimator", "nav3": "Process", "nav4": "Terms", "pAssist": "AI assistant", "nav5": "Contact me", "menu": "Menu", "abPH": "About", "abPL": "Who is behind Idanatid, and how I work.", "abH": "I’m <span data-name>Ichay Sitbon</span>, a web creator.", "ab1": "I build websites for freelancers, small and mid-sized businesses and agencies that want a clear, fast and professional online presence. I handle everything: design, development, launch and follow-up.", "ab2": "My approach: a site that is simple for your visitors to understand and simple for you to manage. When your business needs it, I add real business tools, such as an admin area to manage your properties or products, or electronic signature of your mandates, and more.", "v1a": "Tailor-made", "v1b": "No recycled template: the site follows your business.", "v2a": "Transparent", "v2b": "Prices, deadlines and what is included are set before we start.", "v3a": "Ongoing support", "v3b": "Hosting, backups and monthly changes.", "ctaH": "Ready to start?", "ctaP": "Write to me on WhatsApp, or ask the assistant about offers, prices and deadlines.", "tB1": "Chat on WhatsApp", "goContact": "Go to the Contact page", "goAssist": "Ask the assistant", "fcH1": "The site", "pContact": "Contact", "fcH2": "Offers", "o1h": "Starter", "o2h": "Pro Showcase", "o3h": "E-commerce", "fcH3": "Information", "fpr": "Privacy", "ftr": "Terms of use", "fax": "Accessibility statement", "foot": "© <span class=\"yr\"></span> Idanatid · <span data-name>Ichay Sitbon</span>. All rights reserved.", "aria:navAria": "Main navigation", "asPH": "AI assistant", "asPL": "Ask about offers, prices, deadlines or how to get in touch.", "kH": "The terms, with no fine print.", "kP": "Here is the essence of what you sign. The full detail is in the quote.", "k1h": "Payment", "k1a": "50% deposit before work begins. Once work has started, the deposit is not refundable.", "k1b": "50% balance on delivery of the site (the day it goes live or when access is handed over).", "k1c": "The monthly subscription starts the day the site goes live and is charged at the beginning of each month.", "k1d": "Extra page beyond the offer: 500 ₪ per page.", "k2h": "Switching offers", "k2a": "If you move up to a higher offer, you only pay the difference between the price of the new offer and what you have already paid for the build. The subscription moves to the new offer’s rate on delivery.", "k3h": "Your content and timelines", "k3a": "You give me good-quality text, logo and photos within 7 days of signing. The delivery time starts when I receive the deposit and the content. Late content pushes delivery back by the same amount.", "k3b": "Every offer includes 2 rounds of corrections on the mockup before launch. Extra corrections: 150 ₪ per hour.", "k3c": "You have 5 working days to respond to the mockup. With no reply, the mockup is considered approved.", "k3d": "You are responsible for making sure the content you provide does not infringe third-party rights.", "k4h": "Ownership of the site", "k4a": "After the balance is paid in full, the site, the source code, the design and the content created for you belong to you 100%.", "k4b": "The domain name is registered in your name. Accounts with external services (such as the admin dashboard’s database) are also opened in your name, and I only have technical access.", "k4d": "The general technical components I use in all my projects (base code, libraries and tools) remain mine, and you receive a permanent license to use them as part of the site.", "k4c": "I may show the project in my portfolio and add a discreet credit line at the bottom of the site. You can ask me to remove it.", "k5h": "Subscription and cancellation", "k5a": "The subscription includes hosting, security, backups, support and changes to the site: up to 30 minutes per month on Starter, up to 1 hour per month for a Pro showcase site, and up to 2 hours per month for a store. Unused time does not carry over to the following month. Beyond that: 150 ₪ per hour.", "k5b": "Initial commitment of 6 months from the day the site goes live. After 6 months, you can cancel at any time, in writing, with 30 days’ notice.", "k5c": "Cancelling before the end of the 6 months: you pay the remaining months until the end of the commitment.", "k5d": "If you leave: within 14 days you receive all the site files and the domain access free of charge.", "k5e": "If you want me to move the site to a new host myself (installation, connecting the domain and transferring the admin dashboard data), that is an optional service at 500 ₪.", "k6h": "Electronic signature", "k6a": "The module records the signature image, the IP address and the timestamp. It is up to you to check that the clauses of your mandates comply with the local law in force.", "coPH": "Contact", "tP": "Tell me about your business and what you expect from your site. I will reply with the right plan and a price.", "tB2": "Send an email", "fL1": "Name", "fL2": "Phone", "fL3": "Offer you are interested in", "fO0": "I don’t know yet", "fO1": "Starter", "fO2": "Pro Showcase", "fO3": "E-commerce", "fL4": "Your message", "fSend": "Send via WhatsApp", "fNote": "The message opens in WhatsApp, ready to send. Nothing is sent until you press send.", "estPH": "Price estimator", "estPL": "Calculate the build price of the Pro Showcase offer and your payment plan.", "cH": "Estimate your Pro Showcase project", "cL1": "Plan", "cO1": "Showcase base, 3000 ₪", "cO2": "Standard, 3800 ₪", "cO3": "Advanced, 5000 ₪", "cL2": "Extra pages (500 ₪ each)", "r1": "Plan", "r2": "Extra pages", "r3": "Build", "r4": "Deposit at start (50%)", "r5": "Balance at launch", "r6": "Monthly subscription", "estNote": "The estimate covers the Pro Showcase &amp; Admin Dashboard offer. For a firm price on another offer, write to me.", "tB1x": "Request this offer", "seeDetail": "See details", "pH": "How it works.", "pP": "A simple sequence, with dates and a sign-off at each step.", "s1h": "Scoping and quote", "s1p": "Together we define your need, the right offer and the price. You pay a 50% deposit to start.", "s2h": "Content", "s2p": "You send me text, logo and visuals within 7 days. I can help you write them depending on the plan.", "s3h": "Mockup and feedback", "s3p": "I present the prototype. You have 5 working days to respond, with 2 rounds of corrections included in every offer.", "s4h": "Launch", "s4p": "You pay the balance, I publish the site and hand over your access. The subscription starts that day.", "o3m": "Online stores, interactive catalogs and business platforms.", "o3s": "Subscription: 400 ₪ per month (hosting, security, changes and support) · 6-month commitment", "o3d": "Delivery in 15 to 30 working days", "oAll": "In every offer: works on phone and computer, Hebrew and/or French, WhatsApp button, contact form, accessibility statement and privacy policy.", "o3t1a": "8000 ₪ · Store", "o3t1f1": "Store with up to 20 products", "o3t1f2": "Shopping cart that calculates the total in real time", "o3t1f3": "Simple two-step checkout, with secure payment processing (Tranzila, CreditGuard, Hyp, Stripe)", "o3t1f4": "Admin dashboard for stock and orders", "o3t2a": "15000 ₪ · Advanced store", "o3t2c": "The whole Store, plus:", "o3t2f1": "Up to 100 products, with sizes, colors and formats", "o3t2f2": "Customer area: sign-up, login and order history", "o3t2f3": "Automatic reminder to customers who left products in their cart", "o3t3a": "17000+ ₪ · Custom system", "o3t3c": "The whole Advanced store, plus:", "o3t3f1": "More than 100 products, or a system built specially for you", "o3t3f2": "Users with different rights (administrator, agent, customer)", "o3t3f3": "Electronic signatures from several parties", "o3t3f4": "PDF invoices and automatic emails", "o3t3f5": "Connection to your systems (ERP, CRM, deliveries)", "o3b": "Request the E-commerce offer", "otherH": "Other offers", "o1m": "Conversion landing page, for freelancers, craftspeople, events and professional practices.", "o2m": "For small and mid-sized businesses, real-estate agencies, doctors, hairdressers, offices and demanding service providers.", "o1s": "Subscription: 150 ₪ per month (hosting, security, changes and support) · 6-month commitment", "o1d": "Delivery in 5 to 7 working days", "o1t1a": "1500 ₪ · Standard", "o1t1f1": "A single page that clearly presents your business: big headline with WhatsApp button, about, 3 main services and contact", "o1t1f2": "Contact form (name, phone, message) that goes straight to WhatsApp", "o1t1f3": "Looks great on phone and computer, secure (https), Google-ready and fast to load", "o1t2a": "2000 ₪ · Intermediate", "o1t2c": "Everything in Standard, plus:", "o1t2f1": "Photo gallery of your work, with click-to-enlarge", "o1t2f2": "Customer reviews, so new customers trust you", "o1t3a": "2500 ₪ · Premium", "o1t3c": "Everything in Intermediate, plus:", "o1t3f1": "Advanced design with animations that give the site a high-end look", "o1t3f2": "Online booking: the customer picks a day and time from the site", "o1t3f3": "Advertising setup: connection to Facebook and Instagram (Meta) and Google Analytics, to know how many inquiries come from the site", "o1b": "Request the Starter", "tag": "The flagship offer", "o2s": "Subscription: 300 ₪ per month (hosting, security, changes and support) · 6-month commitment", "o2d": "Delivery in 10 to 15 working days", "o2t1a": "3000 ₪ · Base", "o2t1f1": "Site of 3 to 4 pages: home, about, services, contact", "o2t1f2": "Fully custom design, not a template", "o2t1f3": "Private password-protected admin dashboard: you edit text and images yourself, without waiting for a developer", "o2t1f4": "Changes are saved securely", "o2t2a": "3800 ₪ · Standard", "o2t2c": "Everything in Base, plus:", "o2t2f1": "5 pages: home, services or catalog, about, reviews, contact", "o2t2f2": "A catalog you manage yourself: you add, edit and delete properties, products or services", "o2t2f3": "Gallery, a map of your business and animated figures", "o2t3a": "5000 ₪ · Advanced", "o2t3c": "Everything in Standard, plus:", "o2t3f1": "6 pages and more", "o2t3f2": "Advanced search and filters (by price, category, area, etc.)", "o2t3f3": "Electronic signature of documents: the customer signs with a finger on their phone, the date, time and IP address are recorded, with a summary document", "o2i3": "Extra page: 500 ₪ per page beyond the package", "o2b": "Request the Pro Showcase", "goEst": "Estimate my project", "ofH": "Three offers, clear prices.", "ofP": "Every offer includes building the site (one-time payment) and a monthly subscription for hosting, security and your changes. All prices are in shekels (ILS).", "cmpA": "Offer", "cmpC": "Build price", "cmpP1": "1500–2500 ₪", "cmpP2": "3000–5000 ₪", "cmpP3": "8000–17000+ ₪", "cmpS": "Monthly subscription", "cmpS1": "150 ₪", "cmpS2": "300 ₪", "cmpS3": "400 ₪", "cmpD": "Delivery", "cmpD1": "5 to 7 working days", "cmpD2": "10 to 15 working days", "cmpD3": "15 to 30 working days", "minus": "Remove a page", "plus": "Add a page", "top": "Back to top", "seeAll": "All offers", "seeMethod": "See the full process", "navAria": "Main navigation", "hm1H": "Three offers, one goal: your site live.", "hm1P": "Choose the offer that fits your business. Each offer has its own page with all the details.", "hm2H": "Why Idanatid", "hm3H": "A simple process in 4 steps", "hm3P": "From the first conversation to launch.", "cmpH": "Quick comparison", "oPrice": "Prices", "tH": "Let’s talk about your project."}, "ru": {"formAria": "Форма обратной связи", "legalAria": "Юридические страницы", "skip": "Перейти к содержимому", "pHome": "Главная", "nav1": "О нас", "nav2": "Предложения и цены", "nav6": "Калькулятор", "nav3": "Этапы работы", "nav4": "Условия", "pAssist": "ИИ-помощник", "nav5": "Связаться", "menu": "Меню", "abPH": "О нас", "abPL": "Кто стоит за Idanatid и как я работаю.", "abH": "Я <span data-name>Ичай Ситбон</span>, веб-разработчик.", "ab1": "Я создаю сайты для фрилансеров, малого и среднего бизнеса и агентств, которым нужно понятное, быстрое и профессиональное присутствие в сети. Я беру на себя всё: дизайн, разработку, запуск и сопровождение.", "ab2": "Мой подход: сайт, который просто понять посетителям и просто вести вам. Когда бизнесу это нужно, я добавляю настоящие рабочие инструменты, например панель управления объектами или товарами, электронную подпись ваших договоров и многое другое.", "v1a": "Под вас", "v1b": "Никаких готовых шаблонов: сайт строится вокруг вашего дела.", "v2a": "Прозрачно", "v2b": "Цены, сроки и состав работ фиксируются до начала.", "v3a": "Поддержка", "v3b": "Хостинг, резервные копии и ежемесячные правки.", "ctaH": "Готовы начать?", "ctaP": "Напишите мне в WhatsApp или спросите помощника о предложениях, ценах и сроках.", "tB1": "Написать в WhatsApp", "goContact": "Перейти на страницу контактов", "goAssist": "Спросить помощника", "fcH1": "Сайт", "pContact": "Контакты", "fcH2": "Предложения", "o1h": "Стартер", "o2h": "Витрина Pro", "o3h": "Интернет-магазин", "fcH3": "Информация", "fpr": "Конфиденциальность", "ftr": "Условия использования", "fax": "Заявление о доступности", "foot": "© <span class=\"yr\"></span> Idanatid · <span data-name>Ичай Ситбон</span>. Все права защищены.", "aria:navAria": "Главная навигация", "asPH": "ИИ-помощник", "asPL": "Спросите о предложениях, ценах, сроках или о том, как связаться.", "kH": "Условия без мелкого шрифта.", "kP": "Здесь главное из того, что вы подписываете. Полные условия указаны в коммерческом предложении.", "k1h": "Оплата", "k1a": "Предоплата 50% до начала работ. После начала работ предоплата не возвращается.", "k1b": "Остаток 50% при сдаче сайта (в день запуска или передачи доступов).", "k1c": "Ежемесячная подписка начинается в день запуска сайта и списывается в начале каждого месяца.", "k1d": "Дополнительная страница сверх предложения: 500 ₪ за страницу.", "k2h": "Переход на другое предложение", "k2a": "Если вы переходите на более высокое предложение, вы платите только разницу между ценой нового предложения и уже оплаченным за разработку. Подписка переходит на тариф нового предложения при сдаче.", "k3h": "Ваши материалы и сроки", "k3a": "Вы передаёте мне качественные тексты, логотип и фотографии в течение 7 дней после подписания. Срок сдачи отсчитывается с получения предоплаты и материалов. Задержка материалов сдвигает сдачу на столько же.", "k3b": "Каждое предложение включает 2 круга правок макета до запуска. Дополнительные правки: 150 ₪ в час.", "k3c": "У вас есть 5 рабочих дней, чтобы ответить по макету. Если ответа нет, макет считается утверждённым.", "k3d": "Вы отвечаете за то, чтобы переданные вами материалы не нарушали права третьих лиц.", "k4h": "Права на сайт", "k4a": "После полной оплаты остатка сайт, исходный код, дизайн и созданные для вас материалы принадлежат вам на 100%.", "k4b": "Доменное имя регистрируется на вас. Аккаунты во внешних сервисах (например, база данных панели управления) тоже открываются на ваше имя, а у меня только технический доступ.", "k4d": "Общие технические компоненты, которые я использую во всех проектах (базовый код, библиотеки и инструменты), остаются моими, а вы получаете бессрочную лицензию на их использование в рамках сайта.", "k4c": "Я могу показывать проект в своём портфолио и добавить скромную строку с указанием авторства внизу сайта. Вы можете попросить меня её убрать.", "k5h": "Подписка и расторжение", "k5a": "Подписка включает хостинг, безопасность, резервные копии, поддержку и правки сайта: до 30 минут в месяц на Стартере, до 1 часа в месяц для сайта Pro и до 2 часов в месяц для магазина. Неиспользованное время на следующий месяц не переносится. Сверх этого: 150 ₪ в час.", "k5b": "Первоначальное обязательство на 6 месяцев с дня запуска сайта. После 6 месяцев вы можете отказаться в любой момент письменно, за 30 дней.", "k5c": "Отказ до окончания 6 месяцев: вы оплачиваете оставшиеся месяцы до конца обязательства.", "k5d": "Если вы уходите: в течение 14 дней вы бесплатно получаете все файлы сайта и доступ к домену.", "k5e": "Если вы хотите, чтобы я сам перенёс сайт к новому хостинг-провайдеру (установка, подключение домена и перенос данных панели управления), это дополнительная услуга за 500 ₪.", "k6h": "Электронная подпись", "k6a": "Модуль сохраняет изображение подписи, IP-адрес и отметку времени. Вам нужно самим проверить, что пункты ваших договоров соответствуют действующему местному законодательству.", "coPH": "Контакты", "tP": "Расскажите о вашем деле и о том, чего вы ждёте от сайта. Я отвечу с подходящим предложением и ценой.", "tB2": "Написать по почте", "fL1": "Имя", "fL2": "Телефон", "fL3": "Интересующее предложение", "fO0": "Пока не знаю", "fO1": "Стартер", "fO2": "Витрина Pro", "fO3": "Интернет-магазин", "fL4": "Ваше сообщение", "fSend": "Отправить в WhatsApp", "fNote": "Сообщение откроется в WhatsApp, готовое к отправке. Ничего не уходит, пока вы не нажмёте «отправить».", "estPH": "Калькулятор цены", "estPL": "Рассчитайте стоимость разработки предложения «Витрина Pro» и график оплаты.", "cH": "Оцените ваш проект «Витрина Pro»", "cL1": "Пакет", "cO1": "Базовая витрина, 3000 ₪", "cO2": "Стандарт, 3800 ₪", "cO3": "Расширенный, 5000 ₪", "cL2": "Дополнительные страницы (500 ₪ за каждую)", "r1": "Пакет", "r2": "Дополнительные страницы", "r3": "Разработка", "r4": "Предоплата в начале (50%)", "r5": "Остаток при запуске", "r6": "Ежемесячная подписка", "estNote": "Расчёт относится к предложению «Витрина Pro и панель управления». Точную цену по другому предложению уточняйте у меня.", "tB1x": "Заказать это предложение", "seeDetail": "Подробнее", "pH": "Как это работает.", "pP": "Простая последовательность, с датами и согласованием на каждом этапе.", "s1h": "Постановка задачи и смета", "s1p": "Вместе определяем вашу задачу, подходящее предложение и цену. Вы вносите предоплату 50%, и мы начинаем.", "s2h": "Материалы", "s2p": "Вы присылаете мне тексты, логотип и изображения в течение 7 дней. Могу помочь с написанием, в зависимости от пакета.", "s3h": "Макет и правки", "s3p": "Я показываю прототип. У вас 5 рабочих дней на ответ, два круга правок входят в каждое предложение.", "s4h": "Запуск", "s4p": "Вы оплачиваете остаток, я публикую сайт и передаю вам доступы. В тот же день начинается подписка.", "o3m": "Интернет-магазины, интерактивные каталоги и бизнес-платформы.", "o3s": "Подписка: 400 ₪ в месяц (хостинг, безопасность, правки и поддержка) · обязательство на 6 месяцев", "o3d": "Сдача за 15–30 рабочих дней", "oAll": "В каждом предложении: работает на телефоне и компьютере, иврит и/или французский, кнопка WhatsApp, форма обратной связи, заявление о доступности и политика конфиденциальности.", "o3t1a": "8000 ₪ · Магазин", "o3t1f1": "Магазин до 20 товаров", "o3t1f2": "Корзина, считающая итог в реальном времени", "o3t1f3": "Простое оформление заказа в два шага с безопасной оплатой (Tranzila, CreditGuard, Hyp, Stripe)", "o3t1f4": "Панель управления складом и заказами", "o3t2a": "15000 ₪ · Расширенный магазин", "o3t2c": "Весь пакет «Магазин», плюс:", "o3t2f1": "До 100 товаров, с размерами, цветами и форматами", "o3t2f2": "Личный кабинет: регистрация, вход и история заказов", "o3t2f3": "Автоматическое напоминание клиентам, оставившим товары в корзине", "o3t3a": "17000+ ₪ · Индивидуальная система", "o3t3c": "Весь пакет «Расширенный магазин», плюс:", "o3t3f1": "Более 100 товаров или система, созданная специально для вас", "o3t3f2": "Пользователи с разными правами (администратор, агент, клиент)", "o3t3f3": "Электронные подписи нескольких сторон", "o3t3f4": "Счета в PDF и автоматические письма", "o3t3f5": "Подключение к вашим системам (ERP, CRM, доставка)", "o3b": "Заказать предложение «Интернет-магазин»", "otherH": "Другие предложения", "o1m": "Посадочная страница для фрилансеров, мастеров, мероприятий и частных практик.", "o2m": "Для малого и среднего бизнеса, агентств недвижимости, врачей, парикмахеров, офисов и требовательных специалистов.", "o1s": "Подписка: 150 ₪ в месяц (хостинг, безопасность, правки и поддержка) · обязательство на 6 месяцев", "o1d": "Сдача за 5–7 рабочих дней", "o1t1a": "1500 ₪ · Стандарт", "o1t1f1": "Одна страница, чётко представляющая ваше дело: крупный заголовок с кнопкой WhatsApp, о вас, 3 основные услуги и контакты", "o1t1f2": "Форма обратной связи (имя, телефон, сообщение), которая сразу отправляется в WhatsApp", "o1t1f3": "Отлично выглядит на телефоне и компьютере, защищённое соединение (https), готов к Google и быстро загружается", "o1t2a": "2000 ₪ · Средний", "o1t2c": "Всё из «Стандарта», плюс:", "o1t2f1": "Фотогалерея ваших работ с увеличением по клику", "o1t2f2": "Отзывы клиентов, чтобы новые клиенты вам доверяли", "o1t3a": "2500 ₪ · Премиум", "o1t3c": "Всё из «Среднего», плюс:", "o1t3f1": "Продвинутый дизайн с анимацией, придающей сайту премиальный вид", "o1t3f2": "Онлайн-запись: клиент выбирает день и время прямо на сайте", "o1t3f3": "Настройка рекламы: подключение Facebook и Instagram (Meta) и Google Analytics, чтобы знать, сколько обращений приходит с сайта", "o1b": "Заказать «Стартер»", "tag": "Главное предложение", "o2s": "Подписка: 300 ₪ в месяц (хостинг, безопасность, правки и поддержка) · обязательство на 6 месяцев", "o2d": "Сдача за 10–15 рабочих дней", "o2t1a": "3000 ₪ · Базовый", "o2t1f1": "Сайт из 3–4 страниц: главная, о нас, услуги, контакты", "o2t1f2": "Полностью индивидуальный дизайн, не шаблон", "o2t1f3": "Закрытая панель управления с паролем: вы сами меняете тексты и изображения, не дожидаясь разработчика", "o2t1f4": "Изменения сохраняются безопасно", "o2t2a": "3800 ₪ · Стандарт", "o2t2c": "Всё из «Базового», плюс:", "o2t2f1": "5 страниц: главная, услуги или каталог, о нас, отзывы, контакты", "o2t2f2": "Каталог, которым вы управляете сами: добавляете, меняете и удаляете объекты, товары или услуги", "o2t2f3": "Галерея, карта вашего бизнеса и анимированные цифры", "o2t3a": "5000 ₪ · Расширенный", "o2t3c": "Всё из «Стандарта», плюс:", "o2t3f1": "6 страниц и больше", "o2t3f2": "Расширенный поиск и фильтры (по цене, категории, району и т. д.)", "o2t3f3": "Электронная подпись документов: клиент расписывается пальцем на телефоне, дата, время и IP-адрес фиксируются, формируется итоговый документ", "o2i3": "Дополнительная страница: 500 ₪ за страницу сверх пакета", "o2b": "Заказать «Витрину Pro»", "goEst": "Оценить мой проект", "ofH": "Три предложения, понятные цены.", "ofP": "Каждое предложение включает создание сайта (разовый платёж) и ежемесячную подписку на хостинг, безопасность и ваши правки. Все цены в шекелях (ILS).", "cmpA": "Предложение", "cmpC": "Цена разработки", "cmpP1": "1500–2500 ₪", "cmpP2": "3000–5000 ₪", "cmpP3": "8000–17000+ ₪", "cmpS": "Ежемесячная подписка", "cmpS1": "150 ₪", "cmpS2": "300 ₪", "cmpS3": "400 ₪", "cmpD": "Срок сдачи", "cmpD1": "5–7 рабочих дней", "cmpD2": "10–15 рабочих дней", "cmpD3": "15–30 рабочих дней", "minus": "Убрать страницу", "plus": "Добавить страницу", "top": "Наверх", "seeAll": "Все предложения", "seeMethod": "Весь процесс", "navAria": "Главная навигация", "hm1H": "Три предложения, одна цель: ваш сайт в сети.", "hm1P": "Выберите предложение, подходящее вашему делу. У каждого своя страница со всеми подробностями.", "hm2H": "Почему Idanatid", "hm3H": "Простой процесс в 4 шага", "hm3P": "От первого разговора до запуска.", "cmpH": "Быстрое сравнение", "oPrice": "Цены", "tH": "Давайте обсудим ваш проект."}};
const CHAT_X={"en": {"btn": "AI assistant", "title": "Idanatid AI", "sub": "Ask me anything", "close": "Close", "send": "Send", "ph": "Type your question…", "note": "Demo mode: the full assistant will be connected soon.", "priv": "Do not enter sensitive information. Sending a message means you accept the <a href=\"privacy.html\">privacy policy</a>.", "hello": "Hello! I’m the Idanatid assistant. You can ask me about prices, offers, deadlines, how to get in touch, or where to find anything on the site.", "chips": ["What are the prices?", "What does the Pro offer include?", "What are the delivery times?", "How do I contact you?"], "wait": "…", "err": "Sorry, something went wrong. Write to me on WhatsApp.", "wa": "Open WhatsApp", "fallback": "I can’t answer right now. For a precise answer, the simplest is to write directly on WhatsApp: 058-788-4418."}, "ru": {"btn": "ИИ-помощник", "title": "Idanatid AI", "sub": "Задайте любой вопрос", "close": "Закрыть", "send": "Отправить", "ph": "Напишите свой вопрос…", "note": "Демо-режим: полный помощник будет подключён в ближайшее время.", "priv": "Не вводите конфиденциальные данные. Отправляя сообщение, вы принимаете <a href=\"privacy.html\">политику конфиденциальности</a>.", "hello": "Здравствуйте! Я помощник Idanatid. Спросите меня о ценах, предложениях, сроках, контактах или о том, где что найти на сайте.", "chips": ["Какие цены?", "Что входит в предложение Pro?", "Какие сроки?", "Как с вами связаться?"], "wait": "…", "err": "Извините, произошла ошибка. Напишите мне в WhatsApp.", "wa": "Открыть WhatsApp", "fallback": "Сейчас я не могу ответить. Для точного ответа проще всего написать в WhatsApp: 058-788-4418."}};
const META_X={"en": {"title": " — Websites and apps for businesses in Israel", "desc": "Idanatid builds landing pages, showcase sites with an admin dashboard, online stores and apps for businesses in Israel. Prices set in advance, delivery in 5 to 30 working days. AI assistant and WhatsApp.", "wa": "Hello, I would like a website and would like to talk about it.", "mail": "Website project", "langLabel": "Language", "loc": "en-US", "name": "Ichay Sitbon", "nameDir": "ltr"}, "ru": {"title": " — Сайты и приложения для бизнеса в Израиле", "desc": "Idanatid создаёт посадочные страницы, сайты-витрины с панелью управления, интернет-магазины и приложения для бизнеса в Израиле. Цены известны заранее, сдача за 5–30 рабочих дней. ИИ-помощник и WhatsApp.", "wa": "Здравствуйте, мне нужен сайт, и я хотел бы это обсудить.", "mail": "Проект сайта", "langLabel": "Язык", "loc": "ru-RU", "name": "Ичай Ситбон", "nameDir": "ltr"}};
window.PT={"en": {"index": "Websites and apps for businesses in Israel", "a-propos": "About", "offres": "Offers and pricing", "offre-starter": "Starter", "offre-vitrine-pro": "Pro Showcase and Admin Dashboard", "offre-ecommerce": "E-commerce and custom", "estimateur": "Price estimator", "methode": "Process", "conditions": "Terms", "contact": "Contact", "assistant": "AI assistant", "privacy": "Privacy policy", "terms": "Terms of use", "accessibility": "Accessibility statement"}, "ru": {"index": "Сайты и приложения для бизнеса в Израиле", "a-propos": "О нас", "offres": "Предложения и цены", "offre-starter": "Стартер", "offre-vitrine-pro": "Витрина Pro и панель управления", "offre-ecommerce": "Магазин и индивидуальная разработка", "estimateur": "Калькулятор цены", "methode": "Этапы работы", "conditions": "Условия", "contact": "Контакты", "assistant": "ИИ-помощник", "privacy": "Политика конфиденциальности", "terms": "Условия использования", "accessibility": "Заявление о доступности"}};
const KB_X=[{"k2": "price|prices|pricing|cost|how much|цен|стоим|сколько|тариф", "en": "Three offers:\n• Starter: 1500 to 2500 ₪, then 150 ₪ per month\n• Pro Showcase & Admin Dashboard: 3000 to 5000 ₪, then 300 ₪ per month\n• E-commerce & custom: 8000 to 17000+ ₪, then 400 ₪ per month\nEach extra page: 500 ₪.", "ru": "Три предложения:\n• Стартер: от 1500 до 2500 ₪, затем 150 ₪ в месяц\n• Витрина Pro и панель управления: от 3000 до 5000 ₪, затем 300 ₪ в месяц\n• Интернет-магазин и индивидуальная разработка: от 8000 до 17000+ ₪, затем 400 ₪ в месяц\nКаждая дополнительная страница: 500 ₪."}, {"k2": "starter|landing|стартер|посадочн", "en": "The Starter is a landing page. 1500 ₪: one clear page (headline with WhatsApp button, about, 3 services, contact). 2000 ₪: adds a photo gallery and customer reviews. 2500 ₪: adds advanced design, online booking and Meta / Google Analytics setup. Delivery in 5 to 7 working days.", "ru": "Стартер это посадочная страница. 1500 ₪: одна понятная страница (заголовок с кнопкой WhatsApp, о вас, 3 услуги, контакты). 2000 ₪: плюс фотогалерея и отзывы клиентов. 2500 ₪: плюс продвинутый дизайн, онлайн-запись и настройка Meta / Google Analytics. Сдача за 5–7 рабочих дней."}, {"k2": "\\bpro\\b|showcase|dashboard|admin|витрин|панел|админ", "en": "Pro Showcase & Admin Dashboard. Every tier includes a private admin dashboard (email and password login) so you can edit text and images yourself.\n• 3000 ₪: 3 to 4 pages, custom design\n• 3800 ₪: 5 pages, a catalog you manage yourself, gallery and map\n• 5000 ₪: 6 pages and more, advanced filters, touch electronic signature\nDelivery in 10 to 15 working days.", "ru": "Витрина Pro и панель управления. Каждый пакет включает закрытую панель управления (вход по почте и паролю), чтобы вы сами меняли тексты и изображения.\n• 3000 ₪: 3–4 страницы, индивидуальный дизайн\n• 3800 ₪: 5 страниц, каталог под вашим управлением, галерея и карта\n• 5000 ₪: 6 страниц и больше, расширенные фильтры, электронная подпись пальцем\nСдача за 10–15 рабочих дней."}, {"k2": "e-?commerce|store|shop|cart|магазин|корзин|интернет", "en": "E-commerce & custom.\n• 8000 ₪: up to 20 products, live cart, two-step checkout, secure payment (Tranzila, CreditGuard, Hyp, Stripe), stock admin\n• 15000 ₪: up to 100 products, variants, customer area, reminders for abandoned carts\n• 17000 ₪+: more than 100 products or a custom system, user roles, multi-party signatures, PDF invoices, connections to your systems\nDelivery in 15 to 30 working days.", "ru": "Интернет-магазин и индивидуальная разработка.\n• 8000 ₪: до 20 товаров, корзина, оформление в два шага, безопасная оплата (Tranzila, CreditGuard, Hyp, Stripe), управление складом\n• 15000 ₪: до 100 товаров, варианты, личный кабинет, напоминания о брошенных корзинах\n• 17000 ₪+: больше 100 товаров или индивидуальная система, роли пользователей, подписи нескольких сторон, счета в PDF, подключение к вашим системам\nСдача за 15–30 рабочих дней."}, {"k2": "signature|sign\\b|подпис", "en": "Touch electronic signature is included from 5000 ₪ in the Pro Showcase offer: the customer signs by hand on a tablet, phone or mouse, and the date, time and IP address are recorded with a summary document.", "ru": "Электронная подпись пальцем входит в предложение «Витрина Pro» начиная с 5000 ₪: клиент расписывается на планшете, телефоне или мышью, а дата, время и IP-адрес фиксируются в итоговом документе."}, {"k2": "deadline|delivery|how long|when|time|срок|сдач|когда|сколько времени|дней", "en": "Delivery times: Starter 5 to 7 working days, Pro Showcase 10 to 15 days, E-commerce 15 to 30 days. You send your text and visuals within 7 days of signing.", "ru": "Сроки сдачи: Стартер 5–7 рабочих дней, Витрина Pro 10–15 дней, магазин 15–30 дней. Тексты и изображения вы присылаете в течение 7 дней после подписания."}, {"k2": "deposit|payment|pay\\b|upgrade|difference|ownership|source code|предоплат|оплат|платить|разниц|принадлеж|исходн", "en": "Payment: 50% deposit at the start (not refundable once work has begun) and 50% on delivery. If you switch offers, you only pay the difference with what you have already paid. After the balance is paid, the site, the code and the design are 100% yours. If you leave, you receive all the files and the domain access free of charge within 14 days.", "ru": "Оплата: предоплата 50% в начале (не возвращается после начала работ) и 50% при сдаче. При переходе на другое предложение вы платите только разницу с уже внесённым. После оплаты остатка сайт, код и дизайн принадлежат вам на 100%. Если вы уходите, в течение 14 дней вы бесплатно получаете все файлы и доступ к домену."}, {"k2": "subscription|monthly|cancel|commitment|changes|hour|подписк|ежемесяч|отказ|расторж|обязательств|правк", "en": "Monthly subscription: 150 ₪ on Starter, 300 ₪ on Pro Showcase, 400 ₪ on E-commerce (hosting, security, backups, changes and support). Changes included: up to 30 minutes per month on Starter, 1 hour on Pro, 2 hours on a store. Unused time does not carry over, and beyond that it is 150 ₪ per hour. 6-month commitment from launch, then you can cancel in writing with 30 days’ notice.", "ru": "Ежемесячная подписка: 150 ₪ на Стартере, 300 ₪ на Витрине Pro, 400 ₪ на магазине (хостинг, безопасность, резервные копии, правки и поддержка). Включённые правки: до 30 минут в месяц на Стартере, 1 час на Pro, 2 часа на магазине. Неиспользованное время не переносится, сверх этого 150 ₪ в час. Обязательство на 6 месяцев с запуска, затем можно отказаться письменно за 30 дней."}, {"k2": "extra page|additional page|pages|доп|страниц", "en": "Each extra page beyond the package costs 500 ₪.", "ru": "Каждая дополнительная страница сверх пакета стоит 500 ₪."}, {"k2": "contact|whatsapp|phone|call|email|reach|контакт|связ|телефон|позвон|почт|вотсап|ватсап", "en": "You can write to me on WhatsApp or call 058-788-4418, or email ichaysitsitbon@gmail.com. The Contact page also opens WhatsApp.", "ru": "Можно написать мне в WhatsApp или позвонить по номеру 058-788-4418, либо написать на ichaysitsitbon@gmail.com. Страница контактов тоже открывает WhatsApp."}, {"k2": "step|process|how does it work|how it works|этап|процесс|как это работает|как проходит", "en": "4 steps: 1) scoping and quote with a 50% deposit, 2) you send your content, 3) mockup and feedback within 5 working days, 4) launch and balance.", "ru": "4 шага: 1) постановка задачи и смета с предоплатой 50%, 2) вы присылаете материалы, 3) макет и правки в течение 5 рабочих дней, 4) запуск и оплата остатка."}, {"k2": "where|find|section|page|где|найти|раздел", "en": "On the site: Home, About, Offers (one page per offer), Price estimator, Process, Terms, AI assistant and Contact. Use the menu at the top or the button below.", "ru": "На сайте: Главная, О нас, Предложения (по странице на каждое), Калькулятор цены, Этапы работы, Условия, ИИ-помощник и Контакты. Воспользуйтесь меню вверху или кнопкой ниже."}, {"k2": "who are you|who is|about|idanatid|кто вы|кто ты|о вас|о нас", "en": "Idanatid builds websites and apps, with AI at the heart of the process, for professionals in Israel. The site is run by Ichay Sitbon, who works alone.", "ru": "Idanatid создаёт сайты и приложения, с ИИ в основе процесса, для профессионалов в Израиле. Сайтом занимается Ичай Ситбон, который работает один."}, {"k2": "^(hello|hi|hey|здравствуйте|привет|добрый)", "en": "Hello! How can I help?", "ru": "Здравствуйте! Чем могу помочь?"}];
const LANGS=["he","fr","en","ru"];
/*p8*/Object.assign(HE,{"cH": "הערכת מחיר לפרויקט שלכם", "cL1": "חבילה", "cO1": "סטארטר, סטנדרט · 1500 ₪", "cO2": "סטארטר, בינוני · 2000 ₪", "cO3": "סטארטר, פרימיום · 2500 ₪", "cO4": "תדמית Pro, בסיס · 3000 ₪", "cO5": "תדמית Pro, סטנדרט · 3800 ₪", "cO6": "תדמית Pro, מתקדם · 5000 ₪", "cO7": "חנות, סטנדרט · 8000 ₪", "cO8": "חנות, מתקדמת · 15000 ₪", "cO9": "מערכת בהתאמה אישית · מ-17000 ₪", "cL2": "עמודים נוספים (500 ₪ לעמוד)", "cL3": "שעות תמיכה נוספות בכל חודש (150 ₪ לשעה)", "hMinus": "להסיר שעה", "hPlus": "להוסיף שעה", "cL4": "לכלול דמי ייצוא האתר אם אעבור לספק אחר (500 ₪)", "r1": "חבילה", "r2": "עמודים נוספים", "r3": "סה״כ בנייה", "r4": "מקדמה בתחילת העבודה (50%)", "r5": "יתרה בהעלאה לאוויר", "r6": "מנוי חודשי", "r7": "שעות תמיכה נוספות (בחודש)", "r8": "סה״כ מנוי חודשי", "r9": "התחייבות ראשונית: 6 חודשי מנוי", "r10": "בנייה + 6 חודשי מנוי", "r11": "דמי ייצוא אם עוזבים", "r12": "זמן אספקה", "dl1": "5-7 ימי עבודה", "dl2": "10-15 ימי עבודה", "dl3": "15-30 ימי עבודה", "from": "מ-", "estPH": "מחשבון מחיר", "estPL": "בחרו חבילה, הוסיפו עמודים ושעות תמיכה, וקבלו את מחיר הבנייה, המקדמה והמנוי.", "estNote": "הערכה בלבד, לפי המחירים באתר. במערכת בהתאמה אישית המחיר מתחיל ב-17000 ₪ והסכום הסופי תלוי בפרויקט: כתבו לי להצעה מחייבת.", "seeDetail": "לפרטים המלאים", "tB1x": "לבקש את החבילה"});Object.assign(TX.en,{"cH": "Estimate your project", "cL1": "Offer", "cO1": "Starter, Standard · 1500 ₪", "cO2": "Starter, Intermediate · 2000 ₪", "cO3": "Starter, Premium · 2500 ₪", "cO4": "Pro Showcase, Base · 3000 ₪", "cO5": "Pro Showcase, Standard · 3800 ₪", "cO6": "Pro Showcase, Advanced · 5000 ₪", "cO7": "Store, Standard · 8000 ₪", "cO8": "Store, Advanced · 15000 ₪", "cO9": "Custom system · from 17000 ₪", "cL2": "Extra pages (500 ₪ each)", "cL3": "Extra support hours each month (150 ₪ per hour)", "hMinus": "Remove an hour", "hPlus": "Add an hour", "cL4": "Include the site export fee if I leave for another host (500 ₪)", "r1": "Offer", "r2": "Extra pages", "r3": "Build", "r4": "Deposit at start (50%)", "r5": "Balance at launch", "r6": "Monthly subscription", "r7": "Extra support hours (per month)", "r8": "Monthly total", "r9": "Initial 6-month commitment (subscription)", "r10": "Build + 6 months of subscription", "r11": "Export fee if you leave", "r12": "Delivery time", "dl1": "5 to 7 working days", "dl2": "10 to 15 working days", "dl3": "15 to 30 working days", "from": "from", "estPH": "Price estimator", "estPL": "Pick an offer, add pages and support hours, and get the build price, the deposit and the subscription.", "estNote": "Indicative estimate based on the prices on this site. For the custom system the price starts at 17000 ₪ and the final amount depends on the project: write to me for a firm quote.", "seeDetail": "See details", "tB1x": "Request this offer"});Object.assign(TX.ru,{"cH": "Оцените свой проект", "cL1": "Пакет", "cO1": "Стартер, Стандарт · 1500 ₪", "cO2": "Стартер, Средний · 2000 ₪", "cO3": "Стартер, Премиум · 2500 ₪", "cO4": "Витрина Pro, Базовый · 3000 ₪", "cO5": "Витрина Pro, Стандарт · 3800 ₪", "cO6": "Витрина Pro, Расширенный · 5000 ₪", "cO7": "Магазин, Стандарт · 8000 ₪", "cO8": "Магазин, Расширенный · 15000 ₪", "cO9": "Своя система · от 17000 ₪", "cL2": "Дополнительные страницы (500 ₪ за страницу)", "cL3": "Дополнительные часы поддержки в месяц (150 ₪ за час)", "hMinus": "Убрать час", "hPlus": "Добавить час", "cL4": "Учесть плату за экспорт сайта, если я уйду к другому хостингу (500 ₪)", "r1": "Пакет", "r2": "Доп. страницы", "r3": "Разработка", "r4": "Аванс на старте (50%)", "r5": "Остаток при запуске", "r6": "Ежемесячная подписка", "r7": "Доп. часы поддержки (в месяц)", "r8": "Итого в месяц", "r9": "Первые 6 месяцев обязательства (подписка)", "r10": "Разработка + 6 месяцев подписки", "r11": "Плата за экспорт при уходе", "r12": "Срок сдачи", "dl1": "5–7 рабочих дней", "dl2": "10–15 рабочих дней", "dl3": "15–30 рабочих дней", "from": "от", "estPH": "Калькулятор цены", "estPL": "Выберите пакет, добавьте страницы и часы поддержки и получите цену разработки, аванс и подписку.", "estNote": "Ориентировочная оценка по ценам сайта. Для своей системы цена начинается от 17000 ₪, итоговая сумма зависит от проекта: напишите мне для точного предложения.", "seeDetail": "Подробнее", "tB1x": "Запросить этот пакет"});
/*p9*/Object.assign(HE,{"wH": "אתר שנבנה איתכם", "w1": "כל פרויקט מתחיל בשיחה. אני לוקח את הזמן להבין את העסק שלכם, את הלקוחות שלכם ואת מה שאתם רוצים לראות באתר. אחר כך אנחנו בונים ביחד את האתר שהכי מתאים לכם, שלב אחרי שלב, מהרעיון הראשון ועד העלייה לאוויר.", "w2": "המחירים באתר נותנים מסגרת ברורה. בתוכה הכול מותאם אליכם: העמודים, הפונקציות, העיצוב והמילים. אתם במרכז, ואני לצידכם בכל שלב. חשוב לי שתצליחו ושתהיו גאים באתר שלכם."});Object.assign(TX.en,{"wH": "A site built with you", "w1": "Every project starts with a conversation. I take the time to understand your business, your customers and what you want to see online. Then we build together the site that fits you, step by step, from the first idea to launch day.", "w2": "The prices on this site give a clear frame. Inside it, everything is shaped around you: the pages, the features, the style, the words. You stay at the centre of the project and I stay by your side at every stage. Your success matters to me, and I want you to be proud of your site."});Object.assign(TX.ru,{"wH": "Сайт, который мы строим вместе", "w1": "Каждый проект начинается с разговора. Я не спешу и стараюсь понять ваш бизнес, ваших клиентов и то, что вы хотите увидеть в интернете. Затем мы вместе строим сайт, который подходит именно вам, шаг за шагом, от первой идеи до запуска.", "w2": "Цены на этом сайте задают понятные рамки. Внутри них всё подстраивается под вас: страницы, функции, стиль, слова. Вы остаётесь в центре проекта, а я рядом на каждом этапе. Ваш успех важен для меня, и я хочу, чтобы вы гордились своим сайтом."});
const tx=(l,k,fb)=>l==="he"?HE[k]:l==="fr"?fb:(TX[l][k]!==undefined?TX[l][k]:fb);
Object.assign(META,META_X);
/* On mémorise le texte français d'origine */
document.querySelectorAll('[data-i18n]').forEach(el=>{el.dataset.fr=el.innerHTML});
document.querySelectorAll('[data-i18n-aria]').forEach(el=>{el.dataset.frAria=el.getAttribute('aria-label')});

let LANG='he';
const fmtN=n=>String(Math.round(n));
const fmt=n=>fmtN(n)+" ₪";
const wa = t => "https://wa.me/"+CONFIG.whatsapp+"?text="+encodeURIComponent(t);

function fillDynamic(){
  const NAME=LANG==='he'?CONFIG.nameHe:LANG==='fr'?CONFIG.nameFr:META[LANG].name;
  document.querySelectorAll('[data-name]').forEach(e=>e.textContent=NAME);
  document.querySelectorAll('.yr').forEach(e=>e.textContent=new Date().getFullYear());
  document.querySelectorAll('[data-count]').forEach(e=>e.textContent=fmtN(+e.dataset.count));
}
function applyLang(lang){
  LANG=lang;
  if(LANGS.indexOf(lang)<0)lang='he';LANG=lang;
  const M=META[lang],he=lang==='he';
  const h=document.documentElement;
  h.lang=lang;h.dir=he?'rtl':'ltr';
  try{localStorage.setItem('lang',lang)}catch(e){}
  document.querySelectorAll('[data-i18n]').forEach(el=>{el.innerHTML=tx(lang,el.dataset.i18n,el.dataset.fr)});
  document.querySelectorAll('[data-i18n-aria]').forEach(el=>{el.setAttribute('aria-label',tx(lang,el.dataset.i18nAria,el.dataset.frAria))});
  fillDynamic();
  const B=document.body.dataset;
  const hf=(lang==='he'||lang==='fr');const T0=(B.tHe&&hf)?(he?B.tHe:B.tFr):"Idanatid"+M.title, D0=(B.dHe&&hf)?(he?B.dHe:B.dFr):M.desc;
  document.title=T0;
  document.querySelector('meta[name=description]').content=D0;
  document.querySelector('meta[property="og:title"]').content=T0;
  const ol=document.querySelector('meta[property="og:locale"]');if(ol)ol.content=({he:'he_IL',fr:'fr_FR',en:'en_US',ru:'ru_RU'})[lang];
  const oa=document.querySelector('meta[property="og:locale:alternate"]');if(oa)oa.content=he?'fr_FR':'he_IL';
  document.querySelector('meta[property="og:description"]')&&(document.querySelector('meta[property="og:description"]').content=D0);
  document.getElementById('langLabel').textContent=M.langLabel;document.getElementById('lang').value=lang;
  document.querySelectorAll('[data-wa]').forEach(a=>{a.href=wa(M.wa);a.target="_blank";a.rel="noopener"});
  document.querySelectorAll('[data-mail]').forEach(a=>a.href="mailto:"+CONFIG.email+"?subject="+encodeURIComponent(M.mail));
  calc();
  if(window.chatLabels)window.chatLabels();
}

/* Menu mobile */
const mb=document.querySelector('.menu-btn'),menu=document.getElementById('menu');
mb.addEventListener('click',()=>{const o=menu.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
menu.addEventListener('click',e=>{if(e.target.tagName==='A'){menu.classList.remove('open');mb.setAttribute('aria-expanded',false)}});
document.getElementById('lang').addEventListener('change',e=>applyLang(e.target.value));

/* Barre de progression et ombre de la nav */
const bar=document.getElementById('progress'),nav=document.getElementById('nav');
function onScroll(){
  const h=document.documentElement.scrollHeight-innerHeight;
  bar.style.transform='scaleX('+(h>0?scrollY/h:0)+')';
  nav.classList.toggle('scrolled',scrollY>8);
}
addEventListener('scroll',onScroll,{passive:true});onScroll();

/* Apparition au défilement + compteurs de prix */
function countUp(el){el.textContent=fmtN(+el.dataset.count)}
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;
  e.target.classList.add('in');
  e.target.querySelectorAll('[data-count]').forEach(countUp);
  io.unobserve(e.target);
}),{threshold:.15});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

/* Estimateur */
let pages=0,hrs=0;
const tier=document.getElementById('tier');
const CFR={"dl1": "5 à 7 jours ouvrés", "dl2": "10 à 15 jours ouvrés", "dl3": "15 à 30 jours ouvrés", "from": "dès"};
function calc(){
  if(!tier)return;
  const o=tier.options[tier.selectedIndex],base=+tier.value,sub=+o.dataset.s,g=+o.dataset.g,cu=base>=17000;
  const lang=(typeof LANG!=='undefined'&&LANG)||'he';
  const fw=tx(lang,'from',CFR.from),pre=cu?(fw.slice(-1)==='-'?fw:fw+' '):'';
  const m=n=>pre+'<bdi dir="ltr">'+fmt(n)+'</bdi>';
  const extra=pages*500,tot=base+extra,hx=hrs*150,mon=sub+hx;
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.innerHTML=v};
  set('pages',pages);set('hours',hrs);
  set('r-base',m(base));set('r-extra',fmt(extra));
  const rt=document.getElementById('r-total');rt.innerHTML=m(tot);
  rt.classList.remove('bump');void rt.offsetWidth;rt.classList.add('bump');
  set('r-dep',m(tot/2));set('r-bal',m(tot/2));
  set('r-sub',m(sub));set('r-hrs',fmt(hx));set('r-mon',m(mon));
  set('r-six',m(mon*6));set('r-all',m(tot+mon*6));
  const ex=document.getElementById('exp'),on=ex&&ex.checked;
  ['r-exp-t','r-exp'].forEach(i=>{const e=document.getElementById(i);if(e)e.hidden=!on});
  set('r-exp',fmt(500));
  set('r-dl',tx(lang,'dl'+g,CFR['dl'+g]));
  const rq=document.getElementById('reqBtn'),dt=document.getElementById('detBtn');
  if(rq)rq.setAttribute('href','#/contact?offer='+(['','starter','pro','ecom'][g]));
  if(dt)dt.setAttribute('href','#/'+(['','offre-starter','offre-vitrine-pro','offre-ecommerce'][g]));
}
if(tier){
  const bind=(id,fn)=>{const e=document.getElementById(id);if(e)e.onclick=fn};
  bind('plus',()=>{if(pages<20){pages++;calc()}});bind('minus',()=>{if(pages>0){pages--;calc()}});
  bind('hplus',()=>{if(hrs<20){hrs++;calc()}});bind('hminus',()=>{if(hrs>0){hrs--;calc()}});
  tier.onchange=calc;const ex=document.getElementById('exp');if(ex)ex.onchange=calc;
}

/* Pré-sélection de l'offre depuis les boutons */
try{const of=new URLSearchParams(location.search).get('offer'),so=document.getElementById('o');if(of&&so)so.value=of}catch(e){}

/* Formulaire → WhatsApp (message dans la langue active) */
const _f=document.getElementById('form');if(_f)_f.addEventListener('submit',e=>{
  e.preventDefault();
  const v=id=>document.getElementById(id).value.trim();
  const sel=document.getElementById('o'),offer=sel.options[sel.selectedIndex].text;
  const txt = LANG==='he'
    ? "שלום, שמי "+v('n')+" ("+v('t')+").\nחבילה: "+offer+".\n\n"+v('m')
    : LANG==='en' ? "Hello, my name is "+v('n')+" ("+v('t')+").\nOffer: "+offer+".\n\n"+v('m')
    : LANG==='ru' ? "Здравствуйте, меня зовут "+v('n')+" ("+v('t')+").\nПредложение: "+offer+".\n\n"+v('m')
    : "Bonjour, je m’appelle "+v('n')+" ("+v('t')+").\nOffre : "+offer+".\n\n"+v('m');
  window.open(wa(txt),'_blank','noopener');
});

/* ===== Assistant IA =====
   CHAT_ENDPOINT : adresse du relais serveur qui appelle Claude (clé API jamais dans cette page).
   Vide = mode démo : réponses prédéfinies basées sur le contenu du site. */
const CHAT_ENDPOINT="https://vldpnobmfpjlmmseevum.supabase.co/functions/v1/chat";
const CHAT={
fr:{btn:"Assistant IA",title:"Idanatid AI",sub:"Posez-moi vos questions",close:"Fermer",send:"Envoyer",ph:"Écrivez votre question…",
 note:"Mode démo : l’assistant complet sera branché prochainement.",
 priv:"Ne saisissez pas de données sensibles. Envoyer un message vaut acceptation de la <a href=\"privacy.html\">politique de confidentialité</a>.",
 hello:"Bonjour ! Je suis l’assistant d’Idanatid. Je peux vous parler des tarifs, des offres, des délais, du contact, ou vous indiquer où trouver chaque chose sur le site.",
 chips:["Quels sont les tarifs ?","Que comprend l’offre Pro ?","Quels sont les délais ?","Comment vous contacter ?"],
 wait:"…",err:"Désolé, une erreur est survenue. Écrivez-moi sur WhatsApp.",
 wa:"Ouvrir WhatsApp",
 fallback:"Je n’ai pas la réponse complète à cette question en mode démo. Pour un avis précis, le plus simple est d’écrire directement sur WhatsApp : 058-788-4418."},
he:{btn:"עוזר AI",title:"Idanatid AI",sub:"שאלו אותי כל שאלה",close:"סגירה",send:"שליחה",ph:"כתבו את השאלה שלכם…",
 note:"מצב הדגמה: העוזר המלא יחובר בקרוב.",
 priv:"אל תכתבו מידע רגיש. שליחת הודעה מהווה הסכמה ל<a href=\"privacy.html\">מדיניות הפרטיות</a>.",
 hello:"שלום! אני העוזר של Idanatid. אפשר לשאול אותי על מחירים, חבילות, זמני אספקה, יצירת קשר, או איפה למצוא כל דבר באתר.",
 chips:["מה המחירים?","מה כוללת חבילת Pro?","מה זמני האספקה?","איך יוצרים קשר?"],
 wait:"…",err:"מצטער, אירעה שגיאה. כתבו לי בוואטסאפ.",
 wa:"פתיחת וואטסאפ",
 fallback:"אין לי תשובה מלאה לשאלה הזו במצב הדגמה. לתשובה מדויקת הכי פשוט לכתוב בוואטסאפ: 058-788-4418."}
};
const CHAT_KB=[
 {k:/tarif|prix|combien|coût|cout|₪|shekel|מחיר|כמה עולה|עלות|תעריף|כמה זה/i,
  fr:"Trois offres :\n• Starter : 1500 à 2500 ₪, puis 150 ₪ / mois\n• Vitrine Pro & Dashboard Admin : 3000 à 5000 ₪, puis 300 ₪ / mois\n• E-commerce & sur-mesure : 8000 à 17000+ ₪, puis 400 ₪ / mois\nChaque page supplémentaire : 500 ₪.",
  he:"שלוש חבילות:\n• סטארטר: 1500 עד 2500 ₪, ואז 150 ₪ לחודש\n• אתר תדמית Pro ולוח ניהול: 3000 עד 5000 ₪, ואז 300 ₪ לחודש\n• חנות אונליין ופיתוח אישי: 8000 עד 17000+ ₪, ואז 400 ₪ לחודש\nכל עמוד נוסף: 500 ₪.",go:"offres.html"},
 {k:/starter|landing|1500|2000|2500|סטארטר|דף נחיתה/i,
  fr:"Le Starter est une landing page. 1500 ₪ : 4 sections (Hero, À propos, Services, Contact). 2000 ₪ : 6 sections avec galerie et témoignages. 2500 ₪ : retouches visuelles avancées, prise de rendez-vous (Calendly) et pixels Meta / Google Analytics. Livraison en 5 à 7 jours ouvrés.",
  he:"הסטארטר הוא דף נחיתה. 1500 ₪: 4 חלקים (Hero, אודות, שירותים, יצירת קשר). 2000 ₪: 6 חלקים עם גלריה והמלצות. 2500 ₪: עיבוד ויזואלי מתקדם, קביעת פגישות (Calendly) ופיקסלים של Meta / Google Analytics. אספקה תוך 5-7 ימי עבודה.",go:"offres.html"},
 {k:/pro\b|vitrine|3000|3800|5000|dashboard|admin|תדמית|ניהול/i,
  fr:"Vitrine Pro & Dashboard Admin. Toutes les formules incluent une interface d’administration privée (connexion e-mail / mot de passe) pour modifier vous-même textes et images.\n• 3000 ₪ : 3 à 4 pages, design sur mesure\n• 3800 ₪ : 5 pages, animations, catalogue géré dans l’admin, galerie et cartes\n• 5000 ₪ : 6 pages et plus, filtres dynamiques, signature électronique tactile\nLivraison en 10 à 15 jours ouvrés.",
  he:"אתר תדמית Pro ולוח ניהול. כל המדרגות כוללות ממשק ניהול פרטי (התחברות באימייל / סיסמה) לעריכת טקסטים ותמונות בעצמכם.\n• 3000 ₪: 3-4 עמודים, עיצוב אישי\n• 3800 ₪: 5 עמודים, אנימציות, ניהול קטלוג בלוח הניהול, גלריה ומפות\n• 5000 ₪: 6 עמודים ויותר, פילטרים דינמיים, חתימה אלקטרונית במגע\nאספקה תוך 10-15 ימי עבודה.",go:"offres.html"},
 {k:/e-?commerce|boutique|magasin|panier|paiement en ligne|8000|15000|17000|חנות|עגלה|אונליין/i,
  fr:"E-commerce & sur-mesure.\n• 8000 ₪ : jusqu’à 20 produits, panier latéral, achat en 2 étapes, paiement sécurisé (Tranzila, CreditGuard, Hyp, Stripe), admin des stocks\n• 15000 ₪ : jusqu’à 100 produits, variantes, espace client, relance des paniers abandonnés\n• 17000 ₪+ : plus de 100 produits ou application sur mesure, rôles utilisateurs, signatures complexes, factures PDF, API tierces\nLivraison en 15 à 30 jours ouvrés.",
  he:"חנות אונליין ופיתוח אישי.\n• 8000 ₪: עד 20 מוצרים, עגלה צדדית, רכישה ב-2 שלבים, תשלום מאובטח (Tranzila, CreditGuard, Hyp, Stripe), ניהול מלאי\n• 15000 ₪: עד 100 מוצרים, וריאציות, אזור אישי, תזכורת לעגלות נטושות\n• 17000 ₪+: מעל 100 מוצרים או אפליקציה בהתאמה אישית, הרשאות משתמשים, חתימות מורכבות, חשבוניות PDF, חיבורי API\nאספקה תוך 15-30 ימי עבודה.",go:"offres.html"},
 {k:/signature|signer|חתימה|חתום/i,
  fr:"La signature électronique tactile (canvas) est incluse à partir de 5000 ₪ dans l’offre Vitrine Pro : signature à la main sur tablette, mobile ou souris, horodatage, adresse IP enregistrée et document récapitulatif.",
  he:"חתימה אלקטרונית במגע (canvas) כלולה מ-5000 ₪ בחבילת Pro: חתימה ידנית בטאבלט, בנייד או בעכבר, חותמת זמן, שמירת כתובת IP ומסמך מסכם.",go:"offres.html"},
 {k:/délai|delai|livraison|livrer|quand|combien de temps|jours|אספקה|זמן|מתי|ימים/i,
  fr:"Délais de livraison : Starter 5 à 7 jours ouvrés, Vitrine Pro 10 à 15 jours, E-commerce 15 à 30 jours. Vous fournissez vos textes et visuels sous 7 jours après la signature.",
  he:"זמני אספקה: סטארטר 5-7 ימי עבודה, Pro 10-15 ימים, חנות 15-30 ימים. את הטקסטים והוויזואלים מעבירים תוך 7 ימים מהחתימה.",go:"methode.html"},
 {k:/acompte|paiement|payer|upgrade|changer d|différence|difference|propriété|code source|מקדמה|תשלום|לשלם|שדרוג|מעבר בין|בעלות|קוד מקור/i,
  fr:"Paiement : 50 % d’acompte au démarrage (non remboursable une fois le travail commencé), 50 % à la livraison du site. Si vous changez d’offre, vous ne payez que la différence avec ce que vous avez déjà versé. Après paiement du solde, le site, le code et le design vous appartiennent à 100 %. En cas de départ, vous recevez gratuitement tous les fichiers et les accès au domaine sous 14 jours ; si vous voulez que je transfère moi-même le site chez un nouvel hébergeur, c’est un service optionnel à 500 ₪.",
  he:"תשלום: מקדמה של 50% בתחילת העבודה (לא מוחזרת אחרי שהעבודה התחילה) ו-50% במסירת האתר. במעבר בין חבילות משלמים רק את ההפרש ממה ששולם. אחרי תשלום היתרה האתר, הקוד והעיצוב שייכים לכם ב-100%. בעזיבה מקבלים בחינם את כל הקבצים ואת הגישות לדומיין תוך 14 יום; אם תרצו שאעביר את האתר בעצמי לספק אחסון חדש, זה שירות אופציונלי ב-500 ₪.",go:"conditions.html"},
 {k:/abonnement|mensuel|résili|resili|engagement|modification|correction|heure|מנוי|ביטול|התחייבות|תיקונ|שינויים|לשעה/i,
  fr:"Abonnement mensuel : 150 ₪ en Starter, 300 ₪ en Vitrine Pro, 400 ₪ en E-commerce (hébergement, sécurité, sauvegardes, modifications et support). Modifications incluses : jusqu’à 30 minutes par mois en Starter, 1 heure en Vitrine Pro, 2 heures en boutique ; le temps non utilisé n’est pas reporté ; au-delà, 150 ₪ de l’heure. Engagement de 6 mois à partir de la mise en ligne, puis résiliation par écrit avec 30 jours de préavis. Résiliation avant 6 mois : on paie les mois restants. 2 séries de corrections sur la maquette sont incluses, les suivantes coûtent 150 ₪ de l’heure.",
  he:"מנוי חודשי: 150 ₪ בסטארטר, 300 ₪ באתר תדמית Pro, 400 ₪ בחנות (אחסון, אבטחה, גיבויים, שינויים ותמיכה). שינויים כלולים: עד 30 דקות בחודש בסטארטר, שעה ב-Pro, שעתיים בחנות; זמן שלא נוצל לא עובר; מעבר לכך 150 ₪ לשעה. התחייבות ל-6 חודשים מיום העלאת האתר, ואחריה ביטול בכתב 30 יום מראש. ביטול לפני 6 חודשים: משלמים את החודשים שנותרו. כלולים 2 סבבי תיקונים על ההדמיה, תיקונים נוספים 150 ₪ לשעה.",go:"conditions.html"},
 {k:/page suppl|pages|עמוד נוסף|עמודים/i,
  fr:"Chaque page supplémentaire, au-delà du forfait, est facturée 500 ₪.",he:"כל עמוד נוסף מעבר למסגרת החבילה עולה 500 ₪.",go:"estimateur.html"},
 {k:/contact|whatsapp|téléphone|telephone|appeler|mail|joindre|numéro|numero|צור קשר|ליצור קשר|קשר|טלפון|וואטסאפ|מייל|אימייל|להתקשר/i,
  fr:"Vous pouvez m’écrire sur WhatsApp ou appeler le 058-788-4418, ou m’envoyer un e-mail à ichaysitsitbon@gmail.com. La page Contact ouvre aussi WhatsApp.",
  he:"אפשר לכתוב לי בוואטסאפ או להתקשר ל-058-788-4418, או לשלוח לי מייל ל-ichaysitsitbon@gmail.com. גם עמוד יצירת הקשר נפתח בוואטסאפ.",go:"contact.html",wa:true},
 {k:/étape|etape|comment ça se passe|comment ca se passe|processus|méthode|methode|déroul|שלבים|תהליך|איך זה עובד/i,
  fr:"4 étapes : 1) cadrage et devis avec 50 % d’acompte, 2) vous envoyez vos contenus, 3) maquette et retours sous 5 jours ouvrés, 4) mise en ligne et solde.",
  he:"4 שלבים: 1) אפיון והצעת מחיר עם מקדמה של 50%, 2) שליחת התכנים, 3) הדמיה ותיקונים תוך 5 ימי עבודה, 4) העלאה לאוויר ותשלום היתרה.",go:"methode.html"},
 {k:/où|ou se trouve|trouver|section|aller à|איפה|היכן|למצוא/i,
  fr:"Sur le site : Accueil, À propos, Offres (une page par offre), Estimateur de prix, Méthode, Conditions, Assistant et Contact. Utilisez le menu en haut ou le bouton ci-dessous.",
  he:"באתר: דף הבית, אודות, חבילות (עמוד לכל חבילה), מחשבון הערכת מחיר, תהליך העבודה, תנאים, עוזר AI ויצירת קשר. אפשר להשתמש בתפריט למעלה או בכפתור.",go:"offres.html"},
 {k:/qui êtes|qui es-tu|qui est|à propos|a propos|idanatid|מי אתה|מי אתם|אודות/i,
  fr:"Idanatid crée des sites web et des applications, avec l’IA au cœur de la démarche, pour les professionnels en Israël. Le site est géré par Ichay Sitbon, qui travaille seul.",
  he:"Idanatid בונה אתרים ואפליקציות, עם AI בלב התהליך, לעסקים בישראל. האתר מנוהל על ידי ישי סיטבון, שעובד לבד.",go:"a-propos.html"},
 {k:/^(bonjour|salut|hello|hi|hey|שלום|היי|הי)\b/i,fr:"Bonjour ! Comment puis-je vous aider ?",he:"שלום! איך אפשר לעזור?"}
];
(function(){
  const $=id=>document.getElementById(id);
  const btn=$('cbBtn'),panel=$('cbPanel'),log=$('cbLog'),form=$('cbForm'),inp=$('cbIn'),chips=$('cbChips');
  const hist=[];let busy=false;
  Object.assign(CHAT,CHAT_X);
  const T=()=>CHAT[LANG];
  function add(role,text,link){
    const d=document.createElement('div');d.className='cb-msg '+(role==='me'?'me':'bot');d.textContent=text;
    if(link){const a=document.createElement('a');a.href=link.href;a.textContent=link.label;
      if(link.ext){a.target='_blank';a.rel='noopener'}else a.addEventListener('click',()=>{if(innerWidth<700)close()});d.appendChild(document.createElement('br'));d.appendChild(a)}
    log.appendChild(d);log.scrollTop=log.scrollHeight;return d;
  }
  function labels(){
    const t=T();
    $('cbBtnT').textContent=t.btn;$('cbTitle').textContent=t.title;$('cbSub').textContent=t.sub;
    $('cbClose').setAttribute('aria-label',t.close);$('cbSend').textContent=t.send;inp.placeholder=t.ph;$('cbNote').innerHTML=(CHAT_ENDPOINT?'':t.note+' ')+t.priv;
    if(log.children.length===1)log.firstChild.textContent=t.hello;
    chips.innerHTML='';t.chips.forEach(c=>{const b=document.createElement('button');b.type='button';b.textContent=c;b.addEventListener('click',()=>ask(c));chips.appendChild(b)});
  }
  const slot=$('heroChat'),hero=$('top');let docked=!!slot,floatOpen=false;
  function dock(){if(docked&&panel.parentNode===slot)return;docked=true;slot.appendChild(panel);panel.classList.remove('float');panel.classList.add('docked','open');btn.hidden=true;btn.setAttribute('aria-expanded',false)}
  function undock(){if(!docked)return;docked=false;document.body.appendChild(panel);panel.classList.remove('docked');panel.classList.add('float');panel.classList.toggle('open',floatOpen);btn.hidden=false;btn.setAttribute('aria-expanded',floatOpen)}
  function open(){floatOpen=true;panel.classList.add('open');btn.setAttribute('aria-expanded',true);inp.focus()}
  function close(){floatOpen=false;panel.classList.remove('open');btn.setAttribute('aria-expanded',false);btn.focus()}
  btn.addEventListener('click',()=>floatOpen?close():open());
  $('cbClose').addEventListener('click',close);
  addEventListener('keydown',e=>{if(e.key==='Escape'&&!docked&&floatOpen)close()});
  function demo(q){
    const GO={he:'לעבור לחלק הזה',fr:'Aller à cette section',en:'Go to this section',ru:'Перейти в этот раздел'};
    for(let i=0;i<CHAT_KB.length;i++){const e=CHAT_KB[i];if(e.k.test(q)||(KB_X[i]&&new RegExp(KB_X[i].k2,'i').test(q))){
      const link=e.wa?{href:wa(META[LANG].wa),label:T().wa,ext:true}:e.go?{href:e.go,label:GO[LANG]}:null;
      const x=KB_X[i];return{text:LANG==='he'?e.he:LANG==='fr'?e.fr:(x&&x[LANG])||e.fr,link}}}
    return{text:T().fallback,link:{href:wa(META[LANG].wa),label:T().wa,ext:true}};
  }
  async function ask(q){
    q=q.trim();if(!q||busy)return;busy=true;add('me',q);hist.push({role:'user',content:q});inp.value='';
    const w=add('bot',T().wait);w.classList.add('typing');
    let r;
    if(CHAT_ENDPOINT){
      try{const res=await fetch(CHAT_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({lang:LANG,messages:hist.slice(-12)})});
        if(!res.ok)throw 0;const j=await res.json();r={text:String(j.reply||''),link:null};if(!r.text)throw 0}
      catch(e){r=demo(q)}
    }else{await new Promise(s=>setTimeout(s,reduce?0:450));r=demo(q)}
    w.remove();add('bot',r.text,r.link);hist.push({role:'assistant',content:r.text});busy=false;
  }
  form.addEventListener('submit',e=>{e.preventDefault();ask(inp.value)});
  add('bot',T().hello);if(slot)dock();else{docked=true;undock()}
  if(slot&&hero&&'IntersectionObserver' in window)new IntersectionObserver(([e])=>{(e.intersectionRatio>=.25?dock:undock)()},{threshold:[0,.25]}).observe(hero);
  window.chatLabels=labels;labels();
})();

/* Démarrage : hébreu par défaut, français si ?lang=fr ou choix précédent */
let start='he';
try{const q=new URLSearchParams(location.search).get('lang');const s=localStorage.getItem('lang');start=(LANGS.indexOf(q)>-1)?q:(LANGS.indexOf(s)>-1)?s:'he'}catch(e){}
applyLang(start);
document.documentElement.classList.add('ready');

/* Fond de cristal WebGL : une seule passe, résolution réduite, en pause hors écran */
(function(){
  const hero=document.querySelector('.hero'),cv=document.getElementById('gl');
  if(!hero||!cv)return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const gl=cv.getContext('webgl',{antialias:false,alpha:false,powerPreference:'low-power'});
  if(!gl)return;
  const vs='attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const fs=`precision highp float;uniform vec2 r;uniform float t;uniform vec2 m;
  vec2 h2(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));return fract(sin(p)*43758.5453);}
  float h1(vec2 p){return fract(sin(dot(p,vec2(41.3,289.1)))*43758.5453);}
  void main(){
    vec2 uv=gl_FragCoord.xy/r.y;
    vec2 q=uv*6.6+vec2(t*.012,0.);
    vec2 ip=floor(q),fp=fract(q);
    float d1=8.,d2=8.;vec2 id=vec2(0.);vec2 cp=vec2(0.);
    for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){
      vec2 g=vec2(float(i),float(j));
      vec2 o=h2(ip+g);
      o=.5+.42*sin(t*.18+6.2831*o);
      vec2 dv=g+o-fp;float d=dot(dv,dv);
      if(d<d1){d2=d1;d1=d;id=ip+g;cp=dv;}else if(d<d2){d2=d;}
    }
    float e=sqrt(d2)-sqrt(d1);
    float rnd=h1(id);
    /* normale de la facette et lumière qui suit le curseur */
    vec3 n=normalize(vec3((h2(id)-.5)*1.4,1.));
    vec3 L=normalize(vec3((m.x-.5)*2.4+sin(t*.25)*.6,(m.y-.5)*2.4+.4,.9));
    float diff=max(dot(n,L),0.);
    float spec=pow(max(dot(reflect(-L,n),vec3(0.,0.,1.)),0.),14.);
    vec3 deep=vec3(.055,.105,.19),mid=vec3(.12,.27,.42),ice=vec3(.56,.83,.91);
    vec3 col=mix(deep,mid,rnd*.8+diff*.45);
    col=mix(col,vec3(.36,.31,.66),smoothstep(.86,.93,rnd)*.55);
    col=mix(col,vec3(.94,.86,.60),smoothstep(.95,.99,rnd)*.5);
    col+=ice*spec*.38;
    col+=ice*smoothstep(.06,.0,e)*.26;
    float vg=smoothstep(1.35,.15,length((gl_FragCoord.xy/r-.5)*vec2(1.2,1.)));
    col*=.55+.45*vg;
    vec2 sc=(gl_FragCoord.xy/r-vec2(.5,.62))*vec2(1.1,1.5);
    col*=.50+.50*smoothstep(.12,.62,length(sc));
    gl_FragColor=vec4(col,1.);
  }`;
  function sh(t,s){const x=gl.createShader(t);gl.shaderSource(x,s);gl.compileShader(x);return gl.getShaderParameter(x,gl.COMPILE_STATUS)?x:null}
  const a=sh(gl.VERTEX_SHADER,vs),b=sh(gl.FRAGMENT_SHADER,fs);if(!a||!b)return;
  const pr=gl.createProgram();gl.attachShader(pr,a);gl.attachShader(pr,b);gl.linkProgram(pr);
  if(!gl.getProgramParameter(pr,gl.LINK_STATUS))return;
  gl.useProgram(pr);
  const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
  const lp=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(lp);gl.vertexAttribPointer(lp,2,gl.FLOAT,false,0,0);
  const U={r:gl.getUniformLocation(pr,'r'),t:gl.getUniformLocation(pr,'t'),m:gl.getUniformLocation(pr,'m')};
  let W=0,H=0,mx=.5,my=.6,tx=.5,ty=.6,vis=true,raf=0,t0=performance.now();
  function size(){
    const k=Math.min(devicePixelRatio||1,1.5)*.85;
    const w=Math.max(2,Math.round(hero.clientWidth*k)),h=Math.max(2,Math.round(hero.clientHeight*k));
    if(w!==W||h!==H){W=w;H=h;cv.width=w;cv.height=h;gl.viewport(0,0,w,h)}
  }
  function frame(now){
    raf=0;size();
    mx+=(tx-mx)*.04;my+=(ty-my)*.04;
    gl.uniform2f(U.r,W,H);gl.uniform1f(U.t,reduce?8:(now-t0)/1000);gl.uniform2f(U.m,mx,1-my);
    gl.drawArrays(gl.TRIANGLES,0,3);
    if(!reduce&&vis&&!document.hidden)raf=requestAnimationFrame(frame);
  }
  function kick(){if(!raf)raf=requestAnimationFrame(frame)}
  new IntersectionObserver(e=>{vis=e[0].isIntersecting;if(vis)kick()},{threshold:0}).observe(hero);
  document.addEventListener('visibilitychange',kick);
  if(!reduce)hero.addEventListener('pointermove',e=>{const R=hero.getBoundingClientRect();tx=(e.clientX-R.left)/R.width;ty=(e.clientY-R.top)/R.height},{passive:true});
  addEventListener('resize',kick);
  kick();hero.classList.add('gl-on');
})();

/* Offres sur téléphone : pastilles de position */
(function(){
  const o=document.querySelector('.offers');if(!o)return;
  const d=document.createElement('div');d.className='dots';d.setAttribute('aria-hidden','true');
  const cards=[...o.querySelectorAll('.offer')];cards.forEach(()=>d.appendChild(document.createElement('i')));
  o.insertAdjacentElement('afterend',d);
  function upd(){
    const c=o.getBoundingClientRect(),mid=c.left+c.width/2;let best=0,bd=1e9;
    cards.forEach((el,i)=>{const r=el.getBoundingClientRect();const dd=Math.abs(r.left+r.width/2-mid);if(dd<bd){bd=dd;best=i}});
    [...d.children].forEach((x,i)=>x.classList.toggle('on',i===best));
  }
  o.addEventListener('scroll',()=>requestAnimationFrame(upd),{passive:true});
  addEventListener('resize',upd);upd();
})();

/* Page active dans le menu */
(function(){
  const cur=document.body.dataset.nav||location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('#menu a, .fcols a').forEach(a=>{if(a.getAttribute('href')===cur&&!a.classList.contains('cta'))a.setAttribute('aria-current','page')});
})();
