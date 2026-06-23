(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ====================================================
     1. SCROLL REVEAL
     ==================================================== */
  var reveals = document.querySelectorAll('.reveal');

  if (prefersReduced) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else if ('IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(function (el) { revealObs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ====================================================
     2. GUITAR GRAIN LINES (reveal on scroll into view)
     ==================================================== */
  var grainLines = document.getElementById('grain-lines');
  var guitarContainer = document.getElementById('guitar-container');

  if (grainLines && guitarContainer && 'IntersectionObserver' in window) {
    var grainObs = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          grainLines.classList.add('revealed');
          grainObs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    grainObs.observe(guitarContainer);
  } else if (grainLines) {
    grainLines.classList.add('revealed');
  }

  /* ====================================================
     3. NAV — scrolled state + mobile toggle
     ==================================================== */
  var nav = document.getElementById('site-nav');
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', function () {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }
  }, { passive: true });

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ====================================================
     4. SPOTS BAR — animate width on scroll into view
     ==================================================== */
  var spotsFill = document.querySelector('.spots-fill');
  if (spotsFill && 'IntersectionObserver' in window) {
    var targetWidth = spotsFill.style.width;
    spotsFill.style.width = '0%';
    var spotsObs = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          spotsFill.style.width = targetWidth;
          spotsObs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    spotsObs.observe(spotsFill);
  }

  /* ====================================================
     5. ADMISSION FORM — multi-step
     ==================================================== */
  var btnAdmision   = document.getElementById('btn-admision');
  var admisionWrap  = document.getElementById('admision-form');
  var formMain      = document.getElementById('form-main');
  var formLoading   = document.getElementById('form-loading');
  var formSuccess   = document.getElementById('form-success');
  var btnSubmit     = document.getElementById('btn-submit');
  var motivacion    = document.getElementById('motivacion');

  var currentStep = 1;

  /* Open form */
  if (btnAdmision && admisionWrap) {
    btnAdmision.addEventListener('click', function () {
      admisionWrap.classList.add('is-open');
      admisionWrap.setAttribute('aria-hidden', 'false');
      btnAdmision.classList.add('is-hidden');
      setTimeout(function () {
        admisionWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    });
  }

  /* Option selection helper */
  function initOptions(stepEl, nextBtnId) {
    var group = stepEl ? stepEl.querySelector('.form-options') : null;
    var nextBtn = document.getElementById(nextBtnId);
    if (!group || !nextBtn) return;

    group.querySelectorAll('.form-opt').forEach(function (opt) {
      opt.addEventListener('click', function () {
        group.querySelectorAll('.form-opt').forEach(function (o) {
          o.classList.remove('selected');
          o.setAttribute('aria-pressed', 'false');
        });
        opt.classList.add('selected');
        opt.setAttribute('aria-pressed', 'true');
        nextBtn.removeAttribute('disabled');
      });
    });
  }

  initOptions(document.getElementById('step-1'), 'next-1');
  initOptions(document.getElementById('step-2'), 'next-2');

  /* Advance step */
  function advanceTo(next) {
    var curr = document.getElementById('step-' + currentStep);
    var nextEl = document.getElementById('step-' + next);
    if (curr) curr.classList.remove('active');
    if (nextEl) nextEl.classList.add('active');
    currentStep = next;
  }

  var next1 = document.getElementById('next-1');
  var next2 = document.getElementById('next-2');
  if (next1) next1.addEventListener('click', function () { advanceTo(2); });
  if (next2) next2.addEventListener('click', function () { advanceTo(3); });

  /* Enable submit when textarea has meaningful content */
  if (motivacion && btnSubmit) {
    btnSubmit.setAttribute('disabled', '');
    motivacion.addEventListener('input', function () {
      if (motivacion.value.trim().length >= 12) {
        btnSubmit.removeAttribute('disabled');
      } else {
        btnSubmit.setAttribute('disabled', '');
      }
    });
  }

  /* Submit */
  if (formMain) {
    formMain.addEventListener('submit', function (e) {
      e.preventDefault();
      formMain.style.display = 'none';
      formLoading.classList.add('is-active');

      setTimeout(function () {
        formLoading.classList.remove('is-active');
        formSuccess.classList.add('is-active');
      }, 2600);
    });
  }

})();
