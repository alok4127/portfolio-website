/* ---------------------------------------------------------
   Portfolio interactivity
   (vanilla JS port of the original React component logic)
--------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const NAV_IDS = ["home", "about", "timeline", "skills", "projects", "contact"];

  const navLinks = document.querySelectorAll(".nav-link");
  const navMobileBtn = document.getElementById("navMobileBtn");
  const navMobileMenu = document.getElementById("navMobileMenu");
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  const copyIcon = document.getElementById("copyIcon");
  const checkIcon = document.getElementById("checkIcon");
  const copyLabel = document.getElementById("copyLabel");

  const EMAIL = "alokramteke.work@gmail.com";

  /* --- smooth scroll for nav + buttons using data-scroll --- */
  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    if (navMobileMenu) navMobileMenu.style.display = "none";
  }

  document.querySelectorAll("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-scroll");
      scrollToId(id);
    });
  });

  /* --- mobile menu toggle --- */
  if (navMobileBtn && navMobileMenu) {
    navMobileBtn.addEventListener("click", () => {
      const isOpen = navMobileMenu.style.display === "block";
      navMobileMenu.style.display = isOpen ? "none" : "block";
    });
  }

  /* --- scroll spy: highlight active nav link --- */
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            const linkId = link.getAttribute("data-scroll");
            link.classList.toggle("active", linkId === id);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  NAV_IDS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) spyObserver.observe(el);
  });

  /* --- reveal-on-scroll animations --- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    revealObserver.observe(el);
  });

  /* --- scroll-to-top button visibility --- */
  function onScroll() {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  }
  window.addEventListener("scroll", onScroll);
  onScroll();

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* --- copy email button --- */
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(EMAIL).catch(() => {});
      }
      copyIcon.style.display = "none";
      checkIcon.style.display = "inline-block";
      copyLabel.textContent = "Copied!";
      setTimeout(() => {
        copyIcon.style.display = "inline-block";
        checkIcon.style.display = "none";
        copyLabel.textContent = "Copy Email";
      }, 1800);
    });
  }
});
