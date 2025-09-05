document.addEventListener('DOMContentLoaded', () => {
    // Código para la animación de volteo
    const flipCard = document.querySelector('.flip-card');
    if (flipCard) {
        flipCard.addEventListener('click', () => {
            flipCard.classList.toggle('active');
        });
    }

    // Código del carrusel mejorado
    const carouselTrack = document.querySelector('.custom-carousel-track');
    const carouselWrapper = document.querySelector('.custom-carousel-wrapper');

    if (!carouselTrack || !carouselWrapper) return;

    const items = Array.from(carouselTrack.querySelectorAll('.custom-carousel-item'));
    const prevButton = document.querySelector('.custom-carousel-nav.custom-prev');
    const nextButton = document.querySelector('.custom-carousel-nav.custom-next');
    const dotsContainer = document.querySelector('.custom-dots-container');
    const totalItems = items.length;
    let currentIndex = 0;

    // Función para actualizar los puntos (dots)
    const updateDots = () => {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        items.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('custom-dot');
            if (index === currentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        });
    };

    // Función para centrar la diapositiva activa
    const centerActiveSlide = () => {
        const itemWidth = items[0].offsetWidth;
        const totalOffset = -currentIndex * itemWidth;
        carouselTrack.style.transform = `translateX(${totalOffset}px)`;
    };
    
    // Función para actualizar el carrusel
    const updateCarousel = () => {
        items.forEach(item => item.classList.remove('active'));
        items[currentIndex].classList.add('active');
        updateDots();
        centerActiveSlide();
    };

    // Navegación con botones
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    // Iniciar el carrusel
    updateCarousel();

    // Actualizar al redimensionar la ventana
    window.addEventListener('resize', centerActiveSlide);
});