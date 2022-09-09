import { closePopup, openPopup} from './modal';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elementCard = document.querySelector('#element').content;
const elementsContainer = document.querySelector('.elements');

const cardAddPopup = document.querySelector('.popup_type_add-card');
const cardAddPopupOpenButton = document.querySelector('.profile__add-button');
const cardAddPopupCloseButton = cardAddPopup.querySelector('.popup__button-close');
const cardAddPopupForm = cardAddPopup.querySelector('form[name="card-add-form"]');

function pressLike(event){
  event.target.classList.toggle('element__button-like_active');
};

function deleteCard(event){
  event.target.parentElement.remove();
};

function addCard(card) {
  const newCard = elementCard.querySelector('.element').cloneNode(true);
  const elementImage = newCard.querySelector('.element__image');
  elementImage.style.backgroundImage = `url(${card.link})`;
  newCard.querySelector('.element__title').textContent = card.name;

  newCard.querySelector('.element__button-like').addEventListener('click', pressLike);
  newCard.querySelector('.element__button-delete').addEventListener('click', deleteCard);
  elementImage.addEventListener('click', event => { openPopup(event, imagePopup) });

  return newCard;
};

function renderCard(card) {
  elementsContainer.prepend(addCard(card));
};

function addCardSubmitHandler(event) {
  event.preventDefault();

  renderCard({
    name: cardAddPopup.querySelector('input[name="title"]').value,
    link: cardAddPopup.querySelector('input[name="image-link"]').value,
  });

  cardAddPopupForm.reset();

  closePopup(cardAddPopup);
}

initialCards.reverse().forEach(card => renderCard(card));

cardAddPopupOpenButton.addEventListener('click', event => { openPopup(event, cardAddPopup) });
cardAddPopupCloseButton.addEventListener('click', () => { closePopup(cardAddPopup) });
cardAddPopupForm.addEventListener('submit', addCardSubmitHandler);
