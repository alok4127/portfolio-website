/* ---------------------------------------------------------
   Projects: scroll-pinned sequential reveal
   ---------------------------------------------------------
   While pinned, each project row reveals in turn: the visual
   scales/fades in first, then the title/description/tags/
   actions slide up just after — timed to scroll position.
   Falls back to the existing simple fade on mobile / reduced
   motion (see scroll-fx.js).
--------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  if (!window.PortfolioFX || !window.PortfolioFX.enabled) return;

  const pinTarget = document.querySelector("#projects .projects-pin");
  const heading = document.querySelectorAll("#projects .eyebrow, #projects .section-heading");
  const rows = document.querySelectorAll("#projects .project-row");
  if (!pinTarget || !rows.length) return;

  const pairs = Array.from(rows).map((row) => ({
    row,
    visual: row.querySelector(".project-visual"),
    content: row.querySelector(":scope > div:not(.project-visual)"),
  }));

  gsap.set(heading, { opacity: 0, y: 20, transition: "none" });
  pairs.forEach(({ visual, content }) => {
    if (visual) gsap.set(visual, { opacity: 0, scale: 0.94, transition: "none" });
    if (content) gsap.set(content, { opacity: 0, y: 20, transition: "none" });
  });

  window.PortfolioFX.pinSection(pinTarget, {
    pinDistance: 0.75,
    build(tl) {
      // Heading appears together with the first project, not as an
      // earlier separate beat.
      tl.to(heading, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0);
      pairs.forEach(({ visual, content }, i) => {
        const start = i * 0.7;
        if (visual) {
          tl.to(visual, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }, start);
        }
        if (content) {
          tl.to(content, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, start + 0.1);
        }
      });
    },
  });
});
