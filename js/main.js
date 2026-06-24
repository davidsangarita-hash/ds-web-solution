/* =====================================================
   DS Web Solution — main.js
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==================== LANGUAGE ====================
  const langBtn = document.getElementById('langSwitch');
  const html = document.documentElement;

  const saved = localStorage.getItem('ds-lang');
  if (saved === 'en') html.classList.add('en');

  langBtn.addEventListener('click', () => {
    html.classList.toggle('en');
    localStorage.setItem('ds-lang', html.classList.contains('en') ? 'en' : 'es');
  });

  // ==================== BURGER MENU ====================
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
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

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActive();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ==================== ACTIVE NAV LINK ====================
  const sections = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-links a');

  function updateActive() {
    const y = window.scrollY + 100;
    sections.forEach(sec => {
      if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
        navAs.forEach(a => a.classList.remove('active'));
        const a = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }

  // ==================== SCROLL ANIMATIONS ====================
  const animEls = document.querySelectorAll('[data-anim]');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // Stagger inside grids
      const grid = entry.target.closest(
        '.services-grid, .why-grid, .process-grid, .ph-stack'
      );
      if (grid) {
        const siblings = [...grid.querySelectorAll('[data-anim]')];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 0.08}s`;
      }

      entry.target.classList.add('in');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  animEls.forEach(el => obs.observe(el));

  // Hero elements animate on load (not scroll)
  setTimeout(() => {
    document.querySelectorAll('#hero [data-anim]').forEach((el, i) => {
      setTimeout(() => el.classList.add('in'), i * 130);
    });
  }, 150);

  // ==================== SMOOTH SCROLL ====================
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ==================== SUBTLE PARALLAX (hero only) ====================
  const heroPhoto = document.querySelector('.hero-photo');
  if (heroPhoto) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroPhoto.style.transform = `translateY(${y * 0.25}px)`;
    }, { passive: true });
  }

});
