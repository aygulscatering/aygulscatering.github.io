/**
 * Tailwind CSS Configuration
 */
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#197fe6",
                "background-light": "#f6f7f8",
                "background-dark": "#111921",
            },
            fontFamily: {
                "display": ["Work Sans", "sans-serif"]
            },
            borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
        },
    },
};

/**
 * Main Application Logic
 */
document.addEventListener('DOMContentLoaded', () => {
    // 10. Page Preloader
    initPreloader();

    // Core Logic
    initMobileMenu();
    initLightbox();

    // New Features
    initSmoothScroll();         // 1. Smooth Scrolling
    initBackToTop();            // 2. Back to Top
    initDarkMode();             // 3. Dark Mode
    initTestimonialSlider();    // 4. Testimonial Slider
    initFAQ();                  // 5. FAQ Accordion
    initModals();               // 6. Quote Modal & Connects to buttons
    initNewsletter();           // 7. Newsletter
    initCookieConsent();        // 8. Cookie Banner
});

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
    // Quote Modal
    const modal = document.getElementById('quote-modal');
    const modalContent = modal?.querySelector('div');
    const openBtns = document.querySelectorAll('.open-quote-modal');
    const closeBtn = modal?.querySelector('.close-modal');
    const form = document.getElementById('quote-form');

    if (modal && openBtns.length > 0) {

        function openModal() {
            modal.classList.remove('hidden');
            // Trigger reflow
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

        // Handle Form
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.textContent;

                btn.textContent = 'Sending...';
                btn.disabled = true;

                // Simulate API
                setTimeout(() => {
                    alert('Thank you! Your quote request has been sent. We will contact you shortly.');
                    closeModal();
                    form.reset();
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 1500);
            });
        }
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
    }
