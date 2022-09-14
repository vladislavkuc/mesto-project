import { imagePopupDescription, imagePopupPicture } from './utils';

export function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', closePopupByEsc);
};

export function openPopup(event, popup) {
  popup.classList.add('popup_opened');

  window.addEventListener('keydown', closePopupByEsc);
};

export function openImagePopup(event, popup){
  const imageTitle = event.target.parentElement.querySelector('.element__title');
  imagePopupDescription.textContent = imageTitle.textContent;
  imagePopupPicture.src = event.target.parentElement.querySelector('.element__image').style.backgroundImage.slice(5,-2);
  imagePopupPicture.alt = imageTitle.textContent;
  openPopup(event, popup);
};
