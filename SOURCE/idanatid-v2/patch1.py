# -*- coding: utf-8 -*-
"""Patch 1 : conditions, offres, prix, « je », textes HE/FR. Applique sur les sources (idempotent grâce aux .bak10)."""
import re,json,shutil,os
SRC='/home/claude/idanatid-multipage/'
V2='/home/claude/idanatid-v2/'
BAK='/home/claude/idanatid-multipage.bak10/'
# toujours repartir des sources d'origine
for f in os.listdir(BAK):
    p=BAK+f
    if os.path.isfile(p): shutil.copy(p,SRC+f)
shutil.copy(BAK+'assets/app.js',SRC+'assets/app.js')
shutil.copy('/home/claude/idanatid-v2.bak10/privacy.html',V2+'privacy.html')
shutil.copy('/home/claude/idanatid-v2.bak10/terms.html',V2+'terms.html')

HE_NEW={}   # surcharges hébreu
def rd(p): return open(p,encoding='utf-8').read()
def wr(p,s): open(p,'w',encoding='utf-8').write(s)

# ---------------------------------------------------------------- CONDITIONS
SECTIONS=[
 ('k1','תשלום','Paiement',[
  ('k1a','מקדמה של 50% לפני תחילת העבודה. אחרי שהעבודה התחילה, המקדמה אינה מוחזרת.','Acompte de 50 % avant le début des travaux. Une fois le travail commencé, l’acompte n’est pas remboursé.'),
  ('k1b','יתרה של 50% במסירת האתר (ביום העלאתו לאוויר או מסירת הגישות).','Solde de 50 % à la livraison du site (jour de la mise en ligne ou de la remise des accès).'),
  ('k1c','המנוי החודשי מתחיל ביום העלאת האתר ונגבה בתחילת כל חודש.','L’abonnement mensuel démarre le jour de la mise en ligne et est prélevé au début de chaque mois.'),
  ('k1d','עמוד נוסף מעבר לחבילה: 500 ₪ לעמוד.','Page supplémentaire au-delà de l’offre : 500 ₪ par page.')]),
 ('k2','מעבר בין חבילות','Changer d’offre',[
  ('k2a','במעבר לחבילה גבוהה יותר משלמים רק את ההפרש בין מחיר החבילה החדשה לבין מה ששולם עד כה על הבנייה. המנוי עובר לתעריף החבילה החדשה עם מסירתה.','En passant à une offre supérieure, vous payez uniquement la différence entre le prix de la nouvelle offre et ce qui a déjà été payé pour la création. L’abonnement passe au tarif de la nouvelle offre dès sa livraison.')]),
 ('k3','התכנים שלכם והזמנים','Vos contenus et les délais',[
  ('k3a','מעבירים טקסטים, לוגו ותמונות באיכות טובה תוך 7 ימים מהחתימה. זמן האספקה נספר מקבלת המקדמה והתכנים. איחור בתכנים דוחה את האספקה בהתאם.','Vous me remettez textes, logo et photos de bonne qualité sous 7 jours après la signature. Le délai de livraison court à partir de la réception de l’acompte et des contenus. Un retard sur les contenus repousse la livraison d’autant.'),
  ('k3b','בכל חבילה כלולים 2 סבבי תיקונים על ההדמיה לפני העלאה לאוויר. תיקונים נוספים: 150 ₪ לשעה.','Chaque offre inclut 2 séries de corrections sur la maquette avant la mise en ligne. Corrections supplémentaires : 150 ₪ de l’heure.'),
  ('k3c','יש לכם 5 ימי עבודה להגיב להדמיה. בלי תגובה, ההדמיה נחשבת מאושרת.','Vous avez 5 jours ouvrés pour réagir à la maquette. Sans réponse, la maquette est considérée comme validée.'),
  ('k3d','אתם אחראים לכך שהתכנים שהעברתם לא מפרים זכויות של אחרים.','Vous êtes responsable du fait que les contenus fournis ne violent pas les droits de tiers.')]),
 ('k4','בעלות על האתר','Propriété du site',[
  ('k4a','אחרי תשלום מלא של היתרה, האתר, קוד המקור, העיצוב והתכנים שנוצרו עבורכם שייכים לכם ב-100%.','Après paiement intégral du solde, le site, le code source, le design et les contenus créés pour vous vous appartiennent à 100 %.'),
  ('k4b','הדומיין נרשם על שמכם. גם חשבונות של שירותים חיצוניים (כמו מסד הנתונים של לוח הניהול) נפתחים על שמכם, ואני מקבל גישה טכנית בלבד.','Le nom de domaine est enregistré à votre nom. Les comptes de services externes (comme la base de données du tableau d’administration) sont aussi ouverts à votre nom, et je n’ai qu’un accès technique.'),
  ('k4d','רכיבים טכניים כלליים שאני משתמש בהם בכל הפרויקטים (קוד בסיס, ספריות וכלים) נשארים שלי, ואתם מקבלים רישיון שימוש קבוע בהם כחלק מהאתר.','Les composants techniques généraux que j’utilise dans tous mes projets (code de base, bibliothèques et outils) restent à moi, et vous en recevez une licence d’utilisation permanente dans le cadre du site.'),
  ('k4c','אני רשאי להציג את הפרויקט בתיק העבודות שלי ולהוסיף שורת קרדיט דיסקרטית בתחתית האתר. אפשר לבקש להסיר אותה.','Je peux présenter le projet dans mon portfolio et ajouter une discrète mention de crédit en bas du site. Vous pouvez demander de la retirer.')]),
 ('k5','מנוי וביטול','Abonnement et résiliation',[
  ('k5a','המנוי כולל אחסון, אבטחה, גיבויים, תמיכה ושינויים באתר: עד 30 דקות בחודש בחבילת סטארטר, עד שעה בחודש באתר תדמית Pro, ועד שעתיים בחודש בחנות. זמן שלא נוצל לא עובר לחודש הבא. עבודה מעבר לכך: 150 ₪ לשעה.','L’abonnement comprend l’hébergement, la sécurité, les sauvegardes, le support et les modifications du site : jusqu’à 30 minutes par mois en Starter, jusqu’à 1 heure par mois pour un site vitrine Pro, et jusqu’à 2 heures par mois pour une boutique. Le temps non utilisé n’est pas reporté au mois suivant. Au-delà : 150 ₪ de l’heure.'),
  ('k5b','התחייבות ראשונית ל-6 חודשים מיום העלאת האתר. אחרי 6 חודשים אפשר לבטל מתי שרוצים, בהודעה בכתב 30 יום מראש.','Engagement initial de 6 mois à partir de la mise en ligne. Après 6 mois, vous pouvez résilier quand vous voulez, par écrit avec 30 jours de préavis.'),
  ('k5c','ביטול לפני תום 6 החודשים: משלמים את החודשים שנותרו עד סוף ההתחייבות.','Résiliation avant la fin des 6 mois : vous payez les mois restants jusqu’à la fin de l’engagement.'),
  ('k5d','בעזיבה: תוך 14 יום מקבלים בחינם את כל קבצי האתר ואת הגישות לדומיין.','En cas de départ : sous 14 jours, vous recevez gratuitement tous les fichiers du site et les accès au domaine.'),
  ('k5e','אם תרצו שאני אעביר את האתר בעצמי לספק אחסון חדש (התקנה, חיבור הדומיין והעברת הנתונים של לוח הניהול), זה שירות אופציונלי ב-500 ₪.','Si vous souhaitez que je transfère moi-même le site vers un nouvel hébergeur (installation, connexion du domaine et transfert des données du tableau d’administration), c’est un service optionnel à 500 ₪.')]),
]
for pre,hT,fT,items in SECTIONS:
    HE_NEW[pre+'h']=hT
    for k,he,fr in items: HE_NEW[k]=he

# page Conditions (HTML français)
c=rd(SRC+'conditions.html')
def det(pre,fT,items,first=False):
    li=''.join(f'<li data-i18n="{k}">{fr}</li>' for k,he,fr in items)
    return f'<details{" open" if first else ""}><summary data-i18n="{pre}h">{fT}</summary><div><ul>{li}</ul></div></details>'
blocks=''.join(det(p,f,it,i==0) for i,(p,h,f,it) in enumerate(SECTIONS))
sig='<details><summary data-i18n="k6h">Signature électronique</summary><div><p data-i18n="k6a">Le module enregistre l’image de la signature, l’adresse IP et l’horodatage. Il vous revient de vérifier que les clauses de vos mandats respectent la législation locale en vigueur.</p></div></details>'
a=c.index('<details open>');b=c.index('</div><p class="lnk">',a)
c=c[:a]+blocks+sig+'\n    '+c[b:]
wr(SRC+'conditions.html',c)

# ---------------------------------------------------------------- TERMS (v2/terms.html) : mêmes changements, à la 1re personne
def li_he(items): return '<ul>\n'+'\n'.join(f'<li>{he}</li>' for k,he,fr in items)+'\n</ul>'
def li_fr(items): return '<ul>\n'+'\n'.join(f'<li>{fr}</li>' for k,he,fr in items)+'\n</ul>'
S={p:(h,f,it) for p,h,f,it in SECTIONS}
t=rd(V2+'terms.html')
def mk(lang):
    i=0 if lang=='he' else 1
    li=li_he if lang=='he' else li_fr
    out=''
    for p in ['k1','k2','k3','k4','k5']:
        h,f,it=S[p]; out+=f'<h2>{h if lang=="he" else f}</h2>\n'+li(it)+'\n'
    return out
# remplace le bloc "Paiement" -> avant "Signature électronique", pour chaque langue
for lang,sig_h in (('he','<h2>חתימה אלקטרונית</h2>'),('fr','<h2>Signature électronique</h2>')):
    pay='<h2>תשלום</h2>' if lang=='he' else '<h2>Paiement</h2>'
    a=t.index(pay);b=t.index(sig_h)
    t=t[:a]+mk(lang)+t[b:]
rep=[
 ('השימוש באתר מהווה הסכמה לתנאים אלה. התנאים המחייבים של כל פרויקט מפורטים בהצעת המחיר שנחתמת ביניכם לבינינו.','השימוש באתר מהווה הסכמה לתנאים אלה. התנאים המחייבים של כל פרויקט מפורטים בהצעת המחיר שנחתמת ביני לבינכם.'),
 ('איננו אחראים לתקלות','אינני אחראי לתקלות'),('שאינם בשליטתנו','שאינם בשליטתי'),
 ('Les conditions applicables à chaque projet figurent dans le devis signé entre vous et nous.','Les conditions applicables à chaque projet figurent dans le devis signé entre vous et moi.'),
 ('Nous ne sommes pas responsables des dysfonctionnements','Je ne suis pas responsable des dysfonctionnements'),('hors de notre contrôle','hors de mon contrôle'),
 ('Ce site présente les services de création de sites web et d’applications d’Idanatid (Ichay Sitbon).','Ce site présente les services de création de sites web et d’applications d’Idanatid (Ichay Sitbon, travailleur indépendant).'),
 ('עודכן לאחרונה: 5 בנובמבר 2026','עודכן לאחרונה: 6 בנובמבר 2026'),('Dernière mise à jour : 5 novembre 2026','Dernière mise à jour : 6 novembre 2026'),
]
for x,y in rep:
    assert x in t,x[:40]
    t=t.replace(x,y)
wr(V2+'terms.html',t)

# ---------------------------------------------------------------- PRIVACY (v2/privacy.html)
p=rd(V2+'privacy.html')
rep=[
 ('איננו שומרים את תוכן השיחות','אינני שומר את תוכן השיחות'),
 ('לשרת ממסר שלנו','לשרת ממסר שלי'),
 ('<li><b>העדפת שפה.</b> הבחירה בעברית או בצרפתית נשמרת בדפדפן שלכם (localStorage) ואינה נשלחת אלינו.</li>','<li><b>עוגיות ואחסון מקומי.</b> האתר משתמש באחסון המקומי של הדפדפן (localStorage) כדי לזכור את בחירת השפה (עברית או צרפתית) ואת העובדה שאישרתם את ההודעה על עוגיות. המידע נשאר במכשיר שלכם ואינו נשלח אליי. אפשר למחוק אותו בכל עת דרך הגדרות הדפדפן.</li>'),
 ('<h2>למה אנחנו משתמשים במידע</h2>','<h2>למה אני משתמש במידע</h2>'),
 ('איננו מוכרים מידע אישי','איני מוכר מידע אישי'),
 ('<p>לפי חוק הגנת הפרטיות, התשמ״א-1981, אתם רשאים לעיין במידע עליכם, לבקש לתקן אותו או למחוק אותו. פנו אלינו בדוא״ל או בטלפון.</p>','<p>לפי חוק הגנת הפרטיות, התשמ״א-1981, אתם רשאים לעיין במידע עליכם, לבקש לתקן אותו או למחוק אותו.</p>\n<h2>איך מבקשים מחיקת מידע</h2>\n<p>כתבו לי ל-ichaysitsitbon@gmail.com, בוואטסאפ או בטלפון 058-788-4418, וציינו איזה מידע למחוק (למשל: הודעה שנשלחה בוואטסאפ או בדוא״ל). אמחק אותו ואאשר לכם, אלא אם החוק מחייב אותי לשמור אותו. מידע שנשמר בדפדפן שלכם (שפה, אישור עוגיות) אפשר למחוק בעצמכם בהגדרות הדפדפן.</p>'),
 ('נעדכן מסמך זה','אעדכן מסמך זה'),
 ('האתר מופעל על ידי Idanatid (ישי סיטבון), שירותי בניית אתרים ואפליקציות.','האתר מופעל על ידי Idanatid (ישי סיטבון, עצמאי), שירותי בניית אתרים ואפליקציות.'),
 ('שרת ממסר שלי (Supabase','שרת ממסר שלי (Supabase') if False else ('עודכן לאחרונה: 5 בנובמבר 2026','עודכן לאחרונה: 6 בנובמבר 2026'),
 ('Nous ne conservons pas','Je ne conserve pas'),('nos serveurs','mes serveurs'),('selon nos obligations légales','selon mes obligations légales'),('לשרתים שלנו','לשרתים שלי'),('à notre relais','à mon relais'),
 ('<li><b>Préférence de langue.</b> Votre choix hébreu / français est enregistré dans votre navigateur (localStorage) et ne nous est pas transmis.</li>','<li><b>Cookies et stockage local.</b> Le site utilise le stockage local de votre navigateur (localStorage) pour mémoriser votre choix de langue (hébreu ou français) et le fait que vous avez pris connaissance de l’avis sur les cookies. Ces données restent sur votre appareil et ne me sont pas transmises. Vous pouvez les supprimer à tout moment dans les réglages de votre navigateur.</li>'),
 ('<h2>Pourquoi nous utilisons ces données</h2>','<h2>Pourquoi j’utilise ces données</h2>'),
 ('Nous ne vendons pas de données personnelles.','Je ne vends pas de données personnelles.'),
 ('Ce site est exploité par Idanatid (Ichay Sitbon), services','Ce site est exploité par Idanatid (Ichay Sitbon, travailleur indépendant), services'),
 ('<p>Conformément à la loi israélienne sur la protection de la vie privée (1981), vous pouvez consulter les données qui vous concernent, demander leur correction ou leur suppression. Contactez-nous par e-mail ou par téléphone.</p>','<p>Conformément à la loi israélienne sur la protection de la vie privée (1981), vous pouvez consulter les données qui vous concernent, demander leur correction ou leur suppression.</p>\n<h2>Comment demander la suppression de vos données</h2>\n<p>Écrivez-moi à ichaysitsitbon@gmail.com, sur WhatsApp ou appelez le 058-788-4418, en précisant les données à supprimer (par exemple : un message envoyé sur WhatsApp ou par e-mail). Je les supprime et je vous le confirme, sauf si la loi m’oblige à les conserver. Les données enregistrées dans votre navigateur (langue, avis sur les cookies) peuvent être supprimées par vous-même dans les réglages du navigateur.</p>'),
 ('Nous mettrons ce document à jour','Je mettrai ce document à jour'),
 ('Dernière mise à jour : 5 novembre 2026','Dernière mise à jour : 6 novembre 2026'),
]
for x,y in rep:
    if x in p: p=p.replace(x,y)
    else: print('PRIVACY MISS',x[:50])
# nous/אנו résiduels
for m in re.findall(r'[^.<>]{0,30}(?:\bnous\b|\bnotre\b|אנו|שלנו|אלינו)[^.<>]{0,30}',p): print('RESIDU privacy:',m)
wr(V2+'privacy.html',p)

json.dump(HE_NEW,open('/tmp/claude-0/work/he1.json','w'),ensure_ascii=False)
print('patch1 ok',len(HE_NEW))
