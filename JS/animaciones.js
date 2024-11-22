function mostrarTexto() {
    setTimeout(function () {
        document.querySelector('h4.texto0').classList.add('show');
    }, 500);
    setTimeout(function () {
        document.querySelector('h1.texto').classList.add('show');
    }, 1000);
    setTimeout(function () {
        document.querySelector('p.texto1').classList.add('show');
    }, 1500);
}

function animarTexto(slide) {
    // Quitar las clases 'show' de todos los elementos
    document.querySelectorAll('.carousel-caption h5, .carousel-caption p').forEach(el => {
        el.classList.remove('show');
    });

    // Obtener el título y párrafo de la diapositiva activa
    const titulo = slide.querySelector('h5');
    const descripcion = slide.querySelector('p');

    // Añadir las animaciones con retrasos
    setTimeout(() => {
        if (titulo) titulo.classList.add('show');
    }, 500);

    setTimeout(() => {
        if (descripcion) descripcion.classList.add('show');
    }, 1000);
}

// Configurar el evento del carrusel
const carousel = document.querySelector('#carouselExample');

carousel.addEventListener('slide.bs.carousel', (event) => {
    const nextSlide = event.relatedTarget;
    animarTexto(nextSlide);
});

// Iniciar la animación en la primera diapositiva
document.addEventListener('DOMContentLoaded', () => {
    const activeSlide = document.querySelector('.carousel-item.active');
    animarTexto(activeSlide);
});
