// Initialize a Swiper instance for each slider-wrapper (matches homepage behavior)
document.querySelectorAll('.slider-wrapper').forEach((wrapper) => {
    const paginationEl = wrapper.querySelector('.swiper-pagination');
    const nextEl = wrapper.querySelector('.swiper-button-next');
    const prevEl = wrapper.querySelector('.swiper-button-prev');

    new Swiper(wrapper, {
        loop: true,
        grabCursor: true,
        spaceBetween: 30,

        pagination: paginationEl ? {
            el: paginationEl,
            clickable: true,
            dynamicBullets: true
        } : undefined,

        navigation: (nextEl && prevEl) ? {
            nextEl: nextEl,
            prevEl: prevEl
        } : undefined,

        breakpoints: {
            0: {
                slidesPerView: 1
            },
            768: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            }
        }
    });
});