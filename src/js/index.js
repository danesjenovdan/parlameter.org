import Promise from 'es6-promise';
import { fetch } from 'whatwg-fetch';
import AOS from 'aos';


// ---
// Polyfill
// ---
if (!window.Promise) {
  window.Promise = Promise;
}
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}


// ---
// Animate/fade in elements on scroll
// ---
window.addEventListener('load', () => {
  AOS.init({ duration: 800 });
});


// ---
// Smooth scroll to content on nav link click
// ---
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (href.indexOf('#') === 0) {
      event.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  });
});


// ---
// Load counters
// ---
fetch('https://analize.parlametar.hr/v1/s/getBuggyStats/')
  .then((res) => res.json()).then((json) => {
    Object.keys(json).forEach((key) => {
      const el = document.querySelector(`.js-${key}`);
      if (el) {
        el.textContent = json[key];
      }
    });
  });


// ---
// Carousel/Accordion combo
// ---
function changeCarousel(dt, i) {
  if (!dt.classList.contains('active')) {
    const imgs = document.querySelectorAll('.carousel img');
    imgs.forEach((img) => img.classList.remove('active'));
    imgs[i % imgs.length].classList.add('active');
    dt.closest('dl').querySelectorAll('dt').forEach((e) => {
      const dd = e.nextElementSibling;
      const height = `${dd.firstElementChild.clientHeight}px`;
      dd.style.height = height;
      setTimeout(() => {
        dd.style.height = '0px';
      }, 0);
      e.classList.remove('active');
    });
    dt.classList.add('active');
    const dd = dt.nextElementSibling;
    const height = `${dd.firstElementChild.clientHeight}px`;
    dd.style.height = '0px';
    setTimeout(() => {
      dd.style.height = height;
    }, 0);
  }
}

let loopTID = null;

document.querySelectorAll('.carousel dt').forEach((dt, i) => {
  dt.addEventListener('click', (event) => {
    event.preventDefault();
    if (loopTID) {
      clearTimeout(loopTID);
      loopTID = null;
    }
    changeCarousel(dt, i);
  });
});

function loopCarousel(i) {
  const dts = document.querySelectorAll('.carousel dt');
  if (dts.length) {
    const idx = i % dts.length;
    const dt = dts[idx];
    changeCarousel(dt, idx);
    // loopTID = setTimeout(() => {
    //   loopCarousel(i + 1);
    // }, 8000);
  }
}

loopCarousel(0);


// ---
// Fix carousel height
// ---
const dl = document.querySelector('.carousel dl');
if (dl) {
  const height = dl.offsetHeight;
  let largest = 0;
  dl.querySelectorAll('dd > div').forEach((el) => {
    if (el.clientHeight > largest) {
      largest = el.clientHeight;
    }
  });
  dl.style.height = `${height + largest}px`;
}


// ---
// Show all signatures
// ---
const showAllSignaturesButton = document.querySelector('.js-show-all-signatures');

function showAllSignatures() {
  if (showAllSignaturesButton) {
    showAllSignaturesButton.remove();
    const names = document.querySelector('.js-signature-names');
    if (names) {
      names.classList.remove('show-less');
    }
  }
}

if (showAllSignaturesButton) {
  showAllSignaturesButton.addEventListener('click', showAllSignatures);
}


// ---
// Get signatures
// ---
const peticija = 'ekonsultacije-bih';

function fetchSignatures() {
  fetch(`https://api.djnd.si/getPublicSignaturesAndFullCountForMultiple/?peticije=${peticija}`)
    .then((res) => res.json())
    .then((json) => {
      const sigNames = document.querySelector('.js-signature-names');
      sigNames.textContent = json.names;
      if (parseInt(window.getComputedStyle(sigNames)['max-height'], 10) > sigNames.clientHeight) {
        showAllSignatures();
      }
      const maxSignatures = parseInt(document.querySelector('.js-signature-max').textContent, 10);
      const count = json.counter;
      if (typeof count === 'number' && !Number.isNaN(count)) {
        const percent = Math.floor(Math.min((count / maxSignatures) * 100, 100));
        document.querySelectorAll('.js-signature-count').forEach((el) => {
          // eslint-disable-next-line no-param-reassign
          el.textContent = count;
        });
        document.querySelector('.progress-bar').setAttribute('aria-valuenow', percent);
        document.querySelector('.progress-bar').style.width = `${percent}%`;
      }
    });
}

fetchSignatures();

// ---
// Submit signature
// ---
document.querySelector('.petition__form').addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.querySelector('#petition-name').value;
  let email = document.querySelector('#petition-email').value;
  const isPublic = document.querySelector('#petition-show-name').checked;
  const peticijaType = `${peticija}${isPublic ? '.public' : '.private'}.sign`;

  if (!name) {
    return;
  }

  if (!email.trim()) {
    email = 'dont@me.pls';
  }

  const form = event.currentTarget;
  const inputs = form.querySelectorAll('input,textarea,button');
  inputs.forEach((el) => {
    el.setAttribute('disabled', true);
  });

  let signUrl = 'https://api.djnd.si/sign/';
  signUrl += `?name=${encodeURIComponent(name)}`;
  signUrl += `&email=${encodeURIComponent(email)}`;
  signUrl += `&peticija=${encodeURIComponent(peticijaType)}`;

  fetch(signUrl)
    .then((res) => res.text())
    .then((text) => {
      if (text === 'Saved') {
        fetchSignatures();
        alert('Hvala!');
        document.querySelector('#reci').scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      } else {
        alert('Greška: ' + text);
      }
      inputs.forEach((el) => {
        el.removeAttribute('disabled');
      });
    });
});


// ---
// Social share buttons
// ---
let link = document.location.href;
fetch(`https://parla.me/shortner/generate?url=${encodeURIComponent(document.location.href)}`)
  .then((res) => res.text())
  .then((text) => {
    link = text;
  });

const title = 'Imamo pravo znati!';
const text = 'Tko je glasao za, a tko protiv smjene ministra financija spašenog jednim glasom? Što su zaključila saborska istražna povjerenstva o Agrokoru i Imunološkom zavodu? Što se uopće događa na sjednicama saborskih radnih tijela? Na koju e-mail adresu možemo pisati zastupnicama? Potpiši za otvaranje Hrvatskog sabora!';
const hashtags = '';

document.querySelector('.js-facebook').addEventListener('click', () => {
  const url = `https://www.facebook.com/dialog/feed?app_id=217978989255065&redirect_uri=${encodeURIComponent(document.location.href)}&link=${encodeURIComponent(document.location.href)}&ref=responsive&name=${encodeURIComponent(title)}`;
  window.open(url, '_blank');
});
document.querySelector('.js-twitter').addEventListener('click', () => {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${text.slice(0, 250)}… ${hashtags} ${link}`)}`;
  window.open(url, '_blank');
});
document.querySelector('.js-email').addEventListener('click', () => {
  // const url = `https://mail.google.com/mail/?view=cm&su=${encodeURIComponent(title)}&body=${text} ${encodeURIComponent(document.location.href)}`;
  const url = `mailto:?subject=${encodeURIComponent(title)}&body=${text} ${encodeURIComponent(document.location.href)}`;
  window.open(url, '_blank');
});

// ---
// Contact form
// ---
// const contactForm = document.querySelector('.contact-form');
// if (contactForm) {
//   contactForm.addEventListener('submit', (event) => {
//     event.preventDefault();

//     const btn = event.target.querySelector('button');
//     const el = event.target.elements;
//     const data = [
//       `name=${encodeURIComponent(el.name.value)}`,
//       `organization=${encodeURIComponent(el.organization.value)}`,
//       `email=${encodeURIComponent(el.email.value)}`,
//       `message=${encodeURIComponent(el.message.value)}`,
//     ];

//     if (el.email.value === '') {
//       // eslint-disable-next-line no-alert
//       alert('You need to enter an email address.');
//       return;
//     }
//     if (el.humanity.value !== '25') {
//       // eslint-disable-next-line no-alert
//       alert('Please provide a correct answer to the last question.');
//       return;
//     }

//     btn.setAttribute('disabled', true);

//     fetch(event.target.action, {
//       method: event.target.method.toUpperCase(),
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: data.join('&'),
//     })
//       .then((res) => res.text())
//       .then((text) => {
//         if (text.toLowerCase().indexOf('error') === -1) {
//           btn.textContent = 'Done!';
//         } else {
//           // eslint-disable-next-line no-console
//           console.error(text);
//           btn.removeAttribute('disabled');
//           btn.textContent = 'Error :(';
//         }
//       })
//       .catch((error) => {
//         // eslint-disable-next-line no-console
//         console.error(error);
//         btn.removeAttribute('disabled');
//         btn.textContent = 'Error :(';
//       });
//   });
// }
