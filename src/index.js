import './pages/index.css';

import './components/card';
import './components/modal';
import enableValidation from './components/validate';

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__text-input_type_error',
  errorClass: 'popup__error_visible'
});
