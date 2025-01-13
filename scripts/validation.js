// enabling validation by calling enableValidation()
// pass all the settings on call
function showInputError(formElement, inputElement, options) {
  const errorMessageEl = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  errorMessageEl.textContent = inputElement.validationMessage;
  errorMessageEl.classList.add(options.errorClass);
}

function hideInputError(formElement, inputElement, options) {
  const errorMessageEl = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(options.errorClass);
}

function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    return showInputError(formElement, inputElement, options);
  }
  hideInputError(formElement, inputElement, options);
}

function hasValidInput(inputList) {
  return inputList.every((inputElement) => inputElement.validity.valid);
}

//disable button add classes
//enable button remove classes

function toggleButtonState(inputElements, submitButton, options) {
  if (!hasValidInput(inputElements)) {
    submitButton.classList.add(options.inactiveButtonClass);
    submitButton.disabled = true;
    return;
  }
  submitButton.classList.remove(options.inactiveButtonClass);
  submitButton.disabled = false;
}

function setEventListeners(formElement, options) {
  const { inputSelector } = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(options.submitButtonSelector);
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formElement, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
