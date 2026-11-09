import re,base64,json
D='/home/claude/idanatid-v2/'
names=['index','a-propos','offres','offre-starter','offre-vitrine-pro','offre-ecommerce','estimateur','methode','conditions','contact','assistant','privacy','terms','accessibility']
def rd(f): return open(D+f).read()
idx=rd('index.html')
head=idx[:idx.index('<body')]
head=re.sub(r'<link rel="stylesheet" href="assets/style.css">','',head)
head=re.sub(r'<link rel="icon"[^>]*>','<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,'+base64.b64encode(open(D+'favicon.svg','rb').read()).decode()+'">',head)
head=re.sub(r'<script>try\{if\(sessionStorage.*?</script>\n?','',head)
head=head.replace('</head>','')
css=rd('assets/style.css')+'''
[data-l]{display:none}html[lang=he] [data-l=he],html[lang=fr] [data-l=fr],html[lang=en] [data-l=en],html[lang=ru] [data-l=ru]{display:block}
.prose{max-width:52rem}.prose h2{font-size:1.5rem;margin:2.25rem 0 .75rem;letter-spacing:-.01em}.prose p,.prose li{color:var(--soft);margin-top:.6rem}.prose ul{list-style:disc;padding-inline-start:1.4rem}.prose a{color:var(--brand);text-decoration:underline}.prose .upd{font-size:.875rem}.prose b{color:var(--ink);font-weight:500}
.pg[hidden]{display:none}
'''
bodytag=re.search(r'<body[^>]*>',idx).group(0)
HEADER=re.search(r'<header class="nav".*?</header>',idx,re.S).group(0)
tail=re.search(r'<footer>.*?</footer>',idx,re.S).group(0)
after=idx[idx.index('</footer>')+9:]
after=re.sub(r'<script src="assets/[^"]*"></script>','',after).replace('</body>','').replace('</html>','')
over=re.search(r'<div class="progress".*?<a class="skip"[^>]*>[^<]*</a>',idx,re.S).group(0)
def meta(f):
    t=rd(f);b=re.search(r'<body[^>]*>',t).group(0)
    g=lambda k:(re.search(k+'="([^"]*)"',b) or [0,''])[1]
    return g('data-t-fr'),g('data-t-he')
pgs=[]
for n in names[:-3]:
    t=rd(n+'.html')
    m=re.search(r'<main id="main">(.*?)</main>',t,re.S).group(1)
    tfr,the=meta(n+'.html')
    pgs.append(f'<div class="pg" data-page="{n}" data-t-fr="{tfr}" data-t-he="{the}"'+('' if n=='index' else ' hidden')+f'>{m}</div>')
PEN={"privacy": "Privacy policy", "terms": "Terms of use", "accessibility": "Accessibility statement"}
PRU={"privacy": "Политика конфиденциальности", "terms": "Условия использования", "accessibility": "Заявление о доступности"}
def plate(i): return f'<div class="plate"><div class="pl"><img src="assets/ph{i}.jpg" alt=""></div></div>'
for n,i,tfr,the in [('privacy',2,'Politique de confidentialité','מדיניות פרטיות'),('terms',3,'Conditions d’utilisation','תנאי שימוש'),('accessibility',1,'Déclaration d’accessibilité','הצהרת נגישות')]:
    t=rd(n+'.html');m=re.search(r'<main>(.*?)</main>',t,re.S).group(1)
    m=re.sub(r'<h1>.*?</h1>','',m)
    pgs.append(f'<div class="pg" data-page="{n}" data-t-fr="{tfr} — Idanatid" data-t-he="{the} — Idanatid" hidden><section class="ph">{plate(i)}<div class="phc"><nav class="crumb"><a href="index.html" data-i18n="pHome" data-fr="Accueil">Accueil</a><span>/</span><span data-i18n="'+({'privacy':'fpr','terms':'ftr','accessibility':'fax'}[n])+f'" data-fr="{tfr}">{tfr}</span></nav><h1><span data-l="he">{the}</span><span data-l="fr">{tfr}</span><span data-l="en">{PEN[n]}</span><span data-l="ru">{PRU[n]}</span></h1></div></section><section><div class="wrap"><div class="prose">{m}</div></div></section></div>')
main='<main id="main">'+'\n'.join(pgs)+'</main>'
html=head+'<style>'+css+'</style></head>\n'+bodytag+'\n'+over+'\n'+HEADER+'\n'+main+'\n'+tail.replace('</footer>','<div class="fwm" aria-hidden="true">IDANATID</div></footer>')+after
# links
def lk(m):
    n,q=m.group(1),m.group(2) or ''
    return 'href="#/'+('' if n=='index' else n)+q+'"'
html=re.sub(r'href="([a-z-]+)\.html(\?[^"]*)?"',lk,html)
# images
files=['ph0','ph1','ph2','ph3','c1','c2','c3','me']
IM={f'assets/{f}.jpg':'data:image/jpeg;base64,'+base64.b64encode(open(D+f'assets/{f}.jpg','rb').read()).decode() for f in files}
html=html.replace(' src="assets/',' data-s="assets/')
boot='var IMGS='+json.dumps(IM)+';document.querySelectorAll("[data-s]").forEach(function(i){i.src=IMGS[i.getAttribute("data-s")]});document.querySelectorAll("[data-reveal]").forEach(function(e){e.setAttribute("data-reveal",IMGS[e.getAttribute("data-reveal")])});'
def page_links(s):
    return re.sub(r"([\"'])([a-z-]+)\.html(\?[^\"']*)?\1",lambda m:m.group(1)+'#/'+('' if m.group(2)=='index' else m.group(2))+(m.group(3) or '')+m.group(1),s)
app=rd('assets/app.js')
DK="function dock(){if(docked&&panel.parentNode===slot)return;docked=true;slot.appendChild(panel)"
assert DK in app
app=app.replace(DK,"function dock(s){s=s||slot;if(docked&&panel.parentNode===s)return;docked=true;s.appendChild(panel)")
X="add('bot',T().hello);if(slot)dock();else{docked=true;undock()}"
assert X in app
app=page_links(app.replace(X,"add('bot',T().hello);window.__cd=dock;window.__cu=undock;docked=true;undock()"))
home=page_links(re.sub(r"'(assets/\w+\.jpg)'",r"IMGS['\1']",rd('assets/home.js')))
fx=rd('assets/fx.js').replace("if(r.bottom<0||r.top>vh)return;\n    var s=","if(!r.height||r.bottom<0||r.top>vh)return;\n    var s=")
assert "!r.height" in fx
router='''
(function(){
var NAMES=%s,pt=document.getElementById('pt'),busy=false;
function parse(){var h=location.hash.replace(/^#\\/?/,''),q='',i=h.indexOf('?');if(i>-1){q=h.slice(i+1);h=h.slice(0,i)}if(!h)h='index';return{p:NAMES.indexOf(h)>-1?h:'index',q:q}}
function title(){var el=document.querySelector('.pg:not([hidden])');if(!el)return;var l=document.documentElement.lang,t=l==='he'?el.dataset.tHe:l==='fr'?el.dataset.tFr:(window.PT&&PT[l]&&PT[l][el.dataset.page]?PT[l][el.dataset.page]+' — Idanatid':'');if(t)document.title=t}
function show(){var r=parse();document.querySelectorAll('.pg').forEach(function(e){e.hidden=e.dataset.page!==r.p});
 document.querySelectorAll('#menu a,.fcols a').forEach(function(a){var h=a.getAttribute('href')||'';var n=h.replace(/^#\\/?/,'').split('?')[0]||'index';if(n===r.p&&!a.classList.contains('cta'))a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 var m=/(?:^|&)offer=([^&]*)/.exec(r.q);if(m){var o=document.getElementById('o');if(o)o.value=m[1]}
 if(window.__cd){r.p==='assistant'?window.__cd():window.__cu()}
 title();scrollTo(0,0);window.dispatchEvent(new Event('scroll'));window.dispatchEvent(new Event('resize'));
 if(pt&&busy){busy=false;pt.classList.remove('cover');pt.classList.add('reveal')}}
document.addEventListener('click',function(e){var a=e.target.closest('a[href^="#/"]');if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey)return;
 var h=a.getAttribute('href'),cur=location.hash||'#/';if(h===cur||(h==='#/'&&!location.hash)){e.preventDefault();scrollTo({top:0,behavior:'smooth'});return}
 e.preventDefault();if(!pt||matchMedia('(prefers-reduced-motion: reduce)').matches){location.hash=h;return}
 busy=true;pt.classList.remove('reveal');pt.classList.add('cover');setTimeout(function(){location.hash=h},520)});
addEventListener('hashchange',function(){if(!busy)show();else show()});
var prev=window.onLang;window.onLang=function(l){if(prev)prev(l);title()};
show();
})();
'''%json.dumps(names)
scripts='<script>'+boot+'</script>\n<script>'+app+'</script>\n<script>'+home+'</script>\n<script>'+fx+'</script>\n<script>'+router+'</script>\n</body></html>'
out=html+scripts
open('/home/claude/idanatid-site-v10.html','w').write(out)
print(len(out)//1024,'KB')
