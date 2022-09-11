const showInputError = (formElement, inputElement, errorMessage, validateSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validateSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validateSettings.errorClass);
};

const hideInputError = (formElement, inputElement, validateSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validateSettings.inputErrorClass);
  errorElement.classList.remove(validateSettings.errorClass);
  errorElement.textContent = '';
};

export const checkInputValidity = (formElement, inputElement, validateSettings) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validateSettings);
  } else {
    hideInputError(formElement, inputElement, validateSettings);
  }
};

const hasInvalidInput = inputList => {
  return inputList.some( inputElement => {
    return !inputElement.validity.valid
  });
};

export const toggleButtonState = (inputList, buttonElement, validateSettings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validateSettings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validateSettings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, validateSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(validateSettings.inputSelector));
  const buttonElement = formElement.querySelector(validateSettings.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validateSettings);
      toggleButtonState(inputList, buttonElement, validateSettings);
    });
  });
  toggleButtonState(inputList, buttonElement, validateSettings);
};

export const enableValidation = (validateSettings) => {
  const formList = Array.from(document.querySelectorAll(validateSettings.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, validateSettings);
  });
};
