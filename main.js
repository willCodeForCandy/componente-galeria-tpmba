import './style.css';
import { TECHNOLOGIES_URL } from './constants';

// SETUP

const $app = document.querySelector('#app');

const createContainerTemplate = () => `
<div id="gallery-container" class="gallery-container">
  <h1>Loading...</h1>
</div>`;

const createModalTemplate = () => `
<div id="modal" class="modal">
  <div class="modal-header">
    <h2 class="modal-title"></h2>
    <button class="modal-close-btn">❌</button>
  </div>
  <div class="modal-body"></div>
</div>`;

$app.innerHTML += createContainerTemplate();
$app.innerHTML += createModalTemplate();

// LOGIC
const $gallery = document.querySelector('#gallery-container');
const $loading = document.querySelector('h1');
const $modal = document.querySelector('#modal');
let cards = [];

const countStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= rating && i <= 5; i++) {
        stars.push('<span>⭐</span>');
    }
    return stars.join('');
};

const createCardTemplate = (technology, index) => `
  <div class="card" id="card-${index}" role="button">
  <h3>${technology.name}</h3>
    <div class="image-container">
      <img src="${technology.logo}" alt="${technology.name} logo" />
    </div>
    <div class="score-container">
${countStars(technology.score)} (${technology.reviews} opiniones)
    </div>
  </div>`;

const showModal = () => {
    $modal.style.display = 'block';
};

const populateGallery = (galleryContentList) => {
    $loading.remove();
    galleryContentList.forEach((item, index) => {
        const cardTemplate = createCardTemplate(item, index);
        $gallery.innerHTML += cardTemplate;
        const thisCard = document.querySelector(`#card-${index}`);
        thisCard.addEventListener('click', showModal);
        // thisCard.style.border = '1px solid blue';
    });
};

// fetch(TECHNOLOGIES_URL)
//   .then((res) => res.json())
//   .then((cardsData) => {
//     cards = cardsData;
//     populateGallery(cards);
//   });

const getTechnologies = async () => {
    const res = await fetch(TECHNOLOGIES_URL);
    const cardsData = await res.json();

    cards = cardsData;
    populateGallery(cards);
};

const addModalListener = () => {
    const closeBtn = document.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', () => {
        $modal.style.display = 'none';
    });
};

getTechnologies();
addModalListener();
