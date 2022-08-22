const { expect } = require("@playwright/test");

exports.CommonsPage = class CommonsPage {
  constructor(page) {
    this.page = page;
  }
};
