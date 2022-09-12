import './pages/index.css';

import { initialCards, elementsContainer, cardAddPopup, cardAddPopupOpenButton, cardAddPopupCloseButton,
  cardAddPopupForm, newCardImageInput, newCardTitleInput, profileEditButton, profileEditPopup,
  profileEditPopupCloseButton, profileEditPopupForm, nameInput, descriptionInput, profileName, profileDescription,
  imagePopup, imagePopupCloseButton, popupsList, validateSettings } from './components/utils';
import { addCard } from './components/card';
import { openPopup, closePopup, closePopupByOverlay } from './components/modal';
import { enableValidation, resetFormState} from './components/validate';

function openProfileEditPopup(event, popup){
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  resetFormState(popup, validateSettings, true);
  openPopup(event, popup);
};

function openAddCardPopup(event, popup){
  resetFormState(popup, validateSettings, false);
  openPopup(event, popup);
}

function renderCard(card) {
  elementsContainer.prepend(addCard(card));
};

function addCardSubmitHandler(event) {
  event.preventDefault();

  renderCard({
    name: newCardTitleInput.value,
    link: newCardImageInput.value,
  });

  cardAddPopupForm.reset();

  closePopup(cardAddPopup);
}

function editProfileSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopup(profileEditPopup);
}

enableValidation(validateSettings);

initialCards.reverse().forEach(card => renderCard(card));

cardAddPopupOpenButton.addEventListener('click', event => { openAddCardPopup(event, cardAddPopup) });
cardAddPopupCloseButton.addEventListener('click', () => { closePopup(cardAddPopup) });
cardAddPopupForm.addEventListener('submit', addCardSubmitHandler);

imagePopupCloseButton.addEventListener('click', () => { closePopup(imagePopup) });

profileEditButton.addEventListener('click', event => { openProfileEditPopup(event, profileEditPopup) });
profileEditPopupCloseButton.addEventListener('click', () => { closePopup(profileEditPopup) });
profileEditPopupForm.addEventListener('submit', editProfileSubmitHandler);

popupsList.forEach(popup => popup.addEventListener('click', closePopupByOverlay));
