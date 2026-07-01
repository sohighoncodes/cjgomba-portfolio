const CONTACT_EMAIL = "cjgomba1003@gmail.com";

const themeButtons = document.querySelectorAll(".theme-toggle");
const root = document.documentElement;

function preferredTheme() {
  if (root.dataset.theme) return root.dataset.theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  root.dataset.theme = theme;
  try {
    localStorage.setItem("cj-theme", theme);
  } catch (_) {}

  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#111015" : "#f8f7fb");

  themeButtons.forEach((button) => {
    button.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
    );
  });
}

applyTheme(preferredTheme());

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });
});

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

function closeMenu() {
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.querySelector(".sr-only")?.replaceChildren("Open menu");
  mobileMenu?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

menuButton?.addEventListener("click", () => {
  const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(willOpen));
  menuButton.querySelector(".sr-only")?.replaceChildren(willOpen ? "Close menu" : "Open menu");
  mobileMenu?.classList.toggle("is-open", willOpen);
  document.body.classList.toggle("menu-open", willOpen);
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.querySelectorAll(".case-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    const details = button.closest(".case-copy")?.querySelector(".case-details");
    button.setAttribute("aria-expanded", String(!expanded));
    details?.classList.toggle("is-open", !expanded);
  });
});

const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.09, rootMargin: "0px 0px -45px" },
);

revealElements.forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll("main section[id]");
const navLinks = [...document.querySelectorAll(".side-nav a")];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-35% 0px -55%", threshold: [0, 0.2, 0.5] },
);

sections.forEach((section) => sectionObserver.observe(section));

const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = [...contactForm.querySelectorAll("input, textarea")];
  fields.forEach((field) => field.classList.toggle("is-invalid", !field.checkValidity()));

  if (!contactForm.checkValidity()) {
    formStatus.textContent = "Please complete the three fields above.";
    return;
  }

  if (!CONTACT_EMAIL) {
    formStatus.textContent = "Contact email needs to be added before this form can send.";
    return;
  }

  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`Project inquiry from ${data.get("name")}`);
  const body = encodeURIComponent(
    `Hi CJ,\n\n${data.get("message")}\n\nFrom: ${data.get("name")}\nEmail: ${data.get("email")}`,
  );
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  formStatus.textContent = "Opening your email app…";
});

document.querySelectorAll(".contact-form input, .contact-form textarea").forEach((field) => {
  field.addEventListener("input", () => {
    field.classList.remove("is-invalid");
    if (formStatus) formStatus.textContent = "";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
