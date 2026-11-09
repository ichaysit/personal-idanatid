import re,os
SRC='/home/claude/idanatid-multipage/'
OUT='/home/claude/idanatid-v2/'
# css
open(OUT+'assets/style.css','w').write(open(OUT+'chat-old.css').read()+'\n'+open(OUT+'new.css').read())
# app.js patch
js=open(SRC+'assets/app.js').read()
a="if(window.chatLabels)window.chatLabels();"
assert a in js
js=js.replace("const slot=$('heroChat'),hero=$('top');","const slot=$('heroChat')||$('homeChat'),hero=$('top');",1)
js=js.replace(a,a+"\n  if(window.onLang)window.onLang(lang);",1)
js=js.replace("Je n’ai pas la réponse complète à cette question en mode démo. Pour un avis précis,","Je n’arrive pas à répondre pour le moment. Pour une réponse précise,")
js=js.replace("אין לי תשובה מלאה לשאלה הזו במצב הדגמה. לתשובה מדויקת","כרגע לא הצלחתי לענות. לתשובה מדויקת")
js=js.replace("try{const res=await fetch(CHAT_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({lang:LANG,messages:hist.slice(-12)})});\n        if(!res.ok)throw 0;","try{let res;for(let i=0;i<2;i++){try{res=await fetch(CHAT_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({lang:LANG,messages:hist.slice(-12)})});if(res.ok)break}catch(e){res=null}}\n        if(!res||!res.ok)throw 0;")
open(OUT+'assets/app.js','w').write(js)
LOGO='<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="currentColor" d="M5 8h8v32H5z"/><path fill="currentColor" d="M31 8l13 32h-8l-2.1-6.4h-6.8L25 40h-8z"/></svg>'
def L(k,fr,tag='a',extra=''): return fr
HEADER=f'''<header class="nav" id="nav"><div class="hd">
  <a class="brand" href="index.html" aria-label="Idanatid">{LOGO}Idanatid</a>
  <nav aria-label="Navigation principale" data-i18n-aria="navAria" data-fr-aria="Navigation principale">
    <ul id="menu">
      <li class="ov"><a href="index.html" data-i18n="pHome" data-fr="Accueil">Accueil</a></li>
      <li><a href="a-propos.html" data-i18n="nav1" data-fr="À propos">À propos</a></li>
      <li><a href="offres.html" data-i18n="nav2" data-fr="Offres &amp; tarifs">Offres &amp; tarifs</a></li>
      <li><a href="estimateur.html" data-i18n="nav6" data-fr="Estimateur">Estimateur</a></li>
      <li><a href="methode.html" data-i18n="nav3" data-fr="Méthode">Méthode</a></li>
      <li><a href="conditions.html" data-i18n="nav4" data-fr="Conditions">Conditions</a></li>
      <li class="ov"><a href="assistant.html" data-i18n="pAssist" data-fr="Assistant IA">Assistant IA</a></li>
      <li class="ov"><a class="cta" href="contact.html" data-i18n="nav5" data-fr="Me contacter">Me contacter</a></li>
    </ul>
  </nav>
  <div class="nav-end">
    <div class="lang-wrap"><label for="lang" id="langLabel">שפה</label><select class="lang" id="lang"><option value="he">עברית</option><option value="fr">Français</option></select></div>
    <a class="book" href="contact.html" data-i18n="nav5" data-fr="Me contacter">Me contacter</a>
    <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Menu"><span data-i18n="menu" data-fr="Menu">Menu</span></button>
  </div>
</div></header>'''
FONTS='<link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500&family=Heebo:wght@400;500;600&display=swap" rel="stylesheet">'
PTJS="<script>try{if(sessionStorage.getItem('pt')){document.documentElement.classList.add('pt-in');sessionStorage.removeItem('pt')}}catch(e){}</script>"
def head(t):
    h=t[:t.index('<body')]
    h=re.sub(r'<link href="https://fonts\.googleapis\.com/css2[^>]*>',FONTS,h)
    h=h.replace('</head>',PTJS+'\n</head>')
    return h
def bodytag(t): return re.search(r'<body[^>]*>',t).group(0)
IMG={'a-propos':1,'offres':2,'offre-starter':3,'offre-vitrine-pro':1,'offre-ecommerce':2,'estimateur':3,'methode':1,'conditions':2,'contact':3,'assistant':1}
CR={'a-propos':('nav1','À propos'),'offres':('nav2','Offres &amp; tarifs'),'offre-starter':('o1h','Starter'),'offre-vitrine-pro':('o2h','Vitrine Pro'),'offre-ecommerce':('o3h','E-commerce'),'estimateur':('nav6','Estimateur'),'methode':('nav3','Méthode'),'conditions':('nav4','Conditions'),'contact':('pContact','Contact'),'assistant':('pAssist','Assistant IA')}
def plate(n): return f'<div class="plate"><div class="pl"><img src="assets/ph{n}.jpg" alt=""></div></div>'
def tail(t,home=False):
    foot=re.search(r'<footer>.*',t,re.S).group(0)
    foot=foot.replace('</footer>','<div class="fwm" aria-hidden="true">IDANATID</div></footer>',1)
    foot=foot.replace('<script src="assets/app.js"></script>','<script src="assets/app.js"></script>'+('<script src="assets/home.js"></script>' if home else '')+'<script src="assets/fx.js"></script>')
    return foot
for name in IMG:
    t=open(SRC+name+'.html').read()
    m=re.search(r'<main id="main">(.*?)</main>',t,re.S).group(1)
    ph=re.search(r'<section class="page-head"><div class="wrap">(.*?)</div></section>',m,re.S).group(1)
    rest=m[m.index('</section>')+len('</section>'):]
    k,fr=CR[name]
    crumb=f'<nav class="crumb" aria-label="Fil d’Ariane"><a href="index.html" data-i18n="pHome" data-fr="Accueil">Accueil</a><span>/</span><span data-i18n="{k}" data-fr="{fr}">{fr}</span></nav>'
    page=f'<section class="ph">{plate(IMG[name])}<div class="phc">{crumb}{ph.strip()}</div></section>'
    body=bodytag(t)+'\n<div class="progress" id="progress" aria-hidden="true"></div><div id="pt" aria-hidden="true"></div><div id="cur" aria-hidden="true"></div>\n<a class="skip" href="#main" data-i18n="skip" data-fr="Aller au contenu">Aller au contenu</a>\n'+HEADER+'\n<main id="main">\n'+page+rest+'</main>\n'
    open(OUT+name+'.html','w').write(head(t)+body+tail(t))
# home
t=open(SRC+'index.html').read()
ARR='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
home=f'''<section class="hero2" id="home">
 {plate(0)}
 <h1 class="ttl" id="ttl" data-depth="-18" aria-label="Idanatid"></h1>
 <div class="hb">
  <p class="tag2" id="tag" data-depth="10"></p>
  <div class="rc">
   <div class="slider rv"><div class="glass sc" id="sc"><img id="scImg" alt=""><div><b id="scB"></b><span id="scT"></span><a id="scA" href="offres.html"><span id="cta2" style="display:inline;opacity:1;font-size:.65rem"></span></a></div></div><div class="dots2" id="scDots"><button aria-label="1"><i></i></button><button aria-label="2"><i></i></button><button aria-label="3"><i></i></button></div></div>
   <a class="glass mem rv" href="offres.html" style="transition-delay:.15s"><div class="l"><div class="v">5–30</div><div class="av"><i style="background:#5ba3e0"></i><i style="background:#f0dc9a"></i><i style="background:#8b80d4"></i><i style="background:#fff"></i></div><small id="mem"></small></div><div class="im"><img src="assets/c1.jpg" alt=""></div></a>
  </div>
 </div>
</section>
<section id="trust"><div class="wrap">
 <div class="tb"><div class="pc rv"><b>100%</b><span id="pct"></span></div><article class="bc rv" style="transition-delay:.12s"><span class="ix">#01</span><div><h3 id="bcT"></h3><p id="bcP"></p></div></article></div>
 <h2 class="gh" id="gh" aria-hidden="true"><div class="row2"><span class="gw"></span><span class="gw"></span></div><div class="row2"><span class="gw ink"></span><span class="gw"></span></div></h2>
 <div class="coach rv"><figure><img id="cI0" alt=""><img id="cI1" class="off" alt=""><figcaption><b id="cN"></b><span id="cR"></span></figcaption></figure></div>
 <div class="cc"><button class="ab ou pv" id="tp" aria-label="Previous">{ARR}</button><div class="dots2 dk" id="tDots"><button aria-label="1"><i></i></button><button aria-label="2"><i></i></button><button aria-label="3"><i></i></button></div><button class="ab so" id="tn" aria-label="Next">{ARR}</button></div>
 <div class="moreRow"><a class="btn btn-ghost" href="a-propos.html" id="more"></a></div>
</div></section>
<section id="progs"><div class="wrap"><span class="eyebrow" id="oE"></span><h2 style="margin-top:1rem;max-width:12ch" id="oT"></h2><ul class="pl2" id="pList"></ul><div class="lnk"><a class="btn btn-primary" href="offres.html" id="all"></a><a class="btn btn-ghost" href="estimateur.html" data-i18n="nav6" data-fr="Estimateur">Estimateur</a></div></div></section>
<section id="fac"><div class="wrap"><div class="fg">
 <div class="fi"><div class="ic rv"><img src="assets/c3.jpg" alt=""></div><h2 id="fT"></h2><p id="fP"></p><div class="lnk"><a class="btn btn-primary" href="methode.html" id="facB"></a></div></div>
 <div class="cd"><a class="rv" id="f1" href="estimateur.html"><img alt=""><figcaption><b></b><span></span></figcaption></a><a class="rv" id="f2" href="assistant.html" style="transition-delay:.14s"><img alt=""><figcaption><b></b><span></span></figcaption></a></div>
</div></div></section>
<section id="stats"><div class="wrap"><span class="eyebrow" id="sE"></span><h2 id="sT" style="max-width:18ch"></h2><div class="sg" id="sg"></div></div></section>
<section id="faq"><div class="wrap"><span class="eyebrow" id="qE"></span><h2 id="qT" style="margin-top:1rem;max-width:14ch"></h2><ul class="tg" id="tg"></ul><div class="lnk"><a class="btn btn-ghost" href="conditions.html" id="qAll"></a></div></div></section>
<section class="band"><div class="wrap">
  <h2 data-i18n="ctaH" data-fr="Prêt à démarrer ?">Prêt à démarrer ?</h2>
  <p data-i18n="ctaP" data-fr="Écrivez-nous sur WhatsApp, ou posez vos questions à l’assistant sur les offres, les prix et les délais.">…</p>
  <div class="row"><a class="btn btn-primary" data-wa href="contact.html" data-i18n="tB1" data-fr="Discuter sur WhatsApp">Discuter sur WhatsApp</a><a class="btn btn-ghost" href="contact.html" data-i18n="goContact" data-fr="Aller à la page Contact">Contact</a><a class="btn btn-ghost" href="assistant.html" data-i18n="goAssist" data-fr="Poser une question à l’assistant">Assistant</a></div>
</div></section>'''
ldr=f'<div id="ldr" role="status" aria-label="Loading"><div class="ld-w">{LOGO}Idanatid</div><div class="ld-t"><i></i></div></div>'
body=bodytag(t)+'\n<div class="progress" id="progress" aria-hidden="true"></div><div id="pt" aria-hidden="true"></div><div id="cur" aria-hidden="true"></div>'+ldr+'\n<a class="skip" href="#main" data-i18n="skip" data-fr="Aller au contenu">Aller au contenu</a>\n'+HEADER+'\n<main id="main">\n'+home+'\n</main>\n'
open(OUT+'index.html','w').write(head(t)+body+tail(t,True))
print('built')
