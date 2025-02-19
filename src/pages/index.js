import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Popup from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { validationSettings, initialCards } from "../utils/constants..js";

const cardListElement = document.querySelector(".cards__list");
const imagePreviewModal = document.querySelector("#preview-modal");
const profileEditButton = document.querySelector("#profile__edit-button");
const profileTitle = document.querySelector("#profile__title");
const profileDescription = document.querySelector("#profile__description");
const profileTitleInput = document.querySelector("#profile__title__input");
const profileDescriptionInput = document.querySelector(
  "#profile__description__input"
);
const newCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = document.querySelector("#add-card-form");
const profileEditModal = document.querySelector("#profile__edit-modal");
const profileEditForm = profileEditModal.querySelector("#edit-profile-form");

function handleImageClick(data) {
  const imagePopup = new PopupWithImage("#preview-modal");
  imagePopup.open(data);
  imagePopup.setEventListeners();
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardListElement.appendChild(cardElement);
});

const handleProfileFormSubmit = (data) => {
  console.log("Form data:", data);
  profileTitle.textContent = data["edit-profile"];
  profileDescription.textContent = data["profile-description"];
  profileEditPopup.close();
};

const profileEditPopup = new PopupWithForm(
  "#profile__edit-modal",
  handleProfileFormSubmit
);
profileEditPopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent.trim();
  profileEditPopup.open();
});

const handleAddCardFormSubmit = (data) => {
  const newCardElement = createCard({ name: data.title, link: data.url });
  cardListElement.prepend(newCardElement);
  addCardPopup.close();
};

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

newCardButton.addEventListener("click", () => addCardPopup.open());

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

/*
const profileEditCloseButton = profileEditModal.querySelector(
  "#modal__close-button"
);

const cardTitleInput = document.querySelector("#add-card-title-input");
const cardUrlInput = document.querySelector("#add-card-url-input");

const addCardCloseButton = addCardModal.querySelector(".modal__close");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardImage = document.querySelector(".card__image");

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

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);*/
