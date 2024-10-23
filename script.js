$(document).ready(function () {
    screen.orientation.lock('portrait');
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