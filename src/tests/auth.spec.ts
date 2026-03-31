import { Urls } from "../utils/urls.enum";
import { test } from "../fixtures/base.fixture";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker/locale/en";
import { Messages } from "../utils/messages.enum";


let username: string = process.env.TEST_USERNAME!;
let password: string = process.env.TEST_PASSWORD!;

test.describe("Login functionality checks", async () => {
    test.beforeEach(async ({ loginPage } ) => {
        await loginPage.goto(Urls.LoginPage, { waitUntil: "load" });
    });

    test("Valid Login @smoke @positive @login", async ({ loginPage, inventoryPage }) => {
        test.info().annotations.push({ type: "TestCaseID", description: "Login: 001" });
        await loginPage.fillLoginForm(username, password);
        await expect
            .soft(loginPage.PasswordField)
            .toHaveAttribute("type", "password");
        await loginPage.clickLoginButton();
        const currentUrl = await inventoryPage.url();
        expect(currentUrl).toBe(Urls.Inventory);
        await expect(inventoryPage.productsBlock).toBeVisible();
    });

    test("Login with invalid credentials @smoke @negative @login ", async ({ loginPage }) => {
        test.info().annotations.push({ type: "TestCaseID", description: "Login: 002" });
        const invalidUser = faker.internet.username();
        const invalidPass = faker.internet.password();
        await loginPage.fillLoginForm(invalidUser, invalidPass);
        await loginPage.clickLoginButton();
        // Validate error attributes are displayed
        await expect.soft(loginPage.redXButton.nth(0)).toBeVisible();
        await expect.soft(loginPage.redXButton.nth(1)).toBeVisible();
        await expect.soft(loginPage.errorBox).toBeVisible();
        await expect.soft(loginPage.errorBox).toHaveText(Messages.invalidCredentials);
    });
});