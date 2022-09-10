export function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

export function closePopupByOverlay(evt) {
  const popup = document.querySelector('.popup_opened');
  if(evt.target === popup) {
    closePopup(popup);
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
