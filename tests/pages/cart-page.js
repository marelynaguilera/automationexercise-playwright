const { expect } = require("@playwright/test");

exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;
    this.proceedToCheckoutBtn = page.locator(`a:text("Proceed To Checkout")`);
  }

  async getProductLinkAtCart(productName) {
    return this.page.locator(`.cart_description h4 a:text("${productName}")`);
  }
};
