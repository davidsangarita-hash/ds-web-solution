/* =====================================================
   DS Web Solution — main.js v4
   First line adds 'js' to <html> so CSS animations activate.
   ===================================================== */

// Add 'js' class IMMEDIATELY (before DOMContentLoaded)
// so the CSS opacity:0 on [data-anim] activates right away.
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {

  // ==================== LANGUAGE ====================
  const langBtn = document.getElementById('langSwitch');
  const html    = document.documentElement;

  if (localStorage.getItem('ds-lang') === 'en') html.classList.add('en');

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      html.classList.toggle('en');
      localStorage.setItem('ds-lang', html.classList.contains('en') ? 'en' : 'es');
    });
  }

  // ==================== BURGER MENU ====================
  const burger   = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('open');
      navLinks.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ==================== NAVBAR SCROLL ====================
  const navbar = document.getElementById('navbar');

  function handleScroll() {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActive();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ==================== ACTIVE LINK ====================
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navAs    = document.querySelectorAll('.nav-links a');

  function updateActive() {
    const y = window.scrollY + 120;
    sections.forEach(sec => {
      if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
        navAs.forEach(a => a.classList.remove('active'));
        const match = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }

  // ==================== SCROLL ANIMATIONS ====================
  // Hero: animate immediately on load (staggered), not via IntersectionObserver
  const heroEls = Array.from(document.querySelectorAll('#hero [data-anim]'));
  heroEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), 100 + i * 130);
  });

  // Everything else: animate on scroll
  const otherEls = Array.from(document.querySelectorAll('[data-anim]'))
                       .filter(el => !heroEls.includes(el));

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        // Stagger cards within grid containers
        const grid = entry.target.closest(
          '.services-grid, .why-grid, .process-grid, .ph-stack'
        );
        if (grid) {
          const kids = Array.from(grid.querySelectorAll('[data-anim]'));
          const idx  = kids.indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 0.07}s`;
        }

        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

    otherEls.forEach(el => obs.observe(el));
  } else {
    // Fallback: show everything immediately if no IntersectionObserver
    otherEls.forEach(el => el.classList.add('in'));
  }

  // ==================== SMOOTH SCROLL ====================
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ==================== HERO PARALLAX ====================
  // Only on desktop and only if user hasn't set prefers-reduced-motion
  const heroPhoto = document.querySelector('.hero-photo');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (heroPhoto && window.innerWidth > 1024 && !reduceMotion) {
    window.addEventListener('scroll', () => {
      // Limit parallax so image never shows its edge
      const offset = Math.min(window.scrollY * 0.18, 120);
      heroPhoto.style.transform = `translateY(${offset}px)`;
    }, { passive: true });
  }

});
