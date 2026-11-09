# -*- coding: utf-8 -*-
# Logo en couleurs dans l'en-tête, barre du haut agrandie, couleurs du logo sur certains textes.
import re
V='/home/claude/idanatid-v2/'
rd=lambda f:open(V+f,encoding='utf-8').read()
def wr(f,s): open(V+f,'w',encoding='utf-8').write(s)
LOGO=('<svg class="logo" viewBox="143 593 463 414" aria-hidden="true" focusable="false">'
 '<rect x="143" y="593" width="94" height="414" fill="#90d5e8"/>'
 '<path d="M453 593L606 1007H517L453 810L390 1007H301Z" fill="#8f82d6"/>'
 '<path d="M453 593L494 707H412Z" fill="#efdea0"/>'
 '<path d="M390 1007L453 810V1007Z" fill="#3070b0"/></svg>')
b=rd('build2.py')
b=re.sub(r"^LOGO=.*$","LOGO='"+LOGO+"'",b,flags=re.M)
b=b.replace('aria-label="Idanatid">{LOGO}Idanatid</a>','aria-label="Idanatid">{LOGO}<span>Idanatid</span></a>')
wr('build2.py',b)
c=rd('new.css');i=c.find('/*p7*/')
if i>-1: c=c[:i].rstrip()+'\n'
c+='''
/*p7*/
:root{--vio:#8f82d6;--vio-d:#6f62c4;--sun:#efdea0;--sky:#90d5e8}
.brand{gap:.65rem;font-size:1.2rem;letter-spacing:.14em}
.brand svg.logo{width:2.35rem;height:2.1rem;flex:none;color:inherit;filter:drop-shadow(0 2px 10px rgba(8,16,36,.35))}
.brand span{line-height:1}
header.nav .hd{padding-top:1.5rem}
.lang{height:2.9rem;min-height:2.9rem;font-size:.85rem;padding:0 1rem}
.menu-btn{width:2.9rem;height:2.9rem}
.book{font-size:.85rem}
@media(min-width:900px){
 header.nav .hd{padding:2.1rem 2.5rem 0;gap:1.5rem}
 .brand{gap:.9rem;font-size:1.85rem;letter-spacing:.13em}
 .brand svg.logo{width:3.5rem;height:3.15rem}
 #menu:not(.open){font-size:1rem;gap:1.6rem}
 .lang{height:3.2rem;min-height:3.2rem;font-size:.95rem}
 .menu-btn{width:3.2rem;height:3.2rem}
 .book{font-size:.95rem}
 [lang=ru] #menu:not(.open){gap:1.1rem;font-size:.95rem}
}
@media(min-width:640px){[lang=fr] .ttl{font-size:7vw}}
@media(max-width:450px){.brand{font-size:1.05rem;letter-spacing:.1em}.brand svg.logo{width:2.05rem;height:1.85rem}.lang{min-width:5.6rem;padding:0 .6rem}}
#menu a[aria-current=page]{text-decoration-color:var(--sun);text-decoration-thickness:2px}
.mem .v{color:var(--sun)}
.gh .gw.ink{color:var(--vio-d)}
.steps li:before,.sg .v{color:var(--vio-d)}
.vals strong{color:var(--vio-d)}
#progs .eyebrow,#stats .eyebrow,#demos .eyebrow,#faq .eyebrow,#fac .eyebrow{color:var(--vio-d)}
#progs .eyebrow:before,#stats .eyebrow:before,#demos .eyebrow:before,#faq .eyebrow:before,#fac .eyebrow:before{background:var(--vio)}
.card .price,.pl2 .pr{color:var(--vio-d)}
.card.main .price,.detail .offer .price{color:var(--sun)}
.tiers .inc{color:var(--sky)}
.result dt.total+dd{color:var(--sun)}
.fcols h4{color:var(--sky)}
.fcols a:hover{color:var(--sun)}
.band .btn-primary:hover{background:var(--sun)}
'''
wr('new.css',c)
print('patch7 ok')
