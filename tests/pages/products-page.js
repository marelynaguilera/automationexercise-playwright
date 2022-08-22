const { expect } = require("@playwright/test");

exports.ProductsPage = class ProductsPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator("#search_product");
    this.searchButton = page.locator("#submit_search");
  }

  async goto() {
    await this.page.goto("/products");
  }

  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async addProductToCart() {
    await this.page.hover(`a:text("Add to cart")`);
    const addToCartLink = await this.page.waitForSelector(
      `.product-overlay .overlay-content a`,
      {
        timeout: 6000,
      }
    );
    await addToCartLink.click();

    await this.page.waitForSelector(
      `.modal-body p:text("Your product has been added to cart.")`,
      {
        timeout: 6000,
      }
    );
    const successMessageLabel = this.page.locator(
      `.modal-body p:text("Your product has been added to cart.")`
    );

    await expect(successMessageLabel).toHaveCount(1);

    await this.page.waitForSelector(`.modal-body p a:has-text("View Cart")`, {
      timeout: 6000,
    });
    const viewCartLink = this.page.locator(
      `.modal-body p a:has-text("View Cart")`
    );
    await viewCartLink.click();
  }
};
