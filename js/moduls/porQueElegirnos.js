document.addEventListener("DOMContentLoaded", function () {
  const ventajas = [
    {
      titulo: "Carreras únicas a nivel nacional",
      descripcion:
        "El ISTS brinda una educación diferente, con mayor proyección para el futuro del estudiante, adoptando actitudes laborales en el dominio de nuevas tecnologías, liderazgo o capacidad de iniciativa.",
    },
    {
      titulo: "Horarios flexibles",
      descripcion:
        "Contamos con dos modalidades de estudio, las cuales te permiten ser independiente con la oportunidad de organizar tu tiempo, además de complementar tu aprendizaje con talleres prácticos y tutorías constantes.",
    },
    {
      titulo: "Docentes altamente especializados",
      descripcion:
        "Nuestros profesores cuentan con gran experiencia en la Carrera que elijas estudiar, estarán a tu lado para guiarte y empoderarte a desarrollar todo tu potencial.",
    },
    {
      titulo: "Motivación a emprender",
      descripcion:
        "Todas nuestras Carreras, imparten un modelo innovador y escalable, que transforman la educación al formar profesionales que generen empleo y que contribuyan al desarrollo económico del país.",
    },
    {
      titulo: "Ser innovador",
      descripcion:
        "El ISTS no solo forma emprendedores, sino que también líderes de mente abierta, valoramos e incentivamos su pensamiento y acción en la diversidad de su entorno para innovar, para avanzar y para transformar.",
    },
  ];

  const lista = document.getElementById("ventajas-lista");

  if (lista) {
    ventajas.forEach((ventaja) => {
      const li = document.createElement("li");
      li.className = "py-2 border-bottom tooltip-container";

      const icono = document.createElement("i");
      icono.className = "fa fa-check text-primary mr-3";

      const texto = document.createTextNode(ventaja.titulo);

      const span = document.createElement("span");
      span.className = "tooltiptext";
      span.textContent = ventaja.descripcion;

      li.appendChild(icono);
      li.appendChild(texto);
      li.appendChild(span);

      lista.appendChild(li);
    });
  }
});