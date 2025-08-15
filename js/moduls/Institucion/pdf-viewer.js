// pdf-viewer.js

// Almacena los datos del PDF y el estado de la página por documento
const pdfData = {};

if (typeof pdfjsLib !== "undefined") {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";
}

// ----------------------------------------------------
// LÓGICA DEL VISOR DE PDF
// ----------------------------------------------------
async function renderPDF(pdfUrl, container) {
  if (!container || !container.length) return;
  container.html(`<div class="text-center p-3">Cargando documento...</div>`);

  try {
    let pdfDoc = pdfData[pdfUrl] ? pdfData[pdfUrl].doc : null;
    if (!pdfDoc) {
      pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
      pdfData[pdfUrl] = { 
        doc: pdfDoc,
        currentPage: 1,
        totalPages: pdfDoc.numPages
      };
    }
    renderPage(pdfDoc, pdfData[pdfUrl].currentPage, container, pdfUrl);
  } catch (error) {
    console.error("Error al cargar el PDF:", error);
    container.html(`<p class="text-danger p-3">No se pudo cargar el documento. Verifique la ruta del archivo.</p>`);
  }
}

function changePage(pdfUrl, direction, container) {
    if (pdfData[pdfUrl]) {
        const current = pdfData[pdfUrl].currentPage + direction;
        const total = pdfData[pdfUrl].totalPages;
        
        if (current >= 1 && current <= total) {
            pdfData[pdfUrl].currentPage = current;
            renderPage(pdfData[pdfUrl].doc, pdfData[pdfUrl].currentPage, container, pdfUrl);
            updatePageInfo(pdfUrl);
        }
    }
}

function updatePageInfo(pdfUrl) {
    if (pdfData[pdfUrl]) {
        const current = pdfData[pdfUrl].currentPage;
        const total = pdfData[pdfUrl].totalPages;
        const pageInfoElement = $(`[data-url="${pdfUrl}"].page-info`);
        if (pageInfoElement.length) {
            pageInfoElement.text(`Página: ${current} de ${total}`);
        }
    }
}

function renderPage(pdfDoc, pageNum, container, pdfUrl) {
  pdfDoc.getPage(pageNum).then(function (page) {
    const nativeContainer = container[0];
    if (!nativeContainer) return;
    
    const containerWidth = nativeContainer.clientWidth;
    const viewport = page.getViewport({ scale: 1.0 });
    const outputScale = window.devicePixelRatio || 1;
    const scale = containerWidth / viewport.width;
    const scaledViewport = page.getViewport({ scale: scale * outputScale });

    const canvas = document.createElement("canvas");
    container.html("");
    container.append(canvas);

    const context = canvas.getContext("2d");
    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;
    canvas.style.width = containerWidth + 'px';
    canvas.style.height = scaledViewport.height / outputScale + 'px';

    page.render({
      canvasContext: context,
      viewport: scaledViewport,
    });
    
    updatePageInfo(pdfUrl);
    
  }).catch(function (error) {
    console.error("Error al renderizar la página del PDF:", error);
    container.html(`<p class="text-danger p-3">Error al mostrar la página.</p>`);
  });
}