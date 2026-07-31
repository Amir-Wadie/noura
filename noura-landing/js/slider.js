/* =====================================================================
   NOURA SHEHTA — LANDING PAGE
   slider.js — builds both sliders straight from the `testimonials` and
   `shortVideos` arrays in data.js, and drives their navigation.

   Add a new testimonial or video in data.js and it appears here with
   no other changes required.
===================================================================== */
(function () {
  'use strict';

  var STAR_PATH = 'M12 2l2.9 6.9L22 9.6l-5.5 5 1.6 7.4L12 18.3 5.9 22l1.6-7.4L2 9.6l7.1-.7L12 2z';

  /* ---------------------------------------------------------------
     Render helpers
  --------------------------------------------------------------- */
  function starsMarkup(rating) {
    var html = '';
    for (var i = 1; i <= 5; i++) {
      html += i <= rating
        ? '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="' + STAR_PATH + '"/></svg>'
        : '<svg class="is-empty" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" focusable="false"><path d="' + STAR_PATH + '"/></svg>';
    }
    return html;
  }

  function escapeAttr(str) {
    return String(str || '').replace(/"/g, '&quot;');
  }

  /* Recognises youtu.be/, youtube.com/shorts/, youtube.com/embed/ and
     youtube.com/watch?v= links and returns the bare video ID, or null
     if the string isn't a YouTube link (e.g. a local "assets/..." path). */
  function getYouTubeId(url) {
    if (!url || typeof url !== 'string') return null;
    var patterns = [
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{6,})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/,
      /youtu\.be\/([a-zA-Z0-9_-]{6,})/,
      /[?&]v=([a-zA-Z0-9_-]{6,})/
    ];
    for (var i = 0; i < patterns.length; i++) {
      var match = url.match(patterns[i]);
      if (match && match[1]) return match[1];
    }
    return null;
  }

  function renderTestimonials() {
    var track = document.getElementById('testimonialTrack');
    if (!track || typeof testimonials === 'undefined' || !testimonials.length) return;

    track.innerHTML = testimonials.map(function (t) {
      var initial = (t.name || '؟').trim().charAt(0);
      return (
        '<article class="testimonial-card" role="listitem">' +
          '<div class="testimonial-card__stars">' + starsMarkup(t.rating || 5) + '</div>' +
          '<p class="testimonial-card__text">' + t.text + '</p>' +
          '<div class="testimonial-card__footer">' +
            '<div class="testimonial-card__avatar" data-avatar="' + escapeAttr(t.avatar) + '">' +
              '<span aria-hidden="true">' + initial + '</span>' +
            '</div>' +
            '<span class="testimonial-card__name">' + t.name + '</span>' +
          '</div>' +
        '</article>'
      );
    }).join('');

    // Try to upgrade each avatar badge to a real photo. If it fails to
    // load, the initials placed above simply stay put — never a broken image.
    track.querySelectorAll('.testimonial-card__avatar[data-avatar]').forEach(function (el) {
      var src = el.getAttribute('data-avatar');
      if (!src) return;
      var img = new Image();
      img.alt = '';
      img.loading = 'lazy';
      img.addEventListener('load', function () {
        el.textContent = '';
        el.appendChild(img);
      });
      img.src = src;
    });
  }

  // Loads the first URL that actually succeeds into `el`, falling
  // through to the next candidate on error (e.g. a just-uploaded
  // YouTube video whose hqdefault.jpg isn't generated yet falls back
  // to mqdefault.jpg). If every candidate fails, the themed gradient
  // placeholder already in `el` is simply left alone.
  function loadThumbInto(el, candidates) {
    var i = 0;
    function tryNext() {
      if (i >= candidates.length) return;
      var img = new Image();
      img.className = 'media-frame__thumb-img';
      img.alt = '';
      img.loading = 'lazy';
      img.addEventListener('load', function () {
        el.innerHTML = '';
        el.appendChild(img);
      });
      img.addEventListener('error', function () { i += 1; tryNext(); });
      img.src = candidates[i];
    }
    tryNext();
  }

  function renderShorts() {
    var track = document.getElementById('shortsTrack');
    if (!track || typeof shortVideos === 'undefined' || !shortVideos.length) return;

    track.innerHTML = shortVideos.map(function (v, i) {
      var variant = (i % 3) + 1;
      var youtubeId = getYouTubeId(v.video);
      // A manually-supplied thumbnail always wins. Otherwise, if the
      // clip is a YouTube link, mark it for the fallback-chain loader below.
      var thumbAttr = v.thumbnail ? ' data-thumb="' + escapeAttr(v.thumbnail) + '"' : '';
      var ytAttr = (!v.thumbnail && youtubeId) ? ' data-yt-id="' + escapeAttr(youtubeId) + '"' : '';
      return (
        '<div class="video-card media-frame video-trigger" role="listitem" ' +
             'data-video="' + escapeAttr(v.video) + '" data-video-title="' + escapeAttr(v.title) + '">' +
          '<div class="media-frame__placeholder media-frame__placeholder--' + variant + '"' + thumbAttr + ytAttr + '></div>' +
          '<button type="button" class="play-btn" aria-label="' + 'تشغيل: ' + escapeAttr(v.title) + '">' +
            '<span class="play-btn__ring"></span>' +
            '<svg class="play-btn__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M9 6.5v11l9-5.5-9-5.5z"/></svg>' +
          '</button>' +
          '<span class="video-card__title">' + v.title + '</span>' +
        '</div>'
      );
    }).join('');

    // Upgrade gradient placeholders to real thumbnails where available.
    track.querySelectorAll('.media-frame__placeholder[data-thumb]').forEach(function (el) {
      var src = el.getAttribute('data-thumb');
      if (src) loadThumbInto(el, [src]);
    });
    track.querySelectorAll('.media-frame__placeholder[data-yt-id]').forEach(function (el) {
      var id = el.getAttribute('data-yt-id');
      if (!id) return;
      loadThumbInto(el, [
        'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg',
        'https://i.ytimg.com/vi/' + id + '/mqdefault.jpg'
      ]);
    });
  }

  /* ---------------------------------------------------------------
     Carousel engine — works for both sliders via options
  --------------------------------------------------------------- */
  function getCurrentIndex(viewport, track) {
    var children = Array.prototype.slice.call(track.children);
    if (!children.length) return 0;
    var viewportLeft = viewport.getBoundingClientRect().left;
    var closest = 0;
    var closestDist = Infinity;
    children.forEach(function (child, i) {
      var dist = Math.abs(child.getBoundingClientRect().left - viewportLeft);
      if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    return closest;
  }

  function goToIndex(viewport, track, index) {
    var children = track.children;
    if (!children.length) return;
    var clamped = Math.max(0, Math.min(index, children.length - 1));
    var child = children[clamped];

    // Scroll ONLY this slider's own viewport horizontally — never the page.
    // (element.scrollIntoView() walks up every scrollable ancestor,
    // including <html>/<body>, so a periodic autoplay tick could silently
    // drag the whole page to wherever this slider sits. Measuring the
    // delta with getBoundingClientRect() and moving just the viewport
    // with scrollBy() keeps the motion local to the carousel, and still
    // respects RTL vs LTR reading direction correctly.)
    var viewportRect = viewport.getBoundingClientRect();
    var childRect = child.getBoundingClientRect();
    var isRTL = getComputedStyle(viewport).direction === 'rtl';
    var delta = isRTL ? (childRect.right - viewportRect.right) : (childRect.left - viewportRect.left);
    viewport.scrollBy({ left: delta, behavior: 'smooth' });
  }

  function initSlider(name, options) {
    var root = document.querySelector('[data-slider="' + name + '"]');
    if (!root) return;

    var viewport = root.querySelector('.slider__viewport');
    var track = root.querySelector('.slider__track');
    var prevBtn = root.querySelector('.slider__btn[data-dir="prev"]');
    var nextBtn = root.querySelector('.slider__btn[data-dir="next"]');
    if (!viewport || !track) return;

    var loop = !!options.loop;
    var autoplayMs = options.autoplayMs || 0;
    var timerId = null;

    function updateButtons() {
      if (loop) return; // an infinite-loop slider never needs disabled edges
      var idx = getCurrentIndex(viewport, track);
      if (prevBtn) prevBtn.disabled = idx <= 0;
      if (nextBtn) nextBtn.disabled = idx >= track.children.length - 1;
    }

    function step(direction) {
      var count = track.children.length;
      if (!count) return;
      var idx = getCurrentIndex(viewport, track);
      var target = idx + direction;
      if (loop) target = (target + count) % count;
      goToIndex(viewport, track, target);
    }

    function stopAutoplay() { if (timerId) { clearInterval(timerId); timerId = null; } }
    function startAutoplay() {
      if (!autoplayMs) return;
      stopAutoplay();
      timerId = window.setInterval(function () { step(1); }, autoplayMs);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { step(-1); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { step(1); startAutoplay(); });

    viewport.addEventListener('mouseenter', stopAutoplay);
    viewport.addEventListener('mouseleave', startAutoplay);
    viewport.addEventListener('touchstart', stopAutoplay, { passive: true });
    viewport.addEventListener('touchend', startAutoplay, { passive: true });

    if (!loop) {
      var ticking = false;
      viewport.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () { updateButtons(); ticking = false; });
      }, { passive: true });
      updateButtons();
    }

    startAutoplay();
  }

  /* ---------------------------------------------------------------
     Init
  --------------------------------------------------------------- */
  function init() {
    renderTestimonials();
    renderShorts();
    initSlider('testimonials', { loop: true, autoplayMs: 5000 });
    initSlider('shorts', { loop: false, autoplayMs: 0 });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
