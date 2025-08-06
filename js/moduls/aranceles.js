/*Aranceles*/
const aranceles = [
  {
    titulo: 'Aranceles: Administración',
    descripcion: 'Consulta los aranceles correspondientes a la carrera de Administración.',
    url: '/assets/docs/servicios/aranceles/ARANCELES ADMINISTRACIÓN PAO NOV2024 ABR2025 V2.0.pdf'
  },
  {
    titulo: 'Aranceles: CC y PA (Currículum 2019)',
    descripcion: 'Descarga los aranceles del currículum 2019 para Contaduría y Auditoría.',
    url: '/assets/docs/servicios/aranceles/ARANCELES CC Y PA CURRICULUM 2019 PAO NOV2024 ABR2025 V2.0.pdf'
  },
  {
    titulo: 'Aranceles: Educación Básica',
    descripcion: 'Consulta los aranceles específicos para la carrera de Educación Básica.',
    url: '/assets/docs/servicios/aranceles/ARANCELES ED BASICA PAO NOV2024 ABR2025 V2.0.pdf'
  },
  {
    titulo: 'Aranceles: Educación Bilingüe',
    descripcion: 'Encuentra el detalle de los aranceles para la carrera de Educación Bilingüe.',
    url: '/assets/docs/servicios/aranceles/ARANCELES ED BILINGUE PAO NOV2024 ABR2025 V2.0.pdf'
  },
  {
    titulo: 'Aranceles: Enfermería Veterinaria',
    descripcion: 'Información sobre los aranceles de la carrera de Enfermería Veterinaria.',
    url: '/assets/docs/servicios/aranceles/ARANCELES ENFERMERIA VETERINARIA PAO NOV2024 ABR2025 V2.0.pdf'
  },
  {
    titulo: 'Aranceles: Instrumentación Quirúrgica',
    descripcion: 'Consulta los aranceles para la carrera de Instrumentación Quirúrgica.',
    url: '/assets/docs/servicios/aranceles/ARANCELES INSTRUMENTACION QUIRURGICA PAO NOV2024 ABR2025 V2.0.pdf'
  },
  {
    titulo: 'Aranceles: Marketing Digital',
    descripcion: 'Detalle de los aranceles correspondientes a la carrera de Marketing Digital.',
    url: '/assets/docs/servicios/aranceles/ARANCELES MARKETING PAO NOV2024 ABR2025 V2.0.pdf'
  },
  {
    titulo: 'Aranceles: Minería',
    descripcion: 'Información sobre los aranceles aplicables a la carrera de Minería.',
    url: '/assets/docs/servicios/aranceles/ARANCELES MINERIA PAO NOV2024 ABR2025 V2.0.pdf'
  },
  {
    titulo: 'Aranceles: Producción Animal',
    descripcion: 'Accede a los aranceles para la carrera de Producción Animal.',
    url: '/assets/docs/servicios/aranceles/ARANCELES PRODUCCION ANIMAL PAO NOV2024 ABR2025 V2.0.pdf'
  },
  {
    titulo: 'Aranceles: Seguridad y Riesgos Laborales',
    descripcion: 'Consulta los aranceles para Seguridad y Prevención de Riesgos Laborales.',
    url: '/assets/docs/servicios/aranceles/ARANCELES SEGURIDAD RIESGOS PAO NOV2024 ABR2025 V2.0.pdf'
  },
  {
    titulo: 'Aranceles: Topografía',
    descripcion: 'Consulta los aranceles para Topografía.',
    url: '/assets/docs/servicios/aranceles/ARANCELES TOPOGRAFIA PAO NOV2024 ABR2025 V2.0.pdf'
  },
  {
    titulo: 'Derechos y Aranceles Generales',
    descripcion: 'Documento que detalla los derechos y aranceles generales de la institución.',
    url: '/assets/docs/servicios/aranceles/DERECHOS PAO NOV24 ABR25 V2.0.pdf'
  }
];

// Función para generar y renderizar las tarjetas de aranceles
function generarAranceles() {
  const contenedorAranceles = document.querySelector('.row.justify-content-center');
  let htmlContent = '';

  if (contenedorAranceles) {
    aranceles.forEach(item => {
      htmlContent += `
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="p-4 border rounded shadow-sm h-100 d-flex flex-column justify-content-between align-items-center text-center">
            <h4 class="mb-3">${item.titulo}</h4>
            <p class="text-muted mb-3">${item.descripcion}</p>
            <a href="${item.url}" target="_blank" class="btn btn-primary py-2 px-4 mt-auto">
              <i class="fa fa-file-pdf mr-2"></i> Descargar PDF
            </a>
          </div>
        </div>
      `;
    });
    contenedorAranceles.innerHTML = htmlContent;
  }
}
