export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    items.reverse().forEach((item) => {
      const cardElement = this._renderer(item);
      this._container.prepend(cardElement);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }

  removeItem(cardId) {
    const cardElement = this._container.querySelector(
      `.card[data-id="${cardId}"]`
    );
    if (cardElement) {
      cardElement.remove();
    }
  }
}
