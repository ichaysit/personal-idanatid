
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
o3s:"ואז 400 ₪ לחודש (מינימום) · אספקה תוך 15-30 ימי עבודה",
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
/* On mémorise le texte français d'origine */
document.querySelectorAll('[data-i18n]').forEach(el=>{el.dataset.fr=el.innerHTML});
document.querySelectorAll('[data-i18n-aria]').forEach(el=>{el.dataset.frAria=el.getAttribute('aria-label')});

let LANG='he';
const fmtN=n=>String(Math.round(n));
const fmt=n=>fmtN(n)+" ₪";
const wa = t => "https://wa.me/"+CONFIG.whatsapp+"?text="+encodeURIComponent(t);

function fillDynamic(){
  const NAME=LANG==='he'?CONFIG.nameHe:CONFIG.nameFr;
  document.querySelectorAll('[data-name]').forEach(e=>e.textContent=NAME);
  document.querySelectorAll('.yr').forEach(e=>e.textContent=new Date().getFullYear());
  document.querySelectorAll('[data-count]').forEach(e=>e.textContent=fmtN(+e.dataset.count));
}
function applyLang(lang){
  LANG=lang;
  const M=META[lang],he=lang==='he',NAME=he?CONFIG.nameHe:CONFIG.nameFr;
  const h=document.documentElement;
  h.lang=lang;h.dir=he?'rtl':'ltr';
  try{localStorage.setItem('lang',lang)}catch(e){}
  document.querySelectorAll('[data-i18n]').forEach(el=>{el.innerHTML=he?HE[el.dataset.i18n]:el.dataset.fr});
  document.querySelectorAll('[data-i18n-aria]').forEach(el=>{el.setAttribute('aria-label',he?HE[el.dataset.i18nAria]:el.dataset.frAria)});
  fillDynamic();
  const B=document.body.dataset;
  const T0=B.tHe?(he?B.tHe:B.tFr):"Idanatid"+M.title, D0=B.dHe?(he?B.dHe:B.dFr):M.desc;
  document.title=T0;
  document.querySelector('meta[name=description]').content=D0;
  document.querySelector('meta[property="og:title"]').content=T0;
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
let pages=0;
const tier=document.getElementById('tier');
function calc(){
  if(!tier)return;
  const base=+tier.value,extra=pages*500,tot=base+extra;
  document.getElementById('pages').textContent=pages;
  document.getElementById('r-base').textContent=fmt(base);
  document.getElementById('r-extra').textContent=fmt(extra);
  const rt=document.getElementById('r-total');
  rt.textContent=fmt(tot);
  rt.classList.remove('bump');void rt.offsetWidth;rt.classList.add('bump');
  document.getElementById('r-dep').textContent=fmt(tot/2);
  document.getElementById('r-bal').textContent=fmt(tot/2);
}
if(tier){document.getElementById('plus').onclick=()=>{if(pages<20){pages++;calc()}};
document.getElementById('minus').onclick=()=>{if(pages>0){pages--;calc()}};
tier.onchange=calc}

/* Pré-sélection de l'offre depuis les boutons */
try{const of=new URLSearchParams(location.search).get('offer'),so=document.getElementById('o');if(of&&so)so.value=of}catch(e){}

/* Formulaire → WhatsApp (message dans la langue active) */
const _f=document.getElementById('form');if(_f)_f.addEventListener('submit',e=>{
  e.preventDefault();
  const v=id=>document.getElementById(id).value.trim();
  const sel=document.getElementById('o'),offer=sel.options[sel.selectedIndex].text;
  const txt = LANG==='he'
    ? "שלום, שמי "+v('n')+" ("+v('t')+").\nחבילה: "+offer+".\n\n"+v('m')
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
 priv:"Ne saisissez pas de données sensibles. Les messages sont traités par un fournisseur d’IA. <a href=\"privacy.html\">Confidentialité</a>",
 hello:"Bonjour ! Je suis l’assistant d’Idanatid. Je peux vous parler des tarifs, des offres, des délais, du contact, ou vous indiquer où trouver chaque chose sur le site.",
 chips:["Quels sont les tarifs ?","Que comprend l’offre Pro ?","Quels sont les délais ?","Comment vous contacter ?"],
 wait:"…",err:"Désolé, une erreur est survenue. Écrivez-nous sur WhatsApp.",
 wa:"Ouvrir WhatsApp",
 fallback:"Je n’ai pas la réponse complète à cette question en mode démo. Pour un avis précis, le plus simple est d’écrire directement sur WhatsApp : 058-788-4418."},
he:{btn:"עוזר AI",title:"Idanatid AI",sub:"שאלו אותי כל שאלה",close:"סגירה",send:"שליחה",ph:"כתבו את השאלה שלכם…",
 note:"מצב הדגמה: העוזר המלא יחובר בקרוב.",
 priv:"אל תכתבו מידע רגיש. ההודעות מעובדות על ידי ספק AI חיצוני. <a href=\"privacy.html\">מדיניות פרטיות</a>",
 hello:"שלום! אני העוזר של Idanatid. אפשר לשאול אותי על מחירים, חבילות, זמני אספקה, יצירת קשר, או איפה למצוא כל דבר באתר.",
 chips:["מה המחירים?","מה כוללת חבילת Pro?","מה זמני האספקה?","איך יוצרים קשר?"],
 wait:"…",err:"מצטער, אירעה שגיאה. כתבו לנו בוואטסאפ.",
 wa:"פתיחת וואטסאפ",
 fallback:"אין לי תשובה מלאה לשאלה הזו במצב הדגמה. לתשובה מדויקת הכי פשוט לכתוב בוואטסאפ: 058-788-4418."}
};
const CHAT_KB=[
 {k:/tarif|prix|combien|coût|cout|₪|shekel|מחיר|כמה עולה|עלות|תעריף|כמה זה/i,
  fr:"Trois offres :\n• Starter : 1500 à 2500 ₪, puis 150 ₪ / mois\n• Vitrine Pro & Dashboard Admin : 3000 à 5000 ₪, puis 300 ₪ / mois\n• E-commerce & sur-mesure : 8000 à 17000+ ₪, puis 400 ₪ / mois minimum\nChaque page supplémentaire : 500 ₪.",
  he:"שלוש חבילות:\n• סטארטר: 1500 עד 2500 ₪, ואז 150 ₪ לחודש\n• אתר תדמית Pro ולוח ניהול: 3000 עד 5000 ₪, ואז 300 ₪ לחודש\n• חנות אונליין ופיתוח אישי: 8000 עד 17000+ ₪, ואז 400 ₪ לחודש (מינימום)\nכל עמוד נוסף: 500 ₪.",go:"offres.html"},
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
 {k:/acompte|paiement|payer|upgrade|changer d|différence|difference|propriété|code source|résili|מקדמה|תשלום|לשלם|שדרוג|מעבר בין|בעלות|קוד מקור|ביטול/i,
  fr:"Paiement : 50 % d’acompte au démarrage, 50 % à la livraison du site. Si vous changez d’offre, vous ne payez que la différence avec ce que vous avez déjà versé. Le code source vous est transféré à 100 % après paiement du solde.",
  he:"תשלום: מקדמה של 50% בתחילת העבודה ו-50% במסירת האתר. במעבר בין חבילות משלמים רק את ההפרש ממה ששולם. קוד המקור מועבר אליכם ב-100% לאחר תשלום היתרה.",go:"conditions.html"},
 {k:/page suppl|pages|עמוד נוסף|עמודים/i,
  fr:"Chaque page supplémentaire, au-delà du forfait, est facturée 500 ₪.",he:"כל עמוד נוסף מעבר למסגרת החבילה עולה 500 ₪.",go:"estimateur.html"},
 {k:/contact|whatsapp|téléphone|telephone|appeler|mail|joindre|numéro|numero|צור קשר|ליצור קשר|קשר|טלפון|וואטסאפ|מייל|אימייל|להתקשר/i,
  fr:"Vous pouvez nous écrire sur WhatsApp ou appeler le 058-788-4418, ou envoyer un e-mail à ichaysitsitbon@gmail.com. La page Contact ouvre aussi WhatsApp.",
  he:"אפשר לכתוב בוואטסאפ או להתקשר ל-058-788-4418, או לשלוח מייל ל-ichaysitsitbon@gmail.com. גם עמוד יצירת הקשר נפתח בוואטסאפ.",go:"contact.html",wa:true},
 {k:/étape|etape|comment ça se passe|comment ca se passe|processus|méthode|methode|déroul|שלבים|תהליך|איך זה עובד/i,
  fr:"4 étapes : 1) cadrage et devis avec 50 % d’acompte, 2) vous envoyez vos contenus, 3) maquette et retours sous 5 jours ouvrés, 4) mise en ligne et solde.",
  he:"4 שלבים: 1) אפיון והצעת מחיר עם מקדמה של 50%, 2) שליחת התכנים, 3) הדמיה ותיקונים תוך 5 ימי עבודה, 4) העלאה לאוויר ותשלום היתרה.",go:"methode.html"},
 {k:/où|ou se trouve|trouver|section|aller à|איפה|היכן|למצוא/i,
  fr:"Sur le site : Accueil, À propos, Offres (une page par offre), Estimateur de prix, Méthode, Conditions, Assistant et Contact. Utilisez le menu en haut ou le bouton ci-dessous.",
  he:"באתר: דף הבית, אודות, חבילות (עמוד לכל חבילה), מחשבון הערכת מחיר, תהליך העבודה, תנאים, עוזר AI ויצירת קשר. אפשר להשתמש בתפריט למעלה או בכפתור.",go:"offres.html"},
 {k:/qui êtes|qui es-tu|qui est|à propos|a propos|idanatid|מי אתה|מי אתם|אודות/i,
  fr:"Idanatid crée des sites web et des applications, avec l’IA au cœur de la démarche, pour les professionnels en Israël. Le site est géré par Ichay Sitbon.",
  he:"Idanatid בונה אתרים ואפליקציות, עם AI בלב התהליך, לעסקים בישראל. האתר מנוהל על ידי ישי סיטבון.",go:"a-propos.html"},
 {k:/^(bonjour|salut|hello|hi|hey|שלום|היי|הי)\b/i,fr:"Bonjour ! Comment puis-je vous aider ?",he:"שלום! איך אפשר לעזור?"}
];
(function(){
  const $=id=>document.getElementById(id);
  const btn=$('cbBtn'),panel=$('cbPanel'),log=$('cbLog'),form=$('cbForm'),inp=$('cbIn'),chips=$('cbChips');
  const hist=[];let busy=false;
  const T=()=>CHAT[LANG==='he'?'he':'fr'];
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
    const he=LANG==='he';
    for(const e of CHAT_KB){if(e.k.test(q)){
      const link=e.wa?{href:wa(META[he?'he':'fr'].wa),label:T().wa,ext:true}:e.go?{href:e.go,label:he?'לעבור לחלק הזה':'Aller à cette section'}:null;
      return{text:he?e.he:e.fr,link}}}
    return{text:T().fallback,link:{href:wa(META[he?'he':'fr'].wa),label:T().wa,ext:true}};
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
try{const q=new URLSearchParams(location.search).get('lang');const s=localStorage.getItem('lang');start=(q==='fr'||q==='he')?q:(s==='fr'||s==='he')?s:'he'}catch(e){}
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
