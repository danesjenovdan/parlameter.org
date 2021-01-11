// import Promise from 'es6-promise';
import { fetch } from 'whatwg-fetch';
import AOS from 'aos';
import mailgo from 'mailgo';

// ---
// Animate/fade in elements on scroll
// ---
AOS.init({ duration: 800 });

// configure mailgo
const mailgoConfig = {
  actions: {
    yahoo: false,
  },
};

mailgo(mailgoConfig);

function copyText() {
  const text = document.getElementById('poruka');

  text.select();
  text.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand('copy');
}

document.getElementById('copy-button').addEventListener('click', copyText, false);

// ---
// Social share buttons
// ---
let link = document.location.href;
fetch(`https://parla.me/shortner/generate?url=${encodeURIComponent(document.location.href)}`)
  .then((res) => res.text())
  .then((text) => {
    link = text;
});

const title = 'Korona nije opravdanje: Imamo pravo znati kako zastupnici_e glasaju u naše ime';
const text = 'Hrvatski sabor jedini je nacionalni parlament u EU koji je, pod izgovorom korone, prestao objavljivati kako je glasala koja zastupnica i zastupnik. Neprihvatljivo je da se Sabor skriva iza epidemioloških mjera i manjkavosti sustava elektronskog glasanja predviđenog samo za sabornicu. Imamo pravo znati tko i kako odlučuje u naše ime.';
const hashtags = '#ImamoPravoZnati';

document.querySelector('.js-facebook').addEventListener('click', () => {
  const url = `https://www.facebook.com/dialog/feed?app_id=217978989255065&redirect_uri=${encodeURIComponent(document.location.href)}&link=${encodeURIComponent(document.location.href)}&ref=responsive&name=${encodeURIComponent(title)}`;
  window.open(url, '_blank');
});
document.querySelector('.js-twitter').addEventListener('click', () => {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${text.slice(0, 250)}… ${hashtags} ${link}`)}`;
  window.open(url, '_blank');
});
/*
document.querySelector('.js-email').addEventListener('click', () => {
  // const url = `https://mail.google.com/mail/?view=cm&su=${encodeURIComponent(title)}&body=${text} ${encodeURIComponent(document.location.href)}`;
  const url = `mailto:?subject=${encodeURIComponent(title)}&body=${text} ${encodeURIComponent(document.location.href)}`;
  window.open(url, '_blank');
});
*/
