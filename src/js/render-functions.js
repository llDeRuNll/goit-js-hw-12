import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
export const render = photos => {
  const gallery = document.querySelector('.gallery');
  if (photos.length === 0) {
    gallery.innerHTML = '';
  }

  const markup = photos
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class='gallery-item'>
          <a class='gallery-link' href='${largeImageURL}'>
            <img class='gallery-image' src='${webformatURL}' alt='${tags}'>
          </a>
          <ul class='image-info'>
            <li><h4>Likes</h4><p>${likes}</p></li>
            <li><h4>Views</h4><p>${views}</p></li>
            <li><h4>Comments</h4><p>${comments}</p></li>
            <li><h4>Downloads</h4><p>${downloads}</p></li>
          </ul>
        </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  let lightbox = new SimpleLightbox('.gallery a', {
    close: true,
    animationSpeed: 250,
    enableKeyboard: true,
    showCounter: true,
    docClose: true,
    captions: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
};
export const loader = type => {
  const loader = document.querySelector('.loader');
  if (type === 'add') {
    loader.classList.remove('is-hidden');
  } else if (type === 'remove') {
    loader.classList.add('is-hidden');
  }
};
export const clearGallery = () => {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
};
