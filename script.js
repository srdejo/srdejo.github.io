// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navDesktop = document.querySelector('.nav-desktop');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navDesktop.style.display = navDesktop.style.display === 'flex' ? 'none' : 'flex';
  });
}
