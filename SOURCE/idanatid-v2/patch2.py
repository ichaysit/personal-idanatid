# -*- coding: utf-8 -*-
"""Patch 2 : pages d'offres, prix, je/אני, textes HE (à lancer APRÈS patch1.py)."""
import re,json
SRC='/home/claude/idanatid-multipage/'
def rd(p): return open(p,encoding='utf-8').read()
def wr(p,s): open(p,'w',encoding='utf-8').write(s)
HE=json.load(open('/tmp/claude-0/work/he1.json',encoding='utf-8'))

COMMON_HE='בכל חבילה: מותאם לטלפון ולמחשב, עברית ו/או צרפתית, כפתור וואטסאפ, טופס יצירת קשר, הצהרת נגישות ומדיניות פרטיות.'
COMMON_FR='Dans chaque offre : adapté au téléphone et à l’ordinateur, hébreu et/ou français, bouton WhatsApp, formulaire de contact, déclaration d’accessibilité et politique de confidentialité.'
HE['oAll']=COMMON_HE
def subs(n,he_p,fr_p):
    HE[f'o{n}s']=f'מנוי: {he_p} ₪ לחודש (אחסון, אבטחה, שינויים ותמיכה) · התחייבות ל-6 חודשים'
    return f'Abonnement : {fr_p} ₪ par mois (hébergement, sécurité, modifications et support) · engagement de 6 mois'
SUB_FR={1:subs(1,150,150),2:subs(2,300,300),3:subs(3,400,400)}
DEL={1:('אספקה תוך 5-7 ימי עבודה','Livraison en 5 à 7 jours ouvrés'),2:('אספקה תוך 10-15 ימי עבודה','Livraison en 10 à 15 jours ouvrés'),3:('אספקה תוך 15-30 ימי עבודה','Livraison en 15 à 30 jours ouvrés')}
for n,(h,f) in DEL.items(): HE[f'o{n}d']=h

# (clé tier, titre he, titre fr, inc he, inc fr, [(he,fr)...])
OFFERS={
1:[
 ('o1t1','1500 ₪ · סטנדרט','1500 ₪ · Standard',None,None,[
  ('עמוד אחד שמציג את העסק בצורה ברורה: כותרת גדולה עם כפתור וואטסאפ, אודות, 3 שירותים מרכזיים ויצירת קשר','Une page unique qui présente clairement votre activité : grand titre avec bouton WhatsApp, à propos, 3 services principaux et contact'),
  ('טופס פנייה (שם, טלפון, הודעה) שמגיע ישר לוואטסאפ','Formulaire de contact (nom, téléphone, message) qui arrive directement sur WhatsApp'),
  ('נראה מעולה בטלפון ובמחשב, מאובטח (https), מוכן לגוגל ונטען מהר','Très beau sur téléphone et ordinateur, sécurisé (https), prêt pour Google et rapide à charger')]),
 ('o1t2','2000 ₪ · בינוני','2000 ₪ · Intermédiaire','כל מה שבסטנדרט, ובנוסף:','Tout le Standard, plus :',[
  ('גלריית תמונות של העבודות שלכם, עם הגדלה בלחיצה','Galerie photo de vos réalisations, avec agrandissement au clic'),
  ('המלצות של לקוחות, כדי שלקוחות חדשים יסמכו עליכם','Avis de clients, pour que les nouveaux clients vous fassent confiance')]),
 ('o1t3','2500 ₪ · פרימיום','2500 ₪ · Premium','כל מה שבבינוני, ובנוסף:','Tout l’Intermédiaire, plus :',[
  ('עיצוב מתקדם עם אנימציות שנותנות לאתר מראה יוקרתי','Design avancé avec des animations qui donnent au site un aspect haut de gamme'),
  ('קביעת תור אונליין: הלקוח בוחר יום ושעה מהאתר','Prise de rendez-vous en ligne : le client choisit un jour et une heure depuis le site'),
  ('הכנה לפרסום: חיבור לפייסבוק ואינסטגרם (Meta) ולגוגל אנליטיקס, כדי לדעת כמה פניות הגיעו מהאתר','Préparation à la publicité : connexion à Facebook et Instagram (Meta) et à Google Analytics, pour savoir combien de demandes viennent du site')])],
2:[
 ('o2t1','3000 ₪ · בסיס','3000 ₪ · Base',None,None,[
  ('אתר של 3–4 עמודים: בית, אודות, שירותים, יצירת קשר','Site de 3 à 4 pages : accueil, à propos, services, contact'),
  ('עיצוב אישי לגמרי, לא תבנית','Design entièrement personnalisé, pas un modèle'),
  ('לוח ניהול פרטי עם סיסמה: משנים לבד טקסטים ותמונות, בלי לחכות למתכנת','Tableau d’administration privé protégé par mot de passe : vous modifiez vous-même textes et images, sans attendre un développeur'),
  ('השינויים נשמרים בצורה מאובטחת','Les modifications sont enregistrées de façon sécurisée')]),
 ('o2t2','3800 ₪ · סטנדרט','3800 ₪ · Standard','כל מה שבבסיס, ובנוסף:','Tout le Base, plus :',[
  ('5 עמודים: בית, שירותים או קטלוג, אודות, המלצות, יצירת קשר','5 pages : accueil, services ou catalogue, à propos, avis, contact'),
  ('קטלוג שאתם מנהלים לבד: מוסיפים, עורכים ומוחקים נכסים, מוצרים או שירותים','Catalogue que vous gérez vous-même : vous ajoutez, modifiez et supprimez biens, produits ou services'),
  ('גלריה, מפה של העסק ומספרים מונפשים','Galerie, carte de votre entreprise et chiffres animés')]),
 ('o2t3','5000 ₪ · מתקדם','5000 ₪ · Avancé','כל מה שבסטנדרט, ובנוסף:','Tout le Standard, plus :',[
  ('6 עמודים ומעלה','6 pages et plus'),
  ('חיפוש וסינון מתקדם (לפי מחיר, קטגוריה, אזור ועוד)','Recherche et filtres avancés (par prix, catégorie, zone, etc.)'),
  ('חתימה אלקטרונית על מסמכים: הלקוח חותם באצבע בטלפון, ונשמרים תאריך, שעה וכתובת IP, עם מסמך סיכום','Signature électronique de documents : le client signe du doigt sur son téléphone, la date, l’heure et l’adresse IP sont enregistrées, avec un document récapitulatif')])],
3:[
 ('o3t1','8000 ₪ · חנות','8000 ₪ · Boutique',None,None,[
  ('חנות עם עד 20 מוצרים','Boutique jusqu’à 20 produits'),
  ('סל קניות שמחשב את הסכום בזמן אמת','Panier d’achat qui calcule le total en temps réel'),
  ('תשלום פשוט בשני שלבים, עם סליקה מאובטחת (Tranzila, CreditGuard, Hyp, Stripe)','Paiement simple en deux étapes, avec encaissement sécurisé (Tranzila, CreditGuard, Hyp, Stripe)'),
  ('לוח ניהול למלאי ולהזמנות','Tableau d’administration pour le stock et les commandes')]),
 ('o3t2','15000 ₪ · חנות מתקדמת','15000 ₪ · Boutique avancée','כל מה שבחנות, ובנוסף:','Toute la Boutique, plus :',[
  ('עד 100 מוצרים, עם מידות, צבעים וגדלים','Jusqu’à 100 produits, avec tailles, couleurs et formats'),
  ('אזור אישי ללקוחות: הרשמה, כניסה והיסטוריית הזמנות','Espace client : inscription, connexion et historique des commandes'),
  ('תזכורת אוטומטית ללקוחות שהשאירו מוצרים בסל','Rappel automatique aux clients qui ont laissé des produits dans leur panier')]),
 ('o3t3','17000+ ₪ · מערכת בהתאמה אישית','17000+ ₪ · Système sur mesure','כל מה שבחנות המתקדמת, ובנוסף:','Toute la Boutique avancée, plus :',[
  ('יותר מ-100 מוצרים, או מערכת שנבנית במיוחד בשבילכם','Plus de 100 produits, ou un système construit spécialement pour vous'),
  ('משתמשים עם הרשאות שונות (מנהל, סוכן, לקוח)','Utilisateurs avec différents droits (administrateur, agent, client)'),
  ('חתימות אלקטרוניות של כמה צדדים','Signatures électroniques de plusieurs parties'),
  ('חשבוניות PDF ומיילים אוטומטיים','Factures PDF et e-mails automatiques'),
  ('חיבור למערכות שלכם (ERP, CRM, משלוחים)','Connexion à vos systèmes (ERP, CRM, livraisons)')])],
}
def tiers_html(n):
    out='<ul class="tiers">\n'
    for key,hT,fT,hI,fI,feats in OFFERS[n]:
        HE[key+'a']=hT
        li=''
        for i,(he,fr) in enumerate(feats,1):
            HE[f'{key}f{i}']=he; li+=f'<li data-i18n="{key}f{i}">{fr}</li>'
        inc=''
        if hI: HE[key+'c']=hI; inc=f'<span class="inc" data-i18n="{key}c">{fI}</span>'
        out+=f'          <li><b data-i18n="{key}a">{fT}</b>{inc}<ul class="feat">{li}</ul></li>\n'
    return out+'        </ul>\n'
page={1:'offre-starter',2:'offre-vitrine-pro',3:'offre-ecommerce'}
for n,name in page.items():
    t=rd(SRC+name+'.html')
    a=t.index('<ul class="tiers">')
    b=min(i for i in (t.find('<ul class="incl">',a),t.find('<a class="btn',a)) if i>0)
    t=t[:a]+tiers_html(n)+'        '+t[b:]
    t=re.sub(r'<div class="sub" data-i18n="o%ds">.*?</div>'%n,
      f'<div class="sub" data-i18n="o{n}s">{SUB_FR[n]}</div>\n        <div class="sub" data-i18n="o{n}d">{DEL[n][1]}</div>\n        <p class="all" data-i18n="oAll">{COMMON_FR}</p>',t,count=1,flags=re.S)
    # fourchette de prix sans espaces
    t=t.replace('</span> – <span','</span>–<span')
    wr(SRC+name+'.html',t)

# offres.html : cartes + tableau
t=rd(SRC+'offres.html')
for n in (1,2,3):
    t=re.sub(r'<div class="sub" data-i18n="o%ds">.*?</div>'%n,f'<div class="sub" data-i18n="o{n}s">{SUB_FR[n]}</div><div class="sub" data-i18n="o{n}d">{DEL[n][1]}</div>',t,count=1,flags=re.S)
t=t.replace('1500 – 2500 ₪','1500–2500 ₪').replace('3000 – 5000 ₪','3000–5000 ₪').replace('8000 – 17000+ ₪','8000–17000+ ₪')
t=t.replace('<td data-i18n="cmpP1">1500 - 2500 ₪</td><td data-i18n="cmpP2">3000 - 5000 ₪</td><td data-i18n="cmpP3">8000 - 17000+ ₪</td>','<td data-i18n="cmpP1">1500–2500 ₪</td><td data-i18n="cmpP2">3000–5000 ₪</td><td data-i18n="cmpP3">8000–17000+ ₪</td>')
t=t.replace('<td data-i18n="cmpS3">400 ₪ minimum</td>','<td data-i18n="cmpS3">400 ₪</td>')
t=t.replace('<p class="lnk"><a class="btn btn-ghost" href="estimateur.html" data-i18n="goEst">',f'<p class="all" data-i18n="oAll">{COMMON_FR}</p><p class="lnk"><a class="btn btn-ghost" href="estimateur.html" data-i18n="goEst">',1)
assert 'cmpP1">1500–2500' in t and 'class="all"' in t
wr(SRC+'offres.html',t)
HE.update({'cmpP1':'1500–2500 ₪','cmpP2':'3000–5000 ₪','cmpP3':'8000–17000+ ₪','cmpS3':'400 ₪'})

# ---- « je » partout + phrases communes (HTML des pages)
FRREP=[
 ('Écrivez-nous sur WhatsApp, ou posez vos questions','Écrivez-moi sur WhatsApp, ou posez vos questions'),
 ('Pour un prix ferme sur une autre offre, écrivez-nous.','Pour un prix ferme sur une autre offre, écrivez-moi.'),
 ('On définit votre besoin, la formule adaptée et le prix.','Je définis avec vous votre besoin, l’offre adaptée et le prix.'),
 ('Vous avez 5 jours ouvrés pour demander des ajustements.','Vous avez 5 jours ouvrés pour réagir, avec 2 séries de corrections incluses dans chaque offre.'),
]
import glob
for f in glob.glob(SRC+'*.html'):
    s=rd(f);o=s
    for x,y in FRREP: s=s.replace(x,y)
    if s!=o: wr(f,s)
HE.update({
 'ctaP':'כתבו לי בוואטסאפ, או שאלו את העוזר על חבילות, מחירים וזמני אספקה.',
 'estNote':'ההערכה היא לחבילת אתר תדמית Pro ולוח ניהול. למחיר סופי לכל חבילה, כתבו לי.',
 's1p':'אני מגדיר איתכם את הצורך, את החבילה המתאימה ואת המחיר. אתם משלמים מקדמה של 50% כדי להתחיל.',
 's3p':'אני מציג לכם את האב-טיפוס. יש לכם 5 ימי עבודה להגיב, ובכל חבילה כלולים 2 סבבי תיקונים.',
 'lead':'Idanatid בונה דפי נחיתה, אתרי תדמית עם לוח ניהול, חנויות אונליין ואפליקציות. שאלו את העוזר החכם כאן למטה, או כתבו לי ישירות בוואטסאפ.',
 'o2i3':'עמוד נוסף: 500 ₪ לעמוד מעבר לחבילה',
 'o1s':HE['o1s'],'o2s':HE['o2s'],'o3s':HE['o3s'],
})
# prix : 1500 sans virgule/espaces dans le reste du dictionnaire hébreu
app=rd(SRC+'assets/app.js')
app=app.replace('Écrivez-nous sur WhatsApp','Écrivez-moi sur WhatsApp') # (text only in dictionary strings if any)
app=app.replace('Vous pouvez nous écrire sur WhatsApp ou appeler le 058-788-4418, ou envoyer un e-mail à','Vous pouvez m’écrire sur WhatsApp ou appeler le 058-788-4418, ou m’envoyer un e-mail à')
app=app.replace('Le site est géré par Ichay Sitbon.','Le site est géré par Ichay Sitbon, qui travaille seul.')
app=app.replace('האתר מנוהל על ידי ישי סיטבון.','האתר מנוהל על ידי ישי סיטבון, שעובד לבד.')
app=app.replace('כתבו לנו בוואטסאפ או','כתבו לי בוואטסאפ או').replace('מצטער, אירעה שגיאה. כתבו לנו בוואטסאפ.','מצטער, אירעה שגיאה. כתבו לי בוואטסאפ.')
app=app.replace('אפשר לכתוב בוואטסאפ או להתקשר ל-058-788-4418, או לשלוח מייל ל-ichaysitsitbon@gmail.com. גם עמוד','אפשר לכתוב לי בוואטסאפ או להתקשר ל-058-788-4418, או לשלוח לי מייל ל-ichaysitsitbon@gmail.com. גם עמוד')

# ---- base de connaissances du chat (démo/secours) : nouvelles règles
KB_PAY_FR='Paiement : 50 % d’acompte au démarrage (non remboursable une fois le travail commencé), 50 % à la livraison du site. Si vous changez d’offre, vous ne payez que la différence avec ce que vous avez déjà versé. Après paiement du solde, le site, le code et le design vous appartiennent à 100 %. En cas de départ, vous recevez gratuitement tous les fichiers et les accès au domaine sous 14 jours ; si vous voulez que je transfère moi-même le site chez un nouvel hébergeur, c’est un service optionnel à 500 ₪.'
KB_PAY_HE='תשלום: מקדמה של 50% בתחילת העבודה (לא מוחזרת אחרי שהעבודה התחילה) ו-50% במסירת האתר. במעבר בין חבילות משלמים רק את ההפרש ממה ששולם. אחרי תשלום היתרה האתר, הקוד והעיצוב שייכים לכם ב-100%. בעזיבה מקבלים בחינם את כל הקבצים ואת הגישות לדומיין תוך 14 יום; אם תרצו שאעביר את האתר בעצמי לספק אחסון חדש, זה שירות אופציונלי ב-500 ₪.'
KB_SUB_FR='Abonnement mensuel : 150 ₪ en Starter, 300 ₪ en Vitrine Pro, 400 ₪ en E-commerce (hébergement, sécurité, sauvegardes, modifications et support). Modifications incluses : jusqu’à 30 minutes par mois en Starter, 1 heure en Vitrine Pro, 2 heures en boutique ; le temps non utilisé n’est pas reporté ; au-delà, 150 ₪ de l’heure. Engagement de 6 mois à partir de la mise en ligne, puis résiliation par écrit avec 30 jours de préavis. Résiliation avant 6 mois : on paie les mois restants. 2 séries de corrections sur la maquette sont incluses, les suivantes coûtent 150 ₪ de l’heure.'
KB_SUB_HE='מנוי חודשי: 150 ₪ בסטארטר, 300 ₪ באתר תדמית Pro, 400 ₪ בחנות (אחסון, אבטחה, גיבויים, שינויים ותמיכה). שינויים כלולים: עד 30 דקות בחודש בסטארטר, שעה ב-Pro, שעתיים בחנות; זמן שלא נוצל לא עובר; מעבר לכך 150 ₪ לשעה. התחייבות ל-6 חודשים מיום העלאת האתר, ואחריה ביטול בכתב 30 יום מראש. ביטול לפני 6 חודשים: משלמים את החודשים שנותרו. כלולים 2 סבבי תיקונים על ההדמיה, תיקונים נוספים 150 ₪ לשעה.'
a=app.index(' {k:/acompte|paiement|payer|upgrade');b=app.index('\n',app.index('go:"conditions.html"}',a))
app=app[:a]+' {k:/acompte|paiement|payer|upgrade|changer d|différence|difference|propriété|code source|מקדמה|תשלום|לשלם|שדרוג|מעבר בין|בעלות|קוד מקור/i,\n  fr:'+json.dumps(KB_PAY_FR,ensure_ascii=False)+',\n  he:'+json.dumps(KB_PAY_HE,ensure_ascii=False)+',go:"conditions.html"},\n {k:/abonnement|mensuel|résili|resili|engagement|modification|correction|heure|מנוי|ביטול|התחייבות|תיקונ|שינויים|לשעה/i,\n  fr:'+json.dumps(KB_SUB_FR,ensure_ascii=False)+',\n  he:'+json.dumps(KB_SUB_HE,ensure_ascii=False)+',go:"conditions.html"},'+app[b:]
# tarifs / offres du chat : abonnement 400 sans « minimum », sans virgule
app=app.replace('puis 400 ₪ / mois minimum','puis 400 ₪ / mois').replace('ואז 400 ₪ לחודש (מינימום)','ואז 400 ₪ לחודש')
app=app.replace('Fr:','Fr:')
# chat : consentement à l'envoi (remplace l'ancien avis)
app=app.replace('priv:"Ne saisissez pas de données sensibles. Les messages sont traités par un fournisseur d’IA. <a href=\\"privacy.html\\">Confidentialité</a>"','priv:"Ne saisissez pas de données sensibles. Envoyer un message vaut acceptation de la <a href=\\"privacy.html\\">politique de confidentialité</a>."')
app=app.replace('priv:"אל תכתבו מידע רגיש. ההודעות מעובדות על ידי ספק AI חיצוני. <a href=\\"privacy.html\\">מדיניות פרטיות</a>"','priv:"אל תכתבו מידע רגיש. שליחת הודעה מהווה הסכמה ל<a href=\\"privacy.html\\">מדיניות הפרטיות</a>."')
assert 'vaut acceptation de la' in app and 'מהווה הסכמה ל' in app
# surcharges hébreu insérées avant la mémorisation du français
HE_JS='Object.assign(HE,'+json.dumps(HE,ensure_ascii=False)+');\n'
mark='/* On mémorise le texte français d\'origine */'
assert mark in app
app=app.replace(mark,HE_JS+mark,1)
# prix : plus de séparateurs dans les messages restants
wr(SRC+'assets/app.js',app)
json.dump(HE,open('/tmp/claude-0/work/he2.json','w'),ensure_ascii=False)
print('patch2 ok',len(HE))
