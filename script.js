const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const yearTarget = document.getElementById("year");

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

document.querySelectorAll("[data-track]").forEach((target) => {
  target.addEventListener("click", () => {
    const eventName = target.getAttribute("data-track");

    if (window.dataLayer && eventName) {
      window.dataLayer.push({ event: eventName });
    }
  });
});

const mobileStickyCta = document.querySelector(".mobile-sticky-cta");

if (mobileStickyCta) {
  const toggleStickyCta = () => {
    mobileStickyCta.classList.toggle("is-visible", window.scrollY > 520);
  };

  toggleStickyCta();
  window.addEventListener("scroll", toggleStickyCta, { passive: true });
}
