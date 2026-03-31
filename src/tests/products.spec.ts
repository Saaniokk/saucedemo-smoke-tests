import { Urls } from "../utils/urls.enum";
import { test } from "../fixtures/base.fixture";
import { expect } from "@playwright/test";
import { completeLogin } from "../steps/sharedSteps.step";

test.describe("Products list checks", () => {
    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        await completeLogin(loginPage);
    });

    test("Sorting functionality @smoke @positive @products", async ({ inventoryPage }) => {
        test.info().annotations.push({ type: "TestCaseID", description: "Products: 001" });
        const currentUrl = await inventoryPage.url();
        expect(currentUrl).toBe(Urls.Inventory);
        await inventoryPage.selectSorting("lohi");
        const prices = await inventoryPage.getProductPrices();
        const sortedPrices = prices.sort((a, b) => a - b);
        expect.soft(prices).toEqual(sortedPrices);
        await inventoryPage.selectSorting("hilo");
        const pricesHilo = await inventoryPage.getProductPrices();
        const sortedPricesHilo = prices.sort((a, b) => b - a);
        expect.soft(pricesHilo).toEqual(sortedPricesHilo);
        await inventoryPage.selectSorting("az");
        const namesAz = await inventoryPage.getProductNames();
        const sortedNamesAz = namesAz.sort();
        expect.soft(namesAz).toEqual(sortedNamesAz);
        await inventoryPage.selectSorting("za");
        const namesZa = await inventoryPage.getProductNames();
        const sortedNamesZa = namesZa.sort().reverse();
        expect(namesZa).toEqual(sortedNamesZa);
    });
});