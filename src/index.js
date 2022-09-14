import './pages/index.css';

import { elementsContainer, cardAddPopup, cardAddPopupOpenButton,
  cardAddPopupForm, newCardImageInput, newCardTitleInput, profileEditButton,
  profileEditPopup, profileEditPopupForm, nameInput, descriptionInput, profileName, profileDescription,
  popupsList, validateSettings, profileAvatar, profileAvatarOverlay, avatarEditPopup,
  avatarEditForm, cardSaveButton, avatarSaveButton, avatarLinkInput } from './components/utils';
import { addCard } from './components/card';
import { openPopup, closePopup} from './components/modal';
import { enableValidation, resetFormState } from './components/validate';
import { getProfileInfo, getCards, patchProfileInput, sendCard, removeCardFromServer, toggleLike, changeAvatar } from './components/api.js';

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

function renderPage(){
  Promise.all([getProfileInfo(), getCards()])
    .then(([userData, cards]) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileAvatar.src = userData.avatar;

      cards.reverse().forEach(card => renderCard(card, userData));
    })
    .catch(err => {
      console.log(err);
    });
};

export function deleteCard(cardId){
  removeCardFromServer(cardId)
    .then(() => renderPage())
    .catch((err) => console.log(err));
};

function addCardSubmitHandler(event) {
  event.preventDefault();
  cardSaveButton.textContent = 'Сохранение...';

  sendCard(newCardTitleInput.value, newCardImageInput.value)
    .then(() => {
      cardAddPopupForm.reset();
      closePopup(cardAddPopup);
      renderPage();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      cardSaveButton.textContent = 'Сохранить';
    });
};

function editProfileSubmitHandler(event) {
  event.preventDefault();

  const saveButton = profileEditPopup.querySelector('.popup__button-save');
  saveButton.textContent = 'Сохранение...';

  patchProfileInput(nameInput.value, descriptionInput.value)
    .then(() => {
      closePopup(profileEditPopup);
      renderPage();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      saveButton.textContent = 'Сохранить';
    });
};

function changeAvatarSubmitHadler(event) {
  event.preventDefault();

  avatarSaveButton.textContent = 'Сохранение...';

  changeAvatar(avatarLinkInput.value)
    .then(() => {
      closePopup(avatarEditPopup);
      avatarEditForm.reset();
      renderPage();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      avatarSaveButton.textContent = 'Сохранить';
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
            card.likes = freshedCard.likes;
          })
          .catch((err) => console.log(err))
      } else {
        toggleLike(card._id, 'PUT')
          .then(freshedCard => {
            likeButton.classList.add('element__button-like_active');
            countLikes.textContent = freshedCard.likes.length;
            card.likes = freshedCard.likes;
          })
          .catch((err) => console.log(err))
      }
    })
    .catch((err) => console.log(err));
};

renderPage();
enableValidation(validateSettings);


cardAddPopupOpenButton.addEventListener('click', event => { openComplexPopup(event, cardAddPopup) });
cardAddPopupForm.addEventListener('submit', addCardSubmitHandler);

profileEditButton.addEventListener('click', event => { openProfileEditPopup(event, profileEditPopup) });
profileEditPopupForm.addEventListener('submit', editProfileSubmitHandler);

profileAvatar.addEventListener('mouseover', () => profileAvatarOverlay.classList.add('profile__avatar-overlay_visible'));
profileAvatarOverlay.addEventListener('mouseleave', () => profileAvatarOverlay.classList.remove('profile__avatar-overlay_visible'));
profileAvatarOverlay.addEventListener('click', event => openComplexPopup(event, avatarEditPopup));
avatarEditForm.addEventListener('submit', changeAvatarSubmitHadler);

popupsList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__button-close')) {
        closePopup(popup)
      }
  })
});
