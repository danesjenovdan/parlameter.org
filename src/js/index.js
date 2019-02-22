import AOS from 'aos';
import 'replaceme';

// Polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

AOS.init({
  offset: 120,
  duration: 800,
  easing: 'ease',
  delay: 0,
});

const navLinks = document.querySelectorAll('.nav-link');
if (navLinks) {
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector(link.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
      });
    });
  });
}

// eslint-disable-next-line no-new
new window.ReplaceMe(document.querySelector('.replace-me'));
