const { expect } = require("@playwright/test");

exports.CheckoutPage = class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.addressDetailsLabel = page
      .locator(`#cart_items .container .step-one h2`)
      .first();
    this.reviewYourOrderLabel = page
      .locator(`#cart_items .container .step-one h2`)
      .last();
    this.placeOrderBtn = page.locator(`a:text("Place Order")`);
  }

  async getProductLinkAtCheckout(productName) {
    return this.page.locator(`.cart_description h4 a:text("${productName}")`);
  }
};
