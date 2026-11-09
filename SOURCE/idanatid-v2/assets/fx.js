/* Effets liés à la souris, transitions entre pages */
(function(){
'use strict';
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
var P=window.__ptr={x:innerWidth/2,y:innerHeight/2,nx:.5,ny:.5};
addEventListener('pointermove',function(e){P.x=e.clientX;P.y=e.clientY;P.nx=e.clientX/innerWidth;P.ny=e.clientY/innerHeight},{passive:true});
var pt=document.getElementById('pt');
/* ----- menu : verrou de défilement ----- */
var menu=document.getElementById('menu');
if(menu)new MutationObserver(function(){document.documentElement.style.overflow=menu.classList.contains('open')?'hidden':''}).observe(menu,{attributes:true,attributeFilter:['class']});
/* ----- transition entre pages ----- */
if(pt&&!reduce){
  requestAnimationFrame(function(){if(document.documentElement.classList.contains('pt-in')){pt.classList.add('reveal');document.documentElement.classList.remove('pt-in')}});
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[href]');if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||a.target==='_blank'||a.hasAttribute('download'))return;
    var h=a.getAttribute('href');if(!h||h[0]==='#'||/^(mailto:|tel:|https?:|javascript:)/i.test(h))return;
    var u=new URL(a.href,location.href);if(u.origin!==location.origin&&location.protocol!=='file:')return;
    if(u.pathname===location.pathname&&u.search===location.search&&u.hash)return;
    e.preventDefault();try{sessionStorage.setItem('pt','1')}catch(_){}
    pt.classList.remove('reveal');pt.classList.add('cover');setTimeout(function(){location.href=a.href},520);
  });
  addEventListener('pageshow',function(e){if(e.persisted){pt.classList.remove('cover');pt.classList.add('reveal')}});
}
if(reduce||!fine)return initLiquidOnly();
/* ----- curseur ----- */
var cur=document.getElementById('cur'),cx=P.x,cy=P.y;
if(cur){addEventListener('pointermove',function(){cur.classList.add('on')},{once:true});
  document.addEventListener('pointerover',function(e){cur.classList.toggle('big',!!e.target.closest('a,button,select,summary,.card,.cd a,.pl2 a,.sc'))});
  document.addEventListener('mouseleave',function(){cur.classList.remove('on')})}
/* ----- parallaxe des plaques + halo ----- */
var plates=[].slice.call(document.querySelectorAll('.plate')),depth=[].slice.call(document.querySelectorAll('[data-depth]')),sx=0,sy=0;
plates.forEach(function(p){p._s={x:0,y:0}});
depth.forEach(function(d){d._s={x:0,y:0}});
/* ----- tilt / halo ----- */
var TS='.card,.vals div,.tc,.steps li,.cd a,.detail .offer,.result,.calc';var tcur=null;
function resetT(el){if(!el)return;el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg');el.classList.remove('hov')}
document.addEventListener('pointermove',function(e){
  var el=e.target.closest&&e.target.closest(TS);
  if(el!==tcur){resetT(tcur);tcur=el}
  if(!el)return;var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  el.classList.add('tilt','hov');var big=r.width>700||r.height>420;var k=big?1.2:5;
  el.style.setProperty('--mx',(x*100)+'%');el.style.setProperty('--my',(y*100)+'%');
  el.style.setProperty('--ry',((x-.5)*k*2)+'deg');el.style.setProperty('--rx',((.5-y)*k*2)+'deg')},{passive:true});
document.addEventListener('pointerleave',function(){resetT(tcur);tcur=null});
/* ----- boutons magnétiques ----- */
var mag=null,MS='.btn,.book,.menu-btn,.ab,.lang';
document.addEventListener('pointermove',function(e){
  var el=e.target.closest&&e.target.closest(MS);
  if(mag&&mag!==el){mag.style.transform='';mag=null}
  if(!el)return;mag=el;var r=el.getBoundingClientRect();
  el.style.transform='translate('+((e.clientX-(r.left+r.width/2))*.22)+'px,'+((e.clientY-(r.top+r.height/2))*.3)+'px)'},{passive:true});
/* ----- boucle ----- */
function loop(){
  cx+=(P.x-cx)*.22;cy+=(P.y-cy)*.22;if(cur)cur.style.transform='translate('+cx+'px,'+cy+'px)';
  var vh=innerHeight;
  plates.forEach(function(pl){var r=pl.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;
    var s=Math.min(1,Math.max(0,-r.top/r.height))*12;
    var tx=(.5-P.nx)*28,ty=(.5-P.ny)*18;pl._s.x+=(tx-pl._s.x)*.06;pl._s.y+=(ty-pl._s.y)*.06;
    var l=pl.querySelector('.pl');if(l)l.style.transform='translate3d('+pl._s.x+'px,calc('+s+'% + '+pl._s.y+'px),0)';
    pl.style.setProperty('--mx',((P.x-r.left)/r.width*100)+'%');pl.style.setProperty('--my',((P.y-r.top)/r.height*100)+'%')});
  depth.forEach(function(d){var r=d.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;var k=+d.dataset.depth;
    d._s.x+=((P.nx-.5)*k-d._s.x)*.08;d._s.y+=((P.ny-.5)*k*.6-d._s.y)*.08;d.style.transform='translate3d('+d._s.x+'px,'+d._s.y+'px,0)'});
  requestAnimationFrame(loop)}
requestAnimationFrame(loop);
initLiquid();
/* ===== pinceau liquide ===== */
function initLiquid(){}
function initLiquidOnly(){if(reduce)document.querySelectorAll('.plate .pl').forEach(function(l){l.style.top='0';l.style.height='100%'})}
function liquid(box){
  var cv=box.querySelector('canvas');if(!cv)return;var ctx=cv.getContext('2d'),dpr=Math.min(devicePixelRatio||1,2),brushR=143,decay=.016;
  var img=new Image();img.src=box.dataset.reveal;
  var cover=document.createElement('canvas'),cctx=cover.getContext('2d'),brush=document.createElement('canvas'),bctx=brush.getContext('2d'),radius=brushR*dpr,rect,pts=[],last=null,idle=0,raf=0,W=0,H=0;
  function size(){var rr=cv.parentNode.getBoundingClientRect();W=cv.width=Math.max(1,Math.round(cv.parentNode.offsetWidth*dpr));H=cv.height=Math.max(1,Math.round(cv.parentNode.offsetHeight*dpr));cover.width=W;cover.height=H;radius=brushR*dpr;brush.width=brush.height=Math.ceil(radius*2);
    if(img.complete&&img.naturalWidth){var s=Math.max(W/img.naturalWidth,H/img.naturalHeight),w=img.naturalWidth*s,h=img.naturalHeight*s;cctx.drawImage(img,(W-w)/2,(H-h)/2,w,h)}}
  img.onload=size;if(window.ResizeObserver)new ResizeObserver(size).observe(box);size();
  function stamp(x,y){var d=brush.width,c=d/2;bctx.globalCompositeOperation='source-over';bctx.clearRect(0,0,d,d);var g=bctx.createRadialGradient(c,c,0,c,c,c);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.55,'rgba(255,255,255,.82)');g.addColorStop(1,'rgba(255,255,255,0)');bctx.fillStyle=g;bctx.fillRect(0,0,d,d);bctx.globalCompositeOperation='source-in';bctx.drawImage(cover,x-c,y-c,d,d,0,0,d,d);ctx.globalCompositeOperation='source-over';ctx.drawImage(brush,x-c,y-c)}
  function tick(){var drawing=pts.length>0;if(drawing)idle=0;else{idle++;if(idle>120){raf=0;ctx.clearRect(0,0,W,H);return}}
    var fade=drawing?decay:Math.min(decay+idle*.004,.5);ctx.globalCompositeOperation='destination-out';ctx.fillStyle='rgba(0,0,0,'+fade+')';ctx.fillRect(0,0,W,H);
    if(drawing){pts.forEach(function(p){stamp(p[0],p[1])});pts=[]}raf=requestAnimationFrame(tick)}
  addEventListener('pointermove',function(e){rect=cv.getBoundingClientRect();if(rect.bottom<0||rect.top>innerHeight)return;var k=W/rect.width;var x=(e.clientX-rect.left)*k,y=(e.clientY-rect.top)*k;
    if(x<-radius||y<-radius||x>W+radius||y>H+radius){last=null;return}
    if(last){var dx=x-last[0],dy=y-last[1],dist=Math.hypot(dx,dy),step=Math.max(radius*.3,1),n=Math.min(Math.ceil(dist/step),60);for(var i=1;i<=n;i++)pts.push([last[0]+dx*i/n,last[1]+dy*i/n])}else pts.push([x,y]);
    last=[x,y];if(!raf){idle=0;raf=requestAnimationFrame(tick)}},{passive:true});
}
})();
;(function(){function lab(){document.querySelectorAll('table.cmp').forEach(function(t){var h=[].map.call(t.querySelectorAll('thead th'),function(x){return x.textContent.trim()});t.querySelectorAll('tbody tr').forEach(function(r){[].forEach.call(r.querySelectorAll('td'),function(td,i){td.setAttribute('data-label',h[i+1]||'');if(!td.querySelector('.v')&&td.children.length==0){var v=document.createElement('span');v.className='v';v.textContent=td.textContent;if(/^[\d+–\- ,.₪]+$/.test(v.textContent.replace(/\(.*\)/,'').trim()))v.className='v n';td.textContent='';td.appendChild(v)}})})})}
lab();document.addEventListener('DOMContentLoaded',lab);var o=window.onLang;window.onLang=function(){o&&o.apply(this,arguments);setTimeout(lab,0)};setInterval(lab,1500)})();

/* Bandeau cookies : petit, en bas, ne bloque rien et ne verrouille pas le défilement */
;(function(){var K='idn_cookies_ok';function ok(){try{return localStorage.getItem(K)==='1'}catch(e){return false}}
var T={he:{p:'האתר משתמש בעוגיות ובאחסון מקומי כדי לזכור את השפה וההעדפות שלכם.',b:'הבנתי',l:'מדיניות פרטיות',a:'הודעה על עוגיות'},
en:{p:'This site uses cookies and local storage to remember your language and preferences.',b:'Got it',l:'Privacy policy',a:'Cookie notice'},
ru:{p:'Сайт использует файлы cookie и локальное хранилище, чтобы запомнить ваш язык и настройки.',b:'Понятно',l:'Политика конфиденциальности',a:'Уведомление о cookie'},
fr:{p:'Ce site utilise des cookies et un stockage local pour mémoriser votre langue et vos préférences.',b:'J’ai compris',l:'Politique de confidentialité',a:'Avis sur les cookies'}};
var d,root=document.documentElement;
function lang(){return T[root.lang]?root.lang:'he'}
function size(){if(d)root.style.setProperty('--ckh',d.offsetHeight+'px')}
function fill(){if(!d)return;var x=T[lang()];d.setAttribute('aria-label',x.a);d.querySelector('span').textContent=x.p+' ';d.querySelector('a').textContent=x.l;d.querySelector('button').textContent=x.b;size()}
function init(){if(ok())return;d=document.createElement('div');d.id='ck';d.setAttribute('role','region');
d.innerHTML='<p><span></span><a href="#/privacy"></a></p><button type="button"></button>';
document.body.appendChild(d);root.classList.add('ck-on');fill();
d.querySelector('button').addEventListener('click',function(){try{localStorage.setItem(K,'1')}catch(e){}root.classList.remove('ck-on');root.style.removeProperty('--ckh');d.remove();d=null});
var o=window.onLang;window.onLang=function(){o&&o.apply(this,arguments);fill()};addEventListener('resize',size);setInterval(fill,1500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init()})();

