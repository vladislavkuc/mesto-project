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

const elementCard = document.querySelector('#element').content;
const elementsContainer = document.querySelector('.elements');

const cardAddPopup = document.querySelector('.popup_type_add-card');
const cardAddPopupOpenButton = profileContainer.querySelector('.profile__add-button');
const cardAddPopupCloseButton = cardAddPopup.querySelector('.popup__button-close');
const cardAddPopupForm = cardAddPopup.querySelector('form[name="card-add-form"]');

function openPopup(event, popup) {
  popup.classList.add('popup_opened');

  if (popup === profileEditPopup){
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
  } else if (popup === imagePopup) {
    imagePopupDescription.textContent = event.target.parentElement.querySelector('.element__title').textContent;
    imagePopupPicture.src = event.target.parentElement.querySelector('.element__image').style.backgroundImage.slice(5,-2);
  }
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

function editProfileSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopup(profileEditPopup);
}

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
imagePopupCloseButton.addEventListener('click', () => { closePopup(imagePopup) });

profileEditButton.addEventListener('click', event => { openPopup(event, profileEditPopup) });
profileEditPopupCloseButton.addEventListener('click', () => { closePopup(profileEditPopup) });
profileEditPopupForm.addEventListener('submit', editProfileSubmitHandler);

cardAddPopupOpenButton.addEventListener('click', event => { openPopup(event, cardAddPopup) });
cardAddPopupCloseButton.addEventListener('click', () => { closePopup(cardAddPopup) });
cardAddPopupForm.addEventListener('submit', addCardSubmitHandler);
