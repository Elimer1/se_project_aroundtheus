export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = document.querySelector(selector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const cardElement = this._renderer(item);
      this._selector.prepend(cardElement);
    });
  }

  addItem(element) {
    this._selector.append(element);
  }
}
