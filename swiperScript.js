// Initialize Swiper sliders
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all Swiper instances using .slider-wrapper like before
    const sliders = document.querySelectorAll('.slider-wrapper');
    
    sliders.forEach((sliderEl, index) => {
        const paginationEl = sliderEl.querySelector('.swiper-pagination');
        const nextEl = sliderEl.querySelector('.swiper-button-next');
        const prevEl = sliderEl.querySelector('.swiper-button-prev');

        // Create unique instance for each swiper
        const swiper = new Swiper(sliderEl, {
            loop: true,
            grabCursor: true,
            spaceBetween: 30,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: paginationEl ? {
                el: paginationEl,
                clickable: true,
                dynamicBullets: true
            } : false,
            navigation: (nextEl && prevEl) ? {
                nextEl: nextEl,
                prevEl: prevEl
            } : false,
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
            },
            // Add these settings to ensure smooth continuous autoplay
            speed: 600,
            effect: 'slide',
            preventClicks: true,
            preventClicksPropagation: true,
            touchRatio: 1,
            simulateTouch: true,
            on: {
                init: function () {
                    console.log('Swiper initialized:', index);
                },
            }
        });

        // Add hover pause/resume functionality
        sliderEl.addEventListener('mouseenter', function() {
            swiper.autoplay.stop();
        });
        
        sliderEl.addEventListener('mouseleave', function() {
            swiper.autoplay.start();
        });
    });

    console.log('All Swipers initialized');
});

// Re-initialize Swiper when galleries are dynamically loaded
function initializeActivityGalleries() {
    const activitySliders = document.querySelectorAll('.activity .slider-wrapper');
    
    activitySliders.forEach((sliderEl, index) => {
        // Check if Swiper instance already exists
        if (sliderEl.swiper) {
            sliderEl.swiper.destroy(true, true);
        }
        
        const paginationEl = sliderEl.querySelector('.swiper-pagination');
        const nextEl = sliderEl.querySelector('.swiper-button-next');
        const prevEl = sliderEl.querySelector('.swiper-button-prev');

        // Create new Swiper instance
        const swiper = new Swiper(sliderEl, {
            loop: true,
            grabCursor: true,
            spaceBetween: 15,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: paginationEl ? {
                el: paginationEl,
                clickable: true,
                dynamicBullets: true
            } : false,
            navigation: (nextEl && prevEl) ? {
                nextEl: nextEl,
                prevEl: prevEl
            } : false,
            breakpoints: {
                0: {
                    slidesPerView: 1
                },
                480: {
                    slidesPerView: 1
                },
                640: {
                    slidesPerView: 2
                },
                768: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 3
                }
            },
            speed: 500,
            effect: 'slide',
            preventClicks: true,
            preventClicksPropagation: true,
        });

        console.log('Activity gallery Swiper initialized:', index);
    });
}

// Call this after dynamically loading gallery images
if (document.querySelector('.activity .slider-wrapper')) {
    // Small delay to ensure DOM is updated
    setTimeout(initializeActivityGalleries, 100);
}