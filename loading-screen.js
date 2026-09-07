/* ---------------------------------------------------------
   Loading screen sequence (short form):
     1. "ALOK" fades in immediately
     2. The L's foot expands outward (the signature beat)
     3. Brief hold, then the loader fades away
   ---------------------------------------------------------
   The 1->100 counter phase from the original version was cut --
   it was the main source of delay and added no information for
   a recruiter waiting to see the page. Total on-screen time is
   now ~550ms before the fade-out begins (see matching CSS
   transition durations in style.css). Respects
   prefers-reduced-motion via CSS (mark shown instantly, no
   animated wait).
--------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loadingScreen");
  const mark = document.getElementById("loaderMark");
  if (!loader || !mark) return;

  const reducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const lFoot = mark.querySelector(".loader-L-foot");

  function finishLoading() {
    loader.classList.add("loading-hidden");
    document.documentElement.classList.remove("is-loading");
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    setTimeout(() => loader.remove(), 350);
  }

  function afterAnimationSequence() {
    // Never dismiss before the page has actually finished loading --
    // if assets are slow, wait for the real 'load' event too.
    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading, { once: true });
    }
  }

  if (reducedMotion) {
    // CSS already shows the mark instantly; just hand off quickly.
    setTimeout(afterAnimationSequence, 100);
    return;
  }

  // 1. "ALOK" fades in right away
  mark.classList.add("show");

  // 2. The L's foot expands -- the signature beat
  setTimeout(() => {
    if (lFoot) lFoot.classList.add("grow");
  }, 150);

  // 3. Brief hold after the beat finishes, then open
  setTimeout(afterAnimationSequence, 550);
});
