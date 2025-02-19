import Popup from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(".modal__image");
    this._captionElement = this._popupElement.querySelector(".modal__caption");
  }

  open(data) {
    this._imageElement.alt = data.name;
    this._imageElement.src = data.link;
    this._captionElement.textContent = data.name;
    super.open();
  }
}
