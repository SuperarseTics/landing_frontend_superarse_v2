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

function generarHeader() {
  const headerContainer = document.querySelector(
    "body > .container-fluid.bg-light"
  );
  if (!headerContainer) {
    console.error("No se encontró el contenedor principal del header.");
    return;
  }

  // Función auxiliar para generar submenús de forma recursiva
  const generarDropdownMenu = (items) => {
    let menuHtml = "";
    items.forEach((item) => {
      if (item.items) {
        // Si el ítem tiene sub-ítems, genera otro dropdown (dropright)
        menuHtml += `
                    <div class="dropdown dropright">
                        <a class="dropdown-item dropdown-toggle" href="${
                          item.enlace || "#"
                        }" id="${
          item.id
        }" aria-haspopup="true" aria-expanded="false">
                            ${item.texto}
                        </a>
                        <div class="dropdown-menu rounded-0 m-0" aria-labelledby="${
                          item.id
                        }">
                            ${generarDropdownMenu(item.items)}
                        </div>
                    </div>
                `;
      } else {
        // Si es un ítem simple, genera un enlace
        menuHtml += `<a href="${item.enlace}" class="dropdown-item" ${
          item.target ? `target="${item.target}"` : ""
        }>${item.texto}</a>`;
      }
    });
    return menuHtml;
  };

  // Construye la barra superior
  let topbarHtml = `
        <nav class="navbar navbar-expand-lg py-2 px-0 px-lg-5 fixed-top bg-dark navbar-dark" style="font-size: 0.9rem; z-index: 1030">
            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="d-flex justify-content-start w-100">
    `;
  headerData.topbar.slice(0, 2).forEach((item) => {
    topbarHtml += `<a href="${item.enlace}" class="navbar-link ${item.clases}"><i class="${item.icono}"></i>${item.texto}</a>`;
  });
  topbarHtml += `</div><div class="navbar-nav ml-auto" style="margin-right: 10%">`;
  headerData.topbar.slice(2).forEach((item) => {
    if (item.items) {
      topbarHtml += `
                <div class="nav-item dropdown">
                    <a href="#" class="${item.clases}" data-toggle="dropdown">${
        item.texto
      }</a>
                    <div class="dropdown-menu rounded-0 m-0">
                        ${generarDropdownMenu(item.items)}
                    </div>
                </div>
            `;
    } else {
      topbarHtml += `<a href="${item.enlace}" class="${item.clases}" ${
        item.target ? `target="${item.target}"` : ""
      }>${item.texto}</a>`;
    }
  });
  topbarHtml += `</div></nav>`;

  // Construye la barra de navegación principal
  let mainNavHtml = `
        <nav class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0 px-lg-5 fixed-top" style="margin-top: 40px; z-index: 1020">
            <a href="/index.html" class="navbar-brand" style="width: min-content; height: min-content">
                <img src="/assets/img/content/logo/superarse_gris.png" alt="logo" width="150rem" />
            </a>
            <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                <div class="navbar-nav font-weight-bold mx-auto py-0">
    `;
  headerData.mainNav.forEach((item) => {
    if (item.items) {
      mainNavHtml += `
                <div class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">${
                      item.texto
                    }</a>
                    <div class="dropdown-menu rounded-0 m-0">
                        ${generarDropdownMenu(item.items)}
                    </div>
                </div>
            `;
    } else {
      mainNavHtml += `<a href="${item.enlace}" class="nav-item nav-link">${item.texto}</a>`;
    }
  });
  // Añade el enlace final de "Plataformas"
  mainNavHtml += `
                </div>
                <a href="${headerData.finalLink.enlace}" class="${
    headerData.finalLink.clases
  }" ${
    headerData.finalLink.target ? `target="${headerData.finalLink.target}"` : ""
  }>
                    ${headerData.finalLink.texto}
                </a>
            </div>
        </nav>
    `;

  // Inserta el HTML completo en el contenedor del header
  headerContainer.innerHTML = topbarHtml + mainNavHtml;
}

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
                    <ip>${club.subtitulo}</ip>
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
                            <ip>${testimonio.carrera}</ip>
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

// La función puede ir en tu archivo global.js, main.js o en un nuevo archivo footer.js
function generarFooter() {
  const footerContainer = document.querySelector(".footer-container");
  if (!footerContainer) {
    console.error("No se encontró el contenedor del footer.");
    return;
  }

  let footerHtml = `
        <a href="${
          footerData.whatsapp.enlace
        }" target="_blank" class="whatsapp-float">
            <img src="${footerData.whatsapp.imagenSrc}" alt="${
    footerData.whatsapp.alt
  }" width="50" height="50" />
        </a>

        <div class="container-fluid bg-secondary text-white mt-5 py-5 px-sm-3 px-md-5">
            <div class="row pt-5">
                <div class="col-lg-3 col-md-6 mb-5">
                    <a href="" class="navbar-brand font-weight-bold text-primary m-0 mb-4 p-0" style="font-size: 40px; line-height: 40px">
                        <img src="${footerData.info.logo}" height="90px" />
                    </a>
                    
                    <div class="d-flex justify-content-center mt-4 ">
                        ${footerData.info.redes
                          .map(
                            (red) => `
                            <a class="btn btn-outline-primary rounded-circle text-center mr-2 px-0" style="width: 38px; height: 38px" href="${red.enlace}">
                                <i class="${red.icono}"></i>
                            </a>
                        `
                          )
                          .join("")}
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 mb-5">
                    <h3 class="text-primary mb-4">${
                      footerData.contacto.titulo
                    }</h3>
                    ${footerData.contacto.elementos
                      .map(
                        (el) => `
                        <div class="d-flex">
                            <h4 class="fa ${el.icono} text-primary"></h4>
                            <div class="pl-3">
                                <h5 class="text-white">${el.titulo}</h5>
                                <p>${el.texto}</p>
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>

                <div class="col-lg-3 col-md-6 mb-5">
                    <h3 class="text-primary mb-4">${
                      footerData.enlacesRapidos.titulo
                    }</h3>
                    <div class="d-flex flex-column justify-content-start">
                        ${footerData.enlacesRapidos.items
                          .map(
                            (item) => `
                            <a class="text-white mb-2" href="${item.enlace}">
                                <i class="fa fa-angle-right mr-2"></i>${item.texto}
                            </a>
                        `
                          )
                          .join("")}
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 mb-5">
    <h3 class="text-primary mb-4">${footerData.admisiones.titulo}</h3>
    <form action="enviar-correo.php" method="POST">
        <div class="form-group">
            <input 
                type="text" 
                name="nombre" 
                class="form-control border-0 py-4" 
                placeholder="${footerData.admisiones.formulario.placeholderNombre}" 
                required="required" 
            />
        </div>
        <div class="form-group">
            <input 
                type="email" 
                name="email" 
                class="form-control border-0 py-4" 
                placeholder="${footerData.admisiones.formulario.placeholderEmail}" 
                required="required" 
            />
        </div>
        <div class="form-group">
            <textarea 
                id="description"
                name="description" 
                class="form-control textarea-as-input"
                placeholder="${footerData.admisiones.formulario.placeholderDescription}" 
                rows="3" 
                required></textarea>
        </div>
        <div>
            <button class="btn btn-primary btn-block border-0 py-3" type="submit">
                ${footerData.admisiones.formulario.textoBoton}
            </button>
        </div>
    </form>
</div>
            </div>

            <div class="container-fluid pt-5" style="border-top: 1px solid rgba(23, 162, 184, 0.2)">
                <p class="m-0 text-center text-white">
                    ${footerData.copyright.texto}
                </p>
            </div>
        </div>
    `;

  footerContainer.innerHTML = footerHtml;
}

// Esta función puede ir en tu main.js o en un archivo aparte.
function generarFacilities() {
  // Encuentra el contenedor principal donde se insertará el HTML
  const container = document.querySelector(".container-submenu .row");

  if (!container) {
    console.error("No se encontró el contenedor para las 'Facilities'.");
    return;
  }

  let htmlContent = "";

  // Itera sobre el array de datos y crea el HTML para cada tarjeta
  facilitiesData.forEach((facility, index) => {
    // Definimos el tamaño de las columnas.
    // Los primeros 4 elementos tienen 'col-lg-3', el resto 'col-lg-4'
    const colClass = index < 4 ? "col-lg-3" : "col-lg-3";

    htmlContent += `
        <div class="${colClass} col-md-4 col-sm-6 pb-1">
            <a href="${facility.enlace}" class="btn btn-block p-0">
                <div class="d-flex bg-light shadow-sm border-top rounded mb-4" style="padding: 30px">
                    <i class="${facility.icono} h1 font-weight-normal text-primary mb-3"></i>
                    <div class="pl-4">
                        <h4>${facility.titulo}</h4>
                    </div>
                </div>
            </a>
        </div>
    `;
  });

  // Inserta el HTML generado en el contenedor
  container.innerHTML = htmlContent;
}

// Menu de Institucional

// Esta función puede ir en tu main.js o en un archivo aparte
function generarValores() {
  const listGroupContainer = document.querySelector("#list-tab");
  const tabContentContainer = document.querySelector("#nav-tabContent");

  if (!listGroupContainer || !tabContentContainer) {
    console.error(
      "No se encontraron los contenedores para los Valores. Revisa los IDs."
    );
    return;
  }

  // Mapea y crea el HTML para los botones de la lista
  const listGroupHTML = valoresData
    .map((valor, index) => {
      const isActive = index === 0 ? "active" : "";
      return `
      <a class="list-group-item list-group-item-action ${isActive}"
         id="${valor.id}-list"
         data-bs-toggle="list"
         href="#${valor.id}"
         role="tab"
         aria-controls="${valor.id}">
        ${valor.nombre}
      </a>
    `;
    })
    .join("");

  // Mapea y crea el HTML para el contenido de las pestañas
  const tabContentHTML = valoresData
    .map((valor, index) => {
      const isActive = index === 0 ? "show active" : "";
      return `
      <div class="tab-pane fade ${isActive}"
           id="${valor.id}"
           role="tabpanel"
           aria-labelledby="${valor.id}-list">
        <p>${valor.texto}</p>
      </div>
    `;
    })
    .join("");

  // Inserta el HTML generado en los contenedores respectivos
  listGroupContainer.innerHTML = listGroupHTML;
  tabContentContainer.innerHTML = tabContentHTML;
}

// Esta función puede ir en tu main.js o en un archivo aparte.
function generarPlanesAcademicos() {
  // Encuentra el contenedor principal donde se insertarán las tarjetas
  const container = document.querySelector("#academic-plans-container");

  if (!container) {
    console.error("No se encontró el contenedor para los planes académicos.");
    return;
  }

  // Genera el HTML de las tarjetas usando el array de datos
  const cardsHTML = academicPlansData
    .map(
      (item) => `
    <div class="col-md-6 mb-3">
      <div class="card p-3">
        <i class="${item.icon} mb-2 text-primary"></i>
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">
          ${item.description}
        </p>
      </div>
    </div>
  `
    )
    .join("");

  // Inserta el HTML completo en el contenedor
  container.innerHTML = cardsHTML;
}
// Esta función puede ir en tu main.js o en un archivo aparte.

function generarEquipoDirectivo() {

 // Encuentra el contenedor principal donde se insertarán las tarjetas

  const container = document.querySelector("#equipo-directivo-container");
if (!container) {

    console.error(

   "No se encontró el contenedor para el equipo directivo. Revisa el ID."

           );

     return;

  }
 // Genera el HTML de las tarjetas usando el array de datos
          const teamHTML = authoritiesData
       .map(

     (member) => `
    <div class="col-md-4 col-lg-3 mb-4 text-center">
   <img
   class="img-fluid-autoridades rounded-circle mb-3"
  src="${member.image}"
 alt="${member.altText}"
 />
 <h5 class="mb-1">${member.name}</h5>
 <p class="text-primary mb-1 font-weight-bold">${member.position}</p>
 <p class="text-muted small">
 <a href="mailto:${member.email}">
 ${member.email}
</a>
 </p>
 </div>
 ` ) .join("");
 // Inserta el HTML completo en el contenedor
 container.innerHTML = teamHTML;
}

// Esta función puede ir en tu main.js o en un archivo aparte.

function generarModelosAcordeon() {

// Encuentra el contenedor principal del acordeón por su ID
 const accordionContainer = document.querySelector("#modelsAccordion");
if (!accordionContainer) {
 console.error("No se encontró el contenedor del acordeón. Revisa el ID.");
 return;
}
// Genera el HTML completo del acordeón usando el array de datos

const accordionHTML = modelsData
.map((model, index) => {
// Determina si es el primer elemento para aplicar la clase 'active'
 const isActive = index === 0 ? "show" : "";
 const isCollapsed = index === 0 ? "" : "collapsed";
 return `
<div class="card">
<div class="card-header" id="heading${model.id}">
<h2 class="mb-0">
<button
 class="btn btn-block text-left d-flex justify-content-between align-items-center ${isCollapsed}"
type="button"
data-toggle="collapse"
data-target="#collapse${model.id}"
aria-expanded="${index === 0 ? "true" : "false"}"
aria-controls="collapse${model.id}">
<span>${model.title}</span>
<i class="fa fa-chevron-down"></i>
</button>
</h2>
</div>
<div
id="collapse${model.id}"
class="collapse ${isActive}"
aria-labelledby="heading${model.id}"
data-parent="#modelsAccordion"
>
<div class="card-body text-center">
<div
class="embed-responsive embed-responsive-4by3 w-100 mb-3"
style="height: 500px"
>
<iframe
class="embed-responsive-item"
src="${model.filePath}"
style="width: 100%; height: 100%; border: 0"
frameborder="0"
allowfullscreen
 ></iframe>
</div>
</div>
</div>
</div>
 `;
 })

// Inserta el HTML completo en el contenedor del acordeón

 accordionContainer.innerHTML = accordionHTML;

}


// Esta función puede ir en tu main.js o en un archivo aparte.
function generarReglamentosAcordeon() {
  const accordionContainer = document.querySelector("#regulationsAccordion");

  if (!accordionContainer) {
    console.error("No se encontró el contenedor del acordeón. Revisa el ID.");
    return;
  }

  const accordionHTML = regulationsData
    .map((regulation, index) => {
      // Determina si es el primer elemento para que esté abierto por defecto
      const isFirst = index === 0;
      const isActive = isFirst ? "show" : "";
      const isCollapsed = isFirst ? "" : "collapsed";

      return `
      <div class="card">
        <div class="card-header" id="heading${regulation.id}">
          <h2 class="mb-0">
            <button
              class="btn btn-block text-left d-flex justify-content-between align-items-center ${isCollapsed}"
              type="button"
              data-toggle="collapse"
              data-target="#collapse${regulation.id}"
              aria-expanded="${isFirst ? "true" : "false"}"
              aria-controls="collapse${regulation.id}"
            >
              <span>${regulation.title}</span>
              <i class="fa fa-chevron-down"></i>
            </button>
          </h2>
        </div>
        <div
          id="collapse${regulation.id}"
          class="collapse ${isActive}"
          aria-labelledby="heading${regulation.id}"
          data-parent="#regulationsAccordion"
        >
          <div class="card-body text-center">
            <div class="embed-responsive embed-responsive-4by3 w-100 mb-3" style="height: 600px;">
              <iframe
                class="embed-responsive-item"
                src="${regulation.filePath}"
                style="width:100%; height:100%; border:0;"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  accordionContainer.innerHTML = accordionHTML;
}

// menu de gestion academica
// Esta función puede ir en tu main.js o en un archivo aparte
function generarEscuelaDeSalud() {
  const cardsContainer = document.querySelector("#schoolOfHealthCards");
  const modalsContainer = document.querySelector("#schoolOfHealthModals");

  if (!cardsContainer || !modalsContainer) {
    console.error(
      "No se encontraron los contenedores para las tarjetas o modales de la Escuela de Salud. Revisa los IDs."
    );
    return;
  }

  let cardsHTML = "";
  let modalsHTML = "";

  schoolOfHealthData.forEach((career) => {
    // Generar la tarjeta de la carrera
    cardsHTML += `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="career-card text-center p-4 border rounded shadow-sm h-100 d-flex flex-column justify-content-between">
          <h3 class="mb-3">${career.title}</h3>
          <a
            href="#"
            class="d-block mb-3"
            data-toggle="modal"
            data-target="#${career.id}Modal"
          >
            <img
              src="${career.imagePath}"
              alt="Imagen de ${career.title}"
              class="img-fluid rounded"
            />
          </a>
          <p class="text-muted">
            Haz clic en la imagen para ver más detalles de la carrera.
          </p>
        </div>
      </div>
    `;

    // Generar el modal de la carrera
    const profileList = career.profile
      .map((item) => `<li>${item}</li>`)
      .join("");
    const careerPathList = career.careerPath
      .map((item) => `<li>${item}</li>`)
      .join("");

    modalsHTML += `
      <div
        class="modal fade"
        id="${career.id}Modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="${career.id}ModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="${career.id}ModalLabel">
                ${career.title}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h4>Descripción de la Carrera</h4>
              <p>${career.description}</p>

              <h4>Perfil Profesional</h4>
              <ul>${profileList}</ul>

              <h4>Campo Laboral</h4>
              <p>Los tecnólogos en ${career.title} pueden desempeñarse en:</p>
              <ul>${careerPathList}</ul>

              <h4>Duración de la Carrera</h4>
              <p>
                La carrera tiene una duración de <strong>${career.duration}</strong>.
              </p>

              <h4>Modalidad</h4>
              <p>
                <strong>${career.modality}</strong>
              </p>

              <hr />
              <h4>Malla Curricular</h4>
              <p>
                Consulta el plan de estudios detallado para esta carrera. Aquí podrás ver la distribución de asignaturas por semestre, créditos y requisitos.
              </p>
              <div class="text-center">
                <a
                  href="${career.curriculumLink}"
                  target="_blank"
                  class="btn btn-info py-2 px-4"
                >
                  <i class="fa fa-file-pdf mr-2"></i> Ver Malla Curricular PDF
                </a>
              </div>

              <hr />
              <p class="text-muted text-center">
                Para más detalles sobre requisitos de admisión o si tienes alguna pregunta adicional, por favor contacta a la secretaría académica.
              </p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  cardsContainer.innerHTML = cardsHTML;
  modalsContainer.innerHTML = modalsHTML;
}

// Esta función puede ir en tu main.js o en un archivo aparte
function generarEducacionYHumanidades() {
  const cardsContainer = document.querySelector("#educationAndHumanitiesCards");
  const modalsContainer = document.querySelector(
    "#educationAndHumanitiesModals"
  );

  if (!cardsContainer || !modalsContainer) {
    console.error(
      "No se encontraron los contenedores para las tarjetas o modales de la Escuela de Educación y Humanidades. Revisa los IDs."
    );
    return;
  }

  let cardsHTML = "";
  let modalsHTML = "";

  educationAndHumanitiesData.forEach((career) => {
    // Generar la tarjeta de la carrera
    cardsHTML += `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="career-card text-center p-4 border rounded shadow-sm h-100 d-flex flex-column justify-content-between">
          <h3 class="mb-3">${career.title}</h3>
          <a
            href="#"
            class="d-block mb-3"
            data-toggle="modal"
            data-target="#${career.id}Modal"
          >
            <img
              src="${career.imagePath}"
              alt="Imagen de ${career.title}"
              class="img-fluid rounded"
            />
          </a>
          <p class="text-muted">
            Haz clic en la imagen para ver más detalles de la carrera.
          </p>
        </div>
      </div>
    `;

    // Generar el modal de la carrera
    const profileList = career.profile
      .map((item) => `<li>${item}</li>`)
      .join("");
    const careerPathList = career.careerPath
      .map((item) => `<li>${item}</li>`)
      .join("");

    modalsHTML += `
      <div
        class="modal fade"
        id="${career.id}Modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="${career.id}ModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="${career.id}ModalLabel">
                ${career.title}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h4>Descripción de la Carrera</h4>
              <p>${career.description}</p>

              <h4>Perfil Profesional</h4>
              <ul>${profileList}</ul>

              <h4>Campo Laboral</h4>
              <p>Los tecnólogos en ${career.title} pueden desempeñarse en:</p>
              <ul>${careerPathList}</ul>

              <h4>Duración de la Carrera</h4>
              <p>
                La carrera tiene una duración de <strong>${career.duration}</strong>, incluyendo prácticas preprofesionales supervisadas.
              </p>

              <h4>Modalidad</h4>
              <p>
                <strong>${career.modality}</strong>
              </p>

              <hr />
              <h4>Malla Curricular</h4>
              <p>
                Consulta el plan de estudios detallado para esta carrera. Aquí podrás ver la distribución de asignaturas por semestre, créditos y requisitos.
              </p>
              <div class="text-center">
                <a
                  href="${career.curriculumLink}"
                  target="_blank"
                  class="btn btn-info py-2 px-4"
                >
                  <i class="fa fa-file-pdf mr-2"></i> Ver Malla Curricular PDF
                </a>
              </div>

              <hr />
              <p class="text-muted text-center">
                Para más detalles sobre requisitos de admisión o si tienes alguna pregunta adicional, por favor contacta a la secretaría académica.
              </p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  cardsContainer.innerHTML = cardsHTML;
  modalsContainer.innerHTML = modalsHTML;
}

// Esta función puede ir en tu main.js o en un archivo aparte
function generarEscuelaDeVeterinaria() {
  const cardsContainer = document.querySelector("#veterinarySchoolCards");
  const modalsContainer = document.querySelector("#veterinarySchoolModals");

  if (!cardsContainer || !modalsContainer) {
    console.error(
      "No se encontraron los contenedores para las tarjetas o modales de la Escuela de Veterinaria. Revisa los IDs."
    );
    return;
  }

  let cardsHTML = "";
  let modalsHTML = "";

  veterinarySchoolData.forEach((career) => {
    // Generar la tarjeta de la carrera
    cardsHTML += `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="career-card text-center p-4 border rounded shadow-sm h-100 d-flex flex-column justify-content-between">
          <h3 class="mb-3">${career.title}</h3>
          <a
            href="#"
            class="d-block mb-3"
            data-toggle="modal"
            data-target="#${career.id}Modal"
          >
            <img
              src="${career.imagePath}"
              alt="Imagen de ${career.title}"
              class="img-fluid rounded"
            />
          </a>
          <p class="text-muted">
            Haz clic en la imagen para ver más detalles de la carrera.
          </p>
        </div>
      </div>
    `;

    // Generar el modal de la carrera
    const profileList = career.profile
      .map((item) => `<li>${item}</li>`)
      .join("");
    const careerPathList = career.careerPath
      .map((item) => `<li>${item}</li>`)
      .join("");

    modalsHTML += `
      <div
        class="modal fade"
        id="${career.id}Modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="${career.id}ModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="${career.id}ModalLabel">
                ${career.title}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h4>Descripción de la Carrera</h4>
              <p>${career.description}</p>

              <h4>Perfil Profesional</h4>
              <ul>${profileList}</ul>

              <h4>Campo Laboral</h4>
              <p>Los tecnólogos en ${career.title} pueden desempeñarse en:</p>
              <ul>${careerPathList}</ul>

              <h4>Duración de la Carrera</h4>
              <p>
                La carrera tiene una duración de <strong>${career.duration}</strong>, incluyendo prácticas preprofesionales supervisadas.
              </p>

              <h4>Modalidad</h4>
              <p>
                <strong>${career.modality}</strong>
              </p>

              <hr />
              <h4>Malla Curricular</h4>
              <p>
                Consulta el plan de estudios detallado para esta carrera. Aquí podrás ver la distribución de asignaturas por semestre, créditos y requisitos.
              </p>
              <div class="text-center">
                <a
                  href="${career.curriculumLink}"
                  target="_blank"
                  class="btn btn-info py-2 px-4"
                >
                  <i class="fa fa-file-pdf mr-2"></i> Ver Malla Curricular PDF
                </a>
              </div>

              <hr />
              <p class="text-muted text-center">
                Para más detalles sobre requisitos de admisión o si tienes alguna pregunta adicional, por favor contacta a la secretaría académica.
              </p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  cardsContainer.innerHTML = cardsHTML;
  modalsContainer.innerHTML = modalsHTML;
}

// Esta función puede ir en tu main.js o en un archivo aparte
function generarAdministracionEIndustria() {
  const cardsContainer = document.querySelector(
    "#administrationAndIndustryCards"
  );
  const modalsContainer = document.querySelector(
    "#administrationAndIndustryModals"
  );

  if (!cardsContainer || !modalsContainer) {
    console.error(
      "No se encontraron los contenedores para las tarjetas o modales de la Escuela de Administración e Industria. Revisa los IDs."
    );
    return;
  }

  let cardsHTML = "";
  let modalsHTML = "";

  administrationAndIndustryData.forEach((career) => {
    // Generar la tarjeta de la carrera
    cardsHTML += `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="career-card text-center p-4 border rounded shadow-sm h-100 d-flex flex-column justify-content-between">
          <h3 class="mb-3">${career.title}</h3>
          <a
            href="#"
            class="d-block mb-3"
            data-toggle="modal"
            data-target="#${career.id}Modal"
          >
            <img
              src="${career.imagePath}"
              alt="Imagen de ${career.title}"
              class="img-fluid rounded"
            />
          </a>
          <p class="text-muted">
            Haz clic en la imagen para ver más detalles de la carrera.
          </p>
        </div>
      </div>
    `;

    // Generar el modal de la carrera
    const profileList = career.profile
      .map((item) => `<li>${item}</li>`)
      .join("");
    const careerPathList = career.careerPath
      .map((item) => `<li>${item}</li>`)
      .join("");

    modalsHTML += `
      <div
        class="modal fade"
        id="${career.id}Modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="${career.id}ModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="${career.id}ModalLabel">
                ${career.title}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h4>Descripción de la Carrera</h4>
              <p>${career.description}</p>

              <h4>Perfil Profesional</h4>
              <ul>${profileList}</ul>

              <h4>Campo Laboral</h4>
              <p>Los tecnólogos en ${career.title} pueden desempeñarse en:</p>
              <ul>${careerPathList}</ul>

              <h4>Duración de la Carrera</h4>
              <p>
                La carrera tiene una duración de <strong>${career.duration}</strong>, incluyendo prácticas preprofesionales supervisadas.
              </p>

              <h4>Modalidad</h4>
              <p>
                <strong>${career.modality}</strong>
              </p>

              <hr />
              <h4>Malla Curricular</h4>
              <p>
                Consulta el plan de estudios detallado para esta carrera. Aquí podrás ver la distribución de asignaturas por semestre, créditos y requisitos.
              </p>
              <div class="text-center">
                <a
                  href="${career.curriculumLink}"
                  target="_blank"
                  class="btn btn-info py-2 px-4"
                >
                  <i class="fa fa-file-pdf mr-2"></i> Ver Malla Curricular PDF
                </a>
              </div>

              <hr />
              <p class="text-muted text-center">
                Para más detalles sobre requisitos de admisión o si tienes alguna pregunta adicional, por favor contacta a la secretaría académica.
              </p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  cardsContainer.innerHTML = cardsHTML;
  modalsContainer.innerHTML = modalsHTML;

}
//*************************************************************************************************************** */
 // BALANCE GENERALL balancegeneral.js
 /* /js/main.js */
document.addEventListener("DOMContentLoaded", function () {
  const balancesList = document.getElementById("balances-list");

  // Aseguramos que el contenedor existe y que el array de datos está disponible
  if (balancesList && typeof balancesData !== 'undefined') {
    // Sort data by year in descending order
    balancesData.sort((a, b) => b.year - a.year);

    balancesData.forEach((balance) => {
      const listItem = document.createElement("li");
      listItem.className = "list-group-item d-flex justify-content-between align-items-center";

      const yearSpan = document.createElement("span");
      yearSpan.textContent = `BALANCE GENERAL ${balance.year}`;

      const link = document.createElement("a");
      link.href = balance.file;
      link.target = "_blank";
      link.className = "btn btn-sm btn-primary";

      const icon = document.createElement("i");
      icon.className = "fa fa-file-pdf mr-2";

      link.appendChild(icon);
      link.appendChild(document.createTextNode(" Ver PDF"));
      listItem.appendChild(yearSpan);
      listItem.appendChild(link);
      balancesList.appendChild(listItem);
    });
  }
});
// ARANCELES . aranceles.js
/* arancelesLogic.js */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Selecciona el div donde se mostrará la información
  const contenedorAranceles = document.querySelector('.row.justify-content-center');

  // Asegúrate de que el contenedor y los datos existen
  if (contenedorAranceles && typeof arancelesData !== 'undefined') {
    // 2. Itera sobre el arreglo de arancelesData
    arancelesData.forEach(arancel => {
      // 3. Crea el HTML para cada elemento
      const htmlArancel = `
        <div class="col-lg-6 mb-4">
          <div class="d-flex align-items-center bg-light p-4 rounded">
            <div class="bg-primary text-white text-center rounded-circle p-3" style="width: 65px; height: 65px;">
              <i class="fa fa-file-pdf fa-2x"></i>
            </div>
            <div class="ml-4">
              <h4>${arancel.titulo}</h4>
              <p class="m-0">${arancel.descripcion}</p>
              <a href="${arancel.url}" class="btn btn-sm btn-outline-primary mt-2" download>
                Descargar
              </a>
            </div>
          </div>
        </div>
      `;
      // 4. Inserta el HTML en el contenedor
      contenedorAranceles.innerHTML += htmlArancel;
    });
  }
});
// BALANCE DE AUDITORIA balanceAuditoria.js
/* balancesAuditadosLogic.js */
document.addEventListener("DOMContentLoaded", function () {
  const balancesList = document.getElementById("balances-auditados-list");

  // Verificar si el contenedor y los datos existen antes de continuar
  if (balancesList && typeof balancesAuditadosData !== 'undefined') {
    // Ordenar los datos por año de forma descendente
    balancesAuditadosData.sort((a, b) => b.year - a.year);

    balancesAuditadosData.forEach((balance) => {
      const listItem = document.createElement("li");
      listItem.className = "list-group-item d-flex justify-content-between align-items-center";

      const yearSpan = document.createElement("span");
      yearSpan.textContent = `BALANCE AUDITADO ${balance.year}`;

      const link = document.createElement("a");
      link.href = balance.file;
      link.target = "_blank";
      link.className = "btn btn-sm btn-primary";

      const icon = document.createElement("i");
      icon.className = "fa fa-file-pdf mr-2";

      link.appendChild(icon);
      link.appendChild(document.createTextNode(" Ver PDF"));
      listItem.appendChild(yearSpan);
      listItem.appendChild(link);
      balancesList.appendChild(listItem);
    });
  }
});

//BIENESTAR ESTUDIANTIL bienestarEstudiantil.js
/* bienestarCarruselLogic.js */

// Función para generar un carrusel
function generarCarrusel(idContenedor, idCarrusel, fotos) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  const slides = [];
  const fotosPorSlide = 4;
  
  for (let i = 0; i < fotos.length; i += fotosPorSlide) {
    const fotosDelSlide = fotos.slice(i, i + fotosPorSlide);
    const fotosHtml = fotosDelSlide.map(fotoUrl => `
      <div class="col-md-3">
        <div class="card">
          <img src="${fotoUrl}" class="card-img-top" alt="...">
        </div>
      </div>
    `).join('');
    
    slides.push(`
      <div class="carousel-item ${i === 0 ? 'active' : ''}">
        <div class="row">
          ${fotosHtml}
        </div>
      </div>
    `);
  }

  const carruselHtml = `
    <div id="${idCarrusel}" class="carousel slide mb-5" data-ride="carousel">
      <div class="carousel-inner">
        ${slides.join('')}
      </div>
      <a class="carousel-control-prev" href="#${idCarrusel}" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Anterior</span>
      </a>
      <a class="carousel-control-next" href="#${idCarrusel}" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Siguiente</span>
      </a>
    </div>
  `;
  
  contenedor.innerHTML = carruselHtml;
}

// Llamar a la función para cada carrusel
document.addEventListener('DOMContentLoaded', () => {
  if (typeof carruselData !== 'undefined') {
    generarCarrusel('carrusel-lengua-senas-container', 'carruselLenguaSenas', carruselData.lenguaSenas);
    generarCarrusel('carrusel-protocolo-container', 'carruselProtocolo', carruselData.protocolo);
    generarCarrusel('carrusel-sensibilizacion-container', 'carruselSensibilizacion', carruselData.sensibilizacion);
    generarCarrusel('carrusel-espacios-container', 'carruselEspacios', carruselData.espacios);
    generarCarrusel('carrusel-senaletica-container', 'carruselSenaletica', carruselData.senaletica);
  }
});


//BIENESTAR ESTUDIANTIL PARTE DE SERVICIOS 
// Esta función puede ir en tu main.js o en un archivo aparte.
function generarPlanesAcademicos() {
  // Encuentra el contenedor principal donde se insertarán las tarjetas
  const container = document.querySelector("#academic-plans-container");

  if (!container) {
    console.error("No se encontró el contenedor para los planes académicos.");
    return;
  }

 // Genera el HTML de las tarjetas usando el array de datos
const cardsHTML = academicBienestarData
  .map(
    (item) => `
    <div class="col-md-6 mb-3">
      <div class="card p-3">
        <a href="${item.url}" class="card-link text-decoration-none text-dark">
          <h5 class="card-title">${item.title}</h5>
        </a>
      </div>
    </div>
  `
  )
  .join("");

  // Inserta el HTML completo en el contenedor
 container.innerHTML = cardsHTML;
}

// CUMPLIMIENTO TRIBUTARIO cumplimientoTributario.js 
/* documentosLogic.js */
document.addEventListener("DOMContentLoaded", function () {
  const documentosList = document.getElementById("documentos-list");

  // Verificar si el contenedor y los datos existen antes de continuar
  if (documentosList && typeof documentosData !== 'undefined') {
    documentosData.forEach((documento) => {
      const listItem = document.createElement("li");
      listItem.className = "list-group-item d-flex justify-content-between align-items-center";

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
//POR QUE ELEGIRNOS porQueElegirnos.js 
/* ventajasLogic.js */
document.addEventListener("DOMContentLoaded", function () {
  const lista = document.getElementById("ventajas-lista");

  if (lista && typeof ventajasData !== 'undefined') {
    ventajasData.forEach((ventaja) => {
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
//PROCESO DE ADMISIONES procesoDeAdmisiones.js
/* requisitosLogic.js */
document.addEventListener("DOMContentLoaded", function () {
  const listaRequisitos = document.getElementById("lista-requisitos");

  if (listaRequisitos && typeof requisitosData !== 'undefined') {
    requisitosData.forEach((requisito) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = requisito;
      listaRequisitos.appendChild(li);
    });
  }
});
//

// Esta función puede ir en tu main.js o en un archivo aparte
function generarConstruccionYExtraccion() {
  const cardsContainer = document.querySelector("#constructionAndExtractionCards");
  const modalsContainer = document.querySelector("#constructionAndExtractionModals");

  if (!cardsContainer || !modalsContainer) {
    console.error("No se encontraron los contenedores para las tarjetas o modales de la Escuela de Construcción y Extracción Sostenible. Revisa los IDs.");
    return;
  }

  let cardsHTML = "";
  let modalsHTML = "";

  constructionAndExtractionData.forEach((career) => {
    // Generar la tarjeta de la carrera
    cardsHTML += `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="career-card text-center p-4 border rounded shadow-sm h-100 d-flex flex-column justify-content-between">
          <h3 class="mb-3">${career.title}</h3>
          <a
            href="#"
            class="d-block mb-3"
            data-toggle="modal"
            data-target="#${career.id}Modal"
          >
            <img
              src="${career.imagePath}"
              alt="Imagen de ${career.title}"
              class="img-fluid rounded"
            />
          </a>
          <p class="text-muted">
            Haz clic en la imagen para ver más detalles de la carrera.
          </p>
        </div>
      </div>
    `;

    // Generar el modal de la carrera
    const profileList = career.profile.map(item => `<li>${item}</li>`).join("");
    const careerPathList = career.careerPath.map(item => `<li>${item}</li>`).join("");

    modalsHTML += `
      <div
        class="modal fade"
        id="${career.id}Modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="${career.id}ModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="${career.id}ModalLabel">
                ${career.title}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h4>Descripción de la Carrera</h4>
              <p>${career.description}</p>

              <h4>Perfil Profesional</h4>
              <ul>${profileList}</ul>

              <h4>Campo Laboral</h4>
              <p>Los tecnólogos en ${career.title} pueden desempeñarse en:</p>
              <ul>${careerPathList}</ul>

              <h4>Duración de la Carrera</h4>
              <p>
                La carrera tiene una duración de <strong>${career.duration}</strong>, incluyendo prácticas preprofesionales supervisadas.
              </p>

              <h4>Modalidad</h4>
              <p>
                <strong>${career.modality}</strong>
              </p>

              <hr />
              <h4>Malla Curricular</h4>
              <p>
                Consulta el plan de estudios detallado para esta carrera. Aquí podrás ver la distribución de asignaturas por semestre, créditos y requisitos.
              </p>
              <div class="text-center">
                <a
                  href="${career.curriculumLink}"
                  target="_blank"
                  class="btn btn-info py-2 px-4"
                >
                  <i class="fa fa-file-pdf mr-2"></i> Ver Malla Curricular PDF
                </a>
              </div>

              <hr />
              <p class="text-muted text-center">
                Para más detalles sobre requisitos de admisión o si tienes alguna pregunta adicional, por favor contacta a la secretaría académica.
              </p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  cardsContainer.innerHTML = cardsHTML;
  modalsContainer.innerHTML = modalsHTML;
}

// Modulo de Vinculacion

function generarAreasDeVinculacion() {
  const listContainer = document.querySelector("#vinculacionList");
  const modalsContainer = document.querySelector("#vinculacionModals");

  if (!listContainer || !modalsContainer) {
    console.error("No se encontraron los contenedores para la lista o modales de Vinculación. Revisa los IDs.");
    return;
  }

  let listHTML = "";
  let modalsHTML = "";

  areasDeVinculacionData.forEach((area) => {
    // Generar el ítem de la lista
    listHTML += `
      <a
        href="#"
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        data-toggle="modal"
        data-target="#${area.id}Modal"
      >
        <span>${area.title}</span>
        <i class="fa fa-arrow-right"></i>
      </a>
    `;

    // Generar el modal de la carrera
    modalsHTML += `
      <div
        class="modal fade"
        id="${area.id}Modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="${area.id}ModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="${area.id}ModalLabel">
                ${area.title}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ${area.content}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  listContainer.innerHTML = listHTML;
  modalsContainer.innerHTML = modalsHTML;
}

// Esta función puede ir en tu main.js o en un archivo aparte
function generarInvestigacionIDi() {
  const listContainer = document.querySelector("#investigacionList");
  const modalsContainer = document.querySelector("#investigacionModals");

  if (!listContainer || !modalsContainer) {
    console.error("No se encontraron los contenedores para la lista o modales de I+D+i. Revisa los IDs.");
    return;
  }

  let listHTML = "";
  let modalsHTML = "";

  investigacionData.forEach((item) => {
    if (item.isSection) {
      // Generar el encabezado de sección
      listHTML += `
        <h5 class="mt-4 mb-2 ml-3">${item.title}</h5>
      `;
    } else {
      // Generar el ítem de la lista (enlace)
      listHTML += `
        <a
          href="#"
          class="list-group-item list-group-item-action d-flex justify-content-between align-items-center ${item.isSection ? 'ml-3' : ''}"
          data-toggle="modal"
          data-target="#${item.id}Modal"
        >
          <span>${item.title}</span>
          <i class="fa fa-arrow-right"></i>
        </a>
      `;

      // Generar el modal del ítem
      modalsHTML += `
        <div
          class="modal fade"
          id="${item.id}Modal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="${item.id}ModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="${item.id}ModalLabel">
                  ${item.title}
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                ${item.content}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  });

  listContainer.innerHTML = listHTML;
  modalsContainer.innerHTML = modalsHTML;
}

// En tu archivo main.js o practicas.js
function generarPracticasData() {
  const container = document.getElementById("practicasContainer");

  if (!container) {
    console.error("El contenedor con ID 'practicasContainer' no fue encontrado.");
    return;
  }

  let htmlContent = "";

  practicasData.forEach((item) => {
    if (item.type === "section") {
      htmlContent += `
        <div class="mb-5">
          <h4 class="mb-3">${item.title}</h4>
          <p class="text-muted">${item.description.trim()}</p>
          <div class="text-center">
            <a
              href="${item.link}"
              target="_blank"
              class="btn btn-primary py-2 px-4"
            >
              <i class="fa fa-file-pdf mr-2"></i> ${item.buttonText}
            </a>
          </div>
        </div>
      `;
    } else if (item.type === "list") {
      let listItems = "";
      item.items.forEach((listItem) => {
        listItems += `
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${listItem.text}</span>
            <a
              href="${listItem.link}"
              target="_blank"
              class="btn btn-sm btn-primary"
            >
              <i class="fa fa-file-pdf mr-2"></i> Descargar PDF
            </a>
          </li>
        `;
      });

      htmlContent += `
        <div class="mb-5">
          <h4 class="mb-3">${item.title}</h4>
          <p class="text-muted">${item.description.trim()}</p>
          <ul class="list-group list-group-flush">
            ${listItems}
          </ul>
        </div>
      `;
    }
  });

  // Eliminar el padding-bottom del último elemento
  htmlContent = htmlContent.replace(/<div class="mb-5"/g, '<div class="mb-5"');
  if (htmlContent.includes('<div class="mb-5"')) {
    htmlContent = htmlContent.replace(/<div class="mb-5"(?![\s\S]*<div class="mb-5")/, '<div class="mb-0"');
  }
  
  container.innerHTML = htmlContent;
}

// Esta función puede ir en tu main.js o en un archivo separado
function generarTitulacionData() {
  const container = document.getElementById("titulacionContainer");

  if (!container) {
    console.error("El contenedor con ID 'titulacionContainer' no fue encontrado.");
    return;
  }

  let htmlContent = "";

  titulacionData.forEach((item, index) => {
    // Determinar la clase para el margin-bottom
    const marginBottomClass = index === titulacionData.length - 1 ? "mb-0" : "mb-5";

    htmlContent += `
      <div class="${marginBottomClass}">
        <h4 class="mb-3">${item.title}</h4>
        <p class="text-muted">${item.description.trim()}</p>
        <div class="text-center mt-4">
          <a
            href="${item.link}"
            target="_blank"
            class="btn btn-primary py-2 px-4"
          >
            <i class="${item.buttonIcon}"></i> ${item.buttonText}
          </a>
        </div>
      </div>
    `;
  });

  container.innerHTML = htmlContent;
}

document.addEventListener("DOMContentLoaded", () => {
  generarHeader();
  generarFooter();
  generarEscuelaDeSalud();
  generarEducacionYHumanidades();
  generarEscuelaDeVeterinaria();
  generarAdministracionEIndustria();
  generarConstruccionYExtraccion();
  generarAreasDeVinculacion();
  generarInvestigacionIDi();
  generarPracticasData();
  generarTitulacionData();
  generarValores();
  generarReglamentosAcordeon();
  generarEquipoDirectivo();
  generarPlanesAcademicos();
  generarFacilities();
  generarOfertaAcademica();
  generarModalesOfertaAcademica();
  generarSelloUnico();
  generarTestimonios();
  generarAranceles();
});
