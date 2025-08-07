document.addEventListener("DOMContentLoaded", function () {
  const documentos = [
    {
      title: "CUMPLIMIENTO IESS",
      file: "/assets/modules/servicios/cumplimientoTributario/docs/CERTIFICADO DE CUMPLIMIENTO IESS_superarse.pdf",
    },
    {
      title: "CUMPLIMIENTO TRIBUTARIO",
      file: "/assets/modules/servicios/cumplimientoTributario/docs/CUMPLIMIENTO TRIBUTARIO_superarse.pdf",
    },
    // Añade más documentos aquí si es necesario
    // { title: "OTRO DOCUMENTO", file: "/ruta/a/otro/documento.pdf" },
  ];

  const documentosList = document.getElementById("documentos-list");

  if (documentosList) {
    documentos.forEach((documento) => {
      const listItem = document.createElement("li");
      listItem.className =
        "list-group-item d-flex justify-content-between align-items-center";

      const titleSpan = document.createElement("span");
      titleSpan.textContent = documento.title;

      const link = document.createElement("a");
      link.href = documento.file;
      link.target = "_blank";
      link.className = "btn btn-sm btn-primary";

      const icon = document.createElement("i");
      icon.className = "fa fa-file-pdf mr-2";

      link.appendChild(icon);
      link.appendChild(document.createTextNode(" Ver PDF"));
      listItem.appendChild(titleSpan);
      listItem.appendChild(link);
      documentosList.appendChild(listItem);
    });
  }
});