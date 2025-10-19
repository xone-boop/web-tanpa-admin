const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const navbar = document.querySelector('.navbar');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.classList.toggle('is-open', isOpen);
  });

  navItems.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('is-open');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute('id');
      if (!id) return;

      const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (!activeLink) return;

      if (entry.isIntersecting) {
        navItems.forEach((item) => item.classList.remove('is-active'));
        activeLink.classList.add('is-active');
      }
    });
  },
  {
    rootMargin: '-40% 0px -50% 0px',
    threshold: 0.2,
  }
);

const sections = document.querySelectorAll('section[id]');
sections.forEach((section) => observer.observe(section));

window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.classList.toggle('is-scrolled', window.scrollY > 10);
});

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
