(function(){
'use strict';
var $=function(i){return document.getElementById(i)},L=function(){return document.documentElement.lang==='he'?'he':'fr'};
var D={
 ttl:{he:['האתר שלכם','באוויר'],fr:['Votre site','en ligne']},
 tag:{he:['תכננו,','השיקו'],fr:['Planifiez,','lancez']},
 slides:[{im:'assets/c2.jpg',b:{he:'סטארטר',fr:'Starter'},t:{he:'מ-1,500 ₪',fr:'Dès 1 500 ₪'},u:'offre-starter.html'},{im:'assets/c3.jpg',b:{he:'Pro',fr:'Vitrine Pro'},t:{he:'כולל ממשק ניהול',fr:'Avec interface admin'},u:'offre-vitrine-pro.html'},{im:'assets/c1.jpg',b:{he:'חנות',fr:'E-commerce'},t:{he:'פיתוח בהתאמה',fr:'Sur-mesure'},u:'offre-ecommerce.html'}],
 cta:{he:'לראות את החבילה ←',fr:'Voir l’offre →'},
 mem:{he:'ימי עבודה עד העלאה',fr:'jours ouvrés jusqu’à la mise en ligne'},
 trust:[{im:'assets/c1.jpg',h:{he:['שקוף','ומהיר','ללא','הפתעות'],fr:['Prix','fixé','d’avance','vraiment']},n:{he:'מחיר ידוע מראש',fr:'Prix connu d’avance'},r:{he:'בלי הפתעות בחשבונית',fr:'Aucune mauvaise surprise'}},{im:'assets/c2.jpg',h:{he:['הקוד','כולו','שלכם','תמיד'],fr:['Votre','code,','à vous','toujours']},n:{he:'קוד מועבר 100%',fr:'Code transféré à 100 %'},r:{he:'אחרי התשלום המלא',fr:'Après paiement complet'}},{im:'assets/c3.jpg',h:{he:['אספקה','תוך','ימים','לא חודשים'],fr:['Livré','en jours,','pas','en mois']},n:{he:'5 עד 30 ימי עבודה',fr:'5 à 30 jours ouvrés'},r:{he:'לפי החבילה שבחרתם',fr:'Selon l’offre choisie'}}],
 pct:{he:'הקוד שלכם, בלי תלות',fr:'du code vous appartient'},
 bcT:{he:'פשוט, שקוף, בלי הפתעות',fr:'Simple, transparent, sans surprise'},bcP:{he:'חבילות במחירים ידועים מראש, תשלום 50/50 והקוד עובר אליכם במלואו אחרי התשלום.',fr:'Des offres à prix connus d’avance, un paiement 50/50 et le code intégralement transféré après règlement.'},
 more:{he:'עוד עלינו',fr:'En savoir plus'},
 offersE:{he:'חבילות',fr:'Offres'},offersT:{he:['חבילות','לכל עסק'],fr:['Une offre','pour chaque projet']},all:{he:'לכל החבילות והמחירים',fr:'Toutes les offres et tarifs'},
 offers:[{n:{he:'סטארטר',fr:'Starter'},d:{he:'דף נחיתה מהיר לעצמאים, בעלי מלאכה ואירועים.',fr:'Une page éclair pour indépendants, artisans et événements.'},p:'1 500 – 2 500 ₪',u:'offre-starter.html'},{n:{he:'אתר תדמית Pro',fr:'Vitrine Pro'},d:{he:'אתר מרובה עמודים עם ממשק ניהול פרטי.',fr:'Site multi-pages avec interface d’administration privée.'},p:'3 000 – 5 000 ₪',u:'offre-vitrine-pro.html'},{n:{he:'חנות ופיתוח בהתאמה',fr:'E-commerce & sur-mesure'},d:{he:'חנויות אונליין, קטלוגים ופלטפורמות עסקיות.',fr:'Boutiques, catalogues interactifs et plateformes métier.'},p:'8 000 – 17 000+ ₪',u:'offre-ecommerce.html'}],
 facT:{he:['כך','אנחנו','עובדים'],fr:['Notre','façon','de travailler']},facP:{he:'מדברים, מתכננים, בונים ומעלים לאוויר. בכל שלב אתם יודעים מה קורה, כמה זה עולה ומתי זה מוכן.',fr:'On discute, on planifie, on construit, on met en ligne. À chaque étape, vous savez ce qui se passe, combien cela coûte et quand ce sera prêt.'},facB:{he:'לשיטת העבודה',fr:'Voir la méthode'},
 f1:{b:{he:'מחשבון מחיר',fr:'Estimateur de prix'},s:{he:'חשבו את מחיר האתר שלכם בשניות.',fr:'Calculez le prix de votre site en quelques secondes.'},u:'estimateur.html',im:'assets/c2.jpg'},
 f2:{b:{he:'עוזר AI',fr:'Assistant IA'},s:{he:'שאלו על מחירים, חבילות וזמנים.',fr:'Posez vos questions sur prix, offres et délais.'},u:'assistant.html',im:'assets/c3.jpg'},
 sE:{he:'במספרים',fr:'En chiffres'},sT:{he:'שקיפות מלאה, מהצעה ועד מסירה.',fr:'Une transparence totale, du devis à la livraison.'},
 stats:[{v:5,s:'+',l:{he:'ימי עבודה — האספקה המהירה ביותר',fr:'jours ouvrés — la livraison la plus rapide'}},{v:100,s:'%',l:{he:'מקוד המקור עובר אליכם',fr:'du code source vous est transféré'}},{v:50,s:'%',l:{he:'מקדמה בלבד, השאר בהעלאה',fr:'d’acompte seulement, le reste à la mise en ligne'}},{v:3,s:'',l:{he:'חבילות ברורות לבחירה',fr:'offres claires à choisir'}}],
 qE:{he:'שאלות נפוצות',fr:'Questions fréquentes'},qT:{he:'התנאים, בלי אותיות קטנות.',fr:'Les conditions, sans petits caractères.'},
 faq:[{q:{he:'כמה משלמים ומתי? תשלום 50/50: חצי בהתחלה וחצי בהעלאה לאוויר.',fr:'Combien et quand payer ? Paiement 50/50 : la moitié au départ, la moitié à la mise en ligne.'},n:{he:'תשלום',fr:'Paiement'},r:{he:'ללא התחייבות נסתרת',fr:'Sans engagement caché'}},{q:{he:'רוצים לשדרג חבילה בהמשך? משלמים רק את ההפרש.',fr:'Envie de passer à l’offre supérieure plus tard ? Vous ne payez que la différence.'},n:{he:'שדרוג',fr:'Évolution'},r:{he:'משלמים רק את ההפרש',fr:'Seule la différence se paie'}},{q:{he:'הקוד שלכם. אחרי התשלום המלא, כל קוד המקור עובר אליכם.',fr:'Le code est à vous. Après paiement complet, tout le code source vous est transféré.'},n:{he:'בעלות',fr:'Propriété'},r:{he:'קוד מועבר 100%',fr:'Code transféré à 100 %'}}],
 qAll:{he:'לכל התנאים',fr:'Voir toutes les conditions'}};
var sI=0,tI=0,READY=false;
function lines(el,arr){var was=el.classList.contains('go-in');el.innerHTML='';arr.forEach(function(t,i){var s=document.createElement('span');s.className='w';var n=document.createElement('i');n.textContent=t;n.style.setProperty('--i',i);s.appendChild(n);el.appendChild(s)})}
function render(){var l=L();
 lines($('ttl'),D.ttl[l]);lines($('tag'),D.tag[l]);
 $('mem').textContent=D.mem[l];$('cta2').textContent=D.cta[l];
 slide(true);
 $('pct').textContent=D.pct[l];$('bcT').textContent=D.bcT[l];$('bcP').textContent=D.bcP[l];$('more').textContent=D.more[l];
 trust(true);ghost();
 $('oE').textContent=D.offersE[l];$('oT').textContent=D.offersT[l].join(' ');$('all').textContent=D.all[l];
 var u=$('pList');u.innerHTML='';D.offers.forEach(function(o,i){var li=document.createElement('li');li.className='rv';li.style.transitionDelay=i*90+'ms';li.innerHTML='<a href="'+o.u+'"><span class="n">0'+(i+1)+'</span><div class="m"><h3>'+o.n[l]+'</h3><p>'+o.d[l]+'</p></div><span class="pr">'+o.p+'</span><span class="go"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></a>';u.appendChild(li);io.observe(li)});
 $('fT').textContent=D.facT[l].join(' ');$('fP').textContent=D.facP[l];$('facB').textContent=D.facB[l];
 [['f1','1'],['f2','2']].forEach(function(k){var f=D[k[0]];var a=$('f'+k[1]);a.href=f.u;a.querySelector('img').src=f.im;a.querySelector('b').textContent=f.b[l];a.querySelector('span').textContent=f.s[l]});
 $('sE').textContent=D.sE[l];$('sT').textContent=D.sT[l];
 var sg=$('sg');sg.innerHTML='';D.stats.forEach(function(s,i){var d=document.createElement('div');d.className='rv';d.style.transitionDelay=i*110+'ms';d.innerHTML='<div class="v"><span class="cnt" data-v="'+s.v+'">0</span>'+s.s+'</div><div class="l">'+s.l[l]+'</div>';sg.appendChild(d);io.observe(d)});
 $('qE').textContent=D.qE[l];$('qT').textContent=D.qT[l];$('qAll').textContent=D.qAll[l];
 var tg=$('tg');tg.innerHTML='';D.faq.forEach(function(f,i){var li=document.createElement('li');li.className='rv';li.style.transitionDelay=i*120+'ms';li.innerHTML='<a href="conditions.html" class="tc"><div><div class="q">“</div><blockquote>'+f.q[l]+'</blockquote></div><figcaption><b>'+f.n[l]+'</b><span>'+f.r[l]+'</span></figcaption></a>';tg.appendChild(li);io.observe(li)});
 if(READY)document.querySelectorAll('#ttl,#tag').forEach(function(e){e.classList.add('go-in')});
 onScroll();
}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
function slide(now,dir){var s=D.slides[sI],l=L(),c=$('sc');function put(){$('scImg').src=s.im;$('scB').textContent=s.b[l];$('scT').textContent=s.t[l];$('scA').href=s.u;[].forEach.call(document.querySelectorAll('#scDots button'),function(b,i){b.classList.toggle('on',i===sI)})}
 if(now){put();return}c.classList.add('sw');setTimeout(function(){put();c.classList.remove('sw')},300)}
[].forEach.call(document.querySelectorAll('#scDots button'),function(b,i){b.onclick=function(){sI=i;slide(false)}});
setInterval(function(){if(READY&&!document.hidden){sI=(sI+1)%3;slide(false)}},3800);
function ghost(){var l=L(),t=D.trust[tI];document.querySelectorAll('#gh .gw').forEach(function(el,i){el.innerHTML='<span class="w"><i style="--i:0;--d:'+i*90+'ms">'+t.h[l][i]+'</i></span>';el.classList.remove('go-in');void el.offsetWidth;requestAnimationFrame(function(){requestAnimationFrame(function(){var r=el.getBoundingClientRect();if(r.top<innerHeight*.95)el.classList.add('go-in');else gio.observe(el)})})})}
var gio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('go-in');gio.unobserve(e.target)}})},{threshold:.2});
function trust(now){var l=L(),t=D.trust[tI],a=$('cI0'),b=$('cI1');
 if(now){a.src=t.im;a.classList.remove('off');b.classList.add('off')}else{b.src=t.im;b.classList.remove('off');a.classList.add('off');a.id='cIt';b.id='cI0';a.id='cI1'}
 $('cN').textContent=t.n[l];$('cR').textContent=t.r[l];[].forEach.call(document.querySelectorAll('#tDots button'),function(d,i){d.classList.toggle('on',i===tI)})}
function tGo(n){tI=(n+3)%3;trust(false);ghost()}
$('tp').onclick=function(){tGo(tI-1)};$('tn').onclick=function(){tGo(tI+1)};
[].forEach.call(document.querySelectorAll('#tDots button'),function(b,i){b.onclick=function(){tGo(i)}});
var tr=$('trust'),tk=false,px=[[-3,3],[3,-3],[-2,4],[4,-3]];
function onScroll(){tk=false;var vh=innerHeight,t=tr.getBoundingClientRect(),q=Math.min(1,Math.max(0,(vh-t.top)/(vh+t.height)));
 document.querySelectorAll('#gh .gw').forEach(function(g,i){var P=window.__ptr||{nx:.5};g.style.transform='translateX(calc('+(px[i][0]+(px[i][1]-px[i][0])*q)+'% + '+((P.nx-.5)*(i%2?-24:24))+'px))'});
 document.querySelectorAll('.cnt').forEach(function(el){var b=el.getBoundingClientRect(),pp=Math.min(1,Math.max(0,(vh-b.top)/(vh/2+b.height/2)));el.textContent=Math.round(pp*(+el.dataset.v))})}
addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(onScroll)}},{passive:true});
setInterval(function(){if(!document.hidden&&document.querySelector('#gh'))onScroll()},120);
/* hooks langue */
window.onLang=function(){render()};
/* loader + entrée */
function go(){if(READY)return;READY=true;var h=$('home');h.classList.add('go-in');h.querySelectorAll('.rv').forEach(function(e){e.classList.add('in')});document.querySelectorAll('#ttl,#tag').forEach(function(e){e.classList.add('go-in')})}
var ld=$('ldr'),skip=document.documentElement.classList.contains('pt-in')||matchMedia('(prefers-reduced-motion: reduce)').matches;try{skip=skip||sessionStorage.getItem('seen')==='1'||document.referrer.indexOf(location.host)>-1&&location.protocol!=='file:'}catch(e){}
function arm(){var wait=skip?150:1400;setTimeout(function(){go();if(ld){ld.classList.add('out');setTimeout(function(){ld.remove()},900)}try{sessionStorage.setItem('seen','1')}catch(e){}},wait)}
if(skip&&ld)ld.remove();
render();document.querySelectorAll('.rv').forEach(function(e){if(!e.closest('#home')&&!e.closest('#pList')&&!e.closest('#sg')&&!e.closest('#tg'))io.observe(e)});
if(document.readyState==='complete')arm();else addEventListener('load',arm);setTimeout(go,2800);
})();
