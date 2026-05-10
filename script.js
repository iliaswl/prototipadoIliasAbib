const books = [
  { title: "Sombras en la Biblioteca", author: "Clara Ríos", reason: "Similar a tus lecturas breves de misterio", duration: "3 h 20 min", level: "Fácil", lang: "Español", format: "Texto y audio", progress: 42 },
  { title: "El Jardín de las Voces", author: "Mario Vidal", reason: "Por tus etiquetas: calma, fantasía y capítulos cortos", duration: "5 h 10 min", level: "Media", lang: "Español", format: "Texto", progress: 0 },
  { title: "Hábitos de Lectura en 15 Minutos", author: "Laura Campos", reason: "Recomendado por duración y ritmo diario", duration: "2 h 45 min", level: "Fácil", lang: "Español", format: "Audio", progress: 0 },
];

let currentScreen = "home";
const app = document.getElementById("app");

function header(title, subtitle = "", back = "") {
  return `<header class="header"><div class="header-row">${back ? `<button class="back" onclick="go('${back}')">‹</button>` : ""}<div><h1>${title}</h1>${subtitle ? `<p>${subtitle}</p>` : ""}</div></div></header>`;
}

function meta(book) {
  return `<div class="meta"><span>${book.duration}</span><span>${book.level}</span><span>${book.lang}</span><span>${book.format}</span></div>`;
}

function bookCard(book) {
  return `<article class="book-card"><div class="row"><div class="cover">${book.title[0]}</div><div class="grow"><h3>${book.title}</h3><div class="author">${book.author}</div><div class="stars">★ ★ ★ ★ ☆</div><p class="reason"><strong>Por qué:</strong> ${book.reason}</p></div></div>${meta(book)}<button class="button" onclick="go('detail')" style="margin-top:14px">Ver ficha del libro</button></article>`;
}

const screens = {
  home: () => `${header("Hola, Laura", "Tu lectura está lista para continuar")}
    <div class="content">
      <section class="card hero"><div class="row"><div class="icon"></div><div class="grow"><div class="title">Seguir donde lo dejé</div><div class="subtitle">Sombras en la Biblioteca · capítulo 4 · 42%</div><button class="button" onclick="go('reader')" style="margin-top:14px">Continuar lectura</button></div></div></section>
      <section class="grid-2"><button class="action-card dark" onclick="go('discover')"><div class="big">⌕</div><div class="title">Descubrir libros</div><div class="small">Filtros y recomendaciones</div></button><button class="action-card" onclick="go('audio')"><div class="big">🎧</div><div class="title">Escuchar audio</div><div class="small">Controles grandes</div></button></section>
      <section><div class="section-title"><h2>Recomendado para ti</h2><button class="link" onclick="go('results')">Ver todo</button></div>${bookCard(books[0])}</section>
      <section class="card"><div class="row"><div class="icon"></div><div><div class="title">Modo offline preparado</div><div class="subtitle">Contenido listo para trayectos sin conexión.</div></div></div></section>
    </div>`,

  discover: () => `${header("Descubrir", "Busca por tema, género o estado de ánimo")}
    <div class="content">
      <div class="search-row"><div class="search-box">⌕ <span>Buscar libro, autor o tema</span></div><button class="filter-btn">☰</button></div>
      <section class="section"><h2>Filtros rápidos</h2><div class="chips"><span class="chip">Misterio</span><span class="chip">15 min/día</span><span class="chip">Audio</span><span class="chip">Español</span><span class="chip">Dificultad fácil</span><span class="chip">Modo noche</span></div></section>
      <button class="button" onclick="go('results')">Aplicar filtros y ver recomendaciones</button>
      <section class="section"><h2>Ideas según tu contexto</h2><div class="context-card blue"><div class="title">Lecturas cortas para antes de dormir</div><div class="subtitle">Capítulos breves, modo nocturno y progreso automático.</div></div><br><div class="context-card green"><div class="title">Audiolibros para transporte</div><div class="subtitle">Controles grandes, descarga offline y temporizador.</div></div></section>
    </div>`,

  results: () => `${header("Resultados", "3 libros encontrados según tus preferencias", "discover")}<div class="content">${books.map(bookCard).join("")}</div>`,

  detail: () => `${header("Ficha del libro", "Información clara para decidir", "results")}
    <div class="content"><section class="details"><div class="cover big">S</div><div class="grow"><h2 style="margin:0">Sombras en la Biblioteca</h2><div class="author">Clara Ríos</div><p class="synopsis">Una novela breve de misterio ideal para leer en sesiones cortas, con capítulos ágiles y final cerrado.</p></div></section>
    <div class="meta"><span>Idioma: Español</span><span>Duración: 3 h 20 min</span><span>Nivel: Fácil</span><span>Texto/audio</span><span>Sin spoilers</span></div>
    <section class="info-box"><h3>Recomendación explicada</h3><p>Te lo sugerimos porque has filtrado misterio, duración corta y lectura nocturna.</p></section>
    <section class="grid-2"><button class="button" onclick="go('reader')">📖 Leer</button><button class="button light" onclick="go('audio')">🎧 Escuchar</button></section>
    <button class="button warn" onclick="go('library')">Guardar en mi biblioteca</button></div>`,

  reader: () => `<div class="reader"><div class="screen-inner">${header("Modo lectura", "Capítulo 4 · Progreso guardado", "detail")}
    <div class="content"><section class="reader-tools"><button class="reader-tool">Tamaño</button><button class="reader-tool">Modo noche</button><button class="reader-tool">Marcador</button><button class="reader-tool">Offline</button></section>
    <article class="reader-text"><p>La biblioteca estaba en silencio, salvo por el eco de unos pasos que parecían repetirse desde el pasillo central.</p><p>Laura bajó el brillo de la pantalla y activó el modo sin distracciones. Solo quedaba la historia, el marcador y una barra discreta que le indicaba cuánto había avanzado.</p><p>Al pausar, la aplicación guardaría automáticamente el punto exacto para poder retomarlo después.</p></article>
    <section class="progress-box"><div class="progress-row"><span>Progreso</span><span>42%</span></div><div class="bar"><div class="bar-fill"></div></div></section>
    <button class="button light" onclick="go('home')">✓ Pausar y guardar progreso</button></div></div></div>`,

  audio: () => `${header("Audiolibro", "Controles grandes para uso en movimiento", "detail")}
    <div class="content audio"><div class="audio-cover">S</div><div><h2>Sombras en la Biblioteca</h2><div class="subtitle">Capítulo 4 · 18 min restantes</div></div><div class="bar light"><div class="bar-fill"></div></div>
    <section class="controls"><button class="round">↶ 15</button><button class="round play" id="playBtn" onclick="togglePlay()">▶</button><button class="round">15 ↷</button></section>
    <section class="options"><button class="option">🔊<br>1.0x</button><button class="option">◷<br>Temporizador</button><button class="option">⬇<br>Offline</button></section></div>`,

  library: () => `${header("Mi biblioteca", "Libros guardados y preparados")}
    <div class="content">${bookCard(books[0])}<section class="card"><div class="row"><div class="icon">💬</div><div><div class="title">Ayuda contextual</div><div class="subtitle">Pregunta cómo usar filtros, lectura o audio.</div></div></div></section></div>`,

  progress: () => `${header("Progreso", "Métricas claras y no intrusivas")}
    <div class="content"><section class="card" style="background:#0f172a;color:white"><div class="small" style="color:#cbd5e1">Meta diaria</div><div style="font-size:34px;font-weight:900;margin-top:4px">15 min</div><p style="color:#cbd5e1;font-size:14px">Hoy llevas 11 minutos. Sin presión, puedes pausar el objetivo.</p><button class="button light">Pausar objetivo</button></section>
    <section class="grid-2"><div class="metric"><div class="small">Libros activos</div><div class="num">2</div></div><div class="metric"><div class="small">Racha suave</div><div class="num">4 días</div></div></section>
    <section class="card"><div class="title">Última actividad</div><div class="subtitle">Sombras en la Biblioteca · capítulo 4 · guardado automáticamente.</div></section></div>`
};

function go(screen){ currentScreen = screen; render(); }
function togglePlay(){ const btn = document.getElementById("playBtn"); if(btn) btn.textContent = btn.textContent.trim() === "▶" ? "Ⅱ" : "▶"; }
function render(){
  app.innerHTML = screens[currentScreen]();
  document.querySelectorAll(".nav-item").forEach(btn => btn.classList.toggle("active", btn.dataset.nav === currentScreen));
}
document.querySelectorAll("[data-nav]").forEach(btn => btn.addEventListener("click", () => go(btn.dataset.nav)));
render();
