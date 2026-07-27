/* LapDog — minimal front-end scripts */
(function () {
  'use strict';

  // Reveal on scroll
  const io = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' }) : null;

  function bindReveals() {
    document.querySelectorAll('[data-reveal]:not(.on)').forEach(el => io ? io.observe(el) : el.classList.add('on'));
  }

  // Cart drawer toggle
  function bindCart() {
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;
    document.querySelectorAll('[data-cart-open]').forEach(btn => {
      btn.addEventListener('click', (e) => { e.preventDefault(); drawer.setAttribute('data-open', 'true'); });
    });
    drawer.querySelector('.cart-drawer__close')?.addEventListener('click', () => drawer.setAttribute('data-open', 'false'));
  }

  // Swatch selection
  function bindSwatches() {
    document.querySelectorAll('.swatches').forEach(group => {
      group.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          group.querySelectorAll('button').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });
    });
  }

  // Mobile nav toggle
  function bindMobileNav() {
    const t = document.querySelector('[data-mobile-toggle]');
    const nav = document.querySelector('.site-header__nav');
    if (!t || !nav) return;
    t.addEventListener('click', () => {
      const open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!open));
    });
  }

  // Duplicate marquee tracks (seamless loop)
  function seedMarquees() {
    document.querySelectorAll('.announcement__track, .ticker__track').forEach(t => {
      if (t.dataset.seeded) return;
      t.innerHTML = t.innerHTML + t.innerHTML;
      t.dataset.seeded = '1';
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    seedMarquees();
    bindReveals();
    bindCart();
    bindSwatches();
    bindMobileNav();
  });
})();
