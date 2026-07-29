/* ---------------------------------------------------------
   Portfolio interactivity
   (vanilla JS port of the original React component logic)
--------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  /* --- theme toggle (dark default, light on request) --- */
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const root = document.documentElement;
  const storedTheme = localStorage.getItem("portfolio-theme");
  if (storedTheme === "light") {
    root.setAttribute("data-theme", "light");
  }
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isLight = root.getAttribute("data-theme") === "light";
      if (isLight) {
        root.removeAttribute("data-theme");
        localStorage.setItem("portfolio-theme", "dark");
      } else {
        root.setAttribute("data-theme", "light");
        localStorage.setItem("portfolio-theme", "light");
      }
    });
  }

  const NAV_IDS = ["home", "about", "timeline", "skills", "resume", "projects", "contact"];

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

  /* --- scroll progress bar --- */
  const scrollProgressBar = document.getElementById("scrollProgressBar");
  function onScrollProgress() {
    if (!scrollProgressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressBar.style.width = pct + "%";
  }
  window.addEventListener("scroll", onScrollProgress);
  onScrollProgress();

  /* --- animated stat counters --- */
  function easeOutQuad(t) { return 1 - (1 - t) * (1 - t); }

  function animateCount(el) {
    const target = parseInt(el.getAttribute("data-count-to"), 10) || 0;
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuad(progress);
      el.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(tick);
  }

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll(".stat-number").forEach((el) => {
    statObserver.observe(el);
  });

  /* --- animated skill proficiency bars --- */
  const skillBarObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("filled");
          skillBarObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll(".skill-bar-fill").forEach((el) => {
    skillBarObserver.observe(el);
  });

  /* --- skill category filters --- */
  const skillFilterBtns = document.querySelectorAll(".skill-filter-btn");
  const skillGroupWraps = document.querySelectorAll(".skill-group-wrap");

  skillFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      skillFilterBtns.forEach((b) => b.classList.toggle("active", b === btn));

      skillGroupWraps.forEach((wrap) => {
        const matches = filter === "all" || wrap.getAttribute("data-category") === filter;
        wrap.classList.toggle("filtering-out", !matches);
      });
    });
  });

  /* --- resume file meta (live size / last-updated, via HEAD request) --- */
  async function loadResumeMeta() {
    const sizeEl = document.getElementById("resumeFileSize");
    const dateEl = document.getElementById("resumeUpdatedDate");
    if (!sizeEl && !dateEl) return;
    try {
      const res = await fetch("assets/resume/AlokRamteke_Resume.pdf", { method: "HEAD" });
      const bytes = res.headers.get("content-length");
      const lastModified = res.headers.get("last-modified");
      if (bytes && sizeEl) {
        sizeEl.textContent = Math.max(1, Math.round(parseInt(bytes, 10) / 1024)) + " KB";
      }
      if (lastModified && dateEl) {
        const d = new Date(lastModified);
        if (!isNaN(d.getTime())) {
          dateEl.textContent = d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
        }
      }
    } catch (e) {
      /* leave the static fallback text in place (e.g. opened via file://) */
    }
  }
  loadResumeMeta();

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
