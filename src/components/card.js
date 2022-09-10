import { elementCard } from './utils';

export function pressLike(event){
  event.target.classList.toggle('element__button-like_active');
};

export function deleteCard(event){
  event.target.parentElement.remove();
};

export function addCard(card) {
  const newCard = elementCard.querySelector('.element').cloneNode(true);
  newCard.querySelector('.element__image').style.backgroundImage = `url(${card.link})`;
  newCard.querySelector('.element__title').textContent = card.name;

  return newCard;
};
