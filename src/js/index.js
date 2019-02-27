import AOS from 'aos';
import 'replaceme';

// ---
// Polyfill
// ---
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

// ---
// Animate/fade in elements on scroll
// ---
AOS.init({ duration: 800 });

// ---
// Loop text strings
// ---
new window.ReplaceMe(document.querySelector('.replace-me')).start();

// ---
// Smooth scroll to content on nav link click
// ---
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  });
});

// ---
// Handle language select
// ---
const langSelect = document.querySelector('.select-lang');
langSelect.addEventListener('change', (event) => {
  window.location = event.target.value;
});
langSelect.querySelectorAll('option').forEach((option) => {
  if (window.location.pathname.indexOf(option.value) === 0) {
    option.setAttribute('selected', true);
  }
});

// ---
// Carousel/Accordion combo
// ---
document.querySelectorAll('.carousel dt').forEach((dt, i) => {
  dt.addEventListener('click', (event) => {
    event.preventDefault();
    if (!dt.classList.contains('active')) {
      const imgs = document.querySelectorAll('.carousel img');
      imgs.forEach(img => img.classList.remove('active'));
      imgs[i % imgs.length].classList.add('active');
      dt.closest('dl').querySelectorAll('dt').forEach((e) => {
        const dd = e.nextElementSibling;
        const height = `${dd.clientHeight}px`;
        dd.style.height = height;
        setTimeout(() => {
          dd.style.height = '0px';
        }, 0);
        e.classList.remove('active');
      });
      dt.classList.add('active');
      const dd = dt.nextElementSibling;
      dd.style.height = 'auto';
      const height = `${dd.clientHeight}px`;
      dd.style.height = '0px';
      setTimeout(() => {
        dd.style.height = height;
      }, 0);
    }
  });
});

function loopCarousel(i) {
  const dts = document.querySelectorAll('.carousel dt');
  dts[i % dts.length].click();
  setTimeout(loopCarousel, 8000, i + 1);
}
loopCarousel(0);
