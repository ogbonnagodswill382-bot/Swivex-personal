const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

// Toggle menu
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Navbar shadow on scroll
window.addEventListener("scroll", () => {
  document
    .querySelector(".navbar")
    .classList.toggle("scrolled", window.scrollY > 10);
});