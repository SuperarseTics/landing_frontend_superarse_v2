// js/global.js

async function includeHTML() {
  const elements = document.querySelectorAll("[data-include]");
  const promises = [];

  elements.forEach((el) => {
    const file = el.getAttribute("data-include");
    const promise = fetch(file)
      .then((response) => {
        if (response.ok) return response.text();
        throw new Error("Archivo no encontrado: " + file);
      })
      .then((data) => {
        el.innerHTML = data;
      })
      .catch((error) => {
        console.error(error);
        el.innerHTML = "<p>Error al cargar " + file + "</p>";
      });
    promises.push(promise);
  });

  await Promise.all(promises);
}