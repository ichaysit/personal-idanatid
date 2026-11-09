# -*- coding: utf-8 -*-
# Calculateur de prix complet (idempotent). Après patch5 et patch7.
import re,json,sys
sys.path.insert(0,'/home/claude/idanatid-v2')
import calc_i18n as C
V='/home/claude/idanatid-v2/'
SRC='/home/claude/idanatid-multipage/'
def J(o): return json.dumps(o,ensure_ascii=False)

# ---------- 1. HTML de la page estimateur ----------
h=open(SRC+'estimateur.html',encoding='utf-8').read()
opts=''.join('<option value="%d" data-s="%d" data-g="%d" data-i18n="cO%d">%s</option>'%(v,s,g,i+1,C.FR['cO%d'%(i+1)])
  for i,(v,s,g) in enumerate([(1500,150,1),(2000,150,1),(2500,150,1),(3000,300,2),(3800,300,2),(5000,300,2),(8000,400,3),(15000,400,3),(17000,400,3)]))
def step(idm,idp,ido,lab,labkey,lm,lp,mk,pk):
    return ('<div class="field"><label id="%s" data-i18n="%s">%s</label><div class="stepper" role="group" aria-labelledby="%s">'
    '<button type="button" id="%s" aria-label="%s" data-i18n-aria="%s">−</button><output id="%s" aria-live="polite">0</output>'
    '<button type="button" id="%s" aria-label="%s" data-i18n-aria="%s">+</button></div></div>')%('lb'+ido,labkey,lab,'lb'+ido,idm,lm,mk,ido,idp,lp,pk)
rows=[('r1','Offre','r-base'),('r2','Pages en plus','r-extra'),('r3','Création','r-total'),('r4','Acompte au démarrage (50 %)','r-dep'),
('r5','Solde à la mise en ligne','r-bal'),('r6','Abonnement mensuel','r-sub'),('r7','Heures de support en plus (par mois)','r-hrs'),
('r8','Total mensuel','r-mon'),('r9','Engagement initial de 6 mois (abonnement)','r-six'),('r10','Création + 6 mois d’abonnement','r-all'),
('r11','Frais d’export en cas de départ','r-exp'),('r12','Délai de livraison','r-dl')]
dl=''
for k,t,i in rows:
    cls=' class="total"' if k=='r3' else (' class="tot2"' if k in('r8','r10') else '')
    hid=' hidden' if k=='r11' else ''
    extra=' style="direction:inherit"' if k=='r12' else ''
    dl+='<dt%s%s id="%s-t" data-i18n="%s">%s</dt><dd%s%s id="%s"></dd>'%(cls,hid,i,k,t,hid,extra,i)
block=('<div class="calc rv" id="estimateur">\n      <div>\n        <h3 data-i18n="cH">Estimez votre projet</h3>\n'
 '        <div class="field"><label for="tier" data-i18n="cL1">Offre</label><select id="tier">'+opts.replace('value="3800"','value="3800" selected',1) if False else '')
block=('<div class="calc rv" id="estimateur">\n      <div>\n        <h3 data-i18n="cH">Estimez votre projet</h3>\n'
 '        <div class="field"><label for="tier" data-i18n="cL1">Offre</label><select id="tier">'+opts+'</select></div>\n        '
 +step('minus','plus','pages','Pages supplémentaires (500 ₪ l’une)','cL2','Retirer une page','Ajouter une page','minus','plus')
 +step('hminus','hplus','hours','Heures de support en plus chaque mois (150 ₪ l’heure)','cL3','Retirer une heure','Ajouter une heure','hMinus','hPlus')
 +'<div class="field"><label class="ck2" for="exp"><input type="checkbox" id="exp"><span data-i18n="cL4">Prévoir l’export du site chez un autre hébergeur si je pars (500 ₪)</span></label></div>\n      </div>\n'
 '      <div class="result" aria-live="polite"><dl>'+dl+'</dl></div>\n    </div>')
a=h.find('<div class="calc rv" id="estimateur">'); b=h.find('<p class="note-s"',a)
assert a>0 and b>0
# garder le </div> final: on remplace jusqu'au <p class="note-s" (le bloc finit par </div> juste avant)
h=h[:a]+block+h[b:]
# textes de la page
h=re.sub(r'(<h1 data-i18n="estPH">)[^<]*',r'\g<1>'+C.FR['estPH'],h)
h=re.sub(r'(<p class="lead" data-i18n="estPL">)[^<]*',r'\g<1>'+C.FR['estPL'].replace('\\','\\\\'),h)
h=re.sub(r'(<p class="note-s" data-i18n="estNote">)[^<]*',lambda m:m.group(1)+C.FR['estNote'],h)
# boutons dynamiques
h=re.sub(r'<a class="btn btn-primary" href="[^"]*" data-i18n="tB1x"[^>]*>',lambda m:'<a class="btn btn-primary" id="reqBtn" href="contact.html?offer=pro" data-i18n="tB1x">',h)
h=re.sub(r'<a class="btn btn-ghost" href="offre-vitrine-pro.html" data-i18n="seeDetail"[^>]*>',lambda m:'<a class="btn btn-ghost" id="detBtn" href="offre-vitrine-pro.html" data-i18n="seeDetail">',h)
open(SRC+'estimateur.html','w',encoding='utf-8').write(h)

# ---------- 2. JS (SRC app.js) ----------
f=SRC+'assets/app.js'
s=open(f,encoding='utf-8').read()
a=s.find('/* Estimateur */'); b=s.find('/* Pré-sélection')
assert a>0 and b>a
FRJ=J({k:C.FR[k] for k in ['dl1','dl2','dl3','from']})
js='''/* Estimateur */
let pages=0,hrs=0;
const tier=document.getElementById('tier');
const CFR=%s;
function calc(){
  if(!tier)return;
  const o=tier.options[tier.selectedIndex],base=+tier.value,sub=+o.dataset.s,g=+o.dataset.g,cu=base>=17000;
  const lang=(typeof LANG!=='undefined'&&LANG)||'he';
  const fw=tx(lang,'from',CFR.from),pre=cu?(fw.slice(-1)==='-'?fw:fw+' '):'';
  const m=n=>pre+'<bdi dir="ltr">'+fmt(n)+'</bdi>';
  const extra=pages*500,tot=base+extra,hx=hrs*150,mon=sub+hx;
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.innerHTML=v};
  set('pages',pages);set('hours',hrs);
  set('r-base',m(base));set('r-extra',fmt(extra));
  const rt=document.getElementById('r-total');rt.innerHTML=m(tot);
  rt.classList.remove('bump');void rt.offsetWidth;rt.classList.add('bump');
  set('r-dep',m(tot/2));set('r-bal',m(tot/2));
  set('r-sub',m(sub));set('r-hrs',fmt(hx));set('r-mon',m(mon));
  set('r-six',m(mon*6));set('r-all',m(tot+mon*6));
  const ex=document.getElementById('exp'),on=ex&&ex.checked;
  ['r-exp-t','r-exp'].forEach(i=>{const e=document.getElementById(i);if(e)e.hidden=!on});
  set('r-exp',fmt(500));
  set('r-dl',tx(lang,'dl'+g,CFR['dl'+g]));
  const rq=document.getElementById('reqBtn'),dt=document.getElementById('detBtn');
  if(rq)rq.setAttribute('href','#/contact?offer='+(['','starter','pro','ecom'][g]));
  if(dt)dt.setAttribute('href','#/'+(['','offre-starter','offre-vitrine-pro','offre-ecommerce'][g]));
}
if(tier){
  const bind=(id,fn)=>{const e=document.getElementById(id);if(e)e.onclick=fn};
  bind('plus',()=>{if(pages<20){pages++;calc()}});bind('minus',()=>{if(pages>0){pages--;calc()}});
  bind('hplus',()=>{if(hrs<20){hrs++;calc()}});bind('hminus',()=>{if(hrs>0){hrs--;calc()}});
  tier.onchange=calc;const ex=document.getElementById('exp');if(ex)ex.onchange=calc;
}

'''%FRJ
s=s[:a]+js+s[b:]
# dictionnaires (he, en, ru)
s=re.sub(r'/\*p8\*/[^\n]*\n','',s)
line='/*p8*/Object.assign(HE,%s);Object.assign(TX.en,%s);Object.assign(TX.ru,%s);\n'%(J(C.HE),J(C.EN),J(C.RU))
k=s.find('/*p5*/const TX=')
e=s.find('\n',k)
# insérer après la fin du bloc p5 (ligne TX + lignes suivantes jusqu'au marqueur sûr): juste avant 'const tx='
t=s.find('const tx=')
assert t>0
s=s[:t]+line+s[t:]
open(f,'w',encoding='utf-8').write(s)

# ---------- 3. CSS ----------
c=open(V+'new.css',encoding='utf-8').read()
i=c.find('/*p8*/')
if i>=0: c=c[:i]
c+='''/*p8*/
.calc .field select{width:100%}
.ck2{display:flex;gap:.7rem;align-items:flex-start;text-transform:none!important;letter-spacing:0!important;font-size:.9rem!important;color:var(--ink,#16294d)!important;cursor:pointer;line-height:1.45}
.ck2 input{width:1.25rem;height:1.25rem;margin-top:.1rem;accent-color:#6f62c4;flex:none}
.result dd{direction:inherit!important}
.result dt.tot2{color:#fff;font-weight:500}
.result dt.tot2+dd{color:var(--sky);font-weight:600}
.result dl{row-gap:.7rem}
.result dt[hidden],.result dd[hidden]{display:none}
'''
open(V+'new.css','w',encoding='utf-8').write(c)
print('patch8 ok')
# ---------- 4. Section confiance : carte sombre retirée, mots géants lisibles ----------
c=open(V+'new.css',encoding='utf-8').read()
c+='''.coach{display:none!important}
.gh .gw{color:var(--deep)}
.gh .gw.ink{color:var(--vio-d)}
.gh .row2:last-child .gw:last-child{color:#3070b0}
.gh{margin-top:2.5rem}
'''
open(V+'new.css','w',encoding='utf-8').write(c)
