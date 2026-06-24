/* =====================================================
   DS Web Solution — main.js v5
   Handles only interactivity. Content visibility is
   100% CSS-controlled (pure CSS animations on hero).
   ===================================================== */

// Mark JS as active (enables optional scroll animations)
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {

  /* ---- LANGUAGE SWITCH ---- */
  var langBtn = document.getElementById('langSwitch');
  var root    = document.documentElement;

  if (localStorage.getItem('ds-lang') === 'en') {
    root.classList.add('en');
  }

  if (langBtn) {
    langBtn.addEventListener('click', function () {
      root.classList.toggle('en');
      localStorage.setItem('ds-lang', root.classList.contains('en') ? 'en' : 'es');
    });
  }

  /* ---- BURGER MENU ---- */
  var burger   = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');

  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var isOpen = burger.classList.toggle('open');
      navLinks.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- NAVBAR SCROLL STYLE ---- */
  var navbar = document.getElementById('navbar');

  function onScroll() {
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    markActive();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ---- ACTIVE NAV LINK ---- */
  var sections = document.querySelectorAll('section[id]');
  var navAs    = document.querySelectorAll('.nav-links a');

  function markActive() {
    var scrollY = window.scrollY + 120;
    sections.forEach(function (sec) {
      if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
        navAs.forEach(function (a) { a.classList.remove('active'); });
        var match = document.querySelector('.nav-links a[href="#' + sec.id + '"]');
        if (match) match.classList.add('active');
      }
    });
  }

  /* ---- SMOOTH SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id     = a.getAttribute('href');
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ---- OPTIONAL SCROLL ANIMATIONS (sections only) ---- */
  if ('IntersectionObserver' in window) {
    var cards = document.querySelectorAll(
      '.svc-card, .why-card, .step, .ph-card, .s-head, .coming-card'
    );

    // Mark each card with data-scroll for CSS to handle
    cards.forEach(function (el) {
      el.setAttribute('data-scroll', '');
    });

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Small stagger based on sibling index
          var parent = entry.target.parentElement;
          if (parent) {
            var siblings = Array.from(parent.children);
            var idx = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = (idx * 0.07) + 's';
          }
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

    cards.forEach(function (el) { obs.observe(el); });
  }

});
