import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

function handleImageClick(data) {
  modalImage.src = data.link;
  modalImage.alt = data.name;
  modalCaption.textContent = data.name;
  openModal(imagePreviewModal);
}

const cardListElement = document.querySelector(".cards__list");

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile__edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(
  "#modal__close-button"
);

const profileTitle = document.querySelector("#profile__title");
const profileDescription = document.querySelector("#profile__description");
const profileTitleInput = document.querySelector("#profile__title__input");
const profileDescriptionInput = document.querySelector(
  "#profile__description__input"
);

const cardTitleInput = document.querySelector("#add-card-title-input");
const cardUrlInput = document.querySelector("#add-card-url-input");

const newCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = addCardModal.querySelector(".modal__close");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const addCardFormElement = document.querySelector("#add-card-form");
const profileEditForm = profileEditModal.querySelector("#edit-profile-form");
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

const cardImage = document.querySelector(".card__image");
const imagePreviewModal = document.querySelector("#preview-modal");
const modalImage = imagePreviewModal.querySelector(".modal__image");
const modalImageCloseButton = imagePreviewModal.querySelector(".modal__close");
const modalCaption = imagePreviewModal.querySelector(".modal__caption");
const closeButtons = document.querySelectorAll(".modal__close");
const modals = document.querySelectorAll(".modal");

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("click", closeByClickOutside);
  document.addEventListener("keydown", closeByEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("click", closeByClickOutside);
  document.removeEventListener("keydown", closeByEscape);
}

function closeByClickOutside(e) {
  modals.forEach((modal) => {
    if (e.target === modal && modal.classList.contains("modal_opened")) {
      closeModal(modal);
    }
  });
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const newCardElement = createCard({ name, link });
  cardListElement.prepend(newCardElement);
  closeModal(addCardModal);
  addCardFormElement.reset();
  addFormValidator.updateButtonState();
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

newCardButton.addEventListener("click", () => openModal(addCardModal));

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardListElement.appendChild(cardElement);
});
