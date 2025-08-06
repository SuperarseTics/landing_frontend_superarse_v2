(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    /*$(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });*/

    $(document).ready(function () {
    function toggleNavbarMethod() {
        if ($(window).width() > 992) {
            // MANEJO DE MENÚS PRINCIPALES: Se abren al pasar el mouse
            $('.navbar .dropdown').off('mouseover').off('mouseout').on('mouseover', function () {
                $(this).addClass('show').find('.dropdown-menu').first().addClass('show');
                $(this).find('.dropdown-toggle').first().attr('aria-expanded', 'true');
            }).on('mouseout', function () {
                var $this = $(this);
                // Retraso para evitar cierres accidentales al mover el mouse
                setTimeout(function() {
                    // Solo cierra el menú principal si el mouse no está sobre él Y no hay submenús abiertos
                    // Esto es crucial para que los submenús no se cierren inesperadamente.
                    if (!$this.is(':hover') && $this.find('.dropdown-menu .dropdown-menu.show').length === 0) {
                        $this.removeClass('show').find('.dropdown-menu').first().removeClass('show');
                        $this.find('.dropdown-toggle').first().attr('aria-expanded', 'false').blur();
                    }
                }, 150); // Un pequeño retraso para suavizar el efecto
            });

            // MANEJO DE SUBMENÚS ANIDADOS (como 'Marco Legal'): Se abren SOLO al hacer clic
            // *** CRUCIAL: Desactivar explícitamente cualquier evento de mouseover/mouseout anterior ***
            $('.dropdown-menu .dropdown-item.dropdown-toggle').off('mouseover').off('mouseout');

            // Añadimos el evento de clic para los submenús anidados
            $('.dropdown-menu .dropdown-item.dropdown-toggle').on('click', function(e) {
                var $el = $(this);
                var $subMenu = $el.next(".dropdown-menu");

                // Cierra cualquier otro submenú abierto en el mismo nivel (entre los anidados)
                $el.parents('.dropdown-menu').first().find('.dropdown-menu.show').removeClass("show");

                // Alterna la visibilidad del submenú actual
                $subMenu.toggleClass('show');

                // Actualiza atributos de accesibilidad
                $el.toggleClass('active-submenu-parent'); // Para estilos si usas esta clase
                $el.attr('aria-expanded', $subMenu.hasClass('show'));

                // Detiene la propagación del evento para evitar que el menú principal se cierre
                e.stopPropagation();
                // Previene el comportamiento por defecto del enlace (href="#")
                e.preventDefault();
            });

            // Cierra submenús anidados cuando el dropdown principal se cierra (por cualquier motivo)
            $('.navbar .dropdown').on('hidden.bs.dropdown', function () {
                $(this).find('.dropdown-menu .dropdown-menu.show').removeClass('show');
                $(this).find('.dropdown-menu .dropdown-item.dropdown-toggle').removeClass('active-submenu-parent');
                $(this).find('.dropdown-menu .dropdown-item.dropdown-toggle').attr('aria-expanded', 'false');
            });

        } else {
            // EN PANTALLAS PEQUEÑAS (MÓVILES): Todo funciona con clic por defecto de Bootstrap
            // Aseguramos que no haya eventos de hover activos si se redimensiona
            $('.navbar .dropdown').off('mouseover').off('mouseout');
            $('.dropdown-menu .dropdown-item.dropdown-toggle').off('mouseover').off('mouseout');

            // Aseguramos que los submenús anidados sigan funcionando con clic en móviles
            $('.dropdown-menu .dropdown-item.dropdown-toggle').on('click', function(e) {
                var $el = $(this);
                var $subMenu = $el.next(".dropdown-menu");

                $el.parents('.dropdown-menu').first().find('.show').removeClass("show");
                $subMenu.toggleClass('show');
                $el.attr('aria-expanded', $subMenu.hasClass('show'));
                e.stopPropagation();
                e.preventDefault();
            });
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
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Post carousel
    $(".post-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            }
        }
    });

    $(".postA-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        center: true,
        autoplay: true,
        smartSpeed: 2000,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

    // Oferta Academica carousel
    $(".ofertaA-carousel").owlCarousel({
        center: true,
        autoplay: true,
        smartSpeed: 2000,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

    // Sello Único carousel
    $(".selloU-carousel").owlCarousel({
        center: true,
        autoplay: true,
        smartSpeed: 2000,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);