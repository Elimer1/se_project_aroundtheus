import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Popup from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirm } from "../components/PopupWithConfirm.js";
import { validationSettings, initialCards } from "../utils/constants.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

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
const avatarEditButton = document.querySelector("#profile__avatar-edit-button");
const avatarEditModal = document.querySelector("#avatar-edit-modal");
const avatarEditForm = avatarEditModal.querySelector("#edit-avatar-form");
const avatarInput = avatarEditModal.querySelector("#avatar-url-input");
const avatarSubmitButton = avatarEditModal.querySelector(".modal__save-button");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a377535a-f758-4013-af9f-9258c75c779b",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: "#profile__title",
  aboutSelector: "#profile__description",
  avatarSelector: ".profile__image",
});

const avatarFormValidator = new FormValidator(
  validationSettings,
  avatarEditForm
);

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);

function handleDeleteClick(cardId) {
  if (!cardId || typeof cardId !== "string") {
    console.error("Invalid cardId for deletion:", cardId);
    return;
  }
  deleteCardPopup.open({ cardId: cardId });
}

function handleImageClick(data) {
  imagePopup.open(data);
}

function createCard(cardData) {
  const sanitizedLink =
    cardData.link.replace(/["'\s]+$/, "").trim() ||
    "https://placehold.co/150x150";
  const card = new Card(
    {
      name: cardData.name,
      link: sanitizedLink,
      _id: cardData._id || null,
    },
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  );

  const element = card.getView();
  if (!cardData._id) {
    console.warn("Card created with no _id, deletion might fail:", cardData);
  } else {
    const initialIsLiked =
      cardData.isLiked !== undefined ? cardData.isLiked : false;
    likeStatuses.set(cardData._id, initialIsLiked);
    const likeButton = element.querySelector(".card__like-button");
    if (likeButton) {
      likeButton.classList.toggle("card__like-button_active", initialIsLiked);
    }
  }
  return element;
}

function handleProfileFormSubmit(data) {
  const saveButton = profileEditForm.querySelector(".modal__save-button");
  saveButton.textContent = "Saving...";
  saveButton.classList.add("loading");
  saveButton.disabled = true;
  api
    .updateUserInfo(data["edit-profile"], data["profile-description"])
    .then((updatedInfo) => {
      userInfo.setUserInfo({
        name: updatedInfo.name,
        about: updatedInfo.about,
        avatar: updatedInfo.avatar,
      });
      profileEditPopup.close();
    })
    .catch((err) => {
      console.error("Error updating user info:", err);
    })
    .finally(() => {
      saveButton.textContent = "Save";
      saveButton.classList.remove("loading");
      saveButton.disabled = false;
    });
}

function handleAddCardFormSubmit(data) {
  const sanitizedUrl = data.url.replace(/["'\s]+$/, "").trim();
  const saveButton = addCardFormElement.querySelector(".modal__save-button");
  saveButton.textContent = "Saving...";
  saveButton.classList.add("loading");
  saveButton.disabled = true;
  api
    .addCard(data.title, sanitizedUrl)
    .then((newCardInfo) => {
      const newCardElement = createCard({
        name: newCardInfo.name,
        link: newCardInfo.link,
        _id: newCardInfo._id,
      });
      section.addItem(newCardElement);
      addCardFormElement.reset();
      addFormValidator.resetValidation();
      addCardPopup.close();
    })
    .catch((err) => {
      console.error("Error adding new card:", err);
    })
    .finally(() => {
      saveButton.textContent = "Save";
      saveButton.classList.remove("loading");
      saveButton.disabled = false;
      addCardPopup.close();
    });
}

function handleDeleteConfirm(data) {
  const cardId = data.cardId;
  if (!cardId || typeof cardId !== "string") {
    console.error(
      "Invalid cardId in handleDeleteConfirm:",
      cardId,
      "Data:",
      data
    );
    deleteCardPopup.close();
    return;
  }
  api
    .deleteCard(cardId)
    .then(() => {
      section.removeItem(cardId);
      deleteCardPopup.close();
    })
    .catch((err) => {
      console.error("Error deleting card:", err);
      deleteCardPopup.close();
    });
}

const likeStatuses = new Map();

function handleLikeClick(cardId) {
  const currentIsLiked = likeStatuses.get(cardId) || false;
  api
    .toggleLike(cardId, currentIsLiked)
    .then((updatedCard) => {
      likeStatuses.set(cardId, updatedCard.isLiked);
      const cardElement = document.querySelector(`.card[data-id="${cardId}"]`);
      if (cardElement) {
        const likeButton = cardElement.querySelector(".card__like-button");
        if (likeButton) {
          likeButton.classList.toggle(
            "card__like-button_active",
            updatedCard.isLiked
          );
        }
      }
    })
    .catch((err) => {
      console.error("Error toggling like:", err);
    });
}

function handleAvatarFormSubmit(data) {
  avatarSubmitButton.textContent = "Saving...";
  avatarSubmitButton.classList.add("loading");
  avatarSubmitButton.disabled = true;
  api
    .updateUserAvatar(data.avatar)
    .then((updatedInfo) => {
      userInfo.setUserInfo({
        name: updatedInfo.name,
        about: updatedInfo.about,
        avatar: updatedInfo.avatar,
      });
      avatarEditPopup.close();
    })
    .catch((err) => {
      console.error("Error updating avatar", err);
    })
    .finally(() => {
      avatarSubmitButton.textContent = "Save";
      avatarSubmitButton.classList.remove("loading");
      avatarSubmitButton.disabled = false;
    });
}

avatarEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  avatarInput.value = currentUserInfo.avatar || "";
  avatarEditPopup.open();
  avatarFormValidator.resetValidation();
  avatarFormValidator.toggleButtonState();
});

const imagePopup = new PopupWithImage("#preview-modal");

const profileEditPopup = new PopupWithForm(
  "#profile__edit-modal",
  handleProfileFormSubmit
);

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);

const deleteCardPopup = new PopupWithConfirm(
  "#confirm__delete-modal",
  handleDeleteConfirm
);

const avatarEditPopup = new PopupWithForm(
  "#avatar-edit-modal",
  handleAvatarFormSubmit
);

const section = new Section(
  { items: [], renderer: (cardData) => createCard(cardData) },
  ".cards__list"
);

api
  .getInitialCards()
  .then((cards) => {
    section.renderItems(cards);
  })
  .catch((err) => {
    console.error("Error fetching cards:", err);
  });

api
  .getUserInfo()
  .then((info) => {
    userInfo.setUserInfo({
      name: info.name,
      about: info.about,
      avatar: info.avatar,
    });
  })
  .catch((err) => {
    console.error("Error fetching user info:", err);
  });

avatarEditPopup.setEventListeners();
profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();
deleteCardPopup.setEventListeners();
editFormValidator.enableValidation();
addFormValidator.enableValidation();
imagePopup.setEventListeners();
avatarFormValidator.enableValidation();

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.about;
  editFormValidator.resetValidation();
  profileEditPopup.open();
});

newCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
