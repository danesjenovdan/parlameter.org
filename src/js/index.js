// import Promise from 'es6-promise';
import { fetch } from 'whatwg-fetch';
import AOS from 'aos';
import mailgo from 'mailgo';
import { ScratchCard, SCRATCH_TYPE } from 'scratchcard-js';

// ---
// Animate/fade in elements on scroll
// ---
AOS.init({ duration: 800 });

// ---
// Mailgo
// ---
const mailgoConfig = {
  mobile: false,
  actions: {
    yahoo: false,
    outlook: false,
  },
  details: {
    body: false,
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
const text = 'Hrvatska je jedina zemlja EU koja je zbog COVID-a prestala objavljivati kako su zastupnice_i pojedinačno glasali. Neprihvatljivo je da se Sabor skriva iza epidemioloških mjera i manjkavosti sustava elektronskog glasanja.';
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
  const url = `mailto:?subject=${encodeURIComponent(title)}&body=${text} ${encodeURIComponent(document.location.href)}`;
  window.open(url, '_blank');
});

// ---
// Scratchcards
// ---
const scContainer1 = document.getElementById('js--sc--container1');
const sc1 = new ScratchCard('#js--sc--container1', {
  scratchType: SCRATCH_TYPE.BRUSH,
  containerWidth: scContainer1.offsetWidth,
  containerHeight: scContainer1.offsetHeight,
  imageForwardSrc: './img/scratch-card-1.png',
  htmlBackground: '',
  brushSrc: './img/scratch.svg',
  callback() {},
});
sc1.init();

const scContainer2 = document.getElementById('js--sc--container2');
const sc2 = new ScratchCard('#js--sc--container2', {
  scratchType: SCRATCH_TYPE.BRUSH,
  containerWidth: scContainer2.offsetWidth,
  containerHeight: scContainer2.offsetHeight,
  imageForwardSrc: './img/scratch-card-2.png',
  htmlBackground: '',
  brushSrc: './img/scratch.svg',
  callback() {},
});
sc2.init();

const scContainer3 = document.getElementById('js--sc--container3');
const sc3 = new ScratchCard('#js--sc--container3', {
  scratchType: SCRATCH_TYPE.BRUSH,
  containerWidth: scContainer3.offsetWidth,
  containerHeight: scContainer3.offsetHeight,
  imageForwardSrc: './img/scratch-card-3.png',
  htmlBackground: '',
  brushSrc: './img/scratch.svg',
  callback() {},
});
sc3.init();
