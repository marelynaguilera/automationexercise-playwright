const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator("[data-qa=login-email]");
    this.passwordInput = page.locator("[data-qa=login-password]");
    this.LoginBtn = page.locator("[data-qa=login-button]");
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.LoginBtn.click();
  }
};
