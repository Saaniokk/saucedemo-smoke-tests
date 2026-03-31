import { Urls } from "../utils/urls.enum";
import { test } from "../fixtures/base.fixture";
import { expect } from "@playwright/test";
import { completeLogin } from "../steps/sharedSteps.step";
import { Messages } from "../utils/messages.enum";

test.describe("Checkout functionality checks @smoke @positive @cart", () => {
    test.beforeEach(async ({ loginPage }) => {
        await completeLogin(loginPage);
    });
    test("Valid Checkout", async ({ inventoryPage, cartPage, checkoutPage, faker }) => {
        test.info().annotations.push({ type: "TestCaseID", description: "Checkout: 001" });
        const lastName = faker.person.lastName();
        const firstName = faker.person.firstName();
        const zipCode = faker.location.zipCode();
        // Add backpack to cart and check values
        await inventoryPage.addToCartBackpack();
        const addedProductName = await inventoryPage.itemText.nth(0).innerText();
        const addedProductPrice = await inventoryPage.itemPrice.nth(0).innerText();
        await inventoryPage.getHeader().clickOnCartIcon();
        const displayedProductName = await cartPage.itemName.nth(0).innerText();
        expect(addedProductName).toEqual(displayedProductName);
        await cartPage.clickCheckoutButton();
        await expect(cartPage.checkoutForm).toBeVisible();
        await cartPage.fillInformation(firstName, lastName, zipCode);
        await cartPage.clickContinueButton();
        // Validate checkout overview page and validate attributes
        const newPageUrl = await checkoutPage.url();
        expect
            .soft(newPageUrl)
            .toEqual(Urls.CheckoutTwo);
        await expect.soft(checkoutPage.checkoutOverview).toBeVisible();
        const invoiceProductName = await checkoutPage.itemNameInInvoice
            .nth(0)
            .innerText();
        expect.soft(addedProductName).toEqual(invoiceProductName);
        const totalPrice = await checkoutPage.subTotalPrice.innerText();
        const totalPriceNumber = totalPrice?.split('$')[1];
        expect.soft(addedProductPrice).toEqual(`$${totalPriceNumber}`);
        await checkoutPage.clickFinishButton();
        await expect.soft(checkoutPage.thankYouBox).toHaveText(Messages.successOrder);
        await checkoutPage.clickBackHomeButton();
        await expect.soft(cartPage.cartIcon).toHaveText("");
    });

    // This test should fails because Checkout page is opened instead error message Cart is empty
    test.fail("Checkout with empty cart @smoke @negative @cart", async ({ inventoryPage, cartPage }) => {
            test.info().annotations.push({ type: "TestCaseID", description: "Checkout: 002" });
            await inventoryPage.getHeader().clickOnCartIcon();
            expect.soft(cartPage.yourChartBlock).toBeVisible();
            expect.soft(cartPage.itemQuantity).toBeHidden();
            await cartPage.clickCheckoutButton();
            expect(cartPage.errorBox).toHaveText(Messages.cartEmpty);
        },
    );
});