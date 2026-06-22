/* ====================================================
   VETA — interacciones
   1. Revelado de elementos al hacer scroll
   2. Anillo de crecimiento (tracker fijo) sincronizado con la sección activa
   3. Menú móvil
   ==================================================== */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Revelado al hacer scroll ---------- */
  var animatedEls = document.querySelectorAll("[data-animate]");

  if (prefersReducedMotion) {
    animatedEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    animatedEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    animatedEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- 2. Anillo de crecimiento ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll(".section[data-section-index]"));
  var ringFill = document.querySelector(".ring-tracker__fill");
  var ringStep = document.querySelector(".ring-tracker__step");
  var ringText = document.querySelector(".ring-tracker__text");
  var RING_CIRCUMFERENCE = 326.7; // 2 * PI * r(52), precomputado para el SVG

  function updateRingTracker() {
    if (!sections.length || !ringFill) return;

    var viewportCenter = window.innerHeight * 0.5;
    var current = sections[0];

    sections.forEach(function (section) {
      var rect = section.getBoundingClientRect();
      if (rect.top <= viewportCenter && rect.bottom >= 0) {
        current = section;
      }
    });

    var index = parseInt(current.getAttribute("data-section-index"), 10) || 0;
    var label = current.getAttribute("data-section-label") || "";
    var total = sections.length - 1;
    var progress = total > 0 ? index / total : 0;

    ringFill.style.strokeDashoffset = String(RING_CIRCUMFERENCE * (1 - progress));
    if (ringStep) ringStep.textContent = String(index).padStart(2, "0");
    if (ringText) ringText.textContent = label;
  }

  var ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateRingTracker();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateRingTracker);
  updateRingTracker();

  /* ---------- 3. Menú móvil ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var primaryNav = document.querySelector(".primary-nav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
