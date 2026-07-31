/* =====================================================================
   NOURA SHEHTA — LANDING PAGE
   whatsapp.js — wires every CTA to a real WhatsApp deep link.

   Any element with class="js-whatsapp-cta" and a
   data-whatsapp-message="<key>" attribute (matching a key in
   SITE_CONFIG.messages, see data.js) gets a real href written in on
   load. Because the href is real — not just a click handler — every
   button works with middle-click, "open in new tab", and keyboard
   Enter, and still works even if some other script on the page fails.
===================================================================== */
(function () {
  'use strict';

  function buildWhatsAppUrl(message) {
    var number = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.whatsappNumber) || '';
    var encoded = encodeURIComponent(message || '');
    return 'https://wa.me/' + number + (encoded ? '?text=' + encoded : '');
  }

  function wireWhatsAppLinks() {
    var links = document.querySelectorAll('.js-whatsapp-cta');
    var messages = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.messages) || {};

    links.forEach(function (link) {
      var key = link.getAttribute('data-whatsapp-message') || 'default';
      var message = messages[key] || messages.default || '';
      link.setAttribute('href', buildWhatsAppUrl(message));
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  }

  // Exposed so slider.js can (re)wire CTAs that render after this file runs.
  window.wireWhatsAppLinks = wireWhatsAppLinks;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireWhatsAppLinks);
  } else {
    wireWhatsAppLinks();
  }
})();
