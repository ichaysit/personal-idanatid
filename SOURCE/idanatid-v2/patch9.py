# -*- coding: utf-8 -*-
# Bloc "Un site construit avec vous" sur À propos et Offres (idempotent). Après patch8.
import re,json
SRC='/home/claude/idanatid-multipage/'
J=lambda o:json.dumps(o,ensure_ascii=False)
FR={"wH":"Un site construit avec vous",
"w1":"Chaque projet commence par une conversation. Je prends le temps de comprendre votre activité, vos clients et ce que vous voulez voir en ligne. Ensuite nous construisons ensemble le site qui vous correspond, étape après étape, de la première idée jusqu’à la mise en ligne.",
"w2":"Les prix du site donnent un cadre clair. À l’intérieur, tout se règle sur vous : les pages, les fonctions, le style, les mots. Vous restez au centre du projet et je reste à vos côtés à chaque étape. Votre réussite compte pour moi, et je veux que vous soyez fier de votre site."}
HE={"wH":"אתר שנבנה איתכם",
"w1":"כל פרויקט מתחיל בשיחה. אני לוקח את הזמן להבין את העסק שלכם, את הלקוחות שלכם ואת מה שאתם רוצים לראות באתר. אחר כך אנחנו בונים ביחד את האתר שהכי מתאים לכם, שלב אחרי שלב, מהרעיון הראשון ועד העלייה לאוויר.",
"w2":"המחירים באתר נותנים מסגרת ברורה. בתוכה הכול מותאם אליכם: העמודים, הפונקציות, העיצוב והמילים. אתם במרכז, ואני לצידכם בכל שלב. חשוב לי שתצליחו ושתהיו גאים באתר שלכם."}
EN={"wH":"A site built with you",
"w1":"Every project starts with a conversation. I take the time to understand your business, your customers and what you want to see online. Then we build together the site that fits you, step by step, from the first idea to launch day.",
"w2":"The prices on this site give a clear frame. Inside it, everything is shaped around you: the pages, the features, the style, the words. You stay at the centre of the project and I stay by your side at every stage. Your success matters to me, and I want you to be proud of your site."}
RU={"wH":"Сайт, который мы строим вместе",
"w1":"Каждый проект начинается с разговора. Я не спешу и стараюсь понять ваш бизнес, ваших клиентов и то, что вы хотите увидеть в интернете. Затем мы вместе строим сайт, который подходит именно вам, шаг за шагом, от первой идеи до запуска.",
"w2":"Цены на этом сайте задают понятные рамки. Внутри них всё подстраивается под вас: страницы, функции, стиль, слова. Вы остаётесь в центре проекта, а я рядом на каждом этапе. Ваш успех важен для меня, и я хочу, чтобы вы гордились своим сайтом."}
SEC='<!--p9--><section class="pour"><div class="wrap"><div class="rv"><span class="eyebrow">Idanatid</span><h2 data-i18n="wH">%s</h2><p data-i18n="w1">%s</p><p data-i18n="w2">%s</p></div></div></section><!--/p9-->'%(FR['wH'],FR['w1'],FR['w2'])
for fn,anchor in (('a-propos.html','<section class="band">'),('offres.html',None)):
    s=open(SRC+fn,encoding='utf-8').read()
    s=re.sub(r'<!--p9-->.*?<!--/p9-->','',s,flags=re.S)
    if anchor:
        i=s.find(anchor)
    else:
        i=s.find('</main>')
    assert i>0,fn
    s=s[:i]+SEC+s[i:]
    open(SRC+fn,'w',encoding='utf-8').write(s)
f=SRC+'assets/app.js'
s=open(f,encoding='utf-8').read()
s=re.sub(r'/\*p9\*/[^\n]*\n','',s)
line='/*p9*/Object.assign(HE,%s);Object.assign(TX.en,%s);Object.assign(TX.ru,%s);\n'%(J(HE),J(EN),J(RU))
t=s.find('const tx=');s=s[:t]+line+s[t:]
open(f,'w',encoding='utf-8').write(s)
c=open('/home/claude/idanatid-v2/new.css',encoding='utf-8').read()
i=c.find('/*p9*/')
if i>=0:c=c[:i]
c+='''/*p9*/
.pour{padding:4rem 0}.pour .rv{max-width:46rem}.pour h2{text-wrap:balance;margin:1rem 0 1.25rem;font-size:clamp(1.8rem,4vw,2.8rem);line-height:1.1}
.pour p{font-size:1.05rem;line-height:1.7;margin-bottom:1rem;color:var(--soft)}
.pour .eyebrow{color:var(--vio-d)}
'''
open('/home/claude/idanatid-v2/new.css','w',encoding='utf-8').write(c)
print('p9 ok')
# ---- accueil : même bloc, juste avant la section confiance ----
b=open('/home/claude/idanatid-v2/build2.py',encoding='utf-8').read()
b=re.sub(r'<!--p9-->.*?<!--/p9-->','',b,flags=re.S)
k='<section id="trust">'
assert k in b
b=b.replace(k,SEC+k,1)
open('/home/claude/idanatid-v2/build2.py','w',encoding='utf-8').write(b)
