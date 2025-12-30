/* =====================================================
   CLUB CETTO · PRODUCTO FINAL
   3 MODOS · 100% JAVASCRIPT · SIN DEPENDENCIAS
===================================================== */
(function () {

/* =========================
   DATA · VINOS
========================= */
const WINES = [
  { id:"rp-ps", etiqueta:"Reserva Privada Petite Sirah", cuerpo:5, acidez:3, intensidad:5 },
  { id:"dl-terra", etiqueta:"Don Luis Terra", cuerpo:5, acidez:3, intensidad:4 },
  { id:"bt-malbec", etiqueta:"Boutique Malbec", cuerpo:4, acidez:3, intensidad:4 },
  { id:"lc-fb", etiqueta:"Línea Clásica Fumé Blanc", cuerpo:2, acidez:4, intensidad:2 },
  { id:"sb-rose", etiqueta:"Sierra Blanca Zinfandel Rosé", cuerpo:2, acidez:3, intensidad:2 }
];

/* =========================
   DATA · PLATILLOS
========================= */
const DISHES = [
  { cocina:"Mexicana", categoria:"Carnes", platillo:"Tacos al Pastor", vino:"Sierra Blanca Zinfandel Rosé", porQue:"La frescura y ligero dulzor equilibran grasa y piña." },
  { cocina:"Mexicana", categoria:"Aves", platillo:"Pollo con Mole", vino:"Reserva Privada Nebbiolo", porQue:"La estructura acompaña la complejidad del mole." },
  { cocina:"Parrilla", categoria:"Carnes", platillo:"Rib Eye", vino:"Don Luis Terra", porQue:"Taninos firmes limpian la grasa del corte." },
  { cocina:"Italiana", categoria:"Pastas", platillo:"Lasaña Boloñesa", vino:"Boutique Malbec", porQue:"La fruta y acidez acompañan tomate y carne." },
  { cocina:"Oriental", categoria:"Sushi", platillo:"Rollos Empanizados", vino:"Línea Clásica Blanc de Zinfandel", porQue:"Dulzor ligero equilibra fritura y salsa." }
];

/* =========================
   HELPERS
========================= */
const $ = s => document.querySelector(s);
const uniq = a => [...new Set(a)];

/* =========================
   BASE UI (PREMIUM)
========================= */
document.body.style.margin = "0";
document.body.style.background = "radial-gradient(circle at top, #1a1a1a, #0b0b0b)";
document.body.style.color = "#f5f5f5";
document.body.style.fontFamily = "system-ui,-apple-system";

document.body.innerHTML = `
<div id="cc" style="max-width:980px;margin:auto;padding:26px">
  <h1 style="margin:0;font-weight:600;letter-spacing:.5px">Club Cetto</h1>
  <p style="color:#bfa77a;margin:6px 0 16px">Marida mejor. Decide con confianza.</p>

  <div id="tabs" style="display:flex;gap:10px;flex-wrap:wrap">
    <button data-tab="platillo">🍽️ Marida tu Platillo</button>
    <button data-tab="dinamico">🍷 Sommelier Dinámico</button>
    <button data-tab="comparador">⚖️ Comparador de Vinos</button>
  </div>

  <div id="view" style="margin-top:18px"></div>
</div>
`;

document.querySelectorAll("#tabs button").forEach(b=>{
  b.style.padding="10px 16px";
  b.style.borderRadius="999px";
  b.style.border="1px solid #3a2f1f";
  b.style.background="#16110a";
  b.style.color="#f5f5f5";
  b.style.cursor="pointer";
});

/* =========================
   VIEW 1 · MARIDA TU PLATILLO
========================= */
function viewPlatillo(){
  $("#view").innerHTML=`
    <label>Cocina</label><select id="cocina"></select>
    <label>Categoría</label><select id="categoria"></select>
    <label>Platillo</label><select id="platillo"></select>
    <button id="ver">Ver maridaje</button>
    <div id="out"></div>
  `;
  styleForm();

  fill("#cocina", uniq(DISHES.map(d=>d.cocina)));
  $("#cocina").onchange=()=>fill("#categoria",
    uniq(DISHES.filter(d=>d.cocina===$("#cocina").value).map(d=>d.categoria))
  );
  $("#categoria").onchange=()=>fill("#platillo",
    DISHES.filter(d=>d.cocina===$("#cocina").value && d.categoria===$("#categoria").value)
      .map(d=>d.platillo)
  );
  $("#ver").onclick=()=>{
    const d=DISHES.find(x=>x.platillo===$("#platillo").value);
    if(!d) return;
    $("#out").innerHTML=`<h3 style="color:#d4b37c">${d.vino}</h3><p style="color:#bbb">${d.porQue}</p>
      <a href="https://lacetto.mx" target="_blank" style="color:#d4b37c">Quiero maridarlo</a>`;
  };
}

/* =========================
   VIEW 2 · SOMMELIER DINÁMICO
========================= */
function viewDinamico(){
  $("#view").innerHTML=`
    <label>¿Qué se te antoja?</label>
    <select id="mood">
      <option value="">Selecciona</option>
      <option value="ligero">Algo ligero</option>
      <option value="fresco">Algo fresco</option>
      <option value="potente">Algo potente</option>
    </select>
    <button id="reco">Recomendar vino</button>
    <div id="out"></div>
  `;
  styleForm();

  $("#reco").onclick=()=>{
    const m=$("#mood").value;
    const vino =
      m==="potente"?WINES[0]:
      m==="fresco"?WINES[3]:
      WINES[4];
    $("#out").innerHTML=`<h3 style="color:#d4b37c">${vino.etiqueta}</h3>
      <p style="color:#bbb">Elección segura según el estilo que buscas.</p>
      <a href="https://lacetto.mx" target="_blank" style="color:#d4b37c">Quiero maridarlo</a>`;
  };
}

/* =========================
   VIEW 3 · COMPARADOR DE VINOS
========================= */
function viewComparador(){
  $("#view").innerHTML=`
    <label>Selecciona dos vinos</label>
    <select id="v1"></select>
    <select id="v2"></select>
    <button id="cmp">Comparar</button>
    <div id="out"></div>
  `;
  styleForm();
  fill("#v1", WINES.map(w=>w.etiqueta));
  fill("#v2", WINES.map(w=>w.etiqueta));

  $("#cmp").onclick=()=>{
    const a=WINES.find(w=>w.etiqueta===$("#v1").value);
    const b=WINES.find(w=>w.etiqueta===$("#v2").value);
    if(!a||!b) return;
    const sa=a.cuerpo+a.intensidad;
    const sb=b.cuerpo+b.intensidad;
    const win=sa>=sb?a:b;
    $("#out").innerHTML=`<h3 style="color:#d4b37c">${win.etiqueta}</h3>
      <p style="color:#bbb">Mayor estructura y presencia para la mesa.</p>`;
  };
}

/* =========================
   UI HELPERS
========================= */
function fill(sel,arr){
  $(sel).innerHTML=`<option value="">Selecciona</option>`+
    arr.map(v=>`<option>${v}</option>`).join("");
}
function styleForm(){
  document.querySelectorAll("label").forEach(l=>{
    l.style.display="block";l.style.marginTop="14px";l.style.color="#cbb58a";
  });
  document.querySelectorAll("select,button").forEach(e=>{
    e.style.width="100%";e.style.marginTop="6px";e.style.padding="10px";
    e.style.borderRadius="12px";e.style.background="#120e08";
    e.style.color="#fff";e.style.border="1px solid #3a2f1f";
  });
  document.querySelectorAll("button").forEach(b=>{
    b.style.background="#8c734b";b.style.color="#0b0b0b";b.style.fontWeight="700";
  });
}

/* =========================
   TABS
========================= */
document.querySelector('[data-tab="platillo"]').onclick=viewPlatillo;
document.querySelector('[data-tab="dinamico"]').onclick=viewDinamico;
document.querySelector('[data-tab="comparador"]').onclick=viewComparador;

viewPlatillo();

})();
