$(document).ready(function () {
    $(window).scroll(function () {
        // sticky navbar on scroll script
        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
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
        // close mobile menu on link click
        $('.navbar .menu').removeClass('active');
        $('.menu-btn i').removeClass('active');
        $('body').removeClass('no-scroll');
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
        $('body').toggleClass('no-scroll');
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
                $('body').toggleClass('no-scroll');
            });

            // close menu when a nav link is clicked (after injection)
            $('.navbar .menu li a').off('click.close').on('click.close', function () {
                $('.navbar .menu').removeClass('active');
                $('.menu-btn i').removeClass('active');
                $('body').removeClass('no-scroll');
            });

        // Adjust internal anchors on aktiviteter.html and cookies.html to point back to index sections
        // Adjust internal anchors on aktiviteter.html, cookies.html and integritetspolicy.html to point back to index sections
        if (location.pathname.toLowerCase().includes('aktiviteter.html') 
            ||location.pathname.toLowerCase().includes('cookies.html') 
            ||location.pathname.toLowerCase().includes('privacy_policy.html')) {
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

    // Dynamically add gallery images
    if (document.getElementById('gallery-images')) {
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
    }

    // Populate activities galleries on aktiviteter.html
    if (location.pathname.toLowerCase().includes('aktiviteter.html')) {
        const activityGalleries = {
            'gallery-2-images': [
                { src: 'images/tennis-1.JPG', alt: 'Bordtennis 1' },
                { src: 'images/tennis-2.jpg', alt: 'Bordtennis 2' },
                { src: 'images/tennis-3.jpg', alt: 'Bordtennis 3' },
                { src: 'images/tennis-4.jpg', alt: 'Bordtennis 4' }
            ],
            'gallery-3-images': [
                { src: 'images/rent-uppsala-1.jpeg', alt: 'Håll Uppsala Rent 1' },
                { src: 'images/rent-uppsala-2.jpeg', alt: 'Håll Uppsala Rent 2' },
                { src: 'images/rent-uppsala-3.jpeg', alt: 'Håll Uppsala Rent 3' },
                { src: 'images/rent-uppsala-4.jpeg', alt: 'Håll Uppsala Rent 4' },
                { src: 'images/rent-uppsala-5.jpeg', alt: 'Håll Uppsala Rent 5' },
                { src: 'images/rent-uppsala-6.jpeg', alt: 'Håll Uppsala Rent 6' },
                { src: 'images/rent-uppsala-7.jpeg', alt: 'Håll Uppsala Rent 7' }
            ],
            'gallery-3b-images': [
                { src: 'images/statsdelsfest-1.jpg', alt: 'Stadsdelsfest 1' },
                { src: 'images/statsdelsfest-2.jpg', alt: 'Stadsdelsfest 2' },
                { src: 'images/statsdelsfest-3.jpg', alt: 'Stadsdelsfest 3' },
                { src: 'images/statsdelsfest-4.jpg', alt: 'Stadsdelsfest 4' },
                { src: 'images/statsdelsfest-5.jpg', alt: 'Stadsdelsfest 5' },
                { src: 'images/statsdelsfest-6.jpg', alt: 'Stadsdelsfest 6' },
                { src: 'images/statsdelsfest-7.jpg', alt: 'Stadsdelsfest 7' }
            ],
            'gallery-4-images': [
                { src: 'images/pulk-1.jpg', alt: 'Pulka 1' },
                { src: 'images/pulk-2.jpg', alt: 'Pulka 2' },
                { src: 'images/pulk-3.jpg', alt: 'Pulka 3' },
                { src: 'images/pulk-4.jpg', alt: 'Pulka 4' },
                { src: 'images/pulk-5.jpg', alt: 'Pulka 5' },
                { src: 'images/pulk-6.jpg', alt: 'Pulka 6' }
            ],
            'gallery-5-images': [
                { src: 'images/eldre-boende-1.jpg', alt: 'LSS boende 1' },
                { src: 'images/eldre-boende-2.jpg', alt: 'LSS boende 2' },
                { src: 'images/eldre-boende-3.jpg', alt: 'LSS boende 3' },
                { src: 'images/eldre-boende-4.jpg', alt: 'LSS boende 4' },
                { src: 'images/eldre-boende-5.jpg', alt: 'LSS boende 5' },
                { src: 'images/eldre-boende-6.jpg', alt: 'LSS boende 6' },
                { src: 'images/eldre-boende-7.jpg', alt: 'LSS boende 7' },
                { src: 'images/eldre-boende-8.jpg', alt: 'LSS boende 8' },
                { src: 'images/eldre-boende-9.jpg', alt: 'LSS boende 9' },
                { src: 'images/eldre-boende-10.jpg', alt: 'LSS boende 10' }
            ],
            'gallery-6-images': [
                { src: 'images/teater-1.jpg', alt: 'Teaterföreställning 1' },
                { src: 'images/teater-2.jpeg', alt: 'Teaterföreställning 2' },
                { src: 'images/teater-3.jpeg', alt: 'Teaterföreställning 3' }
            ],
            'gallery-7-images': [
                { src: 'images/lekland.jpg', alt: 'Lekland' }
            ],
            'gallery-8-images': [
                { src: 'images/tekniska-museet-1.jpg', alt: 'Tekniska Museet 1' },
                { src: 'images/tekniska-museet-2.jpg', alt: 'Tekniska Museet 2' },
                { src: 'images/tekniska-museet-3.jpg', alt: 'Tekniska Museet 3' },
                { src: 'images/tekniska-museet-4.JPG', alt: 'Tekniska Museet 4' }
            ],
            'gallery-9-images': [
                { src: 'images/rengör-uppsala-1.jpg', alt: 'Rengör Uppsala del2 1' },
                { src: 'images/rengör-uppsala-2.jpg', alt: 'Rengör Uppsala del2 2' },
                { src: 'images/rengör-uppsala-3.jpg', alt: 'Rengör Uppsala del2 3' },
                { src: 'images/rengör-uppsala-4.jpg', alt: 'Rengör Uppsala del2 4' }
            ]
        };

        Object.entries(activityGalleries).forEach(([containerId, images]) => {
            const container = document.getElementById(containerId);
            if (!container) return;
            images.forEach(image => {
                const cardItem = document.createElement('div');
                cardItem.className = 'card-item swiper-slide';
                const imgElement = document.createElement('img');
                imgElement.src = image.src;
                imgElement.alt = image.alt;
                cardItem.appendChild(imgElement);
                container.appendChild(cardItem);
            });
        });
    }
});

let serviceOpened = false;

// Detect if device is mobile
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Detect if device is Android
function isAndroid() {
    return /Android/i.test(navigator.userAgent);
}

// Detect if device is iOS
function isIOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const emailLink = document.getElementById('emailLink');
    const copyEmail = document.getElementById('copyEmail');
    const autoEmail = document.getElementById('autoEmail');
    const copyNotification = document.getElementById('copyNotification');
    const emailOptions = document.getElementById('emailOptions');

    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            emailOptions.style.display = emailOptions.style.display === 'block' ? 'none' : 'block';
        });
    }

    if (copyEmail) {
        copyEmail.addEventListener('click', function(e) {
            e.preventDefault();
            const email = 'info@aktivgeneration.org';
            navigator.clipboard.writeText(email).then(function() {
                copyNotification.style.display = 'block';
                setTimeout(function() {
                    copyNotification.style.display = 'none';
                }, 2000);
            });
            emailOptions.style.display = 'none';
        });
    }

    if (autoEmail) {
        autoEmail.addEventListener('click', function(e) {
            e.preventDefault();
            serviceOpened = false;
            const email = 'info@aktivgeneration.org';
            
            if (isMobileDevice()) {
                openMobileEmailApp(email);
            } else {
                openDesktopEmail(email);
            }
            
            emailOptions.style.display = 'none';
        });
    }

    // Close options when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (!e.target.matches('#emailLink') && !e.target.matches('#emailOptions a')) {
            emailOptions.style.display = 'none';
        }
    });
});

function openMobileEmailApp(email) {
    if (isAndroid()) {
        // Android - Try Gmail app first
        const gmailAppLink = `intent://compose?to=${email}#Intent;scheme=google.gmail;package=com.google.android.gm;end`;
        window.location.href = gmailAppLink;
        
        setTimeout(function() {
            if (!serviceOpened) {
                // If Gmail app fails, try Outlook app
                const outlookAppLink = `intent://compose?to=${email}#Intent;scheme=ms-outlook;package=com.microsoft.office.outlook;end`;
                window.location.href = outlookAppLink;
                
                setTimeout(function() {
                    if (!serviceOpened) {
                        // If Outlook app fails, fallback to regular mailto
                        window.location.href = `mailto:${email}`;
                    }
                }, 500);
            }
        }, 500);
        
    } else if (isIOS()) {
        // iOS - Try Gmail app first
        const gmailAppLink = `googlegmail://co?to=${email}`;
        window.location.href = gmailAppLink;
        
        setTimeout(function() {
            if (!serviceOpened) {
                // If Gmail app fails, try Outlook app
                const outlookAppLink = `ms-outlook://compose?to=${email}`;
                window.location.href = outlookAppLink;
                
                setTimeout(function() {
                    if (!serviceOpened) {
                        // If Outlook app fails, try Apple Mail app
                        const appleMailLink = `message://${email}`;
                        window.location.href = appleMailLink;
                        
                        setTimeout(function() {
                            if (!serviceOpened) {
                                // If all apps fail, fallback to regular mailto
                                window.location.href = `mailto:${email}`;
                            }
                        }, 500);
                    }
                }, 500);
            }
        }, 500);
    } else {
        // Other mobile devices - use regular mailto
        window.location.href = `mailto:${email}`;
    }
}

function openDesktopEmail(email) {
    // Try default mail client first
    const mailtoLink = `mailto:${email}`;
    window.location.href = mailtoLink;
    
    // Check if default client opened after a short delay
    setTimeout(function() {
        if (!serviceOpened) {
            // Try Gmail
            const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
            const gmailWindow = window.open(gmailLink, '_blank');
            
            // Check if Gmail opened successfully
            if (gmailWindow && !gmailWindow.closed) {
                serviceOpened = true;
                return;
            }
        }
        
        // Check again after another delay
        setTimeout(function() {
            if (!serviceOpened) {
                // Try Outlook
                const outlookLink = `https://outlook.live.com/mail/0/deeplink/compose?to=${email}`;
                const outlookWindow = window.open(outlookLink, '_blank');
                
                // Check if Outlook opened successfully
                if (outlookWindow && !outlookWindow.closed) {
                    serviceOpened = true;
                    return;
                }
            }
            
            // Final check
            setTimeout(function() {
                if (!serviceOpened) {
                    // Try iCloud Mail as last resort
                    const icloudLink = `https://www.icloud.com/mail/compose?to=${email}`;
                    window.open(icloudLink, '_blank');
                }
            }, 500);
        }, 500);
    }, 500);
}

// Detect if app opened successfully (for mobile)
window.addEventListener('blur', function() {
    serviceOpened = true;
});

// Phone functionality
document.addEventListener('DOMContentLoaded', function() {
    const phoneLink = document.getElementById('phoneLink');
    const copyPhone = document.getElementById('copyPhone');
    const callPhone = document.getElementById('callPhone');
    const phoneCopyNotification = document.getElementById('phoneCopyNotification');
    const phoneOptions = document.getElementById('phoneOptions');

    if (phoneLink) {
        phoneLink.addEventListener('click', function(e) {
            e.preventDefault();
            phoneOptions.style.display = phoneOptions.style.display === 'block' ? 'none' : 'block';
        });
    }

    if (copyPhone) {
        copyPhone.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = '+46-76 950 63 28';
            navigator.clipboard.writeText(phoneNumber).then(function() {
                phoneCopyNotification.style.display = 'block';
                setTimeout(function() {
                    phoneCopyNotification.style.display = 'none';
                }, 2000);
            });
            phoneOptions.style.display = 'none';
        });
    }

    if (callPhone) {
        callPhone.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = '+46769506328'; // Remove dashes for calling
            if (isMobileDevice()) {
                // For mobile devices - initiate call
                window.location.href = `tel:${phoneNumber}`;
            } else {
                // For desktop - show message or copy number
                navigator.clipboard.writeText(phoneNumber).then(function() {
                    phoneCopyNotification.textContent = 'Telefonnummer kopierat! (Anrop inte tillgängligt på desktop)';
                    phoneCopyNotification.style.display = 'block';
                    setTimeout(function() {
                        phoneCopyNotification.style.display = 'none';
                        phoneCopyNotification.textContent = 'Telefonnummer kopierat!';
                    }, 3000);
                });
            }
            phoneOptions.style.display = 'none';
        });
    }

    // Close phone options when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (!e.target.matches('#phoneLink') && !e.target.matches('#phoneOptions a')) {
            phoneOptions.style.display = 'none';
        }
    });
});