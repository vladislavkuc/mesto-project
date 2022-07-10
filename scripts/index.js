const profileContainer = document.querySelector('.profile');
const profileEditButton = profileContainer.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const profileEditPopupCloseButton = profileEditPopup.querySelector('.popup__button-close');
const profileEditPopupSaveButton = profileEditPopup.querySelector('.popup__button-save');

const nameInput = profileEditPopup.querySelector('input[name="name"]');
const descriptionInput = profileEditPopup.querySelector('input[name="description"]');
const profileName = profileContainer.querySelector('.profile__name');
const profileDescription = profileContainer.querySelector('.profile__description');

function openProfileEditPopup(event) {
  event.preventDefault();
  profileEditPopup.classList.add('popup_opened');

  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
};

function closeProfileEditPopup(event) {
  event.preventDefault();
  profileEditPopup.classList.remove('popup_opened');
};

function editProfileSubmitHandler(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeProfileEditPopup(event);
}

profileEditButton.addEventListener('click', openProfileEditPopup);
profileEditPopupCloseButton.addEventListener('click', closeProfileEditPopup);
profileEditPopupSaveButton.addEventListener('click', editProfileSubmitHandler);

const imagePopup = document.querySelector('.popup_type_show-image');
const imagePopupDescription = imagePopup.querySelector('.popup__description');
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const imagePopupCloseButton = imagePopup.querySelector('.popup__button-close');

function openImage(event) {
  imagePopup.classList.add('popup_opened');

  imagePopupDescription.textContent = event.target.parentElement.querySelector('.element__title').textContent;
  imagePopupPicture.src = event.target.parentElement.querySelector('.element__image').style.backgroundImage.slice(5,-2);
};

function closeImage() {
  imagePopup.classList.remove('popup_opened');
};

imagePopupCloseButton.addEventListener('click', closeImage);

const elementCard = document.querySelector('#element').content;
const elementsContainer = document.querySelector('.elements');

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
  elementImage.addEventListener('click', openImage);

  elementsContainer.prepend(newCard);
};

initialCards.reverse().forEach(card => addCard(card));

const addCardPopup = document.querySelector('.popup_type_add-card');
const openAddCardPopupButton = profileContainer.querySelector('.profile__add-button');
const addCardPopupCloseButton = addCardPopup.querySelector('.popup__button-close');
const addCardPopupSaveButton = addCardPopup.querySelector('.popup__button-save');

function openAddCardPopup(event) {
  event.preventDefault();
  addCardPopup.classList.add('popup_opened');
};

function closeAddCardPopup(event) {
  event.preventDefault();
  addCardPopup.classList.remove('popup_opened');
};

function addCardSubmitHandler(event) {
  event.preventDefault();

  addCard({
    name: addCardPopup.querySelector('input[name="title"]').value,
    link: addCardPopup.querySelector('input[name="image-link"]').value,
  });

  closeAddCardPopup(event);
}

addCardPopupCloseButton.addEventListener('click', closeAddCardPopup);
addCardPopupSaveButton.addEventListener('click', addCardSubmitHandler);
openAddCardPopupButton.addEventListener('click', openAddCardPopup);
