const elementCard = document.querySelector('#element').content;
const elementsContainer = document.querySelector('.elements');

const cardAddPopup = document.querySelector('.popup_type_add-card');
const cardAddPopupOpenButton = document.querySelector('.profile__add-button');
const cardAddPopupForm = cardAddPopup.querySelector('form[name="card-add-form"]');
const newCardTitleInput = cardAddPopup.querySelector('input[name="title"]');
const newCardImageInput = cardAddPopup.querySelector('input[name="image-link"]');
const cardSaveButton = cardAddPopup.querySelector('.popup__button-save');

const profileContainer = document.querySelector('.profile');
const profileEditButton = profileContainer.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const profileEditPopupForm = profileEditPopup.querySelector('form[name="profile-edit-form"');

const nameInput = profileEditPopup.querySelector('input[name="name"]');
const descriptionInput = profileEditPopup.querySelector('input[name="description"]');
const profileName = profileContainer.querySelector('.profile__name');
const profileDescription = profileContainer.querySelector('.profile__description');
const profileAvatar = profileContainer.querySelector('.profile__avatar');
const profileAvatarOverlay = profileContainer.querySelector('.profile__avatar-overlay');

const avatarEditPopup = document.querySelector('.popup_type_change-avatar');
const avatarEditForm = avatarEditPopup.querySelector('.popup__form');
const avatarSaveButton = avatarEditPopup.querySelector('.popup__button-save');
const avatarLinkInput = avatarEditForm.querySelector('.popup__text-input');

const imagePopup = document.querySelector('.popup_type_show-image');
const imagePopupDescription = imagePopup.querySelector('.popup__description');
const imagePopupPicture = imagePopup.querySelector('.popup__image');

const popupsList = Array.from(document.querySelectorAll('.popup'));
const validateSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__text-input_type_error',
  errorClass: 'popup__error_visible'
}

export {
  elementCard, elementsContainer, cardAddPopup, cardAddPopupOpenButton,
  cardAddPopupForm, newCardImageInput, newCardTitleInput, profileContainer, profileEditButton, profileEditPopup,
  profileEditPopupForm, nameInput, descriptionInput, profileName, profileDescription,
  profileAvatar, imagePopup, imagePopupDescription, imagePopupPicture, popupsList, validateSettings,
  profileAvatarOverlay, avatarEditPopup, avatarEditForm, cardSaveButton, avatarSaveButton, avatarLinkInput,
}
