// generateRegulations.js

function generateRegulationsAccordion() {
  const accordionContainer = $('#regulationsAccordion');
  if (accordionContainer.length === 0) {
    console.error('Contenedor del acordeón no encontrado.');
    return;
  }

  let accordionHtml = '';
  regulationsData.forEach((regulation) => {
    const collapseId = `collapse-${regulation.id}`;
    const viewerId = `pdf-viewer-${regulation.id}`;
    
    // Genera el HTML completo para cada elemento del acordeón
    accordionHtml += `
      <div class="card">
        <div class="card-header" id="heading-${regulation.id}">
          <h5 class="mb-0">
            <button class="btn btn-link w-100 text-left text-secondary d-flex justify-content-between align-items-center"
                    data-toggle="collapse" 
                    data-target="#${collapseId}" 
                    aria-expanded="false" 
                    aria-controls="${collapseId}">
              ${regulation.title}
              <i class="fas fa-chevron-down accordion-arrow"></i>
            </button>
          </h5>
        </div>
        <div id="${collapseId}" class="collapse" aria-labelledby="heading-${regulation.id}" data-parent="#regulationsAccordion">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <button class="btn btn-primary prev-page" data-url="${regulation.filePath}" data-viewer-id="${viewerId}">Página anterior</button>
              <span class="page-info" data-url="${regulation.filePath}" data-viewer-id="${viewerId}">Página: 1</span>
              <button class="btn btn-primary  next-page" data-url="${regulation.filePath}" data-viewer-id="${viewerId}">Página siguiente</button>
            </div>
            <div id="${viewerId}" class="pdf-viewer">
              <div class="text-center p-3">Cargando documento...</div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  
  // Inserta todo el HTML de una sola vez
  accordionContainer.html(accordionHtml);

  // Adjunta los eventos a los elementos padre usando delegación
  accordionContainer.on('show.bs.collapse', '.collapse', function () {
    const panel = $(this);
    const viewerId = panel.find('.pdf-viewer').attr('id');
    const pdfUrl = panel.find('.page-info').data('url');
    const pdfViewerContainer = $(`#${viewerId}`);

    pdfViewerContainer.html(`<div class="text-center p-3">Cargando documento...</div>`);
    renderPDF(pdfUrl, pdfViewerContainer);
    panel.prev().find('.accordion-arrow').css('transform', 'rotate(180deg)');
  });

  accordionContainer.on('hide.bs.collapse', '.collapse', function () {
    $(this).prev().find('.accordion-arrow').css('transform', 'rotate(0deg)');
  });

  accordionContainer.on('click', '.prev-page', function() {
      const pdfUrl = $(this).data('url');
      const viewerId = $(this).data('viewer-id');
      const pdfViewerContainer = $(`#${viewerId}`);
      changePage(pdfUrl, -1, pdfViewerContainer);
  });

  accordionContainer.on('click', '.next-page', function() {
      const pdfUrl = $(this).data('url');
      const viewerId = $(this).data('viewer-id');
      const pdfViewerContainer = $(`#${viewerId}`);
      changePage(pdfUrl, 1, pdfViewerContainer);
  });
}

// Llama a la función al cargar el documento
$(document).ready(function() {
    generateRegulationsAccordion();
});