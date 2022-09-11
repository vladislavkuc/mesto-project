import { elementCard, imagePopup } from './utils';
import { openImagePopup } from './modal';

export function pressLike(event){
  event.target.classList.toggle('element__button-like_active');
};

export function deleteCard(event){
  event.target.parentElement.remove();
};

function setCardsListeners(card){
  card.querySelector('.element__button-like').addEventListener('click', pressLike);
  card.querySelector('.element__button-delete').addEventListener('click', deleteCard);
  card.querySelector('.element__image').addEventListener('click', event => openImagePopup(event, imagePopup));
  return card;
}

export function addCard(card) {
  const newCard = elementCard.querySelector('.element').cloneNode(true);
  newCard.querySelector('.element__image').style.backgroundImage = `url(${card.link})`;
  newCard.querySelector('.element__title').textContent = card.name;

  return setCardsListeners(newCard);
};
