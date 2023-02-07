const navLinks = document.querySelectorAll(".nav-link");
const currentUrl = window.location.pathname;

navLinks.forEach(link => {
  if (link.getAttribute("href") === currentUrl) {
    link.classList.add("active");
  }
});
