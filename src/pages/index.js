import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Popup from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { validationSettings, initialCards } from "../utils/constants.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

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

const userInfo = new UserInfo({
  nameSelector: "#profile__title",
  jobSelector: "#profile__description",
});

const section = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
);

const imagePopup = new PopupWithImage("#preview-modal");

const profileEditPopup = new PopupWithForm(
  "#profile__edit-modal",
  handleProfileFormSubmit
);

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);

section.renderItems();
profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();
editFormValidator.enableValidation();
addFormValidator.enableValidation();
imagePopup.setEventListeners();

function handleImageClick(data) {
  imagePopup.open(data);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const element = card.getView();
  return element;
}

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo({
    name: data["edit-profile"],
    job: data["profile-description"],
  });
  profileEditPopup.close();
}

function handleAddCardFormSubmit(data) {
  const newCardElement = createCard({ name: data.title, link: data.url });
  section.addItem(newCardElement);
  addCardFormElement.reset();
  addFormValidator.disableButton();
  addCardPopup.close();
}

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.job;
  editFormValidator.resetValidation();
  profileEditPopup.open();
});

newCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
