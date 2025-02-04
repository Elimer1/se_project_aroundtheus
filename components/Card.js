export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    if (this._likeButton && this._deleteButton && this._cardImageElement) {
      this._likeButton.addEventListener("click", () => {
        this._handleLikeIcon();
      });

      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteCard();
      });

      this._cardImageElement.addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
    } else {
      console.error("One or more elements were not found:", {
        likeButton: this._likeButton,
        deleteButton: this._deleteButton,
        cardImageElement: this._cardImageElement,
      });
    }
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    const cardTitleElement = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    cardTitleElement.textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}
