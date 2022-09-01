(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();function _(e,t,n){document.body.addEventListener(e,s=>{s.target.matches(t)&&n(s)})}function B(e,t=1e3){let n=!1,s;const o=()=>{s==null?n=!1:(e(...s),s=null,setTimeout(o,t))};return(...r)=>{if(n){s=r;return}e(...r),n=!0,setTimeout(o,t)}}const U=[...document.querySelectorAll("img[data-jpg]")];function xe(){return new Promise(e=>{const t=new Image;t.src="data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA",t.onload=t.onerror=()=>{e(t.height===2)}})}xe().then(e=>{U.forEach(t=>{e||t.setAttribute("data-webp",t.dataset.jpg)})}).then(()=>{U.forEach(e=>{let t=new Image;t.src=e.dataset.webp,t.onload=function(){e.setAttribute("src",e.dataset.webp)}})});function J(){gsap.defaults({duration:1,ease:"none",repeat:1,repeatDelay:1,delay:.24}),gsap.timeline({repeat:-1}).to(".typewriter",{text:"Hsieh Yao-tsu ",yoyo:!0}).to(".typewriter",{text:"Web Designer ",yoyo:!0}).to(".typewriter",{text:"Frontend Developer ",yoyo:!0}).to(".typewriter",{text:"SutterBug ",yoyo:!0})}J();document.querySelector(".typewriter").addEventListener("animationend",J);const C=document.querySelector(".slider-container"),y=document.querySelector(".slider-gallery"),u=[...document.querySelectorAll(".slider-gallery li")],qe=[...document.querySelectorAll(".slider-gallery li img")],ee=document.querySelectorAll(".dot");let M=!1,te=0,a=0,v=0,$=0,i=0,A=document.querySelector(".slider-gallery li img.active"),L=u[0].getBoundingClientRect().width,ne=C.offsetHeight;const ke=B(()=>{L=u[0].getBoundingClientRect().width,y.style.transform=`translateX(-${i*L}px)`,ne=C.offsetHeight},250);window.addEventListener("resize",ke);window.oncontextmenu=function(e){return e.preventDefault(),e.stopPropagation(),!1};const Z=B(Ie,50);u.forEach((e,t)=>{e.querySelector("img").addEventListener("dragstart",s=>(s.preventDefault(),!1)),e.addEventListener("touchstart",K(t)),e.addEventListener("touchend",S),e.addEventListener("touchcancel",S),e.addEventListener("touchmove",Z),e.addEventListener("mousedown",K(t)),e.addEventListener("mouseup",S),e.addEventListener("mouseleave",S),e.addEventListener("mousemove",Z)});_("click",".slider-container button",e=>{e.target.classList.contains("prev")?O("prev"):O()});ee.forEach((e,t)=>{e.addEventListener("click",function(){t!==i&&(i=t,R())})});C.addEventListener("mouseenter",e=>{cancelAnimationFrame(H)});C.addEventListener("mouseleave",()=>{H=requestAnimationFrame(N)});function K(e){return function(t){i=e,te=oe(t),M=!0,$=requestAnimationFrame(ie),y.classList.add("grabbing")}}function S(){M=!1,cancelAnimationFrame($);const e=a-v;e>0?((i==0||e<100)&&(a=i*-L,v=a,F()),i!==0&&e>100&&(i-=1,R())):e<0&&((i==u.length-1||e>-100)&&(a=i*-L,v=a,F()),i!==u.length-1&&e<-100&&(i+=1,R())),y.classList.remove("grabbing")}function Ie(e){if(M){const t=oe(e);a=v+t-te}}function oe(e){return e.type.includes("mouse")?e.pageX:e.touches[0].clientX}function ie(){F(),M&&($=requestAnimationFrame(ie))}function F(){let e=a-v;if(i==0&&e>0){y.style.transform=`translateX(${a/10}px)`;return}if(i==u.length-1&&e<0){y.style.transform=`translateX(${a-e*.9}px)`;return}y.style.transform=`translateX(${a}px)`}function R(){Pe(),a=i*-L,v=a,F(),setTimeout(()=>Re(i),550),Fe(i)}function O(e="next"){e==="next"?i=(i+1)%u.length:(i=i===0?u.length:i,i=(i-1)%u.length),R()}function Fe(e){document.querySelector(".dot.active").classList.remove("active"),ee[e].classList.add("active")}const Re=function(e){var t;A=document.querySelector(".slider-gallery li img.active"),A==null||A.classList.remove("active"),(t=qe[e])==null||t.classList.add("active")};let W=0,H;function N(){window.scrollY<=ne&&(W++,W%300===0&&O()),H=requestAnimationFrame(N)}N();function Pe(){W=0}(function(){let e=0,t=["ms","moz","webkit","o"];for(let n=0;n<t.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(n,s){let o=new Date().getTime(),r=Math.max(0,16-(o-e)),d=window.setTimeout(function(){n(o+r)},r);return e=o+r,d}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(n){clearTimeout(n)})})();const f=document.querySelector("nav"),Te=document.querySelector(".hamburger"),P=document.querySelector(".navMenu"),re=document.querySelectorAll(".navMenu li"),se=function(){le(),P.classList.toggle("active"),f.classList.toggle("cross"),re.forEach((e,t)=>{e.style.animation=e.style.animation?"":`navMenuFade 0.5s ease forwards ${t/7+.3}s`}),Ce(P),f.classList.contains("cross")&&(f.addEventListener("click",function(e){e.stopPropagation()}),document.querySelector("body>div").addEventListener("click",ae))};function ae(){Me(P),le(),P.classList.remove("active"),f.classList.remove("cross"),re.forEach(e=>{e.style.animation=null})}const Be=document.querySelectorAll("[tabindex='0']");function le(){Be.forEach(e=>{e.getAttribute("tabindex")=="0"?e.setAttribute("tabindex","-1"):e.setAttribute("tabindex","0")})}function Ce(e){e.setAttribute("aria-expanded",e.getAttribute("aria-expanded")=="true"?"false":"true")}function Me(e){e.setAttribute("aria-expanded",!1)}Te.addEventListener("click",function(){se()});window.addEventListener("keydown",e=>{var t,n;m.classList.contains("active")||(((t=e.key)==null?void 0:t.includes("v"))||((n=e.key)==null?void 0:n.includes("x")))&&(e.preventDefault(),se())});const De=document.querySelectorAll(".navMenu ul li a");De.forEach(e=>{e.addEventListener("click",t=>{ae()})});const Oe=document.querySelectorAll(".btn_primary");Oe.forEach(e=>{e.addEventListener("mousemove",function(t){const n=t.pageX-(parseInt(e.getBoundingClientRect().left)+Math.round(window.scrollX)),s=t.pageY-(parseInt(e.getBoundingClientRect().top)+Math.round(window.scrollY));e.style.setProperty("--x",n+"px"),e.style.setProperty("--y",s+"px")})});const We=function(e,t){const n=e.offsetTop,s=window.pageYOffset,o=n-s;let r=null;const d=function(l){r===null&&(r=l);let p=l-r,E=Ae(p,s,o,t);window.scrollTo(0,E),p<t&&requestAnimationFrame(d)};function Ae(l,p,E,Se){return l/=Se/2,l<1?E/2*l*l+p:(l--,-E/2*(l*(l-2)-1)+p)}requestAnimationFrame(d)};_("click","[data-scroll]",e=>{if(getComputedStyle(document.body).scrollBehavior==="smooth")return;e.preventDefault();let t=document.getElementById(e.target.dataset.scroll);We(t,500)});const b=[...document.querySelectorAll("div[id]:not(.navMenu)")],Xe=B(()=>{window.scrollY<=24?f.classList.remove("scrolled"):f.classList.add("scrolled")},240);window.addEventListener("scroll",Xe);const Ge={rootMargin:"-45% 0px -55%"},$e=new IntersectionObserver(e=>{e.forEach(t=>{document.querySelector(`.navMenu a[data-scroll ="${t.target.id}"]`).parentElement.classList.toggle("active",t.isIntersecting)})},Ge);b.forEach(e=>{$e.observe(e)});const He=document.querySelectorAll(".fade-in"),Ne=document.querySelectorAll(".from-left"),Ye=document.querySelectorAll(".from-right"),ze={threshold:0,rootMargin:"0px 0px -50px 0px"},Y=new IntersectionObserver(function(e,t){e.forEach(n=>{if(n.isIntersecting)n.target.classList.add("appear"),t.unobserve(n.target);else return})},ze);He.forEach(e=>{Y.observe(e)});Ne.forEach(e=>{Y.observe(e)});Ye.forEach(e=>{Y.observe(e)});const x=document.querySelector(".works-sort").children,g=document.querySelector(".works").querySelectorAll("figure");for(let e=0;e<x.length;e++)x[e].addEventListener("click",function(){for(let n=0;n<x.length;n++)x[n].classList.remove("current");this.classList.add("current");let t=this.getAttribute("data-current");for(let n=0;n<g.length;n++)g[n].classList.remove("active"),g[n].classList.add("delete"),(g[n].classList.contains(t)||t=="all")&&(g[n].classList.remove("delete"),g[n].classList.add("active"))});const ce=document.querySelector("#work"),ue=document.querySelectorAll(".lightbox-enabled"),m=document.querySelector(".lightbox-container"),k=document.querySelector(".lightbox-image-wrapper"),D=document.querySelector(".lightbox-img"),je=document.querySelector(".lightbox-text-right"),z=document.querySelectorAll(".lightbox-btn"),de=document.querySelector(".lightbox-btn.left"),fe=document.querySelector(".lightbox-btn.right"),q=m.clientWidth-document.body.offsetWidth,Ve=function(){m.classList.add("active"),document.body.style.overflow="clip",ce.style.paddingRight=q+"px",f.style.paddingRight=q+"px",b[2].style.paddingRight=q+"px",b[4].style.paddingRight=q+"px"},me=function(){m.classList.remove("active"),document.body.style.overflow="auto",ce.style.paddingRight="0",f.style.paddingRight="0",b[2].style.paddingRight="0",b[4].style.paddingRight="0"};let c;const w=function(e){switch(D.src&&(D.src=""),D.src=h[e].dataset.imagesrc,je.innerHTML=`${e+1} / ${h.length}`,Q(),e){case 0:de.classList.add("inactive");break;case h.length-1:fe.classList.add("inactive");break;default:Q()}};let h;const Ue=function(e){h=ue[e].getElementsByTagName("span")},Q=function(){z.forEach(e=>{e.classList.remove("inactive")})},ge=function(){z.forEach(e=>{setTimeout(()=>{e.blur()},200)})},ye=function(){de.focus(),w(c===0?c=h.length-1:c=c-1),ge()},ve=function(){fe.focus(),c===h.length-1?w(c=0):w(c=c+1),ge()},he=function(e){e.includes("left")?ye():e.includes("right")?ve():e.includes("x")&&me()};ue.forEach((e,t)=>{e.addEventListener("click",function(n){n.preventDefault(),Ue(t),Ve(),w(c=0)})});let j=document.body.offsetWidth/2;const Ze=B(()=>j=document.body.offsetWidth/2,500);window.addEventListener("resize",function(){!m.classList.contains("active")||Ze()});m.addEventListener("click",function(){me()});k.addEventListener("click",function(e){e.stopPropagation(),e.clientX>=j?ve():ye()});k.addEventListener("mousemove",function(e){e.clientX>=j?k.style.cursor="url('svg/right.svg'), auto":k.style.cursor="url('svg/left.svg'), auto"});z.forEach(e=>{e.addEventListener("click",function(t){t.stopPropagation(),he(t.currentTarget.id)})});window.addEventListener("keydown",e=>{!m.classList.contains("active")||(e.key.includes("Left")||e.key.includes("Right"))&&(e.preventDefault(),he(e.key.toLowerCase()))});const I=[...document.querySelectorAll(".form-data")],Ke=document.querySelector("form"),X=document.querySelector("form button"),pe=document.querySelector("input#name"),Le=document.querySelector("input#email"),be=document.querySelector("textarea#message");I.forEach(e=>{e.addEventListener("blur",t=>{t.target.value.trim()===""?t.target.style="background-color: var(--clr-primary-transparent);":t.target.style="background-color: var(--clr-bgGrey);"}),e.addEventListener("focus",function(){e.style="background-color: var(--clr-bgGrey);"})});pe.addEventListener("input",e=>T(e.target,"Name is Required"));Le.addEventListener("input",e=>we(e.target,"Email cannot be blank","Email is not valid"));be.addEventListener("input",e=>T(e.target,"Message is Required"));let V=!1;X.addEventListener("click",e=>{if(_e(),!!V)return Qe(),!1});function Qe(){let e=new FormData;for(let n=0;n<I.length;n++)e.append(I[n].name,I[n].value);X.disabled=!0;let t=new XMLHttpRequest;t.open("POST","contact.php",!0),t.onload=function(){this.status==200?(X.disabled=!1,Ke.reset(),document.querySelector(".alert").classList.add("active"),setTimeout(()=>document.querySelector(".alert").classList.remove("active"),2e3)):this.status==405&&console.log("Method Not Allowed")},t.send(e)}function _e(){return T(pe,"Name is Required"),we(Le,"Email cannot be blank","Email is not valid"),T(be,"Message is Required"),!1}function T(e,t){e.value.trim()===""?G(e,t):Ee(e)}function we(e,t,n){e.value.trim()===""?G(e,t):Je(e.value.trim())?Ee(e):G(e,n)}function G(e,t){const n=e.nextElementSibling;n.innerText=t,e.parentElement.classList.remove("success"),e.parentElement.classList.add("error"),V=!1}function Ee(e){const t=e.nextElementSibling;t.innerText="",e.parentElement.classList.remove("error"),e.parentElement.classList.add("success"),V=!0}function Je(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)}