/* ---------------------------------------------------------
   Hero → About: 3D layered-stack transition
   ---------------------------------------------------------
   This is the "signature moment" from the reference — while
   the Hero is pinned, its content tilts back in 3D (like a
   card folding away) and fades, while the About section rises
   up from beneath it to take its place. Short and quick (not
   a long hold), used once as the site's one big scroll moment.
   Falls back to a normal static scroll on mobile / reduced
   motion (see scroll-fx.js) — About's own content reveal is
   untouched either way.
--------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  if (!window.PortfolioFX || !window.PortfolioFX.enabled) return;

  const heroSection = document.querySelector("#home");
  const heroGrid = document.querySelector("#home .hero-grid");
  const aboutSection = document.querySelector("#about");
  if (!heroSection || !heroGrid || !aboutSection) return;

  gsap.set(heroGrid, {
    transformPerspective: 1400,
    transformOrigin: "50% 0%",
    transition: "none",
  });
  gsap.set(aboutSection, { transition: "none" });

  // About starts slightly receded/scaled down, as if it's the next
  // card sitting just beneath the hero, waiting to rise into place.
  gsap.set(aboutSection, { opacity: 0.5, y: 70, scale: 0.95 });

  window.PortfolioFX.pinSection(heroSection, {
    pinDistance: 0.6,
    build(tl) {
      tl.to(
        heroGrid,
        { rotateX: -14, y: -30, scale: 0.92, opacity: 0.25, ease: "none", duration: 1 },
        0
      );
      tl.to(
        aboutSection,
        { opacity: 1, y: 0, scale: 1, ease: "none", duration: 1 },
        0
      );
    },
  });
});
