/**
 * Main Application Logic
 */
document.addEventListener('DOMContentLoaded', () => {
    // Core Features
    initPreloader();
    initMobileMenu();
    initLightbox();
    initSmoothScroll();
    initBackToTop();
    initDarkMode();
    initTestimonialSlider();
    initFAQ();
    initModals();
    initNewsletter();
    initCookieConsent();
    initScrollReveal();

    // Expansion Features
    // initTranslations(); // Removed
    initStatusBadge();
    initCounters();
    initFilters();
    initMusicPlayer();
});

function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');

    // Initially hide elements that haven't been revealed yet
    // This runs after JS loads, preventing "flash of invisible content" if JS fails
    reveals.forEach(el => el.classList.add('reveal-hidden'));

    const windowHeight = window.innerHeight;
    const elementVisible = 50; // Triggers sooner

    function checkReveal() {
        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.remove('reveal-hidden');
                reveal.classList.add('reveal-visible');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    // Trigger once on load
    checkReveal();
}

/* --- Feature Implementations --- */

function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    document.body.classList.remove('overflow-hidden');
                }, 500);
            }, 500); // Min display time
        });
    }
}

function initMobileMenu() {
    const navMenu = document.getElementById('mobile-menu');
    const openBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('mobile-menu-close');
    const navLinks = navMenu ? navMenu.querySelectorAll('a') : [];

    if (openBtn && navMenu) {
        openBtn.addEventListener('click', () => {
            navMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }

    const closeMenu = () => {
        if (navMenu) {
            navMenu.classList.add('hidden');
            document.body.style.overflow = '';
        }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.remove('translate-y-20', 'opacity-0');
        } else {
            btn.classList.add('translate-y-20', 'opacity-0');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initDarkMode() {
    const toggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            html.classList.toggle('dark');
            localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
        });
    }
}

function initTestimonialSlider() {
    const slider = document.getElementById('testimonial-slider');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');

    if (!slider || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const slides = slider.children;
    const totalSlides = slides.length;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto play
    let interval = setInterval(nextSlide, 5000);

    slider.addEventListener('mouseenter', () => clearInterval(interval));
    slider.addEventListener('mouseleave', () => interval = setInterval(nextSlide, 5000));
}

function initFAQ() {
    const toggles = document.querySelectorAll('.faq-toggle');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('.material-symbols-outlined');

            // Toggle current
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.style.transform = 'rotate(0deg)';
                toggle.parentElement.classList.remove('bg-gray-50', 'dark:bg-[#1f2937]'); // Highlight active optional
            } else {
                // Close others (accordion style)
                document.querySelectorAll('.faq-toggle').forEach(otherToggle => {
                    const otherContent = otherToggle.nextElementSibling;
                    const otherIcon = otherToggle.querySelector('.material-symbols-outlined');
                    if (otherContent.style.maxHeight) {
                        otherContent.style.maxHeight = null;
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                });

                content.style.maxHeight = content.scrollHeight + "px";
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

function initModals() {
    const modal = document.getElementById('quote-modal');
    if (!modal) return;

    const modalContent = modal.querySelector('div');
    const openBtns = document.querySelectorAll('.open-quote-modal');
    const closeBtn = modal.querySelector('.close-modal');
    const form = document.getElementById('quote-form');

    function openModal() {
        modal.classList.remove('hidden');
        // Trigger reflow for animation
        void modal.offsetWidth;
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }

    openBtns.forEach(btn => btn.addEventListener('click', openModal));
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get values
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const type = form.querySelector('select').value;
            const date = form.querySelector('input[type="date"]').value;
            const time = form.querySelector('input[type="time"]').value;

            // Construct Mailto
            // Since I don't have the exact email, I'll use a placeholder that matches the domain or instructions
            const recipient = "aygulscatering@gmail.com"; // Common fallback, or user can update
            const subject = encodeURIComponent(`Offerte Aanvraag: ${type} - ${name}`);
            const body = encodeURIComponent(
                `Naam: ${name}\n` +
                `Email: ${email}\n` +
                `Type Evenement: ${type}\n` +
                `Datum: ${date}\n` +
                `Tijd: ${time}\n\n` +
                `--- Verstuurd via Aygül's Catering Website ---`
            );

            window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = 'Email Client Geopend...';
            btn.disabled = true;

            setTimeout(() => {
                showToast('Email concept aangemaakt!');
                closeModal();
                form.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1000);
        });
    }
}

function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const input = form.querySelector('input');
            const originalIcon = btn.innerHTML;

            btn.innerHTML = '<span class="material-symbols-outlined text-sm animate-spin">refresh</span>';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<span class="material-symbols-outlined text-sm">check</span>';
                btn.classList.add('bg-green-500', 'hover:bg-green-600');
                btn.classList.remove('bg-primary', 'hover:bg-primary/90');
                input.value = '';
                input.placeholder = 'Subscribed!';

                setTimeout(() => {
                    btn.innerHTML = originalIcon;
                    btn.classList.remove('bg-green-500', 'hover:bg-green-600');
                    btn.classList.add('bg-primary', 'hover:bg-primary/90');
                    btn.disabled = false;
                    input.placeholder = 'Enter your email';
                }, 3000);
            }, 1000);
        });
    }
}

function initCookieConsent() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    if (!banner || !acceptBtn) return;

    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            banner.classList.remove('translate-y-full');
        }, 1000);
    }

    acceptBtn.addEventListener('click', () => {
        banner.classList.add('translate-y-full');
        localStorage.setItem('cookiesAccepted', 'true');
    });
}

function initLightbox() {
    // Select all images intended for the gallery. 
    const galleryImages = document.querySelectorAll('.gallery-img');

    // Create lightbox container
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'fixed inset-0 z-[60] bg-black/90 hidden flex items-center justify-center p-4 opacity-0 transition-opacity duration-300';
    lightbox.innerHTML = `
        <button class="absolute top-4 right-4 text-white hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-4xl">close</span>
        </button>
        <img src="" alt="Lightbox Image" class="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl transform scale-95 transition-transform duration-300">
        <div class="absolute bottom-8 left-0 right-0 text-center text-white px-4">
            <h3 class="text-xl font-bold mb-1"></h3>
            <p class="text-sm text-gray-300"></p>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('button');
    const lightboxTitle = lightbox.querySelector('h3');
    const lightboxDesc = lightbox.querySelector('p');

    const openLightbox = (imgSrc, title, desc) => {
        lightboxImg.src = imgSrc;
        lightboxImg.alt = title || 'Gallery Image';
        lightboxTitle.textContent = title || '';
        lightboxDesc.textContent = desc || '';

        lightbox.classList.remove('hidden');
        // Trigger reflow
        void lightbox.offsetWidth;
        lightbox.classList.remove('opacity-0');
        lightboxImg.classList.remove('scale-95');
        lightboxImg.classList.add('scale-100');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.add('opacity-0');
        lightboxImg.classList.remove('scale-100');
        lightboxImg.classList.add('scale-95');

        setTimeout(() => {
            lightbox.classList.add('hidden');
            lightboxImg.src = '';
            document.body.style.overflow = '';
        }, 300);
    };

    galleryImages.forEach(container => {
        container.addEventListener('click', () => {
            const img = container.querySelector('img');
            if (img && img.src) {
                const title = container.dataset.title;
                const desc = container.dataset.desc;
                openLightbox(img.src, title, desc);
            }
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
            closeLightbox();
        }
    });
}

// initTranslations removed

function initStatusBadge() {
    const badge = document.getElementById('status-badge');
    if (!badge) return;

    const now = new Date();
    const hours = now.getHours();
    const day = now.getDay(); // 0 = Sunday

    // Open Mon-Fri 8:00 - 18:00
    const isOpen = day >= 1 && day <= 5 && hours >= 8 && hours < 18;

    if (!isOpen) {
        badge.className = 'hidden sm:flex items-center gap-1.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full font-bold border border-red-200 dark:border-red-800';
        badge.innerHTML = `
            <span class="relative flex h-2 w-2">
                <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span data-i18n="closed_now">Gesloten</span>
        `;
    }
}

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps

                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                        if (target >= 100 && target !== 500) counter.textContent += '%';
                        if (target === 500) counter.textContent += '+';
                        if (target === 10) counter.textContent += '+';
                        if (target === 50) counter.textContent += '+';
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, options);

    counters.forEach(counter => observer.observe(counter));
}

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery-img');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-primary', 'text-white', 'shadow-lg');
                b.classList.add('bg-white', 'dark:bg-[#1a2632]', 'text-gray-500', 'dark:text-gray-300');
            });

            // Add active class to clicked
            btn.classList.add('active', 'bg-primary', 'text-white', 'shadow-lg');
            btn.classList.remove('bg-white', 'dark:bg-[#1a2632]', 'text-gray-500', 'dark:text-gray-300');

            const filterValue = btn.getAttribute('data-filter');

            items.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                    item.classList.add('block');
                    setTimeout(() => {
                        item.classList.remove('opacity-0', 'scale-95');
                        item.classList.add('opacity-100', 'scale-100');
                    }, 50);
                } else {
                    item.classList.add('opacity-0', 'scale-95');
                    item.classList.remove('opacity-100', 'scale-100');
                    setTimeout(() => {
                        item.classList.add('hidden');
                        item.classList.remove('block');
                    }, 300);
                }
            });
        });
    });
}
function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 transform translate-x-full transition-transform duration-300';
    toast.innerHTML = `
          <span class="material-symbols-outlined text-green-400">check_circle</span>
          <span>${message}</span>
      `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.remove('translate-x-full');
    });

    // Remove after 3s
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

function initMusicPlayer() {
    let player;
    let isPlaying = false;
    const toggleBtn = document.getElementById('toggle-music');
    const musicIcon = document.getElementById('music-icon');
    const musicInfo = document.getElementById('music-info');
    const controls = document.getElementById('music-player-controls');

    // Helper to update UI
    function updateUI(playing) {
        isPlaying = playing;
        if (musicIcon) {
            musicIcon.textContent = playing ? 'pause' : 'music_note';
            if (playing) {
                musicIcon.parentElement.classList.add('animate-spin-slow');
                toggleBtn.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
                musicInfo?.classList.remove('translate-y-10', 'opacity-0');
            } else {
                musicIcon.parentElement.classList.remove('animate-spin-slow');
                toggleBtn.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
            }
        }
    }

    function onPlayerReady(event) {
        console.log("Player ready");
        // Attempt immediate play
        event.target.playVideo();
        event.target.setVolume(20);

        // Fallback: Play on FIRST interaction
        const validEvents = ['click', 'touchstart', 'scroll', 'keydown'];
        const tryPlay = () => {
            if (player && typeof player.playVideo === 'function') {
                // If not playing, or buffering, or cued
                const state = player.getPlayerState();
                if (state !== YT.PlayerState.PLAYING && state !== YT.PlayerState.BUFFERING) {
                    player.playVideo();
                }
            }
        };

        validEvents.forEach(evt => {
            document.body.addEventListener(evt, tryPlay, { once: true, passive: true });
        });
    }

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING) {
            updateUI(true);
        } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
            updateUI(false);
        }
    }

    function onPlayerError(event) {
        console.error('YouTube Player Error:', event.data);
        // Error 150/101 = restricted from embed. 
        // We can try to hide controls but keep them if it's a temporary network error
        if (event.data === 150 || event.data === 101) {
            if (controls) controls.style.display = 'none';
        }
    }

    function initPlayer() {
        player = new YT.Player('youtube-player', {
            height: '1', // MUST be > 0 for some browsers
            width: '1',
            videoId: 'tyoQZc3wkzN',
            playerVars: {
                'playsinline': 1,
                'controls': 0,
                'disablekb': 1,
                'fs': 0,
                'loop': 1,
                'playlist': 'tyoQZc3wkzN',
                'autoplay': 1,
                'origin': window.location.origin, // Critical for GitHub Pages
                'enablejsapi': 1
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange,
                'onError': onPlayerError
            }
        });
    }

    // Toggle Button Logic
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (!player) return;
            if (isPlaying) player.pauseVideo();
            else player.playVideo();
        });
    }

    // Initialize API
    if (typeof YT !== 'undefined' && YT.Player) {
        initPlayer();
    } else {
        window.onYouTubeIframeAPIReady = initPlayer;
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
}
