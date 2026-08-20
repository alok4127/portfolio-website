/* ---------------------------------------------------------
   Scroll-pinned transition engine (GSAP + ScrollTrigger)
   ---------------------------------------------------------
   This file only sets up the reusable engine + fallback
   detection. Individual sections (Journey, Skills, Projects,
   Hero) are wired up to it in later steps — nothing in this
   file changes how the page looks or behaves yet.
--------------------------------------------------------- */

window.PortfolioFX = (function () {
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const isSmallScreen = window.matchMedia && window.matchMedia("(max-width: 900px)").matches;

  const gsapReady = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

  // Pinned scroll effects are disabled on mobile/touch layouts (scroll-pinning
  // is unreliable on touch) and when the user has requested reduced motion.
  // In both cases sections fall back to the existing simple reveal-on-scroll
  // fade (already handled by script.js's .reveal / IntersectionObserver logic).
  const enabled = gsapReady && !prefersReducedMotion && !isSmallScreen;

  if (enabled) {
    gsap.registerPlugin(ScrollTrigger);

    // Pin/scrub distances are calculated from section heights at setup time.
    // Images (profile photo, project screenshots) can still be loading then,
    // which would throw those calculations off — so recalculate once
    // everything has actually finished loading.
    window.addEventListener("load", () => ScrollTrigger.refresh());
  }

  /**
   * Register a scroll-pinned, scroll-scrubbed timeline for a section.
   * No-ops safely (returns null) when pinned effects are disabled, so
   * calling code never needs its own enabled/disabled branching.
   *
   * @param {string|Element} target - section selector or element to pin
   * @param {Object} options
   * @param {number} [options.pinDistance=1] - scroll distance to pin for,
   *        as a multiple of the section's height (keep short: 0.6–1.2)
   * @param {Function} options.build - receives a fresh GSAP timeline and
   *        the target element; add tweens to the timeline in this callback
   * @returns {ScrollTrigger|null}
   */
  function pinSection(target, options) {
    if (!enabled) return null;
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (!el || typeof options.build !== "function") return null;

    const pinDistance = options.pinDistance || 1;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top top+=80",
        end: () => "+=" + el.offsetHeight * pinDistance,
        pin: true,
        scrub: true,
        anticipatePin: 1,
      },
    });

    options.build(tl, el);
    return tl.scrollTrigger;
  }

  return { enabled, pinSection };
})();
