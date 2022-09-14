import { elementCard, imagePopup } from './utils';
import { openImagePopup } from './modal';
import { deleteCard, pressLikeHandler } from '../index';

export function addCard(card, profile) {
  const newCard = elementCard.querySelector('.element').cloneNode(true);
  const deleteButton = newCard.querySelector('.element__button-delete');
  const likeButton = newCard.querySelector('.element__button-like');

  newCard.querySelector('.element__image').style.backgroundImage = `url(${card.link})`;
  newCard.querySelector('.element__title').textContent = card.name;
  newCard.querySelector('.element__likes-count').textContent = card.likes.length;

  if (card.owner._id !== profile._id) {
    newCard.removeChild(deleteButton);
  } else {
    deleteButton.addEventListener('click', () => deleteCard(card._id));
  }


  if (card.likes.map(like => JSON.stringify(like)).includes(JSON.stringify(profile))) {
    likeButton.classList.add('element__button-like_active');
  } else {
    likeButton.classList.remove('element__button-like_active');
  }

  likeButton.addEventListener('click', evt => { pressLikeHandler(evt, card) });
  newCard.querySelector('.element__image').addEventListener('click', event => openImagePopup(event, imagePopup));

  return newCard;
};
