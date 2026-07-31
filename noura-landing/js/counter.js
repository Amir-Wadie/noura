/* =====================================================================
   NOURA SHEHTA — LANDING PAGE
   counter.js — animates each [data-count] stat from 0 to its target
   the first time it scrolls into view.
===================================================================== */
(function () {
  'use strict';

  function easeOutQuad(t) { return t * (2 - t); }

  function animateValue(el, target, suffix, duration) {
    var startTime = null;

    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = easeOutQuad(progress);
      var current = Math.round(eased * target);
      el.textContent = current.toString() + suffix;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target.toString() + suffix; // guarantee an exact final value
      }
    }
    window.requestAnimationFrame(step);
  }

  function showFinalValues(counters) {
    counters.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      el.textContent = target.toString() + suffix;
    });
  }

  function initCounters() {
    var counters = document.querySelectorAll('.stat__value[data-count]');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
      showFinalValues(counters);
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-count'), 10) || 0;
          var suffix = el.getAttribute('data-suffix') || '';
          animateValue(el, target, suffix, 1800);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounters);
  } else {
    initCounters();
  }
})();
