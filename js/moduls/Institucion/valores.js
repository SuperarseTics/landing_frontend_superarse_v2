// valoresData.js

const valoresData = [
  {
    nombre: "Proactividad",
    id: "list-proactividad",
    texto: 
      "En el Instituto Superior Tecnológico Superarse, valoramos la capacidad de anticiparse a las necesidades, problemas y oportunidades, tomando la iniciativa para mejorar continuamente la organización, la investigación y los procesos administrativos. Fomentamos la identificación de oportunidades, la previsión y mitigación de obstáculos, la propuesta de innovaciones y la asunción de responsabilidad, todo esto mediante una comunicación efectiva que impulsa nuestro progreso institucional y el éxito académico.",
  },
  {
    nombre: "Calidad",
    id: "list-calidad",
    texto:
      "En el Instituto Superior Tecnológico Superarse, nos comprometemos a ofrecer una educación de alta calidad que cumpla con los más altos estándares académicos y profesionales. Fomentamos la excelencia en todos los aspectos de nuestro labor, desde lo administrativo, investigativo hasta la vinculación con la sociedad. Nos esforzamos por mejorar continuamente nuestros procesos y servicios, asegurando que cada estudiante reciba una formación integral que lo prepare para enfrentar los desafíos del mundo profesional con competencias sólidas.",
  },
  {
    nombre: "Sostenibilidad",
    id: "list-sostenibilidad",
    texto:
      "En el Instituto Superior Tecnológico Superarse, estamos comprometidos con el desarrollo sostenible, integrando prácticas que promuevan el equilibrio entre el crecimiento académico, la responsabilidad social y la protección del medio ambiente. Nos esforzamos por inculcar en nuestra comunidad educativa una conciencia ecológica y un sentido de responsabilidad hacia las generaciones futuras. A través de nuestras acciones y programas, fomentamos el uso eficiente de los recursos, la innovación sostenible y el respeto por el entorno, asegurando que nuestras actividades contribuyan positivamente al bienestar del planeta y la sociedad.",
  },
  {
    nombre: "Ética y Compromiso",
    id: "list-eticaCompromiso",
    texto:
      "En el Instituto Superior Tecnológico Superarse, nos guiamos por principios éticos sólidos y un profundo compromiso con la excelencia educativa. Fomentamos la integridad, la honestidad y el respeto en todas nuestras acciones, asegurando que cada decisión y esfuerzo reflejen nuestros valores fundamentales. Nuestro compromiso se manifiesta en la dedicación al crecimiento académico, la responsabilidad social y el bienestar de nuestra comunidad educativa, promoviendo un ambiente de confianza y colaboración que impulsa el desarrollo integral de toda la comunidad Superarse.",
  },
  {
    nombre: "Equidad e Inclusión",
    id: "list-equidadInclusion",
    texto:
      "En el Instituto Superior Tecnológico Superarse, promovemos un entorno donde todos tienen igualdad de oportunidades para aprender y desarrollarse, respetando y valorando la diversidad de nuestra comunidad. Nos esforzamos por eliminar barreras y garantizar que cada persona, independientemente de sus circunstancias, se sienta valorada y apoyada. Fomentamos una cultura de respeto y justicia, asegurando que nuestras políticas y prácticas reflejen un compromiso genuino con la equidad y la inclusión en todas nuestras acciones y decisiones.",
  },
];
// Ejemplo de cómo debería verse el generador de HTML
valoresData.forEach(valor => {
  // Crea el HTML para cada valor
  const htmlContent = `
    <div class="tab-pane fade" id="${valor.id}" role="tabpanel" aria-labelledby="${valor.id}-list">
      <h4>${valor.nombre}</h4>
      <p class="texto-justificado">${valor.texto}</p>
    </div>
  `;
  // Agrega el HTML al contenedor
  // ... tu código de inserción aquí
});