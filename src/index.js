// live_lBsztSVvUvwdFnMT96hk95a7UO9ug81Xnkl92qpYqmdL3hDpBmj3Wpe8bIj2x9aM
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';

const selector = document.querySelector('.breed-select');
const divCatInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

loader.classList.add('is-hidden');
error.classList.add('is-hidden');

fetchBreeds()
  .then(breeds => {
    toggleShowLoadListSelection();
    markupSelect(breeds);
  })
  .catch(() => onFetchError())
  .finally(() => toggleShowLoadListSelection());

selector.addEventListener('change', onSelectBreed);

function markupSelect(items) {
  const markup = items
    .map(item => `<option value="${item.id}">${item.name}</option>`)
    .join('');
  selector.insertAdjacentHTML(
    'afterbegin',
    `<option data-placeholder="true"></option>`
  );
  selector.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: selector,
    settings: {
      placeholderText: 'Choose breed of cat',
    },
  });
  return;
}

function toggleShowLoadListSelection() {
  loader.classList.toggle('is-hidden');
  error.classList.add('is-hidden');
}

function onSelectBreed(event) {
    loader.classList.replace('is-hidden', 'loader');
    selector.classList.add('is-hidden');

    const breedId = event.currentTarget.value;
    fetchCatByBreed(breedId)
    .then(data => {
      loader.classList.replace('loader', 'is-hidden');
      selector.classList.remove('is-hidden');
      const { url, breeds } = data[0];
      divCatInfo.innerHTML = `
        <div class="box-img">
            <img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box">
            <h1>${breeds[0].name}</h1>
            <p>${breeds[0].description}</p><p>
            <b>Temperament:</b> ${breeds[0].temperament}</p>
        </div>`
    })
    .catch(() => onFetchError())
};


function onFetchError() {
  selector.classList.remove('is-hidden');
  loader.classList.replace('loader', 'is-hidden');
  
    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'left-top',
        timeout: 5000,
        width: '400px',
        fontSize: '14px'
    });
};