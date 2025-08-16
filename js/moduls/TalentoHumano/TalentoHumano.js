// Configurar worker de PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

// Estado por visor/canvas
const pdfStates = {}; // { [canvasId]: { pdfDoc, pageNum } }

// Render de página
async function renderPage(canvasId, pageNum) {
  const state = pdfStates[canvasId];
  if (!state || pageNum < 1 || pageNum > state.pdfDoc.numPages) return;

  state.pageNum = pageNum;
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  try {
    const page = await state.pdfDoc.getPage(pageNum);

    // Escala basada en ancho del contenedor del canvas
    const container = canvas.parentElement;
    const containerWidth = container.clientWidth || canvas.clientWidth || 800;
    const viewport = page.getViewport({ scale: 1 });
    const scale = containerWidth / viewport.width;
    const scaledViewport = page.getViewport({ scale });

    canvas.width = Math.floor(scaledViewport.width);
    canvas.height = Math.floor(scaledViewport.height);

    await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;

    updatePaginator(canvasId);
  } catch (err) {
    console.error(`Error al renderizar página ${pageNum} (${canvasId}):`, err);
    ctx.font = '16px Arial';
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.fillText('Error al cargar la página', canvas.width / 2, canvas.height / 2);
  }
}

// Actualizar paginador del visor correspondiente
function updatePaginator(canvasId) {
  const state = pdfStates[canvasId];
  const paginator = document.querySelector(`.pdf-paginator[data-canvas-id*="${canvasId}"]`);
  if (!state || !paginator) return;

  paginator.querySelector('.page-num').textContent = state.pageNum;
  paginator.querySelector('.page-count').textContent = state.pdfDoc.numPages;

  paginator.querySelector('[data-action="prev"]').disabled = state.pageNum <= 1;
  paginator.querySelector('[data-action="next"]').disabled = state.pageNum >= state.pdfDoc.numPages;
}

// Cargar un PDF y dibujar primera página
async function loadPdfAndRender(pdfUrl, canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas "${canvasId}" no encontrado`);
    return;
  }

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '18px Arial';
  ctx.fillStyle = 'blue';
  ctx.textAlign = 'center';
  ctx.fillText('Cargando PDF...', canvas.width / 2 || 150, canvas.height / 2 || 20);

  try {
    // Codificar espacios/acentos en rutas automáticamente
    const safeUrl = encodeURI(pdfUrl);
    const pdfDoc = await pdfjsLib.getDocument(safeUrl).promise;

    pdfStates[canvasId] = { pdfDoc, pageNum: 1 };
    await renderPage(canvasId, 1);
  } catch (err) {
    console.error('Error al cargar el PDF:', err);
    ctx.font = '18px Arial';
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.fillText('Error al cargar el PDF', canvas.width / 2 || 150, canvas.height / 2 || 20);
  }
}

// Navegación del paginador (soporta varios canvas en data-canvas-id separados por coma)
function setupPaginators() {
  document.querySelectorAll('.pdf-paginator').forEach(paginator => {
    paginator.addEventListener('click', (e) => {
      const action = e.target.getAttribute('data-action');
      if (!action) return;

      // Determinar qué canvas controlar (el visible de la lista)
      const ids = (paginator.getAttribute('data-canvas-id') || '').split(',').map(s => s.trim()).filter(Boolean);
      if (ids.length === 0) return;

      let canvasId = ids.find(id => {
        const c = document.getElementById(id);
        return c && c.offsetParent !== null; // visible
      }) || ids[0];

      const state = pdfStates[canvasId];
      if (!state) return;

      if (action === 'prev' && state.pageNum > 1) {
        renderPage(canvasId, state.pageNum - 1);
      } else if (action === 'next' && state.pageNum < state.pdfDoc.numPages) {
        renderPage(canvasId, state.pageNum + 1);
      }
    });
  });
}

// Clicks en submenús que cargan PDF
function setupPdfMenuClicks() {
  document.querySelectorAll('.pdf-submenu .list-group-item').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const pdfSrc = link.getAttribute('data-pdf-src');
      const canvasId = link.getAttribute('data-canvas-id');

      // Si además es tab interno (data-bs-toggle="list"), mostramos el tab primero
      if (link.getAttribute('data-bs-toggle') === 'list') {
        const tab = new bootstrap.Tab(link);
        tab.show();
      }

      if (pdfSrc && canvasId) {
        loadPdfAndRender(pdfSrc, canvasId);
      }
    });
  });
}

// Redibujar al cambiar tamaño (solo los visibles)
function setupResponsiveRedraw() {
  window.addEventListener('resize', () => {
    Object.keys(pdfStates).forEach(canvasId => {
      const canvas = document.getElementById(canvasId);
      if (canvas && canvas.offsetParent !== null) {
        renderPage(canvasId, pdfStates[canvasId].pageNum);
      }
    });
  });

  // Redibujar cuando se cambia de tab principal o interno y el canvas entra en vista
  document.querySelectorAll('[data-bs-toggle="list"]').forEach(el => {
    el.addEventListener('shown.bs.tab', () => {
      Object.keys(pdfStates).forEach(canvasId => {
        const canvas = document.getElementById(canvasId);
        if (canvas && canvas.offsetParent !== null) {
          renderPage(canvasId, pdfStates[canvasId].pageNum);
        }
      });
    });
  });
}

// Mejores Evaluados: click para ver grande
function setupBestTeachers() {
  const perfiles = document.querySelectorAll('.clickable-item');
  const fotoPrincipal = document.getElementById('foto-principal');
  const nombreProfesor = document.getElementById('nombre-profesor');
  const contenedorFotoGrande = document.getElementById('contenedor-foto-grande');

  perfiles.forEach(perfil => {
    perfil.addEventListener('click', () => {
      const imagenSrc = perfil.getAttribute('data-large-src');
      const nombre = perfil.getAttribute('data-name');
      if (fotoPrincipal && nombreProfesor && contenedorFotoGrande) {
        fotoPrincipal.src = imagenSrc;
        nombreProfesor.textContent = nombre;
        contenedorFotoGrande.classList.remove('d-none');
      }
    });
  });
}

// Auto-cargar el primer PDF disponible al abrir la página
function autoloadFirstPdf() {
  const firstPdfLink = document.querySelector('.list-group-item[data-pdf-src]');
  if (firstPdfLink) firstPdfLink.click();
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  setupPaginators();
  setupPdfMenuClicks();
  setupResponsiveRedraw();
  setupBestTeachers();
  autoloadFirstPdf();
});
// Activar automáticamente el tab si el hash es #list-evaluacion
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === "#list-evaluacion") {
        const tabTrigger = document.querySelector('#list-evaluacion-list');
        if (tabTrigger) {
            const tab = new bootstrap.Tab(tabTrigger);
            tab.show();
        }

        const target = document.getElementById('list-evaluacion');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

