// js/ofertaAcademica.js

const carreras = [
  {
    titulo: 'Educación Básica',
    modalId: 'educacionBasicaModal',
    imagenSrc: '/assets/img/gestionAcademica/escuelaEducacionHumanidades/educacionBasica.png',
    resolucion: 'RPC-SO-03-No.039-2023',
    duracion: '2 Años',
    modalidad: 'Híbrida',
    niveles: '4 Niveles',
    mallaCurricular: {
      url: '#', // Actualiza con la URL de la malla
      texto: 'Clic aquí!'
    },
    waLink: 'https://wa.me/593995901732?text=Saludos%20Instituto%20Superarse,%20deseo%20tener%20mas%20información%20sobre%20la%20carrera%20de%20Educación%20básica',
// --- Contenido específico para el modal ---
    descripcionModal: "La carrera de Técnico Superior en Marketing Digital del Instituto Superior Tecnológico Superarse (ISTS) forma profesionales capaces de diseñar, implementar y gestionar estrategias de marketing en entornos digitales. Los egresados dominarán herramientas de SEO, SEM, redes sociales, email marketing y análisis de datos para impulsar el posicionamiento de marcas y productos en el ecosistema online.",
    perfilProfesional: [
        "Desarrollar planes de marketing digital y comunicación online.",
        "Crear y gestionar campañas publicitarias en plataformas digitales.",
        "Optimizar contenidos para motores de búsqueda (SEO).",
        "Administrar comunidades online y redes sociales.",
        "Analizar métricas y resultados de campañas digitales.",
        "Implementar estrategias de email marketing y automatización."
    ],
    campoLaboral: [
        "Agencias de marketing digital y publicidad.",
        "Departamentos de marketing de empresas de cualquier sector.",
        "Consultoría independiente en marketing digital.",
        "E-commerce y tiendas online.",
        "Medios de comunicación digitales."
    ],
    duracionModal: "La carrera tiene una duración de <strong>1 año</strong>, incluyendo prácticas preprofesionales supervisadas.",
    modalidadModal: "<strong>En línea</strong>"  
},
  {
    titulo: 'Enfermería Veterinaria',
    modalId: 'enfermeriaVeterinariaModal',
    imagenSrc: '/assets/img/gestionAcademica/escuelaVeterinaria/enfermeriaVeterinaria.png',
    resolucion: 'RPC-SO-26-No.429-2024',
    duracion: '2 Años',
    modalidad: 'Híbrida',
    niveles: '4 Niveles',
    mallaCurricular: {
      url: '/assets/docs/gestionAcademica/01. MALLA 25 - ENFERMERIA VETERINARIA.pdf',
      texto: 'Clic aquí!'
    },
    waLink: 'https://wa.me/593995901732?text=Saludos%20Instituto%20Superarse,%20deseo%20tener%20mas%20información%20sobre%20la%20carrera%20de%20Enfermería%20Veterinária',
// --- Contenido específico para el modal ---
    descripcionModal: "La carrera de Técnico Superior en Marketing Digital del Instituto Superior Tecnológico Superarse (ISTS) forma profesionales capaces de diseñar, implementar y gestionar estrategias de marketing en entornos digitales. Los egresados dominarán herramientas de SEO, SEM, redes sociales, email marketing y análisis de datos para impulsar el posicionamiento de marcas y productos en el ecosistema online.",
    perfilProfesional: [
        "Desarrollar planes de marketing digital y comunicación online.",
        "Crear y gestionar campañas publicitarias en plataformas digitales.",
        "Optimizar contenidos para motores de búsqueda (SEO).",
        "Administrar comunidades online y redes sociales.",
        "Analizar métricas y resultados de campañas digitales.",
        "Implementar estrategias de email marketing y automatización."
    ],
    campoLaboral: [
        "Agencias de marketing digital y publicidad.",
        "Departamentos de marketing de empresas de cualquier sector.",
        "Consultoría independiente en marketing digital.",
        "E-commerce y tiendas online.",
        "Medios de comunicación digitales."
    ],
    duracionModal: "La carrera tiene una duración de <strong>1 año</strong>, incluyendo prácticas preprofesionales supervisadas.",
    modalidadModal: "<strong>En línea</strong>"  
},
  {
    titulo: 'Producción Animal',
    modalId: 'produccionAnimalModal',
    imagenSrc: '/assets/img/gestionAcademica/escuelaVeterinaria/produccionAnimal.png',
    resolucion: 'RPC-SO-22- No.372 -2O19',
    duracion: '2 Años',
    modalidad: 'Híbrida',
    niveles: '4 Niveles',
    mallaCurricular: {
      url: '/assets/docs/gestionAcademica/02. MALLA 25 -PRODUCCION ANIMAL.pdf',
      texto: 'Clic aquí!'
    },
    waLink: 'https://wa.me/593995901732?text=Saludos%20Instituto%20Superarse,%20deseo%20tener%20mas%20información%20sobre%20la%20carrera%20de%20Producción%20Animal',
// --- Contenido específico para el modal ---
    descripcionModal: "La carrera de Técnico Superior en Marketing Digital del Instituto Superior Tecnológico Superarse (ISTS) forma profesionales capaces de diseñar, implementar y gestionar estrategias de marketing en entornos digitales. Los egresados dominarán herramientas de SEO, SEM, redes sociales, email marketing y análisis de datos para impulsar el posicionamiento de marcas y productos en el ecosistema online.",
    perfilProfesional: [
        "Desarrollar planes de marketing digital y comunicación online.",
        "Crear y gestionar campañas publicitarias en plataformas digitales.",
        "Optimizar contenidos para motores de búsqueda (SEO).",
        "Administrar comunidades online y redes sociales.",
        "Analizar métricas y resultados de campañas digitales.",
        "Implementar estrategias de email marketing y automatización."
    ],
    campoLaboral: [
        "Agencias de marketing digital y publicidad.",
        "Departamentos de marketing de empresas de cualquier sector.",
        "Consultoría independiente en marketing digital.",
        "E-commerce y tiendas online.",
        "Medios de comunicación digitales."
    ],
    duracionModal: "La carrera tiene una duración de <strong>1 año</strong>, incluyendo prácticas preprofesionales supervisadas.",
    modalidadModal: "<strong>En línea</strong>" 
},
  {
    titulo: 'Instrumentación Quirúrgica',
    modalId: 'instrumentacionQuirurgicaModal',
    imagenSrc: '/assets/img/gestionAcademica/escuelaSalud/instrumentacionQuirurgica/InstrumentacionQuirurgica.png',
    resolucion: 'RPC-SE-11-No.039-2024',
    duracion: '2 Años',
    modalidad: 'Presencial',
    niveles: '4 Niveles',
    mallaCurricular: {
      url: '#', // Actualiza con la URL de la malla
      texto: 'Clic aquí!'
    },
    waLink: 'https://wa.me/593995901732?text=Saludos%20Instituto%20Superarse,%20deseo%20tener%20mas%20información%20sobre%20la%20carrera%20de%20Instrumentación%20Quirúrgica',
// --- Contenido específico para el modal ---
    descripcionModal: "La carrera de Técnico Superior en Marketing Digital del Instituto Superior Tecnológico Superarse (ISTS) forma profesionales capaces de diseñar, implementar y gestionar estrategias de marketing en entornos digitales. Los egresados dominarán herramientas de SEO, SEM, redes sociales, email marketing y análisis de datos para impulsar el posicionamiento de marcas y productos en el ecosistema online.",
    perfilProfesional: [
        "Desarrollar planes de marketing digital y comunicación online.",
        "Crear y gestionar campañas publicitarias en plataformas digitales.",
        "Optimizar contenidos para motores de búsqueda (SEO).",
        "Administrar comunidades online y redes sociales.",
        "Analizar métricas y resultados de campañas digitales.",
        "Implementar estrategias de email marketing y automatización."
    ],
    campoLaboral: [
        "Agencias de marketing digital y publicidad.",
        "Departamentos de marketing de empresas de cualquier sector.",
        "Consultoría independiente en marketing digital.",
        "E-commerce y tiendas online.",
        "Medios de comunicación digitales."
    ],
    duracionModal: "La carrera tiene una duración de <strong>1 año</strong>, incluyendo prácticas preprofesionales supervisadas.",
    modalidadModal: "<strong>En línea</strong>" 
},
  {
    titulo: 'Marketing Digital',
    modalId: 'marketingDigitalModal',
    imagenSrc: '/assets/img/gestionAcademica/escuelaAdministracionIndustria/marketing.png',
    resolucion: 'RPC-SO-26-No.429-2024',
    duracion: '1 Años',
    modalidad: 'Línea',
    niveles: '2 Niveles',
    mallaCurricular: {
      url: '/assets/docs/gestionAcademica/08. MALLA 25 -  MARKETING DIGITAL.pdf',
      texto: 'Clic aquí!'
    },
    waLink: 'https://wa.me/593995901732?text=Saludos%20Instituto%20Superarse,%20deseo%20tener%20mas%20información%20sobre%20la%20carrera%20de%20Marketing%20Digital',
// --- Contenido específico para el modal ---
    descripcionModal: "La carrera de Técnico Superior en Marketing Digital del Instituto Superior Tecnológico Superarse (ISTS) forma profesionales capaces de diseñar, implementar y gestionar estrategias de marketing en entornos digitales. Los egresados dominarán herramientas de SEO, SEM, redes sociales, email marketing y análisis de datos para impulsar el posicionamiento de marcas y productos en el ecosistema online.",
    perfilProfesional: [
        "Desarrollar planes de marketing digital y comunicación online.",
        "Crear y gestionar campañas publicitarias en plataformas digitales.",
        "Optimizar contenidos para motores de búsqueda (SEO).",
        "Administrar comunidades online y redes sociales.",
        "Analizar métricas y resultados de campañas digitales.",
        "Implementar estrategias de email marketing y automatización."
    ],
    campoLaboral: [
        "Agencias de marketing digital y publicidad.",
        "Departamentos de marketing de empresas de cualquier sector.",
        "Consultoría independiente en marketing digital.",
        "E-commerce y tiendas online.",
        "Medios de comunicación digitales."
    ],
    duracionModal: "La carrera tiene una duración de <strong>1 año</strong>, incluyendo prácticas preprofesionales supervisadas.",
    modalidadModal: "<strong>En línea</strong>"  
},
  {
    titulo: 'Seguridad e Higiene del Trabajo',
    modalId: 'seguridadHigieneModal',
    imagenSrc: '/assets/img/gestionAcademica/escuelaAdministracionIndustria/SEGURIDAD E HIGIENE DEL TRABAJO.png',
    resolucion: 'N/A',
    duracion: '1 Años',
    modalidad: 'Línea',
    niveles: '2 Niveles',
    mallaCurricular: {
      url: '#',
      texto: 'Clic aquí!'
    },
    waLink: 'https://wa.me/593995901732?text=Saludos%20Instituto%20Superarse,%20deseo%20tener%20mas%20información%20sobre%20la%20carrera%20de%20Seguridad%20e%20Higiene%20del%20Trabajo',
// --- Contenido específico para el modal ---
    descripcionModal: "La carrera de Técnico Superior en Marketing Digital del Instituto Superior Tecnológico Superarse (ISTS) forma profesionales capaces de diseñar, implementar y gestionar estrategias de marketing en entornos digitales. Los egresados dominarán herramientas de SEO, SEM, redes sociales, email marketing y análisis de datos para impulsar el posicionamiento de marcas y productos en el ecosistema online.",
    perfilProfesional: [
        "Desarrollar planes de marketing digital y comunicación online.",
        "Crear y gestionar campañas publicitarias en plataformas digitales.",
        "Optimizar contenidos para motores de búsqueda (SEO).",
        "Administrar comunidades online y redes sociales.",
        "Analizar métricas y resultados de campañas digitales.",
        "Implementar estrategias de email marketing y automatización."
    ],
    campoLaboral: [
        "Agencias de marketing digital y publicidad.",
        "Departamentos de marketing de empresas de cualquier sector.",
        "Consultoría independiente en marketing digital.",
        "E-commerce y tiendas online.",
        "Medios de comunicación digitales."
    ],
    duracionModal: "La carrera tiene una duración de <strong>1 año</strong>, incluyendo prácticas preprofesionales supervisadas.",
    modalidadModal: "<strong>En línea</strong>" 
},
  {
    titulo: 'Seguridad y Prevención de Riesgos Laborales',
    modalId: 'prevencionRiesgosModal',
    imagenSrc: '/assets/img/gestionAcademica/escuelaAdministracionIndustria/SEGURIDAD Y PREVENCIÓN DE RIESGOS LABORALES.png',
    resolucion: 'N/A',
    duracion: '1 Años',
    modalidad: 'Línea',
    niveles: '2 Niveles',
    mallaCurricular: {
      url: '/assets/docs/gestionAcademica/05. MALLA 25 - SEGURIDAD Y PREVENCION DE RIESGOS LABORALES.pdf',
      texto: 'Clic aquí!'
    },
    waLink: 'https://wa.me/593995901732?text=Saludos%20Instituto%20Superarse,%20deseo%20tener%20mas%20información%20sobre%20la%20carrera%20de%20Seguridad%20y%20Prevención%20de%20Riesgos%20Laborales',
// --- Contenido específico para el modal ---
    descripcionModal: "La carrera de Técnico Superior en Marketing Digital del Instituto Superior Tecnológico Superarse (ISTS) forma profesionales capaces de diseñar, implementar y gestionar estrategias de marketing en entornos digitales. Los egresados dominarán herramientas de SEO, SEM, redes sociales, email marketing y análisis de datos para impulsar el posicionamiento de marcas y productos en el ecosistema online.",
    perfilProfesional: [
        "Desarrollar planes de marketing digital y comunicación online.",
        "Crear y gestionar campañas publicitarias en plataformas digitales.",
        "Optimizar contenidos para motores de búsqueda (SEO).",
        "Administrar comunidades online y redes sociales.",
        "Analizar métricas y resultados de campañas digitales.",
        "Implementar estrategias de email marketing y automatización."
    ],
    campoLaboral: [
        "Agencias de marketing digital y publicidad.",
        "Departamentos de marketing de empresas de cualquier sector.",
        "Consultoría independiente en marketing digital.",
        "E-commerce y tiendas online.",
        "Medios de comunicación digitales."
    ],
    duracionModal: "La carrera tiene una duración de <strong>1 año</strong>, incluyendo prácticas preprofesionales supervisadas.",
    modalidadModal: "<strong>En línea</strong>" 
},
  {
    titulo: 'Administración',
    modalId: 'administracionModal',
    imagenSrc: '/assets/img/gestionAcademica/escuelaAdministracionIndustria/ADMINSTRACION.png',
    resolucion: 'RPC-SO-31-No.541-2019',
    duracion: '1 Años',
    modalidad: 'Línea',
    niveles: '2 Niveles',
    mallaCurricular: {
      url: '/assets/docs/gestionAcademica/07. MALLA 25 -  ADMINISTRACION.pdf',
      texto: 'Clic aquí!'
    },
    waLink: 'https://wa.me/593995901732?text=Saludos%20Instituto%20Superarse,%20deseo%20tener%20mas%20información%20sobre%20la%20carrera%20de%20Administración',
// --- Contenido específico para el modal ---
    descripcionModal: "La carrera de Técnico Superior en Marketing Digital del Instituto Superior Tecnológico Superarse (ISTS) forma profesionales capaces de diseñar, implementar y gestionar estrategias de marketing en entornos digitales. Los egresados dominarán herramientas de SEO, SEM, redes sociales, email marketing y análisis de datos para impulsar el posicionamiento de marcas y productos en el ecosistema online.",
    perfilProfesional: [
        "Desarrollar planes de marketing digital y comunicación online.",
        "Crear y gestionar campañas publicitarias en plataformas digitales.",
        "Optimizar contenidos para motores de búsqueda (SEO).",
        "Administrar comunidades online y redes sociales.",
        "Analizar métricas y resultados de campañas digitales.",
        "Implementar estrategias de email marketing y automatización."
    ],
    campoLaboral: [
        "Agencias de marketing digital y publicidad.",
        "Departamentos de marketing de empresas de cualquier sector.",
        "Consultoría independiente en marketing digital.",
        "E-commerce y tiendas online.",
        "Medios de comunicación digitales."
    ],
    duracionModal: "La carrera tiene una duración de <strong>1 año</strong>, incluyendo prácticas preprofesionales supervisadas.",
    modalidadModal: "<strong>En línea</strong>"  
},
  {
    titulo: 'Topografía',
    modalId: 'topografiaModal',
    imagenSrc: '/assets/img/gestionAcademica/escuelaConstruccionExtraccion/TOPOGRAFIA.png',
    resolucion: 'RPC-SO-12-No.320-2021',
    duracion: '2 Años',
    modalidad: 'Híbrida',
    niveles: '4 Niveles',
    mallaCurricular: {
      url: '/assets/docs/gestionAcademica/04. MALLA 25 - TOPOGRAFIA.pdf',
      texto: 'Clic aquí!'
    },
    waLink: 'https://wa.me/593995901732?text=Saludos%20Instituto%20Superarse,%20deseo%20tener%20mas%20información%20sobre%20la%20carrera%20de%20Topografía',
// --- Contenido específico para el modal ---
    descripcionModal: "La carrera de Técnico Superior en Marketing Digital del Instituto Superior Tecnológico Superarse (ISTS) forma profesionales capaces de diseñar, implementar y gestionar estrategias de marketing en entornos digitales. Los egresados dominarán herramientas de SEO, SEM, redes sociales, email marketing y análisis de datos para impulsar el posicionamiento de marcas y productos en el ecosistema online.",
    perfilProfesional: [
        "Desarrollar planes de marketing digital y comunicación online.",
        "Crear y gestionar campañas publicitarias en plataformas digitales.",
        "Optimizar contenidos para motores de búsqueda (SEO).",
        "Administrar comunidades online y redes sociales.",
        "Analizar métricas y resultados de campañas digitales.",
        "Implementar estrategias de email marketing y automatización."
    ],
    campoLaboral: [
        "Agencias de marketing digital y publicidad.",
        "Departamentos de marketing de empresas de cualquier sector.",
        "Consultoría independiente en marketing digital.",
        "E-commerce y tiendas online.",
        "Medios de comunicación digitales."
    ],
    duracionModal: "La carrera tiene una duración de <strong>1 año</strong>, incluyendo prácticas preprofesionales supervisadas.",
    modalidadModal: "<strong>En línea</strong>"  
},
  {
    titulo: 'Minería',
    modalId: 'mineriaModal',
    imagenSrc: '/assets/img/gestionAcademica/escuelaConstruccionExtraccion/MINERIA.png',
    resolucion: 'RPC-SO-50-No.796-2022',
    duracion: '4 Años',
    modalidad: 'Línea',
    niveles: '2 Niveles',
    mallaCurricular: {
      url: '/assets/docs/gestionAcademica/03. MALLA 25 - MINERIA.pdf',
      texto: 'Clic aquí!'
    },
    waLink: 'https://wa.me/593995901732?text=Saludos%20Instituto%20Superarse,%20deseo%20tener%20mas%20información%20sobre%20la%20carrera%20de%20Minería',
// --- Contenido específico para el modal ---
    descripcionModal: "La carrera de Técnico Superior en Marketing Digital del Instituto Superior Tecnológico Superarse (ISTS) forma profesionales capaces de diseñar, implementar y gestionar estrategias de marketing en entornos digitales. Los egresados dominarán herramientas de SEO, SEM, redes sociales, email marketing y análisis de datos para impulsar el posicionamiento de marcas y productos en el ecosistema online.",
    perfilProfesional: [
        "Desarrollar planes de marketing digital y comunicación online.",
        "Crear y gestionar campañas publicitarias en plataformas digitales.",
        "Optimizar contenidos para motores de búsqueda (SEO).",
        "Administrar comunidades online y redes sociales.",
        "Analizar métricas y resultados de campañas digitales.",
        "Implementar estrategias de email marketing y automatización."
    ],
    campoLaboral: [
        "Agencias de marketing digital y publicidad.",
        "Departamentos de marketing de empresas de cualquier sector.",
        "Consultoría independiente en marketing digital.",
        "E-commerce y tiendas online.",
        "Medios de comunicación digitales."
    ],
    duracionModal: "La carrera tiene una duración de <strong>1 año</strong>, incluyendo prácticas preprofesionales supervisadas.",
    modalidadModal: "<strong>En línea</strong>"  
}
];