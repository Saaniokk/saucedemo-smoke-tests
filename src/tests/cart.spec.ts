import { test } from "../fixtures/base.fixture";
import { expect } from "@playwright/test";
import { completeLogin } from "../steps/sharedSteps.step";

test.describe("Cart functionality checks", () => {
    test.beforeEach(async ({ loginPage }) => {
        await completeLogin(loginPage);
    });

    test("Saving the cart after logout @smoke @positive @cart", async ({ loginPage, inventoryPage, cartPage }) => {
        test.info().annotations.push({ type: "TestCaseID", description: "Cart: 001" });
        // Validate backpack added to cart and save its name to variable for further validation
        await inventoryPage.addToCartBackpack();
        const backpackName = await inventoryPage.itemText.nth(0).innerText();
        const cartItemsValue = await inventoryPage.shoppingCartBadge.innerText();
        expect(cartItemsValue).toEqual('1');
        await inventoryPage.getHeader().openBurgerMenu();
        await inventoryPage.getHeader().logoutFromBurgerMenu();
        // Log in again and check if cart contains the same item
        await completeLogin(loginPage);
        await inventoryPage.getHeader().clickOnCartIcon();
        const backpackNameInCart = await cartPage.backpackText.nth(0).innerText();
        expect(backpackName).toEqual(backpackNameInCart);
        const cartItemsValueUpdated = await inventoryPage.shoppingCartBadge.innerText();
        expect(cartItemsValueUpdated).toEqual('1');
    });
});