// Asegúrate de que la ruta del worker de PDF.js esté configurada al inicio
if (typeof pdfjsLib !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";
}

// Mapeo para guardar los objetos PDF y el estado de la página por acordeón
const pdfData = {};

/**
 * Función principal para renderizar el PDF en un contenedor específico.
 * @param {string} pdfUrl - La URL del archivo PDF.
 * @param {jQuery} container - El objeto jQuery del contenedor donde se renderizará el PDF.
 */
async function renderPDF(pdfUrl, container) {
  if (!container || !container.length) {
    console.error(`El contenedor no es válido.`);
    return;
  }
  
  // Muestra un mensaje de carga
  container.html(`<div class="text-center p-3">Cargando documento...</div>`);

  try {
    let pdfDoc = pdfData[pdfUrl] ? pdfData[pdfUrl].doc : null;
    let totalPages = 0;
    
    if (!pdfDoc) {
      pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
      totalPages = pdfDoc.numPages;
      pdfData[pdfUrl] = { doc: pdfDoc, currentPage: 1, totalPages: totalPages };
    } else {
      totalPages = pdfData[pdfUrl].totalPages;
    }

    // Llama a la función de renderizado de página
    renderPage(pdfDoc, pdfData[pdfUrl].currentPage, container);

  } catch (error) {
    console.error("Error al cargar el PDF:", error);
    container.html(`<p class="text-danger p-3">No se pudo cargar el documento. Por favor, asegúrese de que el archivo existe y la ruta es correcta.</p>`);
  }
}

/**
 * Función auxiliar para renderizar una página específica del PDF.
 * Este código se ha corregido para:
 * 1. Adaptar el tamaño al contenedor.
 * 2. Mejorar la calidad del renderizado en pantallas de alta resolución.
 * 3. Evitar que el PDF se salga del contenedor.
 */
function renderPage(pdfDoc, pageNum, container) {
  pdfDoc.getPage(pageNum).then(function (page) {
    const pdfContainer = container[0]; // Obtener el elemento DOM nativo

    if (pdfContainer) {
      // Obtener el ancho del contenedor para ajustar la escala
      const containerWidth = pdfContainer.clientWidth;
      const viewport = page.getViewport({ scale: 1.0 });

      // Obtener la relación de píxeles del dispositivo para una mejor calidad
      const outputScale = window.devicePixelRatio || 1;

      // Calcular la escala para que el PDF se adapte al ancho del contenedor
      const scale = containerWidth / viewport.width;
      const scaledViewport = page.getViewport({ scale: scale * outputScale });

      const canvas = document.createElement("canvas");
      
      container.html(""); // Limpiar el contenedor (usando jQuery)
      container.append(canvas); // Agregar el nuevo canvas

      const context = canvas.getContext("2d");
      
      // 1. Establecer las dimensiones del canvas para el renderizado de alta calidad
      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;

      // 2. Establecer el tamaño visible del canvas para que se adapte al contenedor
      canvas.style.width = containerWidth + 'px';
      canvas.style.height = scaledViewport.height / outputScale + 'px';

      // Renderizar la página en el canvas
      page.render({
        canvasContext: context,
        viewport: scaledViewport,
      });

    } else {
      console.error("PDF container element not found.");
    }
  }).catch(function (error) {
    console.error("Error al renderizar la página del PDF:", error);
    container.html(`<p class="text-danger p-3">Error al mostrar la página.</p>`);
  });
}

/**
 * Construye el acordeón dinámicamente con los datos de modelsData.
 */
function createAccordion() {
  const accordionContainer = $('#modelsAccordion');
  if (typeof modelsData === 'undefined' || !Array.isArray(modelsData)) {
    console.error('El arreglo modelsData no está definido o no es un arreglo.');
    return;
  }

  modelsData.forEach((model, index) => {
    const collapseId = `collapse-${index}`;
    const viewerId = `pdf-viewer-${index}`;
    const url = model.filePath;

    // Se crea un objeto jQuery completo para el acordeón
    const accordionItem = $(`
      <div class="card">
        <div class="card-header" id="heading-${index}">
          <h5 class="mb-0">
            <button class="btn btn-link w-100 text-left text-secondary d-flex justify-content-between align-items-center"
                    data-toggle="collapse" 
                    data-target="#${collapseId}" 
                    aria-expanded="false" 
                    aria-controls="${collapseId}">
              ${model.title}
              <i class="fas fa-chevron-down accordion-arrow"></i>
            </button>
          </h5>
        </div>
        <div id="${collapseId}" class="collapse" aria-labelledby="heading-${index}" data-parent="#modelsAccordion">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <button class="btn btn-primary prev-page" data-url="${url}">Página anterior</button>
              <span class="page-info" data-url="${url}">Página: 1</span>
              <button class="btn btn-primary next-page" data-url="${url}">Página siguiente</button>
            </div>
            <div id="${viewerId}">
            </div>
          </div>
        </div>
      </div>
    `);

    // Y se adjunta el objeto jQuery al contenedor jQuery
    accordionContainer.append(accordionItem);

    // Evento para renderizar el PDF al abrir el acordeón
    $(`#${collapseId}`).on('show.bs.collapse', function () {
      const pdfViewerContainer = $(`#${viewerId}`);
      renderPDF(url, pdfViewerContainer);
      // Rota la flecha hacia arriba
      $(`#heading-${index} .accordion-arrow`).css('transform', 'rotate(180deg)');
    });

    // Evento para rotar la flecha de vuelta cuando se cierra el acordeón
    $(`#${collapseId}`).on('hide.bs.collapse', function () {
      $(`#heading-${index} .accordion-arrow`).css('transform', 'rotate(0deg)');
    });

    // Eventos para la navegación de página (anterior/siguiente)
    $(`#${collapseId}`).on('click', '.prev-page', function() {
        const currentUrl = $(this).data('url');
        if (pdfData[currentUrl]) {
            const current = pdfData[currentUrl].currentPage;
            if (current > 1) {
                pdfData[currentUrl].currentPage--;
                const pdfViewerContainer = $(`#${viewerId}`);
                renderPage(pdfData[currentUrl].doc, pdfData[currentUrl].currentPage, pdfViewerContainer);
                updatePageInfo(currentUrl);
            }
        }
    });

    $(`#${collapseId}`).on('click', '.next-page', function() {
        const currentUrl = $(this).data('url');
        if (pdfData[currentUrl]) {
            const current = pdfData[currentUrl].currentPage;
            const total = pdfData[currentUrl].totalPages;
            if (current < total) {
                pdfData[currentUrl].currentPage++;
                const pdfViewerContainer = $(`#${viewerId}`);
                renderPage(pdfData[currentUrl].doc, pdfData[currentUrl].currentPage, pdfViewerContainer);
                updatePageInfo(currentUrl);
            }
        }
    });
    
    function updatePageInfo(currentUrl) {
      if (pdfData[currentUrl]) {
        const current = pdfData[currentUrl].currentPage;
        const total = pdfData[currentUrl].totalPages;
        $(`#${collapseId}`).find('.page-info').text(`Página: ${current} de ${total}`);
      }
    }
  });
}

// Inicia la creación del acordeón cuando el documento esté listo
$(document).ready(function () {
  createAccordion();
});