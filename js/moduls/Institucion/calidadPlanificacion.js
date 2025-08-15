// La URL del documento PDF que se va a visualizar
const url = "/assets/docs/institucion/calidadPlanificacion/AVAL20250221_09441421.pdf";

let pdfDoc = null;
let currentPage = 1;
let totalPages = 0;

// Función para renderizar una página específica del PDF
function renderPage(pageNum) {
  if (typeof pdfjsLib === 'undefined') {
    console.error("PDF.js library is not loaded.");
    return;
  }

  pdfDoc.getPage(pageNum).then(function (page) {
    const scale = 1.5;
    const viewport = page.getViewport({ scale: scale });

    const canvas = document.createElement("canvas");
    const pdfContainer = document.getElementById("pdf-container");

    if (pdfContainer) {
      pdfContainer.innerHTML = "";
      pdfContainer.appendChild(canvas);

      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      page.render({
        canvasContext: context,
        viewport: viewport,
      });

      const pageNumSpan = document.getElementById("page-num");
      if (pageNumSpan) {
        pageNumSpan.textContent = `Página: ${pageNum} de ${totalPages}`;
      }
    } else {
      console.error("PDF container element not found.");
    }
  }).catch(function(error) {
    console.error("Error loading the PDF page: " + error.message);
  });
}

// Función para cargar el documento PDF completo
function loadPDF() {
  if (typeof pdfjsLib === 'undefined') {
    console.error("PDF.js library is not loaded.");
    return;
  }

  pdfjsLib.getDocument(url).promise.then(function (pdf) {
    pdfDoc = pdf;
    totalPages = pdfDoc.numPages;
    renderPage(currentPage);
  }).catch(function(error) {
    console.error("Error loading the PDF: " + error.message);
  });
}

const prevPageButton = document.getElementById("prev-page");
if (prevPageButton) {
  prevPageButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
    }
  });
}

const nextPageButton = document.getElementById("next-page");
if (nextPageButton) {
  nextPageButton.addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      renderPage(currentPage);
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  loadPDF();
});