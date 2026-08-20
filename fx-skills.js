/* ---------------------------------------------------------
   Skills: scroll-pinned sequential group reveal
   ---------------------------------------------------------
   While the skill groups are pinned, each category (Languages,
   Web, Data & Databases, Tools & Concepts) fades/slides in one
   at a time, timed to scroll. The existing per-bar fill
   animation and category filter buttons are untouched — this
   only sequences the group containers themselves.
   Falls back to the existing simple fade on mobile / reduced
   motion (see scroll-fx.js).
--------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  if (!window.PortfolioFX || !window.PortfolioFX.enabled) return;

  const pinTarget = document.querySelector("#skills .skills-groups-pin");
  const heading = document.querySelectorAll(
    "#skills .eyebrow, #skills .section-heading, #skills .skill-filters"
  );
  const groups = document.querySelectorAll("#skills .skill-group-wrap");
  if (!pinTarget || !groups.length) return;

  gsap.set(heading, { opacity: 0, y: 20, transition: "none" });
  gsap.set(groups, { opacity: 0, y: 28, transition: "none" });

  window.PortfolioFX.pinSection(pinTarget, {
    pinDistance: 0.7,
    build(tl) {
      // Heading + filters appear together with the first group, not
      // as a separate earlier beat — then the remaining groups follow.
      tl.to(heading, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0);
      tl.to(groups, {
        opacity: 1,
        y: 0,
        stagger: 0.7,
        duration: 0.5,
        ease: "power2.out",
      }, 0);
    },
  });
});
