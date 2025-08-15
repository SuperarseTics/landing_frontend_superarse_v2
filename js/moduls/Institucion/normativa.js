// Función para incluir archivos HTML dinámicamente
function includeHTML() {
  const elements = document.querySelectorAll("[data-include]");
  elements.forEach((el) => {
    const file = el.getAttribute("data-include");
    fetch(file)
      .then((response) => {
        if (response.ok) return response.text();
        else throw new Error("Archivo no encontrado");
      })
      .then((data) => {
        el.innerHTML = data;
      })
      .catch((error) => {
        el.innerHTML = "<p>Error al cargar " + file + "</p>";
        console.error("Error al cargar el archivo:", error);
      });
  });
}

// Ejecuta la función al cargar el DOM
document.addEventListener("DOMContentLoaded", includeHTML);