/* =====================================================================
   NOURA SHEHTA — LANDING PAGE
   main.js — site-wide behaviour: sticky header state, scroll reveals,
   click-to-play video (hero + shorts, one shared handler), button
   ripple, hero parallax, footer year.
===================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------------
     Shared helper: run fn at most once per animation frame
  --------------------------------------------------------------- */
  function throttleRAF(fn) {
    var ticking = false;
    return function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        fn();
        ticking = false;
      });
    };
  }

  /* ---------------------------------------------------------------
     Sticky header — condenses and gains a background after a scroll
  --------------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.getElementById('siteHeader');
    if (!header) return;

    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    }
    update();
    window.addEventListener('scroll', throttleRAF(update), { passive: true });
  }

  /* ---------------------------------------------------------------
     Scroll reveal — see animations.css for the progressive-
     enhancement reasoning behind the "reveal-armed" class.
  --------------------------------------------------------------- */
  function initRevealAnimations() {
    var revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    revealEls.forEach(function (el) { el.classList.add('reveal-armed'); });

    if (!('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------------
     Video playback — one delegated handler covers the hero video
     AND every shorts card slider.js renders, present or future.
     Supports two kinds of source, auto-detected from the URL:
       - a YouTube link (youtu.be/…, youtube.com/watch?v=…,
         youtube.com/shorts/…, youtube.com/embed/…) -> embedded player
       - anything else -> treated as a local/direct video file path
  --------------------------------------------------------------- */
  var currentlyPlayingFrame = null;

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

  // Removing the playing element (video or iframe) from the DOM stops its
  // playback/audio immediately in every browser — simplest reliable way
  // to enforce "only one clip plays at a time" across both media types.
  function stopFrame(frame) {
    if (!frame) return;
    // Only remove the active playback media — never the .yt-preview
    // iframe that lives inside the placeholder and acts as thumbnail.
    var media = frame.querySelector('video, iframe:not(.yt-preview)');
    if (media) media.remove();
    frame.classList.remove('is-playing');
  }

  function playVideoInFrame(frame) {
    var src = frame.dataset.video;
    if (!src) return;

    if (currentlyPlayingFrame && currentlyPlayingFrame !== frame) {
      stopFrame(currentlyPlayingFrame);
    }

    // Clear any previous playback attempt on this frame.
    // Exclude .yt-preview so the thumbnail iframe inside the
    // placeholder is preserved and reappears when playback stops.
    var oldMedia = frame.querySelector('video, iframe:not(.yt-preview)');
    if (oldMedia) oldMedia.remove();
    var oldError = frame.querySelector('.media-frame__error-msg');
    if (oldError) oldError.remove();
    frame.classList.remove('has-error');

    var youtubeId = getYouTubeId(src);

    if (youtubeId) {
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + youtubeId + '?autoplay=1&playsinline=1&rel=0';
      iframe.title = frame.dataset.videoTitle || 'فيديو دكتور نورا';
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('frameborder', '0');

      frame.appendChild(iframe);
      frame.classList.add('is-playing');
      currentlyPlayingFrame = frame;
      iframe.focus();
      return;
    }

    var video = document.createElement('video');
    video.controls = true;
    video.playsInline = true;
    video.autoplay = true;
    video.setAttribute('aria-label', frame.dataset.videoTitle || '');
    video.src = src;

    video.addEventListener('error', function () {
      frame.classList.remove('is-playing');
      frame.classList.add('has-error');
      var msg = document.createElement('p');
      msg.className = 'media-frame__error-msg';
      msg.textContent = 'الفيديو غير متاح حالياً.';
      frame.appendChild(msg);
      video.remove();
      if (currentlyPlayingFrame === frame) currentlyPlayingFrame = null;
    });

    frame.appendChild(video);
    frame.classList.add('is-playing');
    currentlyPlayingFrame = frame;

    video.play().catch(function () {
      // Autoplay was blocked for some reason; native controls are
      // already visible so the visitor can press play manually.
    });
    video.focus();
  }

  // Loads a local thumbnail image into `el`.
  // Used only for video cards that have an explicit `thumbnail` path
  // in data.js — YouTube previews are now handled via .yt-preview iframes.
  function loadThumbInto(el, src) {
    var img = new Image();
    img.className = 'media-frame__thumb-img';
    img.alt = '';
    img.addEventListener('load', function () {
      el.innerHTML = '';
      el.appendChild(img);
    });
    img.src = src;
  }

  function initVideoTriggers() {
    // Point the hero frame at the single configurable heroVideo variable
    var heroFrame = document.getElementById('heroVideoFrame');
    if (heroFrame && typeof heroVideo !== 'undefined') {
      heroFrame.dataset.video = heroVideo;
      heroFrame.dataset.videoTitle = 'الفيديو التعريفي لدكتور نورا';

      // Inject a non-autoplay YouTube iframe as the hero thumbnail —
      // same guaranteed approach used for the shorts cards.
      var heroYoutubeId = getYouTubeId(heroVideo);
      if (heroYoutubeId) {
        var heroPlaceholder = heroFrame.querySelector('.media-frame__placeholder');
        if (heroPlaceholder) {
          var previewIframe = document.createElement('iframe');
          previewIframe.className = 'yt-preview';
          previewIframe.src =
            'https://www.youtube-nocookie.com/embed/' + heroYoutubeId +
            '?autoplay=0&rel=0&modestbranding=1&controls=0&playsinline=1';
          previewIframe.setAttribute('frameborder', '0');
          previewIframe.setAttribute('loading', 'lazy');
          previewIframe.setAttribute('tabindex', '-1');
          previewIframe.setAttribute('aria-hidden', 'true');
          previewIframe.setAttribute('allow',
            'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
          previewIframe.setAttribute('allowfullscreen', '');
          heroPlaceholder.innerHTML = '';
          heroPlaceholder.appendChild(previewIframe);
        }
      }
    }

    document.addEventListener('click', function (e) {
      var trigger = e.target.closest ? e.target.closest('.video-trigger') : null;
      if (!trigger) return;
      if (trigger.classList.contains('is-playing')) return;
      playVideoInFrame(trigger);
    });
  }

  /* ---------------------------------------------------------------
     Button ripple
  --------------------------------------------------------------- */
  function initRipple() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('.btn') : null;
      if (!btn) return;

      var rect = btn.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      var originX = (typeof e.clientX === 'number' && e.clientX !== 0) ? e.clientX : rect.left + rect.width / 2;
      var originY = (typeof e.clientY === 'number' && e.clientY !== 0) ? e.clientY : rect.top + rect.height / 2;

      var ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = size + 'px';
      ripple.style.height = size + 'px';
      ripple.style.left = (originX - rect.left - size / 2) + 'px';
      ripple.style.top = (originY - rect.top - size / 2) + 'px';

      btn.appendChild(ripple);
      ripple.addEventListener('animationend', function () { ripple.remove(); });
    });
  }

  /* ---------------------------------------------------------------
     Hero parallax — subtle, scroll-linked, skipped for
     prefers-reduced-motion
  --------------------------------------------------------------- */
  function initParallax() {
    var bg = document.querySelector('.hero__bg');
    var hero = document.querySelector('.hero');
    if (!bg || !hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function update() {
      var rect = hero.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      bg.style.transform = 'translateY(' + (window.scrollY * 0.15) + 'px)';
    }
    update();
    window.addEventListener('scroll', throttleRAF(update), { passive: true });
  }

  /* ---------------------------------------------------------------
     Footer year
  --------------------------------------------------------------- */
  function initFooterYear() {
    var el = document.getElementById('footerYear');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ---------------------------------------------------------------
     Init
  --------------------------------------------------------------- */
  function init() {
    initHeaderScroll();
    initRevealAnimations();
    initVideoTriggers();
    initRipple();
    initParallax();
    initFooterYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
