// Flashcards de técnica radiográfica (kV y mAs). Requiere data.js
const BAND={lo:"bajo",mid:"medio",hi:"alto"};
const CARDS=RAW.split("\n").map((l,i)=>{const [r,n,kv,ma,mas,p]=l.split("|");return{id:i,r,n,kv:+kv,ma:+ma,mas:+mas,p:+p}});
const GROUPS=[["Cabeza y cara",["Cráneo","Macizo facial"]],["Columna",["Columna cervical","Columna torácica","Columna lumbar"]],["Tórax, abdomen y pelvis",["Tórax","Abdomen","Pelvis y sacro"]],["Miembro superior",["Hombro","Brazo","Codo y antebrazo","Muñeca y carpo","Mano"]],["Miembro inferior",["Fémur","Rodilla","Rótula","Pierna","Tobillo","Pie"]]];
const REGIONS=["Todas","Difíciles",...new Set(CARDS.map(c=>c.r))];
const SKEY="flashcards-kv-mas-v2",DAY=864e5,INT=[0,.3,1,3,7];
let S={c:{},mode:"nombre"};
try{const m=localStorage.getItem("flashcards-kv-mas-v1-mode");if(m&&!localStorage.getItem(SKEY))S.mode=m}catch(e){}
try{S=Object.assign(S,JSON.parse(localStorage.getItem(SKEY)||"{}"))}catch(e){}
try{if(!Object.keys(S.c).length)JSON.parse(localStorage.getItem("flashcards-kv-mas-v1")||"[]").forEach(id=>S.c[id]={b:3,n:1,f:0,d:Date.now()+3*DAY})}catch(e){}
if(!["nombre","imagen","examen"].includes(S.mode))S.mode="nombre";
const save=()=>{try{localStorage.setItem(SKEY,JSON.stringify(S))}catch(e){}};
const $=id=>document.getElementById(id);
const band=kv=>kv<=50?"lo":kv<=69?"mid":"hi";
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const box=c=>S.c[c.id]?.b||0,mastered=c=>box(c)>=3,hard=c=>(S.c[c.id]?.f||0)>0&&box(c)<3,due=c=>(S.c[c.id]?.d||0)<=Date.now();
const fin=ms=>ms<36e5?"en menos de 1 hora":ms<DAY?`en ${Math.ceil(ms/36e5)} h`:`en ${Math.ceil(ms/DAY)} días`;
let region="Todas",queue=[],flipped=false,res=null,practice=false,tab="r",H=false;
const inRegion=c=>region==="Todas"||(region==="Difíciles"?hard(c):c.r===region);
function grade(c,ok){const s=S.c[c.id]||(S.c[c.id]={b:0,n:0,f:0,d:0});s.n++;if(ok)s.b=Math.min(4,s.b+1);else{s.f++;s.b=0}s.d=ok?Date.now()+INT[s.b]*DAY:0;save()}
function build(){queue=shuffle(CARDS.filter(c=>inRegion(c)&&(practice||due(c)))).sort((a,b)=>box(a)-box(b));flipped=false;res=null;render()}
function chips(){
  $("chips").innerHTML=REGIONS.map(r=>`<button class="chip" aria-pressed="${r===region}" data-r="${r}">${r}</button>`).join("");
  $("chips").querySelectorAll(".chip").forEach(b=>b.onclick=()=>{region=b.dataset.r;practice=false;build()});
  const on=$("chips").querySelector('[aria-pressed="true"]');if(on)on.scrollIntoView({inline:"center",block:"nearest"});
}
function render(){
  chips();
  document.querySelectorAll("#modes button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.m===S.mode));
  const pool=CARDS.filter(inRegion),done=pool.filter(mastered).length,stg=$("stage");
  $("fill").style.width=pool.length?100*done/pool.length+"%":"0";
  $("s1").textContent=`${done} de ${pool.length} dominadas`;
  if(!queue.length){
    const nx=pool.map(c=>S.c[c.id]?.d||0).filter(d=>d>Date.now());
    const msg=!pool.length?"Aquí aparecen las tarjetas que has fallado y aún no dominas.":nx.length?`Todo al día. Próximo repaso ${fin(Math.min(...nx)-Date.now())}.`:"No hay tarjetas pendientes.";
    stg.innerHTML=`<div class="done"><h2>${pool.length?"Repaso al día":"Sin difíciles"}</h2><p>${msg}</p>${pool.length?`<button class="btn ok" id="pr" style="width:100%">Practicar igual</button>`:""}</div>`;
    if(pool.length)$("pr").onclick=()=>{practice=true;build()};
    return;
  }
  const c=queue[0],b=band(c.kv),f=INFO[c.p]||{rd:"",dfp:"",n:""},ex=S.mode==="examen";
  const src=typeof IMG!=="undefined"&&IMG[c.p];
  const img=src?`<div class="pic"><img src="${src}" alt="Posicionamiento y radiografía: ${c.n}"></div>`:`<div class="pic" style="color:#93A4AE;font-size:13px;align-items:center;justify-content:center">Imagen no disponible</div>`;
  const reg=`<span class="reg">${c.r} · quedan ${queue.length}</span>`;
  const front=ex?`<div class="face front">${reg}${img}<div class="name">${c.n}</div><div class="ans"><label>kV<input id="ak" inputmode="decimal" autocomplete="off"></label><label>mAs<input id="am" inputmode="decimal" autocomplete="off"></label></div></div>`
   :S.mode==="imagen"?`<div class="face front">${reg}${img}<span class="hint">¿Qué proyección es y qué técnica lleva? Toca para voltear</span></div>`
   :`<div class="face front">${reg}${img}<div class="name">${c.n}</div><span class="hint">Toca para voltear · desliza a la derecha si ya lo sabes</span></div>`;
  stg.innerHTML=`<div class="scene" id="scene"><div class="card" id="card"${ex?"":' role="button" tabindex="0" aria-label="Voltear tarjeta"'}>${front}
    <div class="face back"><div class="title">${c.n}</div>
      <div class="read"><div class="box kv band-${b}"><b>${c.kv}</b><span>kV · ${BAND[b]}</span></div><div class="box"><b>${c.mas}</b><span>mAs · ${c.ma} mA</span></div></div>
      ${img}
      <div class="det">${ex?'<p id="vrd"></p>':""}<p><b>RD:</b> ${f.rd}</p><p><b>DFP / Chasis:</b> ${f.dfp}</p>${f.n?`<p class="nt"><b>Nota:</b> ${f.n}</p>`:""}<p class="pg">Guía, pág. ${c.p}</p></div></div>
  </div></div>
  <div class="acts" id="acts">${ex?'<button class="btn ok wide" id="chk">Comprobar</button>':'<button class="btn" id="no">Repasar luego</button><button class="btn ok" id="yes">Ya lo sé</button>'}</div>`;
  if(ex){$("chk").onclick=check;$("am").onkeydown=e=>{if(e.key==="Enter")check()};return}
  $("card").onclick=flip;$("card").onkeydown=e=>{if(e.key===" "||e.key==="Enter"){e.preventDefault();flip()}};
  $("no").onclick=again;$("yes").onclick=know;
  let x0=null,y0=0;const sc=$("scene");
  sc.addEventListener("touchstart",e=>{x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
  sc.addEventListener("touchend",e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;
    if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.5){dx>0?know():again()}},{passive:true});
}
function flip(){flipped=!flipped;$("card").classList.toggle("flip",flipped)}
function again(){const c=queue.shift();grade(c,false);queue.splice(Math.min(3,queue.length),0,c);flipped=false;render()}
function know(){const c=queue.shift();grade(c,true);flipped=false;render()}
function check(){
  const c=queue[0],num=id=>parseFloat(($(id).value||"").replace(",","."));
  const k=num("ak"),m=num("am");
  if(isNaN(k)||isNaN(m)){(isNaN(k)?$("ak"):$("am")).focus();return}
  const exact=k===c.kv&&Math.abs(m-c.mas)<.05,ok=exact||(Math.abs(k-c.kv)<=5&&Math.abs(m-c.mas)<=c.mas*.25);
  grade(c,ok);res={ok};
  $("vrd").innerHTML=`<b class="${ok?"good":"bad"}">${exact?"Exacto":ok?"Cerca, dentro del margen":"Incorrecto"}</b> · tu respuesta: ${k} kV, ${m} mAs`;
  $("card").classList.add("flip");document.activeElement.blur();
  $("acts").innerHTML='<button class="btn ok wide" id="nxt">Siguiente</button>';$("nxt").onclick=next;
}
function next(){const c=queue.shift();if(!res.ok)queue.splice(Math.min(3,queue.length),0,c);flipped=false;res=null;render()}
const rng=(l,f)=>{const v=l.map(f);return{mn:Math.min(...v),mx:Math.max(...v),av:v.reduce((a,b)=>a+b,0)/v.length}};
const fmt=x=>Number.isInteger(x)?x:+x.toFixed(1);
const cell=(l,f)=>{const r=rng(l,f);return`<span class="val">${r.mn===r.mx?fmt(r.mn):fmt(r.mn)+"–"+fmt(r.mx)}<i>≈${fmt(r.av)}</i></span>`};
function sheet(){
  document.querySelectorAll(".tabs button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.t===tab));
  const sb=$("sb");
  if(tab==="r"){
    const row=(nm,sub,l,g)=>{const k=g?' class="gr"':"";return`<div${k}>${nm}${sub?`<small>${sub}</small>`:""}</div><div${k}>${cell(l,c=>c.kv)}</div><div${k}>${cell(l,c=>c.mas)}</div>`};
    let h=`<p class="note">Rango y promedio (≈) calculados con las proyecciones de tu guía. Oculta los valores y toca cada celda para comprobar lo que recuerdas.</p><div class="row" style="margin-top:0"><button class="btn" id="hd">${H?"Mostrar valores":"Ocultar valores"}</button></div><div class="grid${H?" hid":""}"><div class="g">Zona</div><div class="g">kV</div><div class="g">mAs</div>`;
    GROUPS.forEach(([g,rs])=>{h+=row(g,"",CARDS.filter(c=>rs.includes(c.r)),true);rs.forEach(r=>{const x=CARDS.filter(c=>c.r===r);h+=row(r,"mA "+[...new Set(x.map(c=>c.ma))].sort((a,b)=>a-b).join(" / "),x,false)})});
    sb.innerHTML=h+"</div>";$("hd").onclick=()=>{H=!H;sheet()};
  }else{
    const all=CARDS.map(c=>S.c[c.id]||{n:0,f:0}),n=all.reduce((a,s)=>a+s.n,0),fl=all.reduce((a,s)=>a+s.f,0);
    const hl=CARDS.filter(c=>(S.c[c.id]?.f||0)>0).sort((a,b)=>S.c[b.id].f-S.c[a.id].f).slice(0,8);
    let h=`<div class="kpi"><div><b>${CARDS.filter(mastered).length}/${CARDS.length}</b><span>dominadas</span></div><div><b>${n}</b><span>respuestas</span></div><div><b>${n?Math.round(100*(n-fl)/n)+"%":"—"}</b><span>aciertos</span></div></div><p class="note">Una tarjeta se domina al acertarla 3 veces seguidas. Cada acierto la aleja más (≈7 horas, 1 día, 3 días, 7 días) y un fallo la regresa al inicio. Margen del examen: ±5 kV y ±25 % en mAs.</p>`;
    h+=REGIONS.slice(2).map(r=>{const x=CARDS.filter(c=>c.r===r),d=x.filter(mastered).length;return`<div class="rw"><div class="t"><span>${r}</span><span>${d}/${x.length}</span></div><div class="bar"><i style="width:${100*d/x.length}%"></i></div></div>`}).join("");
    h+=`<div class="h2">Más difíciles</div>`+(hl.length?hl.map(c=>`<div class="hl"><span>${c.n}<small> · ${c.r}</small></span><span>${S.c[c.id].f} fallos de ${S.c[c.id].n}</span></div>`).join(""):`<p class="note">Aún no has fallado ninguna.</p>`);
    h+=`<div class="row"><button class="btn ok" id="pd">Practicar difíciles</button><button class="btn" id="rs">Borrar progreso</button></div>`;
    sb.innerHTML=h;
    $("pd").onclick=()=>{region="Difíciles";practice=false;$("sheet").hidden=true;build()};
    $("rs").onclick=()=>{if(confirm("¿Borrar todo el progreso?")){S.c={};save();$("sheet").hidden=true;build()}};
  }
}
const openSheet=t=>{tab=t;$("sheet").hidden=false;sheet()};
$("oR").onclick=()=>openSheet("r");$("oP").onclick=()=>openSheet("p");$("cl").onclick=()=>{$("sheet").hidden=true};
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{tab=b.dataset.t;sheet()});
$("sb").onclick=e=>{const v=e.target.closest(".val");if(v&&$("sb").querySelector(".hid"))v.classList.toggle("show")};
$("modes").onclick=e=>{const m=e.target.dataset.m;if(m){S.mode=m;save();flipped=false;res=null;render()}};
document.addEventListener("keydown",e=>{
  if(S.mode==="examen"||!queue.length||!$("sheet").hidden)return;
  if(e.key==="ArrowRight"){e.preventDefault();know()}else if(e.key==="ArrowLeft"){e.preventDefault();again()}
});
build();
if("serviceWorker" in navigator)addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));

