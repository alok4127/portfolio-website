/* ---------------------------------------------------------
   Loading screen sequence:
     1. Big centered counter runs 1 -> 100
     2. Counter fades out, "ALOK" fades in in its place
     3. The L's foot expands outward (the signature beat)
     4. Whole loader fades away, revealing the portfolio
   ---------------------------------------------------------
   Vanilla JS on purpose -- no GSAP dependency, so this still
   works even if the GSAP CDN is slow to respond. Respects
   prefers-reduced-motion via CSS (counter hidden, mark shown
   instantly, no animated wait).
--------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loadingScreen");
  const counterEl = document.getElementById("loaderCounter");
  const mark = document.getElementById("loaderMark");
  if (!loader || !counterEl || !mark) return;

  const reducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const lFoot = mark.querySelector(".loader-L-foot");

  function finishLoading() {
    loader.classList.add("loading-hidden");
    document.documentElement.classList.remove("is-loading");
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    setTimeout(() => loader.remove(), 700);
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
    // CSS already shows the mark instantly and hides the counter;
    // just wait briefly then hand off.
    setTimeout(afterAnimationSequence, 200);
    return;
  }

  const COUNT_DURATION = 1500; // ms
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / COUNT_DURATION, 1);
    counterEl.textContent = Math.max(1, Math.round(progress * 100));

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      onCountComplete();
    }
  }
  requestAnimationFrame(tick);

  function onCountComplete() {
    // 1. Counter fades out
    counterEl.classList.add("hide");

    setTimeout(() => {
      // 2. "ALOK" fades in in its place
      mark.classList.add("show");

      setTimeout(() => {
        // 3. The L's foot expands -- the signature beat
        if (lFoot) lFoot.classList.add("grow");

        // 4. Hold a moment after it finishes expanding, then open
        setTimeout(afterAnimationSequence, 850 + 350);
      }, 350);
    }, 400);
  }
});
