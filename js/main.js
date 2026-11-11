/* Breathizen — getbreathizen.vercel.app */
(function () {
  'use strict';

  /* Menu for narrow screens */
  function menu() {
    var btn = document.querySelector('.nav-btn');
    var list = document.getElementById('nav-list');
    if (!btn || !list) return;
    function shut() {
      list.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }
    btn.addEventListener('click', function () {
      btn.setAttribute('aria-expanded', list.classList.toggle('is-open') ? 'true' : 'false');
    });
    list.addEventListener('click', function (e) { if (e.target.closest('a')) shut(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') shut(); });
  }

  /* The 60-day spine fills as the reader moves down it. */
  function spine() {
    var plan = document.querySelector('.plan');
    var fill = document.querySelector('.plan-fill');
    if (!plan || !fill) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      plan.style.setProperty('--progress', 1);
      return;
    }
    var queued = false;
    function paint() {
      queued = false;
      var box = plan.getBoundingClientRect();
      var mark = window.innerHeight * 0.62;
      var p = (mark - box.top) / box.height;
      plan.style.setProperty('--progress', Math.min(1, Math.max(0, p)).toFixed(3));
    }
    function onScroll() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(paint);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    paint();
  }

  /* Order bar appears after the hero and steps aside at the pricing section. */
  function dock() {
    var bar = document.querySelector('.dock');
    var hero = document.querySelector('.hero');
    var prices = document.getElementById('prices');
    if (!bar || !hero || !('IntersectionObserver' in window)) return;
    var past = false, onPrices = false;
    function set() { bar.classList.toggle('is-up', past && !onPrices); }
    new IntersectionObserver(function (e) { past = !e[0].isIntersecting; set(); }).observe(hero);
    if (prices) new IntersectionObserver(function (e) { onPrices = e[0].isIntersecting; set(); }).observe(prices);
  }

  function start() { menu(); spine(); dock(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
