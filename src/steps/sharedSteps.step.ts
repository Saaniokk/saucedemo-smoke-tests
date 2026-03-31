import { LoginPage } from "../pages/login.page";
import { Urls } from "../utils/urls.enum";
import { test } from "../fixtures/base.fixture";

let username: string = process.env.TEST_USERNAME!;
let password: string = process.env.TEST_PASSWORD!;

export async function completeLogin(loginPage: LoginPage): Promise<void> {
    return test.step('Login with credentials', async () => {
        // Go to main page and log in
        await loginPage.goto(Urls.LoginPage, { waitUntil: "load" });
        await loginPage.fillLoginForm(username, password);
        await loginPage.clickLoginButton();

    });
}
