/* =====================================================
   DS Web Solution — main.js v3
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==================== LANGUAGE ====================
  const langBtn = document.getElementById('langSwitch');
  const html    = document.documentElement;

  if (localStorage.getItem('ds-lang') === 'en') html.classList.add('en');

  langBtn.addEventListener('click', () => {
    html.classList.toggle('en');
    localStorage.setItem('ds-lang', html.classList.contains('en') ? 'en' : 'es');
  });

  // ==================== BURGER MENU ====================
  const burger   = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

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

  // ==================== NAVBAR SCROLL ====================
  const navbar = document.getElementById('navbar');

  function handleScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
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
  /*
    Hero elements: fire on page load with stagger, NOT via IntersectionObserver,
    so they are never stuck at opacity:0.
    All other elements: fire via IntersectionObserver.
  */
  const heroAnims  = Array.from(document.querySelectorAll('#hero [data-anim]'));
  const otherAnims = Array.from(document.querySelectorAll('[data-anim]'))
                         .filter(el => !heroAnims.includes(el));

  // Animate hero immediately (staggered)
  heroAnims.forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), 200 + i * 140);
  });

  // Animate rest via IntersectionObserver
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // Stagger cards inside grids
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
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  otherAnims.forEach(el => obs.observe(el));

  // ==================== SMOOTH SCROLL ====================
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ==================== HERO PARALLAX (subtle) ====================
  const heroPhoto = document.querySelector('.hero-photo');
  if (heroPhoto && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      heroPhoto.style.transform = `translateY(${window.scrollY * 0.22}px)`;
    }, { passive: true });
  }

});
