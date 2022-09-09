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

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', closePopupByEsc);
};

export function openPopup(event, popup) {
  popup.classList.add('popup_opened');

  popup.addEventListener('click', (evt) => {
    if(evt.target === popup) {
      closePopup(popup);
    }
  });

  window.addEventListener('keydown', closePopupByEsc);

  if (popup === profileEditPopup){
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
  } else if (popup === imagePopup) {
    imagePopupDescription.textContent = event.target.parentElement.querySelector('.element__title').textContent;
    imagePopupPicture.src = event.target.parentElement.querySelector('.element__image').style.backgroundImage.slice(5,-2);
  }
};

function editProfileSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopup(profileEditPopup);
}


imagePopupCloseButton.addEventListener('click', () => { closePopup(imagePopup) });

profileEditButton.addEventListener('click', event => { openPopup(event, profileEditPopup) });
profileEditPopupCloseButton.addEventListener('click', () => { closePopup(profileEditPopup) });
profileEditPopupForm.addEventListener('submit', editProfileSubmitHandler);
