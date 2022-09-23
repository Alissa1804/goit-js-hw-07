import { galleryItems } from './gallery-items.js';
// Change code below this line

const markup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<div class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/></a></div>`,
  )
  .join('');

const galleryEl = document.querySelector('.gallery');
galleryEl.insertAdjacentHTML('afterbegin', markup);

galleryEl.addEventListener('click', clickHandler);
function clickHandler(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const selImg = event.target.getAttribute('data-source');
  const instance = basicLightbox.create(
    `
    <img src = "${selImg}" width="800" height="600">
`,
    {
      onShow: () => {
        window.addEventListener('keydown', closeKey);
      },
      onClose: () => {
        window.removeEventListener('keydown', closeKey);
      },
    },
  );

  instance.show();

  function closeKey(event) {
    if (event.key === 'Escape') {
      instance.close();
    }
  }
}
