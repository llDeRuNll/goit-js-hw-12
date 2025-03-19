import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchPhotos } from './js/pixabay-api';
import { render, loader, clearGallery } from './js/render-functions';
import Simplelightbox from 'simplelightbox';

const lightbox = new Simplelightbox('.js-gallery a');
let page = 1;
let query = '';
const perPage = 15;
let totalPages = 0;
let totalHits = 0;

const form = document.querySelector('.form');
const loadmore = document.querySelector('.js-loadmore');

const onSubmit = async event => {
  event.preventDefault();
  query = event.target.elements['search-text'].value.trim();
  page = 1;

  event.target.reset();

  if (!query) {
    showMessage(
      'Sorry, there are no images matching your search query. Please try again!',
      'error'
    );
    clearGallery();
    return;
  }

  loader('add');
  loadmore.classList.add('is-hidden');

  clearGallery();

  try {
    const response = await fetchPhotos(query, page, perPage);

    if (!response.hits.length) {
      showMessage(
        'Sorry, there are no images matching your search query. Please try again!',
        'error'
      );
      return;
    }

    totalHits = response.totalHits;
    totalPages = Math.ceil(totalHits / perPage);
    render(response.hits);
    lightbox.refresh();

    if (totalPages > 1) {
      loadmore.classList.remove('is-hidden');
    }
  } catch (error) {
    showMessage(`Something went wrong: ${error.message}`, 'error');
  } finally {
    loader('remove');
  }
};

form.addEventListener('submit', onSubmit);

const showMessage = (message, type = 'info') => {
  iziToast[type]({
    message,
    position: 'topRight',
  });
};

loadmore.addEventListener('click', async () => {
  page++;

  loadmore.classList.add('is-hidden');

  loader('add');

  try {
    const response = await fetchPhotos(query, page, perPage);
    render(response.hits);
    lightbox.refresh();

    scrollSmoothly();

    if (page >= totalPages) {
      loadmore.classList.add('is-hidden');
      showMessage(
        "We're sorry, but you've reached the end of search results.",
        'info'
      );
    } else {
      loadmore.classList.remove('is-hidden');
    }
  } catch (error) {
    showMessage(`Something went wrong: ${error.message}`, 'error');
  } finally {
    loader('remove');
  }
});

const scrollSmoothly = () => {
  const firstCard = document.querySelector('.gallery-item');
  if (!firstCard) return;

  const cardHeight = firstCard.getBoundingClientRect().height;
  window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
};
