document.documentElement.classList.add("js");

try {
  const savedTheme = localStorage.getItem("cj-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    document.documentElement.dataset.theme = savedTheme;
  }
} catch (_) {
  // Local storage can be unavailable in privacy-restricted browser contexts.
}
