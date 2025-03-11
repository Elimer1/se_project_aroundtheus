import Popup from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._data = null;
  }

  open(data) {
    super.open(data);
    this._data = data;
    console.log("Opening confirm popup with data:", data);
    const confirmButton = this._popupElement.querySelector(
      ".modal__confirm-button"
    );
    if (confirmButton) {
      confirmButton.removeEventListener("click", this._handleConfirmBound);
      this._handleConfirmBound = () => {
        if (this._data && this._data.cardId) {
          this._handleConfirm(this._data);
        } else {
          console.error("No cardId in popup data:", this._data);
        }
      };
      confirmButton.addEventListener("click", this._handleConfirmBound);
    }
  }
  close() {
    super.close();
    this._data = null;
  }
}
