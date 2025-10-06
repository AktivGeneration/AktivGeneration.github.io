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

    // Wait for footer to load and set current year
    function initFooterYear() {
        const yearSpan = document.getElementById('footer-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        } else {
            // Retry after a short delay if footer not loaded yet
            setTimeout(initFooterYear, 100);
        }
    }

    // Start the process when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFooterYear);
    } else {
        initFooterYear();
    }

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

            // Ensure theme toggle works for injected navbar
            try {
                const STORAGE_KEY = 'site-theme';
                const themeBtn = document.getElementById('themeToggle');
                const body = document.body;
                if (themeBtn) {
                    // sync icon with current theme
                    const icon = themeBtn.querySelector('i');
                    if (icon) {
                        icon.className = body.classList.contains('dark') ? 'fas fa-sun' : 'fas fa-moon';
                    }
                    themeBtn.setAttribute('aria-pressed', body.classList.contains('dark') ? 'true' : 'false');

                    // remove any previous listener to avoid duplicates
                    themeBtn.replaceWith(themeBtn.cloneNode(true));
                    const freshBtn = document.getElementById('themeToggle');
                    if (freshBtn) {
                        freshBtn.addEventListener('click', function () {
                            const next = body.classList.contains('dark') ? 'light' : 'dark';
                            if (next === 'dark') body.classList.add('dark'); else body.classList.remove('dark');
                            localStorage.setItem(STORAGE_KEY, next);
                            const ic = freshBtn.querySelector('i');
                            if (ic) ic.className = body.classList.contains('dark') ? 'fas fa-sun' : 'fas fa-moon';
                            freshBtn.setAttribute('aria-pressed', body.classList.contains('dark') ? 'true' : 'false');
                        });
                    }
                }
            } catch (err) {
                console.error('Failed to attach theme toggle after navbar injection', err);
            }

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

            // Re-bind language dropdown after navbar injection
            const $languageSelectorInjected = $('.language-selector');
            $languageSelectorInjected.off('click.lang').on('click.lang', '> a', function (e) {
                e.preventDefault();
                e.stopPropagation();
                $languageSelectorInjected.toggleClass('open');
            });
            // Close language dropdown on outside click
            $(document).off('click.langdoc').on('click.langdoc', function () {
                $languageSelectorInjected.removeClass('open');
            });

            // Bind language selection to navigate to same page in selected language
            $('.language-dropdown a[data-lang]').off('click.langsel').on('click.langsel', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const selectedLang = $(this).attr('data-lang');
                const newPath = computeNewLangPath(selectedLang);
                window.location.href = newPath;
            });

        // Adjust internal anchors on aktiviteter.html, cookies.html, privacy_policy.html, and facebook.html to point back to index sections
        if (location.pathname.toLowerCase().includes('aktiviteter.html') 
            || location.pathname.toLowerCase().includes('cookies.html') 
            || location.pathname.toLowerCase().includes('privacy_policy.html')
            || location.pathname.toLowerCase().includes('facebook.html')) {
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
            { src: "../images/stenhagen-fest-1.jpg", alt: "kulturfest-tält-och-kanvas" },
            { src: "../images/musik.jpeg", alt: "musik" },
            { src: "../images/bordtennis-1.jpg", alt: "bordtennis" },
            { src: "../images/håll-uppsala-rent-1.jpeg", alt: "plocka-skräp-dag" },
            { src: "../images/aktivitet.JPG", alt: "aktivitet" },
            { src: "../images/stenhagen-fest-3.JPEG", alt: "kulturfest-spel-med-barn" },
            { src: "../images/gruppaktivitet.jpeg", alt: "gruppaktivitet" },
            { src: "../images/gåva.JPG", alt: "gåva" },
            { src: "../images/stenhagen-fest-2.jpg", alt: "kulturfest-tält-och-banner" },
            { src: "../images/fika.jpeg", alt: "fika" },
            { src: "../images/bordtennis-2.jpg", alt: "bordtennis" },
            { src: "../images/håll-uppsala-rent-2.jpeg", alt: "plocka-skräp-dag-planering" }
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
                { src: '../images/tennis-1.JPG', alt: 'Bordtennis 1' },
                { src: '../images/tennis-2.jpg', alt: 'Bordtennis 2' },
                { src: '../images/tennis-3.jpg', alt: 'Bordtennis 3' },
                { src: '../images/tennis-4.jpg', alt: 'Bordtennis 4' }
            ],
            'gallery-3-images': [
                { src: '../images/rent-uppsala-1.jpeg', alt: 'Håll Uppsala Rent 1' },
                { src: '../images/rent-uppsala-2.jpeg', alt: 'Håll Uppsala Rent 2' },
                { src: '../images/rent-uppsala-3.jpeg', alt: 'Håll Uppsala Rent 3' },
                { src: '../images/rent-uppsala-4.jpeg', alt: 'Håll Uppsala Rent 4' },
                { src: '../images/rent-uppsala-5.jpeg', alt: 'Håll Uppsala Rent 5' },
                { src: '../images/rent-uppsala-6.jpeg', alt: 'Håll Uppsala Rent 6' },
                { src: '../images/rent-uppsala-7.jpeg', alt: 'Håll Uppsala Rent 7' }
            ],
            'gallery-3b-images': [
                { src: '../images/statsdelsfest-1.jpg', alt: 'Stadsdelsfest 1' },
                { src: '../images/statsdelsfest-2.jpg', alt: 'Stadsdelsfest 2' },
                { src: '../images/statsdelsfest-3.jpg', alt: 'Stadsdelsfest 3' },
                { src: '../images/statsdelsfest-4.jpg', alt: 'Stadsdelsfest 4' },
                { src: '../images/statsdelsfest-5.jpg', alt: 'Stadsdelsfest 5' },
                { src: '../images/statsdelsfest-6.jpg', alt: 'Stadsdelsfest 6' },
                { src: '../images/statsdelsfest-7.jpg', alt: 'Stadsdelsfest 7' }
            ],
            'gallery-4-images': [
                { src: '../images/pulk-1.jpg', alt: 'Pulka 1' },
                { src: '../images/pulk-2.jpg', alt: 'Pulka 2' },
                { src: '../images/pulk-3.jpg', alt: 'Pulka 3' },
                { src: '../images/pulk-4.jpg', alt: 'Pulka 4' },
                { src: '../images/pulk-5.jpg', alt: 'Pulka 5' },
                { src: '../images/pulk-6.jpg', alt: 'Pulka 6' }
            ],
            'gallery-5-images': [
                { src: '../images/eldre-boende-1.jpg', alt: 'LSS boende 1' },
                { src: '../images/eldre-boende-2.jpg', alt: 'LSS boende 2' },
                { src: '../images/eldre-boende-3.jpg', alt: 'LSS boende 3' },
                { src: '../images/eldre-boende-4.jpg', alt: 'LSS boende 4' },
                { src: '../images/eldre-boende-5.jpg', alt: 'LSS boende 5' },
                { src: '../images/eldre-boende-6.jpg', alt: 'LSS boende 6' },
                { src: '../images/eldre-boende-7.jpg', alt: 'LSS boende 7' },
                { src: '../images/eldre-boende-8.jpg', alt: 'LSS boende 8' },
                { src: '../images/eldre-boende-9.jpg', alt: 'LSS boende 9' },
                { src: '../images/eldre-boende-10.jpg', alt: 'LSS boende 10' }
            ],
            'gallery-6-images': [
                { src: '../images/teater-1.jpg', alt: 'Teaterföreställning 1' },
                { src: '../images/teater-2.jpeg', alt: 'Teaterföreställning 2' },
                { src: '../images/teater-3.jpeg', alt: 'Teaterföreställning 3' }
            ],
            'gallery-7-images': [
                { src: '../images/lekland.jpg', alt: 'Lekland' }
            ],
            'gallery-8-images': [
                { src: '../images/tekniska-museet-1.jpg', alt: 'Tekniska Museet 1' },
                { src: '../images/tekniska-museet-2.jpg', alt: 'Tekniska Museet 2' },
                { src: '../images/tekniska-museet-3.jpg', alt: 'Tekniska Museet 3' },
                { src: '../images/tekniska-museet-4.JPG', alt: 'Tekniska Museet 4' }
            ],
            'gallery-9-images': [
                { src: '../images/rengör-uppsala-1.jpg', alt: 'Rengör Uppsala del2 1' },
                { src: '../images/rengör-uppsala-2.jpg', alt: 'Rengör Uppsala del2 2' },
                { src: '../images/rengör-uppsala-3.jpg', alt: 'Rengör Uppsala del2 3' },
                { src: '../images/rengör-uppsala-4.jpg', alt: 'Rengör Uppsala del2 4' }
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

// --- Language path helper: build correct path for target language ---
function computeNewLangPath(targetLang) {
    const supported = ['sv','en','tr','ar'];
    const pathname = window.location.pathname || '/';
    const segs = pathname.split('/').filter(Boolean); // remove empty

    // if no segments (root)
    if (segs.length === 0) return `/${targetLang}/index.html`;

    // if first segment is a language folder
    if (supported.includes(segs[0])) {
        segs[0] = targetLang;
        // if only language present (e.g. /sv or /sv/)
        if (segs.length === 1) return `/${segs[0]}/index.html`;
        // otherwise join back
        return '/' + segs.join('/');
    }

    // if repo prefix contains a language segment later (e.g. /user/repo/sv/index.html)
    const idx = segs.findIndex(s => supported.includes(s));
    if (idx !== -1) {
        segs[idx] = targetLang;
        return '/' + segs.join('/');
    }

    // No language segment present: attach language folder before the last segment (file or dir)
    const last = segs[segs.length - 1];
    // If last looks like a file (contains a dot), use it as filename
    if (last && last.includes('.')) {
        return `/${targetLang}/${last}`;
    }

    // Otherwise treat as directory => map to index
    return `/${targetLang}/index.html`;
}

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
            // Close email options if open
            const emailOptions = document.getElementById('emailOptions');
            if (emailOptions) emailOptions.style.display = 'none';
            
            phoneOptions.style.display = phoneOptions.style.display === 'block' ? 'none' : 'block';
        });
    }

    if (copyPhone) {
        copyPhone.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = '+46-76 950 63 28';
            navigator.clipboard.writeText(phoneNumber).then(function() {
                phoneCopyNotification.textContent = 'Telefonnummer kopierat!';
                phoneCopyNotification.style.display = 'block';
                setTimeout(function() {
                    phoneCopyNotification.style.display = 'none';
                }, 2000);
            }).catch(function(err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = phoneNumber;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                phoneCopyNotification.textContent = 'Telefonnummer kopierat!';
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
            const phoneNumber = formatPhoneNumber('+46-76 950 63 28'); // Properly formatted
            
            if (isMobileDevice()) {
                // Create a temporary link for better iOS support
                const telLink = document.createElement('a');
                telLink.href = `tel:${phoneNumber}`;
                telLink.style.display = 'none';
                document.body.appendChild(telLink);
                
                // Try multiple methods for maximum compatibility
                const tryCall = function(attempt) {
                    try {
                        if (attempt === 1) {
                            // Method 1: Direct click
                            telLink.click();
                        } else if (attempt === 2) {
                            // Method 2: Window location
                            window.location.href = `tel:${phoneNumber}`;
                        } else if (attempt === 3) {
                            // Method 3: Open in new window (for some Android devices)
                            window.open(`tel:${phoneNumber}`, '_self');
                        }
                    } catch (error) {
                        console.log('Call attempt failed:', attempt, error);
                    }
                };
                
                // Try multiple methods with delays
                tryCall(1);
                setTimeout(() => tryCall(2), 50);
                setTimeout(() => tryCall(3), 100);
                
                // Clean up
                setTimeout(() => {
                    document.body.removeChild(telLink);
                }, 500);
                
            } else {
                // Desktop behavior
                navigator.clipboard.writeText(phoneNumber).then(function() {
                    phoneCopyNotification.textContent = 'Telefonnummer kopierat! (Ring från din telefon)';
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

// Enhanced mobile detection for better iOS support
function isMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // Check for iOS
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return true;
    }
    
    // Check for Android
    if (/android/i.test(userAgent)) {
        return true;
    }
    
    // Check for other mobile devices
    if (/Mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        return true;
    }
    
    // Check for touch screen (additional indicator)
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

// Enhanced phone number formatting function
function formatPhoneNumber(phone) {
    // Remove all non-digit characters except plus
    return phone.replace(/[^\d+]/g, '');
}

// Language switching functionality
document.addEventListener('DOMContentLoaded', () => {
    const languageLinks = document.querySelectorAll('.language-dropdown a[data-lang]');
    const supportedLangs = ['sv', 'en', 'tr', 'ar']; // Your supported languages

    // Event listener for language selection
    languageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedLang = e.target.getAttribute('data-lang');
            // store preference then navigate using robust path helper
            localStorage.setItem('preferredLang', selectedLang);
            const newPath = computeNewLangPath(selectedLang);
            window.location.href = newPath;
        });
    });

    function switchLanguage(targetLang) {
        // Save preference
        localStorage.setItem('preferredLang', targetLang);
        
        // Get current path and filename
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop() || 'index.html';
        
        // Determine the correct path for the new language
        let newPath;
        
        if (currentPath.includes('/en/') || currentPath.includes('/tr/') || 
            currentPath.includes('/ar/') || currentPath.includes('/sv/')) {
            // Already in a language folder - replace the language segment
            newPath = currentPath.replace(/\/(en|sv|tr|ar)\//, `/${targetLang}/`);
        } else {
            // At root level - redirect to language folder
            if (currentFile === 'index.html' || currentPath === '/') {
                newPath = `/${targetLang}/index.html`;
            } else {
                newPath = `/${targetLang}/${currentFile}`;
            }
        }
        
        // Navigate to the new language version
        window.location.href = newPath;
    }

    // Optional: Auto-redirect based on browser language on first visit
    // Only do this if no language is stored and user is at root
    const storedLang = localStorage.getItem('preferredLang');
    const browserLang = navigator.language.split('-')[0];
    const currentPath = window.location.pathname;
    
    if (!storedLang && !currentPath.includes('/en/') && !currentPath.includes('/tr/') && 
        !currentPath.includes('/ar/') && !currentPath.includes('/sv/') && supportedLangs.includes(browserLang)) {
        switchLanguage(browserLang);
    }
});

// Night mode toggle with localStorage & prefers-color-scheme fallback
// Night mode toggle with localStorage & prefers-color-scheme fallback
(function () {
  const STORAGE_KEY = 'site-theme';
  const body = document.body;

  // Set theme
  function setTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleIcon();
  }

  // Update moon/sun icon
  function updateToggleIcon() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    const icon = btn.querySelector('i');
    if (body.classList.contains('dark')) {
      icon.className = 'fas fa-sun';
      btn.setAttribute('aria-pressed', 'true');
    } else {
      icon.className = 'fas fa-moon';
      btn.setAttribute('aria-pressed', 'false');
    }
  }

  // Initialize theme based on localStorage or system preference
  function initTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTheme(stored);
      return;
    }
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }

  // Create toggle button if not exists
  function createToggle() {
    let btn = document.getElementById('themeToggle');
    if (btn) return btn;

    const nav = document.querySelector('.navbar .max-width');
    btn = document.createElement('button');
    btn.id = 'themeToggle';
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', 'Toggle night mode');
    btn.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i>';

    if (nav) {
      nav.appendChild(btn);
    } else {
      body.appendChild(btn);
    }

    return btn;
  }

  // After DOM and navbar load
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    // If navbar is loaded dynamically, wait a bit and attach toggle
    function attachToggle() {
      const toggle = createToggle();
      if (!toggle) return;
      toggle.addEventListener('click', () => {
        const next = body.classList.contains('dark') ? 'light' : 'dark';
        setTheme(next);
      });
    }

    // Try attaching immediately
    attachToggle();

    // Also observe changes in navbar if dynamically injected
    const navbarObserver = new MutationObserver(() => attachToggle());
    const navbarEl = document.querySelector('.navbar');
    if (navbarEl) {
      navbarObserver.observe(navbarEl, { childList: true, subtree: true });
    }
  });

  // Optional: respond to system preference changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
})();
