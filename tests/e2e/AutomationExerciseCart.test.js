const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/login-page");
const { HomePage } = require("../pages/home-page");
const { ProductsPage } = require("../pages/products-page");
const { CommonsPage } = require("../pages/commons-page");
const { CartPage } = require("../pages/cart-page");
const { CheckoutPage } = require("../pages/checkout-page");
const { PaymentPage } = require("../pages/payments-page");

const userInfo = require("../../utils/data/user-data.json");

let productName;
let username;
let password;

test("Buy a Sleeveless Dress successfully", async ({ page }) => {
  username = userInfo.username;
  password = userInfo.password;
  productName = "Sleeveless Dress";
  const firstName = username;
  const lastName = password;

  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);
  const commonsPage = new CommonsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const paymentPage = new PaymentPage(page);

  await loginPage.goto();
  await loginPage.login(username, password);
  await page.waitForLoadState("networkidle");

  await expect(page).toHaveTitle("Automation Exercise");

  await productsPage.goto();
  await productsPage.searchProduct(productName);
  await productsPage.addProductToCart();

  await expect(await cartPage.getProductLinkAtCart(productName)).toHaveCount(1);
  await cartPage.proceedToCheckoutBtn.click();

  await expect(page).toHaveTitle("Automation Exercise - Checkout");
  await expect(checkoutPage.addressDetailsLabel).toHaveText("Address Details");
  await expect(checkoutPage.reviewYourOrderLabel).toHaveText(
    "Review Your Order"
  );
  await expect(
    await checkoutPage.getProductLinkAtCheckout(productName)
  ).toHaveCount(1);
  await checkoutPage.placeOrderBtn.click();

  await paymentPage.fillPaymentForm(
    userInfo.clientName,
    userInfo.cardNumber,
    userInfo.cardCvc,
    userInfo.cardExpiryMonth,
    userInfo.cardExpiryYear
  );

  await expect(await paymentPage.orderPlacedLabel).toHaveText("Order Placed!");

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    paymentPage.downloadInvoiceButton.click(),
  ]);
  console.log(await download.path());
  await download.saveAs(`invoice.txt`);
});
