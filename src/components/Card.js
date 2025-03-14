export default class Card {
  #selectors = {
    card: ".card",
    image: ".card__image",
    title: ".card__title",
    likeButton: ".card__like-button",
    deleteButton: ".card__delete-button",
    likeButtonActive: "card__like-button_active",
  };

  constructor(
    { name, link, _id = null, isLiked = false },
    cardSelector,
    api,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._api = api;
    this._isLiked = isLiked;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

    this._cardElement = this._getTemplate();
    this._cardImageElement = this._cardElement.querySelector(
      this.#selectors.image
    );
    this._cardTitleElement = this._cardElement.querySelector(
      this.#selectors.title
    );
    this._likeButton = this._cardElement.querySelector(
      this.#selectors.likeButton
    );
    this._deleteButton = this._cardElement.querySelector(
      this.#selectors.deleteButton
    );

    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardTitleElement.textContent = this._name;
    this._cardElement.dataset.id = this._id;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener("click", () => {
      const dataId = this._cardElement?.dataset.id;
      if (!dataId || typeof dataId !== "string") {
        return;
      }
      this._handleDeleteClick(dataId);
    });

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _updateLikeButton() {
    this._likeButton.classList.toggle(
      this.#selectors.likeButtonActive,
      this._isLiked
    );
  }

  setLikeState(isLiked) {
    this._isLiked = isLiked;
    this._updateLikeButton();
  }

  getLikeState() {
    return this._isLiked;
  }

  toggleLike() {
    const newLikeState = !this._isLiked;
    this.setLikeState(newLikeState);
  }

  getView() {
    this._updateLikeButton();
    this._setEventListeners();
    return this._cardElement;
  }

  _updateLikesView() {
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._isLiked;
  }

  updateLikesView() {
    this._likeButton.classList.toggle("card__like-button_active");
  }
}
