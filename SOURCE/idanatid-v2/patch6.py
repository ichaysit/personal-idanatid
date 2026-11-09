# -*- coding: utf-8 -*-
# Amélioration visuelle : police Rubik auto-hébergée (hébreu, cyrillique, latin), cartes, pied de page, bouton de chat.
import base64,re
V='/home/claude/idanatid-v2/'
G='/tmp/claude-0/gf/'
def rd(f): return open(V+f,encoding='utf-8').read()
def wr(f,s): open(V+f,'w',encoding='utf-8').write(s)
def b64(n): return base64.b64encode(open(G+n,'rb').read()).decode()

# 1. plus de Google Fonts
b=rd('build2.py')
b=re.sub(r"FONTS='<link href=\"https://fonts\.googleapis\.com[^']*'","FONTS=''",b)
wr('build2.py',b)

# 2. CSS
c=rd('new.css')
i=c.find("@font-face{font-family:'Rubik'")
if i>-1: c=c[:i].rstrip()+'\n'
if True:
    ff=''
    for n,u in (('latin','U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AA,U+20AC,U+2122,U+2190-2193,U+2212'),('cyr','U+0301,U+0400-045F,U+0490-0491,U+2116'),('heb','U+0590-05FF,U+200C-2010,U+FB1D-FB4F')):
        ff+="@font-face{font-family:'Rubik';font-style:normal;font-weight:300 600;font-display:swap;src:url(data:font/woff;base64,%s) format('woff');unicode-range:%s}\n"%(b64('rubik-%s.woff'%n),u)
    css=ff+'''/*p6*/
body{font-family:'Rubik',system-ui,-apple-system,'Segoe UI',Roboto,'Noto Sans Hebrew',sans-serif;font-optical-sizing:auto;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
h1,h2,h3,.ttl,.tag2,.price,.gh{font-feature-settings:"kern","liga";font-weight:500}
.ttl{letter-spacing:-.035em}
@media(min-width:640px){.ttl{font-size:10.2vw}[lang=en] .ttl{font-size:7.8vw}[lang=ru] .ttl{font-size:6.3vw}}
.lead,.sub,.muted{font-weight:300;letter-spacing:.005em}
.card{border:1px solid var(--hair);transition:transform .45s cubic-bezier(.2,.8,.2,1),box-shadow .45s,border-color .3s}
.card:hover{border-color:#c4d4e2;box-shadow:0 18px 40px -24px rgba(20,34,56,.45)}
.card .price{font-variant-numeric:tabular-nums;letter-spacing:-.04em}
.card .go,.card .lnk{font-weight:500}
.card::before{content:"";position:absolute;inset-inline:1.75rem;top:0;height:3px;border-radius:0 0 3px 3px;background:linear-gradient(90deg,#3070b0,#90d5e8,#efdea0);opacity:.0;transition:opacity .4s}
.card:hover::before{opacity:1}
.cmp{font-variant-numeric:tabular-nums}
.cmp tbody tr{transition:background .25s}
@media(hover:hover){.cmp tbody tr:hover{background:#f6f9fb}}
.btn{font-weight:500;letter-spacing:.005em}
.btn-primary{transition:transform .3s cubic-bezier(.2,.8,.2,1),box-shadow .3s,background .3s}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 28px -14px rgba(20,34,56,.6)}
.btn:focus-visible,a:focus-visible,button:focus-visible,select:focus-visible,input:focus-visible,textarea:focus-visible{outline:3px solid #3070b0;outline-offset:3px;border-radius:.6rem}
footer .wrap{padding-bottom:5rem}
.fwm{font-size:6.2rem;bottom:-.9rem;color:rgba(255,255,255,.035)}
@media(min-width:900px){footer .wrap{padding-bottom:6.5rem}.fwm{font-size:8.5rem;bottom:-1.4rem}}
@media(min-width:1024px){.cb-btn{height:2.75rem;padding:0 1.15rem;font-size:.8rem}}
.card p,.card li,.card .sub{font-weight:400}
.crumb{letter-spacing:.14em}
'''
    c+='\n'+css
    wr('new.css',c)

# 3. politique de confidentialité : plus de Google Fonts
p=rd('privacy.html')
rep=[("ופונטים נטענים מ-Google Fonts. לכן כתובת ה-IP שלכם מגיעה לספקים אלה כמו בכל גלישה באתר.","והפונטים נשלחים מהאתר עצמו, בלי בקשה לשרת חיצוני. כתובת ה-IP שלכם מגיעה לספק האירוח כמו בכל גלישה באתר."),
("les polices sont chargées depuis Google Fonts. Votre adresse IP parvient donc à ces prestataires, comme lors de toute navigation.","les polices sont servies par le site lui-même, sans requête vers un service externe. Votre adresse IP parvient à l’hébergeur, comme lors de toute navigation."),
("the fonts are loaded from Google Fonts. Your IP address therefore reaches these providers, as with any browsing.","the fonts are served by the site itself, with no request to an outside service. Your IP address reaches the host, as with any browsing."),
("шрифты загружаются из Google Fonts. Поэтому ваш IP-адрес попадает к этим поставщикам, как при любом посещении сайта.","шрифты отдаёт сам сайт, без запросов к внешним сервисам. Ваш IP-адрес попадает к хостинг-провайдеру, как при любом посещении сайта.")]
for a,bb in rep: p=p.replace(a,bb)
wr('privacy.html',p)
print('patch6 ok')
