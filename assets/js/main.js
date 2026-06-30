/* =========================================================
   Trip'Potes — interactions
   ========================================================= */
(function () {
  "use strict";

  /* ---- Header shadow on scroll ---- */
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile nav ---- */
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    });
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---- Reveal on scroll ---- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---- Animated counters ---- */
  const counters = document.querySelectorAll("[data-count]");
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString("fr-FR");
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window && counters.length) {
    const co = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => co.observe(el));
  } else {
    counters.forEach((el) => (el.textContent = parseInt(el.dataset.count, 10).toLocaleString("fr-FR")));
  }

  /* ---- Store badge redirection (placeholders for now) ---- */
  const STORE_LINKS = {
    ios: "", // À compléter quand le lien App Store sera disponible
    android: "", // À compléter quand le lien Google Play sera disponible
  };
  document.querySelectorAll(".store-badge").forEach((badge) => {
    badge.addEventListener("click", (ev) => {
      const store = badge.dataset.store;
      const url = STORE_LINKS[store];
      if (url) {
        // Lien disponible : on laisse le navigateur ouvrir le store
        badge.setAttribute("href", url);
        return;
      }
      // Pas encore de lien : on redirige vers le formulaire bêta
      ev.preventDefault();
      const beta = document.getElementById("beta");
      if (beta) beta.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ---- Beta form validation ---- */
  const form = document.getElementById("beta-form");
  if (form) {
    const setError = (input, msg) => {
      const slot = form.querySelector(`.error[data-for="${input.id}"]`);
      input.classList.toggle("invalid", Boolean(msg));
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      if (slot) slot.textContent = msg || "";
      return !msg;
    };

    const validators = {
      "bf-name": (v) => (v.trim().length >= 2 ? "" : "Indiquez votre prénom."),
      "bf-email": (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "E-mail invalide."),
      "bf-platform": (v) => (v ? "" : "Choisissez une plateforme."),
    };

    Object.keys(validators).forEach((id) => {
      const input = document.getElementById(id);
      if (input) input.addEventListener("blur", () => setError(input, validators[id](input.value)));
    });

    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      let ok = true;

      Object.keys(validators).forEach((id) => {
        const input = document.getElementById(id);
        if (input && !setError(input, validators[id](input.value))) ok = false;
      });

      const consent = document.getElementById("bf-consent");
      const consentSlot = form.querySelector('.error[data-for="bf-consent"]');
      if (consent && !consent.checked) {
        ok = false;
        if (consentSlot) consentSlot.textContent = "Veuillez accepter pour continuer.";
      } else if (consentSlot) {
        consentSlot.textContent = "";
      }

      if (!ok) {
        const firstInvalid = form.querySelector(".invalid, .error:not(:empty)");
        if (firstInvalid) firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      // Succès — ici, brancher l'envoi vers votre backend / service e-mail.
      const success = document.getElementById("beta-success");
      const data = Object.fromEntries(new FormData(form).entries());
      console.info("Inscription bêta :", data);

      form.querySelector("button[type=submit]").disabled = true;
      if (success) {
        success.hidden = false;
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      burstConfetti();
    });
  }

  /* ---- Tiny confetti burst on success ---- */
  function burstConfetti() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const colors = ["#ff5a7e", "#1fd1c6", "#ffc24b", "#7b6cff"];
    const n = 36;
    for (let i = 0; i < n; i++) {
      const p = document.createElement("span");
      p.style.cssText = `position:fixed;z-index:9999;top:50%;left:50%;width:10px;height:10px;border-radius:2px;pointer-events:none;background:${colors[i % colors.length]}`;
      document.body.appendChild(p);
      const angle = (Math.PI * 2 * i) / n;
      const dist = 120 + (i % 5) * 40;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist - 60;
      p.animate(
        [
          { transform: "translate(-50%,-50%) rotate(0deg)", opacity: 1 },
          { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(540deg)`, opacity: 0 },
        ],
        { duration: 1100 + (i % 6) * 120, easing: "cubic-bezier(.2,.7,.3,1)" }
      ).onfinish = () => p.remove();
    }
  }
})();
