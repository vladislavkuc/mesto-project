export const initialCards = [
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
const newCardTitleInput = cardAddPopup.querySelector('input[name="title"]');
const newCardImageInput = cardAddPopup.querySelector('input[name="image-link"]');

const profileContainer = document.querySelector('.profile');
const profileEditButton = profileContainer.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const profileEditPopupCloseButton = profileEditPopup.querySelector('.popup__button-close');
const profileEditPopupForm = profileEditPopup.querySelector('form[name="profile-edit-form"');

const nameInput = profileEditPopup.querySelector('input[name="name"]');
const descriptionInput = profileEditPopup.querySelector('input[name="description"]');
const profileName = profileContainer.querySelector('.profile__name');
const profileDescription = profileContainer.querySelector('.profile__description');

const imagePopup = document.querySelector('.popup_type_show-image');
const imagePopupDescription = imagePopup.querySelector('.popup__description');
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const imagePopupCloseButton = imagePopup.querySelector('.popup__button-close');

const popupsList = Array.from(document.querySelectorAll('.popup'));

export {
  elementCard, elementsContainer, cardAddPopup, cardAddPopupOpenButton, cardAddPopupCloseButton,
  cardAddPopupForm, newCardImageInput, newCardTitleInput, profileContainer, profileEditButton, profileEditPopup,
  profileEditPopupCloseButton, profileEditPopupForm, nameInput, descriptionInput, profileName, profileDescription,
  imagePopup, imagePopupDescription, imagePopupCloseButton, imagePopupPicture, popupsList,
}
