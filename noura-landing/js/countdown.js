/* =====================================================================
   NOURA SHEHTA — LANDING PAGE
   countdown.js — live countdown to SITE_CONFIG.countdownTarget (data.js).
   Ticks every second; if the deadline has passed it swaps the panel
   for a clean "offer ended" message instead of showing zeros.
===================================================================== */
(function () {
  'use strict';

  function pad(n) { return String(n).padStart(2, '0'); }

  function initCountdown() {
    var root = document.getElementById('countdown');
    if (!root) return;

    var targetRaw = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.countdownTarget) || '';
    var targetDate = new Date(targetRaw);
    if (isNaN(targetDate.getTime())) return; // misconfigured date — fail quietly, don't break the page

    var daysEl = root.querySelector('[data-unit="days"]');
    var hoursEl = root.querySelector('[data-unit="hours"]');
    var minutesEl = root.querySelector('[data-unit="minutes"]');
    var secondsEl = root.querySelector('[data-unit="seconds"]');

    var intervalId = null;

    function updateUnit(el, value) {
      if (!el) return;
      var formatted = pad(value);
      if (el.textContent !== formatted) {
        el.textContent = formatted;
        el.classList.remove('is-ticking');
        void el.offsetWidth; // force reflow so the tick animation can restart
        el.classList.add('is-ticking');
      }
    }

    function showExpired() {
      var panel = root.closest('.countdown-section__inner');
      if (panel) {
        panel.innerHTML = '<p class="countdown-section__expired">العرض انتهى، تواصلي معنا لمعرفة أحدث العروض المتاحة.</p>';
      }
    }

    function render() {
      var diff = targetDate.getTime() - Date.now();

      if (diff <= 0) {
        clearInterval(intervalId);
        showExpired();
        return;
      }

      var days = Math.floor(diff / 86400000);
      var hours = Math.floor((diff / 3600000) % 24);
      var minutes = Math.floor((diff / 60000) % 60);
      var seconds = Math.floor((diff / 1000) % 60);

      updateUnit(daysEl, days);
      updateUnit(hoursEl, hours);
      updateUnit(minutesEl, minutes);
      updateUnit(secondsEl, seconds);
    }

    render();
    intervalId = window.setInterval(render, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountdown);
  } else {
    initCountdown();
  }
})();
