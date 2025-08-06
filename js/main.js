(function ($) {
  "use strict";

  $(document).ready(function () {
    function toggleNavbarMethod() {
      if ($(window).width() > 992) {
        // MANEJO DE MENÚS PRINCIPALES: Se abren al pasar el mouse
        $(".navbar .dropdown")
          .off("mouseover")
          .off("mouseout")
          .on("mouseover", function () {
            $(this)
              .addClass("show")
              .find(".dropdown-menu")
              .first()
              .addClass("show");
            $(this)
              .find(".dropdown-toggle")
              .first()
              .attr("aria-expanded", "true");
          })
          .on("mouseout", function () {
            var $this = $(this);
            // Retraso para evitar cierres accidentales al mover el mouse
            setTimeout(function () {
              // Solo cierra el menú principal si el mouse no está sobre él Y no hay submenús abiertos
              // Esto es crucial para que los submenús no se cierren inesperadamente.
              if (
                !$this.is(":hover") &&
                $this.find(".dropdown-menu .dropdown-menu.show").length === 0
              ) {
                $this
                  .removeClass("show")
                  .find(".dropdown-menu")
                  .first()
                  .removeClass("show");
                $this
                  .find(".dropdown-toggle")
                  .first()
                  .attr("aria-expanded", "false")
                  .blur();
              }
            }, 150); // Un pequeño retraso para suavizar el efecto
          });

        // MANEJO DE SUBMENÚS ANIDADOS (como 'Marco Legal'): Se abren SOLO al hacer clic
        // *** CRUCIAL: Desactivar explícitamente cualquier evento de mouseover/mouseout anterior ***
        $(".dropdown-menu .dropdown-item.dropdown-toggle")
          .off("mouseover")
          .off("mouseout");

        // Añadimos el evento de clic para los submenús anidados
        $(".dropdown-menu .dropdown-item.dropdown-toggle").on(
          "click",
          function (e) {
            var $el = $(this);
            var $subMenu = $el.next(".dropdown-menu");

            // Cierra cualquier otro submenú abierto en el mismo nivel (entre los anidados)
            $el
              .parents(".dropdown-menu")
              .first()
              .find(".dropdown-menu.show")
              .removeClass("show");

            // Alterna la visibilidad del submenú actual
            $subMenu.toggleClass("show");

            // Actualiza atributos de accesibilidad
            $el.toggleClass("active-submenu-parent"); // Para estilos si usas esta clase
            $el.attr("aria-expanded", $subMenu.hasClass("show"));

            // Detiene la propagación del evento para evitar que el menú principal se cierre
            e.stopPropagation();
            // Previene el comportamiento por defecto del enlace (href="#")
            e.preventDefault();
          }
        );

        // Cierra submenús anidados cuando el dropdown principal se cierra (por cualquier motivo)
        $(".navbar .dropdown").on("hidden.bs.dropdown", function () {
          $(this)
            .find(".dropdown-menu .dropdown-menu.show")
            .removeClass("show");
          $(this)
            .find(".dropdown-menu .dropdown-item.dropdown-toggle")
            .removeClass("active-submenu-parent");
          $(this)
            .find(".dropdown-menu .dropdown-item.dropdown-toggle")
            .attr("aria-expanded", "false");
        });
      } else {
        // EN PANTALLAS PEQUEÑAS (MÓVILES): Todo funciona con clic por defecto de Bootstrap
        // Aseguramos que no haya eventos de hover activos si se redimensiona
        $(".navbar .dropdown").off("mouseover").off("mouseout");
        $(".dropdown-menu .dropdown-item.dropdown-toggle")
          .off("mouseover")
          .off("mouseout");

        // Aseguramos que los submenús anidados sigan funcionando con clic en móviles
        $(".dropdown-menu .dropdown-item.dropdown-toggle").on(
          "click",
          function (e) {
            var $el = $(this);
            var $subMenu = $el.next(".dropdown-menu");

            $el
              .parents(".dropdown-menu")
              .first()
              .find(".show")
              .removeClass("show");
            $subMenu.toggleClass("show");
            $el.attr("aria-expanded", $subMenu.hasClass("show"));
            e.stopPropagation();
            e.preventDefault();
          }
        );
        // NOTA: Para los dropdowns principales en móviles, Bootstrap debería manejar el clic por defecto.
        // Si no funcionan, podrías necesitar un .on('click') específico para ellos también.
      }
    }

    // Inicializa la función y la vuelve a llamar al redimensionar la ventana
    toggleNavbarMethod();
    $(window).resize(toggleNavbarMethod);
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Portfolio isotope and filter
  var portfolioIsotope = $(".portfolio-container").isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
  });

  $("#portfolio-flters li").on("click", function () {
    $("#portfolio-flters li").removeClass("active");
    $(this).addClass("active");

    portfolioIsotope.isotope({ filter: $(this).data("filter") });
  });

  // Post carousel
  $(".post-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 2,
      },
    },
  });

  $(".postA-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 2,
      },
    },
  });

})(jQuery);

// Función para generar y renderizar las tarjetas de aranceles
function generarAranceles() {
  const contenedorAranceles = document.querySelector(
    ".row.justify-content-center"
  );
  let htmlContent = "";

  if (contenedorAranceles) {
    aranceles.forEach((item) => {
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

// Función para generar las tarjetas y el carrusel
function generarOfertaAcademica() {
  const contenedorOferta = document.querySelector(
    ".owl-carousel.ofertaA-carousel"
  );
  let htmlContent = "";

  if (contenedorOferta) {
    carreras.forEach((carrera) => {
      // El HTML de cada tarjeta va dentro de la clase testimonial-item
      htmlContent += `
        <div class="testimonial-item px-3">
          <a href="#" class="d-block" data-toggle="modal" data-target="#${carrera.modalId}">
            <img src="${carrera.imagenSrc}" alt="Imagen de ${carrera.titulo}" class="img-fluid-ofertaA rounded-top" />
          </a>
          <p class="text-muted text-center mt-2">Haz clic en la imagen para ver más detalles de la carrera.</p>
          <div class="card-body text-center">
            <h4 class="card-title">${carrera.titulo}</h4>
          </div>
          <div class="card-footer bg-transparent py-4 px-5">
            <div class="row border-bottom">
              <div class="col-6 py-1 text-right border-right"><strong>Resolución</strong></div>
              <div class="col-6 py-1">${carrera.resolucion}</div>
            </div>
            <div class="row border-bottom">
              <div class="col-6 py-1 text-right border-right"><strong>Duración</strong></div>
              <div class="col-6 py-1">${carrera.duracion}</div>
            </div>
            <div class="row border-bottom">
              <div class="col-6 py-1 text-right border-right"><strong>Modalidad</strong></div>
              <div class="col-6 py-1">${carrera.modalidad}</div>
            </div>
            <div class="row border-bottom">
              <div class="col-6 py-1 text-right border-right"><strong>Niveles</strong></div>
              <div class="col-6 py-1">${carrera.niveles}</div>
            </div>
            <div class="row">
              <div class="col-6 py-1 text-right border-right"><strong>Malla</strong></div>
              <div class="col-6 py-1"><a href="${carrera.mallaCurricular.url}">${carrera.mallaCurricular.texto}</a></div>
            </div>
          </div>
          <div class="card-body text-center mt-auto">
            <p class="card-title"><strong>¿Quieres comunicarte con un asesor?</strong></p>
            <a href="${carrera.waLink}" class="btn btn-primary px-4 mx-auto mb-4">Haz clic aquí</a>
          </div>
        </div>
      `;
    });
    contenedorOferta.innerHTML = htmlContent;

    // Aquí está la parte clave: inicializar el carrusel
    // Se inicializa después de que el HTML de las tarjetas se ha insertado
    $(contenedorOferta).owlCarousel({
      autoplay: true,
      smartSpeed: 1500,
      dots: false,
      loop: true,
      margin: 30,
      responsive: {
        0: { items: 1 },
        576: { items: 1 },
        768: { items: 2 },
        992: { items: 3 },
      },
    });
  }
}

// --- Función para generar dinámicamente los modales ---
function generarModalesOfertaAcademica() {
  const body = document.body;
  let modalsHtml = "";

  carreras.forEach((carrera) => {
    // Genera el HTML de la lista de perfil profesional
    const perfilHtml = carrera.perfilProfesional
      .map((item) => `<li>${item}</li>`)
      .join("");

    // Genera el HTML de la lista de campo laboral
    const campoLaboralHtml = carrera.campoLaboral
      .map((item) => `<li>${item}</li>`)
      .join("");

    modalsHtml += `
            <div class="modal fade" id="${carrera.modalId}" tabindex="-1" role="dialog" aria-labelledby="${carrera.modalId}Label" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="${carrera.modalId}Label">${carrera.titulo}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <h4>Descripción de la Carrera</h4>
                            <p>${carrera.descripcionModal}</p>

                            <h4>Perfil Profesional</h4>
                            <ul>${perfilHtml}</ul>

                            <h4>Campo Laboral</h4>
                            <p>Los egresados pueden desempeñarse en:</p>
                            <ul>${campoLaboralHtml}</ul>

                            <h4>Duración de la Carrera</h4>
                            <p>${carrera.duracionModal}</p>

                            <h4>Modalidad</h4>
                            <p>${carrera.modalidadModal}</p>

                            <hr />

                            <h4>Malla Curricular</h4>
                            <p>Consulta el plan de estudios detallado para esta carrera. Aquí podrás ver la distribución de asignaturas por semestre, créditos y requisitos.</p>
                            <div class="text-center">
                                <a href="${carrera.mallaCurricular.url}" target="_blank" class="btn btn-info py-2 px-4">
                                    <i class="fa fa-file-pdf mr-2"></i> Ver Malla Curricular PDF
                                </a>
                            </div>

                            <hr />
                            <p class="text-muted text-center">Para más detalles sobre requisitos de admisión o si tienes alguna pregunta adicional, por favor contacta a la secretaría académica.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
  });

  body.insertAdjacentHTML("beforeend", modalsHtml);
}

function generarSelloUnico() {
  const contenedorSello = document.querySelector(
    ".owl-carousel.selloU-carousel"
  );
  let htmlContent = "";

  // Asegúrate de que el array de datos esté disponible
  if (contenedorSello && typeof clubsSelloUnico !== "undefined") {
    clubsSelloUnico.forEach((club) => {
      let redesHtml = "";
      // Construye el HTML de las redes sociales si existen
      if (club.redes.length > 0) {
        redesHtml = `<div class="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">`;
        club.redes.forEach((red) => {
          redesHtml += `
                        <a class="btn btn-outline-light text-center mr-2 px-0" style="width: 38px; height: 38px" href="${red.enlace}" title="${red.titulo}">
                            <i class="${red.claseIcono}"></i>
                        </a>
                    `;
        });
        redesHtml += `</div>`;
      }

      // Genera el HTML de la tarjeta completa
      htmlContent += `
                <div class="text-center team mb-5">
                    <div class="position-relative overflow-hidden">
                        <img class="img-fluid-selloU" src="${club.imagenSrc}" alt="${club.alt}" />
                        ${redesHtml}
                    </div>
                    <h4>${club.titulo}</h4>
                    <i>${club.subtitulo}</i>
                </div>
            `;
    });

    // Inserta el HTML generado en el contenedor
    contenedorSello.innerHTML = htmlContent;

    // Finalmente, inicializa el carrusel con la librería OWL Carousel
    $(contenedorSello).owlCarousel({
      center: true,
      autoplay: true,
      smartSpeed: 2000,
      dots: true,
      loop: true,
      responsive: {
        0: { items: 1 },
        576: { items: 1 },
        768: { items: 2 },
        992: { items: 3 },
      },
    });
  }
}

function generarTestimonios() {
  const contenedorTestimonios = document.querySelector(
    ".owl-carousel.testimonial-carousel"
  );
  let htmlContent = "";

  // Verifica que el contenedor y el array de testimonios existan
  if (contenedorTestimonios && typeof testimonios !== "undefined") {
    testimonios.forEach((testimonio) => {
      htmlContent += `
                <div class="testimonial-item px-3">
                    <div class="bg-light shadow-sm rounded mb-4 p-4">
                        <h3 class="fas fa-quote-left text-primary mr-3"></h3>
                        ${testimonio.texto}
                    </div>
                    <div class="d-flex align-items-center">
                        <img
                            class="rounded-circle"
                            src="${testimonio.imagenSrc}"
                            style="width: 70px; height: 70px"
                            alt="Imagen de ${testimonio.nombre}"
                        />
                        <div class="pl-3">
                            <h5>${testimonio.nombre}</h5>
                            <i>${testimonio.carrera}</i>
                        </div>
                    </div>
                </div>
            `;
    });

    // Inserta el HTML generado en el contenedor del carrusel
    contenedorTestimonios.innerHTML = htmlContent;

    // Inicializa el carrusel con la configuración de OWL Carousel
    $(contenedorTestimonios).owlCarousel({
      autoplay: true,
      smartSpeed: 1500,
      dots: true,
      loop: true,
      responsive: {
        0: { items: 1 },
        576: { items: 1 },
        768: { items: 2 },
        992: { items: 3 },
      },
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  generarOfertaAcademica();
  generarModalesOfertaAcademica();
  generarSelloUnico();
  generarTestimonios();
  generarAranceles();
});
