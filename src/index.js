import './pages/index.css';

import { elementsContainer, cardAddPopup, cardAddPopupOpenButton, cardAddPopupCloseButton,
  cardAddPopupForm, newCardImageInput, newCardTitleInput, profileEditButton, profileEditPopup,
  profileEditPopupCloseButton, profileEditPopupForm, nameInput, descriptionInput, profileName, profileDescription,
  imagePopup, imagePopupCloseButton, popupsList, validateSettings, profileAvatar, profileAvatarOverlay, avatarEditPopup,
  avatarEditForm, } from './components/utils';
import { addCard } from './components/card';
import { openPopup, closePopup, closePopupByOverlay } from './components/modal';
import { enableValidation, resetFormState } from './components/validate';
import { getProfileInfo, getCards, patchProfileInput, sendCard, removeCardFromServer, toggleLike, changeAvatar } from './components/api.js';

function renderProfile(){
  getProfileInfo()
    .then(data => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      profileAvatar.src = data.avatar;
    })
    .catch((err) => console.log(err));
};

function openComplexPopup(event, popup){
  resetFormState(popup, validateSettings, false);
  openPopup(event, popup);
};

function openProfileEditPopup(event, popup){
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  openComplexPopup(event, popup);
};

function renderCard(card, userId) {
  elementsContainer.prepend(addCard(card, userId));
};

function renderCards(){
  getProfileInfo()
    .then(profile => {
      getCards()
      .then(cards => {
        cards.reverse().forEach(card => renderCard(card, profile));
      })
      .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

export function deleteCard(cardId){
  removeCardFromServer(cardId)
    .then(() => renderCards())
    .catch((err) => console.log(err));
};

function addCardSubmitHandler(event) {
  event.preventDefault();
  const saveButton = cardAddPopup.querySelector('.popup__button-save');
  saveButton.textContent = 'Сохранение...';

  sendCard(newCardTitleInput.value, newCardImageInput.value)
    .then(() => renderCards())
    .catch((err) => console.log(err))
    .finally(() => {
      cardAddPopupForm.reset();
      closePopup(cardAddPopup);
      saveButton.textContent = 'Сохранить';
    });
};

function editProfileSubmitHandler(event) {
  event.preventDefault();

  const saveButton = profileEditPopup.querySelector('.popup__button-save');
  saveButton.textContent = 'Сохранение...';

  patchProfileInput(nameInput.value, descriptionInput.value)
    .then(() => renderProfile())
    .catch((err) => console.log(err))
    .finally(() => {
      closePopup(profileEditPopup);
      saveButton.textContent = 'Сохранить';
    });
};

function changeAvatarSubmitHadler(event) {
  event.preventDefault();

  const saveButton = avatarEditPopup.querySelector('.popup__button-save');
  saveButton.textContent = 'Сохранение...';

  changeAvatar(avatarEditForm.querySelector('.popup__text-input').value)
    .then(() => renderProfile())
    .catch((err) => console.log(err))
    .finally(() => {
      closePopup(avatarEditPopup);
      avatarEditForm.reset();
      saveButton.textContent = 'Сохранить';
    });
};

export function pressLikeHandler(evt, card){
  const likeButton = evt.target;
  const countLikes = likeButton.parentNode.querySelector('.element__likes-count');

  getProfileInfo()
    .then(profile => {
      if (card.likes.map(like => JSON.stringify(like)).includes(JSON.stringify(profile))){
        toggleLike(card._id, 'DELETE')
          .then(freshedCard => {
            likeButton.classList.remove('element__button-like_active');
            countLikes.textContent = freshedCard.likes.length;
            likeButton.addEventListener('click', evt => { pressLikeHandler(evt, freshedCard) }, {once : true});
          })
          .catch((err) => console.log(err))
      } else {
        toggleLike(card._id, 'PUT')
          .then(freshedCard => {
            likeButton.classList.add('element__button-like_active');
            countLikes.textContent = freshedCard.likes.length;
            likeButton.addEventListener('click', evt => { pressLikeHandler(evt, freshedCard) }, {once : true});
          })
          .catch((err) => console.log(err))
      }
    })
    .catch((err) => console.log(err));
};

renderProfile();
renderCards();
enableValidation(validateSettings);


cardAddPopupOpenButton.addEventListener('click', event => { openComplexPopup(event, cardAddPopup) });
cardAddPopupCloseButton.addEventListener('click', () => { closePopup(cardAddPopup) });
cardAddPopupForm.addEventListener('submit', addCardSubmitHandler);

imagePopupCloseButton.addEventListener('click', () => { closePopup(imagePopup) });

profileEditButton.addEventListener('click', event => { openProfileEditPopup(event, profileEditPopup) });
profileEditPopupCloseButton.addEventListener('click', () => { closePopup(profileEditPopup) });
profileEditPopupForm.addEventListener('submit', editProfileSubmitHandler);

profileAvatar.addEventListener('mouseover', () => profileAvatarOverlay.classList.add('profile__avatar-overlay_visible'));
profileAvatarOverlay.addEventListener('mouseleave', () => profileAvatarOverlay.classList.remove('profile__avatar-overlay_visible'));
profileAvatarOverlay.addEventListener('click', event => openComplexPopup(event, avatarEditPopup));
avatarEditForm.addEventListener('submit', changeAvatarSubmitHadler);
avatarEditPopup.querySelector('.popup__button-close').addEventListener('click', () => closePopup(avatarEditPopup));

popupsList.forEach(popup => popup.addEventListener('click', closePopupByOverlay));
