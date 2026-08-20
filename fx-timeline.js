/* ---------------------------------------------------------
   Journey/Timeline: scroll-pinned sequential reveal
   ---------------------------------------------------------
   While the timeline is pinned, the connecting line "draws"
   downward and each entry fades/slides in in order, timed to
   scroll position. Falls back to the existing simple fade
   (script.js's .reveal handling) on mobile / reduced motion —
   see scroll-fx.js for that check.
--------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  if (!window.PortfolioFX || !window.PortfolioFX.enabled) return;

  const timelineEl = document.querySelector("#timeline .timeline");
  const heading = document.querySelectorAll("#timeline .eyebrow, #timeline .section-heading");
  const items = document.querySelectorAll("#timeline .timeline-item");
  const trackFill = document.querySelector(".timeline-track-fill");
  if (!timelineEl || !items.length) return;

  gsap.set(heading, { opacity: 0, y: 20, transition: "none" });
  gsap.set(items, { opacity: 0, x: -24, transition: "none" });
  if (trackFill) gsap.set(trackFill, { transition: "none" });

  window.PortfolioFX.pinSection(timelineEl, {
    pinDistance: 0.75,
    build(tl) {
      // Heading appears together with the first entry, not as an
      // earlier separate beat.
      tl.to(heading, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0);
      if (trackFill) {
        tl.to(trackFill, { scaleY: 1, ease: "none", duration: items.length * 0.7 }, 0);
      }
      tl.to(
        items,
        { opacity: 1, x: 0, stagger: 0.7, duration: 0.5, ease: "power2.out" },
        0
      );
    },
  });
});
