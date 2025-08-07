document.addEventListener("DOMContentLoaded", function () {
  const requisitos = [
    "Título de Bachiller y Acta de grado notarizada.",
    "Copia a color de la cédula de ciudadanía actualizada.",
    "Copia a color del certificado de votación actualizada.",
    "Copia a color del servicio básico del domicilio.",
    "2 fotos tamaño carnet en traje formal tomadas en estudio fotográfico.",
    "Certificado del tipo de sangre o licencia de conducir.",
    "Hoja de Inscripción (Paso 1).",
  ];

  const listaRequisitos = document.getElementById("lista-requisitos");

  if (listaRequisitos) {
    requisitos.forEach((requisito) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = requisito;
      listaRequisitos.appendChild(li);
    });
  }
});