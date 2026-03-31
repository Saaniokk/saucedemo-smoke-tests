import { Locator } from "@playwright/test";
import { CommonPage } from "./common.page";

export class CheckoutPage extends CommonPage {

    // LoginPage locators
    public checkoutOverview: Locator = this._page.locator("//div[@class='header_secondary_container']");
    public itemNameInInvoice: Locator = this._page.locator("//div[@data-test='inventory-item-name']");
    public subTotalPrice: Locator = this._page.locator("//div[@data-test='subtotal-label']");
    public finishButton: Locator = this._page.locator('#finish');
    public thankYouBox: Locator = this._page.locator("//h2[@data-test='complete-header']");
    public backHomeButton: Locator = this._page.locator('#back-to-products');

    // LoginPage methods
    public async clickFinishButton(): Promise<void> {
        await this.finishButton.scrollIntoViewIfNeeded();
        await this.finishButton.click();
    };

    public async clickBackHomeButton(): Promise<void> {
        await this.backHomeButton.scrollIntoViewIfNeeded();
        await this.backHomeButton.click();
    };
}