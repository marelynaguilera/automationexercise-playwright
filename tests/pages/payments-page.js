const { expect } = require("@playwright/test");

exports.PaymentPage = class PaymentPage {
  constructor(page) {
    this.page = page;
    this.nameOnCardInput = page.locator(`//input[@data-qa="name-on-card"]`);
    this.cardNumberInput = page.locator(`//input[@data-qa="card-number"]`);
    this.cvcInput = page.locator(`//input[@data-qa="cvc"]`);
    this.expiryMonthInput = page.locator(`//input[@data-qa="expiry-month"]`);
    this.expiryYearInput = page.locator(`//input[@data-qa="expiry-year"]`);
    this.payAndConfirmButton = page.locator(`#submit`);
    this.orderPlacedLabel = page.locator(`//h2[@data-qa="order-placed"]`);
    this.downloadInvoiceButton = page.locator(`a:text("Download Invoice")`);
  }

  async fillPaymentForm(clientName, cardNumber, cvc, expiryMonth, expiryYear) {
    await this.nameOnCardInput.fill(clientName);
    await this.cardNumberInput.fill(cardNumber);
    await this.cvcInput.fill(cvc);
    await this.expiryMonthInput.fill(expiryMonth);
    await this.expiryYearInput.fill(expiryYear);
    await this.payAndConfirmButton.click();
  }
};
