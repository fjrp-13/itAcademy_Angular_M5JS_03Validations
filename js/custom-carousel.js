(function () {
    'use strict';
    
    // Control del cambio de diapositivas del Carousel
    $('.carousel').on('slide.bs.carousel', function (e) {
        var $e = $(e.relatedTarget);
        var $carousel = $(this);
        var $carouselInner = $carousel.find('.carousel-inner');
        var $carouselItems = $carousel.find('.carousel-item');

        var idx = $e.index();
        var itemsPerSlide = $carousel.data('slides-visibles') || 4;
        var totalItems = $carousel.find('.carousel-item').length;

        // Mirar si se deben mover los items (al ppio o al final)
        if (idx >= totalItems - (itemsPerSlide - 1)) {
            if (e.direction == "left") {
                // Deslizar a la izqda (se pulsó flecha dcha): Hay que mover el 1er elemento al final
                $carouselItems.first().appendTo($carouselInner);
            } else {
                // Deslizar a la dcha (se pulsó flecha izda): Hay que mover el último elemento al principio
                $carouselItems.last().prependTo($carouselInner);
            }
        }
    });
})();
