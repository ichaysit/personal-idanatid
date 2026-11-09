# -*- coding: utf-8 -*-
# Ajoute l'anglais et le russe (idempotent). Source des textes : tr_en.py, tr_ru.py, kb_i18n.py
import re,json,sys
sys.path.insert(0,'/home/claude/idanatid-v2')
import tr_en,tr_ru,kb_i18n
V='/home/claude/idanatid-v2/'
SRC='/home/claude/idanatid-multipage/'
def rd(f): return open(V+f,encoding='utf-8').read()
def wr(f,s): open(V+f,'w',encoding='utf-8').write(s)
def rep(s,a,b,must=True):
    if a not in s:
        if must: raise SystemExit('introuvable: '+a[:80])
        return s
    return s.replace(a,b)
J=lambda o: json.dumps(o,ensure_ascii=False)

# ---------- app.js ----------
a=open(SRC+'assets/app.js',encoding='utf-8').read()
if '/*p5*/' not in a:
    TX={'en':tr_en.K,'ru':tr_ru.K}
    ins='/*p5*/const TX='+J(TX)+';\nconst CHAT_X='+J({'en':tr_en.CHAT,'ru':tr_ru.CHAT})+';\nconst META_X='+J({'en':tr_en.META,'ru':tr_ru.META})+';\nwindow.PT='+J({'en':tr_en.PT,'ru':tr_ru.PT})+';\nconst KB_X='+J(kb_i18n.KB)+';\nconst LANGS=["he","fr","en","ru"];\nconst tx=(l,k,fb)=>l==="he"?HE[k]:l==="fr"?fb:(TX[l][k]!==undefined?TX[l][k]:fb);\n'
    a=rep(a,"/* On mémorise le texte français d'origine */",ins+"/* On mémorise le texte français d'origine */")
    a=rep(a,"const NAME=LANG==='he'?CONFIG.nameHe:CONFIG.nameFr;\n  document.querySelectorAll('[data-name]')","const NAME=LANG==='he'?CONFIG.nameHe:LANG==='fr'?CONFIG.nameFr:META[LANG].name;\n  document.querySelectorAll('[data-name]')")
    a=rep(a,"const M=META[lang],he=lang==='he',NAME=he?CONFIG.nameHe:CONFIG.nameFr;","if(LANGS.indexOf(lang)<0)lang='he';LANG=lang;\n  const M=META[lang],he=lang==='he';")
    a=rep(a,"el.innerHTML=he?HE[el.dataset.i18n]:el.dataset.fr}","el.innerHTML=tx(lang,el.dataset.i18n,el.dataset.fr)}")
    a=rep(a,"el.setAttribute('aria-label',he?HE[el.dataset.i18nAria]:el.dataset.frAria)}","el.setAttribute('aria-label',tx(lang,el.dataset.i18nAria,el.dataset.frAria))}")
    a=rep(a,"const T0=B.tHe?(he?B.tHe:B.tFr):\"Idanatid\"+M.title, D0=B.dHe?(he?B.dHe:B.dFr):M.desc;","const hf=(lang==='he'||lang==='fr');const T0=(B.tHe&&hf)?(he?B.tHe:B.tFr):\"Idanatid\"+M.title, D0=(B.dHe&&hf)?(he?B.dHe:B.dFr):M.desc;")
    a=rep(a,"ol.content=he?'he_IL':'fr_FR'","ol.content=({he:'he_IL',fr:'fr_FR',en:'en_US',ru:'ru_RU'})[lang]")
    a=rep(a,"oa.content=he?'fr_FR':'he_IL'","oa.content=he?'fr_FR':'he_IL'")
    # META en/ru
    a=rep(a,"const META = {","const META = {\n  en:null,ru:null,")
    a=rep(a,"Object.assign(HE,{\"nav6\"","Object.assign(META,META_X);\nObject.assign(HE,{\"nav6\"") if False else a
    # formulaire
    a=rep(a,"""  const txt = LANG==='he'
    ? "שלום, שמי "+v('n')+" ("+v('t')+").\\nחבילה: "+offer+".\\n\\n"+v('m')
    : "Bonjour, je m’appelle "+v('n')+" ("+v('t')+").\\nOffre : "+offer+".\\n\\n"+v('m');""",
"""  const txt = LANG==='he'
    ? "שלום, שמי "+v('n')+" ("+v('t')+").\\nחבילה: "+offer+".\\n\\n"+v('m')
    : LANG==='en' ? "Hello, my name is "+v('n')+" ("+v('t')+").\\nOffer: "+offer+".\\n\\n"+v('m')
    : LANG==='ru' ? "Здравствуйте, меня зовут "+v('n')+" ("+v('t')+").\\nПредложение: "+offer+".\\n\\n"+v('m')
    : "Bonjour, je m’appelle "+v('n')+" ("+v('t')+").\\nOffre : "+offer+".\\n\\n"+v('m');""")
    # chat
    a=rep(a,"const T=()=>CHAT[LANG==='he'?'he':'fr'];","Object.assign(CHAT,CHAT_X);\n  const T=()=>CHAT[LANG];")
    a=rep(a,"""    const he=LANG==='he';
    for(const e of CHAT_KB){if(e.k.test(q)){
      const link=e.wa?{href:wa(META[he?'he':'fr'].wa),label:T().wa,ext:true}:e.go?{href:e.go,label:he?'לעבור לחלק הזה':'Aller à cette section'}:null;
      return{text:he?e.he:e.fr,link}}}
    return{text:T().fallback,link:{href:wa(META[he?'he':'fr'].wa),label:T().wa,ext:true}};""",
"""    const GO={he:'לעבור לחלק הזה',fr:'Aller à cette section',en:'Go to this section',ru:'Перейти в этот раздел'};
    for(let i=0;i<CHAT_KB.length;i++){const e=CHAT_KB[i];if(e.k.test(q)||(KB_X[i]&&new RegExp(KB_X[i].k2,'i').test(q))){
      const link=e.wa?{href:wa(META[LANG].wa),label:T().wa,ext:true}:e.go?{href:e.go,label:GO[LANG]}:null;
      const x=KB_X[i];return{text:LANG==='he'?e.he:LANG==='fr'?e.fr:(x&&x[LANG])||e.fr,link}}}
    return{text:T().fallback,link:{href:wa(META[LANG].wa),label:T().wa,ext:true}};""")
    a=rep(a,"start=(q==='fr'||q==='he')?q:(s==='fr'||s==='he')?s:'he'","start=(LANGS.indexOf(q)>-1)?q:(LANGS.indexOf(s)>-1)?s:'he'")
    a=a.replace("/*p5*/","/*p5*/",1)
    open(SRC+'assets/app.js','w',encoding='utf-8').write(a)
# META en/ru: les objets sont ajoutés après la définition de META
a=open(SRC+'assets/app.js',encoding='utf-8').read()
if 'Object.assign(META,META_X)' not in a:
    a=rep(a,"/* On mémorise le texte français d'origine */","Object.assign(META,META_X);\n/* On mémorise le texte français d'origine */")
    a=rep(a,"const META = {\n  en:null,ru:null,","const META = {")
    open(SRC+'assets/app.js','w',encoding='utf-8').write(a)

# ---------- home.js ----------
h=rd('assets/home.js')
if '/*p5*/' not in h:
    h=rep(h,"L=function(){return document.documentElement.lang==='he'?'he':'fr'};","L=function(){var l=document.documentElement.lang;return l==='he'||l==='en'||l==='ru'?l:'fr'};")
    walker="/*p5*/var TRD="+J({'en':tr_en.D,'ru':tr_ru.D})+";\n(function w(o){if(!o||typeof o!=='object')return;if(!Array.isArray(o)&&o.fr!==undefined&&o.he!==undefined){var arr=Array.isArray(o.fr),k=arr?o.fr.join('|'):o.fr;['en','ru'].forEach(function(l){var v=TRD[l][k];if(v===undefined){o[l]=o.fr;window.__miss=(window.__miss||[]).concat(l+':'+k)}else o[l]=arr?v.split('|'):v});return}Object.keys(o).forEach(function(k){w(o[k])})})(D);\n"
    h=rep(h,"var sI=0,tI=0,READY=false;",walker+"var sI=0,tI=0,READY=false;")
    wr('assets/home.js',h)

# ---------- fx.js (cookies) ----------
f=rd('assets/fx.js')
if "en:{p:" not in f:
    f=rep(f,"fr:{p:'Ce site utilise","en:{p:%s,b:%s,l:%s,a:%s},\nru:{p:%s,b:%s,l:%s,a:%s},\nfr:{p:'Ce site utilise"%tuple(["'"+x.replace("'","\\'")+"'" for x in (tr_en.CK['p'],tr_en.CK['b'],tr_en.CK['l'],tr_en.CK['a'],tr_ru.CK['p'],tr_ru.CK['b'],tr_ru.CK['l'],tr_ru.CK['a'])]))
    f=f.replace("function lang(){return root.lang==='fr'?'fr':'he'}","function lang(){return T[root.lang]?root.lang:'he'}")
    wr('assets/fx.js',f)

# ---------- build2.py : sélecteur ----------
b=rd('build2.py')
if 'value="en"' not in b:
    b=rep(b,'<option value="fr" lang="fr">Français</option></select>','<option value="fr" lang="fr">Français</option><option value="en" lang="en">English</option><option value="ru" lang="ru">Русский</option></select>')
    wr('build2.py',b)

# ---------- bundle.py : CSS légal + titres ----------
g=rd('bundle.py')
if 'data-l=en' not in g:
    g=rep(g,"html[lang=he] [data-l=he],html[lang=fr] [data-l=fr]{display:block}","html[lang=he] [data-l=he],html[lang=fr] [data-l=fr],html[lang=en] [data-l=en],html[lang=ru] [data-l=ru]{display:block}")
    g=rep(g,"var he=document.documentElement.lang==='he';var t=he?el.dataset.tHe:el.dataset.tFr;if(t)document.title=t",
            "var l=document.documentElement.lang,t=l==='he'?el.dataset.tHe:l==='fr'?el.dataset.tFr:(window.PT&&PT[l]&&PT[l][el.dataset.page]?PT[l][el.dataset.page]+' — Idanatid':'');if(t)document.title=t")
    g=rep(g,'<h1><span data-l="he">{the}</span><span data-l="fr">{tfr}</span></h1>','<h1><span data-l="he">{the}</span><span data-l="fr">{tfr}</span><span data-l="en">{PEN[n]}</span><span data-l="ru">{PRU[n]}</span></h1>')
    g=rep(g,"def plate(i):","PEN="+J({k:tr_en.PT[k] for k in ('privacy','terms','accessibility')})+"\nPRU="+J({k:tr_ru.PT[k] for k in ('privacy','terms','accessibility')})+"\ndef plate(i):")
    wr('bundle.py',g)

# ---------- pages légales ----------
for n in ('privacy','terms','accessibility'):
    t=rd(n+'.html')
    if 'data-l="en"' not in t:
        blk='<div data-l="en">\n'+tr_en.LEGAL[n]+'\n</div>\n<div data-l="ru">\n'+tr_ru.LEGAL[n]+'\n</div>\n'
        t=rep(t,'</main>',blk+'</main>')
        t=t.replace('html[lang="he"] [data-l="he"],html[lang="fr"] [data-l="fr"]{display:block}','html[lang="he"] [data-l="he"],html[lang="fr"] [data-l="fr"],html[lang="en"] [data-l="en"],html[lang="ru"] [data-l="ru"]{display:block}')
        wr(n+'.html',t)
print('patch5 ok')

# ---------- CSS anglais / russe ----------
c=rd('new.css')
if '/*p5b*/' not in c:
    c+='\n/*p5b*/.ttl .w,.tag2 .w{padding-top:.22em;margin-top:-.22em}select.lang{min-width:6.4rem;text-overflow:clip}@media(min-width:640px){[lang=en] .ttl{font-size:8.6vw}[lang=ru] .ttl{font-size:6.9vw}}@media(min-width:900px){#menu a{white-space:nowrap}[lang=ru] #menu{gap:1.1rem}}[lang=ru] .phc h1,[lang=en] .phc h1{overflow-wrap:anywhere}\n'
    wr('new.css',c)
