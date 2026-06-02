/* =========================================================
   OPHTECH — Site behaviour
   ========================================================= */

(function () {
  'use strict';

  /* --- Sticky nav background on scroll --- */
  const navWrapper = document.getElementById('navWrapper');
  const onScroll = () => {
    if (!navWrapper) return;
    if (window.scrollY > 12) navWrapper.classList.add('scrolled');
    else navWrapper.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Mobile menu --- */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  }
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  /* --- Reveal on scroll (single + stagger) --- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => revealObserver.observe(el));

  /* --- Smooth in-page anchor scroll (offset for fixed nav) --- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* --- Subtle parallax on hero gradient mesh --- */
  const hero = document.querySelector('.hero');
  if (hero && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    const mesh = hero;
    let ticking = false;
    window.addEventListener('mousemove', (e) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 12;
        const y = (e.clientY / window.innerHeight - 0.5) * 12;
        mesh.style.setProperty('--mx', `${x}px`);
        mesh.style.setProperty('--my', `${y}px`);
        ticking = false;
      });
    });
  }

  /* --- Form submission handler --- */
  window.handleFormSubmit = function (form) {
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    const original = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = 'Sending…';
    setTimeout(() => {
      btn.innerHTML = 'Message sent ✓';
      btn.style.background = '#10B981';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 2500);
    }, 900);
  };

  /* --- Year auto-update in footer (if present) --- */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
