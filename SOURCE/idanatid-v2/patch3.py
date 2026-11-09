# -*- coding: utf-8 -*-
"""Patch 3 : home.js, template d'accueil, photo, démos, compteurs, cookies, accessibilité, bundle (lancer après patch1+patch2)."""
import re,json,shutil
V2='/home/claude/idanatid-v2/';B2='/home/claude/idanatid-v2.bak10/';SRC='/home/claude/idanatid-multipage/'
def rd(p): return open(p,encoding='utf-8').read()
def wr(p,s): open(p,'w',encoding='utf-8').write(s)
for f in ['fx.js','home.js']: shutil.copy(B2+'assets/'+f,V2+'assets/'+f)
for f in ['new.css','build2.py','bundle.py']: shutil.copy(B2+f,V2+f)
def sub(s,x,y,cnt=1):
    assert x in s,'MANQUE: '+x[:70]
    return s.replace(x,y,cnt)

# ============================================================== SRC : photo sur À propos + Contact
t=rd(SRC+'a-propos.html')
t=sub(t,'<section class="about"><div class="wrap"><div class="rv d1">\n      <h2 data-i18n="abH">','<section class="about"><div class="wrap"><div class="rv d1">\n      <div class="ab-head"><figure class="me"><img src="assets/me.jpg" alt="ישי סיטבון" width="720" height="720"></figure>\n      <h2 data-i18n="abH">')
t=sub(t,'créateur de sites web.</h2>','créateur de sites web.</h2></div>')
wr(SRC+'a-propos.html',t)
t=rd(SRC+'contact.html')
t=sub(t,'<div class="direct">\n        <a class="btn btn-wa"','<div class="direct">\n        <span class="me-s"><img src="assets/me.jpg" alt="ישי סיטבון" width="720" height="720"></span>\n        <a class="btn btn-wa"')
wr(SRC+'contact.html',t)

# ============================================================== SRC app.js : og:locale + clés d'interface
app=rd(SRC+'assets/app.js')
app=sub(app,"  document.querySelector('meta[property=\"og:title\"]').content=T0;","  document.querySelector('meta[property=\"og:title\"]').content=T0;\n  const ol=document.querySelector('meta[property=\"og:locale\"]');if(ol)ol.content=he?'he_IL':'fr_FR';\n  const oa=document.querySelector('meta[property=\"og:locale:alternate\"]');if(oa)oa.content=he?'fr_FR':'he_IL';")
UI={'fax':'הצהרת נגישות','ckT':'האתר משתמש בעוגיות ובאחסון מקומי כדי לזכור את השפה וההעדפות שלכם.','ckB':'הבנתי','ckL':'מדיניות פרטיות'}
mark="/* On mémorise le texte français d'origine */"
app=sub(app,mark,'Object.assign(HE,'+json.dumps(UI,ensure_ascii=False)+');\n'+mark)
wr(SRC+'assets/app.js',app)

# ============================================================== home.js
h=rd(V2+'assets/home.js')
h=sub(h,"t:{he:'מ-1,500 ₪',fr:'Dès 1 500 ₪'}","t:{he:'מ-1500 ₪',fr:'Dès 1500 ₪'}")
h=sub(h,"p:'1 500 – 2 500 ₪'","p:'1500–2500 ₪'");h=sub(h,"p:'3 000 – 5 000 ₪'","p:'3000–5000 ₪'");h=sub(h,"p:'8 000 – 17 000+ ₪'","p:'8000–17000+ ₪'")
# « je »
h=sub(h,"facT:{he:['כך','אנחנו','עובדים'],fr:['Notre','façon','de travailler']}","facT:{he:['כך','אני','עובד'],fr:['Ma','façon','de travailler']}")
h=sub(h,"facP:{he:'מדברים, מתכננים, בונים ומעלים לאוויר. בכל שלב אתם יודעים מה קורה, כמה זה עולה ומתי זה מוכן.',fr:'On discute, on planifie, on construit, on met en ligne. À chaque étape, vous savez ce qui se passe, combien cela coûte et quand ce sera prêt.'}","facP:{he:'אני מדבר איתכם, מתכנן, בונה ומעלה לאוויר. בכל שלב אתם יודעים מה קורה, כמה זה עולה ומתי זה מוכן.',fr:'Je discute avec vous, je planifie, je construis, je mets en ligne. À chaque étape, vous savez ce qui se passe, combien cela coûte et quand ce sera prêt.'}")
# FAQ : 4 cartes
a=h.index(" faq:[");b=h.index(" qAll:")
FAQ=''' faq:[{q:{he:'כמה משלמים ומתי? חצי בהתחלה וחצי כשהאתר עולה לאוויר. כל התנאים כתובים מראש.',fr:'Combien et quand payer ? La moitié au départ et la moitié quand le site est en ligne. Toutes les conditions sont écrites à l’avance.'},n:{he:'תשלום',fr:'Paiement'},r:{he:'הכול כתוב מראש',fr:'Tout est écrit à l’avance'}},{q:{he:'רוצים לשדרג חבילה בהמשך? משלמים רק את ההפרש.',fr:'Envie de passer à l’offre supérieure plus tard ? Vous ne payez que la différence.'},n:{he:'שדרוג',fr:'Évolution'},r:{he:'משלמים רק את ההפרש',fr:'Seule la différence se paie'}},{q:{he:'האתר שלכם. אחרי התשלום המלא הוא שייך לכם, ואם תעזבו תקבלו את כל הקבצים בחינם.',fr:'Le site est à vous. Après le paiement intégral, il vous appartient, et si vous partez vous recevez tous les fichiers gratuitement.'},n:{he:'בעלות',fr:'Propriété'},r:{he:'100% שלכם',fr:'100 % à vous'}},{q:{he:'150 ₪ לחודש בסטארטר, 300 ₪ ב-Pro: אחסון, אבטחה, שינויים ותמיכה. התחייבות ל-6 חודשים, ואחר כך מבטלים מתי שרוצים.',fr:'150 ₪ par mois en Starter, 300 ₪ en Pro : hébergement, sécurité, modifications et support. Engagement de 6 mois, puis vous résiliez quand vous voulez.'},n:{he:'מנוי',fr:'Abonnement'},r:{he:'בלי הפתעות',fr:'Sans surprise'}}],
'''
h=h[:a]+FAQ+h[b:]
# démos + interface
h=sub(h," qAll:{he:'לכל התנאים'",''' dE:{he:'הדגמות',fr:'Démonstrations'},dT:{he:'עיצובים לדוגמה',fr:'Designs d’exemple'},
 dN:{he:'עיצובים שהכנתי כהדגמה לעסקים מקומיים. השמות והתמונות לדוגמה בלבד.',fr:'Des designs que j’ai préparés en démonstration pour des commerces locaux. Les noms et les images sont donnés à titre d’exemple uniquement.'},
 demos:[{im:null,t:{he:'עיצוב לדוגמה 1',fr:'Design d’exemple 1'}},{im:null,t:{he:'עיצוב לדוגמה 2',fr:'Design d’exemple 2'}},{im:null,t:{he:'עיצוב לדוגמה 3',fr:'Design d’exemple 3'}},{im:null,t:{he:'עיצוב לדוגמה 4',fr:'Design d’exemple 4'}}],
 dSoon:{he:'צילום מסך יתווסף כאן',fr:'Capture d’écran à venir'},
 ui:{prev:{he:'הקודם',fr:'Précédent'},next:{he:'הבא',fr:'Suivant'},pause:{he:'השהיית הסיבוב האוטומטי',fr:'Mettre en pause le défilement automatique'},play:{he:'הפעלת הסיבוב האוטומטי',fr:'Reprendre le défilement automatique'},slide:{he:'שקופית {n} מתוך 3',fr:'Diapositive {n} sur 3'}},
 qAll:{he:'לכל התנאים\'''')
# rendu : démos, libellés accessibles, compteurs
h=sub(h," $('qE').textContent=D.qE[l];"," var dg=$('dg');$('dE').textContent=D.dE[l];$('dT').textContent=D.dT[l];$('dN').textContent=D.dN[l];dg.innerHTML='';D.demos.forEach(function(d,i){var li=document.createElement('li');li.className='rv';li.style.transitionDelay=i*90+'ms';li.innerHTML='<figure class=\"dm\"><div class=\"bar\" aria-hidden=\"true\"><i></i><i></i><i></i></div>'+(d.im?'<img src=\"'+d.im+'\" alt=\"'+d.t[l]+'\" loading=\"lazy\">':'<div class=\"ph\"><span>'+D.dSoon[l]+'</span></div>')+'<figcaption>'+d.t[l]+'</figcaption></figure>';dg.appendChild(li);io.observe(li)});\n a11y();\n $('qE').textContent=D.qE[l];")
h=sub(h,"d.innerHTML='<div class=\"v\"><span class=\"cnt\" data-v=\"'+s.v+'\">0</span>'+s.s+'</div><div class=\"l\">'+s.l[l]+'</div>';sg.appendChild(d);io.observe(d)});","d.innerHTML='<div class=\"v\"><span class=\"cnt\" data-v=\"'+s.v+'\">'+s.v+'</span>'+s.s+'</div><div class=\"l\">'+s.l[l]+'</div>';sg.appendChild(d);io.observe(d);co.observe(d)});")
# l'animation des compteurs ne remplace plus jamais la valeur finale
h=sub(h," document.querySelectorAll('.cnt').forEach(function(el){var b=el.getBoundingClientRect(),pp=Math.min(1,Math.max(0,(vh-b.top)/(vh/2+b.height/2)));el.textContent=Math.round(pp*(+el.dataset.v))})}","}")
h=sub(h,"var io=new IntersectionObserver(",'''var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
function cnt(el){var v=+el.dataset.v;if(RM||!window.requestAnimationFrame){el.textContent=v;return}
 var t0=0,dur=1100,done=false;function fin(){if(done)return;done=true;el.textContent=v}
 setTimeout(fin,dur+500);el.textContent=0;
 requestAnimationFrame(function st(t){if(done)return;if(!t0)t0=t;var p=Math.min(1,(t-t0)/dur);el.textContent=Math.round(v*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(st);else fin()})}
var co=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var c=e.target.querySelector('.cnt');if(c&&!c.dataset.ran){c.dataset.ran='1';cnt(c)}co.unobserve(e.target)}})},{threshold:.4});
var io=new IntersectionObserver(''')
# carrousel : pause / précédent / suivant accessibles, mouvement réduit
h=sub(h,"setInterval(function(){if(READY&&!document.hidden){sI=(sI+1)%3;slide(false)}},3800);",'''var PAUSED=RM;
function sGo(n){sI=(n+3)%3;slide(false)}
setInterval(function(){if(READY&&!document.hidden&&!PAUSED&&!(($('sc')||{}).matches&&$('sc').matches(':hover'))){sGo(sI+1)}},3800);
function a11y(){var l=L(),u=D.ui;
 var p=$('scPrev'),n=$('scNext'),z=$('scPause');
 if(p){p.setAttribute('aria-label',u.prev[l]);n.setAttribute('aria-label',u.next[l]);z.setAttribute('aria-label',PAUSED?u.play[l]:u.pause[l]);z.setAttribute('aria-pressed',PAUSED?'true':'false')}
 [].forEach.call(document.querySelectorAll('#scDots button'),function(b,i){b.setAttribute('aria-label',u.slide[l].replace('{n}',i+1))});
 [].forEach.call(document.querySelectorAll('#tDots button'),function(b,i){b.setAttribute('aria-label',u.slide[l].replace('{n}',i+1))});
 var tp=$('tp'),tn=$('tn');if(tp){tp.setAttribute('aria-label',u.prev[l]);tn.setAttribute('aria-label',u.next[l])}}
if($('scPrev')){$('scPrev').onclick=function(){sGo(sI-1)};$('scNext').onclick=function(){sGo(sI+1)};$('scPause').onclick=function(){PAUSED=!PAUSED;this.classList.toggle('is-p',PAUSED);a11y()}}
if(RM&&$('scPause'))$('scPause').classList.add('is-p');''')
# état courant des points (aria-current)
h=sub(h,"b.classList.toggle('on',i===sI)})}\n if(now)","b.classList.toggle('on',i===sI);b.setAttribute('aria-current',i===sI?'true':'false')})}\n if(now)") if "b.classList.toggle('on',i===sI)})}\n if(now)" in h else h
wr(V2+'assets/home.js',h)

# ============================================================== build2.py : gabarit accueil, pied de page, langues
b=rd(V2+'build2.py')
b=sub(b,'<div class="dots2" id="scDots"><button aria-label="1"><i></i></button><button aria-label="2"><i></i></button><button aria-label="3"><i></i></button></div></div>',
 '<div class="dots2" id="scDots"><button aria-label="1"><i></i></button><button aria-label="2"><i></i></button><button aria-label="3"><i></i></button></div>'
 '<div class="sctl" role="group" aria-label="Carousel"><button type="button" class="pv" id="scPrev"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg></button>'
 '<button type="button" id="scPause" aria-pressed="false"><svg class="i-pa" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><rect x="7" y="5" width="3.5" height="14" rx="1"/><rect x="13.5" y="5" width="3.5" height="14" rx="1"/></svg><svg class="i-pl" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M8 5l11 7-11 7z"/></svg></button>'
 '<button type="button" id="scNext"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></button></div></div>')
b=sub(b,'<section id="faq">','<section id="demos"><div class="wrap"><span class="eyebrow" id="dE"></span><h2 id="dT" style="margin-top:1rem;max-width:14ch"></h2><ul class="dg" id="dg"></ul><p class="dn" id="dN"></p></div></section>\n<section id="faq">')
b=sub(b,'<h2 class="gh" id="gh" aria-hidden="true">','<h2 class="gh" id="gh" aria-hidden="true">')  # sanity
b=sub(b,'Écrivez-nous sur WhatsApp, ou posez vos questions','Écrivez-moi sur WhatsApp, ou posez vos questions')
b=sub(b,'<option value="he">עברית</option><option value="fr">Français</option>','<option value="he" lang="he">עברית</option><option value="fr" lang="fr">Français</option>')
b=sub(b,'    foot=foot.replace(\'</footer>\'','    foot=foot.replace(\'<a href="terms.html" data-i18n="ftr">Conditions d’utilisation</a>\',\'<a href="terms.html" data-i18n="ftr">Conditions d’utilisation</a><a href="accessibility.html" data-i18n="fax">Déclaration d’accessibilité</a>\')\n    foot=foot.replace(\'</footer>\'')
b=sub(b,'<button class="ab ou pv" id="tp" aria-label="Previous">','<button class="ab ou pv" id="tp" aria-label="Previous" type="button">') if '<button class="ab ou pv" id="tp" aria-label="Previous">' in b else b
wr(V2+'build2.py',b)

# ============================================================== bundle.py : pages spéciales (accessibilité) + photo
g=rd(V2+'bundle.py')
g=sub(g,"'privacy','terms']","'privacy','terms','accessibility']")
g=sub(g,"for n in names[:-2]:","for n in names[:-3]:")
g=sub(g,"[('privacy',2,'Politique de confidentialité','מדיניות פרטיות'),('terms',3,'Conditions d’utilisation','תנאי שימוש')]:","[('privacy',2,'Politique de confidentialité','מדיניות פרטיות'),('terms',3,'Conditions d’utilisation','תנאי שימוש'),('accessibility',1,'Déclaration d’accessibilité','הצהרת נגישות')]:")
g=sub(g,"'fpr' if n=='privacy' else 'ftr'","{'privacy':'fpr','terms':'ftr','accessibility':'fax'}[n]")
g=sub(g,"files=['ph0','ph1','ph2','ph3','c1','c2','c3']","files=['ph0','ph1','ph2','ph3','c1','c2','c3','me']")
g=sub(g,"IM={f'assets/{f}.jpg'","IM={f'assets/{f}.jpg'")
wr(V2+'bundle.py',g)

# ============================================================== page « הצהרת נגישות »
A='''<div data-l="he">
<h1>הצהרת נגישות</h1>
<p class="upd">עודכן לאחרונה: 6 בנובמבר 2026</p>
<p>אני רוצה שכל אדם יוכל להשתמש באתר Idanatid, כולל אנשים עם מוגבלות. האתר נבנה בשאיפה לעמוד בתקן הישראלי ת״י 5568, המבוסס על הנחיות WCAG 2.0, ברמה AA. הצהרה זו מתארת מה נעשה ומהן המגבלות שאני מכיר. האתר לא נבדק עד כה על ידי גורם חיצוני מוסמך.</p>
<h2>מה נעשה</h2>
<ul>
<li>אפשר לנווט בכל האתר עם המקלדת בלבד, יש קישור «דלגו לתוכן», ומסגרת מיקוד גלויה על כל כפתור, קישור ושדה.</li>
<li>מבנה כותרות סמנטי, תוויות לכל שדות הטפסים, וקביעה נכונה של שפת העמוד (עברית או צרפתית) ושל כיוון הכתיבה.</li>
<li>ניגודיות בין טקסט לרקע שנבדקה ותוקנה ברוב האתר, וטקסט חלופי לתמונות משמעותיות.</li>
<li>קרוסלות ומחוונים עם כפתורי הקודם, הבא והשהיה שאפשר להפעיל גם במקלדת.</li>
<li>האתר מכבד את ההגדרה «הפחתת תנועה» של מכשירכם: הרקע המונפש, הסיבוב האוטומטי ואנימציות הספירה מושבתים.</li>
<li>האתר מותאם לטלפון ולמחשב, ואפשר להגדיל את הטקסט בדפדפן עד 200% בלי לאבד תוכן.</li>
<li>לא הוספתי תוסף נגישות בשכבה עליונה. הנגישות נבנתה בקוד האתר עצמו.</li>
</ul>
<h2>מגבלות ידועות</h2>
<ul>
<li>הרקע המונפש משנה צבעים עם הזמן. ברגעים מסוימים הניגודיות בין הטקסט לרקע עלולה להיות נמוכה מהנדרש.</li>
<li>העוזר החכם (צ׳אט) מבוסס על שירות חיצוני, ותשובותיו נוצרות אוטומטית. ייתכן שהוא לא יהיה נגיש במלואו לכל קורא מסך.</li>
<li>שירותים חיצוניים שהאתר מפנה אליהם, כמו וואטסאפ, כפופים לנגישות שלהם.</li>
<li>האתר לא נבדק באופן מקיף עם כל קוראי המסך והדפדפנים.</li>
</ul>
<h2>פנייה בנושא נגישות</h2>
<p>נתקלתם בבעיה, או צריכים את התוכן בצורה אחרת? אשמח לדעת ולתקן. אפשר לפנות אליי: ישי סיטבון, טלפון 058-788-4418, דוא״ל ichaysitsitbon@gmail.com. ציינו את כתובת העמוד ואת הבעיה שנתקלתם בה, ואחזור אליכם בהקדם.</p>
</div>
<div data-l="fr">
<h1>Déclaration d’accessibilité</h1>
<p class="upd">Dernière mise à jour : 6 novembre 2026</p>
<p>Je souhaite que chacun puisse utiliser le site Idanatid, y compris les personnes en situation de handicap. Le site est conçu dans le but de respecter la norme israélienne SI 5568, fondée sur les directives WCAG 2.0, au niveau AA. Cette déclaration décrit ce qui a été fait et les limites que je connais. Le site n’a pas, à ce jour, été vérifié par un organisme extérieur agréé.</p>
<h2>Ce qui a été fait</h2>
<ul>
<li>Tout le site peut être parcouru au clavier seul, avec un lien « Aller au contenu » et un contour de focus bien visible sur chaque bouton, lien et champ.</li>
<li>Structure de titres sémantique, libellés sur tous les champs de formulaire, et langue de la page (hébreu ou français) et sens d’écriture correctement indiqués.</li>
<li>Contraste entre texte et fond vérifié et corrigé sur la plus grande partie du site, et textes alternatifs pour les images porteuses de sens.</li>
<li>Carrousels et curseurs avec boutons précédent, suivant et pause utilisables au clavier.</li>
<li>Le site respecte le réglage « réduire les animations » de votre appareil : fond animé, défilement automatique et compteurs animés sont désactivés.</li>
<li>Le site s’adapte au téléphone et à l’ordinateur, et le texte peut être agrandi jusqu’à 200 % dans le navigateur sans perte de contenu.</li>
<li>Je n’ai pas ajouté de module d’accessibilité en surcouche : l’accessibilité est construite dans le code du site lui-même.</li>
</ul>
<h2>Limites connues</h2>
<ul>
<li>Le fond animé change de couleurs au fil du temps. À certains moments, le contraste entre le texte et le fond peut être inférieur à ce qui est requis.</li>
<li>L’assistant IA (chat) repose sur un service externe et ses réponses sont générées automatiquement. Il peut ne pas être entièrement accessible à tous les lecteurs d’écran.</li>
<li>Les services externes vers lesquels le site renvoie, comme WhatsApp, dépendent de leur propre accessibilité.</li>
<li>Le site n’a pas été testé de façon exhaustive avec tous les lecteurs d’écran et navigateurs.</li>
</ul>
<h2>Demande d’accessibilité</h2>
<p>Vous avez rencontré un problème, ou vous avez besoin d’un contenu sous une autre forme ? Je serai heureux de le savoir et de le corriger. Contact : Ichay Sitbon, téléphone 058-788-4418, e-mail ichaysitsitbon@gmail.com. Indiquez l’adresse de la page et le problème rencontré, et je reviens vers vous dès que possible.</p>
</div>
'''
wr(V2+'accessibility.html','<!DOCTYPE html><html lang="he"><head><meta charset="utf-8"><title>הצהרת נגישות — Idanatid</title></head><body><main>\n'+A+'</main></body></html>')

# ============================================================== fx.js : bandeau cookies discret (remplace la fenêtre bloquante)
f=rd(V2+'assets/fx.js')
a=f.index(";(function(){var K='idn_cookies_ok'")
BANNER=r'''/* Bandeau cookies : petit, en bas, ne bloque rien et ne verrouille pas le défilement */
;(function(){var K='idn_cookies_ok';function ok(){try{return localStorage.getItem(K)==='1'}catch(e){return false}}
var T={he:{p:'האתר משתמש בעוגיות ובאחסון מקומי כדי לזכור את השפה וההעדפות שלכם.',b:'הבנתי',l:'מדיניות פרטיות',a:'הודעה על עוגיות'},
fr:{p:'Ce site utilise des cookies et un stockage local pour mémoriser votre langue et vos préférences.',b:'J’ai compris',l:'Politique de confidentialité',a:'Avis sur les cookies'}};
var d,root=document.documentElement;
function lang(){return root.lang==='fr'?'fr':'he'}
function size(){if(d)root.style.setProperty('--ckh',d.offsetHeight+'px')}
function fill(){if(!d)return;var x=T[lang()];d.setAttribute('aria-label',x.a);d.querySelector('span').textContent=x.p+' ';d.querySelector('a').textContent=x.l;d.querySelector('button').textContent=x.b;size()}
function init(){if(ok())return;d=document.createElement('div');d.id='ck';d.setAttribute('role','region');
d.innerHTML='<p><span></span><a href="#/privacy"></a></p><button type="button"></button>';
document.body.appendChild(d);root.classList.add('ck-on');fill();
d.querySelector('button').addEventListener('click',function(){try{localStorage.setItem(K,'1')}catch(e){}root.classList.remove('ck-on');root.style.removeProperty('--ckh');d.remove();d=null});
var o=window.onLang;window.onLang=function(){o&&o.apply(this,arguments);fill()};addEventListener('resize',size);setInterval(fill,1500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init()})();
'''
# garde ce qui suit le bloc cookies d'origine (rien d'autre n'est attendu après)
end=f.index("if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init()})();",a)+len("if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init()})();")
f=f[:a]+BANNER+f[end:]
wr(V2+'assets/fx.js',f)

# ============================================================== new.css
c=rd(V2+'new.css')
lines=[l for l in c.split('\n') if not (l.startswith('#ck') or l.startswith('html.ck-lock'))]
c='\n'.join(lines)
c+='''
/* ===== bandeau cookies discret ===== */
#ck{position:fixed;z-index:9990;inset-inline:.75rem;bottom:.75rem;max-width:44rem;margin-inline:auto;display:flex;flex-wrap:wrap;align-items:center;gap:.6rem 1rem;justify-content:space-between;padding:.7rem 1rem;border-radius:1.1rem;background:rgba(15,26,51,.96);color:#fff;border:1px solid rgba(160,205,240,.28);box-shadow:0 14px 40px rgba(0,0,0,.4);font-size:.875rem;line-height:1.5}
#ck p{margin:0;flex:1 1 16rem;color:#e6eefb}#ck a{color:#9fd4ff;text-decoration:underline;white-space:nowrap}
#ck button{min-height:2.5rem;padding:0 1.4rem;border:0;border-radius:999px;background:#fff;color:#142238;font:inherit;font-weight:600;cursor:pointer}
#ck button:hover{background:var(--light)}
html.ck-on body{padding-bottom:var(--ckh,0)}
html.ck-on .cb-btn{bottom:calc(var(--ckh,0px) + 1.5rem)}
html.ck-on .cb-panel.float{bottom:calc(var(--ckh,0px) + 5.5rem)}
/* ===== focus visible partout ===== */
a:focus-visible,button:focus-visible,select:focus-visible,input:focus-visible,textarea:focus-visible,summary:focus-visible,[tabindex]:focus-visible{outline:3px solid #fff!important;outline-offset:2px!important;box-shadow:0 0 0 6px #142238!important;border-radius:.5rem}
/* ===== photo À propos / Contact ===== */
.ab-head{display:flex;align-items:center;gap:1.25rem;margin-bottom:1.5rem}
.ab-head h2{margin:0!important}
.me{flex:none;width:6.5rem;aspect-ratio:1;border-radius:1.25rem;overflow:hidden;border:2px solid var(--hair);background:var(--surface);box-shadow:0 10px 30px -12px rgba(20,34,56,.35)}
.me img{width:100%;height:100%;object-fit:cover;object-position:50% 25%}
@media(min-width:640px){.ab-head{gap:2rem}.me{width:11rem;border-radius:1.75rem}}
@media(min-width:1024px){.me{width:13rem}}
.me-s{flex:none;width:3.5rem;height:3.5rem;border-radius:50%;overflow:hidden;border:2px solid var(--hair);background:var(--surface)}
.me-s img{width:100%;height:100%;object-fit:cover;object-position:50% 22%}
.direct{align-items:center}
/* ===== offres : lignes d'abonnement / commun ===== */
.card .sub+.sub,.offer .sub+.sub{margin-top:.25rem}
.offer .all,.all{margin-top:1.25rem;font-size:.9rem;line-height:1.6;max-width:44rem;color:rgba(255,255,255,.88)}
.tbl+.all,.cards~.all{color:var(--soft);margin-top:1.5rem}
/* ===== démos ===== */
#demos{padding-block:4rem;background:var(--surface);border-radius:var(--rl);margin-top:.75rem}
.dg{margin-top:2.5rem;display:grid;gap:1.25rem;grid-template-columns:minmax(0,1fr)}
@media(min-width:640px){.dg{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(min-width:1024px){.dg{grid-template-columns:repeat(4,minmax(0,1fr))}}.dg>li{min-width:0}.dm .ph{height:auto;min-height:0}
.dm{margin:0;border-radius:1.1rem;overflow:hidden;background:#fff;border:1px solid var(--hair);box-shadow:0 12px 30px -18px rgba(20,34,56,.4)}
.dm .bar{display:flex;gap:.3rem;padding:.55rem .75rem;background:var(--deep)}.dm .bar i{width:.5rem;height:.5rem;border-radius:50%;background:rgba(255,255,255,.4)}
.dm .ph,.dm img{display:grid;place-items:center;aspect-ratio:16/10;width:100%;object-fit:cover;background:linear-gradient(135deg,#dbe9f5,#e9e4f8)}
.dm .ph span{font-size:.8rem;color:var(--soft);padding:.5rem;text-align:center}
.dm figcaption{padding:.7rem .9rem;font-size:.9rem;font-weight:500;color:var(--ink)}
.dn{margin-top:1.75rem;color:var(--soft);font-size:.95rem;max-width:40rem}
/* ===== FAQ : 4 cartes ===== */
@media(min-width:640px){.tg{grid-template-columns:repeat(2,1fr)}}@media(min-width:1100px){.tg{grid-template-columns:repeat(4,1fr)}}
/* ===== carrousel : commandes ===== */
.sctl{display:flex;gap:.5rem;align-items:center}
.sctl button{width:2.5rem;height:2.5rem;display:grid;place-items:center;border-radius:50%;background:rgba(255,255,255,.2);backdrop-filter:blur(8px);color:#fff}
.sctl button:hover{background:rgba(255,255,255,.35)}.sctl svg{width:1.1rem;height:1.1rem}
[dir=rtl] .sctl .pv svg,[dir=rtl] #scNext svg{transform:scaleX(-1)}
#scPause .i-pl{display:none}#scPause.is-p .i-pl{display:block}#scPause.is-p .i-pa{display:none}
/* ===== lisibilité : ombre portée du texte sur fond animé, bandeau compact mobile ===== */
.phc h1,.phc .lead,.phc .crumb,.hero2 .hb,#ttl,#tag{text-shadow:0 1px 16px rgba(8,16,36,.7),0 0 2px rgba(8,16,36,.5)}
.plate:after{background:radial-gradient(22rem 22rem at var(--mx,50%) var(--my,40%),rgba(143,211,232,.14),transparent 70%),linear-gradient(to bottom,rgba(15,32,56,.62),rgba(15,32,56,.36) 45%,rgba(15,32,56,.82))!important}
.ab-head h2{font-size:clamp(1.5rem,6.2vw,3rem)}
@media(max-width:639px){#ck{font-size:.8rem;padding:.6rem .8rem;gap:.4rem .6rem}#ck button{min-height:2.25rem;padding:0 1.1rem}}
'''
wr(V2+'new.css',c)
print('patch3 ok')
