/* =====================================================
   DS Web Solution — Main JavaScript
   Language Switch, Animations, Interactions
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==================== LANGUAGE SWITCH ====================
    const langSwitch = document.getElementById('langSwitch');
    const htmlEl = document.documentElement;

    // Load saved language preference
    const savedLang = localStorage.getItem('ds-lang');
    if (savedLang === 'en') {
        htmlEl.classList.add('en');
    }

    langSwitch.addEventListener('click', () => {
        htmlEl.classList.toggle('en');
        const isEn = htmlEl.classList.contains('en');
        localStorage.setItem('ds-lang', isEn ? 'en' : 'es');
    });

    // ==================== MOBILE MENU ====================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ==================== NAVBAR SCROLL ====================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    const handleScroll = () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ==================== ACTIVE NAV LINK ====================
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    const updateActiveLink = () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navAnchors.forEach(a => a.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // ==================== SCROLL ANIMATIONS ====================
    const animateElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation delay
                const parent = entry.target.closest('.services-grid, .features-grid, .coming-soon-grid, .process-timeline');
                if (parent) {
                    const siblings = parent.querySelectorAll('[data-animate]');
                    const idx = Array.from(siblings).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${idx * 0.1}s`;
                }

                entry.target.classList.add('visible');
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => animationObserver.observe(el));



    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==================== PARALLAX GLOW EFFECT ====================
    const heroGlows = document.querySelectorAll('.hero-glow');

    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const moveX = (clientX - centerX) / centerX;
        const moveY = (clientY - centerY) / centerY;

        heroGlows.forEach((glow, i) => {
            const factor = (i + 1) * 15;
            glow.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
        });
    }, { passive: true });

    // ==================== INITIAL STATE ====================
    // Trigger initial scroll check
    handleScroll();
    updateActiveLink();

    // Animate hero elements on load
    setTimeout(() => {
        document.querySelectorAll('#hero [data-animate]').forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, i * 150);
        });
    }, 200);

});
