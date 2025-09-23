$(document).ready(function () {
    $(window).scroll(function () {
        // sticky navbar on scroll script
        if (this.scrollY > 20) {
            document.body.style.backgroundColor = "#f0945f";
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
            document.body.style.backgroundColor = "#f1f1f1";
        }

        // scroll-up button show/hide script
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function () {
        $('html').animate({ scrollTop: 0 });
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function () {
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // language dropdown toggle
    const $languageSelector = $('.language-selector');
    $languageSelector.on('click', '> a', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $languageSelector.toggleClass('open');
    });

    // close language dropdown on outside click
    $(document).on('click', function () {
        $languageSelector.removeClass('open');
    });

    // Load navbar and footer partials
    (async function loadPartials() {
        try {
            const navbarRes = await fetch('navbar.html');
            const footerRes = await fetch('footer.html');
            const navbarHtml = await navbarRes.text();
            const footerHtml = await footerRes.text();
            const navbarEl = document.getElementById('navbar');
            const footerEl = document.getElementById('footer');
            if (navbarEl) navbarEl.innerHTML = navbarHtml;
            if (footerEl) footerEl.innerHTML = footerHtml;

            // Re-bind navbar interactions after injection
            $('.menu-btn').off('click').on('click', function () {
                $('.navbar .menu').toggleClass("active");
                $('.menu-btn i').toggleClass("active");
            });

            // Adjust internal anchors on aktiviteter.html to point back to index sections
            if (location.pathname.toLowerCase().includes('aktiviteter.html')) {
                const map = new Map([
                    ['#hem', 'index.html#hem'],
                    ['#om-oss', 'index.html#om-oss'],
                    ['#vad-vi-gor', 'index.html#vad-vi-gor'],
                    ['#aktiviteter', 'index.html#aktiviteter'],
                    ['#bildgalleri', 'index.html#bildgalleri'],
                    ['#kontakt', 'index.html#kontakt']
                ]);
                $('.navbar .menu a').each(function () {
                    const href = $(this).attr('href');
                    if (map.has(href)) $(this).attr('href', map.get(href));
                });
            }
        } catch (e) {
            console.error('Failed to load partials', e);
        }
    })();

    // Code to dynamically add the gallery images
    const images = [
        { src: "images/stenhagen-fest-1.jpg", alt: "kulturfest-tält-och-kanvas" },
        { src: "images/musik.jpeg", alt: "musik" },
        { src: "images/bordtennis-1.jpg", alt: "bordtennis" },
        { src: "images/håll-uppsala-rent-1.jpeg", alt: "plocka-skräp-dag" },
        { src: "images/aktivitet.JPG", alt: "aktivitet" },
        { src: "images/stenhagen-fest-3.JPEG", alt: "kulturfest-spel-med-barn" },
        { src: "images/gruppaktivitet.jpeg", alt: "gruppaktivitet" },
        { src: "images/gåva.JPG", alt: "gåva" },
        { src: "images/stenhagen-fest-2.jpg", alt: "kulturfest-tält-och-banner" },
        { src: "images/fika.jpeg", alt: "fika" },
        { src: "images/bordtennis-2.jpg", alt: "bordtennis" },
        { src: "images/håll-uppsala-rent-2.jpeg", alt: "plocka-skräp-dag-planering" }
    ];

    const galleryContainer = document.getElementById('gallery-images');

    images.forEach(image => {
        const cardItem = document.createElement('div');
        cardItem.className = 'card-item swiper-slide';

        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.alt;

        cardItem.appendChild(imgElement);
        galleryContainer.appendChild(cardItem);
    });
});